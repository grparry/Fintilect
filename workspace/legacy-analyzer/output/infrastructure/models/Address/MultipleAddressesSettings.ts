// Generated imports
import { AddressTypes } from '../AddressTypes';
import { MultipleAddressesPage } from './MultipleAddressesPage';

export interface MultipleAddressesSettings {
    /** @settingKey MultipleAddresses.Enabled */
    enabled: boolean;
    /** @settingKey MultipleAddresses.AddressTypes */
    list: AddressTypes;
    /** @settingKey MultipleAddresses.AddressTypesToBeValidated */
    addressTypesToBeValidated: string;
    /** @settingKey MultipleAddresses.DefaultAddressType */
    defaultAddressType: string;
    multipleAddressesPage: MultipleAddressesPage;
}
