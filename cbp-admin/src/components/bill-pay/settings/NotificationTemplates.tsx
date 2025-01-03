import React, { useState, useEffect, useCallback } from 'react';
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
} from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AddIcon from '@mui/icons-material/Add';
import PreviewIcon from '@mui/icons-material/Preview';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { notificationTemplateService } from '../../../services/notification-template.service';
import {
  NotificationTemplate,
  NotificationTemplateInput,
  NotificationTemplateFilters,
  NotificationVariable,
  NotificationType,
  NotificationCategory,
} from '../../../types/bill-pay.types';

const NotificationTemplates: React.FC = () => {
  // State
  const [templates, setTemplates] = useState<NotificationTemplate[]>([]);
  const [totalTemplates, setTotalTemplates] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [variables, setVariables] = useState<NotificationVariable[]>([]);

  // Filter state
  const [filters, setFilters] = useState<NotificationTemplateFilters>({
    searchTerm: '',
    type: 'all',
    category: 'all',
  });

  // Dialog state
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openPreviewDialog, setOpenPreviewDialog] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [selectedTemplate, setSelectedTemplate] = useState<NotificationTemplate | null>(null);
  const [templateInput, setTemplateInput] = useState<NotificationTemplateInput>({
    name: '',
    type: 'Email',
    category: 'Payment',
    subject: '',
    content: '',
    active: true,
  });

  // Load templates and variables
  const loadTemplates = useCallback(async () => {
    try {
      setLoading(true);
      const { templates: data, total } = await notificationTemplateService.getTemplates(filters);
      setTemplates(data);
      setTotalTemplates(total);
      setError(null);
    } catch (err) {
      setError('Failed to load templates');
      console.error('Error loading templates:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const loadVariables = useCallback(async () => {
    try {
      const data = await notificationTemplateService.getAvailableVariables();
      setVariables(data);
    } catch (err) {
      console.error('Error loading variables:', err);
    }
  }, []);

  useEffect(() => {
    loadTemplates();
  }, [loadTemplates]);

  useEffect(() => {
    loadVariables();
  }, [loadVariables]);

  // Handlers
  const handleEdit = useCallback((template: NotificationTemplate) => {
    setSelectedTemplate(template);
    setTemplateInput({
      name: template.name,
      type: template.type,
      category: template.category,
      subject: template.subject,
      content: template.content,
      active: template.active,
    });
    setOpenDialog(true);
  }, []); // No external dependencies needed

  const handlePreview = useCallback(async (template: NotificationTemplate) => {
    try {
      const preview = await notificationTemplateService.previewTemplate(template.id);
      setSelectedTemplate({ ...template, content: preview.content });
      setOpenPreviewDialog(true);
    } catch (err) {
      setError('Failed to generate preview');
      console.error('Error generating preview:', err);
    }
  }, []); // No external dependencies needed

  const handleDelete = useCallback((template: NotificationTemplate) => {
    setSelectedTemplate(template);
    setOpenDeleteDialog(true);
  }, []); // No external dependencies needed

  const handleDuplicate = useCallback(async (template: NotificationTemplate) => {
    try {
      await notificationTemplateService.duplicateTemplate(template.id);
      loadTemplates();
    } catch (err) {
      setError('Failed to duplicate template');
      console.error('Error duplicating template:', err);
    }
  }, [loadTemplates]); // Depends on loadTemplates to refresh the list after duplication

  const handleSave = async () => {
    try {
      if (selectedTemplate) {
        await notificationTemplateService.updateTemplate(selectedTemplate.id, templateInput);
      } else {
        await notificationTemplateService.createTemplate(templateInput);
      }
      setOpenDialog(false);
      loadTemplates();
    } catch (err) {
      setError('Failed to save template');
      console.error('Error saving template:', err);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      if (selectedTemplate) {
        await notificationTemplateService.deleteTemplate(selectedTemplate.id);
        setOpenDeleteDialog(false);
        loadTemplates();
      }
    } catch (err) {
      setError('Failed to delete template');
      console.error('Error deleting template:', err);
    }
  };

  const handleExport = async () => {
    try {
      const blob = await notificationTemplateService.exportTemplates(filters);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'notification-templates.csv';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError('Failed to export templates');
      console.error('Error exporting templates:', err);
    }
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (file) {
        const result = await notificationTemplateService.importTemplates(file);
        if (result.errors.length > 0) {
          setError(`Import completed with ${result.errors.length} errors`);
        }
        loadTemplates();
      }
    } catch (err) {
      setError('Failed to import templates');
      console.error('Error importing templates:', err);
    }
  };

  const renderDeleteDialog = () => (
    <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
      <DialogTitle>Delete Template</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Typography gutterBottom>
            Are you sure you want to delete this template?
          </Typography>
          {selectedTemplate && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              This action cannot be undone. All notifications using this template will be affected.
            </Alert>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleConfirmDelete}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );

  const renderPreviewDialog = () => (
    <Dialog open={openPreviewDialog} onClose={() => setOpenPreviewDialog(false)} maxWidth="md" fullWidth>
      <DialogTitle>Preview Template</DialogTitle>
      <DialogContent>
        {selectedTemplate && (
          <Stack spacing={3} sx={{ mt: 2 }}>
            <Box>
              <Typography variant="subtitle2">Subject</Typography>
              <Typography>{selectedTemplate.subject}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2">Content</Typography>
              <Paper variant="outlined" sx={{ p: 2, mt: 1 }}>
                <div dangerouslySetInnerHTML={{ __html: selectedTemplate.content }} />
              </Paper>
            </Box>
            <Alert severity="info">
              Note: This is a preview with placeholder variables. Actual notifications will have the variables replaced with real data.
            </Alert>
          </Stack>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenPreviewDialog(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );

  const renderTemplateDialog = () => (
    <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="lg" fullWidth>
      <DialogTitle>
        {selectedTemplate ? 'Edit Template' : 'New Template'}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Template Name"
                required
                value={templateInput.name}
                onChange={(e) => setTemplateInput({ ...templateInput, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Template Type</InputLabel>
                <Select
                  value={templateInput.type}
                  onChange={(e) => setTemplateInput({ ...templateInput, type: e.target.value as NotificationType })}
                >
                  <MenuItem value="Email">Email</MenuItem>
                  <MenuItem value="SMS">SMS</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Category</InputLabel>
                <Select
                  value={templateInput.category}
                  onChange={(e) => setTemplateInput({ ...templateInput, category: e.target.value as NotificationCategory })}
                >
                  <MenuItem value="Payment">Payment</MenuItem>
                  <MenuItem value="Account">Account</MenuItem>
                  <MenuItem value="System">System</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={templateInput.active}
                    onChange={(e) => setTemplateInput({ ...templateInput, active: e.target.checked })}
                  />
                }
                label="Active"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Subject"
                required
                value={templateInput.subject}
                onChange={(e) => setTemplateInput({ ...templateInput, subject: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Content
              </Typography>
              <Editor
                apiKey="your-tinymce-api-key"
                value={templateInput.content}
                init={{
                  height: 400,
                  menubar: true,
                  plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                  ],
                  toolbar: 'undo redo | blocks | ' +
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                }}
                onEditorChange={(content) => {
                  setTemplateInput({ ...templateInput, content });
                }}
              />
            </Grid>
          </Grid>

          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Available Variables
            </Typography>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Grid container spacing={1}>
                {variables.map((variable) => (
                  <Grid item key={variable.name}>
                    <Tooltip title={variable.description}>
                      <Chip
                        label={variable.name}
                        onClick={() => {
                          // TODO: Insert variable at cursor position in editor
                          console.log('Inserting variable:', variable.name);
                        }}
                      />
                    </Tooltip>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save Template
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Box>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Notification Templates</Typography>
        <Stack direction="row" spacing={2}>
          <input
            type="file"
            accept=".csv"
            style={{ display: 'none' }}
            id="import-file"
            onChange={handleImport}
          />
          <label htmlFor="import-file">
            <Button
              component="span"
              variant="outlined"
              startIcon={<CloudUploadIcon />}
            >
              Import
            </Button>
          </label>
          <Button
            variant="outlined"
            startIcon={<CloudDownloadIcon />}
            onClick={handleExport}
          >
            Export
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setSelectedTemplate(null);
              setTemplateInput({
                name: '',
                type: 'Email',
                category: 'Payment',
                subject: '',
                content: '',
                active: true,
              });
              setOpenDialog(true);
            }}
          >
            New Template
          </Button>
        </Stack>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Search"
                value={filters.searchTerm}
                onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
                placeholder="Search templates..."
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  value={filters.type}
                  onChange={(e) => setFilters({ ...filters, type: e.target.value as NotificationType | 'all' })}
                >
                  <MenuItem value="all">All Types</MenuItem>
                  <MenuItem value="Email">Email</MenuItem>
                  <MenuItem value="SMS">SMS</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value as NotificationCategory | 'all' })}
                >
                  <MenuItem value="all">All Categories</MenuItem>
                  <MenuItem value="Payment">Payment</MenuItem>
                  <MenuItem value="Account">Account</MenuItem>
                  <MenuItem value="System">System</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                fullWidth
                variant="contained"
                onClick={loadTemplates}
                sx={{ height: '56px' }}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Template Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Last Modified</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : templates.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No templates found
                </TableCell>
              </TableRow>
            ) : (
              templates.map((template) => (
                <TableRow key={template.id}>
                  <TableCell>{template.name}</TableCell>
                  <TableCell>{template.type}</TableCell>
                  <TableCell>{template.category}</TableCell>
                  <TableCell>{template.subject}</TableCell>
                  <TableCell>
                    <Chip
                      label={template.active ? 'Active' : 'Inactive'}
                      color={template.active ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{template.lastModified}</TableCell>
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton size="small" onClick={() => handleEdit(template)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Preview">
                      <IconButton size="small" onClick={() => handlePreview(template)}>
                        <PreviewIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Duplicate">
                      <IconButton size="small" onClick={() => handleDuplicate(template)}>
                        <ContentCopyIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton size="small" onClick={() => handleDelete(template)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {renderTemplateDialog()}
      {renderPreviewDialog()}
      {renderDeleteDialog()}
    </Box>
  );
};

export default NotificationTemplates;
