import { api, ApiSuccessResponse } from '../utils/api';

export interface AuditEvent {
  eventType: string;
  resourceId: string;
  resourceType: string;
  status: 'INITIATED' | 'COMPLETED' | 'ERROR' | 'RECEIVED' | 'PROCESSED';
  metadata?: Record<string, any>;
  timestamp?: string;
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
}

export const auditService = new AuditService();
