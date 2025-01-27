import { Request, Response } from 'express';
import { SettingsService } from '@cbp-config-api/services/settings.service';
import { HttpError } from '@cbp-config-api/utils/errors';

export class SettingsController {
  constructor(private settingsService: SettingsService) {}

  async listSettings(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 10;
      const category = req.query.category as string;

      const result = await this.settingsService.listSettings(page, pageSize, category);
      res.json(result);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async getSetting(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await this.settingsService.getSetting(id);
      res.json(result);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async getSettingByKey(req: Request, res: Response) {
    try {
      const { key } = req.params;
      const result = await this.settingsService.getSettingByKey(key);
      res.json(result);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async createSetting(req: Request, res: Response) {
    try {
      const result = await this.settingsService.createSetting(req.body);
      res.status(201).json(result);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async updateSetting(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await this.settingsService.updateSetting(id, req.body);
      res.json(result);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async deleteSetting(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.settingsService.deleteSetting(id);
      res.status(204).send();
    } catch (error) {
      this.handleError(error, res);
    }
  }

  private handleError(error: any, res: Response): void {
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({
        error: error.message,
        details: error.details
      });
    } else {
      res.status(500).json({
        error: 'Internal server error',
        message: error.message
      });
    }
  }
}
