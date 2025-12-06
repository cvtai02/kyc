import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getUserProfile, login as loginApi } from './apis';
import type { User } from '../../types/user';
import { toast } from 'react-toastify';

export const useAuthStore = create<AuthState>()(
  //persist store in localStorage
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      isHydrated: false,

      //refresh token if needed
      
      login: async (username: string, password: string) => {
        set({ isLoading: true });
        try {
          let user = await loginApi(username, password);
          //get the role
          const profile = await getUserProfile(user.accessToken);
          user = { ...user, ...profile };
          console.log('Logged in user:', user);
          set({
            user,
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
        });
      },
      setUser: (user: User | null) => {
        set({ user });
      },
      isAuthenticated: (needToast = false) => {
        const token = get().user?.accessToken;
        console.log('Checking authentication with token:', token);
        if (!token) return false;
        // Check if the token is expired
        const expiresDate = getExpiresDate(token);
        if (!expiresDate) return false;
        if (expiresDate < new Date()) {
          console.log('Token expired at:', expiresDate);
          if (needToast) {
            toast.info('Token expired. Please log in again.');
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
      }),
    }
  )
);

export default useAuthStore;

interface AuthState {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
  isAuthenticated: (needToast?: boolean) => boolean;
}

const getExpiresDate = (token: string) => {
  const payload = token.split('.')[1];
  return new Date(JSON.parse(atob(payload?.replace(/-/g, '+').replace(/_/g, '/'))).exp * 1000);
};