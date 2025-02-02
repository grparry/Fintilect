import React, { useState } from 'react';
import {
  Grid,
  TextField,
  FormControlLabel,
  Switch,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemButton
} from '@mui/material';
import { CoreSettingsComponent } from './CoreSettingsComponent';
import { Corelation } from '../../../../types/ClientConfiguration/models/FinancialCores/Corelation';
import { PullCreditSettings } from '../../../../types/ClientConfiguration/models/FinancialCores/CorelationSettings/PullCreditSettings';
import { LossScreeningSettings } from '../../../../types/ClientConfiguration/models/FinancialCores/CorelationSettings/LossScreeningSettings';
import { Identification } from '../../../../types/ClientConfiguration/models/FinancialCores/CorelationSettings/Identification';
import { Notes } from '../../../../types/ClientConfiguration/models/FinancialCores/CorelationSettings/Notes';
import { AccountTypes } from '../../../../types/ClientConfiguration/models/FinancialCores/CorelationSettings/AccountTypes';
import { DraftLookup } from '../../../../types/ClientConfiguration/models/FinancialCores/CorelationSettings/DraftLookup';
import { Enrollment } from '../../../../types/ClientConfiguration/models/FinancialCores/CorelationSettings/Enrollment';
import { Funding } from '../../../../types/ClientConfiguration/models/FinancialCores/CorelationSettings/Funding';
import { ApplicationSettings } from '../../../../types/ClientConfiguration/models/FinancialCores/CorelationSettings/ApplicationSettings';
import { AccountTypeSettings } from '../../../../types/ClientConfiguration/models/FinancialCores/CorelationSettings/AccountTypeSettings';
import { CardTypeSettings } from '../../../../types/ClientConfiguration/models/FinancialCores/CorelationSettings/CardTypeSettings';
import { PersonTypeSettings } from '../../../../types/ClientConfiguration/models/FinancialCores/CorelationSettings/PersonTypeSettings';
import { LoanOriginationSettings } from '../../../../types/ClientConfiguration/models/FinancialCores/CorelationSettings/LoanOriginationSettings';
import LoanOriginationSettingsSection from './sections/LoanOriginationSettingsSection';
import PullCreditSettingsSection from './sections/PullCreditSettingsSection';
import LossScreeningSettingsSection from './sections/LossScreeningSettingsSection';
import IdentificationSection from './sections/IdentificationSection';
import NotesSection from './sections/NotesSection';
import AccountTypesSection from './sections/AccountTypesSection';
import DraftLookupSection from './sections/DraftLookupSection';
import EnrollmentSection from './sections/EnrollmentSection';
import FundingSection from './sections/FundingSection';
import ApplicationSettingsSection from './sections/ApplicationSettingsSection';
import AccountTypeSettingsSection from './sections/AccountTypeSettingsSection';
import CardTypeSettingsSection from './sections/CardTypeSettingsSection';
import PersonTypeSettingsSection from './sections/PersonTypeSettingsSection';

