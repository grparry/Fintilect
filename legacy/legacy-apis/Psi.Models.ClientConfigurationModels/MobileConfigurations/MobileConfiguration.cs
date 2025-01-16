using System;
using Psi.Data.Models.ClientConfigurationModels.Chat;
using Psi.Data.Models.ClientConfigurationModels.ConnectNative;
using Psi.Data.Models.ClientConfigurationModels.CreditScoreHistory;
using Psi.Data.Models.ClientConfigurationModels.CustomPages;
using Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.Accounts;
using Psi.Data.Models.ClientConfigurationModels.Promotions;
using Psi.Data.Models.ClientConfigurationModels.RestrictedWords;
using Psi.Data.Models.ClientConfigurationModels.SynergyEstatements;

namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations
{
    public class MobileConfiguration : SettingsBaseHelper
    {
        private readonly ISettingsBase _settingsBase;
        private Activation.Activation _activation;
        private AppMessages _appMessages;
        private Welcome _welcome;
        private FicoCreditScore _ficoCreditScore;
        private ForgotUsername _forgotUsername;
        private Enrollment _enrollment;
        private Loan.Loan _loan;
        private CardControl.CardControl _cardControl;
        private CardManagement.CardManagementSettings _cardManagement;
        private SendMoney _sendMoney;
        private MoneyDesktop _moneyDesktop;
        private Deals.Deals _deals;
        private AccountOpening.AccountOpening _accountOpening;
        private Settings.Settings _settings;
        private BillPay.BillPay _billPay;
        private CheckDeposit _checkDeposit;
        private LocationSearch _locationSearch;
        private Estatements _estatements;
        private Branding.Branding _branding;
        private Security.Security _security;
        private Promotions.PromoChannel _promoChannel;
        private Alerts _alerts;
        private NextLoginSteps _nextLoginSteps;
        private Accounts.Accounts _accounts;
        private QuickBalance.QuickBalance _quickBalance;
        private QuickAccountInfo _quickAccountInfo;
        private Transfers.Transfers _transfers;
        private AdvancePay _advancePay;
        private SavvyMoney _savvyMoney;
        private HouseHolding _houseHolding;
        private VersionManagement _versionManagement;
        private StopPay _stopPay;
        private MyCardInfo _myCardInfo;
        private Marketing _marketing;
        private ContactUs _contactUs;
        private CardAlerts _cardAlerts;
        private MyCuClub _myCuClub;
        private PushNotification _pushNotification;
        private UserDevices.UserDevices _userDevices;
        private MobileWebViews _mobileWebViews;
        private PasswordEncryption _passwordEncryption;
        private PinChange _pinChange;
        private Login _login;
        private ConnectNative _connectNative;
        private MobileMenu _menu;
        private DigitalWallet _digitalWallet;
        private PinEncryption _pinEncryption;
        private DocumentCenter _documentCenter;
        private Chat.Comm100 _comm100;
        private LoanOffers.LoanOffers _loanOffers;
        private Rates _rates;
        private LinkedAccounts _linkedAccounts;
        private RateAndReview _rateAndReview;
        private Larky _larky;
        private RestrictedWordSettings _restrictedWordSettings;
        private ConnectNativeSettings _connectNativeSettings;
        private GliaSettings _gliaSettings;
        private DirectDeposit _directDeposit;
        private SynergyEstatementsSettings _synergyEstatementsSettings;
        private TalkativeChatSettings _talkativeChatSettings;
        private CreditScoreHistorySettings _creditScoreHistorySettings;
        private DiscountTicketsSettings _discountTicketsSettings;
        private DeepTargetSettings _deepTargetSettings;
        private SecureForms _secureForms;

        public MobileConfiguration(ISettingsBase settingsBase) : base(settingsBase)
        {
            _settingsBase = settingsBase;
        }

        [SettingKey("Mobile.MinOsVersionIos")]
        public Version MinOsVersionIos
        {
            get
            {
                Version.TryParse(GetValue(), out var version);
                return version;
            }
            set => SetValue(value);
        }

        [SettingKey("Mobile.MinOsVersionAndroid")]
        public Version MinOsVersionAndroid
        {
            get
            {
                Version.TryParse(GetValue(), out var version);
                return version;
            }
            set => SetValue(value);
        }

        [SettingKey("Mobile.OsDeprecatedAppVersion")]
        public Version OsDeprecatedAppVersion
        {
            get
            {
                Version.TryParse(GetValue(), out var version);
                return version;
            }
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.AndroidDeprecatedVersion")]
        public Version AndroidDeprecatedAppVersion
        {
            get => !Version.TryParse(GetValue(), out var version) ? null : version;
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.IosDeprecatedVersion")]
        public Version IosDeprecatedAppVersion
        {
            get => !Version.TryParse(GetValue(), out var version) ? null : version;
            set => SetValue(value);
        }

        [SettingKey("Mobile.IsWebViewDomStorageEnabled")]
        public bool IsWebViewDomStorageEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.AppTrackingTransparency.Enabled")]
        public bool AppTrackingTransparencyEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        public Activation.Activation Activation
        {
            get => _activation ?? (_activation = new Activation.Activation(_settingsBase));
            set => _activation = value;
        }

        public AppMessages AppMessages
        {
            get => _appMessages ?? (_appMessages = new AppMessages(_settingsBase));
            set => _appMessages = value;
        }

        public Welcome Welcome
        {
            get => _welcome ?? (_welcome = new Welcome(_settingsBase));
            set => _welcome = value;
        }

        public FicoCreditScore FicoCreditScore
        {
            get => _ficoCreditScore ?? (_ficoCreditScore = new FicoCreditScore(_settingsBase));
            set => _ficoCreditScore = value;
        }

        public ForgotUsername ForgotUsername
        {
            get => _forgotUsername ?? (_forgotUsername = new ForgotUsername(_settingsBase));
            set => _forgotUsername = value;
        }

        public Enrollment Enrollment
        {
            get => _enrollment ?? (_enrollment = new Enrollment(_settingsBase));
            set => _enrollment = value;
        }

        public Loan.Loan Loan
        {
            get => _loan ?? (_loan = new Loan.Loan(_settingsBase));
            set => _loan = value;
        }

        public CardControl.CardControl CardControl
        {
            get => _cardControl ?? (_cardControl = new CardControl.CardControl(_settingsBase));
            set => _cardControl = value;
        }

        public CardManagement.CardManagementSettings CardManagement
        {
            get => _cardManagement ?? (_cardManagement = new CardManagement.CardManagementSettings(_settingsBase));
            set => _cardManagement = value;
        }

        public SendMoney SendMoney
        {
            get => _sendMoney ?? (_sendMoney = new SendMoney(_settingsBase));
            set => _sendMoney = value;
        }

        public StopPay StopPay
        {
            get => _stopPay ?? (_stopPay = new StopPay(_settingsBase));
            set => _stopPay = value;
        }

        public MoneyDesktop MoneyDesktop
        {
            get => _moneyDesktop ?? (_moneyDesktop = new MoneyDesktop(_settingsBase));
            set => _moneyDesktop = value;
        }

        public Deals.Deals Deals
        {
            get => _deals ?? (_deals = new Deals.Deals(_settingsBase));
            set => _deals = value;
        }

        public AccountOpening.AccountOpening AccountOpening
        {
            get => _accountOpening ?? (_accountOpening = new AccountOpening.AccountOpening(_settingsBase));
            set => _accountOpening = value;
        }

        public Settings.Settings Settings
        {
            get => _settings ?? (_settings = new Settings.Settings(_settingsBase));
            set => _settings = value;
        }

        public BillPay.BillPay BillPay
        {
            get => _billPay ?? (_billPay = new BillPay.BillPay(_settingsBase));
            set => _billPay = value;
        }

        public CheckDeposit CheckDeposit
        {
            get => _checkDeposit ?? (_checkDeposit = new CheckDeposit(_settingsBase));
            set => _checkDeposit = value;
        }

        public LocationSearch LocationSearch
        {
            get => _locationSearch ?? (_locationSearch = new LocationSearch(_settingsBase));
            set => _locationSearch = value;
        }

        public Estatements EStatements
        {
            get => _estatements ?? (_estatements = new Estatements(_settingsBase));
            set => _estatements = value;
        }

        public Branding.Branding Branding
        {
            get => _branding ?? (_branding = new Branding.Branding(_settingsBase));
            set => _branding = value;
        }

        public Security.Security Security
        {
            get => _security ?? (_security = new Security.Security(_settingsBase));
            set => _security = value;
        }

        public Promotions.PromoChannel PromoChannel
        {
            get => _promoChannel ?? (_promoChannel = new Promotions.PromoChannel(_settingsBase));
            set => _promoChannel = value;
        }

        public Alerts Alerts
        {
            get => _alerts ?? (_alerts = new Alerts(_settingsBase));
            set => _alerts = value;
        }

        public NextLoginSteps NextLoginSteps
        {
            get => _nextLoginSteps ?? (_nextLoginSteps = new NextLoginSteps(_settingsBase));
            set => _nextLoginSteps = value;
        }

        public Accounts.Accounts Accounts
        {
            get => _accounts ?? (_accounts = new Accounts.Accounts(_settingsBase));
            set => _accounts = value;
        }

        public QuickBalance.QuickBalance QuickBalance
        {
            get => _quickBalance ?? (_quickBalance = new QuickBalance.QuickBalance(_settingsBase));
            set => _quickBalance = value;
        }

        public QuickAccountInfo QuickAccountInfo
        {
            get => _quickAccountInfo ?? (_quickAccountInfo = new QuickAccountInfo(_settingsBase));
            set => _quickAccountInfo = value;
        }

        public Transfers.Transfers Transfers
        {
            get => _transfers ?? (_transfers = new Transfers.Transfers(_settingsBase));
            set => _transfers = value;
        }

        public AdvancePay AdvancePay
        {
            get => _advancePay ?? (_advancePay = new AdvancePay(_settingsBase));
            set => _advancePay = value;
        }

        public SavvyMoney SavvyMoney
        {
            get => _savvyMoney ?? (_savvyMoney = new SavvyMoney(_settingsBase));
            set => _savvyMoney = value;
        }

        public HouseHolding HouseHolding
        {
            get => _houseHolding ?? (_houseHolding = new HouseHolding(_settingsBase));
            set => _houseHolding = value;
        }

        public VersionManagement VersionManagement
        {
            get => _versionManagement ?? (_versionManagement = new VersionManagement(_settingsBase));
            set => _versionManagement = value;
        }

        public MyCardInfo MyCardInfo
        {
            get => _myCardInfo ?? (_myCardInfo = new MyCardInfo(_settingsBase));
            set => _myCardInfo = value;
        }

        public Marketing Marketing
        {
            get => _marketing ?? (_marketing = new Marketing(_settingsBase));
            set => _marketing = value;
        }

        public ContactUs ContactUs
        {
            get => _contactUs ?? (_contactUs = new ContactUs(_settingsBase));
            set => _contactUs = value;
        }

        public CardAlerts CardAlerts
        {
            get => _cardAlerts ?? (_cardAlerts = new CardAlerts(_settingsBase));
            set => _cardAlerts = value;
        }

        public MyCuClub MyCuClub
        {
            get => _myCuClub ?? (_myCuClub = new MyCuClub(_settingsBase));
            set => _myCuClub = value;
        }

        public PushNotification PushNotification
        {
            get => _pushNotification ?? (_pushNotification = new PushNotification(_settingsBase));
            set => _pushNotification = value;
        }

        public UserDevices.UserDevices UserDevices
        {
            get => _userDevices ?? (_userDevices = new UserDevices.UserDevices(_settingsBase));
            set => _userDevices = value;
        }

        public MobileWebViews MobileWebViews
        {
            get => _mobileWebViews ?? (_mobileWebViews = new MobileWebViews(_settingsBase));
            set => _mobileWebViews = value;
        }

        public PasswordEncryption PasswordEncryption
        {
            get => _passwordEncryption ?? (_passwordEncryption = new PasswordEncryption(_settingsBase));
            set => _passwordEncryption = value;
        }

        public PinChange PinChange
        {
            get => _pinChange ?? (_pinChange = new PinChange(_settingsBase));
            set => _pinChange = value;
        }

        public Login Login
        {
            get => _login ?? (_login = new Login(_settingsBase));
            set => _login = value;
        }

        public ConnectNative ConnectNative
        {
            get => _connectNative ?? (_connectNative = new ConnectNative(_settingsBase));
            set => _connectNative = value;
        }

        public ConnectNativeSettings ConnectNativeSettings
        {
            get => _connectNativeSettings ?? (_connectNativeSettings = new ConnectNativeSettings(_settingsBase));
            set => _connectNativeSettings = value;
        }

        public MobileMenu Menu
        {
            get => _menu ?? (_menu = new MobileMenu(_settingsBase));
            set => _menu = value;
        }

        public DigitalWallet DigitalWallet
        {
            get => _digitalWallet ?? (_digitalWallet = new DigitalWallet(_settingsBase));
            set => _digitalWallet = value;
        }

        public PinEncryption PinEncryption
        {
            get => _pinEncryption ?? (_pinEncryption = new PinEncryption(_settingsBase));
            set => _pinEncryption = value;
        }

        public DocumentCenter DocumentCenter
        {
            get => _documentCenter ?? (_documentCenter = new DocumentCenter(_settingsBase));
            set => _documentCenter = value;
        }

        public Chat.Comm100 Comm100
        {
            get => _comm100 ?? (_comm100 = new Chat.Comm100(_settingsBase));
            set => _comm100 = value;
        }

        public LoanOffers.LoanOffers LoanOffers
        {
            get => _loanOffers ?? (_loanOffers = new LoanOffers.LoanOffers(_settingsBase));
            set => _loanOffers = value;
        }

        public Rates Rates
        {
            get => _rates ?? (_rates = new Rates(_settingsBase));
            set => _rates = value;
        }

        public LinkedAccounts LinkedAccounts
        {
            get => _linkedAccounts ?? (_linkedAccounts = new LinkedAccounts(_settingsBase));
            set => _linkedAccounts = value;
        }

        public RateAndReview RateAndReview
        {
            get => _rateAndReview ?? (_rateAndReview = new RateAndReview(_settingsBase));
            set => _rateAndReview = value;
        }

        public Larky Larky
        {
            get => _larky ?? (_larky = new Larky(_settingsBase));
            set => _larky = value;
        }

        public RestrictedWordSettings RestrictedWordSettings
        {
            get => _restrictedWordSettings ?? (_restrictedWordSettings = new RestrictedWordSettings(_settingsBase));
            set => _restrictedWordSettings = value;
        }

        public GliaSettings GliaSettings
        {
            get => _gliaSettings ?? (_gliaSettings = new GliaSettings(_settingsBase));
            set => _gliaSettings = value;
        }

        public DirectDeposit DirectDeposit
        {
            get => _directDeposit ?? (_directDeposit = new DirectDeposit(_settingsBase));
            set => _directDeposit = value;
        }

        public TalkativeChatSettings TalkativeChat
        {
            get => _talkativeChatSettings ?? (_talkativeChatSettings = new TalkativeChatSettings(_settingsBase));
            set => _talkativeChatSettings = value;
        }

        public CreditScoreHistorySettings CreditScoreHistory
        {
            get => _creditScoreHistorySettings ?? (_creditScoreHistorySettings = new CreditScoreHistorySettings(_settingsBase));
            set => _creditScoreHistorySettings = value;
        }

        public DiscountTicketsSettings DiscountTickets
        {
            get => _discountTicketsSettings ?? (_discountTicketsSettings = new DiscountTicketsSettings(_settingsBase));
            set => _discountTicketsSettings = value;
        }

        public DeepTargetSettings DeepTarget
        {
            get => _deepTargetSettings ?? (_deepTargetSettings = new DeepTargetSettings(_settingsBase));
            set => _deepTargetSettings = value;
        }

        public SecureForms SecureForms
        {
            get => _secureForms ?? (_secureForms = new SecureForms(_settingsBase));
            set => _secureForms = value;
        }
    }
}
