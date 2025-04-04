/**
 * Unit tests for the ReportTableV2 component
 * focusing on sorting functionality in both controlled and uncontrolled modes.
 */

import React from 'react';
import { render, screen, fireEvent, within, act } from '@testing-library/react';
import '@testing-library/jest-dom';
// Jest globals are now declared in jest-dom.d.ts
import ReportTableV2 from '../ReportTableV2';

// Define test data and types
enum TestSortColumn {
  MemberID = 'MemberID',
  PayeeName = 'PayeeName',
  PayeeID = 'PayeeID',
  UpdatedOn = 'UpdatedOn'
}

interface TestData {
  memberID: string;
  payeeName: string;
  payeeID: string;
  updatedOn: string;
}

// Test data sorted by different columns for verification
const testData: TestData[] = [
  { memberID: '12345', payeeName: 'John Electric', payeeID: 'P001', updatedOn: '2025-01-01' },
  { memberID: '67890', payeeName: 'City Water', payeeID: 'P002', updatedOn: '2025-01-15' },
  { memberID: '54321', payeeName: 'ABC Gas', payeeID: 'P003', updatedOn: '2025-02-01' }
];

const columns = [
  { 
    key: 'memberID', 
    label: 'Member ID',
    sortable: true,
    sortKey: TestSortColumn.MemberID
  },
  { 
    key: 'payeeName', 
    label: 'Payee Name',
    sortable: true,
    sortKey: TestSortColumn.PayeeName
  },
  { 
    key: 'payeeID', 
    label: 'Payee ID',
    sortable: true,
    sortKey: TestSortColumn.PayeeID
  },
  { 
    key: 'updatedOn', 
    label: 'Updated On',
    sortable: true,
    sortKey: TestSortColumn.UpdatedOn,
    render: (value: string) => new Date(value).toLocaleDateString()
  }
];

// Column with no sortKey for testing error handling
const invalidColumns = [
  ...columns.slice(0, 3),
  { 
    key: 'updatedOn', 
    label: 'Updated On',
    sortable: true,
    // Missing sortKey intentionally
    render: (value: string) => new Date(value).toLocaleDateString()
  }
];

