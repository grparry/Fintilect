import { BaseService } from '../real/BaseService';
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

export class MockPayeeService extends BaseService implements IPayeeService {
  constructor(basePath: string = '/mock/api/v1/payees') {
    super(basePath);
  }

  async getUserPayeeChangeHistory(_request: UserPayeeChangeHistoryReportRequest): Promise<UserPayeeChangeHistoryListResponse> {
    return {
      Histories: [
        {
          MemberId: 'mock-member-1',
          UserPayeeListId: 'mock-payee-list-1',
          UpdatedBy: 'mock-user',
          UpdatedOn: new Date().toISOString(),
          Reason: 'Account number update',
          ChangeType: 'Update',
          PayeeId: 'mock-payee-1',
          FisPayeeId: 'mock-fis-payee-1',
          PayeeName: 'Mock Payee',
          UsersAccountAtPayee: '1234567890',
          NameOnAccount: 'John Doe',
          PaymentMethod: 'electronic',
          Active: true,
          PayeeType: 'personal'
        }
      ]
    };
  }

  async updateUserPayeeAccountNumber(_request: UserPayeeUpdateAccountNumberRequest): Promise<void> {
    return;
  }

  async updateUserPayeeFisId(_request: UserPayeeUpdateFisPayeeIdRequest): Promise<void> {
    return;
  }

  async updateAccountAndReprocess(_request: UpdateAccountAndReprocessRequest): Promise<void> {
    return;
  }

  async updateAccountAndRefund(_request: UpdateAccountAndRefund): Promise<void> {
    return;
  }

  async updateFisPayeeIdAndRefund(_request: UpdateFisPayeeIdAndRefundRequest): Promise<void> {
    return;
  }

  async manualExceptionReprocess(_request: ManualUpdateRequest): Promise<void> {
    return;
  }

  async copyMemberPayees(_request: CopyMemberPayeesRequest): Promise<void> {
    return;
  }
}
