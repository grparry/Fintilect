export interface ClientResponse {
  id: string;
  name: string;
  type: string;
  status: string;
  environment: string;
}

export interface ClientRecord {
  ClientId: string;
  Name: string;
  Type: string;
  Status: string;
  Environment: string;
  CreatedAt: Date;
  UpdatedAt: Date;
}

export interface ClientSettings {
  general: {
    timezone: string;
    dateFormat: string;
    currency: string;
    language: string;
  };
  security: {
    passwordMinLength: number;
    maxLoginAttempts: number;
    sessionTimeout: number;
    ipWhitelist: string[];
  };
  notifications: {
    frequency: string;
    alertTypes: string[];
  };
}

export interface ClientListResponse {
  data: ClientResponse[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ClientListParams {
  page?: number;
  limit?: number;
  status?: string;
  type?: string;
}
