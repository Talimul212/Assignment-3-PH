/* eslint-disable prettier/prettier */
// middleware/authorization.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.util';

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('Unauthorized');
    const decoded = verifyToken(token);
    if (decoded.role !== 'admin') throw new Error('Forbidden');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ success: false, message: error.message });
  }
};
