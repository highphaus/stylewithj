import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './authMiddleware.js';
import { UserRole } from '../models/User.js';

export const authorizeRoles = (...allowedRoles: UserRole[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
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

export const authorizeBranchAccess = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  if (!req.user) {
    res.status(401).json({ success: false, message: 'Unauthorized' });
    return;
  }

  // Super Admin & Admin can access all branches
  if (req.user.role === UserRole.SUPER_ADMIN || req.user.role === UserRole.ADMIN) {
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

