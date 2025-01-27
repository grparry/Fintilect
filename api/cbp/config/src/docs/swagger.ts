import swaggerJsdoc from 'swagger-jsdoc';
import { version } from '@cbp-config-api/../package.json';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CBP Config API',
      version,
      description: 'API for managing client configurations and settings',
      contact: {
        name: 'Fintilect Support',
        url: 'https://fintilect.com/support',
        email: 'support@fintilect.com'
      },
      license: {
        name: 'Private License',
        url: 'https://fintilect.com/license'
      }
    },
    servers: [
      {
        url: '/api',
        description: 'API Server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      responses: {
        BadRequest: {
          description: 'Invalid request parameters',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        },
        Unauthorized: {
          description: 'Authentication required',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        },
        Forbidden: {
          description: 'Permission denied',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        },
        NotFound: {
          description: 'Resource not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        }
      },
      schemas: {
        Error: {
          type: 'object',
          properties: {
            message: { type: 'string', description: 'Error message' },
            code: { type: 'string', description: 'Error code' }
          },
          required: ['message']
        },
        Pagination: {
          type: 'object',
          properties: {
            total: { type: 'integer', description: 'Total number of items' },
            page: { type: 'integer', description: 'Current page number' },
            limit: { type: 'integer', description: 'Items per page' },
            pages: { type: 'integer', description: 'Total number of pages' }
          },
          required: ['total', 'page', 'limit', 'pages']
        },
        Client: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'Unique client identifier' },
            name: { type: 'string', description: 'Client name' },
            type: { type: 'string', enum: ['ENTERPRISE', 'SMB', 'STARTUP'], description: 'Client type' },
            status: { type: 'string', enum: ['ACTIVE', 'INACTIVE', 'SUSPENDED'], description: 'Client status' },
            environment: { type: 'string', enum: ['PRODUCTION', 'STAGING', 'DEVELOPMENT'], description: 'Client environment' }
          },
          required: ['id', 'name', 'type', 'status', 'environment']
        },
        ClientSettings: {
          type: 'object',
          properties: {
            general: {
              type: 'object',
              properties: {
                timezone: { type: 'string', description: 'Client timezone (IANA format)' },
                dateFormat: { type: 'string', enum: ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD'], description: 'Date format preference' },
                timeFormat: { type: 'string', enum: ['12h', '24h'], description: 'Time format preference' },
                currency: { type: 'string', description: 'ISO currency code' },
                language: { type: 'string', description: 'ISO language code' }
              }
            },
            security: {
              type: 'object',
              properties: {
                passwordPolicy: {
                  type: 'object',
                  properties: {
                    minLength: { type: 'integer', minimum: 8, maximum: 32, description: 'Minimum password length' },
                    requireUppercase: { type: 'boolean', description: 'Require uppercase characters' },
                    requireLowercase: { type: 'boolean', description: 'Require lowercase characters' },
                    requireNumbers: { type: 'boolean', description: 'Require numeric characters' },
                    requireSpecialChars: { type: 'boolean', description: 'Require special characters' },
                    expirationDays: { type: 'integer', minimum: 0, description: 'Password expiration in days (0 for never)' }
                  }
                },
                loginPolicy: {
                  type: 'object',
                  properties: {
                    maxAttempts: { type: 'integer', minimum: 1, description: 'Maximum login attempts before lockout' },
                    lockoutDuration: { type: 'integer', minimum: 1, description: 'Account lockout duration in minutes' }
                  }
                }
              }
            }
          }
        },
        HostInfo: {
          type: 'object',
          properties: {
            hostname: { type: 'string', description: 'Host machine name' },
            platform: { type: 'string', description: 'Operating system platform' },
            arch: { type: 'string', description: 'CPU architecture' },
            cpus: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  model: { type: 'string' },
                  speed: { type: 'number' },
                  times: {
                    type: 'object',
                    properties: {
                      user: { type: 'number' },
                      nice: { type: 'number' },
                      sys: { type: 'number' },
                      idle: { type: 'number' },
                      irq: { type: 'number' }
                    }
                  }
                }
              }
            },
            memory: {
              type: 'object',
              properties: {
                total: { type: 'number', description: 'Total memory in bytes' },
                free: { type: 'number', description: 'Free memory in bytes' },
                used: { type: 'number', description: 'Used memory in bytes' }
              }
            }
          },
          required: ['hostname', 'platform', 'arch', 'cpus', 'memory']
        },
        Payee: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'Unique payee identifier' },
            type: { type: 'string', enum: ['INDIVIDUAL', 'BUSINESS'], description: 'Type of payee' },
            status: { type: 'string', enum: ['ACTIVE', 'INACTIVE', 'PENDING_VERIFICATION', 'BLOCKED'], description: 'Payee status' },
            name: { type: 'string', description: 'Payee name' },
            email: { type: 'string', format: 'email', description: 'Contact email' },
            phone: { type: 'string', description: 'Contact phone number' },
            taxId: { type: 'string', description: 'Tax identification number' },
            bankAccount: { $ref: '#/components/schemas/BankAccount' },
            address: { $ref: '#/components/schemas/Address' },
            metadata: { type: 'object', description: 'Additional payee metadata' }
          },
          required: ['id', 'type', 'status', 'name', 'email', 'bankAccount']
        },
        BankAccount: {
          type: 'object',
          properties: {
            accountNumber: { type: 'string', description: 'Bank account number' },
            routingNumber: { type: 'string', description: 'Bank routing number' },
            accountType: { type: 'string', enum: ['CHECKING', 'SAVINGS'], description: 'Type of bank account' },
            bankName: { type: 'string', description: 'Name of the bank' },
            accountHolderName: { type: 'string', description: 'Name of the account holder' }
          },
          required: ['accountNumber', 'routingNumber', 'accountType', 'accountHolderName']
        },
        Address: {
          type: 'object',
          properties: {
            street1: { type: 'string', description: 'Street address line 1' },
            street2: { type: 'string', description: 'Street address line 2' },
            city: { type: 'string', description: 'City' },
            state: { type: 'string', description: 'State or province' },
            postalCode: { type: 'string', description: 'Postal code' },
            country: { type: 'string', description: 'Country code (ISO)' }
          },
          required: ['street1', 'city', 'state', 'postalCode', 'country']
        },
        Payment: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'Unique payment identifier' },
            amount: { type: 'number', format: 'float', description: 'Payment amount' },
            currency: { type: 'string', description: 'Payment currency (ISO code)' },
            status: { type: 'string', enum: ['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED'], description: 'Payment status' },
            payeeId: { type: 'string', description: 'ID of the payee' },
            paymentMethod: { type: 'string', enum: ['ACH', 'WIRE', 'CHECK'], description: 'Payment method' },
            scheduledDate: { type: 'string', format: 'date', description: 'Scheduled payment date' },
            processedDate: { type: 'string', format: 'date-time', description: 'Actual processing date' },
            metadata: { type: 'object', description: 'Additional payment metadata' }
          },
          required: ['id', 'amount', 'currency', 'status', 'payeeId', 'paymentMethod', 'scheduledDate']
        },
        Exception: {
          type: 'object',
          properties: {
            id: { type: 'integer', description: 'Exception ID' },
            type: { type: 'string', description: 'Exception type' },
            status: { type: 'string', description: 'Exception status' },
            createdAt: { type: 'string', format: 'date-time', description: 'Creation timestamp' },
            updatedAt: { type: 'string', format: 'date-time', description: 'Last update timestamp' },
            details: { type: 'object', description: 'Exception details' },
            resolution: { type: 'string', description: 'Resolution details', nullable: true },
            notes: { type: 'string', description: 'Additional notes', nullable: true }
          },
          required: ['id', 'type', 'status', 'createdAt', 'updatedAt', 'details']
        },
        ExceptionHistory: {
          type: 'object',
          properties: {
            id: { type: 'integer', description: 'History entry ID' },
            exceptionId: { type: 'integer', description: 'Related exception ID' },
            type: { type: 'string', description: 'History entry type' },
            userId: { type: 'string', description: 'User who made the change' },
            timestamp: { type: 'string', format: 'date-time', description: 'When the change occurred' },
            details: {
              type: 'object',
              properties: {
                before: { type: 'object', description: 'State before change' },
                after: { type: 'object', description: 'State after change' },
                metadata: { type: 'object', description: 'Additional metadata' }
              }
            }
          },
          required: ['id', 'exceptionId', 'type', 'userId', 'timestamp', 'details']
        }
      }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: [
    './src/routes/*.ts',
    './src/validators/*.ts',
    './src/models/*.ts'
  ]
};

export const swaggerSpec = swaggerJsdoc(options);
