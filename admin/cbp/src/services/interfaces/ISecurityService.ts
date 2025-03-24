import { IBaseService } from './IBaseService';
import { SecuritySettings } from '../../types/security.types';

/**
 * Interface for security operations
 * Handles security settings
 */
export interface ISecurityService extends IBaseService {
    /**
     * Get security settings
     * @returns Current security settings
     */
    getSecuritySettings(): Promise<SecuritySettings>;

    /**
     * Update security settings
     * @param settings Updated security settings
     * @returns Updated settings
     */
    updateSecuritySettings(settings: Partial<SecuritySettings>): Promise<SecuritySettings>;
}