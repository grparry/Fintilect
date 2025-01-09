import { ApiSuccessResponse } from '../types/api.types';
import { 
  BillPaySecuritySettings, 
  BillPaySecurityValidation, 
  BillPayOTPMethod,
  BillPayLoginPolicy,
  BillPayIPWhitelist
} from '../types/security.types';
import api from './api';
import { auditService } from './audit.service';

// Security event types
export const SecurityEventTypes = {
  AUTH_ATTEMPT: 'AUTH_ATTEMPT',
  RATE_LIMIT: 'RATE_LIMIT',
  OTP_ATTEMPT: 'OTP_ATTEMPT',
  PERMISSION_CHANGE: 'PERMISSION_CHANGE',
  MFA_VERIFICATION: 'MFA_VERIFICATION',
  API_KEY_ROTATION: 'API_KEY_ROTATION',
  SECURITY_SETTINGS_UPDATE: 'SECURITY_SETTINGS_UPDATE',
  LOGOUT: 'LOGOUT',
} as const;

interface AuthToken {
  token: string;
  refreshToken: string;
  expiresAt: number;
  userId: string;
}

interface APIKey {
  key: string;
  name: string;
  createdAt: string;
  lastUsed?: string;
  expiresAt?: string;
}

/**
 * Service for managing Bill Pay security settings and operations
 */
class BillPaySecurityService {
  private readonly baseUrl = '/security/bill-pay';
  private readonly MAX_OTP_ATTEMPTS = 3;
  private otpAttempts: { [key: string]: number } = {};
  private rateLimits: { [key: string]: { count: number; timestamp: number } } = {};
  private readonly RATE_LIMIT_WINDOW = 60000; // 1 minute
  private readonly RATE_LIMIT_MAX = 100; // 100 requests per minute
  private currentToken: AuthToken | null = null;
  private apiKeys: APIKey[] = [];
  private currentSettings: BillPaySecuritySettings | null = null;

  // Authentication methods
  public async authenticate(username: string, password: string): Promise<AuthToken> {
    try {
      await auditService.logEvent({
        eventType: SecurityEventTypes.AUTH_ATTEMPT,
        resourceId: username,
        resourceType: 'user',
        status: 'INITIATED',
        metadata: { method: 'password' }
      });

      const response = await api.post<ApiSuccessResponse<AuthToken>>(
        `${this.baseUrl}/auth`,
        { username, password }
      );

      const token = response.data.data;
      this.currentToken = token;

      await auditService.logEvent({
        eventType: SecurityEventTypes.AUTH_ATTEMPT,
        resourceId: username,
        resourceType: 'user',
        status: 'COMPLETED',
        metadata: { method: 'password' }
      });

      return token;
    } catch (error: any) {
      await auditService.logEvent({
        eventType: SecurityEventTypes.AUTH_ATTEMPT,
        resourceId: username,
        resourceType: 'user',
        status: 'ERROR',
        metadata: { method: 'password', error: error.message || 'Authentication failed' }
      });
      throw error;
    }
  }

