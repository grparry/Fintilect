import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { IApplicationConfigurationProvider } from './IApplicationConfigurationProvider';
import { ApplicationConfiguration } from './ApplicationConfiguration';
import { AchFileService } from './AchFileService';
import { LinkedAccount } from './LinkedAccount';
import { AccountSettings } from './AccountSettings';
import { AdminSettings } from './AdminSettings';
import { LoanSettings } from './LoanSettings';
import { LoanOfferSettings } from './LoanOfferSettings';
import { MeridianLinkSsoSettings } from './MeridianLinkSsoSettings';
import { FinancialCore } from './FinancialCore';
import { Institution } from './Institution.Institution';
import { MFAQuestions } from './Institution.MFAQuestions';
import { StopPayment } from './Services.StopPayment';
import { PaydayLoan } from './PaydayLoan';
import { MobileConfiguration } from './MobileConfigurations/MobileConfiguration';
import { OmegaConfiguration } from './OmegaConfiguration';
import { RemoteDeposit } from './RemoteDeposit.RemoteDeposit';
import { AddressVerificationSettings } from './AddressVerificationSettings';
import { MultipleAddressesSettings } from './MultipleAddressesSettings';
import { PasswordVerificationSettings } from './PasswordVerificationSettings';
import { OfxConfigurations } from './OfxConfigurations.OfxConfigurations';
import { AccountMaskingSettings } from './AccountMaskingSettings';
import { AccountAttributesSettings } from './AccountAttributesSettings';
import { TieredAccessSettings } from './TieredAccessSettings';
import { CardHistory } from './CardHistory';
import { BillPaySettings } from './BillPaySettings';
import { TargetedMarketingSettings } from './TargetedMarketingSettings';
import { DirectDepositConfiguration } from './DirectDepositConfiguration';
import { Transfers } from './Transfers';
import { ErrorMessageConfiguration } from './ErrorMessageConfiguration';
import { MoneyDesktop } from './MoneyDesktop.MoneyDesktop';
import { Controls } from './Summary.Controls';
import { SavvyMoneySettings } from './SavvyMoneySettings';
import { CreditScoreHistorySettings } from './CreditScoreHistorySettings';
import { HistoryDate } from './HistoryDate';
import { AccountHistory } from './AccountHistory';
import { HistoryShare } from './HistoryShare';
import { CardlyticsWidget } from './CardlyticsWidget';
import { CardlyticsSettings } from './CardlyticsSettings';
import { CardManagementSettings } from './CardManagementSettings';
import { LiveChatSettings } from './LiveChatSettings';
import { CoBrowseSettings } from './CoBrowseSettings';
import { CUDirectLoanSso } from './CUDirectLoanSso';
import { ShowApplyForLoanOrCardButton } from './ShowApplyForLoanOrCardButton';
import { SecureMessageSettings } from './SecureMessageSettings';
import { MenuItems } from './MenuItems';
import { Estatements } from './Estatements.Estatements';
import { BillPayAdminMemberMenu } from './BillPayAdminMemberMenu';
import { Alert } from './Alert';
import { AlexaFeature } from './AlexaFeature';
import { GoogleTags } from './GoogleTags';
import { PrimaryAccountSecurityCode } from './PrimaryAccountSecurityCode.PrimaryAccountSecurityCode';
import { OnlineBankingApi } from './OnlineBankingApi';
import { CheckReorder } from './CheckReorder.CheckReorder';
import { ChangeAddress } from './ChangeAddress';
import { HomeBankingLoginConfiguration } from './HomeBankingLoginConfiguration';
import { PasswordSettings } from './PasswordSettings';
import { CheckImages } from './CheckImages.CheckImages';
import { Payzur } from './Payzur';
import { FeaturesSettings } from './FeaturesSettings';
import { ChangeEmail } from './ChangeEmail';
import { ChangePhone } from './ChangePhone';
import { MultipleEmailSettings } from './MultipleEmailSettings';
import { PersonPaymentSecuritySettings } from './PersonPaymentSecuritySettings';
import { FicoCreditScore } from './FICO.FicoCreditScore';
import { ADAComplianceSettings } from './ADAComplianceSettings';
import { DocCenterSettings } from './DocCenterSettings';
import { SMTPSettings } from './SMTPSettings';
import { TravelNotificationFeature } from './TravelNotificationFeature';
import { RegularExpressionsFeature } from './RegularExpressionsFeature';
import { MembershipFeature } from './MembershipFeature';
import { ReCaptchaSettings } from './ReCaptchaSettings';
import { Themes } from './Themes.Themes';
import { AuditLoggingFeature } from './AuditLoggingFeature';
import { EnrollmentFeature } from './EnrollmentFeature';
import { RealTimeRedemption } from './RealTimeRedemption';
import { BusinessBanking } from './BusinessBanking.BusinessBanking';
import { PsiServicesSettings } from './PsiServicesSettings';
import { PscuLogFileTransformServiceSettings } from './PscuLogFileTransformServiceSettings';
import { VerafinFileBatchServiceSettings } from './VerafinFileBatchServiceSettings';
import { Promotions } from './Promotions.Promotions';
import { WireTransferFeatures } from './WireTransferFeatures';
import { RemoveMemberFromOnlineBanking } from './RemoveMemberFromOnlineBanking';
import { ConnectNativeSettings } from './ConnectNativeSettings';
import { OverdraftProtectionSettings } from './OverdraftProtectionSettings';
import { PageDisplaySettings } from './PageDisplaySettings';
import { BetterLobbySettings } from './BetterLobbySettings';
import { MonitoringSettings } from './MonitoringSettings';
import { LoginSettings } from './LoginSettings';
import { PublicApiSettings } from './PublicApiSettings';
import { SmsSecurityCodeSettings } from './SmsSecurityCodeSettings';
import { Comm100 } from './Comm100';
import { MiniOaoSettings } from './MiniOaoSettings';
import { WidgetSettings } from './WidgetSettings';
import { ThemeDeployment } from './ThemeDeployment';
import { GoToMyCard } from './GoToMyCard';
import { IntegratedEnrollmentSettings } from './IntegratedEnrollmentSettings';
import { Marketing } from './Marketing.Marketing';
import { GliaSettings } from './GliaSettings';
import { BokuSettings } from './BokuSettings';
import { UsernameSettings } from './UsernameSettings';
import { BeneficiarySettings } from './BeneficiarySettings';
import { CreditCardSettings } from './CreditCardSettings';
import { SecureFormsDesignerSettings } from './SecureFormsDesignerSettings';
import { RestrictedWordSettings } from './RestrictedWordSettings';
import { QcashLoanApplicationSsoSettings } from './QcashLoanApplicationSsoSettings';
import { ZelleSettings } from './ZelleSettings';
import { SynergyEstatementsSettings } from './SynergyEstatementsSettings';
import { ImiMobileTextBankingSettings } from './ImiMobileTextBankingSettings';
import { NcpEstatements } from './NcpEstatements';
import { InfoImageEstatementsSettings } from './InfoImageEstatementsSettings';
import { TalkativeChatSettings } from './TalkativeChatSettings';
import { WebApiEstatementsSettings } from './WebApiEstatementsSettings';
import { DiscountTicketsSettings } from './DiscountTicketsSettings';
import { AppInfoSettings } from './AppInfoSettings.AppInfoSettings';
import { OutOfBandAuthentication } from './OutOfBandAuthentication';
import { MultiAccountAccess } from './MultiAccountAccess';
export interface SettingsConfig {
    ConfigProvider: IApplicationConfigurationProvider;
    Application: ApplicationConfiguration;
    AchFileService: AchFileService;
    LinkedAccount: LinkedAccount;
    Account: AccountSettings;
    Admin: AdminSettings;
    Loans: LoanSettings;
    LoanOffers: LoanOfferSettings;
    MeridianLinkSso: MeridianLinkSsoSettings;
    FinancialCore: FinancialCore;
    Institution: Institution;
    MFAQuestions: MFAQuestions;
    StopPayment: StopPayment;
    PaydayLoan: PaydayLoan;
    MobileConfiguration: MobileConfiguration;
    OmegaConfiguration: OmegaConfiguration;
    RemoteDeposit: RemoteDeposit;
    AddressVerificationSettings: AddressVerificationSettings;
    MultipleAddressesSettings: MultipleAddressesSettings;
    PasswordVerificationSettings: PasswordVerificationSettings;
    OfxConfigurations: OfxConfigurations;
    AccountMaskingSettings: AccountMaskingSettings;
    AccountAttributesSettings: AccountAttributesSettings;
    TieredAccessSettings: TieredAccessSettings;
    CardHistorySettings: CardHistory;
    BillPaySettings: BillPaySettings;
    TargetedMarketingSettings: TargetedMarketingSettings;
    DirectDepositConfiguration: DirectDepositConfiguration;
    TransfersConfiguration: Transfers;
    ErrorMessageConfiguration: ErrorMessageConfiguration;
    MoneyDesktop: MoneyDesktop;
    SummaryControlsConfiguration: Controls;
    SavvyMoneySettings: SavvyMoneySettings;
    CreditScoreHistorySettings: CreditScoreHistorySettings;
    HistoryDateSettings: HistoryDate;
    AccountHistory: AccountHistory;
    HistoryShareSettings: HistoryShare;
    CardlyticsWidgetSettings: CardlyticsWidget;
    CardlyticsSettings: CardlyticsSettings;
    CardManagementSettings: CardManagementSettings;
    LiveChatSettings: LiveChatSettings;
    CoBrowseSettings: CoBrowseSettings;
    CUDirectLoanSsoSettings: CUDirectLoanSso;
    ShowApplyForLoanOrCardButtonSettings: ShowApplyForLoanOrCardButton;
    SecureMessages: SecureMessageSettings;
    MenuItems: MenuItems;
    Estatements: Estatements;
    BillPayAdminMemberMenu: BillPayAdminMemberMenu;
    Alerts: Alert;
    AlexaFeatureSettings: AlexaFeature;
    GoogleTagSettings: GoogleTags;
    PrimaryAccountSecurityCode: PrimaryAccountSecurityCode;
    OnlineBankingApi: OnlineBankingApi;
    CheckReorder: CheckReorder;
    ChangeAddress: ChangeAddress;
    HomeBankingLogin: HomeBankingLoginConfiguration;
    PasswordSettings: PasswordSettings;
    CheckImages: CheckImages;
    Payzur: Payzur;
    FeaturesSettings: FeaturesSettings;
    ChangeEmail: ChangeEmail;
    ChangePhone: ChangePhone;
    MultipleEmailSettings: MultipleEmailSettings;
    PersonPaymentSecuritySettings: PersonPaymentSecuritySettings;
    FicoCreditScore: FicoCreditScore;
    adaComplianceSettings: ADAComplianceSettings;
    DocCenterSettings: DocCenterSettings;
    SMTP: SMTPSettings;
    TravelNotificationFeatureSettings: TravelNotificationFeature;
    RegularExpressionsFeatureSettings: RegularExpressionsFeature;
    MembershipFeatureSettings: MembershipFeature;
    ReCaptchaSettings: ReCaptchaSettings;
    Themes: Themes;
    AuditLoggingSettings: AuditLoggingFeature;
    EnrollmentSettings: EnrollmentFeature;
    CheckingRewardsRealTimeRedemption: RealTimeRedemption;
    BusinessBanking: BusinessBanking;
    PsiServicesSettings: PsiServicesSettings;
    PscuLogFileTransformService: PscuLogFileTransformServiceSettings;
    VerafinFileBatchServiceSettings: VerafinFileBatchServiceSettings;
    Promotions: Promotions;
    WireTransfer: WireTransferFeatures;
    RemoveMemberFromOnlineBanking: RemoveMemberFromOnlineBanking;
    ConnectNativeSettings: ConnectNativeSettings;
    OverdraftProtectionSettings: OverdraftProtectionSettings;
    PageDisplaySettings: PageDisplaySettings;
    BetterLobby: BetterLobbySettings;
    Monitoring: MonitoringSettings;
    Login: LoginSettings;
    PublicApi: PublicApiSettings;
    SmsSecurityCode: SmsSecurityCodeSettings;
    Comm100Settings: Comm100;
    MiniOao: MiniOaoSettings;
    WidgetSettings: WidgetSettings;
    ThemeDeployment: ThemeDeployment;
    GoToMyCard: GoToMyCard;
    IntegratedEnrollment: IntegratedEnrollmentSettings;
    Marketing: Marketing;
    GliaSettings: GliaSettings;
    BokuSettings: BokuSettings;
    UsernameSettings: UsernameSettings;
    BeneficiarySettings: BeneficiarySettings;
    CreditCardSettings: CreditCardSettings;
    SecureFormsDesignerSettings: SecureFormsDesignerSettings;
    RestrictedWords: RestrictedWordSettings;
    QcashLoanApplication: QcashLoanApplicationSsoSettings;
    ZelleSettings: ZelleSettings;
    SynergyEstatementsSettings: SynergyEstatementsSettings;
    ImiMobileTextBankingSettings: ImiMobileTextBankingSettings;
    NcpEstatements: NcpEstatements;
    InfoImageEstatementsSettings: InfoImageEstatementsSettings;
    TalkativeChatSettings: TalkativeChatSettings;
    WebApiEstatementsSettings: WebApiEstatementsSettings;
    DiscountTicketsSettings: DiscountTicketsSettings;
    AppInfoSettings: AppInfoSettings;
    OutOfBandAuthentication: OutOfBandAuthentication;
    MultiAccountAccess: MultiAccountAccess;
}

