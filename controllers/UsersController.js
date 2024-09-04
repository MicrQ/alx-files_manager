import sha1 from 'sha1';
import dbClient from '../utils/db';

class UsersController {
  static async postNew(req, res) {
    const email = req.body ? req.body.email : null;
    const password = req.body ? req.body.password : null;

    if (!email) return res.status(400).json({ error: 'Missing email' });
    if (!password) return res.status(400).json({ error: 'Missing password' });

    const userExists = await dbClient.users.findOne({ email });
    if (userExists) return res.status(400).json({ error: 'Already exists' });

    const result = await dbClient.users.insertOne({ email, password: sha1(password) });

    return res.status(201).json({
      id: result.insertedId.toString(),
      email,
    });
  }
}

export default UsersController;
