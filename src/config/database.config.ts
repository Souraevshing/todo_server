import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
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
    console.error(`❌ Connection to MongoDB failed`, err);
    process.exit(1);
  }
};

export default connectDB;
