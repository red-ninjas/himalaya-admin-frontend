'use client';

import React from 'react';
import { UserData } from './auth-provider';

export interface UserAuth {
  isAuthed: boolean;
  doLogout: () => void;
  userData: UserData | undefined;
  updateUserData: (data: UserData | undefined) => void;
}

export const AuthContextDefaultProperties: UserAuth = {
  isAuthed: false,
  userData: undefined,
  doLogout: () => {},
  updateUserData: () => {},
};

export const AuthContext = React.createContext<UserAuth>(AuthContextDefaultProperties);
export const useAuth = (): UserAuth => React.useContext(AuthContext);
