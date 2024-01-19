'use client';

import React, { ReactNode, useEffect, useMemo } from 'react';
import { AuthContext, UserAuth } from './auth-context';
import { setCookieAuthToken } from './auth-helper';

export interface UserData {
  firstName?: string;
  lastName?: string;
  profileImage?: any;
  user: {
    username: string;
    id: number;
  };
}

export type AuthproviderType = {
  children: ReactNode;
  token?: string;
  userDataServer?: UserData;
  serverIsAuthed?: boolean;
};

const AuthProvider = ({ children, serverIsAuthed = false, token = undefined, userDataServer = undefined }: AuthproviderType) => {
  const [isAuthed, setIsAuthed] = React.useState<boolean>(serverIsAuthed);
  const [authToken, setAuthToken] = React.useState<string | undefined>(token);
  const [userData, setUserData] = React.useState<UserData | undefined>(userDataServer);

  const refreshUserData = () => {
    setIsAuthed(true);
  };

  useEffect(() => {
    if (authToken && authToken != token) {
      refreshUserData();
    }
  }, [authToken]);

  const handleLogout = () => {
    setIsAuthed(false);
    setAuthToken(undefined);
    setCookieAuthToken(undefined);
    // added intentionally to reload the browser.
    window.location.href = '/';
  };

  const config: UserAuth = useMemo(() => {
    return {
      isAuthed,
      userData,
      updateUserData: (data: UserData | undefined) => {
        setUserData(data);
      },
      doLogout: handleLogout,
    };
  }, [isAuthed]);

  return <AuthContext.Provider value={config}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
