import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface DebitCardsConfig {
    ShouldChangeExpirationDateToEndOfPreviousMonth: boolean;
    ExpiresAtStartOfMonth: boolean;
}

export class DebitCards implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'DebitCards'
    };


            private _shouldChangeExpirationDateToEndOfPreviousMonth: boolean;
            get shouldChangeExpirationDateToEndOfPreviousMonth(): boolean {
                return this._shouldChangeExpirationDateToEndOfPreviousMonth;
            }
            set shouldChangeExpirationDateToEndOfPreviousMonth(value: boolean) {
                this._shouldChangeExpirationDateToEndOfPreviousMonth = value;
            }

            private _expiresAtStartOfMonth: boolean;
            get expiresAtStartOfMonth(): boolean {
                return this._expiresAtStartOfMonth;
            }
            set expiresAtStartOfMonth(value: boolean) {
                this._expiresAtStartOfMonth = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "DebitCards.ShouldChangeExpirationDateToEndOfPreviousMonth", value: this._shouldChangeExpirationDateToEndOfPreviousMonth, dataType: 'boolean', label: "Should Change Expiration Date To End Of Previous Month" },
                { key: "DebitCards.ExpiresAtStartOfMonth", value: this._expiresAtStartOfMonth, dataType: 'boolean', label: "Expires At Start Of Month" },
            ];
        }

}