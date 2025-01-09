export interface BillPayPasswordPolicy {
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSpecialChars: boolean;
  expiryDays: number;
  preventReuse: number;
}

export interface BillPayLoginPolicy {
  maxAttempts: number;
  lockoutDuration: number;
  sessionTimeout: number;
  requireMFA: boolean;
  allowRememberMe: boolean;
}

export interface BillPayIPWhitelist {
  enabled: boolean;
  addresses: string;
}

export enum BillPayOTPMethod {
  EMAIL = 'email',
  SMS = 'sms'
}

export interface BillPayOTPSettings {
  method: BillPayOTPMethod;
  email: string;
  phone: string;
}

export interface BillPaySecuritySettings {
  passwordPolicy: BillPayPasswordPolicy;
  loginPolicy: BillPayLoginPolicy;
  ipWhitelist: BillPayIPWhitelist;
  otpSettings: BillPayOTPSettings;
  /**
   * Entity tag for optimistic concurrency control
   */
  etag?: string;
}

export interface BillPaySecurityValidation {
  isValid: boolean;
  errors: Record<string, string>;
}
