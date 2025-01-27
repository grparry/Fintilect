import { IPaymentService } from '../../interfaces/IPaymentService';
import {
  PendingPayment,
  PendingPaymentSummary,
  PendingPaymentSearchRequest,
  PaymentStatus,
  PaymentMethod,
  Priority,
  PaymentHistory,
  PaginatedResponse,
  PaymentConfirmationResponse,
  ConfirmationStatus
} from '../../../types/bill-pay.types';
import { BaseMockService } from './BaseMockService';
import { mockPayments, mockPendingPayments } from './data/billpay/payments';

export class MockPaymentService extends BaseMockService implements IPaymentService {
  constructor(basePath: string = '/api/v1/payments') {
    super(basePath);
  }

  async getPendingPayments(request: PendingPaymentSearchRequest): Promise<PaginatedResponse<PendingPayment>> {
    await this.delay();
    



    


    





    





    

