import { Setting, ISettingsGroup, ISettingsMetadata } from '@/types/ClientConfiguration/base/types';
import { PullCreditSettings } from './CorelationSettings/PullCreditSettings';
import { LossScreeningSettings } from './CorelationSettings/LossScreeningSettings';
import { Identification } from './CorelationSettings/Identification';
import { Notes } from './CorelationSettings/Notes';
import { AccountTypes } from './CorelationSettings/AccountTypes';
import { DraftLookup } from './CorelationSettings/DraftLookup';
import { Enrollment } from './CorelationSettings/Enrollment';
import { Funding } from './CorelationSettings/Funding';
import { ApplicationSettings } from './CorelationSettings/ApplicationSettings';
import { AccountTypeSettings } from './CorelationSettings/AccountTypeSettings';
import { CardTypeSettings } from './CorelationSettings/CardTypeSettings';
import { PersonTypeSettings } from './CorelationSettings/PersonTypeSettings';
import { LoanOriginationSettings } from './CorelationSettings/LoanOriginationSettings';

/**
 * Configuration interface for Corelation settings
 */
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
    LoanOriginationSettings: LoanOriginationSettings;
    OnlyAllowSsnForEnrollmentTin: boolean;
}

/**
 * Settings group for Corelation financial core integration
 */
export class Corelation implements ISettingsGroup {
    private _settings: Setting[] = [];
    private _pullCreditSettings: PullCreditSettings = new PullCreditSettings();
    private _lossScreeningSettings: LossScreeningSettings = new LossScreeningSettings();
    private _serviceUrl: string = '';
    private _maxReturnSearchLimit: number = 100;
    private _userName: string = '';
    private _password: string = '';
    private _deviceName: string = '';
    private _getAllNotes: boolean = false;
    private _identification: Identification = new Identification();
    private _notes: Notes = new Notes();
    private _accountTypes: AccountTypes = new AccountTypes();
    private _employeeAccountTypeSerial: string = '';
    private _pinVerifyChannelSerial: string = '';
    private _loginChannelDescription: string = '';
    private _inquiryAllowedPersonLinkCategories: string[] = [];
    private _existingAddressSearchResultsReturnLimit: number = 10;
    private _draftLookup: DraftLookup = new DraftLookup();
    private _enrollment: Enrollment = new Enrollment();
    private _funding: Funding = new Funding();
    private _manualApprovalNoteJsonStringDictionary: string = '';
    private _application: ApplicationSettings = new ApplicationSettings();
    private _accountType: AccountTypeSettings = new AccountTypeSettings();
    private _cardType: CardTypeSettings = new CardTypeSettings();
    private _personType: PersonTypeSettings = new PersonTypeSettings();
    private _loanOriginationSettings: LoanOriginationSettings = new LoanOriginationSettings();
    private _onlyAllowSsnForEnrollmentTin: boolean = false;

