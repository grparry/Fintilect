import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Alert,
  CircularProgress,
  Tabs,
  Tab,
  Chip,
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { SecuritySettings as SecuritySettingsType } from '../../../types/security.types';
import { ServiceFactory } from '../../../services/factory/ServiceFactory';
import MemberSecuritySettings from './MemberSecuritySettings';
import AuditSearch from './AuditSearch';
import { shouldUseMockData } from '../../../config/api.config';

// Get service instances through factory


// Get service instances through factory


      'login_failure': 3,
      'mfa_failure': 2,
      'password_reset': 1



      
      // Get settings through service factory
      
      // Ensure all required fields are present by merging with defaults
        ...defaultSecuritySettings,
        ...response.security
      


        ...prev,
          ...prev.passwordPolicy,
          [field]: value

        ...prev,
          ...prev.loginPolicy,
          [field]: value

        ...prev,
        [field]: value


    
    // Validate settings locally
    
      
      // Update settings through service factory
      


      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );


    <Box>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="h6">Security Settings</Typography>
        {isMockMode && (
          <Chip
          />
        )}
      </Box>

      <Paper sx={{ mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Security Settings" />
          <Tab label="Audit Logs" />
        </Tabs>
      </Paper>

      {activeTab === 0 && settings && (
        <Box sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                      <Switch
                      />
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                      <Switch
                      />
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                      <Switch
                      />
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                      <Switch
                      />
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                      <Switch
                      />
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                      <Switch
                      />
                  />
                </Grid>
              </Grid>
            </Grid>

            {error && (
              <Grid item xs={12}>
                <Typography color="error">{error}</Typography>
              </Grid>
            )}

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                >
                </Button>
                <Button
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}

      {activeTab === 1 && <AuditSearch clientId={clientId} />}
    </Box>
  );

