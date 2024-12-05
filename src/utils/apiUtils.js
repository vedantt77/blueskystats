import { BskyAgent } from '@atproto/api';

class RateLimitedAgent {
  constructor(service) {
    this.agent = new BskyAgent({ service });
    this.queue = [];
    this.processing = false;
    this.retryDelay = 2000; // Increased to 2 seconds
    this.maxRetries = 5; // Increased max retries
    this.lastRequestTime = 0;
    this.minRequestInterval = 1000; // Minimum 1 second between requests
  }

  async login(credentials) {
    return this.agent.login(credentials);
  }

  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async waitForNextRequest() {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    if (timeSinceLastRequest < this.minRequestInterval) {
      await this.delay(this.minRequestInterval - timeSinceLastRequest);
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
        if (error.status === 429 && retries < this.maxRetries) {
          console.log(`Rate limit hit, retrying in ${this.retryDelay * Math.pow(2, retries)}ms...`);
          this.queue.unshift({
            operation,
            resolve,
            reject,
            retries: retries + 1
          });
          await this.delay(this.retryDelay * Math.pow(2, retries));
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

  async getProfile(params) {
    return this.enqueue(() => this.agent.getProfile(params));
  }

  async getAuthorFeed(params) {
    return this.enqueue(() => this.agent.getAuthorFeed(params));
  }
}

// Create a singleton instance
let agentInstance = null;

export const createRateLimitedAgent = (service = 'https://bsky.social') => {
  if (!agentInstance) {
    agentInstance = new RateLimitedAgent(service);
  }
  return agentInstance;
};