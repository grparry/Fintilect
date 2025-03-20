import { getAdminApiUrl, getClientApiUrl } from './host.config';

// API Configuration
export const API_CONFIG = {
  
  // Base URLs for different services
  // These will be dynamically determined from the client configuration
  urls: {
    // For admin-level API calls
    admin: () => getAdminApiUrl(),
    // For client-specific API calls
    adminCu: () =>  getClientApiUrl()
  },
  
  // API Versions
  version: 'v1',
  
  // Timeouts
  timeout: 30000, // 30 seconds
  
  // Mock data configuration
  mockDelay: 500, // Delay in milliseconds for mock responses
  
  // Service factory configuration
  services: {
    // Enable/disable mock services globally
    useMockServices: false,
    // Service-specific mock overrides
    mockOverrides: {
      auth: process.env.REACT_APP_MOCK_AUTH_SERVICE === 'true',
      user: process.env.REACT_APP_MOCK_USER_SERVICE === 'true',
      client: process.env.REACT_APP_MOCK_CLIENT_SERVICE === 'true',
      billPay: process.env.REACT_APP_MOCK_BILLPAY_SERVICE === 'true',
      security: process.env.REACT_APP_MOCK_SECURITY_SERVICE === 'true',
      clientLoginSecurity: process.env.REACT_APP_MOCK_CLIENT_LOGIN_SECURITY_SERVICE === 'true',
      notification: process.env.REACT_APP_MOCK_NOTIFICATION_SERVICE === 'true',
      exception: process.env.REACT_APP_MOCK_EXCEPTION_SERVICE === 'true',
      fisException: process.env.REACT_APP_MOCK_FIS_EXCEPTION_SERVICE === 'true',
      globalPayee: process.env.REACT_APP_MOCK_PAYEE_SERVICE === 'true',
      payee: process.env.REACT_APP_MOCK_PAYEE_SERVICE === 'true',
      paymentProcessor: process.env.REACT_APP_MOCK_PAYMENT_PROCESSOR_SERVICE === 'true',
      payment: process.env.REACT_APP_MOCK_PAYMENT_SERVICE === 'true',
      report: process.env.REACT_APP_MOCK_REPORT_SERVICE === 'true',
      calendar: process.env.REACT_APP_MOCK_HOLIDAY_SERVICE === 'true', 
      permission: process.env.REACT_APP_MOCK_PERMISSION_SERVICE === 'true',
      dashboard: process.env.REACT_APP_MOCK_DASHBOARD_SERVICE === 'true',
      audit: process.env.REACT_APP_MOCK_AUDIT_SERVICE === 'true',
      member: process.env.REACT_APP_MOCK_MEMBER_SERVICE === 'true',
      settings: process.env.REACT_APP_MOCK_SETTINGS_SERVICE === 'true',
      moneyDesktop: process.env.REACT_APP_MOCK_MONEYDESKTOP_SERVICE === 'true',
      configuration: process.env.REACT_APP_MOCK_CONFIGURATION_SERVICE === 'true'
    },
    
    // Cache configuration
    cache: {
      enabled: true,
      ttl: 300000 // 5 minutes in milliseconds
    }
  }
};

// Export configuration getters
export const getConfig = () => {
  return {
    ...API_CONFIG,
    // Add any computed properties here
  };
};

// Export a helper to determine if a specific service should use mock implementation
export const shouldUseMockService = (serviceName: keyof typeof API_CONFIG.services.mockOverrides) => {
  return API_CONFIG.services.useMockServices || API_CONFIG.services.mockOverrides[serviceName];
};