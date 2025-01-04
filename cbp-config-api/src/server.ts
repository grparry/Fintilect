import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import * as mssql from 'mssql';
import rateLimit from 'express-rate-limit';
import { logger } from './config/logger';
import { errorHandler } from './middleware/error.middleware';
import { requestLogger } from './middleware/logging.middleware';
import { authMiddleware } from './middleware/auth.middleware';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './docs/swagger';

// Load environment variables
dotenv.config();

// SQL Server configuration
const sqlConfig: mssql.config = {
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  server: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '1433'),
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true',
    trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true'
  }
};

// Initialize express app
const app = express();

// Basic security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use(requestLogger);

// Authentication middleware - skip for health check
app.use((req, res, next) => {
  if (req.path === '/health') {
    return next();
  }
  authMiddleware(req, res, next);
});

// Swagger UI
if (process.env.NODE_ENV !== 'production') {
  app.use('/api-docs', swaggerUi.serve);
  app.get('/api-docs', swaggerUi.setup(swaggerSpec));
  
  // Serve OpenAPI spec as JSON
  app.get('/api-spec.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
}

// Routes
import { paymentsRouter } from './routes/payments.routes';
import { payeesRouter } from './routes/payees.routes';
import { usersRouter } from './routes/users.routes';
import { systemRouter } from './routes/system.routes';
import { trackingRouter } from './routes/tracking.routes';
import { hostRouter } from './routes/host.routes';
import { utilityRouter } from './routes/utility.routes';
import { clientsRouter } from './routes/clients.routes';

app.use('/api/payments', paymentsRouter);
app.use('/api/payees', payeesRouter);
app.use('/api/users', usersRouter);
app.use('/api/system', systemRouter);
app.use('/api/tracking', trackingRouter);
app.use('/api/host', hostRouter);
app.use('/api/utility', utilityRouter);
app.use('/api/clients', clientsRouter);

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    // Test database connection
    await mssql.connect(sqlConfig);
    const result = await mssql.query`SELECT GETDATE() as currentTime`;
    await mssql.close();
    
    res.status(200).json({ 
      status: 'OK', 
      timestamp: new Date().toISOString(),
      dbConnection: 'OK',
      dbTime: result.recordset[0].currentTime
    });
  } catch (error) {
    logger.error('Database connection error:', error);
    res.status(500).json({ 
      status: 'ERROR',
      timestamp: new Date().toISOString(),
      dbConnection: 'ERROR'
    });
  }
});

// Error handling middleware
app.use(errorHandler);

// Start server function
const startServer = async () => {
  try {
    const port = process.env.PORT || 3000;
    
    // Test database connection
    await mssql.connect(sqlConfig);
    logger.info('Connected to database');
    
    app.listen(port, () => {
      logger.info(`Server is running on port ${port}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();
