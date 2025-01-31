import { Setting, ISettingsGroup, ISettingsMetadata } from '@/types/ClientConfiguration/base/types';

/**
 * Configuration interface for Loan Origination settings
 */
export interface LoanOriginationSettingsConfig {
    ApplicationTypeSerial: string;
    ApplicationChannel: string;
    ApplicationBranch: string;
    DefaultCreditLimit: string;
    DefaultPaymentAmount: string;
    WorkFlowSerial: string;
    WorkQueueApproveSerial: string;
    WorkQueueRescreenSerial: string;
    WorkQueueReviewSerial: string;
    WorkQueueDeclineSerial: string;
    WorkQueueIlaDefaultSerial: string;
    OnlineApplicationNoteTypeSerial: string;
    CommentsNoteTypeSerial: string;
    AccountDisclosureNoteTypeSerial: string;
    EnoticesDisclosureNoteTypeSerial: string;
    PrivacyNoticeDisclosureNoteTypeSerial: string;
    DecisionTypeSerial: string;
    CreditTypeSerialChexSystems: string;
    CreditTypeSerialEquifax: string;
    CreditTypeSerialTransUnion: string;
}

/**
 * Settings for Loan Origination configuration
 */
export class LoanOriginationSettings implements ISettingsGroup {
    private _settings: Setting[] = [];
    private _applicationTypeSerial: string = '';
    private _applicationChannel: string = '';
    private _applicationBranch: string = '';
    private _defaultCreditLimit: string = '';
    private _defaultPaymentAmount: string = '';
    private _workFlowSerial: string = '';
    private _workQueueApproveSerial: string = '';
    private _workQueueRescreenSerial: string = '';
    private _workQueueReviewSerial: string = '';
    private _workQueueDeclineSerial: string = '';
    private _workQueueIlaDefaultSerial: string = '';
    private _onlineApplicationNoteTypeSerial: string = '';
    private _commentsNoteTypeSerial: string = '';
    private _accountDisclosureNoteTypeSerial: string = '';
    private _enoticesDisclosureNoteTypeSerial: string = '';
    private _privacyNoticeDisclosureNoteTypeSerial: string = '';
    private _decisionTypeSerial: string = '';
    private _creditTypeSerialChexSystems: string = '';
    private _creditTypeSerialEquifax: string = '';
    private _creditTypeSerialTransUnion: string = '';

    /**
     * Static metadata for the settings class
     */
    static readonly metadata: ISettingsMetadata = {
        groupName: 'LoanOriginationSettings',
        settings: {
            applicationTypeSerial: {
                key: 'LoanOriginationSettings.ApplicationTypeSerial',
                type: 'string',
                required: true
            },
            applicationChannel: {
                key: 'LoanOriginationSettings.ApplicationChannel',
                type: 'string',
                required: true
            },
            applicationBranch: {
                key: 'LoanOriginationSettings.ApplicationBranch',
                type: 'string',
                required: true
            },
            defaultCreditLimit: {
                key: 'LoanOriginationSettings.DefaultCreditLimit',
                type: 'string',
                required: true
            },
            defaultPaymentAmount: {
                key: 'LoanOriginationSettings.DefaultPaymentAmount',
                type: 'string',
                required: true
            },
            workFlowSerial: {
                key: 'LoanOriginationSettings.WorkFlowSerial',
                type: 'string',
                required: true
            },
            workQueueApproveSerial: {
                key: 'LoanOriginationSettings.WorkQueueApproveSerial',
                type: 'string',
                required: true
            },
            workQueueRescreenSerial: {
                key: 'LoanOriginationSettings.WorkQueueRescreenSerial',
                type: 'string',
                required: true
            },
            workQueueReviewSerial: {
                key: 'LoanOriginationSettings.WorkQueueReviewSerial',
                type: 'string',
                required: true
            },
            workQueueDeclineSerial: {
                key: 'LoanOriginationSettings.WorkQueueDeclineSerial',
                type: 'string',
                required: true
            },
            workQueueIlaDefaultSerial: {
                key: 'LoanOriginationSettings.WorkQueueIlaDefaultSerial',
                type: 'string',
                required: true
            },
            onlineApplicationNoteTypeSerial: {
                key: 'LoanOriginationSettings.OnlineApplicationNoteTypeSerial',
                type: 'string',
                required: true
            },
            commentsNoteTypeSerial: {
                key: 'LoanOriginationSettings.CommentsNoteTypeSerial',
                type: 'string',
                required: true
            },
            accountDisclosureNoteTypeSerial: {
                key: 'LoanOriginationSettings.AccountDisclosureNoteTypeSerial',
                type: 'string',
                required: true
            },
            enoticesDisclosureNoteTypeSerial: {
                key: 'LoanOriginationSettings.EnoticesDisclosureNoteTypeSerial',
                type: 'string',
                required: true
            },
            privacyNoticeDisclosureNoteTypeSerial: {
                key: 'LoanOriginationSettings.PrivacyNoticeDisclosureNoteTypeSerial',
                type: 'string',
                required: true
            },
            decisionTypeSerial: {
                key: 'LoanOriginationSettings.DecisionTypeSerial',
                type: 'string',
                required: true
            },
            creditTypeSerialChexSystems: {
                key: 'LoanOriginationSettings.CreditTypeSerialChexSystems',
                type: 'string',
                required: true
            },
            creditTypeSerialEquifax: {
                key: 'LoanOriginationSettings.CreditTypeSerialEquifax',
                type: 'string',
                required: true
            },
            creditTypeSerialTransUnion: {
                key: 'LoanOriginationSettings.CreditTypeSerialTransUnion',
                type: 'string',
                required: true
            }
        }
    };

