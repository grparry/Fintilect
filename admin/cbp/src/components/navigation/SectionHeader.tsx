import React from 'react';
import { Box, Typography, styled } from '@mui/material';
import { Icon } from '@mui/material';

interface SectionHeaderProps {
  title: string;
  color: string;
  icon: string;
}
const HeaderContainer = styled(Box)<{ backgroundColor: string }>(({ backgroundColor }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '16px',
  backgroundColor,
  color: '#fff',
  gap: '12px',
  minHeight: '64px',
  '& .MuiIcon-root': {
    color: 'inherit',
  },
}));
const SectionHeader: React.FC<SectionHeaderProps> = ({ title, color, icon }) => {
  return (
    <HeaderContainer backgroundColor={color}>
      <Icon>{icon}</Icon>
      <Typography variant="h6" component="h2" sx={{ flexGrow: 1 }}>
        {title}
      </Typography>
    </HeaderContainer>
  );
};
export default SectionHeader;