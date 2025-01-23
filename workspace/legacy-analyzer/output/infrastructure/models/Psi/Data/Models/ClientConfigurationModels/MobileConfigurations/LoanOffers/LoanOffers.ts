import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { Authentication } from './Authentication.Authentication';
export interface LoanOffersConfig {
    Enabled: boolean;
    Authentication: Authentication;
}

export class LoanOffers implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'LoanOffers'
    };


            private _enabled: boolean;
            get enabled(): boolean {
                return this._enabled;
            }
            set enabled(value: boolean) {
                this._enabled = value;
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
                { key: "LoanOffers.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "LoanOffers.Authentication", value: this._authentication, dataType: 'authentication.authentication', label: "Authentication" },
            ];
        }

}