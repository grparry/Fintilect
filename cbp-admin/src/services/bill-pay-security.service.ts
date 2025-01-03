import { ApiSuccessResponse } from '../types/api.types';
import { BillPaySecuritySettings, BillPaySecurityValidation } from '../types/security.types';
import api from './api';

class BillPaySecurityService {
  private readonly baseUrl = '/bill-pay/security';

  async getSettings(): Promise<BillPaySecuritySettings> {
    const response = await api.get<ApiSuccessResponse<BillPaySecuritySettings>>(this.baseUrl);
    return response.data.data;
  }

  async updateSettings(settings: BillPaySecuritySettings): Promise<BillPaySecuritySettings> {
    const response = await api.put<ApiSuccessResponse<BillPaySecuritySettings>>(
      this.baseUrl,
      settings
    );
    return response.data.data;
  }

  async validateSettings(settings: BillPaySecuritySettings): Promise<BillPaySecurityValidation> {
    const response = await api.post<ApiSuccessResponse<BillPaySecurityValidation>>(
      `${this.baseUrl}/validate`,
      settings
    );
    return response.data.data;
  }

  async sendOTP(method: 'email' | 'sms', destination: string): Promise<{ success: boolean; message: string }> {
    const response = await api.post<ApiSuccessResponse<{ success: boolean; message: string }>>(
      `${this.baseUrl}/otp/send`,
      { method, destination }
    );
    return response.data.data;
  }

  async verifyOTP(otp: string): Promise<{ success: boolean; message: string }> {
    const response = await api.post<ApiSuccessResponse<{ success: boolean; message: string }>>(
      `${this.baseUrl}/otp/verify`,
      { otp }
    );
    return response.data.data;
  }
}

export const billPaySecurityService = new BillPaySecurityService();
