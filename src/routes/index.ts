import { Express, Router } from 'express';
import LoginRouter from './login.router';
import ClientsRouter from './clients.router';
import AccountsRouter from './accounts.router';
import TransactionsRouter from './transactions.router';
import RegisterRouter from './register.router';
import authToken from '../middlewares/authtoken.handler';

function routesApi(app: Express) {
  const router = Router();

  router.use('/login', LoginRouter);
  router.use('/register', RegisterRouter);
  router.use('/clients', authToken, ClientsRouter);
  router.use('/accounts', authToken, AccountsRouter);
  router.use('/transactions', authToken, TransactionsRouter);

  app.use('/api/v1', router);
}

export default routesApi;