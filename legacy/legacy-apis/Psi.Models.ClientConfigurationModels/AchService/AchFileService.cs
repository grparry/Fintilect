using System.Collections.Generic;
using System.Linq;

namespace Psi.Data.Models.ClientConfigurationModels.AchService
{
    public interface IAchFileServiceConfig
    {
        bool IsLoggingEnabled { get; }
        string LoggingDirectory { get; }
        string LoggingFileName { get; }
        string DataSource { get; }
        string InitialCatalog { get; }
        string DatabaseUserId { get; }
        string DatabasePassword { get; }
        string RecordTerminator { get; }
        bool RunOnDemand { get; }
        int ProcessWorkDays { get; }
        string CutoffTime { get; }
        int AchFileConfigId { get; }
        bool SkipGlAccountRecords { get; }
        bool PadFileWithExtraLines { get; }
        string ServiceName { get; }
        string RunTime { get; }
        bool MonitorJobStatus { get; }
        string DecryptKey { get; }
        string ValidCharsForName { get; }
        bool UseCuCompanyIdForFileHeader { get; }
        bool UseWEBcodeInsteadOfPPDcode { get; }
        bool ExternalTransfersBypassSettlementAccountForLoansEnabled { get; }
        List<string> ExternalTransfersBypassSettlementAccountLoanTypes { get; }
        bool UseSeparateInboundSettlementAccountEnabled { get; }
        string InboundSettlementAccount { get; }
    }

    public class AchFileService : SettingsBaseHelper, IAchFileServiceConfig
    {
        [SettingKey("AchFileService.IsEnabled")]
        public bool IsEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }



        [SettingKey("AchFileService.MinVersion")]
        public double MinVersion
        {
            get => GetDoubleValue();
            set => SetValue(value);
        }

        [SettingKey("AchFileService.IsLoggingEnabled")]
        public bool IsLoggingEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("AchFileService.LoggingDirectory")]
        public string LoggingDirectory
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("AchFileService.LoggingFileName")]
        public string LoggingFileName
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("AchFileService.DataSource")]
        public string DataSource
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("AchFileService.InitialCatalog")]
        public string InitialCatalog
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("AchFileService.DatabaseUserId")]
        public string DatabaseUserId
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("AchFileService.DatabasePassword")]
        public string DatabasePassword
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("AchFileService.RecordTerminator")]
        public string RecordTerminator
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("AchFileService.RunOnDemand")]
        public bool RunOnDemand
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("AchFileService.ProcessWorkDays")]
        public int ProcessWorkDays
        {
            get => GetIntValue();
            set => SetValue(value);
        }

        [SettingKey("AchFileService.CutoffTime")]
        public string CutoffTime
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("AchFileService.ACHFileConfigId")]
        public int AchFileConfigId
        {
            get => GetIntValue();
            set => SetValue(value);
        }

        [SettingKey("AchFileService.SkipGLAccountRecords")]
        public bool SkipGlAccountRecords
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("AchFileService.PadFileWithExtraLines")]
        public bool PadFileWithExtraLines
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("AchFileService.ServiceName")]
        public string ServiceName
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("AchFileService.RunTime")]
        public string RunTime
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("AchFileService.MonitorJobStatus")]
        public bool MonitorJobStatus
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("AchFileService.DecryptKey")]
        public string DecryptKey
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("AchFileService.ValidCharsForName")]
        public string ValidCharsForName
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("AchFileService.UseCuCompanyIdForFileHeader")]
        public bool UseCuCompanyIdForFileHeader
        {
            get => GetBoolValue();
            set => SetValue(value);
        }


        [SettingKey("AchFileService.UseWEBcodeInsteadOfPPDcode")]
        public bool UseWEBcodeInsteadOfPPDcode
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("AchFileService.ExternalTransfers.BypassSettlementAccountForLoansEnabled")]
        public bool ExternalTransfersBypassSettlementAccountForLoansEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("AchFileService.ExternalTransfers.BypassSettlementAccountLoanTypes")]
        public List<string> ExternalTransfersBypassSettlementAccountLoanTypes
        {
            get
            {
                var categories = GetListValue() ?? new List<string>();

                return categories.Where(x => !string.IsNullOrWhiteSpace(x)).ToList();
            }
            set => SetValue(value);
        }

        [SettingKey("AchFileService.UseSeparateInboundSettlementAccountEnabled")]
        public bool UseSeparateInboundSettlementAccountEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("AchFileService.InboundSettlementAccount")]
        public string InboundSettlementAccount
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("AchFileService.InboundSettlementAccountSuffix")]
        public string InboundSettlementAccountSuffix
        {
            get => GetValue();
            set => SetValue(value);
        }

        public AchFileService(ISettingsBase settingsBase) : base(settingsBase)
        {
        }
    }
}