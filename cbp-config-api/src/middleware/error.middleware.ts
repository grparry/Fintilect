import { Request, Response, NextFunction } from 'express';
import { logger } from '../config/logger';

export class HttpError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = 'HttpError';
  }
}

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error('Error:', {
    error: error.message,
    stack: error.stack,
    path: req.path,
    method: req.method,
    query: req.query,
    body: req.body
  });

  if (error instanceof HttpError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message
    });
  }

  // Handle SQL Server specific errors
  if (error.name === 'RequestError' || error.name === 'ConnectionError') {
    return res.status(503).json({
      status: 'error',
      message: 'Database service unavailable'
    });
  }

  // Default error
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
};
