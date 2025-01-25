import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../utils/errors';
import { logger } from '../config/logger';

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error('Error:', {
    message: error.message,
    stack: error.stack,
    path: req.path,
    method: req.method
  });

  if (error instanceof HttpError) {
    return res.status(error.statusCode).json({
      message: error.message
    });
  }

  if (error.message === 'Invalid page number' || error.message === 'Invalid page size') {
    return res.status(400).json({
      message: error.message
    });
  }

  return res.status(500).json({
    message: 'Internal server error'
  });
};
