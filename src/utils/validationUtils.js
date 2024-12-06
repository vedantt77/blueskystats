export const isValidHandle = (handle) => {
  // Handle must be a string and contain at least one dot
  if (typeof handle !== 'string' || !handle.includes('.')) {
    return false;
  }

  // Basic handle format validation
  const handleRegex = /^[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return handleRegex.test(handle);
};

export const sanitizeHandle = (handle) => {
  // Remove whitespace and convert to lowercase
  return handle.trim().toLowerCase();
};

export const formatErrorMessage = (error) => {
  if (error.status === 400) {
    if (error.message?.includes('actor must be a valid did or a handle')) {
      return 'Please enter a valid Bluesky handle (e.g., username.bsky.social)';
    }
    if (error.message === 'Profile not found') {
      return 'Profile not found. Please check the handle and try again.';
    }
  }
  return error.userMessage || 'An unexpected error occurred. Please try again.';
};