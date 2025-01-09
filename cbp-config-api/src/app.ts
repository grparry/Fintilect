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
import exceptionRoutes from './routes/exception.routes';
import exceptionHistoryRoutes from './routes/exception-history.routes';
import { db } from './config/db';

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
