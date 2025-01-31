import { Setting, ISettingsGroup, ISettingsMetadata } from '@/types/ClientConfiguration/base/types';
import { FinancialCoreTypes } from './FinancialCoreTypes';
import { Symitar } from './SymitarSettings/Symitar';
import { DNA } from './DNA';
import { Epl } from './Epl';
import { Notes } from './Notes';
import { PsiCore } from './PsiCore';
import { LoanOriginationSettings } from './LoanOriginationSettings';
import { RemoteDepositCheckHoldSettings } from './SymitarSettings/RemoteDepositCheckHoldSettings';

/**
 * Configuration interface for Financial Core settings
 */
export interface FinancialCoreConfig {
    CoreType: FinancialCoreTypes;
    UseClassicCore: boolean;
    ShouldBypassICoreForAccountInquiry: boolean;
    ShouldBypassICoreForScheduledTransfers: boolean;
    ShouldMapPasswordDuringAccountInquiry: boolean;
    CoreConnectionString: string;
    CacheAccountInquiry: boolean;
    CacheAccountInquiryForClassicCores: boolean;
    CacheAccountInquiryWaitForSeconds: number;
    CacheExpireInMinutes: number;
    ThrottleAccoutInquiry: number;
    Symitar: Symitar;
    Epl: Epl;
    DNA: DNA;
    PsiCore: PsiCore;
    Notes: Notes;
    LoanOriginationSettings: LoanOriginationSettings;
    RemoteDepositCheckHoldSettings: RemoteDepositCheckHoldSettings;
}

/**
 * Settings for Financial Core configuration
 */
export class FinancialCore implements ISettingsGroup {
    private _settings: Setting[] = [];
    private _coreType: FinancialCoreTypes = FinancialCoreTypes.Corelation;
    private _useClassicCore: boolean = false;
    private _shouldBypassICoreForAccountInquiry: boolean = false;
    private _shouldBypassICoreForScheduledTransfers: boolean = false;
    private _shouldMapPasswordDuringAccountInquiry: boolean = false;
    private _coreConnectionString: string = '';
    private _cacheAccountInquiry: boolean = false;
    private _cacheAccountInquiryForClassicCores: boolean = false;
    private _cacheAccountInquiryWaitForSeconds: number = 0;
    private _cacheExpireInMinutes: number = 0;
    private _throttleAccoutInquiry: number = 0;

    private _symitar: Symitar = new Symitar();
    private _dna: DNA = new DNA();
    private _epl: Epl = new Epl();
    private _notes: Notes = new Notes();
    private _psiCore: PsiCore = new PsiCore();
    private _loanOriginationSettings: LoanOriginationSettings = new LoanOriginationSettings();
    private _remoteDepositCheckHoldSettings: RemoteDepositCheckHoldSettings = new RemoteDepositCheckHoldSettings();

    /**
     * Static metadata for the settings class
     */
    static readonly metadata: ISettingsMetadata = {
        groupName: 'FinancialCore',
        settings: {
            coreType: {
                key: 'FinancialCore.CoreType',
                type: 'FinancialCoreTypes',
                required: true
            },
            useClassicCore: {
                key: 'FinancialCore.UseClassicCore',
                type: 'boolean',
                required: true
            },
            shouldBypassICoreForAccountInquiry: {
                key: 'FinancialCore.ShouldBypassICoreForAccountInquiry',
                type: 'boolean',
                required: true
            },
            shouldBypassICoreForScheduledTransfers: {
                key: 'FinancialCore.ShouldBypassICoreForScheduledTransfers',
                type: 'boolean',
                required: true
            },
            shouldMapPasswordDuringAccountInquiry: {
                key: 'FinancialCore.ShouldMapPasswordDuringAccountInquiry',
                type: 'boolean',
                required: true
            },
            coreConnectionString: {
                key: 'FinancialCore.CoreConnectionString',
                type: 'string',
                required: true
            },
            cacheAccountInquiry: {
                key: 'FinancialCore.CacheAccountInquiry',
                type: 'boolean',
                required: true
            },
            cacheAccountInquiryForClassicCores: {
                key: 'FinancialCore.CacheAccountInquiryForClassicCores',
                type: 'boolean',
                required: true
            },
            cacheAccountInquiryWaitForSeconds: {
                key: 'FinancialCore.CacheAccountInquiryWaitForSeconds',
                type: 'number',
                required: true
            },
            cacheExpireInMinutes: {
                key: 'FinancialCore.CacheExpireInMinutes',
                type: 'number',
                required: true
            },
            throttleAccoutInquiry: {
                key: 'FinancialCore.ThrottleAccoutInquiry',
                type: 'number',
                required: true
            }
        }
    };

