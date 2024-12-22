/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Request, Response } from 'express';
import { User } from '../User/user.model';
import { TUser } from '../User/user.interface';
import { Blog } from '../Blog/blog.modes';

const updateUserStatausFromDB = async (
  _id: string,
  payload: Partial<TUser>,
) => {
  const { name, email, password, isBlocked, ...remainingUserData } = payload;
  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingUserData,
  };
  if (isBlocked === false) {
    modifiedUpdatedData[`isBlocked`] = true;
  }

  const result = await User.findByIdAndUpdate(_id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  // const result=await BlogModel.findOneAndUpdate({_id})
  return result;
};
const deleteOneBlogsFromDB = async (_id: string) => {
  const result = await Blog.findOneAndDelete({ _id });
  // const result=await BlogModel.findById({_id}).deleteOne({_id})
  return result;
};
export const AdminServices = {
  updateUserStatausFromDB,
  deleteOneBlogsFromDB,
};
