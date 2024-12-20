/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
// user.service.ts

import { generateToken } from '../../utils/jwt.util';
import { User } from './user.model';
import bcrypt from 'bcrypt';

export const registerUserService = async (userData: any) => {
  const { name, email, password } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });
  return { _id: user._id, name: user.name, email: user.email };
};

export const loginUserService = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user || user.isBlocked)
    throw new Error('Invalid credentials or blocked user');
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');
  return generateToken({ id: user._id, role: user.role });
};
