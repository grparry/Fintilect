import { Request, Response, NextFunction } from 'express';
import { ClientService } from '../services/client.service';
import { HttpError } from '../middleware/error.middleware';
import { logger } from '../config/logger';

export class ClientController {
  private service: ClientService;

  constructor() {
    this.service = new ClientService();
  }

  /**
   * List clients with optional filtering and pagination
   */
  listClients = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { status, type, page, limit } = req.query;
      const result = await this.service.listClients({
        status: status as string,
        type: type as string,
        page: page ? parseInt(page as string, 10) : undefined,
        limit: limit ? parseInt(limit as string, 10) : undefined
      });
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get client details by ID
   */
  getClientDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.service.getClientDetails(id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get client settings by client ID
   */
  getClientSettings = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.service.getClientSettings(id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Update client settings
   */
  updateClientSettings = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const settings = req.body;
      const result = await this.service.updateClientSettings(id, settings);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };
}
