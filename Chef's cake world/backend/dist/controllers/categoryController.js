"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCategory = exports.createCategory = exports.getCategories = void 0;
const Category_js_1 = require("../models/Category.js");
const getCategories = async (req, res) => {
    try {
        const categories = await Category_js_1.Category.find({ isActive: true }).sort({ displayOrder: 1, name: 1 });
        res.status(200).json({ success: true, categories });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message || 'Error fetching categories' });
    }
};
exports.getCategories = getCategories;
const createCategory = async (req, res) => {
    try {
        const category = await Category_js_1.Category.create(req.body);
        res.status(201).json({ success: true, message: 'Category created', category });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message || 'Error creating category' });
    }
};
exports.createCategory = createCategory;
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category_js_1.Category.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!category) {
            res.status(404).json({ success: false, message: 'Category not found' });
            return;
        }
        res.status(200).json({ success: true, message: 'Category updated', category });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message || 'Error updating category' });
    }
};
exports.updateCategory = updateCategory;
