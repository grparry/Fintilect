import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation, Routes, Route, Outlet, Navigate, useMatch } from 'react-router-dom';
import {
  Box,
  Typography,
  Tab,
  Tabs,
  CircularProgress,
  Alert,
  Chip,
} from '@mui/material';
import { Client, Environment, ClientStatus, ClientType } from '../types/client.types';
import { IpAddress } from '../../types/security.types';
import { clientService } from '../../services/factory/ServiceFactory';
import ContactInformation from './ContactInformation';
import GroupsWrapper from './wrappers/GroupsWrapper';
import UsersWrapper from './wrappers/UsersWrapper';
import MemberSecuritySettingsWrapper from './wrappers/MemberSecuritySettingsWrapper';
import AuditSearchWrapper from './wrappers/AuditSearchWrapper';
import { encodeId } from '../../utils/idEncoder';
import logger from '../../utils/logger';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div




    <div
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );





  // Load client data
        ? 'Client not found. Please check the client ID and try again.' 
        : 'Failed to load client data. Please try again later.');


    
    // Extract the last segment of the path


    


      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );

      <Box mb={2}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );

      <Box mb={2}>
        <Alert severity="error">Client not found</Alert>
      </Box>
    );

    <Box>
      <Box display="flex" alignItems="center" mb={3}>
        <Typography variant="h5" component="h1">
          {client.name}
        </Typography>
        <Chip
        />
        <Chip
        />
      </Box>

      <Tabs value={getCurrentTab()} onChange={handleTabChange}>
        <Tab label="Contact Information" />
        <Tab label="Users" />
        <Tab label="Groups" />
        <Tab label="Security Settings" />
        <Tab label="Audit Log" />
      </Tabs>

      <Box mt={3}>
        {children}
      </Box>
    </Box>
  );

