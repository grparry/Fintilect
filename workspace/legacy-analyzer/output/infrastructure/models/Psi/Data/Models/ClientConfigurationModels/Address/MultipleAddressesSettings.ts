import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { MultipleAddressesPage } from '@infrastructure/MultipleAddressesPage';
export interface MultipleAddressesSettingsConfig {
    Enabled: boolean;
    AddressTypes: string[];
    AddressTypesToBeValidated: string;
    DefaultAddressType: string;
    MvcPage: MultipleAddressesPage;
}

export class MultipleAddressesSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'MultipleAddressesSettings'
    };


            private _enabled: boolean;
            get enabled(): boolean {
                return this._enabled;
            }
            set enabled(value: boolean) {
                this._enabled = value;
            }

            private _addressTypes: string[];
            get addressTypes(): string[] {
                return this._addressTypes;
            }
            set addressTypes(value: string[]) {
                this._addressTypes = value;
            }

            private _addressTypesToBeValidated: string;
            get addressTypesToBeValidated(): string {
                return this._addressTypesToBeValidated;
            }
            set addressTypesToBeValidated(value: string) {
                this._addressTypesToBeValidated = value;
            }

            private _defaultAddressType: string;
            get defaultAddressType(): string {
                return this._defaultAddressType;
            }
            set defaultAddressType(value: string) {
                this._defaultAddressType = value;
            }

            private _mvcPage: MultipleAddressesPage;
            get mvcPage(): MultipleAddressesPage {
                return this._mvcPage;
            }
            set mvcPage(value: MultipleAddressesPage) {
                this._mvcPage = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "MultipleAddressesSettings.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "MultipleAddressesSettings.AddressTypes", value: this._addressTypes, dataType: 'list<string>', label: "Address Types" },
                { key: "MultipleAddressesSettings.AddressTypesToBeValidated", value: this._addressTypesToBeValidated, dataType: 'string', label: "Address Types To Be Validated" },
                { key: "MultipleAddressesSettings.DefaultAddressType", value: this._defaultAddressType, dataType: 'string', label: "Default Address Type" },
                { key: "MultipleAddressesSettings.MvcPage", value: this._mvcPage, dataType: 'multipleaddressespage', label: "Mvc Page" },
            ];
        }

}