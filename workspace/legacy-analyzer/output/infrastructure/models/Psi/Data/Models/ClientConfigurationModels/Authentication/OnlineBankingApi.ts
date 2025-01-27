import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { Security } from '@infrastructure/Security';
export interface OnlineBankingApiConfig {
    CredentialsExpirationTime: number;
    Security: Security;
}

export class OnlineBankingApi implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'OnlineBankingApi'
    };


            private _credentialsExpirationTime: number;
            get credentialsExpirationTime(): number {
                return this._credentialsExpirationTime;
            }
            set credentialsExpirationTime(value: number) {
                this._credentialsExpirationTime = value;
            }

            private _security: Security;
            get security(): Security {
                return this._security;
            }
            set security(value: Security) {
                this._security = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "OnlineBankingApi.CredentialsExpirationTime", value: this._credentialsExpirationTime, dataType: 'number', label: "Credentials Expiration Time" },
                { key: "OnlineBankingApi.Security", value: this._security, dataType: 'security', label: "Security" },
            ];
        }

}