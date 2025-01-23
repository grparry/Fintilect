import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { SavedTransfers } from './SavedTransfers';
import { ScheduledTransfersSettings } from './ScheduledTransfersSettings';
import { Authentication } from './Authentication';
export interface TransfersConfig {
    ShouldShowConfirmDialog: boolean;
    UserTransferDescriptionType: string;
    EnableUserTransferDescription: boolean;
    PastDueNumberOfDaysUntilLate: number;
    HighlightPastDueLoans: boolean;
    ShowMaskedAccountSuffixInAccountName: boolean;
    SavedTransfers: SavedTransfers;
    ScheduledTransfers: ScheduledTransfersSettings;
    Authentication: Authentication;
}

export class Transfers implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Transfers'
    };


            private _shouldShowConfirmDialog: boolean;
            get shouldShowConfirmDialog(): boolean {
                return this._shouldShowConfirmDialog;
            }
            set shouldShowConfirmDialog(value: boolean) {
                this._shouldShowConfirmDialog = value;
            }

            private _userTransferDescriptionType: string;
            get userTransferDescriptionType(): string {
                return this._userTransferDescriptionType;
            }
            set userTransferDescriptionType(value: string) {
                this._userTransferDescriptionType = value;
            }

            private _enableUserTransferDescription: boolean;
            get enableUserTransferDescription(): boolean {
                return this._enableUserTransferDescription;
            }
            set enableUserTransferDescription(value: boolean) {
                this._enableUserTransferDescription = value;
            }

            private _pastDueNumberOfDaysUntilLate: number;
            get pastDueNumberOfDaysUntilLate(): number {
                return this._pastDueNumberOfDaysUntilLate;
            }
            set pastDueNumberOfDaysUntilLate(value: number) {
                this._pastDueNumberOfDaysUntilLate = value;
            }

            private _highlightPastDueLoans: boolean;
            get highlightPastDueLoans(): boolean {
                return this._highlightPastDueLoans;
            }
            set highlightPastDueLoans(value: boolean) {
                this._highlightPastDueLoans = value;
            }

            private _showMaskedAccountSuffixInAccountName: boolean;
            get showMaskedAccountSuffixInAccountName(): boolean {
                return this._showMaskedAccountSuffixInAccountName;
            }
            set showMaskedAccountSuffixInAccountName(value: boolean) {
                this._showMaskedAccountSuffixInAccountName = value;
            }

            private _savedTransfers: SavedTransfers;
            get savedTransfers(): SavedTransfers {
                return this._savedTransfers;
            }
            set savedTransfers(value: SavedTransfers) {
                this._savedTransfers = value;
            }

            private _scheduledTransfers: ScheduledTransfersSettings;
            get scheduledTransfers(): ScheduledTransfersSettings {
                return this._scheduledTransfers;
            }
            set scheduledTransfers(value: ScheduledTransfersSettings) {
                this._scheduledTransfers = value;
            }

            private _authentication: Authentication;
            get authentication(): Authentication {
                return this._authentication;
            }
            set authentication(value: Authentication) {
                this._authentication = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "Transfers.ShouldShowConfirmDialog", value: this._shouldShowConfirmDialog, dataType: 'boolean', label: "Should Show Confirm Dialog" },
                { key: "Transfers.UserTransferDescriptionType", value: this._userTransferDescriptionType, dataType: 'string', label: "User Transfer Description Type" },
                { key: "Transfers.EnableUserTransferDescription", value: this._enableUserTransferDescription, dataType: 'boolean', label: "Enable User Transfer Description" },
                { key: "Transfers.PastDueNumberOfDaysUntilLate", value: this._pastDueNumberOfDaysUntilLate, dataType: 'number', label: "Past Due Number Of Days Until Late" },
                { key: "Transfers.HighlightPastDueLoans", value: this._highlightPastDueLoans, dataType: 'boolean', label: "Highlight Past Due Loans" },
                { key: "Transfers.ShowMaskedAccountSuffixInAccountName", value: this._showMaskedAccountSuffixInAccountName, dataType: 'boolean', label: "Show Masked Account Suffix In Account Name" },
                { key: "Transfers.SavedTransfers", value: this._savedTransfers, dataType: 'savedtransfers', label: "Saved Transfers" },
                { key: "Transfers.ScheduledTransfers", value: this._scheduledTransfers, dataType: 'scheduledtransferssettings', label: "Scheduled Transfers" },
                { key: "Transfers.Authentication", value: this._authentication, dataType: 'authentication.authentication', label: "Authentication" },
            ];
        }

}