import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface CUDirectLoanSsoConfig {
    CUDirectLoanOrganizationCode: string;
}

export class CUDirectLoanSso implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'CUDirectLoanSso'
    };


            private _cUDirectLoanOrganizationCode: string;
            get cUDirectLoanOrganizationCode(): string {
                return this._cUDirectLoanOrganizationCode;
            }
            set cUDirectLoanOrganizationCode(value: string) {
                this._cUDirectLoanOrganizationCode = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "CUDirectLoanSso.CUDirectLoanOrganizationCode", value: this._cUDirectLoanOrganizationCode, dataType: 'string', label: "C U Direct Loan Organization Code" },
            ];
        }

}