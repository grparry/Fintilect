using System;
using System.Collections;
using System.Collections.Generic;
using NLog;
using Psi.Business.ServiceContracts.RequestResponse.Configuration;
using Psi.Data.Models.ClientConfigurationModels.Account;
using Psi.Data.Models.ClientConfigurationModels.AchService;
using Psi.Data.Models.ClientConfigurationModels.Address;
using Psi.Data.Models.ClientConfigurationModels.ADACompliance;
using Psi.Data.Models.ClientConfigurationModels.Alerts;
using Psi.Data.Models.ClientConfigurationModels.Alexa;
using Psi.Data.Models.ClientConfigurationModels.Application;
using Psi.Data.Models.ClientConfigurationModels.Authentication;
using Psi.Data.Models.ClientConfigurationModels.Beneficiary;
using Psi.Data.Models.ClientConfigurationModels.BillPay;
using Psi.Data.Models.ClientConfigurationModels.Cardlytics;
using Psi.Data.Models.ClientConfigurationModels.CardManagement;
using Psi.Data.Models.ClientConfigurationModels.DirectDeposit;
using Psi.Data.Models.ClientConfigurationModels.Email;
using Psi.Data.Models.ClientConfigurationModels.ErrorMessages;
using Psi.Data.Models.ClientConfigurationModels.Features;
using Psi.Data.Models.ClientConfigurationModels.FinancialCores;
using Psi.Data.Models.ClientConfigurationModels.Google;
using Psi.Data.Models.ClientConfigurationModels.History;
using Psi.Data.Models.ClientConfigurationModels.HomeBankingLogin;
using Psi.Data.Models.ClientConfigurationModels.Login;
using Psi.Data.Models.ClientConfigurationModels.CoBrowse;
using Psi.Data.Models.ClientConfigurationModels.LoanOffers;
using Psi.Data.Models.ClientConfigurationModels.Loans;
using Psi.Data.Models.ClientConfigurationModels.LoanSSO;
using Psi.Data.Models.ClientConfigurationModels.Membership;
using Psi.Data.Models.ClientConfigurationModels.Menu;
using Psi.Data.Models.ClientConfigurationModels.MeridianLinkSso;
using Psi.Data.Models.ClientConfigurationModels.MobileConfigurations;
using Psi.Data.Models.ClientConfigurationModels.PasswordVerification;
using Psi.Data.Models.ClientConfigurationModels.PaydayLoans;
using Psi.Data.Models.ClientConfigurationModels.PersonPayments;
using Psi.Data.Models.ClientConfigurationModels.PublicApi;
using Psi.Data.Models.ClientConfigurationModels.RegularExpressions;
using Psi.Data.Models.ClientConfigurationModels.RestrictedWords;
using Psi.Data.Models.ClientConfigurationModels.SavvyMoney;
using Psi.Data.Models.ClientConfigurationModels.SecureCommunication;
using Psi.Data.Models.ClientConfigurationModels.SMTP;
using Psi.Data.Models.ClientConfigurationModels.TargetedMarketing;
using Psi.Data.Models.ClientConfigurationModels.TieredAccessConfigurations;
using Psi.Data.Models.ClientConfigurationModels.TravelNotification;
using Psi.Data.Models.ClientConfigurationModels.AuditLogging;
using Psi.Data.Models.ClientConfigurationModels.CheckingRewards;
using Psi.Data.Models.ClientConfigurationModels.Enrollment;
using Psi.Data.Models.ClientConfigurationModels.Admin;
using Psi.Data.Models.ClientConfigurationModels.Application.Omega;
using Psi.Data.Models.ClientConfigurationModels.BetterLobby;
using Psi.Data.Models.ClientConfigurationModels.Boku;
using Psi.Data.Models.ClientConfigurationModels.ConnectNative;
using Psi.Data.Models.ClientConfigurationModels.Monitoring;
using Psi.Data.Models.ClientConfigurationModels.PageDisplay;
using Psi.Data.Models.ClientConfigurationModels.WindowsService;
using Psi.Data.Models.ClientConfigurationModels.WireTransfer;
using Psi.Data.Models.ClientConfigurationModels.OverdraftProtection;
using Psi.Data.Models.ClientConfigurationModels.SmsSecurityCode;
using Psi.Data.Models.ClientConfigurationModels.Chat;
using Psi.Data.Models.ClientConfigurationModels.CreditCards;
using Psi.Data.Models.ClientConfigurationModels.CreditScoreHistory;
using Psi.Data.Models.ClientConfigurationModels.MiniOao;
using Psi.Data.Models.ClientConfigurationModels.Deployment;
using Psi.Data.Models.ClientConfigurationModels.Estatements;
using Psi.Data.Models.ClientConfigurationModels.ImiMobileTextBanking;
using Psi.Data.Models.ClientConfigurationModels.InfoImageEstatements;
using Psi.Data.Models.ClientConfigurationModels.IntegratedEnrollment;
using Psi.Data.Models.ClientConfigurationModels.QcashLoanApplication;
using Psi.Data.Models.ClientConfigurationModels.Widgets;
using Psi.Data.Models.ClientConfigurationModels.SecureFormsDesigner;
using Psi.Data.Models.ClientConfigurationModels.SynergyEstatements;
using Psi.Data.Models.Domain.ApplicationConfigurationSettings;
using Psi.Packages.ApplicationConfiguration;
using Psi.Data.Models.ClientConfigurationModels.CustomPages;
using Psi.Data.Models.ClientConfigurationModels.PhoneNumber;

namespace Psi.Data.Models.ClientConfigurationModels
{

