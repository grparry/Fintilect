// Generated imports
import { ExternalTransfersBypassSettlementAccountLoanTypes } from '../ExternalTransfersBypassSettlementAccountLoanTypes';

export interface AchFileService {
    /** @settingKey AchFileService.IsEnabled */
    isEnabled: boolean;
    /** @settingKey AchFileService.MinVersion */
    minVersion: number;
    /** @settingKey AchFileService.IsLoggingEnabled */
    isLoggingEnabled: boolean;
    /** @settingKey AchFileService.LoggingDirectory */
    loggingDirectory: string;
    /** @settingKey AchFileService.LoggingFileName */
    loggingFileName: string;
    /** @settingKey AchFileService.DataSource */
    dataSource: string;
    /** @settingKey AchFileService.InitialCatalog */
    initialCatalog: string;
    /** @settingKey AchFileService.DatabaseUserId */
    databaseUserId: string;
    /** @settingKey AchFileService.DatabasePassword */
    databasePassword: string;
    /** @settingKey AchFileService.RecordTerminator */
    recordTerminator: string;
    /** @settingKey AchFileService.RunOnDemand */
    runOnDemand: boolean;
    /** @settingKey AchFileService.ProcessWorkDays */
    processWorkDays: number;
    /** @settingKey AchFileService.CutoffTime */
    cutoffTime: string;
    /** @settingKey AchFileService.ACHFileConfigId */
    achFileConfigId: number;
    /** @settingKey AchFileService.SkipGLAccountRecords */
    skipGlAccountRecords: boolean;
    /** @settingKey AchFileService.PadFileWithExtraLines */
    padFileWithExtraLines: boolean;
    /** @settingKey AchFileService.ServiceName */
    serviceName: string;
    /** @settingKey AchFileService.RunTime */
    runTime: string;
    /** @settingKey AchFileService.MonitorJobStatus */
    monitorJobStatus: boolean;
    /** @settingKey AchFileService.DecryptKey */
    decryptKey: string;
    /** @settingKey AchFileService.ValidCharsForName */
    validCharsForName: string;
    /** @settingKey AchFileService.UseCuCompanyIdForFileHeader */
    useCuCompanyIdForFileHeader: boolean;
    /** @settingKey AchFileService.UseWEBcodeInsteadOfPPDcode */
    useWEBcodeInsteadOfPPDcode: boolean;
    /** @settingKey AchFileService.ExternalTransfers.BypassSettlementAccountForLoansEnabled */
    externalTransfersBypassSettlementAccountForLoansEnabled: boolean;
    /** @settingKey AchFileService.ExternalTransfers.BypassSettlementAccountLoanTypes */
    list: ExternalTransfersBypassSettlementAccountLoanTypes;
    /** @settingKey AchFileService.UseSeparateInboundSettlementAccountEnabled */
    useSeparateInboundSettlementAccountEnabled: boolean;
    /** @settingKey AchFileService.InboundSettlementAccount */
    inboundSettlementAccount: string;
    /** @settingKey AchFileService.InboundSettlementAccountSuffix */
    inboundSettlementAccountSuffix: string;
}
