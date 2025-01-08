import { TestDatabase } from '../../../config/test.db';
import { mockPayments } from '../fixtures/mockData';
import { ResponseValidator } from './ResponseValidator';
import { PaginatedResponse } from '../../../types/common';
import { TestContext } from '../context/TestContext';
import { BankAccount } from '../../../types/payee';

export interface PayeeRecord {
  PayeeId: string;
  Name: string;
  Email: string;
  Phone: string;
  Status: string;
  CreatedBy: string;
  CreatedDate: Date;
  ModifiedBy?: string;
  ModifiedDate?: Date;
  DeletedBy?: string;
  DeletedDate?: Date;
  BankAccounts?: BankAccount[];
  TotalCount?: number;
}

export type PayeeResponse = PayeeRecord;

export interface GetPayeesOptions {
  status?: string;
  page?: number;
  pageSize?: number;
}

export interface PayeeCreateData {
  name: string;
  accountNumber: string;
  status?: string;
}

export interface PayeeUpdateData {
  name?: string;
  accountNumber?: string;
  status?: string;
}

export const mockPayees = {
  standard: {
    PayeeId: '1',
    Name: 'Standard Payee',
    Email: 'standard@example.com',
    Phone: '123-456-7890',
    Status: 'ACTIVE',
    CreatedBy: 'system',
    CreatedDate: new Date('2024-01-01'),
    ModifiedBy: undefined,
    ModifiedDate: undefined,
    DeletedBy: undefined,
    DeletedDate: undefined,
    BankAccounts: [{
      AccountId: '1',
      AccountNumber: '1234567890',
      RoutingNumber: '987654321',
      AccountType: 'CHECKING',
      Status: 'ACTIVE',
      CreatedBy: 'system',
      CreatedDate: new Date('2024-01-01')
    }]
  },
  inactive: {
    PayeeId: '2',
    Name: 'Inactive Payee',
    Email: 'inactive@example.com',
    Phone: '098-765-4321',
    Status: 'INACTIVE',
    CreatedBy: 'system',
    CreatedDate: new Date('2024-01-01'),
    ModifiedBy: 'system',
    ModifiedDate: new Date('2024-01-02'),
    DeletedBy: undefined,
    DeletedDate: undefined,
    BankAccounts: [{
      AccountId: '2',
      AccountNumber: '0987654321',
      RoutingNumber: '123456789',
      AccountType: 'SAVINGS',
      Status: 'ACTIVE',
      CreatedBy: 'system',
      CreatedDate: new Date('2024-01-01')
    }]
  }
};

