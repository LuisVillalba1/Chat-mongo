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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.__dir = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const inicio_1 = __importDefault(require("./routers/inicio"));
const morgan_1 = __importDefault(require("morgan"));
const private_1 = __importDefault(require("./routers/private"));
const getDataCookie_1 = require("./utils/getDataCookie");
const app = (0, express_1.default)();
//get the current directory
exports.__dir = path_1.default.dirname(__filename);
//set ejs how our view engine
app.set('view engine', 'ejs');
//set where it is ours .ejs documents
app.set("views", path_1.default.join(exports.__dir, "views"));
//convert all request to json
app.use(express_1.default.json());
app.use((0, morgan_1.default)("tiny"));
app.use("/api/", inicio_1.default);
app.use("/api/", private_1.default);
//set where its our static documents
app.use(express_1.default.static(path_1.default.join(exports.__dir, "public")));
app.use("*", (_req, res) => {
    res.send({
        message: "path not found"
    });
});
//create our server
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    //if the user has not wifi, he can received the msgs later
    connectionStateRecovery: {}
});
io.on("connection", (socket) => __awaiter(void 0, void 0, void 0, function* () {
    socket.on("message", (msg) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            //get userName with socket
            const userName = yield (0, getDataCookie_1.getUserCokkie)(socket);
            io.emit("chat message", {
                message: msg,
                user: userName
            });
        }
        catch (error) {
            //if the the token if not valid return a msg error
            socket.emit("chat message", {
                message: "Current userName not found, please sign-in again"
            });
        }
    }));
}));
exports.default = server;
