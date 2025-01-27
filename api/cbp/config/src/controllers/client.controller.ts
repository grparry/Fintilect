import { Request, Response, NextFunction } from 'express';
import { ClientService, CreateClientRequest, UpdateClientRequest } from '@cbp-config-api/services/client.service';
import { HttpError } from '@cbp-config-api/utils/errors';

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
      const id = req.params.id;
      if (!id) {
        throw new HttpError(400, 'Invalid client ID');
      }
      const client = await this.clientService.getClient(String(id));
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
      const clientData: CreateClientRequest = {
        name: req.body.name,
        email: req.body.email,
        clientType: req.body.clientType || 'standard',
        settings: req.body.settings
      };
      const result = await this.clientService.createClient(clientData);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async updateClient(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      if (!id) {
        throw new HttpError(400, 'Invalid client ID');
      }
      const updates: UpdateClientRequest = {
        name: req.body.name,
        email: req.body.email,
        status: req.body.status,
        clientType: req.body.clientType
      };
      const result = await this.clientService.updateClient(String(id), updates);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async deleteClient(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      if (!id) {
        throw new HttpError(400, 'Invalid client ID');
      }
      await this.clientService.deleteClient(String(id));
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async getClientSettings(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      if (!id) {
        throw new HttpError(400, 'Invalid client ID');
      }
      const settings = await this.clientService.getClientSettings(String(id));
      res.json(settings);
    } catch (error) {
      next(error);
    }
  }

  async updateClientSettings(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      if (!id) {
        throw new HttpError(400, 'Invalid client ID');
      }
      const settings = {
        paymentLimits: {
          daily: req.body.paymentLimits?.daily,
          transaction: req.body.paymentLimits?.transaction
        }
      };
      const result = await this.clientService.updateClientSettings(String(id), settings);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}
