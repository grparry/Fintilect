import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface BillMatrixConfig {
    Enabled: boolean;
    MinVersion: number;
    Url: string;
    CertificateFilename: string;
    CertificatePassword: string;
    VendorPublicCertificateStore: string;
    EmergePrivateCertificateStore: string;
    VendorPublicCertificateThumbPrint: string;
    EmergePrivateCertificateThumbPrint: string;
    OpenInNewTab: boolean;
    ShouldSendAddressInSsoRequest: boolean;
    Issuer: string;
}

export class BillMatrix implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'BillMatrix'
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

            private _url: string;
            get url(): string {
                return this._url;
            }
            set url(value: string) {
                this._url = value;
            }

            private _certificateFilename: string;
            get certificateFilename(): string {
                return this._certificateFilename;
            }
            set certificateFilename(value: string) {
                this._certificateFilename = value;
            }

            private _certificatePassword: string;
            get certificatePassword(): string {
                return this._certificatePassword;
            }
            set certificatePassword(value: string) {
                this._certificatePassword = value;
            }

            private _vendorPublicCertificateStore: string;
            get vendorPublicCertificateStore(): string {
                return this._vendorPublicCertificateStore;
            }
            set vendorPublicCertificateStore(value: string) {
                this._vendorPublicCertificateStore = value;
            }

            private _emergePrivateCertificateStore: string;
            get emergePrivateCertificateStore(): string {
                return this._emergePrivateCertificateStore;
            }
            set emergePrivateCertificateStore(value: string) {
                this._emergePrivateCertificateStore = value;
            }

            private _vendorPublicCertificateThumbPrint: string;
            get vendorPublicCertificateThumbPrint(): string {
                return this._vendorPublicCertificateThumbPrint;
            }
            set vendorPublicCertificateThumbPrint(value: string) {
                this._vendorPublicCertificateThumbPrint = value;
            }

            private _emergePrivateCertificateThumbPrint: string;
            get emergePrivateCertificateThumbPrint(): string {
                return this._emergePrivateCertificateThumbPrint;
            }
            set emergePrivateCertificateThumbPrint(value: string) {
                this._emergePrivateCertificateThumbPrint = value;
            }

            private _openInNewTab: boolean;
            get openInNewTab(): boolean {
                return this._openInNewTab;
            }
            set openInNewTab(value: boolean) {
                this._openInNewTab = value;
            }

            private _shouldSendAddressInSsoRequest: boolean;
            get shouldSendAddressInSsoRequest(): boolean {
                return this._shouldSendAddressInSsoRequest;
            }
            set shouldSendAddressInSsoRequest(value: boolean) {
                this._shouldSendAddressInSsoRequest = value;
            }

            private _issuer: string;
            get issuer(): string {
                return this._issuer;
            }
            set issuer(value: string) {
                this._issuer = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "BillMatrix.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "BillMatrix.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "BillMatrix.Url", value: this._url, dataType: 'string', label: "Url" },
                { key: "BillMatrix.CertificateFilename", value: this._certificateFilename, dataType: 'string', label: "Certificate Filename" },
                { key: "BillMatrix.CertificatePassword", value: this._certificatePassword, dataType: 'string', label: "Certificate Password" },
                { key: "BillMatrix.VendorPublicCertificateStore", value: this._vendorPublicCertificateStore, dataType: 'string', label: "Vendor Public Certificate Store" },
                { key: "BillMatrix.EmergePrivateCertificateStore", value: this._emergePrivateCertificateStore, dataType: 'string', label: "Emerge Private Certificate Store" },
                { key: "BillMatrix.VendorPublicCertificateThumbPrint", value: this._vendorPublicCertificateThumbPrint, dataType: 'string', label: "Vendor Public Certificate Thumb Print" },
                { key: "BillMatrix.EmergePrivateCertificateThumbPrint", value: this._emergePrivateCertificateThumbPrint, dataType: 'string', label: "Emerge Private Certificate Thumb Print" },
                { key: "BillMatrix.OpenInNewTab", value: this._openInNewTab, dataType: 'boolean', label: "Open In New Tab" },
                { key: "BillMatrix.ShouldSendAddressInSsoRequest", value: this._shouldSendAddressInSsoRequest, dataType: 'boolean', label: "Should Send Address In Sso Request" },
                { key: "BillMatrix.Issuer", value: this._issuer, dataType: 'string', label: "Issuer" },
            ];
        }

}