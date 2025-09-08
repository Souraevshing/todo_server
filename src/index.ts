import dotenv from "dotenv"

import connectDB from "./config/database.config";
import app from "./app";

dotenv.config();

const PORT = process.env.PORT || 5000;

async function run(): Promise<void> {
    try {
        await connectDB();
        app.listen(PORT,() => {
            console.info(`✅ Server listening on port ${PORT}`);
        })
    } catch (error) {
        console.error(`❌ Connection to server failed`,error);
        process.exit(1);
    }
}

run();
