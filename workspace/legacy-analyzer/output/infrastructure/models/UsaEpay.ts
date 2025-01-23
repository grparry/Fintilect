import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface UsaEpayConfig {
    ReverseTransferOnFailure: boolean;
}

export class UsaEpay implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'UsaEpay'
    };


            private _reverseTransferOnFailure: boolean;
            get reverseTransferOnFailure(): boolean {
                return this._reverseTransferOnFailure;
            }
            set reverseTransferOnFailure(value: boolean) {
                this._reverseTransferOnFailure = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "UsaEpay.ReverseTransferOnFailure", value: this._reverseTransferOnFailure, dataType: 'boolean', label: "Reverse Transfer On Failure" },
            ];
        }

}