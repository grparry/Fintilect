import { BillPayConfig, BillPayConfigUpdate, BillPayConfigValidation } from '../types/bill-pay.types';
import { SystemConfiguration } from '../types/configuration.types';
import { ApiSuccessResponse } from '../types/api.types';
import { BillPayConfigAdapter } from '../adapters/bill-pay-config.adapter';
import api from './api';

class BillPayConfigService {
  private readonly baseUrl = '/configuration';
  private readonly mockBaseUrl = '/bill-pay/config';

  async getConfig(): Promise<BillPayConfig> {
    if (process.env.REACT_APP_USE_MOCK_API) {
      const response = await api.get<ApiSuccessResponse<BillPayConfig>>(this.mockBaseUrl);
      return response.data.data;
    }

    const response = await api.get<ApiSuccessResponse<SystemConfiguration>>(`${this.baseUrl}/all`);
    return BillPayConfigAdapter.toConfig(response.data.data);
  }

  async updateConfig(data: BillPayConfigUpdate): Promise<BillPayConfig> {
    if (!process.env.REACT_APP_USE_MOCK_API) {
      throw new Error('Configuration updates not supported in production');
    }

    const response = await api.put<ApiSuccessResponse<BillPayConfig>>(
      this.mockBaseUrl,
      data
    );
    return response.data.data;
  }

  async validateConfig(data: BillPayConfigUpdate): Promise<BillPayConfigValidation> {
    if (!process.env.REACT_APP_USE_MOCK_API) {
      throw new Error('Configuration validation not supported in production');
    }

    const response = await api.post<ApiSuccessResponse<BillPayConfigValidation>>(
      `${this.mockBaseUrl}/validate`,
      data
    );
    return response.data.data;
  }

  async resetConfig(): Promise<BillPayConfig> {
    if (!process.env.REACT_APP_USE_MOCK_API) {
      throw new Error('Configuration reset not supported in production');
    }

    const response = await api.post<ApiSuccessResponse<BillPayConfig>>(
      `${this.mockBaseUrl}/reset`
    );
    return response.data.data;
  }

  async testEmailNotification(email: string): Promise<{
    success: boolean;
    message: string;
  }> {
    if (!process.env.REACT_APP_USE_MOCK_API) {
      throw new Error('Email testing not supported in production');
    }

    const response = await api.post<
      ApiSuccessResponse<{ success: boolean; message: string }>
    >(`${this.mockBaseUrl}/test-email`, { email });
    return response.data.data;
  }
}

export const billPayConfigService = new BillPayConfigService();
