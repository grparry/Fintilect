import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface MyCuClubConfig {
    SummaryNoteName: string;
    IsUrl: boolean;
}

export class MyCuClub implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'MyCuClub'
    };


            private _summaryNoteName: string;
            get summaryNoteName(): string {
                return this._summaryNoteName;
            }
            set summaryNoteName(value: string) {
                this._summaryNoteName = value;
            }

            private _isUrl: boolean;
            get isUrl(): boolean {
                return this._isUrl;
            }
            set isUrl(value: boolean) {
                this._isUrl = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "MyCuClub.SummaryNoteName", value: this._summaryNoteName, dataType: 'string', label: "Summary Note Name" },
                { key: "MyCuClub.IsUrl", value: this._isUrl, dataType: 'boolean', label: "Is Url" },
            ];
        }

}