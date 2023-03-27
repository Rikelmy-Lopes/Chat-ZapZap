import 'dotenv/config';
import mongoose from 'mongoose';

const MONGO_DB_URL = String(process.env.MONGO_DB_URL);

const connectToDatabase = () => mongoose.connect(MONGO_DB_URL);

export default connectToDatabase;