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
import { FilterConfig } from '../../../../../types/ClientConfiguration/models/WindowsService/PscuLogFileTransformServiceSettings';

interface FiltersSectionProps {
  expanded: boolean;
  filters: FilterConfig[];
  onChange: (event: React.SyntheticEvent, isExpanded: boolean) => void;
  onFiltersChange: (filters: FilterConfig[]) => void;
}

const FiltersSection: React.FC<FiltersSectionProps> = ({
  expanded,
  filters,
  onChange,
  onFiltersChange
}) => {
  const handleAddFilter = () => {
    const newFilter: FilterConfig = {
      name: '',
      valuesCausingInclusion: '',
      valuesCausingExclusion: '',
      requiresValue: false,
      errorMessage: ''
    };
    onFiltersChange([...filters, newFilter]);
  };

  const handleRemoveFilter = (index: number) => {
    const newFilters = filters.filter((_, i) => i !== index);
    onFiltersChange(newFilters);
  };

  const handleFilterChange = (index: number, field: keyof FilterConfig, value: string | boolean) => {
    const newFilters = filters.map((filter, i) => {
      if (i === index) {
        return { ...filter, [field]: value };
      }
      return filter;
    });
    onFiltersChange(newFilters);
  };

  return (
    <Accordion expanded={expanded} onChange={onChange}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">Filters Configuration</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={2}>
          {filters.map((filter, index) => (
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
                  <Typography variant="subtitle1">Filter {index + 1}</Typography>
                  <IconButton
                    onClick={() => handleRemoveFilter(index)}
                    color="error"
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Stack>
                <TextField
                  label="Name"
                  value={filter.name}
                  onChange={(e) => handleFilterChange(index, 'name', e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Values Causing Inclusion"
                  value={filter.valuesCausingInclusion}
                  onChange={(e) => handleFilterChange(index, 'valuesCausingInclusion', e.target.value)}
                  fullWidth
                  helperText="Comma-separated values that will cause inclusion"
                />
                <TextField
                  label="Values Causing Exclusion"
                  value={filter.valuesCausingExclusion}
                  onChange={(e) => handleFilterChange(index, 'valuesCausingExclusion', e.target.value)}
                  fullWidth
                  helperText="Comma-separated values that will cause exclusion"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={filter.requiresValue}
                      onChange={(e) => handleFilterChange(index, 'requiresValue', e.target.checked)}
                    />
                  }
                  label="Requires Value"
                />
                {filter.requiresValue && (
                  <TextField
                    label="Error Message"
                    value={filter.errorMessage}
                    onChange={(e) => handleFilterChange(index, 'errorMessage', e.target.value)}
                    fullWidth
                    helperText="Error message to display when value is required but missing"
                  />
                )}
              </Stack>
            </Box>
          ))}
          <Button
            startIcon={<AddIcon />}
            onClick={handleAddFilter}
            variant="outlined"
            fullWidth
          >
            Add Filter
          </Button>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default FiltersSection;
