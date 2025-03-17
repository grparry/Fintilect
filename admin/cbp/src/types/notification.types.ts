// API-aligned notification types
export interface NotificationCreateRequest {
    errorNumber: number;
    statusCode?: number;
    matchMode: number;
    matchOrder: number;
    matchText?: string;
    messageSubject?: string;
    messageBody?: string;
    emailMember: boolean;
    emailMemberServices: boolean;
    emailSysOp: boolean;
    notes?: string;
    symmetry: boolean;
    emerge: boolean;
}

export interface NotificationUpdateRequest {
    id: string;
    errorNumber: number;
    statusCode?: number;
    matchMode: number;
    matchOrder: number;
    matchText?: string;
    messageSubject?: string;
    messageBody?: string;
    emailMember: boolean;
    emailMemberServices: boolean;
    emailSysOp: boolean;
    notes?: string;
    symmetry?: boolean;
    emerge?: boolean;
}

export interface NotificationResponse {
    id: string;
    errorNumber: number;
    statusCode?: number;
    matchMode: number;
    matchOrder: number;
    matchText?: string;
    messageSubject?: string;
    messageBody?: string;
    emailMember: boolean;
    emailMemberServices: boolean;
    emailSysOp: boolean;
    notes?: string;
    symmetry: boolean;
    emerge: boolean;
}

export interface NotificationListResponse {
    notifications?: NotificationResponse[];
}

export interface NotificationSendRequest {
    statusCode: number;
}

export interface NotificationSendCustomerRequest {
    paymentID?: string;
    statusCode: number;
}

export interface SavedNotificationResponse {
    ID: number;
    statusCode: number;
    statusCodeDescription?: string;
    date: string;
    memberID?: string;
    paymentID?: string;
    paymentDate?: string;
    name?: string;
    memberEmail?: string;
    subject?: string;
    body?: string;
    sent: boolean;
}

export interface SavedNotificationListResponse {
    savedNotifications?: SavedNotificationResponse[];
}

export interface SavedNotificationClearRequest {
    clearUpToDate: string;
}

export interface SavedNotificationSearchParameter {
    type: number;
    value?: string;
    value2?: string;
}

export interface SavedNotificationSearchRequest {
    parameters?: SavedNotificationSearchParameter[];
}