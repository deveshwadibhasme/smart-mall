import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


export function connectDB() {
    mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/smart-mall', {
    }).then(() => console.log('MongoDB connected successfully'))
        .catch((err) => console.log('MongoDB connection error:', err));
}