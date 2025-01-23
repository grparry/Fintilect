import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface MakePaymentConfig {
    IncludeSendOnAndDeliverByDateMinimumAndroidVersion: string;
    IncludeSendOnAndDeliverByDateMinimumIosVersion: string;
}

export class MakePayment implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'MakePayment'
    };


            private _includeSendOnAndDeliverByDateMinimumAndroidVersion: string;
            get includeSendOnAndDeliverByDateMinimumAndroidVersion(): string {
                return this._includeSendOnAndDeliverByDateMinimumAndroidVersion;
            }
            set includeSendOnAndDeliverByDateMinimumAndroidVersion(value: string) {
                this._includeSendOnAndDeliverByDateMinimumAndroidVersion = value;
            }

            private _includeSendOnAndDeliverByDateMinimumIosVersion: string;
            get includeSendOnAndDeliverByDateMinimumIosVersion(): string {
                return this._includeSendOnAndDeliverByDateMinimumIosVersion;
            }
            set includeSendOnAndDeliverByDateMinimumIosVersion(value: string) {
                this._includeSendOnAndDeliverByDateMinimumIosVersion = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "MakePayment.IncludeSendOnAndDeliverByDateMinimumAndroidVersion", value: this._includeSendOnAndDeliverByDateMinimumAndroidVersion, dataType: 'string', label: "Include Send On And Deliver By Date Minimum Android Version" },
                { key: "MakePayment.IncludeSendOnAndDeliverByDateMinimumIosVersion", value: this._includeSendOnAndDeliverByDateMinimumIosVersion, dataType: 'string', label: "Include Send On And Deliver By Date Minimum Ios Version" },
            ];
        }

}