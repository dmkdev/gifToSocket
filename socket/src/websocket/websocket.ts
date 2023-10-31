
import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import MySocketInterface from './mySocketInterface';

const WEBSOCKET_CORS = {
  origin: '*',
  methods: ['GET', 'POST']
};


class Websocket extends Server {

  private static io: Websocket;

  constructor(httpServer: HttpServer) {
    super(httpServer, {
      cors: WEBSOCKET_CORS,
      addTrailingSlash: false,
      maxHttpBufferSize: 1e7 // 10 MB
    });
  }

  public static getInstance(httpServer?: HttpServer): Websocket {

    if (!Websocket.io) {
      Websocket.io = new Websocket(httpServer!);
    }

    return Websocket.io;

  }

  public initializeHandlers(socketHandlers: Array<{ path: string, handler: MySocketInterface }>) {
    socketHandlers.forEach(element => {
      const namespace = Websocket.io.of(element.path, (socket: Socket) => {
        element.handler.handleConnection(socket);
      });

      if (element.handler.middlewareImplementation) {
        namespace.use(element.handler.middlewareImplementation);
      }
    });
  }
}

export default Websocket;