    /** Financial core type */
    get coreType(): FinancialCoreTypes {
        return this._coreType;
    }
    set coreType(value: FinancialCoreTypes) {
        this._coreType = value;
    }

    /** Use classic core */
    get useClassicCore(): boolean {
        return this._useClassicCore;
    }
    set useClassicCore(value: boolean) {
        this._useClassicCore = value;
    }

    /** Should bypass ICore for account inquiry */
    get shouldBypassICoreForAccountInquiry(): boolean {
        return this._shouldBypassICoreForAccountInquiry;
    }
    set shouldBypassICoreForAccountInquiry(value: boolean) {
        this._shouldBypassICoreForAccountInquiry = value;
    }

    /** Should bypass ICore for scheduled transfers */
    get shouldBypassICoreForScheduledTransfers(): boolean {
        return this._shouldBypassICoreForScheduledTransfers;
    }
    set shouldBypassICoreForScheduledTransfers(value: boolean) {
        this._shouldBypassICoreForScheduledTransfers = value;
    }

    /** Should map password during account inquiry */
    get shouldMapPasswordDuringAccountInquiry(): boolean {
        return this._shouldMapPasswordDuringAccountInquiry;
    }
    set shouldMapPasswordDuringAccountInquiry(value: boolean) {
        this._shouldMapPasswordDuringAccountInquiry = value;
    }

    /** Core connection string */
    get coreConnectionString(): string {
        return this._coreConnectionString;
    }
    set coreConnectionString(value: string) {
        this._coreConnectionString = value;
    }

    /** Cache account inquiry */
    get cacheAccountInquiry(): boolean {
        return this._cacheAccountInquiry;
    }
    set cacheAccountInquiry(value: boolean) {
        this._cacheAccountInquiry = value;
    }

    /** Cache account inquiry for classic cores */
    get cacheAccountInquiryForClassicCores(): boolean {
        return this._cacheAccountInquiryForClassicCores;
    }
    set cacheAccountInquiryForClassicCores(value: boolean) {
        this._cacheAccountInquiryForClassicCores = value;
    }

    /** Cache account inquiry wait for seconds */
    get cacheAccountInquiryWaitForSeconds(): number {
        return this._cacheAccountInquiryWaitForSeconds;
    }
    set cacheAccountInquiryWaitForSeconds(value: number) {
        this._cacheAccountInquiryWaitForSeconds = value;
    }

    /** Cache expire in minutes */
    get cacheExpireInMinutes(): number {
        return this._cacheExpireInMinutes;
    }
    set cacheExpireInMinutes(value: number) {
        this._cacheExpireInMinutes = value;
    }

    /** Throttle account inquiry */
    get throttleAccoutInquiry(): number {
        return this._throttleAccoutInquiry;
    }
    set throttleAccoutInquiry(value: number) {
        this._throttleAccoutInquiry = value;
    }

    /** Symitar settings */
    get symitar(): Symitar {
        return this._symitar;
    }
    set symitar(value: Symitar) {
        this._symitar = value;
    }

    /** DNA settings */
    get dna(): DNA {
        return this._dna;
    }
    set dna(value: DNA) {
        this._dna = value;
    }

    /** EPL settings */
    get epl(): Epl {
        return this._epl;
    }
    set epl(value: Epl) {
        this._epl = value;
    }

    /** Notes settings */
    get notes(): Notes {
        return this._notes;
    }
    set notes(value: Notes) {
        this._notes = value;
    }

    /** PSI Core settings */
    get psiCore(): PsiCore {
        return this._psiCore;
    }
    set psiCore(value: PsiCore) {
        this._psiCore = value;
    }

    /** Loan origination settings */
    get loanOriginationSettings(): LoanOriginationSettings {
        return this._loanOriginationSettings;
    }
    set loanOriginationSettings(value: LoanOriginationSettings) {
        this._loanOriginationSettings = value;
    }

