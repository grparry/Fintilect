import { ReactNode } from 'react';

export interface BaseHeaderProps {
  children?: ReactNode;
  title: string;
  description?: string;
}

export interface EmergeAdminHeaderProps extends BaseHeaderProps {
  // Add any specific props for EmergeAdminHeader
}

export interface EmergeConfigHeaderProps extends BaseHeaderProps {
  // Add any specific props for EmergeConfigHeader
}

export interface ClientManagementHeaderProps extends BaseHeaderProps {
  // Add any specific props for ClientManagementHeader
}

export interface HeaderActionProps {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export interface HeaderTabProps {
  label: string;
  value: string;
  icon?: ReactNode;
  disabled?: boolean;
}
