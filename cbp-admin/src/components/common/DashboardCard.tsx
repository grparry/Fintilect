import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import { ElementType } from 'react';
import { DashboardCardProps } from '@/../types/components.types';

interface ExtendedDashboardCardProps extends DashboardCardProps {
  value?: string | number;
  icon?: ElementType;
}

const DashboardCard: React.FC<ExtendedDashboardCardProps> = ({
  title,
  value,
  icon: Icon,
  loading = false,
  subtitle,
  action,
  footerContent,
  className,
  style,
}) => {
  return (
    <Card sx={{ height: '100%' }} className={className} style={style}>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Typography variant="subtitle2" color="textSecondary">
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="textSecondary">
                {subtitle}
              </Typography>
            )}
            {loading ? (
              <CircularProgress size={20} />
            ) : (
              <Typography variant="h4" component="div">
                {value}
              </Typography>
            )}
          </Box>
          {Icon && (
            <Box
              sx={{
                backgroundColor: 'primary.light',
                borderRadius: '50%',
                p: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon color="primary" />
            </Box>
          )}
        </Box>
        {action && (
          <Box sx={{ mt: 2 }}>
            {action}
          </Box>
        )}
        {footerContent && (
          <Box sx={{ mt: 2, borderTop: 1, borderColor: 'divider', pt: 2 }}>
            {footerContent}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
