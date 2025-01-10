import React, { useState } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Member, MemberSearchFilters, MemberStatus, MemberSearchResult } from '../../../types/member-center.types';
import type { ApiResponse } from '../../../utils/api';
import { memberService } from '../../../services/member.service';
import MemberSearchForm from './components/search/MemberSearch';
import SearchResults from './components/search/SearchResults';

interface MemberSearchProps {
  onViewMember?: (member: Member) => void;
}

interface MemberSearchState {
  searchResults: MemberSearchResult | null;
  loading: boolean;
  error: string | null;
  success: string | null;
}

const MemberSearch: React.FC<MemberSearchProps> = ({ onViewMember }) => {
  const [state, setState] = useState<MemberSearchState>({
    searchResults: null,
    loading: false,
    error: null,
    success: null
  });

  const handleSearch = async (filters: MemberSearchFilters) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const response = await memberService.searchMembers(filters);
      
      if (!response.success) {
        throw new Error(response.error.message);
      }

      setState(prev => ({
        ...prev,
        searchResults: response.data,
        loading: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to search members',
        loading: false
      }));
      console.error('Error searching members:', error);
    }
  };

  const handleSelect = (member: Member) => {
    if (onViewMember) {
      onViewMember(member);
    }
  };

  const handleUpdateStatus = async (member: Member, newStatus: MemberStatus) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const response = await memberService.updateMemberStatus(member.id, newStatus);
      
      if (!response.success) {
        throw new Error(response.error.message);
      }

      if (state.searchResults) {
        const updatedMembers = state.searchResults.members.map((m) =>
          m.id === member.id ? { ...m, status: newStatus } : m
        );
        setState(prev => ({
          ...prev,
          searchResults: {
            ...prev.searchResults!,
            members: updatedMembers
          },
          success: 'Member status updated successfully',
          loading: false
        }));
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to update member status',
        loading: false
      }));
      console.error('Error updating member status:', error);
    }
  };

  return (
    <Box>
      {state.error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setState(prev => ({ ...prev, error: null }))}>
          {state.error}
        </Alert>
      )}
      {state.success && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setState(prev => ({ ...prev, success: null }))}>
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
