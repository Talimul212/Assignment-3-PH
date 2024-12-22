/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
// blog.controller.ts

import { Request, Response } from 'express';
import { BlogServices } from './blog.services';

// Create a blog
const createBlogController = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id; // Assuming user ID is added to the request object by middleware
    console.log(userId);
    const blog = await BlogServices.createBlogService(req.body, userId);
    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      statusCode: 201,
      data: blog,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update a blog
const updateBlogController = async (req: Request, res: Response) => {
  try {
    const blogId = req.params.id;

    const updatedBlog = await BlogServices.updateBlogService(blogId, req.body);

    res.status(200).json({
      success: true,
      message: 'Blog updated successfully',
      statusCode: 200,
      data: updatedBlog,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete a blog
const deleteBlogController = async (req: Request, res: Response) => {
  try {
    const blogId = req.params.id;
    console.log(blogId);

    await BlogServices.deleteBlogService(blogId);
    res.status(200).json({
      success: true,
      message: 'Blog deleted successfully',
      statusCode: 200,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all blogs
const getAllBlogsController = async (req: Request, res: Response) => {
  try {
    const blogs = await BlogServices.getAllBlogsService(req.query);
    res.status(200).json({
      success: true,
      message: 'Blogs fetched successfully',
      statusCode: 200,
      data: blogs,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get a single blog
const getSingleBlogController = async (req: Request, res: Response) => {
  try {
    const blogId = req.params.id;
    const blog = await BlogServices.getSingleBlogService(blogId);
    res.status(200).json({
      success: true,
      message: 'Blog fetched successfully',
      statusCode: 200,
      data: blog,
    });
  } catch (error: any) {
    res.status(404).json({ success: false, message: error.message });
  }
};

// Admin: Delete any blog
const adminDeleteBlogController = async (req: Request, res: Response) => {
  try {
    const blogId = req.params.id;
    await BlogServices.adminDeleteBlogService(blogId);
    res.status(200).json({
      success: true,
      message: 'Blog deleted successfully',
      statusCode: 200,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Admin: Block a user
const blockUserController = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const blockedUser = await BlogServices.blockUserService(userId);
    res.status(200).json({
      success: true,
      message: 'User blocked successfully',
      statusCode: 200,
      data: blockedUser,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const BlogController = {
  createBlogController,
  updateBlogController,
  deleteBlogController,
  getAllBlogsController,
  getSingleBlogController,
  adminDeleteBlogController,
  blockUserController,
};