  public async refreshToken(): Promise<AuthToken> {
    try {
      if (!this.currentToken?.refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await api.post<ApiSuccessResponse<AuthToken>>(
        `${this.baseUrl}/auth/refresh`,
        { refreshToken: this.currentToken.refreshToken }
      );

      const token = response.data.data;
      this.currentToken = token;
      return token;
    } catch (error: any) {
      if (error.message === 'No refresh token available') {
        throw error;
      }
      throw new Error(`Failed to refresh token: ${error.message || 'Unknown error'}`);
    }
  }

  /**
   * Logs out the current user
   * @returns Promise<void>
   */
  public async logout(): Promise<void> {
    try {
      if (!this.currentToken) {
        return;
      }

      await auditService.logEvent({
        eventType: SecurityEventTypes.LOGOUT,
        resourceId: this.currentToken.userId,
        resourceType: 'user',
        status: 'INITIATED'
      });

      await api.post(`${this.baseUrl}/auth/logout`, {
        refreshToken: this.currentToken.refreshToken
      });

      await auditService.logEvent({
        eventType: SecurityEventTypes.LOGOUT,
        resourceId: this.currentToken.userId,
        resourceType: 'user',
        status: 'COMPLETED'
      });

      this.currentToken = null;
    } catch (error: any) {
      await auditService.logEvent({
        eventType: SecurityEventTypes.LOGOUT,
        resourceId: this.currentToken?.userId || 'unknown',
        resourceType: 'user',
        status: 'ERROR',
        metadata: { error: error.message || 'Unknown error' }
      });
      throw error;
    }
  }

  // Authorization methods
  public async checkPermission(action: string): Promise<boolean> {
    const response = await api.post<ApiSuccessResponse<{ allowed: boolean }>>(
      `${this.baseUrl}/authorize`,
      { action }
    );
    return response.data.data.allowed;
  }

  public async getUserPermissions(): Promise<string[]> {
    const response = await api.get<ApiSuccessResponse<{ permissions: string[] }>>(
      `${this.baseUrl}/permissions`
    );
    return response.data.data.permissions;
  }

  // API Key management
  public async createAPIKey(name: string, expiresAt?: string): Promise<APIKey> {
    await auditService.logEvent({
      eventType: SecurityEventTypes.API_KEY_ROTATION,
      resourceId: 'create',
      resourceType: 'api_key',
      status: 'INITIATED',
      metadata: { name }
    });

    try {
      const response = await api.post<ApiSuccessResponse<APIKey>>(
        `${this.baseUrl}/api-keys`,
        { name, expiresAt }
      );

      const apiKey = response.data.data;
      this.apiKeys.push(apiKey);

      await auditService.logEvent({
        eventType: SecurityEventTypes.API_KEY_ROTATION,
        resourceId: 'create',
        resourceType: 'api_key',
        status: 'COMPLETED',
        metadata: { name, keyId: apiKey.key }
      });

      return apiKey;
    } catch (err: unknown) {
      const error = err instanceof Error ? err.message : 'Unknown error occurred';
      await auditService.logEvent({
        eventType: SecurityEventTypes.API_KEY_ROTATION,
        resourceId: 'create',
        resourceType: 'api_key',
        status: 'ERROR',
        metadata: { error, name }
      });
      throw err;
    }
  }

  public async listAPIKeys(): Promise<APIKey[]> {
    const response = await api.get<ApiSuccessResponse<APIKey[]>>(
      `${this.baseUrl}/api-keys`
    );
    this.apiKeys = response.data.data;
    return this.apiKeys;
  }

  public async revokeAPIKey(keyId: string): Promise<void> {
    await auditService.logEvent({
      eventType: SecurityEventTypes.API_KEY_ROTATION,
      resourceId: 'revoke',
      resourceType: 'api_key',
      status: 'INITIATED',
      metadata: { keyId }
    });

    try {
      await api.delete(`${this.baseUrl}/api-keys/${keyId}`);
      this.apiKeys = this.apiKeys.filter(key => key.key !== keyId);

      await auditService.logEvent({
        eventType: SecurityEventTypes.API_KEY_ROTATION,
        resourceId: 'revoke',
        resourceType: 'api_key',
        status: 'COMPLETED',
        metadata: { keyId }
      });
    } catch (err: unknown) {
      const error = err instanceof Error ? err.message : 'Unknown error occurred';
      await auditService.logEvent({
        eventType: SecurityEventTypes.API_KEY_ROTATION,
        resourceId: 'revoke',
        resourceType: 'api_key',
        status: 'ERROR',
        metadata: { error, keyId }
      });
      throw err;
    }
  }

  // Rate limiting (existing implementation enhanced)
  public async checkRateLimit(action: string): Promise<boolean> {
    const now = Date.now();
    const key = action;

    if (!this.rateLimits[key]) {
      this.rateLimits[key] = { count: 1, timestamp: now };
      return false;
    }

    const limit = this.rateLimits[key];
    if (now - limit.timestamp > this.RATE_LIMIT_WINDOW) {
      // Reset if window has passed
      this.rateLimits[key] = { count: 1, timestamp: now };
      return false;
    }

    limit.count++;
    const isLimited = limit.count > this.RATE_LIMIT_MAX;
    
    if (isLimited) {
      await auditService.logEvent({
        eventType: SecurityEventTypes.RATE_LIMIT,
        resourceId: key,
        resourceType: 'rate_limit',
        status: 'ERROR',
        metadata: {
          count: limit.count,
          window: this.RATE_LIMIT_WINDOW,
          max: this.RATE_LIMIT_MAX
        }
      });
    }
    
    return isLimited;
  }

  public getRateLimit(action: string): { count: number; window: number } {
    return {
      count: this.rateLimits[action]?.count || 0,
      window: this.RATE_LIMIT_WINDOW,
    };
  }

  /**
   * Resets all OTP attempt counters
   */
  public resetOTPAttempts(): void {
    this.otpAttempts = {};
  }

  /**
   * Verifies MFA status
   * @returns boolean indicating if MFA is verified
   */
  public async verifyMFA(): Promise<boolean> {
    try {
      const response = await api.get<ApiSuccessResponse<{ verified: boolean }>>(
        `${this.baseUrl}/mfa/status`
      );
      return response.data?.data?.verified ?? false;
    } catch (error) {
      return false;
    }
  }

  /**
   * Validates IP address against whitelist
   * @returns boolean indicating if IP is allowed
   */
  public async validateIP(): Promise<boolean> {
    try {
      const response = await api.get<ApiSuccessResponse<{ allowed: boolean }>>(
        `${this.baseUrl}/ip/validate`
      );
      return response.data?.data?.allowed ?? false;
    } catch (error) {
      return false;
    }
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
      this.currentSettings = response.data.data;
      return response.data.data;
    } catch (error: any) {
      throw new Error(`Failed to fetch security settings: ${error?.message || 'Unknown error'}`);
    }
  }

