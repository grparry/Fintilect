import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface AchFileServiceConfig {
    IsEnabled: boolean;
    MinVersion: number;
    IsLoggingEnabled: boolean;
    LoggingDirectory: string;
    LoggingFileName: string;
    DataSource: string;
    InitialCatalog: string;
    DatabaseUserId: string;
    DatabasePassword: string;
    RecordTerminator: string;
    RunOnDemand: boolean;
    ProcessWorkDays: number;
    CutoffTime: string;
    AchFileConfigId: number;
    SkipGlAccountRecords: boolean;
    PadFileWithExtraLines: boolean;
    ServiceName: string;
    RunTime: string;
    MonitorJobStatus: boolean;
    DecryptKey: string;
    ValidCharsForName: string;
    UseCuCompanyIdForFileHeader: boolean;
    UseWEBcodeInsteadOfPPDcode: boolean;
    ExternalTransfersBypassSettlementAccountForLoansEnabled: boolean;
    ExternalTransfersBypassSettlementAccountLoanTypes: string[];
    UseSeparateInboundSettlementAccountEnabled: boolean;
    InboundSettlementAccount: string;
    InboundSettlementAccountSuffix: string;
}

export class AchFileService implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'AchFileService'
    };


            private _isEnabled: boolean;
            get isEnabled(): boolean {
                return this._isEnabled;
            }
            set isEnabled(value: boolean) {
                this._isEnabled = value;
            }

            private _minVersion: number;
            get minVersion(): number {
                return this._minVersion;
            }
            set minVersion(value: number) {
                this._minVersion = value;
            }

            private _isLoggingEnabled: boolean;
            get isLoggingEnabled(): boolean {
                return this._isLoggingEnabled;
            }
            set isLoggingEnabled(value: boolean) {
                this._isLoggingEnabled = value;
            }

            private _loggingDirectory: string;
            get loggingDirectory(): string {
                return this._loggingDirectory;
            }
            set loggingDirectory(value: string) {
                this._loggingDirectory = value;
            }

            private _loggingFileName: string;
            get loggingFileName(): string {
                return this._loggingFileName;
            }
            set loggingFileName(value: string) {
                this._loggingFileName = value;
            }

            private _dataSource: string;
            get dataSource(): string {
                return this._dataSource;
            }
            set dataSource(value: string) {
                this._dataSource = value;
            }

            private _initialCatalog: string;
            get initialCatalog(): string {
                return this._initialCatalog;
            }
            set initialCatalog(value: string) {
                this._initialCatalog = value;
            }

            private _databaseUserId: string;
            get databaseUserId(): string {
                return this._databaseUserId;
            }
            set databaseUserId(value: string) {
                this._databaseUserId = value;
            }

            private _databasePassword: string;
            get databasePassword(): string {
                return this._databasePassword;
            }
            set databasePassword(value: string) {
                this._databasePassword = value;
            }

            private _recordTerminator: string;
            get recordTerminator(): string {
                return this._recordTerminator;
            }
            set recordTerminator(value: string) {
                this._recordTerminator = value;
            }

            private _runOnDemand: boolean;
            get runOnDemand(): boolean {
                return this._runOnDemand;
            }
            set runOnDemand(value: boolean) {
                this._runOnDemand = value;
            }

            private _processWorkDays: number;
            get processWorkDays(): number {
                return this._processWorkDays;
            }
            set processWorkDays(value: number) {
                this._processWorkDays = value;
            }

            private _cutoffTime: string;
            get cutoffTime(): string {
                return this._cutoffTime;
            }
            set cutoffTime(value: string) {
                this._cutoffTime = value;
            }

            private _achFileConfigId: number;
            get achFileConfigId(): number {
                return this._achFileConfigId;
            }
            set achFileConfigId(value: number) {
                this._achFileConfigId = value;
            }

            private _skipGlAccountRecords: boolean;
            get skipGlAccountRecords(): boolean {
                return this._skipGlAccountRecords;
            }
            set skipGlAccountRecords(value: boolean) {
                this._skipGlAccountRecords = value;
            }

            private _padFileWithExtraLines: boolean;
            get padFileWithExtraLines(): boolean {
                return this._padFileWithExtraLines;
            }
            set padFileWithExtraLines(value: boolean) {
                this._padFileWithExtraLines = value;
            }

            private _serviceName: string;
            get serviceName(): string {
                return this._serviceName;
            }
            set serviceName(value: string) {
                this._serviceName = value;
            }

            private _runTime: string;
            get runTime(): string {
                return this._runTime;
            }
            set runTime(value: string) {
                this._runTime = value;
            }

            private _monitorJobStatus: boolean;
            get monitorJobStatus(): boolean {
                return this._monitorJobStatus;
            }
            set monitorJobStatus(value: boolean) {
                this._monitorJobStatus = value;
            }

            private _decryptKey: string;
            get decryptKey(): string {
                return this._decryptKey;
            }
            set decryptKey(value: string) {
                this._decryptKey = value;
            }

            private _validCharsForName: string;
            get validCharsForName(): string {
                return this._validCharsForName;
            }
            set validCharsForName(value: string) {
                this._validCharsForName = value;
            }

            private _useCuCompanyIdForFileHeader: boolean;
            get useCuCompanyIdForFileHeader(): boolean {
                return this._useCuCompanyIdForFileHeader;
            }
            set useCuCompanyIdForFileHeader(value: boolean) {
                this._useCuCompanyIdForFileHeader = value;
            }

            private _useWEBcodeInsteadOfPPDcode: boolean;
            get useWEBcodeInsteadOfPPDcode(): boolean {
                return this._useWEBcodeInsteadOfPPDcode;
            }
            set useWEBcodeInsteadOfPPDcode(value: boolean) {
                this._useWEBcodeInsteadOfPPDcode = value;
            }

            private _externalTransfersBypassSettlementAccountForLoansEnabled: boolean;
            get externalTransfersBypassSettlementAccountForLoansEnabled(): boolean {
                return this._externalTransfersBypassSettlementAccountForLoansEnabled;
            }
            set externalTransfersBypassSettlementAccountForLoansEnabled(value: boolean) {
                this._externalTransfersBypassSettlementAccountForLoansEnabled = value;
            }

            private _externalTransfersBypassSettlementAccountLoanTypes: string[];
            get externalTransfersBypassSettlementAccountLoanTypes(): string[] {
                return this._externalTransfersBypassSettlementAccountLoanTypes;
            }
            set externalTransfersBypassSettlementAccountLoanTypes(value: string[]) {
                this._externalTransfersBypassSettlementAccountLoanTypes = value;
            }

            private _useSeparateInboundSettlementAccountEnabled: boolean;
            get useSeparateInboundSettlementAccountEnabled(): boolean {
                return this._useSeparateInboundSettlementAccountEnabled;
            }
            set useSeparateInboundSettlementAccountEnabled(value: boolean) {
                this._useSeparateInboundSettlementAccountEnabled = value;
            }

            private _inboundSettlementAccount: string;
            get inboundSettlementAccount(): string {
                return this._inboundSettlementAccount;
            }
            set inboundSettlementAccount(value: string) {
                this._inboundSettlementAccount = value;
            }

            private _inboundSettlementAccountSuffix: string;
            get inboundSettlementAccountSuffix(): string {
                return this._inboundSettlementAccountSuffix;
            }
            set inboundSettlementAccountSuffix(value: string) {
                this._inboundSettlementAccountSuffix = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "AchFileService.IsEnabled", value: this._isEnabled, dataType: 'boolean', label: "Is Enabled" },
                { key: "AchFileService.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "AchFileService.IsLoggingEnabled", value: this._isLoggingEnabled, dataType: 'boolean', label: "Is Logging Enabled" },
                { key: "AchFileService.LoggingDirectory", value: this._loggingDirectory, dataType: 'string', label: "Logging Directory" },
                { key: "AchFileService.LoggingFileName", value: this._loggingFileName, dataType: 'string', label: "Logging File Name" },
                { key: "AchFileService.DataSource", value: this._dataSource, dataType: 'string', label: "Data Source" },
                { key: "AchFileService.InitialCatalog", value: this._initialCatalog, dataType: 'string', label: "Initial Catalog" },
                { key: "AchFileService.DatabaseUserId", value: this._databaseUserId, dataType: 'string', label: "Database User Id" },
                { key: "AchFileService.DatabasePassword", value: this._databasePassword, dataType: 'string', label: "Database Password" },
                { key: "AchFileService.RecordTerminator", value: this._recordTerminator, dataType: 'string', label: "Record Terminator" },
                { key: "AchFileService.RunOnDemand", value: this._runOnDemand, dataType: 'boolean', label: "Run On Demand" },
                { key: "AchFileService.ProcessWorkDays", value: this._processWorkDays, dataType: 'number', label: "Process Work Days" },
                { key: "AchFileService.CutoffTime", value: this._cutoffTime, dataType: 'string', label: "Cutoff Time" },
                { key: "AchFileService.AchFileConfigId", value: this._achFileConfigId, dataType: 'number', label: "Ach File Config Id" },
                { key: "AchFileService.SkipGlAccountRecords", value: this._skipGlAccountRecords, dataType: 'boolean', label: "Skip Gl Account Records" },
                { key: "AchFileService.PadFileWithExtraLines", value: this._padFileWithExtraLines, dataType: 'boolean', label: "Pad File With Extra Lines" },
                { key: "AchFileService.ServiceName", value: this._serviceName, dataType: 'string', label: "Service Name" },
                { key: "AchFileService.RunTime", value: this._runTime, dataType: 'string', label: "Run Time" },
                { key: "AchFileService.MonitorJobStatus", value: this._monitorJobStatus, dataType: 'boolean', label: "Monitor Job Status" },
                { key: "AchFileService.DecryptKey", value: this._decryptKey, dataType: 'string', label: "Decrypt Key" },
                { key: "AchFileService.ValidCharsForName", value: this._validCharsForName, dataType: 'string', label: "Valid Chars For Name" },
                { key: "AchFileService.UseCuCompanyIdForFileHeader", value: this._useCuCompanyIdForFileHeader, dataType: 'boolean', label: "Use Cu Company Id For File Header" },
                { key: "AchFileService.UseWEBcodeInsteadOfPPDcode", value: this._useWEBcodeInsteadOfPPDcode, dataType: 'boolean', label: "Use W E Bcode Instead Of P P Dcode" },
                { key: "AchFileService.ExternalTransfersBypassSettlementAccountForLoansEnabled", value: this._externalTransfersBypassSettlementAccountForLoansEnabled, dataType: 'boolean', label: "External Transfers Bypass Settlement Account For Loans Enabled" },
                { key: "AchFileService.ExternalTransfersBypassSettlementAccountLoanTypes", value: this._externalTransfersBypassSettlementAccountLoanTypes, dataType: 'list<string>', label: "External Transfers Bypass Settlement Account Loan Types" },
                { key: "AchFileService.UseSeparateInboundSettlementAccountEnabled", value: this._useSeparateInboundSettlementAccountEnabled, dataType: 'boolean', label: "Use Separate Inbound Settlement Account Enabled" },
                { key: "AchFileService.InboundSettlementAccount", value: this._inboundSettlementAccount, dataType: 'string', label: "Inbound Settlement Account" },
                { key: "AchFileService.InboundSettlementAccountSuffix", value: this._inboundSettlementAccountSuffix, dataType: 'string', label: "Inbound Settlement Account Suffix" },
            ];
        }

}