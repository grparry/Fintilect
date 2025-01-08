import { billPaySecurityService } from '../bill-pay-security.service';
import api from '../api';
import { BillPaySecuritySettings, BillPaySecurityValidation } from '../../types/security.types';

jest.mock('../api');

describe('BillPaySecurityService', () => {
  const mockSettings: BillPaySecuritySettings = {
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
      addresses: '192.168.1.0/24,10.0.0.0/8'
    },
    otpSettings: {
      method: 'email',
      email: 'security@example.com',
      phone: '+1234567890'
    },
    etag: 'abc123' // Added for concurrent update testing
  };

  beforeEach(() => {
    jest.clearAllMocks();
    billPaySecurityService.resetOTPAttempts();
  });

  describe('getSettings', () => {
    it('should fetch security settings successfully', async () => {
      (api.get as jest.Mock).mockResolvedValueOnce({
        data: { data: mockSettings }
      });

      const result = await billPaySecurityService.getSettings();

      expect(api.get).toHaveBeenCalledWith('/security/bill-pay/settings');
      expect(result).toEqual(mockSettings);
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
    const updatedSettings: BillPaySecuritySettings = {
      ...mockSettings,
      passwordPolicy: {
        ...mockSettings.passwordPolicy,
        minLength: 14,
        expiryDays: 60
      },
      loginPolicy: {
        ...mockSettings.loginPolicy,
        maxAttempts: 5,
        requireMFA: false
      }
    };

    it('should update security settings successfully', async () => {
      (api.put as jest.Mock).mockResolvedValueOnce({
        data: { data: updatedSettings }
      });

      const result = await billPaySecurityService.updateSettings(updatedSettings);

      expect(api.put).toHaveBeenCalledWith(
        '/security/bill-pay/settings',
        updatedSettings,
        {
          headers: {
            'If-Match': updatedSettings.etag
          }
        }
      );
      expect(result).toEqual(updatedSettings);
    });

    it('should handle concurrent update conflict', async () => {
      const error = { response: { status: 412 } };
      (api.put as jest.Mock).mockRejectedValueOnce(error);

      await expect(billPaySecurityService.updateSettings(updatedSettings))
        .rejects
        .toThrow('Settings have been modified by another user. Please refresh and try again.');
    });

    it('should validate IP whitelist format', async () => {
      const invalidSettings: BillPaySecuritySettings = {
        ...mockSettings,
        ipWhitelist: {
          enabled: true,
          addresses: '192.168.1.256/24' // Invalid IP
        }
      };

      await expect(billPaySecurityService.updateSettings(invalidSettings))
        .rejects
        .toThrow('Invalid IP format: 192.168.1.256/24');
    });

    it('should validate phone number format for SMS OTP', async () => {
      const invalidSettings: BillPaySecuritySettings = {
        ...mockSettings,
        otpSettings: {
          method: 'sms' as const,
          phone: '123456', // Invalid phone format
          email: 'test@example.com' // Keep required email field
        }
      };

      await expect(billPaySecurityService.updateSettings(invalidSettings))
        .rejects
        .toThrow('Invalid phone number format');
    });

    it('should handle API errors gracefully', async () => {
      const error = new Error('Network error');
      (api.put as jest.Mock).mockRejectedValueOnce(error);

      await expect(billPaySecurityService.updateSettings(updatedSettings))
        .rejects
        .toThrow('Failed to update security settings: Network error');
    });

    it('should handle validation errors', async () => {
      const validationError = {
        response: {
          data: {
            code: 'VALIDATION_ERROR',
            message: 'Password length must be at least 8 characters'
          }
        }
      };
      (api.put as jest.Mock).mockRejectedValueOnce(validationError);

      await expect(billPaySecurityService.updateSettings(updatedSettings))
        .rejects
        .toThrow('Invalid security settings: Password length must be at least 8 characters');
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

      const result = await billPaySecurityService.validateSettings(mockSettings);

      expect(api.post).toHaveBeenCalledWith('/security/bill-pay/settings/validate', mockSettings);
      expect(result).toEqual(validationResult);
    });

    it('should catch invalid IP format in local validation', async () => {
      const invalidSettings: BillPaySecuritySettings = {
        ...mockSettings,
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
        ...mockSettings,
        otpSettings: {
          method: 'sms' as const,
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
        ...mockSettings,
        passwordPolicy: {
          ...mockSettings.passwordPolicy,
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

      await expect(billPaySecurityService.validateSettings(mockSettings))
        .rejects
        .toThrow('Failed to validate security settings: Network error');
    });
  });

  describe('sendOTP', () => {
    it('should send OTP via email successfully', async () => {
      const successResponse = {
        success: true,
        message: 'OTP sent successfully'
      };

      (api.post as jest.Mock).mockResolvedValueOnce({
        data: { data: successResponse }
      });

      const result = await billPaySecurityService.sendOTP('email', 'test@example.com');

      expect(api.post).toHaveBeenCalledWith('/security/bill-pay/otp/send', {
        method: 'email',
        destination: 'test@example.com'
      });
      expect(result).toEqual(successResponse);
    });

    it('should send OTP via SMS successfully', async () => {
      const successResponse = {
        success: true,
        message: 'OTP sent successfully'
      };

      (api.post as jest.Mock).mockResolvedValueOnce({
        data: { data: successResponse }
      });

      const result = await billPaySecurityService.sendOTP('sms', '+1234567890');

      expect(api.post).toHaveBeenCalledWith('/security/bill-pay/otp/send', {
        method: 'sms',
        destination: '+1234567890'
      });
      expect(result).toEqual(successResponse);
    });

    it('should validate email format before sending', async () => {
      await expect(billPaySecurityService.sendOTP('email', 'invalid-email'))
        .rejects
        .toThrow('Invalid email format');
    });

    it('should validate phone format before sending', async () => {
      await expect(billPaySecurityService.sendOTP('sms', '123456'))
        .rejects
        .toThrow('Invalid phone number format');
    });

    it('should handle rate limiting', async () => {
      const successResponse = {
        success: true,
        message: 'OTP sent successfully'
      };

      (api.post as jest.Mock).mockResolvedValue({
        data: { data: successResponse }
      });

      // Send max allowed attempts
      for (let i = 0; i < 3; i++) {
        await billPaySecurityService.sendOTP('email', 'test@example.com');
      }

      // Next attempt should fail
      await expect(billPaySecurityService.sendOTP('email', 'test@example.com'))
        .rejects
        .toThrow('Too many OTP attempts. Please try again later.');
    });

    it('should handle invalid destination error', async () => {
      billPaySecurityService.resetOTPAttempts(); // Reset attempts before test
      const error = {
        response: {
          data: {
            code: 'INVALID_DESTINATION',
            message: 'Invalid email format'
          }
        }
      };
      (api.post as jest.Mock).mockRejectedValueOnce(error);

      await expect(billPaySecurityService.sendOTP('email', 'test@example.com'))
        .rejects
        .toThrow('Invalid email destination: test@example.com');
    });

    it('should handle OTP limit exceeded error', async () => {
      billPaySecurityService.resetOTPAttempts(); // Reset attempts before test
      const error = {
        response: {
          data: {
            code: 'OTP_LIMIT_EXCEEDED',
            message: 'Too many attempts'
          }
        }
      };
      (api.post as jest.Mock).mockRejectedValueOnce(error);

      await expect(billPaySecurityService.sendOTP('email', 'test@example.com'))
        .rejects
        .toThrow('Too many OTP attempts. Please try again later.');
    });

    it('should handle API errors gracefully', async () => {
      billPaySecurityService.resetOTPAttempts(); // Reset attempts before test
      const error = new Error('Network error');
      (api.post as jest.Mock).mockRejectedValueOnce(error);

      await expect(billPaySecurityService.sendOTP('email', 'test@example.com'))
        .rejects
        .toThrow('Failed to send OTP: Network error');
    });
  });

  describe('verifyOTP', () => {
    it('should verify OTP successfully', async () => {
      const successResponse = {
        success: true,
        message: 'OTP verified successfully'
      };

      (api.post as jest.Mock).mockResolvedValueOnce({
        data: { data: successResponse }
      });

      const result = await billPaySecurityService.verifyOTP('123456');

      expect(api.post).toHaveBeenCalledWith('/security/bill-pay/otp/verify', {
        otp: '123456'
      });
      expect(result).toEqual(successResponse);
    });

    it('should validate OTP format before sending', async () => {
      await expect(billPaySecurityService.verifyOTP('12345'))
        .rejects
        .toThrow('Invalid OTP format. Must be 6 digits.');

      await expect(billPaySecurityService.verifyOTP('1234567'))
        .rejects
        .toThrow('Invalid OTP format. Must be 6 digits.');

      await expect(billPaySecurityService.verifyOTP('abcdef'))
        .rejects
        .toThrow('Invalid OTP format. Must be 6 digits.');
    });

    it('should handle invalid OTP', async () => {
      const error = {
        response: {
          data: {
            code: 'INVALID_OTP',
            message: 'Invalid OTP code'
          }
        }
      };
      (api.post as jest.Mock).mockRejectedValueOnce(error);

      await expect(billPaySecurityService.verifyOTP('000000'))
        .rejects
        .toThrow('Invalid OTP code');
    });

    it('should handle expired OTP', async () => {
      const error = {
        response: {
          data: {
            code: 'OTP_EXPIRED',
            message: 'OTP has expired'
          }
        }
      };
      (api.post as jest.Mock).mockRejectedValueOnce(error);

      await expect(billPaySecurityService.verifyOTP('123456'))
        .rejects
        .toThrow('OTP has expired. Please request a new one.');
    });

    it('should handle API errors gracefully', async () => {
      const error = new Error('Network error');
      (api.post as jest.Mock).mockRejectedValueOnce(error);

      await expect(billPaySecurityService.verifyOTP('123456'))
        .rejects
        .toThrow('Failed to verify OTP: Network error');
    });

    it('should reset attempt counter on successful verification', async () => {
      billPaySecurityService.resetOTPAttempts(); // Reset attempts before test
      const successResponse = {
        success: true,
        message: 'OTP sent successfully'
      };

      // First send an OTP
      (api.post as jest.Mock).mockResolvedValueOnce({
        data: { data: successResponse }
      });
      await billPaySecurityService.sendOTP('email', 'test@example.com');

      // Then verify it
      (api.post as jest.Mock).mockResolvedValueOnce({
        data: { data: successResponse }
      });
      await billPaySecurityService.verifyOTP('123456');

      // Should be able to send another OTP immediately
      (api.post as jest.Mock).mockResolvedValueOnce({
        data: { data: successResponse }
      });
      const result = await billPaySecurityService.sendOTP('email', 'test@example.com');
      expect(result).toEqual(successResponse);
    });
  });
});
