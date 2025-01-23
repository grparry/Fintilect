import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { CotsSettings } from './CotsSettings';
import { CardType } from './CardType';
export interface CardManagementSettingsConfig {
    IsPinChangeEnabled: boolean;
    MinVersion: number;
    CotsSettings: CotsSettings;
    SupportedCardTypes: CardType[];
    RemoveCvvValidationForTheseCardTypes: CardType[];
    UnacceptablePins: string[];
    DnaShouldCallCoreForCardNumbers: boolean;
    TransactionDisputeEnabled: boolean;
}

export class CardManagementSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'CardManagementSettings'
    };


            private _isPinChangeEnabled: boolean;
            get isPinChangeEnabled(): boolean {
                return this._isPinChangeEnabled;
            }
            set isPinChangeEnabled(value: boolean) {
                this._isPinChangeEnabled = value;
            }

            private _minVersion: number;
            get minVersion(): number {
                return this._minVersion;
            }
            set minVersion(value: number) {
                this._minVersion = value;
            }

            private _cotsSettings: CotsSettings;
            get cotsSettings(): CotsSettings {
                return this._cotsSettings;
            }
            set cotsSettings(value: CotsSettings) {
                this._cotsSettings = value;
            }

            private _supportedCardTypes: CardType[];
            get supportedCardTypes(): CardType[] {
                return this._supportedCardTypes;
            }
            set supportedCardTypes(value: CardType[]) {
                this._supportedCardTypes = value;
            }

            private _removeCvvValidationForTheseCardTypes: CardType[];
            get removeCvvValidationForTheseCardTypes(): CardType[] {
                return this._removeCvvValidationForTheseCardTypes;
            }
            set removeCvvValidationForTheseCardTypes(value: CardType[]) {
                this._removeCvvValidationForTheseCardTypes = value;
            }

            private _unacceptablePins: string[];
            get unacceptablePins(): string[] {
                return this._unacceptablePins;
            }
            set unacceptablePins(value: string[]) {
                this._unacceptablePins = value;
            }

            private _dnaShouldCallCoreForCardNumbers: boolean;
            get dnaShouldCallCoreForCardNumbers(): boolean {
                return this._dnaShouldCallCoreForCardNumbers;
            }
            set dnaShouldCallCoreForCardNumbers(value: boolean) {
                this._dnaShouldCallCoreForCardNumbers = value;
            }

            private _transactionDisputeEnabled: boolean;
            get transactionDisputeEnabled(): boolean {
                return this._transactionDisputeEnabled;
            }
            set transactionDisputeEnabled(value: boolean) {
                this._transactionDisputeEnabled = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "CardManagementSettings.IsPinChangeEnabled", value: this._isPinChangeEnabled, dataType: 'boolean', label: "Is Pin Change Enabled" },
                { key: "CardManagementSettings.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "CardManagementSettings.CotsSettings", value: this._cotsSettings, dataType: 'cotssettings', label: "Cots Settings" },
                { key: "CardManagementSettings.SupportedCardTypes", value: this._supportedCardTypes, dataType: 'array<CardType>', label: "Supported Card Types" },
                { key: "CardManagementSettings.RemoveCvvValidationForTheseCardTypes", value: this._removeCvvValidationForTheseCardTypes, dataType: 'array<CardType>', label: "Remove Cvv Validation For These Card Types" },
                { key: "CardManagementSettings.UnacceptablePins", value: this._unacceptablePins, dataType: 'ienumerable<string>', label: "Unacceptable Pins" },
                { key: "CardManagementSettings.DnaShouldCallCoreForCardNumbers", value: this._dnaShouldCallCoreForCardNumbers, dataType: 'boolean', label: "Dna Should Call Core For Card Numbers" },
                { key: "CardManagementSettings.TransactionDisputeEnabled", value: this._transactionDisputeEnabled, dataType: 'boolean', label: "Transaction Dispute Enabled" },
            ];
        }

}