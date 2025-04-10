import React, { useState, useEffect, useRef } from 'react';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Alert,
  TablePagination,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  LinearProgress,
  Typography,
  CircularProgress,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DownloadIcon from '@mui/icons-material/Download';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';

interface PaginationProps {
  pageNumber: number;
  totalCount: number;
  onPageChange: (page: number, pageSize: number) => void; // Include pageSize in the callback
}

interface ColumnDefinition<T, S extends string> {
  key: string;
  label: string;
  render?: (value: any, row: T) => React.ReactNode;
  sortable?: boolean;
  sortKey?: S; // The enum value to use for sorting
}

// Export configuration options
// Interface for requesting specific pages of data for export
interface PageRequest {
  page: number;
  pageSize: number;
  sortColumn: any;
  sortDirection: 'ASC' | 'DESC';
}

// Interface for data retrieval function
interface PageResponse<T> {
  items: T[];
  pageNumber: number;
  totalCount: number;
}

// Export options interface
interface ExportOptions {
  // Function to get a page of data for paged export (required)
  getPagedData: (request: PageRequest) => Promise<PageResponse<any>>;
  // Maximum page size for fetching data
  maxPageSize?: number;
  // Whether to export only the current page
  currentPageOnly?: boolean;
  // Function to get all data for full export
  getAllData?: () => Promise<any[]>;
  // Maximum number of records to export
  maxRecords?: number;
}

interface ReportTableV2Props<T, S extends string> {
  data: T[];
  columns: ColumnDefinition<T, S>[];
  pagination?: PaginationProps;
  
  // Sort-related props
  sortColumn: S | null;
  sortDirection: 'ASC' | 'DESC';
  onSortChange: (sortColumn: S, sortDirection: 'ASC' | 'DESC') => void;
  
  // CSV export props
  enableExport?: boolean | ExportOptions;
  exportFileName?: string;
}

/**
 * An enhanced table component for displaying report results with integrated sorting
 */
