using Psi.Business.ServiceContracts.RequestResponse.WindowsServices;

namespace Psi.Data.Models.ClientConfigurationModels.WindowsService
{
    public class PscuLogFileTransformServiceSettings : SettingsBaseHelper
        {
            
            public PscuLogFileTransformServiceSettings(ISettingsBase settingsBase) : base(settingsBase)
            {
            }

            /// <summary>
            /// Retrieves all the configs used by the PscuLogFileTransform Service
            /// </summary>
            public PscuLogFileTransformServiceResponse Configuration()
            {
                var config = new PscuLogFileTransformServiceResponse();

                config.InputFileFields = InputFileFields;
                config.Filters = Filters;
                config.OutputFileFields = OutputFileFields;
                config.PathConfiguration = PathConfiguration;

                return config;
            }

            /// <summary>
            /// The Json configuration for the PscuLogFileTransform Service of PSIWindowsService. This is a JSON object and should be formatted like so:
            /// <remarks>
            /// [{
            ///     "Name": "Transaction Post Date",
            ///     "ValuesCausingInclusion": "",
            ///     "ValuesCausingExclusion": "",
            ///     "RequiresValue": true,
            ///     "ErrorMessage": "Transaction Post Date is required"
            /// }]
            /// </remarks>
            /// </summary>
            [SettingKey("PsiServices.PscuLogFileTransformService.Filters")]
            public string Filters
            {
                get
                { return GetValue(); }
                set { SetValue(value); }
            }

            /// <summary>
            /// The Json configuration for the PscuLogFileTransform Service of PSIWindowsService. This is a JSON object and should be formatted like so:
            /// <remarks>
            /// [{
            ///     "Name": "Savings Account Number",
            ///     "DataType": "System.String",
            ///     "EmptyAllowed": false
            /// }]
            /// </remarks>
            /// </summary>
            [SettingKey("PsiServices.PscuLogFileTransformService.InputFileFields")]
            public string InputFileFields
            {
                get
                { return GetValue(); }
                set { SetValue(value); }
            }

            /// <summary>
            /// The Json configuration for the PscuLogFileTransform Service of PSIWindowsService. This is a JSON object and should be formatted like so:
            /// <remarks>
            /// [{
            ///     "Position": 0,
            ///     "WhitespaceLength": 0,
            ///     "Name": "Savings Account Number",
            ///     "CustomFormatter": null,
            ///     "TruncateToLength": 9,
            ///     "TruncateFromPosition": "",
            ///     "MinimumOutputLength": 9,
            ///     "MinimumOutputPadFromPosition": "",
            ///     "OutputFormatString": "",
            ///     "StaticTextValue": ""
            /// }]
            /// </remarks>
            /// </summary>
            [SettingKey("PsiServices.PscuLogFileTransformService.OutputFileFields")]
            public string OutputFileFields
            {
                get
                { return GetValue(); }
                set { SetValue(value); }
            }

            /// <summary>
            /// The Json configuration for the PscuLogFileTransform Service of PSIWindowsService. This is a JSON object and should be formatted like so:
            /// <remarks>
            /// {
            ///     "InputPath": "input",
            ///     "InputFilenamePattern": "\\.csv$",
            ///     "OutputPath": "output",
            ///     "ErrorPath": "error",
            ///     "ProcessedPath": "processed",
            ///     "CompletedPath": "completed",
            ///     "OutputFilePrefix": "tranlist.cc.",
            ///     "InputFileExclusiveAccessTimeout": "00:05:00"
            /// }
            /// </remarks>
            /// </summary>
            [SettingKey("PsiServices.PscuLogFileTransformService.PathConfiguration")]
            public string PathConfiguration
            {
                get
                { return GetValue(); }
                set { SetValue(value); }
            }
        }
}
