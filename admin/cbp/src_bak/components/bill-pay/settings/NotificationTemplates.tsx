import React, { useState, useEffect } from 'react';
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
import { Editor } from '@tinymce/tinymce-react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AddIcon from '@mui/icons-material/Add';
import PreviewIcon from '@mui/icons-material/Preview';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { notificationService } from '../../../services/factory/ServiceFactory';
import {
  NotificationTemplate,
  NotificationTemplateInput,
  NotificationTemplateFilters,
  NotificationVariable,
  NotificationType,
  NotificationCategory,
  NotificationPreview
} from '../../../types/bill-pay.types';

interface TemplateDialogState {
  open: boolean;
  mode: 'create' | 'edit';
  template?: NotificationTemplate;
}

interface PreviewDialogState {
  open: boolean;
  subject: string;
  content: string;
  sampleData: Record<string, string>;
}

const NotificationTemplates: React.FC = () => {
  // State




  // State

  // Load templates with search and pagination


  // Handle template dialog


  // Dialog handlers

  // Handle form submission



  // Handle template deletion

  // Handle template preview

  // Template actions


        {
      );








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
        <Typography variant="h5">Notification Templates</Typography>
        <Button
        >
        </Button>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Type</InputLabel>
                <Select
                >
                  <MenuItem value="all">All Types</MenuItem>
                  {Object.values(NotificationType).map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Category</InputLabel>
                <Select
                >
                  {Object.values(NotificationCategory).map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Last Modified</TableCell>
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
            ) : templates.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                </TableCell>
              </TableRow>
            ) : (
                <TableRow key={template.id}>
                  <TableCell>{template.name}</TableCell>
                  <TableCell>{template.type}</TableCell>
                  <TableCell>{template.category}</TableCell>
                  <TableCell>
                    <Chip
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(template.lastModified).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <Tooltip title="Preview">
                        <IconButton
                        >
                          <PreviewIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Duplicate">
                        <IconButton
                        >
                          <ContentCopyIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
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
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
        <TablePagination
        />
      </Box>

      {/* Template Dialog */}
      <Dialog
      >
        <DialogTitle>
          {templateDialog.mode === 'create' ? 'Create Template' : 'Edit Template'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                >
                  {Object.values(NotificationType).map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                >
                  {Object.values(NotificationCategory).map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
              />
            </Grid>
            <Grid item xs={12}>
              <Editor
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                  ],
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
              />
              {formErrors.content && (
                <Typography color="error" variant="caption">
                  {formErrors.content}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                  <Switch
                  />
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTemplateDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog
      >
        <DialogTitle>Preview Template</DialogTitle>
        <DialogContent>
          {previewDialog.subject && previewDialog.content && (
            <Box>
              <Typography variant="subtitle1" gutterBottom>
              </Typography>
              <Box
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePreviewDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );

