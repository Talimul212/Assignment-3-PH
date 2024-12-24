/* eslint-disable prettier/prettier */
import { z } from 'zod';

export const BlogValidationSchema = z.object({
  title: z
    .string({ required_error: 'Title is required' })
    .min(3, { message: 'Title must be at least 3 characters long' })
    .max(100, { message: 'Title cannot exceed 100 characters' }),

  content: z
    .string({ required_error: 'Content is required' })
    .min(10, { message: 'Content must be at least 10 characters long' }),

  author: z
    .string({ required_error: 'Author ID is required' })
    .regex(/^[0-9a-fA-F]{24}$/, { message: 'Invalid author ID format' }),

  isPublished: z.boolean().optional(),
});

export const CreateBlogValidation = BlogValidationSchema;

export const UpdateBlogValidation = BlogValidationSchema.partial();
