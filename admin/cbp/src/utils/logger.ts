interface LoggingConfig {
  enabledIPs: string[];
  logLevel: 'debug' | 'info' | 'warn' | 'error' | 'none';
}

class Logger {
  // Static configuration - loaded once
  private static config: LoggingConfig | null = null;
  private static userIP: string | null = null;
  private static loggingEnabled: boolean = false;
  
  /**
   * Initialize the logger by loading the configuration and determining the user's IP
   */
  public static async initialize(): Promise<void> {
    // Only initialize once
    if (Logger.config !== null) {
      return;
    }

    try {
      // Load configuration once
      const response = await fetch('/logging-config.json');
      if (response.ok) {
        Logger.config = await response.json();
      } else {
        Logger.config = { enabledIPs: [], logLevel: 'error' };
      }

      // Get user IP (using a service or local endpoint)
      try {
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        if (ipResponse.ok) {
          const data = await ipResponse.json();
          Logger.userIP = data.ip;
          
          // Check if user's IP is in the allowlist
          Logger.loggingEnabled = Logger.config.enabledIPs.includes(Logger.userIP);
          console.log(`Logger initialized with IP: ${Logger.userIP}, logging enabled: ${Logger.loggingEnabled}`);
        }
      } catch (error) {
        console.error('Error getting IP address:', error);
        Logger.loggingEnabled = false;
      }
    } catch (error) {
      console.error('Error loading logging configuration:', error);
      Logger.config = { enabledIPs: [], logLevel: 'error' };
      Logger.loggingEnabled = false;
    }
  }
  
  /**
   * Format a log entry with timestamp
   */
  private formatLogEntry(message: any) {
    const timestamp = new Date().toISOString();
    const logEntry = `${timestamp} ${JSON.stringify(message)}\n`;
    return logEntry;
  }
  
  /**
   * Check if a log message should be displayed based on IP and log level
   */
  private shouldLog(level: 'debug' | 'info' | 'warn' | 'error'): boolean {
    // If not initialized or no config, don't log
    if (!Logger.config) {
      return false;
    }

    // Check if logging is enabled for this IP
    if (!Logger.loggingEnabled) {
      return false;
    }

    // Check log level
    const levels = ['debug', 'info', 'warn', 'error'];
    const configLevelIndex = levels.indexOf(Logger.config.logLevel);
    const currentLevelIndex = levels.indexOf(level);

    // Only log if current level is at or above config level
    return currentLevelIndex >= configLevelIndex;
  }

  /**
   * Log a message at the 'debug' level
   * @param args Arguments to log, same as console.log
   */
  async log(...args: any[]): Promise<void> {
    if (!this.shouldLog('debug')) {
      return;
    }
    
    try {
      console.log(...args);
      console.log(this.formatLogEntry(args));
    } catch (error) {
      console.error('Error in log method:', error);
    }
  }

  /**
   * Log a message at the 'error' level
   * @param args Arguments to log, same as console.error
   */
  async error(...args: any[]): Promise<void> {
    if (!this.shouldLog('error')) {
      return;
    }
    
    try {
      console.error(...args);
      console.error(this.formatLogEntry(args));
    } catch (error) {
      console.error('Error in error method:', error);
    }
  }

  /**
   * Log a message at the 'warn' level
   * @param args Arguments to log, same as console.warn
   */
  async warn(...args: any[]): Promise<void> {
    if (!this.shouldLog('warn')) {
      return;
    }
    
    try {
      console.warn(...args);
      console.warn(this.formatLogEntry(args));
    } catch (error) {
      console.error('Error in warn method:', error);
    }
  }

  /**
   * Log a message at the 'info' level
   * @param args Arguments to log, same as console.info
   */
  async info(...args: any[]): Promise<void> {
    if (!this.shouldLog('info')) {
      return;
    }
    
    try {
      console.info(...args);
      console.info(this.formatLogEntry(args));
    } catch (error) {
      console.error('Error in info method:', error);
    }
  }
}

// Create a singleton instance
const loggerInstance = new Logger();

// Export both the instance and the class
export default loggerInstance;
export { Logger };