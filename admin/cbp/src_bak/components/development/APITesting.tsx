import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
  IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DescriptionIcon from '@mui/icons-material/Description';
import ApiIcon from '@mui/icons-material/Api';

interface ApiSpec {
  openapi: string;
  info: {
    title: string;
    version: string;
    description: string;
  };
  paths: Record<string, any>;
  components?: {
    schemas?: Record<string, any>;
    securitySchemes?: Record<string, any>;
  };
  security?: Array<Record<string, string[]>>;
}

interface TreeNodeProps {
  nodeId: string;
  label: string;
  children?: React.ReactNode;
  level?: number;
  description?: string;
  examples?: any;
}

const TreeNode: React.FC<TreeNodeProps> = ({ nodeId, label, children, level = 0, description, examples }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>





    <div>
      <ListItem
      >
        {children && (
          <ListItemIcon sx={{ minWidth: 32 }}>
            <IconButton size="small" onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? <ExpandMoreIcon /> : <ChevronRightIcon />}
            </IconButton>
          </ListItemIcon>
        )}
        <ListItemIcon sx={{ minWidth: 32 }}>
          {level === 0 ? <ApiIcon /> : <DescriptionIcon />}
        </ListItemIcon>
        <ListItemText
            '& .MuiTypography-root': {
        />
      </ListItem>
      {examples && isExpanded && (
        <Box sx={{ pl: (level + 1) * 4, pr: 2, pb: 1 }}>
          <Typography variant="caption" color="textSecondary">Example:</Typography>
          <pre style={{ 
            {JSON.stringify(examples, null, 2)}
          </pre>
        </Box>
      )}
      {children && (
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children}
          </List>
        </Collapse>
      )}
    </div>
  );


    { value: 'cbp.admin-api.json', label: 'CBP Admin API' },
    { value: 'cbp.api.json', label: 'CBP Core Processing API'},
    { value: 'cbp.admin-cu-api.json', label: 'CBP Admin CU API' }
  ];
  


    
    
    // Skip the first empty part and '#' if present
    
    

    
    // Handle $ref
    
    // Handle array type
        ...schema,
    
    // Handle allOf, anyOf, oneOf
    ['allOf', 'anyOf', 'oneOf'].forEach(key => {
    
    // Handle nested properties
    

    

      
      // Handle nested objects and arrays
        (type === 'object' && resolvedSchema.properties) ||
        (type === 'array' && resolvedSchema.items)
      );
      
          <TreeNode
          >
            {type === 'object' 
              ? renderSchemaProperties(resolvedSchema, level + 1)
              : renderSchemaProperties({ 
          </TreeNode>
        );
      
        <TreeNode
        />
      );

      
        ? `Authentication: ${security.map((s: any) => Object.keys(s).join(', ')).join(' or ')}` 
        : 'No authentication required';

        <TreeNode
        >
          {details.parameters && (
            <TreeNode
            >
              {details.parameters.map((param: any) => {
                
                  <TreeNode
                  >
                    {resolvedSchema && renderSchemaProperties({ properties: { [resolvedParam.name]: resolvedSchema } }, 2)}
                  </TreeNode>
                );
            </TreeNode>
          )}
          {details.requestBody && (
            <TreeNode
            >
              {Object.entries(details.requestBody.content).map(([contentType, content]: [string, any]) => {
                  <TreeNode
                  >
                    {resolvedSchema && renderSchemaProperties(resolvedSchema, 2)}
                  </TreeNode>
                );
            </TreeNode>
          )}
          {details.responses && (
            <TreeNode
            >
              {Object.entries(details.responses).map(([code, response]: [string, any]) => {
                  <TreeNode
                  >
                    {resolvedResponse.content && Object.entries(resolvedResponse.content).map(([contentType, content]: [string, any]) => {
                        <TreeNode
                        >
                          {resolvedSchema && renderSchemaProperties(resolvedSchema, 3)}
                        </TreeNode>
                      );
                  </TreeNode>
                );
            </TreeNode>
          )}
        </TreeNode>
      );

    <Card>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
        </Typography>
        
        <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
          <InputLabel>Select API</InputLabel>
          <Select
          >
            {apiOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {loading && (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        )}

        {apiSpec && !loading && (
          <Box>
            <Typography variant="h6" gutterBottom>
              {apiSpec.info.title} - v{apiSpec.info.version}
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              {apiSpec.info.description}
            </Typography>
            
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              {Object.entries(apiSpec.paths).map(([path, methods]) => (
              ))}
            </List>
          </Box>
        )}
      </CardContent>
    </Card>
  );

