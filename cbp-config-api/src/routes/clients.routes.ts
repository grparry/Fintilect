import { Router } from 'express';
import { validateRequest } from '../middleware';
import { ClientController } from '../controllers/client.controller';
import { clientSchemas } from '../validators/client.validator';
import { cacheMiddleware } from '../middleware/cache.middleware';

const router = Router();
const controller = new ClientController();

/**
 * @openapi
 * /clients:
 *   get:
 *     summary: List clients
 *     description: Retrieve a list of clients with optional filtering and pagination
 *     tags: [Clients]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 20
 *         description: Items per page
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [ACTIVE, INACTIVE, SUSPENDED]
 *         description: Filter by client status
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [ENTERPRISE, SMB, STARTUP]
 *         description: Filter by client type
 *     responses:
 *       200:
 *         description: List of clients
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Client'
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/',
  validateRequest(clientSchemas.listClientsQuery),
  controller.listClients
);

/**
 * @openapi
 * /clients/{id}:
 *   get:
 *     summary: Get client details
 *     description: Retrieve detailed information about a specific client
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Client ID
 *     responses:
 *       200:
 *         description: Client details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       404:
 *         description: Client not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id',
  validateRequest(clientSchemas.clientIdParam),
  controller.getClientDetails
);

/**
 * @openapi
 * /clients/{id}/settings:
 *   get:
 *     summary: Get client settings
 *     description: Retrieve settings for a specific client
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Client ID
 *     responses:
 *       200:
 *         description: Client settings
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClientSettings'
 *       404:
 *         description: Client settings not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   put:
 *     summary: Update client settings
 *     description: Update settings for a specific client
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Client ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClientSettings'
 *     responses:
 *       200:
 *         description: Updated client settings
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClientSettings'
 *       400:
 *         description: Invalid settings
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Client not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id/settings',
  validateRequest(clientSchemas.clientIdParam),
  cacheMiddleware(5 * 60), // Cache for 5 minutes
  controller.getClientSettings
);

router.put('/:id/settings',
  validateRequest(clientSchemas.clientIdParam),
  validateRequest(clientSchemas.updateClientSettings),
  controller.updateClientSettings
);

export { router as clientsRouter };
