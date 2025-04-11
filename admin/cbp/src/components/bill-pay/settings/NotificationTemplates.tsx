import React, { useState, useEffect } from 'react';
import logger from '../../../utils/logger';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Stack,
  Alert,
  FormControlLabel,
  Switch,
  CircularProgress,
  TablePagination
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AddIcon from '@mui/icons-material/Add';
import PreviewIcon from '@mui/icons-material/Preview';
import SendIcon from '@mui/icons-material/Send';
import { ServiceFactory } from '../../../services/factory/ServiceFactory';
import { useClientApi } from '../../../hooks/useClientApi';
import {
  NotificationResponse,
  NotificationCreateRequest,
  NotificationUpdateRequest,
  NotificationSendRequest
} from '../../../types/notification.types';

interface NotificationDialogState {
  open: boolean;
  mode: 'create' | 'edit';
  notification?: NotificationResponse;
}

interface PreviewDialogState {
  open: boolean;
  subject: string;
  body: string;
}

interface DeleteDialogState {
  open: boolean;
  notificationId: string;
  notificationName: string;
  errorNumber?: number;
  statusCode?: number;
}

const NotificationTemplates: React.FC = () => {
  // Indicate that this component uses client-specific API
  useClientApi(true);

  // Get a fresh instance of the notification service
  const notificationService = ServiceFactory.getInstance().getNotificationService();

  // State
  const [notifications, setNotifications] = useState<NotificationResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [notificationDialog, setNotificationDialog] = useState<NotificationDialogState>({
    open: false,
    mode: 'create',
  });
  const [previewDialog, setPreviewDialog] = useState<PreviewDialogState>({
    open: false,
    subject: '',
    body: ''
  });
  const [deleteDialog, setDeleteDialog] = useState<DeleteDialogState>({
    open: false,
    notificationId: '',
    notificationName: '',
    errorNumber: undefined,
    statusCode: undefined
  });
  const [formData, setFormData] = useState<NotificationCreateRequest>({
    errorNumber: 0,
    statusCode: 0,
    matchMode: 0,
    matchOrder: 1,
    matchText: '',
    messageSubject: '',
    messageBody: '',
    emailMember: true,
    emailMemberServices: false,
    emailSysOp: false,
    notes: '',
    symmetry: false,
    emerge: false
  });
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof NotificationCreateRequest, string>>>({});

  // Load notifications
  const loadNotifications = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await notificationService.getAllNotifications();
      if (response.notifications) {
        setNotifications(response.notifications);
      } else {
        setNotifications([]);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  // Filter notifications based on search term
  const filteredNotifications = notifications.filter(notification => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      notification.errorNumber.toString().includes(searchLower) ||
      (notification.statusCode?.toString() || '').includes(searchLower) ||
      (notification.matchText || '').toLowerCase().includes(searchLower) ||
      (notification.messageSubject || '').toLowerCase().includes(searchLower)
    );
  });

  // Handle notification dialog
  const handleOpenNotificationDialog = (mode: 'create' | 'edit', notification?: NotificationResponse) => {
    if (mode === 'edit' && notification) {
      logger.log('Editing notification with matchMode:', notification.matchMode);
      setFormData({
        errorNumber: notification.errorNumber,
        statusCode: notification.statusCode || 0,
        matchMode: notification.matchMode,
        matchOrder: notification.matchOrder,
        matchText: notification.matchText || '',
        messageSubject: notification.messageSubject || '',
        messageBody: notification.messageBody || '',
        emailMember: notification.emailMember,
        emailMemberServices: notification.emailMemberServices,
        emailSysOp: notification.emailSysOp,
        notes: notification.notes || '',
        symmetry: notification.symmetry,
        emerge: notification.emerge
      });
    } else {
      setFormData({
        errorNumber: 0,
        statusCode: 0,
        matchMode: 0,
        matchOrder: 1,
        matchText: '',
        messageSubject: '',
        messageBody: '',
        emailMember: true,
        emailMemberServices: false,
        emailSysOp: false,
        notes: '',
        symmetry: false,
        emerge: false
      });
    }
    setNotificationDialog({ open: true, mode, notification });
    setFormErrors({});
  };

  const handleCloseNotificationDialog = () => {
    setNotificationDialog({
      open: false,
      mode: 'create'
    });
    setFormData({
      errorNumber: 0,
      statusCode: 0,
      matchMode: 0,
      matchOrder: 1,
      matchText: '',
      messageSubject: '',
      messageBody: '',
      emailMember: true,
      emailMemberServices: false,
      emailSysOp: false,
      notes: '',
      symmetry: false,
      emerge: false
    });
    setFormErrors({});
  };

  // Dialog handlers
  const handleClosePreviewDialog = () => {
    setPreviewDialog({
      open: false,
      subject: '',
      body: ''
    });
  };

  // Open delete confirmation dialog
  const openDeleteDialog = (notification: NotificationResponse) => {
    logger.log('Opening delete dialog with notification:', notification);
    
    if (!notification || !notification.id) {
      logger.error('Cannot open delete dialog: Missing notification or notification ID');
      setError('Cannot delete notification: Missing notification ID');
      return;
    }
    
    // Create a descriptive name for the notification
    const notificationName = notification.matchText || 
                            `Error ${notification.errorNumber}` || 
                            `Status ${notification.statusCode}` || 
                            'this notification';
    
    // Ensure we're using the lowercase id property to match API convention
    setDeleteDialog({
      open: true,
      notificationId: notification.id, // Using lowercase id to match API convention
      notificationName: notification.matchText || '',
      errorNumber: notification.errorNumber,
      statusCode: notification.statusCode
    });
    
    logger.log('Delete dialog state set to:', {
      notificationId: notification.id, // Using lowercase id to match API convention
      notificationName: notification.matchText || '',
      errorNumber: notification.errorNumber,
      statusCode: notification.statusCode
    });
  };

  // Close delete confirmation dialog
  const closeDeleteDialog = () => {
    setDeleteDialog({
      open: false,
      notificationId: '',
      notificationName: '',
      errorNumber: undefined,
      statusCode: undefined
    });
  };

  // Handle notification deletion
  const handleDelete = async (notificationId: string) => {
    try {
      logger.log('Deleting notification with ID:', notificationId);
      
      if (!notificationId) {
        setError('Cannot delete notification: Missing notification ID');
        return;
      }
      
      // Ensure we have a valid ID before proceeding
      const trimmedId = notificationId.trim();
      if (!trimmedId) {
        setError('Cannot delete notification: Invalid notification ID');
        return;
      }
      
      setLoading(true);
      setError(null);
      
      // Log the exact API call we're about to make
      logger.log(`Calling deleteNotification with ID: "${trimmedId}"`);
      
      await notificationService.deleteNotification(trimmedId);
      setSuccess('Notification deleted successfully');
      loadNotifications();
      setDeleteDialog({ open: false, notificationId: '', notificationName: '', errorNumber: undefined, statusCode: undefined });
    } catch (err: unknown) {
      logger.error('Delete error:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete notification');
    } finally {
      setLoading(false);
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof NotificationCreateRequest, string>> = {};
    
    // Error number validation
    if (!formData.errorNumber) {
      errors.errorNumber = 'Error number is required';
    } else {
      // Check for uniqueness of error number
      const existingWithSameErrorNumber = notifications.find(
        n => n.errorNumber === formData.errorNumber && 
        (notificationDialog.mode === 'create' || n.id !== notificationDialog.notification?.id)
      );
      if (existingWithSameErrorNumber) {
        errors.errorNumber = 'Error number must be unique';
      }
    }
    
    // Status code validation
    if (formData.statusCode !== undefined && formData.statusCode !== null) {
      // Check for uniqueness of status code if provided
      const existingWithSameStatusCode = notifications.find(
        n => n.statusCode === formData.statusCode && formData.statusCode !== 0 &&
        (notificationDialog.mode === 'create' || n.id !== notificationDialog.notification?.id)
      );
      if (existingWithSameStatusCode) {
        errors.statusCode = 'Status code must be unique';
      }
    }
    
    // Match order validation
    if (formData.matchOrder < 0 || formData.matchOrder > 255) {
      errors.matchOrder = 'Match order must be between 0 and 255';
    }
    
    if (!formData.matchText) {
      errors.matchText = 'Match text is required';
    }
    
    if (!formData.messageSubject) {
      errors.messageSubject = 'Subject is required';
    }
    
    if (!formData.messageBody) {
      errors.messageBody = 'Body is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    try {
      setLoading(true);
      setError(null);
      
      if (notificationDialog.mode === 'create') {
        await notificationService.createNotification(formData);
        setSuccess('Notification created successfully');
      } else if (notificationDialog.notification) {
        const updateRequest: NotificationUpdateRequest = {
          ...formData,
          id: notificationDialog.notification.id
        };
        await notificationService.updateNotification(updateRequest);
        setSuccess('Notification updated successfully');
      }
      
      handleCloseNotificationDialog();
      loadNotifications();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to save notification');
    } finally {
      setLoading(false);
    }
  };

  // Handle notification preview
  const handlePreview = (notification: NotificationResponse) => {
    setPreviewDialog({
      open: true,
      subject: notification.messageSubject || '',
      body: notification.messageBody || ''
    });
  };

  // Handle sending a notification
  const handleSendNotification = async (statusCode: number | undefined) => {
    if (!statusCode) {
      setError('Status code is required to send a notification');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      await notificationService.sendNotification({ statusCode });
      setSuccess('Notification sent successfully');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to send notification');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess(null)}>
          {success}
        </Alert>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5" color="text.primary">Notification Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenNotificationDialog('create')}
        >
          Create Notification
        </Button>
      </Box>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by error number, status code, or text..."
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Error Number</TableCell>
              <TableCell>Status Code</TableCell>
              <TableCell>Match Text</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Email To</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <CircularProgress size={24} />
                </TableCell>
              </TableRow>
            ) : filteredNotifications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No notifications found
                </TableCell>
              </TableRow>
            ) : (
              filteredNotifications.map((notification) => (
                <TableRow key={notification.id}>
                  <TableCell>{notification.errorNumber}</TableCell>
                  <TableCell>{notification.statusCode}</TableCell>
                  <TableCell>{notification.matchText || '-'}</TableCell>
                  <TableCell>{notification.messageSubject || '-'}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      {notification.emailMember && <Chip key="member" label="Member" size="small" color="primary" />}
                      {notification.emailMemberServices && <Chip key="memberServices" label="Member Services" size="small" color="secondary" />}
                      {notification.emailSysOp && <Chip key="sysOp" label="SysOp" size="small" color="info" />}
                    </Stack>
                  </TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <Tooltip title="Preview">
                        <IconButton
                          size="small"
                          onClick={() => handlePreview(notification)}
                        >
                          <PreviewIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton
                          size="small"
                          onClick={() => handleOpenNotificationDialog('edit', notification)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Send">
                        <IconButton
                          size="small"
                          onClick={() => handleSendNotification(notification.statusCode)}
                        >
                          <SendIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          size="small"
                          onClick={() => {
                            logger.log('Delete button clicked for notification:', notification);
                            openDeleteDialog(notification);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      
      {/* Notification Dialog */}
      <Dialog
        open={notificationDialog.open}
        onClose={handleCloseNotificationDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {notificationDialog.mode === 'create' ? 'Create Notification' : 'Edit Notification'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Error Number"
                type="text"
                value={formData.errorNumber}
                onChange={(e) => {
                  const value = e.target.value;
                  // Only allow numeric input
                  if (value === '' || /^[0-9]+$/.test(value)) {
                    setFormData({ ...formData, errorNumber: value === '' ? 0 : parseInt(value) });
                  }
                }}
                error={!!formErrors.errorNumber}
                helperText={formErrors.errorNumber}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Status Code"
                type="number"
                value={formData.statusCode}
                onChange={(e) => setFormData({ ...formData, statusCode: parseInt(e.target.value) || 0 })}
                error={!!formErrors.statusCode}
                helperText={formErrors.statusCode}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Match Order"
                type="number"
                value={formData.matchOrder}
                onChange={(e) => setFormData({ ...formData, matchOrder: parseInt(e.target.value) || 0 })}
                error={!!formErrors.matchOrder}
                helperText={formErrors.matchOrder || "Value must be between 0 and 255"}
                inputProps={{ min: 0, max: 255 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Match Text"
                value={formData.matchText}
                onChange={(e) => setFormData({ ...formData, matchText: e.target.value })}
                error={!!formErrors.matchText}
                helperText={formErrors.matchText}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Subject"
                value={formData.messageSubject}
                onChange={(e) => setFormData({ ...formData, messageSubject: e.target.value })}
                error={!!formErrors.messageSubject}
                helperText={formErrors.messageSubject}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>Message Body</Typography>
              <TextField
                fullWidth
                multiline
                rows={10}
                value={formData.messageBody}
                onChange={(e) => setFormData({ ...formData, messageBody: e.target.value })}
                error={!!formErrors.messageBody}
                helperText={formErrors.messageBody}
                placeholder="Enter notification message body"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notes"
                multiline
                rows={2}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>Email Recipients</Typography>
              <Stack direction="row" spacing={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.emailMember}
                      onChange={(e) => setFormData({ ...formData, emailMember: e.target.checked })}
                    />
                  }
                  label="Member"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.emailMemberServices}
                      onChange={(e) => setFormData({ ...formData, emailMemberServices: e.target.checked })}
                    />
                  }
                  label="Member Services"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.emailSysOp}
                      onChange={(e) => setFormData({ ...formData, emailSysOp: e.target.checked })}
                    />
                  }
                  label="SysOp"
                />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>Options</Typography>
              <Stack direction="row" spacing={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.symmetry}
                      onChange={(e) => setFormData({ ...formData, symmetry: e.target.checked })}
                    />
                  }
                  label="Symmetry"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.emerge}
                      onChange={(e) => setFormData({ ...formData, emerge: e.target.checked })}
                    />
                  }
                  label="Emerge"
                />
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNotificationDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Preview Dialog */}
      <Dialog
        open={previewDialog.open}
        onClose={handleClosePreviewDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Preview Notification</DialogTitle>
        <DialogContent>
          <Box>
            <Typography variant="subtitle1" gutterBottom color="text.primary">
              Subject: {previewDialog.subject}
            </Typography>
            <Box
              dangerouslySetInnerHTML={{ __html: previewDialog.body }}
              sx={{ mt: 2 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePreviewDialog}>Close</Button>
        </DialogActions>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={closeDeleteDialog}
        aria-labelledby="delete-dialog-title"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="delete-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Are you sure you want to delete this notification?
          </Typography>
          
          <Box sx={{ 
            mt: 2, 
            mb: 2, 
            p: 2, 
            bgcolor: 'grey.100', 
            borderRadius: 1, 
            border: '1px solid', 
            borderColor: 'grey.300' 
          }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body1">
                  <strong>Notification ID:</strong> {deleteDialog.notificationId || 'N/A'}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">
                  <strong>Match Text:</strong> {deleteDialog.notificationName || 'N/A'}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">
                  <strong>Error Number:</strong> {deleteDialog.errorNumber !== undefined ? deleteDialog.errorNumber : 'N/A'}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">
                  <strong>Status Code:</strong> {deleteDialog.statusCode !== undefined ? deleteDialog.statusCode : 'N/A'}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          
          <Typography variant="body2" color="error" sx={{ mt: 1, fontWeight: 'bold' }}>
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary" variant="outlined">
            Cancel
          </Button>
          <Button 
            onClick={() => {
              logger.log('Delete button clicked with ID:', deleteDialog.notificationId);
              handleDelete(deleteDialog.notificationId);
            }} 
            color="error" 
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NotificationTemplates;