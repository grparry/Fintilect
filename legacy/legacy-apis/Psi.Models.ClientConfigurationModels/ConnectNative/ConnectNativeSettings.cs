using System;
using Psi.Data.Models.Domain;
using Psi.Data.Models.Domain.ConnectNative;

namespace Psi.Data.Models.ClientConfigurationModels.ConnectNative
{
    public class ConnectNativeSettings : SettingsBaseHelper
    {
        private readonly ISettingsBase _settingsBase;
        private ConnectNativeTransfers _connectNativeSettings;
        private ConnectNativeAccountHistory _accountHistory;

        public ConnectNativeSettings(ISettingsBase settingsBase) : base(settingsBase)
        {
            _settingsBase = settingsBase;
        }

        public ConnectNativeTransfers ConnectNativeTransfers
        {
            get => _connectNativeSettings ?? (_connectNativeSettings = new ConnectNativeTransfers(_settingsBase));
            set => _connectNativeSettings = value;
        }

        public ConnectNativeAccountHistory AccountHistory
        {
            get => _accountHistory ?? (_accountHistory = new ConnectNativeAccountHistory(_settingsBase));
            set => _accountHistory = value;
        }

        /// <summary>
        /// Value for content container's background color in iFrame. should be rgba eg: rgba(255, 255, 255, 0.5)
        /// </summary>
        [SettingKey("ConnectNative.Browser.ContentContainerBackgroundColor")]
        public string ContentContainerBackgroundColor
        {
            get => GetValue();
            set => SetValue(value);
        }

        /// <summary>
        /// Value for panel-main's background color in iFrame. should be rgba eg: rgba(255, 255, 255, 0.9)
        /// </summary>
        [SettingKey("ConnectNative.Browser.PanelMainBackgroundColor")]
        public string PanelMainBackgroundColor
        {
            get => GetValue();
            set => SetValue(value);
        }

        /// <summary>
        /// Connect Native Json menu object for Side Menu
        /// </summary>
        [SettingKey("ConnectNative.Menus.SideMenu")]
        public string SideMenu
        {
            get => GetValue();
            set => SetValue(value);
        }

        /// <summary>
        /// Connect Native Json menu object for Top Menu
        /// </summary>
        [SettingKey("ConnectNative.Menus.TopMenu")]
        public string TopMenu
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("ConnectNative.Menus.MobileMenu")]
        public string MobileMenu
        {
            get => GetValue();
            set => SetValue(value);
        }

        /// <summary>
        /// Determines connect native menu to be used
        /// </summary>
        [SettingKey("ConnectNative.Menus.Type")]
        public ConnectNativeMenuType MenuType
        {
            get
            {
                var value = GetValue();
                return Enum.TryParse(value, true, out ConnectNativeMenuType menuType) ? menuType : ConnectNativeMenuType.Top;
            }
            set => SetValue(value);
        }

        [SettingKey("ConnectNative.Menus.Enabled")]
        public bool MenuEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// Determines max width of the targeted marketing banner 
        /// </summary>
        [SettingKey("ConnectNative.Marketing.TargetedMarketingBannerMaxWidth")]
        public int TargetedMarketingMaxWidth
        {
            get => GetIntValue();
            set => SetValue(value);
        }

        /// <summary>
        /// Determines Logo Action 
        /// </summary>
        [SettingKey("ConnectNative.Menus.LogoAction")]
        public string LogoAction
        {
            get => GetValue();
            set => SetValue(value);
        }

        /// <summary>
        /// Determines if a background image should only show on the login screen, and not on internal pages.
        /// </summary>
        [SettingKey("ConnectNative.Browser.ShowBackgroundImageOnlyOnLegacyLoginScreen")]
        public bool ShowBackgroundImageOnlyOnLegacyLoginScreen
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// Enables Rounded Corners feature on Connect Native browser.
        /// </summary>
        [SettingKey("ConnectNative.Browser.RoundedCorners.Enabled")]
        public bool RoundedCornersEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// Size options for the border radius of containers (e.g. widgets) using the Rounded Corners feature on Connect Native browser
        /// </summary>
        [SettingKey("ConnectNative.Browser.RoundedCorners.BorderRadiusSizes.Containers")]
        public RoundedCornersOptions RoundedCornersBorderRadiusSizesContainers
        {
            get
            {
                var setValue = GetValue();
                return Enum.TryParse(setValue, true, out RoundedCornersOptions serviceType) ? serviceType : RoundedCornersOptions.None;
            }
            set => SetValue(value);
        }

        /// <summary>
        /// Size options for the border radius of components (e.g. buttons) using the Rounded Corners feature on Connect Native browser
        /// </summary>
        [SettingKey("ConnectNative.Browser.RoundedCorners.BorderRadiusSizes.Components")]
        public RoundedCornersOptions RoundedCornersBorderRadiusSizesComponents
        {
            get
            {
                var setValue = GetValue();
                return Enum.TryParse(setValue, true, out RoundedCornersOptions serviceType) ? serviceType : RoundedCornersOptions.None;
            }
            set => SetValue(value);
        }

        /// <summary>
        /// Allows an alternate styling of transaction history line items
        /// </summary>
        [SettingKey("ConnectNative.MultipleDataFieldsPerLine.Enabled")]
        public bool MultipleDataFieldsPerLineEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// Determines What Type of Files Can Export History from Transaction History Screen
        /// </summary>
        [SettingKey("ConnectNative.exportTypes")]
        public string exportTypes
        {
            get => GetValue();
            set => SetValue(value);
        }
    }
}