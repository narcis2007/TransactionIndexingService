import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import routes from './routes.js';
import config from '../config/index.js';
import models from './models.js';

const app = new Koa();
app.proxy = true;
app.context.ROOT = process.cwd();
app.context.config = config;
app.context.models = models;

app.use(cors());
app.use(bodyParser({
  enableTypes: ['json', 'form'],
}));
app.use(routes);

app.on('error', (err, ctx) => {
  console.error(err, {
    request: ctx.request,
    response: ctx.response,
    ...(ctx.request.body ? { body: ctx.request.body } : {}),
  });
});

app.on('clientError', (err, socket) => { // https://github.com/nodejs/node/issues/7732#issuecomment-232990702
  console.log('server clientError', err);
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

app.listen(app.context.config.app.port, () => {
  console.log(`App running on port: ${app.context.config.app.port}`);
});

export default app;
