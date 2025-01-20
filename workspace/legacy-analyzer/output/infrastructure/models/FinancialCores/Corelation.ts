// Generated imports
import { PullCreditSettings } from '../PullCreditSettings';
import { LossScreeningSettings } from '../LossScreeningSettings';
import { Identification } from '../Identification';
import { Notes } from '../Notes';
import { AccountTypes } from '../AccountTypes';
import { InquiryAllowedPersonLinkCategories } from '../InquiryAllowedPersonLinkCategories';
import { DraftLookup } from '../DraftLookup';
import { Enrollment } from '../Admin/Enrollment';
import { Funding } from '../Funding';
import { ApplicationSettings } from '../ApplicationSettings';
import { AccountTypeSettings } from '../AccountTypeSettings';
import { CardTypeSettings } from '../CardTypeSettings';
import { PersonTypeSettings } from '../PersonTypeSettings';
import { LoanOriginationSettings } from '../LoanOriginationSettings';

export interface Corelation {
    pullCreditSettings: PullCreditSettings;
    lossScreeningSettings: LossScreeningSettings;
    /** @settingKey FinancialCore.Corelation.ServiceUrl */
    serviceUrl: string;
    /** @settingKey FinancialCore.Corelation.MaxReturnSearchLimit */
    maxReturnSearchLimit: number;
    /** @settingKey FinancialCore.Corelation.Authentication.UserName */
    userName: string;
    /** @settingKey FinancialCore.Corelation.Authentication.Password */
    password: string;
    /** @settingKey FinancialCore.Corelation.Authentication.DeviceName */
    deviceName: string;
    /** @settingKey FinacialCore.Corelation.GetAllNotes */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// includeAllNotes Option, Passed
     * /// ///�N� No
     * /// ///�Y� Yes
     * /// ///Specifies whether all note records are to be included for the returned person records, accounts,
     * /// /// shares and loans.The default is �N�. If unspecified or set to �N� the system only returns
     * /// /// note records where the Note Type has the Alert Option set to �Y� and the expiration date indicates
     * /// /// it is not expired. If set to �Y�, then all note records are included, even expired ones.
     * /// /// </summary>
     * /// </summary>
     */
    getAllNotes: boolean;
    identification: Identification;
    corelationSettings: Notes;
    accountTypes: AccountTypes;
    /** @settingKey FinancialCore.Corelation.EmployeeAccountTypeSerial */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If an account has this Account Type serial, we know that this account is owned by an employee.
     * /// /// </summary>
     * /// </summary>
     */
    employeeAccountTypeSerial: string;
    /** @settingKey FinacialCore.Corelation.PinVerifyChannelSerial */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// The login channel serial to use when validating a PIN and userID entered by a user.
     * /// /// </summary>
     * /// </summary>
     */
    pinVerifyChannelSerial: string;
    /** @settingKey FinancialCore.Corelation.LoginChannelDescription */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// The description (name) of the login channel description to use when validating a PIN and userID entered by a user.
     * /// /// </summary>
     * /// </summary>
     */
    loginChannelDescription: string;
    /** @settingKey FinancialCore.Corelation.InquiryAllowedPersonLinkCategories */
    list: InquiryAllowedPersonLinkCategories;
    /** @settingKey FinancialCore.Corelation.AddressChange.ExistingAddressSearchResultsReturnLimit */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// How many results should be returned when searching for an existing address to use for the address add or change request.
     * /// /// </summary>
     * /// </summary>
     */
    existingAddressSearchResultsReturnLimit: number;
    draftLookup: DraftLookup;
    corelationSettings: Enrollment;
    corelationSettings: Funding;
    /** @settingKey FinacialCore.Corelation.ManualApprovalNoteDictionary */
    manualApprovalNoteJsonStringDictionary: string;
    applicationSettings: ApplicationSettings;
    accountTypeSettings: AccountTypeSettings;
    cardTypeSettings: CardTypeSettings;
    personTypeSettings: PersonTypeSettings;
    /** @settingKey FinancialCore.Corelation.OnlyAllowSsnForEnrollmentTin */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If this setting is true, only TINs that are SSN type, rather than EIN, or some other TIN type, will be considered during enrollment.
     * /// /// </summary>
     * /// </summary>
     */
    onlyAllowSsnForEnrollmentTin: boolean;
    loanOriginationSettings: LoanOriginationSettings;
}