  /**
   * Updates security settings
   * @param settings Settings to update
   * @returns Promise<BillPaySecuritySettings>
   * @throws Error if validation fails or update fails
   */
  public async updateSettings(settings: BillPaySecuritySettings): Promise<BillPaySecuritySettings> {
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
    if (settings.otpSettings?.method === BillPayOTPMethod.SMS && settings.otpSettings.phone) {
      if (!this.isValidPhoneFormat(settings.otpSettings.phone)) {
        throw new Error('Invalid phone number format');
      }
    }

    try {
      await auditService.logEvent({
        eventType: SecurityEventTypes.SECURITY_SETTINGS_UPDATE,
        resourceId: settings.etag || 'new',
        resourceType: 'security_settings',
        status: 'INITIATED',
        metadata: { changes: this.getSettingsChanges(settings) }
      });

      const headers: Record<string, string> = {};
      if (settings.etag) {
        headers['If-Match'] = settings.etag;
      }

      const response = await api.put<ApiSuccessResponse<BillPaySecuritySettings>>(
        `${this.baseUrl}/settings`,
        settings,
        { headers }
      );

      await auditService.logEvent({
        eventType: SecurityEventTypes.SECURITY_SETTINGS_UPDATE,
        resourceId: settings.etag || 'new',
        resourceType: 'security_settings',
        status: 'COMPLETED',
        metadata: { changes: this.getSettingsChanges(settings) }
      });

      return response.data.data;
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || error.message || 'Unknown error';
      const errorCode = error?.response?.data?.code;
      let finalError: string;

      if (error?.response?.status === 412) {
        finalError = 'Settings have been modified by another user. Please refresh and try again.';
      } else if (errorCode === 'VALIDATION_ERROR') {
        finalError = `Invalid security settings: ${errorMessage}`;
      } else {
        finalError = `Failed to update security settings: ${errorMessage}`;
      }

      await auditService.logEvent({
        eventType: SecurityEventTypes.SECURITY_SETTINGS_UPDATE,
        resourceId: settings.etag || 'new',
        resourceType: 'security_settings',
        status: 'ERROR',
        metadata: {
          attemptedChanges: this.getSettingsChanges(settings),
          error: finalError
        }
      });

      throw new Error(finalError);
    }
  }

