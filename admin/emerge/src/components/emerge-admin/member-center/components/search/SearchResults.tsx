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
import { Member, MemberSearchResult, MemberStatus } from '../../../../../types/member-center.types';

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
        <Typography variant="body1" color="textSecondary">
          No members found matching your search criteria.
        </Typography>
      </Box>
    );
  }
  return (
    <Box>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="subtitle1" color="textSecondary">
          {results.totalCount} members found
        </Typography>
        <Button variant="outlined" onClick={() => console.log('Export results')}>
          Export Results
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
                key={member.id}
                hover
                onClick={() => onSelect(member)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell>{member.accountNumber}</TableCell>
                <TableCell>{`${member.firstName} ${member.lastName}`}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>{member.phone}</TableCell>
                <TableCell>
                  <Chip
                    icon={getStatusIcon(member.status)}
                    label={member.status}
                    color={getStatusColor(member.status)}
                    size="small"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMenuOpen(e, member);
                    }}
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
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        onClick={(e) => e.stopPropagation()}
      >
        <MenuItem onClick={() => handleStatusUpdate('Active')}>Set Active</MenuItem>
        <MenuItem onClick={() => handleStatusUpdate('Inactive')}>Set Inactive</MenuItem>
        <MenuItem onClick={() => handleStatusUpdate('Suspended')}>Suspend</MenuItem>
        <MenuItem onClick={() => handleStatusUpdate('Pending')}>Set Pending</MenuItem>
      </Menu>
    </Box>
  );
};
export default SearchResults;