    /** Remote deposit check hold settings */
    get remoteDepositCheckHoldSettings(): RemoteDepositCheckHoldSettings {
        return this._remoteDepositCheckHoldSettings;
    }
    set remoteDepositCheckHoldSettings(value: RemoteDepositCheckHoldSettings) {
        this._remoteDepositCheckHoldSettings = value;
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
                key: FinancialCore.metadata.settings.coreType.key,
                value: this._coreType,
                dataType: 'string'
            },
            {
                key: FinancialCore.metadata.settings.useClassicCore.key,
                value: String(this._useClassicCore),
                dataType: 'boolean'
            },
            {
                key: FinancialCore.metadata.settings.shouldBypassICoreForAccountInquiry.key,
                value: String(this._shouldBypassICoreForAccountInquiry),
                dataType: 'boolean'
            },
            {
                key: FinancialCore.metadata.settings.shouldBypassICoreForScheduledTransfers.key,
                value: String(this._shouldBypassICoreForScheduledTransfers),
                dataType: 'boolean'
            },
            {
                key: FinancialCore.metadata.settings.shouldMapPasswordDuringAccountInquiry.key,
                value: String(this._shouldMapPasswordDuringAccountInquiry),
                dataType: 'boolean'
            },
            {
                key: FinancialCore.metadata.settings.coreConnectionString.key,
                value: this._coreConnectionString,
                dataType: 'string'
            },
            {
                key: FinancialCore.metadata.settings.cacheAccountInquiry.key,
                value: String(this._cacheAccountInquiry),
                dataType: 'boolean'
            },
            {
                key: FinancialCore.metadata.settings.cacheAccountInquiryForClassicCores.key,
                value: String(this._cacheAccountInquiryForClassicCores),
                dataType: 'boolean'
            },
            {
                key: FinancialCore.metadata.settings.cacheAccountInquiryWaitForSeconds.key,
                value: String(this._cacheAccountInquiryWaitForSeconds),
                dataType: 'number'
            },
            {
                key: FinancialCore.metadata.settings.cacheExpireInMinutes.key,
                value: String(this._cacheExpireInMinutes),
                dataType: 'number'
            },
            {
                key: FinancialCore.metadata.settings.throttleAccoutInquiry.key,
                value: String(this._throttleAccoutInquiry),
                dataType: 'number'
            }
        ];

        // Add settings from child objects
        return settings.concat(
            this._symitar.toSettings(),
            this._dna.toSettings(),
            this._epl.toSettings(),
            this._notes.toSettings(),
            this._psiCore.toSettings(),
            this._loanOriginationSettings.toSettings(),
            this._remoteDepositCheckHoldSettings.toSettings()
        );
    }

    /**
     * Update settings from API format
     */
    fromSettings(settings: Setting[]): void {
        this._settings = settings;

        // Process settings for this class
        for (const setting of settings) {
            switch (setting.key) {
                case FinancialCore.metadata.settings.coreType.key:
                    this._coreType = FinancialCoreTypes[setting.value as keyof typeof FinancialCoreTypes];
                    break;
                case FinancialCore.metadata.settings.useClassicCore.key:
                    this._useClassicCore = setting.value.toLowerCase() === 'true';
                    break;
                case FinancialCore.metadata.settings.shouldBypassICoreForAccountInquiry.key:
                    this._shouldBypassICoreForAccountInquiry = setting.value.toLowerCase() === 'true';
                    break;
                case FinancialCore.metadata.settings.shouldBypassICoreForScheduledTransfers.key:
                    this._shouldBypassICoreForScheduledTransfers = setting.value.toLowerCase() === 'true';
                    break;
                case FinancialCore.metadata.settings.shouldMapPasswordDuringAccountInquiry.key:
                    this._shouldMapPasswordDuringAccountInquiry = setting.value.toLowerCase() === 'true';
                    break;
                case FinancialCore.metadata.settings.coreConnectionString.key:
                    this._coreConnectionString = setting.value;
                    break;
                case FinancialCore.metadata.settings.cacheAccountInquiry.key:
                    this._cacheAccountInquiry = setting.value.toLowerCase() === 'true';
                    break;
                case FinancialCore.metadata.settings.cacheAccountInquiryForClassicCores.key:
                    this._cacheAccountInquiryForClassicCores = setting.value.toLowerCase() === 'true';
                    break;
                case FinancialCore.metadata.settings.cacheAccountInquiryWaitForSeconds.key:
                    this._cacheAccountInquiryWaitForSeconds = Number(setting.value);
                    break;
                case FinancialCore.metadata.settings.cacheExpireInMinutes.key:
                    this._cacheExpireInMinutes = Number(setting.value);
                    break;
                case FinancialCore.metadata.settings.throttleAccoutInquiry.key:
                    this._throttleAccoutInquiry = Number(setting.value);
                    break;
            }
        }

        // Process settings for child objects
        this._symitar.fromSettings(settings);
        this._dna.fromSettings(settings);
        this._epl.fromSettings(settings);
        this._notes.fromSettings(settings);
        this._psiCore.fromSettings(settings);
        this._loanOriginationSettings.fromSettings(settings);
        this._remoteDepositCheckHoldSettings.fromSettings(settings);
    }
}