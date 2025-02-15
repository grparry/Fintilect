import { Setting, ISettingsGroup, ISettingsMetadata } from '@/types/ClientConfiguration/base/types';
import { RemoteDepositCheckHoldSettings } from './RemoteDepositCheckHoldSettings';
import { TrackingRecordFieldName } from '../TrackingRecordFieldName';

/**
 * Configuration interface for Symitar settings
 */
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

/**
 * Settings for Symitar configuration
 */
export class Symitar implements ISettingsGroup {
    private _settings: Setting[] = [];
    private _remoteDepositCheckHold: RemoteDepositCheckHoldSettings = new RemoteDepositCheckHoldSettings();
    private _isTransferWithoutVirtualCardsEnabled: boolean = false;
    private _successfulLoginOLBTrackingRecordType: number = 0;
    private _successfulLoginOLBTrackingRecordField: TrackingRecordFieldName = new TrackingRecordFieldName();
    private _successfulLoginMobileTrackingRecordType: number = 0;
    private _successfulLoginMobileTrackingRecordField: TrackingRecordFieldName = new TrackingRecordFieldName();
    private _externalLoanTrackingRecordInterestField: TrackingRecordFieldName = new TrackingRecordFieldName();
    private _getInterestRateFromExternalLoanTrackingRecordIsEnabled: boolean = false;
    private _debitCardTypeCodes: string[] = [];
    private _shouldReverseAddressLine1And2: boolean = false;
    private _symitarExternalLoanRecordMortgageTypes: string = '';
    private _getAlternateMicr: boolean = false;
    private _accountInquiryIncludesRegD: boolean = false;
    private _accountInquiryPowerOnVersion: string = '';
    private _accountInquiryScriptName: string = '';
    private _warningCodesBlockInquiryShare: string = '';
    private _warningCodesBlockInquiryLoan: string = '';
    private _skipPayQualifyingTrackingRecordType: number = 0;
    private _symitarAlternateAddressType: number = 0;
    private _showPostDate: boolean = false;
    private _shouldLoadMortgageFromTrackingRecord: boolean = false;
    private _shouldLoadCardsFromTrackingRecords: boolean = false;

