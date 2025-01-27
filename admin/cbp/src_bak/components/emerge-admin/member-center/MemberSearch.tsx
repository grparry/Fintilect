import React, { useState } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Member, MemberSearchFilters, MemberStatus, MemberSearchResult } from '../../types/member-center.types';
import { IMemberService } from '../../../services/interfaces/IMemberService';
import { useService } from '../../../hooks/useService';
import MemberSearchForm from './components/search/MemberSearch';
import SearchResults from './components/search/SearchResults';
import { PaginatedResponse } from '../../../types/common.types';

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






      ...prev, 







    <Box>
      {state.error && (
        <Alert 
        >
          {state.error}
        </Alert>
      )}
      {state.success && (
        <Alert 
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
        />
      )}
    </Box>
  );

