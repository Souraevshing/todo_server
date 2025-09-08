import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI!);
    console.info(`✅ Connected to MongoDB`);
  } catch (err) {
    console.error(`❌ Connection to MongoDB failed`, err);
  }
};

export default connectDB;
