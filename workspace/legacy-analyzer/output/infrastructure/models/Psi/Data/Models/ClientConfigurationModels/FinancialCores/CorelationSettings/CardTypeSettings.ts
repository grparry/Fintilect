import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface CardTypeSettingsConfig {
    AtmSerial: string;
    AtmDescription: string;
    CreditSerial: string;
    CreditDescription: string;
    DebitSerial: string;
    DebitDescription: string;
}

export class CardTypeSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'CardTypeSettings'
    };


            private _atmSerial: string;
            get atmSerial(): string {
                return this._atmSerial;
            }
            set atmSerial(value: string) {
                this._atmSerial = value;
            }

            private _atmDescription: string;
            get atmDescription(): string {
                return this._atmDescription;
            }
            set atmDescription(value: string) {
                this._atmDescription = value;
            }

            private _creditSerial: string;
            get creditSerial(): string {
                return this._creditSerial;
            }
            set creditSerial(value: string) {
                this._creditSerial = value;
            }

            private _creditDescription: string;
            get creditDescription(): string {
                return this._creditDescription;
            }
            set creditDescription(value: string) {
                this._creditDescription = value;
            }

            private _debitSerial: string;
            get debitSerial(): string {
                return this._debitSerial;
            }
            set debitSerial(value: string) {
                this._debitSerial = value;
            }

            private _debitDescription: string;
            get debitDescription(): string {
                return this._debitDescription;
            }
            set debitDescription(value: string) {
                this._debitDescription = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "CardTypeSettings.AtmSerial", value: this._atmSerial, dataType: 'string', label: "Atm Serial" },
                { key: "CardTypeSettings.AtmDescription", value: this._atmDescription, dataType: 'string', label: "Atm Description" },
                { key: "CardTypeSettings.CreditSerial", value: this._creditSerial, dataType: 'string', label: "Credit Serial" },
                { key: "CardTypeSettings.CreditDescription", value: this._creditDescription, dataType: 'string', label: "Credit Description" },
                { key: "CardTypeSettings.DebitSerial", value: this._debitSerial, dataType: 'string', label: "Debit Serial" },
                { key: "CardTypeSettings.DebitDescription", value: this._debitDescription, dataType: 'string', label: "Debit Description" },
            ];
        }

}