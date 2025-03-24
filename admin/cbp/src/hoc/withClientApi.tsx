import React, { ComponentType } from 'react';
import useClientApi from '../hooks/useClientApi';

/**
 * Higher-Order Component that wraps a component with the useClientApi hook.
 * This ensures that the ClientSelector will be visible when this component is rendered
 * (assuming the user is an admin).
 * 
 * @param Component The component to wrap
 * @param usesClientApi Whether the component uses client-specific API services (default: true)
 * @returns A wrapped component that sets the usesClientApi flag in the ClientContext
 */
export const withClientApi = <P extends object>(
  Component: ComponentType<P>,
  usesClientApi: boolean = true
): React.FC<P> => {
  const WithClientApi: React.FC<P> = (props) => {
    // Set the usesClientApi flag in the ClientContext
    useClientApi(usesClientApi);
    
    // Render the wrapped component with its props
    return <Component {...props} />;
  };
  
  // Set display name for debugging purposes
  const displayName = Component.displayName || Component.name || 'Component';
  WithClientApi.displayName = `withClientApi(${displayName})`;
  
  return WithClientApi;
};

export default withClientApi;
