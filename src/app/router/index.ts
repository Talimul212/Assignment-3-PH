/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import { Router } from 'express';
import userRouter from '../module/User/user.route';
import { BlogRoutes } from '../module/Blog/blog.routes';
// import { adminRoutes } from '../module/Admin/admin.routes';

const router = Router();

const moduleRoutes: any[] = [
  {
    path: '/auth',
    route: userRouter,
  },
  // {
  //   path: '/admin',
  //   route: adminRoutes,
  // },
  {
    path: '/admin',
    route: BlogRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
