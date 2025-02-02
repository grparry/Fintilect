import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { Version } from '../Version';
import { Activation } from '../Activation.Activation';
import { AppMessages } from '../AppMessages';
import { Welcome } from '../Welcome';
import { FicoCreditScore } from '../FicoCreditScore';
import { ForgotUsername } from '../ForgotUsername';
import { Enrollment } from '../Enrollment';
import { Loan } from '../Loan.Loan';
import { CardControl } from '../CardControl.CardControl';
import { CardManagementSettings } from '../CardManagement.CardManagementSettings';
import { SendMoney } from '../SendMoney';
import { StopPay } from '../StopPay';
import { MoneyDesktop } from '../MoneyDesktop';
import { Deals } from '../Deals.Deals';
import { AccountOpening } from '../AccountOpening.AccountOpening';
import { Settings } from '../Settings.Settings';
import { BillPay } from '../BillPay.BillPay';
import { CheckDeposit } from '../CheckDeposit';
import { LocationSearch } from '../LocationSearch';
import { Estatements } from '../Estatements';
import { Branding } from '../Branding.Branding';
import { Security } from '../Security.Security';
import { PromoChannel } from '../Promotions.PromoChannel';
import { Alerts } from '../Alerts';
import { NextLoginSteps } from '../NextLoginSteps';
import { Accounts } from '../Accounts.Accounts';
import { QuickBalance } from '../QuickBalance.QuickBalance';
import { QuickAccountInfo } from '../QuickAccountInfo';
import { Transfers } from '../Transfers.Transfers';
import { AdvancePay } from '../AdvancePay';
import { SavvyMoney } from '../SavvyMoney';
import { HouseHolding } from '../HouseHolding';
import { VersionManagement } from '../VersionManagement';
import { MyCardInfo } from '../MyCardInfo';
import { Marketing } from '../Marketing';
import { ContactUs } from '../ContactUs';
import { CardAlerts } from '../CardAlerts';
import { MyCuClub } from '../MyCuClub';
import { PushNotification } from '../PushNotification';
import { UserDevices } from '../UserDevices.UserDevices';
import { MobileWebViews } from '../MobileWebViews';
import { PasswordEncryption } from '../PasswordEncryption';
import { PinChange } from '../PinChange';
import { Login } from '../Login';
import { ConnectNative } from '../ConnectNative';
import { ConnectNativeSettings } from '../ConnectNativeSettings';
import { MobileMenu } from '../MobileMenu';
import { DigitalWallet } from '../DigitalWallet';
import { PinEncryption } from '../PinEncryption';
import { DocumentCenter } from '../DocumentCenter';
import { Comm100 } from '../Chat.Comm100';
import { LoanOffers } from '../LoanOffers.LoanOffers';
import { Rates } from '../Rates';
import { LinkedAccounts } from '../LinkedAccounts';
import { RateAndReview } from '../RateAndReview';
import { Larky } from '../Larky';
import { RestrictedWordSettings } from '../RestrictedWordSettings';
import { GliaSettings } from '../GliaSettings';
import { DirectDeposit } from '../DirectDeposit';
import { TalkativeChatSettings } from '../TalkativeChatSettings';
import { CreditScoreHistorySettings } from '../CreditScoreHistorySettings';
import { DiscountTicketsSettings } from '../DiscountTicketsSettings';
import { DeepTargetSettings } from '../DeepTargetSettings';
import { SecureForms } from '../SecureForms';
export interface MobileConfigurationConfig {
    MinOsVersionIos: Version;
    MinOsVersionAndroid: Version;
    OsDeprecatedAppVersion: Version;
    AndroidDeprecatedAppVersion: Version;
    IosDeprecatedAppVersion: Version;
    IsWebViewDomStorageEnabled: boolean;
    AppTrackingTransparencyEnabled: boolean;
    Activation: Activation;
    AppMessages: AppMessages;
    Welcome: Welcome;
    FicoCreditScore: FicoCreditScore;
    ForgotUsername: ForgotUsername;
    Enrollment: Enrollment;
    Loan: Loan;
    CardControl: CardControl;
    CardManagement: CardManagementSettings;
    SendMoney: SendMoney;
    StopPay: StopPay;
    MoneyDesktop: MoneyDesktop;
    Deals: Deals;
    AccountOpening: AccountOpening;
    Settings: Settings;
    BillPay: BillPay;
    CheckDeposit: CheckDeposit;
    LocationSearch: LocationSearch;
    EStatements: Estatements;
    Branding: Branding;
    Security: Security;
    PromoChannel: PromoChannel;
    Alerts: Alerts;
    NextLoginSteps: NextLoginSteps;
    Accounts: Accounts;
    QuickBalance: QuickBalance;
    QuickAccountInfo: QuickAccountInfo;
    Transfers: Transfers;
    AdvancePay: AdvancePay;
    SavvyMoney: SavvyMoney;
    HouseHolding: HouseHolding;
    VersionManagement: VersionManagement;
    MyCardInfo: MyCardInfo;
    Marketing: Marketing;
    ContactUs: ContactUs;
    CardAlerts: CardAlerts;
    MyCuClub: MyCuClub;
    PushNotification: PushNotification;
    UserDevices: UserDevices;
    MobileWebViews: MobileWebViews;
    PasswordEncryption: PasswordEncryption;
    PinChange: PinChange;
    Login: Login;
    ConnectNative: ConnectNative;
    ConnectNativeSettings: ConnectNativeSettings;
    Menu: MobileMenu;
    DigitalWallet: DigitalWallet;
    PinEncryption: PinEncryption;
    DocumentCenter: DocumentCenter;
    Comm100: Comm100;
    LoanOffers: LoanOffers;
    Rates: Rates;
    LinkedAccounts: LinkedAccounts;
    RateAndReview: RateAndReview;
    Larky: Larky;
    RestrictedWordSettings: RestrictedWordSettings;
    GliaSettings: GliaSettings;
    DirectDeposit: DirectDeposit;
    TalkativeChat: TalkativeChatSettings;
    CreditScoreHistory: CreditScoreHistorySettings;
    DiscountTickets: DiscountTicketsSettings;
    DeepTarget: DeepTargetSettings;
    SecureForms: SecureForms;
}

