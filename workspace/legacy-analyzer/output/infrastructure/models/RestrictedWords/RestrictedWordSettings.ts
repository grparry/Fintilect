// Generated imports
import { ControlAreas } from '../ControlAreas';

export interface RestrictedWordSettings {
    /** @settingKey RestrictedWords.Enabled */
    enabled: boolean;
    /** @settingKey RestrictedWords.MinVersion */
    minVersion: number;
    /** @settingKey RestrictedWords.ControlAreas */
    list: ControlAreas;
    /** @settingKey RestrictedWords.RestrictedWordList */
    restrictedWordListEncrypted: string;
}
