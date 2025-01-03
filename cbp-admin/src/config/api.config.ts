// API Configuration
export const API_CONFIG = {
  // Set this to true to use mock data instead of real API calls
  useMockData: process.env.REACT_APP_USE_MOCK_DATA === 'true' || process.env.NODE_ENV === 'development',
  
  // Base URLs for different environments
  baseUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000',
  
  // API Versions
  version: 'v1',
  
  // Timeouts
  timeout: 30000, // 30 seconds
  
  // Mock data configuration
  mockDelay: 500, // Delay in milliseconds for mock responses
};

// Export the base URL directly for easier access
export const API_BASE_URL = API_CONFIG.baseUrl;

// Export a helper to determine if we should use mock data
export const shouldUseMockData = () => {
  return API_CONFIG.useMockData;
};
