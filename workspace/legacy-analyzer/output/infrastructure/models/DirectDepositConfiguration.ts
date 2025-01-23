import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface DirectDepositConfigurationConfig {
    ShowAccountNickname: boolean;
    ShowMICRText: boolean;
    ShouldUsePreviousMicr: boolean;
    ShouldShowMemberName: boolean;
    InformationViewAccountCategories: string[];
}

export class DirectDepositConfiguration implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'DirectDepositConfiguration'
    };


            private _showAccountNickname: boolean;
            get showAccountNickname(): boolean {
                return this._showAccountNickname;
            }
            set showAccountNickname(value: boolean) {
                this._showAccountNickname = value;
            }

            private _showMICRText: boolean;
            get showMICRText(): boolean {
                return this._showMICRText;
            }
            set showMICRText(value: boolean) {
                this._showMICRText = value;
            }

            private _shouldUsePreviousMicr: boolean;
            get shouldUsePreviousMicr(): boolean {
                return this._shouldUsePreviousMicr;
            }
            set shouldUsePreviousMicr(value: boolean) {
                this._shouldUsePreviousMicr = value;
            }

            private _shouldShowMemberName: boolean;
            get shouldShowMemberName(): boolean {
                return this._shouldShowMemberName;
            }
            set shouldShowMemberName(value: boolean) {
                this._shouldShowMemberName = value;
            }

            private _informationViewAccountCategories: string[];
            get informationViewAccountCategories(): string[] {
                return this._informationViewAccountCategories;
            }
            set informationViewAccountCategories(value: string[]) {
                this._informationViewAccountCategories = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "DirectDepositConfiguration.ShowAccountNickname", value: this._showAccountNickname, dataType: 'boolean', label: "Show Account Nickname" },
                { key: "DirectDepositConfiguration.ShowMICRText", value: this._showMICRText, dataType: 'boolean', label: "Show M I C R Text" },
                { key: "DirectDepositConfiguration.ShouldUsePreviousMicr", value: this._shouldUsePreviousMicr, dataType: 'boolean', label: "Should Use Previous Micr" },
                { key: "DirectDepositConfiguration.ShouldShowMemberName", value: this._shouldShowMemberName, dataType: 'boolean', label: "Should Show Member Name" },
                { key: "DirectDepositConfiguration.InformationViewAccountCategories", value: this._informationViewAccountCategories, dataType: 'list<string>', label: "Information View Account Categories" },
            ];
        }

}