import React from 'react';
import {
  Grid,
  TextField,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AccountTypes } from '../../../../../types/ClientConfiguration/models/FinancialCores/CorelationSettings/AccountTypes';

interface AccountTypesSectionProps {
  settings: AccountTypes;
  expanded: string | false;
  onExpand: (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
  onChange: (settings: AccountTypes) => void;
}

const AccountTypesSection: React.FC<AccountTypesSectionProps> = ({
  settings,
  expanded,
  onExpand,
  onChange
}) => {
  const handleChange = (field: keyof AccountTypes, value: string) => {
    const newSettings = new AccountTypes();
    Object.assign(newSettings, settings);
    // Split the input string into an array, trim whitespace, and filter out empty strings
    (newSettings[field] as string[]) = value.split(',').map(s => s.trim()).filter(s => s !== '');
    onChange(newSettings);
  };

  const renderArrayField = (field: keyof AccountTypes, label: string, helperText?: string) => (
    <Grid item xs={12}>
      <TextField
        fullWidth
        multiline
        rows={2}
        label={label}
        value={(settings[field] as string[]).join(', ')}
        onChange={(e) => handleChange(field, e.target.value)}
        helperText={helperText || 'Enter values separated by commas'}
      />
    </Grid>
  );

  return (
    <Accordion 
      expanded={expanded === 'accountTypes'} 
      onChange={onExpand('accountTypes')}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Account Types Settings</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={3}>
          {/* Share Accounts */}
          <Grid item xs={12}>
            <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default' }}>
              <Typography variant="subtitle1" gutterBottom>Share Accounts</Typography>
              <Grid container spacing={2}>
                {renderArrayField(
                  'primarySavingsShareCategorySerial',
                  'Primary Savings Share Categories',
                  'Category serials for primary savings accounts'
                )}
                {renderArrayField(
                  'moneyMarketShareCategorySerial',
                  'Money Market Share Categories',
                  'Category serials for money market accounts'
                )}
                {renderArrayField(
                  'checkingShareCategorySerial',
                  'Checking Share Categories',
                  'Category serials for checking accounts'
                )}
                {renderArrayField(
                  'investmentShareCategorySerial',
                  'Investment Share Categories',
                  'Category serials for investment accounts'
                )}
                {renderArrayField(
                  'certificateShareCategorySerial',
                  'Certificate Share Categories',
                  'Category serials for certificate accounts'
                )}
                {renderArrayField(
                  'depositShareCategorySerial',
                  'Deposit Share Categories',
                  'Category serials for deposit accounts'
                )}
              </Grid>
            </Paper>
          </Grid>

          {/* Business Accounts */}
          <Grid item xs={12}>
            <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default' }}>
              <Typography variant="subtitle1" gutterBottom>Business Accounts</Typography>
              <Grid container spacing={2}>
                {renderArrayField(
                  'businessSavingsShareCategorySerial',
                  'Business Savings Share Categories',
                  'Category serials for business savings accounts'
                )}
                {renderArrayField(
                  'businessSavingsShareCategorySerialForCategoryMapping',
                  'Business Savings Categories (Category Mapping)',
                  'Category serials for business savings in category mapping'
                )}
              </Grid>
            </Paper>
          </Grid>

          {/* Loan Accounts */}
          <Grid item xs={12}>
            <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default' }}>
              <Typography variant="subtitle1" gutterBottom>Loan Accounts</Typography>
              <Grid container spacing={2}>
                {renderArrayField(
                  'loanCategorySerial',
                  'General Loan Categories',
                  'Category serials for general loans'
                )}
                {renderArrayField(
                  'lineOfCreditLoanCategorySerial',
                  'Line of Credit Categories',
                  'Category serials for lines of credit'
                )}
                {renderArrayField(
                  'creditCardLoanCategorySerial',
                  'Credit Card Categories',
                  'Category serials for credit cards'
                )}
                {renderArrayField(
                  'autoLoanCategorySerial',
                  'Auto Loan Categories',
                  'Category serials for auto loans'
                )}
                {renderArrayField(
                  'mortgageLoanCategorySerial',
                  'Mortgage Categories',
                  'Category serials for mortgages'
                )}
                {renderArrayField(
                  'externalMortgageLoanCategorySerial',
                  'External Mortgage Categories',
                  'Category serials for external mortgages'
                )}
              </Grid>
            </Paper>
          </Grid>

          {/* Card Accounts */}
          <Grid item xs={12}>
            <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default' }}>
              <Typography variant="subtitle1" gutterBottom>Card Accounts</Typography>
              <Grid container spacing={2}>
                {renderArrayField(
                  'debitCardCategorySerial',
                  'Debit Card Categories',
                  'Category serials for debit cards'
                )}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default AccountTypesSection;
