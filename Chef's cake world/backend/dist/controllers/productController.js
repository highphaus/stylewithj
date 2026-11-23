"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductBySlug = exports.getProducts = void 0;
const Product_js_1 = require("../models/Product.js");
const Category_js_1 = require("../models/Category.js");
const getProducts = async (req, res) => {
    try {
        const { category, search, minPrice, maxPrice, eggless, weight, flavour, sort, isBestSeller, isFeatured, page = 1, limit = 12 } = req.query;
        const filter = { isActive: true };
        if (category) {
            const catDoc = await Category_js_1.Category.findOne({ slug: category });
            if (catDoc) {
                filter.category = catDoc._id;
            }
        }
        if (search) {
            filter.$or = [
                { name: { $regex: String(search), $options: 'i' } },
                { description: { $regex: String(search), $options: 'i' } }
            ];
        }
        if (minPrice || maxPrice) {
            filter.basePrice = {};
            if (minPrice)
                filter.basePrice.$gte = Number(minPrice);
            if (maxPrice)
                filter.basePrice.$lte = Number(maxPrice);
        }
        if (eggless === 'true') {
            filter.egglessAvailable = true;
        }
        if (weight) {
            filter.availableWeights = String(weight);
        }
        if (flavour) {
            filter.availableFlavours = { $regex: String(flavour), $options: 'i' };
        }
        if (isBestSeller === 'true') {
            filter.isBestSeller = true;
        }
        if (isFeatured === 'true') {
            filter.isFeatured = true;
        }
        let sortOptions = { createdAt: -1 }; // default newest
        if (sort === 'price-asc')
            sortOptions = { basePrice: 1 };
        else if (sort === 'price-desc')
            sortOptions = { basePrice: -1 };
        else if (sort === 'popularity')
            sortOptions = { averageRating: -1, reviewCount: -1 };
        else if (sort === 'newest')
            sortOptions = { createdAt: -1 };
        const pageNum = Math.max(1, Number(page));
        const limitNum = Math.max(1, Math.min(50, Number(limit)));
        const skip = (pageNum - 1) * limitNum;
        const [products, totalCount] = await Promise.all([
            Product_js_1.Product.find(filter)
                .populate('category', 'name slug')
                .sort(sortOptions)
                .skip(skip)
                .limit(limitNum),
            Product_js_1.Product.countDocuments(filter)
        ]);
        res.status(200).json({
            success: true,
            products,
            pagination: {
                total: totalCount,
                page: pageNum,
                limit: limitNum,
                totalPages: Math.ceil(totalCount / limitNum)
            }
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message || 'Error fetching products' });
    }
};
exports.getProducts = getProducts;
const getProductBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const product = await Product_js_1.Product.findOne({ slug, isActive: true }).populate('category', 'name slug');
        if (!product) {
            res.status(404).json({ success: false, message: 'Product not found.' });
            return;
        }
        // Related products in the same category
        const relatedProducts = await Product_js_1.Product.find({
            category: product.category,
            _id: { $ne: product._id },
            isActive: true
        }).limit(4);
        res.status(200).json({
            success: true,
            product,
            relatedProducts
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message || 'Error fetching product' });
    }
};
exports.getProductBySlug = getProductBySlug;
const createProduct = async (req, res) => {
    try {
        const product = await Product_js_1.Product.create(req.body);
        res.status(201).json({ success: true, message: 'Product created successfully', product });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message || 'Error creating product' });
    }
};
exports.createProduct = createProduct;
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product_js_1.Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!product) {
            res.status(404).json({ success: false, message: 'Product not found' });
            return;
        }
        res.status(200).json({ success: true, message: 'Product updated successfully', product });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message || 'Error updating product' });
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product_js_1.Product.findByIdAndUpdate(id, { isActive: false }, { new: true });
        if (!product) {
            res.status(404).json({ success: false, message: 'Product not found' });
            return;
        }
        res.status(200).json({ success: true, message: 'Product deactivated successfully' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message || 'Error deleting product' });
    }
};
exports.deleteProduct = deleteProduct;