    /**
     * Static metadata for the settings class
     */
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Corelation',
        settings: {
            serviceUrl: {
                key: 'Corelation.ServiceUrl',
                type: 'string',
                required: true
            },
            maxReturnSearchLimit: {
                key: 'Corelation.MaxReturnSearchLimit',
                type: 'number',
                required: true
            },
            userName: {
                key: 'Corelation.UserName',
                type: 'string',
                required: true
            },
            password: {
                key: 'Corelation.Password',
                type: 'string',
                required: true
            },
            deviceName: {
                key: 'Corelation.DeviceName',
                type: 'string',
                required: true
            },
            getAllNotes: {
                key: 'Corelation.GetAllNotes',
                type: 'boolean',
                required: false
            },
            employeeAccountTypeSerial: {
                key: 'Corelation.EmployeeAccountTypeSerial',
                type: 'string',
                required: false
            },
            pinVerifyChannelSerial: {
                key: 'Corelation.PinVerifyChannelSerial',
                type: 'string',
                required: false
            },
            loginChannelDescription: {
                key: 'Corelation.LoginChannelDescription',
                type: 'string',
                required: false
            },
            inquiryAllowedPersonLinkCategories: {
                key: 'Corelation.InquiryAllowedPersonLinkCategories',
                type: 'json',
                required: false
            },
            existingAddressSearchResultsReturnLimit: {
                key: 'Corelation.ExistingAddressSearchResultsReturnLimit',
                type: 'number',
                required: false
            },
            manualApprovalNoteJsonStringDictionary: {
                key: 'Corelation.ManualApprovalNoteJsonStringDictionary',
                type: 'string',
                required: false
            },
            loanOriginationSettings: {
                key: 'Corelation.LoanOriginationSettings',
                type: 'string',
                required: true
            },
            onlyAllowSsnForEnrollmentTin: {
                key: 'Corelation.OnlyAllowSsnForEnrollmentTin',
                type: 'boolean',
                required: false
            }
        }
    };

    /** Pull credit settings */
    get pullCreditSettings(): PullCreditSettings {
        return this._pullCreditSettings;
    }
    set pullCreditSettings(value: PullCreditSettings) {
        this._pullCreditSettings = value;
    }

    /** Loss screening settings */
    get lossScreeningSettings(): LossScreeningSettings {
        return this._lossScreeningSettings;
    }
    set lossScreeningSettings(value: LossScreeningSettings) {
        this._lossScreeningSettings = value;
    }

    /** Service URL for Corelation API */
    get serviceUrl(): string {
        return this._serviceUrl;
    }
    set serviceUrl(value: string) {
        this._serviceUrl = value;
    }

    /** Maximum number of search results to return */
    get maxReturnSearchLimit(): number {
        return this._maxReturnSearchLimit;
    }
    set maxReturnSearchLimit(value: number) {
        this._maxReturnSearchLimit = value;
    }

    /** Username for Corelation API authentication */
    get userName(): string {
        return this._userName;
    }
    set userName(value: string) {
        this._userName = value;
    }

    /** Password for Corelation API authentication */
    get password(): string {
        return this._password;
    }
    set password(value: string) {
        this._password = value;
    }

    /** Device name for Corelation API requests */
    get deviceName(): string {
        return this._deviceName;
    }
    set deviceName(value: string) {
        this._deviceName = value;
    }

    /** Whether to retrieve all notes */
    get getAllNotes(): boolean {
        return this._getAllNotes;
    }
    set getAllNotes(value: boolean) {
        this._getAllNotes = value;
    }

    /** Identification settings */
    get identification(): Identification {
        return this._identification;
    }
    set identification(value: Identification) {
        this._identification = value;
    }

    /** Notes settings */
    get notes(): Notes {
        return this._notes;
    }
    set notes(value: Notes) {
        this._notes = value;
    }

    /** Account types settings */
    get accountTypes(): AccountTypes {
        return this._accountTypes;
    }
    set accountTypes(value: AccountTypes) {
        this._accountTypes = value;
    }

    /** Employee account type serial */
    get employeeAccountTypeSerial(): string {
        return this._employeeAccountTypeSerial;
    }
    set employeeAccountTypeSerial(value: string) {
        this._employeeAccountTypeSerial = value;
    }

    /** PIN verification channel serial */
    get pinVerifyChannelSerial(): string {
        return this._pinVerifyChannelSerial;
    }
    set pinVerifyChannelSerial(value: string) {
        this._pinVerifyChannelSerial = value;
    }

    /** Login channel description */
    get loginChannelDescription(): string {
        return this._loginChannelDescription;
    }
    set loginChannelDescription(value: string) {
        this._loginChannelDescription = value;
    }

    /** Allowed person link categories for inquiry */
    get inquiryAllowedPersonLinkCategories(): string[] {
        return this._inquiryAllowedPersonLinkCategories;
    }
    set inquiryAllowedPersonLinkCategories(value: string[]) {
        this._inquiryAllowedPersonLinkCategories = value;
    }

    /** Maximum number of existing address search results to return */
    get existingAddressSearchResultsReturnLimit(): number {
        return this._existingAddressSearchResultsReturnLimit;
    }
    set existingAddressSearchResultsReturnLimit(value: number) {
        this._existingAddressSearchResultsReturnLimit = value;
    }

    /** Draft lookup settings */
    get draftLookup(): DraftLookup {
        return this._draftLookup;
    }
    set draftLookup(value: DraftLookup) {
        this._draftLookup = value;
    }

    /** Enrollment settings */
    get enrollment(): Enrollment {
        return this._enrollment;
    }
    set enrollment(value: Enrollment) {
        this._enrollment = value;
    }

    /** Funding settings */
    get funding(): Funding {
        return this._funding;
    }
    set funding(value: Funding) {
        this._funding = value;
    }

    /** Manual approval note JSON string dictionary */
    get manualApprovalNoteJsonStringDictionary(): string {
        return this._manualApprovalNoteJsonStringDictionary;
    }
    set manualApprovalNoteJsonStringDictionary(value: string) {
        this._manualApprovalNoteJsonStringDictionary = value;
    }

    /** Application settings */
    get application(): ApplicationSettings {
        return this._application;
    }
    set application(value: ApplicationSettings) {
        this._application = value;
    }

    /** Account type settings */
    get accountType(): AccountTypeSettings {
        return this._accountType;
    }
    set accountType(value: AccountTypeSettings) {
        this._accountType = value;
    }

    /** Card type settings */
    get cardType(): CardTypeSettings {
        return this._cardType;
    }
    set cardType(value: CardTypeSettings) {
        this._cardType = value;
    }

    /** Person type settings */
    get personType(): PersonTypeSettings {
        return this._personType;
    }
    set personType(value: PersonTypeSettings) {
        this._personType = value;
    }

    /** Loan origination settings */
    get loanOriginationSettings(): LoanOriginationSettings {
        return this._loanOriginationSettings;
    }
    set loanOriginationSettings(value: LoanOriginationSettings) {
        this._loanOriginationSettings = value;
    }

    /** Whether to only allow SSN for enrollment TIN */
    get onlyAllowSsnForEnrollmentTin(): boolean {
        return this._onlyAllowSsnForEnrollmentTin;
    }
    set onlyAllowSsnForEnrollmentTin(value: boolean) {
        this._onlyAllowSsnForEnrollmentTin = value;
    }

    /**
     * Convert settings to API format
     */
    toSettings(): Setting[] {
        if (this._settings.length) {
            return this._settings;
        }

        const settings: Setting[] = [
            {
                key: Corelation.metadata.settings.serviceUrl.key,
                value: this._serviceUrl,
                dataType: 'string'
            },
            {
                key: Corelation.metadata.settings.maxReturnSearchLimit.key,
                value: this._maxReturnSearchLimit.toString(),
                dataType: 'number'
            },
            {
                key: Corelation.metadata.settings.userName.key,
                value: this._userName,
                dataType: 'string'
            },
            {
                key: Corelation.metadata.settings.password.key,
                value: this._password,
                dataType: 'string'
            },
            {
                key: Corelation.metadata.settings.deviceName.key,
                value: this._deviceName,
                dataType: 'string'
            },
            {
                key: Corelation.metadata.settings.getAllNotes.key,
                value: this._getAllNotes.toString(),
                dataType: 'boolean'
            },
            {
                key: Corelation.metadata.settings.employeeAccountTypeSerial.key,
                value: this._employeeAccountTypeSerial,
                dataType: 'string'
            },
            {
                key: Corelation.metadata.settings.pinVerifyChannelSerial.key,
                value: this._pinVerifyChannelSerial,
                dataType: 'string'
            },
            {
                key: Corelation.metadata.settings.loginChannelDescription.key,
                value: this._loginChannelDescription,
                dataType: 'string'
            },
            {
                key: Corelation.metadata.settings.inquiryAllowedPersonLinkCategories.key,
                value: JSON.stringify(this._inquiryAllowedPersonLinkCategories),
                dataType: 'json'
            },
            {
                key: Corelation.metadata.settings.existingAddressSearchResultsReturnLimit.key,
                value: this._existingAddressSearchResultsReturnLimit.toString(),
                dataType: 'number'
            },
            {
                key: Corelation.metadata.settings.manualApprovalNoteJsonStringDictionary.key,
                value: this._manualApprovalNoteJsonStringDictionary,
                dataType: 'string'
            },
            {
                key: Corelation.metadata.settings.loanOriginationSettings.key,
                value: JSON.stringify(this._loanOriginationSettings),
                dataType: 'string'
            },
            {
                key: Corelation.metadata.settings.onlyAllowSsnForEnrollmentTin.key,
                value: this._onlyAllowSsnForEnrollmentTin.toString(),
                dataType: 'boolean'
            }
        ];

        // Add settings from child objects
        settings.push(...this._pullCreditSettings.toSettings());
        settings.push(...this._lossScreeningSettings.toSettings());
        settings.push(...this._identification.toSettings());
        settings.push(...this._notes.toSettings());
        settings.push(...this._accountTypes.toSettings());
        settings.push(...this._draftLookup.toSettings());
        settings.push(...this._enrollment.toSettings());
        settings.push(...this._funding.toSettings());
        settings.push(...this._application.toSettings());
        settings.push(...this._accountType.toSettings());
        settings.push(...this._cardType.toSettings());
        settings.push(...this._personType.toSettings());
        settings.push(...this._loanOriginationSettings.toSettings());

        return settings;
    }

    /**
     * Update settings from API format
     */
    fromSettings(settings: Setting[]): void {
        this._settings = settings;

        // Process top-level settings
        for (const setting of settings) {
            switch (setting.key) {
                case Corelation.metadata.settings.serviceUrl.key:
                    this._serviceUrl = setting.value;
                    break;
                case Corelation.metadata.settings.maxReturnSearchLimit.key:
                    this._maxReturnSearchLimit = Number(setting.value);
                    break;
                case Corelation.metadata.settings.userName.key:
                    this._userName = setting.value;
                    break;
                case Corelation.metadata.settings.password.key:
                    this._password = setting.value;
                    break;
                case Corelation.metadata.settings.deviceName.key:
                    this._deviceName = setting.value;
                    break;
                case Corelation.metadata.settings.getAllNotes.key:
                    this._getAllNotes = setting.value.toLowerCase() === 'true';
                    break;
                case Corelation.metadata.settings.employeeAccountTypeSerial.key:
                    this._employeeAccountTypeSerial = setting.value;
                    break;
                case Corelation.metadata.settings.pinVerifyChannelSerial.key:
                    this._pinVerifyChannelSerial = setting.value;
                    break;
                case Corelation.metadata.settings.loginChannelDescription.key:
                    this._loginChannelDescription = setting.value;
                    break;
                case Corelation.metadata.settings.inquiryAllowedPersonLinkCategories.key:
                    this._inquiryAllowedPersonLinkCategories = JSON.parse(setting.value);
                    break;
                case Corelation.metadata.settings.existingAddressSearchResultsReturnLimit.key:
                    this._existingAddressSearchResultsReturnLimit = Number(setting.value);
                    break;
                case Corelation.metadata.settings.manualApprovalNoteJsonStringDictionary.key:
                    this._manualApprovalNoteJsonStringDictionary = setting.value;
                    break;
                case Corelation.metadata.settings.loanOriginationSettings.key:
                    this._loanOriginationSettings = JSON.parse(setting.value);
                    break;
                case Corelation.metadata.settings.onlyAllowSsnForEnrollmentTin.key:
                    this._onlyAllowSsnForEnrollmentTin = setting.value.toLowerCase() === 'true';
                    break;
            }
        }

        // Process child object settings
        this._pullCreditSettings.fromSettings(settings);
        this._lossScreeningSettings.fromSettings(settings);
        this._identification.fromSettings(settings);
        this._notes.fromSettings(settings);
        this._accountTypes.fromSettings(settings);
        this._draftLookup.fromSettings(settings);
        this._enrollment.fromSettings(settings);
        this._funding.fromSettings(settings);
        this._application.fromSettings(settings);
        this._accountType.fromSettings(settings);
        this._cardType.fromSettings(settings);
        this._personType.fromSettings(settings);
        this._loanOriginationSettings.fromSettings(settings);
    }
}