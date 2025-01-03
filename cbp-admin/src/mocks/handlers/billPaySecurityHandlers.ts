import { http, HttpResponse } from 'msw';
import { BillPaySecuritySettings } from '../../types/security.types';

const mockSecuritySettings: BillPaySecuritySettings = {
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
    addresses: '192.168.1.0/24, 10.0.0.0/8'
  },
  otpSettings: {
    method: 'email',
    email: 'admin@example.com',
    phone: '+1234567890'
  }
};

export const billPaySecurityHandlers = [
  // Get security settings
  http.get('*/bill-pay/security', () => {
    console.log('MSW: Handling get security settings request');
    console.log('MSW: Returning settings', mockSecuritySettings);

    return HttpResponse.json({
      success: true,
      data: mockSecuritySettings
    });
  }),

  // Update security settings
  http.put('*/bill-pay/security', async ({ request }) => {
    console.log('MSW: Handling update security settings request');
    const settings = await request.json() as BillPaySecuritySettings;

    Object.assign(mockSecuritySettings, settings);
    console.log('MSW: Updated settings', mockSecuritySettings);

    return HttpResponse.json({
      success: true,
      data: mockSecuritySettings
    });
  }),

  // Validate security settings
  http.post('*/bill-pay/security/validate', async ({ request }) => {
    console.log('MSW: Handling validate security settings request');
    const settings = await request.json() as BillPaySecuritySettings;

    // Perform validation
    const errors: Record<string, string> = {};
    
    if (settings.passwordPolicy.minLength < 8) {
      errors.minLength = 'Minimum length must be at least 8 characters';
    }
    
    if (settings.loginPolicy.maxAttempts < 1) {
      errors.maxAttempts = 'Maximum attempts must be at least 1';
    }

    const validation = {
      isValid: Object.keys(errors).length === 0,
      errors
    };

    console.log('MSW: Validation result', validation);

    return HttpResponse.json({
      success: true,
      data: validation
    });
  }),

  // Send OTP
  http.post('*/bill-pay/security/otp/send', async ({ request }) => {
    console.log('MSW: Handling send OTP request');
    const { method, destination } = await request.json() as { method: 'email' | 'sms', destination: string };

    console.log('MSW: Sending OTP via', method, 'to', destination);

    return HttpResponse.json({
      success: true,
      data: {
        success: true,
        message: `OTP sent successfully via ${method} to ${destination}`
      }
    });
  }),

  // Verify OTP
  http.post('*/bill-pay/security/otp/verify', async ({ request }) => {
    console.log('MSW: Handling verify OTP request');
    const { code } = await request.json() as { code: string };

    const isValid = code === '123456'; // Mock validation

    console.log('MSW: Verifying OTP', code, isValid);

    return HttpResponse.json({
      success: true,
      data: {
        success: isValid,
        message: isValid ? 'OTP verified successfully' : 'Invalid OTP'
      }
    });
  })
];
