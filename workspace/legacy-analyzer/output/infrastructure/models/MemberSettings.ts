import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface MemberSettingsConfig {
    IsAliasLookupEnabled: boolean;
    ShouldDisplayEscheatDateInfo: boolean;
    ConvertCreatedDateToUtcEnabled: boolean;
}

export class MemberSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'MemberSettings'
    };


            private _isAliasLookupEnabled: boolean;
            get isAliasLookupEnabled(): boolean {
                return this._isAliasLookupEnabled;
            }
            set isAliasLookupEnabled(value: boolean) {
                this._isAliasLookupEnabled = value;
            }

            private _shouldDisplayEscheatDateInfo: boolean;
            get shouldDisplayEscheatDateInfo(): boolean {
                return this._shouldDisplayEscheatDateInfo;
            }
            set shouldDisplayEscheatDateInfo(value: boolean) {
                this._shouldDisplayEscheatDateInfo = value;
            }

            private _convertCreatedDateToUtcEnabled: boolean;
            get convertCreatedDateToUtcEnabled(): boolean {
                return this._convertCreatedDateToUtcEnabled;
            }
            set convertCreatedDateToUtcEnabled(value: boolean) {
                this._convertCreatedDateToUtcEnabled = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "MemberSettings.IsAliasLookupEnabled", value: this._isAliasLookupEnabled, dataType: 'boolean', label: "Is Alias Lookup Enabled" },
                { key: "MemberSettings.ShouldDisplayEscheatDateInfo", value: this._shouldDisplayEscheatDateInfo, dataType: 'boolean', label: "Should Display Escheat Date Info" },
                { key: "MemberSettings.ConvertCreatedDateToUtcEnabled", value: this._convertCreatedDateToUtcEnabled, dataType: 'boolean', label: "Convert Created Date To Utc Enabled" },
            ];
        }

}