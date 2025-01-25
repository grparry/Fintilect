import request from 'supertest';
import { Express } from 'express';
import jwt from 'jsonwebtoken';
import app from '../../app';
import { Database } from '../../config/db';
import { TestDatabase, testDb } from '../../config/test.db';
import { HttpError } from '../../utils/errors';

const testDatabase = testDb;

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
    testDatabase.setMockResponse('GetUsers', () => [{
      id: '1',
      email: 'test@example.com',
      roles: ['user']
    }]);

    testDatabase.setMockResponse('GetUserById', () => [{
      id: '2',
      email: 'admin@example.com',
      roles: ['admin']
    }]);

    // Client mocks
    testDatabase.setMockResponse('CLIENT', (params: any) => {
      const page = Number(params.page) || 1;
      const pageSize = Number(params.pageSize) || 10;

      const clients = [
        {
          ClientId: '1',
          Name: 'Test Client 1',
          Email: 'client1@example.com',
          Phone: '123-456-7890',
          Status: 'active',
          CreatedBy: 'system',
          CreatedDate: new Date(),
          Settings: {
            paymentLimits: {
              daily: 10000,
              transaction: 5000
            },
            paymentMethods: ['ach', 'wire'],
            features: {
              bulkPayments: true,
              scheduledPayments: true
            }
          },
          TotalCount: 2
        },
        {
          ClientId: '2',
          Name: 'Test Client 2',
          Email: 'client2@example.com',
          Phone: '987-654-3210',
          Status: 'active',
          CreatedBy: 'system',
          CreatedDate: new Date(),
          Settings: {
            paymentLimits: {
              daily: 20000,
              transaction: 10000
            },
            paymentMethods: ['ach', 'wire', 'check'],
            features: {
              bulkPayments: true,
              scheduledPayments: true,
              priorityProcessing: true
            }
          },
          TotalCount: 2
        }
      ];

      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const paginatedClients = clients.slice(start, end);

      return {
        recordset: paginatedClients,
        recordsets: [paginatedClients],
        output: {},
        rowsAffected: [paginatedClients.length]
      };
    });

    testDatabase.setMockResponse('CLIENT_GET', (params: any) => {
      const { id } = params;
      const client = {
        ClientId: id,
        Name: 'Test Client',
        Email: 'client@example.com',
        Phone: '123-456-7890',
        Status: 'active',
        CreatedBy: 'system',
        CreatedDate: new Date(),
        Settings: {
          paymentLimits: {
            daily: 10000,
            transaction: 5000
          },
          paymentMethods: ['ach', 'wire'],
          features: {
            bulkPayments: true,
            scheduledPayments: true
          }
        }
      };

      return {
        recordset: [client],
        recordsets: [[client]],
        output: {},
        rowsAffected: [1]
      };
    });

    testDatabase.setMockResponse('CLIENT_CREATE', (params: any) => {
      const newClient = {
        ClientId: String(Date.now()),
        Name: params.name,
        Email: params.email,
        Phone: params.phone || '123-456-7890',
        Status: 'active',
        CreatedBy: 'system',
        CreatedDate: new Date(),
        Settings: params.settings || {
          paymentLimits: {
            daily: 10000,
            transaction: 5000
          },
          paymentMethods: ['ach'],
          features: {
            bulkPayments: true
          }
        }
      };

      return {
        recordset: [newClient],
        recordsets: [[newClient]],
        output: {},
        rowsAffected: [1]
      };
    });

    testDatabase.setMockResponse('CLIENT_UPDATE', (params: any) => {
      const { id, ...updates } = params;
      const updatedClient = {
        ClientId: id,
        Name: updates.name || 'Test Client',
        Email: updates.email || 'client@example.com',
        Phone: updates.phone || '123-456-7890',
        Status: updates.status || 'active',
        CreatedBy: 'system',
        CreatedDate: new Date(),
        ModifiedBy: 'system',
        ModifiedDate: new Date(),
        Settings: updates.settings || {
          paymentLimits: {
            daily: 10000,
            transaction: 5000
          },
          paymentMethods: ['ach', 'wire'],
          features: {
            bulkPayments: true,
            scheduledPayments: true
          }
        }
      };

      return {
        recordset: [updatedClient],
        recordsets: [[updatedClient]],
        output: {},
        rowsAffected: [1]
      };
    });

    testDatabase.setMockResponse('CLIENT_DELETE', (params: any) => {
      return {
        recordset: [],
        recordsets: [[]],
        output: {},
        rowsAffected: [1]
      };
    });

    testDatabase.setMockResponse('CLIENT_SETTINGS_GET', (params: any) => {
      const { id } = params;
      const settings = {
        ClientId: id,
        Settings: {
          paymentLimits: {
            daily: 10000,
            transaction: 5000
          },
          paymentMethods: ['ach', 'wire'],
          features: {
            bulkPayments: true,
            scheduledPayments: true
          }
        }
      };

      return {
        recordset: [settings],
        recordsets: [[settings]],
        output: {},
        rowsAffected: [1]
      };
    });

    testDatabase.setMockResponse('CLIENT_SETTINGS_UPDATE', (params: any) => {
      const { id, settings } = params;
      const updatedSettings = {
        ClientId: id,
        Settings: settings
      };

      return {
        recordset: [updatedSettings],
        recordsets: [[updatedSettings]],
        output: {},
        rowsAffected: [1]
      };
    });

    // Payee mocks
    testDatabase.setMockResponse('GetPayeeOptions', (params: any) => {
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
    testDatabase.setMockResponse('GetPayments', (params: any) => {
      const page = Number(params.page) || 1;
      const pageSize = Number(params.pageSize) || 10;

      if (isNaN(page) || page < 1) {
        throw new HttpError(400, 'Invalid page number');
      }

      const payments = [
        {
          id: '1',
          payeeId: '1',
          amount: 1000,
          currency: 'USD',
          status: 'pending',
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          payeeId: '2',
          amount: 2000,
          currency: 'USD',
          status: 'approved',
          createdAt: new Date().toISOString()
        }
      ];

      return {
        recordset: payments,
        recordsets: [],
        rowsAffected: [payments.length]
      };
    });

    testDatabase.setMockResponse('GetPaymentDetails', (params: any) => {
      const id = params.id;
      if (id === '1') {
        return {
          recordset: [{
            id: '1',
            payeeId: '1',
            amount: 1000,
            currency: 'USD',
            status: 'pending',
            createdAt: new Date().toISOString()
          }],
          recordsets: [],
          rowsAffected: [1]
        };
      }
      return { recordset: [], recordsets: [], rowsAffected: [0] };
    });

    testDatabase.setMockResponse('InsertPayment', (params: any) => {
      if (!params.payeeId || !params.amount) {
        throw new HttpError(400, 'Missing required fields');
      }
      return {
        recordset: [{
          id: '3',
          payeeId: params.payeeId,
          amount: params.amount,
          currency: params.currency || 'USD',
          status: 'pending',
          createdAt: new Date().toISOString()
        }],
        recordsets: [],
        rowsAffected: [1]
      };
    });

    testDatabase.setMockResponse('UpdatePayment', (params: any) => {
      const id = params.id;
      if (id === '1') {
        return {
          recordset: [{
            id: '1',
            payeeId: '1',
            amount: params.amount || 1000,
            currency: params.currency || 'USD',
            status: params.status || 'pending',
            description: params.description,
            updatedAt: new Date().toISOString()
          }],
          recordsets: [],
          rowsAffected: [1]
        };
      }
      return { recordset: [], recordsets: [], rowsAffected: [0] };
    });

    testDatabase.setMockResponse('DeletePayment', (params: any) => {
      const id = params.id;
      if (id === '1') {
        return { recordset: [], recordsets: [], rowsAffected: [1] };
      }
      return { recordset: [], recordsets: [], rowsAffected: [0] };
    });

    testDatabase.setMockResponse('GetPaymentStatus', (params: any) => {
      if (params.id === '1' || params.id === 1) {
        return [{
          PaymentId: '1',
          Status: 'pending',
          ModifiedDate: new Date()
        }];
      }
      return [];
    });

    testDatabase.setMockResponse('GetClearedPayments', (params: any) => {
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

    testDatabase.setMockResponse('ApprovePayment', (params: any) => {
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

    testDatabase.setMockResponse('RejectPayment', (params: any) => {
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
    testDatabase.setMockResponse('GetHostInfo', () => [{
      name: 'Test Host',
      connectionStatus: 'connected',
      lastConnectionTime: new Date().toISOString(),
      features: ['payments', 'reporting']
    }]);

    // Payee options mock
    testDatabase.setMockResponse('GetPayeeOptions', (params: any) => {
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
    testDatabase.setMockResponse('UpdatePayeeOptions', (params: any) => {
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
    testDatabase.clearMockResponses();
  } catch (error) {
    console.error('Error cleaning up test database:', error);
    throw error;
  }
};

export const testApp = app;
