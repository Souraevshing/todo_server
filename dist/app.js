"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const todo_route_1 = __importDefault(require("./routes/todo.route"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: '*' }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)('short'));
app.use('/api/v1/todos', todo_route_1.default);
app.get('/api/v1/health', (_req, res) => {
    res.status(200).json({ message: 'Server is up and healthy', status: 'OK' });
});
// global err handler
app.use((err, req, res, next) => {
    console.error(err);
    const statusCode = err.statusCode || 500;
    res
        .status(statusCode)
        .json({ message: err.message || 'Something went wrong', status: statusCode });
});
exports.default = app;
