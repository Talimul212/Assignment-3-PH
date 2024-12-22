/* eslint-disable prettier/prettier */
// user.controller.ts
import { Request, Response, NextFunction } from 'express';
import {
  registerUserService,
  loginUserService,
  UserServices,
} from './user.service';

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

const getAllUser = async (req: Request, res: Response) => {
  try {
    console.log(req.user);

    const result = await UserServices.getAllUsersFromDB();
    // res.send(result)
    res.status(200).json({
      success: true,
      message: 'users retrieved successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Invalid credentials',
      statusCode: 401,
      error: err,
    });
  }
};
// get single user
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await UserServices.getSingleUserFromDB(id);
    res.status(200).json({
      success: true,
      message: 'single user find successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err,
    });
  }
};
export const UserController = {
  register,
  getAllUser,
  getSingleUser,
};
