import Router from 'koa-router';
import TransactionController from './TransactionController.js';
import config from '../../../config/index.js';
import { middleware as validate } from '../validator/index.js';
import models from '../../models.js';
import transactionValidation from './transactionValidation.js';

const transactionController = new TransactionController(models);

const router = Router({
  sensitive: true,
});

router.get(
  '/getTransactions',
  validate({
    query: transactionValidation.getTransactions,
  }),
  async (ctx, next) => {
    ctx.body = await transactionController.getTransactions({ ...ctx.request.validQuery });
    await next();
  },
);

router.post(
  '/requestIndexingForAddress',
  validate({
    body: transactionValidation.requestIndexingForAddress,
  }),
  async (ctx, next) => {
    ctx.body = await transactionController.requestIndexingForAddress({ ...ctx.request.body });
    await next();
  },
);

export default router.routes();
