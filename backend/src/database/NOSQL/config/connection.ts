import mongoose from 'mongoose';
import 'dotenv/config';

const MONGO_DB_URL = process.env.MONGO_DB_URL || '';

const connectToDatabase = () => mongoose.connect(MONGO_DB_URL);

export default connectToDatabase;