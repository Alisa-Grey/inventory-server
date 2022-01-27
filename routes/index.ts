import { Express } from 'express';
import itemRouter from './itemRouter';
import userRouter from './userRouter';
import roomRouter from './roomRouter';
import setupRouter from './setupRouter';
import categoryRouter from './categoryRouter';

function routes(app: Express) {
  app.use('/items', itemRouter);
  app.use('/users', userRouter);
  app.use('/rooms', roomRouter);
  app.use('/setups', setupRouter);
  app.use('/categories', categoryRouter)
}

export default routes;