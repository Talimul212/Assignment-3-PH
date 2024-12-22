/* eslint-disable prettier/prettier */

import express from 'express';
import auth from '../Auth/auth';
import { User_Role } from '../User/user.constants';
import { AdminController } from './admin.controller';

const router = express.Router();

router.delete(
  '/blogs/:id',
  auth(User_Role.admin),
  AdminController.DeleteSingleBlog,
);
router.patch(
  '/users/:userId/block',
  auth(User_Role.admin),
  AdminController.updateUserStatus,
);

export const adminRoutes = router;
