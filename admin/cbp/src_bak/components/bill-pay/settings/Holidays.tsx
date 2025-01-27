import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  FormHelperText,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Holiday, HolidayInput, HolidayType, HolidayStatus } from '../../types/bill-pay.types';
import { ServiceFactory } from '../../../services/factory/ServiceFactory';

interface FormData {
  name: string;
  date: Dayjs | null;
  type: HolidayType;
  status: HolidayStatus;
}

const initialFormData: FormData = {
  name: '',
  date: dayjs(),
  type: HolidayType.FEDERAL,
  status: HolidayStatus.ACTIVE,
};

const Holidays: React.FC = () => {
  // State




  // State


  // Load holidays


  // Handle form submission
      
      // Convert form data to HolidayInput

      // Validate holiday data


      // Refresh holidays list
      
      // Reset form

  // Handle holiday deletion

  // Handle dialog open/close


  // Grid columns
    {
    {
    {
    {
    {
        <Box>
          <IconButton
          >
            <EditIcon />
          </IconButton>
          <IconButton
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
  ];

    <Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5">Holidays</Typography>
        <Button
        >
        </Button>
      </Box>

      <DataGrid
      />

      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingId ? 'Edit Holiday' : 'Add Holiday'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
            />

            <DatePicker
            />

            <FormControl fullWidth error={!!validationErrors.type}>
              <InputLabel>Type</InputLabel>
              <Select
              >
                <MenuItem value={HolidayType.FEDERAL}>Federal</MenuItem>
                <MenuItem value={HolidayType.STATE}>State</MenuItem>
                <MenuItem value={HolidayType.CUSTOM}>Custom</MenuItem>
              </Select>
              {validationErrors.type && (
                <FormHelperText>{validationErrors.type}</FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={!!validationErrors.status}>
              <InputLabel>Status</InputLabel>
              <Select
              >
                <MenuItem value={HolidayStatus.ACTIVE}>Active</MenuItem>
                <MenuItem value={HolidayStatus.INACTIVE}>Inactive</MenuItem>
              </Select>
              {validationErrors.status && (
                <FormHelperText>{validationErrors.status}</FormHelperText>
              )}
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingId ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );

