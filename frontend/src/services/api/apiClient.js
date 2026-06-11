import axios from 'axios';
import { HTTP_STATUS } from '../../types/api.types';

/**
 * Create and configure axios instance with response interceptor
 */
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Response interceptor to normalize backend responses
 * Backend format: { statusCode, success, message, data, uniqueKey, errors, timestamp }
 */
apiClient.interceptors.response.use(
  (response) => {
    const { data } = response;

    // Log timestamp for debugging
    if (data?.timestamp) {
      console.log('[API Response]', {
        timestamp: data.timestamp,
        uniqueKey: data.uniqueKey,
        statusCode: data.statusCode,
      });
    }

    // Check success flag - this is the key indicator
    if (data?.success === true) {
      // Success: return normalized response
      return {
        status: true,
        message: data.message || 'Operation successful',
        data: data.data,
        uniqueKey: data.uniqueKey,
        timestamp: data.timestamp,
      };
    } else if (data?.success === false) {
      // Explicit failure from backend (e.g., 200 status but success: false)
      const error = new Error(data.message || 'Operation failed');
      error.response = response;
      error.statusCode = data.statusCode;
      error.uniqueKey = data.uniqueKey;
      error.errors = data.errors;
      throw error;
    }

    // Fallback for responses without success field
    return {
      status: true,
      message: data?.message || 'Operation successful',
      data: data?.data || data,
      uniqueKey: data?.uniqueKey,
      timestamp: data?.timestamp || new Date().toISOString(),
    };
  },
  (error) => {
    // Handle errors

    // Network error or no response from server
    if (!error.response) {
      return Promise.reject({
        status: false,
        message: error.message || 'Network error. Please check your connection.',
        data: null,
        statusCode: 0,
      });
    }

    const { data, status } = error.response;

    // Handle different HTTP status codes
    let userMessage = data?.message || 'Something went wrong';

    switch (status) {
      case HTTP_STATUS.BAD_REQUEST:
        userMessage = data?.message || 'Invalid request. Please check your input.';
        break;
      case HTTP_STATUS.UNAUTHORIZED:
        userMessage = 'Session expired. Please login again.';
        // Optionally redirect to login
        break;
      case HTTP_STATUS.FORBIDDEN:
        userMessage = 'You do not have permission to perform this action.';
        break;
      case HTTP_STATUS.NOT_FOUND:
        userMessage = data?.message || 'Resource not found.';
        break;
      case HTTP_STATUS.CONFLICT:
        userMessage = data?.message || 'Request conflict. Please try again.';
        break;
      case HTTP_STATUS.INTERNAL_SERVER_ERROR:
        userMessage = 'Server error. Please try again later.';
        break;
      case HTTP_STATUS.SERVICE_UNAVAILABLE:
        userMessage = 'Service unavailable. Please try again later.';
        break;
      default:
        userMessage = data?.message || 'Something went wrong. Please try again.';
    }

    return Promise.reject({
      status: false,
      message: userMessage,
      data: data?.data || null,
      statusCode: status,
      uniqueKey: data?.uniqueKey,
      errors: data?.errors,
      timestamp: data?.timestamp || new Date().toISOString(),
    });
  }
);

export default apiClient;
