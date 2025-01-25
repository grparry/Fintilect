import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface CreditCardsConfig {
    IsCreditLimitVisible: boolean;
    ShouldShowAvailableInsteadOfCreditLimit: boolean;
}

export class CreditCards implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'CreditCards'
    };


            private _isCreditLimitVisible: boolean;
            get isCreditLimitVisible(): boolean {
                return this._isCreditLimitVisible;
            }
            set isCreditLimitVisible(value: boolean) {
                this._isCreditLimitVisible = value;
            }

            private _shouldShowAvailableInsteadOfCreditLimit: boolean;
            get shouldShowAvailableInsteadOfCreditLimit(): boolean {
                return this._shouldShowAvailableInsteadOfCreditLimit;
            }
            set shouldShowAvailableInsteadOfCreditLimit(value: boolean) {
                this._shouldShowAvailableInsteadOfCreditLimit = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "CreditCards.IsCreditLimitVisible", value: this._isCreditLimitVisible, dataType: 'boolean', label: "Is Credit Limit Visible" },
                { key: "CreditCards.ShouldShowAvailableInsteadOfCreditLimit", value: this._shouldShowAvailableInsteadOfCreditLimit, dataType: 'boolean', label: "Should Show Available Instead Of Credit Limit" },
            ];
        }

}