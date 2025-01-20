// Generated imports
import { Validation } from '../Validation';
import { SimnetConfiguration } from '../SimnetConfiguration';
import { [CheckImageOutputTypes](../../../CheckImageOutputTypes.md) } from '../[CheckImageOutputTypes](../../../CheckImageOutputTypes.md)';

export interface CheckImages {
    /** @settingKey CheckImages.HideCrossAccountsInAccountsDropDown */
    hideCrossAccountsInAccountsDropDown: boolean;
    /** @settingKey CheckImages.ShowCrossAccountCheckImages */
    showCrossAccountCheckImages: boolean;
    validation: Validation;
    /** @settingKey CheckImages.SymnetConfiguration */
    simnetConfiguration: SimnetConfiguration;
    /** @settingKey CheckImages.OutputType */
    checkImageOutputTypes: [CheckImageOutputTypes](../../../CheckImageOutputTypes.md);
    /** @settingKey CheckImages.CorporateOne.RoutingTransitNumber */
    corporateOneRoutingTransitNumber: string;
    /** @settingKey CheckImages.CorporateOne.SecurityKey */
    corporateOneSecurityKey: string;
    /** @settingKey CheckImages.CorporateOne.Url */
    corporateOneUrl: string;
}
