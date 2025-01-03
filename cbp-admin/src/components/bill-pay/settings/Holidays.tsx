import React, { useState, useEffect, useCallback } from 'react';
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
} from '../../../types/bill-pay.types';

interface FormData {
  name: string;
  date: Dayjs | null;
  type: HolidayType;
  status: HolidayStatus;
}

const initialFormData: FormData = {
  name: '',
  date: dayjs(),
  type: 'Federal',
  status: 'Active',
};

const Holidays: React.FC = () => {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedHoliday, setSelectedHoliday] = useState<Holiday | null>(null);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Holiday Name', flex: 1 },
    { field: 'date', headerName: 'Date', flex: 1 },
    { field: 'type', headerName: 'Holiday Type', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <Box>
          <Tooltip title="Edit">
            <IconButton onClick={() => handleEdit(params.row as Holiday)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={() => handleDelete(params.row.id)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  const fetchHolidays = useCallback(async () => {
    try {
      setLoading(true);
      const data = await holidayService.getHolidays();
      setHolidays(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch holidays');
      console.error('Error fetching holidays:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHolidays();
  }, [fetchHolidays]);

  const handleAdd = useCallback(() => {
    setSelectedHoliday(null);
    setFormData(initialFormData);
    setOpenDialog(true);
  }, []); // No dependencies needed

  const handleEdit = useCallback((holiday: Holiday) => {
    setSelectedHoliday(holiday);
    setFormData({
      name: holiday.name,
      date: dayjs(holiday.date),
      type: holiday.type,
      status: holiday.status,
    });
    setOpenDialog(true);
  }, []); // No dependencies needed

  const handleDelete = useCallback(async (id: number) => {
    try {
      await holidayService.deleteHoliday(id);
      await fetchHolidays();
      setError(null);
    } catch (err) {
      setError('Failed to delete holiday');
      console.error('Error deleting holiday:', err);
    }
  }, [fetchHolidays]); // Depends on fetchHolidays to refresh the list

  const handleSave = useCallback(async () => {
    if (!formData.date || !formData.name.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setSaving(true);
      setError(null);
      
      const holidayData: HolidayInput = {
        name: formData.name.trim(),
        date: formData.date.format('YYYY-MM-DD'),
        type: formData.type,
        status: formData.status,
      };

      if (selectedHoliday) {
        await holidayService.updateHoliday(selectedHoliday.id, holidayData);
      } else {
        await holidayService.createHoliday(holidayData);
      }

      await fetchHolidays();
      setOpenDialog(false);
    } catch (err) {
      setError('Failed to save holiday');
      console.error('Error saving holiday:', err);
    } finally {
      setSaving(false);
    }
  }, [formData, selectedHoliday, fetchHolidays]); // Depends on form data, selected holiday, and refresh function

  const handleImport = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const importedHolidays = await holidayService.importHolidays(file);
      setHolidays(importedHolidays);
      setError(null);
    } catch (err) {
      setError('Failed to import holidays');
      console.error('Error importing holidays:', err);
    }
  }, []);

  const handleExport = useCallback(async () => {
    try {
      const blob = await holidayService.exportHolidays();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `holidays-${dayjs().format('YYYY-MM-DD')}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      setError(null);
    } catch (err) {
      setError('Failed to export holidays');
      console.error('Error exporting holidays:', err);
    }
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h4">Holiday Management</Typography>
          <Box>
            <input
              type="file"
              accept=".csv"
              style={{ display: 'none' }}
              id="import-file"
              onChange={handleImport}
            />
            <label htmlFor="import-file">
              <Button
                component="span"
                variant="outlined"
                startIcon={<FileUploadIcon />}
                sx={{ mr: 1 }}
              >
                Import
              </Button>
            </label>
            <Button
              variant="outlined"
              startIcon={<FileDownloadIcon />}
              onClick={handleExport}
              sx={{ mr: 1 }}
            >
              Export
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAdd}
            >
              Add Holiday
            </Button>
          </Box>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Paper sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={holidays}
            columns={columns}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[5, 10, 20]}
            checkboxSelection
            disableRowSelectionOnClick
            loading={loading}
          />
        </Paper>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>
            {selectedHoliday ? 'Edit Holiday' : 'Add New Holiday'}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
              <TextField
                label="Holiday Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                fullWidth
                required
                error={!formData.name.trim()}
                helperText={!formData.name.trim() ? 'Holiday name is required' : ''}
              />
              <DatePicker
                label="Date"
                value={formData.date}
                onChange={(newValue) => setFormData({ ...formData, date: newValue })}
                sx={{ width: '100%' }}
                slotProps={{
                  textField: {
                    required: true,
                    error: !formData.date,
                    helperText: !formData.date ? 'Date is required' : '',
                  },
                }}
              />
              <FormControl fullWidth>
                <InputLabel>Holiday Type</InputLabel>
                <Select
                  value={formData.type}
                  label="Holiday Type"
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value as HolidayType })
                  }
                >
                  <MenuItem value="Federal">Federal</MenuItem>
                  <MenuItem value="State">State</MenuItem>
                  <MenuItem value="Custom">Custom</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={formData.status}
                  label="Status"
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value as HolidayStatus })
                  }
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={handleSave} variant="contained" disabled={saving}>
              {saving ? 'Saving...' : 'Save'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
};

export default Holidays;
