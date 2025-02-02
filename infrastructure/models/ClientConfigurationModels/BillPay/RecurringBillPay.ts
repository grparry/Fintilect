import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface RecurringBillPayConfig {
    Enabled: boolean;
    MinimumVersion: number;
}

export class RecurringBillPay implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'RecurringBillPay'
    };


            private _enabled: boolean;
            get enabled(): boolean {
                return this._enabled;
            }
            set enabled(value: boolean) {
                this._enabled = value;
            }

            private _minimumVersion: number;
            get minimumVersion(): number {
                return this._minimumVersion;
            }
            set minimumVersion(value: number) {
                this._minimumVersion = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "RecurringBillPay.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "RecurringBillPay.MinimumVersion", value: this._minimumVersion, dataType: 'number', label: "Minimum Version" },
            ];
        }

}