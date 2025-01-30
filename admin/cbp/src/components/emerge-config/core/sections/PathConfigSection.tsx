import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Stack,
  TextField
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { PathConfig } from '../../../../types/configuration/configuration/models/PscuLogFileTransformServiceSettings';

interface PathConfigSectionProps {
  expanded: boolean;
  pathConfig: PathConfig;
  onChange: (event: React.SyntheticEvent, isExpanded: boolean) => void;
  onPathConfigChange: (pathConfig: PathConfig) => void;
}

const PathConfigSection: React.FC<PathConfigSectionProps> = ({
  expanded,
  pathConfig,
  onChange,
  onPathConfigChange
}) => {
  const handleFieldChange = (field: keyof PathConfig, value: string) => {
    onPathConfigChange({
      ...pathConfig,
      [field]: value
    });
  };

  return (
    <Accordion expanded={expanded} onChange={onChange}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">Path Configuration</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={2}>
          <TextField
            label="Input Path"
            value={pathConfig.inputPath}
            onChange={(e) => handleFieldChange('inputPath', e.target.value)}
            fullWidth
            helperText="Directory path for input files"
          />
          <TextField
            label="Output Path"
            value={pathConfig.outputPath}
            onChange={(e) => handleFieldChange('outputPath', e.target.value)}
            fullWidth
            helperText="Directory path for output files"
          />
          <TextField
            label="Error Path"
            value={pathConfig.errorPath}
            onChange={(e) => handleFieldChange('errorPath', e.target.value)}
            fullWidth
            helperText="Directory path for error files"
          />
          <TextField
            label="Processed Path"
            value={pathConfig.processedPath}
            onChange={(e) => handleFieldChange('processedPath', e.target.value)}
            fullWidth
            helperText="Directory path for processed files"
          />
          <TextField
            label="Input Filename Pattern"
            value={pathConfig.inputFilenamePattern}
            onChange={(e) => handleFieldChange('inputFilenamePattern', e.target.value)}
            fullWidth
            helperText="Pattern for matching input files (e.g., *.txt)"
          />
          <TextField
            label="Output File Prefix"
            value={pathConfig.outputFilePrefix}
            onChange={(e) => handleFieldChange('outputFilePrefix', e.target.value)}
            fullWidth
            helperText="Prefix to add to output filenames"
          />
          <TextField
            label="Input File Exclusive Access Timeout"
            value={pathConfig.inputFileExclusiveAccessTimeout}
            onChange={(e) => handleFieldChange('inputFileExclusiveAccessTimeout', e.target.value)}
            fullWidth
            helperText="Timeout duration for exclusive file access"
          />
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default PathConfigSection;
