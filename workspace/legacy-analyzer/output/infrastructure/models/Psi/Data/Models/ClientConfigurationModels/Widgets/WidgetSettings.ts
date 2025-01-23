import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface WidgetSettingsConfig {
    DashboardInitialSortOrder: Record<string, number>;
    ConnectNativeDashboardWidgetsDefault: string;
    EnableAccountSummaryWidget: boolean;
    EnableScheduledTransfersWidget: boolean;
    EnableSavedTransfersWidget: boolean;
    EnableCardlyticsWidget: boolean;
    EnableSavvyMoneyWidget: boolean;
    EnableMoneyDesktopWidget: boolean;
    EnableCunexusWidget: boolean;
    EnableBillPayWidget: boolean;
    NonHideableWidgets: string[];
    EnableNewAccountSummaryWidget: boolean;
    AccountsWidgetExpandedHeight: string;
    AccountsWidgetHeaderLinkNewAccount: string;
    AccountsWidgetHeaderLinkCreditCardApply: string;
    AccountsWidgetHeaderLinkLoanApply: string;
    AccountsWidgetHeaderLinkLinkAccount: string;
    CardlyticsWidgetExpandedHeight: string;
}

export class WidgetSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'WidgetSettings'
    };


            private _dashboardInitialSortOrder: Record<string, number>;
            get dashboardInitialSortOrder(): Record<string, number> {
                return this._dashboardInitialSortOrder;
            }
            set dashboardInitialSortOrder(value: Record<string, number>) {
                this._dashboardInitialSortOrder = value;
            }

            private _connectNativeDashboardWidgetsDefault: string;
            get connectNativeDashboardWidgetsDefault(): string {
                return this._connectNativeDashboardWidgetsDefault;
            }
            set connectNativeDashboardWidgetsDefault(value: string) {
                this._connectNativeDashboardWidgetsDefault = value;
            }

            private _enableAccountSummaryWidget: boolean;
            get enableAccountSummaryWidget(): boolean {
                return this._enableAccountSummaryWidget;
            }
            set enableAccountSummaryWidget(value: boolean) {
                this._enableAccountSummaryWidget = value;
            }

            private _enableScheduledTransfersWidget: boolean;
            get enableScheduledTransfersWidget(): boolean {
                return this._enableScheduledTransfersWidget;
            }
            set enableScheduledTransfersWidget(value: boolean) {
                this._enableScheduledTransfersWidget = value;
            }

            private _enableSavedTransfersWidget: boolean;
            get enableSavedTransfersWidget(): boolean {
                return this._enableSavedTransfersWidget;
            }
            set enableSavedTransfersWidget(value: boolean) {
                this._enableSavedTransfersWidget = value;
            }

            private _enableCardlyticsWidget: boolean;
            get enableCardlyticsWidget(): boolean {
                return this._enableCardlyticsWidget;
            }
            set enableCardlyticsWidget(value: boolean) {
                this._enableCardlyticsWidget = value;
            }

            private _enableSavvyMoneyWidget: boolean;
            get enableSavvyMoneyWidget(): boolean {
                return this._enableSavvyMoneyWidget;
            }
            set enableSavvyMoneyWidget(value: boolean) {
                this._enableSavvyMoneyWidget = value;
            }

            private _enableMoneyDesktopWidget: boolean;
            get enableMoneyDesktopWidget(): boolean {
                return this._enableMoneyDesktopWidget;
            }
            set enableMoneyDesktopWidget(value: boolean) {
                this._enableMoneyDesktopWidget = value;
            }

            private _enableCunexusWidget: boolean;
            get enableCunexusWidget(): boolean {
                return this._enableCunexusWidget;
            }
            set enableCunexusWidget(value: boolean) {
                this._enableCunexusWidget = value;
            }

            private _enableBillPayWidget: boolean;
            get enableBillPayWidget(): boolean {
                return this._enableBillPayWidget;
            }
            set enableBillPayWidget(value: boolean) {
                this._enableBillPayWidget = value;
            }

            private _nonHideableWidgets: string[];
            get nonHideableWidgets(): string[] {
                return this._nonHideableWidgets;
            }
            set nonHideableWidgets(value: string[]) {
                this._nonHideableWidgets = value;
            }

            private _enableNewAccountSummaryWidget: boolean;
            get enableNewAccountSummaryWidget(): boolean {
                return this._enableNewAccountSummaryWidget;
            }
            set enableNewAccountSummaryWidget(value: boolean) {
                this._enableNewAccountSummaryWidget = value;
            }

            private _accountsWidgetExpandedHeight: string;
            get accountsWidgetExpandedHeight(): string {
                return this._accountsWidgetExpandedHeight;
            }
            set accountsWidgetExpandedHeight(value: string) {
                this._accountsWidgetExpandedHeight = value;
            }

            private _accountsWidgetHeaderLinkNewAccount: string;
            get accountsWidgetHeaderLinkNewAccount(): string {
                return this._accountsWidgetHeaderLinkNewAccount;
            }
            set accountsWidgetHeaderLinkNewAccount(value: string) {
                this._accountsWidgetHeaderLinkNewAccount = value;
            }

            private _accountsWidgetHeaderLinkCreditCardApply: string;
            get accountsWidgetHeaderLinkCreditCardApply(): string {
                return this._accountsWidgetHeaderLinkCreditCardApply;
            }
            set accountsWidgetHeaderLinkCreditCardApply(value: string) {
                this._accountsWidgetHeaderLinkCreditCardApply = value;
            }

            private _accountsWidgetHeaderLinkLoanApply: string;
            get accountsWidgetHeaderLinkLoanApply(): string {
                return this._accountsWidgetHeaderLinkLoanApply;
            }
            set accountsWidgetHeaderLinkLoanApply(value: string) {
                this._accountsWidgetHeaderLinkLoanApply = value;
            }

            private _accountsWidgetHeaderLinkLinkAccount: string;
            get accountsWidgetHeaderLinkLinkAccount(): string {
                return this._accountsWidgetHeaderLinkLinkAccount;
            }
            set accountsWidgetHeaderLinkLinkAccount(value: string) {
                this._accountsWidgetHeaderLinkLinkAccount = value;
            }

            private _cardlyticsWidgetExpandedHeight: string;
            get cardlyticsWidgetExpandedHeight(): string {
                return this._cardlyticsWidgetExpandedHeight;
            }
            set cardlyticsWidgetExpandedHeight(value: string) {
                this._cardlyticsWidgetExpandedHeight = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "WidgetSettings.DashboardInitialSortOrder", value: this._dashboardInitialSortOrder, dataType: 'record<string, number>', label: "Dashboard Initial Sort Order" },
                { key: "WidgetSettings.ConnectNativeDashboardWidgetsDefault", value: this._connectNativeDashboardWidgetsDefault, dataType: 'string', label: "Connect Native Dashboard Widgets Default" },
                { key: "WidgetSettings.EnableAccountSummaryWidget", value: this._enableAccountSummaryWidget, dataType: 'boolean', label: "Enable Account Summary Widget" },
                { key: "WidgetSettings.EnableScheduledTransfersWidget", value: this._enableScheduledTransfersWidget, dataType: 'boolean', label: "Enable Scheduled Transfers Widget" },
                { key: "WidgetSettings.EnableSavedTransfersWidget", value: this._enableSavedTransfersWidget, dataType: 'boolean', label: "Enable Saved Transfers Widget" },
                { key: "WidgetSettings.EnableCardlyticsWidget", value: this._enableCardlyticsWidget, dataType: 'boolean', label: "Enable Cardlytics Widget" },
                { key: "WidgetSettings.EnableSavvyMoneyWidget", value: this._enableSavvyMoneyWidget, dataType: 'boolean', label: "Enable Savvy Money Widget" },
                { key: "WidgetSettings.EnableMoneyDesktopWidget", value: this._enableMoneyDesktopWidget, dataType: 'boolean', label: "Enable Money Desktop Widget" },
                { key: "WidgetSettings.EnableCunexusWidget", value: this._enableCunexusWidget, dataType: 'boolean', label: "Enable Cunexus Widget" },
                { key: "WidgetSettings.EnableBillPayWidget", value: this._enableBillPayWidget, dataType: 'boolean', label: "Enable Bill Pay Widget" },
                { key: "WidgetSettings.NonHideableWidgets", value: this._nonHideableWidgets, dataType: 'list<string>', label: "Non Hideable Widgets" },
                { key: "WidgetSettings.EnableNewAccountSummaryWidget", value: this._enableNewAccountSummaryWidget, dataType: 'boolean', label: "Enable New Account Summary Widget" },
                { key: "WidgetSettings.AccountsWidgetExpandedHeight", value: this._accountsWidgetExpandedHeight, dataType: 'string', label: "Accounts Widget Expanded Height" },
                { key: "WidgetSettings.AccountsWidgetHeaderLinkNewAccount", value: this._accountsWidgetHeaderLinkNewAccount, dataType: 'string', label: "Accounts Widget Header Link New Account" },
                { key: "WidgetSettings.AccountsWidgetHeaderLinkCreditCardApply", value: this._accountsWidgetHeaderLinkCreditCardApply, dataType: 'string', label: "Accounts Widget Header Link Credit Card Apply" },
                { key: "WidgetSettings.AccountsWidgetHeaderLinkLoanApply", value: this._accountsWidgetHeaderLinkLoanApply, dataType: 'string', label: "Accounts Widget Header Link Loan Apply" },
                { key: "WidgetSettings.AccountsWidgetHeaderLinkLinkAccount", value: this._accountsWidgetHeaderLinkLinkAccount, dataType: 'string', label: "Accounts Widget Header Link Link Account" },
                { key: "WidgetSettings.CardlyticsWidgetExpandedHeight", value: this._cardlyticsWidgetExpandedHeight, dataType: 'string', label: "Cardlytics Widget Expanded Height" },
            ];
        }

}