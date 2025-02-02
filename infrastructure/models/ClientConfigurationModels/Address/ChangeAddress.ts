import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface ChangeAddressConfig {
    SendEmailOnUpdate: boolean;
    PrimaryMemberCanUpdateJointOwnersAddress: boolean;
    ForeignAddressCountryCodeAndSubdivisionsEnabled: boolean;
    MaximumAddressLineLength: number;
    UpdateBitAddressForPrimaryStatementAccountNumbers: boolean;
    CityRegex: string;
    ShouldUpdateAddressOnCoreWhenNoChanges: boolean;
    ShouldRedirectAfterUpdate: boolean;
    VerifyAddressEnabled: boolean;
}

export class ChangeAddress implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'ChangeAddress'
    };


            private _sendEmailOnUpdate: boolean;
            get sendEmailOnUpdate(): boolean {
                return this._sendEmailOnUpdate;
            }
            set sendEmailOnUpdate(value: boolean) {
                this._sendEmailOnUpdate = value;
            }

            private _primaryMemberCanUpdateJointOwnersAddress: boolean;
            get primaryMemberCanUpdateJointOwnersAddress(): boolean {
                return this._primaryMemberCanUpdateJointOwnersAddress;
            }
            set primaryMemberCanUpdateJointOwnersAddress(value: boolean) {
                this._primaryMemberCanUpdateJointOwnersAddress = value;
            }

            private _foreignAddressCountryCodeAndSubdivisionsEnabled: boolean;
            get foreignAddressCountryCodeAndSubdivisionsEnabled(): boolean {
                return this._foreignAddressCountryCodeAndSubdivisionsEnabled;
            }
            set foreignAddressCountryCodeAndSubdivisionsEnabled(value: boolean) {
                this._foreignAddressCountryCodeAndSubdivisionsEnabled = value;
            }

            private _maximumAddressLineLength: number;
            get maximumAddressLineLength(): number {
                return this._maximumAddressLineLength;
            }
            set maximumAddressLineLength(value: number) {
                this._maximumAddressLineLength = value;
            }

            private _updateBitAddressForPrimaryStatementAccountNumbers: boolean;
            get updateBitAddressForPrimaryStatementAccountNumbers(): boolean {
                return this._updateBitAddressForPrimaryStatementAccountNumbers;
            }
            set updateBitAddressForPrimaryStatementAccountNumbers(value: boolean) {
                this._updateBitAddressForPrimaryStatementAccountNumbers = value;
            }

            private _cityRegex: string;
            get cityRegex(): string {
                return this._cityRegex;
            }
            set cityRegex(value: string) {
                this._cityRegex = value;
            }

            private _shouldUpdateAddressOnCoreWhenNoChanges: boolean;
            get shouldUpdateAddressOnCoreWhenNoChanges(): boolean {
                return this._shouldUpdateAddressOnCoreWhenNoChanges;
            }
            set shouldUpdateAddressOnCoreWhenNoChanges(value: boolean) {
                this._shouldUpdateAddressOnCoreWhenNoChanges = value;
            }

            private _shouldRedirectAfterUpdate: boolean;
            get shouldRedirectAfterUpdate(): boolean {
                return this._shouldRedirectAfterUpdate;
            }
            set shouldRedirectAfterUpdate(value: boolean) {
                this._shouldRedirectAfterUpdate = value;
            }

            private _verifyAddressEnabled: boolean;
            get verifyAddressEnabled(): boolean {
                return this._verifyAddressEnabled;
            }
            set verifyAddressEnabled(value: boolean) {
                this._verifyAddressEnabled = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "ChangeAddress.SendEmailOnUpdate", value: this._sendEmailOnUpdate, dataType: 'boolean', label: "Send Email On Update" },
                { key: "ChangeAddress.PrimaryMemberCanUpdateJointOwnersAddress", value: this._primaryMemberCanUpdateJointOwnersAddress, dataType: 'boolean', label: "Primary Member Can Update Joint Owners Address" },
                { key: "ChangeAddress.ForeignAddressCountryCodeAndSubdivisionsEnabled", value: this._foreignAddressCountryCodeAndSubdivisionsEnabled, dataType: 'boolean', label: "Foreign Address Country Code And Subdivisions Enabled" },
                { key: "ChangeAddress.MaximumAddressLineLength", value: this._maximumAddressLineLength, dataType: 'number', label: "Maximum Address Line Length" },
                { key: "ChangeAddress.UpdateBitAddressForPrimaryStatementAccountNumbers", value: this._updateBitAddressForPrimaryStatementAccountNumbers, dataType: 'boolean', label: "Update Bit Address For Primary Statement Account Numbers" },
                { key: "ChangeAddress.CityRegex", value: this._cityRegex, dataType: 'string', label: "City Regex" },
                { key: "ChangeAddress.ShouldUpdateAddressOnCoreWhenNoChanges", value: this._shouldUpdateAddressOnCoreWhenNoChanges, dataType: 'boolean', label: "Should Update Address On Core When No Changes" },
                { key: "ChangeAddress.ShouldRedirectAfterUpdate", value: this._shouldRedirectAfterUpdate, dataType: 'boolean', label: "Should Redirect After Update" },
                { key: "ChangeAddress.VerifyAddressEnabled", value: this._verifyAddressEnabled, dataType: 'boolean', label: "Verify Address Enabled" },
            ];
        }

}