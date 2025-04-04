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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { Client, Environment, ClientType, ClientStatus, ClientContact } from '../../types/client.types';
import { clientService } from '../../services/factory/ServiceFactory';
import logger from '../../utils/logger';

interface ContactInformationProps {
  clientId: string;
  mode: 'info' | 'contacts';
}
interface ContactFormData {
  id?: number;
  name: string;
  email: string;
  phone: string;
  isPrimary: boolean;
  isActive: boolean;
}
const ContactInformation: React.FC<ContactInformationProps> = ({ clientId }) => {
  const [contacts, setContacts] = useState<ClientContact[]>([]);
  const [selectedContact, setSelectedContact] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    isPrimary: false,
    isActive: true,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const loadContacts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const loadedContacts = await clientService.getClientContacts(Number(clientId));
      setContacts(loadedContacts);
      logger.info(`Contacts loaded for client ${clientId}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      logger.error(`Failed to load contacts: ${errorMessage}`);
      setError('Failed to load contacts. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [clientId]);
  useEffect(() => {
    loadContacts();
  }, [loadContacts]);
  const handleInputChange = useCallback((field: keyof ContactFormData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedContact((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
    setSuccess(null);
    setError(null);
  }, []);

  const handleAddNew = useCallback(() => {
    setSelectedContact({
      name: '',
      email: '',
      phone: '',
      isPrimary: false,
      isActive: true,
    });
    setIsEditing(true);
  }, []);

  const handleEdit = useCallback((contact: ClientContact) => {
    setSelectedContact({
      id: contact.id,
      name: contact.name || '',
      email: contact.email || '',
      phone: contact.phone || '',
      isPrimary: contact.isPrimary,
      isActive: contact.isActive,
    });
    setIsEditing(true);
  }, []);

  const handleCancel = useCallback(() => {
    setSelectedContact({
      name: '',
      email: '',
      phone: '',
      isPrimary: false,
      isActive: true,
    });
    setIsEditing(false);
    setError(null);
    setSuccess(null);
  }, []);
  const handleSave = useCallback(async () => {
    try {
      setSaving(true);
      setError(null);

      if (selectedContact.id) {
        await clientService.updateClientContact(Number(clientId), selectedContact.id, {
          id: selectedContact.id,
          name: selectedContact.name,
          email: selectedContact.email,
          phone: selectedContact.phone || undefined,
          isPrimary: selectedContact.isPrimary,
          isActive: selectedContact.isActive
        });
      } else {
        await clientService.createClientContact(Number(clientId), {
          name: selectedContact.name,
          email: selectedContact.email,
          phone: selectedContact.phone || null,
          isPrimary: selectedContact.isPrimary,
          isActive: selectedContact.isActive,
          createdOn: new Date().toISOString(),
          updatedOn: null
        });
      }
      
      await loadContacts();
      setSuccess('Contact saved successfully');
      setIsEditing(false);
      logger.info(`Contact ${selectedContact.id ? 'updated' : 'created'} for client ${clientId}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      logger.error(`Failed to save contact: ${errorMessage}`);
      setError('Failed to save contact. Please try again later.');
    } finally {
      setSaving(false);
    }
  }, [clientId, selectedContact, loadContacts]);
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" color="text.primary">
          Contact Information
        </Typography>
        {!isEditing && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddNew}
            startIcon={<SaveIcon />}
          >
            Add Contact
          </Button>
        )}
      </Box>

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

      {isEditing ? (
        <form onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                value={selectedContact.name}
                onChange={handleInputChange('name')}
                disabled={saving}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={selectedContact.email}
                onChange={handleInputChange('email')}
                disabled={saving}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone"
                value={selectedContact.phone}
                onChange={handleInputChange('phone')}
                disabled={saving}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Primary Contact</InputLabel>
                <Select
                  value={selectedContact.isPrimary}
                  label="Primary Contact"
                  onChange={(e) => setSelectedContact(prev => ({ ...prev, isPrimary: e.target.value === 'true' }))}
                  disabled={saving}
                >
                  <MenuItem value="true">Yes</MenuItem>
                  <MenuItem value="false">No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={saving}
                  startIcon={<SaveIcon />}
                >
                  {saving ? 'Saving...' : 'Save Contact'}
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleCancel}
                  disabled={saving}
                >
                  Cancel
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      ) : (
        <Grid container spacing={2}>
          {contacts.map((contact) => (
            <Grid item xs={12} key={contact.id}>
              <Paper sx={{ p: 2 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs>
                    <Typography variant="subtitle1">{contact.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {contact.email} • {contact.phone || 'No phone'}
                      {contact.isPrimary && ' • Primary Contact'}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleEdit(contact)}
                    >
                      Edit
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Paper>
  );
};
export default ContactInformation;