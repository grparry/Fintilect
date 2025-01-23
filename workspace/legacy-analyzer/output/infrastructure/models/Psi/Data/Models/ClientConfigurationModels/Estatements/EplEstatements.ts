import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface EplEstatementsConfig {
    Enabled: boolean;
    EndpointAddress: string;
    GroupName: string;
    Identifier: string;
    PrivateKey: string;
    EncryptionInitializationVector: string;
}

export class EplEstatements implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'EplEstatements'
    };


            private _enabled: boolean;
            get enabled(): boolean {
                return this._enabled;
            }
            set enabled(value: boolean) {
                this._enabled = value;
            }

            private _endpointAddress: string;
            get endpointAddress(): string {
                return this._endpointAddress;
            }
            set endpointAddress(value: string) {
                this._endpointAddress = value;
            }

            private _groupName: string;
            get groupName(): string {
                return this._groupName;
            }
            set groupName(value: string) {
                this._groupName = value;
            }

            private _identifier: string;
            get identifier(): string {
                return this._identifier;
            }
            set identifier(value: string) {
                this._identifier = value;
            }

            private _privateKey: string;
            get privateKey(): string {
                return this._privateKey;
            }
            set privateKey(value: string) {
                this._privateKey = value;
            }

            private _encryptionInitializationVector: string;
            get encryptionInitializationVector(): string {
                return this._encryptionInitializationVector;
            }
            set encryptionInitializationVector(value: string) {
                this._encryptionInitializationVector = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "EplEstatements.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "EplEstatements.EndpointAddress", value: this._endpointAddress, dataType: 'string', label: "Endpoint Address" },
                { key: "EplEstatements.GroupName", value: this._groupName, dataType: 'string', label: "Group Name" },
                { key: "EplEstatements.Identifier", value: this._identifier, dataType: 'string', label: "Identifier" },
                { key: "EplEstatements.PrivateKey", value: this._privateKey, dataType: 'string', label: "Private Key" },
                { key: "EplEstatements.EncryptionInitializationVector", value: this._encryptionInitializationVector, dataType: 'string', label: "Encryption Initialization Vector" },
            ];
        }

}