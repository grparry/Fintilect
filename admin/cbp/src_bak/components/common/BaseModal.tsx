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


  'data-testid'?: string;

  'data-testid': testId = 'base-modal',




    <Dialog
    >
      {title && (
        <DialogTitle
        >
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <IconButton
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

