import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  IconButton,
  Stack,
  TextField,
  FormControlLabel,
  Switch,
  Box
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { InputFieldConfig } from '../../../../types/configuration/configuration/models/PscuLogFileTransformServiceSettings';

interface InputFieldsSectionProps {
  expanded: boolean;
  fields: InputFieldConfig[];
  onChange: (event: React.SyntheticEvent, isExpanded: boolean) => void;
  onFieldsChange: (fields: InputFieldConfig[]) => void;
}

const InputFieldsSection: React.FC<InputFieldsSectionProps> = ({
  expanded,
  fields,
  onChange,
  onFieldsChange
}) => {
  const handleAddField = () => {
    const newField: InputFieldConfig = {
      name: '',
      position: fields.length + 1,
      length: 1,
      required: false,
      validationPattern: '',
      validationMessage: ''
    };
    onFieldsChange([...fields, newField]);
  };

  const handleRemoveField = (index: number) => {
    const newFields = fields.filter((_, i) => i !== index);
    // Update positions after removal
    const updatedFields = newFields.map((field, i) => ({
      ...field,
      position: i + 1
    }));
    onFieldsChange(updatedFields);
  };

  const handleFieldChange = (index: number, field: keyof InputFieldConfig, value: string | number | boolean) => {
    const newFields = fields.map((f, i) => {
      if (i === index) {
        return { ...f, [field]: value };
      }
      return f;
    });
    onFieldsChange(newFields);
  };

  return (
    <Accordion expanded={expanded} onChange={onChange}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">Input Fields Configuration</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={2}>
          {fields.map((field, index) => (
            <Box
              key={index}
              sx={{
                p: 2,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1
              }}
            >
              <Stack spacing={2}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="subtitle1">Field {index + 1}</Typography>
                  <IconButton
                    onClick={() => handleRemoveField(index)}
                    color="error"
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Stack>
                <TextField
                  label="Name"
                  value={field.name}
                  onChange={(e) => handleFieldChange(index, 'name', e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Position"
                  type="number"
                  value={field.position}
                  onChange={(e) => handleFieldChange(index, 'position', parseInt(e.target.value) || 1)}
                  fullWidth
                  helperText="1-based position in the input file"
                />
                <TextField
                  label="Length"
                  type="number"
                  value={field.length}
                  onChange={(e) => handleFieldChange(index, 'length', parseInt(e.target.value) || 1)}
                  fullWidth
                  helperText="Field length in characters"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={field.required}
                      onChange={(e) => handleFieldChange(index, 'required', e.target.checked)}
                    />
                  }
                  label="Required"
                />
                <TextField
                  label="Validation Pattern"
                  value={field.validationPattern}
                  onChange={(e) => handleFieldChange(index, 'validationPattern', e.target.value)}
                  fullWidth
                  helperText="Regular expression for field validation"
                />
                {field.required && (
                  <TextField
                    label="Validation Message"
                    value={field.validationMessage}
                    onChange={(e) => handleFieldChange(index, 'validationMessage', e.target.value)}
                    fullWidth
                    helperText="Message to display when validation fails"
                  />
                )}
              </Stack>
            </Box>
          ))}
          <Button
            startIcon={<AddIcon />}
            onClick={handleAddField}
            variant="outlined"
            fullWidth
          >
            Add Input Field
          </Button>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default InputFieldsSection;
