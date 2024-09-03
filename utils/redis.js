import redis from 'redis';


class RedisClient {
  constructor() {
    this.client = redis.createClient();

    this.client.on('error', (err) => {
      console.log(`Redis client faild to connect: ${err}`);
    });
  }

  isAlive() {
    return this.client.connected;
  }
  async get(key) {
    return await this.client.get(key);
  }
  async set (key, value, duration) {
    return this.client.setex(key, duration, value);
  }
  async del (key) {
    return this.client.del(key);
  }
}


const redisClient = new RedisClient();
export default redisClient;
