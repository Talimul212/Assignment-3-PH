/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
// blog.route.ts

import express from 'express';
import { BlogController } from './blog.controller';
import auth from '../Auth/auth';
import { User_Role } from '../User/user.constants';

const router = express.Router();

// Public Routes
router.get(
  '/',

  BlogController.getAllBlogsController,
);
router.get('/:id', BlogController.getSingleBlogController);

// User Routes (Protected)
router.post(
  '/',
  auth(User_Role.user),

  BlogController.createBlogController,
);

router.patch('/:id', auth(User_Role.user), BlogController.updateBlogController);
router.delete(
  '/:id',
  auth(User_Role.user),
  BlogController.deleteBlogController,
);
export const blogRoutes = router;
