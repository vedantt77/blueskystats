import { BskyAgent } from '@atproto/api';
import { RateLimiter } from './rateLimiter';
import { ErrorHandler } from './errorHandler';

class BlueskyAgent {
  constructor(service = 'https://bsky.social') {
    this.agent = new BskyAgent({ service });
    this.rateLimiter = new RateLimiter();
    this.errorHandler = new ErrorHandler();
  }

  async login(credentials) {
    try {
      return await this.agent.login(credentials);
    } catch (error) {
      throw this.errorHandler.handle(error);
    }
  }

  async getProfile(params) {
    return this.rateLimiter.enqueue(async () => {
      try {
        return await this.agent.getProfile(params);
      } catch (error) {
        throw this.errorHandler.handle(error);
      }
    });
  }

  async getAuthorFeed(params) {
    return this.rateLimiter.enqueue(async () => {
      try {
        return await this.agent.getAuthorFeed(params);
      } catch (error) {
        throw this.errorHandler.handle(error);
      }
    });
  }
}

let instance = null;

export const getBlueskyAgent = () => {
  if (!instance) {
    instance = new BlueskyAgent();
  }
  return instance;
};