import React, { useState } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Member, MemberSearchFilters, MemberStatus, IMemberService } from '../../../types/member-center.types';
import type { ApiResponse } from '../../../utils/api';
import { memberService } from '../../../services/factory/ServiceFactory';
import MemberSearchForm from './components/search/MemberSearch';
import SearchResults from './components/search/SearchResults';

interface MemberSearchProps {
  onViewMember?: (member: Member) => void;
}

interface MemberSearchState {
  searchResults: { items: Member[], total: number } | null;
  loading: boolean;
  error: string | null;
  success: string | null;
  currentFilters: MemberSearchFilters | null;
}

const MemberSearch: React.FC<MemberSearchProps> = ({ onViewMember }) => {
  const [state, setState] = useState<MemberSearchState>({
    searchResults: null,
    loading: false,
    error: null,
    success: null,
    currentFilters: null
  });

  const setLoading = (loading: boolean) => {
    setState(prev => ({ ...prev, loading }));
  };

  const setSearchResults = (searchResults: { items: Member[], total: number }) => {
    setState(prev => ({ ...prev, searchResults }));
  };

  const setError = (error: string) => {
    setState(prev => ({ ...prev, error }));
  };

  const setSuccess = (success: string) => {
    setState(prev => ({ ...prev, success }));
  };

  const setCurrentFilters = (filters: MemberSearchFilters) => {
    setState(prev => ({ ...prev, currentFilters: filters }));
  };

  const handleSearch = async (filters: MemberSearchFilters) => {
    try {
      setLoading(true);
      const response = await memberService.searchMembers(filters);
      setSearchResults(response);
      setCurrentFilters(filters);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to search members');
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (member: Member) => {
    if (onViewMember) {
      onViewMember(member);
    }
  };

  const handleUpdateStatus = async (memberId: string, status: MemberStatus) => {
    try {
      setLoading(true);
      await memberService.updateMemberStatus(memberId, status);
      // Refresh search results
      const filters = state.currentFilters;
      if (filters) {
        const response = await memberService.searchMembers(filters);
        setSearchResults(response);
        setSuccess('Member status updated successfully');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to update member status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      {state.error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {state.error}
        </Alert>
      )}
      {state.success && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess(null)}>
          {state.success}
        </Alert>
      )}

      <MemberSearchForm onSearch={handleSearch} />

      {state.loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
          <CircularProgress />
        </Box>
      ) : (
        state.searchResults && (
          <SearchResults
            results={state.searchResults}
            onSelect={handleSelect}
            onUpdateStatus={handleUpdateStatus}
          />
        )
      )}
    </Box>
  );
};

export default MemberSearch;
