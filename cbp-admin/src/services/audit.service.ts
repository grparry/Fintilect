import { api } from '../utils/api';

export interface AuditEvent {
  eventType: string;
  resourceId: string;
  resourceType: string;
  status: 'INITIATED' | 'COMPLETED' | 'ERROR' | 'RECEIVED' | 'PROCESSED';
  metadata?: Record<string, any>;
  timestamp?: string;
}

export interface AuditLogFilters {
  startDate?: string;
  endDate?: string;
  searchTerm?: string;
  page?: number;
  pageSize?: number;
}

export interface AuditLogResponse {
  events: AuditEvent[];
  total: number;
  page: number;
  pageSize: number;
}

class AuditService {
  private readonly baseUrl = '/api/v1/audit';

  public async logEvent(event: AuditEvent): Promise<void> {
    const response = await api.post<void>(`${this.baseUrl}/events`, {
      ...event,
      timestamp: event.timestamp || new Date().toISOString(),
    });

    if (!response.success) {
      throw new Error(response.error.message);
    }
  }

  public async getEvents(resourceId: string): Promise<AuditEvent[]> {
    const response = await api.get<AuditEvent[]>(
      `${this.baseUrl}/events/${resourceId}`
    );

    if (!response.success) {
      throw new Error(response.error.message);
    }

    return response.data;
  }

  public async getAuditLogs(filters?: AuditLogFilters): Promise<AuditLogResponse> {
    const queryParams = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const response = await api.get<AuditLogResponse>(
      `${this.baseUrl}/logs?${queryParams.toString()}`
    );

    if (!response.success) {
      throw new Error(response.error.message);
    }

    return response.data;
  }
}

export const auditService = new AuditService();
