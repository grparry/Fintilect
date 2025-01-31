import { Setting, ISettingsGroup, ISettingsMetadata } from '@/types/ClientConfiguration/base/types';

/**
 * Configuration interface for loss screening settings
 */
export interface LossScreeningSettingsConfig {
    LoanPastDueHoursOffset: number;
    ShareAvailableAmountLessThenZeroPlusMiniumAmount: boolean;
    ShareAvailableAmountLessThenZero: boolean;
    LoanPastDue: boolean;
    ShareHasChargeOfSerial: boolean;
    LoanHasChargeOfSerial: boolean;
    BlockAccountAlertTypeSerials: string;
}

/**
 * Settings for loss screening configuration
 */
export class LossScreeningSettings implements ISettingsGroup {
    private _settings: Setting[] = [];
    private _loanPastDueHoursOffset: number = 0;
    private _shareAvailableAmountLessThenZeroPlusMiniumAmount: boolean = false;
    private _shareAvailableAmountLessThenZero: boolean = false;
    private _loanPastDue: boolean = false;
    private _shareHasChargeOfSerial: boolean = false;
    private _loanHasChargeOfSerial: boolean = false;
    private _blockAccountAlertTypeSerials: string = '';

    /**
     * Static metadata for the settings class
     */
    static readonly metadata: ISettingsMetadata = {
        groupName: 'LossScreeningSettings',
        settings: {
            loanPastDueHoursOffset: {
                key: 'LossScreeningSettings.LoanPastDueHoursOffset',
                type: 'number',
                required: true
            },
            shareAvailableAmountLessThenZeroPlusMiniumAmount: {
                key: 'LossScreeningSettings.ShareAvailableAmountLessThenZeroPlusMiniumAmount',
                type: 'boolean',
                required: false
            },
            shareAvailableAmountLessThenZero: {
                key: 'LossScreeningSettings.ShareAvailableAmountLessThenZero',
                type: 'boolean',
                required: false
            },
            loanPastDue: {
                key: 'LossScreeningSettings.LoanPastDue',
                type: 'boolean',
                required: false
            },
            shareHasChargeOfSerial: {
                key: 'LossScreeningSettings.ShareHasChargeOfSerial',
                type: 'boolean',
                required: false
            },
            loanHasChargeOfSerial: {
                key: 'LossScreeningSettings.LoanHasChargeOfSerial',
                type: 'boolean',
                required: false
            },
            blockAccountAlertTypeSerials: {
                key: 'LossScreeningSettings.BlockAccountAlertTypeSerials',
                type: 'string',
                required: false
            }
        }
    };

    /** Hours offset for loan past due check */
    get loanPastDueHoursOffset(): number {
        return this._loanPastDueHoursOffset;
    }
    set loanPastDueHoursOffset(value: number) {
        this._loanPastDueHoursOffset = value;
    }

    /** Whether to check share available amount less than zero plus minimum amount */
    get shareAvailableAmountLessThenZeroPlusMiniumAmount(): boolean {
        return this._shareAvailableAmountLessThenZeroPlusMiniumAmount;
    }
    set shareAvailableAmountLessThenZeroPlusMiniumAmount(value: boolean) {
        this._shareAvailableAmountLessThenZeroPlusMiniumAmount = value;
    }

    /** Whether to check share available amount less than zero */
    get shareAvailableAmountLessThenZero(): boolean {
        return this._shareAvailableAmountLessThenZero;
    }
    set shareAvailableAmountLessThenZero(value: boolean) {
        this._shareAvailableAmountLessThenZero = value;
    }

    /** Whether to check loan past due */
    get loanPastDue(): boolean {
        return this._loanPastDue;
    }
    set loanPastDue(value: boolean) {
        this._loanPastDue = value;
    }

    /** Whether share has charge off serial */
    get shareHasChargeOfSerial(): boolean {
        return this._shareHasChargeOfSerial;
    }
    set shareHasChargeOfSerial(value: boolean) {
        this._shareHasChargeOfSerial = value;
    }

    /** Whether loan has charge off serial */
    get loanHasChargeOfSerial(): boolean {
        return this._loanHasChargeOfSerial;
    }
    set loanHasChargeOfSerial(value: boolean) {
        this._loanHasChargeOfSerial = value;
    }

    /** Block account alert type serials */
    get blockAccountAlertTypeSerials(): string {
        return this._blockAccountAlertTypeSerials;
    }
    set blockAccountAlertTypeSerials(value: string) {
        this._blockAccountAlertTypeSerials = value;
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
                key: LossScreeningSettings.metadata.settings.loanPastDueHoursOffset.key,
                value: this._loanPastDueHoursOffset.toString(),
                dataType: 'number'
            },
            {
                key: LossScreeningSettings.metadata.settings.shareAvailableAmountLessThenZeroPlusMiniumAmount.key,
                value: this._shareAvailableAmountLessThenZeroPlusMiniumAmount.toString(),
                dataType: 'boolean'
            },
            {
                key: LossScreeningSettings.metadata.settings.shareAvailableAmountLessThenZero.key,
                value: this._shareAvailableAmountLessThenZero.toString(),
                dataType: 'boolean'
            },
            {
                key: LossScreeningSettings.metadata.settings.loanPastDue.key,
                value: this._loanPastDue.toString(),
                dataType: 'boolean'
            },
            {
                key: LossScreeningSettings.metadata.settings.shareHasChargeOfSerial.key,
                value: this._shareHasChargeOfSerial.toString(),
                dataType: 'boolean'
            },
            {
                key: LossScreeningSettings.metadata.settings.loanHasChargeOfSerial.key,
                value: this._loanHasChargeOfSerial.toString(),
                dataType: 'boolean'
            },
            {
                key: LossScreeningSettings.metadata.settings.blockAccountAlertTypeSerials.key,
                value: this._blockAccountAlertTypeSerials,
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
                case LossScreeningSettings.metadata.settings.loanPastDueHoursOffset.key:
                    this._loanPastDueHoursOffset = Number(setting.value);
                    break;
                case LossScreeningSettings.metadata.settings.shareAvailableAmountLessThenZeroPlusMiniumAmount.key:
                    this._shareAvailableAmountLessThenZeroPlusMiniumAmount = setting.value.toLowerCase() === 'true';
                    break;
                case LossScreeningSettings.metadata.settings.shareAvailableAmountLessThenZero.key:
                    this._shareAvailableAmountLessThenZero = setting.value.toLowerCase() === 'true';
                    break;
                case LossScreeningSettings.metadata.settings.loanPastDue.key:
                    this._loanPastDue = setting.value.toLowerCase() === 'true';
                    break;
                case LossScreeningSettings.metadata.settings.shareHasChargeOfSerial.key:
                    this._shareHasChargeOfSerial = setting.value.toLowerCase() === 'true';
                    break;
                case LossScreeningSettings.metadata.settings.loanHasChargeOfSerial.key:
                    this._loanHasChargeOfSerial = setting.value.toLowerCase() === 'true';
                    break;
                case LossScreeningSettings.metadata.settings.blockAccountAlertTypeSerials.key:
                    this._blockAccountAlertTypeSerials = setting.value;
                    break;
            }
        }
    }
}