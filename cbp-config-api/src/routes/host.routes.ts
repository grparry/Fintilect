import { Router } from 'express';
import { HostController } from '../controllers/host.controller';
import { db } from '../config/db';
import { validateRequest } from '../middleware/validation.middleware';
import { z } from 'zod';
import { authMiddleware } from '../middleware/auth.middleware';

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
