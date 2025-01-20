// Generated imports
import { Uri } from '../Uri';
import { Authentication } from '../Authentication';

export interface GoToMyCard {
    /** @settingKey GoToMyCard.Enabled */
    enabled: boolean;
    /** @settingKey GoToMyCard.MinVersion */
    minVersion: number;
    /** @settingKey Mobile.GoToMyCard.Url */
    uri: Uri;
    /** @settingKey Mobile.GoToMyCard.MinimumAndroidVersion */
    minimumAndroidVersion: string;
    /** @settingKey Mobile.GoToMyCard.MinimumIosVersion */
    minimumIosVersion: string;
    /** @settingKey GoToMyCard.ServiceUrl */
    serviceUrl: string;
    /** @settingKey GoToMyCard.CertificateName */
    certificateName: string;
    /** @settingKey GoToMyCard.CuNumber */
    cuNumber: string;
    /** @settingKey GoToMyCard.OpenInNewWindow */
    openInNewWindow: boolean;
    mobileConfigurations: Authentication;
}
