using System;
using Psi.Business.ServiceContracts.RequestResponse.WindowsServices;

namespace Psi.Data.Models.ClientConfigurationModels.WindowsService
{
    public class VerafinFileBatchServiceSettings : SettingsBaseHelper
    {
        public VerafinFileBatchServiceSettings(ISettingsBase settingsBase) : base(settingsBase)
        {
        }
        

        /// <summary>
        /// Retrieves all the configs used by the PscuLogFileTransform Service
        /// </summary>
        public VerafinFileBatchSettingsResponse Configuration()
        {
            var config = new VerafinFileBatchSettingsResponse();
            config.StartTimeInHours = StartTimeInHours;
            config.EndTimeInHours = EndTimeInHours;

            return config;
        }

        /// <summary>
        /// How Many hours in the past (UTC) the batchFile service should start.
        /// </summary>
        [SettingKey("PsiServices.VerafinFileBatchService.StartTimeInHours")]
        public int StartTimeInHours
        {
            get => GetIntValue();
            set => SetValue(value);
        }

        /// <summary>
        /// How Many hours in the past (UTC) the batchFile service should end.
        /// </summary>
        [SettingKey("PsiServices.VerafinFileBatchService.EndTimeInHours")]
        public int EndTimeInHours
        {
            get => GetIntValue();
            set => SetValue(value);
        }
    }
}