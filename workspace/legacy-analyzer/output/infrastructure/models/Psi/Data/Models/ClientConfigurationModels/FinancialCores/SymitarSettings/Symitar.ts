import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { RemoteDepositCheckHoldSettings } from '@infrastructure/RemoteDepositCheckHoldSettings';
import { TrackingRecordFieldName } from '@infrastructure/TrackingRecordFieldName';
export interface SymitarConfig {
    RemoteDepositCheckHold: RemoteDepositCheckHoldSettings;
    IsTransferWithoutVirtualCardsEnabled: boolean;
    SuccessfulLoginOLBTrackingRecordType: number;
    SuccessfulLoginOLBTrackingRecordField: TrackingRecordFieldName;
    SuccessfulLoginMobileTrackingRecordType: number;
    SuccessfulLoginMobileTrackingRecordField: TrackingRecordFieldName;
    ExternalLoanTrackingRecordInterestField: TrackingRecordFieldName;
    GetInterestRateFromExternalLoanTrackingRecordIsEnabled: boolean;
    DebitCardTypeCodes: string[];
    ShouldReverseAddressLine1And2: boolean;
    SymitarExternalLoanRecordMortgageTypes: string;
    GetAlternateMicr: boolean;
    AccountInquiryIncludesRegD: boolean;
    AccountInquiryPowerOnVersion: string;
    AccountInquiryScriptName: string;
    WarningCodesBlockInquiryShare: string;
    WarningCodesBlockInquiryLoan: string;
    SkipPayQualifyingTrackingRecordType: number;
    SymitarAlternateAddressType: number;
    ShowPostDate: boolean;
    ShouldLoadMortgageFromTrackingRecord: boolean;
    ShouldLoadCardsFromTrackingRecords: boolean;
}

