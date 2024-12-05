export class RateLimiter {
  constructor() {
    this.queue = [];
    this.processing = false;
    this.lastRequestTime = 0;
    this.config = {
      minRequestInterval: 1000, // 1 second between requests
      maxRetries: 5,
      baseRetryDelay: 2000, // 2 seconds
      maxRetryDelay: 32000, // 32 seconds
    };
  }

  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  calculateRetryDelay(attempt) {
    // Exponential backoff with jitter
    const exponentialDelay = this.config.baseRetryDelay * Math.pow(2, attempt);
    const maxDelay = Math.min(exponentialDelay, this.config.maxRetryDelay);
    const jitter = Math.random() * 1000; // Add up to 1 second of random jitter
    return maxDelay + jitter;
  }

  async waitForNextRequest() {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    
    if (timeSinceLastRequest < this.config.minRequestInterval) {
      await this.delay(this.config.minRequestInterval - timeSinceLastRequest);
    }
    
    this.lastRequestTime = Date.now();
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
        if (error.status === 429 && retries < this.config.maxRetries) {
          const retryDelay = this.calculateRetryDelay(retries);
          console.log(`Rate limit hit, retrying in ${retryDelay}ms...`);
          
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
      this.processQueue();
    });
  }
}