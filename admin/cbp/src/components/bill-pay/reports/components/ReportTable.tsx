import React from 'react';
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
} from '@mui/material';

interface PaginationProps {
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

interface ReportTableProps<T> {
  data: T[];
  columns: {
    key: string;
    label: string;
    render?: (value: any, row: T) => React.ReactNode;
    renderHeader?: () => React.ReactNode;
    sortable?: boolean;
  }[];
  pagination?: PaginationProps;
  onSort?: (columnKey: string) => void;
}

/**
 * A generic table component for displaying report results
 */
function ReportTable<T>({ data, columns, pagination, onSort }: ReportTableProps<T>): React.ReactElement {
  if (!data || data.length === 0) {
    return <Alert severity="info">No data available</Alert>;
  }

  // Handle page change
  const handleChangePage = (_event: unknown, newPage: number) => {
    if (pagination) {
      pagination.onPageChange(newPage + 1); // Convert from 0-based to 1-based
    }
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (pagination) {
      pagination.onPageSizeChange(parseInt(event.target.value, 10));
    }
  };

  return (
    <Box>
      <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="report results table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell 
                  key={column.key}
                  sx={column.sortable ? { cursor: 'pointer' } : undefined}
                  onClick={() => column.sortable && onSort && onSort(column.key)}
                >
                  {column.renderHeader ? column.renderHeader() : column.label}
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
      
      {pagination && (
        <TablePagination
          component="div"
          count={pagination.totalCount}
          page={pagination.pageNumber - 1} // Convert from 1-based to 0-based
          onPageChange={handleChangePage}
          rowsPerPage={pagination.pageSize}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[10, 20, 50, 100]}
          labelDisplayedRows={({ from, to, count }) => 
            `${from}-${to} of ${count !== -1 ? count : `more than ${to}`}`
          }
        />
      )}
    </Box>
  );
}

export default ReportTable;
