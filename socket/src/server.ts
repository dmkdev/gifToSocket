import 'dotenv/config';
import { createServer } from 'http';
import 'reflect-metadata';
import Websocket from './websocket/websocket';

import {
  createExpressServer,
  RoutingControllersOptions
} from 'routing-controllers';
import GifSocket from './websocket/gif.socket';

const port = process.env.APP_PORT || 3001;

const routingControllerOptions: RoutingControllersOptions = {
  routePrefix: 'v1',
  controllers: [`${__dirname}/http/*.controller.*`],
  validation: true,
  classTransformer: true,
  cors: true,
  defaultErrorHandler: true
};

const app = createExpressServer(routingControllerOptions);
const httpServer = createServer(app);
const io = Websocket.getInstance(httpServer);

io.initializeHandlers([
  { path: '/gifs', handler: new GifSocket() }
]);

io.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.emit('test', ['123']);
  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
  });
});

httpServer.listen(port, () => {
  console.log(`This is working in port ${port}`);
});