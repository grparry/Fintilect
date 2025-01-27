import { createContext, useContext } from 'react';
import { IBillPayService } from './services/interfaces/IBillPayServiceservices/interfaces/IBillPayService';
import { IExceptionService } from './services/interfaces/IExceptionServiceservices/interfaces/IExceptionService';
import { IPaymentProcessorService } from './services/interfaces/IPaymentProcessorServiceservices/interfaces/IPaymentProcessorService';
import { ISettingsService } from './services/interfaces/ISettingsServiceservices/interfaces/ISettingsService';

export interface ServiceContext {
  billPayService: IBillPayService;
  exceptionService: IExceptionService;
  paymentProcessorService: IPaymentProcessorService;
  settingsService: ISettingsService;
}

export const ServiceContext = createContext<ServiceContext | null>(null);

export function useServiceContext(): ServiceContext {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error('useServiceContext must be used within a ServiceContext.Provider');
  }
  return context;
}
