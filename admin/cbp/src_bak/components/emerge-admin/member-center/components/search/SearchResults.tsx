import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Typography,
  Menu,
  MenuItem,
  Button,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Block as BlockIcon,
  HourglassEmpty as PendingIcon,
} from '@mui/icons-material';
import { Member, MemberSearchResult, MemberStatus } from '../../../../types/member-center.types';

interface SearchResultsProps {
  results: MemberSearchResult;
  onSelect: (member: Member) => void;
  onUpdateStatus: (member: Member, newStatus: MemberStatus) => void;
}

const getStatusIcon = (status: MemberStatus) => {
  switch (status) {
    case 'Active':
      return <CheckCircleIcon fontSize="small" />;
    case 'Suspended':
      return <BlockIcon fontSize="small" />;
    case 'Inactive':
      return <WarningIcon fontSize="small" />;
    case 'Pending':
      return <PendingIcon fontSize="small" />;
    default:
      return <CheckCircleIcon fontSize="small" />;
  }
};

const getStatusColor = (status: MemberStatus): "success" | "error" | "warning" | "info" | "default" => {
  switch (status) {
    case 'Active':
      return 'success';
    case 'Suspended':
      return 'error';
    case 'Inactive':
      return 'warning';
    case 'Pending':
      return 'info';
    default:
      return 'default';
  }
};

const SearchResults: React.FC<SearchResultsProps> = ({ results, onSelect, onUpdateStatus }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedMember, setSelectedMember] = React.useState<Member | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, member: Member) => {
    setAnchorEl(event.currentTarget);
    setSelectedMember(member);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedMember(null);
  };

  const handleStatusUpdate = (newStatus: MemberStatus) => {
    if (selectedMember) {
      onUpdateStatus(selectedMember, newStatus);
      handleMenuClose();
    }
  };

  if (!results.members.length) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>









      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="body1" color="textSecondary">
        </Typography>
      </Box>
    );

    <Box>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="subtitle1" color="textSecondary">
          {results.totalCount} members found
        </Typography>
        <Button variant="outlined" onClick={() => console.log('Export results')}>
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Account #</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.members.map((member) => (
              <TableRow
              >
                <TableCell>{member.accountNumber}</TableCell>
                <TableCell>{`${member.firstName} ${member.lastName}`}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>{member.phone}</TableCell>
                <TableCell>
                  <Chip
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton
                  >
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Menu
      >
        <MenuItem onClick={() => handleStatusUpdate('Active')}>Set Active</MenuItem>
        <MenuItem onClick={() => handleStatusUpdate('Inactive')}>Set Inactive</MenuItem>
        <MenuItem onClick={() => handleStatusUpdate('Suspended')}>Suspend</MenuItem>
        <MenuItem onClick={() => handleStatusUpdate('Pending')}>Set Pending</MenuItem>
      </Menu>
    </Box>
  );

