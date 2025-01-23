import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { RemoteDepositCheckHold } from './RemoteDepositCheckHold';
export interface RemoteDepositCheckHoldSettingsConfig {
    RemoteDepositCheckHold: RemoteDepositCheckHold;
}

export class RemoteDepositCheckHoldSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'RemoteDepositCheckHoldSettings'
    };


            private _remoteDepositCheckHold: RemoteDepositCheckHold;
            get remoteDepositCheckHold(): RemoteDepositCheckHold {
                return this._remoteDepositCheckHold;
            }
            set remoteDepositCheckHold(value: RemoteDepositCheckHold) {
                this._remoteDepositCheckHold = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "RemoteDepositCheckHoldSettings.RemoteDepositCheckHold", value: this._remoteDepositCheckHold, dataType: 'remotedepositcheckhold', label: "Remote Deposit Check Hold" },
            ];
        }

}