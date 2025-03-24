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
  CopyMemberPayeesRequest,
  UserPayeeListResponse,
  GlobalPayeeChangeHistoryReportRequest,
  GlobalPayeeChangeHistoryListResponse
} from '../../../types/payees.types';

export class MockPayeeService extends BaseService implements IPayeeService {
  constructor(basePath: string = '/mock/api/v1/payees') {
    super(basePath);
  }

  async getUserPayeeChangeHistory(_request: UserPayeeChangeHistoryReportRequest): Promise<UserPayeeChangeHistoryListResponse> {
    return {
      histories: [
        {
          memberId: 'mock-member-1',
          userPayeeListId: 'mock-payee-list-1',
          updatedBy: 'mock-user',
          updatedOn: new Date().toISOString(),
          reason: 'Account number update',
          changeType: 'Update',
          payeeId: 'mock-payee-1',
          fisPayeeId: 'mock-fis-payee-1',
          payeeName: 'Mock Payee',
          usersAccountAtPayee: '1234567890',
          nameOnAccount: 'John Doe',
          paymentMethod: 'electronic',
          active: true,
          payeeType: 'personal'
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

  async getMemberPayees(_memberId: string): Promise<UserPayeeListResponse> {
    return {
      payees: [
        {
          payee: {
            payeeId: 'mock-payee-1',
            payeeName: 'Mock Electric Company',
            addressLine1: '123 Mock St',
            city: 'Mockville',
            state: 'MK',
            zipCode: '12345',
            phoneNumber: '555-0123',
            payeeType: 'utility'
          },
          userPayeeListId: 'mock-list-1',
          memberId: _memberId,
          usersAccountAtPayee: '987654321',
          nameOnAccount: 'John Mock',
          nickName: 'Electric Bill',
          attentionLine: null,
          paymentMethod: 'electronic',
          payeeType: 'utility',
          fisPayeeId: 'mock-fis-1',
          active: true,
          favorite: false
        }
      ]
    };
  }

  async getGlobalPayeeChangeHistory(_request: GlobalPayeeChangeHistoryReportRequest): Promise<GlobalPayeeChangeHistoryListResponse> {
    return {
      histories: [
        {
          id: 1,
          recordType: 'PayeeUpdate',
          internalPayeeId: 'mock-internal-payee-1',
          payeeName: 'Mock Global Payee',
          userPayeeListId: 'mock-user-payee-list-1',
          memberId: 'mock-member-1',
          memberFirstName: 'John',
          memberMiddleName: '',
          memberLastName: 'Doe',
          attentionLine: '',
          addressLine1: '123 Mock St',
          addressLine2: '',
          city: 'Mockville',
          state: 'MK',
          zipCode: '12345',
          countryCode: 'US',
          phoneNumber: '555-0123',
          payeeStatus: 'Active',
          disbursementType: 'Electronic',
          payeeLevelType: 'Global',
          customerId: 'mock-customer-1',
          electronicLeadTime: '2',
          checkLeadTime: '5',
          ofacstatus: 'Approved',
          closeReason: '',
          fileCreatorCutoffTime: '14:00',
          industryCode: 'UTIL',
          reason: 'Address Update',
          insertDate: new Date().toISOString()
        }
      ]
    };
  }
}
