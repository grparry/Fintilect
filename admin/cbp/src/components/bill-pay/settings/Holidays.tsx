import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, FormControl, InputLabel, FormHelperText, IconButton, Alert } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { Holiday, HolidayInput, HolidayStatus, HolidayType } from '../../../types/calendar.types';
import { ServiceFactory } from '../../../services/factory/ServiceFactory';
import useClientApi from '../../../hooks/useClientApi';
import { isAdminHostname } from '../../../config/host.config';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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
  // Indicate that this component uses client-specific API
  useClientApi(true);

  // State
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [validationErrors, setValidationErrors] = useState<Partial<Record<keyof HolidayInput, string>>>({});
  const [editingId, setEditingId] = useState<number | null>(null);
  const calendarService = ServiceFactory.getInstance().getCalendarService();
  
  // Function to load holidays
  const loadHolidays = async () => {
    try {
      setLoading(true);
      const holidays = await calendarService.getHolidays();
      setHolidays(holidays);
      setError(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load holidays');
    } finally {
      setLoading(false);
    }
  };
  
  // Load holidays on component mount
  useEffect(() => {
    loadHolidays();
  }, []);
  
  // Handle form submission
  const handleSubmit = async () => {
    try {
      setValidationErrors({});
      // Convert form data to HolidayInput
      const holidayData: HolidayInput = {
        name: formData.name.trim(),
        date: formData.date?.format('YYYY-MM-DD') || '',
        type: formData.type,
        status: formData.status,
      };
      // Validate holiday data
      const validation = await calendarService.validateHoliday(holidayData);
      if (!validation.isValid && validation.errors) {
        const errors: Partial<Record<keyof HolidayInput, string>> = {};
        Object.entries(validation.errors).forEach(([field, message]) => {
          if (message) {
            errors[field as keyof HolidayInput] = message || '';
          }
        });
        setValidationErrors(errors);
        return;
      }
      if (editingId) {
        await calendarService.updateHoliday(editingId, holidayData);
      } else {
        await calendarService.createHoliday(holidayData);
      }
      // Refresh holidays list
      await loadHolidays();
      // Reset form
      handleCloseDialog();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to save holiday');
    }
  };
  
  // Handle holiday deletion
  const handleDelete = async (id: number) => {
    try {
      // Find the holiday by ID
      const holidayToDelete = holidays.find(h => h.id === id);
      
      // Check if this is a shared holiday (sponsorID = "0") and we're not on an admin endpoint
      if (holidayToDelete && holidayToDelete.sponsorID === "0" && !isAdminHostname()) {
        setError("Shared holidays (sponsorID = 0) can only be deleted from administrative endpoints.");
        return;
      }
      
      await calendarService.deleteHoliday(id);
      // Refresh the holidays list
      loadHolidays();
    } catch (error) {
      console.error('Error deleting holiday:', error);
      setError('Failed to delete holiday. Please try again.');
    }
  };
  
  // Handle opening the dialog for adding/editing a holiday
  const handleOpenDialog = (holiday?: Holiday) => {
    // Check if this is a shared holiday (sponsorID = "0") and we're not on an admin endpoint
    if (holiday && holiday.sponsorID === "0" && !isAdminHostname()) {
      // Don't allow editing shared holidays on non-admin endpoints
      setError("Shared holidays (sponsorID = 0) can only be edited from administrative endpoints.");
      return;
    }
    
    if (holiday) {
      // Editing an existing holiday
      setEditingId(holiday.id);
      setFormData({
        name: holiday.name,
        date: dayjs(holiday.date),
        type: holiday.type,
        status: holiday.status,
      });
    } else {
      // Adding a new holiday
      setEditingId(null);
      setFormData({
        name: '',
        date: dayjs(),
        type: HolidayType.CUSTOM, // Default to CUSTOM for new client-specific holidays
        status: HolidayStatus.ACTIVE,
      });
    }
    setDialogOpen(true);
  };
  
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setFormData(initialFormData);
    setValidationErrors({});
    setEditingId(null);
  };
  
  // Grid columns
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'date', headerName: 'Date', width: 150 },
    { 
      field: 'type', 
      headerName: 'Type', 
      width: 150,
      valueGetter: (params: { row: Holiday }) => {
        // For display purposes, we can show a more meaningful type based on sponsorID
        if (params.row && params.row.sponsorID === "0") {
          return "Shared";
        }
        return params.row?.type || "Custom";
      }
    },
    { field: 'status', headerName: 'Status', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => {
        // Determine if this holiday can be edited based on sponsorID and admin status
        const isAdmin = isAdminHostname();
        const isSharedHoliday = params.row.sponsorID === "0";
        const canEdit = isAdmin || !isSharedHoliday;
        
        return (
          <Box>
            <IconButton
              onClick={() => handleOpenDialog(params.row)}
              size="small"
              disabled={!canEdit}
              title={!canEdit ? "Shared holidays can only be edited from administrative endpoints" : "Edit holiday"}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => handleDelete(params.row.id)}
              size="small"
              color="error"
              disabled={!canEdit}
              title={!canEdit ? "Shared holidays can only be deleted from administrative endpoints" : "Delete holiday"}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];
  return (
    <Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5" color="text.primary">Holidays</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Holiday
        </Button>
      </Box>
      <DataGrid
        rows={holidays}
        columns={columns}
        loading={loading}
        autoHeight
        disableRowSelectionOnClick
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[10, 25, 50]}
      />
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingId ? 'Edit Holiday' : 'Add Client-Specific Holiday'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Name"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              error={!!validationErrors.name}
              helperText={validationErrors.name}
              fullWidth
            />
            <DatePicker
              label="Date"
              value={formData.date}
              onChange={(value) => setFormData((prev) => ({ ...prev, date: value }))}
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: !!validationErrors.date,
                  helperText: validationErrors.date,
                },
              }}
            />
            <FormControl fullWidth error={!!validationErrors.type}>
              <InputLabel>Category</InputLabel>
              <Select
                value={formData.type}
                label="Category"
                onChange={(e) => setFormData((prev) => ({ ...prev, type: e.target.value as HolidayType }))}
              >
                <MenuItem value={HolidayType.FEDERAL}>Federal</MenuItem>
                <MenuItem value={HolidayType.STATE}>State</MenuItem>
                <MenuItem value={HolidayType.CUSTOM}>Custom</MenuItem>
              </Select>
              <FormHelperText>
                {validationErrors.type || "This category is for display purposes only"}
              </FormHelperText>
            </FormControl>
            <FormControl fullWidth error={!!validationErrors.status}>
              <InputLabel>Status</InputLabel>
              <Select
                value={formData.status}
                label="Status"
                onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value as HolidayStatus }))}
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
};
export default Holidays;