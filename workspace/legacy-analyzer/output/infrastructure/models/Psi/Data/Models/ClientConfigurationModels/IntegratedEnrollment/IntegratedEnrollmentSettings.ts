import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { EnrollmentSteps } from './EnrollmentSteps';
export interface IntegratedEnrollmentSettingsConfig {
    AchEnabled: boolean;
    ShouldStoreUserIdAndPassword: boolean;
    ThirdPartyOaoEnabled: boolean;
    ThirdPartyOaoMinVersion: number;
    SkippedEnrollmentSteps: Record<EnrollmentSteps, boolean>;
}

export class IntegratedEnrollmentSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'IntegratedEnrollmentSettings'
    };


            private _achEnabled: boolean;
            get achEnabled(): boolean {
                return this._achEnabled;
            }
            set achEnabled(value: boolean) {
                this._achEnabled = value;
            }

            private _shouldStoreUserIdAndPassword: boolean;
            get shouldStoreUserIdAndPassword(): boolean {
                return this._shouldStoreUserIdAndPassword;
            }
            set shouldStoreUserIdAndPassword(value: boolean) {
                this._shouldStoreUserIdAndPassword = value;
            }

            private _thirdPartyOaoEnabled: boolean;
            get thirdPartyOaoEnabled(): boolean {
                return this._thirdPartyOaoEnabled;
            }
            set thirdPartyOaoEnabled(value: boolean) {
                this._thirdPartyOaoEnabled = value;
            }

            private _thirdPartyOaoMinVersion: number;
            get thirdPartyOaoMinVersion(): number {
                return this._thirdPartyOaoMinVersion;
            }
            set thirdPartyOaoMinVersion(value: number) {
                this._thirdPartyOaoMinVersion = value;
            }

            private _skippedEnrollmentSteps: Record<EnrollmentSteps, boolean>;
            get skippedEnrollmentSteps(): Record<EnrollmentSteps, boolean> {
                return this._skippedEnrollmentSteps;
            }
            set skippedEnrollmentSteps(value: Record<EnrollmentSteps, boolean>) {
                this._skippedEnrollmentSteps = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "IntegratedEnrollmentSettings.AchEnabled", value: this._achEnabled, dataType: 'boolean', label: "Ach Enabled" },
                { key: "IntegratedEnrollmentSettings.ShouldStoreUserIdAndPassword", value: this._shouldStoreUserIdAndPassword, dataType: 'boolean', label: "Should Store User Id And Password" },
                { key: "IntegratedEnrollmentSettings.ThirdPartyOaoEnabled", value: this._thirdPartyOaoEnabled, dataType: 'boolean', label: "Third Party Oao Enabled" },
                { key: "IntegratedEnrollmentSettings.ThirdPartyOaoMinVersion", value: this._thirdPartyOaoMinVersion, dataType: 'number', label: "Third Party Oao Min Version" },
                { key: "IntegratedEnrollmentSettings.SkippedEnrollmentSteps", value: this._skippedEnrollmentSteps, dataType: 'record<enrollmentsteps, boolean>', label: "Skipped Enrollment Steps" },
            ];
        }

}