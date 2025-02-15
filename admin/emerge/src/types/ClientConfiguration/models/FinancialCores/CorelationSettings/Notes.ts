import { Setting, ISettingsGroup, ISettingsMetadata } from '@/types/ClientConfiguration/base/types';

/**
 * Configuration interface for note settings
 */
export interface NotesConfig {
    OnlineBankingAccessSerial: string;
    BillPaySerial: string;
    BusinessAccountSerial: string;
    EstatementDisclosureSerial: string;
    CheckWithdrawalRrestrictedSerial: string;
    EdocumentsDisclosureSerial: string;
    FreeCheckReorderFlagSerial: string;
    HasCreditCardSerial: string;
    IsDebitCardFlagSerial: string;
    IsEmployeeSerial: string;
    LoanClosedFlagSerial: string;
    LoanRestrictedSerial: string;
    InquiryOnLoanRestrictedSerial: string;
    HasDebitCardsSerial: string;
    MidwestLoansSerial: string;
    MobileDepositAllowedSerial: string;
    MobileDepositRestrictedSerial: string;
    MobileDepositDisclosureSerial: string;
    NsfFlagsSerial: string;
    MemberRestrictedFromTransfersSerial: string;
    MemberRestrictedFromDepositSerial: string;
    MemberrestricedFromInquirySerial: string;
    ShareIsRestrictedFromDepositSerial: string;
    ShareRestrictedFromInquirySerial: string;
    ShareRestrictedFromTransfersSerial: string;
    RestrictViewingCardFlagSerial: string;
    ShareClosedFlagsSerial: string;
    ShareRestrictedAlertsSerial: string;
    SkipPayQualifyingSerial: string;
    ValidAddressFlagSerial: string;
    ValidEmailFlagSerial: string;
    BusinessBankingDisclosureNoteSerial: string;
}

/**
 * Settings for various note configurations and flags
 */
export class Notes implements ISettingsGroup {
    private _settings: Setting[] = [];

