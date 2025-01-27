import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { AnyMemberTransferField } from '@infrastructure/AnyMemberTransferField';
export interface AnyMemberTransfersConfig {
    Enabled: boolean;
    MinVersion: number;
    RequiredFields: AnyMemberTransferField[];
    OptionalFields: AnyMemberTransferField[];
    DefaultSuffix: string;
    AccountTypes: string[];
    MaxFailedTransferAttemptsPerDay: number;
    MinimumTransferAmount: number;
    AccountTypeMappings: Record<string, string>;
    AccountSuffixMappings: Record<string, string>;
    AccessTypeFlagNumber: number;
    DefaultAccountType: string;
}

export class AnyMemberTransfers implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'AnyMemberTransfers'
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

            private _requiredFields: AnyMemberTransferField[];
            get requiredFields(): AnyMemberTransferField[] {
                return this._requiredFields;
            }
            set requiredFields(value: AnyMemberTransferField[]) {
                this._requiredFields = value;
            }

            private _optionalFields: AnyMemberTransferField[];
            get optionalFields(): AnyMemberTransferField[] {
                return this._optionalFields;
            }
            set optionalFields(value: AnyMemberTransferField[]) {
                this._optionalFields = value;
            }

            private _defaultSuffix: string;
            get defaultSuffix(): string {
                return this._defaultSuffix;
            }
            set defaultSuffix(value: string) {
                this._defaultSuffix = value;
            }

            private _accountTypes: string[];
            get accountTypes(): string[] {
                return this._accountTypes;
            }
            set accountTypes(value: string[]) {
                this._accountTypes = value;
            }

            private _maxFailedTransferAttemptsPerDay: number;
            get maxFailedTransferAttemptsPerDay(): number {
                return this._maxFailedTransferAttemptsPerDay;
            }
            set maxFailedTransferAttemptsPerDay(value: number) {
                this._maxFailedTransferAttemptsPerDay = value;
            }

            private _minimumTransferAmount: number;
            get minimumTransferAmount(): number {
                return this._minimumTransferAmount;
            }
            set minimumTransferAmount(value: number) {
                this._minimumTransferAmount = value;
            }

            private _accountTypeMappings: Record<string, string>;
            get accountTypeMappings(): Record<string, string> {
                return this._accountTypeMappings;
            }
            set accountTypeMappings(value: Record<string, string>) {
                this._accountTypeMappings = value;
            }

            private _accountSuffixMappings: Record<string, string>;
            get accountSuffixMappings(): Record<string, string> {
                return this._accountSuffixMappings;
            }
            set accountSuffixMappings(value: Record<string, string>) {
                this._accountSuffixMappings = value;
            }

            private _accessTypeFlagNumber: number;
            get accessTypeFlagNumber(): number {
                return this._accessTypeFlagNumber;
            }
            set accessTypeFlagNumber(value: number) {
                this._accessTypeFlagNumber = value;
            }

            private _defaultAccountType: string;
            get defaultAccountType(): string {
                return this._defaultAccountType;
            }
            set defaultAccountType(value: string) {
                this._defaultAccountType = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "AnyMemberTransfers.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "AnyMemberTransfers.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "AnyMemberTransfers.RequiredFields", value: this._requiredFields, dataType: 'array<AnyMemberTransferField>', label: "Required Fields" },
                { key: "AnyMemberTransfers.OptionalFields", value: this._optionalFields, dataType: 'array<AnyMemberTransferField>', label: "Optional Fields" },
                { key: "AnyMemberTransfers.DefaultSuffix", value: this._defaultSuffix, dataType: 'string', label: "Default Suffix" },
                { key: "AnyMemberTransfers.AccountTypes", value: this._accountTypes, dataType: 'list<string>', label: "Account Types" },
                { key: "AnyMemberTransfers.MaxFailedTransferAttemptsPerDay", value: this._maxFailedTransferAttemptsPerDay, dataType: 'number', label: "Max Failed Transfer Attempts Per Day" },
                { key: "AnyMemberTransfers.MinimumTransferAmount", value: this._minimumTransferAmount, dataType: 'number', label: "Minimum Transfer Amount" },
                { key: "AnyMemberTransfers.AccountTypeMappings", value: this._accountTypeMappings, dataType: 'record<string, string>', label: "Account Type Mappings" },
                { key: "AnyMemberTransfers.AccountSuffixMappings", value: this._accountSuffixMappings, dataType: 'record<string, string>', label: "Account Suffix Mappings" },
                { key: "AnyMemberTransfers.AccessTypeFlagNumber", value: this._accessTypeFlagNumber, dataType: 'number', label: "Access Type Flag Number" },
                { key: "AnyMemberTransfers.DefaultAccountType", value: this._defaultAccountType, dataType: 'string', label: "Default Account Type" },
            ];
        }

}