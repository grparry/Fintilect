import { TestDatabase } from '@/../../config/test.db';
import { Payment } from '@/../../helpers/payment.helper';
import { PaymentRecord } from '@/../../services/payment.service';

export const mockPayments = {
  standard: {
    PaymentId: 'payment-1',
    PayeeId: 'payee-1',
    Amount: 100.00,
    Currency: 'USD',
    Status: 'COMPLETED',
    EffectiveDate: new Date(),
    Description: 'Standard payment',
    CreatedBy: 'system',
    CreatedDate: new Date(),
    ModifiedDate: new Date(),
    ModifiedBy: 'system'
  } satisfies PaymentRecord,
  pending: {
    PaymentId: 'payment-2',
    PayeeId: 'payee-2',
    Amount: 200.00,
    Currency: 'USD',
    Status: 'PENDING',
    EffectiveDate: new Date(),
    Description: 'Pending payment',
    CreatedBy: 'system',
    CreatedDate: new Date(),
    ModifiedDate: new Date(),
    ModifiedBy: 'system'
  } satisfies PaymentRecord
};

const mockPaymentToInternal = (mock: PaymentRecord): Payment => ({
  id: parseInt(mock.PaymentId.split('-')[1]),
  amount: mock.Amount,
  status: mock.Status.toLowerCase(),
  description: mock.Description || '',
  createdDate: mock.CreatedDate,
  modifiedDate: mock.ModifiedDate || mock.CreatedDate // Fallback to CreatedDate if ModifiedDate is undefined
});

export class PaymentTestHelper {
  static setupPaymentMocks(testDb: TestDatabase) {
    const mockPayment = mockPaymentToInternal(mockPayments.standard);

    // Helper layer mocks
    testDb.setMockResponse('GetPayments()', () => ({
      recordset: [mockPayment],
      recordsets: [[mockPayment]],
      output: {},
      rowsAffected: [1]
    }));

    testDb.setMockResponse('GetPaymentDetails($1)', (params: any) => {
      const id = params[0];
      return {
        recordset: id === -1 ? [] : [mockPayment],
        recordsets: id === -1 ? [[]] : [[mockPayment]],
        output: {},
        rowsAffected: [id === -1 ? 0 : 1]
      };
    });

    testDb.setMockResponse('InsertPayment($1, $2, $3)', (params: any) => {
      const [amount, status, description] = params;
      const newPayment = {
        ...mockPayment,
        amount,
        status,
        description
      };
      return {
        recordset: [newPayment],
        recordsets: [[newPayment]],
        output: {},
        rowsAffected: [1]
      };
    });

    testDb.setMockResponse('UpdatePayment($1, $2, $3, $4)', (params: any) => {
      const [id, amount, status, description] = params;
      if (id === -1) {
        return {
          recordset: [],
          recordsets: [[]],
          output: {},
          rowsAffected: [0]
        };
      }
      const updatedPayment = {
        ...mockPayment,
        amount: amount || mockPayment.amount,
        status: status || mockPayment.status,
        description: description || mockPayment.description
      };
      return {
        recordset: [updatedPayment],
        recordsets: [[updatedPayment]],
        output: {},
        rowsAffected: [1]
      };
    });

    testDb.setMockResponse('DeletePayment($1)', (params: any) => {
      const [id] = params;
      return {
        recordset: [],
        recordsets: [[]],
        output: {},
        rowsAffected: [id === -1 ? 0 : 1]
      };
    });

    // Service layer mocks
    testDb.setMockResponse('PAYMENT', (params: any) => {
      const { page, pageSize } = params;
      const records = [
        { ...mockPayments.standard, TotalCount: 2 },
        { ...mockPayments.pending, TotalCount: 2 }
      ];
      return {
        recordset: records,
        recordsets: [records],
        output: {},
        rowsAffected: [2]
      };
    });

    testDb.setMockResponse('PAYMENT_GET', (params: any) => {
      const { id } = params;
      const payment = id === mockPayments.standard.PaymentId ? mockPayments.standard : null;
      return {
        recordset: payment ? [payment] : [],
        recordsets: payment ? [[payment]] : [[]],
        output: {},
        rowsAffected: payment ? [1] : [0]
      };
    });

    testDb.setMockResponse('INSERT_PAYMENT', (params: any) => {
      const { payeeId, amount, currency, description, status } = params;
      const newPayment: PaymentRecord = {
        PaymentId: 'payment-new',
        PayeeId: payeeId,
        Amount: amount,
        Currency: currency,
        Status: status.toUpperCase(),
        EffectiveDate: new Date(),
        Description: description,
        CreatedBy: 'system',
        CreatedDate: new Date(),
        ModifiedDate: new Date(),
        ModifiedBy: 'system'
      };
      return {
        recordset: [newPayment],
        recordsets: [[newPayment]],
        output: {},
        rowsAffected: [1]
      };
    });

    testDb.setMockResponse('UPDATE_PAYMENT', (params: any) => {
      const { id, amount, description } = params;
      if (id === 'nonexistent') {
        return {
          recordset: [],
          recordsets: [[]],
          output: {},
          rowsAffected: [0]
        };
      }
      const updatedPayment: PaymentRecord = {
        ...mockPayments.standard,
        Amount: amount || mockPayments.standard.Amount,
        Description: description || mockPayments.standard.Description,
        ModifiedDate: new Date(),
        ModifiedBy: 'system'
      };
      return {
        recordset: [updatedPayment],
        recordsets: [[updatedPayment]],
        output: {},
        rowsAffected: [1]
      };
    });

    testDb.setMockResponse('DELETE_PAYMENT', (params: any) => {
      const { id } = params;
      return {
        recordset: [],
        recordsets: [[]],
        output: {},
        rowsAffected: [id === 'nonexistent' ? 0 : 1]
      };
    });
  }
}

describe('PaymentHelper', () => {
  it.todo('should set up payment mocks');
  it.todo('should handle payment responses');
  it.todo('should validate payment data');
});
