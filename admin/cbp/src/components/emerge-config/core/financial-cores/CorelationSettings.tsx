import React, { useState } from 'react';
import {
  Grid,
  TextField,
  FormControlLabel,
  Switch,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
  const [expanded, setExpanded] = useState<string | false>('basic');

  const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
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
          <Grid container spacing={3}>
            {/* Account Type Settings Section */}
            <Grid item xs={12}>
              <AccountTypeSettingsSection
                settings={settings.accountType}
                expanded={expanded}
                onExpand={handleAccordionChange}
                onChange={handleAccountTypeSettingsChange}
              />
            </Grid>

            {/* Allowed Person Link Categories */}
            <Grid item xs={12}>
              <Accordion expanded={expanded === 'categories'} onChange={handleAccordionChange('categories')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Allowed Person Link Categories</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TextField
                    fullWidth
                    label="Inquiry Allowed Person Link Categories"
                    value={settings.inquiryAllowedPersonLinkCategories.join(', ')}
                    onChange={(e) => onStringChange('inquiryAllowedPersonLinkCategories', e.target.value)}
                    helperText="Enter categories separated by commas"
                  />
                </AccordionDetails>
              </Accordion>
            </Grid>

            {/* Application Settings Section */}
            <Grid item xs={12}>
              <ApplicationSettingsSection
                settings={settings.application}
                expanded={expanded}
                onExpand={handleAccordionChange}
                onChange={handleApplicationSettingsChange}
              />
            </Grid>

            {/* Basic Settings */}
            <Grid item xs={12}>
              <Accordion expanded={expanded === 'basic'} onChange={handleAccordionChange('basic')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Basic Settings</Typography>
                </AccordionSummary>
                <AccordionDetails>
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
                </AccordionDetails>
              </Accordion>
            </Grid>

            {/* Card Type Settings Section */}
            <Grid item xs={12}>
              <CardTypeSettingsSection
                settings={settings.cardType}
                expanded={expanded}
                onExpand={handleAccordionChange}
                onChange={handleCardTypeSettingsChange}
              />
            </Grid>

            {/* Channel Settings */}
            <Grid item xs={12}>
              <Accordion expanded={expanded === 'channel'} onChange={handleAccordionChange('channel')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Channel Settings</Typography>
                </AccordionSummary>
                <AccordionDetails>
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
                </AccordionDetails>
              </Accordion>
            </Grid>

            {/* Draft Lookup Settings Section */}
            <Grid item xs={12}>
              <DraftLookupSection
                settings={settings.draftLookup}
                expanded={expanded}
                onExpand={handleAccordionChange}
                onChange={handleDraftLookupChange}
              />
            </Grid>

            {/* Enrollment Settings Section */}
            <Grid item xs={12}>
              <EnrollmentSection
                settings={settings.enrollment}
                expanded={expanded}
                onExpand={handleAccordionChange}
                onChange={handleEnrollmentChange}
              />
            </Grid>

            {/* Feature Toggles */}
            <Grid item xs={12}>
              <Accordion expanded={expanded === 'features'} onChange={handleAccordionChange('features')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Feature Toggles</Typography>
                </AccordionSummary>
                <AccordionDetails>
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
                </AccordionDetails>
              </Accordion>
            </Grid>

            {/* Funding Settings Section */}
            <Grid item xs={12}>
              <FundingSection
                settings={settings.funding}
                expanded={expanded}
                onExpand={handleAccordionChange}
                onChange={handleFundingChange}
              />
            </Grid>

            {/* Identification Settings Section */}
            <Grid item xs={12}>
              <IdentificationSection
                settings={settings.identification}
                expanded={expanded}
                onExpand={handleAccordionChange}
                onChange={handleIdentificationChange}
              />
            </Grid>

            {/* Loan Origination Settings */}
            <Grid item xs={12}>
              <Accordion expanded={expanded === 'loan-origination'} onChange={handleAccordionChange('loan-origination')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Loan Origination Settings</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <LoanOriginationSettingsSection
                    settings={settings.loanOriginationSettings}
                    onChange={handleLoanOriginationSettingsChange}
                  />
                </AccordionDetails>
              </Accordion>
            </Grid>

            {/* Loss Screening Settings Section */}
            <Grid item xs={12}>
              <LossScreeningSettingsSection
                settings={settings.lossScreeningSettings}
                expanded={expanded}
                onExpand={handleAccordionChange}
                onChange={handleLossScreeningSettingsChange}
              />
            </Grid>

            {/* Manual Approval Notes */}
            <Grid item xs={12}>
              <Accordion expanded={expanded === 'notes'} onChange={handleAccordionChange('notes')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Manual Approval Notes</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Manual Approval Note JSON Dictionary"
                    value={settings.manualApprovalNoteJsonStringDictionary}
                    onChange={(e) => onStringChange('manualApprovalNoteJsonStringDictionary', e.target.value)}
                  />
                </AccordionDetails>
              </Accordion>
            </Grid>

            {/* Notes Settings Section */}
            <Grid item xs={12}>
              <NotesSection
                settings={settings.notes}
                expanded={expanded}
                onExpand={handleAccordionChange}
                onChange={handleNotesChange}
              />
            </Grid>

            {/* Person Type Settings Section */}
            <Grid item xs={12}>
              <PersonTypeSettingsSection
                settings={settings.personType}
                expanded={expanded}
                onExpand={handleAccordionChange}
                onChange={handlePersonTypeSettingsChange}
              />
            </Grid>

            {/* Pull Credit Settings Section */}
            <Grid item xs={12}>
              <PullCreditSettingsSection
                settings={settings.pullCreditSettings}
                expanded={expanded}
                onExpand={handleAccordionChange}
                onChange={handlePullCreditSettingsChange}
              />
            </Grid>

            {/* Search Limits */}
            <Grid item xs={12}>
              <Accordion expanded={expanded === 'searchLimits'} onChange={handleAccordionChange('searchLimits')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Search Limits</Typography>
                </AccordionSummary>
                <AccordionDetails>
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
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        );
      }}
    </CoreSettingsComponent>
  );
};

export default CorelationSettings;
