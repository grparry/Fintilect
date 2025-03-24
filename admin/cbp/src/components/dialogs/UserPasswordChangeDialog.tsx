import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box
} from '@mui/material';
import PasswordChangeForm from '../auth/PasswordChangeForm';

interface UserPasswordChangeDialogProps {
  open: boolean;
  onClose: () => void;
}

const UserPasswordChangeDialog: React.FC<UserPasswordChangeDialogProps> = ({
  open,
  onClose
}) => {
  const handleSuccess = () => {
    // Close dialog after success (with delay for user to see success message)
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Change Password</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 1 }}>
          <PasswordChangeForm 
            onSuccess={handleSuccess}
            onCancel={onClose}
            showCancelButton={true}
            successMessage="Password changed successfully!"
            isDialog={true}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default UserPasswordChangeDialog;
