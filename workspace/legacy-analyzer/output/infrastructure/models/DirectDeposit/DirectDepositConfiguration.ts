// Generated imports
import { InformationViewAccountCategories } from '../InformationViewAccountCategories';

export interface DirectDepositConfiguration {
    /** @settingKey DirectDeposit.ShowAccountNickname */
    showAccountNickname: boolean;
    /** @settingKey DirectDeposit.ShowMICRText */
    showMICRText: boolean;
    /** @settingKey DirectDeposit.ShouldUsePreviousMicr */
    shouldUsePreviousMicr: boolean;
    /** @settingKey DirectDeposit.ShowMemberName */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If true, show member name on direct deposit information view
     * /// /// </summary>
     * /// </summary>
     */
    shouldShowMemberName: boolean;
    /** @settingKey DirectDeposit.InformationViewAccountCategories */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// comma delimited list of categories to show on the direct deposit information view besides checking accounts with micr numbers. eg: RSA,SDA,IRA
     * /// /// </summary>
     * /// </summary>
     */
    list: InformationViewAccountCategories;
}
