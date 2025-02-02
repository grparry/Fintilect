import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface AuditLogsConfig {
    ShowUsernameOnEventDetails: boolean;
}

export class AuditLogs implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'AuditLogs'
    };


            private _showUsernameOnEventDetails: boolean;
            get showUsernameOnEventDetails(): boolean {
                return this._showUsernameOnEventDetails;
            }
            set showUsernameOnEventDetails(value: boolean) {
                this._showUsernameOnEventDetails = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "AuditLogs.ShowUsernameOnEventDetails", value: this._showUsernameOnEventDetails, dataType: 'boolean', label: "Show Username On Event Details" },
            ];
        }

}