import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Chip,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tooltip,
  Divider
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Block as BlockIcon,
  CheckCircle as CheckCircleIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import {
  Device,
  DeviceStatus
} from '../../../types/member-center.types';
import { memberService } from '../../../services/factory/ServiceFactory';

interface ManageDevicesDialogProps {
  open: boolean;
  onClose: () => void;
  memberId: string;
  devices: Device[];
  onDevicesUpdated: (devices: Device[]) => void;
}
const ManageDevicesDialog: React.FC<ManageDevicesDialogProps> = ({
  open,
  onClose,
  memberId,
  devices,
  onDevicesUpdated
}) => {
  const [loading, setLoading] = useState(false);
  const handleToggleDeviceStatus = async (device: Device, newStatus: DeviceStatus) => {
    try {
      setLoading(true);
      // Update the device status
      const updatedDevices = devices.map(d => 
        d.id === device.id 
          ? { ...d, status: newStatus, lastAccess: new Date().toISOString() }
          : d
      );
      // Update devices through the service
      await memberService.updateDevices(memberId, updatedDevices);
      onDevicesUpdated(updatedDevices);
    } catch (error) {
      console.error('Error updating device status:', error);
    } finally {
      setLoading(false);
    }
  };
  const getStatusColor = (status: DeviceStatus) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Inactive':
        return 'error';
      case 'Blocked':
        return 'warning';
      case 'Unverified':
        return 'default';
      default:
        return 'default';
    }
  };
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Manage Registered Devices</DialogTitle>
      <DialogContent>
        <List>
          {devices.map((device) => (
            <React.Fragment key={device.id}>
              <ListItem>
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography variant="subtitle1">{device.name}</Typography>
                      <Chip
                        size="small"
                        label={device.status}
                        color={getStatusColor(device.status)}
                      />
                      {device.trusted && (
                        <Tooltip title="Trusted Device">
                          <CheckCircleIcon color="success" fontSize="small" />
                        </Tooltip>
                      )}
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" color="textSecondary">
                        {device.browser} • {device.operatingSystem}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Last used: {formatDate(device.lastUsed)}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Location: {device.location}
                      </Typography>
                    </Box>
                  }
                />
                <ListItemSecondaryAction>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <Select
                      value={device.status}
                      onChange={(e) => handleToggleDeviceStatus(device, e.target.value as DeviceStatus)}
                      disabled={loading}
                      variant="outlined"
                      sx={{
                        '& .MuiSelect-select': {
                          py: 1
                        }
                      }}
                    >
                      <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="Inactive">Inactive</MenuItem>
                      <MenuItem value="Blocked">Blocked</MenuItem>
                      <MenuItem value="Unverified">Unverified</MenuItem>
                    </Select>
                  </FormControl>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ManageDevicesDialog;