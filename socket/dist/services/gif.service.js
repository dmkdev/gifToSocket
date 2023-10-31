"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _GifService_currentGif, _GifService_frames, _GifService_frame, _GifService_speed;
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const gifs_1 = require("../data/gifs");
const websocket_1 = __importDefault(require("../websocket/websocket"));
const modern_gif_1 = require("modern-gif");
const LinkedList_1 = require("../utils/LinkedList");
class GifService {
    constructor() {
        _GifService_currentGif.set(this, void 0);
        _GifService_frames.set(this, new LinkedList_1.FramesList());
        _GifService_frame.set(this, null);
        _GifService_speed.set(this, 1);
    }
    setCurrentGif(id) {
        return __awaiter(this, void 0, void 0, function* () {
            __classPrivateFieldSet(this, _GifService_currentGif, gifs_1.gifs.find(gif => gif.id == id), "f");
            this.clearFrames();
            yield this.loadFrames();
            this.getFrames();
        });
    }
    clearFrames() {
        __classPrivateFieldGet(this, _GifService_frames, "f").clear();
    }
    loadFrames() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!__classPrivateFieldGet(this, _GifService_currentGif, "f")) {
                return;
            }
            return new Promise((resolve) => {
                (0, fs_1.readFile)(__dirname + `/../data/${__classPrivateFieldGet(this, _GifService_currentGif, "f").path}`, (err, buffer) => __awaiter(this, void 0, void 0, function* () {
                    if (err)
                        throw err;
                    const frames = yield (0, modern_gif_1.decodeFrames)(buffer);
                    frames.forEach(frame => {
                        __classPrivateFieldGet(this, _GifService_frames, "f").append(frame);
                    });
                    resolve(true);
                }));
            });
        });
    }
    getAllGifs() {
        const io = websocket_1.default.getInstance();
        io.of('/gifs').emit('allgifs', gifs_1.gifs);
    }
    getFrames() {
        const io = websocket_1.default.getInstance();
        let current = __classPrivateFieldGet(this, _GifService_frames, "f").head;
        __classPrivateFieldSet(this, _GifService_frame, current, "f");
        if (!current) {
            return;
        }
        let delay = 0;
        while (current === null || current === void 0 ? void 0 : current.next) {
            if (current === null || current === void 0 ? void 0 : current.val) {
                const val = current.val;
                setTimeout(() => {
                    io.of('/gifs').emit('frame', val);
                }, delay);
                current = current.next;
                delay += val.delay * __classPrivateFieldGet(this, _GifService_speed, "f");
            }
        }
    }
    next() {
        const io = websocket_1.default.getInstance();
        if (__classPrivateFieldGet(this, _GifService_frame, "f") && __classPrivateFieldGet(this, _GifService_frame, "f").next) {
            __classPrivateFieldSet(this, _GifService_frame, __classPrivateFieldGet(this, _GifService_frame, "f").next, "f");
            io.of('/gifs').emit('frame', __classPrivateFieldGet(this, _GifService_frame, "f").val);
        }
    }
}
_GifService_currentGif = new WeakMap(), _GifService_frames = new WeakMap(), _GifService_frame = new WeakMap(), _GifService_speed = new WeakMap();
exports.default = GifService;
//# sourceMappingURL=gif.service.js.map