import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const dbName = process.env.DB_DATABASE || 'file_manager';
    const url = `mongodb://${host}:${port}`;

    this.client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    this.client.connect()
      .then(() => {
        console.log(`DB connected to ${url}/${dbName}`);
        this.db = this.client.db();
      })
      .catch((err) => console.error(`DB connection failed: ${err}`));
  }

  isAlive() {
    return this.client.topology.isConnected();
  }

  async nbUsers() {
    return this.db.collection('users').countDocuments({});
  }

  async nbFiles() {
    return this.db.collection('files').countDocuments({});
  }
}

const dbClient = new DBClient();
export default dbClient;
