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
}: DataTableProps<T>): React.ReactElement => {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize,
  });

  // Convert our Column type to GridColDef
  const gridColumns: GridColDef<T>[] = columns.map((col) => ({
    field: col.field as string,
    headerName: col.headerName,
    width: col.width,
    flex: col.flex,
    sortable: col.sortable ?? true,
    renderCell: col.renderCell,
    align: col.align,
    type: 'string', // Add default type
  }));

  const handlePaginationModelChange = (newModel: GridPaginationModel) => {
    setPaginationModel(newModel);
    if (onPageChange) {
      onPageChange(newModel.page);
    }
    if (onPageSizeChange && newModel.pageSize !== paginationModel.pageSize) {
      onPageSizeChange(newModel.pageSize);
    }
  };

  const handleSortModelChange = (model: GridSortModel) => {
    if (onSortChange && model.length > 0) {
      const { field, sort } = model[0];
      onSortChange(field, sort as 'asc' | 'desc');
    }
  };

  const handleRowClick = (params: GridRowParams<T>) => {
    if (onRowClick) {
      onRowClick(params.row);
    }
  };

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box sx={{ width: '100%', height: 400, ...style }} className={className}>
      <DataGrid<T>
        rows={rows}
        columns={gridColumns}
        loading={loading}
        paginationModel={paginationModel}
        onPaginationModelChange={handlePaginationModelChange}
        pageSizeOptions={rowsPerPageOptions}
        rowCount={rows.length}
        onRowClick={onRowClick ? handleRowClick : undefined}
        checkboxSelection={checkboxSelection}
        disableRowSelectionOnClick={disableSelectionOnClick}
        rowSelectionModel={selectionModel}
        onRowSelectionModelChange={onSelectionModelChange}
        onSortModelChange={handleSortModelChange}
        getRowId={getRowId}
        sx={{
          '& .MuiDataGrid-columnHeader': {
            backgroundColor: 'background.default',
            color: 'text.primary',
            fontWeight: 'bold',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 1,
            borderColor: 'divider',
          },
        }}
      />
    </Box>
  );
};

export default DataTable;