    /** Application type serial */
    get applicationTypeSerial(): string {
        return this._applicationTypeSerial;
    }
    set applicationTypeSerial(value: string) {
        this._applicationTypeSerial = value;
    }

    /** Application channel */
    get applicationChannel(): string {
        return this._applicationChannel;
    }
    set applicationChannel(value: string) {
        this._applicationChannel = value;
    }

    /** Application branch */
    get applicationBranch(): string {
        return this._applicationBranch;
    }
    set applicationBranch(value: string) {
        this._applicationBranch = value;
    }

    /** Default credit limit */
    get defaultCreditLimit(): string {
        return this._defaultCreditLimit;
    }
    set defaultCreditLimit(value: string) {
        this._defaultCreditLimit = value;
    }

    /** Default payment amount */
    get defaultPaymentAmount(): string {
        return this._defaultPaymentAmount;
    }
    set defaultPaymentAmount(value: string) {
        this._defaultPaymentAmount = value;
    }

    /** Work flow serial */
    get workFlowSerial(): string {
        return this._workFlowSerial;
    }
    set workFlowSerial(value: string) {
        this._workFlowSerial = value;
    }

    /** Work queue approve serial */
    get workQueueApproveSerial(): string {
        return this._workQueueApproveSerial;
    }
    set workQueueApproveSerial(value: string) {
        this._workQueueApproveSerial = value;
    }

    /** Work queue rescreen serial */
    get workQueueRescreenSerial(): string {
        return this._workQueueRescreenSerial;
    }
    set workQueueRescreenSerial(value: string) {
        this._workQueueRescreenSerial = value;
    }

    /** Work queue review serial */
    get workQueueReviewSerial(): string {
        return this._workQueueReviewSerial;
    }
    set workQueueReviewSerial(value: string) {
        this._workQueueReviewSerial = value;
    }

    /** Work queue decline serial */
    get workQueueDeclineSerial(): string {
        return this._workQueueDeclineSerial;
    }
    set workQueueDeclineSerial(value: string) {
        this._workQueueDeclineSerial = value;
    }

    /** Work queue ILA default serial */
    get workQueueIlaDefaultSerial(): string {
        return this._workQueueIlaDefaultSerial;
    }
    set workQueueIlaDefaultSerial(value: string) {
        this._workQueueIlaDefaultSerial = value;
    }

    /** Online application note type serial */
    get onlineApplicationNoteTypeSerial(): string {
        return this._onlineApplicationNoteTypeSerial;
    }
    set onlineApplicationNoteTypeSerial(value: string) {
        this._onlineApplicationNoteTypeSerial = value;
    }

    /** Comments note type serial */
    get commentsNoteTypeSerial(): string {
        return this._commentsNoteTypeSerial;
    }
    set commentsNoteTypeSerial(value: string) {
        this._commentsNoteTypeSerial = value;
    }

    /** Account disclosure note type serial */
    get accountDisclosureNoteTypeSerial(): string {
        return this._accountDisclosureNoteTypeSerial;
    }
    set accountDisclosureNoteTypeSerial(value: string) {
        this._accountDisclosureNoteTypeSerial = value;
    }

