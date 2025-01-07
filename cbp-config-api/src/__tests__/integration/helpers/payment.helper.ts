import { TestDb } from '../../../config/test.db';
import { mockPayments, createMockPayment } from '../fixtures/mockData';
import { PaymentResponse } from '../../../services/payment.service';
import { ResponseValidator } from './ResponseValidator';

export class PaymentTestHelper {
  static setupPaymentMocks(testDb: TestDb) {
    // List payments mock with pagination
    testDb.setMockResponse('GetPayments', (params: any) => {
      const { page = 1, pageSize = 10 } = params;
      const payments = [mockPayments.pending, mockPayments.approved];
      const total = payments.length;
      return {
        recordset: payments.slice((page - 1) * pageSize, page * pageSize),
        recordsets: [],
        output: {},
        rowsAffected: [total]
      };
    });

    // Get payment mock - returns single record
    testDb.setMockResponse('GetPaymentDetails', (params: any) => {
      const { id } = params;
      const payment = id === mockPayments.pending.PaymentId ? mockPayments.pending :
                     id === mockPayments.approved.PaymentId ? mockPayments.approved : null;
      return {
        recordset: payment ? [payment] : [],
        recordsets: [],
        output: {},
        rowsAffected: [payment ? 1 : 0]
      };
    });

    // Create payment mock - returns single record
    testDb.setMockResponse('InsertPayment', (params: any) => {
      const newPayment = createMockPayment({
        Amount: params.amount,
        Description: params.description,
        EffectiveDate: params.effectiveDate,
        CreatedBy: params.createdBy
      });
      return {
        recordset: [newPayment],
        recordsets: [],
        output: {},
        rowsAffected: [1]
      };
    });

    // Update payment mock - returns single record
    testDb.setMockResponse('UpdatePayment', (params: any) => {
      const { id, ...updates } = params;
      const basePayment = mockPayments.pending;
      const updatedPayment = {
        ...basePayment,
        ...updates,
        ModifiedDate: new Date(),
      };
      return {
        recordset: [updatedPayment],
        recordsets: [],
        output: {},
        rowsAffected: [1]
      };
    });

    // Delete payment mock - returns affected rows
    testDb.setMockResponse('DeletePayment', (params: any) => {
      return {
        recordset: [],
        recordsets: [],
        output: {},
        rowsAffected: [1]
      };
    });
  }

  static verifyListPaymentsResponse(response: PaymentResponse[], page: number, pageSize: number) {
    ResponseValidator.validateArrayResponse(response);
    response.forEach(payment => this.verifyPaymentResponse(payment));
  }

  static verifyGetPaymentResponse(response: PaymentResponse | null, expectNull = false) {
    ResponseValidator.validateSingletonResponse(response, expectNull);
    if (!expectNull && response) {
      this.verifyPaymentResponse(response);
    }
  }

  static verifyCreatePaymentResponse(response: PaymentResponse) {
    ResponseValidator.validateSingletonResponse(response);
    this.verifyPaymentResponse(response);
    expect(response.status).toBe('pending');
  }

  static verifyUpdatePaymentResponse(response: PaymentResponse) {
    ResponseValidator.validateSingletonResponse(response);
    this.verifyPaymentResponse(response);
    expect(response.updatedAt).toBeDefined();
  }

  static verifyDeletePaymentResponse(response: void) {
    ResponseValidator.validateVoidResponse(response);
  }

  private static verifyPaymentResponse(payment: PaymentResponse) {
    expect(payment).toHaveProperty('id');
    expect(payment).toHaveProperty('payeeId');
    expect(payment).toHaveProperty('amount');
    expect(payment).toHaveProperty('currency');
    expect(payment).toHaveProperty('status');
    expect(payment).toHaveProperty('effectiveDate');
    expect(payment).toHaveProperty('createdBy');
    expect(payment).toHaveProperty('createdAt');
  }

  static verifyPaymentFlow(payment: PaymentResponse, expectedStatus: string) {
    this.verifyPaymentResponse(payment);
    expect(payment.status).toBe(expectedStatus);
    
    if (expectedStatus === 'approved') {
      expect(payment.updatedBy).toBeDefined();
      expect(payment.updatedAt).toBeDefined();
    }
  }
}
