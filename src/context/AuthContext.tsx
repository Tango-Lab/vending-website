'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { getAccessToken } from '@/utils/LocalStorage';
import { AuthStorageKey } from '@/constants/Storage';
import { ProfileMe } from '@/models/User';
import { getProfileMe } from '@/service/profile';
import { useRouter } from 'next/navigation';

export interface AuthContextType {
  isAuthenticated: boolean;
  isFetchingProfile: boolean;
  me: ProfileMe | null;
  onRefresh: () => void;
  logOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isFetchingProfile, setIsFetchingProfile] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [userProfile, setUserProfile] = useState<ProfileMe | null>(null);

  useEffect(() => {
    const accessToken = getAccessToken();
    if (accessToken?.accessToken) {
      const abortController = new AbortController(); // Create an AbortController
      getCurrentProfile(abortController);

      // Cleanup: abort API request if component unmounts
      return () => abortController.abort();
    }
  }, [isRefresh]);

  const logOut = () => {
    localStorage.removeItem(AuthStorageKey);
    setIsAuthenticated(false);
    setUserProfile(null); // Clear user profile on logout
    router.push('/auth/login');
  };

  const onRefresh = useCallback(() => {
    setIsRefresh(!isRefresh);
  }, []);

  const getCurrentProfile = (abortController: AbortController) => {
    setIsFetchingProfile(true);
    getProfileMe(abortController.signal) // Pass the abort signal to the API call
      .then((res) => {
        setUserProfile(res);
        setIsAuthenticated(true);
      })
      .catch((error) => {
        if (error?.name === 'AbortError') {
          console.log('Fetch aborted');
          return;
        }
        if (error?.statusCode === 401) {
          logOut();
        }
      })
      .finally(() => {
        setIsFetchingProfile(false);
      });
  };

  const contextValue = {
    isAuthenticated,
    isFetchingProfile,
    me: userProfile,
    onRefresh,
    logOut,
  };

  return <AuthContext.Provider value={contextValue}>{isFetchingProfile ? '' : children}</AuthContext.Provider>;
};

export default AuthProvider;
