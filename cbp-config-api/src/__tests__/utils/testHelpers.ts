import { Express } from 'express';
import app from '../../app';
import { Database } from '../../config/db';
import jwt from 'jsonwebtoken';
import { ConnectionPool } from 'mssql';

export class MockDatabase implements Database {
  executeProc = jest.fn();
  executeProcWithTransaction = jest.fn();
  executeStoredProcedure = jest.fn();
  executeQuery = jest.fn();
  beginTransaction = jest.fn();
  commitTransaction = jest.fn();
  rollbackTransaction = jest.fn();
  connect = jest.fn();
  disconnect = jest.fn();
  close = jest.fn();
}

export interface MockUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MockClient {
  ClientId: string;
  Name: string;
  Type: string;
  Status: string;
  Environment: string;
  CreatedAt: Date;
  UpdatedAt: Date;
  Settings?: {
    general: {
      timezone: string;
      dateFormat: string;
      currency: string;
      language: string;
    };
    security: {
      passwordMinLength: number;
      maxLoginAttempts: number;
      sessionTimeout: number;
      ipWhitelist: string[];
    };
    notifications: {
      frequency: string;
      alertTypes: string[];
    };
  };
}

export const mockUserData: MockUser = {
  id: 'test_user_1',
  email: 'test@example.com',
  firstName: 'Test',
  lastName: 'User',
  role: 'admin',
  status: 'active',
  createdAt: new Date(),
  updatedAt: new Date()
};

export const mockClientData: MockClient = {
  ClientId: 'test_client_1',
  Name: 'Test Client',
  Type: 'enterprise',
  Status: 'active',
  Environment: 'production',
  CreatedAt: new Date(),
  UpdatedAt: new Date(),
  Settings: {
    general: {
      timezone: 'UTC',
      dateFormat: 'YYYY-MM-DD',
      currency: 'USD',
      language: 'en'
    },
    security: {
      passwordMinLength: 8,
      maxLoginAttempts: 3,
      sessionTimeout: 30,
      ipWhitelist: ['127.0.0.1']
    },
    notifications: {
      frequency: 'daily',
      alertTypes: ['email', 'sms']
    }
  }
};

export const mockDbPool = {
  request: jest.fn().mockReturnThis(),
  input: jest.fn().mockReturnThis(),
  execute: jest.fn(),
  query: jest.fn(),
  close: jest.fn()
} as unknown as ConnectionPool;

export async function setupTestApp(): Promise<Express> {
  return app;
}

export async function teardownTestApp(app: Express): Promise<void> {
  // Cleanup logic if needed
}

const JWT_SECRET = process.env.JWT_SECRET || 'test-secret';

export function generateTestToken(userData: any): string {
  return jwt.sign(userData, JWT_SECRET, { expiresIn: '1h' });
}

export const client1Token = generateTestToken({ ...mockUserData, role: 'client' });
export const adminToken = generateTestToken({ ...mockUserData, role: 'admin' });
export const nonAdminToken = generateTestToken({ ...mockUserData, role: 'user' });
export const expiredToken = 'expired.test.token';
