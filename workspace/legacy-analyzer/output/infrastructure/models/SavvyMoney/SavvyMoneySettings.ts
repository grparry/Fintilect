// Generated imports
import { ServiceSettingsModel } from '../ServiceSettingsModel';

export interface SavvyMoneySettings {
    /** @settingKey SavvyMoney.ServiceSettings */
    serviceSettingsModel: ServiceSettingsModel;
    /** @settingKey SavvyMoney.ServiceSettings.Iframe */
    serviceSettingsModel: ServiceSettingsModel;
    /** @settingKey HomeBanking.SavvyMoney.Enabled */
    homeBankingEnabled: boolean;
    /** @settingKey HomeBanking.SavvyMoney.MinVersion */
    minVersion: number;
    /** @settingKey SavvyMoney.Api.AuthId */
    apiAuthId: string;
    /** @settingKey SavvyMoney.Api.AuthKey */
    apiAuthKey: string;
    /** @settingKey SavvyMoney.Api.Domain */
    apiDomain: string;
    /** @settingKey SavvyMoney.Api.PartnerId */
    apiPartnerId: string;
    /** @settingKey SavvyMoney.Api.BaseUrl */
    apiBaseUrl: string;
}
