import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
  useTheme
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

interface AboutDialogProps {
  open: boolean;
  onClose: () => void;
}

const APP_VERSION = '0.8';

const AboutDialog: React.FC<AboutDialogProps> = ({ open, onClose }) => {
  const theme = useTheme();
  
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        alignItems: 'center',
        gap: 1
      }}>
        <InfoIcon color="primary" />
        About CBP Admin Portal
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Box sx={{ py: 2 }}>
          <Typography variant="body1" gutterBottom>
            <strong>Version:</strong> {APP_VERSION}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            © {new Date().getFullYear()} Fintilect. All rights reserved.
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AboutDialog;
