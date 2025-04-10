import { createContext } from 'react';
import { IMemberService } from '../services/interfaces/IMemberService';

export interface ServiceContextType {
  memberService: IMemberService;
  // Add other services as needed
}

export const ServiceContext = createContext<ServiceContextType | null>(null);
