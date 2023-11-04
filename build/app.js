"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.__dir = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const inicio_1 = __importDefault(require("./routers/inicio"));
const morgan_1 = __importDefault(require("morgan"));
const private_1 = __importDefault(require("./routers/private"));
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
//create our server
const server = http_1.default.createServer(app);
exports.io = new socket_io_1.Server(server);
exports.default = server;
