/* eslint-disable prettier/prettier */

import { Model } from 'mongoose';
import { User_Role } from './user.constants';

export interface TUser {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isBlocked: boolean;
}
export interface Usermodels extends Model<TUser> {
  // mystaticMethod():number
  isUserExistByCustomId(id: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
export type TuserRole = keyof typeof User_Role;
