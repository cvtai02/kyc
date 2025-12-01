import type { User } from './types';
import { API_BASE_URL } from '../../base/constants';
import { appFetch } from '@/base/appFetch';

export const login = async (username: string, password: string): Promise<{ user: User; token: string }> => {
  const data : LoginResponse = await appFetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
      expiresInMins: 10,
    }),
  });

  const user: User = {
    id: data.id.toString(),
    email: data.email,
    name: `${data.firstName} ${data.lastName}`,
    role: 'User',
  };

  return {
    user,
    token: data.accessToken,
  };
};

export const getCurrentUser = async (): Promise<User> => {
  const data: LoginResponse = await appFetch(`${API_BASE_URL}/auth/me`);

  return {
    id: data.id.toString(),
    email: data.email,
    name: `${data.firstName} ${data.lastName}`,
    role: 'User',
  };
};


interface LoginResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}
