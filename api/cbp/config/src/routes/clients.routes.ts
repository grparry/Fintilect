import { Router } from 'express';
import { ClientController } from '@cbp-config-api/controllers/client.controller';
import { ClientService } from '@cbp-config-api/services/client.service';
import { db } from '@cbp-config-api/config/db';
import { validateRequest } from '@cbp-config-api/middleware/validation.middleware';
import { z } from 'zod';
import { authorize } from '@cbp-config-api/middleware/auth.middleware';

/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: Client management endpoints
 */

/**
 * @swagger
 * /clients:
 *   get:
 *     summary: List all clients
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of clients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Client'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *   post:
 *     summary: Create a new client
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *     responses:
 *       201:
 *         description: Client created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /clients/{id}:
 *   get:
 *     summary: Get client by ID
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Client details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *   put:
 *     summary: Update client
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Client updated successfully
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *   delete:
 *     summary: Delete client
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Client deleted successfully
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /clients/{id}/settings:
 *   get:
 *     summary: Get client settings
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Client settings
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 notifications:
 *                   type: boolean
 *                 language:
 *                   type: string
 *                 theme:
 *                   type: string
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *   put:
 *     summary: Update client settings
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               notifications:
 *                 type: boolean
 *               language:
 *                 type: string
 *               theme:
 *                 type: string
 *     responses:
 *       200:
 *         description: Client settings updated successfully
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

const clientService = new ClientService(db);
const clientController = new ClientController(clientService);

const clientSchemas = {
  listClients: z.object({}),
  clientId: z.object({
    id: z.string()
  }),
  createClient: z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string().optional(),
    address: z.string().optional()
  }),
  updateClient: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    address: z.string().optional()
  }),
  updateSettings: z.object({
    notifications: z.boolean(),
    language: z.string(),
    theme: z.string()
  }),
  rejectClient: z.object({
    reason: z.string()
  })
};

const router = Router();

// List all clients
router.get(
  '/',
  authorize(['user', 'admin']),
  validateRequest(clientSchemas.listClients),
  clientController.listClients.bind(clientController)
);

// Get specific client
router.get(
  '/:id',
  authorize(['user', 'admin']),
  validateRequest(clientSchemas.clientId),
  clientController.getClient.bind(clientController)
);

// Create new client
router.post(
  '/',
  authorize(['admin']),
  validateRequest(clientSchemas.createClient),
  clientController.createClient.bind(clientController)
);

// Update client
router.put(
  '/:id',
  authorize(['admin']),
  validateRequest(clientSchemas.updateClient),
  clientController.updateClient.bind(clientController)
);

// Delete client
router.delete(
  '/:id',
  authorize(['admin']),
  validateRequest(clientSchemas.clientId),
  clientController.deleteClient.bind(clientController)
);

// Get client settings
router.get(
  '/:id/settings',
  authorize(['user', 'admin']),
  validateRequest(clientSchemas.clientId),
  clientController.getClientSettings.bind(clientController)
);

// Update client settings
router.put(
  '/:id/settings',
  authorize(['admin']),
  validateRequest(clientSchemas.updateSettings),
  clientController.updateClientSettings.bind(clientController)
);

export default router;
