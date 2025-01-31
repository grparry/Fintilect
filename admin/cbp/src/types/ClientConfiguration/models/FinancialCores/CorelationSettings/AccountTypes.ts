import { Setting, ISettingsGroup, ISettingsMetadata } from '@/types/ClientConfiguration/base/types';

/**
 * Configuration interface for account types
 */
export interface AccountTypesConfig {
    MoneyMarketShareCategorySerial: string[];
    PrimarySavingsShareCategorySerial: string[];
    CheckingShareCategorySerial: string[];
    InvestmentShareCategorySerial: string[];
    CertificateShareCategorySerial: string[];
    LineOfCreditLoanCategorySerial: string[];
    CreditCardLoanCategorySerial: string[];
    AutoLoanCategorySerial: string[];
    MortgageLoanCategorySerial: string[];
    LoanCategorySerial: string[];
    BusinessSavingsShareCategorySerial: string[];
    DepositShareCategorySerial: string[];
    ExternalMortgageLoanCategorySerial: string[];
    DebitCardCategorySerial: string[];
    BusinessSavingsShareCategorySerialForCategoryMapping: string[];
}

/**
 * Settings for account type categories
 */
export class AccountTypes implements ISettingsGroup {
    private _settings: Setting[] = [];
    private _moneyMarketShareCategorySerial: string[] = [];
    private _primarySavingsShareCategorySerial: string[] = [];
    private _checkingShareCategorySerial: string[] = [];
    private _investmentShareCategorySerial: string[] = [];
    private _certificateShareCategorySerial: string[] = [];
    private _lineOfCreditLoanCategorySerial: string[] = [];
    private _creditCardLoanCategorySerial: string[] = [];
    private _autoLoanCategorySerial: string[] = [];
    private _mortgageLoanCategorySerial: string[] = [];
    private _loanCategorySerial: string[] = [];
    private _businessSavingsShareCategorySerial: string[] = [];
    private _depositShareCategorySerial: string[] = [];
    private _externalMortgageLoanCategorySerial: string[] = [];
    private _debitCardCategorySerial: string[] = [];
    private _businessSavingsShareCategorySerialForCategoryMapping: string[] = [];

    /**
     * Static metadata for the settings class
     */
    static readonly metadata: ISettingsMetadata = {
        groupName: 'AccountTypes',
        settings: {
            moneyMarketShareCategorySerial: {
                key: 'AccountTypes.MoneyMarketShareCategorySerial',
                type: 'json',
                required: false
            },
            primarySavingsShareCategorySerial: {
                key: 'AccountTypes.PrimarySavingsShareCategorySerial',
                type: 'json',
                required: false
            },
            checkingShareCategorySerial: {
                key: 'AccountTypes.CheckingShareCategorySerial',
                type: 'json',
                required: false
            },
            investmentShareCategorySerial: {
                key: 'AccountTypes.InvestmentShareCategorySerial',
                type: 'json',
                required: false
            },
            certificateShareCategorySerial: {
                key: 'AccountTypes.CertificateShareCategorySerial',
                type: 'json',
                required: false
            },
            lineOfCreditLoanCategorySerial: {
                key: 'AccountTypes.LineOfCreditLoanCategorySerial',
                type: 'json',
                required: false
            },
            creditCardLoanCategorySerial: {
                key: 'AccountTypes.CreditCardLoanCategorySerial',
                type: 'json',
                required: false
            },
            autoLoanCategorySerial: {
                key: 'AccountTypes.AutoLoanCategorySerial',
                type: 'json',
                required: false
            },
            mortgageLoanCategorySerial: {
                key: 'AccountTypes.MortgageLoanCategorySerial',
                type: 'json',
                required: false
            },
            loanCategorySerial: {
                key: 'AccountTypes.LoanCategorySerial',
                type: 'json',
                required: false
            },
            businessSavingsShareCategorySerial: {
                key: 'AccountTypes.BusinessSavingsShareCategorySerial',
                type: 'json',
                required: false
            },
            depositShareCategorySerial: {
                key: 'AccountTypes.DepositShareCategorySerial',
                type: 'json',
                required: false
            },
            externalMortgageLoanCategorySerial: {
                key: 'AccountTypes.ExternalMortgageLoanCategorySerial',
                type: 'json',
                required: false
            },
            debitCardCategorySerial: {
                key: 'AccountTypes.DebitCardCategorySerial',
                type: 'json',
                required: false
            },
            businessSavingsShareCategorySerialForCategoryMapping: {
                key: 'AccountTypes.BusinessSavingsShareCategorySerialForCategoryMapping',
                type: 'json',
                required: false
            }
        }
    };