function ReportTableV2<T, S extends string>({
  data,
  columns,
  pagination,
  sortColumn,
  sortDirection,
  onSortChange,
  enableExport = false,
  exportFileName = `export-${new Date().toISOString().split('T')[0]}`
}: ReportTableV2Props<T, S>): React.ReactElement {
  // Loading state to prevent multiple sort operations
  const [isSorting, setIsSorting] = useState(false);
  const [dataVersion, setDataVersion] = useState(0);
  
  // Export dialog and progress state
  const [isExporting, setIsExporting] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportTotal, setExportTotal] = useState(0);
  const [exportedRows, setExportedRows] = useState(0);
  const [exportOption, setExportOption] = useState('current');
  const exportCancelRef = useRef<boolean>(false);
  
  // Track the latest sort operation
  const latestSortRef = React.useRef<{ column: S, direction: 'ASC' | 'DESC', dataVersion: number } | null>(null);
  
  // Internal state for page size with a default value
  const rowsPerPageOptions = [10, 20, 50, 100];
  const defaultPageSize = 20; // Default to 20 records per page
  const [pageSize, setPageSize] = useState<number>(defaultPageSize);
  
  // Flag to track if component is mounted and initialized
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  
  // Debug logging for props
  React.useEffect(() => {
    console.log('ReportTableV2 props updated:', { 
      sortColumn, 
      sortDirection,
      dataLength: data?.length ?? 0
    });
  }, [sortColumn, sortDirection, data]);
  
  // Track data changes
  useEffect(() => {
    // Increment data version when data changes
    setDataVersion(prev => prev + 1);
  }, [data]);
  
  // Effect to detect when sorting is complete
  React.useEffect(() => {
    // If we were sorting, and the props have been updated to match our request,
    // AND the data has been updated (different version than when we started sorting)
    if (isSorting && latestSortRef.current) {
      const { column, direction, dataVersion: sortStartVersion } = latestSortRef.current;
      
      if (sortColumn === column && sortDirection === direction && dataVersion !== sortStartVersion) {
        // The parent has processed our sort request, updated props, and data has changed
        console.log('Sort operation complete with data update, setting isSorting to false');
        setIsSorting(false);
        latestSortRef.current = null;
      }
    }
  }, [sortColumn, sortDirection, isSorting, dataVersion]);
  
  // Force isSorting to false after a timeout to prevent UI from getting stuck
  React.useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    
    if (isSorting) {
      timeoutId = setTimeout(() => {
        console.log('Sort timeout reached, forcing isSorting to false');
        setIsSorting(false);
      }, 10000); // 10 second timeout as a safety measure
      
      // Add a global click capture handler while sorting
      const captureClicks = (e: MouseEvent) => {
        console.log('Click captured during sorting, preventing default');
        e.stopPropagation();
        e.preventDefault();
      };
      
      // Attach the handler with capture phase to intercept all clicks
      document.addEventListener('click', captureClicks, true);
      
      return () => {
        document.removeEventListener('click', captureClicks, true);
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      };
    } else {
      return () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      };
    }
  }, [isSorting]);
  
  // Initialize component on mount
  useEffect(() => {
    console.log('Component mount effect running, setting isInitialized to true');
    setIsInitialized(true);
    return () => {
      console.log('Component unmounting');
    };
  }, []);
  
  // Debug: Log when state changes
  useEffect(() => {
    console.log('pageSize changed to:', pageSize);
  }, [pageSize]);
  
  useEffect(() => {
    console.log('isInitialized changed to:', isInitialized);
  }, [isInitialized]);
  
  // Monitor pageSize changes for debugging only
  useEffect(() => {
    console.log('Pagination state updated:', { pageSize, isInitialized, hasPagination: !!pagination });
    // No longer notifying parent here to avoid circular updates
    // Notification happens only in handleChangeRowsPerPage
  }, [pageSize, pagination, isInitialized]);
  
  // Store the empty state check in a variable for use in the render method
  const isEmpty = !data || data.length === 0;
  
  // Handle sort
  const handleSort = (columnKey: string) => {
    // Prevent multiple sort operations while previous is in progress
    if (isSorting) {
      console.log('Sort operation already in progress, ignoring click');
      return;
    }
    
    console.log('Starting sort operation for column:', columnKey);
    
    const columnDef = columns.find(col => col.key === columnKey);
    if (columnDef && columnDef.sortKey) {
      const newSortColumn = columnDef.sortKey;
      const newSortDirection = 
        sortColumn === newSortColumn
          ? sortDirection === 'ASC' ? 'DESC' : 'ASC'
          : 'DESC'; // Initial sort is descending
      
      // Track the sort operation
      setIsSorting(true);
      latestSortRef.current = { 
        column: newSortColumn, 
        direction: newSortDirection,
        dataVersion: dataVersion // Store current data version
      };
      console.log('Set isSorting to true, latestSortRef updated:', latestSortRef.current);
      
      // Notify parent of sort change
      onSortChange(newSortColumn, newSortDirection);
    }
  };

  // Handle page change
  const handleChangePage = (_event: unknown, newPage: number) => {
    if (pagination) {
      // Convert from 0-based to 1-based and pass the current pageSize
      pagination.onPageChange(newPage + 1, pageSize);
    }
  };

  // Handle navigation to first page
  const handleFirstPage = () => {
    if (pagination && pagination.pageNumber > 1) {
      pagination.onPageChange(1, pageSize);
    }
  };

  // Handle navigation to last page
  const handleLastPage = () => {
    if (pagination) {
      const lastPage = Math.ceil(pagination.totalCount / pageSize);
      if (pagination.pageNumber < lastPage) {
        pagination.onPageChange(lastPage, pageSize);
      }
    }
  };

  // Open export dialog
  const handleOpenExportDialog = () => {
    setShowExportDialog(true);
  };

  // Close export dialog
  const handleCloseExportDialog = () => {
    setShowExportDialog(false);
  };

  // Handle CSV export - current page only
  const handleExportCurrentPage = async () => {
    if (!data || !data.length) return;
    
    try {
      setShowExportDialog(false);
      setIsExporting(true);
      setExportProgress(0);
      setExportTotal(data.length);
      setExportedRows(0);
      
      // Create CSV header row
      const headers = columns.map(col => col.label);
      const csvContent = [headers.join(',')];
      
      // Add data rows for current page
      data.forEach((item, index) => {
        const row = formatRowForCsv(item);
        csvContent.push(row.join(','));
        setExportedRows(index + 1);
        setExportProgress(((index + 1) / data.length) * 100);
      });
      
      // Download the CSV file
      downloadCsv(csvContent, exportFileName);
    } catch (error) {
      console.error('Error during CSV export:', error);
    } finally {
      setIsExporting(false);
    }
  };

  // Handle export cancellation
  const handleCancelExport = () => {
    exportCancelRef.current = true;
  };

  // Handle CSV export - all pages
  const handleExportAllPages = async () => {
    if (!data || !data.length || !pagination) return;
    
    try {
      setShowExportDialog(false);
      setIsExporting(true);
      setExportProgress(0);
      setExportTotal(pagination.totalCount);
      setExportedRows(0);
      exportCancelRef.current = false;
      
      // Get export options
      if (typeof enableExport !== 'object' || !enableExport.getPagedData) {
        console.error('getPagedData function is required for exporting all pages');
        return;
      }
      
      const exportOpts = enableExport;
      const maxPageSize = exportOpts.maxPageSize || 100;
      
      // Create CSV header row
      const headers = columns.map(col => col.label);
      const csvContent = [headers.join(',')];
      
      // Calculate total pages
      const totalPages = Math.ceil(pagination.totalCount / maxPageSize);
      let exportedCount = 0;
      
      // Fetch data page by page
      for (let page = 1; page <= totalPages; page++) {
        const pageRequest: PageRequest = {
          page,
          pageSize: maxPageSize,
          sortColumn,
          sortDirection
        };
        
        console.log(`Fetching page ${page} of ${totalPages} for export`);
        if (exportCancelRef.current) {
          console.log('Export cancelled by user');
          return;
        }

        const pageResponse = await exportOpts.getPagedData(pageRequest);
        
        // Add rows from this page
        pageResponse.items.forEach((item: T) => {
          const row = formatRowForCsv(item);
          csvContent.push(row.join(','));
          exportedCount++;
        });
        
        setExportedRows(exportedCount);
        setExportProgress((page / totalPages) * 100);
      }
      
      // Download the CSV file
      downloadCsv(csvContent, exportFileName);
    } catch (error) {
      console.error('Error during paged CSV export:', error);
    } finally {
      setIsExporting(false);
    }
  };
  
  // Helper function to format a row for CSV
  const formatRowForCsv = (item: any) => {
    return columns.map(col => {
      const key = col.key;
      const value = (item as any)[key];
      
      // Format value if render function exists
      if (col.render && value !== undefined) {
        const renderedValue = col.render(value, item);
        // Handle React elements by converting to string
        const stringValue = typeof renderedValue === 'object' 
          ? '' // Skip React elements
          : String(renderedValue);
        return `"${stringValue.replace(/"/g, '""')}"`;
      }
      
      // Handle different value types
      if (value === undefined || value === null) {
        return '';
      } else if (typeof value === 'string') {
        return `"${value.replace(/"/g, '""')}"`;
      } else {
        return `"${String(value)}"`;
      }
    });
  };
  
  // Helper function to download CSV
  const downloadCsv = (csvContent: string[], fileName: string) => {
    const blob = new Blob([csvContent.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${fileName}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Debug: Log component props on render
  console.log('ReportTableV2 render:', { 
    dataLength: data.length, 
    sortColumn, 
    sortDirection,
    hasPagination: !!pagination,
    paginationProps: pagination ? {
      pageNumber: pagination.pageNumber,
      totalCount: pagination.totalCount
    } : null,
    pageSize
  });
  
  // Handle rows per page change
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPageSize = parseInt(event.target.value, 10);
    console.log('handleChangeRowsPerPage called with new size:', newPageSize);
    
    // First, update the local state
    setPageSize(newPageSize);
    
    if (pagination) {
      // When page size changes, we should reset to page 1 and pass the new page size
      console.log('Page size changed, resetting to page 1 with new size:', newPageSize);
      pagination.onPageChange(1, newPageSize);
    }
  };
  
  // Handle CSV export
  const handleExportCsv = async () => {
    if (!data || !data.length) return;
    
    try {
      setIsExporting(true);
      
      // Determine export configuration
      if (typeof enableExport !== 'object') {
        // Basic export - just use current page data
        const headers = columns.map(col => col.label);
        const rows = data.map((item: T) => formatRowForCsv(item));
        const csvContent = [headers.join(','), ...rows.map(row => row.join(','))];
        downloadCsv(csvContent, exportFileName);
        return;
      }
      
      const exportOptions = enableExport;
      const currentPageOnly = exportOptions.currentPageOnly === true;
      
      // Determine which data to export
      let dataToExport = data; // Default to current page data
      
      // If full data set export is requested and we have a way to get it
      if (!currentPageOnly && exportOptions.getAllData) {
        try {
          console.log('Fetching all data for CSV export...');
          const allData = await exportOptions.getAllData();
          console.log(`Received ${allData.length} records for export`);
          
          // Apply maximum records limit if specified
          if (exportOptions.maxRecords && exportOptions.maxRecords > 0 && 
              allData.length > exportOptions.maxRecords) {
            console.log(`Limiting export to ${exportOptions.maxRecords} records`);
            dataToExport = allData.slice(0, exportOptions.maxRecords);
          } else {
            dataToExport = allData;
          }
        } catch (error) {
          console.error('Error fetching all data for export:', error);
          // Fallback to current page data
          console.log('Falling back to current page data for export');
        }
      }
      
      // Create CSV header row
      const headers = columns.map(col => col.label);
      const csvContent = [headers.join(',')];
    
    // Add data rows
    data.forEach(item => {
      const row = columns.map(col => {
        const key = col.key;
        const value = (item as any)[key];
        
        // Format value if render function exists
        if (col.render && value !== undefined) {
          const renderedValue = col.render(value, item);
          // Handle React elements by converting to string
          const stringValue = typeof renderedValue === 'object' 
            ? '' // Skip React elements
            : String(renderedValue);
          return `"${stringValue.replace(/"/g, '""')}"`;  
        }
        
        // Handle different value types
        if (value === undefined || value === null) {
          return '';
        } else if (typeof value === 'string') {
          return `"${value.replace(/"/g, '""')}"`;  
        } else {
          return `"${String(value)}"`;  
        }
      });
      
      csvContent.push(row.join(','));
    });
    
    // Create and download CSV file
    const blob = new Blob([csvContent.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${exportFileName}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    } catch (error) {
      console.error('Error during CSV export:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Box>
      {isEmpty ? (
        <Alert severity="info">No data available</Alert>
      ) : (
        <>
          {enableExport && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={handleOpenExportDialog}
            size="small"
            disabled={isExporting}
          >
            Export CSV
          </Button>
        </Box>
      )}
      
      {/* Export Dialog */}
      <Dialog
        open={showExportDialog || isExporting}
        onClose={isExporting ? undefined : handleCloseExportDialog}
        aria-labelledby="export-dialog-title"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="export-dialog-title">
          {isExporting ? 'Exporting Data' : 'Export Options'}
        </DialogTitle>
        <DialogContent>
          {isExporting ? (
            <Box sx={{ py: 2 }}>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Exporting data... {exportedRows.toLocaleString()} of {exportTotal.toLocaleString()} rows
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{ width: '100%', mr: 1 }}>
                  <LinearProgress variant="determinate" value={exportProgress} />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                  <Typography variant="body2" color="text.secondary">
                    {Math.round(exportProgress)}%
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  onClick={handleCancelExport}
                  color="error"
                  variant="outlined"
                  size="small"
                >
                  Cancel Export
                </Button>
              </Box>
            </Box>
          ) : (
            <>
              <DialogContentText sx={{ mb: 2 }}>
                Choose what data to export:
              </DialogContentText>
              <FormControl component="fieldset">
                <RadioGroup
                  value={exportOption}
                  onChange={(e) => setExportOption(e.target.value)}
                >
                  <FormControlLabel
                    value="current"
                    control={<Radio />}
                    label={`Current Page (${data.length} rows)`}
                  />
                  {pagination && (
                    <FormControlLabel
                      value="all"
                      control={<Radio />}
                      label={`All Data (${pagination.totalCount.toLocaleString()} rows)`}
                    />
                  )}
                </RadioGroup>
              </FormControl>
              {pagination && pagination.totalCount > 1000 && exportOption === 'all' && (
                <Alert severity="warning" sx={{ mt: 2 }}>
                  Exporting all {pagination.totalCount.toLocaleString()} rows may take some time.
                </Alert>
              )}
            </>
          )}
        </DialogContent>
        {!isExporting && (
          <DialogActions>
            <Button onClick={handleCloseExportDialog}>
              Cancel
            </Button>
            <Button 
              onClick={exportOption === 'current' ? handleExportCurrentPage : handleExportAllPages}
              variant="contained"
            >
              Export
            </Button>
          </DialogActions>
        )}
      </Dialog>
      {/* Blocking overlay for sorting */}
      {isSorting && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Paper
            elevation={24}
            sx={{
              p: 6,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              minWidth: '600px',
              maxWidth: '90%',
              borderRadius: 2,
            }}
          >
            <CircularProgress size={100} />
            <Typography variant="h4">Sorting Data</Typography>
            <Typography variant="body1" color="text.secondary" align="center" sx={{ fontSize: '1.2rem' }}>
              Please wait while the data is being sorted...
            </Typography>
          </Paper>
        </div>
      )}
      <TableContainer component={Paper} sx={{ maxHeight: 500, position: 'relative' }}>
        <Table stickyHeader aria-label="report results table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell 
                  key={column.key}
                  sx={column.sortable ? { 
                    cursor: isSorting ? 'wait' : 'pointer',
                    opacity: isSorting ? 0.7 : 1,
                    pointerEvents: isSorting ? 'none' : 'auto' 
                  } : undefined}
                  onClick={() => column.sortable && !isSorting && handleSort(column.key)}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {column.label}
                    {column.sortable && column.sortKey && sortColumn === column.sortKey && (
                      <>
                        {isSorting && latestSortRef.current?.column === column.sortKey ? (
                          <CircularProgress size={16} sx={{ ml: 0.5 }} />
                        ) : (
                          sortDirection === 'ASC' ? 
                          <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
                          <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
                        )}
                      </>
                    )}
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column) => (
                  <TableCell key={`${rowIndex}-${column.key}`}>
                    {column.render
                      ? column.render((row as any)[column.key], row)
                      : (row as any)[column.key] !== undefined && (row as any)[column.key] !== null
                      ? typeof (row as any)[column.key] === 'object'
                        ? '' 
                        : String((row as any)[column.key])
                      : ''}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      {pagination && isInitialized && (
        <>
          {console.log('Rendering TablePagination with:', { 
            pageNumber: pagination.pageNumber, 
            totalCount: pagination.totalCount,
            pageSize,
            isInitialized
          })}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <Button
              onClick={handleFirstPage}
              disabled={pagination.pageNumber <= 1}
              size="small"
              sx={{ minWidth: 'auto', p: 0.5, mr: 0.5 }}
              aria-label="first page"
            >
              <FirstPageIcon fontSize="small" />
            </Button>
            <TablePagination
              component="div"
              count={pagination.totalCount}
              page={pagination.pageNumber - 1} // Convert from 1-based to 0-based
              onPageChange={handleChangePage}
              rowsPerPage={pageSize} // Use the controlled pageSize state
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={rowsPerPageOptions}
            labelDisplayedRows={({ from, to, count }) => {
            // Calculate the correct range based on our pagination props
            if (data.length === 0) {
              return `0–0 of ${count}`;
            }
            
            // Calculate the correct range based on current page and data length
            const currentPage = pagination.pageNumber - 1; // Convert to 0-based for calculation
            // Use pageSize to ensure consistency with rowsPerPage prop
            const start = currentPage * pageSize + 1;
            const end = Math.min(start + data.length - 1, count);
            
            return `${start}–${end} of ${count}`;
          }}
            />
            <Button
              onClick={handleLastPage}
              disabled={pagination.pageNumber >= Math.ceil(pagination.totalCount / pageSize)}
              size="small"
              sx={{ minWidth: 'auto', p: 0.5, ml: 0.5 }}
              aria-label="last page"
            >
              <LastPageIcon fontSize="small" />
            </Button>
          </Box>
        </>
      )}
        </>
      )}
    </Box>
  );
}

export default ReportTableV2;
