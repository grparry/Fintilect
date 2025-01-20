// Generated imports
import { CreditCardSsoProvider } from '../CreditCardSsoProvider';

export interface Cards {
    /** @settingKey Cards.PscuRightTime.Enabled */
    pscuRightTimeEnabled: boolean;
    /** @settingKey Cards.ShouldShowPaymentDueDateForCreditCards */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If true we will show the next payment due date on the summary page
     * /// /// </summary>
     * /// </summary>
     */
    shouldShowPaymentDueDateForCreditCards: boolean;
    /** @settingKey Cards.PscuRightTime.MerchantNumber */
    pscuRightTimeMerchantNumber: string;
    /** @settingKey Cards.EncryptionKey */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Base64 Encoded string used to encryped/decrypt a credit card number
     * /// /// </summary>
     * /// /// <remarks>String 32 characters long and then Base64 encode it</remarks>
     * /// </summary>
     */
    encryptionKey: string;
    /** @settingKey X.App.HomeBanking.CreditCardSSOType */
    creditCardSsoProvider: CreditCardSsoProvider;
    /** @settingKey X.App.HomeBanking.CreditCardExternalLink */
    creditCardSsoExternalLink: string;
    /** @settingKey X.App.HomeBanking.HouseholdingCreditCardSSO */
    householdingCreditCardSsoEnabled: boolean;
    /** @settingKey X.App.HomeBanking.CreditCardSsoDisplayType */
    creditCardSsoShouldOpenInNewWindow: boolean;
    /** @settingKey Mobile.Accounts.CreditCards.ShouldLoadSsoDirectly */
    creditCardsShouldLoadSsoDirectly: boolean;
    /** @settingKey X.App.HomeBanking.ShowCreditCardBalances */
    showCreditCardBalances: boolean;
}
