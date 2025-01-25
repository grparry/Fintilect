import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface TestSettingsModelConfig {
    ThisIsMyValue: string;
}

export class TestSettingsModel implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'TestSettingsModel'
    };


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
                { key: "TestSettingsModel.ThisIsMyValue", value: this._thisIsMyValue, dataType: 'string', label: "This Is My Value" },
            ];
        }

}