    public class Settings
    {
        public IApplicationConfigurationProvider ConfigProvider { get; }
        private readonly ISettingsBase _settingsBase;
        private FinancialCore _financialCore;
        private Institution.Institution _institution;
        private Institution.MFAQuestions _mfaQuestions;
        private Services.StopPayment _stopPayment;
        private PaydayLoan _paydayLoan;
        private MobileConfiguration _mobileConfiguration;
        private OmegaConfiguration _omegaConfiguration;
        private RemoteDeposit.RemoteDeposit _remoteDeposit;
        private AddressVerificationSettings _addressVerificationSettings;
        private MultipleAddressesSettings _multipleAddressesSettings;
        private PasswordVerificationSettings _passwordVerificationSettings;
        private OfxConfigurations.OfxConfigurations _ofxConfigurations;
        private AccountMaskingSettings _accountMaskingSettings;
        private AccountAttributesSettings _accountAttributesSettings;
        private TieredAccessSettings _tieredAccessConfigurations;
        private AccountSettings _accountSettings;
        private LoanSettings _loanSettings;
        private LoanOfferSettings _loanOfferSettings;
        private MeridianLinkSsoSettings _meridianLinkSsoSettings;
        private CardHistory _cardHistory;
        private BillPaySettings _billPaySettings;
        private TargetedMarketingSettings _targetedMarketingSettings;
        private DirectDepositConfiguration _directDepositConfiguration;
        private Transfers _transfersConfiguration;
        private ErrorMessageConfiguration _errorMessageConfiguration;
        private MoneyDesktop.MoneyDesktop _moneyDesktop;
        private Summary.Controls _summaryControlsConfiguration;
        private SavvyMoneySettings _savvyMoneySettings;
        private CreditScoreHistorySettings _creditScoreHistorySettings;
        private HistoryDate _historyDate;
        private AccountHistory _accountHistory;
        private HistoryShare _historyShare;
        private CardlyticsWidget _cardlyticsWidget;
        private LiveChatSettings _liveChatSettings;
        private CoBrowseSettings _coBrowseSettings;
        private CardManagementSettings _cardManagementSettings;
        private CUDirectLoanSso _cuDirectLoanSsoSettings;
        private SecureMessageSettings _secureMessageSettings;
        private MenuItems _menuItems;
        private Estatements.Estatements _estatements;
        private BillPayAdminMemberMenu _billPayAdminMemberMenu;
        private Alert _alerts;
        private OnlineBankingApi _onlineBankingApi;
        private ShowApplyForLoanOrCardButton _showApplyForLoanOrCardButtonSettings;
        private GoogleTags _googleTagsSettings;
        private AlexaFeature _alexaSettings;
        private PrimaryAccountSecurityCode.PrimaryAccountSecurityCode _primaryAccountSecurityCode;
        private HomeBankingLoginConfiguration _homeBankingLoginConfiguration;
        private CheckReorder.CheckReorder _checkReorder;
        private ChangeAddress _changeAddress;
        private PasswordSettings _passwordSettings;
        private CheckImages.CheckImages _checkImages;
        private Payzur _payzur;
        private FeaturesSettings _featuresSettings;
        private ChangeEmail _changeEmail;
        private ChangePhone _changePhone;
        private MultipleEmailSettings _multipleEmailSettings;
        private PersonPaymentSecuritySettings _personPaymentSecuritySettings;
        private FICO.FicoCreditScore _ficoCreditScore;
        private ADAComplianceSettings _adaComplianceSettings;
        private SMTPSettings _smtpSettings;
        private TravelNotificationFeature _travelNotificationSettings;
        private RegularExpressionsFeature _regularExpressionsSettings;
        private MembershipFeature _membershipSettings;
        private Themes.Themes _themes;
        private ReCaptchaSettings _reCaptchaSettings;
        private AchFileService _achFileServiceSettings;
        private AuditLoggingFeature _auditLogging;
        private EnrollmentFeature _enrollment;
        private ApplicationConfiguration _application;
        private RealTimeRedemption _checkingRewardsRealTimeRedemption;
        private BusinessBanking.BusinessBanking _businessBanking;
        private AdminSettings _adminSettings;
        private LinkedAccount _linkedAccount;
        private PsiServicesSettings _psiServicesSettings;
        private PscuLogFileTransformServiceSettings _pscuLogFileTransformServiceSettings;
        private Promotions.Promotions _promotions;
        private WireTransferFeatures _wireTransferSettings;
        private RemoveMemberFromOnlineBanking _removeMemberFromOnlineBanking;
        private ConnectNativeSettings _connectNativeSettings;
        private OverdraftProtectionSettings _overdraftProtectionSettings;
        private CardlyticsSettings _cardliticsSettings;
        private PageDisplaySettings _pageDisplaySettings;
        private BetterLobbySettings _betterLobby;
        private MonitoringSettings _monitoring;
        private LoginSettings _login;
        private PublicApiSettings _publicApi;
        private SmsSecurityCodeSettings _smsSecurityCode;
        private Comm100 _comm100;
        private MiniOaoSettings _miniOao;
        private WidgetSettings _widgetSettings;
        private ThemeDeployment _themeDeployment;
        private GoToMyCard _goToMyCard;
        private IntegratedEnrollmentSettings _integratedEnrollment;
        private Marketing.Marketing _marketing;
        private GliaSettings _gliaSettings;
        private DocCenterSettings _docCenterSettings;
        private BokuSettings _bokuSettings;
        private VerafinFileBatchServiceSettings _verafinFileBatchServiceSettings;
        private UsernameSettings _usernameSettings;
        private BeneficiarySettings _beneficiarySettings;
        private CreditCardSettings _creditCardSettings;
        private SecureFormsDesignerSettings _secureFormsDesignerSettings;
        private RestrictedWordSettings _restrictedWords;
        private QcashLoanApplicationSsoSettings _QcashLoanApplicationSso;
        private ZelleSettings _zelleSettings;
        private SynergyEstatementsSettings _synergyEstatementsSettings;
        private ImiMobileTextBankingSettings _imiMobileTextBankingSettings;
        private NcpEstatements _ncpEstatements;
        private InfoImageEstatementsSettings _infoImageEstatementsSettings;
        private TalkativeChatSettings _talkativeChatSettings;
        private WebApiEstatementsSettings _webApiEstatementsSettings;
        private DiscountTicketsSettings _discountTicketsSettings;
        private AppInfoSettings.AppInfoSettings _appInfoSettings;
        private OutOfBandAuthentication _outOfBandAuthentication;
        private MultiAccountAccess _multiAccountAccess;

        public ApplicationConfiguration Application => _application ?? (_application = new ApplicationConfiguration(_settingsBase));

        public AchFileService AchFileService
        {
            get => _achFileServiceSettings ?? (_achFileServiceSettings = new AchFileService(_settingsBase));
            set => _achFileServiceSettings = value;
        }

        public LinkedAccount LinkedAccount
        {
            get => _linkedAccount ?? (_linkedAccount = new LinkedAccount(_settingsBase));
            set => _linkedAccount = value;
        }

        public AccountSettings Account
        {
            get => _accountSettings ?? (_accountSettings = new AccountSettings(_settingsBase));
            set => _accountSettings = value;
        }

        public AdminSettings Admin
        {
            get => _adminSettings ?? (_adminSettings = new AdminSettings(_settingsBase));
            set => _adminSettings = value;
        }

        public LoanSettings Loans
        {
            get => _loanSettings ?? (_loanSettings = new LoanSettings(_settingsBase));
            set => _loanSettings = value;
        }

        public LoanOfferSettings LoanOffers
        {
            get => _loanOfferSettings ?? (_loanOfferSettings = new LoanOfferSettings(_settingsBase));
            set => _loanOfferSettings = value;
        }

        public MeridianLinkSsoSettings MeridianLinkSso
        {
            get => _meridianLinkSsoSettings ?? (_meridianLinkSsoSettings = new MeridianLinkSsoSettings(_settingsBase));
            set => _meridianLinkSsoSettings = value;
        }

        public ISettingsBase GetSettingsBase()
        {
            return _settingsBase;
        }
        public FinancialCore FinancialCore
        {
            get => _financialCore ?? (_financialCore = new FinancialCore(_settingsBase));
            set => _financialCore = value;
        }

        public Institution.Institution Institution
        {
            get => _institution ?? (_institution = new Institution.Institution(_settingsBase));
            set => _institution = value;
        }

        public Institution.MFAQuestions MFAQuestions
        {
            get => _mfaQuestions ?? (_mfaQuestions = new Institution.MFAQuestions(_settingsBase));
            set => _mfaQuestions = value;
        }

        public Services.StopPayment StopPayment
        {
            get => _stopPayment ?? (_stopPayment = new Services.StopPayment(_settingsBase));
            set => _stopPayment = value;
        }

        public PaydayLoan PaydayLoan
        {
            get => _paydayLoan ?? (_paydayLoan = new PaydayLoan(_settingsBase));
            set => _paydayLoan = value;
        }

