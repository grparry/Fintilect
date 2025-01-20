// Generated imports
import { DashboardInitialSortOrder } from '../DashboardInitialSortOrder';
import { NonHideableWidgets } from '../NonHideableWidgets';

export interface WidgetSettings {
    /** @settingKey Widgets.DashboardInitialSortOrder */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Sets the initial sort order of the dashboard widgets for initial load. the setting is a .json object in Omega.
     * /// /// If the setting doesn't exist, return null
     * /// /// </summary>
     * /// </summary>
     */
    dictionary: DashboardInitialSortOrder;
    /** @settingKey ConnectNative.Dashboard.Widgets.Default */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Sets the initial sort order of the connect native dashboard widgets for initial load. the setting is a .json object in Omega.
     * /// /// If the setting doesn't exist, return null
     * /// /// </summary>
     * /// </summary>
     */
    connectNativeDashboardWidgetsDefault: string;
    /** @settingKey ConnectNative.Dashboard.EnableAccountSummaryWidget */
    /**
     * /// If enabled, show the 'account summary' widget on the dashboard in Connect Native Browser. Default: true:
     */
    enableAccountSummaryWidget: boolean;
    /** @settingKey ConnectNative.Dashboard.EnableScheduledTransfersWidget */
    /**
     * /// If enabled, show the 'scheduled transfers' widget on the dashboard in Connect Native Browser. Default: true:
     */
    enableScheduledTransfersWidget: boolean;
    /** @settingKey ConnectNative.Dashboard.EnableSavedTransfersWidget */
    /**
     * /// If enabled, show the 'Saved Transfers' widget on the dashboard in Connect Native Browser. Default: true:
     */
    enableSavedTransfersWidget: boolean;
    /** @settingKey ConnectNative.Dashboard.EnableCardlyticsWidget */
    /**
     * /// If enabled, show the 'Cardlytics' widget on the dashboard in Connect Native Browser. (Cardlytics Feature must also be enabled). Default: false:
     */
    enableCardlyticsWidget: boolean;
    /** @settingKey ConnectNative.Dashboard.EnableSavvyMoneyWidget */
    /**
     * /// If enabled, show the 'Savvy Money' widget on the dashboard in Connect Native Browser. (Savvy Money Feature must also be enabled). Default: false:
     */
    enableSavvyMoneyWidget: boolean;
    /** @settingKey ConnectNative.Dashboard.EnableMoneyDesktopWidget */
    /**
     * /// If enabled, show the 'Money Desktop' widget on the dashboard in Connect Native Browser. (Money Desktop Feature must also be enabled). Default: false:
     */
    enableMoneyDesktopWidget: boolean;
    /** @settingKey ConnectNative.Dashboard.EnableCunexusWidget */
    /**
     * /// If enabled, show the 'Cunexus' widget on the dashboard in Connect Native Browser. (CuNexus Feature must also be enabled). Default: false:
     */
    enableCunexusWidget: boolean;
    /** @settingKey ConnectNative.Dashboard.EnableBillPayWidget */
    /**
     * /// If enabled, show the 'Bill Pay' widget on the dashboard in Connect Native Browser. (mobile.BillPay.Enabled Feature must also be enabled). Default: false:
     */
    enableBillPayWidget: boolean;
    /** @settingKey ConnectNative.Dashboard.NonHideableWidgets */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// List of widget names that cannot be hidden on the dashboard. comma separated list ie: 'account-summary,scheduled-transfers'
     * /// /// Note: these names MUST match those stored in the dbo.UserConfigDashboard table AND the ConnectNative.Dashboard.Widgets.Default config setting
     * /// /// </summary>
     * /// </summary>
     */
    list: NonHideableWidgets;
    /** @settingKey ConnectNative.Dashboard.EnableNewAccountSummaryWidget */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Enable/Disable new account summary widget
     * /// /// </summary>
     * /// </summary>
     */
    enableNewAccountSummaryWidget: boolean;
    /** @settingKey ConnectNative.Dashboard.AccountsWidgetExpandedHeight */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Determines the height of the account summary widget when in 'expanded' mode in rem
     * /// /// </summary>
     * /// </summary>
     */
    accountsWidgetExpandedHeight: string;
    /** @settingKey ConnectNative.Dashboard.AccountsWidgetHeaderLink.NewAccount */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Determines Link in the accounts widget for the 'new account' action
     * /// /// </summary>
     * /// </summary>
     */
    accountsWidgetHeaderLinkNewAccount: string;
    /** @settingKey ConnectNative.Dashboard.AccountsWidgetHeaderLink.CreditCardApply */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Determines Link in the accounts widget for the 'apply for credit card' action
     * /// /// </summary>
     * /// </summary>
     */
    accountsWidgetHeaderLinkCreditCardApply: string;
    /** @settingKey ConnectNative.Dashboard.AccountsWidgetHeaderLink.LoanApply */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Determines Link in the accounts widget for the 'apply for loan' action
     * /// /// </summary>
     * /// </summary>
     */
    accountsWidgetHeaderLinkLoanApply: string;
    /** @settingKey ConnectNative.Dashboard.AccountsWidgetHeaderLink.LinkAccount */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Determines Link in the accounts widget for the 'link to account' action
     * /// /// </summary>
     * /// </summary>
     */
    accountsWidgetHeaderLinkLinkAccount: string;
    /** @settingKey ConnectNative.Dashboard.CardlyticsWidgetExpandedHeight */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Determines the height of the cardlytics widget when in 'expanded' mode in rem
     * /// /// </summary>
     * /// </summary>
     */
    cardlyticsWidgetExpandedHeight: string;
}
