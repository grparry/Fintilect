import React from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const ChatLanding: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract the current tab from the URL path
  const currentTab = location.pathname.split('/').pop() || 'talkative';

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    navigate(`/admin/emerge-config/user-services/chat/${newValue}`);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          aria-label="chat settings tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab
            label="Talkative Chat"
            value="talkative"
            id="chat-tab-talkative"
          />
          <Tab
            label="Comm100"
            value="comm100"
            id="chat-tab-comm100"
          />
          <Tab
            label="Live Chat"
            value="live-chat"
            id="chat-tab-live-chat"
          />
          <Tab
            label="Glia"
            value="glia"
            id="chat-tab-glia"
          />
          <Tab
            label="CoBrowse"
            value="cobrowse"
            id="chat-tab-cobrowse"
          />
        </Tabs>
      </Box>
      {/* Content area for the child routes */}
      <Box sx={{ p: 3 }}>
        {/* Child components will be rendered here by the router */}
      </Box>
    </Box>
  );
};

export default ChatLanding;
