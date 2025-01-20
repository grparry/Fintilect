// Generated imports
import { EmailTypes } from '../EmailTypes';
import { EmailTypesThatCanBeDeleted } from '../EmailTypesThatCanBeDeleted';

export interface MultipleEmailSettings {
    /** @settingKey MultipleEmailAddresses.Enabled */
    enabled: boolean;
    /** @settingKey MultipleEmailAddresses.MinVersion */
    minVersion: number;
    /** @settingKey MultipleEmailAddresses.EmailTypes */
    list: EmailTypes;
    /** @settingKey MultipleEmailAddresses.EmailTypesThatCanBeDeleted */
    list: EmailTypesThatCanBeDeleted;
    /** @settingKey MultipleEmailAddresses.DefaultEmailType */
    defaultEmailType: string;
}
