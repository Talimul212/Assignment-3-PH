/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../module/User/user.model';

interface AuthPayload {
  id: string;
  role: 'admin' | 'user';
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Make sure the return type is `void` here
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as AuthPayload;
    const user = await User.findById(decoded.id);
    if (!user || user.isBlocked) {
      return res.status(403).json({ message: 'Access Denied' });
    }

    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
