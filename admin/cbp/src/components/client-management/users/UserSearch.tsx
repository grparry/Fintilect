import React from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface UserSearchProps {
  onSearch: (searchTerm: string) => void;
  onFilterChange?: (showInactive: boolean) => void;
  showInactive?: boolean;
  loading?: boolean;
}
const UserSearch: React.FC<UserSearchProps> = ({ onSearch, onFilterChange, showInactive = false, loading }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(searchTerm);
  };
  
  const handleInactiveToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onFilterChange) {
      onFilterChange(event.target.checked);
    }
  };
  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Search Users"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, email, or role..."
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={showInactive}
                    onChange={handleInactiveToggle}
                    color="primary"
                  />
                }
                label="Show Inactive"
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