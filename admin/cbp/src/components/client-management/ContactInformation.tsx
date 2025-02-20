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
  sponsorId: string;
  sponsorName: string;
  routingId: string;
}
const ContactInformation: React.FC<ContactInformationProps> = ({ clientId }) => {
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    name: '',
    email: '',
    phone: '',
    sponsorId: '',
    sponsorName: '',
    routingId: '',
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
      if (!client) {
        throw new Error('Client not found');
      }
      setContactInfo({
        name: client.name || '',
        email: client.contactEmail || '',
        phone: client.contactPhone || '',
        sponsorId: client.sponsorId || '',
        sponsorName: client.sponsorName || '',
        routingId: client.routingId || '',
      });
      logger.info(`Contact information loaded for client ${clientId}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      logger.error(`Failed to load contact information: ${errorMessage}`);
      setError('Failed to load contact information. Please try again later.');
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
    setSuccess(null);
    setError(null);
  }, []);
  const handleSave = useCallback(async () => {
    try {
      setSaving(true);
      setError(null);
      await clientService.updateClient(clientId, {
        contactEmail: contactInfo.email,
        contactPhone: contactInfo.phone,
        name: contactInfo.name,
        sponsorId: contactInfo.sponsorId,
        sponsorName: contactInfo.sponsorName,
        routingId: contactInfo.routingId,
      });
      setSuccess('Contact information updated successfully');
      logger.info(`Contact information updated for client ${clientId}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      logger.error(`Failed to update contact information: ${errorMessage}`);
      setError('Failed to update contact information. Please try again later.');
    } finally {
      setSaving(false);
    }
  }, [clientId, contactInfo]);
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom color="text.primary">
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
              label="Name"
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
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }} color="text.primary">
              Sponsor Information
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Sponsor ID"
              value={contactInfo.sponsorId}
              onChange={handleInputChange('sponsorId')}
              disabled={saving}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Sponsor Name"
              value={contactInfo.sponsorName}
              onChange={handleInputChange('sponsorName')}
              disabled={saving}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }} color="text.primary">
              Routing Information
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Routing ID"
              value={contactInfo.routingId}
              onChange={handleInputChange('routingId')}
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