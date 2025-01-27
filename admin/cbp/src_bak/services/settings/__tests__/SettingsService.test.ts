import { SettingsService } from './index';
import ApiClient from '../../api';
import { ApiSuccessResponse, ApiErrorResponse } from '../../types/api.types';
import { Setting } from '../../../types/settings.types';
import { ValidationResult } from './types';

jest.mock('../../../services/api', () => ({
    __esModule: true,


    __esModule: true,


        // Reset all mocks



            (ApiClient.get as jest.Mock).mockResolvedValue(mockApiResponse);



            (ApiClient.get as jest.Mock).mockRejectedValueOnce(mockResponse);



            (ApiClient.put as jest.Mock).mockResolvedValue(mockApiResponse);



            (ApiClient.put as jest.Mock).mockRejectedValueOnce(mockResponse);




            (ApiClient.get as jest.Mock).mockResolvedValue(mockSettingResponse);



            (ApiClient.get as jest.Mock).mockRejectedValueOnce(mockResponse);




            (ApiClient.get as jest.Mock).mockResolvedValue(mockSettingResponse);

