/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
// user.service.ts

import jwt from 'jsonwebtoken';
import { User } from './user.model';
import bcrypt from 'bcrypt';

export const registerUserService = async (userData: any) => {
  const { name, email, password } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });
  return { _id: user._id, name: user.name, email: user.email };
};

export const loginUserService = async (email: string, password: string) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user || user.isBlocked)
    throw new Error('Invalid credentials or blocked user');
  const isMatch = await bcrypt.compare(password, user?.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const jwtPayload = {
    id: user?.id,
    role: user?.role,
  };

  const token = jwt.sign(jwtPayload, 'secret', { expiresIn: '1d' });
  return token;
};

const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};
// getsingleuser
const getSingleUserFromDB = async (_id: string) => {
  const result = await User.findOne({ _id });
  return result;
};
export const UserServices = {
  getAllUsersFromDB,
  getSingleUserFromDB,
};