  private getSettingsChanges(newSettings: BillPaySecuritySettings): Record<string, any> {
    const currentSettings = this.currentSettings;
    const changes: Record<string, any> = {};

    if (currentSettings) {
      if (currentSettings.passwordPolicy.minLength !== newSettings.passwordPolicy.minLength) {
        changes['passwordPolicy.minLength'] = {
          from: currentSettings.passwordPolicy.minLength,
          to: newSettings.passwordPolicy.minLength
        };
      }

      if (currentSettings.passwordPolicy.expiryDays !== newSettings.passwordPolicy.expiryDays) {
        changes['passwordPolicy.expiryDays'] = {
          from: currentSettings.passwordPolicy.expiryDays,
          to: newSettings.passwordPolicy.expiryDays
        };
      }

      if (currentSettings.loginPolicy.maxAttempts !== newSettings.loginPolicy.maxAttempts) {
        changes['loginPolicy.maxAttempts'] = {
          from: currentSettings.loginPolicy.maxAttempts,
          to: newSettings.loginPolicy.maxAttempts
        };
      }

      if (currentSettings.loginPolicy.requireMFA !== newSettings.loginPolicy.requireMFA) {
        changes['loginPolicy.requireMFA'] = {
          from: currentSettings.loginPolicy.requireMFA,
          to: newSettings.loginPolicy.requireMFA
        };
      }

      if (currentSettings.otpSettings.method !== newSettings.otpSettings.method) {
        changes['otpSettings.method'] = {
          from: currentSettings.otpSettings.method,
          to: newSettings.otpSettings.method
        };
      }
    }

    return changes;
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
   * Sends a one-time password (OTP) to the specified destination
   * @param method OTP delivery method (EMAIL or SMS)
   * @param destination Email or phone number to send OTP to
   * @returns Promise<void>
   * @throws Error if OTP sending fails
   */
  public async sendOTP(method: BillPayOTPMethod, destination: string): Promise<void> {
    try {
      await auditService.logEvent({
        eventType: SecurityEventTypes.OTP_ATTEMPT,
        resourceId: destination,
        resourceType: 'otp',
        status: 'INITIATED',
        metadata: { action: 'send', method }
      });

      const response = await api.post<ApiSuccessResponse<void>>(
        `${this.baseUrl}/otp/send`,
        { method, destination }
      );

      await auditService.logEvent({
        eventType: SecurityEventTypes.OTP_ATTEMPT,
        resourceId: destination,
        resourceType: 'otp',
        status: 'COMPLETED',
        metadata: { action: 'send', method }
      });
    } catch (error: any) {
      await auditService.logEvent({
        eventType: SecurityEventTypes.OTP_ATTEMPT,
        resourceId: destination,
        resourceType: 'otp',
        status: 'ERROR',
        metadata: { action: 'send', method, error: error.message || 'Failed to send OTP' }
      });
      throw error;
    }
  }

  /**
   * Verifies a one-time password (OTP)
   * @param otp The OTP to verify
   * @returns Promise<{ success: boolean; message?: string }>
   * @throws Error if the API request fails
   */
  public async verifyOTP(otp: string): Promise<{ success: boolean; message?: string }> {
    if (!this.isValidOTPFormat(otp)) {
      throw new Error('Invalid OTP format');
    }

    try {
      await auditService.logEvent({
        eventType: SecurityEventTypes.OTP_ATTEMPT,
        resourceId: otp,
        resourceType: 'otp',
        status: 'INITIATED',
        metadata: { action: 'verify' }
      });

      const response = await api.post<ApiSuccessResponse<{ success: boolean }>>(
        `${this.baseUrl}/otp/verify`,
        { otp }
      );

      await auditService.logEvent({
        eventType: SecurityEventTypes.OTP_ATTEMPT,
        resourceId: otp,
        resourceType: 'otp',
        status: 'COMPLETED',
        metadata: { action: 'verify' }
      });

      return { success: true };
    } catch (error: any) {
      await auditService.logEvent({
        eventType: SecurityEventTypes.OTP_ATTEMPT,
        resourceId: otp,
        resourceType: 'otp',
        status: 'ERROR',
        metadata: { action: 'verify', error: error.message || 'OTP verification failed' }
      });
      throw error;
    }
  }

  /**
   * Gets the current user's ID
   * @returns Promise<string> User ID
   */
  public async getCurrentUserId(): Promise<string> {
    try {
      const response = await api.get<ApiSuccessResponse<{ userId: string }>>(
        `${this.baseUrl}/user/current`
      );
      return response.data?.data?.userId ?? 'unknown';
    } catch (error) {
      return 'unknown';
    }
  }

  /**
   * Gets the current IP address
   * @returns Promise<string> IP address
   */
  public async getCurrentIP(): Promise<string> {
    const response = await api.get<ApiSuccessResponse<{ ip: string }>>(
      `${this.baseUrl}/ip/current`
    );
    return response.data.data.ip;
  }
}

export const billPaySecurityService = new BillPaySecurityService();
