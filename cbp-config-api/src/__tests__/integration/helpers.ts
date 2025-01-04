import { Application } from 'express';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import { app } from '../../server';

export const testApp: Application = app;

interface TestUser {
  id: string;
  roles: string[];
  permissions: string[];
}

export const createTestToken = (user: TestUser): string => {
  return jwt.sign(
    {
      sub: user.id,
      roles: user.roles,
      permissions: user.permissions
    },
    process.env.JWT_SECRET || 'test_secret',
    { expiresIn: '1h' }
  );
};

export const testUsers = {
  admin: {
    id: 'admin-user',
    roles: ['admin'],
    permissions: ['MANAGE_PAYMENTS', 'MANAGE_PAYEES', 'MANAGE_HOST_CONNECTION']
  },
  regular: {
    id: 'regular-user',
    roles: ['user'],
    permissions: ['VIEW_PAYMENTS', 'VIEW_PAYEES']
  }
};

export const authRequest = (user: TestUser = testUsers.regular) => {
  const token = createTestToken(user);
  return request(testApp).set('Authorization', `Bearer ${token}`);
};

export const clearTestData = async () => {
  // Add cleanup logic if needed
};
