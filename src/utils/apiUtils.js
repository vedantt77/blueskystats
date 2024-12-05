import { BskyAgent } from '@atproto/api';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class RateLimitedAgent {
  constructor(service) {
    this.agent = new BskyAgent({ service });
    this.queue = [];
    this.processing = false;
    this.retryDelay = 1000; // 1 second delay between requests
    this.maxRetries = 3;
  }

  async login(credentials) {
    return this.agent.login(credentials);
  }

  async processQueue() {
    if (this.processing || this.queue.length === 0) return;
    
    this.processing = true;
    
    while (this.queue.length > 0) {
      const { operation, resolve, reject, retries = 0 } = this.queue.shift();
      
      try {
        await delay(this.retryDelay);
        const result = await operation();
        resolve(result);
      } catch (error) {
        if (error.status === 429 && retries < this.maxRetries) {
          // Rate limit hit - add back to queue with increased retry count
          this.queue.unshift({
            operation,
            resolve,
            reject,
            retries: retries + 1
          });
          await delay(this.retryDelay * Math.pow(2, retries)); // Exponential backoff
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

export const createRateLimitedAgent = (service = 'https://bsky.social') => {
  return new RateLimitedAgent(service);
};