import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { OndotDxSettings } from '@infrastructure/OndotDxSettings';
import { OnDotSdkSettings } from '@infrastructure/OnDotSdkSettings';
import { CardControlLocations } from '@infrastructure/CardControlLocations';
import { CreditCardSettings } from '@infrastructure/CreditCardSettings';
import { DebitCardSettings } from '@infrastructure/DebitCardSettings';
import { LostOrStolenCardSettings } from '@infrastructure/LostOrStolenCardSettings';
import { CardControlTypeIdentifierByCategorySetting } from '@infrastructure/CardControlTypeIdentifierByCategorySetting';
import { CardControlVendor } from '@infrastructure/CardControlVendor';
import { Authentication } from '@infrastructure/Authentication.Authentication';
export interface CardControlConfig {
    OndotDxSettings: OndotDxSettings;
    OnDotSdk: OnDotSdkSettings;
    Locations: CardControlLocations;
    CreditCard: CreditCardSettings;
    DebitCard: DebitCardSettings;
    LostOrStolenCard: LostOrStolenCardSettings;
    MinimumVersion: string;
    MinimumAndroidVersion: string;
    MinimumIosVersion: string;
    Enabled: boolean;
    SpendingLimitsEnabled: boolean;
    TransactionTypesEnabled: boolean;
    ManagePermissionsEnabled: boolean;
    UserDeviceSetupEnabled: boolean;
    AlertPreferencesEnabled: boolean;
    MerchantTypesEnabled: boolean;
    CardOffFixedTimeEnabled: boolean;
    CardOffUserDefinedTimeEnabled: boolean;
    LargeTransactionControlEnabled: boolean;
    InternationalTransactionControlEnabled: boolean;
    MerchantStateListControlEnabled: boolean;
    InternetTransactionControlEnabled: boolean;
    TimeOfDayRangeControlEnabled: boolean;
    ActiveCardStateCommonCode: string;
    ClosedCardStateCommonCode: string;
    RestrictedCardStateCommonCode: string;
    CardControlTypeIdentifierByCategory: CardControlTypeIdentifierByCategorySetting[];
    Vendor: CardControlVendor;
    DebitCardVendor: CardControlVendor;
    CreditCardVendor: CardControlVendor;
    DeleteClosedCards: boolean;
    AddPendingCards: boolean;
    HideCardNicknames: boolean;
    PscuClientID: number;
    CorelationLockReasonSerial: string;
    Authentication: Authentication;
    IgnoreReferenceIds: boolean;
    HashKey: string;
    ShowRegisterCardOption: boolean;
    ConnectNativeEnabled: boolean;
    MemberControlOfAlertsEnabled: boolean;
    AllAlertsOnOffEnabled: boolean;
    SpendingLimitAlertsEnabled: boolean;
    TransactionAmountAlertEnabled: boolean;
    MonthlyTransactionAmountAlertEnabled: boolean;
    AlertsDeliveryTransactionAmountAlertEnabled: boolean;
    AlertsDeliveryAnyTransactionAlertEnabled: boolean;
    AlertsDeliveryShouldUseMessageText: boolean;
    AlertsDeliveryMonthlySpendingAlertEnabled: boolean;
    ReplaceCardEnabled: boolean;
    SymitarDebitCardTypeIds: string;
    AtmCashWithdrawalLimitEnabled: boolean;
    AtmCashWithdrawalMaximumAmount: number;
    AtmCashWithdrawalLimitFeeAmount: number;
    RequestTypesRequiringCredentials: string[];
    SendAmountAsDollars: boolean;
    ShouldShowMemberNameFromCardRecord: boolean;
    UseCardNumberToDeriveSubscriptionAlerts: boolean;
}

