import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { Dashboard } from './Dashboard';
import { Summary } from './Summary';
import { Enrollment } from './Enrollment';
export interface MoneyDesktopConfig {
    AutoEnrollEnabled: boolean;
    DashboardConfiguration: Dashboard;
    SummaryConfiguration: Summary;
    Enrollment: Enrollment;
}

export class MoneyDesktop implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'MoneyDesktop'
    };


            private _autoEnrollEnabled: boolean;
            get autoEnrollEnabled(): boolean {
                return this._autoEnrollEnabled;
            }
            set autoEnrollEnabled(value: boolean) {
                this._autoEnrollEnabled = value;
            }

            private _dashboardConfiguration: Dashboard;
            get dashboardConfiguration(): Dashboard {
                return this._dashboardConfiguration;
            }
            set dashboardConfiguration(value: Dashboard) {
                this._dashboardConfiguration = value;
            }

            private _summaryConfiguration: Summary;
            get summaryConfiguration(): Summary {
                return this._summaryConfiguration;
            }
            set summaryConfiguration(value: Summary) {
                this._summaryConfiguration = value;
            }

            private _enrollment: Enrollment;
            get enrollment(): Enrollment {
                return this._enrollment;
            }
            set enrollment(value: Enrollment) {
                this._enrollment = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "MoneyDesktop.AutoEnrollEnabled", value: this._autoEnrollEnabled, dataType: 'boolean', label: "Auto Enroll Enabled" },
                { key: "MoneyDesktop.DashboardConfiguration", value: this._dashboardConfiguration, dataType: 'dashboard', label: "Dashboard Configuration" },
                { key: "MoneyDesktop.SummaryConfiguration", value: this._summaryConfiguration, dataType: 'summary', label: "Summary Configuration" },
                { key: "MoneyDesktop.Enrollment", value: this._enrollment, dataType: 'enrollment', label: "Enrollment" },
            ];
        }

}