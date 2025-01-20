// Generated imports
import { Authentication } from '../MobileConfigurations/Authentication/Authentication';

export interface SynergyEstatementsSettings {
    /** @settingKey Estatements.Synergy.Enabled */
    enabled: boolean;
    /** @settingKey Estatements.Synergy.MinVersion */
    minVersion: number;
    /** @settingKey Estatements.Synergy.MinAndroidVersion */
    minAndroidVersion: string;
    /** @settingKey Estatements.Synergy.MinIosVersion */
    minIosVersion: string;
    /** @settingKey Estatements.Synergy.OrgAlias */
    orgAlias: string;
    /** @settingKey Estatements.Synergy.ValidationCode */
    validationCode: string;
    mobileConfigurations: Authentication;
}
