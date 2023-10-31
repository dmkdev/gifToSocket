"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Queue {
    constructor() {
        this.queue = [];
    }
    enqueue(item) {
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
    forEach(callback) {
        this.queue.forEach(callback);
    }
    map(callback) {
        return this.queue.map(callback);
    }
    filter(callback) {
        return this.queue.filter(callback);
    }
    every(callback) {
        return this.queue.every(callback);
    }
    some(callback) {
        return this.queue.some(callback);
    }
}
exports.default = Queue;
//# sourceMappingURL=Queue.js.map