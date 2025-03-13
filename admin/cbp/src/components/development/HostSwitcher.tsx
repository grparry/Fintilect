import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  List, 
  ListItem, 
  ListItemText, 
  Divider, 
  Chip,
  Link,
  Button,
  IconButton,
  Collapse
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { CLIENT_CONFIGS_BY_HOSTNAME, ClientConfig } from '../../config/host.config';

// Only show this component in development mode
const isDevelopment = process.env.NODE_ENV === 'development';

// Styled components
const HostSwitcherContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  maxWidth: 800,
  marginLeft: 'auto',
  marginRight: 'auto',
}));

const EnvironmentSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const EnvironmentHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: 'pointer',
  padding: theme.spacing(1),
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
}));

const HostItem = styled(ListItem)(({ theme }) => ({
  borderLeft: `4px solid ${theme.palette.divider}`,
  marginBottom: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const AdminChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  marginRight: theme.spacing(1),
}));

const ClientChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  marginRight: theme.spacing(1),
}));

const EnvironmentChip = styled(Chip)(({ theme }) => ({
  marginRight: theme.spacing(1),
}));

/**
 * Development-only component that allows switching between different hostnames
 * for testing purposes. Only visible in development mode.
 */
const HostSwitcher: React.FC = () => {
  // Don't render anything in production
  if (!isDevelopment) {
    return null;
  }

  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    production: false,
    test: true,
    development: true
  });

  // Group hosts by environment
  const hostsByEnvironment: Record<string, ClientConfig[]> = {
    production: [],
    test: [],
    development: []
  };

  // Organize hosts by environment
  Object.values(CLIENT_CONFIGS_BY_HOSTNAME).forEach(config => {
    if (hostsByEnvironment[config.environment]) {
      hostsByEnvironment[config.environment].push(config);
    }
  });

  // Toggle section expansion
  const toggleExpand = (env: string) => {
    setExpanded(prev => ({
      ...prev,
      [env]: !prev[env]
    }));
  };

  // Generate URL with hostname parameter
  const getHostnameUrl = (hostname: string): string => {
    const url = new URL(window.location.href);
    url.searchParams.set('hostname', hostname);
    return url.toString();
  };

  // Get the current hostname from URL params or window.location
  const getCurrentHostname = (): string => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('hostname') || window.location.hostname;
  };

  const currentHostname = getCurrentHostname();

  return (
    <HostSwitcherContainer elevation={3}>
      <Typography variant="h5" gutterBottom>
        Host Environment Switcher
      </Typography>
      <Typography variant="body2" color="textSecondary" paragraph>
        This tool allows you to test the application with different hostnames without changing your hosts file.
        Click on any hostname to simulate that environment. This feature only works in development mode.
      </Typography>

      <Box mb={2}>
        <Typography variant="subtitle2">Current Hostname:</Typography>
        <Chip 
          label={currentHostname} 
          color="primary" 
          variant="outlined" 
        />
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Production Environments */}
      <EnvironmentSection>
        <EnvironmentHeader onClick={() => toggleExpand('production')}>
          <Typography variant="subtitle1">
            <EnvironmentChip 
              label="Production" 
              color="error" 
              size="small" 
            />
            Production Environments ({hostsByEnvironment.production.length})
          </Typography>
          <IconButton size="small">
            {expanded.production ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </EnvironmentHeader>
        
        <Collapse in={expanded.production}>
          <List>
            {hostsByEnvironment.production.map(config => (
              <HostItem key={config.hostname}>
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center">
                      {config.isAdmin ? 
                        <AdminChip label="Admin" size="small" /> : 
                        <ClientChip label="Client" size="small" />
                      }
                      <Link href={getHostnameUrl(config.hostname)}>
                        {config.hostname}
                      </Link>
                    </Box>
                  }
                  secondary={`${config.name} (Client ID: ${config.clientId})`}
                />
              </HostItem>
            ))}
          </List>
        </Collapse>
      </EnvironmentSection>

      {/* Test Environments */}
      <EnvironmentSection>
        <EnvironmentHeader onClick={() => toggleExpand('test')}>
          <Typography variant="subtitle1">
            <EnvironmentChip 
              label="Test" 
              color="warning" 
              size="small" 
            />
            Test Environments ({hostsByEnvironment.test.length})
          </Typography>
          <IconButton size="small">
            {expanded.test ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </EnvironmentHeader>
        
        <Collapse in={expanded.test}>
          <List>
            {hostsByEnvironment.test.map(config => (
              <HostItem key={config.hostname}>
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center">
                      {config.isAdmin ? 
                        <AdminChip label="Admin" size="small" /> : 
                        <ClientChip label="Client" size="small" />
                      }
                      <Link href={getHostnameUrl(config.hostname)}>
                        {config.hostname}
                      </Link>
                    </Box>
                  }
                  secondary={`${config.name} (Client ID: ${config.clientId})`}
                />
              </HostItem>
            ))}
          </List>
        </Collapse>
      </EnvironmentSection>

      {/* Development Environments */}
      <EnvironmentSection>
        <EnvironmentHeader onClick={() => toggleExpand('development')}>
          <Typography variant="subtitle1">
            <EnvironmentChip 
              label="Dev" 
              color="success" 
              size="small" 
            />
            Development Environments ({hostsByEnvironment.development.length})
          </Typography>
          <IconButton size="small">
            {expanded.development ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </EnvironmentHeader>
        
        <Collapse in={expanded.development}>
          <List>
            {hostsByEnvironment.development.map(config => (
              <HostItem key={config.hostname}>
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center">
                      {config.isAdmin ? 
                        <AdminChip label="Admin" size="small" /> : 
                        <ClientChip label="Client" size="small" />
                      }
                      <Link href={getHostnameUrl(config.hostname)}>
                        {config.hostname}
                      </Link>
                    </Box>
                  }
                  secondary={`${config.name} (Client ID: ${config.clientId})`}
                />
              </HostItem>
            ))}
          </List>
        </Collapse>
      </EnvironmentSection>

      <Divider sx={{ mb: 2 }} />
      
      <Typography variant="caption" color="textSecondary">
        Note: Switching hostnames will clear your current session and require you to log in again.
      </Typography>
    </HostSwitcherContainer>
  );
};

export default HostSwitcher;
