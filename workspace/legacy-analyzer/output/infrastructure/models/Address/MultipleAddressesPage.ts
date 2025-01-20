// Generated imports
import { AddressTypesThatCanBeDeleted } from '../AddressTypesThatCanBeDeleted';

export interface MultipleAddressesPage {
    /** @settingKey MultipleAddresses.MvcPage.Enabled */
    enabled: boolean;
    /** @settingKey MultipleAddresses.MvcPage.MinVersion */
    minVersion: number;
    /** @settingKey MultipleAddresses.MvcPage.DeleteAddressEnabled */
    deleteAddressEnabled: boolean;
    /** @settingKey MultipleAddresses.MvcPage.AddressTypesThatCanBeDeleted */
    list: AddressTypesThatCanBeDeleted;
}
