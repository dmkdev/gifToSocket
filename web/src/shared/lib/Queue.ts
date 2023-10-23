export default class Queue<T> {
  private queue: T[] = [];

  enqueue(item: T) {
    this.queue.push(item);
  }

  dequeue() {
    return this.queue.shift();
  }

  isEmpty() {
    return this.queue.length === 0;
  }

  clear() {
    this.queue = [];
  }

  peek() {
    return this.queue[0];
  }

  size() {
    return this.queue.length;
  }

  toString() {
    return this.queue.toString();
  }

  toArray() {
    return this.queue;
  }

  forEach(callback: (item: T) => void) {
    this.queue.forEach(callback);
  }

  map<U>(callback: (item: T) => U) {
    return this.queue.map(callback);
  }

  filter(callback: (item: T) => boolean) {
    return this.queue.filter(callback);
  }

  every(callback: (item: T) => boolean) {
    return this.queue.every(callback);
  }

  some(callback: (item: T) => boolean) {
    return this.queue.some(callback);
  }

}