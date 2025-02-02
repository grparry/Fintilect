import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface MultipleAddressesPageConfig {
    Enabled: boolean;
    MinVersion: number;
    DeleteAddressEnabled: boolean;
    AddressTypesThatCanBeDeleted: string[];
}

export class MultipleAddressesPage implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'MultipleAddressesPage'
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

            private _deleteAddressEnabled: boolean;
            get deleteAddressEnabled(): boolean {
                return this._deleteAddressEnabled;
            }
            set deleteAddressEnabled(value: boolean) {
                this._deleteAddressEnabled = value;
            }

            private _addressTypesThatCanBeDeleted: string[];
            get addressTypesThatCanBeDeleted(): string[] {
                return this._addressTypesThatCanBeDeleted;
            }
            set addressTypesThatCanBeDeleted(value: string[]) {
                this._addressTypesThatCanBeDeleted = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "MultipleAddressesPage.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "MultipleAddressesPage.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "MultipleAddressesPage.DeleteAddressEnabled", value: this._deleteAddressEnabled, dataType: 'boolean', label: "Delete Address Enabled" },
                { key: "MultipleAddressesPage.AddressTypesThatCanBeDeleted", value: this._addressTypesThatCanBeDeleted, dataType: 'list<string>', label: "Address Types That Can Be Deleted" },
            ];
        }

}