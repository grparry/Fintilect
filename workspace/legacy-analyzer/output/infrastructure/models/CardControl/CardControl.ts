// Generated imports
import { OndotDxSettings } from '../OndotDxSettings';
import { OnDotSdkSettings } from '../OnDotSdkSettings';
import { CardControlLocations } from '../CardControlLocations';
import { CreditCardSettings } from '../CreditCards/CreditCardSettings';
import { DebitCardSettings } from '../DebitCardSettings';
import { LostOrStolenCardSettings } from '../LostOrStolenCardSettings';
import { CardControlTypeIdentifierByCategory } from '../CardControlTypeIdentifierByCategory';
import { CardControlVendor } from '../CardControlVendor';
import { Authentication } from '../MobileConfigurations/Authentication/Authentication';
import { RequestTypesRequiringCredentials } from '../RequestTypesRequiringCredentials';

export interface CardControl {
    ondotDxSettings: OndotDxSettings;
    onDotSdkSettings: OnDotSdkSettings;
    cardControlLocations: CardControlLocations;
    creditCardSettings: CreditCardSettings;
    debitCardSettings: DebitCardSettings;
    lostOrStolenCardSettings: LostOrStolenCardSettings;
    /** @settingKey Mobile.CardControl.MinimumVersion */
    minimumVersion: string;
    /** @settingKey Mobile.CardControl.MinimumAndroidVersion */
    minimumAndroidVersion: string;
    /** @settingKey Mobile.CardControl.MinimumIosVersion */
    minimumIosVersion: string;
    /** @settingKey Mobile.CardControl.Enabled */
    enabled: boolean;
    /** @settingKey Mobile.CardControl.SpendingLimitsEnabled */
    spendingLimitsEnabled: boolean;
    /** @settingKey Mobile.CardControl.TransactionTypesEnabled */
    transactionTypesEnabled: boolean;
    /** @settingKey Mobile.CardControl.ManagePermissionsEnabled */
    managePermissionsEnabled: boolean;
    /** @settingKey Mobile.CardControl.UserDeviceSetupEnabled */
    userDeviceSetupEnabled: boolean;
    /** @settingKey Mobile.CardControl.AlertPreferencesEnabled */
    alertPreferencesEnabled: boolean;
    /** @settingKey Mobile.CardControl.MerchantTypesEnabled */
    merchantTypesEnabled: boolean;
    /** @settingKey Mobile.CardControl.CardOffFixedTimeEnabled */
    cardOffFixedTimeEnabled: boolean;
    /** @settingKey Mobile.CardControl.CardOffUserDefinedTimeEnabled */
    cardOffUserDefinedTimeEnabled: boolean;
    /** @settingKey Mobile.CardControl.LargeTransactionControlEnabled */
    largeTransactionControlEnabled: boolean;
    /** @settingKey Mobile.CardControl.InternationalTransactionControlEnabled */
    internationalTransactionControlEnabled: boolean;
    /** @settingKey Mobile.CardControl.MerchantStateListControlEnabled */
    merchantStateListControlEnabled: boolean;
    /** @settingKey Mobile.CardControl.InternetTransactionControlEnabled */
    internetTransactionControlEnabled: boolean;
    /** @settingKey Mobile.CardControl.TimeOfDayRangeControlEnabled */
    timeOfDayRangeControlEnabled: boolean;
    /** @settingKey Mobile.CardControl.ActiveCardStateCommonCode */
    activeCardStateCommonCode: string;
    /** @settingKey Mobile.CardControl.ClosedCardStateCommonCode */
    closedCardStateCommonCode: string;
    /** @settingKey Mobile.CardControl.RestrictedCardStateCommonCode */
    restrictedCardStateCommonCode: string;
    /** @settingKey Mobile.CardControl.CardControlTypeIdentifierByCategory */
    list: CardControlTypeIdentifierByCategory;
    /** @settingKey Mobile.CardControl.Vendor */
    cardControlVendor: CardControlVendor;
    /** @settingKey Mobile.CardControl.DebitCardVendor */
    cardControlVendor: CardControlVendor;
    /** @settingKey Mobile.CardControl.CreditCardVendor */
    cardControlVendor: CardControlVendor;
    /** @settingKey Mobile.CardControl.DeleteClosedCards */
    deleteClosedCards: boolean;
    /** @settingKey Mobile.CardControl.AddPendingCards */
    addPendingCards: boolean;
    /** @settingKey Mobile.CardControl.HideCardNicknames */
    hideCardNicknames: boolean;
    /** @settingKey Mobile.CardControl.PscuClientID */
    /**
     * /// <summary>
     * /// // ReSharper disable once InconsistentNaming
     * /// /// <summary>
     * /// /// ID from PSCUConfig Table
     * /// /// </summary>
     * /// </summary>
     */
    pscuClientID: number;
    /** @settingKey Mobile.CardControl.CorelationLockReasonSerial */
    corelationLockReasonSerial: string;
    authentication: Authentication;
    /** @settingKey Mobile.CardControl.IgnoreReferenceIds */
    ignoreReferenceIds: boolean;
    /** @settingKey Mobile.CardControl.HashKey */
    hashKey: string;
    /** @settingKey Mobile.CardControl.ShowRegisterCardOption */
    showRegisterCardOption: boolean;
    /** @settingKey Mobile.CardControl.ConnectNative.Enabled */
    connectNativeEnabled: boolean;
    /** @settingKey Mobile.CardControl.Alerts.MemberControlOfAlertsEnabled */
    memberControlOfAlertsEnabled: boolean;
    /** @settingKey Mobile.CardControl.Alerts.AllAlertsOnOffEnabled */
    allAlertsOnOffEnabled: boolean;
    /** @settingKey Mobile.CardControl.Alerts.SpendingLimitAlertsEnabled */
    spendingLimitAlertsEnabled: boolean;
    /** @settingKey Mobile.CardControl.Alerts.TransactionAmountAlertEnabled */
    transactionAmountAlertEnabled: boolean;
    /** @settingKey Mobile.CardControl.Alerts.MonthlyTransactionAmountAlertEnabled */
    monthlyTransactionAmountAlertEnabled: boolean;
    /** @settingKey Mobile.CardControl.AlertsDelivery.TransactionAmountAlertEnabled */
    alertsDeliveryTransactionAmountAlertEnabled: boolean;
    /** @settingKey Mobile.CardControl.AlertsDelivery.AnyTransactionAlertEnabled */
    alertsDeliveryAnyTransactionAlertEnabled: boolean;
    /** @settingKey Mobile.CardControl.AlertsDelivery.ShouldUseMessageText */
    alertsDeliveryShouldUseMessageText: boolean;
    /** @settingKey Mobile.CardControl.AlertsDelivery.MonthlySpendingAlertEnabled */
    alertsDeliveryMonthlySpendingAlertEnabled: boolean;
    /** @settingKey Mobile.CardControl.ReplaceCardEnabled */
    replaceCardEnabled: boolean;
    /** @settingKey Mobile.CardControl.Symitar.DebitCardTypeIds */
    symitarDebitCardTypeIds: string;
    /** @settingKey Mobile.CardControl.AtmCashWithdrawal.LimitEnabled */
    atmCashWithdrawalLimitEnabled: boolean;
    /** @settingKey Mobile.CardControl.AtmCashWithdrawal.MaximumAmount */
    atmCashWithdrawalMaximumAmount: number;
    /** @settingKey Mobile.CardControl.AtmCashWithdrawal.LimitFeeAmount */
    atmCashWithdrawalLimitFeeAmount: number;
    /** @settingKey Mobile.CardControl.RequestTypesRequiringCredentials */
    list: RequestTypesRequiringCredentials;
    /** @settingKey Moblie.CardControl.Ondot.SendAmountAsDollars */
    sendAmountAsDollars: boolean;
    /** @settingKey Mobile.CardControl.ShouldShowMemberNameFromCardRecord */
    shouldShowMemberNameFromCardRecord: boolean;
    /** @settingKey Mobile.CardControl.Alerts.UseCardNumberToDeriveSubscriptionAlerts */
    useCardNumberToDeriveSubscriptionAlerts: boolean;
}
