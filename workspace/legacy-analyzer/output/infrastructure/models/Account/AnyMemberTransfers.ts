// Generated imports
import { RequiredFields } from '../RequiredFields';
import { OptionalFields } from '../OptionalFields';
import { AccountTypes } from '../AccountTypes';
import { AccountTypeMappings } from '../AccountTypeMappings';
import { AccountSuffixMappings } from '../AccountSuffixMappings';

export interface AnyMemberTransfers {
    /** @settingKey Transfers.AnyMember.Enabled */
    enabled: boolean;
    /** @settingKey Transfers.AnyMember.MinVersion */
    minVersion: number;
    /** @settingKey Transfers.AnyMember.RequiredFields */
    list: RequiredFields;
    /** @settingKey Transfers.AnyMember.OptionalFields */
    list: OptionalFields;
    /** @settingKey Transfers.AnyMember.DefaultSuffix */
    defaultSuffix: string;
    /** @settingKey Transfers.AnyMember.AccountTypes */
    list: AccountTypes;
    /** @settingKey Transfers.AnyMember.MaxFailedTransferAttemptsPerDay */
    maxFailedTransferAttemptsPerDay: number;
    /** @settingKey Transfers.AnyMember.MinimumTransferAmount */
    minimumTransferAmount: number;
    /** @settingKey Transfers.AnyMember.AccountTypeMappings */
    dictionary: AccountTypeMappings;
    /** @settingKey Transfers.AnyMember.AccountSuffixMappings */
    dictionary: AccountSuffixMappings;
    /** @settingKey Transfers.AnyMember.FlagNumber */
    accessTypeFlagNumber: number;
    /** @settingKey Transfers.AnyMember.DefaultAccountType */
    defaultAccountType: string;
}
