interface LoggerOptions {
  level?: string;
  timestamp?: boolean;
}

class Logger {
  private level: string;
  private timestamp: boolean;

  constructor(options: LoggerOptions = {}) {
    this.level = options.level || 'info';
    this.timestamp = options.timestamp !== false;
  }

  private getTimestamp(): string {
    return this.timestamp ? `[${new Date().toISOString()}] ` : '';
  }

  private formatMessage(level: string, message: string, meta?: any): string {
    const timestamp = this.getTimestamp();
    const metaStr = meta ? ` ${JSON.stringify(meta)}` : '';
    return `${timestamp}${level.toUpperCase()}: ${message}${metaStr}`;
  }

  info(message: string, meta?: any): void {
    if (['debug', 'info', 'warn', 'error'].includes(this.level)) {
      console.log(this.formatMessage('info', message, meta));
    }
  }

  warn(message: string, meta?: any): void {
    if (['debug', 'info', 'warn', 'error'].includes(this.level)) {
      console.warn(this.formatMessage('warn', message, meta));
    }
  }

  error(message: string, meta?: any): void {
    if (['debug', 'info', 'warn', 'error'].includes(this.level)) {
      console.error(this.formatMessage('error', message, meta));
    }
  }

  debug(message: string, meta?: any): void {
    if (this.level === 'debug') {
      console.debug(this.formatMessage('debug', message, meta));
    }
  }
}

export const logger = new Logger({
  level: process.env.LOG_LEVEL || 'info',
  timestamp: true,
});
