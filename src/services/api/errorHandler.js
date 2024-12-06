export class ErrorHandler {
  handle(error) {
    // Add rate limit specific error handling
    if (error.status === 429) {
      const retryAfter = this.getRetryAfterFromHeaders(error.headers);
      return {
        ...error,
        message: 'Rate limit exceeded. Please try again later.',
        userMessage: 'We\'re receiving too many requests. Please wait a moment before trying again.',
        retryAfter: retryAfter || 10000 // Default to 10 seconds if no header
      };
    }

    if (error.status >= 500) {
      return {
        ...error,
        message: 'Server error. Retrying request...',
        userMessage: 'The server is experiencing issues. Please wait while we retry.',
        retryAfter: 5000
      };
    }

    if (error.status === 401) {
      return {
        ...error,
        message: 'Authentication failed',
        userMessage: 'Unable to authenticate. Please check your credentials and try again.'
      };
    }

    if (error.status === 404) {
      return {
        ...error,
        message: 'Resource not found',
        userMessage: 'The requested profile or content could not be found.'
      };
    }

    // Generic error handling
    return {
      ...error,
      message: error.message || 'An unexpected error occurred',
      userMessage: 'Something went wrong. Please try again in a few moments.',
      retryAfter: 5000
    };
  }

  getRetryAfterFromHeaders(headers) {
    if (!headers) return null;
    const retryAfter = headers.get('Retry-After');
    if (!retryAfter) return null;
    
    // Convert to milliseconds
    const seconds = parseInt(retryAfter, 10);
    return isNaN(seconds) ? null : seconds * 1000;
  }
}