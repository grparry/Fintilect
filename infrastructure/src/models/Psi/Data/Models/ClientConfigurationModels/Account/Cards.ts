import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { CreditCardSsoProvider } from './CreditCardSsoProvider';
export interface CardsConfig {
    PscuRightTimeEnabled: boolean;
    ShouldShowPaymentDueDateForCreditCards: boolean;
    PscuRightTimeMerchantNumber: string;
    EncryptionKey: string;
    CreditCardSsoProvider: CreditCardSsoProvider;
    CreditCardSsoExternalLink: string;
    HouseholdingCreditCardSsoEnabled: boolean;
    CreditCardSsoShouldOpenInNewWindow: boolean;
    CreditCardsShouldLoadSsoDirectly: boolean;
    ShowCreditCardBalances: boolean;
}

export class Cards implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Cards'
    };


            private _pscuRightTimeEnabled: boolean;
            get pscuRightTimeEnabled(): boolean {
                return this._pscuRightTimeEnabled;
            }
            set pscuRightTimeEnabled(value: boolean) {
                this._pscuRightTimeEnabled = value;
            }

            private _shouldShowPaymentDueDateForCreditCards: boolean;
            get shouldShowPaymentDueDateForCreditCards(): boolean {
                return this._shouldShowPaymentDueDateForCreditCards;
            }
            set shouldShowPaymentDueDateForCreditCards(value: boolean) {
                this._shouldShowPaymentDueDateForCreditCards = value;
            }

            private _pscuRightTimeMerchantNumber: string;
            get pscuRightTimeMerchantNumber(): string {
                return this._pscuRightTimeMerchantNumber;
            }
            set pscuRightTimeMerchantNumber(value: string) {
                this._pscuRightTimeMerchantNumber = value;
            }

            private _encryptionKey: string;
            get encryptionKey(): string {
                return this._encryptionKey;
            }
            set encryptionKey(value: string) {
                this._encryptionKey = value;
            }

            private _creditCardSsoProvider: CreditCardSsoProvider;
            get creditCardSsoProvider(): CreditCardSsoProvider {
                return this._creditCardSsoProvider;
            }
            set creditCardSsoProvider(value: CreditCardSsoProvider) {
                this._creditCardSsoProvider = value;
            }

            private _creditCardSsoExternalLink: string;
            get creditCardSsoExternalLink(): string {
                return this._creditCardSsoExternalLink;
            }
            set creditCardSsoExternalLink(value: string) {
                this._creditCardSsoExternalLink = value;
            }

            private _householdingCreditCardSsoEnabled: boolean;
            get householdingCreditCardSsoEnabled(): boolean {
                return this._householdingCreditCardSsoEnabled;
            }
            set householdingCreditCardSsoEnabled(value: boolean) {
                this._householdingCreditCardSsoEnabled = value;
            }

            private _creditCardSsoShouldOpenInNewWindow: boolean;
            get creditCardSsoShouldOpenInNewWindow(): boolean {
                return this._creditCardSsoShouldOpenInNewWindow;
            }
            set creditCardSsoShouldOpenInNewWindow(value: boolean) {
                this._creditCardSsoShouldOpenInNewWindow = value;
            }

            private _creditCardsShouldLoadSsoDirectly: boolean;
            get creditCardsShouldLoadSsoDirectly(): boolean {
                return this._creditCardsShouldLoadSsoDirectly;
            }
            set creditCardsShouldLoadSsoDirectly(value: boolean) {
                this._creditCardsShouldLoadSsoDirectly = value;
            }

            private _showCreditCardBalances: boolean;
            get showCreditCardBalances(): boolean {
                return this._showCreditCardBalances;
            }
            set showCreditCardBalances(value: boolean) {
                this._showCreditCardBalances = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "Cards.PscuRightTimeEnabled", value: this._pscuRightTimeEnabled, dataType: 'boolean', label: "Pscu Right Time Enabled" },
                { key: "Cards.ShouldShowPaymentDueDateForCreditCards", value: this._shouldShowPaymentDueDateForCreditCards, dataType: 'boolean', label: "Should Show Payment Due Date For Credit Cards" },
                { key: "Cards.PscuRightTimeMerchantNumber", value: this._pscuRightTimeMerchantNumber, dataType: 'string', label: "Pscu Right Time Merchant Number" },
                { key: "Cards.EncryptionKey", value: this._encryptionKey, dataType: 'string', label: "Encryption Key" },
                { key: "Cards.CreditCardSsoProvider", value: this._creditCardSsoProvider, dataType: 'creditcardssoprovider', label: "Credit Card Sso Provider" },
                { key: "Cards.CreditCardSsoExternalLink", value: this._creditCardSsoExternalLink, dataType: 'string', label: "Credit Card Sso External Link" },
                { key: "Cards.HouseholdingCreditCardSsoEnabled", value: this._householdingCreditCardSsoEnabled, dataType: 'boolean', label: "Householding Credit Card Sso Enabled" },
                { key: "Cards.CreditCardSsoShouldOpenInNewWindow", value: this._creditCardSsoShouldOpenInNewWindow, dataType: 'boolean', label: "Credit Card Sso Should Open In New Window" },
                { key: "Cards.CreditCardsShouldLoadSsoDirectly", value: this._creditCardsShouldLoadSsoDirectly, dataType: 'boolean', label: "Credit Cards Should Load Sso Directly" },
                { key: "Cards.ShowCreditCardBalances", value: this._showCreditCardBalances, dataType: 'boolean', label: "Show Credit Card Balances" },
            ];
        }

}