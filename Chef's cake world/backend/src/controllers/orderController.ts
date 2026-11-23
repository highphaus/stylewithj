import { Request, Response } from 'express';
import { Order, OrderStatus, PaymentMethod, PaymentStatus } from '../models/Order.js';
import { Branch } from '../models/Branch.js';
import { Product } from '../models/Product.js';
import { Cart } from '../models/Cart.js';
import { AuthenticatedRequest } from '../middleware/authMiddleware.js';
import { resolveBranchByPincode } from '../services/branchLocator.js';
import { createRazorpayOrder } from '../services/razorpayService.js';
import { dispatchOrderCreatedNotifications, dispatchOrderStatusChangeNotification } from '../services/notificationService.js';
import { calculateVariantPrice } from './cartController.js';

export const createOrder = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      deliveryAddress,
      deliveryType = 'DELIVERY',
      deliveryDate,
      deliverySlot,
      paymentMethod = PaymentMethod.RAZORPAY,
      items,
      couponCode,
      orderNotes,
      selectedBranchId
    } = req.body;

    if (!customerName || !customerEmail || !customerPhone || !items || items.length === 0) {
      res.status(400).json({ success: false, message: 'Missing required customer or cake order details.' });
      return;
    }

    if (!deliveryDate || !deliverySlot) {
      res.status(400).json({ success: false, message: 'Please select a delivery date and preferred time slot.' });
      return;
    }

    let branchDoc: any = null;
    let deliveryFee = 0;

    // Resolve branch
    if (deliveryType === 'PICKUP' && selectedBranchId) {
      branchDoc = await Branch.findById(selectedBranchId);
      deliveryFee = 0;
    } else {
      if (!deliveryAddress || !deliveryAddress.pincode) {
        res.status(400).json({ success: false, message: 'Delivery address with pincode is required for home delivery.' });
        return;
      }

      const resolution = await resolveBranchByPincode(deliveryAddress.pincode);
      if (!resolution.isServiceable || !resolution.selectedBranch) {
        res.status(400).json({
          success: false,
          message: `Delivery is currently not available for pincode ${deliveryAddress.pincode}. Please choose self-pickup.`
        });
        return;
      }
      branchDoc = resolution.selectedBranch;
      deliveryFee = resolution.deliveryFee;
    }

    if (!branchDoc || !branchDoc.isActive) {
      res.status(400).json({ success: false, message: 'Selected branch is currently unavailable.' });
      return;
    }

    // Backend-verified recalculation of every cake item
    let calculatedSubtotal = 0;
    const validatedItems: any[] = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product || !product.isActive) {
        res.status(400).json({ success: false, message: `Product "${item.productName || 'cake'}" is unavailable.` });
        return;
      }

      const verifiedUnitPrice = calculateVariantPrice(product.basePrice, item.selectedWeight || '0.5 kg');
      const qty = Math.max(1, Number(item.quantity) || 1);
      const itemTotal = verifiedUnitPrice * qty;
      calculatedSubtotal += itemTotal;

      validatedItems.push({
        productId: product._id,
        productName: product.name,
        productImage: product.images[0] || '',
        productSlug: product.slug,
        selectedWeight: item.selectedWeight,
        selectedFlavour: item.selectedFlavour,
        isEggless: item.isEggless ?? true,
        customMessage: item.customMessage || '',
        candlesCount: item.candlesCount || 0,
        accessories: item.accessories || [],
        unitPrice: verifiedUnitPrice,
        quantity: qty,
        totalPrice: itemTotal
      });
    }

    // Taxes (5% GST)
    const tax = Math.round(calculatedSubtotal * 0.05);
    const discount = req.body.discount ? Math.min(calculatedSubtotal, Number(req.body.discount)) : 0;
    const totalAmount = Math.max(0, calculatedSubtotal - discount + deliveryFee + tax);

    // Unique order number: CCW-YYYYMMDD-XXXX
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `CCW-${dateStr}-${randomSuffix}`;

    const order = new Order({
      orderNumber,
      customer: {
        userId: req.user?._id || null,
        name: customerName.trim(),
        email: customerEmail.toLowerCase().trim(),
        phone: customerPhone.trim()
      },
      branch: {
        branchId: branchDoc._id,
        branchName: branchDoc.name,
        phone: branchDoc.phone,
        address: branchDoc.address
      },
      items: validatedItems,
      deliveryAddress: deliveryAddress || {
        fullName: customerName,
        phone: customerPhone,
        house: 'Store Pickup',
        street: branchDoc.address,
        area: branchDoc.city,
        city: branchDoc.city,
        state: branchDoc.state,
        pincode: branchDoc.pincode
      },
      deliveryType,
      deliveryDate,
      deliverySlot,
      subtotal: calculatedSubtotal,
      discount,
      deliveryFee,
      tax,
      totalAmount,
      couponCode: couponCode || '',
      paymentMethod,
      paymentStatus: paymentMethod === PaymentMethod.COD ? PaymentStatus.PENDING : PaymentStatus.PENDING,
      orderStatus: paymentMethod === PaymentMethod.COD ? OrderStatus.CONFIRMED : OrderStatus.PENDING,
      orderNotes: orderNotes || '',
      timeline: [
        {
          status: paymentMethod === PaymentMethod.COD ? OrderStatus.CONFIRMED : OrderStatus.PENDING,
          timestamp: new Date(),
          updatedBy: 'System',
          note: paymentMethod === PaymentMethod.COD ? 'Order placed with Cash on Delivery.' : 'Order initiated. Awaiting Razorpay payment.'
        }
      ]
    });

    // If Razorpay, generate gateway order
    let razorpayOrderData = null;
    if (paymentMethod === PaymentMethod.RAZORPAY) {
      razorpayOrderData = await createRazorpayOrder({
        amountInPaisa: totalAmount * 100,
        receipt: orderNumber,
        notes: {
          orderNumber,
          customerEmail,
          branchName: branchDoc.name
        }
      });
      order.razorpayOrderId = razorpayOrderData.id;
    }

    await order.save();

    // Clear cart if user/guest
    if (req.user?._id) {
      await Cart.findOneAndDelete({ userId: req.user._id });
    } else if (req.body.guestId) {
      await Cart.findOneAndDelete({ guestId: req.body.guestId });
    }

    // Dispatch notifications if confirmed
    if (order.orderStatus === OrderStatus.CONFIRMED) {
      await dispatchOrderCreatedNotifications(order);
    }

    res.status(201).json({
      success: true,
      message: 'Order created successfully!',
      order: {
        id: order._id,
        orderNumber: order.orderNumber,
        totalAmount: order.totalAmount,
        paymentMethod: order.paymentMethod,
        paymentStatus: order.paymentStatus,
        orderStatus: order.orderStatus,
        branchName: order.branch.branchName,
        deliveryDate: order.deliveryDate,
        deliverySlot: order.deliverySlot
      },
      razorpay: razorpayOrderData
        ? {
            orderId: razorpayOrderData.id,
            amount: razorpayOrderData.amount,
            currency: razorpayOrderData.currency,
            keyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder'
          }
        : null
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Error creating order' });
  }
};

export const getMyOrders = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Authentication required' });
      return;
    }

    const orders = await Order.find({ 'customer.userId': req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Error fetching orders' });
  }
};

export const getOrderById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const order = await Order.findOne({
      $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { orderNumber: id }]
    });

    if (!order) {
      res.status(404).json({ success: false, message: 'Order not found.' });
      return;
    }

    res.status(200).json({ success: true, order });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Error retrieving order' });
  }
};

export const updateOrderStatus = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status, note } = req.body;

    if (!Object.values(OrderStatus).includes(status)) {
      res.status(400).json({ success: false, message: 'Invalid order status transition.' });
      return;
    }

    const order = await Order.findById(id);
    if (!order) {
      res.status(404).json({ success: false, message: 'Order not found' });
      return;
    }

    const previousStatus = order.orderStatus;
    order.orderStatus = status;
    order.timeline.push({
      status,
      timestamp: new Date(),
      updatedBy: req.user ? `${req.user.name} (${req.user.role})` : 'Staff',
      note: note || `Order marked as ${status}`
    });

    await order.save();
    await dispatchOrderStatusChangeNotification(order, previousStatus, status);

    res.status(200).json({ success: true, message: `Order status updated to ${status}`, order });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Error updating status' });
  }
};

