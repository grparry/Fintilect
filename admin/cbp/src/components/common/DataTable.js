import React from 'react';
import PropTypes from 'prop-types';
import {
  DataGrid,
  GridToolbar,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid';
import { Pagination, Box } from '@mui/material';

const CustomPagination = () => {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  return (
    <Pagination
      color="primary"
      count={pageCount}
      page={page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
};
const DataTable = ({
  rows,
  columns,
  loading,
  pageSize = 10,
  checkboxSelection = false,
  onSelectionChange,
  getRowId,
  error,
}) => {
  return (
    <Box sx={{ width: '100%', height: 400 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        pagination
        pageSize={pageSize}
        rowsPerPageOptions={[5, 10, 20, 50]}
        checkboxSelection={checkboxSelection}
        onSelectionModelChange={onSelectionChange}
        getRowId={getRowId}
        components={{
          Toolbar: GridToolbar,
          Pagination: CustomPagination,
        }}
        error={error}
        sx={{
          '& .MuiDataGrid-toolbarContainer': {
            padding: 2,
          },
          '& .MuiDataGrid-cell:focus': {
            outline: 'none',
          },
        }}
      />
    </Box>
  );
};
DataTable.propTypes = {
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  pageSize: PropTypes.number,
  checkboxSelection: PropTypes.bool,
  onSelectionChange: PropTypes.func,
  getRowId: PropTypes.func,
  error: PropTypes.string,
};
export default DataTable;