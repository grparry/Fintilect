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
import { User, UserGroup } from '../../../types/client.types';
import dayjs from 'dayjs';
import { encodeId } from '../../../utils/idEncoder';
import { useNavigate } from 'react-router-dom';

interface UserTableProps {
  users: User[];
  groups: UserGroup[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onToggleLock: (user: User) => void;
  clientId: string;
}

const statusColors = {
  Active: 'success',
  Inactive: 'error',
  Pending: 'warning',
  Locked: 'error',
} as const;

const roleColors: Record<string, "error" | "default" | "warning" | "info"> = {
  Admin: 'error',
  User: 'default',
  Manager: 'warning',
  Support: 'info',
  ReadOnly: 'default',
} as const;

const UserTable: React.FC<UserTableProps> = ({
  users,
  groups,
  onEdit,
  onDelete,
  onToggleLock,
  clientId,
}) => {
  const navigate = useNavigate();

  const handleEdit = (user: User) => {
    console.log('=== Navigation Debug Start ===');
    console.log('1. Current clientId:', clientId);
    
    const encodedClientId = encodeId(clientId);
    console.log('2. Encoded clientId:', encodedClientId);
    
    const encodedUserId = encodeId(user.id);
    console.log('3. Encoded userId:', encodedUserId);
    
    const targetPath = `/admin/client-management/${encodedClientId}/users/${encodedUserId}`;
    console.log('4. Target navigation path:', targetPath);
    
    console.log('5. About to navigate...');
    navigate(targetPath);
    onEdit(user); // Call the onEdit callback as well
    console.log('=== Navigation Debug End ===');
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
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Department</TableCell>
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
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Chip
                  label={user.role}
                  size="small"
                  color={roleColors[user.role] as any}
                  variant="outlined"
                />
              </TableCell>
              <TableCell>
                <Chip
                  label={user.status}
                  size="small"
                  color={statusColors[user.status] as any}
                />
              </TableCell>
              <TableCell>{user.department || '-'}</TableCell>
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
                    title={user.status === 'Locked' ? 'Unlock user' : 'Lock user'}
                  >
                    <IconButton size="small" onClick={() => onToggleLock(user)}>
                      {user.status === 'Locked' ? (
                        <LockOpenIcon fontSize="small" />
                      ) : (
                        <LockIcon fontSize="small" />
                      )}
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
