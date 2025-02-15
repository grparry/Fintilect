import { Setting, ISettingsGroup, ISettingsMetadata } from '@/types/ClientConfiguration/base/types';

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

    get settings(): Setting[] {
        return this._settings;
    }

    get applicationTypeSerial(): string { return this._applicationTypeSerial; }
    set applicationTypeSerial(value: string) { this._applicationTypeSerial = value; }

    get applicationChannel(): string { return this._applicationChannel; }
    set applicationChannel(value: string) { this._applicationChannel = value; }

    get applicationBranch(): string { return this._applicationBranch; }
    set applicationBranch(value: string) { this._applicationBranch = value; }

    get defaultCreditLimit(): string { return this._defaultCreditLimit; }
    set defaultCreditLimit(value: string) { this._defaultCreditLimit = value; }

    get defaultPaymentAmount(): string { return this._defaultPaymentAmount; }
    set defaultPaymentAmount(value: string) { this._defaultPaymentAmount = value; }

    get workFlowSerial(): string { return this._workFlowSerial; }
    set workFlowSerial(value: string) { this._workFlowSerial = value; }

    get workQueueApproveSerial(): string { return this._workQueueApproveSerial; }
    set workQueueApproveSerial(value: string) { this._workQueueApproveSerial = value; }

    get workQueueRescreenSerial(): string { return this._workQueueRescreenSerial; }
    set workQueueRescreenSerial(value: string) { this._workQueueRescreenSerial = value; }

    get workQueueReviewSerial(): string { return this._workQueueReviewSerial; }
    set workQueueReviewSerial(value: string) { this._workQueueReviewSerial = value; }

    get workQueueDeclineSerial(): string { return this._workQueueDeclineSerial; }
    set workQueueDeclineSerial(value: string) { this._workQueueDeclineSerial = value; }

    get workQueueIlaDefaultSerial(): string { return this._workQueueIlaDefaultSerial; }
    set workQueueIlaDefaultSerial(value: string) { this._workQueueIlaDefaultSerial = value; }

    get onlineApplicationNoteTypeSerial(): string { return this._onlineApplicationNoteTypeSerial; }
    set onlineApplicationNoteTypeSerial(value: string) { this._onlineApplicationNoteTypeSerial = value; }

    get commentsNoteTypeSerial(): string { return this._commentsNoteTypeSerial; }
    set commentsNoteTypeSerial(value: string) { this._commentsNoteTypeSerial = value; }

    get accountDisclosureNoteTypeSerial(): string { return this._accountDisclosureNoteTypeSerial; }
    set accountDisclosureNoteTypeSerial(value: string) { this._accountDisclosureNoteTypeSerial = value; }

    get enoticesDisclosureNoteTypeSerial(): string { return this._enoticesDisclosureNoteTypeSerial; }
    set enoticesDisclosureNoteTypeSerial(value: string) { this._enoticesDisclosureNoteTypeSerial = value; }

    get privacyNoticeDisclosureNoteTypeSerial(): string { return this._privacyNoticeDisclosureNoteTypeSerial; }
    set privacyNoticeDisclosureNoteTypeSerial(value: string) { this._privacyNoticeDisclosureNoteTypeSerial = value; }

    get decisionTypeSerial(): string { return this._decisionTypeSerial; }
    set decisionTypeSerial(value: string) { this._decisionTypeSerial = value; }

    get creditTypeSerialChexSystems(): string { return this._creditTypeSerialChexSystems; }
    set creditTypeSerialChexSystems(value: string) { this._creditTypeSerialChexSystems = value; }

    get creditTypeSerialEquifax(): string { return this._creditTypeSerialEquifax; }
    set creditTypeSerialEquifax(value: string) { this._creditTypeSerialEquifax = value; }

    get creditTypeSerialTransUnion(): string { return this._creditTypeSerialTransUnion; }
    set creditTypeSerialTransUnion(value: string) { this._creditTypeSerialTransUnion = value; }

    fromSettings(settings: Setting[]): void {
        this._settings = settings;
        settings.forEach(setting => {
            const key = setting.key.split('.')[1];
            const value = setting.value;
            switch (key) {
                case 'ApplicationTypeSerial': this.applicationTypeSerial = value; break;
                case 'ApplicationChannel': this.applicationChannel = value; break;
                case 'ApplicationBranch': this.applicationBranch = value; break;
                case 'DefaultCreditLimit': this.defaultCreditLimit = value; break;
                case 'DefaultPaymentAmount': this.defaultPaymentAmount = value; break;
                case 'WorkFlowSerial': this.workFlowSerial = value; break;
                case 'WorkQueueApproveSerial': this.workQueueApproveSerial = value; break;
                case 'WorkQueueRescreenSerial': this.workQueueRescreenSerial = value; break;
                case 'WorkQueueReviewSerial': this.workQueueReviewSerial = value; break;
                case 'WorkQueueDeclineSerial': this.workQueueDeclineSerial = value; break;
                case 'WorkQueueIlaDefaultSerial': this.workQueueIlaDefaultSerial = value; break;
                case 'OnlineApplicationNoteTypeSerial': this.onlineApplicationNoteTypeSerial = value; break;
                case 'CommentsNoteTypeSerial': this.commentsNoteTypeSerial = value; break;
                case 'AccountDisclosureNoteTypeSerial': this.accountDisclosureNoteTypeSerial = value; break;
                case 'EnoticesDisclosureNoteTypeSerial': this.enoticesDisclosureNoteTypeSerial = value; break;
                case 'PrivacyNoticeDisclosureNoteTypeSerial': this.privacyNoticeDisclosureNoteTypeSerial = value; break;
                case 'DecisionTypeSerial': this.decisionTypeSerial = value; break;
                case 'CreditTypeSerialChexSystems': this.creditTypeSerialChexSystems = value; break;
                case 'CreditTypeSerialEquifax': this.creditTypeSerialEquifax = value; break;
                case 'CreditTypeSerialTransUnion': this.creditTypeSerialTransUnion = value; break;
            }
        });
    }

    toSettings(): Setting[] {
        const settings: Setting[] = [];
        const metadata = LoanOriginationSettings.metadata.settings;

        Object.entries(metadata).forEach(([key, meta]) => {
            const value = this[key as keyof LoanOriginationSettings];
            if (value !== undefined) {
                settings.push({
                    key: meta.key,
                    value: value.toString(),
                    dataType: meta.type as 'string' | 'number' | 'boolean' | 'json'
                });
            }
        });

        return settings;
    }
}
