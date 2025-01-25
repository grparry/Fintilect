import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { ResetPassword } from './ResetPassword';
import { Notifications } from './Notifications.Notifications';
import { AtmLocator } from './AtmLocator.AtmLocator';
import { BokuSettings } from './Boku.BokuSettings';
import { ChangeAddress } from './ChangeAddress';
import { ChangeEmail } from './ChangeEmail';
import { TieredAccessAdmin } from './TieredAccessAdmin';
import { ChangePhoneNumbers } from './ChangePhoneNumbers';
import { Authentication } from './Authentication.Authentication';
export interface SettingsConfig {
    IsLogoutButtonEnabled: boolean;
    ResetPassword: ResetPassword;
    Notifications: Notifications;
    AtmLocator: AtmLocator;
    BokuPhoneVerification: BokuSettings;
    ChangeAddress: ChangeAddress;
    ChangeEmail: ChangeEmail;
    TieredAccessAdmin: TieredAccessAdmin;
    ChangePhoneNumbers: ChangePhoneNumbers;
    Authentication: Authentication;
}

export class Settings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Settings'
    };


            private _isLogoutButtonEnabled: boolean;
            get isLogoutButtonEnabled(): boolean {
                return this._isLogoutButtonEnabled;
            }
            set isLogoutButtonEnabled(value: boolean) {
                this._isLogoutButtonEnabled = value;
            }

            private _resetPassword: ResetPassword;
            get resetPassword(): ResetPassword {
                return this._resetPassword;
            }
            set resetPassword(value: ResetPassword) {
                this._resetPassword = value;
            }

            private _notifications: Notifications;
            get notifications(): Notifications {
                return this._notifications;
            }
            set notifications(value: Notifications) {
                this._notifications = value;
            }

            private _atmLocator: AtmLocator;
            get atmLocator(): AtmLocator {
                return this._atmLocator;
            }
            set atmLocator(value: AtmLocator) {
                this._atmLocator = value;
            }

            private _bokuPhoneVerification: BokuSettings;
            get bokuPhoneVerification(): BokuSettings {
                return this._bokuPhoneVerification;
            }
            set bokuPhoneVerification(value: BokuSettings) {
                this._bokuPhoneVerification = value;
            }

            private _changeAddress: ChangeAddress;
            get changeAddress(): ChangeAddress {
                return this._changeAddress;
            }
            set changeAddress(value: ChangeAddress) {
                this._changeAddress = value;
            }

            private _changeEmail: ChangeEmail;
            get changeEmail(): ChangeEmail {
                return this._changeEmail;
            }
            set changeEmail(value: ChangeEmail) {
                this._changeEmail = value;
            }

            private _tieredAccessAdmin: TieredAccessAdmin;
            get tieredAccessAdmin(): TieredAccessAdmin {
                return this._tieredAccessAdmin;
            }
            set tieredAccessAdmin(value: TieredAccessAdmin) {
                this._tieredAccessAdmin = value;
            }

            private _changePhoneNumbers: ChangePhoneNumbers;
            get changePhoneNumbers(): ChangePhoneNumbers {
                return this._changePhoneNumbers;
            }
            set changePhoneNumbers(value: ChangePhoneNumbers) {
                this._changePhoneNumbers = value;
            }

            private _authentication: Authentication;
            get authentication(): Authentication {
                return this._authentication;
            }
            set authentication(value: Authentication) {
                this._authentication = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "Settings.IsLogoutButtonEnabled", value: this._isLogoutButtonEnabled, dataType: 'boolean', label: "Is Logout Button Enabled" },
                { key: "Settings.ResetPassword", value: this._resetPassword, dataType: 'resetpassword', label: "Reset Password" },
                { key: "Settings.Notifications", value: this._notifications, dataType: 'notifications.notifications', label: "Notifications" },
                { key: "Settings.AtmLocator", value: this._atmLocator, dataType: 'atmlocator.atmlocator', label: "Atm Locator" },
                { key: "Settings.BokuPhoneVerification", value: this._bokuPhoneVerification, dataType: 'boku.bokusettings', label: "Boku Phone Verification" },
                { key: "Settings.ChangeAddress", value: this._changeAddress, dataType: 'changeaddress', label: "Change Address" },
                { key: "Settings.ChangeEmail", value: this._changeEmail, dataType: 'changeemail', label: "Change Email" },
                { key: "Settings.TieredAccessAdmin", value: this._tieredAccessAdmin, dataType: 'tieredaccessadmin', label: "Tiered Access Admin" },
                { key: "Settings.ChangePhoneNumbers", value: this._changePhoneNumbers, dataType: 'changephonenumbers', label: "Change Phone Numbers" },
                { key: "Settings.Authentication", value: this._authentication, dataType: 'authentication.authentication', label: "Authentication" },
            ];
        }

}