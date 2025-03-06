import { BaseService } from './BaseService';
import { IPayeeService } from '../../interfaces/IPayeeService';
import {
  UserPayeeChangeHistoryListResponse,
  UserPayeeChangeHistoryReportRequest,
  UserPayeeUpdateAccountNumberRequest,
  UserPayeeUpdateFisPayeeIdRequest,
  UpdateAccountAndReprocessRequest,
  UpdateAccountAndRefund,
  UpdateFisPayeeIdAndRefundRequest,
  ManualUpdateRequest,
  CopyMemberPayeesRequest
} from '../../../types/payees.types';

export class PayeeService extends BaseService implements IPayeeService {
  constructor(basePath: string) {
    super(basePath);
  }

  async getUserPayeeChangeHistory(request: UserPayeeChangeHistoryReportRequest): Promise<UserPayeeChangeHistoryListResponse> {
    return this.post<UserPayeeChangeHistoryListResponse>('/user/change-history', request);
  }

  async updateUserPayeeAccountNumber(request: UserPayeeUpdateAccountNumberRequest): Promise<void> {
    await this.post<void>('/user/account-number', request);
  }

  async updateUserPayeeFisId(request: UserPayeeUpdateFisPayeeIdRequest): Promise<void> {
    await this.post<void>('/user/fis-payee-id', request);
  }

  async updateAccountAndReprocess(request: UpdateAccountAndReprocessRequest): Promise<void> {
    await this.post<void>('/account-number-reprocess', request);
  }

  async updateAccountAndRefund(request: UpdateAccountAndRefund): Promise<void> {
    await this.post<void>('/account-number-refund', request);
  }

  async updateFisPayeeIdAndRefund(request: UpdateFisPayeeIdAndRefundRequest): Promise<void> {
    await this.post<void>('/user/fis-payee-refund', request);
  }

  async manualExceptionReprocess(request: ManualUpdateRequest): Promise<void> {
    await this.post<void>('/manual-exception-reprocess', request);
  }

  async copyMemberPayees(request: CopyMemberPayeesRequest): Promise<void> {
    await this.post<void>('/copy-payees', request);
  }
}
