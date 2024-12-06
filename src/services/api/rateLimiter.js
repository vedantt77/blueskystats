export class RateLimiter {
  constructor() {
    this.queue = [];
    this.processing = false;
    this.lastRequestTime = 0;
    this.requestsInWindow = 0;
    this.windowStart = Date.now();
    this.config = {
      minRequestInterval: 2000, // 2 seconds between requests
      maxRetries: 3,
      baseRetryDelay: 5000, // 5 seconds
      maxRetryDelay: 30000, // 30 seconds
      maxRequestsPerWindow: 50, // Maximum requests per minute
      windowDuration: 60000, // 1 minute window
    };
  }

  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  resetRateLimit() {
    const now = Date.now();
    if (now - this.windowStart >= this.config.windowDuration) {
      this.requestsInWindow = 0;
      this.windowStart = now;
    }
  }

  async checkRateLimit() {
    this.resetRateLimit();
    
    if (this.requestsInWindow >= this.config.maxRequestsPerWindow) {
      const waitTime = this.config.windowDuration - (Date.now() - this.windowStart);
      await this.delay(waitTime);
      this.resetRateLimit();
    }
  }

  calculateRetryDelay(attempt) {
    const exponentialDelay = this.config.baseRetryDelay * Math.pow(2, attempt);
    const maxDelay = Math.min(exponentialDelay, this.config.maxRetryDelay);
    const jitter = Math.random() * 1000;
    return maxDelay + jitter;
  }

  async waitForNextRequest() {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    
    if (timeSinceLastRequest < this.config.minRequestInterval) {
      await this.delay(this.config.minRequestInterval - timeSinceLastRequest);
    }
    
    await this.checkRateLimit();
    this.lastRequestTime = Date.now();
    this.requestsInWindow++;
  }

  async processQueue() {
    if (this.processing || this.queue.length === 0) return;
    
    this.processing = true;
    
    while (this.queue.length > 0) {
      const { operation, resolve, reject, retries = 0 } = this.queue.shift();
      
      try {
        await this.waitForNextRequest();
        const result = await operation();
        resolve(result);
      } catch (error) {
        const isRateLimit = error.status === 429;
        const isServerError = error.status >= 500;
        
        if ((isRateLimit || isServerError) && retries < this.config.maxRetries) {
          const retryDelay = this.calculateRetryDelay(retries);
          console.log(`Request failed, retrying in ${retryDelay}ms...`);
          
          this.queue.unshift({
            operation,
            resolve,
            reject,
            retries: retries + 1
          });
          
          await this.delay(retryDelay);
        } else {
          reject(error);
        }
      }
    }
    
    this.processing = false;
  }

  async enqueue(operation) {
    return new Promise((resolve, reject) => {
      this.queue.push({ operation, resolve, reject });
      this.processQueue().catch(reject);
    });
  }
}