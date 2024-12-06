export class ErrorHandler {
  handle(error) {
    if (error.status === 429) {
      return {
        ...error,
        message: 'Rate limit exceeded. Please try again later.',
        userMessage: 'We\'re experiencing high traffic. Please wait a moment before trying again.',
        retryAfter: this.getRetryAfterFromHeaders(error.headers) || 5000
      };
    }

    if (error.status >= 500) {
      return {
        ...error,
        message: 'Server error. Retrying request...',
        userMessage: 'Temporary server issue. Please wait while we retry.',
        retryAfter: 5000
      };
    }

    if (error.status === 401) {
      return {
        ...error,
        message: 'Authentication failed',
        userMessage: 'Unable to authenticate. Please try again later.'
      };
    }

    if (error.status === 404) {
      return {
        ...error,
        message: 'Resource not found',
        userMessage: 'The requested profile or content could not be found.'
      };
    }

    return {
      ...error,
      message: error.message || 'An unexpected error occurred',
      userMessage: 'Something went wrong. Please try again in a few moments.'
    };
  }

  getRetryAfterFromHeaders(headers) {
    if (!headers) return null;
    const retryAfter = headers.get('Retry-After');
    return retryAfter ? parseInt(retryAfter, 10) * 1000 : null;
  }
}