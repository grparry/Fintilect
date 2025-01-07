import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './docs/swagger';
import { logger } from './config/logger';
import { requestLogger } from './middleware/logging.middleware';
import { authMiddleware } from './middleware/auth.middleware';
import { errorMiddleware } from './middleware/error.middleware';

// Import routes
import clientRoutes from './routes/clients.routes';
import hostRoutes from './routes/host.routes';
import { createUserRouter } from './routes/user.routes';
import payeeRoutes from './routes/payees.routes';
import paymentRoutes from './routes/payments.routes';
import systemRoutes from './routes/system.routes';
import utilityRoutes from './routes/utility.routes';
import trackingRoutes from './routes/tracking.routes';
import { db } from './config/db';

const app = express();

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Logging
app.use(requestLogger);

// API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

// API routes
app.use('/api/clients', authMiddleware, clientRoutes);
app.use('/api/hosts', authMiddleware, hostRoutes);
app.use('/api/users', createUserRouter(db)); // Some routes don't require auth (login/register)
app.use('/api/payees', authMiddleware, payeeRoutes);
app.use('/api/payments', authMiddleware, paymentRoutes);
app.use('/api/system', authMiddleware, systemRoutes);
app.use('/api/utility', authMiddleware, utilityRoutes);
app.use('/api/tracking', authMiddleware, trackingRoutes);

// Error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorMiddleware(err, req, res, next);
});

export default app;
