import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { Feature } from '@infrastructure/Feature';
import { DocumentArchitectSso } from '@infrastructure/DocumentArchitectSso';
export interface OmegaConfigurationConfig {
    EnvironmentConnections: string;
    HomeBankingResetConfigUrl: string;
    DaysUntilPasswordExpires: number;
    MaxLoginRetryCount: number;
    MonthsToRestrictPasswordReuse: number;
    OmegaBaseUrl: string;
    Features: Feature;
    DocumentArchitectSso: DocumentArchitectSso;
}

export class OmegaConfiguration implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'OmegaConfiguration'
    };


            private _environmentConnections: string;
            get environmentConnections(): string {
                return this._environmentConnections;
            }
            set environmentConnections(value: string) {
                this._environmentConnections = value;
            }

            private _homeBankingResetConfigUrl: string;
            get homeBankingResetConfigUrl(): string {
                return this._homeBankingResetConfigUrl;
            }
            set homeBankingResetConfigUrl(value: string) {
                this._homeBankingResetConfigUrl = value;
            }

            private _daysUntilPasswordExpires: number;
            get daysUntilPasswordExpires(): number {
                return this._daysUntilPasswordExpires;
            }
            set daysUntilPasswordExpires(value: number) {
                this._daysUntilPasswordExpires = value;
            }

            private _maxLoginRetryCount: number;
            get maxLoginRetryCount(): number {
                return this._maxLoginRetryCount;
            }
            set maxLoginRetryCount(value: number) {
                this._maxLoginRetryCount = value;
            }

            private _monthsToRestrictPasswordReuse: number;
            get monthsToRestrictPasswordReuse(): number {
                return this._monthsToRestrictPasswordReuse;
            }
            set monthsToRestrictPasswordReuse(value: number) {
                this._monthsToRestrictPasswordReuse = value;
            }

            private _omegaBaseUrl: string;
            get omegaBaseUrl(): string {
                return this._omegaBaseUrl;
            }
            set omegaBaseUrl(value: string) {
                this._omegaBaseUrl = value;
            }

            private _features: Feature;
            get features(): Feature {
                return this._features;
            }
            set features(value: Feature) {
                this._features = value;
            }

            private _documentArchitectSso: DocumentArchitectSso;
            get documentArchitectSso(): DocumentArchitectSso {
                return this._documentArchitectSso;
            }
            set documentArchitectSso(value: DocumentArchitectSso) {
                this._documentArchitectSso = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "OmegaConfiguration.EnvironmentConnections", value: this._environmentConnections, dataType: 'string', label: "Environment Connections" },
                { key: "OmegaConfiguration.HomeBankingResetConfigUrl", value: this._homeBankingResetConfigUrl, dataType: 'string', label: "Home Banking Reset Config Url" },
                { key: "OmegaConfiguration.DaysUntilPasswordExpires", value: this._daysUntilPasswordExpires, dataType: 'number', label: "Days Until Password Expires" },
                { key: "OmegaConfiguration.MaxLoginRetryCount", value: this._maxLoginRetryCount, dataType: 'number', label: "Max Login Retry Count" },
                { key: "OmegaConfiguration.MonthsToRestrictPasswordReuse", value: this._monthsToRestrictPasswordReuse, dataType: 'number', label: "Months To Restrict Password Reuse" },
                { key: "OmegaConfiguration.OmegaBaseUrl", value: this._omegaBaseUrl, dataType: 'string', label: "Omega Base Url" },
                { key: "OmegaConfiguration.Features", value: this._features, dataType: 'feature', label: "Features" },
                { key: "OmegaConfiguration.DocumentArchitectSso", value: this._documentArchitectSso, dataType: 'documentarchitectsso', label: "Document Architect Sso" },
            ];
        }

}