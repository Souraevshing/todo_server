"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const database_config_1 = __importDefault(require("./config/database.config"));
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
let server = null;
async function run() {
    try {
        await (0, database_config_1.default)();
        server = app_1.default.listen(PORT, () => {
            console.info(`✅ Server listening on port ${PORT}`);
        });
        mongoose_1.default.connection.on('disconnected', () => {
            console.error('❌ MongoDB disconnected after startup — shutting down server.');
            shutdown(1);
        });
        mongoose_1.default.connection.on('error', (err) => {
            console.error('❌ MongoDB connection error after startup — shutting down server.', err);
            shutdown(1);
        });
        process.on('SIGINT', () => shutdown(0));
        process.on('SIGTERM', () => shutdown(0));
        process.on('unhandledRejection', (reason) => {
            console.error('❌ Unhandled rejection:', reason);
            shutdown(1);
        });
        process.on('uncaughtException', (err) => {
            console.error('❌ Uncaught exception:', err);
            shutdown(1);
        });
    }
    catch (error) {
        console.error(`❌ Connection to server failed`, error);
        process.exit(1);
    }
}
function shutdown(code) {
    if (server) {
        server.close(() => {
            mongoose_1.default.connection.close(false).finally(() => process.exit(code));
        });
        setTimeout(() => process.exit(code), 10000).unref();
    }
    else {
        mongoose_1.default.connection.close(false).finally(() => process.exit(code));
        setTimeout(() => process.exit(code), 10000).unref();
    }
}
run();
