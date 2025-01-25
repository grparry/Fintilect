import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../utils/errors';

interface ValidationSchema {
  params?: {
    type: string;
    properties: Record<string, any>;
    required?: string[];
  };
  query?: {
    type: string;
    properties: Record<string, any>;
    required?: string[];
  };
  body?: {
    type: string;
    properties: Record<string, any>;
    required?: string[];
  };
}

export function validateRequest(schema: ValidationSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schema.params) {
        validateObject(req.params, schema.params);
      }
      if (schema.query) {
        validateObject(req.query, schema.query);
      }
      if (schema.body) {
        validateObject(req.body, schema.body);
      }
      next();
    } catch (error) {
      if (error instanceof Error) {
        next(new HttpError(400, error.message));
      } else {
        next(new HttpError(400, 'Invalid request'));
      }
    }
  };
}

function validateObject(obj: any, schema: { type: string; properties: Record<string, any>; required?: string[] }) {
  if (schema.required) {
    for (const field of schema.required) {
      if (!(field in obj)) {
        throw new Error(`Missing required field: ${field}`);
      }
    }
  }

  for (const [key, value] of Object.entries(obj)) {
    const propertySchema = schema.properties[key];
    if (!propertySchema) {
      if (!schema.properties.additionalProperties) {
        throw new Error(`Unknown field: ${key}`);
      }
      continue;
    }

    validateValue(value, propertySchema, key);
  }
}

function validateValue(value: any, schema: any, field: string) {
  if (schema.optional && value === undefined) {
    return;
  }

  if (schema.type === 'number') {
    const num = Number(value);
    if (isNaN(num)) {
      throw new Error(`Invalid number for field: ${field}`);
    }
    if (schema.minimum !== undefined && num < schema.minimum) {
      throw new Error(`Value for ${field} must be at least ${schema.minimum}`);
    }
    if (schema.maximum !== undefined && num > schema.maximum) {
      throw new Error(`Value for ${field} must be at most ${schema.maximum}`);
    }
  }

  if (schema.type === 'string') {
    if (typeof value !== 'string') {
      throw new Error(`Invalid string for field: ${field}`);
    }
    if (schema.format === 'date-time') {
      if (isNaN(Date.parse(value))) {
        throw new Error(`Invalid date-time for field: ${field}`);
      }
    }
  }

  if (schema.type === 'boolean') {
    if (typeof value !== 'boolean' && value !== 'true' && value !== 'false') {
      throw new Error(`Invalid boolean for field: ${field}`);
    }
  }

  if (schema.enum && !schema.enum.includes(value)) {
    throw new Error(`Invalid value for field ${field}. Must be one of: ${schema.enum.join(', ')}`);
  }
}
