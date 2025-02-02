import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface SecurityConfig {
    TokenTimeout: number;
}

export class Security implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Security'
    };


            private _tokenTimeout: number;
            get tokenTimeout(): number {
                return this._tokenTimeout;
            }
            set tokenTimeout(value: number) {
                this._tokenTimeout = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "Security.TokenTimeout", value: this._tokenTimeout, dataType: 'number', label: "Token Timeout" },
            ];
        }

}