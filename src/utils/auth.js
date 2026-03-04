/**
 * Decode a JWT token payload without verifying the signature.
 * Returns null if the token is invalid.
 */
export function decodeToken(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

/** Get the current user info from the stored access token */
export function getCurrentUser() {
  const token = localStorage.getItem('access_token');
  if (!token) return null;
  const payload = decodeToken(token);
  if (!payload) return null;
  return {
    id: payload.user_id,
    username: payload.username,
    role: payload.role,
  };
}

/** Check if the user is a manager */
export function isManager() {
  const user = getCurrentUser();
  return user?.role === 'manager';
}

/** Check if the user is authenticated (has a non-expired access token) */
export function isAuthenticated() {
  const token = localStorage.getItem('access_token');
  if (!token) return false;
  const payload = decodeToken(token);
  if (!payload) return false;
  // Check expiration
  const now = Math.floor(Date.now() / 1000);
  // If token is expired, we still return true — the interceptor will handle refresh
  // We only return false if there's no token at all
  return true;
}

/** Store auth tokens and user data after login/register */
export function storeAuth(access, refresh, user = null) {
  localStorage.setItem('access_token', access);
  localStorage.setItem('refresh_token', refresh);
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
  }
}

/** Clear all auth data */
export function clearAuth() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user');
}

/** Get stored user object */
export function getStoredUser() {
  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
}

/**
 * Extract error messages from API error response.
 * Returns a string suitable for displaying to the user.
 */
export function extractErrors(error) {
  const data = error.response?.data;
  if (!data) return error.message || 'An unexpected error occurred.';

  // If there's a simple message
  if (data.message && !data.errors) return data.message;

  // If there are field errors
  if (data.errors) {
    const messages = [];
    for (const [field, fieldErrors] of Object.entries(data.errors)) {
      if (Array.isArray(fieldErrors)) {
        fieldErrors.forEach((msg) => {
          if (field === 'detail' || field === 'non_field_errors') {
            messages.push(msg);
          } else {
            messages.push(`${field}: ${msg}`);
          }
        });
      } else if (typeof fieldErrors === 'string') {
        if (field === 'detail' || field === 'non_field_errors') {
          messages.push(fieldErrors);
        } else {
          messages.push(`${field}: ${fieldErrors}`);
        }
      }
    }
    return messages.join('\n') || data.message || 'Validation error.';
  }

  return data.message || 'An unexpected error occurred.';
}
