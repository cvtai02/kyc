import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { login as loginApi } from './apis';
import type { User } from './types';
import { toast } from 'react-toastify';

export const useAuthStore = create<AuthState>()(
  //persist store in localStorage
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      isHydrated: false,

      //refresh token if needed
      
      login: async (username: string, password: string) => {
        set({ isLoading: true });
        try {
          const { user, token } = await loginApi(username, password);
          
          set({
            user,
            token,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },
      
      logout: () => {
        set({
          user: null,
          token: null,
        });
      },
      isAuthenticated: (needToast = false) => {
        const token = get().token;
        console.log('Checking authentication with token:', token);
        if (!token) return false;
        // Check if the token is expired
        const expiresDate = getExpiresDate(token);
        if (!expiresDate) return false;
        if (expiresDate < new Date()) {
          console.log('Token expired at:', expiresDate);
          if (needToast) {
            setTimeout(() => {
              console.log('Showing token expired toast');
              toast.info('Token expired. Please log in again.');
            }, 0);
          }
          return false;
        }
        return true;
      },
    }),
    {
      //only persist specific fields
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
    }
  )
);

export default useAuthStore;

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: (needToast?: boolean) => boolean;
}

const getExpiresDate = (token: string) => {
  const payload = token.split('.')[1];
  return new Date(JSON.parse(atob(payload?.replace(/-/g, '+').replace(/_/g, '/'))).exp * 1000);
};