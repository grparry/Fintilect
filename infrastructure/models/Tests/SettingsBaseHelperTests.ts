import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { TestSettingsModel } from '../TestSettingsModel';
export interface SettingsBaseHelperTestsConfig {
    CotsSettings: TestSettingsModel;
    ThisIsMyValue: string;
}

export class SettingsBaseHelperTests implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'SettingsBaseHelperTests'
    };


            private _cotsSettings: TestSettingsModel;
            get cotsSettings(): TestSettingsModel {
                return this._cotsSettings;
            }
            set cotsSettings(value: TestSettingsModel) {
                this._cotsSettings = value;
            }

            private _thisIsMyValue: string;
            get thisIsMyValue(): string {
                return this._thisIsMyValue;
            }
            set thisIsMyValue(value: string) {
                this._thisIsMyValue = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "SettingsBaseHelperTests.CotsSettings", value: this._cotsSettings, dataType: 'testsettingsmodel', label: "Cots Settings" },
                { key: "SettingsBaseHelperTests.ThisIsMyValue", value: this._thisIsMyValue, dataType: 'string', label: "This Is My Value" },
            ];
        }

}