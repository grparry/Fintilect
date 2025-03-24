import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';
import { API_CONFIG } from '../config/api.config';
import { ApiSuccessResponse, ApiErrorResponse } from './types';
import logger from '../utils/logger';

const DEFAULT_TIMEOUT = 30000;
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

/**
 * Transform object keys to PascalCase or camelCase
 */
function transformKeys(obj: any, toPascal: boolean): any {
  if (!obj || typeof obj !== 'object') return obj;
  
  if (Array.isArray(obj)) {
    return obj.map(item => transformKeys(item, toPascal));
  }

  return Object.entries(obj).reduce((acc, [key, value]) => {
    // Handle nested objects and arrays
    const transformedValue = transformKeys(value, toPascal);
    
    // Transform the key
    const transformedKey = toPascal
      ? key.charAt(0).toUpperCase() + key.slice(1)
      : key.charAt(0).toLowerCase() + key.slice(1);
    
    acc[transformedKey] = transformedValue;
    return acc;
  }, {} as Record<string, any>);
}

/**
 * Core API client for the service layer.
 * This is the single source of truth for API communication and should only be used through the service layer.
 * Features:
 * - Automatic case transformation (camelCase ↔ PascalCase)
 * - Automatic retry with configurable delay
 * - Request timeouts
 * - Error handling with typed responses
 * - Query parameter handling
 * - Content type handling
 * - Request ID tracking
 */
class ApiClient {
  private static instance: AxiosInstance;

  private constructor() {
    // Create Axios instance with default config (no baseURL)
    ApiClient.instance = axios.create({
      timeout: API_CONFIG.timeout,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Request interceptor: Add auth token and transform to PascalCase for C# API
    ApiClient.instance.interceptors.request.use(
      config => {
        // Add auth token from session storage if available
        const session = sessionStorage.getItem('auth_session');
        if (session) {
          try {
            const { token } = JSON.parse(session);
            if (token) {
              if (!config.headers) {
                config.headers = new axios.AxiosHeaders();
              }
              config.headers.set('Authorization', `Bearer ${token}`);
            }
          } catch (e) {
            logger.error('Failed to parse auth session:', e);
          }
        }

        if (config.data) {
          config.data = transformKeys(config.data, true);
        }
        if (config.params) {
          config.params = transformKeys(config.params, true);
        }
        logger.info('API Request', JSON.stringify({
          url: config.url,
          method: config.method,
          headers: config.headers,
          data: config.data
        }));
        return config;
      },
      error => Promise.reject(error)
    );

    // Response interceptor: Transform to camelCase for TypeScript
    ApiClient.instance.interceptors.response.use(
      response => {
        if (response.data) {
          response.data = transformKeys(response.data, false);
        }
        return response;
      },
      (error: AxiosError<ApiErrorResponse>) => {
        // Log the error
        logger.error({
          message: 'API Error',
          url: error.config?.url,
          method: error.config?.method,
          status: error.response?.status,
          error: error.response?.data
        });

        // Transform error response to camelCase
        if (error.response?.data) {
          error.response.data = transformKeys(error.response.data, false);
        }
        return Promise.reject(error);
      }
    );

    // Add retry logic
    let retryCount = 0;
    ApiClient.instance.interceptors.response.use(
      response => response,
      async error => {
        const config = error.config;
        
        // Only retry on network errors or 5xx errors
        if ((!error.response || (error.response.status >= 500 && error.response.status <= 599)) 
            && retryCount < MAX_RETRIES) {
          retryCount++;
          
          // Exponential backoff
          const delay = RETRY_DELAY * Math.pow(2, retryCount - 1);
          await new Promise(resolve => setTimeout(resolve, delay));
          
          return ApiClient.instance(config);
        }
        
        return Promise.reject(error);
      }
    );
  }

  static getInstance(): AxiosInstance {
    if (!ApiClient.instance) {
      new ApiClient();
    }
    return ApiClient.instance;
  }
}

// Export the Axios instance and types
export type { AxiosResponse, AxiosError } from 'axios';
export default ApiClient.getInstance();