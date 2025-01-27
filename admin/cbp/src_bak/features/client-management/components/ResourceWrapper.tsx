import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, List, ListItem } from '@mui/material';
import BaseModal from '../../../components/common/BaseModal';

export interface Resource {
  id: string;
  title: string;
}

export const ResourceWrapper: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [error, setError] = useState<string | null>(null);

  // Mock data for testing




  // Mock data for testing
    { id: '1', title: 'Resource 1' },
    { id: '2', title: 'Resource 2' },
  ];



  // Show error for invalid IDs

    
      <BaseModal
      >
        {error ? (
          <Box data-testid="error-message">{error}</Box>
        ) : (
          <Box>{resource?.title}</Box>
        )}
      </BaseModal>
    );

    <List data-testid="resource-list">
      {resources.map(resource => (
        <ListItem
        >
          {resource.title}
        </ListItem>
      ))}
    </List>
  );
