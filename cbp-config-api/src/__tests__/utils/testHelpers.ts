import { sign } from 'jsonwebtoken';
import request from 'supertest';
import { app } from '../../server';
import { MockDatabase } from '../mocks/mockDb';

export const clearTestData = async () => {
  const mockDb = new MockDatabase();
  mockDb.reset();
};

export const authRequest = () => request(app);

// Token helpers
const JWT_SECRET = process.env.JWT_SECRET || 'test-secret';

export const getExpiredToken = async () => {
  return sign(
    { sub: 'test-user', exp: Math.floor(Date.now() / 1000) - 3600 },
    JWT_SECRET
  );
};

export const getClientToken = async (clientId: string) => {
  return sign(
    {
      sub: 'test-user',
      clientId,
      exp: Math.floor(Date.now() / 1000) + 3600
    },
    JWT_SECRET
  );
};

export const getNonAdminToken = async () => {
  return sign(
    {
      sub: 'test-user',
      roles: ['user'],
      exp: Math.floor(Date.now() / 1000) + 3600
    },
    JWT_SECRET
  );
};
