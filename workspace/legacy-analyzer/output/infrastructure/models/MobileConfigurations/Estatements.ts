// Generated imports
import { Authentication } from '../MobileConfigurations/Authentication/Authentication';

export interface Estatements {
    /** @settingKey Mobile.EStatements.MinimumVersion */
    minimumVersion: string;
    /** @settingKey Mobile.EStatements.MinimumAndroidVersion */
    minimumAndroidVersion: string;
    /** @settingKey Mobile.EStatements.MinimumIosVersion */
    minimumIosVersion: string;
    /** @settingKey Mobile.EStatements.Enabled */
    enabled: boolean;
    /** @settingKey Mobile.EStatements.DoximEstatements.Enabled */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Doxim Estatements enabled
     * /// /// </summary>
     * /// </summary>
     */
    doximEstatementsEnabled: boolean;
    authentication: Authentication;
}
