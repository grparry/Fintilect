import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface ZelleSettingsConfig {
    Enabled: boolean;
    MinVersion: number;
    BaseUrl: string;
    MinAndroidVersion: string;
    MinIosVersion: string;
    BId: string;
    RouteTransit: string;
    PartnerUid: string;
    ApplId: string;
    EnrollWithJointOwnerEnabled: boolean;
    ServiceId: string;
    TransactionAmountLimit: number;
    DailyAmountLimit: number;
    CertificateName: string;
    CheckNumber: number;
    UseMemberAccountNumberWithSuffix: boolean;
    AccountNumberFormat: string;
    AllowCrossAccount: boolean;
}

export class ZelleSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'ZelleSettings'
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

            private _baseUrl: string;
            get baseUrl(): string {
                return this._baseUrl;
            }
            set baseUrl(value: string) {
                this._baseUrl = value;
            }

            private _minAndroidVersion: string;
            get minAndroidVersion(): string {
                return this._minAndroidVersion;
            }
            set minAndroidVersion(value: string) {
                this._minAndroidVersion = value;
            }

            private _minIosVersion: string;
            get minIosVersion(): string {
                return this._minIosVersion;
            }
            set minIosVersion(value: string) {
                this._minIosVersion = value;
            }

            private _bId: string;
            get bId(): string {
                return this._bId;
            }
            set bId(value: string) {
                this._bId = value;
            }

            private _routeTransit: string;
            get routeTransit(): string {
                return this._routeTransit;
            }
            set routeTransit(value: string) {
                this._routeTransit = value;
            }

            private _partnerUid: string;
            get partnerUid(): string {
                return this._partnerUid;
            }
            set partnerUid(value: string) {
                this._partnerUid = value;
            }

            private _applId: string;
            get applId(): string {
                return this._applId;
            }
            set applId(value: string) {
                this._applId = value;
            }

            private _enrollWithJointOwnerEnabled: boolean;
            get enrollWithJointOwnerEnabled(): boolean {
                return this._enrollWithJointOwnerEnabled;
            }
            set enrollWithJointOwnerEnabled(value: boolean) {
                this._enrollWithJointOwnerEnabled = value;
            }

            private _serviceId: string;
            get serviceId(): string {
                return this._serviceId;
            }
            set serviceId(value: string) {
                this._serviceId = value;
            }

            private _transactionAmountLimit: number;
            get transactionAmountLimit(): number {
                return this._transactionAmountLimit;
            }
            set transactionAmountLimit(value: number) {
                this._transactionAmountLimit = value;
            }

            private _dailyAmountLimit: number;
            get dailyAmountLimit(): number {
                return this._dailyAmountLimit;
            }
            set dailyAmountLimit(value: number) {
                this._dailyAmountLimit = value;
            }

            private _certificateName: string;
            get certificateName(): string {
                return this._certificateName;
            }
            set certificateName(value: string) {
                this._certificateName = value;
            }

            private _checkNumber: number;
            get checkNumber(): number {
                return this._checkNumber;
            }
            set checkNumber(value: number) {
                this._checkNumber = value;
            }

            private _useMemberAccountNumberWithSuffix: boolean;
            get useMemberAccountNumberWithSuffix(): boolean {
                return this._useMemberAccountNumberWithSuffix;
            }
            set useMemberAccountNumberWithSuffix(value: boolean) {
                this._useMemberAccountNumberWithSuffix = value;
            }

            private _accountNumberFormat: string;
            get accountNumberFormat(): string {
                return this._accountNumberFormat;
            }
            set accountNumberFormat(value: string) {
                this._accountNumberFormat = value;
            }

            private _allowCrossAccount: boolean;
            get allowCrossAccount(): boolean {
                return this._allowCrossAccount;
            }
            set allowCrossAccount(value: boolean) {
                this._allowCrossAccount = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "ZelleSettings.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "ZelleSettings.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "ZelleSettings.BaseUrl", value: this._baseUrl, dataType: 'string', label: "Base Url" },
                { key: "ZelleSettings.MinAndroidVersion", value: this._minAndroidVersion, dataType: 'string', label: "Min Android Version" },
                { key: "ZelleSettings.MinIosVersion", value: this._minIosVersion, dataType: 'string', label: "Min Ios Version" },
                { key: "ZelleSettings.BId", value: this._bId, dataType: 'string', label: "B Id" },
                { key: "ZelleSettings.RouteTransit", value: this._routeTransit, dataType: 'string', label: "Route Transit" },
                { key: "ZelleSettings.PartnerUid", value: this._partnerUid, dataType: 'string', label: "Partner Uid" },
                { key: "ZelleSettings.ApplId", value: this._applId, dataType: 'string', label: "Appl Id" },
                { key: "ZelleSettings.EnrollWithJointOwnerEnabled", value: this._enrollWithJointOwnerEnabled, dataType: 'boolean', label: "Enroll With Joint Owner Enabled" },
                { key: "ZelleSettings.ServiceId", value: this._serviceId, dataType: 'string', label: "Service Id" },
                { key: "ZelleSettings.TransactionAmountLimit", value: this._transactionAmountLimit, dataType: 'number', label: "Transaction Amount Limit" },
                { key: "ZelleSettings.DailyAmountLimit", value: this._dailyAmountLimit, dataType: 'number', label: "Daily Amount Limit" },
                { key: "ZelleSettings.CertificateName", value: this._certificateName, dataType: 'string', label: "Certificate Name" },
                { key: "ZelleSettings.CheckNumber", value: this._checkNumber, dataType: 'number', label: "Check Number" },
                { key: "ZelleSettings.UseMemberAccountNumberWithSuffix", value: this._useMemberAccountNumberWithSuffix, dataType: 'boolean', label: "Use Member Account Number With Suffix" },
                { key: "ZelleSettings.AccountNumberFormat", value: this._accountNumberFormat, dataType: 'string', label: "Account Number Format" },
                { key: "ZelleSettings.AllowCrossAccount", value: this._allowCrossAccount, dataType: 'boolean', label: "Allow Cross Account" },
            ];
        }

}