// Generated imports
import { LocationSearchProvider } from '../LocationSearchProvider';

export interface LocationSearch {
    /** @settingKey Mobile.LocationSearch.MinimumVersion */
    minimumVersion: string;
    /** @settingKey Mobile.LocationSearch.MinimumAndroidVersion */
    minimumAndroidVersion: string;
    /** @settingKey Mobile.LocationSearch.MinimumIosVersion */
    minimumIosVersion: string;
    /** @settingKey Mobile.LocationSearch.Enabled */
    enabled: boolean;
    /** @settingKey Mobile.LocationSearch.Distance */
    distance: number;
    /** @settingKey Mobile.LocationSearch.Provider */
    locationSearchProvider: LocationSearchProvider;
    /** @settingKey Mobile.LocationSearch.SupportsStreetLocations */
    supportsStreetLocations: boolean;
    /** @settingKey Mobile.LocationSearch.SearchKey */
    searchKey: string;
    /** @settingKey Mobile.LocationSearch.SupportsCustomSearchKeys */
    supportsCustomSearchKeys: boolean;
    /** @settingKey Mobile.LocationSearch.CustomSearchKeysMinimumVersion */
    customSearchKeysMinimumVersion: string;
}
