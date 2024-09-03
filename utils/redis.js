import redis from 'redis';
import { promisify } from 'util';


class RedisClient {
  constructor() {
    this.client = redis.createClient();

    this.client.on('error', (err) => {
      console.log(`Redis client faild to connect: ${err}`);
    });
    this.getAsync = promisify(this.client.get).bind(this.client);
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
    return await this.getAsync(key);
  };
  set = async (key, value, duration) => {
    return await this.client.setex(key, duration, value);
  };
  del = async (key) => {
    await this.client.del(key);
  };
}


const redisClient = new RedisClient();
export default redisClient;
