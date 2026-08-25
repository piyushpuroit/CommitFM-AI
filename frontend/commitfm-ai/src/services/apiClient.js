/**
 * API Configuration
 * Uses environment variables for base URL
 * Defaults to localhost for development
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const getApiUrl = () => API_URL;

export const loginWithGitHub = () => {
  window.location.assign(`${getApiUrl()}/api/auth/github/login`);
};

export const apiCall = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include', // For session-based auth
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const err = new Error(errorData.message || `HTTP ${response.status}`);
      err.status = response.status;
      throw err;
    }
    
    return await response.json();
  } catch (error) {
    console.error(`API call failed: ${endpoint}`, error);
    throw error;
  }
};

export const apiCallAbort = (signal, endpoint, options = {}) => {
  return apiCall(endpoint, { ...options, signal });
};

