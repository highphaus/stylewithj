"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderStatus = exports.getOrderById = exports.getMyOrders = exports.createOrder = void 0;
const Order_js_1 = require("../models/Order.js");
const Branch_js_1 = require("../models/Branch.js");
const Product_js_1 = require("../models/Product.js");
const Cart_js_1 = require("../models/Cart.js");
const branchLocator_js_1 = require("../services/branchLocator.js");
const razorpayService_js_1 = require("../services/razorpayService.js");
const notificationService_js_1 = require("../services/notificationService.js");
const cartController_js_1 = require("./cartController.js");
const createOrder = async (req, res) => {
    try {
        const { customerName, customerEmail, customerPhone, deliveryAddress, deliveryType = 'DELIVERY', deliveryDate, deliverySlot, paymentMethod = Order_js_1.PaymentMethod.RAZORPAY, items, couponCode, orderNotes, selectedBranchId } = req.body;
        if (!customerName || !customerEmail || !customerPhone || !items || items.length === 0) {
            res.status(400).json({ success: false, message: 'Missing required customer or cake order details.' });
            return;
        }
        if (!deliveryDate || !deliverySlot) {
            res.status(400).json({ success: false, message: 'Please select a delivery date and preferred time slot.' });
            return;
        }
        let branchDoc = null;
        let deliveryFee = 0;
        // Resolve branch
        if (deliveryType === 'PICKUP' && selectedBranchId) {
            branchDoc = await Branch_js_1.Branch.findById(selectedBranchId);
            deliveryFee = 0;
        }
        else {
            if (!deliveryAddress || !deliveryAddress.pincode) {
                res.status(400).json({ success: false, message: 'Delivery address with pincode is required for home delivery.' });
                return;
            }
            const resolution = await (0, branchLocator_js_1.resolveBranchByPincode)(deliveryAddress.pincode);
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
        const validatedItems = [];
        for (const item of items) {
            const product = await Product_js_1.Product.findById(item.productId);
            if (!product || !product.isActive) {
                res.status(400).json({ success: false, message: `Product "${item.productName || 'cake'}" is unavailable.` });
                return;
            }
            const verifiedUnitPrice = (0, cartController_js_1.calculateVariantPrice)(product.basePrice, item.selectedWeight || '0.5 kg');
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
        const order = new Order_js_1.Order({
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
            paymentStatus: paymentMethod === Order_js_1.PaymentMethod.COD ? Order_js_1.PaymentStatus.PENDING : Order_js_1.PaymentStatus.PENDING,
            orderStatus: paymentMethod === Order_js_1.PaymentMethod.COD ? Order_js_1.OrderStatus.CONFIRMED : Order_js_1.OrderStatus.PENDING,
            orderNotes: orderNotes || '',
            timeline: [
                {
                    status: paymentMethod === Order_js_1.PaymentMethod.COD ? Order_js_1.OrderStatus.CONFIRMED : Order_js_1.OrderStatus.PENDING,
                    timestamp: new Date(),
                    updatedBy: 'System',
                    note: paymentMethod === Order_js_1.PaymentMethod.COD ? 'Order placed with Cash on Delivery.' : 'Order initiated. Awaiting Razorpay payment.'
                }
            ]
        });
        // If Razorpay, generate gateway order
        let razorpayOrderData = null;
        if (paymentMethod === Order_js_1.PaymentMethod.RAZORPAY) {
            razorpayOrderData = await (0, razorpayService_js_1.createRazorpayOrder)({
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
            await Cart_js_1.Cart.findOneAndDelete({ userId: req.user._id });
        }
        else if (req.body.guestId) {
            await Cart_js_1.Cart.findOneAndDelete({ guestId: req.body.guestId });
        }
        // Dispatch notifications if confirmed
        if (order.orderStatus === Order_js_1.OrderStatus.CONFIRMED) {
            await (0, notificationService_js_1.dispatchOrderCreatedNotifications)(order);
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
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message || 'Error creating order' });
    }
};
exports.createOrder = createOrder;
const getMyOrders = async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ success: false, message: 'Authentication required' });
            return;
        }
        const orders = await Order_js_1.Order.find({ 'customer.userId': req.user._id }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, orders });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message || 'Error fetching orders' });
    }
};
exports.getMyOrders = getMyOrders;
const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order_js_1.Order.findOne({
            $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { orderNumber: id }]
        });
        if (!order) {
            res.status(404).json({ success: false, message: 'Order not found.' });
            return;
        }
        res.status(200).json({ success: true, order });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message || 'Error retrieving order' });
    }
};
exports.getOrderById = getOrderById;
const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, note } = req.body;
        if (!Object.values(Order_js_1.OrderStatus).includes(status)) {
            res.status(400).json({ success: false, message: 'Invalid order status transition.' });
            return;
        }
        const order = await Order_js_1.Order.findById(id);
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
        await (0, notificationService_js_1.dispatchOrderStatusChangeNotification)(order, previousStatus, status);
        res.status(200).json({ success: true, message: `Order status updated to ${status}`, order });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message || 'Error updating status' });
    }
};
exports.updateOrderStatus = updateOrderStatus;
