export interface SystemHealth {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: Date;
  components: {
    database: {
      status: 'up' | 'down';
      latency: number;
    };
    cache: {
      status: 'up' | 'down';
      hitRate: number;
    };
    api: {
      status: 'up' | 'down';
      responseTime: number;
    };
  };
  metrics: {
    requestsPerMinute: number;
    errorRate: number;
    averageResponseTime: number;
  };
}

export interface SystemConfig {
  settings: {
    maxConcurrentRequests: number;
    timeoutMs: number;
    retryAttempts: number;
    cacheEnabled: boolean;
    debugMode: boolean;
  };
  security: {
    maxLoginAttempts: number;
    sessionTimeoutMinutes: number;
    requireMfa: boolean;
    passwordPolicy: {
      minLength: number;
      requireSpecialChar: boolean;
      requireNumber: boolean;
      requireUppercase: boolean;
      expiryDays: number;
    };
  };
  notifications: {
    emailEnabled: boolean;
    smsEnabled: boolean;
    alertThresholds: {
      errorRate: number;
      responseTime: number;
      diskUsage: number;
    };
  };
}
