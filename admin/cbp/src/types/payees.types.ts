// Types for interacting with the payees controller

// Request Types
export interface PayeeCloseGlobalRequest {
  fisPayeeId: string;
}

export interface CopyMemberPayeesRequest {
  memberId: string;
  newMemberId: string;
}

// Response Types
export interface Payee {
  payeeId?: string;
  payeeName?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  phoneNumber?: string;
  payeeType?: string;
}

export interface UserPayeeData {
  payee: Payee;
  userPayeeListId?: string;
  memberId?: string;
  usersAccountAtPayee?: string;
  nameOnAccount?: string;
  nickName?: string;
  attentionLine?: string;
  paymentMethod?: string;
  payeeType?: string;
  fisPayeeId?: string;
  active: boolean;
  favorite: boolean;
}

export interface UserPayeeListResponse {
  payees: UserPayeeData[];
}

export interface UserPayeeChangeHistoryReportRequest {
  startDate: string;
  endDate: string;
  searchValue: string;
  searchType: string;
}

export interface GlobalPayeeChangeHistoryReportRequest {
  startDate: string;
  endDate: string;
  searchValue: string;
  searchType: string;
}

export interface UserPayeeUpdateAccountNumberRequest {
  userPayeeListId: string;
  accountNumber: string;
}

export interface UpdateAccountAndReprocessRequest {
  userPayeeListId: string;
  accountNumber: string;
}

export interface UpdateAccountAndRefund {
  userPayeeListId: string;
  accountNumber: string;
}

export interface UserPayeeUpdateFisPayeeIdRequest {
  userPayeeListId: string;
  fisPayeeId: string;
}

export interface UpdateFisPayeeIdAndRefundRequest {
  userPayeeListId: string;
  fisPayeeId: string;
}

export interface ManualUpdateRequest {
  userPayeeListId: string;
}

// Response Types
export interface UserPayeeChangeHistoryResponse {
  memberId: string;
  userPayeeListId: string;
  updatedBy: string;
  updatedOn: string; // C# DateTime
  reason: string;
  changeType: string;
  payeeId: string;
  fisPayeeId: string;
  payeeName: string;
  usersAccountAtPayee: string;
  nameOnAccount: string;
  paymentMethod: string;
  active: boolean | null;
  payeeType: string;
}

export interface GlobalPayeeChangeHistoryResponse {
  id: number;
  recordType: string;
  internalPayeeId: string;
  payeeName: string;
  userPayeeListId: string;
  memberId: string;
  memberFirstName: string;
  memberMiddleName: string;
  memberLastName: string;
  attentionLine: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
  countryCode: string;
  phoneNumber: string;
  payeeStatus: string;
  disbursementType: string;
  payeeLevelType: string;
  customerId: string;
  electronicLeadTime: string;
  checkLeadTime: string;
  ofacstatus: string;
  closeReason: string;
  fileCreatorCutoffTime: string;
  industryCode: string;
  reason: string;
  insertDate: string; // C# DateTime
}

export interface UserPayeeChangeHistoryListResponse {
  histories: UserPayeeChangeHistoryResponse[];
}

export interface GlobalPayeeChangeHistoryListResponse {
  histories: GlobalPayeeChangeHistoryResponse[];
}
