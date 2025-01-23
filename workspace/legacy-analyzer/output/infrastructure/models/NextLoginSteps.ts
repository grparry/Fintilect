import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface NextLoginStepsConfig {
    LoginDisclosureCanSkipOnFailure: boolean;
    ChangePasswordCanSkipOnFailure: boolean;
    ChangePinCanSkipOnFailure: boolean;
    MfaQuestionsCanSkipOnFailure: boolean;
    LoginPromotionsCanSkipOnFailure: boolean;
    UrgentAlertsCanSkipOnFailure: boolean;
    ForceChangeEmailEnabled: boolean;
    ForceChangeAddressEnabled: boolean;
    ForceChangeEmailCanSkipOnFailure: boolean;
    ForceChangeAddressCanSkipOnFailure: boolean;
    SynergyEstatementsEnrollmentEnabled: boolean;
}

export class NextLoginSteps implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'NextLoginSteps'
    };


            private _loginDisclosureCanSkipOnFailure: boolean;
            get loginDisclosureCanSkipOnFailure(): boolean {
                return this._loginDisclosureCanSkipOnFailure;
            }
            set loginDisclosureCanSkipOnFailure(value: boolean) {
                this._loginDisclosureCanSkipOnFailure = value;
            }

            private _changePasswordCanSkipOnFailure: boolean;
            get changePasswordCanSkipOnFailure(): boolean {
                return this._changePasswordCanSkipOnFailure;
            }
            set changePasswordCanSkipOnFailure(value: boolean) {
                this._changePasswordCanSkipOnFailure = value;
            }

            private _changePinCanSkipOnFailure: boolean;
            get changePinCanSkipOnFailure(): boolean {
                return this._changePinCanSkipOnFailure;
            }
            set changePinCanSkipOnFailure(value: boolean) {
                this._changePinCanSkipOnFailure = value;
            }

            private _mfaQuestionsCanSkipOnFailure: boolean;
            get mfaQuestionsCanSkipOnFailure(): boolean {
                return this._mfaQuestionsCanSkipOnFailure;
            }
            set mfaQuestionsCanSkipOnFailure(value: boolean) {
                this._mfaQuestionsCanSkipOnFailure = value;
            }

            private _loginPromotionsCanSkipOnFailure: boolean;
            get loginPromotionsCanSkipOnFailure(): boolean {
                return this._loginPromotionsCanSkipOnFailure;
            }
            set loginPromotionsCanSkipOnFailure(value: boolean) {
                this._loginPromotionsCanSkipOnFailure = value;
            }

            private _urgentAlertsCanSkipOnFailure: boolean;
            get urgentAlertsCanSkipOnFailure(): boolean {
                return this._urgentAlertsCanSkipOnFailure;
            }
            set urgentAlertsCanSkipOnFailure(value: boolean) {
                this._urgentAlertsCanSkipOnFailure = value;
            }

            private _forceChangeEmailEnabled: boolean;
            get forceChangeEmailEnabled(): boolean {
                return this._forceChangeEmailEnabled;
            }
            set forceChangeEmailEnabled(value: boolean) {
                this._forceChangeEmailEnabled = value;
            }

            private _forceChangeAddressEnabled: boolean;
            get forceChangeAddressEnabled(): boolean {
                return this._forceChangeAddressEnabled;
            }
            set forceChangeAddressEnabled(value: boolean) {
                this._forceChangeAddressEnabled = value;
            }

            private _forceChangeEmailCanSkipOnFailure: boolean;
            get forceChangeEmailCanSkipOnFailure(): boolean {
                return this._forceChangeEmailCanSkipOnFailure;
            }
            set forceChangeEmailCanSkipOnFailure(value: boolean) {
                this._forceChangeEmailCanSkipOnFailure = value;
            }

            private _forceChangeAddressCanSkipOnFailure: boolean;
            get forceChangeAddressCanSkipOnFailure(): boolean {
                return this._forceChangeAddressCanSkipOnFailure;
            }
            set forceChangeAddressCanSkipOnFailure(value: boolean) {
                this._forceChangeAddressCanSkipOnFailure = value;
            }

            private _synergyEstatementsEnrollmentEnabled: boolean;
            get synergyEstatementsEnrollmentEnabled(): boolean {
                return this._synergyEstatementsEnrollmentEnabled;
            }
            set synergyEstatementsEnrollmentEnabled(value: boolean) {
                this._synergyEstatementsEnrollmentEnabled = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "NextLoginSteps.LoginDisclosureCanSkipOnFailure", value: this._loginDisclosureCanSkipOnFailure, dataType: 'boolean', label: "Login Disclosure Can Skip On Failure" },
                { key: "NextLoginSteps.ChangePasswordCanSkipOnFailure", value: this._changePasswordCanSkipOnFailure, dataType: 'boolean', label: "Change Password Can Skip On Failure" },
                { key: "NextLoginSteps.ChangePinCanSkipOnFailure", value: this._changePinCanSkipOnFailure, dataType: 'boolean', label: "Change Pin Can Skip On Failure" },
                { key: "NextLoginSteps.MfaQuestionsCanSkipOnFailure", value: this._mfaQuestionsCanSkipOnFailure, dataType: 'boolean', label: "Mfa Questions Can Skip On Failure" },
                { key: "NextLoginSteps.LoginPromotionsCanSkipOnFailure", value: this._loginPromotionsCanSkipOnFailure, dataType: 'boolean', label: "Login Promotions Can Skip On Failure" },
                { key: "NextLoginSteps.UrgentAlertsCanSkipOnFailure", value: this._urgentAlertsCanSkipOnFailure, dataType: 'boolean', label: "Urgent Alerts Can Skip On Failure" },
                { key: "NextLoginSteps.ForceChangeEmailEnabled", value: this._forceChangeEmailEnabled, dataType: 'boolean', label: "Force Change Email Enabled" },
                { key: "NextLoginSteps.ForceChangeAddressEnabled", value: this._forceChangeAddressEnabled, dataType: 'boolean', label: "Force Change Address Enabled" },
                { key: "NextLoginSteps.ForceChangeEmailCanSkipOnFailure", value: this._forceChangeEmailCanSkipOnFailure, dataType: 'boolean', label: "Force Change Email Can Skip On Failure" },
                { key: "NextLoginSteps.ForceChangeAddressCanSkipOnFailure", value: this._forceChangeAddressCanSkipOnFailure, dataType: 'boolean', label: "Force Change Address Can Skip On Failure" },
                { key: "NextLoginSteps.SynergyEstatementsEnrollmentEnabled", value: this._synergyEstatementsEnrollmentEnabled, dataType: 'boolean', label: "Synergy Estatements Enrollment Enabled" },
            ];
        }

}