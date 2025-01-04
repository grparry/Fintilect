import { Router } from 'express';
import { SystemController } from '../controllers/system.controller';
import { cacheMiddleware } from '../middleware/cache.middleware';
import { validateRequest } from '../middleware';
import { systemSchemas } from '../validators/system.validator';

const router = Router();
const controller = new SystemController();

/**
 * @openapi
 * /system/calendar:
 *   get:
 *     summary: Get calendar dates
 *     description: Retrieve calendar dates with business days and holidays
 *     tags: [System]
 *     parameters:
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *           minimum: 2020
 *           maximum: 2030
 *         description: Calendar year
 *       - in: query
 *         name: month
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 12
 *         description: Calendar month
 *     responses:
 *       200:
 *         description: Calendar dates
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 dates:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/CalendarDate'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 */
router.get('/calendar', 
  validateRequest(systemSchemas.calendarQuery),
  cacheMiddleware(24 * 60 * 60), // Cache for 24 hours
  controller.getCalendarDates
);

/**
 * @openapi
 * /system/holidays:
 *   get:
 *     summary: Get holidays
 *     description: Retrieve list of holidays for a given year
 *     tags: [System]
 *     parameters:
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *           minimum: 2020
 *           maximum: 2030
 *         description: Holiday year
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [BANK, FEDERAL, ALL]
 *         description: Type of holidays to retrieve
 *     responses:
 *       200:
 *         description: List of holidays
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Holiday'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 */
router.get('/holidays',
  validateRequest(systemSchemas.holidayQuery),
  cacheMiddleware(24 * 60 * 60), // Cache for 24 hours
  controller.getHolidays
);

/**
 * @openapi
 * /system/status:
 *   get:
 *     summary: Get system status
 *     description: Retrieve current system status and health metrics
 *     tags: [System]
 *     responses:
 *       200:
 *         description: System status
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SystemStatus'
 */
router.get('/status',
  controller.getGeneratorStatus
);

/**
 * @openapi
 * /system/errors:
 *   get:
 *     summary: Get error summary
 *     description: Retrieve summary of recent system errors
 *     tags: [System]
 *     parameters:
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Start date-time for error summary
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date-time
 *         description: End date-time for error summary
 *       - in: query
 *         name: severity
 *         schema:
 *           type: string
 *           enum: [INFO, WARN, ERROR, CRITICAL]
 *         description: Minimum error severity to include
 *     responses:
 *       200:
 *         description: Error summary
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorSummary'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 */
router.get('/errors',
  validateRequest(systemSchemas.errorQuery),
  cacheMiddleware(5 * 60), // Cache for 5 minutes
  controller.getErrorSummary
);

export { router as systemRouter };
