import { Request, Response, NextFunction } from 'express';
import { HostService } from '../services/host.service';
import { HttpError } from '../middleware/error.middleware';
import { logger } from '../config/logger';

export class HostController {
  private service: HostService;

  constructor() {
    this.service = new HostService();
  }

  getConnection = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const connection = await this.service.getConnection();
      res.json(connection);
    } catch (error) {
      next(error);
    }
  };

  updateConnection = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Check for required permissions
      if (!req.user?.hasPermission('MANAGE_HOST_CONNECTION')) {
        throw new HttpError(403, 'Insufficient permissions to update host connection');
      }

      const connection = await this.service.updateConnection(req.body);
      res.json(connection);
    } catch (error) {
      next(error);
    }
  };
}
