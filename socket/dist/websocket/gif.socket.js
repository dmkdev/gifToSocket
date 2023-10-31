"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gif_service_1 = __importDefault(require("../services/gif.service"));
const service = new gif_service_1.default();
class GifSocket {
    handleConnection(socket) {
        console.log(`⚡: ${socket.id} user just connected to /gifs!`);
        service.getAllGifs();
        socket.on('next', () => {
            service.next();
        });
        socket.on('gif', (id) => {
            service.setCurrentGif(id);
        });
        socket.on('disconnect', () => {
            console.log('🔥: A user disconnected');
        });
    }
}
exports.default = GifSocket;
//# sourceMappingURL=gif.socket.js.map