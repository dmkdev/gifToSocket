import { GifFrame } from '../types/GifFrame';

export class ListNode<T> {
  val?: T;
  next: ListNode<T> | null;
  constructor(val?: T, next?: ListNode<T> | null) {
    this.val = val;
    this.next = (next === undefined ? null : next);
  }
}

export class FrameNode extends ListNode<GifFrame> {}