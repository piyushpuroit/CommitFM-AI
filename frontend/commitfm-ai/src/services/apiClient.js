/**
 * API Configuration
 * Uses environment variables for base URL
 * Defaults to localhost for development
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const getApiUrl = () => API_URL;

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
      // Handle different HTTP status codes
      if (response.status === 401) {
        // Unauthorized - likely need to re-authenticate
        window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/auth/github/login`;
        return null;
      }
      
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}`);
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
