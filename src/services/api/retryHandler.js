export class RetryHandler {
  constructor(config) {
    this.config = config;
  }

  shouldRetry(error, retries) {
    if (retries >= this.config.MAX_RETRIES) return false;
    return error.status === 429 || error.status >= 500 || error.name === 'TypeError';
  }

  async executeWithRetry(operation) {
    let retries = 0;
    
    while (true) {
      try {
        return await operation();
      } catch (error) {
        if (!this.shouldRetry(error, retries)) {
          throw error;
        }

        const delay = this.calculateDelay(retries);
        await new Promise(resolve => setTimeout(resolve, delay));
        retries++;
      }
    }
  }

  calculateDelay(retries) {
    const exponentialDelay = this.config.BASE_DELAY * Math.pow(2, retries);
    const maxDelay = Math.min(exponentialDelay, this.config.MAX_DELAY);
    const jitter = Math.random() * 2000;
    return maxDelay + jitter;
  }
}