/**
 * @swagger
 * tags:
 *   name: System
 *   description: System configuration and maintenance endpoints
 */

/**
 * @swagger
 * /system/settings:
 *   get:
 *     summary: Get system settings
 *     tags: [System]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: System settings
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 maintenance:
 *                   type: boolean
 *                 debugMode:
 *                   type: boolean
 *                 logLevel:
 *                   type: string
 *                   enum: [ERROR, WARN, INFO, DEBUG]
 *                 timezone:
 *                   type: string
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *   put:
 *     summary: Update system settings
 *     tags: [System]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               maintenance:
 *                 type: boolean
 *               debugMode:
 *                 type: boolean
 *               logLevel:
 *                 type: string
 *                 enum: [ERROR, WARN, INFO, DEBUG]
 *               timezone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Settings updated successfully
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /system/maintenance:
 *   post:
 *     summary: Enable/disable maintenance mode
 *     tags: [System]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               enabled:
 *                 type: boolean
 *               message:
 *                 type: string
 *             required:
 *               - enabled
 *     responses:
 *       200:
 *         description: Maintenance mode updated
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /system/logs:
 *   get:
 *     summary: Get system logs
 *     tags: [System]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: level
 *         schema:
 *           type: string
 *           enum: [ERROR, WARN, INFO, DEBUG]
 *         description: Filter logs by level
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Start date for log filtering
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: End date for log filtering
 *     responses:
 *       200:
 *         description: System logs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 *                   level:
 *                     type: string
 *                     enum: [ERROR, WARN, INFO, DEBUG]
 *                   message:
 *                     type: string
 *                   metadata:
 *                     type: object
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /system/backup:
 *   post:
 *     summary: Create system backup
 *     tags: [System]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       202:
 *         description: Backup initiated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 backupId:
 *                   type: string
 *                 status:
 *                   type: string
 *                   enum: [INITIATED, IN_PROGRESS, COMPLETED, FAILED]
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */

import { Router } from 'express';
import { validateRequest } from '@/middleware/validation.middleware';
import { SystemController } from '@/controllers/system.controller';
import { cacheMiddleware } from '@/middleware/cache.middleware';
import { db } from '@/config/db';
import { z } from 'zod';

const router = Router();
const controller = new SystemController(db);

const systemSchemas = {
  calendarQuery: z.object({
    year: z.number(),
    month: z.number().optional(),
    country: z.string().optional()
  }),
  holidayQuery: z.object({
    country: z.string(),
    year: z.number(),
    month: z.number().optional(),
    type: z.string().optional()
  }),
  statusQuery: z.object({
    service: z.string().optional(),
    component: z.string().optional()
  }),
  errorQuery: z.object({
    from: z.string(),
    to: z.string(),
    severity: z.enum(['INFO', 'WARN', 'ERROR', 'CRITICAL']).optional()
  })
};

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
  validateRequest(systemSchemas.statusQuery),
  controller.getSystemStatus
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

export default router;
