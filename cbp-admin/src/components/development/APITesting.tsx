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
      <ListItem
        sx={{
          pl: level * 2,
          borderLeft: level > 0 ? '1px dashed rgba(0, 0, 0, 0.12)' : 'none',
          ml: level > 0 ? 2 : 0,
        }}
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
          primary={label}
          secondary={description}
          sx={{
            '& .MuiTypography-root': {
              fontSize: level === 0 ? '1rem' : '0.875rem',
            },
          }}
        />
      </ListItem>
      {examples && isExpanded && (
        <Box sx={{ pl: (level + 1) * 4, pr: 2, pb: 1 }}>
          <Typography variant="caption" color="textSecondary">Example:</Typography>
          <pre style={{ 
            backgroundColor: '#f5f5f5', 
            padding: '8px', 
            borderRadius: '4px',
            overflowX: 'auto' 
          }}>
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
};

const APITesting: React.FC = () => {
  const [selectedApi, setSelectedApi] = useState('');
  const [apiSpec, setApiSpec] = useState<ApiSpec | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiOptions = [
    { value: 'cbp.admin-api.json', label: 'CBP Admin API' },
    { value: 'cbp.api.json', label: 'CBP Core Processing API'},
    { value: 'cbp.admin-cu-api.json', label: 'CBP Admin CU API' }
  ];
  
  const loadApiSpec = async (filename: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api-specs/${filename}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setApiSpec(data);
    } catch (error) {
      console.error('Error loading API spec:', error);
      setError('Failed to load API specification. Please try again later.');
      setApiSpec(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedApi) {
      loadApiSpec(selectedApi);
    }
  }, [selectedApi]);

  const resolveRef = (ref: string, apiSpec: ApiSpec | null): any => {
    if (!ref || !apiSpec) return null;
    
    const parts = ref.split('/');
    let current: any = apiSpec;
    
    // Skip the first empty part and '#' if present
    const startIndex = parts[0] === '#' ? 1 : 0;
    
    for (let i = startIndex; i < parts.length; i++) {
      if (!current) return null;
      current = current[parts[i]];
    }
    
    return current;
  };

  const resolveSchema = (schema: any, apiSpec: ApiSpec | null): any => {
    if (!schema) return null;
    
    // Handle $ref
    if (schema.$ref) {
      const resolved = resolveRef(schema.$ref, apiSpec);
      return resolveSchema(resolved, apiSpec);
    }
    
    // Handle array type
    if (schema.type === 'array' && schema.items) {
      return {
        ...schema,
        items: resolveSchema(schema.items, apiSpec)
      };
    }
    
    // Handle allOf, anyOf, oneOf
    ['allOf', 'anyOf', 'oneOf'].forEach(key => {
      if (schema[key]) {
        schema[key] = schema[key].map((subSchema: any) => resolveSchema(subSchema, apiSpec));
      }
    });
    
    // Handle nested properties
    if (schema.properties) {
      const resolvedProperties: Record<string, any> = {};
      Object.entries(schema.properties).forEach(([key, value]: [string, any]) => {
        resolvedProperties[key] = resolveSchema(value, apiSpec);
      });
      schema.properties = resolvedProperties;
    }
    
    return schema;
  };

  const renderSchemaProperties = (schema: any, level: number = 0): React.ReactNode => {
    if (!schema || !schema.properties) return null;
    
    return Object.entries(schema.properties).map(([name, propSchema]: [string, any]) => {
      const resolvedSchema = resolveSchema(propSchema, apiSpec);
      if (!resolvedSchema) return null;

      const type = resolvedSchema.type || 'object';
      const description = resolvedSchema.description || '';
      const examples = resolvedSchema.example || resolvedSchema.examples;
      const required = (schema.required || []).includes(name) ? ' (Required)' : '';
      const format = resolvedSchema.format ? ` (${resolvedSchema.format})` : '';
      const nodeId = `${level}-${name}`;
      const label = `${name}${required} (${type}${format})`;
      
      // Handle nested objects and arrays
      const hasChildren = (
        (type === 'object' && resolvedSchema.properties) ||
        (type === 'array' && resolvedSchema.items)
      );
      
      if (hasChildren) {
        return (
          <TreeNode
            key={nodeId}
            nodeId={nodeId}
            label={label}
            description={description}
            examples={examples}
            level={level + 1}
          >
            {type === 'object' 
              ? renderSchemaProperties(resolvedSchema, level + 1)
              : renderSchemaProperties({ 
                  properties: { 
                    items: resolvedSchema.items 
                  }
                }, level + 1)
            }
          </TreeNode>
        );
      }
      
      return (
        <TreeNode
          key={nodeId}
          nodeId={nodeId}
          label={label}
          description={description}
          examples={examples}
          level={level + 1}
        />
      );
    });
  };

  const renderEndpoint = (path: string, methods: Record<string, any>) => {
    return Object.entries(methods).map(([method, details]) => {
      const operationId = details.operationId || `${method}-${path}`;
      const summary = details.summary || '';
      const description = details.description || '';
      const security = details.security || apiSpec?.security || [];
      const label = `${method.toUpperCase()} ${path}`;
      
      const securityInfo = security.length > 0 
        ? `Authentication: ${security.map((s: any) => Object.keys(s).join(', ')).join(' or ')}` 
        : 'No authentication required';

      return (
        <TreeNode
          key={operationId}
          nodeId={operationId}
          label={label}
          description={`${summary}\n${description}\n${securityInfo}`}
          level={0}
        >
          {details.parameters && (
            <TreeNode
              key={`${operationId}-params`}
              nodeId={`${operationId}-params`}
              label="Parameters"
              level={1}
            >
              {details.parameters.map((param: any) => {
                const resolvedParam = param.$ref ? resolveRef(param.$ref, apiSpec) : param;
                const resolvedSchema = resolveSchema(resolvedParam.schema, apiSpec);
                
                return (
                  <TreeNode
                    key={`${operationId}-param-${resolvedParam.name}`}
                    nodeId={`${operationId}-param-${resolvedParam.name}`}
                    label={`${resolvedParam.name} (${resolvedParam.in}) - ${resolvedParam.required ? 'Required' : 'Optional'}`}
                    description={resolvedParam.description}
                    examples={resolvedSchema?.example || resolvedSchema?.examples}
                    level={2}
                  >
                    {resolvedSchema && renderSchemaProperties({ properties: { [resolvedParam.name]: resolvedSchema } }, 2)}
                  </TreeNode>
                );
              })}
            </TreeNode>
          )}
          {details.requestBody && (
            <TreeNode
              key={`${operationId}-request`}
              nodeId={`${operationId}-request`}
              label={`Request (${Object.keys(details.requestBody.content).join(', ')})`}
              description={details.requestBody.description}
              level={1}
            >
              {Object.entries(details.requestBody.content).map(([contentType, content]: [string, any]) => {
                const resolvedSchema = resolveSchema(content.schema, apiSpec);
                return (
                  <TreeNode
                    key={`${operationId}-request-${contentType}`}
                    nodeId={`${operationId}-request-${contentType}`}
                    label={contentType}
                    examples={content.example || content.examples}
                    level={2}
                  >
                    {resolvedSchema && renderSchemaProperties(resolvedSchema, 2)}
                  </TreeNode>
                );
              })}
            </TreeNode>
          )}
          {details.responses && (
            <TreeNode
              key={`${operationId}-response`}
              nodeId={`${operationId}-response`}
              label="Responses"
              level={1}
            >
              {Object.entries(details.responses).map(([code, response]: [string, any]) => {
                const resolvedResponse = response.$ref ? resolveRef(response.$ref, apiSpec) : response;
                return (
                  <TreeNode
                    key={`${operationId}-${code}`}
                    nodeId={`${operationId}-${code}`}
                    label={`${code} - ${resolvedResponse.description}`}
                    level={2}
                  >
                    {resolvedResponse.content && Object.entries(resolvedResponse.content).map(([contentType, content]: [string, any]) => {
                      const resolvedSchema = resolveSchema(content.schema, apiSpec);
                      return (
                        <TreeNode
                          key={`${operationId}-${code}-${contentType}`}
                          nodeId={`${operationId}-${code}-${contentType}`}
                          label={contentType}
                          examples={content.example || content.examples}
                          level={3}
                        >
                          {resolvedSchema && renderSchemaProperties(resolvedSchema, 3)}
                        </TreeNode>
                      );
                    })}
                  </TreeNode>
                );
              })}
            </TreeNode>
          )}
        </TreeNode>
      );
    });
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          API Testing
        </Typography>
        
        <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
          <InputLabel>Select API</InputLabel>
          <Select
            value={selectedApi}
            onChange={(e) => setSelectedApi(e.target.value)}
            label="Select API"
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
                renderEndpoint(path, methods)
              ))}
            </List>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default APITesting;
