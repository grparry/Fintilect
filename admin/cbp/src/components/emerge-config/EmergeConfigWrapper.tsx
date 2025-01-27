import React, { useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigation } from '../../context/NavigationContext';
import { Outlet } from 'react-router-dom';
import { Collapse } from '@mui/material';

// Wrapper to handle MUI transitions
const TransitionWrapper: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    const [mounted, setMounted] = React.useState(false);

    useEffect(() => {
        // Defer mounting to next tick to avoid transition conflicts
        const timer = setTimeout(() => {
            setMounted(true);
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Collapse in={mounted} timeout={300}>
            {children}
        </Collapse>
    );
};

/**
 * Wrapper component that handles emerge-config navigation and section state
 */
const EmergeConfigWrapper: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    const location = useLocation();
    const { setActiveSection, setActivePath, state } = useNavigation();
    const mountedRef = useRef(false);
    const prevPathRef = useRef(location.pathname);

    console.log('EmergeConfigWrapper - Render', {
        pathname: location.pathname,
        prevPath: prevPathRef.current,
        activeSection: state.activeSection,
        activePath: state.activePath,
        mounted: mountedRef.current
    });

    // Create a stable cleanup function
    const cleanup = useCallback(() => {
        console.log('EmergeConfigWrapper - Cleanup', {
            pathname: location.pathname,
            activeSection: state.activeSection,
            mounted: mountedRef.current
        });

        mountedRef.current = false;
        setActiveSection(null);
        setActivePath(null);
    }, [setActiveSection, setActivePath, location.pathname, state.activeSection]);

    // Handle initialization and cleanup
    useEffect(() => {
        console.log('EmergeConfigWrapper - Mount Effect', {
            pathname: location.pathname,
            activeSection: state.activeSection,
            mounted: mountedRef.current
        });

        // Initialize on mount
        if (!mountedRef.current) {
            mountedRef.current = true;
            if (state.activeSection !== 'emergeConfig') {
                console.log('EmergeConfigWrapper - Setting active section to emergeConfig');
                setActiveSection('emergeConfig');
            }
        }

        // Cleanup only on unmount
        return () => {
            if (!location.pathname.startsWith('/admin/emerge-config')) {
                cleanup();
            }
        };
    }, [cleanup, location.pathname, state.activeSection, setActiveSection]);

    // Handle path updates
    useEffect(() => {
        if (!mountedRef.current) return;

        // Only update if path has actually changed
        if (prevPathRef.current !== location.pathname) {
            console.log('EmergeConfigWrapper - Path Change', {
                from: prevPathRef.current,
                to: location.pathname
            });
            
            prevPathRef.current = location.pathname;
            setActivePath(location.pathname);
        }
    }, [location.pathname, setActivePath]);

    return (
        <TransitionWrapper>
            {children}
            <Outlet />
        </TransitionWrapper>
    );
};

export default EmergeConfigWrapper;
