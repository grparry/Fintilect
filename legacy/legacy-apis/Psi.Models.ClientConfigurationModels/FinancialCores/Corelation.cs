using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using Psi.Data.Models.ClientConfigurationModels.FinancialCores.CorelationSettings;

namespace Psi.Data.Models.ClientConfigurationModels.FinancialCores
{
    public class Corelation : SettingsBaseHelper
    {
        private Identification _identification;
        private CorelationSettings.Notes _notes;
        private AccountTypes _accountTypes;
        private DraftLookup _draftLookup;
        private CorelationSettings.Enrollment _enrollment;
        private CorelationSettings.Funding _funding;
        private readonly PersonTypeSettings _personTypeSettings;
        public PullCreditSettings PullCreditSettings => new PullCreditSettings(SettingsBase);
        public LossScreeningSettings LossScreeningSettings => new LossScreeningSettings(SettingsBase);

        public Corelation(ISettingsBase settingsBase) : base(settingsBase) { }

        [SettingKey("FinancialCore.Corelation.ServiceUrl")]
        public string ServiceUrl
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("FinancialCore.Corelation.MaxReturnSearchLimit")]
        public int MaxReturnSearchLimit
        {
            get => int.Parse(GetValue());
            set => SetValue(value);
        }

        [SettingKey("FinancialCore.Corelation.Authentication.UserName")]
        public string UserName
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("FinancialCore.Corelation.Authentication.Password")]
        public string Password
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("FinancialCore.Corelation.Authentication.DeviceName")]
        public string DeviceName
        {
            get => GetValue();
            set => SetValue(value);
        }

        /// <summary>
        /// includeAllNotes Option, Passed
        ///“N” No
        ///“Y” Yes
        ///Specifies whether all note records are to be included for the returned person records, accounts, 
        /// shares and loans.The default is “N”. If unspecified or set to “N” the system only returns 
        /// note records where the Note Type has the Alert Option set to “Y” and the expiration date indicates 
        /// it is not expired. If set to “Y”, then all note records are included, even expired ones.
        /// </summary>
        [SettingKey("FinacialCore.Corelation.GetAllNotes")]
        public bool GetAllNotes
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        public Identification Identification
        {
            get => _identification ?? (_identification = new Identification(SettingsBase));
            set => _identification = value;
        }

        public CorelationSettings.Notes Notes
        {
            get => _notes ?? (_notes = new CorelationSettings.Notes(SettingsBase));
            set => _notes = value;
        }

        public AccountTypes AccountTypes
        {
            get => _accountTypes ?? (_accountTypes = new AccountTypes(SettingsBase));
            set => _accountTypes = value;
        }

        /// <summary>
        /// If an account has this Account Type serial, we know that this account is owned by an employee.
        /// </summary>
        [SettingKey("FinancialCore.Corelation.EmployeeAccountTypeSerial")]
        public string EmployeeAccountTypeSerial
        {
            get => GetValue() ?? string.Empty;
            set => SetValue(value);
        }

        /// <summary>
        /// The login channel serial to use when validating a PIN and userID entered by a user.
        /// </summary>
        [SettingKey("FinacialCore.Corelation.PinVerifyChannelSerial")]
        public string PinVerifyChannelSerial
        {
            get => GetValue() ?? string.Empty;
            set => SetValue(value);
        }

        /// <summary>
        /// The description (name) of the login channel description to use when validating a PIN and userID entered by a user.  
        /// </summary>
        [SettingKey("FinancialCore.Corelation.LoginChannelDescription")]
        public string LoginChannelDescription
        {
            get => GetValue() ?? string.Empty;
            set => SetValue(value);
        }

        [SettingKey("FinancialCore.Corelation.InquiryAllowedPersonLinkCategories")]
        public List<string> InquiryAllowedPersonLinkCategories
        {
            get
            {
                try
                {
                    return GetValue().Split(',').ToList();
                }
                catch (Exception)
                {
                    return new List<string> { "JT", "PR", "PA" };
                }
            }
            //Convert from a list of strings to a CSV string
            set => SetValue(string.Join(",", value.Select(x => x.ToString())));
        }

        /// <summary>
        /// How many results should be returned when searching for an existing address to use for the address add or change request.  
        /// </summary>
        [SettingKey("FinancialCore.Corelation.AddressChange.ExistingAddressSearchResultsReturnLimit")]
        public int ExistingAddressSearchResultsReturnLimit
        {
            get => GetIntValue(defaultValue: 20);
            set => SetValue(value);
        }

        public DraftLookup DraftLookup
        {
            get => _draftLookup ?? (_draftLookup = new DraftLookup(SettingsBase));
            set => _draftLookup = value;
        }

        public CorelationSettings.Enrollment Enrollment
        {
            get => _enrollment ?? (_enrollment = new CorelationSettings.Enrollment(SettingsBase));
            set => _enrollment = value;
        }
        public CorelationSettings.Funding Funding
        {
            get => _funding ?? (_funding = new CorelationSettings.Funding(SettingsBase));
            set => _funding = value;
        }


        [SettingKey("FinacialCore.Corelation.ManualApprovalNoteDictionary")]
        public string ManualApprovalNoteJsonStringDictionary
        {
            get => GetValue();
            set => SetValue(value);
        }
        public string ManualApprovalNoteType(string reasonCode)
        {
            var dictitionary = JsonConvert.DeserializeObject<Dictionary<string, string>>(ManualApprovalNoteJsonStringDictionary);

            if (dictitionary.ContainsKey(reasonCode))
                return dictitionary[reasonCode];

            return string.Empty;
        }

        public ApplicationSettings Application => new ApplicationSettings(SettingsBase);
        public AccountTypeSettings AccountType => new AccountTypeSettings(SettingsBase);
        public CardTypeSettings CardType => new CardTypeSettings(SettingsBase);
        public PersonTypeSettings PersonType => new PersonTypeSettings(SettingsBase);

        /// <summary>
        /// If this setting is true, only TINs that are SSN type, rather than EIN, or some other TIN type, will be considered during enrollment.  
        /// </summary>
        [SettingKey("FinancialCore.Corelation.OnlyAllowSsnForEnrollmentTin")]
        public bool OnlyAllowSsnForEnrollmentTin { get => GetBoolValue(); set => SetValue(value); }

        public LoanOriginationSettings LoanOrigination => new LoanOriginationSettings(SettingsBase);
    }
}