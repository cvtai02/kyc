import { API_INTERCEPTOR_CONFIG } from '@/base/api-interceptor.config';

export class ApiError extends Error {
    public statusCode: number;
    public details?: any;

    constructor(message: string, statusCode: number, details?: any) {
        super(message);
        this.name = 'ApiError';
        this.statusCode = statusCode;
        this.details = details;
    }
};

//override default fetch function to include API_INTERCEPTOR_CONFIG behavior
export const appFetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<any> => {
    const response = await globalThis.fetch(input, {
        ...init,
        headers: {
            ...API_INTERCEPTOR_CONFIG.headers,
            ...(init?.headers || {}),
        },
    });
    if (!response.ok) {
        await API_INTERCEPTOR_CONFIG.handleApiError(response);
    }
    return await response.json();
};
