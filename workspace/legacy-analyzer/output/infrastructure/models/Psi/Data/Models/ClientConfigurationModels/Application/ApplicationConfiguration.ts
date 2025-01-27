import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { OmegaConfiguration } from '@infrastructure/OmegaConfiguration';
import { OnlineBankingConfiguration } from '@infrastructure/OnlineBankingConfiguration';
import { SparkUiConfiguration } from '@infrastructure/SparkUiConfiguration';
import { FlexUiConfiguration } from '@infrastructure/FlexUiConfiguration';
export interface ApplicationConfigurationConfig {
    Omega: OmegaConfiguration;
    OnlineBanking: OnlineBankingConfiguration;
    SparkUi: SparkUiConfiguration;
    FlexUi: FlexUiConfiguration;
}

export class ApplicationConfiguration implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'ApplicationConfiguration'
    };


            private _omega: OmegaConfiguration;
            get omega(): OmegaConfiguration {
                return this._omega;
            }
            set omega(value: OmegaConfiguration) {
                this._omega = value;
            }

            private _onlineBanking: OnlineBankingConfiguration;
            get onlineBanking(): OnlineBankingConfiguration {
                return this._onlineBanking;
            }
            set onlineBanking(value: OnlineBankingConfiguration) {
                this._onlineBanking = value;
            }

            private _sparkUi: SparkUiConfiguration;
            get sparkUi(): SparkUiConfiguration {
                return this._sparkUi;
            }
            set sparkUi(value: SparkUiConfiguration) {
                this._sparkUi = value;
            }

            private _flexUi: FlexUiConfiguration;
            get flexUi(): FlexUiConfiguration {
                return this._flexUi;
            }
            set flexUi(value: FlexUiConfiguration) {
                this._flexUi = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "ApplicationConfiguration.Omega", value: this._omega, dataType: 'omegaconfiguration', label: "Omega" },
                { key: "ApplicationConfiguration.OnlineBanking", value: this._onlineBanking, dataType: 'onlinebankingconfiguration', label: "Online Banking" },
                { key: "ApplicationConfiguration.SparkUi", value: this._sparkUi, dataType: 'sparkuiconfiguration', label: "Spark Ui" },
                { key: "ApplicationConfiguration.FlexUi", value: this._flexUi, dataType: 'flexuiconfiguration', label: "Flex Ui" },
            ];
        }

}