    /** Enotices disclosure note type serial */
    get enoticesDisclosureNoteTypeSerial(): string {
        return this._enoticesDisclosureNoteTypeSerial;
    }
    set enoticesDisclosureNoteTypeSerial(value: string) {
        this._enoticesDisclosureNoteTypeSerial = value;
    }

    /** Privacy notice disclosure note type serial */
    get privacyNoticeDisclosureNoteTypeSerial(): string {
        return this._privacyNoticeDisclosureNoteTypeSerial;
    }
    set privacyNoticeDisclosureNoteTypeSerial(value: string) {
        this._privacyNoticeDisclosureNoteTypeSerial = value;
    }

    /** Decision type serial */
    get decisionTypeSerial(): string {
        return this._decisionTypeSerial;
    }
    set decisionTypeSerial(value: string) {
        this._decisionTypeSerial = value;
    }

    /** Credit type serial ChexSystems */
    get creditTypeSerialChexSystems(): string {
        return this._creditTypeSerialChexSystems;
    }
    set creditTypeSerialChexSystems(value: string) {
        this._creditTypeSerialChexSystems = value;
    }

    /** Credit type serial Equifax */
    get creditTypeSerialEquifax(): string {
        return this._creditTypeSerialEquifax;
    }
    set creditTypeSerialEquifax(value: string) {
        this._creditTypeSerialEquifax = value;
    }

    /** Credit type serial TransUnion */
    get creditTypeSerialTransUnion(): string {
        return this._creditTypeSerialTransUnion;
    }
    set creditTypeSerialTransUnion(value: string) {
        this._creditTypeSerialTransUnion = value;
    }

    /**
     * Convert settings to API format
     */
    toSettings(): Setting[] {
        if (this._settings.length) {
            return this._settings;
        }

        return [
            {
                key: LoanOriginationSettings.metadata.settings.applicationTypeSerial.key,
                value: this._applicationTypeSerial,
                dataType: 'string'
            },
            {
                key: LoanOriginationSettings.metadata.settings.applicationChannel.key,
                value: this._applicationChannel,
                dataType: 'string'
            },
            {
                key: LoanOriginationSettings.metadata.settings.applicationBranch.key,
                value: this._applicationBranch,
                dataType: 'string'
            },
            {
                key: LoanOriginationSettings.metadata.settings.defaultCreditLimit.key,
                value: this._defaultCreditLimit,
                dataType: 'string'
            },
            {
                key: LoanOriginationSettings.metadata.settings.defaultPaymentAmount.key,
                value: this._defaultPaymentAmount,
                dataType: 'string'
            },
            {
                key: LoanOriginationSettings.metadata.settings.workFlowSerial.key,
                value: this._workFlowSerial,
                dataType: 'string'
            },
            {
                key: LoanOriginationSettings.metadata.settings.workQueueApproveSerial.key,
                value: this._workQueueApproveSerial,
                dataType: 'string'
            },
            {
                key: LoanOriginationSettings.metadata.settings.workQueueRescreenSerial.key,
                value: this._workQueueRescreenSerial,
                dataType: 'string'
            },
            {
                key: LoanOriginationSettings.metadata.settings.workQueueReviewSerial.key,
                value: this._workQueueReviewSerial,
                dataType: 'string'
            },
            {
                key: LoanOriginationSettings.metadata.settings.workQueueDeclineSerial.key,
                value: this._workQueueDeclineSerial,
                dataType: 'string'
            },
            {
                key: LoanOriginationSettings.metadata.settings.workQueueIlaDefaultSerial.key,
                value: this._workQueueIlaDefaultSerial,
                dataType: 'string'
            },
            {
                key: LoanOriginationSettings.metadata.settings.onlineApplicationNoteTypeSerial.key,
                value: this._onlineApplicationNoteTypeSerial,
                dataType: 'string'
            },
            {
                key: LoanOriginationSettings.metadata.settings.commentsNoteTypeSerial.key,
                value: this._commentsNoteTypeSerial,
                dataType: 'string'
            },
            {
                key: LoanOriginationSettings.metadata.settings.accountDisclosureNoteTypeSerial.key,
                value: this._accountDisclosureNoteTypeSerial,
                dataType: 'string'
            },
            {
                key: LoanOriginationSettings.metadata.settings.enoticesDisclosureNoteTypeSerial.key,
                value: this._enoticesDisclosureNoteTypeSerial,
                dataType: 'string'
            },
            {
                key: LoanOriginationSettings.metadata.settings.privacyNoticeDisclosureNoteTypeSerial.key,
                value: this._privacyNoticeDisclosureNoteTypeSerial,
                dataType: 'string'
            },
            {
                key: LoanOriginationSettings.metadata.settings.decisionTypeSerial.key,
                value: this._decisionTypeSerial,
                dataType: 'string'
            },
            {
                key: LoanOriginationSettings.metadata.settings.creditTypeSerialChexSystems.key,
                value: this._creditTypeSerialChexSystems,
                dataType: 'string'
            },
            {
                key: LoanOriginationSettings.metadata.settings.creditTypeSerialEquifax.key,
                value: this._creditTypeSerialEquifax,
                dataType: 'string'
            },
            {
                key: LoanOriginationSettings.metadata.settings.creditTypeSerialTransUnion.key,
                value: this._creditTypeSerialTransUnion,
                dataType: 'string'
            }
        ];
    }