export class CardControl implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'CardControl'
    };


            private _ondotDxSettings: OndotDxSettings;
            get ondotDxSettings(): OndotDxSettings {
                return this._ondotDxSettings;
            }
            set ondotDxSettings(value: OndotDxSettings) {
                this._ondotDxSettings = value;
            }

            private _onDotSdk: OnDotSdkSettings;
            get onDotSdk(): OnDotSdkSettings {
                return this._onDotSdk;
            }
            set onDotSdk(value: OnDotSdkSettings) {
                this._onDotSdk = value;
            }

            private _locations: CardControlLocations;
            get locations(): CardControlLocations {
                return this._locations;
            }
            set locations(value: CardControlLocations) {
                this._locations = value;
            }

            private _creditCard: CreditCardSettings;
            get creditCard(): CreditCardSettings {
                return this._creditCard;
            }
            set creditCard(value: CreditCardSettings) {
                this._creditCard = value;
            }

            private _debitCard: DebitCardSettings;
            get debitCard(): DebitCardSettings {
                return this._debitCard;
            }
            set debitCard(value: DebitCardSettings) {
                this._debitCard = value;
            }

            private _lostOrStolenCard: LostOrStolenCardSettings;
            get lostOrStolenCard(): LostOrStolenCardSettings {
                return this._lostOrStolenCard;
            }
            set lostOrStolenCard(value: LostOrStolenCardSettings) {
                this._lostOrStolenCard = value;
            }

            private _minimumVersion: string;
            get minimumVersion(): string {
                return this._minimumVersion;
            }
            set minimumVersion(value: string) {
                this._minimumVersion = value;
            }

            private _minimumAndroidVersion: string;
            get minimumAndroidVersion(): string {
                return this._minimumAndroidVersion;
            }
            set minimumAndroidVersion(value: string) {
                this._minimumAndroidVersion = value;
            }

            private _minimumIosVersion: string;
            get minimumIosVersion(): string {
                return this._minimumIosVersion;
            }
            set minimumIosVersion(value: string) {
                this._minimumIosVersion = value;
            }

            private _enabled: boolean;
            get enabled(): boolean {
                return this._enabled;
            }
            set enabled(value: boolean) {
                this._enabled = value;
            }

            private _spendingLimitsEnabled: boolean;
            get spendingLimitsEnabled(): boolean {
                return this._spendingLimitsEnabled;
            }
            set spendingLimitsEnabled(value: boolean) {
                this._spendingLimitsEnabled = value;
            }

            private _transactionTypesEnabled: boolean;
            get transactionTypesEnabled(): boolean {
                return this._transactionTypesEnabled;
            }
            set transactionTypesEnabled(value: boolean) {
                this._transactionTypesEnabled = value;
            }

            private _managePermissionsEnabled: boolean;
            get managePermissionsEnabled(): boolean {
                return this._managePermissionsEnabled;
            }
            set managePermissionsEnabled(value: boolean) {
                this._managePermissionsEnabled = value;
            }

            private _userDeviceSetupEnabled: boolean;
            get userDeviceSetupEnabled(): boolean {
                return this._userDeviceSetupEnabled;
            }
            set userDeviceSetupEnabled(value: boolean) {
                this._userDeviceSetupEnabled = value;
            }

            private _alertPreferencesEnabled: boolean;
            get alertPreferencesEnabled(): boolean {
                return this._alertPreferencesEnabled;
            }
            set alertPreferencesEnabled(value: boolean) {
                this._alertPreferencesEnabled = value;
            }

            private _merchantTypesEnabled: boolean;
            get merchantTypesEnabled(): boolean {
                return this._merchantTypesEnabled;
            }
            set merchantTypesEnabled(value: boolean) {
                this._merchantTypesEnabled = value;
            }

            private _cardOffFixedTimeEnabled: boolean;
            get cardOffFixedTimeEnabled(): boolean {
                return this._cardOffFixedTimeEnabled;
            }
            set cardOffFixedTimeEnabled(value: boolean) {
                this._cardOffFixedTimeEnabled = value;
            }

            private _cardOffUserDefinedTimeEnabled: boolean;
            get cardOffUserDefinedTimeEnabled(): boolean {
                return this._cardOffUserDefinedTimeEnabled;
            }
            set cardOffUserDefinedTimeEnabled(value: boolean) {
                this._cardOffUserDefinedTimeEnabled = value;
            }

            private _largeTransactionControlEnabled: boolean;
            get largeTransactionControlEnabled(): boolean {
                return this._largeTransactionControlEnabled;
            }
            set largeTransactionControlEnabled(value: boolean) {
                this._largeTransactionControlEnabled = value;
            }

            private _internationalTransactionControlEnabled: boolean;
            get internationalTransactionControlEnabled(): boolean {
                return this._internationalTransactionControlEnabled;
            }
            set internationalTransactionControlEnabled(value: boolean) {
                this._internationalTransactionControlEnabled = value;
            }

            private _merchantStateListControlEnabled: boolean;
            get merchantStateListControlEnabled(): boolean {
                return this._merchantStateListControlEnabled;
            }
            set merchantStateListControlEnabled(value: boolean) {
                this._merchantStateListControlEnabled = value;
            }

            private _internetTransactionControlEnabled: boolean;
            get internetTransactionControlEnabled(): boolean {
                return this._internetTransactionControlEnabled;
            }
            set internetTransactionControlEnabled(value: boolean) {
                this._internetTransactionControlEnabled = value;
            }

            private _timeOfDayRangeControlEnabled: boolean;
            get timeOfDayRangeControlEnabled(): boolean {
                return this._timeOfDayRangeControlEnabled;
            }
            set timeOfDayRangeControlEnabled(value: boolean) {
                this._timeOfDayRangeControlEnabled = value;
            }

            private _activeCardStateCommonCode: string;
            get activeCardStateCommonCode(): string {
                return this._activeCardStateCommonCode;
            }
            set activeCardStateCommonCode(value: string) {
                this._activeCardStateCommonCode = value;
            }

            private _closedCardStateCommonCode: string;
            get closedCardStateCommonCode(): string {
                return this._closedCardStateCommonCode;
            }
            set closedCardStateCommonCode(value: string) {
                this._closedCardStateCommonCode = value;
            }

            private _restrictedCardStateCommonCode: string;
            get restrictedCardStateCommonCode(): string {
                return this._restrictedCardStateCommonCode;
            }
            set restrictedCardStateCommonCode(value: string) {
                this._restrictedCardStateCommonCode = value;
            }

            private _cardControlTypeIdentifierByCategory: CardControlTypeIdentifierByCategorySetting[];
            get cardControlTypeIdentifierByCategory(): CardControlTypeIdentifierByCategorySetting[] {
                return this._cardControlTypeIdentifierByCategory;
            }
            set cardControlTypeIdentifierByCategory(value: CardControlTypeIdentifierByCategorySetting[]) {
                this._cardControlTypeIdentifierByCategory = value;
            }

            private _vendor: CardControlVendor;
            get vendor(): CardControlVendor {
                return this._vendor;
            }
            set vendor(value: CardControlVendor) {
                this._vendor = value;
            }

            private _debitCardVendor: CardControlVendor;
            get debitCardVendor(): CardControlVendor {
                return this._debitCardVendor;
            }
            set debitCardVendor(value: CardControlVendor) {
                this._debitCardVendor = value;
            }

            private _creditCardVendor: CardControlVendor;
            get creditCardVendor(): CardControlVendor {
                return this._creditCardVendor;
            }
            set creditCardVendor(value: CardControlVendor) {
                this._creditCardVendor = value;
            }

            private _deleteClosedCards: boolean;
            get deleteClosedCards(): boolean {
                return this._deleteClosedCards;
            }
            set deleteClosedCards(value: boolean) {
                this._deleteClosedCards = value;
            }

            private _addPendingCards: boolean;
            get addPendingCards(): boolean {
                return this._addPendingCards;
            }
            set addPendingCards(value: boolean) {
                this._addPendingCards = value;
            }

            private _hideCardNicknames: boolean;
            get hideCardNicknames(): boolean {
                return this._hideCardNicknames;
            }
            set hideCardNicknames(value: boolean) {
                this._hideCardNicknames = value;
            }

            private _pscuClientID: number;
            get pscuClientID(): number {
                return this._pscuClientID;
            }
            set pscuClientID(value: number) {
                this._pscuClientID = value;
            }

            private _corelationLockReasonSerial: string;
            get corelationLockReasonSerial(): string {
                return this._corelationLockReasonSerial;
            }
            set corelationLockReasonSerial(value: string) {
                this._corelationLockReasonSerial = value;
            }

            private _authentication: Authentication;
            get authentication(): Authentication {
                return this._authentication;
            }
            set authentication(value: Authentication) {
                this._authentication = value;
            }

            private _ignoreReferenceIds: boolean;
            get ignoreReferenceIds(): boolean {
                return this._ignoreReferenceIds;
            }
            set ignoreReferenceIds(value: boolean) {
                this._ignoreReferenceIds = value;
            }

            private _hashKey: string;
            get hashKey(): string {
                return this._hashKey;
            }
            set hashKey(value: string) {
                this._hashKey = value;
            }

            private _showRegisterCardOption: boolean;
            get showRegisterCardOption(): boolean {
                return this._showRegisterCardOption;
            }
            set showRegisterCardOption(value: boolean) {
                this._showRegisterCardOption = value;
            }

            private _connectNativeEnabled: boolean;
            get connectNativeEnabled(): boolean {
                return this._connectNativeEnabled;
            }
            set connectNativeEnabled(value: boolean) {
                this._connectNativeEnabled = value;
            }

            private _memberControlOfAlertsEnabled: boolean;
            get memberControlOfAlertsEnabled(): boolean {
                return this._memberControlOfAlertsEnabled;
            }
            set memberControlOfAlertsEnabled(value: boolean) {
                this._memberControlOfAlertsEnabled = value;
            }

            private _allAlertsOnOffEnabled: boolean;
            get allAlertsOnOffEnabled(): boolean {
                return this._allAlertsOnOffEnabled;
            }
            set allAlertsOnOffEnabled(value: boolean) {
                this._allAlertsOnOffEnabled = value;
            }

            private _spendingLimitAlertsEnabled: boolean;
            get spendingLimitAlertsEnabled(): boolean {
                return this._spendingLimitAlertsEnabled;
            }
            set spendingLimitAlertsEnabled(value: boolean) {
                this._spendingLimitAlertsEnabled = value;
            }

            private _transactionAmountAlertEnabled: boolean;
            get transactionAmountAlertEnabled(): boolean {
                return this._transactionAmountAlertEnabled;
            }
            set transactionAmountAlertEnabled(value: boolean) {
                this._transactionAmountAlertEnabled = value;
            }

            private _monthlyTransactionAmountAlertEnabled: boolean;
            get monthlyTransactionAmountAlertEnabled(): boolean {
                return this._monthlyTransactionAmountAlertEnabled;
            }
            set monthlyTransactionAmountAlertEnabled(value: boolean) {
                this._monthlyTransactionAmountAlertEnabled = value;
            }

            private _alertsDeliveryTransactionAmountAlertEnabled: boolean;
            get alertsDeliveryTransactionAmountAlertEnabled(): boolean {
                return this._alertsDeliveryTransactionAmountAlertEnabled;
            }
            set alertsDeliveryTransactionAmountAlertEnabled(value: boolean) {
                this._alertsDeliveryTransactionAmountAlertEnabled = value;
            }

            private _alertsDeliveryAnyTransactionAlertEnabled: boolean;
            get alertsDeliveryAnyTransactionAlertEnabled(): boolean {
                return this._alertsDeliveryAnyTransactionAlertEnabled;
            }
            set alertsDeliveryAnyTransactionAlertEnabled(value: boolean) {
                this._alertsDeliveryAnyTransactionAlertEnabled = value;
            }

            private _alertsDeliveryShouldUseMessageText: boolean;
            get alertsDeliveryShouldUseMessageText(): boolean {
                return this._alertsDeliveryShouldUseMessageText;
            }
            set alertsDeliveryShouldUseMessageText(value: boolean) {
                this._alertsDeliveryShouldUseMessageText = value;
            }

            private _alertsDeliveryMonthlySpendingAlertEnabled: boolean;
            get alertsDeliveryMonthlySpendingAlertEnabled(): boolean {
                return this._alertsDeliveryMonthlySpendingAlertEnabled;
            }
            set alertsDeliveryMonthlySpendingAlertEnabled(value: boolean) {
                this._alertsDeliveryMonthlySpendingAlertEnabled = value;
            }

            private _replaceCardEnabled: boolean;
            get replaceCardEnabled(): boolean {
                return this._replaceCardEnabled;
            }
            set replaceCardEnabled(value: boolean) {
                this._replaceCardEnabled = value;
            }

            private _symitarDebitCardTypeIds: string;
            get symitarDebitCardTypeIds(): string {
                return this._symitarDebitCardTypeIds;
            }
            set symitarDebitCardTypeIds(value: string) {
                this._symitarDebitCardTypeIds = value;
            }

            private _atmCashWithdrawalLimitEnabled: boolean;
            get atmCashWithdrawalLimitEnabled(): boolean {
                return this._atmCashWithdrawalLimitEnabled;
            }
            set atmCashWithdrawalLimitEnabled(value: boolean) {
                this._atmCashWithdrawalLimitEnabled = value;
            }

            private _atmCashWithdrawalMaximumAmount: number;
            get atmCashWithdrawalMaximumAmount(): number {
                return this._atmCashWithdrawalMaximumAmount;
            }
            set atmCashWithdrawalMaximumAmount(value: number) {
                this._atmCashWithdrawalMaximumAmount = value;
            }

            private _atmCashWithdrawalLimitFeeAmount: number;
            get atmCashWithdrawalLimitFeeAmount(): number {
                return this._atmCashWithdrawalLimitFeeAmount;
            }
            set atmCashWithdrawalLimitFeeAmount(value: number) {
                this._atmCashWithdrawalLimitFeeAmount = value;
            }

            private _requestTypesRequiringCredentials: string[];
            get requestTypesRequiringCredentials(): string[] {
                return this._requestTypesRequiringCredentials;
            }
            set requestTypesRequiringCredentials(value: string[]) {
                this._requestTypesRequiringCredentials = value;
            }

            private _sendAmountAsDollars: boolean;
            get sendAmountAsDollars(): boolean {
                return this._sendAmountAsDollars;
            }
            set sendAmountAsDollars(value: boolean) {
                this._sendAmountAsDollars = value;
            }

            private _shouldShowMemberNameFromCardRecord: boolean;
            get shouldShowMemberNameFromCardRecord(): boolean {
                return this._shouldShowMemberNameFromCardRecord;
            }
            set shouldShowMemberNameFromCardRecord(value: boolean) {
                this._shouldShowMemberNameFromCardRecord = value;
            }

            private _useCardNumberToDeriveSubscriptionAlerts: boolean;
            get useCardNumberToDeriveSubscriptionAlerts(): boolean {
                return this._useCardNumberToDeriveSubscriptionAlerts;
            }
            set useCardNumberToDeriveSubscriptionAlerts(value: boolean) {
                this._useCardNumberToDeriveSubscriptionAlerts = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "CardControl.OndotDxSettings", value: this._ondotDxSettings, dataType: 'ondotdxsettings', label: "Ondot Dx Settings" },
                { key: "CardControl.OnDotSdk", value: this._onDotSdk, dataType: 'ondotsdksettings', label: "On Dot Sdk" },
                { key: "CardControl.Locations", value: this._locations, dataType: 'cardcontrollocations', label: "Locations" },
                { key: "CardControl.CreditCard", value: this._creditCard, dataType: 'creditcardsettings', label: "Credit Card" },
                { key: "CardControl.DebitCard", value: this._debitCard, dataType: 'debitcardsettings', label: "Debit Card" },
                { key: "CardControl.LostOrStolenCard", value: this._lostOrStolenCard, dataType: 'lostorstolencardsettings', label: "Lost Or Stolen Card" },
                { key: "CardControl.MinimumVersion", value: this._minimumVersion, dataType: 'string', label: "Minimum Version" },
                { key: "CardControl.MinimumAndroidVersion", value: this._minimumAndroidVersion, dataType: 'string', label: "Minimum Android Version" },
                { key: "CardControl.MinimumIosVersion", value: this._minimumIosVersion, dataType: 'string', label: "Minimum Ios Version" },
                { key: "CardControl.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "CardControl.SpendingLimitsEnabled", value: this._spendingLimitsEnabled, dataType: 'boolean', label: "Spending Limits Enabled" },
                { key: "CardControl.TransactionTypesEnabled", value: this._transactionTypesEnabled, dataType: 'boolean', label: "Transaction Types Enabled" },
                { key: "CardControl.ManagePermissionsEnabled", value: this._managePermissionsEnabled, dataType: 'boolean', label: "Manage Permissions Enabled" },
                { key: "CardControl.UserDeviceSetupEnabled", value: this._userDeviceSetupEnabled, dataType: 'boolean', label: "User Device Setup Enabled" },
                { key: "CardControl.AlertPreferencesEnabled", value: this._alertPreferencesEnabled, dataType: 'boolean', label: "Alert Preferences Enabled" },
                { key: "CardControl.MerchantTypesEnabled", value: this._merchantTypesEnabled, dataType: 'boolean', label: "Merchant Types Enabled" },
                { key: "CardControl.CardOffFixedTimeEnabled", value: this._cardOffFixedTimeEnabled, dataType: 'boolean', label: "Card Off Fixed Time Enabled" },
                { key: "CardControl.CardOffUserDefinedTimeEnabled", value: this._cardOffUserDefinedTimeEnabled, dataType: 'boolean', label: "Card Off User Defined Time Enabled" },
                { key: "CardControl.LargeTransactionControlEnabled", value: this._largeTransactionControlEnabled, dataType: 'boolean', label: "Large Transaction Control Enabled" },
                { key: "CardControl.InternationalTransactionControlEnabled", value: this._internationalTransactionControlEnabled, dataType: 'boolean', label: "International Transaction Control Enabled" },
                { key: "CardControl.MerchantStateListControlEnabled", value: this._merchantStateListControlEnabled, dataType: 'boolean', label: "Merchant State List Control Enabled" },
                { key: "CardControl.InternetTransactionControlEnabled", value: this._internetTransactionControlEnabled, dataType: 'boolean', label: "Internet Transaction Control Enabled" },
                { key: "CardControl.TimeOfDayRangeControlEnabled", value: this._timeOfDayRangeControlEnabled, dataType: 'boolean', label: "Time Of Day Range Control Enabled" },
                { key: "CardControl.ActiveCardStateCommonCode", value: this._activeCardStateCommonCode, dataType: 'string', label: "Active Card State Common Code" },
                { key: "CardControl.ClosedCardStateCommonCode", value: this._closedCardStateCommonCode, dataType: 'string', label: "Closed Card State Common Code" },
                { key: "CardControl.RestrictedCardStateCommonCode", value: this._restrictedCardStateCommonCode, dataType: 'string', label: "Restricted Card State Common Code" },
                { key: "CardControl.CardControlTypeIdentifierByCategory", value: this._cardControlTypeIdentifierByCategory, dataType: 'array<CardControlTypeIdentifierByCategorySetting>', label: "Card Control Type Identifier By Category" },
                { key: "CardControl.Vendor", value: this._vendor, dataType: 'cardcontrolvendor', label: "Vendor" },
                { key: "CardControl.DebitCardVendor", value: this._debitCardVendor, dataType: 'cardcontrolvendor', label: "Debit Card Vendor" },
                { key: "CardControl.CreditCardVendor", value: this._creditCardVendor, dataType: 'cardcontrolvendor', label: "Credit Card Vendor" },
                { key: "CardControl.DeleteClosedCards", value: this._deleteClosedCards, dataType: 'boolean', label: "Delete Closed Cards" },
                { key: "CardControl.AddPendingCards", value: this._addPendingCards, dataType: 'boolean', label: "Add Pending Cards" },
                { key: "CardControl.HideCardNicknames", value: this._hideCardNicknames, dataType: 'boolean', label: "Hide Card Nicknames" },
                { key: "CardControl.PscuClientID", value: this._pscuClientID, dataType: 'number', label: "Pscu Client I D" },
                { key: "CardControl.CorelationLockReasonSerial", value: this._corelationLockReasonSerial, dataType: 'string', label: "Corelation Lock Reason Serial" },
                { key: "CardControl.Authentication", value: this._authentication, dataType: 'authentication.authentication', label: "Authentication" },
                { key: "CardControl.IgnoreReferenceIds", value: this._ignoreReferenceIds, dataType: 'boolean', label: "Ignore Reference Ids" },
                { key: "CardControl.HashKey", value: this._hashKey, dataType: 'string', label: "Hash Key" },
                { key: "CardControl.ShowRegisterCardOption", value: this._showRegisterCardOption, dataType: 'boolean', label: "Show Register Card Option" },
                { key: "CardControl.ConnectNativeEnabled", value: this._connectNativeEnabled, dataType: 'boolean', label: "Connect Native Enabled" },
                { key: "CardControl.MemberControlOfAlertsEnabled", value: this._memberControlOfAlertsEnabled, dataType: 'boolean', label: "Member Control Of Alerts Enabled" },
                { key: "CardControl.AllAlertsOnOffEnabled", value: this._allAlertsOnOffEnabled, dataType: 'boolean', label: "All Alerts On Off Enabled" },
                { key: "CardControl.SpendingLimitAlertsEnabled", value: this._spendingLimitAlertsEnabled, dataType: 'boolean', label: "Spending Limit Alerts Enabled" },
                { key: "CardControl.TransactionAmountAlertEnabled", value: this._transactionAmountAlertEnabled, dataType: 'boolean', label: "Transaction Amount Alert Enabled" },
                { key: "CardControl.MonthlyTransactionAmountAlertEnabled", value: this._monthlyTransactionAmountAlertEnabled, dataType: 'boolean', label: "Monthly Transaction Amount Alert Enabled" },
                { key: "CardControl.AlertsDeliveryTransactionAmountAlertEnabled", value: this._alertsDeliveryTransactionAmountAlertEnabled, dataType: 'boolean', label: "Alerts Delivery Transaction Amount Alert Enabled" },
                { key: "CardControl.AlertsDeliveryAnyTransactionAlertEnabled", value: this._alertsDeliveryAnyTransactionAlertEnabled, dataType: 'boolean', label: "Alerts Delivery Any Transaction Alert Enabled" },
                { key: "CardControl.AlertsDeliveryShouldUseMessageText", value: this._alertsDeliveryShouldUseMessageText, dataType: 'boolean', label: "Alerts Delivery Should Use Message Text" },
                { key: "CardControl.AlertsDeliveryMonthlySpendingAlertEnabled", value: this._alertsDeliveryMonthlySpendingAlertEnabled, dataType: 'boolean', label: "Alerts Delivery Monthly Spending Alert Enabled" },
                { key: "CardControl.ReplaceCardEnabled", value: this._replaceCardEnabled, dataType: 'boolean', label: "Replace Card Enabled" },
                { key: "CardControl.SymitarDebitCardTypeIds", value: this._symitarDebitCardTypeIds, dataType: 'string', label: "Symitar Debit Card Type Ids" },
                { key: "CardControl.AtmCashWithdrawalLimitEnabled", value: this._atmCashWithdrawalLimitEnabled, dataType: 'boolean', label: "Atm Cash Withdrawal Limit Enabled" },
                { key: "CardControl.AtmCashWithdrawalMaximumAmount", value: this._atmCashWithdrawalMaximumAmount, dataType: 'number', label: "Atm Cash Withdrawal Maximum Amount" },
                { key: "CardControl.AtmCashWithdrawalLimitFeeAmount", value: this._atmCashWithdrawalLimitFeeAmount, dataType: 'number', label: "Atm Cash Withdrawal Limit Fee Amount" },
                { key: "CardControl.RequestTypesRequiringCredentials", value: this._requestTypesRequiringCredentials, dataType: 'list<string>', label: "Request Types Requiring Credentials" },
                { key: "CardControl.SendAmountAsDollars", value: this._sendAmountAsDollars, dataType: 'boolean', label: "Send Amount As Dollars" },
                { key: "CardControl.ShouldShowMemberNameFromCardRecord", value: this._shouldShowMemberNameFromCardRecord, dataType: 'boolean', label: "Should Show Member Name From Card Record" },
                { key: "CardControl.UseCardNumberToDeriveSubscriptionAlerts", value: this._useCardNumberToDeriveSubscriptionAlerts, dataType: 'boolean', label: "Use Card Number To Derive Subscription Alerts" },
            ];
        }

}