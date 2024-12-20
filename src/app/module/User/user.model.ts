/* eslint-disable prettier/prettier */
import { model, Schema } from 'mongoose';
import { IUser } from './user.interface';
const UserSchema: Schema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    isBlocked: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const User = model<IUser>('User', UserSchema);