        public MobileConfiguration MobileConfiguration
        {
            get => _mobileConfiguration ?? (_mobileConfiguration = new MobileConfiguration(_settingsBase));
            set => _mobileConfiguration = value;
        }

        public OmegaConfiguration OmegaConfiguration
        {
            get => _omegaConfiguration ?? (_omegaConfiguration = new OmegaConfiguration(_settingsBase));
            set => _omegaConfiguration = value;
        }

        public RemoteDeposit.RemoteDeposit RemoteDeposit
        {
            get => _remoteDeposit ?? (_remoteDeposit = new RemoteDeposit.RemoteDeposit(_settingsBase));
            set => _remoteDeposit = value;
        }

        public AddressVerificationSettings AddressVerificationSettings
        {
            get => _addressVerificationSettings ?? (_addressVerificationSettings = new AddressVerificationSettings(_settingsBase));
            set => _addressVerificationSettings = value;
        }

        public MultipleAddressesSettings MultipleAddressesSettings
        {
            get => _multipleAddressesSettings ?? (_multipleAddressesSettings = new MultipleAddressesSettings(_settingsBase));
            set => _multipleAddressesSettings = value;
        }

        public PasswordVerificationSettings PasswordVerificationSettings
        {
            get => _passwordVerificationSettings ?? (_passwordVerificationSettings = new PasswordVerificationSettings(_settingsBase));
            set => _passwordVerificationSettings = value;
        }

        public OfxConfigurations.OfxConfigurations OfxConfigurations
        {
            get => _ofxConfigurations ?? (_ofxConfigurations = new OfxConfigurations.OfxConfigurations(_settingsBase));
            set => _ofxConfigurations = value;
        }

        public AccountMaskingSettings AccountMaskingSettings
        {
            get => _accountMaskingSettings ?? (_accountMaskingSettings = new AccountMaskingSettings(_settingsBase));
            set => _accountMaskingSettings = value;
        }

        public AccountAttributesSettings AccountAttributesSettings
        {
            get => _accountAttributesSettings ?? (_accountAttributesSettings = new AccountAttributesSettings(_settingsBase));
            set => _accountAttributesSettings = value;
        }

        public TieredAccessSettings TieredAccessSettings
        {
            get => _tieredAccessConfigurations ?? (_tieredAccessConfigurations = new TieredAccessSettings(_settingsBase));
            set => _tieredAccessConfigurations = value;
        }
        public CardHistory CardHistorySettings
        {
            get => _cardHistory ?? (_cardHistory = new CardHistory(_settingsBase));
            set => _cardHistory = value;
        }
        public Settings(ISettingsBase settingsBase)
        {
            _settingsBase = settingsBase;
            ConfigProvider = new ConfigProvider(_settingsBase);
        }

        public void RefreshSettings()
        {
            _settingsBase.RefreshSettings();
        }

        public List<ClientConfigurationSetting> GetClientConfigurations(GetClientConfigurationRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.ConnectionString))
            {
                return GetClientConfigurations(request.RefreshConfiguration);
            }

