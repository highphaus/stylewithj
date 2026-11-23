"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyCoupon = exports.removeCartItem = exports.updateCartItem = exports.addToCart = exports.getCart = exports.calculateVariantPrice = void 0;
const Cart_js_1 = require("../models/Cart.js");
const Product_js_1 = require("../models/Product.js");
const Coupon_js_1 = require("../models/Coupon.js");
// Weight price multiplier logic
const calculateVariantPrice = (basePrice, weight) => {
    if (weight.includes('0.5'))
        return basePrice;
    if (weight.includes('1.5'))
        return Math.round(basePrice * 2.8);
    if (weight.includes('1'))
        return Math.round(basePrice * 1.9);
    if (weight.includes('2'))
        return Math.round(basePrice * 3.6);
    if (weight.includes('3'))
        return Math.round(basePrice * 5.2);
    if (weight.includes('4'))
        return Math.round(basePrice * 6.8);
    return basePrice;
};
exports.calculateVariantPrice = calculateVariantPrice;
const recalculateCartTotals = (cart) => {
    cart.subtotal = cart.items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    // 5% bakery GST
    cart.tax = Math.round(cart.subtotal * 0.05);
    // delivery fee default or assigned
    const deliveryFee = cart.deliveryFee || 0;
    // discount
    const discount = Math.min(cart.subtotal, cart.discount || 0);
    cart.totalAmount = Math.max(0, cart.subtotal - discount + deliveryFee + cart.tax);
};
const getCart = async (req, res) => {
    try {
        const userId = req.user?._id;
        const guestId = req.headers['x-guest-id'] || req.query.guestId;
        let cart;
        if (userId) {
            cart = await Cart_js_1.Cart.findOne({ userId });
        }
        else if (guestId) {
            cart = await Cart_js_1.Cart.findOne({ guestId });
        }
        if (!cart) {
            res.status(200).json({
                success: true,
                cart: {
                    items: [],
                    subtotal: 0,
                    discount: 0,
                    deliveryFee: 0,
                    tax: 0,
                    totalAmount: 0
                }
            });
            return;
        }
        res.status(200).json({ success: true, cart });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message || 'Error fetching cart' });
    }
};
exports.getCart = getCart;
const addToCart = async (req, res) => {
    try {
        const userId = req.user?._id;
        const guestId = req.headers['x-guest-id'] || req.body.guestId;
        if (!userId && !guestId) {
            res.status(400).json({ success: false, message: 'Missing user identification or guest session ID.' });
            return;
        }
        const { productId, selectedWeight = '0.5 kg', selectedFlavour = 'Belgian Chocolate Truffle', isEggless = true, customMessage = '', candlesCount = 0, accessories = [], quantity = 1 } = req.body;
        const product = await Product_js_1.Product.findById(productId);
        if (!product || !product.isActive) {
            res.status(404).json({ success: false, message: 'Selected cake is no longer available.' });
            return;
        }
        // Secure price calculation from DB
        const calculatedUnitPrice = (0, exports.calculateVariantPrice)(product.basePrice, selectedWeight);
        const parsedQty = Math.max(1, Number(quantity));
        let cart = userId ? await Cart_js_1.Cart.findOne({ userId }) : await Cart_js_1.Cart.findOne({ guestId });
        if (!cart) {
            cart = new Cart_js_1.Cart({
                userId: userId || null,
                guestId: guestId || null,
                items: []
            });
        }
        // Check if duplicate item variation exists
        const existingIndex = cart.items.findIndex((item) => item.productId.toString() === productId &&
            item.selectedWeight === selectedWeight &&
            item.selectedFlavour === selectedFlavour &&
            item.isEggless === isEggless &&
            (item.customMessage || '') === customMessage);
        if (existingIndex > -1) {
            cart.items[existingIndex].quantity += parsedQty;
            cart.items[existingIndex].totalPrice = cart.items[existingIndex].quantity * calculatedUnitPrice;
        }
        else {
            cart.items.push({
                productId: product._id,
                productName: product.name,
                productImage: product.images[0] || '',
                productSlug: product.slug,
                selectedWeight,
                selectedFlavour,
                isEggless,
                customMessage,
                candlesCount,
                accessories,
                unitPrice: calculatedUnitPrice,
                quantity: parsedQty,
                totalPrice: calculatedUnitPrice * parsedQty
            });
        }
        recalculateCartTotals(cart);
        await cart.save();
        res.status(200).json({ success: true, message: 'Item added to cart', cart });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message || 'Error updating cart' });
    }
};
exports.addToCart = addToCart;
const updateCartItem = async (req, res) => {
    try {
        const userId = req.user?._id;
        const guestId = req.headers['x-guest-id'] || req.query.guestId;
        const { itemId } = req.params;
        const { quantity } = req.body;
        const cart = userId ? await Cart_js_1.Cart.findOne({ userId }) : await Cart_js_1.Cart.findOne({ guestId });
        if (!cart) {
            res.status(404).json({ success: false, message: 'Cart not found' });
            return;
        }
        const item = cart.items.id(itemId);
        if (!item) {
            res.status(404).json({ success: false, message: 'Item not found in cart' });
            return;
        }
        if (quantity <= 0) {
            item.deleteOne();
        }
        else {
            item.quantity = quantity;
            item.totalPrice = item.quantity * item.unitPrice;
        }
        recalculateCartTotals(cart);
        await cart.save();
        res.status(200).json({ success: true, message: 'Cart updated', cart });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message || 'Error updating cart item' });
    }
};
exports.updateCartItem = updateCartItem;
const removeCartItem = async (req, res) => {
    try {
        const userId = req.user?._id;
        const guestId = req.headers['x-guest-id'] || req.query.guestId;
        const { itemId } = req.params;
        const cart = userId ? await Cart_js_1.Cart.findOne({ userId }) : await Cart_js_1.Cart.findOne({ guestId });
        if (!cart) {
            res.status(404).json({ success: false, message: 'Cart not found' });
            return;
        }
        cart.items.pull({ _id: itemId });
        recalculateCartTotals(cart);
        await cart.save();
        res.status(200).json({ success: true, message: 'Item removed from cart', cart });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message || 'Error removing item' });
    }
};
exports.removeCartItem = removeCartItem;
const applyCoupon = async (req, res) => {
    try {
        const userId = req.user?._id;
        const guestId = req.headers['x-guest-id'] || req.body.guestId;
        const { code } = req.body;
        if (!code) {
            res.status(400).json({ success: false, message: 'Please provide a promo code.' });
            return;
        }
        const coupon = await Coupon_js_1.Coupon.findOne({ code: code.toUpperCase().trim(), isActive: true });
        if (!coupon || new Date(coupon.expiryDate) < new Date()) {
            res.status(400).json({ success: false, message: 'Invalid or expired promotional code.' });
            return;
        }
        const cart = userId ? await Cart_js_1.Cart.findOne({ userId }) : await Cart_js_1.Cart.findOne({ guestId });
        if (!cart || cart.items.length === 0) {
            res.status(400).json({ success: false, message: 'Cart is empty.' });
            return;
        }
        if (cart.subtotal < coupon.minOrderValue) {
            res.status(400).json({
                success: false,
                message: `This coupon requires a minimum cake order of ₹${coupon.minOrderValue}.`
            });
            return;
        }
        let discount = 0;
        if (coupon.discountType === 'PERCENTAGE') {
            discount = Math.round((cart.subtotal * coupon.discountValue) / 100);
            if (coupon.maxDiscount && coupon.maxDiscount > 0) {
                discount = Math.min(discount, coupon.maxDiscount);
            }
        }
        else {
            discount = coupon.discountValue;
        }
        cart.discount = discount;
        cart.couponCode = coupon.code;
        recalculateCartTotals(cart);
        await cart.save();
        res.status(200).json({
            success: true,
            message: `Coupon "${coupon.code}" applied! You saved ₹${discount}.`,
            cart
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message || 'Error applying coupon' });
    }
};
exports.applyCoupon = applyCoupon;
