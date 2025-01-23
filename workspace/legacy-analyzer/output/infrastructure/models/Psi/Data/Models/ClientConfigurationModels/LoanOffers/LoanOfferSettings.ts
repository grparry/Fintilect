import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { CuNexusLoanOfferSso } from './CuNexusLoanOfferSso';
export interface LoanOfferSettingsConfig {
    CuNexusLoanOfferSso: CuNexusLoanOfferSso;
}

export class LoanOfferSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'LoanOfferSettings'
    };


            private _cuNexusLoanOfferSso: CuNexusLoanOfferSso;
            get cuNexusLoanOfferSso(): CuNexusLoanOfferSso {
                return this._cuNexusLoanOfferSso;
            }
            set cuNexusLoanOfferSso(value: CuNexusLoanOfferSso) {
                this._cuNexusLoanOfferSso = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "LoanOfferSettings.CuNexusLoanOfferSso", value: this._cuNexusLoanOfferSso, dataType: 'cunexusloanoffersso', label: "Cu Nexus Loan Offer Sso" },
            ];
        }

}