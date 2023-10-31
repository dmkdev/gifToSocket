import { Socket } from 'socket.io';
import MySocketInterface from './mySocketInterface';
import GifService from '../services/gif.service';

const service = new GifService();

class GifSocket implements MySocketInterface {

  handleConnection(socket: Socket) {

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

export default GifSocket;