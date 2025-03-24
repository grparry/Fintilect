import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
  TextField,
  IconButton,
  Tooltip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { configurationService } from '../../services/factory/ServiceFactory';
import { ConfigurationSetting } from '../../types/configuration.types';
import logger from '../../utils/logger';

interface ConfigurationProps {
  clientId: string;
}

const Configuration: React.FC<ConfigurationProps> = ({ clientId }) => {
  const [settings, setSettings] = useState<ConfigurationSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  useEffect(() => {
    const loadSettings = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await configurationService.getAllSettings();
        setSettings(response.configurations);
        logger.info('Configuration settings loaded successfully');
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load configuration settings';
        logger.error('Error loading configuration settings: ' + message);
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const handleEditClick = (index: number, value: string) => {
    setEditingIndex(index);
    setEditValue(value);
  };

  const handleSaveClick = async (setting: ConfigurationSetting) => {
    try {
      setLoading(true);
      // Create a copy of the setting with the updated value
      const updatedSetting = {
        ...setting,
        configValue: editValue
      };
      
      // Call the service to update the setting
      await configurationService.updateSetting(updatedSetting);
      
      // Update the local state
      const updatedSettings = [...settings];
      updatedSettings[editingIndex as number] = updatedSetting;
      setSettings(updatedSettings);
      
      // Reset editing state
      setEditingIndex(null);
      setEditValue('');
      
      logger.info(`Configuration setting ${setting.configName} updated successfully`);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update configuration setting';
      logger.error('Error updating configuration setting: ' + message);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelClick = () => {
    setEditingIndex(null);
    setEditValue('');
  };

  if (loading && settings.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mb={2}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Configuration Settings
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          View and manage system configuration settings. These settings affect the behavior of the application.
        </Typography>
      </Box>

      <TableContainer 
        component={Paper} 
        sx={{ 
          maxHeight: 'calc(100vh - 400px)', 
          overflow: 'auto',
          flexGrow: 1,
          mb: 4 // Add margin at the bottom
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell width="25%" sx={{ maxWidth: '25%' }}>Name</TableCell>
              <TableCell sx={{ width: '360px' }}>Value</TableCell>
              <TableCell sx={{ width: 'auto' }}>Description</TableCell>
              <TableCell align="center" sx={{ width: '100px' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {settings.map((setting, index) => (
              <TableRow key={setting.id}>
                <TableCell sx={{ verticalAlign: 'top', maxWidth: '25%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  <Tooltip title={setting.configName}>
                    <span>{setting.configName}</span>
                  </Tooltip>
                </TableCell>
                <TableCell 
                  sx={{ 
                    verticalAlign: 'top', 
                    width: '360px',
                    maxWidth: '360px'
                  }}
                >
                  {editingIndex === index ? (
                    <TextField
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      size="small"
                      fullWidth
                    />
                  ) : (
                    <Tooltip title={setting.configValue}>
                      <Typography 
                        variant="body2" 
                        sx={{
                          maxWidth: '350px',
                          display: 'block',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          // Force break on long strings without spaces
                          overflowWrap: 'break-word',
                          wordWrap: 'break-word',
                          hyphens: 'auto',
                          // Limit to one line
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {setting.configValue}
                      </Typography>
                    </Tooltip>
                  )}
                </TableCell>
                <TableCell sx={{ verticalAlign: 'top', maxWidth: '60%', wordBreak: 'break-word' }}>{setting.description}</TableCell>
                <TableCell align="center" sx={{ verticalAlign: 'top', maxWidth: '10%' }}>
                  {editingIndex === index ? (
                    <>
                      <Tooltip title="Save">
                        <IconButton 
                          color="primary" 
                          onClick={() => handleSaveClick(setting)}
                          disabled={loading}
                        >
                          <SaveIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Cancel">
                        <IconButton 
                          color="secondary" 
                          onClick={handleCancelClick}
                          disabled={loading}
                        >
                          <CancelIcon />
                        </IconButton>
                      </Tooltip>
                    </>
                  ) : (
                    <Tooltip title="Edit">
                      <IconButton 
                        color="primary" 
                        onClick={() => handleEditClick(index, setting.configValue)}
                        disabled={loading}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Configuration;
