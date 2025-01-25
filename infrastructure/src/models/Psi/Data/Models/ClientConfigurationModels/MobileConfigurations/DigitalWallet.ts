import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface DigitalWalletConfig {
    Enabled: boolean;
    EndpointAddress: string;
    userId: string;
    password: string;
    schemaVersion: string;
    clientId: string;
    system: string[];
    clientApplicationName: string;
    clientVersion: string;
    clientVendorName: string;
    EncryptionSecurityKey: string;
    CertificateName: string;
    CertificatePassword: string;
    AndroidStoreUrl: string;
    IosStoreUrl: string;
    PackageName: string;
    UrlScheme: string;
    PopupEnabled: boolean;
    TimeBeforeRepeatPopup: number;
    ShowEnrollmentPromptFlagNumber: number;
    DebitCardControlFlagNumber: number;
    CreditCardControlFlagNumber: number;
}

export class DigitalWallet implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'DigitalWallet'
    };


            private _enabled: boolean;
            get enabled(): boolean {
                return this._enabled;
            }
            set enabled(value: boolean) {
                this._enabled = value;
            }

            private _endpointAddress: string;
            get endpointAddress(): string {
                return this._endpointAddress;
            }
            set endpointAddress(value: string) {
                this._endpointAddress = value;
            }

            private _userId: string;
            get userId(): string {
                return this._userId;
            }
            set userId(value: string) {
                this._userId = value;
            }

            private _password: string;
            get password(): string {
                return this._password;
            }
            set password(value: string) {
                this._password = value;
            }

            private _schemaVersion: string;
            get schemaVersion(): string {
                return this._schemaVersion;
            }
            set schemaVersion(value: string) {
                this._schemaVersion = value;
            }

            private _clientId: string;
            get clientId(): string {
                return this._clientId;
            }
            set clientId(value: string) {
                this._clientId = value;
            }

            private _system: string[];
            get system(): string[] {
                return this._system;
            }
            set system(value: string[]) {
                this._system = value;
            }

            private _clientApplicationName: string;
            get clientApplicationName(): string {
                return this._clientApplicationName;
            }
            set clientApplicationName(value: string) {
                this._clientApplicationName = value;
            }

            private _clientVersion: string;
            get clientVersion(): string {
                return this._clientVersion;
            }
            set clientVersion(value: string) {
                this._clientVersion = value;
            }

            private _clientVendorName: string;
            get clientVendorName(): string {
                return this._clientVendorName;
            }
            set clientVendorName(value: string) {
                this._clientVendorName = value;
            }

            private _encryptionSecurityKey: string;
            get encryptionSecurityKey(): string {
                return this._encryptionSecurityKey;
            }
            set encryptionSecurityKey(value: string) {
                this._encryptionSecurityKey = value;
            }

            private _certificateName: string;
            get certificateName(): string {
                return this._certificateName;
            }
            set certificateName(value: string) {
                this._certificateName = value;
            }

            private _certificatePassword: string;
            get certificatePassword(): string {
                return this._certificatePassword;
            }
            set certificatePassword(value: string) {
                this._certificatePassword = value;
            }

            private _androidStoreUrl: string;
            get androidStoreUrl(): string {
                return this._androidStoreUrl;
            }
            set androidStoreUrl(value: string) {
                this._androidStoreUrl = value;
            }

            private _iosStoreUrl: string;
            get iosStoreUrl(): string {
                return this._iosStoreUrl;
            }
            set iosStoreUrl(value: string) {
                this._iosStoreUrl = value;
            }

            private _packageName: string;
            get packageName(): string {
                return this._packageName;
            }
            set packageName(value: string) {
                this._packageName = value;
            }

            private _urlScheme: string;
            get urlScheme(): string {
                return this._urlScheme;
            }
            set urlScheme(value: string) {
                this._urlScheme = value;
            }

            private _popupEnabled: boolean;
            get popupEnabled(): boolean {
                return this._popupEnabled;
            }
            set popupEnabled(value: boolean) {
                this._popupEnabled = value;
            }

            private _timeBeforeRepeatPopup: number;
            get timeBeforeRepeatPopup(): number {
                return this._timeBeforeRepeatPopup;
            }
            set timeBeforeRepeatPopup(value: number) {
                this._timeBeforeRepeatPopup = value;
            }

            private _showEnrollmentPromptFlagNumber: number;
            get showEnrollmentPromptFlagNumber(): number {
                return this._showEnrollmentPromptFlagNumber;
            }
            set showEnrollmentPromptFlagNumber(value: number) {
                this._showEnrollmentPromptFlagNumber = value;
            }

            private _debitCardControlFlagNumber: number;
            get debitCardControlFlagNumber(): number {
                return this._debitCardControlFlagNumber;
            }
            set debitCardControlFlagNumber(value: number) {
                this._debitCardControlFlagNumber = value;
            }

            private _creditCardControlFlagNumber: number;
            get creditCardControlFlagNumber(): number {
                return this._creditCardControlFlagNumber;
            }
            set creditCardControlFlagNumber(value: number) {
                this._creditCardControlFlagNumber = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "DigitalWallet.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "DigitalWallet.EndpointAddress", value: this._endpointAddress, dataType: 'string', label: "Endpoint Address" },
                { key: "DigitalWallet.userId", value: this._userId, dataType: 'string', label: "User Id" },
                { key: "DigitalWallet.password", value: this._password, dataType: 'string', label: "Password" },
                { key: "DigitalWallet.schemaVersion", value: this._schemaVersion, dataType: 'string', label: "Schema Version" },
                { key: "DigitalWallet.clientId", value: this._clientId, dataType: 'string', label: "Client Id" },
                { key: "DigitalWallet.system", value: this._system, dataType: 'list<string>', label: "System" },
                { key: "DigitalWallet.clientApplicationName", value: this._clientApplicationName, dataType: 'string', label: "Client Application Name" },
                { key: "DigitalWallet.clientVersion", value: this._clientVersion, dataType: 'string', label: "Client Version" },
                { key: "DigitalWallet.clientVendorName", value: this._clientVendorName, dataType: 'string', label: "Client Vendor Name" },
                { key: "DigitalWallet.EncryptionSecurityKey", value: this._encryptionSecurityKey, dataType: 'string', label: "Encryption Security Key" },
                { key: "DigitalWallet.CertificateName", value: this._certificateName, dataType: 'string', label: "Certificate Name" },
                { key: "DigitalWallet.CertificatePassword", value: this._certificatePassword, dataType: 'string', label: "Certificate Password" },
                { key: "DigitalWallet.AndroidStoreUrl", value: this._androidStoreUrl, dataType: 'string', label: "Android Store Url" },
                { key: "DigitalWallet.IosStoreUrl", value: this._iosStoreUrl, dataType: 'string', label: "Ios Store Url" },
                { key: "DigitalWallet.PackageName", value: this._packageName, dataType: 'string', label: "Package Name" },
                { key: "DigitalWallet.UrlScheme", value: this._urlScheme, dataType: 'string', label: "Url Scheme" },
                { key: "DigitalWallet.PopupEnabled", value: this._popupEnabled, dataType: 'boolean', label: "Popup Enabled" },
                { key: "DigitalWallet.TimeBeforeRepeatPopup", value: this._timeBeforeRepeatPopup, dataType: 'number', label: "Time Before Repeat Popup" },
                { key: "DigitalWallet.ShowEnrollmentPromptFlagNumber", value: this._showEnrollmentPromptFlagNumber, dataType: 'number', label: "Show Enrollment Prompt Flag Number" },
                { key: "DigitalWallet.DebitCardControlFlagNumber", value: this._debitCardControlFlagNumber, dataType: 'number', label: "Debit Card Control Flag Number" },
                { key: "DigitalWallet.CreditCardControlFlagNumber", value: this._creditCardControlFlagNumber, dataType: 'number', label: "Credit Card Control Flag Number" },
            ];
        }

}