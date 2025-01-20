// Generated imports
import { Authentication } from '../Authentication';
import { Questions } from '../Questions';

export interface CreditScoreHistorySettings {
    mobileConfigurations: Authentication;
    /** @settingKey CreditScore.History.Enabled */
    enabled: boolean;
    /** @settingKey CreditScore.History.MinVersion */
    minVersion: number;
    /** @settingKey CreditScore.History.MinIosVersion */
    minIosVersion: string;
    /** @settingKey CreditScore.History.MinAndroidVersion */
    minAndroidVersion: string;
    /** @settingKey CreditScore.History.TrackingRecordId */
    trackingRecordId: string;
    /** @settingKey CreditScore.History.SecureMessagingCategory */
    secureMessagingCategory: string;
    /** @settingKey CreditScore.History.Url */
    url: string;
    /** @settingKey CreditScore.History.RateReductionLinkUrl */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// URL link for the Rate Reduction link on Credit Trends
     * /// /// </summary>
     * /// </summary>
     */
    rateReductionLinkUrl: string;
    /** @settingKey CreditScore.History.FaqLinkUrl */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// URL link for the Bonus Cash / FAQ link on Credit Trends
     * /// /// </summary>
     * /// </summary>
     */
    faqLinkUrl: string;
    /** @settingKey CreditScore.History.Questions */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// List of questions for users to select from for secure messaging subject on Credit Trends
     * /// /// </summary>
     * /// </summary>
     */
    list: Questions;
}
