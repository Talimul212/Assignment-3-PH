/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Request, Response } from 'express';
import { User } from '../User/user.model';
import { TUser } from '../User/user.interface';
import { Blog } from '../Blog/blog.modes';

const updateUserStatusFromDB = async (_id: string) => {
  // Find the user by ID
  const user = await User.findById(_id);

  // If the user is already blocked, return immediately
  if (!user) {
    throw new Error('User not found');
  }

  // Update isBlocked property directly
  const result = await User.findByIdAndUpdate(
    _id,
    { isBlocked: true }, // Update isBlocked to true
    { new: true, runValidators: true }, // Options to return updated document and validate
  );

  console.log(result); // For debugging purposes
  return result;
};

const deleteOneBlogsFromDB = async (_id: string) => {
  const result = await Blog.findOneAndDelete({ _id });
  // const result=await BlogModel.findById({_id}).deleteOne({_id})
  return result;
};
export const AdminServices = {
  updateUserStatusFromDB,
  deleteOneBlogsFromDB,
};
