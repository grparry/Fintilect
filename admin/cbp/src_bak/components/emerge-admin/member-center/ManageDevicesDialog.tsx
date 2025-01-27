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
import { Device, DeviceStatus } from '../../types/member-center.types';
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
          ? { ...d, status: newStatus, lastAccess: new Date().toISOString() }
          : d
      );

      // Update devices through the service



    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Manage Registered Devices</DialogTitle>
      <DialogContent>
        <List>
          {devices.map((device) => (
            <React.Fragment key={device.id}>
              <ListItem>
                <ListItemText
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography variant="subtitle1">{device.name}</Typography>
                      <Chip
                      />
                      {device.trusted && (
                        <Tooltip title="Trusted Device">
                          <CheckCircleIcon color="success" fontSize="small" />
                        </Tooltip>
                      )}
                    </Box>
                    <Box>
                      <Typography variant="body2" color="textSecondary">
                        {device.browser} • {device.operatingSystem}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                      </Typography>
                    </Box>
                />
                <ListItemSecondaryAction>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <Select
                        '& .MuiSelect-select': {
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
        </Button>
      </DialogActions>
    </Dialog>
  );

