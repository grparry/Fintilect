import Joi from 'joi';
import { z } from 'zod';

/**
 * @openapi
 * components:
 *   schemas:
 *     Payee:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique payee identifier
 *         type:
 *           type: string
 *           enum: [INDIVIDUAL, BUSINESS]
 *           description: Type of payee
 *         status:
 *           type: string
 *           enum: [ACTIVE, INACTIVE, PENDING_VERIFICATION]
 *           description: Payee status
 *         name:
 *           type: string
 *           description: Payee name
 *         email:
 *           type: string
 *           format: email
 *           description: Contact email
 *         phone:
 *           type: string
 *           description: Contact phone number
 *         taxId:
 *           type: string
 *           description: Tax identification number
 *         bankAccount:
 *           $ref: '#/components/schemas/BankAccount'
 *         address:
 *           $ref: '#/components/schemas/Address'
 *         metadata:
 *           type: object
 *           description: Additional payee metadata
 *       required:
 *         - id
 *         - type
 *         - status
 *         - name
 *         - email
 *         - bankAccount
 *     CreatePayee:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *           enum: [INDIVIDUAL, BUSINESS]
 *           description: Type of payee
 *         name:
 *           type: string
 *           description: Payee name
 *         email:
 *           type: string
 *           format: email
 *           description: Contact email
 *         phone:
 *           type: string
 *           description: Contact phone number
 *         taxId:
 *           type: string
 *           description: Tax identification number
 *         bankAccount:
 *           $ref: '#/components/schemas/BankAccount'
 *         address:
 *           $ref: '#/components/schemas/Address'
 *         metadata:
 *           type: object
 *           description: Additional payee metadata
 *       required:
 *         - type
 *         - name
 *         - email
 *         - bankAccount
 *     UpdatePayee:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Payee name
 *         email:
 *           type: string
 *           format: email
 *           description: Contact email
 *         phone:
 *           type: string
 *           description: Contact phone number
 *         status:
 *           type: string
 *           enum: [ACTIVE, INACTIVE, PENDING_VERIFICATION]
 *           description: Payee status
 *         bankAccount:
 *           $ref: '#/components/schemas/BankAccount'
 *         address:
 *           $ref: '#/components/schemas/Address'
 *         metadata:
 *           type: object
 *           description: Additional payee metadata
 *     BankAccount:
 *       type: object
 *       properties:
 *         accountNumber:
 *           type: string
 *           description: Bank account number
 *         routingNumber:
 *           type: string
 *           description: Bank routing number
 *         accountType:
 *           type: string
 *           enum: [CHECKING, SAVINGS]
 *           description: Type of bank account
 *         bankName:
 *           type: string
 *           description: Name of the bank
 *         accountHolderName:
 *           type: string
 *           description: Name of the account holder
 *       required:
 *         - accountNumber
 *         - routingNumber
 *         - accountType
 *         - accountHolderName
 *     Address:
 *       type: object
 *       properties:
 *         street1:
 *           type: string
 *           description: Street address line 1
 *         street2:
 *           type: string
 *           description: Street address line 2
 *         city:
 *           type: string
 *           description: City
 *         state:
 *           type: string
 *           description: State or province
 *         postalCode:
 *           type: string
 *           description: Postal code
 *         country:
 *           type: string
 *           description: Country code (ISO)
 *       required:
 *         - street1
 *         - city
 *         - state
 *         - postalCode
 *         - country
 */

export const payeeSchemas = {
  createPayee: Joi.object({
    name: Joi.string().required().max(100),
    accountNumber: Joi.string().required().max(50),
    routingNumber: Joi.string().length(9),
    address1: Joi.string().max(100),
    address2: Joi.string().max(100).allow('', null),
    city: Joi.string().max(50),
    state: Joi.string().length(2),
    zipCode: Joi.string().pattern(/^\d{5}(-\d{4})?$/),
    phone: Joi.string().pattern(/^\+?1?\d{10}$/),
    email: Joi.string().email().max(100),
    paymentMethod: Joi.string().valid('ACH', 'CHECK').required(),
    status: Joi.string().valid('ACTIVE', 'INACTIVE').default('ACTIVE'),
    notes: Joi.string().max(500).allow('', null)
  }),

  updatePayee: Joi.object({
    name: Joi.string().max(100),
    accountNumber: Joi.string().max(50),
    routingNumber: Joi.string().length(9),
    address1: Joi.string().max(100),
    address2: Joi.string().max(100).allow('', null),
    city: Joi.string().max(50),
    state: Joi.string().length(2),
    zipCode: Joi.string().pattern(/^\d{5}(-\d{4})?$/),
    phone: Joi.string().pattern(/^\+?1?\d{10}$/),
    email: Joi.string().email().max(100),
    paymentMethod: Joi.string().valid('ACH', 'CHECK'),
    status: Joi.string().valid('ACTIVE', 'INACTIVE'),
    notes: Joi.string().max(500).allow('', null)
  }).min(1) // At least one field must be provided
};

export const zPayeeSchemas = {
  listPayees: z.object({
    page: z.coerce.number().int().min(1).optional().default(1),
    limit: z.coerce.number().int().min(1).max(100).optional().default(20),
    status: z.enum(['ACTIVE', 'INACTIVE', 'PENDING_VERIFICATION']).optional(),
    type: z.enum(['INDIVIDUAL', 'BUSINESS']).optional()
  }),

  payeeId: z.object({
    id: z.string().min(1)
  }),

  bankAccount: z.object({
    accountNumber: z.string().min(1),
    routingNumber: z.string().length(9),
    accountType: z.enum(['CHECKING', 'SAVINGS']),
    bankName: z.string().min(1),
    accountHolderName: z.string().min(1)
  }),

  address: z.object({
    street1: z.string().min(1),
    street2: z.string().optional(),
    city: z.string().min(1),
    state: z.string().length(2),
    postalCode: z.string().regex(/^\d{5}(-\d{4})?$/),
    country: z.string().length(2)
  }),

  createPayee: z.object({
    type: z.enum(['INDIVIDUAL', 'BUSINESS']),
    name: z.string().min(1),
    email: z.string().email(),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/).optional(),
    taxId: z.string().optional(),
    bankAccount: z.lazy(() => zPayeeSchemas.bankAccount),
    address: z.lazy(() => zPayeeSchemas.address),
    metadata: z.record(z.unknown()).optional()
  }),

  updatePayee: z.object({
    name: z.string().min(1).optional(),
    email: z.string().email().optional(),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/).optional(),
    status: z.enum(['ACTIVE', 'INACTIVE', 'PENDING_VERIFICATION']).optional(),
    bankAccount: z.lazy(() => zPayeeSchemas.bankAccount).optional(),
    address: z.lazy(() => zPayeeSchemas.address).optional(),
    metadata: z.record(z.unknown()).optional()
  })
};
