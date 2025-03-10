import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Tooltip,
  Box,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import KeyIcon from '@mui/icons-material/Key';
import { User as UIUser, UserGroup as UIUserGroup, UserStatus } from '../../../types/client.types';
import dayjs from 'dayjs';
import { encodeId } from '../../../utils/idEncoder';
import { useNavigate } from 'react-router-dom';

interface UserTableProps {
  users: UIUser[];
  groups: UIUserGroup[];
  onEdit: (user: UIUser) => void;
  onDelete: (user: UIUser) => void;
  onToggleLock: (user: UIUser) => void;
  onResetPassword: (user: UIUser) => void;
  clientId: string;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  groups,
  onEdit,
  onDelete,
  onToggleLock,
  onResetPassword,
  clientId,
}) => {
  const navigate = useNavigate();
  const handleEdit = (user: UIUser) => {
    const encodedClientId = encodeId(clientId);
    const encodedUserId = encodeId(user.id);
    // Fix the route to match the route configuration in ClientManagementRoutes.tsx
    navigate(`/admin/client-management/edit/${encodedClientId}/users/${encodedUserId}`);
  };
  if (users.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="body1" color="textSecondary">
          No users found
        </Typography>
      </Box>
    );
  }
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Last Login</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Typography variant="body2">
                  {user.firstName} {user.lastName}
                </Typography>
              </TableCell>
              <TableCell>{user.department || '-'}</TableCell>
              <TableCell>
                <Chip
                  label={user.isLocked ? 'Locked' : (user.isActive ? 'Active' : 'Inactive')}
                  size="small"
                  color={user.isLocked ? 'error' : (user.isActive ? 'success' : 'warning')}
                />
              </TableCell>
              <TableCell>
                {user.lastLogin
                  ? dayjs(user.lastLogin).format('YYYY-MM-DD HH:mm:ss')
                  : 'Never'}
              </TableCell>
              <TableCell>
                <Box>
                  <Tooltip title="Edit user">
                    <IconButton size="small" onClick={() => handleEdit(user)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete user">
                    <IconButton size="small" onClick={() => onDelete(user)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip
                    title={user.isLocked ? 'Unlock user' : 'Lock user'}
                  >
                    <IconButton size="small" onClick={() => onToggleLock(user)}>
                      {user.isLocked ? (
                        <LockOpenIcon fontSize="small" />
                      ) : (
                        <LockIcon fontSize="small" />
                      )}
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Reset password">
                    <IconButton size="small" onClick={() => onResetPassword(user)}>
                      <KeyIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default UserTable;