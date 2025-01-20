// Generated imports
import { Dashboard } from './Dashboard';
import { Summary } from '../Summary';
import { Enrollment } from './Enrollment';

export interface MoneyDesktop {
    /** @settingKey MoneyDesktop.AutoEnrollEnabled */
    autoEnrollEnabled: boolean;
    dashboard: Dashboard;
    summary: Summary;
    enrollment: Enrollment;
}
