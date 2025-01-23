import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface MainStreetCheckReorderConfig {
    Enabled: boolean;
    MinVersion: number;
    SsoUrl: string;
    BankId: string;
    BranchNumber: string;
    UserId: string;
    Key: string;
}

export class MainStreetCheckReorder implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'MainStreetCheckReorder'
    };


            private _enabled: boolean;
            get enabled(): boolean {
                return this._enabled;
            }
            set enabled(value: boolean) {
                this._enabled = value;
            }

            private _minVersion: number;
            get minVersion(): number {
                return this._minVersion;
            }
            set minVersion(value: number) {
                this._minVersion = value;
            }

            private _ssoUrl: string;
            get ssoUrl(): string {
                return this._ssoUrl;
            }
            set ssoUrl(value: string) {
                this._ssoUrl = value;
            }

            private _bankId: string;
            get bankId(): string {
                return this._bankId;
            }
            set bankId(value: string) {
                this._bankId = value;
            }

            private _branchNumber: string;
            get branchNumber(): string {
                return this._branchNumber;
            }
            set branchNumber(value: string) {
                this._branchNumber = value;
            }

            private _userId: string;
            get userId(): string {
                return this._userId;
            }
            set userId(value: string) {
                this._userId = value;
            }

            private _key: string;
            get key(): string {
                return this._key;
            }
            set key(value: string) {
                this._key = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "MainStreetCheckReorder.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "MainStreetCheckReorder.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "MainStreetCheckReorder.SsoUrl", value: this._ssoUrl, dataType: 'string', label: "Sso Url" },
                { key: "MainStreetCheckReorder.BankId", value: this._bankId, dataType: 'string', label: "Bank Id" },
                { key: "MainStreetCheckReorder.BranchNumber", value: this._branchNumber, dataType: 'string', label: "Branch Number" },
                { key: "MainStreetCheckReorder.UserId", value: this._userId, dataType: 'string', label: "User Id" },
                { key: "MainStreetCheckReorder.Key", value: this._key, dataType: 'string', label: "Key" },
            ];
        }

}