import React, { useState, useCallback } from 'react';
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { MemberSearchFilters, MemberStatus, AlertType } from '@/../../../../types/member-center.types';

interface MemberSearchProps {
  onSearch: (filters: MemberSearchFilters) => void;
}

const searchTypeOptions = [
  { value: 'accountNumber', label: 'Account Number' },
  { value: 'name', label: 'Name' },
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
] as const;

const MemberSearch: React.FC<MemberSearchProps> = ({ onSearch }) => {
  const [filters, setFilters] = useState<MemberSearchFilters>({
    searchTerm: '',
    searchType: searchTypeOptions[0].value,
    status: 'all',
    alertType: 'all',
  });

  const handleSearchTypeChange = useCallback((event: React.ChangeEvent<{ value: unknown }>) => {
    setFilters(prev => ({
      ...prev,
      searchType: event.target.value as MemberSearchFilters['searchType'],
    }));
  }, []);

  const handleSearchTermChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, searchTerm: event.target.value }));
  }, []);

  const handleStatusChange = useCallback((event: React.ChangeEvent<{ value: unknown }>) => {
    setFilters(prev => ({ ...prev, status: event.target.value as MemberStatus | 'all' }));
  }, []);

  const handleAlertTypeChange = useCallback((event: React.ChangeEvent<{ value: unknown }>) => {
    setFilters(prev => ({ ...prev, alertType: event.target.value as AlertType | 'all' }));
  }, []);

  const handleSubmit = useCallback((event: React.FormEvent) => {
    event.preventDefault();
    onSearch(filters);
  }, [filters, onSearch]);

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={2} alignItems="flex-end">
        <Grid item xs={12} md={3} lg={2}>
          <FormControl fullWidth>
            <InputLabel id="search-type-label">Search By</InputLabel>
            <Select
              labelId="search-type-label"
              value={filters.searchType}
              onChange={handleSearchTypeChange as any}
              label="Search By"
            >
              {searchTypeOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4} lg={5}>
          <TextField
            fullWidth
            label="Search Term"
            value={filters.searchTerm}
            onChange={handleSearchTermChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              value={filters.status}
              onChange={handleStatusChange as any}
              label="Status"
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
              <MenuItem value="Suspended">Suspended</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth>
            <InputLabel id="alert-type-label">Alert Type</InputLabel>
            <Select
              labelId="alert-type-label"
              value={filters.alertType}
              onChange={handleAlertTypeChange as any}
              label="Alert Type"
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="Security">Security</MenuItem>
              <MenuItem value="Account">Account</MenuItem>
              <MenuItem value="Transaction">Transaction</MenuItem>
              <MenuItem value="System">System</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md="auto">
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<SearchIcon />}
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MemberSearch;
