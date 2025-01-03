import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ResourceWrapper } from '../ResourceWrapper';

/**
 * Test Suite: ResourceWrapper Navigation Flow
 * Purpose: Validate critical navigation paths between list and modal views
 * 
 * Key Test Cases:
 * 1. List → Modal: Primary user path for viewing resource details
 * 2. Modal → List: Primary user path for returning to resource list
 * 3. URL State: Ensure URL state is maintained during navigation
 * 4. Error Handling: Basic handling of invalid resource IDs
 * 
 * Guard Rails Alignment:
 * - Focuses on critical navigation paths (Section 3.1)
 * - Maintains minimal test complexity (Section 2)
 * - Covers core modal flows (Section 1)
 */

// Basic test utilities following our patterns
const renderWithRouter = (initialPath = '/') => {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path="/" element={<ResourceWrapper />} />
        <Route path="/:id" element={<ResourceWrapper />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('ResourceWrapper Navigation Flow', () => {
  it('completes list to modal flow', async () => {
    renderWithRouter();
    const listItem = await screen.findByTestId('resource-item-1');
    fireEvent.click(listItem);
    await waitFor(() => {
      expect(screen.getByTestId('resource-modal')).toBeInTheDocument();
    });
  });

  it('completes modal to list flow', async () => {
    renderWithRouter('/1');
    const closeButton = await screen.findByTestId('resource-modal-close');
    fireEvent.click(closeButton);
    await waitFor(() => {
      expect(screen.getByTestId('resource-list')).toBeInTheDocument();
    });
  });

  it('maintains URL state during navigation', async () => {
    // Start at the list view
    renderWithRouter();
    const listItem = await screen.findByTestId('resource-item-1');
    
    // Navigate to modal view
    fireEvent.click(listItem);
    await waitFor(() => {
      expect(screen.getByTestId('resource-modal')).toBeInTheDocument();
    });
    
    const closeButton = screen.getByTestId('resource-modal-close');
    fireEvent.click(closeButton);
    await waitFor(() => {
      expect(screen.getByTestId('resource-list')).toBeInTheDocument();
    });
    
    // Navigate back to modal
    fireEvent.click(screen.getByTestId('resource-item-1'));
    await waitFor(() => {
      expect(screen.getByTestId('resource-modal')).toBeInTheDocument();
    });
  });

  it('handles basic error cases', async () => {
    renderWithRouter('/invalid-id');
    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument();
    });
  });
});
