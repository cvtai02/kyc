import { QueryClient } from '@tanstack/react-query';
import { API_INTERCEPTOR_CONFIG } from './api-interceptor.config';
import { ApiError } from '@/base/appFetch';

// default behaveior for all queries and mutations
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      retryDelay: 3000,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      throwOnError(error) {
        if(error instanceof  ApiError) {
          API_INTERCEPTOR_CONFIG.globalApiErrorHandler(error);
        }
        return false;
      },
    },

    mutations: {
      onError: (error) => {
        if (error instanceof ApiError) {
          API_INTERCEPTOR_CONFIG.globalApiErrorHandler(error);
        }
      },
    },
  },
});

export default queryClient;