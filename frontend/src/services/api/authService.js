import apiClient from './apiClient';

/**
 * Register a new user
 * @param {Object} user - User registration data
 * @returns {Promise<{status: boolean, message: string, data: any}>}
 */
export const registerUser = async (user) => {
  try {
    const response = await apiClient.post('/auth/register', user);
    return {
      status: response.status,
      message: response.message,
      data: response.data,
    };
  } catch (error) {
    return {
      status: false,
      message: error.message || 'Registration failed',
      data: null,
    };
  }
};

/**
 * Login user
 * @param {Object} user - User login credentials
 * @returns {Promise<{status: boolean, message: string, data: any}>}
 */
export const loginUser = async (user) => {
  try {
    const response = await apiClient.post('/auth/login', user);
    return {
      status: response.status,
      message: response.message,
      data: response.data,
    };
  } catch (error) {
    return {
      status: false,
      message: error.message || 'Login failed',
      data: null,
    };
  }
};

export const exchangeOAuthToken = async (idToken) => {
  try {
    const response = await apiClient.post('/auth/oauth/exchange', { idToken });
    return response;
  } catch (error) {
    return {
      status: false,
      message: error.message || 'Google sign-in failed',
      data: null,
    };
  }
};

const profileHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem('token')}`,
});

export const getProfile = () =>
  apiClient.get('/auth/profile', { headers: profileHeaders() });

export const updateProfile = (profile) =>
  apiClient.put('/auth/profile', profile, { headers: profileHeaders() });
