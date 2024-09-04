import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';

const mapper = (app) => {
  app.get('/stats', AppController.getStats);
  app.get('/status', AppController.getStatus);
  app.post('/users', UsersController.postNew);
};

export default mapper;
