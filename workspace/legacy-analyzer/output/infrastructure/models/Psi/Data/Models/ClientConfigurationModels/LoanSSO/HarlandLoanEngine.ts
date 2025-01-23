import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface HarlandLoanEngineConfig {
    HarlandLoanEngineSsoEnabled: boolean;
    HarlandLoanEngineSsoRequestUrl: string;
    HarlandLoanEngineWidgetIdentifier: string;
    HarlandLoanEngineResponsiveWidgetIdentifier: string;
    HarlandLoanEngineFinancialInstitutionIdentifier: string;
    HarlandLoanEngineShouldShowMenuItems: boolean;
    HarlandLoanEngineShouldShowLoanButtonOnSummaryEvenWithPreviousLoans: boolean;
}

export class HarlandLoanEngine implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'HarlandLoanEngine'
    };


            private _harlandLoanEngineSsoEnabled: boolean;
            get harlandLoanEngineSsoEnabled(): boolean {
                return this._harlandLoanEngineSsoEnabled;
            }
            set harlandLoanEngineSsoEnabled(value: boolean) {
                this._harlandLoanEngineSsoEnabled = value;
            }

            private _harlandLoanEngineSsoRequestUrl: string;
            get harlandLoanEngineSsoRequestUrl(): string {
                return this._harlandLoanEngineSsoRequestUrl;
            }
            set harlandLoanEngineSsoRequestUrl(value: string) {
                this._harlandLoanEngineSsoRequestUrl = value;
            }

            private _harlandLoanEngineWidgetIdentifier: string;
            get harlandLoanEngineWidgetIdentifier(): string {
                return this._harlandLoanEngineWidgetIdentifier;
            }
            set harlandLoanEngineWidgetIdentifier(value: string) {
                this._harlandLoanEngineWidgetIdentifier = value;
            }

            private _harlandLoanEngineResponsiveWidgetIdentifier: string;
            get harlandLoanEngineResponsiveWidgetIdentifier(): string {
                return this._harlandLoanEngineResponsiveWidgetIdentifier;
            }
            set harlandLoanEngineResponsiveWidgetIdentifier(value: string) {
                this._harlandLoanEngineResponsiveWidgetIdentifier = value;
            }

            private _harlandLoanEngineFinancialInstitutionIdentifier: string;
            get harlandLoanEngineFinancialInstitutionIdentifier(): string {
                return this._harlandLoanEngineFinancialInstitutionIdentifier;
            }
            set harlandLoanEngineFinancialInstitutionIdentifier(value: string) {
                this._harlandLoanEngineFinancialInstitutionIdentifier = value;
            }

            private _harlandLoanEngineShouldShowMenuItems: boolean;
            get harlandLoanEngineShouldShowMenuItems(): boolean {
                return this._harlandLoanEngineShouldShowMenuItems;
            }
            set harlandLoanEngineShouldShowMenuItems(value: boolean) {
                this._harlandLoanEngineShouldShowMenuItems = value;
            }

            private _harlandLoanEngineShouldShowLoanButtonOnSummaryEvenWithPreviousLoans: boolean;
            get harlandLoanEngineShouldShowLoanButtonOnSummaryEvenWithPreviousLoans(): boolean {
                return this._harlandLoanEngineShouldShowLoanButtonOnSummaryEvenWithPreviousLoans;
            }
            set harlandLoanEngineShouldShowLoanButtonOnSummaryEvenWithPreviousLoans(value: boolean) {
                this._harlandLoanEngineShouldShowLoanButtonOnSummaryEvenWithPreviousLoans = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "HarlandLoanEngine.HarlandLoanEngineSsoEnabled", value: this._harlandLoanEngineSsoEnabled, dataType: 'boolean', label: "Harland Loan Engine Sso Enabled" },
                { key: "HarlandLoanEngine.HarlandLoanEngineSsoRequestUrl", value: this._harlandLoanEngineSsoRequestUrl, dataType: 'string', label: "Harland Loan Engine Sso Request Url" },
                { key: "HarlandLoanEngine.HarlandLoanEngineWidgetIdentifier", value: this._harlandLoanEngineWidgetIdentifier, dataType: 'string', label: "Harland Loan Engine Widget Identifier" },
                { key: "HarlandLoanEngine.HarlandLoanEngineResponsiveWidgetIdentifier", value: this._harlandLoanEngineResponsiveWidgetIdentifier, dataType: 'string', label: "Harland Loan Engine Responsive Widget Identifier" },
                { key: "HarlandLoanEngine.HarlandLoanEngineFinancialInstitutionIdentifier", value: this._harlandLoanEngineFinancialInstitutionIdentifier, dataType: 'string', label: "Harland Loan Engine Financial Institution Identifier" },
                { key: "HarlandLoanEngine.HarlandLoanEngineShouldShowMenuItems", value: this._harlandLoanEngineShouldShowMenuItems, dataType: 'boolean', label: "Harland Loan Engine Should Show Menu Items" },
                { key: "HarlandLoanEngine.HarlandLoanEngineShouldShowLoanButtonOnSummaryEvenWithPreviousLoans", value: this._harlandLoanEngineShouldShowLoanButtonOnSummaryEvenWithPreviousLoans, dataType: 'boolean', label: "Harland Loan Engine Should Show Loan Button On Summary Even With Previous Loans" },
            ];
        }

}