            if (string.IsNullOrWhiteSpace(request.MetaConnectionString))
            {
                throw new ArgumentNullException(nameof(request.MetaConnectionString), "MetaConnectionString cannot be null when connection string is specified.");
            }
            return GetClientConfigurations(request.ConnectionString, request.ClientContext, request.MetaConnectionString);
        }

        public List<ClientConfigurationSetting> GetClientConfigurations(string connectionString, string clientContext, string metaConnectionString)
        {
            return _settingsBase.GetSettings(connectionString, clientContext, metaConnectionString);
        }

        public List<ClientConfigurationSetting> GetClientConfigurations(bool refresh = false)
        {
            if (refresh) RefreshSettings();
            var list = new List<ClientConfigurationSetting>();
            foreach (DictionaryEntry setting in _settingsBase.ClientConfigurations)
            {
                list.Add((ClientConfigurationSetting)setting.Value);
            }
            return list;
        }


        public List<ClientConfigurationSetting> GetXAppConfigSettings(string application, string context)
        {
            var list = new List<ClientConfigurationSetting>();
            foreach (DictionaryEntry setting in _settingsBase.ClientConfigurations)
            {
                var x = (ClientConfigurationSetting)setting.Value;
                if (application.Equals(x.X_Application, StringComparison.InvariantCultureIgnoreCase))
                    list.Add(x);
            }
            return list;
        }

        public BillPaySettings BillPaySettings
        {
            get => _billPaySettings ?? (_billPaySettings = new BillPaySettings(_settingsBase));
            set => _billPaySettings = value;
        }

        public TargetedMarketingSettings TargetedMarketingSettings
        {
            get => _targetedMarketingSettings ?? (_targetedMarketingSettings = new TargetedMarketingSettings(_settingsBase));
            set => _targetedMarketingSettings = value;
        }
        public DirectDepositConfiguration DirectDepositConfiguration
        {
            get => _directDepositConfiguration ?? (_directDepositConfiguration = new DirectDepositConfiguration(_settingsBase));
            set => _directDepositConfiguration = value;
        }

        public Transfers TransfersConfiguration
        {
            get => _transfersConfiguration ?? (_transfersConfiguration = new Transfers(_settingsBase));
            set => _transfersConfiguration = value;
        }

        public ErrorMessageConfiguration ErrorMessageConfiguration
        {
            get => _errorMessageConfiguration ?? (_errorMessageConfiguration = new ErrorMessageConfiguration(_settingsBase));
            set => _errorMessageConfiguration = value;
        }

        public MoneyDesktop.MoneyDesktop MoneyDesktop
        {
            get => _moneyDesktop ?? (_moneyDesktop = new MoneyDesktop.MoneyDesktop(_settingsBase));
            set => _moneyDesktop = value;
        }

        public Summary.Controls SummaryControlsConfiguration
        {
            get => _summaryControlsConfiguration ?? (_summaryControlsConfiguration = new Summary.Controls(_settingsBase));
            set => _summaryControlsConfiguration = value;
        }
        public virtual SavvyMoneySettings SavvyMoneySettings
        {
            get => _savvyMoneySettings ?? (_savvyMoneySettings = new SavvyMoneySettings(_settingsBase));
            set => _savvyMoneySettings = value;
        }
        public CreditScoreHistorySettings CreditScoreHistorySettings
        {
            get => _creditScoreHistorySettings ?? (_creditScoreHistorySettings = new CreditScoreHistorySettings(_settingsBase));
            set => _creditScoreHistorySettings = value;
        }
        public HistoryDate HistoryDateSettings
        {
            get => _historyDate ?? (_historyDate = new HistoryDate(_settingsBase));
            set => _historyDate = value;
        }
        public AccountHistory AccountHistory
        {
            get => _accountHistory ?? (_accountHistory = new AccountHistory(_settingsBase));
            set => _accountHistory = value;
        }
        public HistoryShare HistoryShareSettings
        {
            get => _historyShare ?? (_historyShare = new HistoryShare(_settingsBase));
            set => _historyShare = value;
        }
        public CardlyticsWidget CardlyticsWidgetSettings
        {
            get => _cardlyticsWidget ?? (_cardlyticsWidget = new CardlyticsWidget(_settingsBase));
            set => _cardlyticsWidget = value;
        }

        public CardlyticsSettings CardlyticsSettings
        {
            get => _cardliticsSettings ?? (_cardliticsSettings = new CardlyticsSettings(_settingsBase));
            set => _cardliticsSettings = value;
        }

        public CardManagementSettings CardManagementSettings
        {
            get => _cardManagementSettings ?? (_cardManagementSettings = new CardManagementSettings(_settingsBase));
            set => _cardManagementSettings = value;
        }

        public LiveChatSettings LiveChatSettings
        {
            get => _liveChatSettings ?? (_liveChatSettings = new LiveChatSettings(_settingsBase));
            set => _liveChatSettings = value;
        }

        public CoBrowseSettings CoBrowseSettings
        {
            get => _coBrowseSettings ?? (_coBrowseSettings = new CoBrowseSettings(_settingsBase));
            set => _coBrowseSettings = value;
        }

        public CUDirectLoanSso CUDirectLoanSsoSettings
        {
            get => _cuDirectLoanSsoSettings ?? (_cuDirectLoanSsoSettings = new CUDirectLoanSso(_settingsBase));
            set => _cuDirectLoanSsoSettings = value;
        }

        public ShowApplyForLoanOrCardButton ShowApplyForLoanOrCardButtonSettings
        {
            get => _showApplyForLoanOrCardButtonSettings ?? (_showApplyForLoanOrCardButtonSettings = new ShowApplyForLoanOrCardButton(_settingsBase));
            set => _showApplyForLoanOrCardButtonSettings = value;
        }

        public SecureMessageSettings SecureMessages
        {
            get => _secureMessageSettings ?? (_secureMessageSettings = new SecureMessageSettings(_settingsBase));
            set => _secureMessageSettings = value;
        }

        public MenuItems MenuItems
        {
            get => _menuItems ?? (_menuItems = new MenuItems(_settingsBase));
            set => _menuItems = value;
        }

        public Estatements.Estatements Estatements
        {
            get => _estatements ?? (_estatements = new Estatements.Estatements(_settingsBase));
            set => _estatements = value;
        }

        public BillPayAdminMemberMenu BillPayAdminMemberMenu
        {
            get => _billPayAdminMemberMenu ?? (_billPayAdminMemberMenu = new BillPayAdminMemberMenu(_settingsBase));
            set => _billPayAdminMemberMenu = value;
        }

        public Alert Alerts
        {
            get => _alerts ?? (_alerts = new Alert(_settingsBase));
            set => _alerts = value;
        }

        public AlexaFeature AlexaFeatureSettings
        {
            get => _alexaSettings ?? (_alexaSettings = new AlexaFeature(_settingsBase));
            set => _alexaSettings = value;
        }

        public GoogleTags GoogleTagSettings
        {
            get => _googleTagsSettings ?? (_googleTagsSettings = new GoogleTags(_settingsBase));
            set => _googleTagsSettings = value;
        }

        public PrimaryAccountSecurityCode.PrimaryAccountSecurityCode PrimaryAccountSecurityCode
        {
            get => _primaryAccountSecurityCode ?? (_primaryAccountSecurityCode = new PrimaryAccountSecurityCode.PrimaryAccountSecurityCode(_settingsBase));
            set => _primaryAccountSecurityCode = value;
        }

        public OnlineBankingApi OnlineBankingApi
        {
            get => _onlineBankingApi ?? (_onlineBankingApi = new OnlineBankingApi(_settingsBase));
            set => _onlineBankingApi = value;
        }

        public CheckReorder.CheckReorder CheckReorder
        {
            get => _checkReorder ?? (_checkReorder = new CheckReorder.CheckReorder(_settingsBase));
            set => _checkReorder = value;
        }

        public ChangeAddress ChangeAddress
        {
            get => _changeAddress ?? (_changeAddress = new ChangeAddress(_settingsBase));
            set => _changeAddress = value;
        }

        public HomeBankingLoginConfiguration HomeBankingLogin
        {
            get => _homeBankingLoginConfiguration ?? (_homeBankingLoginConfiguration = new HomeBankingLoginConfiguration(_settingsBase));
            set => _homeBankingLoginConfiguration = value;
        }

        public PasswordSettings PasswordSettings
        {
            get => _passwordSettings ?? (_passwordSettings = new PasswordSettings(_settingsBase));
            set => _passwordSettings = value;
        }

        public CheckImages.CheckImages CheckImages
        {
            get => _checkImages ?? (_checkImages = new CheckImages.CheckImages(_settingsBase));
            set => _checkImages = value;
        }

        public Payzur Payzur
        {
            get => _payzur ?? (_payzur = new Payzur(_settingsBase));
            set => _payzur = value;
        }

        public FeaturesSettings FeaturesSettings
        {
            get => _featuresSettings ?? (_featuresSettings = new FeaturesSettings(_settingsBase));
            set => _featuresSettings = value;
        }

        public ChangeEmail ChangeEmail
        {
            get => _changeEmail ?? (_changeEmail = new ChangeEmail(_settingsBase));
            set => _changeEmail = value;
        }

        public ChangePhone ChangePhone
        {
            get => _changePhone ?? (_changePhone = new ChangePhone(_settingsBase));
            set => _changePhone = value;
        }

        public MultipleEmailSettings MultipleEmailSettings
        {
            get => _multipleEmailSettings ?? (_multipleEmailSettings = new MultipleEmailSettings(_settingsBase));
            set => _multipleEmailSettings = value;
        }

        public PersonPaymentSecuritySettings PersonPaymentSecuritySettings
        {
            get => _personPaymentSecuritySettings ?? (_personPaymentSecuritySettings = new PersonPaymentSecuritySettings(_settingsBase));
            set => _personPaymentSecuritySettings = value;
        }

        public FICO.FicoCreditScore FicoCreditScore
        {
            get => _ficoCreditScore ?? (_ficoCreditScore = new FICO.FicoCreditScore(_settingsBase));
            set => _ficoCreditScore = value;
        }

        public ADAComplianceSettings adaComplianceSettings
        {
            get => _adaComplianceSettings ?? (_adaComplianceSettings = new ADAComplianceSettings(_settingsBase));
            set => _adaComplianceSettings = value;
        }

        public DocCenterSettings DocCenterSettings
        {
            get => _docCenterSettings ?? (_docCenterSettings = new DocCenterSettings(_settingsBase));
            set => _docCenterSettings = value;
        }

        public SMTPSettings SMTP
        {
            get => _smtpSettings ?? (_smtpSettings = new SMTPSettings(_settingsBase));
            set => _smtpSettings = value;
        }

        public TravelNotificationFeature TravelNotificationFeatureSettings
        {
            get => _travelNotificationSettings ?? (_travelNotificationSettings = new TravelNotificationFeature(_settingsBase));
            set => _travelNotificationSettings = value;
        }

        public RegularExpressionsFeature RegularExpressionsFeatureSettings
        {
            get => _regularExpressionsSettings ?? (_regularExpressionsSettings = new RegularExpressionsFeature(_settingsBase));
            set => _regularExpressionsSettings = value;
        }

        public MembershipFeature MembershipFeatureSettings
        {
            get => _membershipSettings ?? (_membershipSettings = new MembershipFeature(_settingsBase));
            set => _membershipSettings = value;
        }

        public ReCaptchaSettings ReCaptchaSettings
        {
            get => _reCaptchaSettings ?? (_reCaptchaSettings = new ReCaptchaSettings(_settingsBase));
            set => _reCaptchaSettings = value;
        }

        public Themes.Themes Themes
        {
            get => _themes ?? (_themes = new Themes.Themes(_settingsBase));
            set => _themes = value;
        }

        public AuditLoggingFeature AuditLoggingSettings
        {
            get => _auditLogging ?? (_auditLogging = new AuditLoggingFeature(_settingsBase));
            set => _auditLogging = value;
        }

        public EnrollmentFeature EnrollmentSettings
        {
            get => _enrollment ?? (_enrollment = new EnrollmentFeature(_settingsBase));
            set => _enrollment = value;
        }

        public RealTimeRedemption CheckingRewardsRealTimeRedemption
        {
            get => _checkingRewardsRealTimeRedemption ?? (_checkingRewardsRealTimeRedemption = new RealTimeRedemption(_settingsBase));
            set => _checkingRewardsRealTimeRedemption = value;
        }

        public BusinessBanking.BusinessBanking BusinessBanking
        {
            get => _businessBanking ?? (_businessBanking = new BusinessBanking.BusinessBanking(_settingsBase));
            set => _businessBanking = value;
        }

        public PsiServicesSettings PsiServicesSettings
        {
            get => _psiServicesSettings ?? (_psiServicesSettings = new PsiServicesSettings(_settingsBase));
            set => _psiServicesSettings = value;
        }

        public PscuLogFileTransformServiceSettings PscuLogFileTransformService
        {
            get => _pscuLogFileTransformServiceSettings ?? (_pscuLogFileTransformServiceSettings = new PscuLogFileTransformServiceSettings(_settingsBase));
            set => _pscuLogFileTransformServiceSettings = value;
        }

        public VerafinFileBatchServiceSettings VerafinFileBatchServiceSettings
        {
            get => _verafinFileBatchServiceSettings ?? (_verafinFileBatchServiceSettings = new VerafinFileBatchServiceSettings(_settingsBase));
            set => _verafinFileBatchServiceSettings = value;
        }

        public Promotions.Promotions Promotions
        {
            get => _promotions ?? (_promotions = new Promotions.Promotions(_settingsBase));
            set => _promotions = value;
        }

        public WireTransferFeatures WireTransfer
        {
            get => _wireTransferSettings ?? (_wireTransferSettings = new WireTransferFeatures(_settingsBase));
            set => _wireTransferSettings = value;
        }

        public RemoveMemberFromOnlineBanking RemoveMemberFromOnlineBanking
        {
            get => _removeMemberFromOnlineBanking ?? (_removeMemberFromOnlineBanking = new RemoveMemberFromOnlineBanking(_settingsBase));
            set => _removeMemberFromOnlineBanking = value;
        }

        public ConnectNativeSettings ConnectNativeSettings
        {
            get => _connectNativeSettings ?? (_connectNativeSettings = new ConnectNativeSettings(_settingsBase));
            set => _connectNativeSettings = value;
        }

        public OverdraftProtectionSettings OverdraftProtectionSettings
        {
            get => _overdraftProtectionSettings ?? (_overdraftProtectionSettings = new OverdraftProtectionSettings(_settingsBase));
            set => _overdraftProtectionSettings = value;
        }

        public PageDisplaySettings PageDisplaySettings
        {
            get => _pageDisplaySettings ?? (_pageDisplaySettings = new PageDisplaySettings(_settingsBase));
            set => _pageDisplaySettings = value;
        }

        public BetterLobbySettings BetterLobby
        {
            get => _betterLobby ?? (_betterLobby = new BetterLobbySettings(_settingsBase));
            set => _betterLobby = value;
        }

        public MonitoringSettings Monitoring
        {
            get => _monitoring ?? (_monitoring = new MonitoringSettings(_settingsBase));
            set => _monitoring = value;
        }
        public LoginSettings Login
        {
            get => _login ?? (_login = new LoginSettings(_settingsBase));
            set => _login = value;
        }

        public PublicApiSettings PublicApi
        {
            get => _publicApi ?? (_publicApi = new PublicApiSettings(_settingsBase));
            set => _publicApi = value;
        }

        public SmsSecurityCodeSettings SmsSecurityCode
        {
            get => _smsSecurityCode ?? (_smsSecurityCode = new SmsSecurityCodeSettings(_settingsBase));
            set => _smsSecurityCode = value;
        }

        public Comm100 Comm100Settings
        {
            get => _comm100 ?? (_comm100 = new Comm100(_settingsBase));
            set => _comm100 = value;
        }

        public MiniOaoSettings MiniOao
        {
            get => _miniOao ?? (_miniOao = new MiniOaoSettings(_settingsBase));
            set => _miniOao = value;
        }

        public WidgetSettings WidgetSettings
        {
            get => _widgetSettings ?? (_widgetSettings = new WidgetSettings(_settingsBase));
            set => _widgetSettings = value;
        }

        public ThemeDeployment ThemeDeployment
        {
            get => _themeDeployment ?? (_themeDeployment = new ThemeDeployment(_settingsBase));
            set => _themeDeployment = value;
        }

        public GoToMyCard GoToMyCard
        {
            get => _goToMyCard ?? (_goToMyCard = new GoToMyCard(_settingsBase));
            set => _goToMyCard = value;
        }

        public IntegratedEnrollmentSettings IntegratedEnrollment
        {
            get => _integratedEnrollment ?? (_integratedEnrollment = new IntegratedEnrollmentSettings(_settingsBase));
            set => _integratedEnrollment = value;
        }

        public Marketing.Marketing Marketing
        {
            get => _marketing ?? (_marketing = new Marketing.Marketing(_settingsBase));
            set => _marketing = value;
        }

        public GliaSettings GliaSettings
        {
            get => _gliaSettings ?? (_gliaSettings = new GliaSettings(_settingsBase));
            set => _gliaSettings = value;
        }

        public BokuSettings BokuSettings
        {
            get => _bokuSettings ?? (_bokuSettings = new BokuSettings(_settingsBase));
            set => _bokuSettings = value;
        }

        public UsernameSettings UsernameSettings
        {
            get => _usernameSettings ?? (_usernameSettings = new UsernameSettings(_settingsBase));
            set => _usernameSettings = value;
        }

        public BeneficiarySettings BeneficiarySettings
        {
            get => _beneficiarySettings ?? (_beneficiarySettings = new BeneficiarySettings(_settingsBase));
            set => _beneficiarySettings = value;
        }

        public CreditCardSettings CreditCardSettings
        {
            get => _creditCardSettings ?? (_creditCardSettings = new CreditCardSettings(_settingsBase));
            set => _creditCardSettings = value;
        }

        public SecureFormsDesignerSettings SecureFormsDesignerSettings
        {
            get => _secureFormsDesignerSettings ?? (_secureFormsDesignerSettings = new SecureFormsDesignerSettings(_settingsBase));
            set => _secureFormsDesignerSettings = value;
        }

        public RestrictedWordSettings RestrictedWords
        {
            get => _restrictedWords ?? (_restrictedWords = new RestrictedWordSettings(_settingsBase));
            set => _restrictedWords = value;
        }
        
        public QcashLoanApplicationSsoSettings QcashLoanApplication
        {
            get => _QcashLoanApplicationSso ?? (_QcashLoanApplicationSso = new QcashLoanApplicationSsoSettings(_settingsBase));
            set => _QcashLoanApplicationSso = value;
        }

        public ZelleSettings ZelleSettings
        {
            get => _zelleSettings ?? (_zelleSettings = new ZelleSettings(_settingsBase));
            set => _zelleSettings = value;
        }

        public SynergyEstatementsSettings SynergyEstatementsSettings
        {
            get => _synergyEstatementsSettings ?? (_synergyEstatementsSettings = new SynergyEstatementsSettings(_settingsBase));
            set => _synergyEstatementsSettings = value;
        }

        public ImiMobileTextBankingSettings ImiMobileTextBankingSettings
        {
            get => _imiMobileTextBankingSettings ?? (_imiMobileTextBankingSettings = new ImiMobileTextBankingSettings(_settingsBase));
            set => _imiMobileTextBankingSettings = value;
        }

        public NcpEstatements NcpEstatements
        {
            get => _ncpEstatements ?? (_ncpEstatements = new NcpEstatements(_settingsBase));
            set => _ncpEstatements = value;
        }

        public InfoImageEstatementsSettings InfoImageEstatementsSettings
        {
            get => _infoImageEstatementsSettings ?? (_infoImageEstatementsSettings = new InfoImageEstatementsSettings(_settingsBase));
            set => _infoImageEstatementsSettings = value;
        }

        public TalkativeChatSettings TalkativeChatSettings
        {
            get => _talkativeChatSettings ?? (_talkativeChatSettings = new TalkativeChatSettings(_settingsBase));
            set => _talkativeChatSettings = value;
        }

        public WebApiEstatementsSettings WebApiEstatementsSettings
        {
            get => _webApiEstatementsSettings ?? (_webApiEstatementsSettings = new WebApiEstatementsSettings(_settingsBase));
            set => _webApiEstatementsSettings = value;
        }

        public DiscountTicketsSettings DiscountTicketsSettings
        {
            get => _discountTicketsSettings ?? (_discountTicketsSettings = new DiscountTicketsSettings(_settingsBase));
            set => _discountTicketsSettings = value;
        }

        public AppInfoSettings.AppInfoSettings AppInfoSettings
        {
            get => _appInfoSettings ?? (_appInfoSettings = new AppInfoSettings.AppInfoSettings(_settingsBase));
            set => _appInfoSettings = value;
        }

        public OutOfBandAuthentication OutOfBandAuthentication
        {
            get => _outOfBandAuthentication ?? (_outOfBandAuthentication = new OutOfBandAuthentication(_settingsBase));
            set => _outOfBandAuthentication = value;
        }

        public MultiAccountAccess MultiAccountAccess
        {
            get => _multiAccountAccess ?? (_multiAccountAccess = new MultiAccountAccess(_settingsBase));
            set => _multiAccountAccess = value;
        }

        public string GetSettingValue(string key)
        {
            try
            {
                return ConfigProvider.GetValue(key);
            }
            catch (Exception ex)
            {
                LogManager.GetCurrentClassLogger().Error(ex);
                return null;
            }
        }

        public bool CanRun(Feature feature)
        {
            if (Application.OnlineBanking.IgnoreCanRun) return true;
            var version = Application.OnlineBanking.Version;

            // Started continuous deploy where all changes are present in the 2017.1 and later code base
            //     actually this was available in 2016.4 but no clients ever received that release
            const double minVersion = 2017.1;

            /*
             * This will one day be...
             * TODO: Client Has Feature (they have the license to use it)
             * TODO: Pull feature version from feature
             * Feature is enabled via Application Config
             * Is Active Version
             * TODO: Is properly configured
             * TODO: Consider calling application version (ie mobile app version)
             */

            switch (feature)
            {
                case Feature.AddressVerification:
                    return AddressVerificationSettings.Enabled && version >= AddressVerificationSettings.MinVersion && version >= minVersion;
                //case Feature.Alerts2:
                //    break;
                case Feature.LiveChat:
                    return LiveChatSettings.LiveChatEnabled && version >= LiveChatSettings.MinVersion && version >= 2016.2;
                case Feature.CoBrowse:
                    return CoBrowseSettings.CoBrowseEnabled && version >= CoBrowseSettings.MinVersion;
                case Feature.SavvyMoney:
                    return SavvyMoneySettings.HomeBankingEnabled && version >= SavvyMoneySettings.MinVersion && version >= 2016.2;
                case Feature.ScheduledAlerts:
                    return Alerts.ScheduledAlertsEnabled && version >= Alerts.MinVersion && version >= minVersion;
                case Feature.SecureCommunication:
                    return SecureMessages.Enabled && version >= SecureMessages.MinVersion && version >= minVersion;
                case Feature.SparkUi:
                    return Application.SparkUi.Enabled && version >= Application.SparkUi.MinVersion && version >= minVersion;
                case Feature.FlexUi:
                    return Application.FlexUi.Enabled && version >= Application.FlexUi.MinVersion && version >= minVersion;
                case Feature.ShowApplyForLoanOrCardButtonOnSummaryPage:
                    return ShowApplyForLoanOrCardButtonSettings.ShowApplyForLoanOrCardButtonOnSummary
                        && version >= ShowApplyForLoanOrCardButtonSettings.MinVersion && version >= minVersion;
                case Feature.AlexaApp:
                    return AlexaFeatureSettings.AlexaAppEnabled && version >= AlexaFeatureSettings.MinVersion && version >= minVersion;
                case Feature.PinChange:
                    return CardManagementSettings.IsPinChangeEnabled && version >= CardManagementSettings.MinVersion && version >= minVersion;
                case Feature.ScheduledTransfers2:
                    return Account.ScheduledTransfers.Enabled && version >= Account.ScheduledTransfers.MinVersion && version >= minVersion;
                case Feature.eStatements:
                    return Estatements.Enabled && version >= Estatements.MinVersion && version >= minVersion;
                case Feature.PrimaryAccountSecurityCode:
                    return PrimaryAccountSecurityCode.Enabled && version >= PrimaryAccountSecurityCode.MinVersion && version >= minVersion;
                case Feature.GoogleTagManager:
                    return GoogleTagSettings.Enabled && version >= GoogleTagSettings.MinVersion && version >= minVersion;
                case Feature.BillPay:
                    return BillPaySettings.Enabled && version >= BillPaySettings.MinVersion && version >= minVersion;
                case Feature.BillPay2:
                    return BillPaySettings.BillPay2.Enabled && version >= BillPaySettings.BillPay2.MinimumVersion && version >= minVersion;
                case Feature.MobilePasswordEncryption:
                    return version >= MobileConfiguration.PasswordEncryption.MinimumServerVersion && version >= minVersion;
                case Feature.RecurringBillPay:
                    return BillPaySettings.RecurringBillPay.Enabled && version >= BillPaySettings.RecurringBillPay.MinimumVersion && version >= minVersion;
                case Feature.BillPayOutOfBand:
                    return BillPaySettings.OutOfBand.Enabled && version >= BillPaySettings.OutOfBand.MinimumVersion && version >= minVersion;
                case Feature.HarlandCheckReorderFlag:
                    return CheckReorder.HarlandCheckReorder.Enabled && version >= CheckReorder.HarlandCheckReorder.MinVersion && version >= minVersion;
                case Feature.Password:
                    return version >= PasswordSettings.MinVersion && version >= minVersion;
                case Feature.PlaceHoldOnInboundAchTransactions:
                    return TransfersConfiguration.ACH.PlaceHoldsOnAchTransactions.Enabled && version >= TransfersConfiguration.ACH.PlaceHoldsOnAchTransactions.MinVersion && version >= minVersion;
                case Feature.SyncPayzurPaymentAccounts:
                    return version >= minVersion && version >= Payzur.SyncCardsMinVersion && Payzur.SyncCardsEnabled;
                case Feature.AdHocAlerts:
                    return version >= minVersion && version >= Alerts.AdHocAlerts.MinVersion && Alerts.AdHocAlerts.Enabled;
                case Feature.DisplayCheckHolds:
                    return version >= minVersion && version >= AccountHistory.DisplayCheckHolds.MinVersion && AccountHistory.DisplayCheckHolds.Enabled;
                case Feature.DigitalInsightsAlerts:
                    return version >= minVersion && version >= Alerts.ExternalEvents.DigitalInsightsMinVersion && Alerts.ExternalEvents.DigitalInsightsEnabled;
                case Feature.FicoCreditScoreSso:
                    return version >= minVersion && version >= FicoCreditScore.MinVersion && FicoCreditScore.Enabled;
                case Feature.ADACompliance:
                    return version >= minVersion && version >= adaComplianceSettings.MinVersion;
                case Feature.MembershipFeature:
                    return version >= minVersion && version >= MembershipFeatureSettings.MinVersion && MembershipFeatureSettings.MembershipEnabled;
                case Feature.MultipleAddressesPage:
                    return version >= minVersion && MultipleAddressesSettings.MvcPage.Enabled && version >= MultipleAddressesSettings.MvcPage.MinVersion;
                case Feature.CalculateBillPayPaymentDates:
                    return BillPaySettings.CalculateBillPayPaymentDatesEnabled && version >= BillPaySettings.CalculateBillPayPaymentDatesMinVersion;
                case Feature.UseInformationalNoteInsteadOfTransferForAchTransactions:
                    return Account.Transfers.ACH.UseInformationalNoteInsteadOfTransferForAchTransactions.Enabled &&
                           version >= Account.Transfers.ACH.UseInformationalNoteInsteadOfTransferForAchTransactions
                               .MinVersion;
                case Feature.TravelNotification:
                    return TravelNotificationFeatureSettings.Enabled && version >= TravelNotificationFeatureSettings.MinVersion && version >= minVersion;
                case Feature.AchFileCreationLibrary:
                    return AchFileService.IsEnabled && version >= AchFileService.MinVersion;
                case Feature.ReCaptcha:
                    return ReCaptchaSettings.ReCaptchaEnabled && version >= ReCaptchaSettings.MinVersion;
                case Feature.JointOwners:
                    return Account.JointOwners.Enabled && version >= Account.JointOwners.MinVersion;
                case Feature.CheckingRewardsRealTimeRedemption:
                    return CheckingRewardsRealTimeRedemption.Enabled && version >= CheckingRewardsRealTimeRedemption.MinVersion;
                case Feature.WireTransfer:
                    return WireTransfer.Enabled && version >= WireTransfer.MinVersion;
                case Feature.OverdraftProtection:
                    return OverdraftProtectionSettings.Enabled && version >= OverdraftProtectionSettings.MinVersion;
                case Feature.CheckFree:
                    return BillPaySettings.CheckFree.Enabled && version >= BillPaySettings.CheckFree.MinVersion && version >= minVersion;
                case Feature.SmsSecurityCode:
                    return SmsSecurityCode.Enabled && version >= SmsSecurityCode.MinVersion && version >= minVersion;
                case Feature.Comm100:
                    return Comm100Settings.Enabled && version >= Comm100Settings.MinVersion && version >= minVersion;
                case Feature.MiniOao:
                    return MiniOao.Enabled && version >= MiniOao.MinVersion && version >= minVersion;
                case Feature.GoToMyCard:
                    return GoToMyCard.Enabled && version >= GoToMyCard.MinVersion && version >= minVersion;
                case Feature.EscheatDate:
                    return Account.Escheat.IsUpdateEscheatDateEnabled && version >= Account.Escheat.MinVersion && version >= minVersion;
                case Feature.MfaFreeform:
                    return MFAQuestions.FreeformMFAEnabled && version >= MFAQuestions.MinVersion;
                case Feature.AccountOpening:
                    return Account.AccountOpening.Enabled && version >= Account.AccountOpening.MinVersion;
                case Feature.LinkedAccounts:
                    return LinkedAccount.Enabled && version >= LinkedAccount.MinVersion;
                case Feature.BillMatrix:
                    return BillPaySettings.BillMatrix.Enabled && version >= BillPaySettings.BillMatrix.MinVersion && version >= minVersion;
                case Feature.Glia:
                    return GliaSettings.Enabled && version >= GliaSettings.MinVersion && version >= minVersion;
                case Feature.Boku:
                    return BokuSettings.Enabled && version >= BokuSettings.MinVersion && version >= minVersion;
                case Feature.BokuPhoneVerification:
                    return BokuSettings.PhoneVerificationEnabled && version >= BokuSettings.PhoneVerificationMinVersion && version >= minVersion;
                case Feature.MultipleEmailAddresses:
                    return MultipleEmailSettings.Enabled && version >= MultipleEmailSettings.MinVersion && version >= minVersion;
                case Feature.PersonPaymentSecurity:
                    return PersonPaymentSecuritySettings.Enabled && version >= PersonPaymentSecuritySettings.MinVersion && version >= minVersion;
                case Feature.AnyMemberTransfers:
                    return TransfersConfiguration.AnyMember.Enabled && version >= TransfersConfiguration.AnyMember.MinVersion && version >= minVersion;
                case Feature.OmahaSSO:
                    return CreditCardSettings.OmahaSso.Enabled && version >= CreditCardSettings.OmahaSso.MinVersion && version >= minVersion;
                case Feature.SecureFormsDesigner:
                    return SecureFormsDesignerSettings.Enabled && version >= SecureFormsDesignerSettings.MinVersion && version >= minVersion;
                case Feature.SymmetryBillPay:
                    return BillPaySettings.Symmetry.Enabled && version >= BillPaySettings.Symmetry.MinVersion && version >= minVersion;
                case Feature.RestrictedWords:
                    return RestrictedWords.Enabled && version >= RestrictedWords.MinVersion && version >= minVersion;
                case Feature.MemberView:
                    return Admin.MemberView.Enabled && version >= Admin.MemberView.MinVersion && version >= minVersion;
                case Feature.QcashLoanApplicationSSO:
                    return QcashLoanApplication.Enabled && version >= QcashLoanApplication.MinVersion && version >= minVersion;
                case Feature.Zelle:
                    return ZelleSettings.Enabled && version >= ZelleSettings.MinVersion && version >= minVersion;
                case Feature.SynergyEstatements:
                    return SynergyEstatementsSettings.Enabled && version >= SynergyEstatementsSettings.MinVersion && version >= minVersion;
                case Feature.ImiMobileTextBanking:
                    return ImiMobileTextBankingSettings.Enabled && version >= ImiMobileTextBankingSettings.MinVersion && version >= minVersion;
                case Feature.NcpEstatements:
                    return NcpEstatements.Enabled && version >= NcpEstatements.MinVersion && version >= minVersion;
                case Feature.InfoImageEstatements:
                    return InfoImageEstatementsSettings.Enabled && version >= InfoImageEstatementsSettings.MinVersion && version >= minVersion;
                case Feature.MainStreetCheckReorder:
                    return CheckReorder.MainStreetCheckReorder.Enabled && version >= CheckReorder.MainStreetCheckReorder.MinVersion && version >= minVersion;
                case Feature.CreditScoreHistory:
                    return CreditScoreHistorySettings.Enabled && version >= CreditScoreHistorySettings.MinVersion && version >= minVersion;
                case Feature.TalkativeChat:
                    return TalkativeChatSettings.Enabled && version >= TalkativeChatSettings.MinVersion && version >= minVersion;
                case Feature.DiscountTickets:
                    return DiscountTicketsSettings.Enabled && version >= DiscountTicketsSettings.MinVersion && version >= minVersion;
                case Feature.ThirdPartyOao:
                    return IntegratedEnrollment.ThirdPartyOaoEnabled && version >= IntegratedEnrollment.ThirdPartyOaoMinVersion && version >= minVersion;
                case Feature.OnHostScheduledTransfers:
                    return Account.ScheduledTransfers.OnHostEnabled && version >= Account.ScheduledTransfers.OnHostMinVersion && version >= minVersion;
                case Feature.EstatementsWebApi:
                    return WebApiEstatementsSettings.Enabled && version >= WebApiEstatementsSettings.MinVersion && version >= minVersion;
                case Feature.DeepTargetPromotions:
                    return Promotions.DeepTarget.Enabled && version >= Promotions.DeepTarget.MinVersion && version >= minVersion;
                case Feature.DocumentArchitectSso:
                    return OmegaConfiguration.DocumentArchitectSso.Enabled && version >= OmegaConfiguration.DocumentArchitectSso.MinVersion && version >= minVersion;
                case Feature.LinkedAccountHistory:
                    return AccountHistory.LinkedAccounts.Enabled && version >= AccountHistory.LinkedAccounts.MinVersion && version >= minVersion;
                case Feature.PscuSso:
                    return CreditCardSettings.PscuSso.Enabled && version >= CreditCardSettings.PscuSso.MinVersion && version >= minVersion;
                case Feature.OutOfBandAuthentication:
                    return OutOfBandAuthentication.Enabled && version >= OutOfBandAuthentication.MinVersion && version >= minVersion;
                case Feature.OnDotSdk:
                    return MobileConfiguration.CardControl.OnDotSdk.Enabled && version >= MobileConfiguration.CardControl.OnDotSdk.MinVersion && version >= minVersion;
                case Feature.MultiAccountAccess:
                    return MultiAccountAccess.Enabled && version >= MultiAccountAccess.MinVersion && version >= minVersion;
                default:
                    throw new ArgumentOutOfRangeException(nameof(feature), feature, null);
            }
        }

        /// <summary>
        /// Put this around new code fixes (not features) where it makes sense, so that we can turn it off if your new code breaks something.
        /// </summary>
        public bool CanRun(TemporaryGateForNewCode settingName)
        {
            // It is intended that these temporary gates will be cleaned up eventually, once it has gone out to clients and we have confidence in the code that it surrounds.

            // We will return true unless we find a valid setting of this name that is set to false.
            try
            {
                var setting = _settingsBase.ClientConfigurations[$"Temporary.TemporaryGateForNewCode.{settingName}".ToLower()];

                if (setting == null)
                    return true;

                bool result;
                if (bool.TryParse(((ClientConfigurationSetting)setting)?.Value, out result))
                    return result;
            }
            catch (Exception e)
            {
                // Do nothing?
            }

            return true;
        }

        /// <summary>
        /// Gets all client configuration settings
        /// </summary>
        /// <returns>A hashtable of all config settings</returns>
        public Hashtable GetAllConfigs() => _settingsBase.ClientConfigurations;
    }


    public enum Feature
    {
        AddressVerification,
        Alerts2,
        FlexUi,
        LiveChat,
        SavvyMoney,
        ScheduledAlerts,
        SecureCommunication,
        SparkUi,
        ShowApplyForLoanOrCardButtonOnSummaryPage,
        AlexaApp,
        PinChange,
        ScheduledTransfers2,
        eStatements,
        PrimaryAccountSecurityCode,
        GoogleTagManager,
        BillPay,
        BillPay2,
        MobilePasswordEncryption,
        RecurringBillPay,
        BillPayOutOfBand,
        HarlandCheckReorderFlag,
        Password,
        PlaceHoldOnInboundAchTransactions,
        SyncPayzurPaymentAccounts,
        AdHocAlerts,
        DisplayCheckHolds,
        DigitalInsightsAlerts,
        FicoCreditScoreSso,
        ADACompliance,
        MultipleAddressesPage,
        CalculateBillPayPaymentDates,
        UseInformationalNoteInsteadOfTransferForAchTransactions,
        TravelNotification,
        MembershipFeature,
        AchFileCreationLibrary,
        ReCaptcha,
        JointOwners,
        CheckingRewardsRealTimeRedemption,
        CoBrowse,
        WireTransfer,
        OverdraftProtection,
        CheckFree,
        SmsSecurityCode,
        Comm100,
        MiniOao,
        GoToMyCard,
        EscheatDate,
        MfaFreeform,
        AccountOpening,
        LinkedAccounts,
        BillMatrix,
        Glia,
        Boku,
        MultipleEmailAddresses,
        BokuPhoneVerification,
        PersonPaymentSecurity,
        AnyMemberTransfers,
        OmahaSSO,
        SecureFormsDesigner,
        SymmetryBillPay,
        RestrictedWords,
        MemberView,
        QcashLoanApplicationSSO,
        Zelle,
        SynergyEstatements,
        ImiMobileTextBanking,
        NcpEstatements,
        InfoImageEstatements,
        MainStreetCheckReorder,
        CreditScoreHistory,
        TalkativeChat,
        DiscountTickets,
        ThirdPartyOao,
        OnHostScheduledTransfers,
        EstatementsWebApi,
        DeepTargetPromotions,
        DocumentArchitectSso,
        LinkedAccountHistory,
        PscuSso,
        OutOfBandAuthentication,
        OnDotSdk,
        MultiAccountAccess
    }

    /* All temporary gates need to be a bool setting (default to true) and have the prefix of Temporary.TemporaryGateForNewCode.
     * 
     * For instance, if SendNewSecureMessagesFromSecureMessagingManager is an enum below, then there should be a bool setting of
     *      Temporary.TemporaryGateForNewCode.SendNewSecureMessagesFromSecureMessagingManager
     *
     *  The setting needs to be set up in Omega, but doesn't have to exist in the client context (it will assume true unless a setting exists with 'false').
     */
    public enum TemporaryGateForNewCode
    {
        SendNewSecureMessagesFromSecureMessagingManager,
        MetavanteChangePayeeAccountNumberDisabled,
        DataFeedReadLatestForMemberBySqlDisabled
    }
}
