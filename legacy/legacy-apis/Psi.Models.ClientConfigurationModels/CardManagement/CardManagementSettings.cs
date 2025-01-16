using System;
using System.Collections.Generic;
using System.Linq;
using NLog;
using Psi.Business.ServiceContracts.RequestResponse.CardManagement.Models;
using Psi.Data.Models.Domain.CardManagement.COTS;

namespace Psi.Data.Models.ClientConfigurationModels.CardManagement
{
	public class CardManagementSettings : SettingsBaseHelper
	{
		public CardManagementSettings(ISettingsBase settingsBase) : base(settingsBase)
		{
		}

	    [SettingKey("CardManagement.IsPinChangeEnabled")]
	    public bool IsPinChangeEnabled
	    {
            get { return GetBoolValue(); }
            set { SetValue(value);}
        }

        [SettingKey("CardManagement.MinVersion")]
        public double MinVersion
        {
            get { return GetDoubleValue(); }
            set { SetValue(value); }
        }

        [SettingKey("CardManagement.COTS")]
		public CotsSettings CotsSettings
		{
			get => GetJsonValueOrNull<CotsSettings>();
            set => SetValue(value);
        }

        [SettingKey("CardManagement.PinChange.SupportedCardTypes")]
        public IEnumerable<CardType> SupportedCardTypes => GetEnumerableValue()?.Select(ConvertStringToCardType) ?? new List<CardType>();
        
        [SettingKey("CardManagement.PinChange.RemoveCvvValidationForTheseCardTypes")]
        public IEnumerable<CardType> RemoveCvvValidationForTheseCardTypes => GetEnumerableValue()?.Select(ConvertStringToCardType) ?? new List<CardType>();

        [SettingKey("CardManagement.PinChange.UnacceptablePins")]
        public IEnumerable<string> UnacceptablePins => GetEnumerableValue();

        [SettingKey("CardManagement.Dna.ShouldCallCoreForCardNumbers")]
        public bool DnaShouldCallCoreForCardNumbers
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("CardManagement.TransactionDispute.Enabled")]
        public bool TransactionDisputeEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        private CardType ConvertStringToCardType(string cardTypeString)
	    {
	        CardType cardTypeEnum;
	        if (!Enum.TryParse(cardTypeString, out cardTypeEnum))
	        {
                LogManager.GetCurrentClassLogger().Log(LogLevel.Warn, $"{cardTypeString} is not a recognized PIN change card type.  Please check the CardManagement.PinChange.RemoveCvvValidationForTheseCardTypes config setting.");
            }
            return cardTypeEnum;
	    }
	}
}
