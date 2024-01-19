'use client';

import React from 'react';

export interface AdminConfig {
  apiUrl: string;
}

export const AdminContextDefaultProperties: AdminConfig = {
  apiUrl: '',
};

export const AdminContext = React.createContext<AdminConfig>(AdminContextDefaultProperties);
export const useAdmin = (): AdminConfig => React.useContext(AdminContext);
