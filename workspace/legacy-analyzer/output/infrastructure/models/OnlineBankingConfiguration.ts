import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface OnlineBankingConfigurationConfig {
    IgnoreCanRun: boolean;
    Version: number;
    FeeAccountsShareCategories: string[];
    FeeAccountsLoanCategories: string[];
    IsPersonCentricModeEnabled: boolean;
    KeepAliveInterval: number;
    TimeoutWarningMessage: string;
    ForceLoginByAccountAlias: boolean;
    AccountIDRegEx: string;
}

export class OnlineBankingConfiguration implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'OnlineBankingConfiguration'
    };


            private _ignoreCanRun: boolean;
            get ignoreCanRun(): boolean {
                return this._ignoreCanRun;
            }
            set ignoreCanRun(value: boolean) {
                this._ignoreCanRun = value;
            }

            private _version: number;
            get version(): number {
                return this._version;
            }
            set version(value: number) {
                this._version = value;
            }

            private _feeAccountsShareCategories: string[];
            get feeAccountsShareCategories(): string[] {
                return this._feeAccountsShareCategories;
            }
            set feeAccountsShareCategories(value: string[]) {
                this._feeAccountsShareCategories = value;
            }

            private _feeAccountsLoanCategories: string[];
            get feeAccountsLoanCategories(): string[] {
                return this._feeAccountsLoanCategories;
            }
            set feeAccountsLoanCategories(value: string[]) {
                this._feeAccountsLoanCategories = value;
            }

            private _isPersonCentricModeEnabled: boolean;
            get isPersonCentricModeEnabled(): boolean {
                return this._isPersonCentricModeEnabled;
            }
            set isPersonCentricModeEnabled(value: boolean) {
                this._isPersonCentricModeEnabled = value;
            }

            private _keepAliveInterval: number;
            get keepAliveInterval(): number {
                return this._keepAliveInterval;
            }
            set keepAliveInterval(value: number) {
                this._keepAliveInterval = value;
            }

            private _timeoutWarningMessage: string;
            get timeoutWarningMessage(): string {
                return this._timeoutWarningMessage;
            }
            set timeoutWarningMessage(value: string) {
                this._timeoutWarningMessage = value;
            }

            private _forceLoginByAccountAlias: boolean;
            get forceLoginByAccountAlias(): boolean {
                return this._forceLoginByAccountAlias;
            }
            set forceLoginByAccountAlias(value: boolean) {
                this._forceLoginByAccountAlias = value;
            }

            private _accountIDRegEx: string;
            get accountIDRegEx(): string {
                return this._accountIDRegEx;
            }
            set accountIDRegEx(value: string) {
                this._accountIDRegEx = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "OnlineBankingConfiguration.IgnoreCanRun", value: this._ignoreCanRun, dataType: 'boolean', label: "Ignore Can Run" },
                { key: "OnlineBankingConfiguration.Version", value: this._version, dataType: 'number', label: "Version" },
                { key: "OnlineBankingConfiguration.FeeAccountsShareCategories", value: this._feeAccountsShareCategories, dataType: 'list<string>', label: "Fee Accounts Share Categories" },
                { key: "OnlineBankingConfiguration.FeeAccountsLoanCategories", value: this._feeAccountsLoanCategories, dataType: 'list<string>', label: "Fee Accounts Loan Categories" },
                { key: "OnlineBankingConfiguration.IsPersonCentricModeEnabled", value: this._isPersonCentricModeEnabled, dataType: 'boolean', label: "Is Person Centric Mode Enabled" },
                { key: "OnlineBankingConfiguration.KeepAliveInterval", value: this._keepAliveInterval, dataType: 'number', label: "Keep Alive Interval" },
                { key: "OnlineBankingConfiguration.TimeoutWarningMessage", value: this._timeoutWarningMessage, dataType: 'string', label: "Timeout Warning Message" },
                { key: "OnlineBankingConfiguration.ForceLoginByAccountAlias", value: this._forceLoginByAccountAlias, dataType: 'boolean', label: "Force Login By Account Alias" },
                { key: "OnlineBankingConfiguration.AccountIDRegEx", value: this._accountIDRegEx, dataType: 'string', label: "Account I D Reg Ex" },
            ];
        }

}