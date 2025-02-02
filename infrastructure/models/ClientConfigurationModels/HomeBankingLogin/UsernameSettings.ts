import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface UsernameSettingsConfig {
    DailyAllowedChangeAttempts: number;
}

export class UsernameSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'UsernameSettings'
    };


            private _dailyAllowedChangeAttempts: number;
            get dailyAllowedChangeAttempts(): number {
                return this._dailyAllowedChangeAttempts;
            }
            set dailyAllowedChangeAttempts(value: number) {
                this._dailyAllowedChangeAttempts = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "UsernameSettings.DailyAllowedChangeAttempts", value: this._dailyAllowedChangeAttempts, dataType: 'number', label: "Daily Allowed Change Attempts" },
            ];
        }

}