import AppController from '../controllers/AppController';
import AuthController from '../controllers/AuthController';
import UsersController from '../controllers/UsersController';

const mapper = (app) => {
  app.get('/stats', AppController.getStats);
  app.get('/status', AppController.getStatus);
  app.get('/connect', AuthController.getConnect);
  app.get('/disconnect', AuthController.getDisconnect);
  app.get('/users/me', UsersController.getMe);

  app.post('/users', UsersController.postNew);
};

export default mapper;
