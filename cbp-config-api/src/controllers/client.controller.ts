import { Request, Response, NextFunction } from 'express';
import { ClientService } from '../services/client.service';
import { HttpError } from '../utils/errors';

export class ClientController {
  constructor(private clientService: ClientService) {}

  async listClients(req: Request, res: Response, next: NextFunction) {
    try {
      const page = req.query.page ? Number(req.query.page) : 1;
      const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 10;

      if (req.query.page && (isNaN(page) || page < 1)) {
        throw new HttpError(400, 'Invalid page number');
      }

      if (req.query.pageSize && (isNaN(pageSize) || pageSize < 1 || pageSize > 100)) {
        throw new HttpError(400, 'Invalid page size');
      }

      const result = await this.clientService.getClients(page, pageSize);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getClient(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        throw new HttpError(400, 'Invalid client ID');
      }
      const client = await this.clientService.getClient(id);
      if (!client) {
        throw new HttpError(404, 'Client not found');
      }
      res.json(client);
    } catch (error) {
      next(error);
    }
  }

  async createClient(req: Request, res: Response, next: NextFunction) {
    try {
      const clientData = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address
      };
      const result = await this.clientService.createClient(clientData);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async updateClient(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        throw new HttpError(400, 'Invalid client ID');
      }
      const updates = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address
      };
      const result = await this.clientService.updateClient(id, updates);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async deleteClient(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        throw new HttpError(400, 'Invalid client ID');
      }
      await this.clientService.deleteClient(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async getClientSettings(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        throw new HttpError(400, 'Invalid client ID');
      }
      const settings = await this.clientService.getClientSettings(id);
      res.json(settings);
    } catch (error) {
      next(error);
    }
  }

  async updateClientSettings(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        throw new HttpError(400, 'Invalid client ID');
      }
      const settings = {
        notifications: req.body.notifications,
        language: req.body.language,
        theme: req.body.theme
      };
      const result = await this.clientService.updateClientSettings(id, settings);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}
