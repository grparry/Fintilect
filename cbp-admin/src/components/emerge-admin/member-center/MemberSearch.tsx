import React, { useState } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Member, MemberSearchFilters, MemberStatus, MemberSearchResult } from '../../../types/member-center.types';
import { memberService } from '../../../services/member.service';
import MemberSearchForm from './components/search/MemberSearch';
import SearchResults from './components/search/SearchResults';

interface MemberSearchProps {
  onViewMember?: (member: Member) => void;
}

const MemberSearch: React.FC<MemberSearchProps> = ({ onViewMember }) => {
  const [searchResults, setSearchResults] = useState<MemberSearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (filters: MemberSearchFilters) => {
    try {
      setLoading(true);
      setError(null);
      const results = await memberService.searchMembers(filters);
      setSearchResults(results);
    } catch (err) {
      setError('Failed to search members');
      console.error('Error searching members:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (member: Member) => {
    if (onViewMember) {
      onViewMember(member);
    }
  };

  const handleUpdateStatus = async (member: Member, newStatus: MemberStatus) => {
    try {
      await memberService.updateMemberStatus(member.id, newStatus);
      if (searchResults) {
        const updatedMembers = searchResults.members.map((m) =>
          m.id === member.id ? { ...m, status: newStatus } : m
        );
        setSearchResults({
          ...searchResults,
          members: updatedMembers
        });
      }
    } catch (err) {
      setError('Failed to update member status');
      console.error('Error updating member status:', err);
    }
  };

  return (
    <Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ mb: 3 }}>
        <MemberSearchForm onSearch={handleSearch} />
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress />
        </Box>
      ) : searchResults?.members.length ? (
        <>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Search Results ({searchResults.members.length})
          </Typography>
          <SearchResults
            results={searchResults}
            onSelect={handleSelect}
            onUpdateStatus={handleUpdateStatus}
          />
        </>
      ) : (
        <Typography color="textSecondary" align="center">
          No results found. Try adjusting your search criteria.
        </Typography>
      )}
    </Box>
  );
};

export default MemberSearch;