    /**
     * Static metadata for the settings class
     */
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Symitar',
        settings: {
            remoteDepositCheckHold: {
                key: 'Symitar.RemoteDepositCheckHold',
                type: 'json',
                required: true
            },
            isTransferWithoutVirtualCardsEnabled: {
                key: 'Symitar.IsTransferWithoutVirtualCardsEnabled',
                type: 'boolean',
                required: true
            },
            successfulLoginOLBTrackingRecordType: {
                key: 'Symitar.SuccessfulLoginOLBTrackingRecordType',
                type: 'number',
                required: true
            },
            successfulLoginOLBTrackingRecordField: {
                key: 'Symitar.SuccessfulLoginOLBTrackingRecordField',
                type: 'json',
                required: true
            },
            successfulLoginMobileTrackingRecordType: {
                key: 'Symitar.SuccessfulLoginMobileTrackingRecordType',
                type: 'number',
                required: true
            },
            successfulLoginMobileTrackingRecordField: {
                key: 'Symitar.SuccessfulLoginMobileTrackingRecordField',
                type: 'json',
                required: true
            },
            externalLoanTrackingRecordInterestField: {
                key: 'Symitar.ExternalLoanTrackingRecordInterestField',
                type: 'json',
                required: true
            },
            getInterestRateFromExternalLoanTrackingRecordIsEnabled: {
                key: 'Symitar.GetInterestRateFromExternalLoanTrackingRecordIsEnabled',
                type: 'boolean',
                required: true
            },
            debitCardTypeCodes: {
                key: 'Symitar.DebitCardTypeCodes',
                type: 'json',
                required: true
            },
            shouldReverseAddressLine1And2: {
                key: 'Symitar.ShouldReverseAddressLine1And2',
                type: 'boolean',
                required: true
            },
            symitarExternalLoanRecordMortgageTypes: {
                key: 'Symitar.SymitarExternalLoanRecordMortgageTypes',
                type: 'string',
                required: true
            },
            getAlternateMicr: {
                key: 'Symitar.GetAlternateMicr',
                type: 'boolean',
                required: true
            },
            accountInquiryIncludesRegD: {
                key: 'Symitar.AccountInquiryIncludesRegD',
                type: 'boolean',
                required: true
            },
            accountInquiryPowerOnVersion: {
                key: 'Symitar.AccountInquiryPowerOnVersion',
                type: 'string',
                required: true
            },
            accountInquiryScriptName: {
                key: 'Symitar.AccountInquiryScriptName',
                type: 'string',
                required: true
            },
            warningCodesBlockInquiryShare: {
                key: 'Symitar.WarningCodesBlockInquiryShare',
                type: 'string',
                required: true
            },
            warningCodesBlockInquiryLoan: {
                key: 'Symitar.WarningCodesBlockInquiryLoan',
                type: 'string',
                required: true
            },
            skipPayQualifyingTrackingRecordType: {
                key: 'Symitar.SkipPayQualifyingTrackingRecordType',
                type: 'number',
                required: true
            },
            symitarAlternateAddressType: {
                key: 'Symitar.SymitarAlternateAddressType',
                type: 'number',
                required: true
            },
            showPostDate: {
                key: 'Symitar.ShowPostDate',
                type: 'boolean',
                required: true
            },
            shouldLoadMortgageFromTrackingRecord: {
                key: 'Symitar.ShouldLoadMortgageFromTrackingRecord',
                type: 'boolean',
                required: true
            },
            shouldLoadCardsFromTrackingRecords: {
                key: 'Symitar.ShouldLoadCardsFromTrackingRecords',
                type: 'boolean',
                required: true
            }
        }
    };

    constructor() {}

    get remoteDepositCheckHold(): RemoteDepositCheckHoldSettings {
        return this._remoteDepositCheckHold;
    }
    set remoteDepositCheckHold(value: RemoteDepositCheckHoldSettings) {
        this._remoteDepositCheckHold = value;
    }

    get isTransferWithoutVirtualCardsEnabled(): boolean {
        return this._isTransferWithoutVirtualCardsEnabled;
    }
    set isTransferWithoutVirtualCardsEnabled(value: boolean) {
        this._isTransferWithoutVirtualCardsEnabled = value;
    }

    get successfulLoginOLBTrackingRecordType(): number {
        return this._successfulLoginOLBTrackingRecordType;
    }
    set successfulLoginOLBTrackingRecordType(value: number) {
        this._successfulLoginOLBTrackingRecordType = value;
    }

    get successfulLoginOLBTrackingRecordField(): TrackingRecordFieldName {
        return this._successfulLoginOLBTrackingRecordField;
    }
    set successfulLoginOLBTrackingRecordField(value: TrackingRecordFieldName) {
        this._successfulLoginOLBTrackingRecordField = value;
    }

    get successfulLoginMobileTrackingRecordType(): number {
        return this._successfulLoginMobileTrackingRecordType;
    }
    set successfulLoginMobileTrackingRecordType(value: number) {
        this._successfulLoginMobileTrackingRecordType = value;
    }

    get successfulLoginMobileTrackingRecordField(): TrackingRecordFieldName {
        return this._successfulLoginMobileTrackingRecordField;
    }
    set successfulLoginMobileTrackingRecordField(value: TrackingRecordFieldName) {
        this._successfulLoginMobileTrackingRecordField = value;
    }

    get externalLoanTrackingRecordInterestField(): TrackingRecordFieldName {
        return this._externalLoanTrackingRecordInterestField;
    }
    set externalLoanTrackingRecordInterestField(value: TrackingRecordFieldName) {
        this._externalLoanTrackingRecordInterestField = value;
    }

    get getInterestRateFromExternalLoanTrackingRecordIsEnabled(): boolean {
        return this._getInterestRateFromExternalLoanTrackingRecordIsEnabled;
    }
    set getInterestRateFromExternalLoanTrackingRecordIsEnabled(value: boolean) {
        this._getInterestRateFromExternalLoanTrackingRecordIsEnabled = value;
    }

    get debitCardTypeCodes(): string[] {
        return this._debitCardTypeCodes;
    }
    set debitCardTypeCodes(value: string[]) {
        this._debitCardTypeCodes = value;
    }

    get shouldReverseAddressLine1And2(): boolean {
        return this._shouldReverseAddressLine1And2;
    }
    set shouldReverseAddressLine1And2(value: boolean) {
        this._shouldReverseAddressLine1And2 = value;
    }

    get symitarExternalLoanRecordMortgageTypes(): string {
        return this._symitarExternalLoanRecordMortgageTypes;
    }
    set symitarExternalLoanRecordMortgageTypes(value: string) {
        this._symitarExternalLoanRecordMortgageTypes = value;
    }

    get getAlternateMicr(): boolean {
        return this._getAlternateMicr;
    }
    set getAlternateMicr(value: boolean) {
        this._getAlternateMicr = value;
    }

    get accountInquiryIncludesRegD(): boolean {
        return this._accountInquiryIncludesRegD;
    }
    set accountInquiryIncludesRegD(value: boolean) {
        this._accountInquiryIncludesRegD = value;
    }

    get accountInquiryPowerOnVersion(): string {
        return this._accountInquiryPowerOnVersion;
    }
    set accountInquiryPowerOnVersion(value: string) {
        this._accountInquiryPowerOnVersion = value;
    }

    get accountInquiryScriptName(): string {
        return this._accountInquiryScriptName;
    }
    set accountInquiryScriptName(value: string) {
        this._accountInquiryScriptName = value;
    }

    get warningCodesBlockInquiryShare(): string {
        return this._warningCodesBlockInquiryShare;
    }
    set warningCodesBlockInquiryShare(value: string) {
        this._warningCodesBlockInquiryShare = value;
    }

    get warningCodesBlockInquiryLoan(): string {
        return this._warningCodesBlockInquiryLoan;
    }
    set warningCodesBlockInquiryLoan(value: string) {
        this._warningCodesBlockInquiryLoan = value;
    }

    get skipPayQualifyingTrackingRecordType(): number {
        return this._skipPayQualifyingTrackingRecordType;
    }
    set skipPayQualifyingTrackingRecordType(value: number) {
        this._skipPayQualifyingTrackingRecordType = value;
    }

    get symitarAlternateAddressType(): number {
        return this._symitarAlternateAddressType;
    }
    set symitarAlternateAddressType(value: number) {
        this._symitarAlternateAddressType = value;
    }

    get showPostDate(): boolean {
        return this._showPostDate;
    }
    set showPostDate(value: boolean) {
        this._showPostDate = value;
    }

    get shouldLoadMortgageFromTrackingRecord(): boolean {
        return this._shouldLoadMortgageFromTrackingRecord;
    }
    set shouldLoadMortgageFromTrackingRecord(value: boolean) {
        this._shouldLoadMortgageFromTrackingRecord = value;
    }

    get shouldLoadCardsFromTrackingRecords(): boolean {
        return this._shouldLoadCardsFromTrackingRecords;
    }
    set shouldLoadCardsFromTrackingRecords(value: boolean) {
        this._shouldLoadCardsFromTrackingRecords = value;
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
                key: Symitar.metadata.settings.remoteDepositCheckHold.key,
                value: JSON.stringify(this._remoteDepositCheckHold.toSettings()),
                dataType: 'json'
            },
            {
                key: Symitar.metadata.settings.isTransferWithoutVirtualCardsEnabled.key,
                value: String(this._isTransferWithoutVirtualCardsEnabled),
                dataType: 'boolean'
            },
            {
                key: Symitar.metadata.settings.successfulLoginOLBTrackingRecordType.key,
                value: String(this._successfulLoginOLBTrackingRecordType),
                dataType: 'number'
            },
            {
                key: Symitar.metadata.settings.successfulLoginOLBTrackingRecordField.key,
                value: JSON.stringify(this._successfulLoginOLBTrackingRecordField.toSettings()),
                dataType: 'json'
            },
            {
                key: Symitar.metadata.settings.successfulLoginMobileTrackingRecordType.key,
                value: String(this._successfulLoginMobileTrackingRecordType),
                dataType: 'number'
            },
            {
                key: Symitar.metadata.settings.successfulLoginMobileTrackingRecordField.key,
                value: JSON.stringify(this._successfulLoginMobileTrackingRecordField.toSettings()),
                dataType: 'json'
            },
            {
                key: Symitar.metadata.settings.externalLoanTrackingRecordInterestField.key,
                value: JSON.stringify(this._externalLoanTrackingRecordInterestField.toSettings()),
                dataType: 'json'
            },
            {
                key: Symitar.metadata.settings.getInterestRateFromExternalLoanTrackingRecordIsEnabled.key,
                value: String(this._getInterestRateFromExternalLoanTrackingRecordIsEnabled),
                dataType: 'boolean'
            },
            {
                key: Symitar.metadata.settings.debitCardTypeCodes.key,
                value: JSON.stringify(this._debitCardTypeCodes),
                dataType: 'json'
            },
            {
                key: Symitar.metadata.settings.shouldReverseAddressLine1And2.key,
                value: String(this._shouldReverseAddressLine1And2),
                dataType: 'boolean'
            },
            {
                key: Symitar.metadata.settings.symitarExternalLoanRecordMortgageTypes.key,
                value: this._symitarExternalLoanRecordMortgageTypes,
                dataType: 'string'
            },
            {
                key: Symitar.metadata.settings.getAlternateMicr.key,
                value: String(this._getAlternateMicr),
                dataType: 'boolean'
            },
            {
                key: Symitar.metadata.settings.accountInquiryIncludesRegD.key,
                value: String(this._accountInquiryIncludesRegD),
                dataType: 'boolean'
            },
            {
                key: Symitar.metadata.settings.accountInquiryPowerOnVersion.key,
                value: this._accountInquiryPowerOnVersion,
                dataType: 'string'
            },
            {
                key: Symitar.metadata.settings.accountInquiryScriptName.key,
                value: this._accountInquiryScriptName,
                dataType: 'string'
            },
            {
                key: Symitar.metadata.settings.warningCodesBlockInquiryShare.key,
                value: this._warningCodesBlockInquiryShare,
                dataType: 'string'
            },
            {
                key: Symitar.metadata.settings.warningCodesBlockInquiryLoan.key,
                value: this._warningCodesBlockInquiryLoan,
                dataType: 'string'
            },
            {
                key: Symitar.metadata.settings.skipPayQualifyingTrackingRecordType.key,
                value: String(this._skipPayQualifyingTrackingRecordType),
                dataType: 'number'
            },
            {
                key: Symitar.metadata.settings.symitarAlternateAddressType.key,
                value: String(this._symitarAlternateAddressType),
                dataType: 'number'
            },
            {
                key: Symitar.metadata.settings.showPostDate.key,
                value: String(this._showPostDate),
                dataType: 'boolean'
            },
            {
                key: Symitar.metadata.settings.shouldLoadMortgageFromTrackingRecord.key,
                value: String(this._shouldLoadMortgageFromTrackingRecord),
                dataType: 'boolean'
            },
            {
                key: Symitar.metadata.settings.shouldLoadCardsFromTrackingRecords.key,
                value: String(this._shouldLoadCardsFromTrackingRecords),
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
                case Symitar.metadata.settings.remoteDepositCheckHold.key:
                    const remoteDepositCheckHoldSettings = JSON.parse(setting.value);
                    this._remoteDepositCheckHold.fromSettings(remoteDepositCheckHoldSettings);
                    break;
                case Symitar.metadata.settings.isTransferWithoutVirtualCardsEnabled.key:
                    this._isTransferWithoutVirtualCardsEnabled = setting.value.toLowerCase() === 'true';
                    break;
                case Symitar.metadata.settings.successfulLoginOLBTrackingRecordType.key:
                    this._successfulLoginOLBTrackingRecordType = Number(setting.value);
                    break;
                case Symitar.metadata.settings.successfulLoginOLBTrackingRecordField.key:
                    const successfulLoginOLBTrackingRecordFieldSettings = JSON.parse(setting.value);
                    this._successfulLoginOLBTrackingRecordField.fromSettings(successfulLoginOLBTrackingRecordFieldSettings);
                    break;
                case Symitar.metadata.settings.successfulLoginMobileTrackingRecordType.key:
                    this._successfulLoginMobileTrackingRecordType = Number(setting.value);
                    break;
                case Symitar.metadata.settings.successfulLoginMobileTrackingRecordField.key:
                    const successfulLoginMobileTrackingRecordFieldSettings = JSON.parse(setting.value);
                    this._successfulLoginMobileTrackingRecordField.fromSettings(successfulLoginMobileTrackingRecordFieldSettings);
                    break;
                case Symitar.metadata.settings.externalLoanTrackingRecordInterestField.key:
                    const externalLoanTrackingRecordInterestFieldSettings = JSON.parse(setting.value);
                    this._externalLoanTrackingRecordInterestField.fromSettings(externalLoanTrackingRecordInterestFieldSettings);
                    break;
                case Symitar.metadata.settings.getInterestRateFromExternalLoanTrackingRecordIsEnabled.key:
                    this._getInterestRateFromExternalLoanTrackingRecordIsEnabled = setting.value.toLowerCase() === 'true';
                    break;
                case Symitar.metadata.settings.debitCardTypeCodes.key:
                    this._debitCardTypeCodes = JSON.parse(setting.value);
                    break;
                case Symitar.metadata.settings.shouldReverseAddressLine1And2.key:
                    this._shouldReverseAddressLine1And2 = setting.value.toLowerCase() === 'true';
                    break;
                case Symitar.metadata.settings.symitarExternalLoanRecordMortgageTypes.key:
                    this._symitarExternalLoanRecordMortgageTypes = setting.value;
                    break;
                case Symitar.metadata.settings.getAlternateMicr.key:
                    this._getAlternateMicr = setting.value.toLowerCase() === 'true';
                    break;
                case Symitar.metadata.settings.accountInquiryIncludesRegD.key:
                    this._accountInquiryIncludesRegD = setting.value.toLowerCase() === 'true';
                    break;
                case Symitar.metadata.settings.accountInquiryPowerOnVersion.key:
                    this._accountInquiryPowerOnVersion = setting.value;
                    break;
                case Symitar.metadata.settings.accountInquiryScriptName.key:
                    this._accountInquiryScriptName = setting.value;
                    break;
                case Symitar.metadata.settings.warningCodesBlockInquiryShare.key:
                    this._warningCodesBlockInquiryShare = setting.value;
                    break;
                case Symitar.metadata.settings.warningCodesBlockInquiryLoan.key:
                    this._warningCodesBlockInquiryLoan = setting.value;
                    break;
                case Symitar.metadata.settings.skipPayQualifyingTrackingRecordType.key:
                    this._skipPayQualifyingTrackingRecordType = Number(setting.value);
                    break;
                case Symitar.metadata.settings.symitarAlternateAddressType.key:
                    this._symitarAlternateAddressType = Number(setting.value);
                    break;
                case Symitar.metadata.settings.showPostDate.key:
                    this._showPostDate = setting.value.toLowerCase() === 'true';
                    break;
                case Symitar.metadata.settings.shouldLoadMortgageFromTrackingRecord.key:
                    this._shouldLoadMortgageFromTrackingRecord = setting.value.toLowerCase() === 'true';
                    break;
                case Symitar.metadata.settings.shouldLoadCardsFromTrackingRecords.key:
                    this._shouldLoadCardsFromTrackingRecords = setting.value.toLowerCase() === 'true';
                    break;
            }
        }
    }
}