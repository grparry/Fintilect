import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { Guid } from './Guid';
import { FeatureActionTypeEnum } from './FeatureActionTypeEnum';
import { AuthenticationRule } from './AuthenticationRule';
export interface FeatureActionConfig {
    ActionId: number;
    PublicId: string;
    Name: string;
    MinimumApplicationVersion: string;
    ActionType: FeatureActionTypeEnum;
    AuthenticationRules: AuthenticationRule[];
    IsLoginAction: boolean;
}

export class FeatureAction implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'FeatureAction'
    };


            private _actionId: number;
            get actionId(): number {
                return this._actionId;
            }
            set actionId(value: number) {
                this._actionId = value;
            }

            private _publicId: string;
            get publicId(): string {
                return this._publicId;
            }
            set publicId(value: string) {
                this._publicId = value;
            }

            private _name: string;
            get name(): string {
                return this._name;
            }
            set name(value: string) {
                this._name = value;
            }

            private _minimumApplicationVersion: string;
            get minimumApplicationVersion(): string {
                return this._minimumApplicationVersion;
            }
            set minimumApplicationVersion(value: string) {
                this._minimumApplicationVersion = value;
            }

            private _actionType: FeatureActionTypeEnum;
            get actionType(): FeatureActionTypeEnum {
                return this._actionType;
            }
            set actionType(value: FeatureActionTypeEnum) {
                this._actionType = value;
            }

            private _authenticationRules: AuthenticationRule[];
            get authenticationRules(): AuthenticationRule[] {
                return this._authenticationRules;
            }
            set authenticationRules(value: AuthenticationRule[]) {
                this._authenticationRules = value;
            }

            private _isLoginAction: boolean;
            get isLoginAction(): boolean {
                return this._isLoginAction;
            }
            set isLoginAction(value: boolean) {
                this._isLoginAction = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "FeatureAction.ActionId", value: this._actionId, dataType: 'number', label: "Action Id" },
                { key: "FeatureAction.PublicId", value: this._publicId, dataType: 'string', label: "Public Id" },
                { key: "FeatureAction.Name", value: this._name, dataType: 'string', label: "Name" },
                { key: "FeatureAction.MinimumApplicationVersion", value: this._minimumApplicationVersion, dataType: 'string', label: "Minimum Application Version" },
                { key: "FeatureAction.ActionType", value: this._actionType, dataType: 'clientconfigurationrepository.featureactiontypeenum', label: "Action Type" },
                { key: "FeatureAction.AuthenticationRules", value: this._authenticationRules, dataType: 'array<AuthenticationRule>', label: "Authentication Rules" },
                { key: "FeatureAction.IsLoginAction", value: this._isLoginAction, dataType: 'boolean', label: "Is Login Action" },
            ];
        }

}