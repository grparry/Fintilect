using System.Collections.Generic;
using Newtonsoft.Json;
using System;

namespace Psi.Data.Models.ClientConfigurationModels.Widgets
{
    public class WidgetSettings : SettingsBaseHelper
    {
        public WidgetSettings(ISettingsBase settingsBase) : base(settingsBase)
        {
        }
        
        /// <summary>
        /// Sets the initial sort order of the dashboard widgets for initial load. the setting is a .json object in Omega.
        /// If the setting doesn't exist, return null
        /// </summary>
        [SettingKey("Widgets.DashboardInitialSortOrder")]
        public Dictionary<string, int> DashboardInitialSortOrder
        {
            get => GetJsonValueOrNull<Dictionary<string, int>>() ?? null;
            set => SetValue(JsonConvert.SerializeObject(value));
        }

        /// <summary>
        /// Sets the initial sort order of the connect native dashboard widgets for initial load. the setting is a .json object in Omega.
        /// If the setting doesn't exist, return null
        /// </summary>
        [SettingKey("ConnectNative.Dashboard.Widgets.Default")]
        public string ConnectNativeDashboardWidgetsDefault
        {
            get => GetValue();
            set => SetValue(value);
        }

        /// If enabled, show the 'account summary' widget on the dashboard in Connect Native Browser. Default: true:
        [Obsolete("Do not use. Over-ridden by ConnectNative.Dashboard.Widgets.Default which contains the enabled property for this widget.")]
        [SettingKey("ConnectNative.Dashboard.EnableAccountSummaryWidget")]
        public bool EnableAccountSummaryWidget
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// If enabled, show the 'scheduled transfers' widget on the dashboard in Connect Native Browser. Default: true:
        [Obsolete("Do not use. Over-ridden by ConnectNative.Dashboard.Widgets.Default which contains the enabled property for this widget.")]
        [SettingKey("ConnectNative.Dashboard.EnableScheduledTransfersWidget")]
        public bool EnableScheduledTransfersWidget
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// If enabled, show the 'Saved Transfers' widget on the dashboard in Connect Native Browser. Default: true:
        [Obsolete("Do not use. Over-ridden by ConnectNative.Dashboard.Widgets.Default which contains the enabled property for this widget.")]
        [SettingKey("ConnectNative.Dashboard.EnableSavedTransfersWidget")]
        public bool EnableSavedTransfersWidget
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// If enabled, show the 'Cardlytics' widget on the dashboard in Connect Native Browser. (Cardlytics Feature must also be enabled). Default: false:
        [Obsolete("Do not use. Over-ridden by ConnectNative.Dashboard.Widgets.Default which contains the enabled property for this widget.")]
        [SettingKey("ConnectNative.Dashboard.EnableCardlyticsWidget")]
        public bool EnableCardlyticsWidget
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// If enabled, show the 'Savvy Money' widget on the dashboard in Connect Native Browser. (Savvy Money Feature must also be enabled). Default: false:
        [Obsolete("Do not use. Over-ridden by ConnectNative.Dashboard.Widgets.Default which contains the enabled property for this widget.")]
        [SettingKey("ConnectNative.Dashboard.EnableSavvyMoneyWidget")]
        public bool EnableSavvyMoneyWidget
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// If enabled, show the 'Money Desktop' widget on the dashboard in Connect Native Browser. (Money Desktop Feature must also be enabled). Default: false:
        [Obsolete("Do not use. Over-ridden by ConnectNative.Dashboard.Widgets.Default which contains the enabled property for this widget.")]
        [SettingKey("ConnectNative.Dashboard.EnableMoneyDesktopWidget")]
        public bool EnableMoneyDesktopWidget
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// If enabled, show the 'Cunexus' widget on the dashboard in Connect Native Browser. (CuNexus Feature must also be enabled). Default: false:
        [Obsolete("Do not use. Over-ridden by ConnectNative.Dashboard.Widgets.Default which contains the enabled property for this widget.")]
        [SettingKey("ConnectNative.Dashboard.EnableCunexusWidget")]
        public bool EnableCunexusWidget
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// If enabled, show the 'Bill Pay' widget on the dashboard in Connect Native Browser. (mobile.BillPay.Enabled Feature must also be enabled). Default: false:
        [Obsolete("Do not use. Over-ridden by ConnectNative.Dashboard.Widgets.Default which contains the enabled property for this widget.")]
        [SettingKey("ConnectNative.Dashboard.EnableBillPayWidget")]
        public bool EnableBillPayWidget
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// List of widget names that cannot be hidden on the dashboard. comma separated list ie: 'account-summary,scheduled-transfers'
        /// Note: these names MUST match those stored in the dbo.UserConfigDashboard table AND the ConnectNative.Dashboard.Widgets.Default config setting
        /// </summary>
        [SettingKey("ConnectNative.Dashboard.NonHideableWidgets")]
        public List<string> NonHideableWidgets
        {
            get { return GetListValue() ?? new List<string>(); }
            set { SetValue(value); }
        }

        /// <summary>
        /// Enable/Disable new account summary widget
        /// </summary>
        [SettingKey("ConnectNative.Dashboard.EnableNewAccountSummaryWidget")]
        public bool EnableNewAccountSummaryWidget
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// Determines the height of the account summary widget when in 'expanded' mode in rem
        /// </summary>
        [SettingKey("ConnectNative.Dashboard.AccountsWidgetExpandedHeight")]
        public string AccountsWidgetExpandedHeight
        {
            get => GetValue();
            set => SetValue(value);
        }

        /// <summary>
        /// Determines Link in the accounts widget for the 'new account' action
        /// </summary>
        [SettingKey("ConnectNative.Dashboard.AccountsWidgetHeaderLink.NewAccount")]
        public string AccountsWidgetHeaderLinkNewAccount
        {
            get => GetValue();
            set => SetValue(value);
        }

        /// <summary>
        /// Determines Link in the accounts widget for the 'apply for credit card' action
        /// </summary>
        [SettingKey("ConnectNative.Dashboard.AccountsWidgetHeaderLink.CreditCardApply")]
        public string AccountsWidgetHeaderLinkCreditCardApply
        {
            get => GetValue();
            set => SetValue(value);
        }

        /// <summary>
        /// Determines Link in the accounts widget for the 'apply for loan' action
        /// </summary>
        [SettingKey("ConnectNative.Dashboard.AccountsWidgetHeaderLink.LoanApply")]
        public string AccountsWidgetHeaderLinkLoanApply
        {
            get => GetValue();
            set => SetValue(value);
        }

        /// <summary>
        /// Determines Link in the accounts widget for the 'link to account' action
        /// </summary>
        [SettingKey("ConnectNative.Dashboard.AccountsWidgetHeaderLink.LinkAccount")]
        public string AccountsWidgetHeaderLinkLinkAccount
        {
            get => GetValue();
            set => SetValue(value);
        }

        /// <summary>
        /// Determines the height of the cardlytics widget when in 'expanded' mode in rem
        /// </summary>
        [SettingKey("ConnectNative.Dashboard.CardlyticsWidgetExpandedHeight")]
        public string CardlyticsWidgetExpandedHeight
        {
            get => GetValue();
            set => SetValue(value);
        }
    }
}
