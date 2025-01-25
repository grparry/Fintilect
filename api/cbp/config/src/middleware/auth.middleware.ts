import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { HttpError } from '../utils/errors';
import { logger } from '../config/logger';
import { JwtUser } from '../types/user';

declare module 'express' {
  interface Request {
    user?: JwtUser;
  }
}

// Get JWT secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'test-secret';  // Match the test secret

// Extract token from request headers
const extractToken = (req: Request): string | null => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;

  const [type, token] = authHeader.split(' ');
  return type === 'Bearer' ? token : null;
};

// Verify JWT token
const verifyToken = (token: string): JwtUser => {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtUser;
  } catch (error) {
    throw new HttpError(401, 'Invalid token');
  }
};

// Authentication middleware
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = extractToken(req);
    if (!token) {
      throw new HttpError(401, 'No token provided');
    }

    const user = verifyToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

// Authorization middleware
export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      if (!user) {
        throw new HttpError(401, 'User not authenticated');
      }

      const hasRole = roles.some(role => user.roles.includes(role));
      if (!hasRole) {
        throw new HttpError(403, 'Insufficient permissions');
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