describe('ReportTableV2', () => {
  // Basic rendering test
  test('renders table with column headers and data rows', () => {
    render(
      <ReportTableV2
        data={testData}
        columns={columns}
        sortColumn={null}
        sortDirection="ASC"
        onSortChange={() => {}}
      />
    );
    
    // Check column headers
    expect(screen.getByText('Member ID')).toBeInTheDocument();
    expect(screen.getByText('Payee Name')).toBeInTheDocument();
    expect(screen.getByText('Payee ID')).toBeInTheDocument();
    expect(screen.getByText('Updated On')).toBeInTheDocument();
    
    // Check data rows
    expect(screen.getByText('12345')).toBeInTheDocument();
    expect(screen.getByText('John Electric')).toBeInTheDocument();
    expect(screen.getByText('P001')).toBeInTheDocument();
  });
  
  // Controlled mode sorting tests
  describe('Controlled mode sorting', () => {
    test('clicking a sortable column header calls onSortChange with correct parameters', () => {
      // Setup mock callback function
      const onSortChange = jest.fn();
      
      render(
        <ReportTableV2
          data={testData}
          columns={columns}
          sortColumn={TestSortColumn.MemberID}
          sortDirection="ASC"
          onSortChange={onSortChange}
        />
      );
      
      // Click on a different column header
      fireEvent.click(screen.getByText('Payee Name'));
      
      // Verify callback was called with correct parameters
      expect(onSortChange).toHaveBeenCalledWith(TestSortColumn.PayeeName, 'DESC');
    });
    
    test('clicking the current sort column toggles sort direction', () => {
      const onSortChange = jest.fn();
      
      render(
        <ReportTableV2
          data={testData}
          columns={columns}
          sortColumn={TestSortColumn.PayeeName}
          sortDirection="DESC"
          onSortChange={onSortChange}
        />
      );
      
      // Click on the currently sorted column
      fireEvent.click(screen.getByText('Payee Name'));
      
      // Verify direction was toggled
      expect(onSortChange).toHaveBeenCalledWith(TestSortColumn.PayeeName, 'ASC');
    });
    
    test('displays sort indicator on the sorted column', () => {
      render(
        <ReportTableV2
          data={testData}
          columns={columns}
          sortColumn={TestSortColumn.MemberID}
          sortDirection="ASC"
          onSortChange={jest.fn()}
        />
      );
      
      // Find the Member ID column header
      const memberIdHeader = screen.getByText('Member ID').closest('th');
      
      // Verify sort indicator is present
      const sortIndicator = within(memberIdHeader).queryByTestId('ArrowUpwardIcon');
      expect(sortIndicator).toBeInTheDocument();
    });
    
    test('handles partial controlled mode props correctly', () => {
      // This test checks what happens when only some controlled mode props are provided
      // Only providing onSortChange but not sortColumn/sortDirection
      const onSortChange = jest.fn();
      
      render(
        <ReportTableV2
          data={testData}
          columns={columns}
          sortColumn={null}
          sortDirection="ASC"
          onSortChange={onSortChange}
        />
      );
      
      // Click on a sortable column
      fireEvent.click(screen.getByText('Member ID'));
      
      // Verify onSortChange was called with correct parameters
      // Initial sort should be DESC according to the established pattern
      expect(onSortChange).toHaveBeenCalledTimes(1);
      expect(onSortChange).toHaveBeenCalledWith(TestSortColumn.MemberID, 'DESC');
    });
  });
  
  // Uncontrolled mode sorting tests
  describe('Uncontrolled mode sorting', () => {
    test('clicking a column header updates the sort indicator', () => {
      // Use fake timers to control setTimeout
      jest.useFakeTimers();
      
      render(
        <ReportTableV2
          data={testData}
          columns={columns}
          sortColumn={null}
          sortDirection="ASC"
          onSortChange={() => {}}
        />
      );
      
      // Initially no sort indicators should be visible
      expect(screen.queryByTestId('ArrowUpwardIcon')).not.toBeInTheDocument();
      expect(screen.queryByTestId('ArrowDownwardIcon')).not.toBeInTheDocument();
      
      // Get the Member ID header once to avoid ambiguity
      const memberIdHeader = screen.getByText('Member ID').closest('th');
      
      // Click on a column header
      fireEvent.click(memberIdHeader);
      
      // Advance timers to complete the sorting operation
      act(() => {
        jest.advanceTimersByTime(300);
      });
      
      // Verify sort indicator appears (DESC is default for first click)
      const sortIndicator = within(memberIdHeader).queryByTestId('ArrowDownwardIcon');
      expect(sortIndicator).toBeInTheDocument();
      
      // Restore real timers
      jest.useRealTimers();
    });
    
    test('clicking the same column header twice toggles sort direction', () => {
      // Use fake timers to control setTimeout
      jest.useFakeTimers();
      
      render(
        <ReportTableV2
          data={testData}
          columns={columns}
          sortColumn={null}
          sortDirection="ASC"
          onSortChange={() => {}}
        />
      );
      
      // Get the Member ID header once to avoid ambiguity
      const memberIdHeader = screen.getByText('Member ID').closest('th');
      
      // Click on a column header
      fireEvent.click(memberIdHeader);
      
      // Advance timers to complete the sorting operation
      act(() => {
        jest.advanceTimersByTime(300);
      });
      
      // Click again on the same header
      fireEvent.click(memberIdHeader);
      
      // Advance timers to complete the sorting operation
      act(() => {
        jest.advanceTimersByTime(300);
      });
      
      // Verify sort indicator changed to ASC
      const sortIndicator = within(memberIdHeader).queryByTestId('ArrowUpwardIcon');
      expect(sortIndicator).toBeInTheDocument();
      
      // Restore real timers
      jest.useRealTimers();
    });
  });
  
  // Tests for mixed mode behavior
  describe('Mixed mode behavior', () => {
    test('updates sort state when controlled props change', () => {
      // Start with one sort configuration
      const onSortChange = jest.fn();
      const { rerender } = render(
        <ReportTableV2
          data={testData}
          columns={columns}
          sortColumn={TestSortColumn.MemberID}
          sortDirection="ASC"
          onSortChange={onSortChange}
        />
      );
      
      // Verify initial sort indicator is shown
      let memberIdHeader = screen.getByText('Member ID').closest('th');
      expect(within(memberIdHeader).queryByTestId('ArrowUpwardIcon')).toBeInTheDocument();
      
      // Change props to sort by a different column
      rerender(
        <ReportTableV2
          data={testData}
          columns={columns}
          sortColumn={TestSortColumn.PayeeName}
          sortDirection="DESC"
          onSortChange={onSortChange}
        />
      );
      
      // Verify the new sort indicator is shown on the correct column
      const payeeNameHeader = screen.getByText('Payee Name').closest('th');
      expect(within(payeeNameHeader).queryByTestId('ArrowDownwardIcon')).toBeInTheDocument();
      
      // Verify old sort indicator is gone
      memberIdHeader = screen.getByText('Member ID').closest('th');
      expect(within(memberIdHeader).queryByTestId('ArrowUpwardIcon')).not.toBeInTheDocument();
      expect(within(memberIdHeader).queryByTestId('ArrowDownwardIcon')).not.toBeInTheDocument();
    });
    
    test('switching from uncontrolled to controlled mode works correctly', () => {
      // Start with uncontrolled mode
      const { rerender } = render(
        <ReportTableV2
          data={testData}
          columns={columns}
          sortColumn={null}
          sortDirection="ASC"
          onSortChange={() => {}}
        />
      );
      
      // Click to sort a column in uncontrolled mode
      fireEvent.click(screen.getByText('Member ID'));
      
      // Verify sort indicator appears (DESC is default for first click)
      let memberIdHeader = screen.getByText('Member ID').closest('th');
      expect(within(memberIdHeader).queryByTestId('ArrowDownwardIcon')).toBeInTheDocument();
      
      // Now switch to controlled mode
      const onSortChange = jest.fn();
      rerender(
        <ReportTableV2
          data={testData}
          columns={columns}
          sortColumn={TestSortColumn.PayeeName} // Different column
          sortDirection="ASC"
          onSortChange={onSortChange}
        />
      );
      
      // Verify the controlled mode sort is displayed
      const payeeNameHeader = screen.getByText('Payee Name').closest('th');
      expect(within(payeeNameHeader).queryByTestId('ArrowUpwardIcon')).toBeInTheDocument();
      
      // Verify Member ID no longer shows sort indicator
      memberIdHeader = screen.getByText('Member ID').closest('th');
      expect(within(memberIdHeader).queryByTestId('ArrowDownwardIcon')).not.toBeInTheDocument();
      expect(within(memberIdHeader).queryByTestId('ArrowUpwardIcon')).not.toBeInTheDocument();
    });
    
    test('parent can override internal sort state with new props', () => {
      // Start with one sort configuration
      const onSortChange = jest.fn();
      const { rerender } = render(
        <ReportTableV2
          data={testData}
          columns={columns}
          sortColumn={TestSortColumn.MemberID}
          sortDirection="ASC"
          onSortChange={onSortChange}
        />
      );
      
      // Click on a column to change the internal sort state
      fireEvent.click(screen.getByText('Payee Name'));
      
      // Verify the internal state was updated
      let payeeNameHeader = screen.getByText('Payee Name').closest('th');
      expect(within(payeeNameHeader).queryByTestId('ArrowDownwardIcon')).toBeInTheDocument();
      
      // Now the parent explicitly overrides with new props
      rerender(
        <ReportTableV2
          data={testData}
          columns={columns}
          sortColumn={TestSortColumn.PayeeID} // Different column than what was clicked
          sortDirection="ASC"
          onSortChange={onSortChange}
        />
      );
      
      // Verify the component respects the new props
      const payeeIdHeader = screen.getByText('Payee ID').closest('th');
      expect(within(payeeIdHeader).queryByTestId('ArrowUpwardIcon')).toBeInTheDocument();
      
      // And the previous sort indicator is gone
      payeeNameHeader = screen.getByText('Payee Name').closest('th');
      expect(within(payeeNameHeader).queryByTestId('ArrowDownwardIcon')).not.toBeInTheDocument();
    });
  });
  
  // Comprehensive sorting tests
  describe('Comprehensive sorting tests', () => {
    test('changing direction on the initial sort column', () => {
      // Mock callback to verify API calls
      const onSortChange = jest.fn();
      
      // Render with initial sort
      render(
        <ReportTableV2
          data={testData}
          columns={columns}
          sortColumn={TestSortColumn.MemberID}
          sortDirection="ASC"
          onSortChange={onSortChange}
        />
      );
      
      // Verify initial sort indicator
      const memberIdHeader = screen.getByText('Member ID').closest('th');
      expect(within(memberIdHeader).queryByTestId('ArrowUpwardIcon')).toBeInTheDocument();
      
      // Click the same column to change direction
      fireEvent.click(screen.getByText('Member ID'));
      
      // Verify direction changed
      expect(within(memberIdHeader).queryByTestId('ArrowDownwardIcon')).toBeInTheDocument();
      expect(within(memberIdHeader).queryByTestId('ArrowUpwardIcon')).not.toBeInTheDocument();
      
      // Verify callback was called with new direction
      expect(onSortChange).toHaveBeenCalledWith(TestSortColumn.MemberID, 'DESC');
    });
    
    test('changing sort columns', () => {
      // Mock callback to verify API calls
      const onSortChange = jest.fn();
      
      // Render with initial sort
      render(
        <ReportTableV2
          data={testData}
          columns={columns}
          sortColumn={TestSortColumn.MemberID}
          sortDirection="ASC"
          onSortChange={onSortChange}
        />
      );
      
      // Click a different column
      fireEvent.click(screen.getByText('Payee Name'));
      
      // Verify new column shows sort indicator
      const payeeNameHeader = screen.getByText('Payee Name').closest('th');
      expect(within(payeeNameHeader).queryByTestId('ArrowDownwardIcon')).toBeInTheDocument();
      
      // Verify old column no longer shows sort indicator
      const memberIdHeader = screen.getByText('Member ID').closest('th');
      expect(within(memberIdHeader).queryByTestId('ArrowUpwardIcon')).not.toBeInTheDocument();
      expect(within(memberIdHeader).queryByTestId('ArrowDownwardIcon')).not.toBeInTheDocument();
      
      // Verify callback was called with new column and DESC direction
      expect(onSortChange).toHaveBeenCalledWith(TestSortColumn.PayeeName, 'DESC');
    });
    
    test('multiple direction changes on the same column', () => {
      // Mock callback to verify API calls
      const onSortChange = jest.fn();
      
      // Use fake timers to control setTimeout
      jest.useFakeTimers();
      
      // Render with initial sort
      const { rerender } = render(
        <ReportTableV2
          data={testData}
          columns={columns}
          sortColumn={TestSortColumn.MemberID}
          sortDirection="ASC"
          onSortChange={onSortChange}
        />
      );
      
      // Get the Member ID header once to avoid ambiguity
      const memberIdHeader = screen.getByText('Member ID').closest('th');
      
      // First click - change to DESC
      fireEvent.click(memberIdHeader);
      expect(onSortChange).toHaveBeenNthCalledWith(1, TestSortColumn.MemberID, 'DESC');
      
      // Advance timers to complete the sorting operation
      act(() => {
        jest.advanceTimersByTime(300);
      });
      
      // Reset mock to track new calls
      onSortChange.mockClear();
      
      // Update the component to reflect the new direction
      rerender(
        <ReportTableV2
          data={testData}
          columns={columns}
          sortColumn={TestSortColumn.MemberID}
          sortDirection="DESC"
          onSortChange={onSortChange}
        />
      );
      
      // Second click - change back to ASC
      fireEvent.click(memberIdHeader);
      expect(onSortChange).toHaveBeenNthCalledWith(1, TestSortColumn.MemberID, 'ASC');
      
      // Advance timers to complete the sorting operation
      act(() => {
        jest.advanceTimersByTime(300);
      });
      
      // Reset mock to track new calls
      onSortChange.mockClear();
      
      // Update the component to reflect the new direction
      rerender(
        <ReportTableV2
          data={testData}
          columns={columns}
          sortColumn={TestSortColumn.MemberID}
          sortDirection="ASC"
          onSortChange={onSortChange}
        />
      );
      
      // Third click - change to DESC again
      fireEvent.click(memberIdHeader);
      expect(onSortChange).toHaveBeenNthCalledWith(1, TestSortColumn.MemberID, 'DESC');
      
      // Restore real timers
      jest.useRealTimers();
    });
    
    test('all column/direction changes result in API notifications', () => {
      // Mock callback to verify API calls
      const onSortChange = jest.fn();
      
      // Use fake timers to control setTimeout
      jest.useFakeTimers();
      
      // Render with initial sort
      const { rerender } = render(
        <ReportTableV2
          data={testData}
          columns={columns}
          sortColumn={null}
          sortDirection="ASC"
          onSortChange={() => {}}
        />
      );
      
      // Sequence of sort changes to test:
      // 1. Initial click on Member ID -> DESC
      fireEvent.click(screen.getByText('Member ID'));
      expect(onSortChange).toHaveBeenNthCalledWith(1, TestSortColumn.MemberID, 'DESC');
      
      // Advance timers to complete the sorting operation
      act(() => {
        jest.advanceTimersByTime(300);
      });
      
      // Update component to reflect the change
      rerender(
        <ReportTableV2
          data={testData}
          columns={columns}
          sortColumn={TestSortColumn.MemberID}
          sortDirection="DESC"
          onSortChange={onSortChange}
        />
      );
      onSortChange.mockClear();
      
      // 2. Toggle Member ID -> ASC
      fireEvent.click(screen.getByText('Member ID'));
      expect(onSortChange).toHaveBeenNthCalledWith(1, TestSortColumn.MemberID, 'ASC');
      
      // Advance timers to complete the sorting operation
      act(() => {
        jest.advanceTimersByTime(300);
      });
      
      // Update component to reflect the change
      rerender(
        <ReportTableV2
          data={testData}
          columns={columns}
          sortColumn={TestSortColumn.MemberID}
          sortDirection="ASC"
          onSortChange={onSortChange}
        />
      );
      onSortChange.mockClear();
      
      // 3. Switch to Payee Name -> DESC
      fireEvent.click(screen.getByText('Payee Name'));
      expect(onSortChange).toHaveBeenNthCalledWith(1, TestSortColumn.PayeeName, 'DESC');
      
      // Advance timers to complete the sorting operation
      act(() => {
        jest.advanceTimersByTime(300);
      });
      
      // Update component to reflect the change
      rerender(
        <ReportTableV2
          data={testData}
          columns={columns}
          sortColumn={TestSortColumn.PayeeName}
          sortDirection="DESC"
          onSortChange={onSortChange}
        />
      );
      onSortChange.mockClear();
      
      // 4. Toggle Payee Name -> ASC
      fireEvent.click(screen.getByText('Payee Name'));
      expect(onSortChange).toHaveBeenNthCalledWith(1, TestSortColumn.PayeeName, 'ASC');
      
      // 5. Verify total number of API calls
      expect(onSortChange).toHaveBeenCalledTimes(1); // Just the last call after clearing
      
      // Restore real timers
      jest.useRealTimers();
    });
  });
  
  // Edge cases and error handling
  describe('Edge cases and error handling', () => {
    test('prevents multiple sort operations while previous is in progress', () => {
      // Mock callback to verify API calls
      const onSortChange = jest.fn();
      
      // Use fake timers to control setTimeout
      jest.useFakeTimers();
      
      // Render with initial sort
      render(
        <ReportTableV2
          data={testData}
          columns={columns}
          sortColumn={null}
          sortDirection="ASC"
          onSortChange={() => {}}
        />
      );
      
      // Get the Member ID header once to avoid ambiguity
      const memberIdHeader = screen.getByText('Member ID').closest('th');
      
      // First click - should trigger sort
      fireEvent.click(memberIdHeader);
      expect(onSortChange).toHaveBeenCalledTimes(1);
      expect(onSortChange).toHaveBeenCalledWith(TestSortColumn.MemberID, 'DESC');
      
      // Reset mock to track new calls
      onSortChange.mockClear();
      
      // Second click immediately after - should be ignored
      fireEvent.click(memberIdHeader);
      expect(onSortChange).not.toHaveBeenCalled();
      
      // Verify cursor style changed to 'wait'
      expect(memberIdHeader).toHaveStyle('cursor: wait');
      
      // Advance timers to simulate API response completion
      act(() => {
        jest.advanceTimersByTime(300);
      });
      
      // Reset mock to track new calls
      onSortChange.mockClear();
      
      // Now clicking should work again
      fireEvent.click(memberIdHeader);
      expect(onSortChange).toHaveBeenCalledTimes(1);
      
      // Restore real timers
      jest.useRealTimers();
    });
    
    test('clicking a non-sortable column does not trigger sorting', () => {
      const nonSortableColumns = [
        ...columns.slice(0, 3),
        { ...columns[3], sortable: false } // Make the last column non-sortable
      ];
      
      const onSortChange = jest.fn();
      
      render(
        <ReportTableV2
          data={testData}
          columns={nonSortableColumns}
          sortColumn={TestSortColumn.MemberID}
          sortDirection="ASC"
          onSortChange={onSortChange}
        />
      );
      
      // Click on the non-sortable column
      fireEvent.click(screen.getByText('Updated On'));
      
      // Verify callback was not called
      expect(onSortChange).not.toHaveBeenCalled();
    });
    
    test('handles columns with missing sortKey gracefully', () => {
      // This test verifies that the component doesn't crash when a column
      // is marked as sortable but doesn't have a sortKey
      const onSortChange = jest.fn();
      
      // Should render without errors
      render(
        <ReportTableV2
          data={testData}
          columns={invalidColumns}
          sortColumn={null}
          sortDirection="ASC"
          onSortChange={() => {}}
        />
      );
      
      // Click on the column with missing sortKey
      fireEvent.click(screen.getByText('Updated On'));
      
      // Verify the component doesn't crash and callback is not called
      expect(onSortChange).not.toHaveBeenCalled();
    });
  });
  
  // Integration with other features
  describe('Integration with other features', () => {
    test('pagination works alongside sorting', () => {
      const onPageChange = jest.fn();
      const onSortChange = jest.fn();
      
      render(
        <ReportTableV2
          data={testData}
          columns={columns}
          pagination={{
            pageNumber: 1,
            totalCount: 30,
            onPageChange,
            onPageSizeChange: jest.fn()
          }}
          sortColumn={TestSortColumn.MemberID}
          sortDirection="ASC"
          onSortChange={onSortChange}
        />
      );
      
      // Click on a column to sort
      fireEvent.click(screen.getByText('Payee Name'));
      
      // Verify sort callback was called
      expect(onSortChange).toHaveBeenCalledWith(TestSortColumn.PayeeName, 'DESC');
      
      // Verify pagination is still rendered
      expect(screen.getByText('1–10 of 30')).toBeInTheDocument();
    });
    
    test('CSV export works with sorting', () => {
      render(
        <ReportTableV2
          data={testData}
          columns={columns}
          sortColumn={null}
          sortDirection="ASC"
          onSortChange={() => {}}
        />
      );
      
      // Verify export button is rendered
      const exportButton = screen.getByText('Export CSV');
      expect(exportButton).toBeInTheDocument();
      expect(exportButton).toBeEnabled();
    });
  });
});
