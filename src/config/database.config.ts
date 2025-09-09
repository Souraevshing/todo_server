import mongoose from 'mongoose';

const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 3000;

const connectDB = async (): Promise<void> => {
  let retries = 0;

    try {
      mongoose.connection.on('connected', () => console.info('✅ Connected to MongoDB'));
      mongoose.connection.on('reconnected', () => console.info('🔄 Reconnected to MongoDB'));
      mongoose.connection.on('disconnected', () => console.warn('⚠️ Disconnected from MongoDB'));
      mongoose.connection.on('error', (err) => console.error('❌ MongoDB error', err));

    await mongoose.connect(process.env.MONGO_DB_URI!,{
        autoIndex:process.env.NODE_ENV!=='production',
        maxPoolSize: 10,
        minPoolSize: 0,
        serverSelectionTimeoutMS: 2000,
        socketTimeoutMS: 45000,
        compressors:['zlib'],
        dbName: "todos",
        appName: "todoApp",
    });
  } catch (err) {
      retries++;
        console.error(`❌ MongoDB connection failed (attempt ${retries})`, err);

        if (retries < MAX_RETRIES) {
            console.log(`⏳ Retrying in ${RETRY_DELAY_MS / 1000}s...`);
            setTimeout(connectDB, RETRY_DELAY_MS);
        } else {
            console.error("🚨 Max retries reached. Exiting...");
            process.exit(1);
        }

  }
};

export default connectDB;
