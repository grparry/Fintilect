import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { PullCreditSettings } from './PullCreditSettings';
import { LossScreeningSettings } from './LossScreeningSettings';
import { Identification } from './Identification';
import { Notes } from './CorelationSettings.Notes';
import { AccountTypes } from './AccountTypes';
import { DraftLookup } from './DraftLookup';
import { Enrollment } from './CorelationSettings.Enrollment';
import { Funding } from './CorelationSettings.Funding';
import { ApplicationSettings } from './ApplicationSettings';
import { AccountTypeSettings } from './AccountTypeSettings';
import { CardTypeSettings } from './CardTypeSettings';
import { PersonTypeSettings } from './PersonTypeSettings';
import { LoanOriginationSettings } from './LoanOriginationSettings';
export interface CorelationConfig {
    PullCreditSettings: PullCreditSettings;
    LossScreeningSettings: LossScreeningSettings;
    ServiceUrl: string;
    MaxReturnSearchLimit: number;
    UserName: string;
    Password: string;
    DeviceName: string;
    GetAllNotes: boolean;
    Identification: Identification;
    Notes: Notes;
    AccountTypes: AccountTypes;
    EmployeeAccountTypeSerial: string;
    PinVerifyChannelSerial: string;
    LoginChannelDescription: string;
    InquiryAllowedPersonLinkCategories: string[];
    ExistingAddressSearchResultsReturnLimit: number;
    DraftLookup: DraftLookup;
    Enrollment: Enrollment;
    Funding: Funding;
    ManualApprovalNoteJsonStringDictionary: string;
    Application: ApplicationSettings;
    AccountType: AccountTypeSettings;
    CardType: CardTypeSettings;
    PersonType: PersonTypeSettings;
    OnlyAllowSsnForEnrollmentTin: boolean;
    LoanOrigination: LoanOriginationSettings;
}

