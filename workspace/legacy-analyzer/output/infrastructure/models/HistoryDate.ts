import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface HistoryDateConfig {
    DateRangeDropDownSettingOptions: string;
    DateRangeDropDownSettingLabelValue: string;
    DatePickerPositionOptions: string;
}

export class HistoryDate implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'HistoryDate'
    };


            private _dateRangeDropDownSettingOptions: string;
            get dateRangeDropDownSettingOptions(): string {
                return this._dateRangeDropDownSettingOptions;
            }
            set dateRangeDropDownSettingOptions(value: string) {
                this._dateRangeDropDownSettingOptions = value;
            }

            private _dateRangeDropDownSettingLabelValue: string;
            get dateRangeDropDownSettingLabelValue(): string {
                return this._dateRangeDropDownSettingLabelValue;
            }
            set dateRangeDropDownSettingLabelValue(value: string) {
                this._dateRangeDropDownSettingLabelValue = value;
            }

            private _datePickerPositionOptions: string;
            get datePickerPositionOptions(): string {
                return this._datePickerPositionOptions;
            }
            set datePickerPositionOptions(value: string) {
                this._datePickerPositionOptions = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "HistoryDate.DateRangeDropDownSettingOptions", value: this._dateRangeDropDownSettingOptions, dataType: 'string', label: "Date Range Drop Down Setting Options" },
                { key: "HistoryDate.DateRangeDropDownSettingLabelValue", value: this._dateRangeDropDownSettingLabelValue, dataType: 'string', label: "Date Range Drop Down Setting Label Value" },
                { key: "HistoryDate.DatePickerPositionOptions", value: this._datePickerPositionOptions, dataType: 'string', label: "Date Picker Position Options" },
            ];
        }

}