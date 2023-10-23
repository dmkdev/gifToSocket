import Websocket from "../websocket/websocket";

class GifService {

    public insertGif(gif: any) {
        //save in your database

        //send the update to the browser
        this.updateSockets(gif);
    }

    private updateSockets(gif: any) {
        const io = Websocket.getInstance();
        io.of('gif').emit('gif_updated', { data: [gif] });
    }
}

export default GifService;