import React from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';
import { AlertSeverity } from '../../../../../types/member-center.types';

interface AlertIconProps extends Omit<SvgIconProps, 'color'> {
  severity: AlertSeverity;
}

const AlertIcon: React.FC<AlertIconProps> = ({ severity, ...props }) => {
  const color = {
    info: 'info',
    warning: 'warning',
    error: 'error',
  }[severity] as SvgIconProps['color'];

  return (
    <SvgIcon {...props} color={color}>




    <SvgIcon {...props} color={color}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
    </SvgIcon>
  );

