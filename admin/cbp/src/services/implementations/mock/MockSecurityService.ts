import { ISecurityService } from '../../interfaces/ISecurityService';
import { SecuritySettings } from '../../../types/security.types';
import { mockSecuritySettings } from './data/security/mockSecurityData';
import { BaseMockService } from './BaseMockService';

export class MockSecurityService extends BaseMockService implements ISecurityService {
    constructor(basePath: string = '/api/v1/security') {
        super(basePath);
        console.log('MockSecurityService initialized with path:', basePath);
    }

    private settings: SecuritySettings = { ...mockSecuritySettings };

    async getSecuritySettings(): Promise<SecuritySettings> {
        console.log('MockSecurityService.getSecuritySettings called');
        console.log('Returning settings:', this.settings);
        return this.settings;
    }

    async updateSecuritySettings(settings: Partial<SecuritySettings>): Promise<SecuritySettings> {
        console.log('MockSecurityService.updateSecuritySettings called with:', settings);
        this.settings = {
            ...this.settings,
            ...settings
        };
        console.log('Updated settings:', this.settings);
        return this.settings;
    }
}