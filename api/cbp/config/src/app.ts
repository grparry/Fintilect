import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '@cbp-config-api/docs/swagger';
import { logger } from '@cbp-config-api/config/logger';
import { requestLogger } from '@cbp-config-api/middleware/logging.middleware';
import { authMiddleware } from '@cbp-config-api/middleware/auth.middleware';
import { errorMiddleware } from '@cbp-config-api/middleware/error.middleware';

// Import routes
import clientRoutes from '@cbp-config-api/routes/clients.routes';
import hostRoutes from '@cbp-config-api/routes/host.routes';
import { createUserRouter } from '@cbp-config-api/routes/user.routes';
import payeeRoutes from '@cbp-config-api/routes/payees.routes';
import paymentRoutes from '@cbp-config-api/routes/payments.routes';
import systemRoutes from '@cbp-config-api/routes/system.routes';
import utilityRoutes from '@cbp-config-api/routes/utility.routes';
import trackingRoutes from '@cbp-config-api/routes/tracking.routes';
import exceptionRoutes from '@cbp-config-api/routes/exception.routes';
import exceptionHistoryRoutes from '@cbp-config-api/routes/exception-history.routes';
import { db } from '@cbp-config-api/config/db';

const app = express();

// API documentation - place before other middleware
app.get('/api-docs.json', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

// API routes
const apiRouter = express.Router();
apiRouter.use('/clients', authMiddleware, clientRoutes);
apiRouter.use('/hosts', authMiddleware, hostRoutes);
apiRouter.use('/users', createUserRouter(db)); // Some routes don't require auth (login/register)
apiRouter.use('/payees', authMiddleware, payeeRoutes);
apiRouter.use('/payments', authMiddleware, paymentRoutes);
apiRouter.use('/system', authMiddleware, systemRoutes);
apiRouter.use('/utility', authMiddleware, utilityRoutes);
apiRouter.use('/tracking', authMiddleware, trackingRoutes);
apiRouter.use('/exceptions', authMiddleware, exceptionRoutes);
apiRouter.use('/exception-history', authMiddleware, exceptionHistoryRoutes);
app.use('/api', apiRouter);

// Error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorMiddleware(err, req, res, next);
});

export default app;
