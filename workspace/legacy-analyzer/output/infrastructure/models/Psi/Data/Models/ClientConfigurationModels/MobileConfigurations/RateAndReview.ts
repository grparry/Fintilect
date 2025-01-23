import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface RateAndReviewConfig {
    MinimumAndroidVersion: string;
    MinimumIosVersion: string;
    Enabled: boolean;
    PromptsPerYear: number;
    PromptsPerVersion: number;
    MinimumActionCount: number;
}

export class RateAndReview implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'RateAndReview'
    };


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

            private _enabled: boolean;
            get enabled(): boolean {
                return this._enabled;
            }
            set enabled(value: boolean) {
                this._enabled = value;
            }

            private _promptsPerYear: number;
            get promptsPerYear(): number {
                return this._promptsPerYear;
            }
            set promptsPerYear(value: number) {
                this._promptsPerYear = value;
            }

            private _promptsPerVersion: number;
            get promptsPerVersion(): number {
                return this._promptsPerVersion;
            }
            set promptsPerVersion(value: number) {
                this._promptsPerVersion = value;
            }

            private _minimumActionCount: number;
            get minimumActionCount(): number {
                return this._minimumActionCount;
            }
            set minimumActionCount(value: number) {
                this._minimumActionCount = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "RateAndReview.MinimumAndroidVersion", value: this._minimumAndroidVersion, dataType: 'string', label: "Minimum Android Version" },
                { key: "RateAndReview.MinimumIosVersion", value: this._minimumIosVersion, dataType: 'string', label: "Minimum Ios Version" },
                { key: "RateAndReview.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "RateAndReview.PromptsPerYear", value: this._promptsPerYear, dataType: 'number', label: "Prompts Per Year" },
                { key: "RateAndReview.PromptsPerVersion", value: this._promptsPerVersion, dataType: 'number', label: "Prompts Per Version" },
                { key: "RateAndReview.MinimumActionCount", value: this._minimumActionCount, dataType: 'number', label: "Minimum Action Count" },
            ];
        }

}