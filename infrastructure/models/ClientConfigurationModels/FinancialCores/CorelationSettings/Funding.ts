import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface FundingConfig {
    FundingIsEnabled: boolean;
    FromMemberAccountNumber: string;
    FromAccountNumber: string;
    Description: string;
}

export class Funding implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Funding'
    };


            private _fundingIsEnabled: boolean;
            get fundingIsEnabled(): boolean {
                return this._fundingIsEnabled;
            }
            set fundingIsEnabled(value: boolean) {
                this._fundingIsEnabled = value;
            }

            private _fromMemberAccountNumber: string;
            get fromMemberAccountNumber(): string {
                return this._fromMemberAccountNumber;
            }
            set fromMemberAccountNumber(value: string) {
                this._fromMemberAccountNumber = value;
            }

            private _fromAccountNumber: string;
            get fromAccountNumber(): string {
                return this._fromAccountNumber;
            }
            set fromAccountNumber(value: string) {
                this._fromAccountNumber = value;
            }

            private _description: string;
            get description(): string {
                return this._description;
            }
            set description(value: string) {
                this._description = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "Funding.FundingIsEnabled", value: this._fundingIsEnabled, dataType: 'boolean', label: "Funding Is Enabled" },
                { key: "Funding.FromMemberAccountNumber", value: this._fromMemberAccountNumber, dataType: 'string', label: "From Member Account Number" },
                { key: "Funding.FromAccountNumber", value: this._fromAccountNumber, dataType: 'string', label: "From Account Number" },
                { key: "Funding.Description", value: this._description, dataType: 'string', label: "Description" },
            ];
        }

}