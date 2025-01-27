import { Request, Response, NextFunction } from 'express';
import NodeCache from 'node-cache';
import { logger } from '@cbp-config-api/config/logger';

// Initialize cache with default TTL of 5 minutes and check period of 10 minutes
const cache = new NodeCache({
  stdTTL: 300,
  checkperiod: 600,
  useClones: false
});

export const cacheMiddleware = <T>(ttlSeconds: number) => {
  return (req: Request, res: Response<T>, next: NextFunction) => {
    try {
      // Create a cache key from the request path and query parameters
      const key = `${req.originalUrl || req.url}`;
      const cachedResponse = cache.get<T>(key);

      if (cachedResponse) {
        logger.debug(`Cache hit for ${key}`);
        res.json(cachedResponse);
        return;
      }

      // Override res.json to cache the response before sending
      const originalJson = res.json;
      res.json = function(body: T | undefined) {
        if (res.statusCode === 200 && body !== undefined) {
          logger.debug(`Caching response for ${key}`);
          cache.set(key, body, ttlSeconds);
        }
        return originalJson.call(this, body);
      };

      next();
    } catch (error) {
      logger.error('Cache middleware error:', error);
      next();
    }
  };
};

// Utility function to clear cache
export const clearCache = (pattern?: string) => {
  if (pattern) {
    const keys = cache.keys();
    const matchingKeys = keys.filter(key => key.includes(pattern));
    matchingKeys.forEach(key => cache.del(key));
    logger.info(`Cleared cache for pattern: ${pattern}`);
  } else {
    cache.flushAll();
    logger.info('Cleared all cache');
  }
};