export class Symitar implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Symitar'
    };


            private _remoteDepositCheckHold: RemoteDepositCheckHoldSettings;
            get remoteDepositCheckHold(): RemoteDepositCheckHoldSettings {
                return this._remoteDepositCheckHold;
            }
            set remoteDepositCheckHold(value: RemoteDepositCheckHoldSettings) {
                this._remoteDepositCheckHold = value;
            }

            private _isTransferWithoutVirtualCardsEnabled: boolean;
            get isTransferWithoutVirtualCardsEnabled(): boolean {
                return this._isTransferWithoutVirtualCardsEnabled;
            }
            set isTransferWithoutVirtualCardsEnabled(value: boolean) {
                this._isTransferWithoutVirtualCardsEnabled = value;
            }

            private _successfulLoginOLBTrackingRecordType: number;
            get successfulLoginOLBTrackingRecordType(): number {
                return this._successfulLoginOLBTrackingRecordType;
            }
            set successfulLoginOLBTrackingRecordType(value: number) {
                this._successfulLoginOLBTrackingRecordType = value;
            }

            private _successfulLoginOLBTrackingRecordField: TrackingRecordFieldName;
            get successfulLoginOLBTrackingRecordField(): TrackingRecordFieldName {
                return this._successfulLoginOLBTrackingRecordField;
            }
            set successfulLoginOLBTrackingRecordField(value: TrackingRecordFieldName) {
                this._successfulLoginOLBTrackingRecordField = value;
            }

            private _successfulLoginMobileTrackingRecordType: number;
            get successfulLoginMobileTrackingRecordType(): number {
                return this._successfulLoginMobileTrackingRecordType;
            }
            set successfulLoginMobileTrackingRecordType(value: number) {
                this._successfulLoginMobileTrackingRecordType = value;
            }

            private _successfulLoginMobileTrackingRecordField: TrackingRecordFieldName;
            get successfulLoginMobileTrackingRecordField(): TrackingRecordFieldName {
                return this._successfulLoginMobileTrackingRecordField;
            }
            set successfulLoginMobileTrackingRecordField(value: TrackingRecordFieldName) {
                this._successfulLoginMobileTrackingRecordField = value;
            }

            private _externalLoanTrackingRecordInterestField: TrackingRecordFieldName;
            get externalLoanTrackingRecordInterestField(): TrackingRecordFieldName {
                return this._externalLoanTrackingRecordInterestField;
            }
            set externalLoanTrackingRecordInterestField(value: TrackingRecordFieldName) {
                this._externalLoanTrackingRecordInterestField = value;
            }

            private _getInterestRateFromExternalLoanTrackingRecordIsEnabled: boolean;
            get getInterestRateFromExternalLoanTrackingRecordIsEnabled(): boolean {
                return this._getInterestRateFromExternalLoanTrackingRecordIsEnabled;
            }
            set getInterestRateFromExternalLoanTrackingRecordIsEnabled(value: boolean) {
                this._getInterestRateFromExternalLoanTrackingRecordIsEnabled = value;
            }

            private _debitCardTypeCodes: string[];
            get debitCardTypeCodes(): string[] {
                return this._debitCardTypeCodes;
            }
            set debitCardTypeCodes(value: string[]) {
                this._debitCardTypeCodes = value;
            }

            private _shouldReverseAddressLine1And2: boolean;
            get shouldReverseAddressLine1And2(): boolean {
                return this._shouldReverseAddressLine1And2;
            }
            set shouldReverseAddressLine1And2(value: boolean) {
                this._shouldReverseAddressLine1And2 = value;
            }

            private _symitarExternalLoanRecordMortgageTypes: string;
            get symitarExternalLoanRecordMortgageTypes(): string {
                return this._symitarExternalLoanRecordMortgageTypes;
            }
            set symitarExternalLoanRecordMortgageTypes(value: string) {
                this._symitarExternalLoanRecordMortgageTypes = value;
            }

            private _getAlternateMicr: boolean;
            get getAlternateMicr(): boolean {
                return this._getAlternateMicr;
            }
            set getAlternateMicr(value: boolean) {
                this._getAlternateMicr = value;
            }

            private _accountInquiryIncludesRegD: boolean;
            get accountInquiryIncludesRegD(): boolean {
                return this._accountInquiryIncludesRegD;
            }
            set accountInquiryIncludesRegD(value: boolean) {
                this._accountInquiryIncludesRegD = value;
            }

            private _accountInquiryPowerOnVersion: string;
            get accountInquiryPowerOnVersion(): string {
                return this._accountInquiryPowerOnVersion;
            }
            set accountInquiryPowerOnVersion(value: string) {
                this._accountInquiryPowerOnVersion = value;
            }

            private _accountInquiryScriptName: string;
            get accountInquiryScriptName(): string {
                return this._accountInquiryScriptName;
            }
            set accountInquiryScriptName(value: string) {
                this._accountInquiryScriptName = value;
            }

            private _warningCodesBlockInquiryShare: string;
            get warningCodesBlockInquiryShare(): string {
                return this._warningCodesBlockInquiryShare;
            }
            set warningCodesBlockInquiryShare(value: string) {
                this._warningCodesBlockInquiryShare = value;
            }

            private _warningCodesBlockInquiryLoan: string;
            get warningCodesBlockInquiryLoan(): string {
                return this._warningCodesBlockInquiryLoan;
            }
            set warningCodesBlockInquiryLoan(value: string) {
                this._warningCodesBlockInquiryLoan = value;
            }

            private _skipPayQualifyingTrackingRecordType: number;
            get skipPayQualifyingTrackingRecordType(): number {
                return this._skipPayQualifyingTrackingRecordType;
            }
            set skipPayQualifyingTrackingRecordType(value: number) {
                this._skipPayQualifyingTrackingRecordType = value;
            }

            private _symitarAlternateAddressType: number;
            get symitarAlternateAddressType(): number {
                return this._symitarAlternateAddressType;
            }
            set symitarAlternateAddressType(value: number) {
                this._symitarAlternateAddressType = value;
            }

            private _showPostDate: boolean;
            get showPostDate(): boolean {
                return this._showPostDate;
            }
            set showPostDate(value: boolean) {
                this._showPostDate = value;
            }

            private _shouldLoadMortgageFromTrackingRecord: boolean;
            get shouldLoadMortgageFromTrackingRecord(): boolean {
                return this._shouldLoadMortgageFromTrackingRecord;
            }
            set shouldLoadMortgageFromTrackingRecord(value: boolean) {
                this._shouldLoadMortgageFromTrackingRecord = value;
            }

            private _shouldLoadCardsFromTrackingRecords: boolean;
            get shouldLoadCardsFromTrackingRecords(): boolean {
                return this._shouldLoadCardsFromTrackingRecords;
            }
            set shouldLoadCardsFromTrackingRecords(value: boolean) {
                this._shouldLoadCardsFromTrackingRecords = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "Symitar.RemoteDepositCheckHold", value: this._remoteDepositCheckHold, dataType: 'remotedepositcheckholdsettings', label: "Remote Deposit Check Hold" },
                { key: "Symitar.IsTransferWithoutVirtualCardsEnabled", value: this._isTransferWithoutVirtualCardsEnabled, dataType: 'boolean', label: "Is Transfer Without Virtual Cards Enabled" },
                { key: "Symitar.SuccessfulLoginOLBTrackingRecordType", value: this._successfulLoginOLBTrackingRecordType, dataType: 'number', label: "Successful Login O L B Tracking Record Type" },
                { key: "Symitar.SuccessfulLoginOLBTrackingRecordField", value: this._successfulLoginOLBTrackingRecordField, dataType: 'trackingrecordfieldname', label: "Successful Login O L B Tracking Record Field" },
                { key: "Symitar.SuccessfulLoginMobileTrackingRecordType", value: this._successfulLoginMobileTrackingRecordType, dataType: 'number', label: "Successful Login Mobile Tracking Record Type" },
                { key: "Symitar.SuccessfulLoginMobileTrackingRecordField", value: this._successfulLoginMobileTrackingRecordField, dataType: 'trackingrecordfieldname', label: "Successful Login Mobile Tracking Record Field" },
                { key: "Symitar.ExternalLoanTrackingRecordInterestField", value: this._externalLoanTrackingRecordInterestField, dataType: 'trackingrecordfieldname', label: "External Loan Tracking Record Interest Field" },
                { key: "Symitar.GetInterestRateFromExternalLoanTrackingRecordIsEnabled", value: this._getInterestRateFromExternalLoanTrackingRecordIsEnabled, dataType: 'boolean', label: "Get Interest Rate From External Loan Tracking Record Is Enabled" },
                { key: "Symitar.DebitCardTypeCodes", value: this._debitCardTypeCodes, dataType: 'list<string>', label: "Debit Card Type Codes" },
                { key: "Symitar.ShouldReverseAddressLine1And2", value: this._shouldReverseAddressLine1And2, dataType: 'boolean', label: "Should Reverse Address Line1 And2" },
                { key: "Symitar.SymitarExternalLoanRecordMortgageTypes", value: this._symitarExternalLoanRecordMortgageTypes, dataType: 'string', label: "Symitar External Loan Record Mortgage Types" },
                { key: "Symitar.GetAlternateMicr", value: this._getAlternateMicr, dataType: 'boolean', label: "Get Alternate Micr" },
                { key: "Symitar.AccountInquiryIncludesRegD", value: this._accountInquiryIncludesRegD, dataType: 'boolean', label: "Account Inquiry Includes Reg D" },
                { key: "Symitar.AccountInquiryPowerOnVersion", value: this._accountInquiryPowerOnVersion, dataType: 'string', label: "Account Inquiry Power On Version" },
                { key: "Symitar.AccountInquiryScriptName", value: this._accountInquiryScriptName, dataType: 'string', label: "Account Inquiry Script Name" },
                { key: "Symitar.WarningCodesBlockInquiryShare", value: this._warningCodesBlockInquiryShare, dataType: 'string', label: "Warning Codes Block Inquiry Share" },
                { key: "Symitar.WarningCodesBlockInquiryLoan", value: this._warningCodesBlockInquiryLoan, dataType: 'string', label: "Warning Codes Block Inquiry Loan" },
                { key: "Symitar.SkipPayQualifyingTrackingRecordType", value: this._skipPayQualifyingTrackingRecordType, dataType: 'number', label: "Skip Pay Qualifying Tracking Record Type" },
                { key: "Symitar.SymitarAlternateAddressType", value: this._symitarAlternateAddressType, dataType: 'number', label: "Symitar Alternate Address Type" },
                { key: "Symitar.ShowPostDate", value: this._showPostDate, dataType: 'boolean', label: "Show Post Date" },
                { key: "Symitar.ShouldLoadMortgageFromTrackingRecord", value: this._shouldLoadMortgageFromTrackingRecord, dataType: 'boolean', label: "Should Load Mortgage From Tracking Record" },
                { key: "Symitar.ShouldLoadCardsFromTrackingRecords", value: this._shouldLoadCardsFromTrackingRecords, dataType: 'boolean', label: "Should Load Cards From Tracking Records" },
            ];
        }

}