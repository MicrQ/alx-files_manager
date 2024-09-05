import redis from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.con = false;

    this.client.on('error', (err) => {
      console.log(`Redis client faild to connect: ${err}`);
    });
    this.client.on('connect', () => {
      this.con = true;
    });
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.setAsync = promisify(this.client.setex).bind(this.client);
    this.delAsync = promisify(this.client.del).bind(this.client);
  }

  isAlive() {
    return this.con;
  }

  async get(key) {
    try {
      return await this.getAsync(key);
    } catch (err) {
      return null;
    }
  }

  async set(key, value, duration) {
    try {
      await this.setAsync(key, duration, value);
    } catch (err) {
      console.log(err);
    }
  }

  async del(key) {
    try {
      await this.delAsync(key);
    } catch (err) {
      console.log(err);
    }
  }
}

const redisClient = new RedisClient();
export default redisClient;
