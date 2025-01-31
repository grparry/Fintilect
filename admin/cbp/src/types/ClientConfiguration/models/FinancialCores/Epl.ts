import { Setting, ISettingsGroup, ISettingsMetadata } from '@/types/ClientConfiguration/base/types';

/**
 * Configuration interface for EPL settings
 */
export interface EplConfig {
    ShouldAddAccountInquiryRepliesForCrossAccounts: boolean;
    CreditCardDepositPermitted: boolean;
    CreditCardInquiryPermitted: boolean;
    CreditCardWithdrawalPermitted: boolean;
}

/**
 * Settings for EPL configuration
 */
export class Epl implements ISettingsGroup {
    private _settings: Setting[] = [];
    private _shouldAddAccountInquiryRepliesForCrossAccounts: boolean = false;
    private _creditCardDepositPermitted: boolean = false;
    private _creditCardInquiryPermitted: boolean = false;
    private _creditCardWithdrawalPermitted: boolean = false;

    /**
     * Static metadata for the settings class
     */
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Epl',
        settings: {
            shouldAddAccountInquiryRepliesForCrossAccounts: {
                key: 'Epl.ShouldAddAccountInquiryRepliesForCrossAccounts',
                type: 'boolean',
                required: true
            },
            creditCardDepositPermitted: {
                key: 'Epl.CreditCardDepositPermitted',
                type: 'boolean',
                required: true
            },
            creditCardInquiryPermitted: {
                key: 'Epl.CreditCardInquiryPermitted',
                type: 'boolean',
                required: true
            },
            creditCardWithdrawalPermitted: {
                key: 'Epl.CreditCardWithdrawalPermitted',
                type: 'boolean',
                required: true
            }
        }
    };

    /** Should add account inquiry replies for cross accounts */
    get shouldAddAccountInquiryRepliesForCrossAccounts(): boolean {
        return this._shouldAddAccountInquiryRepliesForCrossAccounts;
    }
    set shouldAddAccountInquiryRepliesForCrossAccounts(value: boolean) {
        this._shouldAddAccountInquiryRepliesForCrossAccounts = value;
    }

    /** Credit card deposit permitted */
    get creditCardDepositPermitted(): boolean {
        return this._creditCardDepositPermitted;
    }
    set creditCardDepositPermitted(value: boolean) {
        this._creditCardDepositPermitted = value;
    }

    /** Credit card inquiry permitted */
    get creditCardInquiryPermitted(): boolean {
        return this._creditCardInquiryPermitted;
    }
    set creditCardInquiryPermitted(value: boolean) {
        this._creditCardInquiryPermitted = value;
    }

    /** Credit card withdrawal permitted */
    get creditCardWithdrawalPermitted(): boolean {
        return this._creditCardWithdrawalPermitted;
    }
    set creditCardWithdrawalPermitted(value: boolean) {
        this._creditCardWithdrawalPermitted = value;
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
                key: Epl.metadata.settings.shouldAddAccountInquiryRepliesForCrossAccounts.key,
                value: String(this._shouldAddAccountInquiryRepliesForCrossAccounts),
                dataType: 'boolean'
            },
            {
                key: Epl.metadata.settings.creditCardDepositPermitted.key,
                value: String(this._creditCardDepositPermitted),
                dataType: 'boolean'
            },
            {
                key: Epl.metadata.settings.creditCardInquiryPermitted.key,
                value: String(this._creditCardInquiryPermitted),
                dataType: 'boolean'
            },
            {
                key: Epl.metadata.settings.creditCardWithdrawalPermitted.key,
                value: String(this._creditCardWithdrawalPermitted),
                dataType: 'boolean'
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
                case Epl.metadata.settings.shouldAddAccountInquiryRepliesForCrossAccounts.key:
                    this._shouldAddAccountInquiryRepliesForCrossAccounts = setting.value.toLowerCase() === 'true';
                    break;
                case Epl.metadata.settings.creditCardDepositPermitted.key:
                    this._creditCardDepositPermitted = setting.value.toLowerCase() === 'true';
                    break;
                case Epl.metadata.settings.creditCardInquiryPermitted.key:
                    this._creditCardInquiryPermitted = setting.value.toLowerCase() === 'true';
                    break;
                case Epl.metadata.settings.creditCardWithdrawalPermitted.key:
                    this._creditCardWithdrawalPermitted = setting.value.toLowerCase() === 'true';
                    break;
            }
        }
    }
}