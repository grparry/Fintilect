import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Grid,
  Typography,
  Paper,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { Client } from '../../types/client.types';
import { clientService } from '../../services/factory/ServiceFactory';
import logger from '../../utils/logger';

interface ContactInformationProps {
  clientId: string;
}

interface ContactInfo {
  name: string;
  email: string;
  phone: string;
}

const ContactInformation: React.FC<ContactInformationProps> = ({ clientId }) => {
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    name: '',
    email: '',
    phone: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const loadContactInfo = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const client = await clientService.getClient(clientId);
      





      



  ) => {
      ...prev,
      [field]: event.target.value,




      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );

    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      <form onSubmit={(e) => {
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
            />
          </Grid>
          <Grid item xs={12}>
            <Button
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );

