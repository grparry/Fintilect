// API Configuration
export const API_CONFIG = {
  // Set this to true to use mock data instead of real API calls
  useMockData: process.env.REACT_APP_USE_MOCK_DATA === 'true' || process.env.NODE_ENV === 'development',
  
  // Base URLs for different services
  urls: {
    admin: process.env.REACT_APP_ADMIN_API_URL || 'https://localhost:4501',
    adminCu: process.env.REACT_APP_ADMIN_CU_API_URL || 'https://localhost:8001'
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
      auth: process.env.REACT_APP_MOCK_AUTH_SERVICE === 'false',
      user: process.env.REACT_APP_MOCK_USER_SERVICE === 'false',
      client: process.env.REACT_APP_MOCK_CLIENT_SERVICE === 'false',
      billPay: process.env.REACT_APP_MOCK_BILLPAY_SERVICE === 'false',
      security: process.env.REACT_APP_MOCK_SECURITY_SERVICE === 'true',
      notification: process.env.REACT_APP_MOCK_NOTIFICATION_SERVICE === 'true',
      exception: process.env.REACT_APP_MOCK_EXCEPTION_SERVICE === 'true',
      fisException: process.env.REACT_APP_MOCK_FIS_EXCEPTION_SERVICE === 'true',
      globalPayee: process.env.REACT_APP_MOCK_PAYEE_SERVICE === 'false',
      payee: process.env.REACT_APP_MOCK_PAYEE_SERVICE === 'false',
      paymentProcessor: process.env.REACT_APP_MOCK_PAYMENT_PROCESSOR_SERVICE === 'true',
      payment: process.env.REACT_APP_MOCK_PAYMENT_SERVICE === 'true',
      report: process.env.REACT_APP_MOCK_REPORT_SERVICE === 'true',
      holiday: process.env.REACT_APP_MOCK_HOLIDAY_SERVICE === 'true',
      permission: process.env.REACT_APP_MOCK_PERMISSION_SERVICE === 'false',
      dashboard: process.env.REACT_APP_MOCK_DASHBOARD_SERVICE === 'true',
      audit: process.env.REACT_APP_MOCK_AUDIT_SERVICE === 'true',
      member: process.env.REACT_APP_MOCK_MEMBER_SERVICE === 'true',
      settings: process.env.REACT_APP_MOCK_SETTINGS_SERVICE === 'true',
      moneyDesktop: process.env.REACT_APP_MOCK_MONEYDESKTOP_SERVICE === 'true' || process.env.NODE_ENV === 'development'
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

// Export a helper to determine if we should use mock data
export const shouldUseMockData = () => {
  return API_CONFIG.useMockData;
};

// Export a helper to determine if a specific service should use mock implementation
export const shouldUseMockService = (serviceName: keyof typeof API_CONFIG.services.mockOverrides) => {
  return API_CONFIG.services.useMockServices || API_CONFIG.services.mockOverrides[serviceName];
};