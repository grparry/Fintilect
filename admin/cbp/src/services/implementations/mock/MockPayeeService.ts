import { IPayeeService } from '../../interfaces/IPayeeService';
import { BaseMockService } from './BaseMockService';
import { PaginatedResponse } from '../../../types/common.types';
import { PaymentStatus, PaymentMethod } from '../../../types/payment.types';
import {
  Payee,
  FisPayeeRequest,
  FisPayeeResponse,
  PaymentValidationResult
} from '../../../types/bill-pay.types';

export class MockPayeeService extends BaseMockService implements IPayeeService {
  private mockPayees: Payee[] = [
    {
      id: '1',
      clientId: 'client1',
      name: 'Mock Payee 1',
      accountNumber: '123456789',
      routingNumber: '987654321',
      bankName: 'Mock Bank',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '2',
      clientId: 'client1',
      name: 'Mock Payee 2',
      accountNumber: '987654321',
      routingNumber: '123456789',
      bankName: 'Mock Bank 2',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  async getFisPayee(request: FisPayeeRequest): Promise<FisPayeeResponse> {
    return {
      payeeId: '1',
      message: 'Mock FIS payee retrieved successfully'
    };
  }

  async getPayees(filters: {
    clientId?: string;
    status?: PaymentStatus;
    type?: PaymentMethod;
    searchTerm?: string;
  }): Promise<PaginatedResponse<Payee>> {
    let filteredPayees = [...this.mockPayees];

    if (filters.clientId) {
      filteredPayees = filteredPayees.filter(p => p.clientId === filters.clientId);
    }

    if (filters.searchTerm) {
      const searchTerm = filters.searchTerm.toLowerCase();
      filteredPayees = filteredPayees.filter(p =>
        p.name.toLowerCase().includes(searchTerm) ||
        p.accountNumber.includes(searchTerm) ||
        p.routingNumber.includes(searchTerm)
      );
    }

    return {
      items: filteredPayees,
      total: filteredPayees.length,
      page: 1,
      limit: 10,
      totalPages: Math.ceil(filteredPayees.length / 10)
    };
  }

  async getPayee(payeeId: string): Promise<Payee> {
    const payee = this.mockPayees.find(p => p.id === payeeId);
    if (!payee) {
      throw new Error('Payee not found');
    }
    return payee;
  }

  async createPayee(payee: Partial<Payee>): Promise<Payee> {
    const newPayee: Payee = {
      id: String(this.mockPayees.length + 1),
      clientId: payee.clientId || 'client1',
      name: payee.name || 'New Mock Payee',
      accountNumber: payee.accountNumber || '123456789',
      routingNumber: payee.routingNumber || '987654321',
      bankName: payee.bankName || 'Mock Bank',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.mockPayees.push(newPayee);
    return newPayee;
  }

  async updatePayee(payeeId: string, payee: Partial<Payee>): Promise<Payee> {
    const index = this.mockPayees.findIndex(p => p.id === payeeId);
    if (index === -1) {
      throw new Error('Payee not found');
    }

    const updatedPayee = {
      ...this.mockPayees[index],
      ...payee,
      updatedAt: new Date().toISOString()
    };

    this.mockPayees[index] = updatedPayee;
    return updatedPayee;
  }

  async deletePayee(payeeId: string): Promise<void> {
    const index = this.mockPayees.findIndex(p => p.id === payeeId);
    if (index === -1) {
      throw new Error('Payee not found');
    }

    this.mockPayees.splice(index, 1);
  }

  async validatePayee(payee: Partial<Payee>): Promise<PaymentValidationResult> {
    return {
      valid: true,
      errors: [],
      warnings: [],
      requiresApproval: false
    };
  }

  async getPayeeTypes(): Promise<PaymentMethod[]> {
    return [PaymentMethod.ACH, PaymentMethod.CHECK, PaymentMethod.CARD];
  }

  async getPayeeStatuses(): Promise<PaymentStatus[]> {
    return [
      PaymentStatus.PENDING,
      PaymentStatus.PROCESSING,
      PaymentStatus.COMPLETED,
      PaymentStatus.FAILED
    ];
  }
}