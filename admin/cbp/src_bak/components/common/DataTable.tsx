import React, { useState } from 'react';
import {
  DataGrid,
  GridColDef,
  GridRowSelectionModel,
  GridSortModel,
  GridPaginationModel,
  GridRowParams,
  GridRenderCellParams,
  GridValidRowModel,
} from '@mui/x-data-grid';
import { Box, Alert } from '@mui/material';
import { ServiceFactory } from '../../services/factory/ServiceFactory';
import logger from '../../utils/logger';

export interface Column<T extends GridValidRowModel> {
  field: keyof T;
  headerName: string;
  width?: number;
  flex?: number;
  sortable?: boolean;
  renderCell?: (params: GridRenderCellParams<T>) => React.ReactElement;
  align?: 'left' | 'center' | 'right';
}

export interface DataTableProps<T extends GridValidRowModel> {
  rows: T[];
  columns: Column<T>[];
  loading?: boolean;
  pageSize?: number;
  rowsPerPageOptions?: number[];
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  onRowClick?: (row: T) => void;
  onSortChange?: (field: keyof T, sort: 'asc' | 'desc') => void;
  getRowId?: (row: T) => string | number;
  selectionModel?: GridRowSelectionModel;
  onSelectionModelChange?: (model: GridRowSelectionModel) => void;
  checkboxSelection?: boolean;
  disableSelectionOnClick?: boolean;
  className?: string;
  style?: React.CSSProperties;
  error?: string;
  tableId?: string;
}

const DataTable = <T extends GridValidRowModel>({
  rows,
  columns,
  loading = false,
  pageSize = 10,
  rowsPerPageOptions = [5, 10, 25],
  onPageChange,
  onPageSizeChange,
  onRowClick,
  onSortChange,
  getRowId,
  selectionModel,
  onSelectionModelChange,
  checkboxSelection = false,
  disableSelectionOnClick = false,
  className,
  style,
  error,
  tableId = 'dynamic-table',
}: DataTableProps<T>): React.ReactElement => {
  const auditService = ServiceFactory.getInstance().getAuditService();
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize,
  });

  logger.info({
    message: 'DataTable: Initializing',
    tableId,
    columns: columns.map(c => ({ field: c.field, headerName: c.headerName })),
    rowCount: rows.length,
    pageSize,
    loading
  });

  // Convert our Column type to GridColDef






  // Convert our Column type to GridColDef



    // Log pagination change to audit service




      // Log sort change to audit service



      // Log row click to audit service



      // Log selection change to audit service



      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );

    <Box sx={{ width: '100%', height: 400, ...style }} className={className}>
      <DataGrid<T>
          '& .MuiDataGrid-columnHeader': {
          '& .MuiDataGrid-cell': {
      />
    </Box>
  );

