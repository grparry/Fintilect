import React, { useEffect, useState, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { NavigationRegistry } from './navigation/NavigationRegistry';
import { ConfigSectionComponent } from './navigation/types';
import ErrorBoundary from '../common/ErrorBoundary';

const LoadingFallback = () => (
  <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
    <CircularProgress />
  </Box>
);

/**
 * Wrapper component that handles:
 * 1. Loading configuration sections based on URL parameters
 * 2. Error handling and loading states
 * 3. Integration with NavigationRegistry
 */
export const ConfigSectionWrapper: React.FC = () => {
    const { groupId = '', sectionId = '' } = useParams<{ groupId: string; sectionId: string }>();
    const [Section, setSection] = useState<ConfigSectionComponent | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const registry = NavigationRegistry.getInstance();
        const section = registry.getSection(groupId, sectionId) as ConfigSectionComponent;

        if (!section) {
            setError(`Configuration section not found: ${groupId}/${sectionId}`);
            setSection(null);
            return;
        }

        setSection(section);
        setError(null);
    }, [groupId, sectionId]);

    if (error) {
        return (
            <Box p={3}>
                <Typography color="error" variant="h6">
                    {error}
                </Typography>
            </Box>
        );
    }

    if (!Section) {
        return <LoadingFallback />;
    }

    return (
        <ErrorBoundary>
            <Suspense fallback={<LoadingFallback />}>
                <Section />
            </Suspense>
        </ErrorBoundary>
    );
};
