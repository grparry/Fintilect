import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface SMTPSettingsConfig {
    ServerAddress: string;
    ServerPort: number;
    LoginName: string;
    SSLEnabled: boolean;
    Password: string;
}

export class SMTPSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'SMTPSettings'
    };


            private _serverAddress: string;
            get serverAddress(): string {
                return this._serverAddress;
            }
            set serverAddress(value: string) {
                this._serverAddress = value;
            }

            private _serverPort: number;
            get serverPort(): number {
                return this._serverPort;
            }
            set serverPort(value: number) {
                this._serverPort = value;
            }

            private _loginName: string;
            get loginName(): string {
                return this._loginName;
            }
            set loginName(value: string) {
                this._loginName = value;
            }

            private _sSLEnabled: boolean;
            get sSLEnabled(): boolean {
                return this._sSLEnabled;
            }
            set sSLEnabled(value: boolean) {
                this._sSLEnabled = value;
            }

            private _password: string;
            get password(): string {
                return this._password;
            }
            set password(value: string) {
                this._password = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "SMTPSettings.ServerAddress", value: this._serverAddress, dataType: 'string', label: "Server Address" },
                { key: "SMTPSettings.ServerPort", value: this._serverPort, dataType: 'number', label: "Server Port" },
                { key: "SMTPSettings.LoginName", value: this._loginName, dataType: 'string', label: "Login Name" },
                { key: "SMTPSettings.SSLEnabled", value: this._sSLEnabled, dataType: 'boolean', label: "S S L Enabled" },
                { key: "SMTPSettings.Password", value: this._password, dataType: 'string', label: "Password" },
            ];
        }

}