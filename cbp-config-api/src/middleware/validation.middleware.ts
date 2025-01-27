import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { logger } from '@/config/logger';

export const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params
      });
      req.body = validatedData.body;
      req.query = validatedData.query;
      req.params = validatedData.params;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        logger.error('Validation error:', error.errors);
        res.status(400).json({
          error: {
            message: 'Validation error',
            details: error.errors
          }
        });
      } else {
        next(error);
      }
    }
  };
};
