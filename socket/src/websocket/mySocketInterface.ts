import { Socket } from 'socket.io';
import { ExtendedError } from 'socket.io/dist/namespace';

interface MySocketInterface {

  handleConnection(socket: Socket): void;
  middlewareImplementation?(socket: Socket, next: (err?: ExtendedError | undefined) => void): void

}

export default MySocketInterface;