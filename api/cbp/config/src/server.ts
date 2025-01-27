import dotenv from 'dotenv';
import { logger } from '@cbp-config-api/config/logger';
import app from '@cbp-config-api/app';

// Load environment variables
dotenv.config();

const port = process.env.PORT || 3000;

// Start server
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
