import { GifFrame } from '../types/GifFrame';
import { ListNode } from './ListNode';

export class LinkedList<T> {
  head: ListNode<T> | null = null;
  len = 0;
  append(frame: T) {
    const node = new ListNode(frame);
    let current;
    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.len++;
  }
  clear() {
    this.head = null;
    this.len = 0;
  }
}


export class FramesList extends LinkedList<GifFrame> {}