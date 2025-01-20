// Generated imports
import { CheckDepositVendor } from '../CheckDepositVendor';
import { CheckDepositCameraType } from '../CheckDepositCameraType';
import { CheckDepositAutoCaptureType } from '../CheckDepositAutoCaptureType';
import { RearEndorsementDefaultType } from '../RearEndorsementDefaultType';
import { Authentication } from '../MobileConfigurations/Authentication/Authentication';

export interface CheckDeposit {
    /** @settingKey Mobile.CheckDeposit.MinimumVersion */
    minimumVersion: string;
    /** @settingKey Mobile.CheckDeposit.MinimumAndroidVersion */
    minimumAndroidVersion: string;
    /** @settingKey Mobile.CheckDeposit.MinimumIosVersion */
    minimumIosVersion: string;
    /** @settingKey Mobile.CheckDeposit.Enabled */
    enabled: boolean;
    /** @settingKey Mobile.CheckDeposit.Vendor */
    checkDepositVendor: CheckDepositVendor;
    /** @settingKey Mobile.CheckDeposit.CameraType */
    checkDepositCameraType: CheckDepositCameraType;
    /** @settingKey Mobile.CheckDeposit.DisclosureRequired */
    disclosureRequired: boolean;
    /** @settingKey Mobile.CheckDeposit.AutoCaptureSetting */
    checkDepositAutoCaptureType: CheckDepositAutoCaptureType;
    /** @settingKey Mobile.CheckDeposit.ContrastAdjustmentEnabled */
    contrastAdjustmentEnabled: boolean;
    /** @settingKey Mobile.CheckDeposit.AllowCrossAccountDeposit */
    allowCrossAccountDeposit: boolean;
    /** @settingKey Mobile.CheckDeposit.ImageScalingMinimumAndroidVersion */
    imageScalingMinimumAndroidVersion: string;
    /** @settingKey Mobile.CheckDeposit.ImageScalingMinimumIosVersion */
    imageScalingMinimumIosVersion: string;
    /** @settingKey Mobile.CheckDeposit.RememberAccountPreference */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// ///	If true, provide option to remember user's preferred 'From' account for check deposits
     * /// /// </summary>
     * /// </summary>
     */
    rememberAccountPreference: boolean;
    /** @settingKey Mobile.CheckDeposit.ShowEndorsementInstructions */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// If true, show a popup on mobile app with instructions for how to correctly endorse and prepare a check for mobile deposit.
     * /// /// </summary>
     * /// </summary>
     */
    showEndorsementInstructions: boolean;
    /** @settingKey Mobile.CheckDeposit.Vertifi.RearEndorsementDefault */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Determines default rear check endorsement status. 0 - Not Tested (Default), 1 - Failed, 2 - Passed
     * /// /// </summary>
     * /// </summary>
     */
    rearEndorsementDefaultType: RearEndorsementDefaultType;
    /** @settingKey Mobile.CheckDeposit.ShowMaskedAccountSuffixInAccountName */
    showMaskedAccountSuffixInAccountName: boolean;
    /** @settingKey Mobile.CheckDeposit.AccountNamePattern */
    accountNamePattern: string;
    /** @settingKey Mobile.CheckDeposit.EnableEndorsementUsabilityWarnings */
    enableEndorsementUsabilityWarnings: boolean;
    authentication: Authentication;
}
