import { useContext } from 'react';
import { ServiceContext, ServiceContextType } from '../contexts/ServiceContext';

type ServiceKeys = keyof ServiceContextType;
/**
 * Hook to get a service instance from the ServiceContext
 * @param serviceName Name of the service to retrieve
 * @returns Service instance of type T
 */
export function useService<T>(serviceName: ServiceKeys): T {
  const services = useContext(ServiceContext);
  if (!services) {
    throw new Error('useService must be used within a ServiceContext.Provider');
  }
  const service = services[serviceName];
  if (!service) {
    throw new Error(`Service ${serviceName} not found in ServiceContext`);
  }
  return service as T;
}