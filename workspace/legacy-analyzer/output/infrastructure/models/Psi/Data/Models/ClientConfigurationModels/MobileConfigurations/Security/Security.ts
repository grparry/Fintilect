import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { QuickAccess } from '@infrastructure/QuickAccess.QuickAccess';
import { Biometrics } from '@infrastructure/Biometrics.Biometrics';
import { PermissionLevel } from '@infrastructure/PermissionLevel.PermissionLevel';
import { Settings } from '@infrastructure/Settings.Settings';
import { AppShield } from '@infrastructure/AppShield.AppShield';
import { LayeredSecurity } from '@infrastructure/LayeredSecurity.LayeredSecurity';
import { SmsSecurityCode } from '@infrastructure/Mfa.SmsSecurityCode';
export interface SecurityConfig {
    QuickAccess: QuickAccess;
    Biometrics: Biometrics;
    PermissionLevel: PermissionLevel;
    Settings: Settings;
    AppShield: AppShield;
    LayeredSecurity: LayeredSecurity;
    SmsSecurityCode: SmsSecurityCode;
}

export class Security implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Security'
    };


            private _quickAccess: QuickAccess;
            get quickAccess(): QuickAccess {
                return this._quickAccess;
            }
            set quickAccess(value: QuickAccess) {
                this._quickAccess = value;
            }

            private _biometrics: Biometrics;
            get biometrics(): Biometrics {
                return this._biometrics;
            }
            set biometrics(value: Biometrics) {
                this._biometrics = value;
            }

            private _permissionLevel: PermissionLevel;
            get permissionLevel(): PermissionLevel {
                return this._permissionLevel;
            }
            set permissionLevel(value: PermissionLevel) {
                this._permissionLevel = value;
            }

            private _settings: Settings;
            get settings(): Settings {
                return this._settings;
            }
            set settings(value: Settings) {
                this._settings = value;
            }

            private _appShield: AppShield;
            get appShield(): AppShield {
                return this._appShield;
            }
            set appShield(value: AppShield) {
                this._appShield = value;
            }

            private _layeredSecurity: LayeredSecurity;
            get layeredSecurity(): LayeredSecurity {
                return this._layeredSecurity;
            }
            set layeredSecurity(value: LayeredSecurity) {
                this._layeredSecurity = value;
            }

            private _smsSecurityCode: SmsSecurityCode;
            get smsSecurityCode(): SmsSecurityCode {
                return this._smsSecurityCode;
            }
            set smsSecurityCode(value: SmsSecurityCode) {
                this._smsSecurityCode = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "Security.QuickAccess", value: this._quickAccess, dataType: 'quickaccess.quickaccess', label: "Quick Access" },
                { key: "Security.Biometrics", value: this._biometrics, dataType: 'biometrics.biometrics', label: "Biometrics" },
                { key: "Security.PermissionLevel", value: this._permissionLevel, dataType: 'permissionlevel.permissionlevel', label: "Permission Level" },
                { key: "Security.Settings", value: this._settings, dataType: 'settings.settings', label: "Settings" },
                { key: "Security.AppShield", value: this._appShield, dataType: 'appshield.appshield', label: "App Shield" },
                { key: "Security.LayeredSecurity", value: this._layeredSecurity, dataType: 'layeredsecurity.layeredsecurity', label: "Layered Security" },
                { key: "Security.SmsSecurityCode", value: this._smsSecurityCode, dataType: 'mfa.smssecuritycode', label: "Sms Security Code" },
            ];
        }

}