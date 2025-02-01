import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
  Divider,
  Grid
} from '@mui/material';
import { ServiceFactory } from '../../../../services/factory/ServiceFactory';
import { SettingsManager } from '../../../../services/implementations/settings.manager';
import { Symitar } from '../../../../types/ClientConfiguration/models/FinancialCores/SymitarSettings/Symitar';
import { TrackingRecordFieldName } from '../../../../types/ClientConfiguration/models/FinancialCores/TrackingRecordFieldName';
import RemoteDepositCheckHoldSettings from './symitar/RemoteDepositCheckHoldSettings';

export const SymitarSettings: React.FC = () => {
  const [settings, setSettings] = useState<Symitar>(new Symitar());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const settingsService = ServiceFactory.getInstance().getSettingsService();
      const manager = new SettingsManager(settingsService);
      
      await manager.loadGroup('Symitar');
      const apiSettings = manager.getSettings() as any;
      const loadedSettings = new Symitar();
      loadedSettings.fromSettings(apiSettings);
      setSettings(loadedSettings);
      setError(null);
    } catch (err) {
      setError('Failed to load Symitar settings');
      console.error('Error loading settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const settingsService = ServiceFactory.getInstance().getSettingsService();
      const manager = new SettingsManager(settingsService);
      
      const apiSettings = settings.toSettings();
      await settingsService.updateSettings(apiSettings as any);
      setError(null);
    } catch (err) {
      setError('Failed to save Symitar settings');
      console.error('Error saving settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof Symitar, value: any) => {
    setSettings(prev => {
      const updated = new Symitar();
      updated.fromSettings(prev.toSettings());
      switch (field) {
        // Boolean fields
        case 'isTransferWithoutVirtualCardsEnabled':
        case 'getInterestRateFromExternalLoanTrackingRecordIsEnabled':
        case 'shouldReverseAddressLine1And2':
        case 'getAlternateMicr':
        case 'accountInquiryIncludesRegD':
        case 'showPostDate':
        case 'shouldLoadMortgageFromTrackingRecord':
        case 'shouldLoadCardsFromTrackingRecords':
          (updated as any)[field] = value as boolean;
          break;
        
        // Number fields
        case 'successfulLoginOLBTrackingRecordType':
        case 'successfulLoginMobileTrackingRecordType':
        case 'skipPayQualifyingTrackingRecordType':
        case 'symitarAlternateAddressType':
          (updated as any)[field] = Number(value);
          break;
        
        // String fields
        case 'symitarExternalLoanRecordMortgageTypes':
        case 'accountInquiryPowerOnVersion':
        case 'accountInquiryScriptName':
        case 'warningCodesBlockInquiryShare':
        case 'warningCodesBlockInquiryLoan':
          (updated as any)[field] = value as string;
          break;
        
        // Array fields
        case 'debitCardTypeCodes':
          updated.debitCardTypeCodes = (value as string).split(',').map(s => s.trim());
          break;
      }
      return updated;
    });
  };

  if (loading) {
    return <Typography>Loading Symitar settings...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Card>
      <CardHeader title="Symitar Core Settings" />
      <Divider />
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Grid container spacing={2}>
            {/* Remote Deposit Check Hold Settings */}
            <Grid item xs={12}>
              <RemoteDepositCheckHoldSettings 
                settings={settings.remoteDepositCheckHold}
                onChange={(newSettings) => {
                  setSettings(prev => {
                    const updated = new Symitar();
                    updated.fromSettings(prev.toSettings());
                    updated.remoteDepositCheckHold = newSettings;
                    return updated;
                  });
                }}
              />
            </Grid>

            {/* General Settings */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>General Settings</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.isTransferWithoutVirtualCardsEnabled}
                      onChange={(e) => handleChange('isTransferWithoutVirtualCardsEnabled', e.target.checked)}
                    />
                  }
                  label="Enable Transfer Without Virtual Cards"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.getInterestRateFromExternalLoanTrackingRecordIsEnabled}
                      onChange={(e) => handleChange('getInterestRateFromExternalLoanTrackingRecordIsEnabled', e.target.checked)}
                    />
                  }
                  label="Get Interest Rate From External Loan Tracking Record"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.shouldReverseAddressLine1And2}
                      onChange={(e) => handleChange('shouldReverseAddressLine1And2', e.target.checked)}
                    />
                  }
                  label="Reverse Address Lines 1 and 2"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.getAlternateMicr}
                      onChange={(e) => handleChange('getAlternateMicr', e.target.checked)}
                    />
                  }
                  label="Get Alternate MICR"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.accountInquiryIncludesRegD}
                      onChange={(e) => handleChange('accountInquiryIncludesRegD', e.target.checked)}
                    />
                  }
                  label="Include Reg D in Account Inquiry"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.showPostDate}
                      onChange={(e) => handleChange('showPostDate', e.target.checked)}
                    />
                  }
                  label="Show Post Date"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.shouldLoadMortgageFromTrackingRecord}
                      onChange={(e) => handleChange('shouldLoadMortgageFromTrackingRecord', e.target.checked)}
                    />
                  }
                  label="Load Mortgage From Tracking Record"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.shouldLoadCardsFromTrackingRecords}
                      onChange={(e) => handleChange('shouldLoadCardsFromTrackingRecords', e.target.checked)}
                    />
                  }
                  label="Load Cards From Tracking Records"
                />
              </Box>
            </Grid>

            {/* Numeric Settings */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>Tracking Record Settings</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="OLB Tracking Record Type"
                  type="number"
                  value={settings.successfulLoginOLBTrackingRecordType}
                  onChange={(e) => handleChange('successfulLoginOLBTrackingRecordType', e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Mobile Tracking Record Type"
                  type="number"
                  value={settings.successfulLoginMobileTrackingRecordType}
                  onChange={(e) => handleChange('successfulLoginMobileTrackingRecordType', e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Skip Pay Qualifying Record Type"
                  type="number"
                  value={settings.skipPayQualifyingTrackingRecordType}
                  onChange={(e) => handleChange('skipPayQualifyingTrackingRecordType', e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Alternate Address Type"
                  type="number"
                  value={settings.symitarAlternateAddressType}
                  onChange={(e) => handleChange('symitarAlternateAddressType', e.target.value)}
                  fullWidth
                />
              </Box>
            </Grid>

            {/* String Settings */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>Configuration Settings</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="External Loan Record Mortgage Types"
                  value={settings.symitarExternalLoanRecordMortgageTypes}
                  onChange={(e) => handleChange('symitarExternalLoanRecordMortgageTypes', e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Account Inquiry PowerOn Version"
                  value={settings.accountInquiryPowerOnVersion}
                  onChange={(e) => handleChange('accountInquiryPowerOnVersion', e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Account Inquiry Script Name"
                  value={settings.accountInquiryScriptName}
                  onChange={(e) => handleChange('accountInquiryScriptName', e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Warning Codes Block Inquiry Share"
                  value={settings.warningCodesBlockInquiryShare}
                  onChange={(e) => handleChange('warningCodesBlockInquiryShare', e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Warning Codes Block Inquiry Loan"
                  value={settings.warningCodesBlockInquiryLoan}
                  onChange={(e) => handleChange('warningCodesBlockInquiryLoan', e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Debit Card Type Codes (comma-separated)"
                  value={settings.debitCardTypeCodes.join(', ')}
                  onChange={(e) => handleChange('debitCardTypeCodes', e.target.value)}
                  fullWidth
                  helperText="Enter codes separated by commas"
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SymitarSettings;
