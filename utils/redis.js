import redis from 'redis';


class RedisClient {
  constructor() {
    this.client = redis.createClient()
    this.client.on('error', (err) => {
      console.log(`Redis client faild to connect: ${err}`);
    });
  }

  isAlive = () => this.client.connected;
  get = async (key) => await this.client.get(key);
  set = async (key, value, duration) => {
    await this.client.setex(key, duration, value);
  };
  del = async (key) => await this.client.del(key);
}


export default new RedisClient();
