import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { CreditCardLocationSettings } from '@infrastructure/CreditCardLocationSettings';
import { DebitCardLocationSettings } from '@infrastructure/DebitCardLocationSettings';
export interface CardControlLocationsConfig {
    CreditCard: CreditCardLocationSettings;
    DebitCard: DebitCardLocationSettings;
    CurrentLocationEnabled: boolean;
    RegionsEnabled: boolean;
    UsOnlyEnabled: boolean;
    MaxNumberOfRegions: number;
}

export class CardControlLocations implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'CardControlLocations'
    };


            private _creditCard: CreditCardLocationSettings;
            get creditCard(): CreditCardLocationSettings {
                return this._creditCard;
            }
            set creditCard(value: CreditCardLocationSettings) {
                this._creditCard = value;
            }

            private _debitCard: DebitCardLocationSettings;
            get debitCard(): DebitCardLocationSettings {
                return this._debitCard;
            }
            set debitCard(value: DebitCardLocationSettings) {
                this._debitCard = value;
            }

            private _currentLocationEnabled: boolean;
            get currentLocationEnabled(): boolean {
                return this._currentLocationEnabled;
            }
            set currentLocationEnabled(value: boolean) {
                this._currentLocationEnabled = value;
            }

            private _regionsEnabled: boolean;
            get regionsEnabled(): boolean {
                return this._regionsEnabled;
            }
            set regionsEnabled(value: boolean) {
                this._regionsEnabled = value;
            }

            private _usOnlyEnabled: boolean;
            get usOnlyEnabled(): boolean {
                return this._usOnlyEnabled;
            }
            set usOnlyEnabled(value: boolean) {
                this._usOnlyEnabled = value;
            }

            private _maxNumberOfRegions: number;
            get maxNumberOfRegions(): number {
                return this._maxNumberOfRegions;
            }
            set maxNumberOfRegions(value: number) {
                this._maxNumberOfRegions = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "CardControlLocations.CreditCard", value: this._creditCard, dataType: 'creditcardlocationsettings', label: "Credit Card" },
                { key: "CardControlLocations.DebitCard", value: this._debitCard, dataType: 'debitcardlocationsettings', label: "Debit Card" },
                { key: "CardControlLocations.CurrentLocationEnabled", value: this._currentLocationEnabled, dataType: 'boolean', label: "Current Location Enabled" },
                { key: "CardControlLocations.RegionsEnabled", value: this._regionsEnabled, dataType: 'boolean', label: "Regions Enabled" },
                { key: "CardControlLocations.UsOnlyEnabled", value: this._usOnlyEnabled, dataType: 'boolean', label: "Us Only Enabled" },
                { key: "CardControlLocations.MaxNumberOfRegions", value: this._maxNumberOfRegions, dataType: 'number', label: "Max Number Of Regions" },
            ];
        }

}