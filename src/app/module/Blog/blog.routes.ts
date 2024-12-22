/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
// blog.route.ts

import express from 'express';
import { BlogController } from './blog.controller';

const router = express.Router();

// Public Routes
router.get('/', BlogController.getAllBlogsController); // Get all blogs
router.get('/:id', BlogController.getSingleBlogController); // Get a single blog

// User Routes (Protected)
router.post('/', BlogController.createBlogController); // Create a blog (authenticated user)
router.patch('/:id', BlogController.updateBlogController); // Update a blog (authenticated user)
router.delete('/:id', BlogController.deleteBlogController); // Delete a blog (authenticated user)

export const BlogRoutes = router;
