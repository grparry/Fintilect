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
  Tooltip,
  Box,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PeopleIcon from '@mui/icons-material/People';
import SecurityIcon from '@mui/icons-material/Security';
import { Group } from '../../../types/client.types';
import dayjs from 'dayjs';

interface GroupTableProps {
  groups: Group[];
  onEdit: (group: Group) => void;
  onDelete: (group: Group) => void;
  onManageMembers: (group: Group) => void;
  onManageRoles: (group: Group) => void;
}

const GroupTable: React.FC<GroupTableProps> = ({
  groups,
  onEdit,
  onDelete,
  onManageMembers,
  onManageRoles,
}) => {
  if (groups.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="body1" color="textSecondary">
          No groups found
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
            <TableCell>Description</TableCell>
            <TableCell>Created</TableCell>
            <TableCell>Last Updated</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {groups.map((group) => (
            <TableRow key={group.id}>
              <TableCell>
                <Typography variant="body2">
                  {group.name}
                </Typography>
              </TableCell>
              <TableCell>{group.description || '-'}</TableCell>
              <TableCell>
                {group.createdAt ? dayjs(group.createdAt).format('MMM D, YYYY h:mm A') : '-'}
              </TableCell>
              <TableCell>
                {group.updatedAt ? dayjs(group.updatedAt).format('MMM D, YYYY h:mm A') : '-'}
              </TableCell>
              <TableCell>
                <Box>
                  <Tooltip title="Edit group">
                    <IconButton size="small" onClick={() => onEdit(group)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Manage members">
                    <IconButton size="small" onClick={() => onManageMembers(group)}>
                      <PeopleIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Manage roles">
                    <IconButton size="small" onClick={() => onManageRoles(group)}>
                      <SecurityIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete group">
                    <IconButton size="small" onClick={() => onDelete(group)}>
                      <DeleteIcon fontSize="small" />
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

export default GroupTable;
