import { BskyAgent } from '@atproto/api';

class RateLimitedAgent {
  constructor(service) {
    this.agent = new BskyAgent({ service });
    this.queue = [];
    this.processing = false;
    this.retryDelay = 5000; // Increased base delay to 5 seconds
    this.maxRetries = 3;
    this.lastRequestTime = 0;
    this.minRequestInterval = 2000; // Increased to 2 seconds between requests
    this.requestsInWindow = 0;
    this.windowStart = Date.now();
    this.maxRequestsPerWindow = 50; // Maximum requests per window
    this.windowDuration = 60000; // 1 minute window
  }

  async login(credentials) {
    return this.agent.login(credentials);
  }

  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  resetRateLimit() {
    const now = Date.now();
    if (now - this.windowStart >= this.windowDuration) {
      this.requestsInWindow = 0;
      this.windowStart = now;
    }
  }

  async checkRateLimit() {
    this.resetRateLimit();
    
    if (this.requestsInWindow >= this.maxRequestsPerWindow) {
      const waitTime = this.windowDuration - (Date.now() - this.windowStart);
      await this.delay(waitTime);
      this.resetRateLimit();
    }
  }

  async waitForNextRequest() {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    
    if (timeSinceLastRequest < this.minRequestInterval) {
      await this.delay(this.minRequestInterval - timeSinceLastRequest);
    }
    
    await this.checkRateLimit();
    this.lastRequestTime = Date.now();
    this.requestsInWindow++;
  }

  calculateBackoff(retries) {
    // Exponential backoff with jitter
    const baseDelay = this.retryDelay * Math.pow(2, retries);
    const jitter = Math.random() * 1000;
    return Math.min(baseDelay + jitter, 30000); // Cap at 30 seconds
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
        
        if ((isRateLimit || isServerError) && retries < this.maxRetries) {
          const backoff = this.calculateBackoff(retries);
          console.log(`Request failed, retrying in ${backoff}ms...`);
          
          this.queue.unshift({
            operation,
            resolve,
            reject,
            retries: retries + 1
          });
          
          await this.delay(backoff);
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

  async getProfile(params) {
    return this.enqueue(() => this.agent.getProfile(params));
  }

  async getAuthorFeed(params) {
    return this.enqueue(() => this.agent.getAuthorFeed(params));
  }
}

let agentInstance = null;

export const createRateLimitedAgent = (service = 'https://bsky.social') => {
  if (!agentInstance) {
    agentInstance = new RateLimitedAgent(service);
  }
  return agentInstance;
};