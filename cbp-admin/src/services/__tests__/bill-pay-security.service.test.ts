import { billPaySecurityService } from '../bill-pay-security.service';
import api from '../api';
import { 
  BillPaySecuritySettings, 
  BillPaySecurityValidation,
  BillPayOTPMethod
} from '../../types/security.types';
import { auditService } from '../audit.service';

// Import types from the service itself
type AuthToken = {
  token: string;
  refreshToken: string;
  expiresAt: number;
  userId: string;
};

jest.mock('../api');
jest.mock('../audit.service');

describe('BillPaySecurityService', () => {
  // Mock initial settings
  const initialSettings: BillPaySecuritySettings = {
    passwordPolicy: {
      minLength: 12,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
      expiryDays: 90,
      preventReuse: 5
    },
    loginPolicy: {
      maxAttempts: 3,
      lockoutDuration: 30,
      sessionTimeout: 60,
      requireMFA: true,
      allowRememberMe: false
    },
    ipWhitelist: {
      enabled: true,
      addresses: '192.168.1.1,192.168.1.2'
    },
    otpSettings: {
      method: BillPayOTPMethod.EMAIL,
      email: 'test@example.com',
      phone: '+1234567890'
    },
    etag: 'abc123' // Added for concurrent update testing
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockAuthToken: AuthToken = {
    token: 'jwt.token.here',
    refreshToken: 'refresh.token.here',
    expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours from now
    userId: 'testuser'
  };

  // Helper function to set current token for testing
  const setCurrentToken = async (token: AuthToken | null) => {
    if (token) {
      (api.post as jest.Mock).mockResolvedValueOnce({
        data: { data: token }
      });
      await billPaySecurityService.authenticate('testuser', 'password123');
    } else {
      await billPaySecurityService.logout();
    }
  };

  describe('getSettings', () => {
    it('should fetch security settings successfully', async () => {
      (api.get as jest.Mock).mockResolvedValueOnce({
        data: { data: initialSettings }
      });

      const result = await billPaySecurityService.getSettings();

      expect(api.get).toHaveBeenCalledWith('/security/bill-pay/settings');
      expect(result).toEqual(initialSettings);
    });

    it('should handle API errors gracefully', async () => {
      const error = new Error('Network error');
      (api.get as jest.Mock).mockRejectedValueOnce(error);

      await expect(billPaySecurityService.getSettings())
        .rejects
        .toThrow('Failed to fetch security settings: Network error');
    });
  });

  describe('updateSettings', () => {
    // Mock updated settings
    const updatedSettings: BillPaySecuritySettings = {
      ...initialSettings,
      passwordPolicy: {
        ...initialSettings.passwordPolicy,
        minLength: 14,
        expiryDays: 60
      },
      loginPolicy: {
        ...initialSettings.loginPolicy,
        maxAttempts: 5,
        requireMFA: false
      },
      otpSettings: {
        ...initialSettings.otpSettings,
        method: BillPayOTPMethod.SMS
      }
    };

    it('should update security settings successfully', async () => {
      (api.get as jest.Mock).mockResolvedValueOnce({
        data: { data: initialSettings }
      });
      (api.put as jest.Mock).mockResolvedValueOnce({
        data: { data: updatedSettings }
      });

      await billPaySecurityService.getSettings();
      const result = await billPaySecurityService.updateSettings(updatedSettings);

      expect(api.put).toHaveBeenCalledWith(
        '/security/bill-pay/settings',
        updatedSettings,
        { headers: { 'If-Match': 'abc123' } }
      );
      expect(result).toEqual(updatedSettings);
    });

    it('should handle concurrent update conflict', async () => {
      (api.get as jest.Mock).mockResolvedValueOnce({
        data: { data: initialSettings }
      });
      (api.put as jest.Mock).mockRejectedValueOnce({
        response: {
          status: 412,
          data: { message: 'Settings have been modified' }
        }
      });

      await billPaySecurityService.getSettings();
      await expect(billPaySecurityService.updateSettings(updatedSettings))
        .rejects
        .toThrow('Settings have been modified by another user. Please refresh and try again.');
    });

    it('should validate IP whitelist format', async () => {
      (api.get as jest.Mock).mockResolvedValueOnce({
        data: { data: initialSettings }
      });

      const invalidSettings: BillPaySecuritySettings = {
        ...initialSettings,
        ipWhitelist: {
          enabled: true,
          addresses: '192.168.1.256/24' // Invalid IP
        }
      };

      await billPaySecurityService.getSettings();
      await expect(billPaySecurityService.updateSettings(invalidSettings))
        .rejects
        .toThrow('Invalid IP format: 192.168.1.256/24');
    });

    it('should validate phone number format for SMS OTP', async () => {
      (api.get as jest.Mock).mockResolvedValueOnce({
        data: { data: initialSettings }
      });

      const invalidSettings: BillPaySecuritySettings = {
        ...initialSettings,
        otpSettings: {
          method: BillPayOTPMethod.SMS,
          phone: '123456', // Invalid phone format
          email: 'test@example.com'
        }
      };

      await billPaySecurityService.getSettings();
      await expect(billPaySecurityService.updateSettings(invalidSettings))
        .rejects
        .toThrow('Invalid phone number format');
    });

    it('should handle API errors gracefully', async () => {
      (api.get as jest.Mock).mockResolvedValueOnce({
        data: { data: initialSettings }
      });
      const error = new Error('Network error');
      (api.put as jest.Mock).mockRejectedValueOnce(error);

      await billPaySecurityService.getSettings();
      await expect(billPaySecurityService.updateSettings(updatedSettings))
        .rejects
        .toThrow('Failed to update security settings: Network error');
    });

    it('should handle validation errors', async () => {
      (api.get as jest.Mock).mockResolvedValueOnce({
        data: { data: initialSettings }
      });
      (api.put as jest.Mock).mockRejectedValueOnce({
        response: {
          data: {
            code: 'VALIDATION_ERROR',
            message: 'Password length must be at least 8 characters'
          }
        }
      });

      await billPaySecurityService.getSettings();
      await expect(billPaySecurityService.updateSettings(updatedSettings))
        .rejects
        .toThrow('Invalid security settings: Password length must be at least 8 characters');
    });

    it('should log settings update to audit service', async () => {
      const auditSpy = jest.spyOn(auditService, 'logEvent');
      (api.get as jest.Mock).mockResolvedValueOnce({
        data: { data: initialSettings }
      });
      (api.put as jest.Mock).mockResolvedValueOnce({
        data: { data: updatedSettings }
      });

      await billPaySecurityService.getSettings();
      await billPaySecurityService.updateSettings(updatedSettings);

      expect(auditSpy).toHaveBeenCalledWith({
        eventType: 'SECURITY_SETTINGS_UPDATE',
        resourceId: 'abc123',
        resourceType: 'security_settings',
        status: 'COMPLETED',
        metadata: {
          changes: {
            'passwordPolicy.minLength': { from: 12, to: 14 },
            'passwordPolicy.expiryDays': { from: 90, to: 60 },
            'loginPolicy.maxAttempts': { from: 3, to: 5 },
            'loginPolicy.requireMFA': { from: true, to: false },
            'otpSettings.method': { from: BillPayOTPMethod.EMAIL, to: BillPayOTPMethod.SMS }
          }
        }
      });
    });

    it('should log failed settings update attempts', async () => {
      const auditSpy = jest.spyOn(auditService, 'logEvent');
      (api.get as jest.Mock).mockResolvedValueOnce({
        data: { data: initialSettings }
      });
      const error = new Error('Network error');
      (api.put as jest.Mock).mockRejectedValueOnce(error);

      await billPaySecurityService.getSettings();
      try {
        await billPaySecurityService.updateSettings(updatedSettings);
      } catch (err) {
        // Expected error
      }

      expect(auditSpy).toHaveBeenCalledWith({
        eventType: 'SECURITY_SETTINGS_UPDATE',
        resourceId: 'abc123',
        resourceType: 'security_settings',
        status: 'ERROR',
        metadata: {
          attemptedChanges: {
            'passwordPolicy.minLength': { from: 12, to: 14 },
            'passwordPolicy.expiryDays': { from: 90, to: 60 },
            'loginPolicy.maxAttempts': { from: 3, to: 5 },
            'loginPolicy.requireMFA': { from: true, to: false },
            'otpSettings.method': { from: BillPayOTPMethod.EMAIL, to: BillPayOTPMethod.SMS }
          },
          error: 'Failed to update security settings: Network error'
        }
      });
    });
  });

  describe('validateSettings', () => {
    const validationResult: BillPaySecurityValidation = {
      isValid: true,
      errors: {}
    };

    it('should validate security settings successfully', async () => {
      (api.post as jest.Mock).mockResolvedValueOnce({
        data: { data: validationResult }
      });

      const result = await billPaySecurityService.validateSettings(initialSettings);

      expect(api.post).toHaveBeenCalledWith('/security/bill-pay/settings/validate', initialSettings);
      expect(result).toEqual(validationResult);
    });

    it('should catch invalid IP format in local validation', async () => {
      const invalidSettings: BillPaySecuritySettings = {
        ...initialSettings,
        ipWhitelist: {
          enabled: true,
          addresses: '192.168.1.256/24' // Invalid IP
        }
      };

      const result = await billPaySecurityService.validateSettings(invalidSettings);

      expect(result.isValid).toBe(false);
      expect(result.errors['ipWhitelist.addresses']).toBe('Invalid IP format: 192.168.1.256/24');
    });

    it('should catch invalid phone format in local validation', async () => {
      const invalidSettings: BillPaySecuritySettings = {
        ...initialSettings,
        otpSettings: {
          method: BillPayOTPMethod.SMS,
          phone: '123456', // Invalid phone format
          email: 'test@example.com' // Keep required email field
        }
      };

      const result = await billPaySecurityService.validateSettings(invalidSettings);

      expect(result.isValid).toBe(false);
      expect(result.errors['otpSettings.phone']).toBe('Invalid phone number format');
    });

    it('should return validation errors for invalid settings', async () => {
      const invalidSettings: BillPaySecuritySettings = {
        ...initialSettings,
        passwordPolicy: {
          ...initialSettings.passwordPolicy,
          minLength: 4
        }
      };

      const invalidResult: BillPaySecurityValidation = {
        isValid: false,
        errors: {
          'passwordPolicy.minLength': 'Password length must be at least 8 characters'
        }
      };

      (api.post as jest.Mock).mockResolvedValueOnce({
        data: { data: invalidResult }
      });

      const result = await billPaySecurityService.validateSettings(invalidSettings);

      expect(api.post).toHaveBeenCalledWith('/security/bill-pay/settings/validate', invalidSettings);
      expect(result).toEqual(invalidResult);
    });

    it('should handle API errors gracefully', async () => {
      const error = new Error('Network error');
      (api.post as jest.Mock).mockRejectedValueOnce(error);

      await expect(billPaySecurityService.validateSettings(initialSettings))
        .rejects
        .toThrow('Failed to validate security settings: Network error');
    });
  });

  describe('sendOTP', () => {
    const mockDestination = 'test@example.com';

    beforeEach(() => {
      jest.clearAllMocks();
      billPaySecurityService.resetOTPAttempts();
    });

    it('should send OTP via email', async () => {
      // Mock MFA verification
      (api.get as jest.Mock).mockResolvedValueOnce({
        data: { data: { verified: true } }
      });

      // Mock OTP send
      (api.post as jest.Mock).mockResolvedValueOnce({
        data: { data: { success: true } }
      });

      await billPaySecurityService.sendOTP(BillPayOTPMethod.EMAIL, mockDestination);

      expect(api.post).toHaveBeenCalledWith('/security/bill-pay/otp/send', {
        method: BillPayOTPMethod.EMAIL,
        destination: mockDestination
      });
    });

    it('should send OTP via SMS', async () => {
      const mockPhone = '+1234567890';
      // Mock MFA verification
      (api.get as jest.Mock).mockResolvedValueOnce({
        data: { data: { verified: true } }
      });

      // Mock OTP send
      (api.post as jest.Mock).mockResolvedValueOnce({
        data: { data: { success: true } }
      });

      await billPaySecurityService.sendOTP(BillPayOTPMethod.SMS, mockPhone);

      expect(api.post).toHaveBeenCalledWith('/security/bill-pay/otp/send', {
        method: BillPayOTPMethod.SMS,
        destination: mockPhone
      });
    });

    it('should log OTP send attempt', async () => {
      const auditSpy = jest.spyOn(auditService, 'logEvent');
      (api.post as jest.Mock).mockResolvedValueOnce({
        data: { data: { success: true } }
      });

      await billPaySecurityService.sendOTP(BillPayOTPMethod.EMAIL, mockDestination);

      expect(auditSpy).toHaveBeenCalledTimes(2);
      expect(auditSpy).toHaveBeenNthCalledWith(1, {
        eventType: 'OTP_ATTEMPT',
        resourceId: mockDestination,
        resourceType: 'otp',
        status: 'INITIATED',
        metadata: {
          method: 'email',
          action: 'send'
        }
      });
      expect(auditSpy).toHaveBeenNthCalledWith(2, {
        eventType: 'OTP_ATTEMPT',
        resourceId: mockDestination,
        resourceType: 'otp',
        status: 'COMPLETED',
        metadata: {
          method: 'email',
          action: 'send'
        }
      });
    });

    it('should handle too many attempts', async () => {
      // Mock MFA verification
      (api.get as jest.Mock).mockResolvedValueOnce({
        data: { data: { verified: true } }
      });

      // Mock rate limit error
      const error = new Error('Too many attempts');
      (api.post as jest.Mock).mockRejectedValueOnce(error);

      await expect(billPaySecurityService.sendOTP(BillPayOTPMethod.EMAIL, mockDestination))
        .rejects
        .toThrow('Too many attempts');
    });
  });

  describe('verifyOTP', () => {
    const mockOTP = '123456';

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should verify OTP successfully', async () => {
      (api.post as jest.Mock).mockResolvedValueOnce({
        data: { data: { success: true } }
      });

      const result = await billPaySecurityService.verifyOTP(mockOTP);

      expect(api.post).toHaveBeenCalledWith('/security/bill-pay/otp/verify', {
        otp: mockOTP
      });
      expect(result).toEqual({ success: true });
    });

    it('should log successful OTP verification', async () => {
      const auditSpy = jest.spyOn(auditService, 'logEvent');
      (api.post as jest.Mock).mockResolvedValueOnce({
        data: { data: { success: true } }
      });

      await billPaySecurityService.verifyOTP(mockOTP);

      expect(auditSpy).toHaveBeenCalledWith({
        eventType: 'OTP_ATTEMPT',
        resourceId: mockOTP,
        resourceType: 'otp',
        status: 'COMPLETED',
        metadata: { action: 'verify' }
      });
    });

    it('should log failed OTP verification', async () => {
      const auditSpy = jest.spyOn(auditService, 'logEvent');
      const error = new Error('Invalid OTP');
      (api.post as jest.Mock).mockRejectedValueOnce(error);

      try {
        await billPaySecurityService.verifyOTP(mockOTP);
      } catch (err) {
        // Expected error
      }

      expect(auditSpy).toHaveBeenCalledWith({
        eventType: 'OTP_ATTEMPT',
        resourceId: mockOTP,
        resourceType: 'otp',
        status: 'ERROR',
        metadata: { action: 'verify', error: 'Invalid OTP' }
      });
    });

    it('should handle invalid OTP format', async () => {
      const invalidOTP = '12345'; // Too short
      await expect(billPaySecurityService.verifyOTP(invalidOTP))
        .rejects
        .toThrow('Invalid OTP format');
    });
  });

  describe('authenticate', () => {
    const mockUsername = 'testuser';
    const mockPassword = 'password123';
    const mockAuthToken: AuthToken = {
      token: 'jwt.token.here',
      refreshToken: 'refresh.token.here',
      expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours from now
      userId: 'testuser'
    };

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should authenticate user successfully', async () => {
      (api.post as jest.Mock).mockResolvedValueOnce({
        data: { data: mockAuthToken }
      });

      const result = await billPaySecurityService.authenticate(mockUsername, mockPassword);

      expect(api.post).toHaveBeenCalledWith('/security/bill-pay/auth', {
        username: mockUsername,
        password: mockPassword
      });
      expect(result).toEqual(mockAuthToken);
    });

    it('should log successful authentication', async () => {
      const auditSpy = jest.spyOn(auditService, 'logEvent');
      (api.post as jest.Mock).mockResolvedValueOnce({
        data: { data: mockAuthToken }
      });

      await billPaySecurityService.authenticate(mockUsername, mockPassword);

      expect(auditSpy).toHaveBeenCalledWith({
        eventType: 'AUTH_ATTEMPT',
        resourceId: mockUsername,
        resourceType: 'user',
        status: 'COMPLETED',
        metadata: { method: 'password' }
      });
    });

    it('should log failed authentication', async () => {
      const auditSpy = jest.spyOn(auditService, 'logEvent');
      const error = new Error('Invalid credentials');
      (api.post as jest.Mock).mockRejectedValueOnce(error);

      try {
        await billPaySecurityService.authenticate(mockUsername, mockPassword);
      } catch (err) {
        // Expected error
      }

      expect(auditSpy).toHaveBeenCalledWith({
        eventType: 'AUTH_ATTEMPT',
        resourceId: mockUsername,
        resourceType: 'user',
        status: 'ERROR',
        metadata: { method: 'password', error: 'Invalid credentials' }
      });
    });
  });

  describe('refreshToken', () => {
    it('should refresh token successfully', async () => {
      await setCurrentToken(mockAuthToken);
      (api.post as jest.Mock).mockResolvedValueOnce({
        data: { data: mockAuthToken }
      });

      const result = await billPaySecurityService.refreshToken();
      expect(result).toEqual(mockAuthToken);
    });

    it('should throw error when no refresh token available', async () => {
      await setCurrentToken(null);
      await expect(billPaySecurityService.refreshToken())
        .rejects
        .toThrow('No refresh token available');
    });
  });

  describe('logout', () => {
    it('should log out successfully', async () => {
      await setCurrentToken(mockAuthToken);
      await billPaySecurityService.logout();

      expect(api.post).toHaveBeenCalledWith('/security/bill-pay/auth/logout', {
        refreshToken: mockAuthToken.refreshToken
      });
    });

    it('should do nothing if no current token', async () => {
      await setCurrentToken(null);
      await billPaySecurityService.logout();
      expect(api.post).not.toHaveBeenCalled();
    });

    it('should log logout event', async () => {
      const auditSpy = jest.spyOn(auditService, 'logEvent');
      await setCurrentToken(mockAuthToken);

      await billPaySecurityService.logout();

      expect(auditSpy).toHaveBeenCalledWith({
        eventType: 'LOGOUT',
        resourceId: mockAuthToken.userId,
        resourceType: 'user',
        status: 'INITIATED'
      });

      expect(auditSpy).toHaveBeenCalledWith({
        eventType: 'LOGOUT',
        resourceId: mockAuthToken.userId,
        resourceType: 'user',
        status: 'COMPLETED'
      });
    });
  });
});
