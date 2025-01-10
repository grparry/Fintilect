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
import { Client as UIClient } from '../../types/client.types';
import { Client as ServiceClient } from '../../services/clients.service';
import { ApiResponse } from '../../utils/api';
import { clientService } from '../../services/clients.service';

interface ContactInformationProps {
  clientId: string;
}

interface ContactInfo {
  name: string;
  email: string;
  phone: string;
}

const ContactInformation: React.FC<ContactInformationProps> = ({ clientId }) => {
  // State
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    name: '',
    email: '',
    phone: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Load initial data
  const loadContactInfo = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response: ApiResponse<ServiceClient> = await clientService.getClient(clientId);
      
      if (response.success) {
        setContactInfo({
          name: response.data.name || '',
          email: '', // Contact email is not part of the service client
          phone: '', // Contact phone is not part of the service client
        });
      } else {
        setError(response.error?.message || 'Failed to load contact information');
      }
    } catch (err) {
      setError('Failed to load contact information');
      console.error('Error loading contact info:', err);
    } finally {
      setLoading(false);
    }
  }, [clientId]);

  useEffect(() => {
    loadContactInfo();
  }, [loadContactInfo]);

  const handleInputChange = useCallback((field: keyof ContactInfo) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setContactInfo((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
    // Clear any previous success/error messages
    setSuccess(null);
    setError(null);
  }, []); // No dependencies needed as it only uses setState

  const handleSave = useCallback(async () => {
    try {
      setSaving(true);
      setError(null);
      const updateData = {
        name: contactInfo.name,
        type: 'ENTERPRISE' as const,
        status: 'ACTIVE' as const,
        environment: 'PRODUCTION' as const,
      };
      const response: ApiResponse<ServiceClient> = await clientService.updateClient(clientId, updateData);

      if (response.success) {
        setSuccess('Contact information updated successfully');
      } else {
        setError(response.error?.message || 'Failed to update contact information');
      }
    } catch (err) {
      setError('Failed to update contact information');
      console.error('Error updating contact info:', err);
    } finally {
      setSaving(false);
    }
  }, [clientId, contactInfo]); // Depends on clientId and current contactInfo

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Contact Information
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
        e.preventDefault();
        handleSave();
      }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Contact Name"
              value={contactInfo.name}
              onChange={handleInputChange('name')}
              disabled={saving}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={contactInfo.email}
              onChange={handleInputChange('email')}
              disabled={saving}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone"
              value={contactInfo.phone}
              onChange={handleInputChange('phone')}
              disabled={saving}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={saving}
              startIcon={<SaveIcon />}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default ContactInformation;
