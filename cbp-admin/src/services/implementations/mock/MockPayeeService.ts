import { IPayeeService } from '../../interfaces/IPayeeService';
import { BaseMockService } from './BaseMockService';
import {
  Payee,
  PayeeStatus,
  PayeeType,
  PayeeValidationResult,
  PayeeConversionSummary,
  PayeeConversionFilters,
  PayeeConversionFile,
  PayeeConversionValidation,
  PayeeConversionFileUploadResponse,
  PayeeConversionProgressResponse,
  PayeeConversionProgress,
  PayeeConversionRecord,
  PayeeConversionTemplate
} from '../../../types/bill-pay.types';
import { PaginatedResponse } from '../../../types/common.types';

export class MockPayeeService extends BaseMockService implements IPayeeService {
  private mockPayees: Payee[] = [
    {
      id: '1',
      clientId: 'client1',
      name: 'Acme Corp',
      accountNumber: '1234567890',
      routingNumber: '021000021',
      bankName: 'Chase Bank',
      status: 'active',
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-01T00:00:00Z'
    },
    {
      id: '2',
      clientId: 'client1',
      name: 'Global Industries',
      accountNumber: '0987654321',
      routingNumber: '021000021',
      bankName: 'Bank of America',
      status: 'active',
      createdAt: '2025-01-02T00:00:00Z',
      updatedAt: '2025-01-02T00:00:00Z'
    }
  ];

  private mockTemplates: PayeeConversionTemplate[] = [
    {
      id: 'template1',
      name: 'Standard CSV Template',
      description: 'Standard template for CSV payee imports',
      format: 'csv',
      fields: [
        { name: 'name', required: true, type: 'string' },
        { name: 'accountNumber', required: true, type: 'string' },
        { name: 'routingNumber', required: true, type: 'string' },
        { name: 'bankName', required: true, type: 'string' }
      ],
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-01T00:00:00Z'
    }
  ];

  constructor(
    basePath: string = '/api/v1/payees'
  ) {
    super(basePath);
  }

  async getPayees(filters: {
    clientId?: string;
    status?: PayeeStatus;
    type?: PayeeType;
    searchTerm?: string;
  }): Promise<PaginatedResponse<Payee>> {
    let filteredPayees = [...this.mockPayees];

    if (filters.clientId) {
      filteredPayees = filteredPayees.filter(p => p.clientId === filters.clientId);
    }
    if (filters.status) {
      const payeeStatus = filters.status === 'completed' ? 'active' : 'inactive';
      filteredPayees = filteredPayees.filter(p => p.status === payeeStatus);
    }
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      filteredPayees = filteredPayees.filter(p => 
        p.name.toLowerCase().includes(term) ||
        p.accountNumber.includes(term) ||
        p.bankName.toLowerCase().includes(term)
      );
    }

