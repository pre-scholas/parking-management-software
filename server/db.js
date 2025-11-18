import mongoose from 'mongoose';
import 'dotenv/config';


const MONGODB_URI = process.env.ATLAS_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Successfully connected to MongoDB.');
    } catch (err) {
        console.error('Connection error', err);
        // Exit process with failure if connection fails
        process.exit(1);
    }
};

export default connectDB;