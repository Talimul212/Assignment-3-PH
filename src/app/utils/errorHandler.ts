/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Request, Response, NextFunction } from 'express';
import { BaseError } from './customErrors';

export const errorHandler = (
  err: BaseError | Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  console.error(err); // Log error for debugging

  // Handle Custom Errors
  if (err instanceof BaseError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      statusCode: err.statusCode,
      error: {
        code: err.errorCode,
      },
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
  } else {
    // Handle Generic Internal Server Error
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      statusCode: 500,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
      },
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
  }
};
