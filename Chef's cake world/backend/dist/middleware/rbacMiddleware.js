"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeBranchAccess = exports.authorizeRoles = void 0;
const User_js_1 = require("../models/User.js");
const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            res.status(401).json({ success: false, message: 'Unauthorized. Authentication required.' });
            return;
        }
        if (!allowedRoles.includes(req.user.role)) {
            res.status(403).json({
                success: false,
                message: `Forbidden. Role '${req.user.role}' does not have sufficient permissions to perform this action.`
            });
            return;
        }
        next();
    };
};
exports.authorizeRoles = authorizeRoles;
const authorizeBranchAccess = (req, res, next) => {
    if (!req.user) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
    }
    // Super Admin & Admin can access all branches
    if (req.user.role === User_js_1.UserRole.SUPER_ADMIN || req.user.role === User_js_1.UserRole.ADMIN) {
        return next();
    }
    const requestedBranchId = req.params.branchId || req.body.branchId || req.query.branchId;
    if (!requestedBranchId || !req.user.branchId || req.user.branchId.toString() !== requestedBranchId.toString()) {
        res.status(403).json({
            success: false,
            message: 'Forbidden. You only have access to your assigned branch.'
        });
        return;
    }
    next();
};
exports.authorizeBranchAccess = authorizeBranchAccess;
