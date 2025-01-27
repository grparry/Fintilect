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
  const resources: Resource[] = [
    { id: '1', title: 'Resource 1' },
    { id: '2', title: 'Resource 2' },
  ];
  const handleItemClick = (itemId: string) => {
    setError(null);
    navigate(`/${itemId}`);
  };
  const handleClose = () => {
    setError(null);
    navigate('/');
  };
  // Show error for invalid IDs
  React.useEffect(() => {
    if (id && !resources.find(r => r.id === id)) {
      setError('Resource not found');
    }
  }, [id]);
  if (id) {
    const resource = resources.find(r => r.id === id);
    return (
      <BaseModal
        open={true}
        onClose={handleClose}
        title={resource?.title}
        data-testid="resource-modal"
      >
        {error ? (
          <Box data-testid="error-message">{error}</Box>
        ) : (
          <Box>{resource?.title}</Box>
        )}
      </BaseModal>
    );
  }
  return (
    <List data-testid="resource-list">
      {resources.map(resource => (
        <ListItem
          key={resource.id}
          onClick={() => handleItemClick(resource.id)}
          data-testid={`resource-item-${resource.id}`}
          button
        >
          {resource.title}
        </ListItem>
      ))}
    </List>
  );
};