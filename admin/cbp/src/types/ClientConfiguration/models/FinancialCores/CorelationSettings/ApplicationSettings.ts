import { Setting, ISettingsGroup, ISettingsMetadata } from '@/types/ClientConfiguration/base/types';

/**
 * Configuration interface for application settings
 */
export interface ApplicationSettingsConfig {
    TypeSerial: string;
    SaveClientsIp: boolean;
    ChannelSerial: string;
    WorkFlowSerial: string;
    WorkQueueOpenSerial: string;
    WorkQueueNewSerial: string;
    WorkQueueApproveSerial: string;
    WorkQueueRescreenSerial: string;
    ManualApprovalsBypassWorkQueueLogic: boolean;
    WorkQueueReviewSerial: string;
    WorkQueueDeclineSerial: string;
    CreditTypeSerialChexSystems: string;
    CreditTypeSerialEquifax: string;
    CreditTypeSerialTransUnion: string;
    CreditPullMaxDaysOld: string;
}

/**
 * Settings for application configuration
 */
export class ApplicationSettings implements ISettingsGroup {
    private _settings: Setting[] = [];
    private _typeSerial: string = '';
    private _saveClientsIp: boolean = false;
    private _channelSerial: string = '';
    private _workFlowSerial: string = '';
    private _workQueueOpenSerial: string = '';
    private _workQueueNewSerial: string = '';
    private _workQueueApproveSerial: string = '';
    private _workQueueRescreenSerial: string = '';
    private _manualApprovalsBypassWorkQueueLogic: boolean = false;
    private _workQueueReviewSerial: string = '';
    private _workQueueDeclineSerial: string = '';
    private _creditTypeSerialChexSystems: string = '';
    private _creditTypeSerialEquifax: string = '';
    private _creditTypeSerialTransUnion: string = '';
    private _creditPullMaxDaysOld: string = '';

    /**
     * Static metadata for the settings class
     */
    static readonly metadata: ISettingsMetadata = {
        groupName: 'ApplicationSettings',
        settings: {
            typeSerial: {
                key: 'ApplicationSettings.TypeSerial',
                type: 'string',
                required: true
            },
            saveClientsIp: {
                key: 'ApplicationSettings.SaveClientsIp',
                type: 'boolean',
                required: false
            },
            channelSerial: {
                key: 'ApplicationSettings.ChannelSerial',
                type: 'string',
                required: true
            },
            workFlowSerial: {
                key: 'ApplicationSettings.WorkFlowSerial',
                type: 'string',
                required: true
            },
            workQueueOpenSerial: {
                key: 'ApplicationSettings.WorkQueueOpenSerial',
                type: 'string',
                required: true
            },
            workQueueNewSerial: {
                key: 'ApplicationSettings.WorkQueueNewSerial',
                type: 'string',
                required: true
            },
            workQueueApproveSerial: {
                key: 'ApplicationSettings.WorkQueueApproveSerial',
                type: 'string',
                required: true
            },
            workQueueRescreenSerial: {
                key: 'ApplicationSettings.WorkQueueRescreenSerial',
                type: 'string',
                required: true
            },
            manualApprovalsBypassWorkQueueLogic: {
                key: 'ApplicationSettings.ManualApprovalsBypassWorkQueueLogic',
                type: 'boolean',
                required: false
            },
            workQueueReviewSerial: {
                key: 'ApplicationSettings.WorkQueueReviewSerial',
                type: 'string',
                required: true
            },
            workQueueDeclineSerial: {
                key: 'ApplicationSettings.WorkQueueDeclineSerial',
                type: 'string',
                required: true
            },
            creditTypeSerialChexSystems: {
                key: 'ApplicationSettings.CreditTypeSerialChexSystems',
                type: 'string',
                required: false
            },
            creditTypeSerialEquifax: {
                key: 'ApplicationSettings.CreditTypeSerialEquifax',
                type: 'string',
                required: false
            },
            creditTypeSerialTransUnion: {
                key: 'ApplicationSettings.CreditTypeSerialTransUnion',
                type: 'string',
                required: false
            },
            creditPullMaxDaysOld: {
                key: 'ApplicationSettings.CreditPullMaxDaysOld',
                type: 'string',
                required: false
            }
        }
    };

    /** Application type serial */
    get typeSerial(): string {
        return this._typeSerial;
    }
    set typeSerial(value: string) {
        this._typeSerial = value;
    }

    /** Whether to save client's IP address */
    get saveClientsIp(): boolean {
        return this._saveClientsIp;
    }
    set saveClientsIp(value: boolean) {
        this._saveClientsIp = value;
    }

    /** Channel serial */
    get channelSerial(): string {
        return this._channelSerial;
    }
    set channelSerial(value: string) {
        this._channelSerial = value;
    }

    /** Workflow serial */
    get workFlowSerial(): string {
        return this._workFlowSerial;
    }
    set workFlowSerial(value: string) {
        this._workFlowSerial = value;
    }

    /** Work queue open serial */
    get workQueueOpenSerial(): string {
        return this._workQueueOpenSerial;
    }
    set workQueueOpenSerial(value: string) {
        this._workQueueOpenSerial = value;
    }

