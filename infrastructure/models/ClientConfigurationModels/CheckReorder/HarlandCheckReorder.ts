import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface HarlandCheckReorderConfig {
    Enabled: boolean;
    MinVersion: number;
    AccountPlanFlagNumber: string;
    AccountPlanFlagValue: string;
}

export class HarlandCheckReorder implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'HarlandCheckReorder'
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

            private _accountPlanFlagNumber: string;
            get accountPlanFlagNumber(): string {
                return this._accountPlanFlagNumber;
            }
            set accountPlanFlagNumber(value: string) {
                this._accountPlanFlagNumber = value;
            }

            private _accountPlanFlagValue: string;
            get accountPlanFlagValue(): string {
                return this._accountPlanFlagValue;
            }
            set accountPlanFlagValue(value: string) {
                this._accountPlanFlagValue = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "HarlandCheckReorder.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "HarlandCheckReorder.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "HarlandCheckReorder.AccountPlanFlagNumber", value: this._accountPlanFlagNumber, dataType: 'string', label: "Account Plan Flag Number" },
                { key: "HarlandCheckReorder.AccountPlanFlagValue", value: this._accountPlanFlagValue, dataType: 'string', label: "Account Plan Flag Value" },
            ];
        }

}