    /** Money market share category serials */
    get moneyMarketShareCategorySerial(): string[] {
        return this._moneyMarketShareCategorySerial;
    }
    set moneyMarketShareCategorySerial(value: string[]) {
        this._moneyMarketShareCategorySerial = value;
    }

    /** Primary savings share category serials */
    get primarySavingsShareCategorySerial(): string[] {
        return this._primarySavingsShareCategorySerial;
    }
    set primarySavingsShareCategorySerial(value: string[]) {
        this._primarySavingsShareCategorySerial = value;
    }

    /** Checking share category serials */
    get checkingShareCategorySerial(): string[] {
        return this._checkingShareCategorySerial;
    }
    set checkingShareCategorySerial(value: string[]) {
        this._checkingShareCategorySerial = value;
    }

    /** Investment share category serials */
    get investmentShareCategorySerial(): string[] {
        return this._investmentShareCategorySerial;
    }
    set investmentShareCategorySerial(value: string[]) {
        this._investmentShareCategorySerial = value;
    }

    /** Certificate share category serials */
    get certificateShareCategorySerial(): string[] {
        return this._certificateShareCategorySerial;
    }
    set certificateShareCategorySerial(value: string[]) {
        this._certificateShareCategorySerial = value;
    }

    /** Line of credit loan category serials */
    get lineOfCreditLoanCategorySerial(): string[] {
        return this._lineOfCreditLoanCategorySerial;
    }
    set lineOfCreditLoanCategorySerial(value: string[]) {
        this._lineOfCreditLoanCategorySerial = value;
    }

    /** Credit card loan category serials */
    get creditCardLoanCategorySerial(): string[] {
        return this._creditCardLoanCategorySerial;
    }
    set creditCardLoanCategorySerial(value: string[]) {
        this._creditCardLoanCategorySerial = value;
    }

    /** Auto loan category serials */
    get autoLoanCategorySerial(): string[] {
        return this._autoLoanCategorySerial;
    }
    set autoLoanCategorySerial(value: string[]) {
        this._autoLoanCategorySerial = value;
    }

    /** Mortgage loan category serials */
    get mortgageLoanCategorySerial(): string[] {
        return this._mortgageLoanCategorySerial;
    }
    set mortgageLoanCategorySerial(value: string[]) {
        this._mortgageLoanCategorySerial = value;
    }

    /** Loan category serials */
    get loanCategorySerial(): string[] {
        return this._loanCategorySerial;
    }
    set loanCategorySerial(value: string[]) {
        this._loanCategorySerial = value;
    }

    /** Business savings share category serials */
    get businessSavingsShareCategorySerial(): string[] {
        return this._businessSavingsShareCategorySerial;
    }
    set businessSavingsShareCategorySerial(value: string[]) {
        this._businessSavingsShareCategorySerial = value;
    }

    /** Deposit share category serials */
    get depositShareCategorySerial(): string[] {
        return this._depositShareCategorySerial;
    }
    set depositShareCategorySerial(value: string[]) {
        this._depositShareCategorySerial = value;
    }

    /** External mortgage loan category serials */
    get externalMortgageLoanCategorySerial(): string[] {
        return this._externalMortgageLoanCategorySerial;
    }
    set externalMortgageLoanCategorySerial(value: string[]) {
        this._externalMortgageLoanCategorySerial = value;
    }

    /** Debit card category serials */
    get debitCardCategorySerial(): string[] {
        return this._debitCardCategorySerial;
    }
    set debitCardCategorySerial(value: string[]) {
        this._debitCardCategorySerial = value;
    }

