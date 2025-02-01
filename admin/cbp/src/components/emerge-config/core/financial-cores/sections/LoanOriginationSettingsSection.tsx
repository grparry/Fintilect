import React from 'react';
import { Grid, TextField } from '@mui/material';
import { LoanOriginationSettings } from '../../../../../types/ClientConfiguration/models/FinancialCores/CorelationSettings/LoanOriginationSettings';

interface LoanOriginationSettingsSectionProps {
    settings: LoanOriginationSettings;
    onChange: (settings: LoanOriginationSettings) => void;
}

const LoanOriginationSettingsSection: React.FC<LoanOriginationSettingsSectionProps> = ({ settings, onChange }) => {
    const handleChange = (field: keyof LoanOriginationSettings) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedSettings = new LoanOriginationSettings();
        Object.assign(updatedSettings, settings);
        (updatedSettings as any)[field] = event.target.value;
        onChange(updatedSettings);
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    label="Application Type Serial"
                    value={settings.applicationTypeSerial}
                    onChange={handleChange('applicationTypeSerial')}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    label="Application Channel"
                    value={settings.applicationChannel}
                    onChange={handleChange('applicationChannel')}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    label="Application Branch"
                    value={settings.applicationBranch}
                    onChange={handleChange('applicationBranch')}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    label="Default Credit Limit"
                    value={settings.defaultCreditLimit}
                    onChange={handleChange('defaultCreditLimit')}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    label="Default Payment Amount"
                    value={settings.defaultPaymentAmount}
                    onChange={handleChange('defaultPaymentAmount')}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    label="Workflow Serial"
                    value={settings.workFlowSerial}
                    onChange={handleChange('workFlowSerial')}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    label="Work Queue Approve Serial"
                    value={settings.workQueueApproveSerial}
                    onChange={handleChange('workQueueApproveSerial')}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    label="Work Queue Rescreen Serial"
                    value={settings.workQueueRescreenSerial}
                    onChange={handleChange('workQueueRescreenSerial')}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    label="Work Queue Review Serial"
                    value={settings.workQueueReviewSerial}
                    onChange={handleChange('workQueueReviewSerial')}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    label="Work Queue Decline Serial"
                    value={settings.workQueueDeclineSerial}
                    onChange={handleChange('workQueueDeclineSerial')}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    label="Work Queue ILA Default Serial"
                    value={settings.workQueueIlaDefaultSerial}
                    onChange={handleChange('workQueueIlaDefaultSerial')}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    label="Online Application Note Type Serial"
                    value={settings.onlineApplicationNoteTypeSerial}
                    onChange={handleChange('onlineApplicationNoteTypeSerial')}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    label="Comments Note Type Serial"
                    value={settings.commentsNoteTypeSerial}
                    onChange={handleChange('commentsNoteTypeSerial')}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    label="Account Disclosure Note Type Serial"
                    value={settings.accountDisclosureNoteTypeSerial}
                    onChange={handleChange('accountDisclosureNoteTypeSerial')}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    label="E-notices Disclosure Note Type Serial"
                    value={settings.enoticesDisclosureNoteTypeSerial}
                    onChange={handleChange('enoticesDisclosureNoteTypeSerial')}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    label="Privacy Notice Disclosure Note Type Serial"
                    value={settings.privacyNoticeDisclosureNoteTypeSerial}
                    onChange={handleChange('privacyNoticeDisclosureNoteTypeSerial')}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    label="Decision Type Serial"
                    value={settings.decisionTypeSerial}
                    onChange={handleChange('decisionTypeSerial')}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    label="Credit Type Serial ChexSystems"
                    value={settings.creditTypeSerialChexSystems}
                    onChange={handleChange('creditTypeSerialChexSystems')}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    label="Credit Type Serial Equifax"
                    value={settings.creditTypeSerialEquifax}
                    onChange={handleChange('creditTypeSerialEquifax')}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    label="Credit Type Serial TransUnion"
                    value={settings.creditTypeSerialTransUnion}
                    onChange={handleChange('creditTypeSerialTransUnion')}
                />
            </Grid>
        </Grid>
    );
};

export default LoanOriginationSettingsSection;
