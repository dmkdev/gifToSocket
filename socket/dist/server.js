"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const http_1 = require("http");
require("reflect-metadata");
const websocket_1 = __importDefault(require("./websocket/websocket"));
const routing_controllers_1 = require("routing-controllers");
const gif_socket_1 = __importDefault(require("./websocket/gif.socket"));
const port = process.env.APP_PORT || 3001;
const routingControllerOptions = {
    routePrefix: 'v1',
    controllers: [`${__dirname}/http/*.controller.*`],
    validation: true,
    classTransformer: true,
    cors: true,
    defaultErrorHandler: true
};
const app = (0, routing_controllers_1.createExpressServer)(routingControllerOptions);
const httpServer = (0, http_1.createServer)(app);
const io = websocket_1.default.getInstance(httpServer);
io.initializeHandlers([
    { path: '/gifs', handler: new gif_socket_1.default() }
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
//# sourceMappingURL=server.js.map