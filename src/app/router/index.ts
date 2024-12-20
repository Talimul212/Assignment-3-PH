/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import { Router } from 'express';
import userRouter from '../module/User/user.route';

const router = Router();

const moduleRoutes: any[] = [
  {
    path: '/auth',
    route: userRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
