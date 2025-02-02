import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface SimnetConfigurationConfig {
    OrgAlias: string;
    ValidationCode: string;
    CheckImageSearchName: string;
    ShouldSearchByAccountNumberInsteadOfMicr: boolean;
}

export class SimnetConfiguration implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'SimnetConfiguration'
    };


            private _orgAlias: string;
            get orgAlias(): string {
                return this._orgAlias;
            }
            set orgAlias(value: string) {
                this._orgAlias = value;
            }

            private _validationCode: string;
            get validationCode(): string {
                return this._validationCode;
            }
            set validationCode(value: string) {
                this._validationCode = value;
            }

            private _checkImageSearchName: string;
            get checkImageSearchName(): string {
                return this._checkImageSearchName;
            }
            set checkImageSearchName(value: string) {
                this._checkImageSearchName = value;
            }

            private _shouldSearchByAccountNumberInsteadOfMicr: boolean;
            get shouldSearchByAccountNumberInsteadOfMicr(): boolean {
                return this._shouldSearchByAccountNumberInsteadOfMicr;
            }
            set shouldSearchByAccountNumberInsteadOfMicr(value: boolean) {
                this._shouldSearchByAccountNumberInsteadOfMicr = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "SimnetConfiguration.OrgAlias", value: this._orgAlias, dataType: 'string', label: "Org Alias" },
                { key: "SimnetConfiguration.ValidationCode", value: this._validationCode, dataType: 'string', label: "Validation Code" },
                { key: "SimnetConfiguration.CheckImageSearchName", value: this._checkImageSearchName, dataType: 'string', label: "Check Image Search Name" },
                { key: "SimnetConfiguration.ShouldSearchByAccountNumberInsteadOfMicr", value: this._shouldSearchByAccountNumberInsteadOfMicr, dataType: 'boolean', label: "Should Search By Account Number Instead Of Micr" },
            ];
        }

}