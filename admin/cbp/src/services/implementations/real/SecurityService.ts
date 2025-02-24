import { ISecurityService } from '../../interfaces/ISecurityService';
import { PaginatedResponse } from '../../../types/common.types';
import { BaseService } from './BaseService';
import {
    SecuritySettings
} from '../../../types/security.types';

export class SecurityService extends BaseService implements ISecurityService {
    constructor(basePath: string = '/api/v1/security') {
        super(basePath);
    }
    async getSecuritySettings(): Promise<SecuritySettings> {
        try {
            return await this.get<SecuritySettings>('/settings');
        } catch (error) {
            throw error;
        }
    }
    async updateSecuritySettings(settings: Partial<SecuritySettings>): Promise<SecuritySettings> {
        try {
            return await this.patch<SecuritySettings>('/settings', settings);
        } catch (error) {
            throw error;
        }
    }
}