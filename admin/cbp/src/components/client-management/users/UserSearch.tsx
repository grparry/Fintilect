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
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={10}>
              <TextField
                fullWidth
                label="Search Users"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, email, or role..."
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                startIcon={<SearchIcon />}
                disabled={loading}
              >
                {loading ? 'Searching...' : 'Search'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};
export default UserSearch;