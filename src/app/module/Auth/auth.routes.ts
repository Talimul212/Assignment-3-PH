import express from 'express';
import validateRequest from './validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthControllers } from './auth.controller';
import { UserController } from '../User/user.controller';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginSchema),
  AuthControllers.loginUser,
);

router.post('/register', UserController.register);
router.get('/', UserController.getAllUser);
router.get('/:email', UserController.getSingleUser);

export const AuthRoutes = router;
