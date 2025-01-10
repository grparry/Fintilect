import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  IconButton,
  Tooltip,
  Alert,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import dayjs, { Dayjs } from 'dayjs';
import { holidayService } from '../../../services/holiday.service';
import {
  Holiday,
  HolidayInput,
  HolidayType,
  HolidayStatus,
  HolidayValidation
} from '../../../types/bill-pay.types';

interface FormData extends Omit<HolidayInput, 'date'> {
  date: Dayjs | null;
}

const initialFormData: FormData = {
  name: '',
  date: dayjs(),
  type: 'Federal',
  status: 'Active',
};

const Holidays: React.FC = () => {
  // State
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [validationErrors, setValidationErrors] = useState<Partial<Record<keyof HolidayInput, string>>>({});
  const [editingId, setEditingId] = useState<number | null>(null);

  // Load holidays
  useEffect(() => {
    const loadHolidays = async () => {
      try {
        setLoading(true);
        const response = await holidayService.getHolidays();
        setHolidays(response.holidays);
        setError(null);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Failed to load holidays');
      } finally {
        setLoading(false);
      }
    };

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

      if (editingId) {
        await holidayService.updateHoliday(editingId, holidayData);
      } else {
        await holidayService.createHoliday(holidayData);
      }

      // Refresh holidays list
      const response = await holidayService.getHolidays();
      setHolidays(response.holidays);
      
      // Reset form
      handleCloseDialog();
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.message.includes('validation failed')) {
          // Handle validation errors
          const validationMessage = err.message.replace('validation failed: ', '');
          const errors: Partial<Record<keyof HolidayInput, string>> = {};
          validationMessage.split(', ').forEach(errorStr => {
            const [field, message] = errorStr.split(': ');
            if (field && message && field in formData) {
              errors[field as keyof HolidayInput] = message;
            }
          });
          setValidationErrors(errors);
        } else {
          setError(err.message);
        }
      } else {
        setError('Failed to save holiday');
      }
    }
  };

  // Handle holiday deletion
  const handleDelete = async (id: number) => {
    try {
      await holidayService.deleteHoliday(id);
      const response = await holidayService.getHolidays();
      setHolidays(response.holidays);
      setError(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to delete holiday');
    }
  };

  // Handle dialog open/close
  const handleOpenDialog = (holiday?: Holiday) => {
    if (holiday) {
      setFormData({
        name: holiday.name,
        date: dayjs(holiday.date),
        type: holiday.type,
        status: holiday.status,
      });
      setEditingId(holiday.id);
    } else {
      setFormData(initialFormData);
      setEditingId(null);
    }
    setValidationErrors({});
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
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
    },
    {
      field: 'date',
      headerName: 'Date',
      flex: 1,
      valueFormatter: (params) => dayjs(params.value).format('MMM D, YYYY'),
    },
    {
      field: 'type',
      headerName: 'Type',
      flex: 1,
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton
            onClick={() => handleOpenDialog(params.row)}
            size="small"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => handleDelete(params.row.id)}
            size="small"
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
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
        <Typography variant="h5">Holidays</Typography>
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
          {editingId ? 'Edit Holiday' : 'Add Holiday'}
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
              <InputLabel>Type</InputLabel>
              <Select
                value={formData.type}
                label="Type"
                onChange={(e) => setFormData((prev) => ({ ...prev, type: e.target.value as HolidayType }))}
              >
                <MenuItem value="Federal">Federal</MenuItem>
                <MenuItem value="State">State</MenuItem>
                <MenuItem value="Custom">Custom</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth error={!!validationErrors.status}>
              <InputLabel>Status</InputLabel>
              <Select
                value={formData.status}
                label="Status"
                onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value as HolidayStatus }))}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
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
