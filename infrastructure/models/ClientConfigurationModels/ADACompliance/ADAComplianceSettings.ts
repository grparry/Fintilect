import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface ADAComplianceSettingsConfig {
    MinVersion: number;
    EnableADACompliancePageForHomeBanking: boolean;
}

export class ADAComplianceSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'ADAComplianceSettings'
    };


            private _minVersion: number;
            get minVersion(): number {
                return this._minVersion;
            }
            set minVersion(value: number) {
                this._minVersion = value;
            }

            private _enableADACompliancePageForHomeBanking: boolean;
            get enableADACompliancePageForHomeBanking(): boolean {
                return this._enableADACompliancePageForHomeBanking;
            }
            set enableADACompliancePageForHomeBanking(value: boolean) {
                this._enableADACompliancePageForHomeBanking = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "ADAComplianceSettings.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "ADAComplianceSettings.EnableADACompliancePageForHomeBanking", value: this._enableADACompliancePageForHomeBanking, dataType: 'boolean', label: "Enable A D A Compliance Page For Home Banking" },
            ];
        }

}