using System;

namespace Psi.Data.Models.ClientConfigurationModels.Account
{
	public class AchTransfer : SettingsBaseHelper
	{
	    private UsaEpay _usaEpay;
	    private PlaceHoldsOnAchTransactions _placeHoldsOnAchTransactions;

	    private UseInformationalNoteInsteadOfTransferForAchTransactions
	        _useInformationalNoteInsteadOfTransferForAchTransactions;

        public AchTransfer(ISettingsBase settingsBase) : base(settingsBase)
		{
		}

        [SettingKey("Transfers.Ach.SameDayCutoffInLocalTime")]
        public string SameDayCutoffInLocalTime
	    {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Transfers.Ach.NextDayCutoffInLocalTime")]
        public string NextDayCutoffInLocalTime
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Transfers.Messages.ShowCurrentAvailable")]
	    public bool ShowCurrentAvailable
	    {
	        get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Transfers.Messages.ShowCurrentBalance")]
        public bool ShowCurrentBalance
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Transfers.Ach.TransactionServiceIdentifier")]
        public Guid ServiceIdentifier
        {
            get
            {
                Guid.TryParse(GetValue(), out Guid outGuid);
                return outGuid;
            }
            set => SetValue(value.ToString());
        }

        [SettingKey("Transfers.Ach.CheckDepositPermission.Enabled")]
        public bool CheckDepositPermissionEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Transfers.Ach.CheckDepositPermission.DisableTransfersWithoutPermission")]
        public bool CheckDepositPermissionDisableTransfersWithoutPermission
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Transfers.Ach.Admin.ReadTransfersToProcessFromDatabase")]
        public bool AdminReadTransfersToProcessFromDatabase
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        public UsaEpay UsaEpay
	    {
            get => _usaEpay ?? (_usaEpay = new UsaEpay(SettingsBase));
            set => _usaEpay = value;
        }

	    public PlaceHoldsOnAchTransactions PlaceHoldsOnAchTransactions
        {
	        get => _placeHoldsOnAchTransactions ?? (_placeHoldsOnAchTransactions = new PlaceHoldsOnAchTransactions(SettingsBase));
            set => _placeHoldsOnAchTransactions = value;
        }

	    public UseInformationalNoteInsteadOfTransferForAchTransactions
	        UseInformationalNoteInsteadOfTransferForAchTransactions
	    {
	        get => _useInformationalNoteInsteadOfTransferForAchTransactions ??
	               (_useInformationalNoteInsteadOfTransferForAchTransactions =
	                   new UseInformationalNoteInsteadOfTransferForAchTransactions(SettingsBase));

	        set => _useInformationalNoteInsteadOfTransferForAchTransactions = value;
	    }
	}
}