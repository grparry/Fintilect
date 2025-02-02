using System;

namespace Psi.Data.Models.ClientConfigurationModels.WindowsService
{
    public class PscuLogFileTransformServiceSettings : SettingsBaseHelper
    {
        /// <summary>
        /// The filters configuration for the PSCU log file transform service.
        /// </summary>
        /// <remarks>
        /// [{
        ///     "Name": "Transaction Post Date",
        ///     "ValuesCausingInclusion": "",
        ///     "ValuesCausingExclusion": "",
        ///     "RequiresValue": true,
        ///     "ErrorMessage": "Transaction Post Date is required"
        /// }]
        /// </remarks>
        [SettingKey("PsiServices.PscuLogFileTransformService.Filters")]
        public string Filters { get; set; }

        /// <summary>
        /// The path configuration for input/output file handling.
        /// </summary>
        /// <remarks>
        /// {
        ///     "InputPath": "/data/input",
        ///     "OutputPath": "/data/output",
        ///     "ErrorPath": "/data/error",
        ///     "ProcessedPath": "/data/processed",
        ///     "InputFilenamePattern": "*.txt",
        ///     "OutputFilePrefix": "processed_",
        ///     "InputFileExclusiveAccessTimeout": "00:01:00"
        /// }
        /// </remarks>
        [SettingKey("PsiServices.PscuLogFileTransformService.PathConfiguration")]
        public string PathConfiguration { get; set; }

        /// <summary>
        /// The input file field configuration.
        /// </summary>
        /// <remarks>
        /// [{
        ///     "Name": "AccountNumber",
        ///     "Position": 1,
        ///     "Length": 10,
        ///     "Required": true,
        ///     "ValidationPattern": "^\\d{10}$",
        ///     "ValidationMessage": "Account number must be 10 digits"
        /// }]
        /// </remarks>
        [SettingKey("PsiServices.PscuLogFileTransformService.InputFileFields")]
        public string InputFileFields { get; set; }

        /// <summary>
        /// The output file field configuration.
        /// </summary>
        /// <remarks>
        /// [{
        ///     "Name": "AccountNumber",
        ///     "Position": 1,
        ///     "Length": 10,
        ///     "PadCharacter": "0",
        ///     "Alignment": "Right"
        /// }]
        /// </remarks>
        [SettingKey("PsiServices.PscuLogFileTransformService.OutputFileFields")]
        public string OutputFileFields { get; set; }
    }
}
