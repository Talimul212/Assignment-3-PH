/* eslint-disable prettier/prettier */
import { model, Schema } from 'mongoose';
import { TBlog } from './blog.Interface';

const blogSchema = new Schema<TBlog>({
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update `updatedAt` before saving any changes
blogSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

// Create and export the model
export const Blog = model<TBlog>('Blog', blogSchema);
