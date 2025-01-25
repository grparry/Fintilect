import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { Guid } from './Guid';
import { AuthenticationMethodType } from './AuthenticationMethodType';
export interface AuthenticationMethodConfig {
    Id: number;
    PublicId: string;
    Name: string;
    MethodType: AuthenticationMethodType;
    MinimumApplicationVersion: string;
}

export class AuthenticationMethod implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'AuthenticationMethod'
    };


            private _id: number;
            get id(): number {
                return this._id;
            }
            set id(value: number) {
                this._id = value;
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

            private _methodType: AuthenticationMethodType;
            get methodType(): AuthenticationMethodType {
                return this._methodType;
            }
            set methodType(value: AuthenticationMethodType) {
                this._methodType = value;
            }

            private _minimumApplicationVersion: string;
            get minimumApplicationVersion(): string {
                return this._minimumApplicationVersion;
            }
            set minimumApplicationVersion(value: string) {
                this._minimumApplicationVersion = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "AuthenticationMethod.Id", value: this._id, dataType: 'number', label: "Id" },
                { key: "AuthenticationMethod.PublicId", value: this._publicId, dataType: 'string', label: "Public Id" },
                { key: "AuthenticationMethod.Name", value: this._name, dataType: 'string', label: "Name" },
                { key: "AuthenticationMethod.MethodType", value: this._methodType, dataType: 'authenticationmethodtype', label: "Method Type" },
                { key: "AuthenticationMethod.MinimumApplicationVersion", value: this._minimumApplicationVersion, dataType: 'string', label: "Minimum Application Version" },
            ];
        }

}