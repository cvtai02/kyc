import type { User } from './types';
import { API_BASE_URL, TOKEN_EXPIRE_THRESHOLD_MINS } from '../../base/constants';
import { appFetch } from '@/base/appFetch';

export const login = async (username: string, password: string): Promise<User> => {
  const data : User = await appFetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
      expiresInMins: TOKEN_EXPIRE_THRESHOLD_MINS,
    }),
  });

  return data;
};

export const getUserProfile = async (token: string): Promise<User> => {
  const data = await appFetch(`${API_BASE_URL}/auth/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

