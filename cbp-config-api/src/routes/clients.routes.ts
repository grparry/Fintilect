import { Router } from 'express';
import { ClientController } from '../controllers/client.controller';
import { ClientService } from '../services/client.service';
import { db } from '../config/db';
import { validateRequest } from '../middleware/validation.middleware';
import { z } from 'zod';
import { authorize } from '../middleware/auth.middleware';

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
