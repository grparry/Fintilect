import winston from 'winston';

// Configure logger
export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.metadata({
      fillWith: ['filename', 'className', 'methodName']
    }),
    winston.format.json()
  ),
  transports: [
    // Write all logs with level 'error' and below to 'error.log'
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    // Write all logs with level 'info' and below to 'combined.log'
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

// If we're not in production, log to the console as well
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
  }));
}

// Helper function to create a logger with file context
export function getLogger(filename: string, className?: string) {
  return {
    debug: (message: string, ...args: any[]) => logger.debug(message, { filename, className, ...args }),
    info: (message: string, ...args: any[]) => logger.info(message, { filename, className, ...args }),
    warn: (message: string, ...args: any[]) => logger.warn(message, { filename, className, ...args }),
    error: (message: string, ...args: any[]) => logger.error(message, { filename, className, ...args })
  };
}
