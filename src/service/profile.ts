import { GETWithToken } from '@/core';
import { ProfileMe } from '@/models/User';

export const getProfileMe = (signal?: AbortSignal) => {
  const API_URL = '/api/profile/v1/me';
  return GETWithToken<ProfileMe>(API_URL, {}, {}, signal);
};