    /**
     * Update settings from API format
     */
    fromSettings(settings: Setting[]): void {
        this._settings = settings;

        for (const setting of settings) {
            switch (setting.key) {
                case LoanOriginationSettings.metadata.settings.applicationTypeSerial.key:
                    this._applicationTypeSerial = setting.value;
                    break;
                case LoanOriginationSettings.metadata.settings.applicationChannel.key:
                    this._applicationChannel = setting.value;
                    break;
                case LoanOriginationSettings.metadata.settings.applicationBranch.key:
                    this._applicationBranch = setting.value;
                    break;
                case LoanOriginationSettings.metadata.settings.defaultCreditLimit.key:
                    this._defaultCreditLimit = setting.value;
                    break;
                case LoanOriginationSettings.metadata.settings.defaultPaymentAmount.key:
                    this._defaultPaymentAmount = setting.value;
                    break;
                case LoanOriginationSettings.metadata.settings.workFlowSerial.key:
                    this._workFlowSerial = setting.value;
                    break;
                case LoanOriginationSettings.metadata.settings.workQueueApproveSerial.key:
                    this._workQueueApproveSerial = setting.value;
                    break;
                case LoanOriginationSettings.metadata.settings.workQueueRescreenSerial.key:
                    this._workQueueRescreenSerial = setting.value;
                    break;
                case LoanOriginationSettings.metadata.settings.workQueueReviewSerial.key:
                    this._workQueueReviewSerial = setting.value;
                    break;
                case LoanOriginationSettings.metadata.settings.workQueueDeclineSerial.key:
                    this._workQueueDeclineSerial = setting.value;
                    break;
                case LoanOriginationSettings.metadata.settings.workQueueIlaDefaultSerial.key:
                    this._workQueueIlaDefaultSerial = setting.value;
                    break;
                case LoanOriginationSettings.metadata.settings.onlineApplicationNoteTypeSerial.key:
                    this._onlineApplicationNoteTypeSerial = setting.value;
                    break;
                case LoanOriginationSettings.metadata.settings.commentsNoteTypeSerial.key:
                    this._commentsNoteTypeSerial = setting.value;
                    break;
                case LoanOriginationSettings.metadata.settings.accountDisclosureNoteTypeSerial.key:
                    this._accountDisclosureNoteTypeSerial = setting.value;
                    break;
                case LoanOriginationSettings.metadata.settings.enoticesDisclosureNoteTypeSerial.key:
                    this._enoticesDisclosureNoteTypeSerial = setting.value;
                    break;
                case LoanOriginationSettings.metadata.settings.privacyNoticeDisclosureNoteTypeSerial.key:
                    this._privacyNoticeDisclosureNoteTypeSerial = setting.value;
                    break;
                case LoanOriginationSettings.metadata.settings.decisionTypeSerial.key:
                    this._decisionTypeSerial = setting.value;
                    break;
                case LoanOriginationSettings.metadata.settings.creditTypeSerialChexSystems.key:
                    this._creditTypeSerialChexSystems = setting.value;
                    break;
                case LoanOriginationSettings.metadata.settings.creditTypeSerialEquifax.key:
                    this._creditTypeSerialEquifax = setting.value;
                    break;
                case LoanOriginationSettings.metadata.settings.creditTypeSerialTransUnion.key:
                    this._creditTypeSerialTransUnion = setting.value;
                    break;
            }
        }
    }
}