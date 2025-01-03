import { render, screen, waitFor } from '@testing-library/react';
import { renderWithRouter } from '../../../../test-utils/navigation';
import ClientManagementWrapper from '../ClientManagementWrapper';
import { act } from 'react-dom/test-utils';

// Mock the idEncoder utility
jest.mock('../../../../utils/idEncoder', () => ({
  decodeId: jest.fn((id) => id === 'encoded123' ? 'decoded123' : null)
}));

describe('ClientManagementWrapper', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('renders without client ID', async () => {
    await act(async () => {
      renderWithRouter(<ClientManagementWrapper />, {
        route: '/admin/client-management',
        path: '/admin/client-management/*'
      });
    });
    await waitFor(() => {
      expect(screen.getByText('No client ID provided. Please select a client from the list.')).toBeInTheDocument();
    });
  });

  it('renders with client ID', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ id: 'decoded123', name: 'Test Client' }),
      })
    );

    await act(async () => {
      renderWithRouter(<ClientManagementWrapper />, {
        route: '/admin/client-management/encoded123',
        path: '/admin/client-management/:clientId/*'
      });
    });

    await waitFor(() => {
      expect(screen.queryByText('No client ID provided')).not.toBeInTheDocument();
      expect(screen.queryByText('Invalid client ID format')).not.toBeInTheDocument();
    });
  });

  it('handles invalid client ID', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 404,
      })
    );

    await act(async () => {
      renderWithRouter(<ClientManagementWrapper />, {
        route: '/admin/client-management/invalid-id',
        path: '/admin/client-management/:clientId/*'
      });
    });

    await waitFor(() => {
      expect(screen.getByText('Invalid client ID format. Please select a client from the list.')).toBeInTheDocument();
    });
  });
});
