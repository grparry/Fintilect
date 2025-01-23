import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { DateTime } from './System.DateTime';
export interface QuickAccessPinConfig {
    Enabled: boolean;
    Type: string;
    Length: number;
    ResetDate: Date;
}

export class QuickAccessPin implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'QuickAccessPin'
    };


            private _enabled: boolean;
            get enabled(): boolean {
                return this._enabled;
            }
            set enabled(value: boolean) {
                this._enabled = value;
            }

            private _type: string;
            get type(): string {
                return this._type;
            }
            set type(value: string) {
                this._type = value;
            }

            private _length: number;
            get length(): number {
                return this._length;
            }
            set length(value: number) {
                this._length = value;
            }

            private _resetDate: Date;
            get resetDate(): Date {
                return this._resetDate;
            }
            set resetDate(value: Date) {
                this._resetDate = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "QuickAccessPin.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "QuickAccessPin.Type", value: this._type, dataType: 'string', label: "Type" },
                { key: "QuickAccessPin.Length", value: this._length, dataType: 'number', label: "Length" },
                { key: "QuickAccessPin.ResetDate", value: this._resetDate, dataType: 'system.datetime', label: "Reset Date" },
            ];
        }

}