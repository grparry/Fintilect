import { manualPaymentService } from '../manual-payment.service';
import { paymentApi } from '../api/payment.api';
import {
  ManualPayment,
  ManualPaymentFormData,
  ManualPaymentValidation,
  Client,
  Payee,
  PaymentType,
  PaymentMethod,
  PaymentStatus,
  Payment,
  Priority
} from '../../types/bill-pay.types';

jest.mock('../api/payment.api');

describe('ManualPaymentService', () => {
  const mockClient: Client = {
    id: 'client-123',
    name: 'Test Client',
    status: 'active',
    createdAt: '2025-01-08T11:20:00Z',
    updatedAt: '2025-01-08T11:20:00Z'
  };

  const mockPayee: Payee = {
    id: 'payee-123',
    clientId: 'client-123',
    name: 'Test Payee',
    accountNumber: '123456789',
    routingNumber: '987654321',
    bankName: 'Test Bank',
    status: 'active',
    createdAt: '2025-01-08T11:20:00Z',
    updatedAt: '2025-01-08T11:20:00Z'
  };

  const mockPayment: Payment = {
    id: 'payment-123',
    clientId: mockClient.id,
    clientName: mockClient.name,
    payeeId: mockPayee.id,
    payeeName: mockPayee.name,
    amount: 1000,
    currency: 'USD',
    method: PaymentMethod.ACH,
    priority: Priority.MEDIUM,
    effectiveDate: '2025-01-09T00:00:00Z',
    description: 'Test payment',
    metadata: {
      accountNumber: mockPayee.accountNumber,
      routingNumber: mockPayee.routingNumber,
      bankName: mockPayee.bankName
    },
    status: PaymentStatus.PENDING,
    createdAt: '2025-01-08T11:20:00Z',
    updatedAt: '2025-01-08T11:20:00Z'
  };

  const mockManualPayment: ManualPayment = {
    id: 'payment-123',
    clientId: mockClient.id,
    payeeId: mockPayee.id,
    amount: 1000,
    paymentType: 'ACH',
    effectiveDate: '2025-01-09T00:00:00Z',
    memo: 'Test payment',
    accountNumber: mockPayee.accountNumber,
    routingNumber: mockPayee.routingNumber,
    bankName: mockPayee.bankName,
    status: 'Draft',
    createdAt: '2025-01-08T11:20:00Z',
    updatedAt: '2025-01-08T11:20:00Z'
  };

  const mockPaymentFormData: ManualPaymentFormData = {
    clientId: mockManualPayment.clientId,
    payeeId: mockManualPayment.payeeId,
    amount: mockManualPayment.amount,
    paymentType: mockManualPayment.paymentType,
    effectiveDate: mockManualPayment.effectiveDate,
    memo: mockManualPayment.memo,
    accountNumber: mockManualPayment.accountNumber,
    routingNumber: mockManualPayment.routingNumber,
    bankName: mockManualPayment.bankName
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getClients', () => {
    it('should fetch clients', async () => {
      const mockResponse = {
        success: true,
        data: [mockClient],
        meta: {
          timestamp: '2025-01-08T11:20:00Z',
          requestId: '123'
        }
      };

      (paymentApi.getClients as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await manualPaymentService.getClients();

      expect(paymentApi.getClients).toHaveBeenCalled();
      expect(result).toEqual([mockClient]);
    });
  });

  describe('getPayees', () => {
    it('should fetch payees', async () => {
      const mockResponse = {
        success: true,
        data: [mockPayee],
        meta: {
          timestamp: '2025-01-08T11:20:00Z',
          requestId: '123'
        }
      };

      (paymentApi.getPayees as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await manualPaymentService.getPayees();

      expect(paymentApi.getPayees).toHaveBeenCalled();
      expect(result).toEqual([mockPayee]);
    });
  });

  describe('manual payment operations', () => {
    it('should create manual payment', async () => {
      const mockResponse = {
        success: true,
        data: mockPayment,
        meta: {
          timestamp: '2025-01-08T11:20:00Z',
          requestId: '123'
        }
      };

      (paymentApi.saveDraft as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await manualPaymentService.createPayment(mockPaymentFormData);

      expect(paymentApi.saveDraft).toHaveBeenCalledWith({
        clientId: mockPaymentFormData.clientId,
        payeeId: mockPaymentFormData.payeeId,
        amount: mockPaymentFormData.amount,
        method: PaymentMethod.ACH,
        effectiveDate: mockPaymentFormData.effectiveDate,
        description: mockPaymentFormData.memo,
        status: 'Submitted',
        metadata: {
          accountNumber: mockPaymentFormData.accountNumber,
          routingNumber: mockPaymentFormData.routingNumber,
          bankName: mockPaymentFormData.bankName,
        }
      });
      expect(result).toEqual(mockManualPayment);
    });

    it('should save payment draft', async () => {
      const mockResponse = {
        success: true,
        data: mockPayment,
        meta: {
          timestamp: '2025-01-08T11:20:00Z',
          requestId: '123'
        }
      };

      (paymentApi.saveDraft as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await manualPaymentService.saveDraft(mockPaymentFormData);

      expect(paymentApi.saveDraft).toHaveBeenCalledWith({
        clientId: mockPaymentFormData.clientId,
        payeeId: mockPaymentFormData.payeeId,
        amount: mockPaymentFormData.amount,
        method: PaymentMethod.ACH,
        effectiveDate: mockPaymentFormData.effectiveDate,
        description: mockPaymentFormData.memo,
        status: 'Draft',
        metadata: {
          accountNumber: mockPaymentFormData.accountNumber,
          routingNumber: mockPaymentFormData.routingNumber,
          bankName: mockPaymentFormData.bankName,
        }
      });
      expect(result).toEqual(mockManualPayment);
    });

    it('should validate payment', async () => {
      const mockResponse = {
        success: true,
        data: {
          valid: true,
          errors: []
        },
        meta: {
          timestamp: '2025-01-08T11:20:00Z',
          requestId: '123'
        }
      };

      (paymentApi.validatePayment as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await manualPaymentService.validatePayment(mockPaymentFormData);

      expect(paymentApi.validatePayment).toHaveBeenCalledWith({
        clientId: mockPaymentFormData.clientId,
        payeeId: mockPaymentFormData.payeeId,
        amount: mockPaymentFormData.amount,
        method: PaymentMethod.ACH,
        effectiveDate: mockPaymentFormData.effectiveDate,
        description: mockPaymentFormData.memo,
        metadata: {
          accountNumber: mockPaymentFormData.accountNumber,
          routingNumber: mockPaymentFormData.routingNumber,
          bankName: mockPaymentFormData.bankName,
        }
      });
      expect(result).toEqual({
        valid: mockResponse.data,
        errors: []
      });
    });
  });

  describe('payment retrieval', () => {
    it('should get a single payment', async () => {
      const mockResponse = {
        success: true,
        data: mockPayment,
        meta: {
          timestamp: '2025-01-08T11:20:00Z',
          requestId: '123'
        }
      };

      (paymentApi.saveDraft as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await manualPaymentService.getPayment('payment-123');

      expect(paymentApi.saveDraft).toHaveBeenCalledWith({ id: 'payment-123' });
      expect(result).toEqual(mockManualPayment);
    });
  });

  describe('error handling', () => {
    it('should throw error for unsupported payment method', async () => {
      const mockResponse = {
        success: true,
        data: {
          ...mockPayment,
          method: 'INVALID_METHOD'
        },
        meta: {
          timestamp: '2025-01-08T11:20:00Z',
          requestId: '123'
        }
      };

      (paymentApi.saveDraft as jest.Mock).mockResolvedValueOnce(mockResponse);

      await expect(manualPaymentService.getPayment('payment-123'))
        .rejects
        .toThrow('Unsupported payment method: INVALID_METHOD');
    });
  });

  describe('routing number validation', () => {
    it('should validate routing number', async () => {
      const mockResponse = {
        success: true,
        data: {
          valid: true,
          bankName: 'Test Bank',
          message: 'Valid routing number'
        },
        meta: {
          timestamp: '2025-01-08T11:20:00Z',
          requestId: '123'
        }
      };

      (paymentApi.validatePayment as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await manualPaymentService.validateRoutingNumber('987654321');

      expect(paymentApi.validatePayment).toHaveBeenCalledWith({
        metadata: {
          routingNumber: '987654321'
        }
      });
      expect(result).toEqual({
        valid: mockResponse.data,
        bankName: undefined,
        message: undefined
      });
    });
  });

  describe('draft management', () => {
    it('should get payment drafts', async () => {
      const mockResponse = {
        success: true,
        data: [mockPayment],
        meta: {
          timestamp: '2025-01-08T11:20:00Z',
          requestId: '123'
        }
      };

      (paymentApi.saveDraft as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await manualPaymentService.getDrafts();

      expect(paymentApi.saveDraft).toHaveBeenCalledWith({ status: 'Draft' });
      expect(result).toEqual([mockManualPayment]);
    });

    it('should handle single payment in drafts response', async () => {
      const mockResponse = {
        success: true,
        data: mockPayment,
        meta: {
          timestamp: '2025-01-08T11:20:00Z',
          requestId: '123'
        }
      };

      (paymentApi.saveDraft as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await manualPaymentService.getDrafts();

      expect(paymentApi.saveDraft).toHaveBeenCalledWith({ status: 'Draft' });
      expect(result).toEqual([mockManualPayment]);
    });

    it('should delete payment draft', async () => {
      const mockResponse = {
        success: true,
        data: null,
        meta: {
          timestamp: '2025-01-08T11:20:00Z',
          requestId: '123'
        }
      };

      (paymentApi.bulkDelete as jest.Mock).mockResolvedValueOnce(mockResponse);

      await manualPaymentService.deleteDraft('payment-123');

      expect(paymentApi.bulkDelete).toHaveBeenCalledWith(['payment-123']);
    });
  });
});