    /** Business savings share category serials for category mapping */
    get businessSavingsShareCategorySerialForCategoryMapping(): string[] {
        return this._businessSavingsShareCategorySerialForCategoryMapping;
    }
    set businessSavingsShareCategorySerialForCategoryMapping(value: string[]) {
        this._businessSavingsShareCategorySerialForCategoryMapping = value;
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
                key: AccountTypes.metadata.settings.moneyMarketShareCategorySerial.key,
                value: JSON.stringify(this._moneyMarketShareCategorySerial),
                dataType: 'json'
            },
            {
                key: AccountTypes.metadata.settings.primarySavingsShareCategorySerial.key,
                value: JSON.stringify(this._primarySavingsShareCategorySerial),
                dataType: 'json'
            },
            {
                key: AccountTypes.metadata.settings.checkingShareCategorySerial.key,
                value: JSON.stringify(this._checkingShareCategorySerial),
                dataType: 'json'
            },
            {
                key: AccountTypes.metadata.settings.investmentShareCategorySerial.key,
                value: JSON.stringify(this._investmentShareCategorySerial),
                dataType: 'json'
            },
            {
                key: AccountTypes.metadata.settings.certificateShareCategorySerial.key,
                value: JSON.stringify(this._certificateShareCategorySerial),
                dataType: 'json'
            },
            {
                key: AccountTypes.metadata.settings.lineOfCreditLoanCategorySerial.key,
                value: JSON.stringify(this._lineOfCreditLoanCategorySerial),
                dataType: 'json'
            },
            {
                key: AccountTypes.metadata.settings.creditCardLoanCategorySerial.key,
                value: JSON.stringify(this._creditCardLoanCategorySerial),
                dataType: 'json'
            },
            {
                key: AccountTypes.metadata.settings.autoLoanCategorySerial.key,
                value: JSON.stringify(this._autoLoanCategorySerial),
                dataType: 'json'
            },
            {
                key: AccountTypes.metadata.settings.mortgageLoanCategorySerial.key,
                value: JSON.stringify(this._mortgageLoanCategorySerial),
                dataType: 'json'
            },
            {
                key: AccountTypes.metadata.settings.loanCategorySerial.key,
                value: JSON.stringify(this._loanCategorySerial),
                dataType: 'json'
            },
            {
                key: AccountTypes.metadata.settings.businessSavingsShareCategorySerial.key,
                value: JSON.stringify(this._businessSavingsShareCategorySerial),
                dataType: 'json'
            },
            {
                key: AccountTypes.metadata.settings.depositShareCategorySerial.key,
                value: JSON.stringify(this._depositShareCategorySerial),
                dataType: 'json'
            },
            {
                key: AccountTypes.metadata.settings.externalMortgageLoanCategorySerial.key,
                value: JSON.stringify(this._externalMortgageLoanCategorySerial),
                dataType: 'json'
            },
            {
                key: AccountTypes.metadata.settings.debitCardCategorySerial.key,
                value: JSON.stringify(this._debitCardCategorySerial),
                dataType: 'json'
            },
            {
                key: AccountTypes.metadata.settings.businessSavingsShareCategorySerialForCategoryMapping.key,
                value: JSON.stringify(this._businessSavingsShareCategorySerialForCategoryMapping),
                dataType: 'json'
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
                case AccountTypes.metadata.settings.moneyMarketShareCategorySerial.key:
                    this._moneyMarketShareCategorySerial = JSON.parse(setting.value);
                    break;
                case AccountTypes.metadata.settings.primarySavingsShareCategorySerial.key:
                    this._primarySavingsShareCategorySerial = JSON.parse(setting.value);
                    break;
                case AccountTypes.metadata.settings.checkingShareCategorySerial.key:
                    this._checkingShareCategorySerial = JSON.parse(setting.value);
                    break;
                case AccountTypes.metadata.settings.investmentShareCategorySerial.key:
                    this._investmentShareCategorySerial = JSON.parse(setting.value);
                    break;
                case AccountTypes.metadata.settings.certificateShareCategorySerial.key:
                    this._certificateShareCategorySerial = JSON.parse(setting.value);
                    break;
                case AccountTypes.metadata.settings.lineOfCreditLoanCategorySerial.key:
                    this._lineOfCreditLoanCategorySerial = JSON.parse(setting.value);
                    break;
                case AccountTypes.metadata.settings.creditCardLoanCategorySerial.key:
                    this._creditCardLoanCategorySerial = JSON.parse(setting.value);
                    break;
                case AccountTypes.metadata.settings.autoLoanCategorySerial.key:
                    this._autoLoanCategorySerial = JSON.parse(setting.value);
                    break;
                case AccountTypes.metadata.settings.mortgageLoanCategorySerial.key:
                    this._mortgageLoanCategorySerial = JSON.parse(setting.value);
                    break;
                case AccountTypes.metadata.settings.loanCategorySerial.key:
                    this._loanCategorySerial = JSON.parse(setting.value);
                    break;
                case AccountTypes.metadata.settings.businessSavingsShareCategorySerial.key:
                    this._businessSavingsShareCategorySerial = JSON.parse(setting.value);
                    break;
                case AccountTypes.metadata.settings.depositShareCategorySerial.key:
                    this._depositShareCategorySerial = JSON.parse(setting.value);
                    break;
                case AccountTypes.metadata.settings.externalMortgageLoanCategorySerial.key:
                    this._externalMortgageLoanCategorySerial = JSON.parse(setting.value);
                    break;
                case AccountTypes.metadata.settings.debitCardCategorySerial.key:
                    this._debitCardCategorySerial = JSON.parse(setting.value);
                    break;
                case AccountTypes.metadata.settings.businessSavingsShareCategorySerialForCategoryMapping.key:
                    this._businessSavingsShareCategorySerialForCategoryMapping = JSON.parse(setting.value);
                    break;
            }
        }
    }
}