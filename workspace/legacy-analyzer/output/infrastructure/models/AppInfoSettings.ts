import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { CreditCardSsoProvider } from './CreditCardSsoProvider';
export interface AppInfoSettingsConfig {
    Alerts2Enabled: boolean;
    AllowJoint2JointTransfer: boolean;
    AllowJoint2JointScheduledTrans: boolean;
    BusinessBankingEnabled: boolean;
    CashAdvanceFromCreditCardsEnabled: boolean;
    CDRolloverEnabled: boolean;
    CreditKarmaEnabled: boolean;
    DashboardEnabled: boolean;
    DebitCardOverDraftEnabled: boolean;
    DisableCheckWithdraw: boolean;
    DisableStopPayments: boolean;
    EAlertsMenuItemEnabled: boolean;
    EnableCancelBillPaySM: boolean;
    EnableCDDistributionScreen: boolean;
    EnableCDPurchaseScreen: boolean;
    EnableCheckCopy: boolean;
    EnableCheckReorder: boolean;
    EnableCreditCardMenuOption: boolean;
    EnableCrossAccountScreen: boolean;
    EnableInfoLinkIFrame: boolean;
    EnableNewSubaccountScreen: boolean;
    EnableODProtectionScreen: boolean;
    EnableUserTransferDescription: boolean;
    EnableTravelNotification: boolean;
    EnableWireTransferScreen: boolean;
    ForceLoginByAccountAlias: boolean;
    gbCheckImages: boolean;
    gbScheduledTransfers: boolean;
    HideAddressLineThreeOnChangeAddressControl: boolean;
    HouseholdingCreditCardSSO: boolean;
    HouseholdingEnabled: boolean;
    IsBalanceTransferSecMsgEnabled: boolean;
    LoansUseExternalLink: boolean;
    MoneyDeskTopEnabled: boolean;
    SchedTransAchShowFeeDropDown: boolean;
    ShowLostStolenCC: boolean;
    TransferMonthlyPattern: boolean;
    PopEstatementsNewWindowiPad: boolean;
    PSCUInfoLinkOnMain: boolean;
    RemoteCapture: boolean;
    RewardsNowEnabled: boolean;
    ShowAddJointOwner: boolean;
    DisclosureAcceptanceFromDB: boolean;
    ShowChangePin: boolean;
    ShowDYOC: boolean;
    ShowEstatementCopyMenuItem: boolean;
    ShowInvestOnline: boolean;
    ShowIRADistributions: boolean;
    ShowLinkedAccounts: boolean;
    ShowLinkedAchAccounts: boolean;
    ShowMemberDiscounts: boolean;
    ShowPrepaidVisa: boolean;
    ShowVisaGiftCard: boolean;
    UserNSFDisclosure: boolean;
    UsePreviousMicrNumber: boolean;
    BusinessCheckReorderURL: string;
    CashAdvanceFromCreditCardsAdvanceFeePercentage: string;
    CashAdvanceFromCreditCardsMinimumTransactionCost: string;
    CreditCardExternalLink: string;
    CreditKarmaJointOwner: string;
    gbBillPayType: string;
    gsEstatmentType: string;
    giTransMaxDaily: string;
    giTransMaxMonthly: string;
    giTransMaxWeekly: string;
    giTransMaxYearly: string;
    giMaxHistoryCount: string;
    IntraBankRoutingNumber: string;
    LinkedACHMethod: string;
    TermsLinkURL: string;
    PWDEncryptionKey: string;
    BillPayAccounts: string;
    MICRNumberFirstFourDigits: string;
    MobileBillPayProvider: string;
    obsShareRestrictedInquire: string;
    obsCheckingAccounts: string;
    CreditCardHistoryProvider: string;
    InstitutionDisplayName: string;
    ScheduledTransfersStartTime: string;
    ScheduledTransfersStartSpan: string;
    SchedTransDefaultStartTime: string;
    SchedTransLinkedAchStartTime: string;
    MICRNumberLength: number;
    CreditCardSSOType: CreditCardSsoProvider;
    HouseholdingPermissionSource: string;
    CreditCardSsoDisplayType: string;
    FISScoreCardDisplayType: string;
}

