'use client';

import React, { ReactNode, useMemo } from 'react';
import { AdminConfig, AdminContext } from './admin-context';
import { ConfigProvider, StyledJsxRegistry } from '@himalaya-ui/core';
import AuthProvider from '../auth/auth-provider';

export type AdminProviderProp = {
  children: ReactNode;
  apiUrl: string;
  defaultTheme: string;
};

const AdminProvider = ({ children, apiUrl, defaultTheme }: AdminProviderProp) => {
  const [_apiUrl, _setApiUrl] = React.useState<string>(apiUrl);

  const config: AdminConfig = useMemo(() => {
    return {
      apiUrl: _apiUrl,
    };
  }, [_apiUrl]);

  return (
    <AdminContext.Provider value={config}>
      <AuthProvider>
        <StyledJsxRegistry>
          <ConfigProvider detectTheme={true} themeType={defaultTheme || 'dark'}>
            {children}
          </ConfigProvider>
        </StyledJsxRegistry>
      </AuthProvider>
    </AdminContext.Provider>
  );
};

export default AdminProvider;
