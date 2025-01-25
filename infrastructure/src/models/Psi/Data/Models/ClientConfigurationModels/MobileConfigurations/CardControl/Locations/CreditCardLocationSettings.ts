import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface CreditCardLocationSettingsConfig {
    MaxNumberOfRegions: number;
    UsOnlyEnabled: boolean;
    RegionsEnabled: boolean;
    CurrentLocationEnabled: boolean;
}

export class CreditCardLocationSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'CreditCardLocationSettings'
    };


            private _maxNumberOfRegions: number;
            get maxNumberOfRegions(): number {
                return this._maxNumberOfRegions;
            }
            set maxNumberOfRegions(value: number) {
                this._maxNumberOfRegions = value;
            }

            private _usOnlyEnabled: boolean;
            get usOnlyEnabled(): boolean {
                return this._usOnlyEnabled;
            }
            set usOnlyEnabled(value: boolean) {
                this._usOnlyEnabled = value;
            }

            private _regionsEnabled: boolean;
            get regionsEnabled(): boolean {
                return this._regionsEnabled;
            }
            set regionsEnabled(value: boolean) {
                this._regionsEnabled = value;
            }

            private _currentLocationEnabled: boolean;
            get currentLocationEnabled(): boolean {
                return this._currentLocationEnabled;
            }
            set currentLocationEnabled(value: boolean) {
                this._currentLocationEnabled = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "CreditCardLocationSettings.MaxNumberOfRegions", value: this._maxNumberOfRegions, dataType: 'number', label: "Max Number Of Regions" },
                { key: "CreditCardLocationSettings.UsOnlyEnabled", value: this._usOnlyEnabled, dataType: 'boolean', label: "Us Only Enabled" },
                { key: "CreditCardLocationSettings.RegionsEnabled", value: this._regionsEnabled, dataType: 'boolean', label: "Regions Enabled" },
                { key: "CreditCardLocationSettings.CurrentLocationEnabled", value: this._currentLocationEnabled, dataType: 'boolean', label: "Current Location Enabled" },
            ];
        }

}