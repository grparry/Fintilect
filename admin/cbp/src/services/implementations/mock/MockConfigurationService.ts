import { IConfigurationService } from '../../interfaces/IConfigurationService';
import { ConfigurationSetting, ConfigurationResponse } from '../../../types/configuration.types';
import { API_CONFIG } from '../../../config/api.config';

/**
 * Mock implementation of the Configuration Service
 */
export class MockConfigurationService implements IConfigurationService {
  private mockData: ConfigurationResponse = {
    configurations: [
      {
        id: "fc6198e7-0c73-48d0-91af-03e224c4562b",
        configName: "ReturnTransactionCommentEnabled",
        configValue: "false",
        lastChangeDate: "2022-05-13T12:16:45.693",
        description: "",
        dataType: "Bool",
        creditUnionAccess: "Change",
        connectSupportAccess: "Change",
        connectManagerAccess: "Change",
        friendlyName: "Return Comments Enabled"
      },
      {
        id: "73767280-e80d-4ced-bb07-07d533cff4a7",
        configName: "ReturnTransactionComment_Adjustment",
        configValue: "Bill Payment Adjustment",
        lastChangeDate: "2022-05-13T12:16:45.957",
        description: "",
        dataType: "String",
        creditUnionAccess: "Change",
        connectSupportAccess: "Change",
        connectManagerAccess: "Change",
        friendlyName: "Adjustment Comment"
      },
      {
        id: "e51d1ebc-76c2-4ed6-9048-e7c8c5aad56e",
        configName: "ReturnTransactionComment_StopPayments",
        configValue: "Bill Payment Stopped",
        lastChangeDate: "2022-05-13T12:16:45.72",
        description: "",
        dataType: "String",
        creditUnionAccess: "Change",
        connectSupportAccess: "Change",
        connectManagerAccess: "Change",
        friendlyName: "Stop Pay Comment"
      },
      {
        id: "55de115d-f4d8-4726-97c5-1126c7c7300a",
        configName: "SettlementAccountNumber",
        configValue: "12345678901234567",
        lastChangeDate: "2022-01-12T15:57:38.877",
        description: "",
        dataType: "String",
        creditUnionAccess: "Read",
        connectSupportAccess: "Read",
        connectManagerAccess: "Change",
        friendlyName: "Settlement Account"
      }
    ]
  };
  
  /**
   * Simulate network delay
   */
  private delay(ms: number = API_CONFIG.mockDelay): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  /**
   * Get all configuration settings
   * @returns Promise with all configuration settings
   */
  async getAllSettings(): Promise<ConfigurationResponse> {
    await this.delay();
    return this.mockData;
  }
  
  /**
   * Get a specific configuration setting by name
   * @param configName The name of the configuration setting
   * @returns Promise with the requested configuration setting or undefined if not found
   */
  async getSettingByName(configName: string): Promise<ConfigurationSetting | undefined> {
    await this.delay();
    return this.mockData.configurations.find(config => config.configName === configName);
  }
  
  /**
   * Update a configuration setting
   * @param setting The configuration setting to update
   * @returns Promise indicating success
   */
  async updateSetting(setting: ConfigurationSetting): Promise<void> {
    await this.delay();
    const index = this.mockData.configurations.findIndex(config => config.id === setting.id);
    if (index >= 0) {
      this.mockData.configurations[index] = setting;
    } else {
      this.mockData.configurations.push(setting);
    }
  }
}
