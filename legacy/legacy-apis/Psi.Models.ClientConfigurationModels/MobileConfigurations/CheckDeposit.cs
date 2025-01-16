using System;
using Psi.Data.Models.Domain;

namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations
{
	public class CheckDeposit : SettingsBaseHelper
	{
	    private Authentication.Authentication _authentication;

	    public CheckDeposit(ISettingsBase settingsBase) : base(settingsBase)
	    {
        }

        [SettingKey("Mobile.CheckDeposit.MinimumVersion")]
        public string MinimumVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.CheckDeposit.MinimumAndroidVersion")]
        public string MinimumAndroidVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.CheckDeposit.MinimumIosVersion")]
        public string MinimumIosVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.CheckDeposit.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.CheckDeposit.Vendor")]
        public CheckDepositVendor Vendor
		{
			get
			{
				CheckDepositVendor type;
				Enum.TryParse(GetValue(), out type);
				return type;
            }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.CheckDeposit.CameraType")]
        public CheckDepositCameraType CameraType
		{
			get
			{
				var x = GetValue();
				CheckDepositCameraType type;
				Enum.TryParse(x, out type);
				return type;
            }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.CheckDeposit.DisclosureRequired")]
        public bool DisclosureRequired
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

	    [SettingKey("Mobile.CheckDeposit.AutoCaptureSetting")]
	    public CheckDepositAutoCaptureType AutoCaptureSetting
        {
	        get
	        {
	            var x = GetValue();
	            CheckDepositAutoCaptureType type;
	            Enum.TryParse(x, out type);
	            return type;
	        }
	        set { SetValue(value); }
        }

	    [SettingKey("Mobile.CheckDeposit.ContrastAdjustmentEnabled")]
	    public bool ContrastAdjustmentEnabled
        {
	        get { return GetBoolValue(); }
	        set { SetValue(value); }
        }

	    [SettingKey("Mobile.CheckDeposit.AllowCrossAccountDeposit")]
	    public bool AllowCrossAccountDeposit
        {
	        get { return GetBoolValue(); }
	        set { SetValue(value); }
        }

	    [SettingKey("Mobile.CheckDeposit.ImageScalingMinimumAndroidVersion")]
	    public string ImageScalingMinimumAndroidVersion
	    {
	        get { return GetValue(); }
	        set { SetValue(value); }
	    }

	    [SettingKey("Mobile.CheckDeposit.ImageScalingMinimumIosVersion")]
	    public string ImageScalingMinimumIosVersion
	    {
	        get { return GetValue(); }
	        set { SetValue(value); }
	    }

		/// <summary>
		///	If true, provide option to remember user's preferred 'From' account for check deposits
		/// </summary>
		[SettingKey("Mobile.CheckDeposit.RememberAccountPreference")]
		public bool RememberAccountPreference {
			get { return GetBoolValue(); }
			set { SetValue(value); }
		}

        /// <summary>
        /// If true, show a popup on mobile app with instructions for how to correctly endorse and prepare a check for mobile deposit.
        /// </summary>
        [SettingKey("Mobile.CheckDeposit.ShowEndorsementInstructions")]
        public bool ShowEndorsementInstructions
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        /// <summary>
        /// Determines default rear check endorsement status. 0 - Not Tested (Default), 1 - Failed, 2 - Passed
        /// </summary>
        [SettingKey("Mobile.CheckDeposit.Vertifi.RearEndorsementDefault")]
        public RearEndorsementDefaultType RearEndorsementDefault
        {
            get {
                var x = GetValue();
                RearEndorsementDefaultType type;
                Enum.TryParse(x, out type);
                return type;
            }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.CheckDeposit.ShowMaskedAccountSuffixInAccountName")]
        public bool ShowMaskedAccountSuffixInAccountName
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CheckDeposit.AccountNamePattern")]
        public string AccountNamePattern
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.CheckDeposit.EnableEndorsementUsabilityWarnings")]
        public bool EnableEndorsementUsabilityWarnings
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        public Authentication.Authentication Authentication
        {
            // The value is hardcoded to match the feature public id in the Meta.LayeredSecurityFeature table
            get { return _authentication ?? (_authentication = new Authentication.Authentication(new Guid("19A8CE0B-5380-4323-95E1-0B843A8362FB"))); }
            set { _authentication = value; }
        }
    }
}