export class AppInfoSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'AppInfoSettings'
    };


            private _alerts2Enabled: boolean;
            get alerts2Enabled(): boolean {
                return this._alerts2Enabled;
            }
            set alerts2Enabled(value: boolean) {
                this._alerts2Enabled = value;
            }

            private _allowJoint2JointTransfer: boolean;
            get allowJoint2JointTransfer(): boolean {
                return this._allowJoint2JointTransfer;
            }
            set allowJoint2JointTransfer(value: boolean) {
                this._allowJoint2JointTransfer = value;
            }

            private _allowJoint2JointScheduledTrans: boolean;
            get allowJoint2JointScheduledTrans(): boolean {
                return this._allowJoint2JointScheduledTrans;
            }
            set allowJoint2JointScheduledTrans(value: boolean) {
                this._allowJoint2JointScheduledTrans = value;
            }

            private _businessBankingEnabled: boolean;
            get businessBankingEnabled(): boolean {
                return this._businessBankingEnabled;
            }
            set businessBankingEnabled(value: boolean) {
                this._businessBankingEnabled = value;
            }

            private _cashAdvanceFromCreditCardsEnabled: boolean;
            get cashAdvanceFromCreditCardsEnabled(): boolean {
                return this._cashAdvanceFromCreditCardsEnabled;
            }
            set cashAdvanceFromCreditCardsEnabled(value: boolean) {
                this._cashAdvanceFromCreditCardsEnabled = value;
            }

            private _cDRolloverEnabled: boolean;
            get cDRolloverEnabled(): boolean {
                return this._cDRolloverEnabled;
            }
            set cDRolloverEnabled(value: boolean) {
                this._cDRolloverEnabled = value;
            }

            private _creditKarmaEnabled: boolean;
            get creditKarmaEnabled(): boolean {
                return this._creditKarmaEnabled;
            }
            set creditKarmaEnabled(value: boolean) {
                this._creditKarmaEnabled = value;
            }

            private _dashboardEnabled: boolean;
            get dashboardEnabled(): boolean {
                return this._dashboardEnabled;
            }
            set dashboardEnabled(value: boolean) {
                this._dashboardEnabled = value;
            }

            private _debitCardOverDraftEnabled: boolean;
            get debitCardOverDraftEnabled(): boolean {
                return this._debitCardOverDraftEnabled;
            }
            set debitCardOverDraftEnabled(value: boolean) {
                this._debitCardOverDraftEnabled = value;
            }

            private _disableCheckWithdraw: boolean;
            get disableCheckWithdraw(): boolean {
                return this._disableCheckWithdraw;
            }
            set disableCheckWithdraw(value: boolean) {
                this._disableCheckWithdraw = value;
            }

            private _disableStopPayments: boolean;
            get disableStopPayments(): boolean {
                return this._disableStopPayments;
            }
            set disableStopPayments(value: boolean) {
                this._disableStopPayments = value;
            }

            private _eAlertsMenuItemEnabled: boolean;
            get eAlertsMenuItemEnabled(): boolean {
                return this._eAlertsMenuItemEnabled;
            }
            set eAlertsMenuItemEnabled(value: boolean) {
                this._eAlertsMenuItemEnabled = value;
            }

            private _enableCancelBillPaySM: boolean;
            get enableCancelBillPaySM(): boolean {
                return this._enableCancelBillPaySM;
            }
            set enableCancelBillPaySM(value: boolean) {
                this._enableCancelBillPaySM = value;
            }

            private _enableCDDistributionScreen: boolean;
            get enableCDDistributionScreen(): boolean {
                return this._enableCDDistributionScreen;
            }
            set enableCDDistributionScreen(value: boolean) {
                this._enableCDDistributionScreen = value;
            }

            private _enableCDPurchaseScreen: boolean;
            get enableCDPurchaseScreen(): boolean {
                return this._enableCDPurchaseScreen;
            }
            set enableCDPurchaseScreen(value: boolean) {
                this._enableCDPurchaseScreen = value;
            }

            private _enableCheckCopy: boolean;
            get enableCheckCopy(): boolean {
                return this._enableCheckCopy;
            }
            set enableCheckCopy(value: boolean) {
                this._enableCheckCopy = value;
            }

            private _enableCheckReorder: boolean;
            get enableCheckReorder(): boolean {
                return this._enableCheckReorder;
            }
            set enableCheckReorder(value: boolean) {
                this._enableCheckReorder = value;
            }

            private _enableCreditCardMenuOption: boolean;
            get enableCreditCardMenuOption(): boolean {
                return this._enableCreditCardMenuOption;
            }
            set enableCreditCardMenuOption(value: boolean) {
                this._enableCreditCardMenuOption = value;
            }

            private _enableCrossAccountScreen: boolean;
            get enableCrossAccountScreen(): boolean {
                return this._enableCrossAccountScreen;
            }
            set enableCrossAccountScreen(value: boolean) {
                this._enableCrossAccountScreen = value;
            }

            private _enableInfoLinkIFrame: boolean;
            get enableInfoLinkIFrame(): boolean {
                return this._enableInfoLinkIFrame;
            }
            set enableInfoLinkIFrame(value: boolean) {
                this._enableInfoLinkIFrame = value;
            }

            private _enableNewSubaccountScreen: boolean;
            get enableNewSubaccountScreen(): boolean {
                return this._enableNewSubaccountScreen;
            }
            set enableNewSubaccountScreen(value: boolean) {
                this._enableNewSubaccountScreen = value;
            }

            private _enableODProtectionScreen: boolean;
            get enableODProtectionScreen(): boolean {
                return this._enableODProtectionScreen;
            }
            set enableODProtectionScreen(value: boolean) {
                this._enableODProtectionScreen = value;
            }

            private _enableUserTransferDescription: boolean;
            get enableUserTransferDescription(): boolean {
                return this._enableUserTransferDescription;
            }
            set enableUserTransferDescription(value: boolean) {
                this._enableUserTransferDescription = value;
            }

            private _enableTravelNotification: boolean;
            get enableTravelNotification(): boolean {
                return this._enableTravelNotification;
            }
            set enableTravelNotification(value: boolean) {
                this._enableTravelNotification = value;
            }

            private _enableWireTransferScreen: boolean;
            get enableWireTransferScreen(): boolean {
                return this._enableWireTransferScreen;
            }
            set enableWireTransferScreen(value: boolean) {
                this._enableWireTransferScreen = value;
            }

            private _forceLoginByAccountAlias: boolean;
            get forceLoginByAccountAlias(): boolean {
                return this._forceLoginByAccountAlias;
            }
            set forceLoginByAccountAlias(value: boolean) {
                this._forceLoginByAccountAlias = value;
            }

            private _gbCheckImages: boolean;
            get gbCheckImages(): boolean {
                return this._gbCheckImages;
            }
            set gbCheckImages(value: boolean) {
                this._gbCheckImages = value;
            }

            private _gbScheduledTransfers: boolean;
            get gbScheduledTransfers(): boolean {
                return this._gbScheduledTransfers;
            }
            set gbScheduledTransfers(value: boolean) {
                this._gbScheduledTransfers = value;
            }

            private _hideAddressLineThreeOnChangeAddressControl: boolean;
            get hideAddressLineThreeOnChangeAddressControl(): boolean {
                return this._hideAddressLineThreeOnChangeAddressControl;
            }
            set hideAddressLineThreeOnChangeAddressControl(value: boolean) {
                this._hideAddressLineThreeOnChangeAddressControl = value;
            }

            private _householdingCreditCardSSO: boolean;
            get householdingCreditCardSSO(): boolean {
                return this._householdingCreditCardSSO;
            }
            set householdingCreditCardSSO(value: boolean) {
                this._householdingCreditCardSSO = value;
            }

            private _householdingEnabled: boolean;
            get householdingEnabled(): boolean {
                return this._householdingEnabled;
            }
            set householdingEnabled(value: boolean) {
                this._householdingEnabled = value;
            }

            private _isBalanceTransferSecMsgEnabled: boolean;
            get isBalanceTransferSecMsgEnabled(): boolean {
                return this._isBalanceTransferSecMsgEnabled;
            }
            set isBalanceTransferSecMsgEnabled(value: boolean) {
                this._isBalanceTransferSecMsgEnabled = value;
            }

            private _loansUseExternalLink: boolean;
            get loansUseExternalLink(): boolean {
                return this._loansUseExternalLink;
            }
            set loansUseExternalLink(value: boolean) {
                this._loansUseExternalLink = value;
            }

            private _moneyDeskTopEnabled: boolean;
            get moneyDeskTopEnabled(): boolean {
                return this._moneyDeskTopEnabled;
            }
            set moneyDeskTopEnabled(value: boolean) {
                this._moneyDeskTopEnabled = value;
            }

            private _schedTransAchShowFeeDropDown: boolean;
            get schedTransAchShowFeeDropDown(): boolean {
                return this._schedTransAchShowFeeDropDown;
            }
            set schedTransAchShowFeeDropDown(value: boolean) {
                this._schedTransAchShowFeeDropDown = value;
            }

            private _showLostStolenCC: boolean;
            get showLostStolenCC(): boolean {
                return this._showLostStolenCC;
            }
            set showLostStolenCC(value: boolean) {
                this._showLostStolenCC = value;
            }

            private _transferMonthlyPattern: boolean;
            get transferMonthlyPattern(): boolean {
                return this._transferMonthlyPattern;
            }
            set transferMonthlyPattern(value: boolean) {
                this._transferMonthlyPattern = value;
            }

            private _popEstatementsNewWindowiPad: boolean;
            get popEstatementsNewWindowiPad(): boolean {
                return this._popEstatementsNewWindowiPad;
            }
            set popEstatementsNewWindowiPad(value: boolean) {
                this._popEstatementsNewWindowiPad = value;
            }

            private _pSCUInfoLinkOnMain: boolean;
            get pSCUInfoLinkOnMain(): boolean {
                return this._pSCUInfoLinkOnMain;
            }
            set pSCUInfoLinkOnMain(value: boolean) {
                this._pSCUInfoLinkOnMain = value;
            }

            private _remoteCapture: boolean;
            get remoteCapture(): boolean {
                return this._remoteCapture;
            }
            set remoteCapture(value: boolean) {
                this._remoteCapture = value;
            }

            private _rewardsNowEnabled: boolean;
            get rewardsNowEnabled(): boolean {
                return this._rewardsNowEnabled;
            }
            set rewardsNowEnabled(value: boolean) {
                this._rewardsNowEnabled = value;
            }

            private _showAddJointOwner: boolean;
            get showAddJointOwner(): boolean {
                return this._showAddJointOwner;
            }
            set showAddJointOwner(value: boolean) {
                this._showAddJointOwner = value;
            }

            private _disclosureAcceptanceFromDB: boolean;
            get disclosureAcceptanceFromDB(): boolean {
                return this._disclosureAcceptanceFromDB;
            }
            set disclosureAcceptanceFromDB(value: boolean) {
                this._disclosureAcceptanceFromDB = value;
            }

            private _showChangePin: boolean;
            get showChangePin(): boolean {
                return this._showChangePin;
            }
            set showChangePin(value: boolean) {
                this._showChangePin = value;
            }

            private _showDYOC: boolean;
            get showDYOC(): boolean {
                return this._showDYOC;
            }
            set showDYOC(value: boolean) {
                this._showDYOC = value;
            }

            private _showEstatementCopyMenuItem: boolean;
            get showEstatementCopyMenuItem(): boolean {
                return this._showEstatementCopyMenuItem;
            }
            set showEstatementCopyMenuItem(value: boolean) {
                this._showEstatementCopyMenuItem = value;
            }

            private _showInvestOnline: boolean;
            get showInvestOnline(): boolean {
                return this._showInvestOnline;
            }
            set showInvestOnline(value: boolean) {
                this._showInvestOnline = value;
            }

            private _showIRADistributions: boolean;
            get showIRADistributions(): boolean {
                return this._showIRADistributions;
            }
            set showIRADistributions(value: boolean) {
                this._showIRADistributions = value;
            }

            private _showLinkedAccounts: boolean;
            get showLinkedAccounts(): boolean {
                return this._showLinkedAccounts;
            }
            set showLinkedAccounts(value: boolean) {
                this._showLinkedAccounts = value;
            }

            private _showLinkedAchAccounts: boolean;
            get showLinkedAchAccounts(): boolean {
                return this._showLinkedAchAccounts;
            }
            set showLinkedAchAccounts(value: boolean) {
                this._showLinkedAchAccounts = value;
            }

            private _showMemberDiscounts: boolean;
            get showMemberDiscounts(): boolean {
                return this._showMemberDiscounts;
            }
            set showMemberDiscounts(value: boolean) {
                this._showMemberDiscounts = value;
            }

            private _showPrepaidVisa: boolean;
            get showPrepaidVisa(): boolean {
                return this._showPrepaidVisa;
            }
            set showPrepaidVisa(value: boolean) {
                this._showPrepaidVisa = value;
            }

            private _showVisaGiftCard: boolean;
            get showVisaGiftCard(): boolean {
                return this._showVisaGiftCard;
            }
            set showVisaGiftCard(value: boolean) {
                this._showVisaGiftCard = value;
            }

            private _userNSFDisclosure: boolean;
            get userNSFDisclosure(): boolean {
                return this._userNSFDisclosure;
            }
            set userNSFDisclosure(value: boolean) {
                this._userNSFDisclosure = value;
            }

            private _usePreviousMicrNumber: boolean;
            get usePreviousMicrNumber(): boolean {
                return this._usePreviousMicrNumber;
            }
            set usePreviousMicrNumber(value: boolean) {
                this._usePreviousMicrNumber = value;
            }

            private _businessCheckReorderURL: string;
            get businessCheckReorderURL(): string {
                return this._businessCheckReorderURL;
            }
            set businessCheckReorderURL(value: string) {
                this._businessCheckReorderURL = value;
            }

            private _cashAdvanceFromCreditCardsAdvanceFeePercentage: string;
            get cashAdvanceFromCreditCardsAdvanceFeePercentage(): string {
                return this._cashAdvanceFromCreditCardsAdvanceFeePercentage;
            }
            set cashAdvanceFromCreditCardsAdvanceFeePercentage(value: string) {
                this._cashAdvanceFromCreditCardsAdvanceFeePercentage = value;
            }

            private _cashAdvanceFromCreditCardsMinimumTransactionCost: string;
            get cashAdvanceFromCreditCardsMinimumTransactionCost(): string {
                return this._cashAdvanceFromCreditCardsMinimumTransactionCost;
            }
            set cashAdvanceFromCreditCardsMinimumTransactionCost(value: string) {
                this._cashAdvanceFromCreditCardsMinimumTransactionCost = value;
            }

            private _creditCardExternalLink: string;
            get creditCardExternalLink(): string {
                return this._creditCardExternalLink;
            }
            set creditCardExternalLink(value: string) {
                this._creditCardExternalLink = value;
            }

            private _creditKarmaJointOwner: string;
            get creditKarmaJointOwner(): string {
                return this._creditKarmaJointOwner;
            }
            set creditKarmaJointOwner(value: string) {
                this._creditKarmaJointOwner = value;
            }

            private _gbBillPayType: string;
            get gbBillPayType(): string {
                return this._gbBillPayType;
            }
            set gbBillPayType(value: string) {
                this._gbBillPayType = value;
            }

            private _gsEstatmentType: string;
            get gsEstatmentType(): string {
                return this._gsEstatmentType;
            }
            set gsEstatmentType(value: string) {
                this._gsEstatmentType = value;
            }

            private _giTransMaxDaily: string;
            get giTransMaxDaily(): string {
                return this._giTransMaxDaily;
            }
            set giTransMaxDaily(value: string) {
                this._giTransMaxDaily = value;
            }

            private _giTransMaxMonthly: string;
            get giTransMaxMonthly(): string {
                return this._giTransMaxMonthly;
            }
            set giTransMaxMonthly(value: string) {
                this._giTransMaxMonthly = value;
            }

            private _giTransMaxWeekly: string;
            get giTransMaxWeekly(): string {
                return this._giTransMaxWeekly;
            }
            set giTransMaxWeekly(value: string) {
                this._giTransMaxWeekly = value;
            }

            private _giTransMaxYearly: string;
            get giTransMaxYearly(): string {
                return this._giTransMaxYearly;
            }
            set giTransMaxYearly(value: string) {
                this._giTransMaxYearly = value;
            }

            private _giMaxHistoryCount: string;
            get giMaxHistoryCount(): string {
                return this._giMaxHistoryCount;
            }
            set giMaxHistoryCount(value: string) {
                this._giMaxHistoryCount = value;
            }

            private _intraBankRoutingNumber: string;
            get intraBankRoutingNumber(): string {
                return this._intraBankRoutingNumber;
            }
            set intraBankRoutingNumber(value: string) {
                this._intraBankRoutingNumber = value;
            }

            private _linkedACHMethod: string;
            get linkedACHMethod(): string {
                return this._linkedACHMethod;
            }
            set linkedACHMethod(value: string) {
                this._linkedACHMethod = value;
            }

            private _termsLinkURL: string;
            get termsLinkURL(): string {
                return this._termsLinkURL;
            }
            set termsLinkURL(value: string) {
                this._termsLinkURL = value;
            }

            private _pWDEncryptionKey: string;
            get pWDEncryptionKey(): string {
                return this._pWDEncryptionKey;
            }
            set pWDEncryptionKey(value: string) {
                this._pWDEncryptionKey = value;
            }

            private _billPayAccounts: string;
            get billPayAccounts(): string {
                return this._billPayAccounts;
            }
            set billPayAccounts(value: string) {
                this._billPayAccounts = value;
            }

            private _mICRNumberFirstFourDigits: string;
            get mICRNumberFirstFourDigits(): string {
                return this._mICRNumberFirstFourDigits;
            }
            set mICRNumberFirstFourDigits(value: string) {
                this._mICRNumberFirstFourDigits = value;
            }

            private _mobileBillPayProvider: string;
            get mobileBillPayProvider(): string {
                return this._mobileBillPayProvider;
            }
            set mobileBillPayProvider(value: string) {
                this._mobileBillPayProvider = value;
            }

            private _obsShareRestrictedInquire: string;
            get obsShareRestrictedInquire(): string {
                return this._obsShareRestrictedInquire;
            }
            set obsShareRestrictedInquire(value: string) {
                this._obsShareRestrictedInquire = value;
            }

            private _obsCheckingAccounts: string;
            get obsCheckingAccounts(): string {
                return this._obsCheckingAccounts;
            }
            set obsCheckingAccounts(value: string) {
                this._obsCheckingAccounts = value;
            }

            private _creditCardHistoryProvider: string;
            get creditCardHistoryProvider(): string {
                return this._creditCardHistoryProvider;
            }
            set creditCardHistoryProvider(value: string) {
                this._creditCardHistoryProvider = value;
            }

            private _institutionDisplayName: string;
            get institutionDisplayName(): string {
                return this._institutionDisplayName;
            }
            set institutionDisplayName(value: string) {
                this._institutionDisplayName = value;
            }

            private _scheduledTransfersStartTime: string;
            get scheduledTransfersStartTime(): string {
                return this._scheduledTransfersStartTime;
            }
            set scheduledTransfersStartTime(value: string) {
                this._scheduledTransfersStartTime = value;
            }

            private _scheduledTransfersStartSpan: string;
            get scheduledTransfersStartSpan(): string {
                return this._scheduledTransfersStartSpan;
            }
            set scheduledTransfersStartSpan(value: string) {
                this._scheduledTransfersStartSpan = value;
            }

            private _schedTransDefaultStartTime: string;
            get schedTransDefaultStartTime(): string {
                return this._schedTransDefaultStartTime;
            }
            set schedTransDefaultStartTime(value: string) {
                this._schedTransDefaultStartTime = value;
            }

            private _schedTransLinkedAchStartTime: string;
            get schedTransLinkedAchStartTime(): string {
                return this._schedTransLinkedAchStartTime;
            }
            set schedTransLinkedAchStartTime(value: string) {
                this._schedTransLinkedAchStartTime = value;
            }

            private _mICRNumberLength: number;
            get mICRNumberLength(): number {
                return this._mICRNumberLength;
            }
            set mICRNumberLength(value: number) {
                this._mICRNumberLength = value;
            }

            private _creditCardSSOType: CreditCardSsoProvider;
            get creditCardSSOType(): CreditCardSsoProvider {
                return this._creditCardSSOType;
            }
            set creditCardSSOType(value: CreditCardSsoProvider) {
                this._creditCardSSOType = value;
            }

            private _householdingPermissionSource: string;
            get householdingPermissionSource(): string {
                return this._householdingPermissionSource;
            }
            set householdingPermissionSource(value: string) {
                this._householdingPermissionSource = value;
            }

            private _creditCardSsoDisplayType: string;
            get creditCardSsoDisplayType(): string {
                return this._creditCardSsoDisplayType;
            }
            set creditCardSsoDisplayType(value: string) {
                this._creditCardSsoDisplayType = value;
            }

            private _fISScoreCardDisplayType: string;
            get fISScoreCardDisplayType(): string {
                return this._fISScoreCardDisplayType;
            }
            set fISScoreCardDisplayType(value: string) {
                this._fISScoreCardDisplayType = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "AppInfoSettings.Alerts2Enabled", value: this._alerts2Enabled, dataType: 'boolean', label: "Alerts2 Enabled" },
                { key: "AppInfoSettings.AllowJoint2JointTransfer", value: this._allowJoint2JointTransfer, dataType: 'boolean', label: "Allow Joint2 Joint Transfer" },
                { key: "AppInfoSettings.AllowJoint2JointScheduledTrans", value: this._allowJoint2JointScheduledTrans, dataType: 'boolean', label: "Allow Joint2 Joint Scheduled Trans" },
                { key: "AppInfoSettings.BusinessBankingEnabled", value: this._businessBankingEnabled, dataType: 'boolean', label: "Business Banking Enabled" },
                { key: "AppInfoSettings.CashAdvanceFromCreditCardsEnabled", value: this._cashAdvanceFromCreditCardsEnabled, dataType: 'boolean', label: "Cash Advance From Credit Cards Enabled" },
                { key: "AppInfoSettings.CDRolloverEnabled", value: this._cDRolloverEnabled, dataType: 'boolean', label: "C D Rollover Enabled" },
                { key: "AppInfoSettings.CreditKarmaEnabled", value: this._creditKarmaEnabled, dataType: 'boolean', label: "Credit Karma Enabled" },
                { key: "AppInfoSettings.DashboardEnabled", value: this._dashboardEnabled, dataType: 'boolean', label: "Dashboard Enabled" },
                { key: "AppInfoSettings.DebitCardOverDraftEnabled", value: this._debitCardOverDraftEnabled, dataType: 'boolean', label: "Debit Card Over Draft Enabled" },
                { key: "AppInfoSettings.DisableCheckWithdraw", value: this._disableCheckWithdraw, dataType: 'boolean', label: "Disable Check Withdraw" },
                { key: "AppInfoSettings.DisableStopPayments", value: this._disableStopPayments, dataType: 'boolean', label: "Disable Stop Payments" },
                { key: "AppInfoSettings.EAlertsMenuItemEnabled", value: this._eAlertsMenuItemEnabled, dataType: 'boolean', label: "E Alerts Menu Item Enabled" },
                { key: "AppInfoSettings.EnableCancelBillPaySM", value: this._enableCancelBillPaySM, dataType: 'boolean', label: "Enable Cancel Bill Pay S M" },
                { key: "AppInfoSettings.EnableCDDistributionScreen", value: this._enableCDDistributionScreen, dataType: 'boolean', label: "Enable C D Distribution Screen" },
                { key: "AppInfoSettings.EnableCDPurchaseScreen", value: this._enableCDPurchaseScreen, dataType: 'boolean', label: "Enable C D Purchase Screen" },
                { key: "AppInfoSettings.EnableCheckCopy", value: this._enableCheckCopy, dataType: 'boolean', label: "Enable Check Copy" },
                { key: "AppInfoSettings.EnableCheckReorder", value: this._enableCheckReorder, dataType: 'boolean', label: "Enable Check Reorder" },
                { key: "AppInfoSettings.EnableCreditCardMenuOption", value: this._enableCreditCardMenuOption, dataType: 'boolean', label: "Enable Credit Card Menu Option" },
                { key: "AppInfoSettings.EnableCrossAccountScreen", value: this._enableCrossAccountScreen, dataType: 'boolean', label: "Enable Cross Account Screen" },
                { key: "AppInfoSettings.EnableInfoLinkIFrame", value: this._enableInfoLinkIFrame, dataType: 'boolean', label: "Enable Info Link I Frame" },
                { key: "AppInfoSettings.EnableNewSubaccountScreen", value: this._enableNewSubaccountScreen, dataType: 'boolean', label: "Enable New Subaccount Screen" },
                { key: "AppInfoSettings.EnableODProtectionScreen", value: this._enableODProtectionScreen, dataType: 'boolean', label: "Enable O D Protection Screen" },
                { key: "AppInfoSettings.EnableUserTransferDescription", value: this._enableUserTransferDescription, dataType: 'boolean', label: "Enable User Transfer Description" },
                { key: "AppInfoSettings.EnableTravelNotification", value: this._enableTravelNotification, dataType: 'boolean', label: "Enable Travel Notification" },
                { key: "AppInfoSettings.EnableWireTransferScreen", value: this._enableWireTransferScreen, dataType: 'boolean', label: "Enable Wire Transfer Screen" },
                { key: "AppInfoSettings.ForceLoginByAccountAlias", value: this._forceLoginByAccountAlias, dataType: 'boolean', label: "Force Login By Account Alias" },
                { key: "AppInfoSettings.gbCheckImages", value: this._gbCheckImages, dataType: 'boolean', label: "Gb Check Images" },
                { key: "AppInfoSettings.gbScheduledTransfers", value: this._gbScheduledTransfers, dataType: 'boolean', label: "Gb Scheduled Transfers" },
                { key: "AppInfoSettings.HideAddressLineThreeOnChangeAddressControl", value: this._hideAddressLineThreeOnChangeAddressControl, dataType: 'boolean', label: "Hide Address Line Three On Change Address Control" },
                { key: "AppInfoSettings.HouseholdingCreditCardSSO", value: this._householdingCreditCardSSO, dataType: 'boolean', label: "Householding Credit Card S S O" },
                { key: "AppInfoSettings.HouseholdingEnabled", value: this._householdingEnabled, dataType: 'boolean', label: "Householding Enabled" },
                { key: "AppInfoSettings.IsBalanceTransferSecMsgEnabled", value: this._isBalanceTransferSecMsgEnabled, dataType: 'boolean', label: "Is Balance Transfer Sec Msg Enabled" },
                { key: "AppInfoSettings.LoansUseExternalLink", value: this._loansUseExternalLink, dataType: 'boolean', label: "Loans Use External Link" },
                { key: "AppInfoSettings.MoneyDeskTopEnabled", value: this._moneyDeskTopEnabled, dataType: 'boolean', label: "Money Desk Top Enabled" },
                { key: "AppInfoSettings.SchedTransAchShowFeeDropDown", value: this._schedTransAchShowFeeDropDown, dataType: 'boolean', label: "Sched Trans Ach Show Fee Drop Down" },
                { key: "AppInfoSettings.ShowLostStolenCC", value: this._showLostStolenCC, dataType: 'boolean', label: "Show Lost Stolen C C" },
                { key: "AppInfoSettings.TransferMonthlyPattern", value: this._transferMonthlyPattern, dataType: 'boolean', label: "Transfer Monthly Pattern" },
                { key: "AppInfoSettings.PopEstatementsNewWindowiPad", value: this._popEstatementsNewWindowiPad, dataType: 'boolean', label: "Pop Estatements New Windowi Pad" },
                { key: "AppInfoSettings.PSCUInfoLinkOnMain", value: this._pSCUInfoLinkOnMain, dataType: 'boolean', label: "P S C U Info Link On Main" },
                { key: "AppInfoSettings.RemoteCapture", value: this._remoteCapture, dataType: 'boolean', label: "Remote Capture" },
                { key: "AppInfoSettings.RewardsNowEnabled", value: this._rewardsNowEnabled, dataType: 'boolean', label: "Rewards Now Enabled" },
                { key: "AppInfoSettings.ShowAddJointOwner", value: this._showAddJointOwner, dataType: 'boolean', label: "Show Add Joint Owner" },
                { key: "AppInfoSettings.DisclosureAcceptanceFromDB", value: this._disclosureAcceptanceFromDB, dataType: 'boolean', label: "Disclosure Acceptance From D B" },
                { key: "AppInfoSettings.ShowChangePin", value: this._showChangePin, dataType: 'boolean', label: "Show Change Pin" },
                { key: "AppInfoSettings.ShowDYOC", value: this._showDYOC, dataType: 'boolean', label: "Show D Y O C" },
                { key: "AppInfoSettings.ShowEstatementCopyMenuItem", value: this._showEstatementCopyMenuItem, dataType: 'boolean', label: "Show Estatement Copy Menu Item" },
                { key: "AppInfoSettings.ShowInvestOnline", value: this._showInvestOnline, dataType: 'boolean', label: "Show Invest Online" },
                { key: "AppInfoSettings.ShowIRADistributions", value: this._showIRADistributions, dataType: 'boolean', label: "Show I R A Distributions" },
                { key: "AppInfoSettings.ShowLinkedAccounts", value: this._showLinkedAccounts, dataType: 'boolean', label: "Show Linked Accounts" },
                { key: "AppInfoSettings.ShowLinkedAchAccounts", value: this._showLinkedAchAccounts, dataType: 'boolean', label: "Show Linked Ach Accounts" },
                { key: "AppInfoSettings.ShowMemberDiscounts", value: this._showMemberDiscounts, dataType: 'boolean', label: "Show Member Discounts" },
                { key: "AppInfoSettings.ShowPrepaidVisa", value: this._showPrepaidVisa, dataType: 'boolean', label: "Show Prepaid Visa" },
                { key: "AppInfoSettings.ShowVisaGiftCard", value: this._showVisaGiftCard, dataType: 'boolean', label: "Show Visa Gift Card" },
                { key: "AppInfoSettings.UserNSFDisclosure", value: this._userNSFDisclosure, dataType: 'boolean', label: "User N S F Disclosure" },
                { key: "AppInfoSettings.UsePreviousMicrNumber", value: this._usePreviousMicrNumber, dataType: 'boolean', label: "Use Previous Micr Number" },
                { key: "AppInfoSettings.BusinessCheckReorderURL", value: this._businessCheckReorderURL, dataType: 'string', label: "Business Check Reorder U R L" },
                { key: "AppInfoSettings.CashAdvanceFromCreditCardsAdvanceFeePercentage", value: this._cashAdvanceFromCreditCardsAdvanceFeePercentage, dataType: 'string', label: "Cash Advance From Credit Cards Advance Fee Percentage" },
                { key: "AppInfoSettings.CashAdvanceFromCreditCardsMinimumTransactionCost", value: this._cashAdvanceFromCreditCardsMinimumTransactionCost, dataType: 'string', label: "Cash Advance From Credit Cards Minimum Transaction Cost" },
                { key: "AppInfoSettings.CreditCardExternalLink", value: this._creditCardExternalLink, dataType: 'string', label: "Credit Card External Link" },
                { key: "AppInfoSettings.CreditKarmaJointOwner", value: this._creditKarmaJointOwner, dataType: 'string', label: "Credit Karma Joint Owner" },
                { key: "AppInfoSettings.gbBillPayType", value: this._gbBillPayType, dataType: 'string', label: "Gb Bill Pay Type" },
                { key: "AppInfoSettings.gsEstatmentType", value: this._gsEstatmentType, dataType: 'string', label: "Gs Estatment Type" },
                { key: "AppInfoSettings.giTransMaxDaily", value: this._giTransMaxDaily, dataType: 'string', label: "Gi Trans Max Daily" },
                { key: "AppInfoSettings.giTransMaxMonthly", value: this._giTransMaxMonthly, dataType: 'string', label: "Gi Trans Max Monthly" },
                { key: "AppInfoSettings.giTransMaxWeekly", value: this._giTransMaxWeekly, dataType: 'string', label: "Gi Trans Max Weekly" },
                { key: "AppInfoSettings.giTransMaxYearly", value: this._giTransMaxYearly, dataType: 'string', label: "Gi Trans Max Yearly" },
                { key: "AppInfoSettings.giMaxHistoryCount", value: this._giMaxHistoryCount, dataType: 'string', label: "Gi Max History Count" },
                { key: "AppInfoSettings.IntraBankRoutingNumber", value: this._intraBankRoutingNumber, dataType: 'string', label: "Intra Bank Routing Number" },
                { key: "AppInfoSettings.LinkedACHMethod", value: this._linkedACHMethod, dataType: 'string', label: "Linked A C H Method" },
                { key: "AppInfoSettings.TermsLinkURL", value: this._termsLinkURL, dataType: 'string', label: "Terms Link U R L" },
                { key: "AppInfoSettings.PWDEncryptionKey", value: this._pWDEncryptionKey, dataType: 'string', label: "P W D Encryption Key" },
                { key: "AppInfoSettings.BillPayAccounts", value: this._billPayAccounts, dataType: 'string', label: "Bill Pay Accounts" },
                { key: "AppInfoSettings.MICRNumberFirstFourDigits", value: this._mICRNumberFirstFourDigits, dataType: 'string', label: "M I C R Number First Four Digits" },
                { key: "AppInfoSettings.MobileBillPayProvider", value: this._mobileBillPayProvider, dataType: 'string', label: "Mobile Bill Pay Provider" },
                { key: "AppInfoSettings.obsShareRestrictedInquire", value: this._obsShareRestrictedInquire, dataType: 'string', label: "Obs Share Restricted Inquire" },
                { key: "AppInfoSettings.obsCheckingAccounts", value: this._obsCheckingAccounts, dataType: 'string', label: "Obs Checking Accounts" },
                { key: "AppInfoSettings.CreditCardHistoryProvider", value: this._creditCardHistoryProvider, dataType: 'string', label: "Credit Card History Provider" },
                { key: "AppInfoSettings.InstitutionDisplayName", value: this._institutionDisplayName, dataType: 'string', label: "Institution Display Name" },
                { key: "AppInfoSettings.ScheduledTransfersStartTime", value: this._scheduledTransfersStartTime, dataType: 'string', label: "Scheduled Transfers Start Time" },
                { key: "AppInfoSettings.ScheduledTransfersStartSpan", value: this._scheduledTransfersStartSpan, dataType: 'string', label: "Scheduled Transfers Start Span" },
                { key: "AppInfoSettings.SchedTransDefaultStartTime", value: this._schedTransDefaultStartTime, dataType: 'string', label: "Sched Trans Default Start Time" },
                { key: "AppInfoSettings.SchedTransLinkedAchStartTime", value: this._schedTransLinkedAchStartTime, dataType: 'string', label: "Sched Trans Linked Ach Start Time" },
                { key: "AppInfoSettings.MICRNumberLength", value: this._mICRNumberLength, dataType: 'number', label: "M I C R Number Length" },
                { key: "AppInfoSettings.CreditCardSSOType", value: this._creditCardSSOType, dataType: 'creditcardssoprovider', label: "Credit Card S S O Type" },
                { key: "AppInfoSettings.HouseholdingPermissionSource", value: this._householdingPermissionSource, dataType: 'string', label: "Householding Permission Source" },
                { key: "AppInfoSettings.CreditCardSsoDisplayType", value: this._creditCardSsoDisplayType, dataType: 'string', label: "Credit Card Sso Display Type" },
                { key: "AppInfoSettings.FISScoreCardDisplayType", value: this._fISScoreCardDisplayType, dataType: 'string', label: "F I S Score Card Display Type" },
            ];
        }

}