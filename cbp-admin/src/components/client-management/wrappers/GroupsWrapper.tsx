import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Groups from '../Groups';
import GroupEdit from '../groups/GroupEdit';

const GroupsWrapper: React.FC = () => {
  const navigate = useNavigate();
  const { clientId = '', groupId } = useParams<{ clientId: string; groupId?: string }>();

  const handleClose = () => {
    navigate(`/admin/client-management/${clientId}/groups`, { replace: true });
  };

  const handleSave = () => {
    navigate(`/admin/client-management/${clientId}/groups`, { replace: true });
  };

  // If groupId is present, show the edit view
  if (groupId) {
    return (
      <GroupEdit 
        clientId={clientId} 
        groupId={groupId} 
        onSave={handleSave}
        onCancel={handleClose}
      />
    );
  }

  // Otherwise show the groups list
  return <Groups clientId={clientId} />;
};

export default GroupsWrapper;
