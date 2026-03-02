import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/koach';

export const connectMongoDB = async (): Promise<void> => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log(`✅ MongoDB connected → ${MONGODB_URI}`);
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error);
        process.exit(1);
    }
};

mongoose.connection.on('disconnected', () => {
    console.warn('⚠️  MongoDB disconnected');
});

export default mongoose;
