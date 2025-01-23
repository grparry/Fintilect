import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface PersonPaymentSecuritySettingsConfig {
    Enabled: boolean;
    MinVersion: number;
    DaysAfterSensitiveInfoChangeAccessRestriction: number;
    SpectrumMemoNumber: string;
    RestrictAccessFlagNumber: string;
    SymitarRestrictAccessFlagNumber: number;
    DnaRestrictAccessFlagNumber: string;
    CoreRestrictAccessFlagNumber: string;
    ShouldRestrictAccessAfterAddressChange: boolean;
    ShouldRestrictAccessAfterEmailChange: boolean;
    ShouldRestrictAccessAfterForgotPassword: boolean;
    ShouldRestrictAccessAfterMobileDeviceRegistration: boolean;
}

export class PersonPaymentSecuritySettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'PersonPaymentSecuritySettings'
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

            private _daysAfterSensitiveInfoChangeAccessRestriction: number;
            get daysAfterSensitiveInfoChangeAccessRestriction(): number {
                return this._daysAfterSensitiveInfoChangeAccessRestriction;
            }
            set daysAfterSensitiveInfoChangeAccessRestriction(value: number) {
                this._daysAfterSensitiveInfoChangeAccessRestriction = value;
            }

            private _spectrumMemoNumber: string;
            get spectrumMemoNumber(): string {
                return this._spectrumMemoNumber;
            }
            set spectrumMemoNumber(value: string) {
                this._spectrumMemoNumber = value;
            }

            private _restrictAccessFlagNumber: string;
            get restrictAccessFlagNumber(): string {
                return this._restrictAccessFlagNumber;
            }
            set restrictAccessFlagNumber(value: string) {
                this._restrictAccessFlagNumber = value;
            }

            private _symitarRestrictAccessFlagNumber: number;
            get symitarRestrictAccessFlagNumber(): number {
                return this._symitarRestrictAccessFlagNumber;
            }
            set symitarRestrictAccessFlagNumber(value: number) {
                this._symitarRestrictAccessFlagNumber = value;
            }

            private _dnaRestrictAccessFlagNumber: string;
            get dnaRestrictAccessFlagNumber(): string {
                return this._dnaRestrictAccessFlagNumber;
            }
            set dnaRestrictAccessFlagNumber(value: string) {
                this._dnaRestrictAccessFlagNumber = value;
            }

            private _coreRestrictAccessFlagNumber: string;
            get coreRestrictAccessFlagNumber(): string {
                return this._coreRestrictAccessFlagNumber;
            }
            set coreRestrictAccessFlagNumber(value: string) {
                this._coreRestrictAccessFlagNumber = value;
            }

            private _shouldRestrictAccessAfterAddressChange: boolean;
            get shouldRestrictAccessAfterAddressChange(): boolean {
                return this._shouldRestrictAccessAfterAddressChange;
            }
            set shouldRestrictAccessAfterAddressChange(value: boolean) {
                this._shouldRestrictAccessAfterAddressChange = value;
            }

            private _shouldRestrictAccessAfterEmailChange: boolean;
            get shouldRestrictAccessAfterEmailChange(): boolean {
                return this._shouldRestrictAccessAfterEmailChange;
            }
            set shouldRestrictAccessAfterEmailChange(value: boolean) {
                this._shouldRestrictAccessAfterEmailChange = value;
            }

            private _shouldRestrictAccessAfterForgotPassword: boolean;
            get shouldRestrictAccessAfterForgotPassword(): boolean {
                return this._shouldRestrictAccessAfterForgotPassword;
            }
            set shouldRestrictAccessAfterForgotPassword(value: boolean) {
                this._shouldRestrictAccessAfterForgotPassword = value;
            }

            private _shouldRestrictAccessAfterMobileDeviceRegistration: boolean;
            get shouldRestrictAccessAfterMobileDeviceRegistration(): boolean {
                return this._shouldRestrictAccessAfterMobileDeviceRegistration;
            }
            set shouldRestrictAccessAfterMobileDeviceRegistration(value: boolean) {
                this._shouldRestrictAccessAfterMobileDeviceRegistration = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "PersonPaymentSecuritySettings.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "PersonPaymentSecuritySettings.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "PersonPaymentSecuritySettings.DaysAfterSensitiveInfoChangeAccessRestriction", value: this._daysAfterSensitiveInfoChangeAccessRestriction, dataType: 'number', label: "Days After Sensitive Info Change Access Restriction" },
                { key: "PersonPaymentSecuritySettings.SpectrumMemoNumber", value: this._spectrumMemoNumber, dataType: 'string', label: "Spectrum Memo Number" },
                { key: "PersonPaymentSecuritySettings.RestrictAccessFlagNumber", value: this._restrictAccessFlagNumber, dataType: 'string', label: "Restrict Access Flag Number" },
                { key: "PersonPaymentSecuritySettings.SymitarRestrictAccessFlagNumber", value: this._symitarRestrictAccessFlagNumber, dataType: 'number', label: "Symitar Restrict Access Flag Number" },
                { key: "PersonPaymentSecuritySettings.DnaRestrictAccessFlagNumber", value: this._dnaRestrictAccessFlagNumber, dataType: 'string', label: "Dna Restrict Access Flag Number" },
                { key: "PersonPaymentSecuritySettings.CoreRestrictAccessFlagNumber", value: this._coreRestrictAccessFlagNumber, dataType: 'string', label: "Core Restrict Access Flag Number" },
                { key: "PersonPaymentSecuritySettings.ShouldRestrictAccessAfterAddressChange", value: this._shouldRestrictAccessAfterAddressChange, dataType: 'boolean', label: "Should Restrict Access After Address Change" },
                { key: "PersonPaymentSecuritySettings.ShouldRestrictAccessAfterEmailChange", value: this._shouldRestrictAccessAfterEmailChange, dataType: 'boolean', label: "Should Restrict Access After Email Change" },
                { key: "PersonPaymentSecuritySettings.ShouldRestrictAccessAfterForgotPassword", value: this._shouldRestrictAccessAfterForgotPassword, dataType: 'boolean', label: "Should Restrict Access After Forgot Password" },
                { key: "PersonPaymentSecuritySettings.ShouldRestrictAccessAfterMobileDeviceRegistration", value: this._shouldRestrictAccessAfterMobileDeviceRegistration, dataType: 'boolean', label: "Should Restrict Access After Mobile Device Registration" },
            ];
        }

}