    /** Work queue new serial */
    get workQueueNewSerial(): string {
        return this._workQueueNewSerial;
    }
    set workQueueNewSerial(value: string) {
        this._workQueueNewSerial = value;
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

    /** Whether manual approvals bypass work queue logic */
    get manualApprovalsBypassWorkQueueLogic(): boolean {
        return this._manualApprovalsBypassWorkQueueLogic;
    }
    set manualApprovalsBypassWorkQueueLogic(value: boolean) {
        this._manualApprovalsBypassWorkQueueLogic = value;
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

    /** ChexSystems credit type serial */
    get creditTypeSerialChexSystems(): string {
        return this._creditTypeSerialChexSystems;
    }
    set creditTypeSerialChexSystems(value: string) {
        this._creditTypeSerialChexSystems = value;
    }

    /** Equifax credit type serial */
    get creditTypeSerialEquifax(): string {
        return this._creditTypeSerialEquifax;
    }
    set creditTypeSerialEquifax(value: string) {
        this._creditTypeSerialEquifax = value;
    }

    /** TransUnion credit type serial */
    get creditTypeSerialTransUnion(): string {
        return this._creditTypeSerialTransUnion;
    }
    set creditTypeSerialTransUnion(value: string) {
        this._creditTypeSerialTransUnion = value;
    }

    /** Maximum age of credit pull in days */
    get creditPullMaxDaysOld(): string {
        return this._creditPullMaxDaysOld;
    }
    set creditPullMaxDaysOld(value: string) {
        this._creditPullMaxDaysOld = value;
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
                key: ApplicationSettings.metadata.settings.typeSerial.key,
                value: this._typeSerial,
                dataType: 'string'
            },
            {
                key: ApplicationSettings.metadata.settings.saveClientsIp.key,
                value: this._saveClientsIp.toString(),
                dataType: 'boolean'
            },
            {
                key: ApplicationSettings.metadata.settings.channelSerial.key,
                value: this._channelSerial,
                dataType: 'string'
            },
            {
                key: ApplicationSettings.metadata.settings.workFlowSerial.key,
                value: this._workFlowSerial,
                dataType: 'string'
            },
            {
                key: ApplicationSettings.metadata.settings.workQueueOpenSerial.key,
                value: this._workQueueOpenSerial,
                dataType: 'string'
            },
            {
                key: ApplicationSettings.metadata.settings.workQueueNewSerial.key,
                value: this._workQueueNewSerial,
                dataType: 'string'
            },
            {
                key: ApplicationSettings.metadata.settings.workQueueApproveSerial.key,
                value: this._workQueueApproveSerial,
                dataType: 'string'
            },
            {
                key: ApplicationSettings.metadata.settings.workQueueRescreenSerial.key,
                value: this._workQueueRescreenSerial,
                dataType: 'string'
            },
            {
                key: ApplicationSettings.metadata.settings.manualApprovalsBypassWorkQueueLogic.key,
                value: this._manualApprovalsBypassWorkQueueLogic.toString(),
                dataType: 'boolean'
            },
            {
                key: ApplicationSettings.metadata.settings.workQueueReviewSerial.key,
                value: this._workQueueReviewSerial,
                dataType: 'string'
            },
            {
                key: ApplicationSettings.metadata.settings.workQueueDeclineSerial.key,
                value: this._workQueueDeclineSerial,
                dataType: 'string'
            },
            {
                key: ApplicationSettings.metadata.settings.creditTypeSerialChexSystems.key,
                value: this._creditTypeSerialChexSystems,
                dataType: 'string'
            },
            {
                key: ApplicationSettings.metadata.settings.creditTypeSerialEquifax.key,
                value: this._creditTypeSerialEquifax,
                dataType: 'string'
            },
            {
                key: ApplicationSettings.metadata.settings.creditTypeSerialTransUnion.key,
                value: this._creditTypeSerialTransUnion,
                dataType: 'string'
            },
            {
                key: ApplicationSettings.metadata.settings.creditPullMaxDaysOld.key,
                value: this._creditPullMaxDaysOld,
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
                case ApplicationSettings.metadata.settings.typeSerial.key:
                    this._typeSerial = setting.value;
                    break;
                case ApplicationSettings.metadata.settings.saveClientsIp.key:
                    this._saveClientsIp = setting.value.toLowerCase() === 'true';
                    break;
                case ApplicationSettings.metadata.settings.channelSerial.key:
                    this._channelSerial = setting.value;
                    break;
                case ApplicationSettings.metadata.settings.workFlowSerial.key:
                    this._workFlowSerial = setting.value;
                    break;
                case ApplicationSettings.metadata.settings.workQueueOpenSerial.key:
                    this._workQueueOpenSerial = setting.value;
                    break;
                case ApplicationSettings.metadata.settings.workQueueNewSerial.key:
                    this._workQueueNewSerial = setting.value;
                    break;
                case ApplicationSettings.metadata.settings.workQueueApproveSerial.key:
                    this._workQueueApproveSerial = setting.value;
                    break;
                case ApplicationSettings.metadata.settings.workQueueRescreenSerial.key:
                    this._workQueueRescreenSerial = setting.value;
                    break;
                case ApplicationSettings.metadata.settings.manualApprovalsBypassWorkQueueLogic.key:
                    this._manualApprovalsBypassWorkQueueLogic = setting.value.toLowerCase() === 'true';
                    break;
                case ApplicationSettings.metadata.settings.workQueueReviewSerial.key:
                    this._workQueueReviewSerial = setting.value;
                    break;
                case ApplicationSettings.metadata.settings.workQueueDeclineSerial.key:
                    this._workQueueDeclineSerial = setting.value;
                    break;
                case ApplicationSettings.metadata.settings.creditTypeSerialChexSystems.key:
                    this._creditTypeSerialChexSystems = setting.value;
                    break;
                case ApplicationSettings.metadata.settings.creditTypeSerialEquifax.key:
                    this._creditTypeSerialEquifax = setting.value;
                    break;
                case ApplicationSettings.metadata.settings.creditTypeSerialTransUnion.key:
                    this._creditTypeSerialTransUnion = setting.value;
                    break;
                case ApplicationSettings.metadata.settings.creditPullMaxDaysOld.key:
                    this._creditPullMaxDaysOld = setting.value;
                    break;
            }
        }
    }
}