import { createContext } from 'react';

export interface ServiceContextType {
  // Add services as needed
}

export const ServiceContext = createContext<ServiceContextType | null>(null);