import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { TestSettingsModel } from '@infrastructure/TestSettingsModel';
export interface TestSettingsHelperConfig {
    CotsSettings: TestSettingsModel;
}

export class TestSettingsHelper implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'TestSettingsHelper'
    };


            private _cotsSettings: TestSettingsModel;
            get cotsSettings(): TestSettingsModel {
                return this._cotsSettings;
            }
            set cotsSettings(value: TestSettingsModel) {
                this._cotsSettings = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "TestSettingsHelper.CotsSettings", value: this._cotsSettings, dataType: 'testsettingsmodel', label: "Cots Settings" },
            ];
        }

}