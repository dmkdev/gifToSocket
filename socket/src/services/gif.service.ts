import { readFile } from 'fs';
import { gifs } from '../data/gifs';
import { Gif } from '../types/Gif';
import { FrameNode } from '../utils/ListNode';
import Websocket from '../websocket/websocket';
import { decodeFrames } from 'modern-gif';
import { FramesList } from '../utils/LinkedList';

class GifService {

  #currentGif: Gif | undefined;
  #frames = new FramesList();
  #frame: FrameNode | null = null;
  #speed = 1;

  public async setCurrentGif(id: number) {
    this.#currentGif = gifs.find(gif => gif.id == id);
    this.clearFrames();
    await this.loadFrames();
    this.getFrames();
  }

  private clearFrames() {
    this.#frames.clear();
  }

  private async loadFrames() {
    if (!this.#currentGif) {
      return;
    }
    
    return new Promise((resolve) => {
      readFile(__dirname + `/../data/${this.#currentGif!.path}`, async (err, buffer) => {
        if (err) throw err;
  
        const frames = await decodeFrames(buffer);
        frames.forEach(frame => {
          this.#frames.append(frame);
        });
        resolve(true);
      });
    });
  }

  public getAllGifs() {
    const io = Websocket.getInstance();
    io.of('/gifs').emit('allgifs', gifs);
  }

  public getFrames() {
    const io = Websocket.getInstance();
    let current = this.#frames.head;
    this.#frame = current;

    if (!current) {
      return;
    }

    let delay = 0;
    while (current?.next) {
      if (current?.val) {
        const val = current.val;
        setTimeout(() => {
          io.of('/gifs').emit('frame', val);
        }, delay);
        current = current.next;
        delay += val.delay * this.#speed;
      }
    }
  }

  public next() {
    const io = Websocket.getInstance();

    if (this.#frame && this.#frame.next) {
      this.#frame = this.#frame.next;
      io.of('/gifs').emit('frame', this.#frame.val);
    }
    
  }
}

export default GifService;