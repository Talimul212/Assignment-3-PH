/* eslint-disable prettier/prettier */
import { model, Schema } from 'mongoose';
import { TBlog } from './blog.Interface';

const blogSchema = new Schema<TBlog>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

// Create and export the model
export const Blog = model<TBlog>('Blog', blogSchema);
