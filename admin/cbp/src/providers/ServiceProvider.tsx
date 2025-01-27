import React from 'react';
import { ServiceContext, ServiceContextType } from './contexts/ServiceContext';
import { memberService } from './services/factory/ServiceFactory';

interface ServiceProviderProps {
  children: React.ReactNode;
}
export const ServiceProvider: React.FC<ServiceProviderProps> = ({ children }) => {
  const services: ServiceContextType = {
    memberService,
    // Add other services as needed
  };
  return (
    <ServiceContext.Provider value={services}>
      {children}
    </ServiceContext.Provider>
  );
};