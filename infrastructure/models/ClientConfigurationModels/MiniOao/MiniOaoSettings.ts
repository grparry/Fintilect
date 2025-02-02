import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface MiniOaoSettingsConfig {
    Enabled: boolean;
    MinVersion: number;
    ShouldShowJointOwners: boolean;
    AddNewJointOwnerEnabled: boolean;
    ShouldSelectAllJointAccountsByDefaultOnNewAccountCreation: boolean;
    AllowCreateNewJointOwnerDuringAccountCreation: boolean;
    AllowNewAccountFunding: boolean;
    ShouldWarnUserIfNoDebitCardSelected: boolean;
    PromoCodesEnabled: boolean;
    ForceNewAccountOpeningDisclosure: boolean;
    ForceAddNewJointOwnerDisclosure: boolean;
    AdapiUrl: string;
    ShouldUseMockData: boolean;
    CanFundFromCrossAccount: boolean;
    DebitCardProductId: number;
    RequireIdInfoOnAddJointOwner: boolean;
    RequireEmployerInfoOnAddJointOwner: boolean;
    SecureMessageCategory: string;
}

export class MiniOaoSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'MiniOaoSettings'
    };


            private _enabled: boolean;
            get enabled(): boolean {
                return this._enabled;
            }
            set enabled(value: boolean) {
                this._enabled = value;
            }

            private _minVersion: number;
            get minVersion(): number {
                return this._minVersion;
            }
            set minVersion(value: number) {
                this._minVersion = value;
            }

            private _shouldShowJointOwners: boolean;
            get shouldShowJointOwners(): boolean {
                return this._shouldShowJointOwners;
            }
            set shouldShowJointOwners(value: boolean) {
                this._shouldShowJointOwners = value;
            }

            private _addNewJointOwnerEnabled: boolean;
            get addNewJointOwnerEnabled(): boolean {
                return this._addNewJointOwnerEnabled;
            }
            set addNewJointOwnerEnabled(value: boolean) {
                this._addNewJointOwnerEnabled = value;
            }

            private _shouldSelectAllJointAccountsByDefaultOnNewAccountCreation: boolean;
            get shouldSelectAllJointAccountsByDefaultOnNewAccountCreation(): boolean {
                return this._shouldSelectAllJointAccountsByDefaultOnNewAccountCreation;
            }
            set shouldSelectAllJointAccountsByDefaultOnNewAccountCreation(value: boolean) {
                this._shouldSelectAllJointAccountsByDefaultOnNewAccountCreation = value;
            }

            private _allowCreateNewJointOwnerDuringAccountCreation: boolean;
            get allowCreateNewJointOwnerDuringAccountCreation(): boolean {
                return this._allowCreateNewJointOwnerDuringAccountCreation;
            }
            set allowCreateNewJointOwnerDuringAccountCreation(value: boolean) {
                this._allowCreateNewJointOwnerDuringAccountCreation = value;
            }

            private _allowNewAccountFunding: boolean;
            get allowNewAccountFunding(): boolean {
                return this._allowNewAccountFunding;
            }
            set allowNewAccountFunding(value: boolean) {
                this._allowNewAccountFunding = value;
            }

            private _shouldWarnUserIfNoDebitCardSelected: boolean;
            get shouldWarnUserIfNoDebitCardSelected(): boolean {
                return this._shouldWarnUserIfNoDebitCardSelected;
            }
            set shouldWarnUserIfNoDebitCardSelected(value: boolean) {
                this._shouldWarnUserIfNoDebitCardSelected = value;
            }

            private _promoCodesEnabled: boolean;
            get promoCodesEnabled(): boolean {
                return this._promoCodesEnabled;
            }
            set promoCodesEnabled(value: boolean) {
                this._promoCodesEnabled = value;
            }

            private _forceNewAccountOpeningDisclosure: boolean;
            get forceNewAccountOpeningDisclosure(): boolean {
                return this._forceNewAccountOpeningDisclosure;
            }
            set forceNewAccountOpeningDisclosure(value: boolean) {
                this._forceNewAccountOpeningDisclosure = value;
            }

            private _forceAddNewJointOwnerDisclosure: boolean;
            get forceAddNewJointOwnerDisclosure(): boolean {
                return this._forceAddNewJointOwnerDisclosure;
            }
            set forceAddNewJointOwnerDisclosure(value: boolean) {
                this._forceAddNewJointOwnerDisclosure = value;
            }

            private _adapiUrl: string;
            get adapiUrl(): string {
                return this._adapiUrl;
            }
            set adapiUrl(value: string) {
                this._adapiUrl = value;
            }

            private _shouldUseMockData: boolean;
            get shouldUseMockData(): boolean {
                return this._shouldUseMockData;
            }
            set shouldUseMockData(value: boolean) {
                this._shouldUseMockData = value;
            }

            private _canFundFromCrossAccount: boolean;
            get canFundFromCrossAccount(): boolean {
                return this._canFundFromCrossAccount;
            }
            set canFundFromCrossAccount(value: boolean) {
                this._canFundFromCrossAccount = value;
            }

            private _debitCardProductId: number;
            get debitCardProductId(): number {
                return this._debitCardProductId;
            }
            set debitCardProductId(value: number) {
                this._debitCardProductId = value;
            }

            private _requireIdInfoOnAddJointOwner: boolean;
            get requireIdInfoOnAddJointOwner(): boolean {
                return this._requireIdInfoOnAddJointOwner;
            }
            set requireIdInfoOnAddJointOwner(value: boolean) {
                this._requireIdInfoOnAddJointOwner = value;
            }

            private _requireEmployerInfoOnAddJointOwner: boolean;
            get requireEmployerInfoOnAddJointOwner(): boolean {
                return this._requireEmployerInfoOnAddJointOwner;
            }
            set requireEmployerInfoOnAddJointOwner(value: boolean) {
                this._requireEmployerInfoOnAddJointOwner = value;
            }

            private _secureMessageCategory: string;
            get secureMessageCategory(): string {
                return this._secureMessageCategory;
            }
            set secureMessageCategory(value: string) {
                this._secureMessageCategory = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "MiniOaoSettings.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "MiniOaoSettings.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "MiniOaoSettings.ShouldShowJointOwners", value: this._shouldShowJointOwners, dataType: 'boolean', label: "Should Show Joint Owners" },
                { key: "MiniOaoSettings.AddNewJointOwnerEnabled", value: this._addNewJointOwnerEnabled, dataType: 'boolean', label: "Add New Joint Owner Enabled" },
                { key: "MiniOaoSettings.ShouldSelectAllJointAccountsByDefaultOnNewAccountCreation", value: this._shouldSelectAllJointAccountsByDefaultOnNewAccountCreation, dataType: 'boolean', label: "Should Select All Joint Accounts By Default On New Account Creation" },
                { key: "MiniOaoSettings.AllowCreateNewJointOwnerDuringAccountCreation", value: this._allowCreateNewJointOwnerDuringAccountCreation, dataType: 'boolean', label: "Allow Create New Joint Owner During Account Creation" },
                { key: "MiniOaoSettings.AllowNewAccountFunding", value: this._allowNewAccountFunding, dataType: 'boolean', label: "Allow New Account Funding" },
                { key: "MiniOaoSettings.ShouldWarnUserIfNoDebitCardSelected", value: this._shouldWarnUserIfNoDebitCardSelected, dataType: 'boolean', label: "Should Warn User If No Debit Card Selected" },
                { key: "MiniOaoSettings.PromoCodesEnabled", value: this._promoCodesEnabled, dataType: 'boolean', label: "Promo Codes Enabled" },
                { key: "MiniOaoSettings.ForceNewAccountOpeningDisclosure", value: this._forceNewAccountOpeningDisclosure, dataType: 'boolean', label: "Force New Account Opening Disclosure" },
                { key: "MiniOaoSettings.ForceAddNewJointOwnerDisclosure", value: this._forceAddNewJointOwnerDisclosure, dataType: 'boolean', label: "Force Add New Joint Owner Disclosure" },
                { key: "MiniOaoSettings.AdapiUrl", value: this._adapiUrl, dataType: 'string', label: "Adapi Url" },
                { key: "MiniOaoSettings.ShouldUseMockData", value: this._shouldUseMockData, dataType: 'boolean', label: "Should Use Mock Data" },
                { key: "MiniOaoSettings.CanFundFromCrossAccount", value: this._canFundFromCrossAccount, dataType: 'boolean', label: "Can Fund From Cross Account" },
                { key: "MiniOaoSettings.DebitCardProductId", value: this._debitCardProductId, dataType: 'number', label: "Debit Card Product Id" },
                { key: "MiniOaoSettings.RequireIdInfoOnAddJointOwner", value: this._requireIdInfoOnAddJointOwner, dataType: 'boolean', label: "Require Id Info On Add Joint Owner" },
                { key: "MiniOaoSettings.RequireEmployerInfoOnAddJointOwner", value: this._requireEmployerInfoOnAddJointOwner, dataType: 'boolean', label: "Require Employer Info On Add Joint Owner" },
                { key: "MiniOaoSettings.SecureMessageCategory", value: this._secureMessageCategory, dataType: 'string', label: "Secure Message Category" },
            ];
        }

}