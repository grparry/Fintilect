import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { LocationSearchProvider } from '@infrastructure/LocationSearchProvider';
export interface LocationSearchConfig {
    MinimumVersion: string;
    MinimumAndroidVersion: string;
    MinimumIosVersion: string;
    Enabled: boolean;
    Distance: number;
    Provider: LocationSearchProvider;
    SupportsStreetLocations: boolean;
    SearchKey: string;
    SupportsCustomSearchKeys: boolean;
    CustomSearchKeysMinimumVersion: string;
}

export class LocationSearch implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'LocationSearch'
    };


            private _minimumVersion: string;
            get minimumVersion(): string {
                return this._minimumVersion;
            }
            set minimumVersion(value: string) {
                this._minimumVersion = value;
            }

            private _minimumAndroidVersion: string;
            get minimumAndroidVersion(): string {
                return this._minimumAndroidVersion;
            }
            set minimumAndroidVersion(value: string) {
                this._minimumAndroidVersion = value;
            }

            private _minimumIosVersion: string;
            get minimumIosVersion(): string {
                return this._minimumIosVersion;
            }
            set minimumIosVersion(value: string) {
                this._minimumIosVersion = value;
            }

            private _enabled: boolean;
            get enabled(): boolean {
                return this._enabled;
            }
            set enabled(value: boolean) {
                this._enabled = value;
            }

            private _distance: number;
            get distance(): number {
                return this._distance;
            }
            set distance(value: number) {
                this._distance = value;
            }

            private _provider: LocationSearchProvider;
            get provider(): LocationSearchProvider {
                return this._provider;
            }
            set provider(value: LocationSearchProvider) {
                this._provider = value;
            }

            private _supportsStreetLocations: boolean;
            get supportsStreetLocations(): boolean {
                return this._supportsStreetLocations;
            }
            set supportsStreetLocations(value: boolean) {
                this._supportsStreetLocations = value;
            }

            private _searchKey: string;
            get searchKey(): string {
                return this._searchKey;
            }
            set searchKey(value: string) {
                this._searchKey = value;
            }

            private _supportsCustomSearchKeys: boolean;
            get supportsCustomSearchKeys(): boolean {
                return this._supportsCustomSearchKeys;
            }
            set supportsCustomSearchKeys(value: boolean) {
                this._supportsCustomSearchKeys = value;
            }

            private _customSearchKeysMinimumVersion: string;
            get customSearchKeysMinimumVersion(): string {
                return this._customSearchKeysMinimumVersion;
            }
            set customSearchKeysMinimumVersion(value: string) {
                this._customSearchKeysMinimumVersion = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "LocationSearch.MinimumVersion", value: this._minimumVersion, dataType: 'string', label: "Minimum Version" },
                { key: "LocationSearch.MinimumAndroidVersion", value: this._minimumAndroidVersion, dataType: 'string', label: "Minimum Android Version" },
                { key: "LocationSearch.MinimumIosVersion", value: this._minimumIosVersion, dataType: 'string', label: "Minimum Ios Version" },
                { key: "LocationSearch.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "LocationSearch.Distance", value: this._distance, dataType: 'number', label: "Distance" },
                { key: "LocationSearch.Provider", value: this._provider, dataType: 'locationsearchprovider', label: "Provider" },
                { key: "LocationSearch.SupportsStreetLocations", value: this._supportsStreetLocations, dataType: 'boolean', label: "Supports Street Locations" },
                { key: "LocationSearch.SearchKey", value: this._searchKey, dataType: 'string', label: "Search Key" },
                { key: "LocationSearch.SupportsCustomSearchKeys", value: this._supportsCustomSearchKeys, dataType: 'boolean', label: "Supports Custom Search Keys" },
                { key: "LocationSearch.CustomSearchKeysMinimumVersion", value: this._customSearchKeysMinimumVersion, dataType: 'string', label: "Custom Search Keys Minimum Version" },
            ];
        }

}