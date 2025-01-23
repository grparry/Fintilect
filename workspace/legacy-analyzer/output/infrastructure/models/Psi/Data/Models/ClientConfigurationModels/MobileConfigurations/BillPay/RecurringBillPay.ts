import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface RecurringBillPayConfig {
    Enabled: boolean;
    MinimumAndroidVersion: string;
    MinimumIosVersion: string;
    AvailableRecurrenceTypes: string;
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

            private _minimumAndroidVersion: string;
            get minimumAndroidVersion(): string {
                return this._minimumAndroidVersion;
            }
            set minimumAndroidVersion(value: string) {
                this._minimumAndroidVersion = value;
            }

            private _minimumIosVersion: string;
            get minimumIosVersion(): string {
                return this._minimumIosVersion;
            }
            set minimumIosVersion(value: string) {
                this._minimumIosVersion = value;
            }

            private _availableRecurrenceTypes: string;
            get availableRecurrenceTypes(): string {
                return this._availableRecurrenceTypes;
            }
            set availableRecurrenceTypes(value: string) {
                this._availableRecurrenceTypes = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "RecurringBillPay.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "RecurringBillPay.MinimumAndroidVersion", value: this._minimumAndroidVersion, dataType: 'string', label: "Minimum Android Version" },
                { key: "RecurringBillPay.MinimumIosVersion", value: this._minimumIosVersion, dataType: 'string', label: "Minimum Ios Version" },
                { key: "RecurringBillPay.AvailableRecurrenceTypes", value: this._availableRecurrenceTypes, dataType: 'string', label: "Available Recurrence Types" },
            ];
        }

}