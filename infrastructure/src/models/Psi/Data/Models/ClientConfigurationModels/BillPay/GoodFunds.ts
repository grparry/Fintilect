import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface GoodFundsConfig {
    MicrNumberStart: string;
    BillPayFundingType: string;
    AccountAndSuffixUseSuffixFromFile: boolean;
}

export class GoodFunds implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'GoodFunds'
    };


            private _micrNumberStart: string;
            get micrNumberStart(): string {
                return this._micrNumberStart;
            }
            set micrNumberStart(value: string) {
                this._micrNumberStart = value;
            }

            private _billPayFundingType: string;
            get billPayFundingType(): string {
                return this._billPayFundingType;
            }
            set billPayFundingType(value: string) {
                this._billPayFundingType = value;
            }

            private _accountAndSuffixUseSuffixFromFile: boolean;
            get accountAndSuffixUseSuffixFromFile(): boolean {
                return this._accountAndSuffixUseSuffixFromFile;
            }
            set accountAndSuffixUseSuffixFromFile(value: boolean) {
                this._accountAndSuffixUseSuffixFromFile = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "GoodFunds.MicrNumberStart", value: this._micrNumberStart, dataType: 'string', label: "Micr Number Start" },
                { key: "GoodFunds.BillPayFundingType", value: this._billPayFundingType, dataType: 'string', label: "Bill Pay Funding Type" },
                { key: "GoodFunds.AccountAndSuffixUseSuffixFromFile", value: this._accountAndSuffixUseSuffixFromFile, dataType: 'boolean', label: "Account And Suffix Use Suffix From File" },
            ];
        }

}