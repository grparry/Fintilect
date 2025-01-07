import Joi from 'joi';

const EVENT_TYPES = ['PAGE_VIEW', 'CLICK', 'FORM_SUBMIT', 'API_CALL', 'ERROR', 'CUSTOM'] as const;
const EVENT_STATUSES = ['SUCCESS', 'FAILURE', 'PENDING'] as const;
const PLATFORMS = ['WEB', 'MOBILE', 'API'] as const;

/**
 * @openapi
 * components:
 *   schemas:
 *     TrackEvent:
 *       type: object
 *       properties:
 *         eventType:
 *           type: string
 *           description: Event type identifier
 *         eventName:
 *           type: string
 *           description: Event name
 *         timestamp:
 *           type: string
 *           format: date-time
 *           description: Event timestamp
 *         userId:
 *           type: string
 *           description: User who triggered the event
 *         sessionId:
 *           type: string
 *           description: Session identifier
 *         platform:
 *           type: string
 *           description: Event platform (web, mobile, api)
 *         status:
 *           type: string
 *           description: Event status (success, failure, pending)
 *         duration:
 *           type: integer
 *           description: Event duration
 *         metadata:
 *           type: object
 *           description: Additional event data
 *       required:
 *         - eventType
 *         - eventName
 *         - timestamp
 *         - platform
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
  queryParams: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(20),
    eventType: Joi.string().valid(...EVENT_TYPES),
    fromDate: Joi.date().iso(),
    toDate: Joi.date().iso(),
    platform: Joi.string().valid(...PLATFORMS)
  }),

  trackEvent: Joi.object({
    eventType: Joi.string().valid(...EVENT_TYPES).required(),
    eventName: Joi.string().max(100).required(),
    timestamp: Joi.date().iso().required(),
    userId: Joi.string(),
    sessionId: Joi.string(),
    platform: Joi.string().valid(...PLATFORMS).required(),
    status: Joi.string().valid(...EVENT_STATUSES).default('SUCCESS'),
    duration: Joi.number().integer().min(0),
    metadata: Joi.object({
      url: Joi.string().uri(),
      component: Joi.string(),
      action: Joi.string(),
      errorMessage: Joi.string(),
      customData: Joi.object()
    })
  }),

  getEvents: Joi.object({
    fromDate: Joi.date().iso().required(),
    toDate: Joi.date().iso().required(),
    eventType: Joi.string().valid(...EVENT_TYPES),
    eventName: Joi.string(),
    userId: Joi.string(),
    sessionId: Joi.string(),
    platform: Joi.string().valid(...PLATFORMS),
    status: Joi.string().valid(...EVENT_STATUSES),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(20)
  }),

  getEventSummary: Joi.object({
    fromDate: Joi.date().iso().required(),
    toDate: Joi.date().iso().required(),
    groupBy: Joi.array().items(
      Joi.string().valid('eventType', 'eventName', 'platform', 'status', 'userId')
    ).min(1).required()
  }),

  getUserActivity: Joi.object({
    userId: Joi.string().required(),
    fromDate: Joi.date().iso(),
    toDate: Joi.date().iso(),
    eventTypes: Joi.array().items(Joi.string().valid(...EVENT_TYPES)),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(20)
  }),

  getSessionActivity: Joi.object({
    sessionId: Joi.string().required(),
    eventTypes: Joi.array().items(Joi.string().valid(...EVENT_TYPES))
  }),

  eventCreate: Joi.object({
    type: Joi.string().required(),
    data: Joi.object().required(),
    userId: Joi.string().required(),
    timestamp: Joi.date().iso()
  }),

  eventQuery: Joi.object({
    startDate: Joi.date().iso().required(),
    endDate: Joi.date().iso().required(),
    type: Joi.string().optional(),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(20)
  }),

  changeQuery: Joi.object({
    startDate: Joi.date().iso().required(),
    endDate: Joi.date().iso().required(),
    entityType: Joi.string().optional(),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(20)
  }),

  paymentQuery: Joi.object({
    startDate: Joi.date().iso().required(),
    endDate: Joi.date().iso().required(),
    status: Joi.string().optional(),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(20)
  })
};
