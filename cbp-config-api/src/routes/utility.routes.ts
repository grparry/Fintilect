import { Router } from 'express';
import { UtilityController } from '../controllers/utility.controller';
import { db } from '../config/db';
import { validateRequest } from '../middleware/validation.middleware';
import { z } from 'zod';
import { authMiddleware } from '../middleware/auth.middleware';
import { cacheMiddleware } from '../middleware/cache.middleware';

const utilityController = new UtilityController(db);
const router = Router();

const utilitySchemas = {
  healthCheck: z.object({
    service: z.string(),
    type: z.enum(['basic', 'detailed']).optional()
  }),
  metricsQuery: z.object({
    period: z.enum(['1h', '24h', '7d', '30d'])
  }),
  versionQuery: z.object({}),
  logsQuery: z.object({
    level: z.enum(['debug', 'info', 'warn', 'error']).optional(),
    from: z.string().optional(),
    to: z.string().optional(),
    service: z.string().optional()
  }),
  deliveryDateQuery: z.object({
    orderDate: z.string(),
    postalCode: z.string(),
    serviceLevel: z.enum(['STANDARD', 'EXPRESS', 'PRIORITY'])
  }),
  nsfFeeQuery: z.object({}),
  savedEmailsQuery: z.object({})
};

/**
 * @openapi
 * /utility/health:
 *   get:
 *     summary: Health check
 *     description: Check if the API is healthy and responding
 *     tags: [Utility]
 *     responses:
 *       200:
 *         description: API is healthy
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthCheck'
 */
router.get('/health',
  validateRequest(utilitySchemas.healthCheck),
  utilityController.healthCheck
);

/**
 * @openapi
 * /utility/metrics:
 *   get:
 *     summary: Get API metrics
 *     description: Retrieve API performance and usage metrics
 *     tags: [Utility]
 *     parameters:
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum: [1h, 24h, 7d, 30d]
 *         description: Time period for metrics
 *     responses:
 *       200:
 *         description: API metrics
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiMetrics'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 */
router.get('/metrics',
  validateRequest(utilitySchemas.metricsQuery),
  cacheMiddleware(60), // Cache for 1 minute
  utilityController.getMetrics
);

/**
 * @openapi
 * /utility/version:
 *   get:
 *     summary: Get API version
 *     description: Retrieve current API version and build information
 *     tags: [Utility]
 *     responses:
 *       200:
 *         description: API version info
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VersionInfo'
 */
router.get('/version',
  validateRequest(utilitySchemas.versionQuery),
  cacheMiddleware(60 * 60), // Cache for 1 hour
  utilityController.getVersion
);

/**
 * @openapi
 * /utility/logs:
 *   get:
 *     summary: Get API logs
 *     description: Retrieve API logs with optional filtering
 *     tags: [Utility]
 *     parameters:
 *       - in: query
 *         name: level
 *         schema:
 *           type: string
 *           enum: [debug, info, warn, error]
 *         description: Minimum log level
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Start timestamp
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date-time
 *         description: End timestamp
 *       - in: query
 *         name: service
 *         schema:
 *           type: string
 *         description: Filter by service name
 *     responses:
 *       200:
 *         description: API logs
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LogEntries'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 */
router.get('/logs',
  authMiddleware,
  validateRequest(utilitySchemas.logsQuery),
  utilityController.getLogs
);

/**
 * @openapi
 * /utility/delivery-dates:
 *   get:
 *     summary: Get delivery dates
 *     description: Calculate estimated delivery dates based on order date and location
 *     tags: [Utility]
 *     parameters:
 *       - in: query
 *         name: orderDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Order placement date
 *       - in: query
 *         name: postalCode
 *         required: true
 *         schema:
 *           type: string
 *           pattern: ^\d{5}(-\d{4})?$
 *         description: Delivery postal code
 *       - in: query
 *         name: serviceLevel
 *         required: true
 *         schema:
 *           type: string
 *           enum: [STANDARD, EXPRESS, PRIORITY]
 *         description: Shipping service level
 *     responses:
 *       200:
 *         description: Calculated delivery dates
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estimatedDeliveryDate:
 *                   type: string
 *                   format: date-time
 *                 guaranteedDeliveryDate:
 *                   type: string
 *                   format: date-time
 *                 transitDays:
 *                   type: integer
 *                   minimum: 1
 *                 businessDays:
 *                   type: integer
 *                   minimum: 1
 *               required:
 *                 - estimatedDeliveryDate
 *                 - transitDays
 *                 - businessDays
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 */
router.get('/delivery-dates',
  validateRequest(utilitySchemas.deliveryDateQuery),
  cacheMiddleware(5 * 60), // Cache for 5 minutes
  utilityController.getDeliveryDates
);

// Get NSF fees
router.get('/nsf-fees',
  validateRequest(utilitySchemas.nsfFeeQuery),
  cacheMiddleware(60 * 60), // Cache for 1 hour
  utilityController.getNsfFees
);

// List saved emails
router.get('/saved-emails',
  validateRequest(utilitySchemas.savedEmailsQuery),
  cacheMiddleware(15 * 60), // Cache for 15 minutes
  utilityController.listSavedEmails
);

export default router;
