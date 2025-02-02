import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface AlexaFeatureConfig {
    AlexaAppEnabled: boolean;
    MinVersion: number;
    ExpirePinAfterXMinutes: number;
    PinLength: number;
}

export class AlexaFeature implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'AlexaFeature'
    };


            private _alexaAppEnabled: boolean;
            get alexaAppEnabled(): boolean {
                return this._alexaAppEnabled;
            }
            set alexaAppEnabled(value: boolean) {
                this._alexaAppEnabled = value;
            }

            private _minVersion: number;
            get minVersion(): number {
                return this._minVersion;
            }
            set minVersion(value: number) {
                this._minVersion = value;
            }

            private _expirePinAfterXMinutes: number;
            get expirePinAfterXMinutes(): number {
                return this._expirePinAfterXMinutes;
            }
            set expirePinAfterXMinutes(value: number) {
                this._expirePinAfterXMinutes = value;
            }

            private _pinLength: number;
            get pinLength(): number {
                return this._pinLength;
            }
            set pinLength(value: number) {
                this._pinLength = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "AlexaFeature.AlexaAppEnabled", value: this._alexaAppEnabled, dataType: 'boolean', label: "Alexa App Enabled" },
                { key: "AlexaFeature.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "AlexaFeature.ExpirePinAfterXMinutes", value: this._expirePinAfterXMinutes, dataType: 'number', label: "Expire Pin After X Minutes" },
                { key: "AlexaFeature.PinLength", value: this._pinLength, dataType: 'number', label: "Pin Length" },
            ];
        }

}