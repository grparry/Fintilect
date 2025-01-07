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

const HOST_TYPES = ['PHYSICAL', 'VIRTUAL', 'CONTAINER'] as const;
const HOST_STATUSES = ['RUNNING', 'STOPPED', 'MAINTENANCE', 'ERROR'] as const;
const OPERATING_SYSTEMS = ['LINUX', 'WINDOWS', 'MACOS'] as const;
const ENVIRONMENT_TYPES = ['DEVELOPMENT', 'STAGING', 'PRODUCTION'] as const;

export const hostSchemas = {
  updateConnection: Joi.object({
    name: Joi.string().max(100),
    host: Joi.string().hostname(),
    port: Joi.number().port(),
    username: Joi.string(),
    password: Joi.string(),
    database: Joi.string(),
    options: Joi.object({
      encrypt: Joi.boolean(),
      trustServerCertificate: Joi.boolean(),
      connectionTimeout: Joi.number().integer().min(1000).max(60000),
      requestTimeout: Joi.number().integer().min(1000).max(300000),
      maxConnections: Joi.number().integer().min(1).max(1000),
      minConnections: Joi.number().integer().min(0).max(100),
      maxRetries: Joi.number().integer().min(0).max(10),
      maxAttempts: Joi.number().integer().min(1).max(10),
      backoffInterval: Joi.number().integer().min(1000).max(300000)
    })
  }).min(1),

  listHosts: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(20),
    type: Joi.string().valid(...HOST_TYPES),
    status: Joi.string().valid(...HOST_STATUSES),
    environment: Joi.string().valid(...ENVIRONMENT_TYPES),
    search: Joi.string().max(100)
  }),

  getHost: Joi.object({
    id: Joi.string().required()
  }),

  createHost: Joi.object({
    name: Joi.string().min(2).max(100).required(),
    type: Joi.string().valid(...HOST_TYPES).required(),
    operatingSystem: Joi.string().valid(...OPERATING_SYSTEMS).required(),
    environment: Joi.string().valid(...ENVIRONMENT_TYPES).required(),
    ipAddress: Joi.string().ip(),
    hostname: Joi.string().hostname(),
    specs: Joi.object({
      cpu: Joi.string().required(),
      memory: Joi.string().required(),
      storage: Joi.string().required(),
      network: Joi.string()
    }).required(),
    location: Joi.object({
      datacenter: Joi.string().required(),
      rack: Joi.string(),
      position: Joi.string()
    }),
    metadata: Joi.object({
      department: Joi.string(),
      owner: Joi.string(),
      project: Joi.string(),
      notes: Joi.string().max(1000)
    })
  }),

  updateHost: Joi.object({
    name: Joi.string().min(2).max(100),
    status: Joi.string().valid(...HOST_STATUSES),
    ipAddress: Joi.string().ip(),
    hostname: Joi.string().hostname(),
    specs: Joi.object({
      cpu: Joi.string(),
      memory: Joi.string(),
      storage: Joi.string(),
      network: Joi.string()
    }),
    location: Joi.object({
      datacenter: Joi.string(),
      rack: Joi.string(),
      position: Joi.string()
    }),
    metadata: Joi.object({
      department: Joi.string(),
      owner: Joi.string(),
      project: Joi.string(),
      notes: Joi.string().max(1000)
    })
  }).min(1),

  deleteHost: Joi.object({
    id: Joi.string().required()
  }),

  getHostMetrics: Joi.object({
    id: Joi.string().required(),
    metrics: Joi.array().items(Joi.string().valid(
      'cpu_usage',
      'memory_usage',
      'disk_usage',
      'network_io',
      'process_count',
      'uptime'
    )).min(1).required(),
    fromDate: Joi.date().iso(),
    toDate: Joi.date().iso(),
    interval: Joi.string().valid('1m', '5m', '15m', '1h', '1d').default('5m')
  }),

  getHostLogs: Joi.object({
    id: Joi.string().required(),
    fromDate: Joi.date().iso(),
    toDate: Joi.date().iso(),
    level: Joi.string().valid('debug', 'info', 'warn', 'error').default('info'),
    service: Joi.string(),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(20)
  })
};
