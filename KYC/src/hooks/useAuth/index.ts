import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { login as loginApi} from './apis';
import type { User } from './types';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      expiresAt: new Date(0),
      token: null,
      isLoading: false,

      login: async (username: string, password: string) => {
        set({ isLoading: true });
        try {
          const { user, token } = await loginApi(username, password);
          
          set({
            user,
            token,
            expiresAt: getExpiresDate(token),
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
          expiresAt: new Date(0),
        });
      },

      setUser: (user: User | null) => {
        set({ user });
      },

      setToken: (token: string | null) => {
        set({ token, expiresAt: token ? getExpiresDate(token!) : new Date(0)});
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        expiresAt: state.expiresAt,
      }),
    }
  )
);

const useAuth = () => {
  const state = useAuthStore();

  return {
    ...state,
    isAuthenticated: () => {
      return !!state.token && new Date() < state.expiresAt;
    },
  };
}

export default useAuth;

interface AuthState {
  user: User | null;
  token: string | null;
  expiresAt: Date;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
}

const getExpiresDate = (token: string) => {
  const payload = token.split('.')[1];
  return new Date(JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/'))).exp * 1000);
};