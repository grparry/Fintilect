import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface UseInformationalNoteInsteadOfTransferForAchTransactionsConfig {
    MinVersion: number;
    Enabled: boolean;
    InformationalNoteRangeMinimum: string;
    InformationalNoteRangeMaximum: string;
    NoteExpirationTimeInDays: number;
    TransactionDescription: string;
    ByPassNote: boolean;
}

export class UseInformationalNoteInsteadOfTransferForAchTransactions implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'UseInformationalNoteInsteadOfTransferForAchTransactions'
    };


            private _minVersion: number;
            get minVersion(): number {
                return this._minVersion;
            }
            set minVersion(value: number) {
                this._minVersion = value;
            }

            private _enabled: boolean;
            get enabled(): boolean {
                return this._enabled;
            }
            set enabled(value: boolean) {
                this._enabled = value;
            }

            private _informationalNoteRangeMinimum: string;
            get informationalNoteRangeMinimum(): string {
                return this._informationalNoteRangeMinimum;
            }
            set informationalNoteRangeMinimum(value: string) {
                this._informationalNoteRangeMinimum = value;
            }

            private _informationalNoteRangeMaximum: string;
            get informationalNoteRangeMaximum(): string {
                return this._informationalNoteRangeMaximum;
            }
            set informationalNoteRangeMaximum(value: string) {
                this._informationalNoteRangeMaximum = value;
            }

            private _noteExpirationTimeInDays: number;
            get noteExpirationTimeInDays(): number {
                return this._noteExpirationTimeInDays;
            }
            set noteExpirationTimeInDays(value: number) {
                this._noteExpirationTimeInDays = value;
            }

            private _transactionDescription: string;
            get transactionDescription(): string {
                return this._transactionDescription;
            }
            set transactionDescription(value: string) {
                this._transactionDescription = value;
            }

            private _byPassNote: boolean;
            get byPassNote(): boolean {
                return this._byPassNote;
            }
            set byPassNote(value: boolean) {
                this._byPassNote = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "UseInformationalNoteInsteadOfTransferForAchTransactions.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "UseInformationalNoteInsteadOfTransferForAchTransactions.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "UseInformationalNoteInsteadOfTransferForAchTransactions.InformationalNoteRangeMinimum", value: this._informationalNoteRangeMinimum, dataType: 'string', label: "Informational Note Range Minimum" },
                { key: "UseInformationalNoteInsteadOfTransferForAchTransactions.InformationalNoteRangeMaximum", value: this._informationalNoteRangeMaximum, dataType: 'string', label: "Informational Note Range Maximum" },
                { key: "UseInformationalNoteInsteadOfTransferForAchTransactions.NoteExpirationTimeInDays", value: this._noteExpirationTimeInDays, dataType: 'number', label: "Note Expiration Time In Days" },
                { key: "UseInformationalNoteInsteadOfTransferForAchTransactions.TransactionDescription", value: this._transactionDescription, dataType: 'string', label: "Transaction Description" },
                { key: "UseInformationalNoteInsteadOfTransferForAchTransactions.ByPassNote", value: this._byPassNote, dataType: 'boolean', label: "By Pass Note" },
            ];
        }

}