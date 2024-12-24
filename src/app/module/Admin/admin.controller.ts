/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Request, Response } from 'express';
import { AdminServices } from './admin.service';
import { User } from '../User/user.model';

const DeleteSingleBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await AdminServices.deleteOneBlogsFromDB(id);
    res.status(200).json({
      success: true,
      message: 'Blog deleted successfully',
      statusCode: 200,
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

//
const updateUserStatus = async (req: Request, res: Response): Promise<any> => {
  try {
    const { userId } = req.params;

    // Find user details to verify existence
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        statusCode: 404,
      });
    }

    // Call service to update status
    const result = await AdminServices.updateUserStatusFromDB(userId);

    res.status(200).json({
      success: true,
      message: 'User blocked successfully',
      statusCode: 200,
    });
  } catch (error) {
    console.error('Error updating user status:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      statusCode: 500,
    });
  }
};

export const AdminController = {
  DeleteSingleBlog,
  updateUserStatus,
};
