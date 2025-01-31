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
import { Notes } from '../../../../../types/ClientConfiguration/models/FinancialCores/CorelationSettings/Notes';

interface NotesSectionProps {
  settings: Notes;
  expanded: string | false;
  onExpand: (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
  onChange: (settings: Notes) => void;
}

const NotesSection: React.FC<NotesSectionProps> = ({
  settings,
  expanded,
  onExpand,
  onChange
}) => {
  const handleChange = (field: keyof Notes, value: string) => {
    const newSettings = new Notes();
    Object.assign(newSettings, settings);
    (newSettings[field] as string) = value;
    onChange(newSettings);
  };

  const renderNoteField = (field: keyof Notes, label: string, helperText?: string) => (
    <Grid item xs={12} md={6}>
      <TextField
        fullWidth
        label={label}
        value={settings[field] as string}
        onChange={(e) => handleChange(field, e.target.value)}
        helperText={helperText}
      />
    </Grid>
  );

  return (
    <Accordion 
      expanded={expanded === 'notes'} 
      onChange={onExpand('notes')}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Notes Settings</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={3}>
          {/* Online Banking Group */}
          <Grid item xs={12}>
            <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default' }}>
              <Typography variant="subtitle1" gutterBottom>Online Banking</Typography>
              <Grid container spacing={2}>
                {renderNoteField('onlineBankingAccessSerial', 'Online Banking Access Serial')}
                {renderNoteField('billPaySerial', 'Bill Pay Serial')}
                {renderNoteField('estatementDisclosureSerial', 'E-Statement Disclosure Serial')}
                {renderNoteField('edocumentsDisclosureSerial', 'E-Documents Disclosure Serial')}
                {renderNoteField('businessBankingDisclosureNoteSerial', 'Business Banking Disclosure Serial')}
              </Grid>
            </Paper>
          </Grid>

          {/* Card Services Group */}
          <Grid item xs={12}>
            <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default' }}>
              <Typography variant="subtitle1" gutterBottom>Card Services</Typography>
              <Grid container spacing={2}>
                {renderNoteField('hasCreditCardSerial', 'Has Credit Card Serial')}
                {renderNoteField('isDebitCardFlagSerial', 'Debit Card Flag Serial')}
                {renderNoteField('hasDebitCardsSerial', 'Has Debit Cards Serial')}
                {renderNoteField('restrictViewingCardFlagSerial', 'Restrict Viewing Card Flag Serial')}
              </Grid>
            </Paper>
          </Grid>

          {/* Mobile Services Group */}
          <Grid item xs={12}>
            <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default' }}>
              <Typography variant="subtitle1" gutterBottom>Mobile Services</Typography>
              <Grid container spacing={2}>
                {renderNoteField('mobileDepositAllowedSerial', 'Mobile Deposit Allowed Serial')}
                {renderNoteField('mobileDepositRestrictedSerial', 'Mobile Deposit Restricted Serial')}
                {renderNoteField('mobileDepositDisclosureSerial', 'Mobile Deposit Disclosure Serial')}
              </Grid>
            </Paper>
          </Grid>

          {/* Account Restrictions Group */}
          <Grid item xs={12}>
            <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default' }}>
              <Typography variant="subtitle1" gutterBottom>Account Restrictions</Typography>
              <Grid container spacing={2}>
                {renderNoteField('checkWithdrawalRrestrictedSerial', 'Check Withdrawal Restricted Serial')}
                {renderNoteField('memberRestrictedFromTransfersSerial', 'Member Restricted From Transfers Serial')}
                {renderNoteField('memberRestrictedFromDepositSerial', 'Member Restricted From Deposit Serial')}
                {renderNoteField('memberrestricedFromInquirySerial', 'Member Restricted From Inquiry Serial')}
                {renderNoteField('shareIsRestrictedFromDepositSerial', 'Share Restricted From Deposit Serial')}
                {renderNoteField('shareRestrictedFromInquirySerial', 'Share Restricted From Inquiry Serial')}
                {renderNoteField('shareRestrictedFromTransfersSerial', 'Share Restricted From Transfers Serial')}
                {renderNoteField('shareRestrictedAlertsSerial', 'Share Restricted Alerts Serial')}
              </Grid>
            </Paper>
          </Grid>

          {/* Account Status Group */}
          <Grid item xs={12}>
            <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default' }}>
              <Typography variant="subtitle1" gutterBottom>Account Status</Typography>
              <Grid container spacing={2}>
                {renderNoteField('businessAccountSerial', 'Business Account Serial')}
                {renderNoteField('isEmployeeSerial', 'Is Employee Serial')}
                {renderNoteField('loanClosedFlagSerial', 'Loan Closed Flag Serial')}
                {renderNoteField('loanRestrictedSerial', 'Loan Restricted Serial')}
                {renderNoteField('inquiryOnLoanRestrictedSerial', 'Inquiry On Loan Restricted Serial')}
                {renderNoteField('shareClosedFlagsSerial', 'Share Closed Flags Serial')}
              </Grid>
            </Paper>
          </Grid>

          {/* Additional Features Group */}
          <Grid item xs={12}>
            <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default' }}>
              <Typography variant="subtitle1" gutterBottom>Additional Features</Typography>
              <Grid container spacing={2}>
                {renderNoteField('freeCheckReorderFlagSerial', 'Free Check Reorder Flag Serial')}
                {renderNoteField('midwestLoansSerial', 'Midwest Loans Serial')}
                {renderNoteField('nsfFlagsSerial', 'NSF Flags Serial')}
                {renderNoteField('skipPayQualifyingSerial', 'Skip Pay Qualifying Serial')}
              </Grid>
            </Paper>
          </Grid>

          {/* Validation Group */}
          <Grid item xs={12}>
            <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default' }}>
              <Typography variant="subtitle1" gutterBottom>Validation</Typography>
              <Grid container spacing={2}>
                {renderNoteField('validAddressFlagSerial', 'Valid Address Flag Serial')}
                {renderNoteField('validEmailFlagSerial', 'Valid Email Flag Serial')}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default NotesSection;