export class MobileConfiguration implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'MobileConfiguration'
    };


            private _minOsVersionIos: Version;
            get minOsVersionIos(): Version {
                return this._minOsVersionIos;
            }
            set minOsVersionIos(value: Version) {
                this._minOsVersionIos = value;
            }

            private _minOsVersionAndroid: Version;
            get minOsVersionAndroid(): Version {
                return this._minOsVersionAndroid;
            }
            set minOsVersionAndroid(value: Version) {
                this._minOsVersionAndroid = value;
            }

            private _osDeprecatedAppVersion: Version;
            get osDeprecatedAppVersion(): Version {
                return this._osDeprecatedAppVersion;
            }
            set osDeprecatedAppVersion(value: Version) {
                this._osDeprecatedAppVersion = value;
            }

            private _androidDeprecatedAppVersion: Version;
            get androidDeprecatedAppVersion(): Version {
                return this._androidDeprecatedAppVersion;
            }
            set androidDeprecatedAppVersion(value: Version) {
                this._androidDeprecatedAppVersion = value;
            }

            private _iosDeprecatedAppVersion: Version;
            get iosDeprecatedAppVersion(): Version {
                return this._iosDeprecatedAppVersion;
            }
            set iosDeprecatedAppVersion(value: Version) {
                this._iosDeprecatedAppVersion = value;
            }

            private _isWebViewDomStorageEnabled: boolean;
            get isWebViewDomStorageEnabled(): boolean {
                return this._isWebViewDomStorageEnabled;
            }
            set isWebViewDomStorageEnabled(value: boolean) {
                this._isWebViewDomStorageEnabled = value;
            }

            private _appTrackingTransparencyEnabled: boolean;
            get appTrackingTransparencyEnabled(): boolean {
                return this._appTrackingTransparencyEnabled;
            }
            set appTrackingTransparencyEnabled(value: boolean) {
                this._appTrackingTransparencyEnabled = value;
            }

            private _activation: Activation;
            get activation(): Activation {
                return this._activation;
            }
            set activation(value: Activation) {
                this._activation = value;
            }

            private _appMessages: AppMessages;
            get appMessages(): AppMessages {
                return this._appMessages;
            }
            set appMessages(value: AppMessages) {
                this._appMessages = value;
            }

            private _welcome: Welcome;
            get welcome(): Welcome {
                return this._welcome;
            }
            set welcome(value: Welcome) {
                this._welcome = value;
            }

            private _ficoCreditScore: FicoCreditScore;
            get ficoCreditScore(): FicoCreditScore {
                return this._ficoCreditScore;
            }
            set ficoCreditScore(value: FicoCreditScore) {
                this._ficoCreditScore = value;
            }

            private _forgotUsername: ForgotUsername;
            get forgotUsername(): ForgotUsername {
                return this._forgotUsername;
            }
            set forgotUsername(value: ForgotUsername) {
                this._forgotUsername = value;
            }

            private _enrollment: Enrollment;
            get enrollment(): Enrollment {
                return this._enrollment;
            }
            set enrollment(value: Enrollment) {
                this._enrollment = value;
            }

            private _loan: Loan;
            get loan(): Loan {
                return this._loan;
            }
            set loan(value: Loan) {
                this._loan = value;
            }

            private _cardControl: CardControl;
            get cardControl(): CardControl {
                return this._cardControl;
            }
            set cardControl(value: CardControl) {
                this._cardControl = value;
            }

            private _cardManagement: CardManagementSettings;
            get cardManagement(): CardManagementSettings {
                return this._cardManagement;
            }
            set cardManagement(value: CardManagementSettings) {
                this._cardManagement = value;
            }

            private _sendMoney: SendMoney;
            get sendMoney(): SendMoney {
                return this._sendMoney;
            }
            set sendMoney(value: SendMoney) {
                this._sendMoney = value;
            }

            private _stopPay: StopPay;
            get stopPay(): StopPay {
                return this._stopPay;
            }
            set stopPay(value: StopPay) {
                this._stopPay = value;
            }

            private _moneyDesktop: MoneyDesktop;
            get moneyDesktop(): MoneyDesktop {
                return this._moneyDesktop;
            }
            set moneyDesktop(value: MoneyDesktop) {
                this._moneyDesktop = value;
            }

            private _deals: Deals;
            get deals(): Deals {
                return this._deals;
            }
            set deals(value: Deals) {
                this._deals = value;
            }

            private _accountOpening: AccountOpening;
            get accountOpening(): AccountOpening {
                return this._accountOpening;
            }
            set accountOpening(value: AccountOpening) {
                this._accountOpening = value;
            }

            private _settings: Settings;
            get settings(): Settings {
                return this._settings;
            }
            set settings(value: Settings) {
                this._settings = value;
            }

            private _billPay: BillPay;
            get billPay(): BillPay {
                return this._billPay;
            }
            set billPay(value: BillPay) {
                this._billPay = value;
            }

            private _checkDeposit: CheckDeposit;
            get checkDeposit(): CheckDeposit {
                return this._checkDeposit;
            }
            set checkDeposit(value: CheckDeposit) {
                this._checkDeposit = value;
            }

            private _locationSearch: LocationSearch;
            get locationSearch(): LocationSearch {
                return this._locationSearch;
            }
            set locationSearch(value: LocationSearch) {
                this._locationSearch = value;
            }

            private _eStatements: Estatements;
            get eStatements(): Estatements {
                return this._eStatements;
            }
            set eStatements(value: Estatements) {
                this._eStatements = value;
            }

            private _branding: Branding;
            get branding(): Branding {
                return this._branding;
            }
            set branding(value: Branding) {
                this._branding = value;
            }

            private _security: Security;
            get security(): Security {
                return this._security;
            }
            set security(value: Security) {
                this._security = value;
            }

            private _promoChannel: PromoChannel;
            get promoChannel(): PromoChannel {
                return this._promoChannel;
            }
            set promoChannel(value: PromoChannel) {
                this._promoChannel = value;
            }

            private _alerts: Alerts;
            get alerts(): Alerts {
                return this._alerts;
            }
            set alerts(value: Alerts) {
                this._alerts = value;
            }

            private _nextLoginSteps: NextLoginSteps;
            get nextLoginSteps(): NextLoginSteps {
                return this._nextLoginSteps;
            }
            set nextLoginSteps(value: NextLoginSteps) {
                this._nextLoginSteps = value;
            }

            private _accounts: Accounts;
            get accounts(): Accounts {
                return this._accounts;
            }
            set accounts(value: Accounts) {
                this._accounts = value;
            }

            private _quickBalance: QuickBalance;
            get quickBalance(): QuickBalance {
                return this._quickBalance;
            }
            set quickBalance(value: QuickBalance) {
                this._quickBalance = value;
            }

            private _quickAccountInfo: QuickAccountInfo;
            get quickAccountInfo(): QuickAccountInfo {
                return this._quickAccountInfo;
            }
            set quickAccountInfo(value: QuickAccountInfo) {
                this._quickAccountInfo = value;
            }

            private _transfers: Transfers;
            get transfers(): Transfers {
                return this._transfers;
            }
            set transfers(value: Transfers) {
                this._transfers = value;
            }

            private _advancePay: AdvancePay;
            get advancePay(): AdvancePay {
                return this._advancePay;
            }
            set advancePay(value: AdvancePay) {
                this._advancePay = value;
            }

            private _savvyMoney: SavvyMoney;
            get savvyMoney(): SavvyMoney {
                return this._savvyMoney;
            }
            set savvyMoney(value: SavvyMoney) {
                this._savvyMoney = value;
            }

            private _houseHolding: HouseHolding;
            get houseHolding(): HouseHolding {
                return this._houseHolding;
            }
            set houseHolding(value: HouseHolding) {
                this._houseHolding = value;
            }

            private _versionManagement: VersionManagement;
            get versionManagement(): VersionManagement {
                return this._versionManagement;
            }
            set versionManagement(value: VersionManagement) {
                this._versionManagement = value;
            }

            private _myCardInfo: MyCardInfo;
            get myCardInfo(): MyCardInfo {
                return this._myCardInfo;
            }
            set myCardInfo(value: MyCardInfo) {
                this._myCardInfo = value;
            }

            private _marketing: Marketing;
            get marketing(): Marketing {
                return this._marketing;
            }
            set marketing(value: Marketing) {
                this._marketing = value;
            }

            private _contactUs: ContactUs;
            get contactUs(): ContactUs {
                return this._contactUs;
            }
            set contactUs(value: ContactUs) {
                this._contactUs = value;
            }

            private _cardAlerts: CardAlerts;
            get cardAlerts(): CardAlerts {
                return this._cardAlerts;
            }
            set cardAlerts(value: CardAlerts) {
                this._cardAlerts = value;
            }

            private _myCuClub: MyCuClub;
            get myCuClub(): MyCuClub {
                return this._myCuClub;
            }
            set myCuClub(value: MyCuClub) {
                this._myCuClub = value;
            }

            private _pushNotification: PushNotification;
            get pushNotification(): PushNotification {
                return this._pushNotification;
            }
            set pushNotification(value: PushNotification) {
                this._pushNotification = value;
            }

            private _userDevices: UserDevices;
            get userDevices(): UserDevices {
                return this._userDevices;
            }
            set userDevices(value: UserDevices) {
                this._userDevices = value;
            }

            private _mobileWebViews: MobileWebViews;
            get mobileWebViews(): MobileWebViews {
                return this._mobileWebViews;
            }
            set mobileWebViews(value: MobileWebViews) {
                this._mobileWebViews = value;
            }

            private _passwordEncryption: PasswordEncryption;
            get passwordEncryption(): PasswordEncryption {
                return this._passwordEncryption;
            }
            set passwordEncryption(value: PasswordEncryption) {
                this._passwordEncryption = value;
            }

            private _pinChange: PinChange;
            get pinChange(): PinChange {
                return this._pinChange;
            }
            set pinChange(value: PinChange) {
                this._pinChange = value;
            }

            private _login: Login;
            get login(): Login {
                return this._login;
            }
            set login(value: Login) {
                this._login = value;
            }

            private _connectNative: ConnectNative;
            get connectNative(): ConnectNative {
                return this._connectNative;
            }
            set connectNative(value: ConnectNative) {
                this._connectNative = value;
            }

            private _connectNativeSettings: ConnectNativeSettings;
            get connectNativeSettings(): ConnectNativeSettings {
                return this._connectNativeSettings;
            }
            set connectNativeSettings(value: ConnectNativeSettings) {
                this._connectNativeSettings = value;
            }

            private _menu: MobileMenu;
            get menu(): MobileMenu {
                return this._menu;
            }
            set menu(value: MobileMenu) {
                this._menu = value;
            }

            private _digitalWallet: DigitalWallet;
            get digitalWallet(): DigitalWallet {
                return this._digitalWallet;
            }
            set digitalWallet(value: DigitalWallet) {
                this._digitalWallet = value;
            }

            private _pinEncryption: PinEncryption;
            get pinEncryption(): PinEncryption {
                return this._pinEncryption;
            }
            set pinEncryption(value: PinEncryption) {
                this._pinEncryption = value;
            }

            private _documentCenter: DocumentCenter;
            get documentCenter(): DocumentCenter {
                return this._documentCenter;
            }
            set documentCenter(value: DocumentCenter) {
                this._documentCenter = value;
            }

            private _comm100: Comm100;
            get comm100(): Comm100 {
                return this._comm100;
            }
            set comm100(value: Comm100) {
                this._comm100 = value;
            }

            private _loanOffers: LoanOffers;
            get loanOffers(): LoanOffers {
                return this._loanOffers;
            }
            set loanOffers(value: LoanOffers) {
                this._loanOffers = value;
            }

            private _rates: Rates;
            get rates(): Rates {
                return this._rates;
            }
            set rates(value: Rates) {
                this._rates = value;
            }

            private _linkedAccounts: LinkedAccounts;
            get linkedAccounts(): LinkedAccounts {
                return this._linkedAccounts;
            }
            set linkedAccounts(value: LinkedAccounts) {
                this._linkedAccounts = value;
            }

            private _rateAndReview: RateAndReview;
            get rateAndReview(): RateAndReview {
                return this._rateAndReview;
            }
            set rateAndReview(value: RateAndReview) {
                this._rateAndReview = value;
            }

            private _larky: Larky;
            get larky(): Larky {
                return this._larky;
            }
            set larky(value: Larky) {
                this._larky = value;
            }

            private _restrictedWordSettings: RestrictedWordSettings;
            get restrictedWordSettings(): RestrictedWordSettings {
                return this._restrictedWordSettings;
            }
            set restrictedWordSettings(value: RestrictedWordSettings) {
                this._restrictedWordSettings = value;
            }

            private _gliaSettings: GliaSettings;
            get gliaSettings(): GliaSettings {
                return this._gliaSettings;
            }
            set gliaSettings(value: GliaSettings) {
                this._gliaSettings = value;
            }

            private _directDeposit: DirectDeposit;
            get directDeposit(): DirectDeposit {
                return this._directDeposit;
            }
            set directDeposit(value: DirectDeposit) {
                this._directDeposit = value;
            }

            private _talkativeChat: TalkativeChatSettings;
            get talkativeChat(): TalkativeChatSettings {
                return this._talkativeChat;
            }
            set talkativeChat(value: TalkativeChatSettings) {
                this._talkativeChat = value;
            }

            private _creditScoreHistory: CreditScoreHistorySettings;
            get creditScoreHistory(): CreditScoreHistorySettings {
                return this._creditScoreHistory;
            }
            set creditScoreHistory(value: CreditScoreHistorySettings) {
                this._creditScoreHistory = value;
            }

            private _discountTickets: DiscountTicketsSettings;
            get discountTickets(): DiscountTicketsSettings {
                return this._discountTickets;
            }
            set discountTickets(value: DiscountTicketsSettings) {
                this._discountTickets = value;
            }

            private _deepTarget: DeepTargetSettings;
            get deepTarget(): DeepTargetSettings {
                return this._deepTarget;
            }
            set deepTarget(value: DeepTargetSettings) {
                this._deepTarget = value;
            }

            private _secureForms: SecureForms;
            get secureForms(): SecureForms {
                return this._secureForms;
            }
            set secureForms(value: SecureForms) {
                this._secureForms = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "MobileConfiguration.MinOsVersionIos", value: this._minOsVersionIos, dataType: 'version', label: "Min Os Version Ios" },
                { key: "MobileConfiguration.MinOsVersionAndroid", value: this._minOsVersionAndroid, dataType: 'version', label: "Min Os Version Android" },
                { key: "MobileConfiguration.OsDeprecatedAppVersion", value: this._osDeprecatedAppVersion, dataType: 'version', label: "Os Deprecated App Version" },
                { key: "MobileConfiguration.AndroidDeprecatedAppVersion", value: this._androidDeprecatedAppVersion, dataType: 'version', label: "Android Deprecated App Version" },
                { key: "MobileConfiguration.IosDeprecatedAppVersion", value: this._iosDeprecatedAppVersion, dataType: 'version', label: "Ios Deprecated App Version" },
                { key: "MobileConfiguration.IsWebViewDomStorageEnabled", value: this._isWebViewDomStorageEnabled, dataType: 'boolean', label: "Is Web View Dom Storage Enabled" },
                { key: "MobileConfiguration.AppTrackingTransparencyEnabled", value: this._appTrackingTransparencyEnabled, dataType: 'boolean', label: "App Tracking Transparency Enabled" },
                { key: "MobileConfiguration.Activation", value: this._activation, dataType: 'activation.activation', label: "Activation" },
                { key: "MobileConfiguration.AppMessages", value: this._appMessages, dataType: 'appmessages', label: "App Messages" },
                { key: "MobileConfiguration.Welcome", value: this._welcome, dataType: 'welcome', label: "Welcome" },
                { key: "MobileConfiguration.FicoCreditScore", value: this._ficoCreditScore, dataType: 'ficocreditscore', label: "Fico Credit Score" },
                { key: "MobileConfiguration.ForgotUsername", value: this._forgotUsername, dataType: 'forgotusername', label: "Forgot Username" },
                { key: "MobileConfiguration.Enrollment", value: this._enrollment, dataType: 'enrollment', label: "Enrollment" },
                { key: "MobileConfiguration.Loan", value: this._loan, dataType: 'loan.loan', label: "Loan" },
                { key: "MobileConfiguration.CardControl", value: this._cardControl, dataType: 'cardcontrol.cardcontrol', label: "Card Control" },
                { key: "MobileConfiguration.CardManagement", value: this._cardManagement, dataType: 'cardmanagement.cardmanagementsettings', label: "Card Management" },
                { key: "MobileConfiguration.SendMoney", value: this._sendMoney, dataType: 'sendmoney', label: "Send Money" },
                { key: "MobileConfiguration.StopPay", value: this._stopPay, dataType: 'stoppay', label: "Stop Pay" },
                { key: "MobileConfiguration.MoneyDesktop", value: this._moneyDesktop, dataType: 'moneydesktop', label: "Money Desktop" },
                { key: "MobileConfiguration.Deals", value: this._deals, dataType: 'deals.deals', label: "Deals" },
                { key: "MobileConfiguration.AccountOpening", value: this._accountOpening, dataType: 'accountopening.accountopening', label: "Account Opening" },
                { key: "MobileConfiguration.Settings", value: this._settings, dataType: 'settings.settings', label: "Settings" },
                { key: "MobileConfiguration.BillPay", value: this._billPay, dataType: 'billpay.billpay', label: "Bill Pay" },
                { key: "MobileConfiguration.CheckDeposit", value: this._checkDeposit, dataType: 'checkdeposit', label: "Check Deposit" },
                { key: "MobileConfiguration.LocationSearch", value: this._locationSearch, dataType: 'locationsearch', label: "Location Search" },
                { key: "MobileConfiguration.EStatements", value: this._eStatements, dataType: 'estatements', label: "E Statements" },
                { key: "MobileConfiguration.Branding", value: this._branding, dataType: 'branding.branding', label: "Branding" },
                { key: "MobileConfiguration.Security", value: this._security, dataType: 'security.security', label: "Security" },
                { key: "MobileConfiguration.PromoChannel", value: this._promoChannel, dataType: 'promotions.promochannel', label: "Promo Channel" },
                { key: "MobileConfiguration.Alerts", value: this._alerts, dataType: 'alerts', label: "Alerts" },
                { key: "MobileConfiguration.NextLoginSteps", value: this._nextLoginSteps, dataType: 'nextloginsteps', label: "Next Login Steps" },
                { key: "MobileConfiguration.Accounts", value: this._accounts, dataType: 'accounts.accounts', label: "Accounts" },
                { key: "MobileConfiguration.QuickBalance", value: this._quickBalance, dataType: 'quickbalance.quickbalance', label: "Quick Balance" },
                { key: "MobileConfiguration.QuickAccountInfo", value: this._quickAccountInfo, dataType: 'quickaccountinfo', label: "Quick Account Info" },
                { key: "MobileConfiguration.Transfers", value: this._transfers, dataType: 'transfers.transfers', label: "Transfers" },
                { key: "MobileConfiguration.AdvancePay", value: this._advancePay, dataType: 'advancepay', label: "Advance Pay" },
                { key: "MobileConfiguration.SavvyMoney", value: this._savvyMoney, dataType: 'savvymoney', label: "Savvy Money" },
                { key: "MobileConfiguration.HouseHolding", value: this._houseHolding, dataType: 'householding', label: "House Holding" },
                { key: "MobileConfiguration.VersionManagement", value: this._versionManagement, dataType: 'versionmanagement', label: "Version Management" },
                { key: "MobileConfiguration.MyCardInfo", value: this._myCardInfo, dataType: 'mycardinfo', label: "My Card Info" },
                { key: "MobileConfiguration.Marketing", value: this._marketing, dataType: 'marketing', label: "Marketing" },
                { key: "MobileConfiguration.ContactUs", value: this._contactUs, dataType: 'contactus', label: "Contact Us" },
                { key: "MobileConfiguration.CardAlerts", value: this._cardAlerts, dataType: 'cardalerts', label: "Card Alerts" },
                { key: "MobileConfiguration.MyCuClub", value: this._myCuClub, dataType: 'mycuclub', label: "My Cu Club" },
                { key: "MobileConfiguration.PushNotification", value: this._pushNotification, dataType: 'pushnotification', label: "Push Notification" },
                { key: "MobileConfiguration.UserDevices", value: this._userDevices, dataType: 'userdevices.userdevices', label: "User Devices" },
                { key: "MobileConfiguration.MobileWebViews", value: this._mobileWebViews, dataType: 'mobilewebviews', label: "Mobile Web Views" },
                { key: "MobileConfiguration.PasswordEncryption", value: this._passwordEncryption, dataType: 'passwordencryption', label: "Password Encryption" },
                { key: "MobileConfiguration.PinChange", value: this._pinChange, dataType: 'pinchange', label: "Pin Change" },
                { key: "MobileConfiguration.Login", value: this._login, dataType: 'login', label: "Login" },
                { key: "MobileConfiguration.ConnectNative", value: this._connectNative, dataType: 'connectnative', label: "Connect Native" },
                { key: "MobileConfiguration.ConnectNativeSettings", value: this._connectNativeSettings, dataType: 'connectnativesettings', label: "Connect Native Settings" },
                { key: "MobileConfiguration.Menu", value: this._menu, dataType: 'mobilemenu', label: "Menu" },
                { key: "MobileConfiguration.DigitalWallet", value: this._digitalWallet, dataType: 'digitalwallet', label: "Digital Wallet" },
                { key: "MobileConfiguration.PinEncryption", value: this._pinEncryption, dataType: 'pinencryption', label: "Pin Encryption" },
                { key: "MobileConfiguration.DocumentCenter", value: this._documentCenter, dataType: 'documentcenter', label: "Document Center" },
                { key: "MobileConfiguration.Comm100", value: this._comm100, dataType: 'chat.comm100', label: "Comm100" },
                { key: "MobileConfiguration.LoanOffers", value: this._loanOffers, dataType: 'loanoffers.loanoffers', label: "Loan Offers" },
                { key: "MobileConfiguration.Rates", value: this._rates, dataType: 'rates', label: "Rates" },
                { key: "MobileConfiguration.LinkedAccounts", value: this._linkedAccounts, dataType: 'linkedaccounts', label: "Linked Accounts" },
                { key: "MobileConfiguration.RateAndReview", value: this._rateAndReview, dataType: 'rateandreview', label: "Rate And Review" },
                { key: "MobileConfiguration.Larky", value: this._larky, dataType: 'larky', label: "Larky" },
                { key: "MobileConfiguration.RestrictedWordSettings", value: this._restrictedWordSettings, dataType: 'restrictedwordsettings', label: "Restricted Word Settings" },
                { key: "MobileConfiguration.GliaSettings", value: this._gliaSettings, dataType: 'gliasettings', label: "Glia Settings" },
                { key: "MobileConfiguration.DirectDeposit", value: this._directDeposit, dataType: 'directdeposit', label: "Direct Deposit" },
                { key: "MobileConfiguration.TalkativeChat", value: this._talkativeChat, dataType: 'talkativechatsettings', label: "Talkative Chat" },
                { key: "MobileConfiguration.CreditScoreHistory", value: this._creditScoreHistory, dataType: 'creditscorehistorysettings', label: "Credit Score History" },
                { key: "MobileConfiguration.DiscountTickets", value: this._discountTickets, dataType: 'discountticketssettings', label: "Discount Tickets" },
                { key: "MobileConfiguration.DeepTarget", value: this._deepTarget, dataType: 'deeptargetsettings', label: "Deep Target" },
                { key: "MobileConfiguration.SecureForms", value: this._secureForms, dataType: 'secureforms', label: "Secure Forms" },
            ];
        }

}