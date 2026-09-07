// Centralized API configuration for VELORA WMS

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * Universal fetch wrapper for GET, POST, PUT, DELETE operations.
 * Handles JSON parsing, network errors, and headers consistently.
 */
async function request(endpoint, options = {}) {
  const url = endpoint.startsWith('http') 
    ? endpoint 
    : `${API_BASE_URL.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP Error ${response.status}: ${response.statusText}`);
    }

    // Handle empty response bodies (like 204 No Content)
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    return { success: true };
  } catch (error) {
    console.warn(`[API] Fetch error for ${url}:`, error.message);
    throw error;
  }
}

export const api = {
  get: (endpoint, options) => request(endpoint, { method: 'GET', ...options }),
  post: (endpoint, body, options) => request(endpoint, { method: 'POST', body: JSON.stringify(body), ...options }),
  put: (endpoint, body, options) => request(endpoint, { method: 'PUT', body: JSON.stringify(body), ...options }),
  delete: (endpoint, options) => request(endpoint, { method: 'DELETE', ...options }),
  getBaseUrl: () => API_BASE_URL,
};

export default api;
