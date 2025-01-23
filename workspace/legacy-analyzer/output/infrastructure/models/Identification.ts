import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface IdentificationConfig {
    MothersMaidenNameCategoryOption: string;
    DriverLicenseCategoryOption: string;
}

export class Identification implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Identification'
    };


            private _mothersMaidenNameCategoryOption: string;
            get mothersMaidenNameCategoryOption(): string {
                return this._mothersMaidenNameCategoryOption;
            }
            set mothersMaidenNameCategoryOption(value: string) {
                this._mothersMaidenNameCategoryOption = value;
            }

            private _driverLicenseCategoryOption: string;
            get driverLicenseCategoryOption(): string {
                return this._driverLicenseCategoryOption;
            }
            set driverLicenseCategoryOption(value: string) {
                this._driverLicenseCategoryOption = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "Identification.MothersMaidenNameCategoryOption", value: this._mothersMaidenNameCategoryOption, dataType: 'string', label: "Mothers Maiden Name Category Option" },
                { key: "Identification.DriverLicenseCategoryOption", value: this._driverLicenseCategoryOption, dataType: 'string', label: "Driver License Category Option" },
            ];
        }

}