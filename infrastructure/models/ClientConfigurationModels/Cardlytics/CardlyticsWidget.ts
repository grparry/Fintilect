import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface CardlyticsWidgetConfig {
    ShowWidgetOnWelcomeSummaryPages: boolean;
}

export class CardlyticsWidget implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'CardlyticsWidget'
    };


            private _showWidgetOnWelcomeSummaryPages: boolean;
            get showWidgetOnWelcomeSummaryPages(): boolean {
                return this._showWidgetOnWelcomeSummaryPages;
            }
            set showWidgetOnWelcomeSummaryPages(value: boolean) {
                this._showWidgetOnWelcomeSummaryPages = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "CardlyticsWidget.ShowWidgetOnWelcomeSummaryPages", value: this._showWidgetOnWelcomeSummaryPages, dataType: 'boolean', label: "Show Widget On Welcome Summary Pages" },
            ];
        }

}