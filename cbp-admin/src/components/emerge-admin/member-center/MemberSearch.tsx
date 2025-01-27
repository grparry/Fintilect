import React, { useState } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Member, MemberSearchFilters, MemberStatus, MemberSearchResult } from '@/../../types/member-center.types';
import { IMemberService } from '@/../../services/interfaces/IMemberService';
import { useService } from '@/../../hooks/useService';
import MemberSearchForm from '@/components/search/MemberSearch';
import SearchResults from '@/components/search/SearchResults';
import { PaginatedResponse } from '@/../../types/common.types';

interface MemberSearchProps {
  onViewMember?: (member: Member) => void;
}

interface MemberSearchState {
  searchResult: MemberSearchResult | null;
  loading: boolean;
  error: string | null;
  success: string | null;
  currentFilters: MemberSearchFilters | null;
}

const MemberSearch: React.FC<MemberSearchProps> = ({ onViewMember }) => {
  const memberService = useService<IMemberService>('memberService');
  const [state, setState] = useState<MemberSearchState>({
    searchResult: null,
    loading: false,
    error: null,
    success: null,
    currentFilters: null
  });

  const setLoading = (loading: boolean) => {
    setState(prev => ({ ...prev, loading }));
  };

  const setSearchResults = (response: PaginatedResponse<MemberSearchResult>) => {
    setState(prev => ({ 
      ...prev, 
      searchResult: response.items[0]
    }));
  };

  const setError = (error: string | null) => {
    setState(prev => ({ ...prev, error }));
  };

  const setSuccess = (success: string | null) => {
    setState(prev => ({ ...prev, success }));
  };

  const setCurrentFilters = (filters: MemberSearchFilters) => {
    setState(prev => ({ ...prev, currentFilters: filters }));
  };

  const handleSearch = async (filters: MemberSearchFilters) => {
    try {
      setLoading(true);
      setError(null);
      const response = await memberService.searchMembers(filters);
      setSearchResults(response);
      setSuccess('Search completed successfully');
      setCurrentFilters(filters);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to search members');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (member: Member, newStatus: MemberStatus) => {
    try {
      setLoading(true);
      setError(null);
      await memberService.updateMemberStatus(member.id, newStatus);
      if (state.currentFilters) {
        const response = await memberService.searchMembers(state.currentFilters);
        setSearchResults(response);
      }
      setSuccess('Member status updated successfully');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to update member status');
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (member: Member) => {
    if (onViewMember) {
      onViewMember(member);
    }
  };

  return (
    <Box>
      {state.error && (
        <Alert 
          severity="error" 
          sx={{ mb: 2 }} 
          onClose={() => setError(null)}
        >
          {state.error}
        </Alert>
      )}
      {state.success && (
        <Alert 
          severity="success" 
          sx={{ mb: 2 }} 
          onClose={() => setSuccess(null)}
        >
          {state.success}
        </Alert>
      )}

      <MemberSearchForm onSearch={handleSearch} />
      
      {state.loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <CircularProgress />
        </Box>
      )}

      {state.searchResult && (
        <SearchResults
          results={state.searchResult}
          onSelect={handleSelect}
          onUpdateStatus={handleUpdateStatus}
        />
      )}
    </Box>
  );
};

export default MemberSearch;