    return {
      items: filteredPayees,
      total: filteredPayees.length,
      page: 1,
      limit: 10,
      totalPages: 1
    };
  }

  async getPayee(payeeId: string): Promise<Payee> {
    const payee = this.mockPayees.find(p => p.id === payeeId);
    if (!payee) {
      throw this.createError('Payee not found', 404);
    }
    return payee;
  }

  async createPayee(payee: Omit<Payee, 'id' | 'createdAt' | 'updatedAt'>): Promise<Payee> {
    const newPayee: Payee = {
      ...payee,
      id: Math.random().toString(36).substring(7),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.mockPayees.push(newPayee);
    return newPayee;
  }

  async updatePayee(payeeId: string, payee: Partial<Payee>): Promise<Payee> {
    const index = this.mockPayees.findIndex(p => p.id === payeeId);
    if (index === -1) {
      throw this.createError('Payee not found', 404);
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
      throw this.createError('Payee not found', 404);
    }
    this.mockPayees.splice(index, 1);
  }

  async validatePayee(payee: Partial<Payee>): Promise<PayeeValidationResult> {
    const accountNumberValid = payee.accountNumber ? payee.accountNumber.length >= 8 : false;
    const isValid = Boolean(
      payee.name &&
      accountNumberValid &&
      payee.routingNumber?.length === 9
    );

    return {
      id: Math.random().toString(36).substring(7),
      payeeName: payee.name || '',
      status: isValid ? 'validated' : 'failed',
      accountNumber: payee.accountNumber || '',
      routingNumber: payee.routingNumber || '',
      type: 'Business',
      validationMessage: isValid ? 'Validation successful' : 'Invalid payee details'
    };
  }

  async getConversionSummary(): Promise<PayeeConversionSummary> {
    return {
      totalPayees: 100,
      successfullyConverted: 95,
      failed: 5,
      conversionDate: new Date().toISOString(),
      conversionId: 'conv123'
    };
  }

  async getConversions(filters: PayeeConversionFilters): Promise<PaginatedResponse<PayeeConversionRecord>> {
    const mockRecords: PayeeConversionRecord[] = [
      {
        id: 'rec1',
        fileId: 'file1',
        payeeName: 'Test Payee 1',
        payeeId: 'pay1',
        status: 'PROCESSED',
        createdAt: new Date().toISOString(),
        processedAt: new Date().toISOString()
      }
    ];

    return {
      items: mockRecords,
      total: mockRecords.length,
      page: 1,
      limit: 10,
      totalPages: 1
    };
  }

  async getConversionFiles(): Promise<PayeeConversionFile[]> {
    return [
      {
        id: 'file1',
        name: 'payees_import.csv',
        status: 'PROCESSED',
        createdAt: new Date().toISOString(),
        processedAt: new Date().toISOString()
      }
    ];
  }

  async uploadConversionFile(
    file: File,
    templateId: string
  ): Promise<PayeeConversionFileUploadResponse> {
    return {
      id: Math.random().toString(36).substring(7),
      name: file.name,
      status: 'PENDING',
      validation: {
        totalRecords: 100,
        validRecords: 98,
        invalidRecords: 2,
        errors: [
          { field: 'accountNumber', message: 'Invalid format' }
        ],
        warnings: [
          { field: 'bankName', message: 'Bank name not recognized' }
        ]
      },
      createdAt: new Date().toISOString()
    };
  }

  async validateConversionFile(fileId: string): Promise<PayeeConversionValidation> {
    return {
      valid: true,
      errors: [],
      warnings: [],
      totalRecords: 100,
      validRecords: 98,
      invalidRecords: 2
    };
  }

  async startConversion(fileId: string): Promise<PayeeConversionProgressResponse> {
    return {
      id: fileId,
      name: 'payees_import.csv',
      status: 'PROCESSING',
      validation: {
        totalRecords: 100,
        validRecords: 98,
        invalidRecords: 2,
        errors: [],
        warnings: []
      },
      createdAt: new Date().toISOString()
    };
  }

  async getConversionProgress(fileId: string): Promise<PayeeConversionProgress> {
    return {
      status: 'PROCESSING',
      totalRecords: 100,
      processedRecords: 50,
      progress: 50,
      currentStep: 'processing',
      totalSteps: 2,
      errors: []
    };
  }

  async cancelConversion(fileId: string): Promise<void> {
    // Mock implementation - no action needed
  }

  async getConversionTemplates(): Promise<PayeeConversionTemplate[]> {
    return this.mockTemplates;
  }

  async createConversionTemplate(
    template: Omit<PayeeConversionTemplate, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<PayeeConversionTemplate> {
    const newTemplate: PayeeConversionTemplate = {
      ...template,
      id: Math.random().toString(36).substring(7),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.mockTemplates.push(newTemplate);
    return newTemplate;
  }

  async updateConversionTemplate(
    templateId: string,
    template: Partial<PayeeConversionTemplate>
  ): Promise<PayeeConversionTemplate> {
    const index = this.mockTemplates.findIndex(t => t.id === templateId);
    if (index === -1) {
      throw this.createError('Template not found', 404);
    }
    
    const updatedTemplate = {
      ...this.mockTemplates[index],
      ...template,
      updatedAt: new Date().toISOString()
    };
    this.mockTemplates[index] = updatedTemplate;
    return updatedTemplate;
  }

  async deleteConversionTemplate(templateId: string): Promise<void> {
    const index = this.mockTemplates.findIndex(t => t.id === templateId);
    if (index === -1) {
      throw this.createError('Template not found', 404);
    }
    this.mockTemplates.splice(index, 1);
  }

  async getConversionHistory(conversionId: string): Promise<Array<{
    action: string;
    timestamp: string;
    details: Record<string, unknown>;
    user: string;
  }>> {
    return [
      {
        action: 'STARTED',
        timestamp: new Date().toISOString(),
        details: { totalRecords: 100 },
        user: 'system'
      },
      {
        action: 'COMPLETED',
        timestamp: new Date().toISOString(),
        details: { successCount: 98, failureCount: 2 },
        user: 'system'
      }
    ];
  }

  async exportConversionResults(
    conversionId: string,
    format: 'csv' | 'excel'
  ): Promise<string> {
    return `mock-conversion-export.${format}`;
  }

  async retryFailedConversions(
    conversionId: string,
    recordIds?: string[]
  ): Promise<{
    successful: number;
    failed: number;
    errors: Record<string, string>;
  }> {
    return {
      successful: 2,
      failed: 0,
      errors: {}
    };
  }
}
