import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { ModulePortAuthority } from './AppWhiteList.ModulePortAuthority';
import { ModuleSecureCamera } from './AppWhiteList.ModuleSecureCamera';
import { ModuleSecureKeyboard } from './AppWhiteList.ModuleSecureKeyboard';
export interface AppShieldConfig {
    Enabled: boolean;
    AndroidDevLicenseKey: string;
    AndroidQualityAssessmentLicenseKey: string;
    AndroidTestLicenseKey: string;
    AndroidProdTestLicenseKey: string;
    AndroidStageLicenseKey: string;
    AndroidReleaseLicenseKey: string;
    IosDevLicenseKey: string;
    IosTestLicenseKey: string;
    IosProdTestLicenseKey: string;
    IosReleaseLicenseKey: string;
    ModulePortAuthority: ModulePortAuthority;
    ModuleSecureCamera: ModuleSecureCamera;
    ModuleSecureKeyboard: ModuleSecureKeyboard;
}

export class AppShield implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'AppShield'
    };


            private _enabled: boolean;
            get enabled(): boolean {
                return this._enabled;
            }
            set enabled(value: boolean) {
                this._enabled = value;
            }

            private _androidDevLicenseKey: string;
            get androidDevLicenseKey(): string {
                return this._androidDevLicenseKey;
            }
            set androidDevLicenseKey(value: string) {
                this._androidDevLicenseKey = value;
            }

            private _androidQualityAssessmentLicenseKey: string;
            get androidQualityAssessmentLicenseKey(): string {
                return this._androidQualityAssessmentLicenseKey;
            }
            set androidQualityAssessmentLicenseKey(value: string) {
                this._androidQualityAssessmentLicenseKey = value;
            }

            private _androidTestLicenseKey: string;
            get androidTestLicenseKey(): string {
                return this._androidTestLicenseKey;
            }
            set androidTestLicenseKey(value: string) {
                this._androidTestLicenseKey = value;
            }

            private _androidProdTestLicenseKey: string;
            get androidProdTestLicenseKey(): string {
                return this._androidProdTestLicenseKey;
            }
            set androidProdTestLicenseKey(value: string) {
                this._androidProdTestLicenseKey = value;
            }

            private _androidStageLicenseKey: string;
            get androidStageLicenseKey(): string {
                return this._androidStageLicenseKey;
            }
            set androidStageLicenseKey(value: string) {
                this._androidStageLicenseKey = value;
            }

            private _androidReleaseLicenseKey: string;
            get androidReleaseLicenseKey(): string {
                return this._androidReleaseLicenseKey;
            }
            set androidReleaseLicenseKey(value: string) {
                this._androidReleaseLicenseKey = value;
            }

            private _iosDevLicenseKey: string;
            get iosDevLicenseKey(): string {
                return this._iosDevLicenseKey;
            }
            set iosDevLicenseKey(value: string) {
                this._iosDevLicenseKey = value;
            }

            private _iosTestLicenseKey: string;
            get iosTestLicenseKey(): string {
                return this._iosTestLicenseKey;
            }
            set iosTestLicenseKey(value: string) {
                this._iosTestLicenseKey = value;
            }

            private _iosProdTestLicenseKey: string;
            get iosProdTestLicenseKey(): string {
                return this._iosProdTestLicenseKey;
            }
            set iosProdTestLicenseKey(value: string) {
                this._iosProdTestLicenseKey = value;
            }

            private _iosReleaseLicenseKey: string;
            get iosReleaseLicenseKey(): string {
                return this._iosReleaseLicenseKey;
            }
            set iosReleaseLicenseKey(value: string) {
                this._iosReleaseLicenseKey = value;
            }

            private _modulePortAuthority: ModulePortAuthority;
            get modulePortAuthority(): ModulePortAuthority {
                return this._modulePortAuthority;
            }
            set modulePortAuthority(value: ModulePortAuthority) {
                this._modulePortAuthority = value;
            }

            private _moduleSecureCamera: ModuleSecureCamera;
            get moduleSecureCamera(): ModuleSecureCamera {
                return this._moduleSecureCamera;
            }
            set moduleSecureCamera(value: ModuleSecureCamera) {
                this._moduleSecureCamera = value;
            }

            private _moduleSecureKeyboard: ModuleSecureKeyboard;
            get moduleSecureKeyboard(): ModuleSecureKeyboard {
                return this._moduleSecureKeyboard;
            }
            set moduleSecureKeyboard(value: ModuleSecureKeyboard) {
                this._moduleSecureKeyboard = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "AppShield.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "AppShield.AndroidDevLicenseKey", value: this._androidDevLicenseKey, dataType: 'string', label: "Android Dev License Key" },
                { key: "AppShield.AndroidQualityAssessmentLicenseKey", value: this._androidQualityAssessmentLicenseKey, dataType: 'string', label: "Android Quality Assessment License Key" },
                { key: "AppShield.AndroidTestLicenseKey", value: this._androidTestLicenseKey, dataType: 'string', label: "Android Test License Key" },
                { key: "AppShield.AndroidProdTestLicenseKey", value: this._androidProdTestLicenseKey, dataType: 'string', label: "Android Prod Test License Key" },
                { key: "AppShield.AndroidStageLicenseKey", value: this._androidStageLicenseKey, dataType: 'string', label: "Android Stage License Key" },
                { key: "AppShield.AndroidReleaseLicenseKey", value: this._androidReleaseLicenseKey, dataType: 'string', label: "Android Release License Key" },
                { key: "AppShield.IosDevLicenseKey", value: this._iosDevLicenseKey, dataType: 'string', label: "Ios Dev License Key" },
                { key: "AppShield.IosTestLicenseKey", value: this._iosTestLicenseKey, dataType: 'string', label: "Ios Test License Key" },
                { key: "AppShield.IosProdTestLicenseKey", value: this._iosProdTestLicenseKey, dataType: 'string', label: "Ios Prod Test License Key" },
                { key: "AppShield.IosReleaseLicenseKey", value: this._iosReleaseLicenseKey, dataType: 'string', label: "Ios Release License Key" },
                { key: "AppShield.ModulePortAuthority", value: this._modulePortAuthority, dataType: 'appwhitelist.moduleportauthority', label: "Module Port Authority" },
                { key: "AppShield.ModuleSecureCamera", value: this._moduleSecureCamera, dataType: 'appwhitelist.modulesecurecamera', label: "Module Secure Camera" },
                { key: "AppShield.ModuleSecureKeyboard", value: this._moduleSecureKeyboard, dataType: 'appwhitelist.modulesecurekeyboard', label: "Module Secure Keyboard" },
            ];
        }

}