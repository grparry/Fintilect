import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface CuNexusLoanOfferSsoConfig {
    Enabled: boolean;
    ShouldUseMemberNumber: boolean;
    ShouldShowWidgetOnDashboard: boolean;
    ShouldShowLoanButtonInOlb: boolean;
    CuNexusLoanOfferSsoRequestUrl: string;
    CuNexusLoanOfferResponsiveWidgetIdentifier: string;
    IframeHeightDashboardWidget: string;
    iFrameHeightOlbView: string;
    ShouldUseCorelationPersonNumber: boolean;
}

export class CuNexusLoanOfferSso implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'CuNexusLoanOfferSso'
    };


            private _enabled: boolean;
            get enabled(): boolean {
                return this._enabled;
            }
            set enabled(value: boolean) {
                this._enabled = value;
            }

            private _shouldUseMemberNumber: boolean;
            get shouldUseMemberNumber(): boolean {
                return this._shouldUseMemberNumber;
            }
            set shouldUseMemberNumber(value: boolean) {
                this._shouldUseMemberNumber = value;
            }

            private _shouldShowWidgetOnDashboard: boolean;
            get shouldShowWidgetOnDashboard(): boolean {
                return this._shouldShowWidgetOnDashboard;
            }
            set shouldShowWidgetOnDashboard(value: boolean) {
                this._shouldShowWidgetOnDashboard = value;
            }

            private _shouldShowLoanButtonInOlb: boolean;
            get shouldShowLoanButtonInOlb(): boolean {
                return this._shouldShowLoanButtonInOlb;
            }
            set shouldShowLoanButtonInOlb(value: boolean) {
                this._shouldShowLoanButtonInOlb = value;
            }

            private _cuNexusLoanOfferSsoRequestUrl: string;
            get cuNexusLoanOfferSsoRequestUrl(): string {
                return this._cuNexusLoanOfferSsoRequestUrl;
            }
            set cuNexusLoanOfferSsoRequestUrl(value: string) {
                this._cuNexusLoanOfferSsoRequestUrl = value;
            }

            private _cuNexusLoanOfferResponsiveWidgetIdentifier: string;
            get cuNexusLoanOfferResponsiveWidgetIdentifier(): string {
                return this._cuNexusLoanOfferResponsiveWidgetIdentifier;
            }
            set cuNexusLoanOfferResponsiveWidgetIdentifier(value: string) {
                this._cuNexusLoanOfferResponsiveWidgetIdentifier = value;
            }

            private _iframeHeightDashboardWidget: string;
            get iframeHeightDashboardWidget(): string {
                return this._iframeHeightDashboardWidget;
            }
            set iframeHeightDashboardWidget(value: string) {
                this._iframeHeightDashboardWidget = value;
            }

            private _iFrameHeightOlbView: string;
            get iFrameHeightOlbView(): string {
                return this._iFrameHeightOlbView;
            }
            set iFrameHeightOlbView(value: string) {
                this._iFrameHeightOlbView = value;
            }

            private _shouldUseCorelationPersonNumber: boolean;
            get shouldUseCorelationPersonNumber(): boolean {
                return this._shouldUseCorelationPersonNumber;
            }
            set shouldUseCorelationPersonNumber(value: boolean) {
                this._shouldUseCorelationPersonNumber = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "CuNexusLoanOfferSso.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "CuNexusLoanOfferSso.ShouldUseMemberNumber", value: this._shouldUseMemberNumber, dataType: 'boolean', label: "Should Use Member Number" },
                { key: "CuNexusLoanOfferSso.ShouldShowWidgetOnDashboard", value: this._shouldShowWidgetOnDashboard, dataType: 'boolean', label: "Should Show Widget On Dashboard" },
                { key: "CuNexusLoanOfferSso.ShouldShowLoanButtonInOlb", value: this._shouldShowLoanButtonInOlb, dataType: 'boolean', label: "Should Show Loan Button In Olb" },
                { key: "CuNexusLoanOfferSso.CuNexusLoanOfferSsoRequestUrl", value: this._cuNexusLoanOfferSsoRequestUrl, dataType: 'string', label: "Cu Nexus Loan Offer Sso Request Url" },
                { key: "CuNexusLoanOfferSso.CuNexusLoanOfferResponsiveWidgetIdentifier", value: this._cuNexusLoanOfferResponsiveWidgetIdentifier, dataType: 'string', label: "Cu Nexus Loan Offer Responsive Widget Identifier" },
                { key: "CuNexusLoanOfferSso.IframeHeightDashboardWidget", value: this._iframeHeightDashboardWidget, dataType: 'string', label: "Iframe Height Dashboard Widget" },
                { key: "CuNexusLoanOfferSso.iFrameHeightOlbView", value: this._iFrameHeightOlbView, dataType: 'string', label: "I Frame Height Olb View" },
                { key: "CuNexusLoanOfferSso.ShouldUseCorelationPersonNumber", value: this._shouldUseCorelationPersonNumber, dataType: 'boolean', label: "Should Use Corelation Person Number" },
            ];
        }

}