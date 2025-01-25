import Joi from 'joi';

const PAYEE_TYPES = ['INDIVIDUAL', 'BUSINESS'] as const;
const PAYEE_STATUSES = ['ACTIVE', 'INACTIVE', 'PENDING_VERIFICATION', 'BLOCKED'] as const;
const PAYMENT_METHODS = ['ACH', 'WIRE', 'CHECK'] as const;
const BANK_ACCOUNT_TYPES = ['CHECKING', 'SAVINGS'] as const;

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
 *           enum: [ACTIVE, INACTIVE, PENDING_VERIFICATION, BLOCKED]
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
 *           enum: [ACTIVE, INACTIVE, PENDING_VERIFICATION, BLOCKED]
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
  payeeId: Joi.object({
    id: Joi.string().required()
  }),

  listPayees: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(20),
    status: Joi.string().valid(...PAYEE_STATUSES),
    type: Joi.string().valid(...PAYEE_TYPES),
    search: Joi.string().max(100)
  }),

  getPayee: Joi.object({
    id: Joi.string().required()
  }),

  createPayee: Joi.object({
    type: Joi.string().valid(...PAYEE_TYPES).required(),
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^\+?[1-9]\d{1,14}$/),
    taxId: Joi.string().pattern(/^\d{9}$/).when('type', {
      is: 'BUSINESS',
      then: Joi.required()
    }),
    address: Joi.object({
      street1: Joi.string().required(),
      street2: Joi.string(),
      city: Joi.string().required(),
      state: Joi.string().length(2).required(),
      zipCode: Joi.string().pattern(/^\d{5}(-\d{4})?$/).required(),
      country: Joi.string().length(2).required()
    }).required(),
    bankAccounts: Joi.array().items(Joi.object({
      accountType: Joi.string().valid(...BANK_ACCOUNT_TYPES).required(),
      accountNumber: Joi.string().pattern(/^\d{4,17}$/).required(),
      routingNumber: Joi.string().pattern(/^\d{9}$/).required(),
      bankName: Joi.string().required(),
      primary: Joi.boolean().default(false)
    })).min(1).required(),
    preferredPaymentMethod: Joi.string().valid(...PAYMENT_METHODS).required(),
    metadata: Joi.object({
      category: Joi.string(),
      department: Joi.string(),
      notes: Joi.string().max(1000)
    })
  }),

  updatePayee: Joi.object({
    name: Joi.string().min(2).max(100),
    email: Joi.string().email(),
    phone: Joi.string().pattern(/^\+?[1-9]\d{1,14}$/),
    status: Joi.string().valid(...PAYEE_STATUSES),
    address: Joi.object({
      street1: Joi.string(),
      street2: Joi.string(),
      city: Joi.string(),
      state: Joi.string().length(2),
      zipCode: Joi.string().pattern(/^\d{5}(-\d{4})?$/),
      country: Joi.string().length(2)
    }),
    preferredPaymentMethod: Joi.string().valid(...PAYMENT_METHODS),
    metadata: Joi.object({
      category: Joi.string(),
      department: Joi.string(),
      notes: Joi.string().max(1000)
    })
  }).min(1),

  addBankAccount: Joi.object({
    payeeId: Joi.string().required(),
    accountType: Joi.string().valid(...BANK_ACCOUNT_TYPES).required(),
    accountNumber: Joi.string().pattern(/^\d{4,17}$/).required(),
    routingNumber: Joi.string().pattern(/^\d{9}$/).required(),
    bankName: Joi.string().required(),
    primary: Joi.boolean().default(false)
  }),

  updateBankAccount: Joi.object({
    payeeId: Joi.string().required(),
    accountId: Joi.string().required(),
    accountType: Joi.string().valid(...BANK_ACCOUNT_TYPES),
    primary: Joi.boolean()
  }).min(1),

  deleteBankAccount: Joi.object({
    payeeId: Joi.string().required(),
    accountId: Joi.string().required()
  })
};
