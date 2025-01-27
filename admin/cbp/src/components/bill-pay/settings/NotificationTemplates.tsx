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
  const [templates, setTemplates] = useState<NotificationTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<NotificationTemplate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [filters, setFilters] = useState<NotificationTemplateFilters>({
    searchTerm: '',
    type: 'all',
    category: NotificationCategory.PAYMENT
  });
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [templateDialog, setTemplateDialog] = useState<TemplateDialogState>({
    open: false,
    mode: 'create',
  });
  const [previewDialog, setPreviewDialog] = useState<PreviewDialogState>({
    open: false,
    subject: '',
    content: '',
    sampleData: {}
  });
  const [formData, setFormData] = useState<NotificationTemplateInput>({
    name: '',
    type: NotificationType.PAYMENT_COMPLETED,
    category: NotificationCategory.PAYMENT,
    subject: '',
    content: '',
    active: true,
  });
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof NotificationTemplateInput, string>>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  // Load templates with search and pagination
  const loadTemplates = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await notificationService.getTemplates({
        searchTerm: searchQuery || undefined,
        type: filters.type === 'all' ? undefined : filters.type,
        category: filters.category,
        active: undefined
      });
      setTemplates(response.items);
      setTotal(response.total);
      setTotalPages(response.totalPages);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load templates');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadTemplates();
  }, [searchQuery]);
  // Handle template dialog
  const handleOpenTemplateDialog = (mode: 'create' | 'edit', template?: NotificationTemplate) => {
    if (mode === 'edit' && template) {
      setFormData({
        name: template.name,
        type: template.type,
        category: template.category,
        subject: template.subject,
        content: template.content,
        active: template.active,
      });
    } else {
      setFormData({
        name: '',
        type: NotificationType.PAYMENT_COMPLETED,
        category: NotificationCategory.PAYMENT,
        subject: '',
        content: '',
        active: true,
      });
    }
    setTemplateDialog({ open: true, mode, template });
    setFormErrors({});
  };
  const handleCloseTemplateDialog = () => {
    setTemplateDialog({
      open: false,
      mode: 'create'
    });
    setSelectedTemplate(null);
    setFormData({
      name: '',
      type: NotificationType.PAYMENT_COMPLETED,
      category: NotificationCategory.PAYMENT,
      subject: '',
      content: '',
      active: true,
    });
    setFormErrors({});
  };
  // Dialog handlers
  const handleClosePreviewDialog = () => {
    setPreviewDialog({
      open: false,
      subject: '',
      content: '',
      sampleData: {}
    });
  };
  // Handle form submission
  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
      if (templateDialog.mode === 'create') {
        await notificationService.createTemplate(formData);
      } else if (templateDialog.template) {
        await notificationService.updateTemplate(templateDialog.template.id, formData);
      }
      handleCloseTemplateDialog();
      loadTemplates();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to save template');
    } finally {
      setLoading(false);
    }
  };
  // Handle template deletion
  const handleDelete = async (template: NotificationTemplate) => {
    try {
      setLoading(true);
      setError(null);
      await notificationService.deleteTemplate(template.id);
      loadTemplates();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to delete template');
    } finally {
      setLoading(false);
    }
  };
  // Handle template preview
  const handlePreview = async (template: NotificationTemplate) => {
    try {
      setLoading(true);
      setError(null);
      const preview = await notificationService.previewTemplate(template.id, {});
      setPreviewDialog({
        open: true,
        subject: preview.subject,
        content: preview.content,
        sampleData: preview.sampleData || {}
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to preview template');
    } finally {
      setLoading(false);
    }
  };
  // Template actions
  const handleGetTemplate = async (templateId: string) => {
    try {
      const template = await notificationService.getTemplate(Number(templateId));
      setTemplateDialog({
        open: true,
        mode: 'edit',
        template
      });
    } catch (error) {
      console.error('Error loading template:', error);
      setError('Failed to load template for editing');
    }
  };
  const handleDuplicate = async (templateId: string) => {
    try {
      const template = await notificationService.getTemplate(Number(templateId));
      const clonedTemplate: NotificationTemplateInput = {
        name: `${template.name} (Copy)`,
        type: template.type,
        category: template.category,
        subject: template.subject,
        content: template.content,
        active: template.active
      };
      await notificationService.createTemplate(clonedTemplate);
      await loadTemplates();
      setSuccess('Template cloned successfully');
    } catch (error) {
      console.error('Error cloning template:', error);
      setError('Failed to clone template');
    }
  };
  const handlePreviewTemplate = async (templateId: string) => {
    try {
      const template = await notificationService.getTemplate(Number(templateId));
      const preview = await notificationService.previewTemplate(
        Number(templateId),
        {
          recipientName: 'John Doe',
          amount: '$100.00',
          date: new Date().toLocaleDateString(),
          paymentId: 'PAY123'
        }
      );
      setPreviewDialog({
        open: true,
        subject: preview.subject || '',
        content: preview.content || '',
        sampleData: preview.sampleData || {}
      });
    } catch (error) {
      console.error('Error loading template preview:', error);
      setError('Failed to load template preview');
    }
  };
  const handleEdit = async (templateId: string) => {
    try {
      const template = await notificationService.getTemplate(Number(templateId));
      setTemplateDialog({
        open: true,
        mode: 'edit',
        template
      });
    } catch (error) {
      console.error('Error loading template:', error);
      setError('Failed to load template for editing');
    }
  };
  const handleClone = async (templateId: string) => {
    try {
      const template = await notificationService.getTemplate(Number(templateId));
      const clonedTemplate: NotificationTemplateInput = {
        name: `${template.name} (Copy)`,
        type: template.type,
        category: template.category,
        subject: template.subject,
        content: template.content,
        active: template.active
      };
      await notificationService.createTemplate(clonedTemplate);
      await loadTemplates();
      setSuccess('Template cloned successfully');
    } catch (error) {
      console.error('Error cloning template:', error);
      setError('Failed to clone template');
    }
  };
  const handleDeleteTemplate = async (templateId: string) => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      try {
        await notificationService.deleteTemplate(Number(templateId));
        await loadTemplates();
        setSuccess('Template deleted successfully');
      } catch (error) {
        console.error('Error deleting template:', error);
        setError('Failed to delete template');
      }
    }
  };
  const handleTypeChange = (type: NotificationType | 'all') => {
    setFilters(prev => ({ ...prev, type }));
  };
  const handleCategoryChange = (category: NotificationCategory) => {
    setFilters(prev => ({ ...prev, category }));
  };
  const handlePageChange = (event: unknown, newPage: number) => {
    setCurrentPage(newPage);
  };
  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
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
        <Typography variant="h5">Notification Templates</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenTemplateDialog('create')}
        >
          Create Template
        </Button>
      </Box>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Type</InputLabel>
                <Select
                  value={filters.type}
                  label="Type"
                  onChange={(e) => handleTypeChange(e.target.value as NotificationType | 'all')}
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
                  value={filters.category}
                  label="Category"
                  onChange={(e) => handleCategoryChange(e.target.value as NotificationCategory)}
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
                fullWidth
                size="small"
                label="Search"
                value={filters.searchTerm}
                onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
                placeholder="Search templates..."
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
                  No templates found
                </TableCell>
              </TableRow>
            ) : (
              templates.map((template) => (
                <TableRow key={template.id}>
                  <TableCell>{template.name}</TableCell>
                  <TableCell>{template.type}</TableCell>
                  <TableCell>{template.category}</TableCell>
                  <TableCell>
                    <Chip
                      label={template.active ? 'Active' : 'Inactive'}
                      color={template.active ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(template.lastModified).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <Tooltip title="Preview">
                        <IconButton
                          size="small"
                          onClick={() => handlePreviewTemplate(template.id.toString())}
                        >
                          <PreviewIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton
                          size="small"
                          onClick={() => handleEdit(template.id.toString())}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Duplicate">
                        <IconButton
                          size="small"
                          onClick={() => handleClone(template.id.toString())}
                        >
                          <ContentCopyIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteTemplate(template.id.toString())}
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
          component="div"
          count={total}
          page={currentPage - 1}
          onPageChange={handlePageChange}
          rowsPerPage={itemsPerPage}
          onRowsPerPageChange={handleRowsPerPageChange}
          rowsPerPageOptions={[5, 10, 25, 50]}
        />
      </Box>
      {/* Template Dialog */}
      <Dialog
        open={templateDialog.open}
        onClose={handleCloseTemplateDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {templateDialog.mode === 'create' ? 'Create Template' : 'Edit Template'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                error={!!formErrors.name}
                helperText={formErrors.name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  value={formData.type}
                  label="Type"
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as NotificationType })}
                  error={!!formErrors.type}
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
                  value={formData.category}
                  label="Category"
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as NotificationCategory })}
                  error={!!formErrors.category}
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
                fullWidth
                label="Subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                error={!!formErrors.subject}
                helperText={formErrors.subject}
              />
            </Grid>
            <Grid item xs={12}>
              <Editor
                value={formData.content}
                onEditorChange={(content) => setFormData({ ...formData, content })}
                init={{
                  height: 400,
                  menubar: false,
                  plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                  ],
                  toolbar: 'undo redo | blocks | ' +
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                }}
              />
              {formErrors.content && (
                <Typography color="error" variant="caption">
                  {formErrors.content}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.active}
                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  />
                }
                label="Active"
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
        open={previewDialog.open}
        onClose={handleClosePreviewDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Preview Template</DialogTitle>
        <DialogContent>
          {previewDialog.subject && previewDialog.content && (
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Subject: {previewDialog.subject}
              </Typography>
              <Box
                dangerouslySetInnerHTML={{ __html: previewDialog.content }}
                sx={{ mt: 2 }}
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
};
export default NotificationTemplates;