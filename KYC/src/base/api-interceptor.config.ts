import { ROUTES } from "../routes";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ApiError } from "@/base/appFetch";

export const API_INTERCEPTOR_CONFIG = {
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('auth-storage') || '{}').state?.token || ''}`,
    },
    clientErrors: {
        default: 'An error occurred. Please try again.',
        400: 'Bad Request. Please check your input.',
        401: 'Unauthorized! Please log in again.',
        403: 'Forbidden! You do not have permission to access this resource.',
        404: 'Resource not found. Please check the URL.',
        408: 'Request Timeout. Please try again later.',
        409: 'Conflict! The resource already exists.',
    } as Record<string, string>, 
    serverError: {
        default: 'Server error occurred. Please try again later.',
        500: 'Internal Server Error. Please contact support.',
        502: 'Bad Gateway. Please try again later.',
        503: 'Service Unavailable. Please try again later.',
        504: 'Gateway Timeout. Please try again later.',
    } as Record<string, string>,
    networkError: {
        default: 'Network error. Please check your internet connection.',
    } as Record<string, string>,

    async getErrorMessage(response: Response): Promise<string> {
        const body = await response.clone().json().catch(() => null);
        if (body && body.message) {
            return body.message;
        }
        if (response.status >= 400 && response.status < 500) {
            return this.clientErrors[response.status.toString()] || this.clientErrors.default;
        } else if (response.status >= 500) {
            return this.serverError[response.status.toString()] || this.serverError.default;
        } else {
            return this.networkError.default;
        }
    },

    async handleApiError(response: Response): Promise<void> {
        const errorMessage = await this.getErrorMessage(response);

        // you can catch this ApiError in your API calls and handle it, otherwise it will be handled by globalApiErrorHandler
        throw new ApiError(errorMessage, response.status);  
    },

    // must be used in QueryClient or useFetch hook
    globalApiErrorHandler: async (error: ApiError) => {
        toast.error(error.message);
        console.log(error.details)
        if (error.statusCode === 401) {
            const navigate = useNavigate();
            navigate(ROUTES.login);
        }
    },
};
