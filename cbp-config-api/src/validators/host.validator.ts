import Joi from 'joi';
import { z } from 'zod';

/**
 * @openapi
 * components:
 *   schemas:
 *     HostInfo:
 *       type: object
 *       properties:
 *         hostname:
 *           type: string
 *           description: Host machine name
 *         platform:
 *           type: string
 *           description: Operating system platform
 *         arch:
 *           type: string
 *           description: CPU architecture
 *         cpus:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               model:
 *                 type: string
 *               speed:
 *                 type: number
 *               times:
 *                 type: object
 *                 properties:
 *                   user:
 *                     type: number
 *                   nice:
 *                     type: number
 *                   sys:
 *                     type: number
 *                   idle:
 *                     type: number
 *                   irq:
 *                     type: number
 *         memory:
 *           type: object
 *           properties:
 *             total:
 *               type: number
 *               description: Total memory in bytes
 *             free:
 *               type: number
 *               description: Free memory in bytes
 *             used:
 *               type: number
 *               description: Used memory in bytes
 *         network:
 *           type: object
 *           properties:
 *             interfaces:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   address:
 *                     type: string
 *                   netmask:
 *                     type: string
 *                   mac:
 *                     type: string
 *       required:
 *         - hostname
 *         - platform
 *         - arch
 *         - cpus
 *         - memory
 *         - network
 *     HostConfig:
 *       type: object
 *       properties:
 *         environment:
 *           type: string
 *           enum: [development, staging, production]
 *           description: Runtime environment
 *         features:
 *           type: object
 *           properties:
 *             monitoring:
 *               type: boolean
 *             logging:
 *               type: boolean
 *             metrics:
 *               type: boolean
 *         limits:
 *           type: object
 *           properties:
 *             maxConnections:
 *               type: integer
 *             maxMemory:
 *               type: integer
 *             maxCpu:
 *               type: integer
 *         security:
 *           type: object
 *           properties:
 *             sslEnabled:
 *               type: boolean
 *             firewallEnabled:
 *               type: boolean
 *             allowedIps:
 *               type: array
 *               items:
 *                 type: string
 *       required:
 *         - environment
 *         - features
 *         - limits
 *         - security
 */

export const hostSchemas = {
  updateConnection: Joi.object({
    name: Joi.string().max(100),
    status: Joi.string().valid('ACTIVE', 'INACTIVE', 'MAINTENANCE'),
    hostUrl: Joi.string().uri(),
    port: Joi.number().integer().min(1).max(65535),
    protocol: Joi.string().valid('FTP', 'SFTP', 'HTTP', 'HTTPS'),
    username: Joi.string().max(100),
    certificate: Joi.string(),
    maintenanceWindow: Joi.object({
      start: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/),
      end: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/),
      timezone: Joi.string()
    }),
    retryPolicy: Joi.object({
      maxAttempts: Joi.number().integer().min(1).max(10),
      backoffInterval: Joi.number().integer().min(1000).max(300000)
    })
  }).min(1) // At least one field must be provided
};

export const hostZodSchemas = {
  updateConnection: z.object({
    maxConnections: z.number().int().min(1).max(1000).optional(),
    timeout: z.number().int().min(1000).max(60000).optional(),
    keepAlive: z.boolean().optional()
  }).refine(data => Object.keys(data).length > 0, {
    message: "At least one connection parameter must be provided"
  })
};
