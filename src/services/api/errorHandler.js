export class ErrorHandler {
  handle(error) {
    // Enhance error with more descriptive messages
    if (error.status === 429) {
      return {
        ...error,
        message: 'Too many requests. Please try again later.',
        userMessage: 'We\'re experiencing high traffic. Please wait a moment before trying again.',
        retryAfter: this.getRetryAfterFromHeaders(error.headers)
      };
    }

    if (error.status === 401) {
      return {
        ...error,
        message: 'Authentication failed',
        userMessage: 'Unable to authenticate. Please check your credentials.'
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
      userMessage: 'Something went wrong. Please try again later.'
    };
  }

  getRetryAfterFromHeaders(headers) {
    if (!headers) return null;
    const retryAfter = headers.get('Retry-After');
    return retryAfter ? parseInt(retryAfter, 10) * 1000 : null;
  }
}