export class Settings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Settings'
    };


            private _configProvider: IApplicationConfigurationProvider;
            get configProvider(): IApplicationConfigurationProvider {
                return this._configProvider;
            }
            set configProvider(value: IApplicationConfigurationProvider) {
                this._configProvider = value;
            }

            private _application: ApplicationConfiguration;
            get application(): ApplicationConfiguration {
                return this._application;
            }
            set application(value: ApplicationConfiguration) {
                this._application = value;
            }

            private _achFileService: AchFileService;
            get achFileService(): AchFileService {
                return this._achFileService;
            }
            set achFileService(value: AchFileService) {
                this._achFileService = value;
            }

            private _linkedAccount: LinkedAccount;
            get linkedAccount(): LinkedAccount {
                return this._linkedAccount;
            }
            set linkedAccount(value: LinkedAccount) {
                this._linkedAccount = value;
            }

            private _account: AccountSettings;
            get account(): AccountSettings {
                return this._account;
            }
            set account(value: AccountSettings) {
                this._account = value;
            }

            private _admin: AdminSettings;
            get admin(): AdminSettings {
                return this._admin;
            }
            set admin(value: AdminSettings) {
                this._admin = value;
            }

            private _loans: LoanSettings;
            get loans(): LoanSettings {
                return this._loans;
            }
            set loans(value: LoanSettings) {
                this._loans = value;
            }

            private _loanOffers: LoanOfferSettings;
            get loanOffers(): LoanOfferSettings {
                return this._loanOffers;
            }
            set loanOffers(value: LoanOfferSettings) {
                this._loanOffers = value;
            }

            private _meridianLinkSso: MeridianLinkSsoSettings;
            get meridianLinkSso(): MeridianLinkSsoSettings {
                return this._meridianLinkSso;
            }
            set meridianLinkSso(value: MeridianLinkSsoSettings) {
                this._meridianLinkSso = value;
            }

            private _financialCore: FinancialCore;
            get financialCore(): FinancialCore {
                return this._financialCore;
            }
            set financialCore(value: FinancialCore) {
                this._financialCore = value;
            }

            private _institution: Institution;
            get institution(): Institution {
                return this._institution;
            }
            set institution(value: Institution) {
                this._institution = value;
            }

            private _mFAQuestions: MFAQuestions;
            get mFAQuestions(): MFAQuestions {
                return this._mFAQuestions;
            }
            set mFAQuestions(value: MFAQuestions) {
                this._mFAQuestions = value;
            }

            private _stopPayment: StopPayment;
            get stopPayment(): StopPayment {
                return this._stopPayment;
            }
            set stopPayment(value: StopPayment) {
                this._stopPayment = value;
            }

            private _paydayLoan: PaydayLoan;
            get paydayLoan(): PaydayLoan {
                return this._paydayLoan;
            }
            set paydayLoan(value: PaydayLoan) {
                this._paydayLoan = value;
            }

            private _mobileConfiguration: MobileConfiguration;
            get mobileConfiguration(): MobileConfiguration {
                return this._mobileConfiguration;
            }
            set mobileConfiguration(value: MobileConfiguration) {
                this._mobileConfiguration = value;
            }

            private _omegaConfiguration: OmegaConfiguration;
            get omegaConfiguration(): OmegaConfiguration {
                return this._omegaConfiguration;
            }
            set omegaConfiguration(value: OmegaConfiguration) {
                this._omegaConfiguration = value;
            }

            private _remoteDeposit: RemoteDeposit;
            get remoteDeposit(): RemoteDeposit {
                return this._remoteDeposit;
            }
            set remoteDeposit(value: RemoteDeposit) {
                this._remoteDeposit = value;
            }

            private _addressVerificationSettings: AddressVerificationSettings;
            get addressVerificationSettings(): AddressVerificationSettings {
                return this._addressVerificationSettings;
            }
            set addressVerificationSettings(value: AddressVerificationSettings) {
                this._addressVerificationSettings = value;
            }

            private _multipleAddressesSettings: MultipleAddressesSettings;
            get multipleAddressesSettings(): MultipleAddressesSettings {
                return this._multipleAddressesSettings;
            }
            set multipleAddressesSettings(value: MultipleAddressesSettings) {
                this._multipleAddressesSettings = value;
            }

            private _passwordVerificationSettings: PasswordVerificationSettings;
            get passwordVerificationSettings(): PasswordVerificationSettings {
                return this._passwordVerificationSettings;
            }
            set passwordVerificationSettings(value: PasswordVerificationSettings) {
                this._passwordVerificationSettings = value;
            }

            private _ofxConfigurations: OfxConfigurations;
            get ofxConfigurations(): OfxConfigurations {
                return this._ofxConfigurations;
            }
            set ofxConfigurations(value: OfxConfigurations) {
                this._ofxConfigurations = value;
            }

            private _accountMaskingSettings: AccountMaskingSettings;
            get accountMaskingSettings(): AccountMaskingSettings {
                return this._accountMaskingSettings;
            }
            set accountMaskingSettings(value: AccountMaskingSettings) {
                this._accountMaskingSettings = value;
            }

            private _accountAttributesSettings: AccountAttributesSettings;
            get accountAttributesSettings(): AccountAttributesSettings {
                return this._accountAttributesSettings;
            }
            set accountAttributesSettings(value: AccountAttributesSettings) {
                this._accountAttributesSettings = value;
            }

            private _tieredAccessSettings: TieredAccessSettings;
            get tieredAccessSettings(): TieredAccessSettings {
                return this._tieredAccessSettings;
            }
            set tieredAccessSettings(value: TieredAccessSettings) {
                this._tieredAccessSettings = value;
            }

            private _cardHistorySettings: CardHistory;
            get cardHistorySettings(): CardHistory {
                return this._cardHistorySettings;
            }
            set cardHistorySettings(value: CardHistory) {
                this._cardHistorySettings = value;
            }

            private _billPaySettings: BillPaySettings;
            get billPaySettings(): BillPaySettings {
                return this._billPaySettings;
            }
            set billPaySettings(value: BillPaySettings) {
                this._billPaySettings = value;
            }

            private _targetedMarketingSettings: TargetedMarketingSettings;
            get targetedMarketingSettings(): TargetedMarketingSettings {
                return this._targetedMarketingSettings;
            }
            set targetedMarketingSettings(value: TargetedMarketingSettings) {
                this._targetedMarketingSettings = value;
            }

            private _directDepositConfiguration: DirectDepositConfiguration;
            get directDepositConfiguration(): DirectDepositConfiguration {
                return this._directDepositConfiguration;
            }
            set directDepositConfiguration(value: DirectDepositConfiguration) {
                this._directDepositConfiguration = value;
            }

            private _transfersConfiguration: Transfers;
            get transfersConfiguration(): Transfers {
                return this._transfersConfiguration;
            }
            set transfersConfiguration(value: Transfers) {
                this._transfersConfiguration = value;
            }

            private _errorMessageConfiguration: ErrorMessageConfiguration;
            get errorMessageConfiguration(): ErrorMessageConfiguration {
                return this._errorMessageConfiguration;
            }
            set errorMessageConfiguration(value: ErrorMessageConfiguration) {
                this._errorMessageConfiguration = value;
            }

            private _moneyDesktop: MoneyDesktop;
            get moneyDesktop(): MoneyDesktop {
                return this._moneyDesktop;
            }
            set moneyDesktop(value: MoneyDesktop) {
                this._moneyDesktop = value;
            }

            private _summaryControlsConfiguration: Controls;
            get summaryControlsConfiguration(): Controls {
                return this._summaryControlsConfiguration;
            }
            set summaryControlsConfiguration(value: Controls) {
                this._summaryControlsConfiguration = value;
            }

            private _savvyMoneySettings: SavvyMoneySettings;
            get savvyMoneySettings(): SavvyMoneySettings {
                return this._savvyMoneySettings;
            }
            set savvyMoneySettings(value: SavvyMoneySettings) {
                this._savvyMoneySettings = value;
            }

            private _creditScoreHistorySettings: CreditScoreHistorySettings;
            get creditScoreHistorySettings(): CreditScoreHistorySettings {
                return this._creditScoreHistorySettings;
            }
            set creditScoreHistorySettings(value: CreditScoreHistorySettings) {
                this._creditScoreHistorySettings = value;
            }

            private _historyDateSettings: HistoryDate;
            get historyDateSettings(): HistoryDate {
                return this._historyDateSettings;
            }
            set historyDateSettings(value: HistoryDate) {
                this._historyDateSettings = value;
            }

            private _accountHistory: AccountHistory;
            get accountHistory(): AccountHistory {
                return this._accountHistory;
            }
            set accountHistory(value: AccountHistory) {
                this._accountHistory = value;
            }

            private _historyShareSettings: HistoryShare;
            get historyShareSettings(): HistoryShare {
                return this._historyShareSettings;
            }
            set historyShareSettings(value: HistoryShare) {
                this._historyShareSettings = value;
            }

            private _cardlyticsWidgetSettings: CardlyticsWidget;
            get cardlyticsWidgetSettings(): CardlyticsWidget {
                return this._cardlyticsWidgetSettings;
            }
            set cardlyticsWidgetSettings(value: CardlyticsWidget) {
                this._cardlyticsWidgetSettings = value;
            }

            private _cardlyticsSettings: CardlyticsSettings;
            get cardlyticsSettings(): CardlyticsSettings {
                return this._cardlyticsSettings;
            }
            set cardlyticsSettings(value: CardlyticsSettings) {
                this._cardlyticsSettings = value;
            }

            private _cardManagementSettings: CardManagementSettings;
            get cardManagementSettings(): CardManagementSettings {
                return this._cardManagementSettings;
            }
            set cardManagementSettings(value: CardManagementSettings) {
                this._cardManagementSettings = value;
            }

            private _liveChatSettings: LiveChatSettings;
            get liveChatSettings(): LiveChatSettings {
                return this._liveChatSettings;
            }
            set liveChatSettings(value: LiveChatSettings) {
                this._liveChatSettings = value;
            }

            private _coBrowseSettings: CoBrowseSettings;
            get coBrowseSettings(): CoBrowseSettings {
                return this._coBrowseSettings;
            }
            set coBrowseSettings(value: CoBrowseSettings) {
                this._coBrowseSettings = value;
            }

            private _cUDirectLoanSsoSettings: CUDirectLoanSso;
            get cUDirectLoanSsoSettings(): CUDirectLoanSso {
                return this._cUDirectLoanSsoSettings;
            }
            set cUDirectLoanSsoSettings(value: CUDirectLoanSso) {
                this._cUDirectLoanSsoSettings = value;
            }

            private _showApplyForLoanOrCardButtonSettings: ShowApplyForLoanOrCardButton;
            get showApplyForLoanOrCardButtonSettings(): ShowApplyForLoanOrCardButton {
                return this._showApplyForLoanOrCardButtonSettings;
            }
            set showApplyForLoanOrCardButtonSettings(value: ShowApplyForLoanOrCardButton) {
                this._showApplyForLoanOrCardButtonSettings = value;
            }

            private _secureMessages: SecureMessageSettings;
            get secureMessages(): SecureMessageSettings {
                return this._secureMessages;
            }
            set secureMessages(value: SecureMessageSettings) {
                this._secureMessages = value;
            }

            private _menuItems: MenuItems;
            get menuItems(): MenuItems {
                return this._menuItems;
            }
            set menuItems(value: MenuItems) {
                this._menuItems = value;
            }

            private _estatements: Estatements;
            get estatements(): Estatements {
                return this._estatements;
            }
            set estatements(value: Estatements) {
                this._estatements = value;
            }

            private _billPayAdminMemberMenu: BillPayAdminMemberMenu;
            get billPayAdminMemberMenu(): BillPayAdminMemberMenu {
                return this._billPayAdminMemberMenu;
            }
            set billPayAdminMemberMenu(value: BillPayAdminMemberMenu) {
                this._billPayAdminMemberMenu = value;
            }

            private _alerts: Alert;
            get alerts(): Alert {
                return this._alerts;
            }
            set alerts(value: Alert) {
                this._alerts = value;
            }

            private _alexaFeatureSettings: AlexaFeature;
            get alexaFeatureSettings(): AlexaFeature {
                return this._alexaFeatureSettings;
            }
            set alexaFeatureSettings(value: AlexaFeature) {
                this._alexaFeatureSettings = value;
            }

            private _googleTagSettings: GoogleTags;
            get googleTagSettings(): GoogleTags {
                return this._googleTagSettings;
            }
            set googleTagSettings(value: GoogleTags) {
                this._googleTagSettings = value;
            }

            private _primaryAccountSecurityCode: PrimaryAccountSecurityCode;
            get primaryAccountSecurityCode(): PrimaryAccountSecurityCode {
                return this._primaryAccountSecurityCode;
            }
            set primaryAccountSecurityCode(value: PrimaryAccountSecurityCode) {
                this._primaryAccountSecurityCode = value;
            }

            private _onlineBankingApi: OnlineBankingApi;
            get onlineBankingApi(): OnlineBankingApi {
                return this._onlineBankingApi;
            }
            set onlineBankingApi(value: OnlineBankingApi) {
                this._onlineBankingApi = value;
            }

            private _checkReorder: CheckReorder;
            get checkReorder(): CheckReorder {
                return this._checkReorder;
            }
            set checkReorder(value: CheckReorder) {
                this._checkReorder = value;
            }

            private _changeAddress: ChangeAddress;
            get changeAddress(): ChangeAddress {
                return this._changeAddress;
            }
            set changeAddress(value: ChangeAddress) {
                this._changeAddress = value;
            }

            private _homeBankingLogin: HomeBankingLoginConfiguration;
            get homeBankingLogin(): HomeBankingLoginConfiguration {
                return this._homeBankingLogin;
            }
            set homeBankingLogin(value: HomeBankingLoginConfiguration) {
                this._homeBankingLogin = value;
            }

            private _passwordSettings: PasswordSettings;
            get passwordSettings(): PasswordSettings {
                return this._passwordSettings;
            }
            set passwordSettings(value: PasswordSettings) {
                this._passwordSettings = value;
            }

            private _checkImages: CheckImages;
            get checkImages(): CheckImages {
                return this._checkImages;
            }
            set checkImages(value: CheckImages) {
                this._checkImages = value;
            }

            private _payzur: Payzur;
            get payzur(): Payzur {
                return this._payzur;
            }
            set payzur(value: Payzur) {
                this._payzur = value;
            }

            private _featuresSettings: FeaturesSettings;
            get featuresSettings(): FeaturesSettings {
                return this._featuresSettings;
            }
            set featuresSettings(value: FeaturesSettings) {
                this._featuresSettings = value;
            }

            private _changeEmail: ChangeEmail;
            get changeEmail(): ChangeEmail {
                return this._changeEmail;
            }
            set changeEmail(value: ChangeEmail) {
                this._changeEmail = value;
            }

            private _changePhone: ChangePhone;
            get changePhone(): ChangePhone {
                return this._changePhone;
            }
            set changePhone(value: ChangePhone) {
                this._changePhone = value;
            }

            private _multipleEmailSettings: MultipleEmailSettings;
            get multipleEmailSettings(): MultipleEmailSettings {
                return this._multipleEmailSettings;
            }
            set multipleEmailSettings(value: MultipleEmailSettings) {
                this._multipleEmailSettings = value;
            }

            private _personPaymentSecuritySettings: PersonPaymentSecuritySettings;
            get personPaymentSecuritySettings(): PersonPaymentSecuritySettings {
                return this._personPaymentSecuritySettings;
            }
            set personPaymentSecuritySettings(value: PersonPaymentSecuritySettings) {
                this._personPaymentSecuritySettings = value;
            }

            private _ficoCreditScore: FicoCreditScore;
            get ficoCreditScore(): FicoCreditScore {
                return this._ficoCreditScore;
            }
            set ficoCreditScore(value: FicoCreditScore) {
                this._ficoCreditScore = value;
            }

            private _adaComplianceSettings: ADAComplianceSettings;
            get adaComplianceSettings(): ADAComplianceSettings {
                return this._adaComplianceSettings;
            }
            set adaComplianceSettings(value: ADAComplianceSettings) {
                this._adaComplianceSettings = value;
            }

            private _docCenterSettings: DocCenterSettings;
            get docCenterSettings(): DocCenterSettings {
                return this._docCenterSettings;
            }
            set docCenterSettings(value: DocCenterSettings) {
                this._docCenterSettings = value;
            }

            private _sMTP: SMTPSettings;
            get sMTP(): SMTPSettings {
                return this._sMTP;
            }
            set sMTP(value: SMTPSettings) {
                this._sMTP = value;
            }

            private _travelNotificationFeatureSettings: TravelNotificationFeature;
            get travelNotificationFeatureSettings(): TravelNotificationFeature {
                return this._travelNotificationFeatureSettings;
            }
            set travelNotificationFeatureSettings(value: TravelNotificationFeature) {
                this._travelNotificationFeatureSettings = value;
            }

            private _regularExpressionsFeatureSettings: RegularExpressionsFeature;
            get regularExpressionsFeatureSettings(): RegularExpressionsFeature {
                return this._regularExpressionsFeatureSettings;
            }
            set regularExpressionsFeatureSettings(value: RegularExpressionsFeature) {
                this._regularExpressionsFeatureSettings = value;
            }

            private _membershipFeatureSettings: MembershipFeature;
            get membershipFeatureSettings(): MembershipFeature {
                return this._membershipFeatureSettings;
            }
            set membershipFeatureSettings(value: MembershipFeature) {
                this._membershipFeatureSettings = value;
            }

            private _reCaptchaSettings: ReCaptchaSettings;
            get reCaptchaSettings(): ReCaptchaSettings {
                return this._reCaptchaSettings;
            }
            set reCaptchaSettings(value: ReCaptchaSettings) {
                this._reCaptchaSettings = value;
            }

            private _themes: Themes;
            get themes(): Themes {
                return this._themes;
            }
            set themes(value: Themes) {
                this._themes = value;
            }

            private _auditLoggingSettings: AuditLoggingFeature;
            get auditLoggingSettings(): AuditLoggingFeature {
                return this._auditLoggingSettings;
            }
            set auditLoggingSettings(value: AuditLoggingFeature) {
                this._auditLoggingSettings = value;
            }

            private _enrollmentSettings: EnrollmentFeature;
            get enrollmentSettings(): EnrollmentFeature {
                return this._enrollmentSettings;
            }
            set enrollmentSettings(value: EnrollmentFeature) {
                this._enrollmentSettings = value;
            }

            private _checkingRewardsRealTimeRedemption: RealTimeRedemption;
            get checkingRewardsRealTimeRedemption(): RealTimeRedemption {
                return this._checkingRewardsRealTimeRedemption;
            }
            set checkingRewardsRealTimeRedemption(value: RealTimeRedemption) {
                this._checkingRewardsRealTimeRedemption = value;
            }

            private _businessBanking: BusinessBanking;
            get businessBanking(): BusinessBanking {
                return this._businessBanking;
            }
            set businessBanking(value: BusinessBanking) {
                this._businessBanking = value;
            }

            private _psiServicesSettings: PsiServicesSettings;
            get psiServicesSettings(): PsiServicesSettings {
                return this._psiServicesSettings;
            }
            set psiServicesSettings(value: PsiServicesSettings) {
                this._psiServicesSettings = value;
            }

            private _pscuLogFileTransformService: PscuLogFileTransformServiceSettings;
            get pscuLogFileTransformService(): PscuLogFileTransformServiceSettings {
                return this._pscuLogFileTransformService;
            }
            set pscuLogFileTransformService(value: PscuLogFileTransformServiceSettings) {
                this._pscuLogFileTransformService = value;
            }

            private _verafinFileBatchServiceSettings: VerafinFileBatchServiceSettings;
            get verafinFileBatchServiceSettings(): VerafinFileBatchServiceSettings {
                return this._verafinFileBatchServiceSettings;
            }
            set verafinFileBatchServiceSettings(value: VerafinFileBatchServiceSettings) {
                this._verafinFileBatchServiceSettings = value;
            }

            private _promotions: Promotions;
            get promotions(): Promotions {
                return this._promotions;
            }
            set promotions(value: Promotions) {
                this._promotions = value;
            }

            private _wireTransfer: WireTransferFeatures;
            get wireTransfer(): WireTransferFeatures {
                return this._wireTransfer;
            }
            set wireTransfer(value: WireTransferFeatures) {
                this._wireTransfer = value;
            }

            private _removeMemberFromOnlineBanking: RemoveMemberFromOnlineBanking;
            get removeMemberFromOnlineBanking(): RemoveMemberFromOnlineBanking {
                return this._removeMemberFromOnlineBanking;
            }
            set removeMemberFromOnlineBanking(value: RemoveMemberFromOnlineBanking) {
                this._removeMemberFromOnlineBanking = value;
            }

            private _connectNativeSettings: ConnectNativeSettings;
            get connectNativeSettings(): ConnectNativeSettings {
                return this._connectNativeSettings;
            }
            set connectNativeSettings(value: ConnectNativeSettings) {
                this._connectNativeSettings = value;
            }

            private _overdraftProtectionSettings: OverdraftProtectionSettings;
            get overdraftProtectionSettings(): OverdraftProtectionSettings {
                return this._overdraftProtectionSettings;
            }
            set overdraftProtectionSettings(value: OverdraftProtectionSettings) {
                this._overdraftProtectionSettings = value;
            }

            private _pageDisplaySettings: PageDisplaySettings;
            get pageDisplaySettings(): PageDisplaySettings {
                return this._pageDisplaySettings;
            }
            set pageDisplaySettings(value: PageDisplaySettings) {
                this._pageDisplaySettings = value;
            }

            private _betterLobby: BetterLobbySettings;
            get betterLobby(): BetterLobbySettings {
                return this._betterLobby;
            }
            set betterLobby(value: BetterLobbySettings) {
                this._betterLobby = value;
            }

            private _monitoring: MonitoringSettings;
            get monitoring(): MonitoringSettings {
                return this._monitoring;
            }
            set monitoring(value: MonitoringSettings) {
                this._monitoring = value;
            }

            private _login: LoginSettings;
            get login(): LoginSettings {
                return this._login;
            }
            set login(value: LoginSettings) {
                this._login = value;
            }

            private _publicApi: PublicApiSettings;
            get publicApi(): PublicApiSettings {
                return this._publicApi;
            }
            set publicApi(value: PublicApiSettings) {
                this._publicApi = value;
            }

            private _smsSecurityCode: SmsSecurityCodeSettings;
            get smsSecurityCode(): SmsSecurityCodeSettings {
                return this._smsSecurityCode;
            }
            set smsSecurityCode(value: SmsSecurityCodeSettings) {
                this._smsSecurityCode = value;
            }

            private _comm100Settings: Comm100;
            get comm100Settings(): Comm100 {
                return this._comm100Settings;
            }
            set comm100Settings(value: Comm100) {
                this._comm100Settings = value;
            }

            private _miniOao: MiniOaoSettings;
            get miniOao(): MiniOaoSettings {
                return this._miniOao;
            }
            set miniOao(value: MiniOaoSettings) {
                this._miniOao = value;
            }

            private _widgetSettings: WidgetSettings;
            get widgetSettings(): WidgetSettings {
                return this._widgetSettings;
            }
            set widgetSettings(value: WidgetSettings) {
                this._widgetSettings = value;
            }

            private _themeDeployment: ThemeDeployment;
            get themeDeployment(): ThemeDeployment {
                return this._themeDeployment;
            }
            set themeDeployment(value: ThemeDeployment) {
                this._themeDeployment = value;
            }

            private _goToMyCard: GoToMyCard;
            get goToMyCard(): GoToMyCard {
                return this._goToMyCard;
            }
            set goToMyCard(value: GoToMyCard) {
                this._goToMyCard = value;
            }

            private _integratedEnrollment: IntegratedEnrollmentSettings;
            get integratedEnrollment(): IntegratedEnrollmentSettings {
                return this._integratedEnrollment;
            }
            set integratedEnrollment(value: IntegratedEnrollmentSettings) {
                this._integratedEnrollment = value;
            }

            private _marketing: Marketing;
            get marketing(): Marketing {
                return this._marketing;
            }
            set marketing(value: Marketing) {
                this._marketing = value;
            }

            private _gliaSettings: GliaSettings;
            get gliaSettings(): GliaSettings {
                return this._gliaSettings;
            }
            set gliaSettings(value: GliaSettings) {
                this._gliaSettings = value;
            }

            private _bokuSettings: BokuSettings;
            get bokuSettings(): BokuSettings {
                return this._bokuSettings;
            }
            set bokuSettings(value: BokuSettings) {
                this._bokuSettings = value;
            }

            private _usernameSettings: UsernameSettings;
            get usernameSettings(): UsernameSettings {
                return this._usernameSettings;
            }
            set usernameSettings(value: UsernameSettings) {
                this._usernameSettings = value;
            }

            private _beneficiarySettings: BeneficiarySettings;
            get beneficiarySettings(): BeneficiarySettings {
                return this._beneficiarySettings;
            }
            set beneficiarySettings(value: BeneficiarySettings) {
                this._beneficiarySettings = value;
            }

            private _creditCardSettings: CreditCardSettings;
            get creditCardSettings(): CreditCardSettings {
                return this._creditCardSettings;
            }
            set creditCardSettings(value: CreditCardSettings) {
                this._creditCardSettings = value;
            }

            private _secureFormsDesignerSettings: SecureFormsDesignerSettings;
            get secureFormsDesignerSettings(): SecureFormsDesignerSettings {
                return this._secureFormsDesignerSettings;
            }
            set secureFormsDesignerSettings(value: SecureFormsDesignerSettings) {
                this._secureFormsDesignerSettings = value;
            }

            private _restrictedWords: RestrictedWordSettings;
            get restrictedWords(): RestrictedWordSettings {
                return this._restrictedWords;
            }
            set restrictedWords(value: RestrictedWordSettings) {
                this._restrictedWords = value;
            }

            private _qcashLoanApplication: QcashLoanApplicationSsoSettings;
            get qcashLoanApplication(): QcashLoanApplicationSsoSettings {
                return this._qcashLoanApplication;
            }
            set qcashLoanApplication(value: QcashLoanApplicationSsoSettings) {
                this._qcashLoanApplication = value;
            }

            private _zelleSettings: ZelleSettings;
            get zelleSettings(): ZelleSettings {
                return this._zelleSettings;
            }
            set zelleSettings(value: ZelleSettings) {
                this._zelleSettings = value;
            }

            private _synergyEstatementsSettings: SynergyEstatementsSettings;
            get synergyEstatementsSettings(): SynergyEstatementsSettings {
                return this._synergyEstatementsSettings;
            }
            set synergyEstatementsSettings(value: SynergyEstatementsSettings) {
                this._synergyEstatementsSettings = value;
            }

            private _imiMobileTextBankingSettings: ImiMobileTextBankingSettings;
            get imiMobileTextBankingSettings(): ImiMobileTextBankingSettings {
                return this._imiMobileTextBankingSettings;
            }
            set imiMobileTextBankingSettings(value: ImiMobileTextBankingSettings) {
                this._imiMobileTextBankingSettings = value;
            }

            private _ncpEstatements: NcpEstatements;
            get ncpEstatements(): NcpEstatements {
                return this._ncpEstatements;
            }
            set ncpEstatements(value: NcpEstatements) {
                this._ncpEstatements = value;
            }

            private _infoImageEstatementsSettings: InfoImageEstatementsSettings;
            get infoImageEstatementsSettings(): InfoImageEstatementsSettings {
                return this._infoImageEstatementsSettings;
            }
            set infoImageEstatementsSettings(value: InfoImageEstatementsSettings) {
                this._infoImageEstatementsSettings = value;
            }

            private _talkativeChatSettings: TalkativeChatSettings;
            get talkativeChatSettings(): TalkativeChatSettings {
                return this._talkativeChatSettings;
            }
            set talkativeChatSettings(value: TalkativeChatSettings) {
                this._talkativeChatSettings = value;
            }

            private _webApiEstatementsSettings: WebApiEstatementsSettings;
            get webApiEstatementsSettings(): WebApiEstatementsSettings {
                return this._webApiEstatementsSettings;
            }
            set webApiEstatementsSettings(value: WebApiEstatementsSettings) {
                this._webApiEstatementsSettings = value;
            }

            private _discountTicketsSettings: DiscountTicketsSettings;
            get discountTicketsSettings(): DiscountTicketsSettings {
                return this._discountTicketsSettings;
            }
            set discountTicketsSettings(value: DiscountTicketsSettings) {
                this._discountTicketsSettings = value;
            }

            private _appInfoSettings: AppInfoSettings;
            get appInfoSettings(): AppInfoSettings {
                return this._appInfoSettings;
            }
            set appInfoSettings(value: AppInfoSettings) {
                this._appInfoSettings = value;
            }

            private _outOfBandAuthentication: OutOfBandAuthentication;
            get outOfBandAuthentication(): OutOfBandAuthentication {
                return this._outOfBandAuthentication;
            }
            set outOfBandAuthentication(value: OutOfBandAuthentication) {
                this._outOfBandAuthentication = value;
            }

            private _multiAccountAccess: MultiAccountAccess;
            get multiAccountAccess(): MultiAccountAccess {
                return this._multiAccountAccess;
            }
            set multiAccountAccess(value: MultiAccountAccess) {
                this._multiAccountAccess = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "Settings.ConfigProvider", value: this._configProvider, dataType: 'iapplicationconfigurationprovider', label: "Config Provider" },
                { key: "Settings.Application", value: this._application, dataType: 'applicationconfiguration', label: "Application" },
                { key: "Settings.AchFileService", value: this._achFileService, dataType: 'achfileservice', label: "Ach File Service" },
                { key: "Settings.LinkedAccount", value: this._linkedAccount, dataType: 'linkedaccount', label: "Linked Account" },
                { key: "Settings.Account", value: this._account, dataType: 'accountsettings', label: "Account" },
                { key: "Settings.Admin", value: this._admin, dataType: 'adminsettings', label: "Admin" },
                { key: "Settings.Loans", value: this._loans, dataType: 'loansettings', label: "Loans" },
                { key: "Settings.LoanOffers", value: this._loanOffers, dataType: 'loanoffersettings', label: "Loan Offers" },
                { key: "Settings.MeridianLinkSso", value: this._meridianLinkSso, dataType: 'meridianlinkssosettings', label: "Meridian Link Sso" },
                { key: "Settings.FinancialCore", value: this._financialCore, dataType: 'financialcore', label: "Financial Core" },
                { key: "Settings.Institution", value: this._institution, dataType: 'institution.institution', label: "Institution" },
                { key: "Settings.MFAQuestions", value: this._mFAQuestions, dataType: 'institution.mfaquestions', label: "M F A Questions" },
                { key: "Settings.StopPayment", value: this._stopPayment, dataType: 'services.stoppayment', label: "Stop Payment" },
                { key: "Settings.PaydayLoan", value: this._paydayLoan, dataType: 'paydayloan', label: "Payday Loan" },
                { key: "Settings.MobileConfiguration", value: this._mobileConfiguration, dataType: 'mobileconfiguration', label: "Mobile Configuration" },
                { key: "Settings.OmegaConfiguration", value: this._omegaConfiguration, dataType: 'omegaconfiguration', label: "Omega Configuration" },
                { key: "Settings.RemoteDeposit", value: this._remoteDeposit, dataType: 'remotedeposit.remotedeposit', label: "Remote Deposit" },
                { key: "Settings.AddressVerificationSettings", value: this._addressVerificationSettings, dataType: 'addressverificationsettings', label: "Address Verification Settings" },
                { key: "Settings.MultipleAddressesSettings", value: this._multipleAddressesSettings, dataType: 'multipleaddressessettings', label: "Multiple Addresses Settings" },
                { key: "Settings.PasswordVerificationSettings", value: this._passwordVerificationSettings, dataType: 'passwordverificationsettings', label: "Password Verification Settings" },
                { key: "Settings.OfxConfigurations", value: this._ofxConfigurations, dataType: 'ofxconfigurations.ofxconfigurations', label: "Ofx Configurations" },
                { key: "Settings.AccountMaskingSettings", value: this._accountMaskingSettings, dataType: 'accountmaskingsettings', label: "Account Masking Settings" },
                { key: "Settings.AccountAttributesSettings", value: this._accountAttributesSettings, dataType: 'accountattributessettings', label: "Account Attributes Settings" },
                { key: "Settings.TieredAccessSettings", value: this._tieredAccessSettings, dataType: 'tieredaccesssettings', label: "Tiered Access Settings" },
                { key: "Settings.CardHistorySettings", value: this._cardHistorySettings, dataType: 'cardhistory', label: "Card History Settings" },
                { key: "Settings.BillPaySettings", value: this._billPaySettings, dataType: 'billpaysettings', label: "Bill Pay Settings" },
                { key: "Settings.TargetedMarketingSettings", value: this._targetedMarketingSettings, dataType: 'targetedmarketingsettings', label: "Targeted Marketing Settings" },
                { key: "Settings.DirectDepositConfiguration", value: this._directDepositConfiguration, dataType: 'directdepositconfiguration', label: "Direct Deposit Configuration" },
                { key: "Settings.TransfersConfiguration", value: this._transfersConfiguration, dataType: 'transfers', label: "Transfers Configuration" },
                { key: "Settings.ErrorMessageConfiguration", value: this._errorMessageConfiguration, dataType: 'errormessageconfiguration', label: "Error Message Configuration" },
                { key: "Settings.MoneyDesktop", value: this._moneyDesktop, dataType: 'moneydesktop.moneydesktop', label: "Money Desktop" },
                { key: "Settings.SummaryControlsConfiguration", value: this._summaryControlsConfiguration, dataType: 'summary.controls', label: "Summary Controls Configuration" },
                { key: "Settings.SavvyMoneySettings", value: this._savvyMoneySettings, dataType: 'savvymoneysettings', label: "Savvy Money Settings" },
                { key: "Settings.CreditScoreHistorySettings", value: this._creditScoreHistorySettings, dataType: 'creditscorehistorysettings', label: "Credit Score History Settings" },
                { key: "Settings.HistoryDateSettings", value: this._historyDateSettings, dataType: 'historydate', label: "History Date Settings" },
                { key: "Settings.AccountHistory", value: this._accountHistory, dataType: 'accounthistory', label: "Account History" },
                { key: "Settings.HistoryShareSettings", value: this._historyShareSettings, dataType: 'historyshare', label: "History Share Settings" },
                { key: "Settings.CardlyticsWidgetSettings", value: this._cardlyticsWidgetSettings, dataType: 'cardlyticswidget', label: "Cardlytics Widget Settings" },
                { key: "Settings.CardlyticsSettings", value: this._cardlyticsSettings, dataType: 'cardlyticssettings', label: "Cardlytics Settings" },
                { key: "Settings.CardManagementSettings", value: this._cardManagementSettings, dataType: 'cardmanagementsettings', label: "Card Management Settings" },
                { key: "Settings.LiveChatSettings", value: this._liveChatSettings, dataType: 'livechatsettings', label: "Live Chat Settings" },
                { key: "Settings.CoBrowseSettings", value: this._coBrowseSettings, dataType: 'cobrowsesettings', label: "Co Browse Settings" },
                { key: "Settings.CUDirectLoanSsoSettings", value: this._cUDirectLoanSsoSettings, dataType: 'cudirectloansso', label: "C U Direct Loan Sso Settings" },
                { key: "Settings.ShowApplyForLoanOrCardButtonSettings", value: this._showApplyForLoanOrCardButtonSettings, dataType: 'showapplyforloanorcardbutton', label: "Show Apply For Loan Or Card Button Settings" },
                { key: "Settings.SecureMessages", value: this._secureMessages, dataType: 'securemessagesettings', label: "Secure Messages" },
                { key: "Settings.MenuItems", value: this._menuItems, dataType: 'menuitems', label: "Menu Items" },
                { key: "Settings.Estatements", value: this._estatements, dataType: 'estatements.estatements', label: "Estatements" },
                { key: "Settings.BillPayAdminMemberMenu", value: this._billPayAdminMemberMenu, dataType: 'billpayadminmembermenu', label: "Bill Pay Admin Member Menu" },
                { key: "Settings.Alerts", value: this._alerts, dataType: 'alert', label: "Alerts" },
                { key: "Settings.AlexaFeatureSettings", value: this._alexaFeatureSettings, dataType: 'alexafeature', label: "Alexa Feature Settings" },
                { key: "Settings.GoogleTagSettings", value: this._googleTagSettings, dataType: 'googletags', label: "Google Tag Settings" },
                { key: "Settings.PrimaryAccountSecurityCode", value: this._primaryAccountSecurityCode, dataType: 'primaryaccountsecuritycode.primaryaccountsecuritycode', label: "Primary Account Security Code" },
                { key: "Settings.OnlineBankingApi", value: this._onlineBankingApi, dataType: 'onlinebankingapi', label: "Online Banking Api" },
                { key: "Settings.CheckReorder", value: this._checkReorder, dataType: 'checkreorder.checkreorder', label: "Check Reorder" },
                { key: "Settings.ChangeAddress", value: this._changeAddress, dataType: 'changeaddress', label: "Change Address" },
                { key: "Settings.HomeBankingLogin", value: this._homeBankingLogin, dataType: 'homebankingloginconfiguration', label: "Home Banking Login" },
                { key: "Settings.PasswordSettings", value: this._passwordSettings, dataType: 'passwordsettings', label: "Password Settings" },
                { key: "Settings.CheckImages", value: this._checkImages, dataType: 'checkimages.checkimages', label: "Check Images" },
                { key: "Settings.Payzur", value: this._payzur, dataType: 'payzur', label: "Payzur" },
                { key: "Settings.FeaturesSettings", value: this._featuresSettings, dataType: 'featuressettings', label: "Features Settings" },
                { key: "Settings.ChangeEmail", value: this._changeEmail, dataType: 'changeemail', label: "Change Email" },
                { key: "Settings.ChangePhone", value: this._changePhone, dataType: 'changephone', label: "Change Phone" },
                { key: "Settings.MultipleEmailSettings", value: this._multipleEmailSettings, dataType: 'multipleemailsettings', label: "Multiple Email Settings" },
                { key: "Settings.PersonPaymentSecuritySettings", value: this._personPaymentSecuritySettings, dataType: 'personpaymentsecuritysettings', label: "Person Payment Security Settings" },
                { key: "Settings.FicoCreditScore", value: this._ficoCreditScore, dataType: 'fico.ficocreditscore', label: "Fico Credit Score" },
                { key: "Settings.adaComplianceSettings", value: this._adaComplianceSettings, dataType: 'adacompliancesettings', label: "Ada Compliance Settings" },
                { key: "Settings.DocCenterSettings", value: this._docCenterSettings, dataType: 'doccentersettings', label: "Doc Center Settings" },
                { key: "Settings.SMTP", value: this._sMTP, dataType: 'smtpsettings', label: "S M T P" },
                { key: "Settings.TravelNotificationFeatureSettings", value: this._travelNotificationFeatureSettings, dataType: 'travelnotificationfeature', label: "Travel Notification Feature Settings" },
                { key: "Settings.RegularExpressionsFeatureSettings", value: this._regularExpressionsFeatureSettings, dataType: 'regularexpressionsfeature', label: "Regular Expressions Feature Settings" },
                { key: "Settings.MembershipFeatureSettings", value: this._membershipFeatureSettings, dataType: 'membershipfeature', label: "Membership Feature Settings" },
                { key: "Settings.ReCaptchaSettings", value: this._reCaptchaSettings, dataType: 'recaptchasettings', label: "Re Captcha Settings" },
                { key: "Settings.Themes", value: this._themes, dataType: 'themes.themes', label: "Themes" },
                { key: "Settings.AuditLoggingSettings", value: this._auditLoggingSettings, dataType: 'auditloggingfeature', label: "Audit Logging Settings" },
                { key: "Settings.EnrollmentSettings", value: this._enrollmentSettings, dataType: 'enrollmentfeature', label: "Enrollment Settings" },
                { key: "Settings.CheckingRewardsRealTimeRedemption", value: this._checkingRewardsRealTimeRedemption, dataType: 'realtimeredemption', label: "Checking Rewards Real Time Redemption" },
                { key: "Settings.BusinessBanking", value: this._businessBanking, dataType: 'businessbanking.businessbanking', label: "Business Banking" },
                { key: "Settings.PsiServicesSettings", value: this._psiServicesSettings, dataType: 'psiservicessettings', label: "Psi Services Settings" },
                { key: "Settings.PscuLogFileTransformService", value: this._pscuLogFileTransformService, dataType: 'psculogfiletransformservicesettings', label: "Pscu Log File Transform Service" },
                { key: "Settings.VerafinFileBatchServiceSettings", value: this._verafinFileBatchServiceSettings, dataType: 'verafinfilebatchservicesettings', label: "Verafin File Batch Service Settings" },
                { key: "Settings.Promotions", value: this._promotions, dataType: 'promotions.promotions', label: "Promotions" },
                { key: "Settings.WireTransfer", value: this._wireTransfer, dataType: 'wiretransferfeatures', label: "Wire Transfer" },
                { key: "Settings.RemoveMemberFromOnlineBanking", value: this._removeMemberFromOnlineBanking, dataType: 'removememberfromonlinebanking', label: "Remove Member From Online Banking" },
                { key: "Settings.ConnectNativeSettings", value: this._connectNativeSettings, dataType: 'connectnativesettings', label: "Connect Native Settings" },
                { key: "Settings.OverdraftProtectionSettings", value: this._overdraftProtectionSettings, dataType: 'overdraftprotectionsettings', label: "Overdraft Protection Settings" },
                { key: "Settings.PageDisplaySettings", value: this._pageDisplaySettings, dataType: 'pagedisplaysettings', label: "Page Display Settings" },
                { key: "Settings.BetterLobby", value: this._betterLobby, dataType: 'betterlobbysettings', label: "Better Lobby" },
                { key: "Settings.Monitoring", value: this._monitoring, dataType: 'monitoringsettings', label: "Monitoring" },
                { key: "Settings.Login", value: this._login, dataType: 'loginsettings', label: "Login" },
                { key: "Settings.PublicApi", value: this._publicApi, dataType: 'publicapisettings', label: "Public Api" },
                { key: "Settings.SmsSecurityCode", value: this._smsSecurityCode, dataType: 'smssecuritycodesettings', label: "Sms Security Code" },
                { key: "Settings.Comm100Settings", value: this._comm100Settings, dataType: 'comm100', label: "Comm100 Settings" },
                { key: "Settings.MiniOao", value: this._miniOao, dataType: 'minioaosettings', label: "Mini Oao" },
                { key: "Settings.WidgetSettings", value: this._widgetSettings, dataType: 'widgetsettings', label: "Widget Settings" },
                { key: "Settings.ThemeDeployment", value: this._themeDeployment, dataType: 'themedeployment', label: "Theme Deployment" },
                { key: "Settings.GoToMyCard", value: this._goToMyCard, dataType: 'gotomycard', label: "Go To My Card" },
                { key: "Settings.IntegratedEnrollment", value: this._integratedEnrollment, dataType: 'integratedenrollmentsettings', label: "Integrated Enrollment" },
                { key: "Settings.Marketing", value: this._marketing, dataType: 'marketing.marketing', label: "Marketing" },
                { key: "Settings.GliaSettings", value: this._gliaSettings, dataType: 'gliasettings', label: "Glia Settings" },
                { key: "Settings.BokuSettings", value: this._bokuSettings, dataType: 'bokusettings', label: "Boku Settings" },
                { key: "Settings.UsernameSettings", value: this._usernameSettings, dataType: 'usernamesettings', label: "Username Settings" },
                { key: "Settings.BeneficiarySettings", value: this._beneficiarySettings, dataType: 'beneficiarysettings', label: "Beneficiary Settings" },
                { key: "Settings.CreditCardSettings", value: this._creditCardSettings, dataType: 'creditcardsettings', label: "Credit Card Settings" },
                { key: "Settings.SecureFormsDesignerSettings", value: this._secureFormsDesignerSettings, dataType: 'secureformsdesignersettings', label: "Secure Forms Designer Settings" },
                { key: "Settings.RestrictedWords", value: this._restrictedWords, dataType: 'restrictedwordsettings', label: "Restricted Words" },
                { key: "Settings.QcashLoanApplication", value: this._qcashLoanApplication, dataType: 'qcashloanapplicationssosettings', label: "Qcash Loan Application" },
                { key: "Settings.ZelleSettings", value: this._zelleSettings, dataType: 'zellesettings', label: "Zelle Settings" },
                { key: "Settings.SynergyEstatementsSettings", value: this._synergyEstatementsSettings, dataType: 'synergyestatementssettings', label: "Synergy Estatements Settings" },
                { key: "Settings.ImiMobileTextBankingSettings", value: this._imiMobileTextBankingSettings, dataType: 'imimobiletextbankingsettings', label: "Imi Mobile Text Banking Settings" },
                { key: "Settings.NcpEstatements", value: this._ncpEstatements, dataType: 'ncpestatements', label: "Ncp Estatements" },
                { key: "Settings.InfoImageEstatementsSettings", value: this._infoImageEstatementsSettings, dataType: 'infoimageestatementssettings', label: "Info Image Estatements Settings" },
                { key: "Settings.TalkativeChatSettings", value: this._talkativeChatSettings, dataType: 'talkativechatsettings', label: "Talkative Chat Settings" },
                { key: "Settings.WebApiEstatementsSettings", value: this._webApiEstatementsSettings, dataType: 'webapiestatementssettings', label: "Web Api Estatements Settings" },
                { key: "Settings.DiscountTicketsSettings", value: this._discountTicketsSettings, dataType: 'discountticketssettings', label: "Discount Tickets Settings" },
                { key: "Settings.AppInfoSettings", value: this._appInfoSettings, dataType: 'appinfosettings.appinfosettings', label: "App Info Settings" },
                { key: "Settings.OutOfBandAuthentication", value: this._outOfBandAuthentication, dataType: 'outofbandauthentication', label: "Out Of Band Authentication" },
                { key: "Settings.MultiAccountAccess", value: this._multiAccountAccess, dataType: 'multiaccountaccess', label: "Multi Account Access" },
            ];
        }

}