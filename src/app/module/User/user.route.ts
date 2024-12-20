/* eslint-disable prettier/prettier */
// user.module.ts
import { Router } from 'express';
import { register, login } from './user.controller';

const userRouter = Router();

// User Routes
userRouter.post('/register', register);
userRouter.post('/login', login);

export default userRouter;
