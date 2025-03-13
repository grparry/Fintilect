import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Grid, 
  Divider, 
  Paper, 
  Tabs, 
  Tab 
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { ServiceFactory } from '../../../services/factory/ServiceFactory';
import { FisPayeeRequest, FisPayeeDetailedResponse } from '../../../types/bill-pay.types';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`fis-payee-tabpanel-${index}`}
      aria-labelledby={`fis-payee-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `fis-payee-tab-${index}`,
    'aria-controls': `fis-payee-tabpanel-${index}`,
  };
}

const FormContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  '& .MuiTextField-root': {
    marginBottom: theme.spacing(2),
  },
}));

const ResultContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(3),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(1),
}));

const InfoItem = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const FisPayeeCheck: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FisPayeeRequest>();
  const [searchResult, setSearchResult] = useState<FisPayeeDetailedResponse | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const globalPayeeService = ServiceFactory.getInstance().getGlobalPayeeService();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const onSubmit = async (data: FisPayeeRequest) => {
    setIsSearching(true);
    try {
      const result = await globalPayeeService.getFisPayeeDetailed(data);
      setSearchResult(result);
      // Switch to results tab if search was successful
      if (result.payeeId) {
        setTabValue(1);
      }
    } catch (error: any) {
      console.error('FIS payee search failed:', error);
      
      // Display the error message from the service
      setSearchResult({
        payeeId: undefined,
        message: error.message
      });
    } finally {
      setIsSearching(false);
    }
  };

  const renderPayeeForm = () => {
    return (
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
    );
  };

  const renderPayeeResults = () => {
    if (!searchResult) {
      return (
        <Typography variant="body1" color="text.secondary">
          No search results yet. Use the Search tab to find a payee.
        </Typography>
      );
    }

    return (
      <ResultContainer>
        <Typography variant="subtitle1" color={searchResult.payeeId ? 'success.main' : 'error.main'} gutterBottom>
          {searchResult.message}
        </Typography>
        
        {searchResult.payeeId && (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <SectionTitle variant="h6">Payee Information</SectionTitle>
              <Divider />
              
              <InfoItem>
                <Typography variant="body2" color="text.secondary">Payee ID</Typography>
                <Typography variant="body1">{searchResult.payeeId}</Typography>
              </InfoItem>
              
              {searchResult.payeeName && (
                <InfoItem>
                  <Typography variant="body2" color="text.secondary">Payee Name</Typography>
                  <Typography variant="body1">{searchResult.payeeName}</Typography>
                </InfoItem>
              )}
              
              {searchResult.merchantName && (
                <InfoItem>
                  <Typography variant="body2" color="text.secondary">Merchant Name</Typography>
                  <Typography variant="body1">{searchResult.merchantName}</Typography>
                </InfoItem>
              )}
              
              {searchResult.merchantId && (
                <InfoItem>
                  <Typography variant="body2" color="text.secondary">Merchant ID</Typography>
                  <Typography variant="body1">{searchResult.merchantId}</Typography>
                </InfoItem>
              )}
              
              {searchResult.accountNumber && (
                <InfoItem>
                  <Typography variant="body2" color="text.secondary">Account Number</Typography>
                  <Typography variant="body1">{searchResult.accountNumber}</Typography>
                </InfoItem>
              )}
              
              {searchResult.billerType && (
                <InfoItem>
                  <Typography variant="body2" color="text.secondary">Biller Type</Typography>
                  <Typography variant="body1">{searchResult.billerType}</Typography>
                </InfoItem>
              )}
              
              {searchResult.billerId && (
                <InfoItem>
                  <Typography variant="body2" color="text.secondary">Biller ID</Typography>
                  <Typography variant="body1">{searchResult.billerId}</Typography>
                </InfoItem>
              )}
            </Grid>
            
            <Grid item xs={12} md={6}>
              <SectionTitle variant="h6">Address Information</SectionTitle>
              <Divider />
              
              {searchResult.address1 && (
                <InfoItem>
                  <Typography variant="body2" color="text.secondary">Address Line 1</Typography>
                  <Typography variant="body1">{searchResult.address1}</Typography>
                </InfoItem>
              )}
              
              {searchResult.address2 && (
                <InfoItem>
                  <Typography variant="body2" color="text.secondary">Address Line 2</Typography>
                  <Typography variant="body1">{searchResult.address2}</Typography>
                </InfoItem>
              )}
              
              {searchResult.address3 && (
                <InfoItem>
                  <Typography variant="body2" color="text.secondary">Address Line 3</Typography>
                  <Typography variant="body1">{searchResult.address3}</Typography>
                </InfoItem>
              )}
              
              {(searchResult.city || searchResult.state || searchResult.postalCode) && (
                <InfoItem>
                  <Typography variant="body2" color="text.secondary">City, State, ZIP</Typography>
                  <Typography variant="body1">
                    {[
                      searchResult.city, 
                      searchResult.state, 
                      searchResult.postalCode
                    ].filter(Boolean).join(', ')}
                  </Typography>
                </InfoItem>
              )}
              
              {searchResult.country && (
                <InfoItem>
                  <Typography variant="body2" color="text.secondary">Country</Typography>
                  <Typography variant="body1">{searchResult.country}</Typography>
                </InfoItem>
              )}
            </Grid>
            
            {(searchResult.cutoffTime || searchResult.leadDays || searchResult.help || searchResult.terms || searchResult.webhelp) && (
              <Grid item xs={12}>
                <SectionTitle variant="h6">Additional Information</SectionTitle>
                <Divider />
                
                <Grid container spacing={2}>
                  {searchResult.cutoffTime && (
                    <Grid item xs={12} sm={6}>
                      <InfoItem>
                        <Typography variant="body2" color="text.secondary">Cutoff Time</Typography>
                        <Typography variant="body1">{searchResult.cutoffTime}</Typography>
                      </InfoItem>
                    </Grid>
                  )}
                  
                  {searchResult.leadDays && (
                    <Grid item xs={12} sm={6}>
                      <InfoItem>
                        <Typography variant="body2" color="text.secondary">Lead Days</Typography>
                        <Typography variant="body1">{searchResult.leadDays}</Typography>
                      </InfoItem>
                    </Grid>
                  )}
                  
                  {searchResult.webhelp && (
                    <Grid item xs={12}>
                      <InfoItem>
                        <Typography variant="body2" color="text.secondary">Web Help</Typography>
                        <Typography variant="body1">{searchResult.webhelp}</Typography>
                      </InfoItem>
                    </Grid>
                  )}
                  
                  {searchResult.help && (
                    <Grid item xs={12}>
                      <InfoItem>
                        <Typography variant="body2" color="text.secondary">Help</Typography>
                        <Typography variant="body1">{searchResult.help}</Typography>
                      </InfoItem>
                    </Grid>
                  )}
                  
                  {searchResult.terms && (
                    <Grid item xs={12}>
                      <InfoItem>
                        <Typography variant="body2" color="text.secondary">Terms</Typography>
                        <Typography variant="body1">{searchResult.terms}</Typography>
                      </InfoItem>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            )}
          </Grid>
        )}
      </ResultContainer>
    );
  };

  return (
    <FormContainer>
      <Typography variant="h6" color="text.primary" gutterBottom>
        FIS Payee Check
      </Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="FIS payee tabs">
          <Tab label="Search" {...a11yProps(0)} />
          <Tab label="Results" {...a11yProps(1)} />
        </Tabs>
      </Box>
      
      <TabPanel value={tabValue} index={0}>
        {renderPayeeForm()}
      </TabPanel>
      
      <TabPanel value={tabValue} index={1}>
        {renderPayeeResults()}
      </TabPanel>
    </FormContainer>
  );
};

export default FisPayeeCheck;
