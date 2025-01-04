import Joi from 'joi';
import { z } from 'zod';

/**
 * @openapi
 * components:
 *   schemas:
 *     TrackEvent:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *           description: Event type identifier
 *         action:
 *           type: string
 *           description: Action performed
 *         category:
 *           type: string
 *           description: Event category
 *         label:
 *           type: string
 *           description: Event label
 *         value:
 *           type: number
 *           description: Numeric value associated with event
 *         metadata:
 *           type: object
 *           description: Additional event data
 *       required:
 *         - type
 *         - action
 *     Event:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique event identifier
 *         timestamp:
 *           type: string
 *           format: date-time
 *           description: Event timestamp
 *         userId:
 *           type: string
 *           description: User who triggered the event
 *         type:
 *           type: string
 *           description: Event type identifier
 *         action:
 *           type: string
 *           description: Action performed
 *         category:
 *           type: string
 *           description: Event category
 *         label:
 *           type: string
 *           description: Event label
 *         value:
 *           type: number
 *           description: Numeric value associated with event
 *         metadata:
 *           type: object
 *           description: Additional event data
 *         source:
 *           type: string
 *           description: Event source (web, mobile, api)
 *         sessionId:
 *           type: string
 *           description: Session identifier
 *       required:
 *         - id
 *         - timestamp
 *         - userId
 *         - type
 *         - action
 *         - source
 */

export const trackingSchemas = {
  trackEvent: z.object({
    type: z.string().min(1),
    action: z.string().min(1),
    category: z.string().optional(),
    label: z.string().optional(),
    value: z.number().optional(),
    metadata: z.record(z.unknown()).optional()
  }),

  getEvents: z.object({
    from: z.string().datetime(),
    to: z.string().datetime(),
    type: z.string().optional(),
    userId: z.string().optional(),
    page: z.coerce.number().int().min(1).optional().default(1),
    limit: z.coerce.number().int().min(1).max(100).optional().default(20)
  }),

  queryParams: z.object({
    page: z.coerce.number().int().min(1).optional().default(1),
    limit: z.coerce.number().int().min(1).max(100).optional().default(20),
    type: z.string().optional(),
    from: z.string().datetime().optional(),
    to: z.string().datetime().optional()
  })
};
