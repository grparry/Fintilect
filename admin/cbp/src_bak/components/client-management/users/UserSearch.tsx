import React from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface UserSearchProps {
  onSearch: (searchTerm: string) => void;
  loading?: boolean;
}

const UserSearch: React.FC<UserSearchProps> = ({ onSearch, loading }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <Card>





    <Card>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={10}>
              <TextField
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
              >
                {loading ? 'Searching...' : 'Search'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );

