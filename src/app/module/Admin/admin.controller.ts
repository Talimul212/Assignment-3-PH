/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Request, Response } from 'express';
import { AdminServices } from './admin.service';

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
const updateUserStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = req.body;
    const result = await AdminServices.updateUserStatausFromDB(id, user);
    res.status(200).json({
      success: true,
      message: 'user blocked successfully',
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
