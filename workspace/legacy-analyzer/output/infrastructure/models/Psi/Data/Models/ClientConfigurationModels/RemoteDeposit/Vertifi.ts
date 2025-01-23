import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface VertifiConfig {
    ImmediateDepositUponSuccessfulCheckProcessing: boolean;
    VersionNumber: string;
    SharedSecretPassword: string;
}

export class Vertifi implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Vertifi'
    };


            private _immediateDepositUponSuccessfulCheckProcessing: boolean;
            get immediateDepositUponSuccessfulCheckProcessing(): boolean {
                return this._immediateDepositUponSuccessfulCheckProcessing;
            }
            set immediateDepositUponSuccessfulCheckProcessing(value: boolean) {
                this._immediateDepositUponSuccessfulCheckProcessing = value;
            }

            private _versionNumber: string;
            get versionNumber(): string {
                return this._versionNumber;
            }
            set versionNumber(value: string) {
                this._versionNumber = value;
            }

            private _sharedSecretPassword: string;
            get sharedSecretPassword(): string {
                return this._sharedSecretPassword;
            }
            set sharedSecretPassword(value: string) {
                this._sharedSecretPassword = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "Vertifi.ImmediateDepositUponSuccessfulCheckProcessing", value: this._immediateDepositUponSuccessfulCheckProcessing, dataType: 'boolean', label: "Immediate Deposit Upon Successful Check Processing" },
                { key: "Vertifi.VersionNumber", value: this._versionNumber, dataType: 'string', label: "Version Number" },
                { key: "Vertifi.SharedSecretPassword", value: this._sharedSecretPassword, dataType: 'string', label: "Shared Secret Password" },
            ];
        }

}