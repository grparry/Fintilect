import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { AuthenticationMethod } from '@infrastructure/AuthenticationMethod';
export interface AuthenticationRuleConfig {
    AuthenticationMethods: AuthenticationMethod[];
    NumberOfRequiredMethods: number;
    Priority: number;
    IsFallback: boolean;
}

export class AuthenticationRule implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'AuthenticationRule'
    };


            private _authenticationMethods: AuthenticationMethod[];
            get authenticationMethods(): AuthenticationMethod[] {
                return this._authenticationMethods;
            }
            set authenticationMethods(value: AuthenticationMethod[]) {
                this._authenticationMethods = value;
            }

            private _numberOfRequiredMethods: number;
            get numberOfRequiredMethods(): number {
                return this._numberOfRequiredMethods;
            }
            set numberOfRequiredMethods(value: number) {
                this._numberOfRequiredMethods = value;
            }

            private _priority: number;
            get priority(): number {
                return this._priority;
            }
            set priority(value: number) {
                this._priority = value;
            }

            private _isFallback: boolean;
            get isFallback(): boolean {
                return this._isFallback;
            }
            set isFallback(value: boolean) {
                this._isFallback = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "AuthenticationRule.AuthenticationMethods", value: this._authenticationMethods, dataType: 'array<AuthenticationMethod>', label: "Authentication Methods" },
                { key: "AuthenticationRule.NumberOfRequiredMethods", value: this._numberOfRequiredMethods, dataType: 'number', label: "Number Of Required Methods" },
                { key: "AuthenticationRule.Priority", value: this._priority, dataType: 'number', label: "Priority" },
                { key: "AuthenticationRule.IsFallback", value: this._isFallback, dataType: 'boolean', label: "Is Fallback" },
            ];
        }

}