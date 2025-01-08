import { ApiSuccessResponse } from '../types/api.types';
import { BillPaySecuritySettings, BillPaySecurityValidation, BillPayOTPMethod } from '../types/security.types';
import api from './api';

/**
 * Service for managing Bill Pay security settings and operations
 */
class BillPaySecurityService {
  private readonly baseUrl = '/security/bill-pay';
  private readonly MAX_OTP_ATTEMPTS = 3;
  private otpAttempts: { [key: string]: number } = {};

  /**
   * Resets all OTP attempt counters
   */
  public resetOTPAttempts(): void {
    this.otpAttempts = {};
  }

  /**
   * Validates IP address format
   * @param ip IP address to validate
   * @returns boolean indicating if format is valid
   */
  private isValidIpFormat(ip: string): boolean {
    const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:\/(?:3[0-2]|[1-2]?[0-9]))?$/;
    return ipRegex.test(ip);
  }

  /**
   * Validates phone number format
   * @param phone Phone number to validate
   * @returns boolean indicating if format is valid
   */
  private isValidPhoneFormat(phone: string): boolean {
    const phoneRegex = /^\+[1-9]\d{1,14}$/;
    return phoneRegex.test(phone);
  }

  /**
   * Validates OTP format
   * @param otp OTP to validate
   * @returns boolean indicating if format is valid
   */
  private isValidOTPFormat(otp: string): boolean {
    return /^\d{6}$/.test(otp);
  }

  /**
   * Fetches the current security settings
   * @returns Promise<BillPaySecuritySettings>
   * @throws Error if the API request fails
   */
  async getSettings(): Promise<BillPaySecuritySettings> {
    try {
      const response = await api.get<ApiSuccessResponse<BillPaySecuritySettings>>(`${this.baseUrl}/settings`);
      return response.data.data;
    } catch (error: any) {
      throw new Error(`Failed to fetch security settings: ${error?.message || 'Unknown error'}`);
    }
  }

  /**
   * Updates the security settings
   * @param settings Updated security settings
   * @returns Promise<BillPaySecuritySettings>
   * @throws Error if the API request fails or validation fails
   */
  async updateSettings(settings: BillPaySecuritySettings): Promise<BillPaySecuritySettings> {
    // Validate IP whitelist format
    if (settings.ipWhitelist?.enabled && settings.ipWhitelist.addresses) {
      const ips = settings.ipWhitelist.addresses.split(',');
      for (const ip of ips) {
        if (!this.isValidIpFormat(ip.trim())) {
          throw new Error(`Invalid IP format: ${ip}`);
        }
      }
    }

    // Validate phone number format if OTP method is SMS
    if (settings.otpSettings?.method === 'sms' && settings.otpSettings.phone) {
      if (!this.isValidPhoneFormat(settings.otpSettings.phone)) {
        throw new Error('Invalid phone number format');
      }
    }

    try {
      const headers: Record<string, string> = {};
      if (settings.etag) {
        headers['If-Match'] = settings.etag;
      }

      const response = await api.put<ApiSuccessResponse<BillPaySecuritySettings>>(
        `${this.baseUrl}/settings`,
        settings,
        { headers }
      );
      return response.data.data;
    } catch (error: any) {
      if (error?.response?.status === 412) {
        throw new Error('Settings have been modified by another user. Please refresh and try again.');
      }
      if (error?.response?.data?.code === 'VALIDATION_ERROR') {
        throw new Error(`Invalid security settings: ${error.response.data.message}`);
      }
      throw new Error(`Failed to update security settings: ${error?.message || 'Unknown error'}`);
    }
  }

  /**
   * Validates security settings without applying them
   * @param settings Settings to validate
   * @returns Promise<BillPaySecurityValidation>
   * @throws Error if the API request fails
   */
  async validateSettings(settings: BillPaySecuritySettings): Promise<BillPaySecurityValidation> {
    // Perform local validation first
    if (settings.ipWhitelist?.enabled && settings.ipWhitelist.addresses) {
      const ips = settings.ipWhitelist.addresses.split(',');
      for (const ip of ips) {
        if (!this.isValidIpFormat(ip.trim())) {
          return {
            isValid: false,
            errors: {
              'ipWhitelist.addresses': `Invalid IP format: ${ip}`
            }
          };
        }
      }
    }

    if (settings.otpSettings?.method === 'sms' && settings.otpSettings.phone) {
      if (!this.isValidPhoneFormat(settings.otpSettings.phone)) {
        return {
          isValid: false,
          errors: {
            'otpSettings.phone': 'Invalid phone number format'
          }
        };
      }
    }

    try {
      const response = await api.post<ApiSuccessResponse<BillPaySecurityValidation>>(
        `${this.baseUrl}/settings/validate`,
        settings
      );
      return response.data.data;
    } catch (error: any) {
      throw new Error(`Failed to validate security settings: ${error?.message || 'Unknown error'}`);
    }
  }

  /**
   * Sends a one-time password (OTP) via the specified method
   * @param method Method to send OTP (email or sms)
   * @param destination Email address or phone number to send OTP to
   * @returns Promise<{ success: boolean; message: string }>
   * @throws Error if the API request fails
   */
  async sendOTP(
    method: BillPayOTPMethod,
    destination: string
  ): Promise<{ success: boolean; message: string }> {
    // Check rate limiting
    const key = `${method}:${destination}`;
    if (this.otpAttempts[key] >= this.MAX_OTP_ATTEMPTS) {
      throw new Error('Too many OTP attempts. Please try again later.');
    }

    // Validate destination format
    if (method === 'sms' && !this.isValidPhoneFormat(destination)) {
      throw new Error('Invalid phone number format');
    }
    if (method === 'email' && !destination.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      throw new Error('Invalid email format');
    }

    try {
      const response = await api.post<ApiSuccessResponse<{ success: boolean; message: string }>>(
        `${this.baseUrl}/otp/send`,
        { method, destination }
      );

      // Increment attempt counter
      this.otpAttempts[key] = (this.otpAttempts[key] || 0) + 1;

      // Reset counter after 5 minutes
      setTimeout(() => {
        this.otpAttempts[key] = 0;
      }, 5 * 60 * 1000);

      return response.data.data;
    } catch (error: any) {
      if (error?.response?.data?.code === 'INVALID_DESTINATION') {
        throw new Error(`Invalid ${method} destination: ${destination}`);
      }
      if (error?.response?.data?.code === 'OTP_LIMIT_EXCEEDED') {
        throw new Error('Too many OTP attempts. Please try again later.');
      }
      throw new Error(`Failed to send OTP: ${error?.message || 'Unknown error'}`);
    }
  }

  /**
   * Verifies a one-time password (OTP)
   * @param otp The OTP to verify
   * @returns Promise<{ success: boolean; message: string }>
   * @throws Error if the API request fails
   */
  async verifyOTP(otp: string): Promise<{ success: boolean; message: string }> {
    // Validate OTP format before sending to API
    if (!this.isValidOTPFormat(otp)) {
      throw new Error('Invalid OTP format. Must be 6 digits.');
    }

    try {
      const response = await api.post<ApiSuccessResponse<{ success: boolean; message: string }>>(
        `${this.baseUrl}/otp/verify`,
        { otp }
      );

      // Reset attempt counter on successful verification
      const key = Object.keys(this.otpAttempts)[0]; // Get the current attempt key
      if (key) {
        this.otpAttempts[key] = 0;
      }

      return response.data.data;
    } catch (error: any) {
      if (error?.response?.data?.code === 'INVALID_OTP') {
        throw new Error('Invalid OTP code');
      }
      if (error?.response?.data?.code === 'OTP_EXPIRED') {
        throw new Error('OTP has expired. Please request a new one.');
      }
      if (error?.response?.data?.code === 'OTP_LIMIT_EXCEEDED') {
        throw new Error('Too many OTP attempts. Please try again later.');
      }
      throw new Error(`Failed to verify OTP: ${error?.message || 'Unknown error'}`);
    }
  }
}

export const billPaySecurityService = new BillPaySecurityService();
