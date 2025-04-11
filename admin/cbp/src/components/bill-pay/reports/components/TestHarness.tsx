import React, { useState, useEffect } from 'react';
import logger from '../../../../utils/logger';
import { 
  Box, 
  Typography, 
  Paper, 
  FormControlLabel, 
  Switch, 
  TextField, 
  Button,
  Slider,
  Grid,
  Divider
} from '@mui/material';
import ReportTableV2 from './ReportTableV2';

// Define our own ColumnDefinition interface to match ReportTableV2's expected type
interface ColumnDefinition<T, S extends string> {
  key: string;
  label: string;
  render?: (value: any, row: T) => React.ReactNode;
  sortable?: boolean;
  sortKey?: S; // The enum value to use for sorting
}

// Function to generate test data with a specified number of records
const generateTestData = (count: number) => {
  const result = [];
  const payeeNames = ['John Electric', 'City Water', 'ABC Gas', 'XYZ Internet', 'Phone Company', 'Cable TV', 'Credit Card', 'Mortgage', 'Insurance', 'Streaming Service'];
  
  for (let i = 0; i < count; i++) {
    const memberIDNum = 10000 + i;
    const payeeIDNum = i % 100 + 1;
    const payeeNameIndex = i % payeeNames.length;
    
    // Create date with some variation
    const date = new Date(2025, 0, 1);
    date.setDate(date.getDate() + i % 365);
    
    result.push({
      memberID: memberIDNum.toString(),
      payeeName: payeeNames[payeeNameIndex] + (Math.floor(i / payeeNames.length) > 0 ? ` ${Math.floor(i / payeeNames.length)}` : ''),
      payeeID: `P${payeeIDNum.toString().padStart(3, '0')}`,
      updatedOn: date.toISOString().split('T')[0]
    });
  }
  
  return result;
};

// Generate 100 records for testing pagination
const testData = generateTestData(100);

// Enum for sort columns
enum TestSortColumn {
  MemberID = 'MemberID',
  PayeeName = 'PayeeName',
  PayeeID = 'PayeeID',
  UpdatedOn = 'UpdatedOn'
}

// Column definitions with proper typing
const columns: ColumnDefinition<typeof testData[0], TestSortColumn>[] = [
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
    sortKey: TestSortColumn.UpdatedOn
  }
];



