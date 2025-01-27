import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { Guid } from '@infrastructure/Guid';
export interface SymmetryBillPayConfig {
    Enabled: boolean;
    MinVersion: number;
    MinIosVersion: string;
    MinAndroidVersion: string;
    CustomerGuid: string;
    ServiceUserId: string;
    ServicePassword: string;
    StatusServiceUrl: string;
    BreakoutInterfaceUrl: string;
    LandingPageUrl: string;
}

export class SymmetryBillPay implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'SymmetryBillPay'
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

            private _minIosVersion: string;
            get minIosVersion(): string {
                return this._minIosVersion;
            }
            set minIosVersion(value: string) {
                this._minIosVersion = value;
            }

            private _minAndroidVersion: string;
            get minAndroidVersion(): string {
                return this._minAndroidVersion;
            }
            set minAndroidVersion(value: string) {
                this._minAndroidVersion = value;
            }

            private _customerGuid: string;
            get customerGuid(): string {
                return this._customerGuid;
            }
            set customerGuid(value: string) {
                this._customerGuid = value;
            }

            private _serviceUserId: string;
            get serviceUserId(): string {
                return this._serviceUserId;
            }
            set serviceUserId(value: string) {
                this._serviceUserId = value;
            }

            private _servicePassword: string;
            get servicePassword(): string {
                return this._servicePassword;
            }
            set servicePassword(value: string) {
                this._servicePassword = value;
            }

            private _statusServiceUrl: string;
            get statusServiceUrl(): string {
                return this._statusServiceUrl;
            }
            set statusServiceUrl(value: string) {
                this._statusServiceUrl = value;
            }

            private _breakoutInterfaceUrl: string;
            get breakoutInterfaceUrl(): string {
                return this._breakoutInterfaceUrl;
            }
            set breakoutInterfaceUrl(value: string) {
                this._breakoutInterfaceUrl = value;
            }

            private _landingPageUrl: string;
            get landingPageUrl(): string {
                return this._landingPageUrl;
            }
            set landingPageUrl(value: string) {
                this._landingPageUrl = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "SymmetryBillPay.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "SymmetryBillPay.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "SymmetryBillPay.MinIosVersion", value: this._minIosVersion, dataType: 'string', label: "Min Ios Version" },
                { key: "SymmetryBillPay.MinAndroidVersion", value: this._minAndroidVersion, dataType: 'string', label: "Min Android Version" },
                { key: "SymmetryBillPay.CustomerGuid", value: this._customerGuid, dataType: 'string', label: "Customer Guid" },
                { key: "SymmetryBillPay.ServiceUserId", value: this._serviceUserId, dataType: 'string', label: "Service User Id" },
                { key: "SymmetryBillPay.ServicePassword", value: this._servicePassword, dataType: 'string', label: "Service Password" },
                { key: "SymmetryBillPay.StatusServiceUrl", value: this._statusServiceUrl, dataType: 'string', label: "Status Service Url" },
                { key: "SymmetryBillPay.BreakoutInterfaceUrl", value: this._breakoutInterfaceUrl, dataType: 'string', label: "Breakout Interface Url" },
                { key: "SymmetryBillPay.LandingPageUrl", value: this._landingPageUrl, dataType: 'string', label: "Landing Page Url" },
            ];
        }

}