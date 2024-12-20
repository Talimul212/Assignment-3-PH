/* eslint-disable prettier/prettier */
import { z } from 'zod';

export const validateRegister = z.object({
  name: z
    .string({
      required_error: 'Name is required',
    })
    .min(2, 'Name must be at least 2 characters long'),

  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email address'),

  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, 'Password must be at least 6 characters long')
    .max(20, 'Password must not exceed 20 characters'),
});

export const validateLogin = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email address'),

  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, 'Password must be at least 6 characters long'),
});
