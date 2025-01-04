import { Router } from 'express';
import { HostController } from '../controllers/host.controller';
import { validateRequest } from '../middleware';
import { hostSchemas } from '../validators/host.validator';

const router = Router();
const controller = new HostController();

// Get host connection info
router.get('/connection', controller.getConnection);

// Update host connection
router.put('/connection',
  validateRequest(hostSchemas.updateConnection),
  controller.updateConnection
);

/**
 * @openapi
 * /host/info:
 *   get:
 *     summary: Get host information
 *     description: Retrieve information about the host environment
 *     tags: [Host]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Host information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HostInfo'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.get('/info', controller.getHostInfo);

/**
 * @openapi
 * /host/config:
 *   get:
 *     summary: Get host configuration
 *     description: Retrieve host configuration settings
 *     tags: [Host]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Host configuration
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HostConfig'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.get('/config', controller.getHostConfig);

export { router as hostRouter };
