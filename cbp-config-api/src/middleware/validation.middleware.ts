import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';
import { HttpError } from './error.middleware';

export const validateRequest = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errorMessage = error.details
        .map(detail => detail.message)
        .join(', ');
      
      next(new HttpError(400, errorMessage));
    }

    next();
  };
};
