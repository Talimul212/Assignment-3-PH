/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
// blog.route.ts

import express from 'express';
import { BlogController } from './blog.controller';

const router = express.Router();

// Public Routes
router.get('/', BlogController.getAllBlogsController);
router.get('/:id', BlogController.getSingleBlogController);

// User Routes (Protected)
router.post('/', BlogController.createBlogController);
router.patch('/:id', BlogController.updateBlogController);
router.delete('/:id', BlogController.deleteBlogController);
export const blogRoutes = router;