export class Corelation implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Corelation'
    };


            private _pullCreditSettings: PullCreditSettings;
            get pullCreditSettings(): PullCreditSettings {
                return this._pullCreditSettings;
            }
            set pullCreditSettings(value: PullCreditSettings) {
                this._pullCreditSettings = value;
            }

            private _lossScreeningSettings: LossScreeningSettings;
            get lossScreeningSettings(): LossScreeningSettings {
                return this._lossScreeningSettings;
            }
            set lossScreeningSettings(value: LossScreeningSettings) {
                this._lossScreeningSettings = value;
            }

            private _serviceUrl: string;
            get serviceUrl(): string {
                return this._serviceUrl;
            }
            set serviceUrl(value: string) {
                this._serviceUrl = value;
            }

            private _maxReturnSearchLimit: number;
            get maxReturnSearchLimit(): number {
                return this._maxReturnSearchLimit;
            }
            set maxReturnSearchLimit(value: number) {
                this._maxReturnSearchLimit = value;
            }

            private _userName: string;
            get userName(): string {
                return this._userName;
            }
            set userName(value: string) {
                this._userName = value;
            }

            private _password: string;
            get password(): string {
                return this._password;
            }
            set password(value: string) {
                this._password = value;
            }

            private _deviceName: string;
            get deviceName(): string {
                return this._deviceName;
            }
            set deviceName(value: string) {
                this._deviceName = value;
            }

            private _getAllNotes: boolean;
            get getAllNotes(): boolean {
                return this._getAllNotes;
            }
            set getAllNotes(value: boolean) {
                this._getAllNotes = value;
            }

            private _identification: Identification;
            get identification(): Identification {
                return this._identification;
            }
            set identification(value: Identification) {
                this._identification = value;
            }

            private _notes: Notes;
            get notes(): Notes {
                return this._notes;
            }
            set notes(value: Notes) {
                this._notes = value;
            }

            private _accountTypes: AccountTypes;
            get accountTypes(): AccountTypes {
                return this._accountTypes;
            }
            set accountTypes(value: AccountTypes) {
                this._accountTypes = value;
            }

            private _employeeAccountTypeSerial: string;
            get employeeAccountTypeSerial(): string {
                return this._employeeAccountTypeSerial;
            }
            set employeeAccountTypeSerial(value: string) {
                this._employeeAccountTypeSerial = value;
            }

            private _pinVerifyChannelSerial: string;
            get pinVerifyChannelSerial(): string {
                return this._pinVerifyChannelSerial;
            }
            set pinVerifyChannelSerial(value: string) {
                this._pinVerifyChannelSerial = value;
            }

            private _loginChannelDescription: string;
            get loginChannelDescription(): string {
                return this._loginChannelDescription;
            }
            set loginChannelDescription(value: string) {
                this._loginChannelDescription = value;
            }

            private _inquiryAllowedPersonLinkCategories: string[];
            get inquiryAllowedPersonLinkCategories(): string[] {
                return this._inquiryAllowedPersonLinkCategories;
            }
            set inquiryAllowedPersonLinkCategories(value: string[]) {
                this._inquiryAllowedPersonLinkCategories = value;
            }

            private _existingAddressSearchResultsReturnLimit: number;
            get existingAddressSearchResultsReturnLimit(): number {
                return this._existingAddressSearchResultsReturnLimit;
            }
            set existingAddressSearchResultsReturnLimit(value: number) {
                this._existingAddressSearchResultsReturnLimit = value;
            }

            private _draftLookup: DraftLookup;
            get draftLookup(): DraftLookup {
                return this._draftLookup;
            }
            set draftLookup(value: DraftLookup) {
                this._draftLookup = value;
            }

            private _enrollment: Enrollment;
            get enrollment(): Enrollment {
                return this._enrollment;
            }
            set enrollment(value: Enrollment) {
                this._enrollment = value;
            }

            private _funding: Funding;
            get funding(): Funding {
                return this._funding;
            }
            set funding(value: Funding) {
                this._funding = value;
            }

            private _manualApprovalNoteJsonStringDictionary: string;
            get manualApprovalNoteJsonStringDictionary(): string {
                return this._manualApprovalNoteJsonStringDictionary;
            }
            set manualApprovalNoteJsonStringDictionary(value: string) {
                this._manualApprovalNoteJsonStringDictionary = value;
            }

            private _application: ApplicationSettings;
            get application(): ApplicationSettings {
                return this._application;
            }
            set application(value: ApplicationSettings) {
                this._application = value;
            }

            private _accountType: AccountTypeSettings;
            get accountType(): AccountTypeSettings {
                return this._accountType;
            }
            set accountType(value: AccountTypeSettings) {
                this._accountType = value;
            }

            private _cardType: CardTypeSettings;
            get cardType(): CardTypeSettings {
                return this._cardType;
            }
            set cardType(value: CardTypeSettings) {
                this._cardType = value;
            }

            private _personType: PersonTypeSettings;
            get personType(): PersonTypeSettings {
                return this._personType;
            }
            set personType(value: PersonTypeSettings) {
                this._personType = value;
            }

            private _onlyAllowSsnForEnrollmentTin: boolean;
            get onlyAllowSsnForEnrollmentTin(): boolean {
                return this._onlyAllowSsnForEnrollmentTin;
            }
            set onlyAllowSsnForEnrollmentTin(value: boolean) {
                this._onlyAllowSsnForEnrollmentTin = value;
            }

            private _loanOrigination: LoanOriginationSettings;
            get loanOrigination(): LoanOriginationSettings {
                return this._loanOrigination;
            }
            set loanOrigination(value: LoanOriginationSettings) {
                this._loanOrigination = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "Corelation.PullCreditSettings", value: this._pullCreditSettings, dataType: 'pullcreditsettings', label: "Pull Credit Settings" },
                { key: "Corelation.LossScreeningSettings", value: this._lossScreeningSettings, dataType: 'lossscreeningsettings', label: "Loss Screening Settings" },
                { key: "Corelation.ServiceUrl", value: this._serviceUrl, dataType: 'string', label: "Service Url" },
                { key: "Corelation.MaxReturnSearchLimit", value: this._maxReturnSearchLimit, dataType: 'number', label: "Max Return Search Limit" },
                { key: "Corelation.UserName", value: this._userName, dataType: 'string', label: "User Name" },
                { key: "Corelation.Password", value: this._password, dataType: 'string', label: "Password" },
                { key: "Corelation.DeviceName", value: this._deviceName, dataType: 'string', label: "Device Name" },
                { key: "Corelation.GetAllNotes", value: this._getAllNotes, dataType: 'boolean', label: "Get All Notes" },
                { key: "Corelation.Identification", value: this._identification, dataType: 'identification', label: "Identification" },
                { key: "Corelation.Notes", value: this._notes, dataType: 'corelationsettings.notes', label: "Notes" },
                { key: "Corelation.AccountTypes", value: this._accountTypes, dataType: 'accounttypes', label: "Account Types" },
                { key: "Corelation.EmployeeAccountTypeSerial", value: this._employeeAccountTypeSerial, dataType: 'string', label: "Employee Account Type Serial" },
                { key: "Corelation.PinVerifyChannelSerial", value: this._pinVerifyChannelSerial, dataType: 'string', label: "Pin Verify Channel Serial" },
                { key: "Corelation.LoginChannelDescription", value: this._loginChannelDescription, dataType: 'string', label: "Login Channel Description" },
                { key: "Corelation.InquiryAllowedPersonLinkCategories", value: this._inquiryAllowedPersonLinkCategories, dataType: 'list<string>', label: "Inquiry Allowed Person Link Categories" },
                { key: "Corelation.ExistingAddressSearchResultsReturnLimit", value: this._existingAddressSearchResultsReturnLimit, dataType: 'number', label: "Existing Address Search Results Return Limit" },
                { key: "Corelation.DraftLookup", value: this._draftLookup, dataType: 'draftlookup', label: "Draft Lookup" },
                { key: "Corelation.Enrollment", value: this._enrollment, dataType: 'corelationsettings.enrollment', label: "Enrollment" },
                { key: "Corelation.Funding", value: this._funding, dataType: 'corelationsettings.funding', label: "Funding" },
                { key: "Corelation.ManualApprovalNoteJsonStringDictionary", value: this._manualApprovalNoteJsonStringDictionary, dataType: 'string', label: "Manual Approval Note Json String Dictionary" },
                { key: "Corelation.Application", value: this._application, dataType: 'applicationsettings', label: "Application" },
                { key: "Corelation.AccountType", value: this._accountType, dataType: 'accounttypesettings', label: "Account Type" },
                { key: "Corelation.CardType", value: this._cardType, dataType: 'cardtypesettings', label: "Card Type" },
                { key: "Corelation.PersonType", value: this._personType, dataType: 'persontypesettings', label: "Person Type" },
                { key: "Corelation.OnlyAllowSsnForEnrollmentTin", value: this._onlyAllowSsnForEnrollmentTin, dataType: 'boolean', label: "Only Allow Ssn For Enrollment Tin" },
                { key: "Corelation.LoanOrigination", value: this._loanOrigination, dataType: 'loanoriginationsettings', label: "Loan Origination" },
            ];
        }

}