import React, { useState } from 'react';
import {
  DataGrid,
  GridToolbar,
  useGridApiContext,
  gridPageSelector,
  gridPageCountSelector,
  GridRowId,
  GridRowParams,
  GridRowSelectionModel,
} from '@mui/x-data-grid';
import { Box, Alert } from '@mui/material';

interface Column<T> {
  field: keyof T;
  headerName: string;
  width?: number;
  flex?: number;
  sortable?: boolean;
  renderCell?: (params: any) => React.ReactElement;
  align?: 'left' | 'center' | 'right';
}

interface DataTableProps<T> {
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
}

const DataTable = <T extends object>({
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
}: DataTableProps<T>): React.ReactElement => {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: pageSize,
    page: 0,
  });

  // Convert our Column type to GridColDef
  const gridColumns = columns.map((col) => ({
    field: col.field as string,
    headerName: col.headerName,
    width: col.width,
    flex: col.flex,
    sortable: col.sortable,
    renderCell: col.renderCell,
    align: col.align,
  }));

  const handlePaginationModelChange = (newModel: any) => {
    setPaginationModel(newModel);
    if (onPageChange) {
      onPageChange(newModel.page);
    }
    if (onPageSizeChange && newModel.pageSize !== paginationModel.pageSize) {
      onPageSizeChange(newModel.pageSize);
    }
  };

  if (error) {
    return (
      <Box sx={{ width: '100%' }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ height: 400, width: '100%' }} className={className} style={style}>
      <DataGrid
        rows={rows}
        columns={gridColumns}
        loading={loading}
        paginationModel={paginationModel}
        onPaginationModelChange={handlePaginationModelChange}
        pageSizeOptions={rowsPerPageOptions}
        onRowClick={
          onRowClick
            ? (params: GridRowParams) => onRowClick(params.row as T)
            : undefined
        }
        getRowId={getRowId}
        checkboxSelection={checkboxSelection}
        disableRowSelectionOnClick={disableSelectionOnClick}
        rowSelectionModel={selectionModel}
        onRowSelectionModelChange={onSelectionModelChange}
        sortingMode="server"
        onSortModelChange={(model) => {
          if (onSortChange && model.length > 0) {
            onSortChange(
              model[0].field as keyof T,
              model[0].sort as 'asc' | 'desc'
            );
          }
        }}
        slots={{
          toolbar: GridToolbar
        }}
      />
    </Box>
  );
};

export default DataTable;