export class PayeeTestHelper {
  static async setupPayeeMocks(testDb: TestDatabase) {
    // Setup PAYEE procedure for listing payees
    testDb.setMockResponse('PAYEE', (params) => {
      const page = params?.page || 1;
      const pageSize = params?.pageSize || 10;
      const payees = [mockPayees.standard, mockPayees.inactive];
      const totalCount = payees.length;
      
      const startIdx = (page - 1) * pageSize;
      const endIdx = startIdx + pageSize;
      const pagedPayees = payees.slice(startIdx, endIdx);
      
      return {
        recordset: pagedPayees.map(p => ({ ...p, TotalCount: totalCount })),
        recordsets: [pagedPayees],
        output: {},
        rowsAffected: [pagedPayees.length]
      };
    });

    // Setup ACTIVE_PAYMENTS procedure
    testDb.setMockResponse('ACTIVE_PAYMENTS', (params) => {
      const payee = Object.values(mockPayees).find(p => p.PayeeId === params.id);
      return {
        recordset: payee?.Status === 'ACTIVE' ? [{ count: 1 }] : [],
        recordsets: [[]],
        output: {},
        rowsAffected: [payee?.Status === 'ACTIVE' ? 1 : 0]
      };
    });

    // Setup PAYEE_GET procedure for getting a single payee
    testDb.setMockResponse('PAYEE_GET', (params) => {
      const payee = Object.values(mockPayees).find(p => p.PayeeId === params.id);
      return {
        recordset: payee ? [payee] : [],
        recordsets: [payee ? [payee] : []],
        output: {},
        rowsAffected: payee ? [1] : [0]
      };
    });

    // Setup PAYEE_CREATE procedure
    testDb.setMockResponse('PAYEE_CREATE', (params) => {
      const newPayee = {
        PayeeId: '3',
        Name: params.Name,
        Email: params.Email,
        Phone: params.Phone,
        Status: params.Status || 'ACTIVE',
        CreatedBy: 'system',
        CreatedDate: new Date(),
        ModifiedBy: undefined,
        ModifiedDate: undefined,
        DeletedBy: undefined,
        DeletedDate: undefined,
        BankAccounts: params.BankAccount ? [{
          AccountId: '3',
          AccountNumber: params.BankAccount.AccountNumber,
          RoutingNumber: params.BankAccount.RoutingNumber,
          AccountType: params.BankAccount.AccountType,
          Status: 'ACTIVE',
          CreatedBy: 'system',
          CreatedDate: new Date()
        }] : []
      };

      return {
        recordset: [newPayee],
        recordsets: [[newPayee]],
        output: {},
        rowsAffected: [1]
      };
    });

    // Setup PAYEE_UPDATE procedure
    testDb.setMockResponse('PAYEE_UPDATE', (params) => {
      const payee = Object.values(mockPayees).find(p => p.PayeeId === params.id);
      if (!payee) {
        return {
          recordset: [],
          recordsets: [[]],
          output: {},
          rowsAffected: [0]
        };
      }

      const updatedPayee = {
        ...payee,
        Name: params.Name || payee.Name,
        Email: params.Email || payee.Email,
        Phone: params.Phone || payee.Phone,
        Status: params.Status || payee.Status,
        ModifiedBy: 'system',
        ModifiedDate: new Date()
      };

      return {
        recordset: [updatedPayee],
        recordsets: [[updatedPayee]],
        output: {},
        rowsAffected: [1]
      };
    });

    // Setup PAYEE_DELETE procedure
    testDb.setMockResponse('PAYEE_DELETE', (params) => {
      const payee = Object.values(mockPayees).find(p => p.PayeeId === params.id);
      if (!payee) {
        return {
          recordset: [],
          recordsets: [[]],
          output: {},
          rowsAffected: [0]
        };
      }

      const deletedPayee = {
        ...payee,
        Status: 'DELETED',
        DeletedBy: params.deletedBy || 'system',
        DeletedDate: new Date()
      };

      return {
        recordset: [deletedPayee],
        recordsets: [[deletedPayee]],
        output: {},
        rowsAffected: [1]
      };
    });

    // Setup PAYEE_PAYMENT_CHECK procedure
    testDb.setMockResponse('PAYEE_PAYMENT_CHECK', (params) => {
      const payee = Object.values(mockPayees).find(p => p.PayeeId === params.id);
      return {
        recordset: [{ hasPayments: payee?.Status === 'ACTIVE' }],
        recordsets: [[{ hasPayments: payee?.Status === 'ACTIVE' }]],
        output: {},
        rowsAffected: [1]
      };
    });
  }

  static async getPayees(options: GetPayeesOptions = {}): Promise<PayeeResponse[]> {
    const response = await TestContext.getTestDatabase().executeProcedure('GetPayees', options);
    ResponseValidator.validatePaginatedResponse(response, options.page || 1, options.pageSize || 10);
    
    const payees = response.data;
    payees.forEach((payee: PayeeRecord) => {
      ResponseValidator.validateRequiredFields(payee, [
        'PayeeId',
        'Name',
        'Status'
      ] as Array<keyof PayeeRecord>);

      ResponseValidator.validateTimestamps(payee, ['createdDate']);
      
      if (payee.ModifiedDate) {
        ResponseValidator.validateTimestamps(payee, ['modifiedDate']);
      }
      
      if (payee.DeletedDate) {
        ResponseValidator.validateTimestamps(payee, ['deletedDate']);
      }
    });

    return payees;
  }

  static verifyListPayeesResponse(response: PaginatedResponse<PayeeRecord>) {
    expect(response).toBeDefined();
    expect(response.data).toBeDefined();
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.pagination).toBeDefined();
    expect(response.pagination.page).toBeDefined();
    expect(response.pagination.pageSize).toBeDefined();
    expect(response.pagination.total).toBeDefined();

    response.data.forEach(payee => {
      this.verifyPayeeResponse(payee);
    });
  }

  static verifyPayeeResponse(payee: PayeeRecord) {
    expect(payee).toBeDefined();
    expect(payee.PayeeId).toBeDefined();
    expect(payee.Name).toBeDefined();
    expect(payee.Status).toBeDefined();
    expect(payee.CreatedBy).toBeDefined();
    expect(payee.CreatedDate).toBeDefined();

    if (payee.ModifiedDate) {
      expect(payee.ModifiedBy).toBeDefined();
    }

    if (payee.DeletedDate) {
      expect(payee.DeletedBy).toBeDefined();
      expect(payee.Status).toBe('DELETED');
    }

    expect(['ACTIVE', 'INACTIVE', 'DELETED']).toContain(payee.Status);
  }
}

describe('PayeeHelper', () => {
  it.todo('should set up payee mocks');
  it.todo('should handle payee responses');
  it.todo('should validate payee data');
});