const CorelationSettings: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<string>('basic');

  const handleListItemClick = (panel: string) => {
    setSelectedSection(panel);
  };

  return (
    <CoreSettingsComponent<Corelation>
      title="Corelation Core Configuration"
      settingsGroupName="Corelation"
      ModelClass={Corelation}
    >
      {({ settings, onStringChange, onNumberChange, onBooleanChange }) => {
        const handlePullCreditSettingsChange = (pullCreditSettings: PullCreditSettings) => {
          const updatedSettings = new Corelation();
          Object.assign(updatedSettings, settings);
          updatedSettings.pullCreditSettings = pullCreditSettings;
          onStringChange('pullCreditSettings', JSON.stringify(pullCreditSettings));
        };

        const handleLossScreeningSettingsChange = (lossScreeningSettings: LossScreeningSettings) => {
          const updatedSettings = new Corelation();
          Object.assign(updatedSettings, settings);
          updatedSettings.lossScreeningSettings = lossScreeningSettings;
          onStringChange('lossScreeningSettings', JSON.stringify(lossScreeningSettings));
        };

        const handleIdentificationChange = (identification: Identification) => {
          const updatedSettings = new Corelation();
          Object.assign(updatedSettings, settings);
          updatedSettings.identification = identification;
          onStringChange('identification', JSON.stringify(identification));
        };

        const handleNotesChange = (notes: Notes) => {
          const updatedSettings = new Corelation();
          Object.assign(updatedSettings, settings);
          updatedSettings.notes = notes;
          onStringChange('notes', JSON.stringify(notes));
        };

        const handleAccountTypesChange = (accountTypes: AccountTypes) => {
          const updatedSettings = new Corelation();
          Object.assign(updatedSettings, settings);
          updatedSettings.accountTypes = accountTypes;
          onStringChange('accountTypes', JSON.stringify(accountTypes));
        };

        const handleDraftLookupChange = (draftLookup: DraftLookup) => {
          const updatedSettings = new Corelation();
          Object.assign(updatedSettings, settings);
          updatedSettings.draftLookup = draftLookup;
          onStringChange('draftLookup', JSON.stringify(draftLookup));
        };

        const handleEnrollmentChange = (enrollment: Enrollment) => {
          const updatedSettings = new Corelation();
          Object.assign(updatedSettings, settings);
          updatedSettings.enrollment = enrollment;
          onStringChange('enrollment', JSON.stringify(enrollment));
        };

        const handleFundingChange = (funding: Funding) => {
          const updatedSettings = new Corelation();
          Object.assign(updatedSettings, settings);
          updatedSettings.funding = funding;
          onStringChange('funding', JSON.stringify(funding));
        };

        const handleApplicationSettingsChange = (applicationSettings: ApplicationSettings) => {
          const updatedSettings = new Corelation();
          Object.assign(updatedSettings, settings);
          updatedSettings.application = applicationSettings;
          onStringChange('application', JSON.stringify(applicationSettings));
        };

        const handleAccountTypeSettingsChange = (accountTypeSettings: AccountTypeSettings) => {
          const updatedSettings = new Corelation();
          Object.assign(updatedSettings, settings);
          updatedSettings.accountType = accountTypeSettings;
          onStringChange('accountType', JSON.stringify(accountTypeSettings));
        };

        const handleCardTypeSettingsChange = (cardTypeSettings: CardTypeSettings) => {
          const updatedSettings = new Corelation();
          Object.assign(updatedSettings, settings);
          updatedSettings.cardType = cardTypeSettings;
          onStringChange('cardType', JSON.stringify(cardTypeSettings));
        };

        const handlePersonTypeSettingsChange = (personTypeSettings: PersonTypeSettings) => {
          const updatedSettings = new Corelation();
          Object.assign(updatedSettings, settings);
          updatedSettings.personType = personTypeSettings;
          onStringChange('personType', JSON.stringify(personTypeSettings));
        };

        const handleLoanOriginationSettingsChange = (loanOriginationSettings: LoanOriginationSettings) => {
          const updatedSettings = new Corelation();
          Object.assign(updatedSettings, settings);
          updatedSettings.loanOriginationSettings = loanOriginationSettings;
          onStringChange('loanOriginationSettings', JSON.stringify(loanOriginationSettings));
        };

        return (
          <Box sx={{ display: 'flex', height: '100%', mt: -1 }}>
            {/* Left Sidebar */}
            <Box sx={{ 
              width: 240, 
              flexShrink: 0,
              bgcolor: 'background.paper',
              borderRight: 1,
              borderColor: 'divider',
              overflowY: 'auto',
              maxHeight: 'calc(100vh - 180px)'
            }}>
              <List component="nav" dense sx={{ p: 0 }}>
                {[
                  { id: 'account-type', label: 'Account Type Settings' },
                  { id: 'allowed-categories', label: 'Allowed Person Link Categories' },
                  { id: 'application', label: 'Application Settings' },
                  { id: 'basic', label: 'Basic Settings' },
                  { id: 'card-type', label: 'Card Type Settings' },
                  { id: 'channel', label: 'Channel Settings' },
                  { id: 'draft-lookup', label: 'Draft Lookup Settings' },
                  { id: 'enrollment', label: 'Enrollment Settings' },
                  { id: 'features', label: 'Feature Toggles' },
                  { id: 'funding', label: 'Funding Settings' },
                  { id: 'identification', label: 'Identification Settings' },
                  { id: 'loan-origination', label: 'Loan Origination Settings' },
                  { id: 'loss-screening', label: 'Loss Screening Settings' },
                  { id: 'manual-approval', label: 'Manual Approval Notes' },
                  { id: 'notes', label: 'Notes Settings' },
                  { id: 'person-type', label: 'Person Type Settings' },
                  { id: 'pull-credit', label: 'Pull Credit Settings' },
                  { id: 'search-limits', label: 'Search Limits' }
                ].map(({ id, label }) => (
                  <ListItem 
                    key={id}
                    disablePadding
                    sx={{
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                      '&:first-of-type': {
                        borderTop: '1px solid',
                        borderColor: 'divider',
                      }
                    }}
                  >
                    <ListItemButton
                      selected={selectedSection === id}
                      onClick={() => handleListItemClick(id)}
                      sx={{
                        py: 1,
                        '&.Mui-selected': {
                          bgcolor: 'primary.main',
                          color: 'primary.contrastText',
                          '&:hover': {
                            bgcolor: 'primary.dark',
                          }
                        }
                      }}
                    >
                      <ListItemText 
                        primary={label}
                        primaryTypographyProps={{
                          variant: 'body2',
                          sx: { 
                            fontWeight: selectedSection === id ? 500 : 400
                          }
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>

            {/* Main Content Area */}
            <Box sx={{ 
              flexGrow: 1, 
              display: 'flex', 
              flexDirection: 'column',
              maxHeight: 'calc(100vh - 180px)'
            }}>
              {selectedSection && (
                <Typography 
                  variant="h6" 
                  sx={{ 
                    py: 1,
                    px: 2,
                    mb: 0,
                    borderBottom: 1,
                    borderColor: 'divider',
                    bgcolor: 'background.paper',
                    flexShrink: 0
                  }}
                >
                  {selectedSection === 'account-type' && 'Account Type Settings'}
                  {selectedSection === 'allowed-categories' && 'Allowed Person Link Categories'}
                  {selectedSection === 'application' && 'Application Settings'}
                  {selectedSection === 'basic' && 'Basic Settings'}
                  {selectedSection === 'card-type' && 'Card Type Settings'}
                  {selectedSection === 'channel' && 'Channel Settings'}
                  {selectedSection === 'draft-lookup' && 'Draft Lookup Settings'}
                  {selectedSection === 'enrollment' && 'Enrollment Settings'}
                  {selectedSection === 'features' && 'Feature Toggles'}
                  {selectedSection === 'funding' && 'Funding Settings'}
                  {selectedSection === 'identification' && 'Identification Settings'}
                  {selectedSection === 'loan-origination' && 'Loan Origination Settings'}
                  {selectedSection === 'loss-screening' && 'Loss Screening Settings'}
                  {selectedSection === 'manual-approval' && 'Manual Approval Notes'}
                  {selectedSection === 'notes' && 'Notes Settings'}
                  {selectedSection === 'person-type' && 'Person Type Settings'}
                  {selectedSection === 'pull-credit' && 'Pull Credit Settings'}
                  {selectedSection === 'search-limits' && 'Search Limits'}
                </Typography>
              )}
              <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
                {selectedSection === 'account-type' && (
                  <AccountTypeSettingsSection
                    settings={settings.accountType}
                    onChange={handleAccountTypeSettingsChange}
                  />
                )}
                {selectedSection === 'allowed-categories' && (
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Inquiry Allowed Person Link Categories"
                        value={settings.inquiryAllowedPersonLinkCategories.join(', ')}
                        onChange={(e) => onStringChange('inquiryAllowedPersonLinkCategories', e.target.value)}
                        helperText="Enter categories separated by commas"
                      />
                    </Grid>
                  </Grid>
                )}
                {selectedSection === 'application' && (
                  <ApplicationSettingsSection
                    settings={settings.application}
                    onChange={handleApplicationSettingsChange}
                  />
                )}
                {selectedSection === 'basic' && (
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Service URL"
                        value={settings.serviceUrl}
                        onChange={(e) => onStringChange('serviceUrl', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Username"
                        value={settings.userName}
                        onChange={(e) => onStringChange('userName', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        type="password"
                        label="Password"
                        value={settings.password}
                        onChange={(e) => onStringChange('password', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Device Name"
                        value={settings.deviceName}
                        onChange={(e) => onStringChange('deviceName', e.target.value)}
                      />
                    </Grid>
                  </Grid>
                )}
                {selectedSection === 'card-type' && (
                  <CardTypeSettingsSection
                    settings={settings.cardType}
                    onChange={handleCardTypeSettingsChange}
                  />
                )}
                {selectedSection === 'channel' && (
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Employee Account Type Serial"
                        value={settings.employeeAccountTypeSerial}
                        onChange={(e) => onStringChange('employeeAccountTypeSerial', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="PIN Verify Channel Serial"
                        value={settings.pinVerifyChannelSerial}
                        onChange={(e) => onStringChange('pinVerifyChannelSerial', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Login Channel Description"
                        value={settings.loginChannelDescription}
                        onChange={(e) => onStringChange('loginChannelDescription', e.target.value)}
                      />
                    </Grid>
                  </Grid>
                )}
                {selectedSection === 'draft-lookup' && (
                  <DraftLookupSection
                    settings={settings.draftLookup}
                    onChange={handleDraftLookupChange}
                  />
                )}
                {selectedSection === 'enrollment' && (
                  <EnrollmentSection
                    settings={settings.enrollment}
                    onChange={handleEnrollmentChange}
                  />
                )}
                {selectedSection === 'features' && (
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={settings.getAllNotes}
                            onChange={(e) => onBooleanChange('getAllNotes', e.target.checked)}
                          />
                        }
                        label="Get All Notes"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={settings.onlyAllowSsnForEnrollmentTin}
                            onChange={(e) => onBooleanChange('onlyAllowSsnForEnrollmentTin', e.target.checked)}
                          />
                        }
                        label="Only Allow SSN for Enrollment TIN"
                      />
                    </Grid>
                  </Grid>
                )}
                {selectedSection === 'funding' && (
                  <FundingSection
                    settings={settings.funding}
                    onChange={handleFundingChange}
                  />
                )}
                {selectedSection === 'identification' && (
                  <IdentificationSection
                    settings={settings.identification}
                    onChange={handleIdentificationChange}
                  />
                )}
                {selectedSection === 'loan-origination' && (
                  <Grid item xs={12}>
                    <LoanOriginationSettingsSection
                      settings={settings.loanOriginationSettings}
                      onChange={handleLoanOriginationSettingsChange}
                    />
                  </Grid>
                )}
                {selectedSection === 'loss-screening' && (
                  <LossScreeningSettingsSection
                    settings={settings.lossScreeningSettings}
                    onChange={handleLossScreeningSettingsChange}
                  />
                )}
                {selectedSection === 'manual-approval' && (
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      label="Manual Approval Note JSON Dictionary"
                      value={settings.manualApprovalNoteJsonStringDictionary}
                      onChange={(e) => onStringChange('manualApprovalNoteJsonStringDictionary', e.target.value)}
                    />
                  </Grid>
                )}
                {selectedSection === 'notes' && (
                  <NotesSection
                    settings={settings.notes}
                    onChange={handleNotesChange}
                  />
                )}
                {selectedSection === 'person-type' && (
                  <PersonTypeSettingsSection
                    settings={settings.personType}
                    onChange={handlePersonTypeSettingsChange}
                  />
                )}
                {selectedSection === 'pull-credit' && (
                  <PullCreditSettingsSection
                    settings={settings.pullCreditSettings}
                    onChange={handlePullCreditSettingsChange}
                  />
                )}
                {selectedSection === 'search-limits' && (
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          type="number"
                          label="Max Return Search Limit"
                          value={settings.maxReturnSearchLimit}
                          onChange={(e) => onNumberChange('maxReturnSearchLimit', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          type="number"
                          label="Existing Address Search Results Return Limit"
                          value={settings.existingAddressSearchResultsReturnLimit}
                          onChange={(e) => onNumberChange('existingAddressSearchResultsReturnLimit', e.target.value)}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                )}
              </Box>
            </Box>
          </Box>
        );
      }}
    </CoreSettingsComponent>
  );
};

export default CorelationSettings;
