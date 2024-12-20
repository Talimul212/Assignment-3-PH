/* eslint-disable prettier/prettier */
// user.controller.ts
import { Request, Response, NextFunction } from 'express';
import { registerUserService, loginUserService } from './user.service';

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await registerUserService(req.body);
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      statusCode: 201,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;
    const token = await loginUserService(email, password);
    res.status(200).json({
      success: true,
      message: 'Login successful',
      statusCode: 200,
      data: { token },
    });
  } catch (error) {
    next(error);
  }
};
