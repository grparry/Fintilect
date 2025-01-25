import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface AccountMaskingSettingsConfig {
    MaskingLengthToShow: number;
    HideWelcomeBarDetail: string;
    AccountHistoryMaskingEnabled: boolean;
    AccountHistoryMaskingRegexMatchingPatterns: string;
    CheckCopyMaskingEnabled: boolean;
    ShowUnmaskedMemberNumberOnUserClick: boolean;
}

export class AccountMaskingSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'AccountMaskingSettings'
    };


            private _maskingLengthToShow: number;
            get maskingLengthToShow(): number {
                return this._maskingLengthToShow;
            }
            set maskingLengthToShow(value: number) {
                this._maskingLengthToShow = value;
            }

            private _hideWelcomeBarDetail: string;
            get hideWelcomeBarDetail(): string {
                return this._hideWelcomeBarDetail;
            }
            set hideWelcomeBarDetail(value: string) {
                this._hideWelcomeBarDetail = value;
            }

            private _accountHistoryMaskingEnabled: boolean;
            get accountHistoryMaskingEnabled(): boolean {
                return this._accountHistoryMaskingEnabled;
            }
            set accountHistoryMaskingEnabled(value: boolean) {
                this._accountHistoryMaskingEnabled = value;
            }

            private _accountHistoryMaskingRegexMatchingPatterns: string;
            get accountHistoryMaskingRegexMatchingPatterns(): string {
                return this._accountHistoryMaskingRegexMatchingPatterns;
            }
            set accountHistoryMaskingRegexMatchingPatterns(value: string) {
                this._accountHistoryMaskingRegexMatchingPatterns = value;
            }

            private _checkCopyMaskingEnabled: boolean;
            get checkCopyMaskingEnabled(): boolean {
                return this._checkCopyMaskingEnabled;
            }
            set checkCopyMaskingEnabled(value: boolean) {
                this._checkCopyMaskingEnabled = value;
            }

            private _showUnmaskedMemberNumberOnUserClick: boolean;
            get showUnmaskedMemberNumberOnUserClick(): boolean {
                return this._showUnmaskedMemberNumberOnUserClick;
            }
            set showUnmaskedMemberNumberOnUserClick(value: boolean) {
                this._showUnmaskedMemberNumberOnUserClick = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "AccountMaskingSettings.MaskingLengthToShow", value: this._maskingLengthToShow, dataType: 'number', label: "Masking Length To Show" },
                { key: "AccountMaskingSettings.HideWelcomeBarDetail", value: this._hideWelcomeBarDetail, dataType: 'string', label: "Hide Welcome Bar Detail" },
                { key: "AccountMaskingSettings.AccountHistoryMaskingEnabled", value: this._accountHistoryMaskingEnabled, dataType: 'boolean', label: "Account History Masking Enabled" },
                { key: "AccountMaskingSettings.AccountHistoryMaskingRegexMatchingPatterns", value: this._accountHistoryMaskingRegexMatchingPatterns, dataType: 'string', label: "Account History Masking Regex Matching Patterns" },
                { key: "AccountMaskingSettings.CheckCopyMaskingEnabled", value: this._checkCopyMaskingEnabled, dataType: 'boolean', label: "Check Copy Masking Enabled" },
                { key: "AccountMaskingSettings.ShowUnmaskedMemberNumberOnUserClick", value: this._showUnmaskedMemberNumberOnUserClick, dataType: 'boolean', label: "Show Unmasked Member Number On User Click" },
            ];
        }

}