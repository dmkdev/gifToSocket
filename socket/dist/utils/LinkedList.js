"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FramesList = exports.LinkedList = void 0;
const ListNode_1 = require("./ListNode");
class LinkedList {
    constructor() {
        this.head = null;
        this.len = 0;
    }
    append(frame) {
        const node = new ListNode_1.ListNode(frame);
        let current;
        if (this.head === null) {
            this.head = node;
        }
        else {
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
exports.LinkedList = LinkedList;
class FramesList extends LinkedList {
}
exports.FramesList = FramesList;
//# sourceMappingURL=LinkedList.js.map