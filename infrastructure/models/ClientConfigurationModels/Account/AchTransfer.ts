import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { Guid } from '../Guid';
import { UsaEpay } from '../UsaEpay';
import { PlaceHoldsOnAchTransactions } from '../PlaceHoldsOnAchTransactions';
import { UseInformationalNoteInsteadOfTransferForAchTransactions } from '../UseInformationalNoteInsteadOfTransferForAchTransactions';
export interface AchTransferConfig {
    SameDayCutoffInLocalTime: string;
    NextDayCutoffInLocalTime: string;
    ShowCurrentAvailable: boolean;
    ShowCurrentBalance: boolean;
    ServiceIdentifier: string;
    CheckDepositPermissionEnabled: boolean;
    CheckDepositPermissionDisableTransfersWithoutPermission: boolean;
    AdminReadTransfersToProcessFromDatabase: boolean;
    UsaEpay: UsaEpay;
    PlaceHoldsOnAchTransactions: PlaceHoldsOnAchTransactions;
    UseInformationalNoteInsteadOfTransferForAchTransactions: UseInformationalNoteInsteadOfTransferForAchTransactions;
}

export class AchTransfer implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'AchTransfer'
    };


            private _sameDayCutoffInLocalTime: string;
            get sameDayCutoffInLocalTime(): string {
                return this._sameDayCutoffInLocalTime;
            }
            set sameDayCutoffInLocalTime(value: string) {
                this._sameDayCutoffInLocalTime = value;
            }

            private _nextDayCutoffInLocalTime: string;
            get nextDayCutoffInLocalTime(): string {
                return this._nextDayCutoffInLocalTime;
            }
            set nextDayCutoffInLocalTime(value: string) {
                this._nextDayCutoffInLocalTime = value;
            }

            private _showCurrentAvailable: boolean;
            get showCurrentAvailable(): boolean {
                return this._showCurrentAvailable;
            }
            set showCurrentAvailable(value: boolean) {
                this._showCurrentAvailable = value;
            }

            private _showCurrentBalance: boolean;
            get showCurrentBalance(): boolean {
                return this._showCurrentBalance;
            }
            set showCurrentBalance(value: boolean) {
                this._showCurrentBalance = value;
            }

            private _serviceIdentifier: string;
            get serviceIdentifier(): string {
                return this._serviceIdentifier;
            }
            set serviceIdentifier(value: string) {
                this._serviceIdentifier = value;
            }

            private _checkDepositPermissionEnabled: boolean;
            get checkDepositPermissionEnabled(): boolean {
                return this._checkDepositPermissionEnabled;
            }
            set checkDepositPermissionEnabled(value: boolean) {
                this._checkDepositPermissionEnabled = value;
            }

            private _checkDepositPermissionDisableTransfersWithoutPermission: boolean;
            get checkDepositPermissionDisableTransfersWithoutPermission(): boolean {
                return this._checkDepositPermissionDisableTransfersWithoutPermission;
            }
            set checkDepositPermissionDisableTransfersWithoutPermission(value: boolean) {
                this._checkDepositPermissionDisableTransfersWithoutPermission = value;
            }

            private _adminReadTransfersToProcessFromDatabase: boolean;
            get adminReadTransfersToProcessFromDatabase(): boolean {
                return this._adminReadTransfersToProcessFromDatabase;
            }
            set adminReadTransfersToProcessFromDatabase(value: boolean) {
                this._adminReadTransfersToProcessFromDatabase = value;
            }

            private _usaEpay: UsaEpay;
            get usaEpay(): UsaEpay {
                return this._usaEpay;
            }
            set usaEpay(value: UsaEpay) {
                this._usaEpay = value;
            }

            private _placeHoldsOnAchTransactions: PlaceHoldsOnAchTransactions;
            get placeHoldsOnAchTransactions(): PlaceHoldsOnAchTransactions {
                return this._placeHoldsOnAchTransactions;
            }
            set placeHoldsOnAchTransactions(value: PlaceHoldsOnAchTransactions) {
                this._placeHoldsOnAchTransactions = value;
            }

            private _useInformationalNoteInsteadOfTransferForAchTransactions: UseInformationalNoteInsteadOfTransferForAchTransactions;
            get useInformationalNoteInsteadOfTransferForAchTransactions(): UseInformationalNoteInsteadOfTransferForAchTransactions {
                return this._useInformationalNoteInsteadOfTransferForAchTransactions;
            }
            set useInformationalNoteInsteadOfTransferForAchTransactions(value: UseInformationalNoteInsteadOfTransferForAchTransactions) {
                this._useInformationalNoteInsteadOfTransferForAchTransactions = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "AchTransfer.SameDayCutoffInLocalTime", value: this._sameDayCutoffInLocalTime, dataType: 'string', label: "Same Day Cutoff In Local Time" },
                { key: "AchTransfer.NextDayCutoffInLocalTime", value: this._nextDayCutoffInLocalTime, dataType: 'string', label: "Next Day Cutoff In Local Time" },
                { key: "AchTransfer.ShowCurrentAvailable", value: this._showCurrentAvailable, dataType: 'boolean', label: "Show Current Available" },
                { key: "AchTransfer.ShowCurrentBalance", value: this._showCurrentBalance, dataType: 'boolean', label: "Show Current Balance" },
                { key: "AchTransfer.ServiceIdentifier", value: this._serviceIdentifier, dataType: 'string', label: "Service Identifier" },
                { key: "AchTransfer.CheckDepositPermissionEnabled", value: this._checkDepositPermissionEnabled, dataType: 'boolean', label: "Check Deposit Permission Enabled" },
                { key: "AchTransfer.CheckDepositPermissionDisableTransfersWithoutPermission", value: this._checkDepositPermissionDisableTransfersWithoutPermission, dataType: 'boolean', label: "Check Deposit Permission Disable Transfers Without Permission" },
                { key: "AchTransfer.AdminReadTransfersToProcessFromDatabase", value: this._adminReadTransfersToProcessFromDatabase, dataType: 'boolean', label: "Admin Read Transfers To Process From Database" },
                { key: "AchTransfer.UsaEpay", value: this._usaEpay, dataType: 'usaepay', label: "Usa Epay" },
                { key: "AchTransfer.PlaceHoldsOnAchTransactions", value: this._placeHoldsOnAchTransactions, dataType: 'placeholdsonachtransactions', label: "Place Holds On Ach Transactions" },
                { key: "AchTransfer.UseInformationalNoteInsteadOfTransferForAchTransactions", value: this._useInformationalNoteInsteadOfTransferForAchTransactions, dataType: 'useinformationalnoteinsteadoftransferforachtransactions', label: "Use Informational Note Instead Of Transfer For Ach Transactions" },
            ];
        }

}