import Router from 'koa-router';

import TransactionRouter from './lib/transactions/TransactionRouter.js';

const router = Router({
  sensitive: true,
});

router.use('/transactions', TransactionRouter);

router.get('/ping', async (ctx, next) => {
  ctx.body = { status: 'up' };
  await next();
});

export default router.routes();
