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
import { MemberSearchFilters, MemberStatus, AlertType } from '../../../../types/member-center.types';

interface MemberSearchProps {
  onSearch: (filters: MemberSearchFilters) => void;
}

const searchTypeOptions = [
  { value: 'accountNumber', label: 'Account Number' },



  { value: 'accountNumber', label: 'Account Number' },
  { value: 'name', label: 'Name' },
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
] as const;


      ...prev,





    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={2} alignItems="flex-end">
        <Grid item xs={12} md={3} lg={2}>
          <FormControl fullWidth>
            <InputLabel id="search-type-label">Search By</InputLabel>
            <Select
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
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
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
          >
          </Button>
        </Grid>
      </Grid>
    </Box>
  );

