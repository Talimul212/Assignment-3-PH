/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import { Router } from 'express';
// import userRouter from '../module/User/user.route';
import { blogRoutes } from '../module/Blog/blog.routes';
import { adminRoutes } from '../module/Admin/admin.routes';
import { AuthRoutes } from '../module/Auth/auth.routes';
// import { adminRoutes } from '../module/Admin/admin.routes';

const router = Router();

const moduleRoutes: any[] = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/admin',
    route: adminRoutes,
  },
  {
    path: '/blogs',
    route: blogRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
