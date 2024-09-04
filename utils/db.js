import mongodb from 'mongodb';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const dbName = process.env.DB_DATABASE || 'file_manager';
    const url = `mongodb://${host}:${port}/${dbName}`;

    this.db = new mongodb.MongoClient(url, { useUnifiedTopology: true });
    this.db.connect()
      .then(() => console.log('Connected to MongoDB'))
      .catch((err) => console.log(`failed to connect to MongoDB: ${err}`));
  }

  isAlive() {
    return this.db && this.db.isConnected();
  }

  async nbUsers() {
    if (!this.isAlive()) {
      throw new Error('DB is not alive');
    }
    return this.db.db().collection('users').countDocuments();
  }

  async nbFiles() {
    if (!this.isAlive()) {
      throw new Error('DB is not alive');
    }
    return this.db.db().collection('files').countDocuments();
  }
}

const dbClient = new DBClient();
export default dbClient;