const TestHarness: React.FC = () => {
  // State for the report table
  const [sortColumn, setSortColumn] = useState<TestSortColumn | null>(null);
  const [sortDirection, setSortDirection] = useState<'ASC' | 'DESC'>('ASC');
  const [apiDelay, setApiDelay] = useState(500);
  const [isLoading, setIsLoading] = useState(false);
  const [logMessages, setLogMessages] = useState<string[]>([]);
  const [showInternalState, setShowInternalState] = useState(true);
  const [sortedData, setSortedData] = useState([...testData]);
  
  // Pagination state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [totalCount, setTotalCount] = useState(testData.length);
  const [paginatedData, setPaginatedData] = useState<typeof testData>([]);
  
  // Add log message
  const addLog = (message: string) => {
    logger.log(`Adding log: ${message}`);
    setLogMessages(prevMessages => {
      const newMessages = [`${new Date().toLocaleTimeString()}: ${message}`, ...prevMessages.slice(0, 9)];
      logger.log('Updated log messages:', newMessages);
      return newMessages;
    });
  };
  
  // Initialize with a log message
  useEffect(() => {
    logger.log('Initializing test harness');
    addLog('Test harness initialized');
  }, []);
  
  // Handle sort change
  const handleSortChange = (newSortColumn: TestSortColumn, newSortDirection: 'ASC' | 'DESC') => {
    logger.log(`Sort changed to ${newSortColumn} ${newSortDirection}`);
    addLog(`Sort changed to ${newSortColumn} ${newSortDirection}`);
    
    // Simulate an API call to fetch sorted data
    setIsLoading(true);
    addLog(`API call started for sort: ${newSortColumn} ${newSortDirection}`);
    
    // Use a Promise to simulate the API call
    new Promise<void>((resolve) => {
      // Simulate network delay
      setTimeout(() => {
        resolve();
      }, apiDelay);
    })
    .then(() => {
      // API call completed, update state
      setSortColumn(newSortColumn);
      setSortDirection(newSortDirection);
      
      // Sort the data based on the new sort parameters
      sortDataBy(newSortColumn, newSortDirection);
      setIsLoading(false);
      addLog(`API call completed, data sorted by ${newSortColumn} ${newSortDirection}`);
    });
  };
  
  // Helper function to sort data by column and direction
  const sortDataBy = (column: TestSortColumn, direction: 'ASC' | 'DESC') => {
    logger.log(`Sorting data by ${column} ${direction}`);
    
    // Create a new array to avoid reference issues
    const sorted = [...testData].sort((a, b) => {
      let valueA: any;
      let valueB: any;
      
      // Map sort column to data property - follow CBP API response property naming conventions
      switch (column) {
        case TestSortColumn.MemberID:
          valueA = a.memberID;
          valueB = b.memberID;
          break;
        case TestSortColumn.PayeeName:
          valueA = a.payeeName;
          valueB = b.payeeName;
          break;
        case TestSortColumn.PayeeID:
          valueA = a.payeeID;
          valueB = b.payeeID;
          break;
        case TestSortColumn.UpdatedOn:
          valueA = new Date(a.updatedOn).getTime();
          valueB = new Date(b.updatedOn).getTime();
          break;
        default:
          return 0;
      }
      
      // Perform the comparison
      if (valueA < valueB) {
        return direction === 'ASC' ? -1 : 1;
      }
      if (valueA > valueB) {
        return direction === 'ASC' ? 1 : -1;
      }
      return 0;
    });
    
    logger.log('Sorted data:', sorted);
    // Force a new array reference to trigger React re-render
    setSortedData([...sorted]);
    
    // Update total count and paginate data
    setTotalCount(sorted.length);
    updatePaginatedData(sorted, page, pageSize);
  };
  
  // Reset controls
  const handleReset = () => {
    setSortColumn(null);
    setSortDirection('ASC');
    setSortedData([...testData]);
    setPage(1);
    setPageSize(20);
    updatePaginatedData([...testData], 1, 20);
    addLog('Reset controls and data');
  };
  
  // Apply controlled values
  const handleApply = () => {
    logger.log(`Applying controlled values: ${sortColumn} ${sortDirection}`);
    addLog(`Applying controlled values: ${sortColumn} ${sortDirection}`);
    sortData();
  };
  
  // Combined handler for page and page size changes
  const handlePageChange = (newPage: number, newPageSize: number) => {
    logger.log(`Page/size changed to page=${newPage}, size=${newPageSize}`, { 
      currentPage: page, 
      newPage, 
      currentPageSize: pageSize, 
      newPageSize 
    });
    
    // Log the change for debugging
    if (newPageSize !== pageSize) {
      addLog(`Page size changed to ${newPageSize}`);
    } else {
      addLog(`Page changed to ${newPage}`);
    }
    
    // Update both state variables
    setPage(newPage);
    setPageSize(newPageSize);
    
    // Update the paginated data with the new values
    logger.log('Updating paginated data with new page/size');
    updatePaginatedData(sortedData, newPage, newPageSize);
  };
  
  // Update paginated data based on current page and page size
  const updatePaginatedData = (data: typeof testData, currentPage: number, currentPageSize: number) => {
    logger.log('updatePaginatedData called with:', { currentPage, currentPageSize, dataLength: data.length });
    const startIndex = (currentPage - 1) * currentPageSize;
    const endIndex = startIndex + currentPageSize;
    const paginatedItems = data.slice(startIndex, endIndex);
    logger.log(`Paginating data: page ${currentPage}, size ${currentPageSize}, items ${paginatedItems.length}`, {
      startIndex,
      endIndex,
      paginatedItemsLength: paginatedItems.length
    });
    setPaginatedData(paginatedItems);
  };
  
  // Sort data based on current sort column and direction
  const sortData = () => {
    if (!sortColumn) {
      const unsortedData = [...testData];
      setSortedData(unsortedData);
      setTotalCount(unsortedData.length);
      updatePaginatedData(unsortedData, page, pageSize);
      addLog('Reset to unsorted data');
      return;
    }
    
    sortDataBy(sortColumn, sortDirection);
    addLog(`Applied sort: ${sortColumn} ${sortDirection}`);
  };
  
  // Initialize paginated data
  useEffect(() => {
    updatePaginatedData(sortedData, page, pageSize);
  }, []);
  
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>ReportTableV2 Test Harness</Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Component Under Test</Typography>
            <ReportTableV2
              data={paginatedData}
              columns={columns}
              sortColumn={sortColumn}
              sortDirection={sortDirection}
              onSortChange={handleSortChange}
              enableExport={{
                getPagedData: async (request) => {
                  // Simulate API call to get paged data
                  await new Promise(resolve => setTimeout(resolve, apiDelay));
                  
                  // Sort and paginate the data
                  const start = (request.page - 1) * request.pageSize;
                  const end = start + request.pageSize;
                  const items = sortedData.slice(start, end);
                  
                  return {
                    items,
                    pageNumber: request.page,
                    totalCount: sortedData.length
                  };
                },
                maxPageSize: 100
              }}
              exportFileName="test-harness-data"
              pagination={{
                pageNumber: page,
                totalCount: totalCount,
                onPageChange: handlePageChange
              }}
              /* Debug props */
              // The following comment shows what's being passed to ReportTableV2
              // {logger.log('Rendering ReportTableV2 with:', { 
              //   paginatedDataLength: paginatedData.length,
              //   page,
              //   totalCount,
              //   sortColumn,
              //   sortDirection
              // })}
            />
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Controls</Typography>
            
            <FormControlLabel
              control={<Switch checked={isLoading} disabled />}
              label="Loading"
              sx={{ mb: 2, display: 'block' }}
            />
            
            <Box sx={{ mb: 2 }}>
              <Typography gutterBottom>API Response Delay (ms): {apiDelay}</Typography>
              <Slider
                value={apiDelay}
                onChange={(_, value) => setApiDelay(value as number)}
                min={0}
                max={2000}
                step={100}
                valueLabelDisplay="auto"
              />
            </Box>
            
            <Typography variant="subtitle2" gutterBottom>Current Sort:</Typography>
            <Box sx={{ mb: 2 }}>
              <TextField
                select
                label="Sort Column"
                value={sortColumn || ''}
                onChange={(e) => {
                  const value = e.target.value;
                  setSortColumn(value ? value as TestSortColumn : null);
                }}
                SelectProps={{ native: true }}
                fullWidth
                margin="dense"
              >
                <option value="">None</option>
                {Object.values(TestSortColumn).map((col) => (
                  <option key={col} value={col}>{col}</option>
                ))}
              </TextField>
              
              <TextField
                select
                label="Sort Direction"
                value={sortDirection}
                onChange={(e) => setSortDirection(e.target.value as 'ASC' | 'DESC')}
                SelectProps={{ native: true }}
                fullWidth
                margin="dense"

              >
                <option value="ASC">Ascending</option>
                <option value="DESC">Descending</option>
              </TextField>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button 
                variant="contained" 
                onClick={handleApply}
              >
                Apply
              </Button>
              <Button 
                variant="outlined" 
                onClick={handleReset}
              >
                Reset
              </Button>
            </Box>
          </Paper>
          
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="h6">Debug Log</Typography>
              <FormControlLabel
                control={<Switch checked={showInternalState} onChange={(e) => setShowInternalState(e.target.checked)} />}
                label="Show State"
              />
            </Box>
            
            {showInternalState && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2">Current State:</Typography>
                <Typography variant="body2" component="pre" sx={{ 
                  p: 1, 
                  bgcolor: 'grey.100', 
                  borderRadius: 1,
                  maxHeight: '100px',
                  overflow: 'auto'
                }}>
                  {JSON.stringify({ sortColumn, sortDirection, apiDelay, isLoading, page, pageSize, totalCount, dataLength: paginatedData.length }, null, 2)}
                </Typography>
              </Box>
            )}
            
            <Divider sx={{ my: 1 }} />
            
            <Typography variant="subtitle2">Event Log:</Typography>
            <Box sx={{ 
              p: 1, 
              bgcolor: 'grey.100', 
              borderRadius: 1, 
              maxHeight: '200px',
              overflow: 'auto'
            }}>
              {logMessages.length > 0 ? (
                logMessages.map((msg, i) => (
                  <Typography key={i} variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
                    {msg}
                  </Typography>
                ))
              ) : (
                <Typography variant="body2" sx={{ fontStyle: 'italic' }}>No events logged yet</Typography>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TestHarness;
