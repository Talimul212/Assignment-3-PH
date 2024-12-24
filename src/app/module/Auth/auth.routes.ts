import express from 'express';
import { UserController } from '../User/user.controller';

const router = express.Router();

router.post('/register', UserController.register);
router.post(
  '/login',

  UserController.login,
);

router.get('/', UserController.getAllUser);
router.get('/:email', UserController.getSingleUser);

export const AuthRoutes = router;
