"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrameNode = exports.ListNode = void 0;
class ListNode {
    constructor(val, next) {
        this.val = val;
        this.next = (next === undefined ? null : next);
    }
}
exports.ListNode = ListNode;
class FrameNode extends ListNode {
}
exports.FrameNode = FrameNode;
//# sourceMappingURL=ListNode.js.map