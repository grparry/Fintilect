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
      const client = await clientService.getClient(clientId);
      // Initialize contact info with default values if not present
      setContactInfo({
        name: client.contactName || '',
        email: client.contactEmail || '',
        phone: client.contactPhone || '',
      });
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
      await clientService.updateClient(clientId, {
        contactName: contactInfo.name,
        contactEmail: contactInfo.email,
        contactPhone: contactInfo.phone,
      });
      setSuccess('Contact information updated successfully');
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
