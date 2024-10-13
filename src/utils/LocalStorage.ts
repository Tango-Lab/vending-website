import { EmptyObject } from 'react-hook-form';

import { AuthStorageKey } from '@/constants/Storage';
import { AccessToken } from '@/models/AccessToken';

export const getAccessToken = (): AccessToken | EmptyObject => {
  if (!localStorage) {
    return {};
  }
  const token = localStorage.getItem(AuthStorageKey);
  if (token) {
    return JSON.parse(token) as AccessToken;
  }

  return {};
};
