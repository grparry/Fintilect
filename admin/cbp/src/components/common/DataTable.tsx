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
  onSortChange?: (field: keyof T, sort: 'ASC' | 'DESC') => void;
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
    logger.info({
      message: 'DataTable: Pagination changed',
      tableId,
      newModel
    });
    setPaginationModel(newModel);
    if (onPageChange) {
      onPageChange(newModel.page);
    }
    if (onPageSizeChange) {
      onPageSizeChange(newModel.pageSize);
    }
  };

  const handleSortModelChange = (model: GridSortModel) => {
    if (model.length > 0 && onSortChange) {
      const { field, sort } = model[0];
      logger.info({
        message: 'DataTable: Sort changed',
        tableId,
        field,
        sort
      });
      onSortChange(field as keyof T, sort === 'desc' ? 'DESC' : 'ASC');
    }
  };

  const handleRowClick = (params: GridRowParams<T>) => {
    if (onRowClick) {
      logger.info({
        message: 'DataTable: Row clicked',
        tableId,
        rowId: params.id
      });
      onRowClick(params.row);
    }
  };

  const handleSelectionModelChange = (newModel: GridRowSelectionModel) => {
    if (onSelectionModelChange) {
      logger.info({
        message: 'DataTable: Selection changed',
        tableId,
        selectedRows: newModel
      });
      onSelectionModelChange(newModel);
    }
  };

  if (error) {
    logger.error({
      message: 'DataTable: Error state',
      tableId,
      error
    });
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
        onRowSelectionModelChange={handleSelectionModelChange}
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