// Generated imports
import { CheckingRewardsShareDescriptions } from '../CheckingRewardsShareDescriptions';
import { CheckingRewardsShareCategories } from '../CheckingRewardsShareCategories';

export interface AccountAttributesSettings {
    /** @settingKey Account.Attributes.Enabled */
    accountAttributesEnabled: boolean;
    /** @settingKey Account.Attributes.CheckingRewardsShareDescriptions */
    list: CheckingRewardsShareDescriptions;
    /** @settingKey Account.Attributes.CheckingRewardsShareCategories */
    list: CheckingRewardsShareCategories;
    /** @settingKey X.App.HomeBanking.ShowZeroPrefixOfSuffix */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Determine whether or not to show leading zero's in suffixes.
     * /// /// </summary>
     * /// </summary>
     */
    showZeroPrefixOfSuffix: boolean;
}
