import { render, screen, waitFor } from '@testing-library/react';
import { renderWithRouter } from '../../../../test-utils/navigation';
import ClientManagementWrapper from './ClientManagementWrapper';
import { act } from 'react-dom/test-utils';
import { Client, ClientType, ClientStatus, Environment as ClientEnvironment } from '../../../types/client.types';
import type { ApiResponse, ApiSuccessResponse, ApiErrorResponse } from '../../../types/api.types';

// Mock the idEncoder utility


// Mock the idEncoder utility




    (global.fetch as jest.Mock).mockClear();


    (global.fetch as jest.Mock).mockImplementationOnce(() =>
    );



    (global.fetch as jest.Mock).mockImplementationOnce(() =>
    );


