import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ServiceFactory } from '../../../services/factory/ServiceFactory';
import { FisPayeeRequest, FisPayeeResponse } from '../../../types/bill-pay.types';

const FormContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  '& .MuiTextField-root': {
    marginBottom: theme.spacing(2),
  },
}));

const FisPayeeCheck: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FisPayeeRequest>();
  const [searchResult, setSearchResult] = useState<FisPayeeResponse | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const payeeService = ServiceFactory.getInstance().getPayeeService();

  const onSubmit = async (data: FisPayeeRequest) => {
    setIsSearching(true);
    try {
      const result = await payeeService.getFisPayee(data);
      setSearchResult(result);
    } catch (error) {
      console.error('FIS payee search failed:', error);
      setSearchResult({
        payeeId: undefined,
        message: `Search failed: ${error.message}`
      });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <FormContainer>
      <Typography variant="h6" color="text.primary" gutterBottom>
        FIS Payee Check
      </Typography>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          label="Payee Name"
          {...register('name')}
          required
        />
        
        <TextField
          fullWidth
          label="Payee Account Number"
          {...register('usersAccountAtPayee')}
          required
        />
        
        <TextField
          fullWidth
          label="ZIP Code"
          {...register('postalCode')}
        />
        
        <TextField
          fullWidth
          label="Address Line 1"
          {...register('address1')}
        />
        
        <TextField
          fullWidth
          label="City"
          {...register('city')}
        />
        
        <TextField
          fullWidth
          label="State"
          {...register('state')}
        />
        
        <Button 
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSearching}
        >
          {isSearching ? 'Searching...' : 'Search Payee'}
        </Button>
      </form>

      {searchResult && (
        <Box mt={3}>
          <Typography variant="subtitle1" color={searchResult.payeeId ? 'success.main' : 'error.main'}>
            {searchResult.message}
          </Typography>
          {searchResult.payeeId && (
            <Typography variant="body1" color="text.primary">
              Payee ID: {searchResult.payeeId}
            </Typography>
          )}
        </Box>
      )}
    </FormContainer>
  );
};

export default FisPayeeCheck;
