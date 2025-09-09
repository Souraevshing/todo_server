import dotenv from 'dotenv';
import mongoose from "mongoose";
import http from 'http';

import connectDB from './config/database.config';
import app from './app';

dotenv.config();

const PORT = process.env.PORT || 5000;
let server: http.Server | null = null;

async function run(): Promise<void> {
  try {
    await connectDB();

    server = app.listen(PORT, () => {
      console.info(`✅ Server listening on port ${PORT}`);
    });

    mongoose.connection.on('disconnected', () => {
          console.error('❌ MongoDB disconnected after startup — shutting down server.');
          shutdown(1);
      });
      mongoose.connection.on('error', (err) => {
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
  } catch (error) {
    console.error(`❌ Connection to server failed`, error);
    process.exit(1);
  }
}

function shutdown(code: number) {
    if (server) {
        server.close(() => {
            mongoose.connection.close(false).finally(() => process.exit(code));
        });
        setTimeout(() => process.exit(code), 10_000).unref();
    } else {
        mongoose.connection.close(false).finally(() => process.exit(code));
        setTimeout(() => process.exit(code), 10_000).unref();
    }
}

run();
