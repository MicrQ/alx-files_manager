import redis from 'redis';
import { promisify } from 'util';


class RedisClient {
  constructor() {
    this.client = redis.createClient();

    this.client.on('error', (err) => {
      console.log(`Redis client faild to connect: ${err}`);
    });
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.setAsync = promisify(this.client.setex).bind(this.client);
    this.delAsync = promisify(this.client.del).bind(this.client);
  }

  isAlive = () => {
    try {
      this.client.ping();
      return true;
    } catch (err) {
      return false;
    }
  }
  get = async (key) => {
    try {
        return await this.getAsync(key);
    } catch (err) {
        return null;
    }
  };
  set = async (key, value, duration) => {
    try {
      return await this.setAsync(key, duration, value);
    } catch (err) {
      return null;
    }
  };
  del = async (key) => {
    try {
      return await this.delAsync(key);
    } catch (err) {
      return null;
    }
  };
}


const redisClient = new RedisClient();
export default redisClient;
