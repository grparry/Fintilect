import { Request, Response, NextFunction } from 'express';
import { logger } from '@cbp-config-api/config/logger';

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log request
  logger.info('Incoming request', {
    path: req.path,
    method: req.method,
    query: req.query,
    ip: req.ip,
    userAgent: req.get('user-agent')
  });

  // Track response time
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info('Request completed', {
      path: req.path,
      method: req.method,
      statusCode: res.statusCode,
      duration: `${duration}ms`
    });
  });

  next();
};
