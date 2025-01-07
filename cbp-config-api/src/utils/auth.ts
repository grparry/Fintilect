import jwt from 'jsonwebtoken';
import { HttpError } from './errors';
import { JwtUser } from '../types/user';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

export interface TokenPayload {
  id: string;
  role: string;
  permissions: string[];
}

export const generateToken = (payload: JwtUser): string => {
  try {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  } catch (error) {
    throw new HttpError(500, 'Error generating token');
  }
};

export const verifyToken = (token: string): JwtUser => {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtUser;
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new HttpError(401, 'Invalid token');
    }
    throw new HttpError(500, 'Error verifying token');
  }
};

export const extractToken = (authHeader: string | undefined): string => {
  if (!authHeader) {
    throw new HttpError(401, 'No authorization header');
  }

  const [type, token] = authHeader.split(' ');
  if (type !== 'Bearer' || !token) {
    throw new HttpError(401, 'Invalid authorization header');
  }

  return token;
};
