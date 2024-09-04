import AppController from '../controllers/AppController';

const mapper = (app) => {
  app.get('/stats', AppController.getStats);
  app.get('/status', AppController.getStatus);
};

export default mapper;
