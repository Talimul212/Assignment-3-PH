/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
// blog.service.ts

import { User } from '../User/user.model';
import { Types } from 'mongoose';
import { Blog } from './blog.modes';

// Create a blog
export const createBlogService = async (blogData: any, userId: string) => {
  const { title, content } = blogData;
  const details = await User.findById(userId);
  const blog = await Blog.create({
    title,
    content,
    author: new Types.ObjectId(userId),
  });
  return {
    _id: blog._id,
    title: blog.title,
    content: blog.content,
    author: {
      details,
    },
  };
};

// Update Blog Service
export const updateBlogService = async (
  blogId: string,
  updateData: any,
  userId: string,
) => {
  const blog = await Blog.findOneAndUpdate(
    { _id: blogId, author: userId }, // Ensure the user owns the blog
    updateData,
    { new: true, runValidators: true }, // Return updated document
  );

  if (!blog) throw new Error('Blog not found or not authorized to update.');
  return blog;
};

// Delete Blog Service
export const deleteBlogService = async (blogId: string, userId: string) => {
  const blog = await Blog.findOneAndDelete({
    _id: blogId,
    author: userId,
  });

  if (!blog) throw new Error('Blog not found or not authorized to delete.');
  return blog;
};

// Get all blogs (Public API with filters, search, and sorting)
export const getAllBlogsService = async (query: any) => {
  const { search, sortBy, sortOrder, filter } = query;

  const filterQuery: any = {};
  if (search) {
    filterQuery.$or = [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } },
    ];
  }
  if (filter) {
    filterQuery.author = filter;
  }

  const sortQuery: any = {};
  if (sortBy) {
    sortQuery[sortBy] = sortOrder === 'desc' ? -1 : 1;
  }

  const blogs = await Blog.find(filterQuery).sort(sortQuery).populate('author');
  console.log(blogs);

  return blogs;
};

// Get a single blog by ID
export const getSingleBlogService = async (blogId: string) => {
  const blog = await Blog.findById(blogId).populate('author');
  if (!blog) throw new Error('Blog not found.');
  return blog;
};

// Admin: Delete any blog
export const adminDeleteBlogService = async (blogId: string) => {
  const blog = await Blog.findByIdAndDelete(blogId);
  if (!blog) throw new Error('Blog not found.');
  return blog;
};

// Admin: Block a user
export const blockUserService = async (userId: string) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { isBlocked: true },
    { new: true },
  );
  if (!user) throw new Error('User not found.');
  return user;
};

export const BlogServices = {
  createBlogService,
  updateBlogService,
  deleteBlogService,
  getAllBlogsService,
  getSingleBlogService,
  adminDeleteBlogService,
  blockUserService,
};