    /**
     * Static metadata for the settings class
     */
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Notes',
        settings: {
            onlineBankingAccessSerial: {
                key: 'Notes.OnlineBankingAccessSerial',
                type: 'string',
                required: true
            },
            billPaySerial: {
                key: 'Notes.BillPaySerial',
                type: 'string',
                required: true
            },
            businessAccountSerial: {
                key: 'Notes.BusinessAccountSerial',
                type: 'string',
                required: true
            },
            estatementDisclosureSerial: {
                key: 'Notes.EstatementDisclosureSerial',
                type: 'string',
                required: true
            },
            checkWithdrawalRrestrictedSerial: {
                key: 'Notes.CheckWithdrawalRrestrictedSerial',
                type: 'string',
                required: true
            },
            edocumentsDisclosureSerial: {
                key: 'Notes.EdocumentsDisclosureSerial',
                type: 'string',
                required: true
            },
            freeCheckReorderFlagSerial: {
                key: 'Notes.FreeCheckReorderFlagSerial',
                type: 'string',
                required: true
            },
            hasCreditCardSerial: {
                key: 'Notes.HasCreditCardSerial',
                type: 'string',
                required: true
            },
            isDebitCardFlagSerial: {
                key: 'Notes.IsDebitCardFlagSerial',
                type: 'string',
                required: true
            },
            isEmployeeSerial: {
                key: 'Notes.IsEmployeeSerial',
                type: 'string',
                required: true
            },
            loanClosedFlagSerial: {
                key: 'Notes.LoanClosedFlagSerial',
                type: 'string',
                required: true
            },
            loanRestrictedSerial: {
                key: 'Notes.LoanRestrictedSerial',
                type: 'string',
                required: true
            },
            inquiryOnLoanRestrictedSerial: {
                key: 'Notes.InquiryOnLoanRestrictedSerial',
                type: 'string',
                required: true
            },
            hasDebitCardsSerial: {
                key: 'Notes.HasDebitCardsSerial',
                type: 'string',
                required: true
            },
            midwestLoansSerial: {
                key: 'Notes.MidwestLoansSerial',
                type: 'string',
                required: true
            },
            mobileDepositAllowedSerial: {
                key: 'Notes.MobileDepositAllowedSerial',
                type: 'string',
                required: true
            },
            mobileDepositRestrictedSerial: {
                key: 'Notes.MobileDepositRestrictedSerial',
                type: 'string',
                required: true
            },
            mobileDepositDisclosureSerial: {
                key: 'Notes.MobileDepositDisclosureSerial',
                type: 'string',
                required: true
            },
            nsfFlagsSerial: {
                key: 'Notes.NsfFlagsSerial',
                type: 'string',
                required: true
            },
            memberRestrictedFromTransfersSerial: {
                key: 'Notes.MemberRestrictedFromTransfersSerial',
                type: 'string',
                required: true
            },
            memberRestrictedFromDepositSerial: {
                key: 'Notes.MemberRestrictedFromDepositSerial',
                type: 'string',
                required: true
            },
            memberrestricedFromInquirySerial: {
                key: 'Notes.MemberrestricedFromInquirySerial',
                type: 'string',
                required: true
            },
            shareIsRestrictedFromDepositSerial: {
                key: 'Notes.ShareIsRestrictedFromDepositSerial',
                type: 'string',
                required: true
            },
            shareRestrictedFromInquirySerial: {
                key: 'Notes.ShareRestrictedFromInquirySerial',
                type: 'string',
                required: true
            },
            shareRestrictedFromTransfersSerial: {
                key: 'Notes.ShareRestrictedFromTransfersSerial',
                type: 'string',
                required: true
            },
            restrictViewingCardFlagSerial: {
                key: 'Notes.RestrictViewingCardFlagSerial',
                type: 'string',
                required: true
            },
            shareClosedFlagsSerial: {
                key: 'Notes.ShareClosedFlagsSerial',
                type: 'string',
                required: true
            },
            shareRestrictedAlertsSerial: {
                key: 'Notes.ShareRestrictedAlertsSerial',
                type: 'string',
                required: true
            },
            skipPayQualifyingSerial: {
                key: 'Notes.SkipPayQualifyingSerial',
                type: 'string',
                required: true
            },
            validAddressFlagSerial: {
                key: 'Notes.ValidAddressFlagSerial',
                type: 'string',
                required: true
            },
            validEmailFlagSerial: {
                key: 'Notes.ValidEmailFlagSerial',
                type: 'string',
                required: true
            },
            businessBankingDisclosureNoteSerial: {
                key: 'Notes.BusinessBankingDisclosureNoteSerial',
                type: 'string',
                required: true
            }
        }
    };

    private _onlineBankingAccessSerial: string;
    get onlineBankingAccessSerial(): string {
        return this._onlineBankingAccessSerial;
    }
    set onlineBankingAccessSerial(value: string) {
        this._onlineBankingAccessSerial = value;
    }

    private _billPaySerial: string;
    get billPaySerial(): string {
        return this._billPaySerial;
    }
    set billPaySerial(value: string) {
        this._billPaySerial = value;
    }

    private _businessAccountSerial: string;
    get businessAccountSerial(): string {
        return this._businessAccountSerial;
    }
    set businessAccountSerial(value: string) {
        this._businessAccountSerial = value;
    }

    private _estatementDisclosureSerial: string;
    get estatementDisclosureSerial(): string {
        return this._estatementDisclosureSerial;
    }
    set estatementDisclosureSerial(value: string) {
        this._estatementDisclosureSerial = value;
    }

    private _checkWithdrawalRrestrictedSerial: string;
    get checkWithdrawalRrestrictedSerial(): string {
        return this._checkWithdrawalRrestrictedSerial;
    }
    set checkWithdrawalRrestrictedSerial(value: string) {
        this._checkWithdrawalRrestrictedSerial = value;
    }

    private _edocumentsDisclosureSerial: string;
    get edocumentsDisclosureSerial(): string {
        return this._edocumentsDisclosureSerial;
    }
    set edocumentsDisclosureSerial(value: string) {
        this._edocumentsDisclosureSerial = value;
    }

    private _freeCheckReorderFlagSerial: string;
    get freeCheckReorderFlagSerial(): string {
        return this._freeCheckReorderFlagSerial;
    }
    set freeCheckReorderFlagSerial(value: string) {
        this._freeCheckReorderFlagSerial = value;
    }

    private _hasCreditCardSerial: string;
    get hasCreditCardSerial(): string {
        return this._hasCreditCardSerial;
    }
    set hasCreditCardSerial(value: string) {
        this._hasCreditCardSerial = value;
    }

    private _isDebitCardFlagSerial: string;
    get isDebitCardFlagSerial(): string {
        return this._isDebitCardFlagSerial;
    }
    set isDebitCardFlagSerial(value: string) {
        this._isDebitCardFlagSerial = value;
    }

    private _isEmployeeSerial: string;
    get isEmployeeSerial(): string {
        return this._isEmployeeSerial;
    }
    set isEmployeeSerial(value: string) {
        this._isEmployeeSerial = value;
    }

    private _loanClosedFlagSerial: string;
    get loanClosedFlagSerial(): string {
        return this._loanClosedFlagSerial;
    }
    set loanClosedFlagSerial(value: string) {
        this._loanClosedFlagSerial = value;
    }

    private _loanRestrictedSerial: string;
    get loanRestrictedSerial(): string {
        return this._loanRestrictedSerial;
    }
    set loanRestrictedSerial(value: string) {
        this._loanRestrictedSerial = value;
    }

    private _inquiryOnLoanRestrictedSerial: string;
    get inquiryOnLoanRestrictedSerial(): string {
        return this._inquiryOnLoanRestrictedSerial;
    }
    set inquiryOnLoanRestrictedSerial(value: string) {
        this._inquiryOnLoanRestrictedSerial = value;
    }

    private _hasDebitCardsSerial: string;
    get hasDebitCardsSerial(): string {
        return this._hasDebitCardsSerial;
    }
    set hasDebitCardsSerial(value: string) {
        this._hasDebitCardsSerial = value;
    }

    private _midwestLoansSerial: string;
    get midwestLoansSerial(): string {
        return this._midwestLoansSerial;
    }
    set midwestLoansSerial(value: string) {
        this._midwestLoansSerial = value;
    }

    private _mobileDepositAllowedSerial: string;
    get mobileDepositAllowedSerial(): string {
        return this._mobileDepositAllowedSerial;
    }
    set mobileDepositAllowedSerial(value: string) {
        this._mobileDepositAllowedSerial = value;
    }

    private _mobileDepositRestrictedSerial: string;
    get mobileDepositRestrictedSerial(): string {
        return this._mobileDepositRestrictedSerial;
    }
    set mobileDepositRestrictedSerial(value: string) {
        this._mobileDepositRestrictedSerial = value;
    }

    private _mobileDepositDisclosureSerial: string;
    get mobileDepositDisclosureSerial(): string {
        return this._mobileDepositDisclosureSerial;
    }
    set mobileDepositDisclosureSerial(value: string) {
        this._mobileDepositDisclosureSerial = value;
    }

    private _nsfFlagsSerial: string;
    get nsfFlagsSerial(): string {
        return this._nsfFlagsSerial;
    }
    set nsfFlagsSerial(value: string) {
        this._nsfFlagsSerial = value;
    }

    private _memberRestrictedFromTransfersSerial: string;
    get memberRestrictedFromTransfersSerial(): string {
        return this._memberRestrictedFromTransfersSerial;
    }
    set memberRestrictedFromTransfersSerial(value: string) {
        this._memberRestrictedFromTransfersSerial = value;
    }

    private _memberRestrictedFromDepositSerial: string;
    get memberRestrictedFromDepositSerial(): string {
        return this._memberRestrictedFromDepositSerial;
    }
    set memberRestrictedFromDepositSerial(value: string) {
        this._memberRestrictedFromDepositSerial = value;
    }

    private _memberrestricedFromInquirySerial: string;
    get memberrestricedFromInquirySerial(): string {
        return this._memberrestricedFromInquirySerial;
    }
    set memberrestricedFromInquirySerial(value: string) {
        this._memberrestricedFromInquirySerial = value;
    }

    private _shareIsRestrictedFromDepositSerial: string;
    get shareIsRestrictedFromDepositSerial(): string {
        return this._shareIsRestrictedFromDepositSerial;
    }
    set shareIsRestrictedFromDepositSerial(value: string) {
        this._shareIsRestrictedFromDepositSerial = value;
    }

    private _shareRestrictedFromInquirySerial: string;
    get shareRestrictedFromInquirySerial(): string {
        return this._shareRestrictedFromInquirySerial;
    }
    set shareRestrictedFromInquirySerial(value: string) {
        this._shareRestrictedFromInquirySerial = value;
    }

    private _shareRestrictedFromTransfersSerial: string;
    get shareRestrictedFromTransfersSerial(): string {
        return this._shareRestrictedFromTransfersSerial;
    }
    set shareRestrictedFromTransfersSerial(value: string) {
        this._shareRestrictedFromTransfersSerial = value;
    }

    private _restrictViewingCardFlagSerial: string;
    get restrictViewingCardFlagSerial(): string {
        return this._restrictViewingCardFlagSerial;
    }
    set restrictViewingCardFlagSerial(value: string) {
        this._restrictViewingCardFlagSerial = value;
    }

    private _shareClosedFlagsSerial: string;
    get shareClosedFlagsSerial(): string {
        return this._shareClosedFlagsSerial;
    }
    set shareClosedFlagsSerial(value: string) {
        this._shareClosedFlagsSerial = value;
    }

    private _shareRestrictedAlertsSerial: string;
    get shareRestrictedAlertsSerial(): string {
        return this._shareRestrictedAlertsSerial;
    }
    set shareRestrictedAlertsSerial(value: string) {
        this._shareRestrictedAlertsSerial = value;
    }

    private _skipPayQualifyingSerial: string;
    get skipPayQualifyingSerial(): string {
        return this._skipPayQualifyingSerial;
    }
    set skipPayQualifyingSerial(value: string) {
        this._skipPayQualifyingSerial = value;
    }

    private _validAddressFlagSerial: string;
    get validAddressFlagSerial(): string {
        return this._validAddressFlagSerial;
    }
    set validAddressFlagSerial(value: string) {
        this._validAddressFlagSerial = value;
    }

    private _validEmailFlagSerial: string;
    get validEmailFlagSerial(): string {
        return this._validEmailFlagSerial;
    }
    set validEmailFlagSerial(value: string) {
        this._validEmailFlagSerial = value;
    }

    private _businessBankingDisclosureNoteSerial: string;
    get businessBankingDisclosureNoteSerial(): string {
        return this._businessBankingDisclosureNoteSerial;
    }
    set businessBankingDisclosureNoteSerial(value: string) {
        this._businessBankingDisclosureNoteSerial = value;
    }

    constructor() {
        this._onlineBankingAccessSerial = '';
        this._billPaySerial = '';
        this._businessAccountSerial = '';
        this._estatementDisclosureSerial = '';
        this._checkWithdrawalRrestrictedSerial = '';
        this._edocumentsDisclosureSerial = '';
        this._freeCheckReorderFlagSerial = '';
        this._hasCreditCardSerial = '';
        this._isDebitCardFlagSerial = '';
        this._isEmployeeSerial = '';
        this._loanClosedFlagSerial = '';
        this._loanRestrictedSerial = '';
        this._inquiryOnLoanRestrictedSerial = '';
        this._hasDebitCardsSerial = '';
        this._midwestLoansSerial = '';
        this._mobileDepositAllowedSerial = '';
        this._mobileDepositRestrictedSerial = '';
        this._mobileDepositDisclosureSerial = '';
        this._nsfFlagsSerial = '';
        this._memberRestrictedFromTransfersSerial = '';
        this._memberRestrictedFromDepositSerial = '';
        this._memberrestricedFromInquirySerial = '';
        this._shareIsRestrictedFromDepositSerial = '';
        this._shareRestrictedFromInquirySerial = '';
        this._shareRestrictedFromTransfersSerial = '';
        this._restrictViewingCardFlagSerial = '';
        this._shareClosedFlagsSerial = '';
        this._shareRestrictedAlertsSerial = '';
        this._skipPayQualifyingSerial = '';
        this._validAddressFlagSerial = '';
        this._validEmailFlagSerial = '';
        this._businessBankingDisclosureNoteSerial = '';
    }

    toSettings(): Setting[] {
        if (this._settings.length) {
            return this._settings;
        }

        return [
            { key: Notes.metadata.settings.onlineBankingAccessSerial.key, value: this._onlineBankingAccessSerial, dataType: 'string' },
            { key: Notes.metadata.settings.billPaySerial.key, value: this._billPaySerial, dataType: 'string' },
            { key: Notes.metadata.settings.businessAccountSerial.key, value: this._businessAccountSerial, dataType: 'string' },
            { key: Notes.metadata.settings.estatementDisclosureSerial.key, value: this._estatementDisclosureSerial, dataType: 'string' },
            { key: Notes.metadata.settings.checkWithdrawalRrestrictedSerial.key, value: this._checkWithdrawalRrestrictedSerial, dataType: 'string' },
            { key: Notes.metadata.settings.edocumentsDisclosureSerial.key, value: this._edocumentsDisclosureSerial, dataType: 'string' },
            { key: Notes.metadata.settings.freeCheckReorderFlagSerial.key, value: this._freeCheckReorderFlagSerial, dataType: 'string' },
            { key: Notes.metadata.settings.hasCreditCardSerial.key, value: this._hasCreditCardSerial, dataType: 'string' },
            { key: Notes.metadata.settings.isDebitCardFlagSerial.key, value: this._isDebitCardFlagSerial, dataType: 'string' },
            { key: Notes.metadata.settings.isEmployeeSerial.key, value: this._isEmployeeSerial, dataType: 'string' },
            { key: Notes.metadata.settings.loanClosedFlagSerial.key, value: this._loanClosedFlagSerial, dataType: 'string' },
            { key: Notes.metadata.settings.loanRestrictedSerial.key, value: this._loanRestrictedSerial, dataType: 'string' },
            { key: Notes.metadata.settings.inquiryOnLoanRestrictedSerial.key, value: this._inquiryOnLoanRestrictedSerial, dataType: 'string' },
            { key: Notes.metadata.settings.hasDebitCardsSerial.key, value: this._hasDebitCardsSerial, dataType: 'string' },
            { key: Notes.metadata.settings.midwestLoansSerial.key, value: this._midwestLoansSerial, dataType: 'string' },
            { key: Notes.metadata.settings.mobileDepositAllowedSerial.key, value: this._mobileDepositAllowedSerial, dataType: 'string' },
            { key: Notes.metadata.settings.mobileDepositRestrictedSerial.key, value: this._mobileDepositRestrictedSerial, dataType: 'string' },
            { key: Notes.metadata.settings.mobileDepositDisclosureSerial.key, value: this._mobileDepositDisclosureSerial, dataType: 'string' },
            { key: Notes.metadata.settings.nsfFlagsSerial.key, value: this._nsfFlagsSerial, dataType: 'string' },
            { key: Notes.metadata.settings.memberRestrictedFromTransfersSerial.key, value: this._memberRestrictedFromTransfersSerial, dataType: 'string' },
            { key: Notes.metadata.settings.memberRestrictedFromDepositSerial.key, value: this._memberRestrictedFromDepositSerial, dataType: 'string' },
            { key: Notes.metadata.settings.memberrestricedFromInquirySerial.key, value: this._memberrestricedFromInquirySerial, dataType: 'string' },
            { key: Notes.metadata.settings.shareIsRestrictedFromDepositSerial.key, value: this._shareIsRestrictedFromDepositSerial, dataType: 'string' },
            { key: Notes.metadata.settings.shareRestrictedFromInquirySerial.key, value: this._shareRestrictedFromInquirySerial, dataType: 'string' },
            { key: Notes.metadata.settings.shareRestrictedFromTransfersSerial.key, value: this._shareRestrictedFromTransfersSerial, dataType: 'string' },
            { key: Notes.metadata.settings.restrictViewingCardFlagSerial.key, value: this._restrictViewingCardFlagSerial, dataType: 'string' },
            { key: Notes.metadata.settings.shareClosedFlagsSerial.key, value: this._shareClosedFlagsSerial, dataType: 'string' },
            { key: Notes.metadata.settings.shareRestrictedAlertsSerial.key, value: this._shareRestrictedAlertsSerial, dataType: 'string' },
            { key: Notes.metadata.settings.skipPayQualifyingSerial.key, value: this._skipPayQualifyingSerial, dataType: 'string' },
            { key: Notes.metadata.settings.validAddressFlagSerial.key, value: this._validAddressFlagSerial, dataType: 'string' },
            { key: Notes.metadata.settings.validEmailFlagSerial.key, value: this._validEmailFlagSerial, dataType: 'string' },
            { key: Notes.metadata.settings.businessBankingDisclosureNoteSerial.key, value: this._businessBankingDisclosureNoteSerial, dataType: 'string' }
        ];
    }

    /**
     * Update settings from API format
     */
    fromSettings(settings: Setting[]): void {
        this._settings = settings;

        for (const setting of settings) {
            switch (setting.key) {
                case Notes.metadata.settings.onlineBankingAccessSerial.key:
                    this._onlineBankingAccessSerial = setting.value;
                    break;
                case Notes.metadata.settings.billPaySerial.key:
                    this._billPaySerial = setting.value;
                    break;
                case Notes.metadata.settings.businessAccountSerial.key:
                    this._businessAccountSerial = setting.value;
                    break;
                case Notes.metadata.settings.estatementDisclosureSerial.key:
                    this._estatementDisclosureSerial = setting.value;
                    break;
                case Notes.metadata.settings.checkWithdrawalRrestrictedSerial.key:
                    this._checkWithdrawalRrestrictedSerial = setting.value;
                    break;
                case Notes.metadata.settings.edocumentsDisclosureSerial.key:
                    this._edocumentsDisclosureSerial = setting.value;
                    break;
                case Notes.metadata.settings.freeCheckReorderFlagSerial.key:
                    this._freeCheckReorderFlagSerial = setting.value;
                    break;
                case Notes.metadata.settings.hasCreditCardSerial.key:
                    this._hasCreditCardSerial = setting.value;
                    break;
                case Notes.metadata.settings.isDebitCardFlagSerial.key:
                    this._isDebitCardFlagSerial = setting.value;
                    break;
                case Notes.metadata.settings.isEmployeeSerial.key:
                    this._isEmployeeSerial = setting.value;
                    break;
                case Notes.metadata.settings.loanClosedFlagSerial.key:
                    this._loanClosedFlagSerial = setting.value;
                    break;
                case Notes.metadata.settings.loanRestrictedSerial.key:
                    this._loanRestrictedSerial = setting.value;
                    break;
                case Notes.metadata.settings.inquiryOnLoanRestrictedSerial.key:
                    this._inquiryOnLoanRestrictedSerial = setting.value;
                    break;
                case Notes.metadata.settings.hasDebitCardsSerial.key:
                    this._hasDebitCardsSerial = setting.value;
                    break;
                case Notes.metadata.settings.midwestLoansSerial.key:
                    this._midwestLoansSerial = setting.value;
                    break;
                case Notes.metadata.settings.mobileDepositAllowedSerial.key:
                    this._mobileDepositAllowedSerial = setting.value;
                    break;
                case Notes.metadata.settings.mobileDepositRestrictedSerial.key:
                    this._mobileDepositRestrictedSerial = setting.value;
                    break;
                case Notes.metadata.settings.mobileDepositDisclosureSerial.key:
                    this._mobileDepositDisclosureSerial = setting.value;
                    break;
                case Notes.metadata.settings.nsfFlagsSerial.key:
                    this._nsfFlagsSerial = setting.value;
                    break;
                case Notes.metadata.settings.memberRestrictedFromTransfersSerial.key:
                    this._memberRestrictedFromTransfersSerial = setting.value;
                    break;
                case Notes.metadata.settings.memberRestrictedFromDepositSerial.key:
                    this._memberRestrictedFromDepositSerial = setting.value;
                    break;
                case Notes.metadata.settings.memberrestricedFromInquirySerial.key:
                    this._memberrestricedFromInquirySerial = setting.value;
                    break;
                case Notes.metadata.settings.shareIsRestrictedFromDepositSerial.key:
                    this._shareIsRestrictedFromDepositSerial = setting.value;
                    break;
                case Notes.metadata.settings.shareRestrictedFromInquirySerial.key:
                    this._shareRestrictedFromInquirySerial = setting.value;
                    break;
                case Notes.metadata.settings.shareRestrictedFromTransfersSerial.key:
                    this._shareRestrictedFromTransfersSerial = setting.value;
                    break;
                case Notes.metadata.settings.restrictViewingCardFlagSerial.key:
                    this._restrictViewingCardFlagSerial = setting.value;
                    break;
                case Notes.metadata.settings.shareClosedFlagsSerial.key:
                    this._shareClosedFlagsSerial = setting.value;
                    break;
                case Notes.metadata.settings.shareRestrictedAlertsSerial.key:
                    this._shareRestrictedAlertsSerial = setting.value;
                    break;
                case Notes.metadata.settings.skipPayQualifyingSerial.key:
                    this._skipPayQualifyingSerial = setting.value;
                    break;
                case Notes.metadata.settings.validAddressFlagSerial.key:
                    this._validAddressFlagSerial = setting.value;
                    break;
                case Notes.metadata.settings.validEmailFlagSerial.key:
                    this._validEmailFlagSerial = setting.value;
                    break;
                case Notes.metadata.settings.businessBankingDisclosureNoteSerial.key:
                    this._businessBankingDisclosureNoteSerial = setting.value;
                    break;
            }
        }
    }
}