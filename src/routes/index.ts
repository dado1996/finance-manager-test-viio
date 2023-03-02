import express, { Express, Router } from 'express';
import ClientsRouter from './clients.router';
import AccountsRouter from './accounts.router';
import TransactionsRouter from './transactions.router';

function routesApi(app: Express) {
  const router = Router();

  router.use('/clients', ClientsRouter);
  router.use('/accounts', AccountsRouter);
  router.use('/transactions', TransactionsRouter);

}