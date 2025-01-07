import request from 'supertest';
import { Express } from 'express';
import jwt from 'jsonwebtoken';
import app from '../../app';
import { Database } from '../../config/db';
import { TestDb } from '../../config/test.db';
import { HttpError } from '../../utils/errors';

const testDb = new TestDb();

const JWT_SECRET = process.env.JWT_SECRET || 'test-secret';

export const createTestUser = async () => {
  const user = {
    id: '1',
    email: 'test@example.com',
    roles: ['user']
  };

  const token = jwt.sign(user, JWT_SECRET, { expiresIn: '1h' });

  return {
    user,
    token
  };
};

export const createTestAdmin = async () => {
  const admin = {
    id: '2',
    email: 'admin@example.com',
    roles: ['admin']
  };

  const token = jwt.sign(admin, JWT_SECRET, { expiresIn: '1h' });

  return {
    user: admin,
    token
  };
};

export const getAuthHeader = (token: string) => ({
  Authorization: `Bearer ${token}`
});

export const setupTestDb = async () => {
  try {
    // User mocks
    testDb.setMockResponse('GetUsers', () => [{
      id: '1',
      email: 'test@example.com',
      roles: ['user']
    }]);

    testDb.setMockResponse('GetUserById', () => [{
      id: '2',
      email: 'admin@example.com',
      roles: ['admin']
    }]);

    // Client mocks
    testDb.setMockResponse('CLIENT', (params: any) => {
      const page = Number(params.page) || 1;
      const pageSize = Number(params.pageSize) || 10;

      if (isNaN(page) || page < 1) {
        throw new HttpError(400, 'Invalid page number');
      }

      if (isNaN(pageSize) || pageSize < 1 || pageSize > 100) {
        throw new HttpError(400, 'Invalid page size');
      }

      const clients = [
        {
          id: 1,
          name: 'Test Client 1',
          email: 'client1@example.com',
          status: 'active',
          TotalCount: 2
        },
        {
          id: 2,
          name: 'Test Client 2',
          email: 'client2@example.com',
          status: 'active',
          TotalCount: 2
        }
      ];

      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const paginatedClients = clients.slice(start, end);

      return {
        recordset: paginatedClients.map(client => ({
          ...client,
          TotalCount: clients.length
        }))
      };
    });

    testDb.setMockResponse('CLIENT_GET', (params: any) => {
      const id = Number(params.id);
      if (isNaN(id)) {
        throw new HttpError(400, 'Invalid client ID');
      }
      if (id === 1) {
        return {
          recordset: [{
            id: 1,
            name: 'Test Client 1',
            email: 'client1@example.com',
            status: 'active'
          }]
        };
      }
      throw new HttpError(404, 'Client not found');
    });

    testDb.setMockResponse('CLIENT_CREATE', (params: any) => {
      if (!params.name || !params.email) {
        throw new HttpError(400, 'Missing required fields');
      }
      return {
        recordset: [{
          id: 3,
          name: params.name,
          email: params.email,
          status: 'active',
          createdAt: new Date().toISOString()
        }]
      };
    });

    testDb.setMockResponse('CLIENT_UPDATE', (params: any) => {
      const id = Number(params.id);
      if (isNaN(id)) {
        throw new HttpError(400, 'Invalid client ID');
      }
      if (id === 1) {
        return {
          recordset: [{
            id: params.id,
            name: params.name,
            email: params.email,
            status: 'active',
            updatedAt: new Date().toISOString()
          }]
        };
      }
      throw new HttpError(404, 'Client not found');
    });

    testDb.setMockResponse('CLIENT_DELETE', (params: any) => {
      const id = Number(params.id);
      if (isNaN(id)) {
        throw new HttpError(400, 'Invalid client ID');
      }
      if (id === 1) {
        return {
          recordset: [{ affected: 1 }]
        };
      }
      throw new HttpError(404, 'Client not found');
    });

    testDb.setMockResponse('CLIENT_SETTINGS_GET', (params: any) => {
      const id = Number(params.id);
      if (isNaN(id)) {
        throw new HttpError(400, 'Invalid client ID');
      }
      if (id === 1) {
        return {
          recordset: [{
            clientId: params.id,
            notifications: true,
            language: 'en',
            theme: 'light'
          }]
        };
      }
      throw new HttpError(404, 'Client settings not found');
    });

    testDb.setMockResponse('CLIENT_SETTINGS_UPDATE', (params: any) => {
      const id = Number(params.id);
      if (isNaN(id)) {
        throw new HttpError(400, 'Invalid client ID');
      }
      if (!params.language || !params.theme) {
        throw new HttpError(400, 'Missing required fields');
      }
      if (id === 1) {
        return {
          recordset: [{
            clientId: params.id,
            notifications: params.notifications,
            language: params.language,
            theme: params.theme
          }]
        };
      }
      throw new HttpError(404, 'Client settings not found');
    });

    // Payee mocks
    testDb.setMockResponse('GetPayeeOptions', (params: any) => {
      if (params.payeeId === '999999' || params.payeeId === 999999) {
        return [];
      }
      
      return [{
        defaultPaymentMethod: 'ACH',
        allowedPaymentMethods: ['ACH', 'WIRE'],
        paymentLimits: {
          daily: 1000,
          weekly: 5000,
          monthly: 20000
        },
        autoPayEnabled: true,
        notificationPreferences: {
          email: true,
          sms: false
        }
      }];
    });

    // Payment mocks
    testDb.setMockResponse('GetPayments', (params: any) => {
      const offset = parseInt(params.offset) || 0;
      const pageSize = parseInt(params.pageSize) || 10;

      if (isNaN(pageSize) || pageSize < 1 || pageSize > 100) {
        throw new Error('Invalid page size');
      }

      const payments = [{
        PaymentId: '1',
        PayeeId: '1',
        Amount: 1000,
        Currency: 'USD',
        Status: 'pending',
        EffectiveDate: new Date(),
        Description: 'Test payment 1',
        Reference: 'REF001',
        CreatedBy: 'admin',
        CreatedDate: new Date(),
        ModifiedBy: null,
        ModifiedDate: null,
        ClearedDate: null
      },
      {
        PaymentId: '2',
        PayeeId: '2',
        Amount: 2000,
        Currency: 'USD',
        Status: 'cleared',
        EffectiveDate: new Date(),
        Description: 'Test payment 2',
        Reference: 'REF002',
        CreatedBy: 'admin',
        CreatedDate: new Date(),
        ModifiedBy: 'admin',
        ModifiedDate: new Date(),
        ClearedDate: new Date()
      }];

      return payments.slice(offset, offset + pageSize);
    });

    testDb.setMockResponse('GetPaymentDetails', (params: any) => {
      if (params.id === '1' || params.id === 1) {
        return [{
          PaymentId: '1',
          PayeeId: '1',
          Amount: 1000,
          Currency: 'USD',
          Status: 'pending',
          EffectiveDate: new Date(),
          Description: 'Test payment 1',
          Reference: 'REF001',
          CreatedBy: 'admin',
          CreatedDate: new Date(),
          ModifiedBy: null,
          ModifiedDate: null,
          ClearedDate: null
        }];
      }
      return [];
    });

    testDb.setMockResponse('InsertPayment', (params: any) => {
      return [{
        PaymentId: '3',
        PayeeId: params.payeeId,
        Amount: params.amount,
        Currency: params.currency || 'USD',
        Status: 'pending',
        EffectiveDate: params.effectiveDate || new Date(),
        Description: params.description,
        Reference: params.reference || 'REF003',
        CreatedBy: 'admin',
        CreatedDate: new Date(),
        ModifiedBy: null,
        ModifiedDate: null,
        ClearedDate: null
      }];
    });

    testDb.setMockResponse('UpdatePaymentDetails', (params: any) => {
      if (params.id === '1' || params.id === 1) {
        return [{
          PaymentId: '1',
          PayeeId: '1',
          Amount: params.amount || 1000,
          Currency: params.currency || 'USD',
          Status: params.status || 'pending',
          EffectiveDate: params.effectiveDate || new Date(),
          Description: params.description || 'Test payment 1',
          Reference: params.reference || 'REF001',
          CreatedBy: 'admin',
          CreatedDate: new Date(),
          ModifiedBy: 'admin',
          ModifiedDate: new Date(),
          ClearedDate: null
        }];
      }
      return [];
    });

    testDb.setMockResponse('DeletePayment', (params: any) => {
      if (params.id === '1' || params.id === 1) {
        return [{ success: true }];
      }
      return [];
    });

    testDb.setMockResponse('GetPaymentStatus', (params: any) => {
      if (params.id === '1' || params.id === 1) {
        return [{
          PaymentId: '1',
          Status: 'pending',
          ModifiedDate: new Date()
        }];
      }
      return [];
    });

    testDb.setMockResponse('GetClearedPayments', (params: any) => {
      const startDate = new Date(params.startDate);
      const endDate = new Date(params.endDate);

      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        throw new Error('Invalid date range');
      }

      return [{
        PaymentId: '2',
        PayeeId: '2',
        Amount: 2000,
        Currency: 'USD',
        Status: 'cleared',
        EffectiveDate: new Date(),
        Description: 'Test payment 2',
        Reference: 'REF002',
        CreatedBy: 'admin',
        CreatedDate: new Date(),
        ModifiedBy: 'admin',
        ModifiedDate: new Date(),
        ClearedDate: new Date()
      }];
    });

    testDb.setMockResponse('ApprovePayment', (params: any) => {
      if (params.id === '1' || params.id === 1) {
        return [{
          PaymentId: '1',
          PayeeId: '1',
          Amount: 1000,
          Currency: 'USD',
          Status: 'approved',
          EffectiveDate: new Date(),
          Description: 'Test payment 1',
          Reference: 'REF001',
          CreatedBy: 'admin',
          CreatedDate: new Date(),
          ModifiedBy: 'admin',
          ModifiedDate: new Date(),
          ClearedDate: null
        }];
      }
      return [];
    });

    testDb.setMockResponse('RejectPayment', (params: any) => {
      if (params.id === '1' || params.id === 1) {
        return [{
          PaymentId: '1',
          PayeeId: '1',
          Amount: 1000,
          Currency: 'USD',
          Status: 'rejected',
          EffectiveDate: new Date(),
          Description: 'Test payment 1',
          Reference: 'REF001',
          CreatedBy: 'admin',
          CreatedDate: new Date(),
          ModifiedBy: 'admin',
          ModifiedDate: new Date(),
          ClearedDate: null,
          Reason: params.reason
        }];
      }
      return [];
    });

    // Host info mock
    testDb.setMockResponse('GetHostInfo', () => [{
      name: 'Test Host',
      connectionStatus: 'connected',
      lastConnectionTime: new Date().toISOString(),
      features: ['payments', 'reporting']
    }]);

    // Payee options mock
    testDb.setMockResponse('GetPayeeOptions', (params: any) => {
      if (params.payeeId === '999999' || params.payeeId === 999999) {
        return [];
      }
      
      return [{
        defaultPaymentMethod: 'ACH',
        allowedPaymentMethods: ['ACH', 'WIRE'],
        paymentLimits: {
          daily: 1000,
          weekly: 5000,
          monthly: 20000
        },
        autoPayEnabled: true,
        notificationPreferences: {
          email: true,
          sms: false
        }
      }];
    });

    // Update payee options mock
    testDb.setMockResponse('UpdatePayeeOptions', (params: any) => {
      return [{
        defaultPaymentMethod: params.defaultPaymentMethod || 'ACH',
        allowedPaymentMethods: params.allowedPaymentMethods || ['ACH', 'CHECK'],
        paymentLimits: {
          daily: params.paymentLimits?.daily || 1000,
          weekly: params.paymentLimits?.weekly || 5000,
          monthly: params.paymentLimits?.monthly || 20000
        },
        autoPayEnabled: params.autoPayEnabled !== undefined ? params.autoPayEnabled : true,
        notificationPreferences: {
          email: params.notificationPreferences?.email !== undefined ? params.notificationPreferences.email : true,
          sms: params.notificationPreferences?.sms !== undefined ? params.notificationPreferences.sms : false
        }
      }];
    });

  } catch (error) {
    console.error('Error setting up test database:', error);
    throw error;
  }
};

export const cleanupTestDb = async () => {
  try {
    testDb.clearMockResponses();
  } catch (error) {
    console.error('Error cleaning up test database:', error);
    throw error;
  }
};

export const testApp = app;
