// Generated imports
import { Authentication } from '../MobileConfigurations/Authentication/Authentication';
import { ServiceSettingsModel } from '../ServiceSettingsModel';

export interface SavvyMoney {
    /** @settingKey Mobile.SavvyMoney.Enabled */
    enabled: boolean;
    authentication: Authentication;
    /** @settingKey Mobile.SavvyMoney.MinimumVersion */
    minimumVersion: string;
    /** @settingKey Mobile.SavvyMoney.MinimumAndroidVersion */
    minimumAndroidVersion: string;
    /** @settingKey Mobile.SavvyMoney.MinimumIosVersion */
    minimumIosVersion: string;
    /** @settingKey Mobile.SavvyMoney.ServiceSettings */
    serviceSettingsModel: ServiceSettingsModel;
    /** @settingKey Mobile.SavvyMoney.CreditScore.Enabled */
    creditScoreEnabled: boolean;
    /** @settingKey Mobile.SavvyMoney.ScoreChange.Enabled */
    scoreChangeEnabled: boolean;
    /** @settingKey Mobile.SavvyMoney.AlertBadge.Enabled */
    alertBadgeEnabled: boolean;
    /** @settingKey Mobile.SavvyMoney.Banner.Enabled */
    bannerEnabled: boolean;
    /** @settingKey Mobile.SavvyMoney.Banner.DismissalDays */
    bannerDismissalDays: number;
}
