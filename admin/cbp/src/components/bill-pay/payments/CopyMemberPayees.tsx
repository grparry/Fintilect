import React, { useState } from 'react';
import { ServiceFactory } from '../../../services/factory/ServiceFactory';
import { IPayeeService } from '../../../services/interfaces/IPayeeService';
import { UserPayeeData } from '../../../types/payees.types';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';

const CopyMemberPayees: React.FC = () => {
  const [sourceMemberId, setSourceMemberId] = useState('');
  const [targetMemberId, setTargetMemberId] = useState('');
  const [confirmTargetMemberId, setConfirmTargetMemberId] = useState('');
  const [confirmationInput, setConfirmationInput] = useState('');
  const [payees, setPayees] = useState<UserPayeeData[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [copyLoading, setCopyLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [copyError, setCopyError] = useState<string | null>(null);
  const [searchSuccess, setSearchSuccess] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const payeeService = ServiceFactory.getInstance().getPayeeService();

  const handleSearch = async () => {
    if (!sourceMemberId.trim()) {
      setSearchError('Please enter a source member ID');
      return;
    }

    try {
      setSearchLoading(true);
      setSearchError(null);
      setSearchSuccess(false);
      setError(null);
      setCopySuccess(false);
      setTargetMemberId('');
      setConfirmTargetMemberId('');
      setConfirmationInput('');

      const response = await payeeService.getMemberPayees(sourceMemberId);
      setPayees(response.payees || []);
      setSearchSuccess(true);
    } catch (err) {
      setSearchError('Failed to retrieve member payees. Please try again.');
      console.error('Error retrieving member payees:', err);
    } finally {
      setSearchLoading(false);
    }
  };

  const validateAndOpenConfirmation = () => {
    // Reset errors
    setCopyError(null);
    
    // Validate inputs
    if (!targetMemberId.trim()) {
      setCopyError('Please enter a target member ID');
      return;
    }

    if (!confirmTargetMemberId.trim()) {
      setCopyError('Please confirm the target member ID');
      return;
    }

    if (targetMemberId !== confirmTargetMemberId) {
      setCopyError('Target member IDs do not match');
      return;
    }

    if (!sourceMemberId.trim() || payees.length === 0) {
      setCopyError('Please search for source member payees first');
      return;
    }

    if (targetMemberId === sourceMemberId) {
      setCopyError('Target member ID cannot be the same as source member ID');
      return;
    }

    // Open confirmation dialog
    setConfirmDialogOpen(true);
  };

  const handleConfirmationClose = () => {
    setConfirmDialogOpen(false);
    setConfirmationInput('');
  };

  const handleConfirmationSubmit = () => {
    if (confirmationInput.toLowerCase() === 'yes') {
      handleCopy();
      handleConfirmationClose();
    } else {
      // Do nothing, keep dialog open
    }
  };

  const handleCopy = async () => {
    try {
      setCopyLoading(true);
      setCopyError(null);
      setCopySuccess(false);
      setError(null);

      await payeeService.copyMemberPayees({
        memberId: sourceMemberId,
        newMemberId: targetMemberId
      });
      
      setCopySuccess(true);
      // Clear all Step 2 inputs
      setTargetMemberId('');
      setConfirmTargetMemberId('');
      setConfirmationInput('');
    } catch (err) {
      setCopyError(`Failed to copy member payees: ${err instanceof Error ? err.message : 'Unknown error'}`);
      console.error('Error copying member payees:', err);
    } finally {
      setCopyLoading(false);
    }
  };

  return (
    <Card sx={{ width: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Copy Member Payees
        </Typography>
        
        {/* Source Member Search Section */}
        <Box sx={{ mt: 2, width: '100%' }}>
          <Typography variant="subtitle1" gutterBottom>
            Step 1: Search for Source Member Payees
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              fullWidth
              label="Source Member ID"
              value={sourceMemberId}
              onChange={(e) => setSourceMemberId(e.target.value)}
              disabled={searchLoading}
              error={!!searchError}
              helperText={searchError}
            />
            <Button
              variant="contained"
              onClick={handleSearch}
              disabled={searchLoading || !sourceMemberId.trim()}
              startIcon={searchLoading ? <CircularProgress size={20} /> : undefined}
              sx={{ minWidth: '150px', height: '40px' }}
            >
              {searchLoading ? 'Searching...' : 'Search Payees'}
            </Button>
          </Box>





          {/* Display Payees */}
          {payees.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Found {payees.length} payees for member {sourceMemberId}
              </Typography>
              <TableContainer component={Paper} variant="outlined" sx={{ maxHeight: 280, overflow: 'auto', width: '100%', minWidth: '800px' }}>
                <Table stickyHeader size="small" aria-label="payee table" sx={{ tableLayout: 'fixed' }}>
                  <TableHead>
                    <TableRow>
                      <TableCell width="20%">Payee Name</TableCell>
                      <TableCell width="15%">Account</TableCell>
                      <TableCell width="8%">Type</TableCell>
                      <TableCell width="8%">Method</TableCell>
                      <TableCell width="25%">Address</TableCell>
                      <TableCell width="15%">FIS Payee ID</TableCell>
                      <TableCell width="9%">Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {payees.map((payee, index) => (
                      <TableRow key={payee.userPayeeListId || index} hover>
                        <TableCell>
                          <Typography variant="body2" fontWeight="medium">
                            {payee.payee.payeeName || 'Unnamed Payee'}
                            {payee.nickName && <Box component="span" sx={{ fontStyle: 'italic', ml: 0.5 }}>({payee.nickName})</Box>}
                          </Typography>
                        </TableCell>
                        <TableCell>{payee.usersAccountAtPayee || 'N/A'}</TableCell>
                        <TableCell>{payee.payeeType || 'N/A'}</TableCell>
                        <TableCell>{payee.paymentMethod || 'N/A'}</TableCell>
                        <TableCell>
                          {payee.payee.addressLine1 ? (
                            <Typography variant="body2" noWrap>
                              {payee.payee.addressLine1}
                              {payee.payee.city && `, ${payee.payee.city}`}
                              {payee.payee.state && `, ${payee.payee.state}`}
                            </Typography>
                          ) : 'N/A'}
                        </TableCell>
                        <TableCell>{payee.fisPayeeId || 'None'}</TableCell>
                        <TableCell>{payee.active ? 'Active' : 'Inactive'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}

          <Divider sx={{ my: 3 }} />

          {/* Target Member Copy Section */}
          <Typography variant="subtitle1" gutterBottom>
            Step 2: Copy Payees to Target Member
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <TextField
                label="Target Member ID"
                value={targetMemberId}
                onChange={(e) => setTargetMemberId(e.target.value)}
                disabled={copyLoading || payees.length === 0}
                error={!!copyError}
                sx={{ flex: 1 }}
              />
              <TextField
                label="Confirm Target Member ID"
                value={confirmTargetMemberId}
                onChange={(e) => setConfirmTargetMemberId(e.target.value)}
                disabled={copyLoading || payees.length === 0}
                error={!!copyError}
                sx={{ flex: 1 }}
              />
              <Button
                variant="contained"
                onClick={validateAndOpenConfirmation}
                disabled={copyLoading || !targetMemberId.trim() || !confirmTargetMemberId.trim() || payees.length === 0}
                startIcon={copyLoading ? <CircularProgress size={20} /> : undefined}
                sx={{ minWidth: '150px', height: '40px' }}
              >
                {copyLoading ? 'Copying...' : 'Copy Payees'}
              </Button>
            </Box>
            {copyError && (
              <Typography color="error" variant="caption">
                {copyError}
              </Typography>
            )}
          </Box>

          {copySuccess && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Successfully copied {payees.length} payees from member {sourceMemberId} to member {targetMemberId}
            </Alert>
          )}


        </Box>

        {/* General Error Display */}
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        {/* Confirmation Dialog */}
        <Dialog open={confirmDialogOpen} onClose={handleConfirmationClose}>
          <DialogTitle>Confirm Copy Operation</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ mb: 2 }}>
              Copying member payees should only be done when you are certain that the same person has ownership of the old and new accounts, and they will no longer be using the old account number.
            </DialogContentText>
            <DialogContentText sx={{ mb: 2 }}>
              Type "yes" to confirm that you want to copy {payees.length} payees from member {sourceMemberId} to member {targetMemberId}.
            </DialogContentText>
            <TextField
              autoFocus
              fullWidth
              label="Type 'yes' to confirm"
              value={confirmationInput}
              onChange={(e) => setConfirmationInput(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleConfirmationClose} color="primary">
              Cancel
            </Button>
            <Button 
              onClick={handleConfirmationSubmit} 
              color="primary"
              disabled={confirmationInput.toLowerCase() !== 'yes'}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default CopyMemberPayees;
