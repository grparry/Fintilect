import React, { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import logger from '../../utils/logger';

export interface BaseModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  'data-testid'?: string;
  modalId?: string;
}
const BaseModal: React.FC<BaseModalProps> = ({
  open,
  onClose,
  title,
  children,
  'data-testid': testId = 'base-modal',
  modalId = 'dynamic-modal'
}) => {
  useEffect(() => {
    if (open) {
      logger.info({
        message: 'Modal: Opened',
        modalId,
        title: title || 'Untitled',
        timestamp: new Date().toISOString()
      });
    }
  }, [open, modalId, title]);
  const handleClose = (event: React.MouseEvent | {}, reason: string) => {
    logger.info({
      message: 'Modal: Close attempt',
      modalId,
      title: title || 'Untitled',
      reason,
      allowed: reason !== 'backdropClick',
      timestamp: new Date().toISOString()
    });
    if (reason !== 'backdropClick') {
      onClose();
    }
  };
  const handleCloseButtonClick = () => {
    logger.info({
      message: 'Modal: Close button clicked',
      modalId,
      title: title || 'Untitled',
      timestamp: new Date().toISOString()
    });
    onClose();
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      data-testid={testId}
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: 5,
        },
      }}
    >
      {title && (
        <DialogTitle
          sx={{
            m: 0,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h6" color="text.primary" component="div">
            {title}
          </Typography>
          <IconButton
            aria-label="close"
            onClick={handleCloseButtonClick}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
      )}
      <DialogContent dividers>
        <Box sx={{ mt: 1 }}>{children}</Box>
      </DialogContent>
    </Dialog>
  );
};
export default BaseModal;