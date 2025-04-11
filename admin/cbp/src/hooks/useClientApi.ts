import { useEffect } from 'react';
import { useClient } from '../context/ClientContext';
import logger from '../utils/logger';

/**
 * Hook to indicate that the current component uses client-specific API services.
 * This will enable the ClientSelector in the UI when the user is an admin.
 * 
 * @param {boolean} usesClientApi - Whether the component uses client-specific API services
 */
export const useClientApi = (usesClientApi: boolean = true) => {
  const { setUsesClientApi } = useClient();
  
  useEffect(() => {
    // Debug: Log when the hook is called
    logger.log(`[useClientApi] Setting usesClientApi to: ${usesClientApi}`);
    
    // Set the flag when the component mounts
    setUsesClientApi(usesClientApi);
    
    // Clean up when the component unmounts
    return () => {
      logger.log('[useClientApi] Cleanup - setting usesClientApi to false');
      setUsesClientApi(false);
    };
  }, [usesClientApi, setUsesClientApi]);
};

export default useClientApi;
