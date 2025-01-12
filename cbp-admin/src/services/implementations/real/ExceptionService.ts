import { inject, injectable } from 'inversify';
import { 
  Exception, 
  ExceptionFilter, 
  ExceptionStats, 
  CreateExceptionRequest, 
  UpdateExceptionRequest 
} from '../../../types/exception.types';
import { api } from '../../../utils/api';
import { PaginatedResponse } from '../../../types/common.types';
import { IExceptionService } from '../../interfaces/IExceptionService';
import { IBaseService } from '../../interfaces/IBaseService';

@injectable()
export class ExceptionService implements IExceptionService, IBaseService {
  private readonly baseUrl = '/api/v1/exceptions';

  constructor(@inject('ApiClient') private apiClient: typeof api) {}

  async createException(request: CreateExceptionRequest): Promise<Exception> {
    const response = await this.apiClient.post<Exception>(this.baseUrl, request);
    return response.data;
  }

  async getException(id: string): Promise<Exception> {
    const response = await this.apiClient.get<Exception>(`${this.baseUrl}/${id}`);
    return response.data;
  }

  async updateException(id: string, request: UpdateExceptionRequest): Promise<Exception> {
    const response = await this.apiClient.patch<Exception>(`${this.baseUrl}/${id}`, request);
    return response.data;
  }

  async listExceptions(filter?: ExceptionFilter, page: number = 1, size: number = 20): Promise<PaginatedResponse<Exception>> {
    const params = {
      page,
      size,
      ...filter
    };
    const response = await this.apiClient.get<PaginatedResponse<Exception>>(this.baseUrl, { params });
    return response.data;
  }

  async getExceptionStats(): Promise<ExceptionStats> {
    const response = await this.apiClient.get<ExceptionStats>(`${this.baseUrl}/stats`);
    return response.data;
  }

  async acknowledgeException(id: string): Promise<Exception> {
    const response = await this.apiClient.post<Exception>(`${this.baseUrl}/${id}/acknowledge`);
    return response.data;
  }

  async resolveException(id: string, resolution: string): Promise<Exception> {
    const response = await this.apiClient.post<Exception>(`${this.baseUrl}/${id}/resolve`, { resolution });
    return response.data;
  }

  async closeException(id: string): Promise<Exception> {
    const response = await this.apiClient.post<Exception>(`${this.baseUrl}/${id}/close`);
    return response.data;
  }

  async assignException(id: string, userId: string): Promise<Exception> {
    const response = await this.apiClient.post<Exception>(`${this.baseUrl}/${id}/assign`, { userId });
    return response.data;
  }

  async bulkUpdateExceptions(ids: string[], request: UpdateExceptionRequest): Promise<void> {
    await this.apiClient.patch(`${this.baseUrl}/bulk`, { ids, ...request });
  }
}
