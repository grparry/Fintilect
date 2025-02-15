// API Configuration
export const API_CONFIG = {
  // Set this to true to use mock data instead of real API calls
  useMockData: process.env.REACT_APP_USE_MOCK_DATA === 'true' || process.env.NODE_ENV === 'development',
  // Base URLs for different environments
  baseUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001',
  // API Versions
  version: 'v1',
  // Timeouts
  timeout: 30000, // 30 seconds
  // Mock data configuration
  mockDelay: 500, // Delay in milliseconds for mock responses
  // Service factory configuration
  services: {
    // Enable/disable mock services globally
    useMockServices: process.env.REACT_APP_USE_MOCK_SERVICES === 'true' || process.env.NODE_ENV === 'development',
    // Service-specific mock overrides
    mockOverrides: {
      member: process.env.REACT_APP_MOCK_MEMBER_SERVICE === 'true',
      settings: process.env.REACT_APP_MOCK_SETTINGS_SERVICE === 'true',
      moneyDesktop: process.env.REACT_APP_MOCK_MONEY_DESKTOP_SERVICE === 'true',
      auth: process.env.REACT_APP_MOCK_AUTH_SERVICE === 'true'
    },
    // Cache configuration
    cache: {
      enabled: true,
      ttl: 300000 // 5 minutes in milliseconds
    }
  }
};
// Export the base URL directly for easier access
export const API_BASE_URL = API_CONFIG.baseUrl;
// Export configuration getters
export const getConfig = () => {
  return {
    baseUrl: API_CONFIG.baseUrl,
    version: API_CONFIG.version,
    timeout: API_CONFIG.timeout,
    mockDelay: API_CONFIG.mockDelay,
    useMockServices: API_CONFIG.services.useMockServices,
    mockOverrides: API_CONFIG.services.mockOverrides,
    cache: API_CONFIG.services.cache
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