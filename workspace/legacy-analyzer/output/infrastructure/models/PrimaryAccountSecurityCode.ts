import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface PrimaryAccountSecurityCodeConfig {
    Enabled: boolean;
    MinVersion: number;
    ShouldShowReferenceNumberInEmailSubjectLine: boolean;
}

export class PrimaryAccountSecurityCode implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'PrimaryAccountSecurityCode'
    };


            private _enabled: boolean;
            get enabled(): boolean {
                return this._enabled;
            }
            set enabled(value: boolean) {
                this._enabled = value;
            }

            private _minVersion: number;
            get minVersion(): number {
                return this._minVersion;
            }
            set minVersion(value: number) {
                this._minVersion = value;
            }

            private _shouldShowReferenceNumberInEmailSubjectLine: boolean;
            get shouldShowReferenceNumberInEmailSubjectLine(): boolean {
                return this._shouldShowReferenceNumberInEmailSubjectLine;
            }
            set shouldShowReferenceNumberInEmailSubjectLine(value: boolean) {
                this._shouldShowReferenceNumberInEmailSubjectLine = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "PrimaryAccountSecurityCode.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "PrimaryAccountSecurityCode.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "PrimaryAccountSecurityCode.ShouldShowReferenceNumberInEmailSubjectLine", value: this._shouldShowReferenceNumberInEmailSubjectLine, dataType: 'boolean', label: "Should Show Reference Number In Email Subject Line" },
            ];
        }

}