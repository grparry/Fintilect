import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface EplConfig {
    ShouldAddAccountInquiryRepliesForCrossAccounts: boolean;
    CreditCardDepositPermitted: boolean;
    CreditCardInquiryPermitted: boolean;
    CreditCardWithdrawalPermitted: boolean;
}

export class Epl implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Epl'
    };


            private _shouldAddAccountInquiryRepliesForCrossAccounts: boolean;
            get shouldAddAccountInquiryRepliesForCrossAccounts(): boolean {
                return this._shouldAddAccountInquiryRepliesForCrossAccounts;
            }
            set shouldAddAccountInquiryRepliesForCrossAccounts(value: boolean) {
                this._shouldAddAccountInquiryRepliesForCrossAccounts = value;
            }

            private _creditCardDepositPermitted: boolean;
            get creditCardDepositPermitted(): boolean {
                return this._creditCardDepositPermitted;
            }
            set creditCardDepositPermitted(value: boolean) {
                this._creditCardDepositPermitted = value;
            }

            private _creditCardInquiryPermitted: boolean;
            get creditCardInquiryPermitted(): boolean {
                return this._creditCardInquiryPermitted;
            }
            set creditCardInquiryPermitted(value: boolean) {
                this._creditCardInquiryPermitted = value;
            }

            private _creditCardWithdrawalPermitted: boolean;
            get creditCardWithdrawalPermitted(): boolean {
                return this._creditCardWithdrawalPermitted;
            }
            set creditCardWithdrawalPermitted(value: boolean) {
                this._creditCardWithdrawalPermitted = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "Epl.ShouldAddAccountInquiryRepliesForCrossAccounts", value: this._shouldAddAccountInquiryRepliesForCrossAccounts, dataType: 'boolean', label: "Should Add Account Inquiry Replies For Cross Accounts" },
                { key: "Epl.CreditCardDepositPermitted", value: this._creditCardDepositPermitted, dataType: 'boolean', label: "Credit Card Deposit Permitted" },
                { key: "Epl.CreditCardInquiryPermitted", value: this._creditCardInquiryPermitted, dataType: 'boolean', label: "Credit Card Inquiry Permitted" },
                { key: "Epl.CreditCardWithdrawalPermitted", value: this._creditCardWithdrawalPermitted, dataType: 'boolean', label: "Credit Card Withdrawal Permitted" },
            ];
        }

}