/**
 * @swagger
 * tags:
 *   name: Host
 *   description: Host system configuration and health check endpoints
 */

/**
 * @swagger
 * /host/health:
 *   get:
 *     summary: Check system health
 *     tags: [Host]
 *     responses:
 *       200:
 *         description: System is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   enum: [UP, DOWN]
 *                 version:
 *                   type: string
 *                 uptime:
 *                   type: number
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *       503:
 *         description: System is unhealthy
 */

/**
 * @swagger
 * /host/config:
 *   get:
 *     summary: Get host configuration
 *     tags: [Host]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Host configuration
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 environment:
 *                   type: string
 *                   enum: [development, staging, production]
 *                 features:
 *                   type: object
 *                   additionalProperties:
 *                     type: boolean
 *                 limits:
 *                   type: object
 *                   properties:
 *                     maxUploadSize:
 *                       type: number
 *                     rateLimit:
 *                       type: number
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /host/metrics:
 *   get:
 *     summary: Get system metrics
 *     tags: [Host]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: System metrics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cpu:
 *                   type: number
 *                 memory:
 *                   type: number
 *                 activeConnections:
 *                   type: number
 *                 requestsPerMinute:
 *                   type: number
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */

import { Router } from 'express';
import { HostController } from '@/controllers/host.controller';
import { db } from '@/config/db';
import { validateRequest } from '@/middleware/validation.middleware';
import { z } from 'zod';
import { authMiddleware } from '@/middleware/auth.middleware';

const hostController = new HostController(db);
const router = Router();

const hostSchemas = {
  updateHostInfo: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    status: z.enum(['active', 'inactive', 'maintenance']).optional()
  }),
  updateSettings: z.object({
    settings: z.record(z.any()),
    environment: z.enum(['development', 'staging', 'production'])
  })
};

// Get host info
router.get('/', hostController.getHostInfo);

// Update host info
router.put('/', validateRequest(hostSchemas.updateHostInfo), hostController.updateHostInfo);

// Get host settings
router.get('/settings', hostController.getHostSettings);

// Update host settings
router.put('/settings', validateRequest(hostSchemas.updateSettings), hostController.updateHostSettings);

export default router;
