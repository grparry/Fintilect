import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface BillPayAdminMemberMenuConfig {
    Show3rdPartyId: boolean;
}

export class BillPayAdminMemberMenu implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'BillPayAdminMemberMenu'
    };


            private _show3rdPartyId: boolean;
            get show3rdPartyId(): boolean {
                return this._show3rdPartyId;
            }
            set show3rdPartyId(value: boolean) {
                this._show3rdPartyId = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "BillPayAdminMemberMenu.Show3rdPartyId", value: this._show3rdPartyId, dataType: 'boolean', label: "Show3rd Party Id" },
            ];
        }

}