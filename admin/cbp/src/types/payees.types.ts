// Types for interacting with the payees controller

// Request Types
export interface PayeeCloseGlobalRequest {
  fisPayeeId: string;
}

export interface CopyMemberPayeesRequest {
  newMemberId: string;
}

export interface UserPayeeChangeHistoryReportRequest {
  startDate: string;
  endDate: string;
  searchValue: string;
}

export interface GlobalPayeeChangeHistoryReportRequest {
  startDate: string;
  endDate: string;
  searchValue: string;
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
  MemberId: string;
  UserPayeeListId: string;
  UpdatedBy: string;
  UpdatedOn: string; // C# DateTime
  Reason: string;
  ChangeType: string;
  PayeeId: string;
  FisPayeeId: string;
  PayeeName: string;
  UsersAccountAtPayee: string;
  NameOnAccount: string;
  PaymentMethod: string;
  Active: boolean | null;
  PayeeType: string;
}

export interface GlobalPayeeChangeHistoryResponse {
  Id: number;
  RecordType: string;
  InternalPayeeId: string;
  PayeeName: string;
  UserPayeeListId: string;
  MemberId: string;
  MemberFirstName: string;
  MemberMiddleName: string;
  MemberLastName: string;
  AttentionLine: string;
  AddressLine1: string;
  AddressLine2: string;
  City: string;
  State: string;
  ZipCode: string;
  CountryCode: string;
  PhoneNumber: string;
  PayeeStatus: string;
  DisbursementType: string;
  PayeeLevelType: string;
  CustomerId: string;
  ElectronicLeadTime: string;
  CheckLeadTime: string;
  Ofacstatus: string;
  CloseReason: string;
  FileCreatorCutoffTime: string;
  IndustryCode: string;
  Reason: string;
  InsertDate: string; // C# DateTime
}

export interface UserPayeeChangeHistoryListResponse {
  Histories: UserPayeeChangeHistoryResponse[];
}

export interface GlobalPayeeChangeHistoryListResponse {
  Histories: GlobalPayeeChangeHistoryResponse[];
}
