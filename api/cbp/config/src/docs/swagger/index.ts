import swaggerJSDoc from 'swagger-jsdoc';
import { join } from 'path';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CBP Config API',
      version: '1.0.0',
      description: 'API documentation for CBP Configuration Service'
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: [
    join(__dirname, '*.yaml'),
    join(__dirname, '../../routes/*.ts'),
    join(__dirname, '../../controllers/*.ts')
  ]
};

export const swaggerSpec = swaggerJSDoc(options);
