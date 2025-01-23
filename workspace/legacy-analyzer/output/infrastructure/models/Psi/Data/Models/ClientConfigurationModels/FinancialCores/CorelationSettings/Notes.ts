import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
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

export class Notes implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Notes'
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


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "Notes.OnlineBankingAccessSerial", value: this._onlineBankingAccessSerial, dataType: 'string', label: "Online Banking Access Serial" },
                { key: "Notes.BillPaySerial", value: this._billPaySerial, dataType: 'string', label: "Bill Pay Serial" },
                { key: "Notes.BusinessAccountSerial", value: this._businessAccountSerial, dataType: 'string', label: "Business Account Serial" },
                { key: "Notes.EstatementDisclosureSerial", value: this._estatementDisclosureSerial, dataType: 'string', label: "Estatement Disclosure Serial" },
                { key: "Notes.CheckWithdrawalRrestrictedSerial", value: this._checkWithdrawalRrestrictedSerial, dataType: 'string', label: "Check Withdrawal Rrestricted Serial" },
                { key: "Notes.EdocumentsDisclosureSerial", value: this._edocumentsDisclosureSerial, dataType: 'string', label: "Edocuments Disclosure Serial" },
                { key: "Notes.FreeCheckReorderFlagSerial", value: this._freeCheckReorderFlagSerial, dataType: 'string', label: "Free Check Reorder Flag Serial" },
                { key: "Notes.HasCreditCardSerial", value: this._hasCreditCardSerial, dataType: 'string', label: "Has Credit Card Serial" },
                { key: "Notes.IsDebitCardFlagSerial", value: this._isDebitCardFlagSerial, dataType: 'string', label: "Is Debit Card Flag Serial" },
                { key: "Notes.IsEmployeeSerial", value: this._isEmployeeSerial, dataType: 'string', label: "Is Employee Serial" },
                { key: "Notes.LoanClosedFlagSerial", value: this._loanClosedFlagSerial, dataType: 'string', label: "Loan Closed Flag Serial" },
                { key: "Notes.LoanRestrictedSerial", value: this._loanRestrictedSerial, dataType: 'string', label: "Loan Restricted Serial" },
                { key: "Notes.InquiryOnLoanRestrictedSerial", value: this._inquiryOnLoanRestrictedSerial, dataType: 'string', label: "Inquiry On Loan Restricted Serial" },
                { key: "Notes.HasDebitCardsSerial", value: this._hasDebitCardsSerial, dataType: 'string', label: "Has Debit Cards Serial" },
                { key: "Notes.MidwestLoansSerial", value: this._midwestLoansSerial, dataType: 'string', label: "Midwest Loans Serial" },
                { key: "Notes.MobileDepositAllowedSerial", value: this._mobileDepositAllowedSerial, dataType: 'string', label: "Mobile Deposit Allowed Serial" },
                { key: "Notes.MobileDepositRestrictedSerial", value: this._mobileDepositRestrictedSerial, dataType: 'string', label: "Mobile Deposit Restricted Serial" },
                { key: "Notes.MobileDepositDisclosureSerial", value: this._mobileDepositDisclosureSerial, dataType: 'string', label: "Mobile Deposit Disclosure Serial" },
                { key: "Notes.NsfFlagsSerial", value: this._nsfFlagsSerial, dataType: 'string', label: "Nsf Flags Serial" },
                { key: "Notes.MemberRestrictedFromTransfersSerial", value: this._memberRestrictedFromTransfersSerial, dataType: 'string', label: "Member Restricted From Transfers Serial" },
                { key: "Notes.MemberRestrictedFromDepositSerial", value: this._memberRestrictedFromDepositSerial, dataType: 'string', label: "Member Restricted From Deposit Serial" },
                { key: "Notes.MemberrestricedFromInquirySerial", value: this._memberrestricedFromInquirySerial, dataType: 'string', label: "Memberrestriced From Inquiry Serial" },
                { key: "Notes.ShareIsRestrictedFromDepositSerial", value: this._shareIsRestrictedFromDepositSerial, dataType: 'string', label: "Share Is Restricted From Deposit Serial" },
                { key: "Notes.ShareRestrictedFromInquirySerial", value: this._shareRestrictedFromInquirySerial, dataType: 'string', label: "Share Restricted From Inquiry Serial" },
                { key: "Notes.ShareRestrictedFromTransfersSerial", value: this._shareRestrictedFromTransfersSerial, dataType: 'string', label: "Share Restricted From Transfers Serial" },
                { key: "Notes.RestrictViewingCardFlagSerial", value: this._restrictViewingCardFlagSerial, dataType: 'string', label: "Restrict Viewing Card Flag Serial" },
                { key: "Notes.ShareClosedFlagsSerial", value: this._shareClosedFlagsSerial, dataType: 'string', label: "Share Closed Flags Serial" },
                { key: "Notes.ShareRestrictedAlertsSerial", value: this._shareRestrictedAlertsSerial, dataType: 'string', label: "Share Restricted Alerts Serial" },
                { key: "Notes.SkipPayQualifyingSerial", value: this._skipPayQualifyingSerial, dataType: 'string', label: "Skip Pay Qualifying Serial" },
                { key: "Notes.ValidAddressFlagSerial", value: this._validAddressFlagSerial, dataType: 'string', label: "Valid Address Flag Serial" },
                { key: "Notes.ValidEmailFlagSerial", value: this._validEmailFlagSerial, dataType: 'string', label: "Valid Email Flag Serial" },
                { key: "Notes.BusinessBankingDisclosureNoteSerial", value: this._businessBankingDisclosureNoteSerial, dataType: 'string', label: "Business Banking Disclosure Note Serial" },
            ];
        }

}