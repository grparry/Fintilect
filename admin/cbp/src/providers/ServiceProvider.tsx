import React from 'react';
import { ServiceContext, ServiceContextType } from '../context/ServiceContext';

interface ServiceProviderProps {
  children: React.ReactNode;
}

export const ServiceProvider: React.FC<ServiceProviderProps> = ({ children }) => {
  const services: ServiceContextType = {
    // Add services as needed
  };

  return (
    <ServiceContext.Provider value={services}>
      {children}
    </ServiceContext.Provider>
  );
};