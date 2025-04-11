import { ISecurityService } from '../../interfaces/ISecurityService';
import { SecuritySettings } from '../../../types/security.types';
import { mockSecuritySettings } from './data/security/mockSecurityData';
import { BaseMockService } from './BaseMockService';
import logger from '../../../utils/logger';

export class MockSecurityService extends BaseMockService implements ISecurityService {
    constructor(basePath: string = '/api/v1/security') {
        super(basePath);
        logger.log('MockSecurityService initialized with path:', basePath);
    }

    private settings: SecuritySettings = { ...mockSecuritySettings };

    async getSecuritySettings(): Promise<SecuritySettings> {
        logger.log('MockSecurityService.getSecuritySettings called');
        logger.log('Returning settings:', this.settings);
        return this.settings;
    }

    async updateSecuritySettings(settings: Partial<SecuritySettings>): Promise<SecuritySettings> {
        logger.log('MockSecurityService.updateSecuritySettings called with:', settings);
        this.settings = {
            ...this.settings,
            ...settings
        };
        logger.log('Updated settings:', this.settings);
        return this.settings;
    }
}