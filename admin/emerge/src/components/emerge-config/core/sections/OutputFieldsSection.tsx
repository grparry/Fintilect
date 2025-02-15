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
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { OutputFieldConfig } from '../../../../types/ClientConfiguration/models/WindowsService/PscuLogFileTransformServiceSettings';

interface OutputFieldsSectionProps {
  expanded: boolean;
  fields: OutputFieldConfig[];
  onChange: (event: React.SyntheticEvent, isExpanded: boolean) => void;
  onFieldsChange: (fields: OutputFieldConfig[]) => void;
}

const OutputFieldsSection: React.FC<OutputFieldsSectionProps> = ({
  expanded,
  fields,
  onChange,
  onFieldsChange
}) => {
  const handleAddField = () => {
    const newField: OutputFieldConfig = {
      name: '',
      position: fields.length + 1,
      length: 1,
      padCharacter: ' ',
      alignment: 'Left'
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

  const handleFieldChange = (index: number, field: keyof OutputFieldConfig, value: string | number) => {
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
        <Typography variant="h6">Output Fields Configuration</Typography>
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
                  helperText="1-based position in the output file"
                />
                <TextField
                  label="Length"
                  type="number"
                  value={field.length}
                  onChange={(e) => handleFieldChange(index, 'length', parseInt(e.target.value) || 1)}
                  fullWidth
                  helperText="Field length in characters"
                />
                <TextField
                  label="Pad Character"
                  value={field.padCharacter}
                  onChange={(e) => handleFieldChange(index, 'padCharacter', e.target.value.charAt(0) || ' ')}
                  fullWidth
                  inputProps={{ maxLength: 1 }}
                  helperText="Single character used for padding"
                />
                <FormControl fullWidth>
                  <InputLabel>Alignment</InputLabel>
                  <Select
                    value={field.alignment}
                    onChange={(e) => handleFieldChange(index, 'alignment', e.target.value)}
                    label="Alignment"
                  >
                    <MenuItem value="Left">Left</MenuItem>
                    <MenuItem value="Right">Right</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </Box>
          ))}
          <Button
            startIcon={<AddIcon />}
            onClick={handleAddField}
            variant="outlined"
            fullWidth
          >
            Add Output Field
          </Button>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default OutputFieldsSection;
