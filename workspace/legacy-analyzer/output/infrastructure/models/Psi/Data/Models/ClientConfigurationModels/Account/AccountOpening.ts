import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface AccountOpeningConfig {
    Enabled: boolean;
    MinVersion: number;
    OnlySendEmailOnNewAccountCreation: boolean;
    ShouldHideContactInfoDuringSubAccountOpening: boolean;
}

export class AccountOpening implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'AccountOpening'
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

            private _onlySendEmailOnNewAccountCreation: boolean;
            get onlySendEmailOnNewAccountCreation(): boolean {
                return this._onlySendEmailOnNewAccountCreation;
            }
            set onlySendEmailOnNewAccountCreation(value: boolean) {
                this._onlySendEmailOnNewAccountCreation = value;
            }

            private _shouldHideContactInfoDuringSubAccountOpening: boolean;
            get shouldHideContactInfoDuringSubAccountOpening(): boolean {
                return this._shouldHideContactInfoDuringSubAccountOpening;
            }
            set shouldHideContactInfoDuringSubAccountOpening(value: boolean) {
                this._shouldHideContactInfoDuringSubAccountOpening = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "AccountOpening.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "AccountOpening.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "AccountOpening.OnlySendEmailOnNewAccountCreation", value: this._onlySendEmailOnNewAccountCreation, dataType: 'boolean', label: "Only Send Email On New Account Creation" },
                { key: "AccountOpening.ShouldHideContactInfoDuringSubAccountOpening", value: this._shouldHideContactInfoDuringSubAccountOpening, dataType: 'boolean', label: "Should Hide Contact Info During Sub Account Opening" },
            ];
        }

}