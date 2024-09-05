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
        this.db = this.client.db(dbName);
        this.users = this.db.collection('users');
        this.files = this.db.collection('files');
      })
      .catch((err) => console.error(`DB connection failed: ${err}`));
  }

  isAlive() {
    return this.client.topology.isConnected();
  }

  async nbUsers() {
    return this.users.countDocuments({});
  }

  async nbFiles() {
    return this.files.countDocuments({});
  }
}

const dbClient = new DBClient();
export default dbClient;
