import { api } from '../utils/api';

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
    await api.post(`${this.baseUrl}/events`, {
      ...event,
      timestamp: event.timestamp || new Date().toISOString(),
    });
  }

  public async getEvents(resourceId: string): Promise<AuditEvent[]> {
    const response = await api.get<AuditEvent[]>(
      `${this.baseUrl}/events/${resourceId}`
    );
    return response.data;
  }
}

export const auditService = new AuditService();
