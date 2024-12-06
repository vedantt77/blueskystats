import { BskyAgent } from '@atproto/api';
import { API_CONFIG } from './constants';
import { RetryHandler } from './retryHandler';
import { RateLimiter } from './rateLimiter';
import { ErrorHandler } from './errorHandler';

class BlueskyService {
  constructor() {
    this.agent = new BskyAgent({ service: API_CONFIG.BASE_URL });
    this.rateLimiter = new RateLimiter(API_CONFIG.RATE_LIMITS);
    this.retryHandler = new RetryHandler(API_CONFIG.RATE_LIMITS);
    this.errorHandler = new ErrorHandler();
    this.isAuthenticated = false;
  }

  async ensureAuthenticated() {
    if (!this.isAuthenticated) {
      try {
        await this.retryHandler.executeWithRetry(async () => {
          await this.agent.login(API_CONFIG.CREDENTIALS);
        });
        this.isAuthenticated = true;
      } catch (error) {
        throw this.errorHandler.handle(error);
      }
    }
  }

  async getProfile(handle) {
    await this.ensureAuthenticated();
    
    return this.rateLimiter.enqueue(async () => {
      try {
        return await this.retryHandler.executeWithRetry(async () => {
          return await this.agent.getProfile({ actor: handle });
        });
      } catch (error) {
        throw this.errorHandler.handle(error);
      }
    });
  }

  async getAuthorFeed(handle) {
    await this.ensureAuthenticated();
    
    return this.rateLimiter.enqueue(async () => {
      try {
        return await this.retryHandler.executeWithRetry(async () => {
          return await this.agent.getAuthorFeed({ actor: handle });
        });
      } catch (error) {
        throw this.errorHandler.handle(error);
      }
    });
  }
}

let instance = null;

export const getBlueskyService = () => {
  if (!instance) {
    instance = new BlueskyService();
  }
  return instance;
};