import mongoose from 'mongoose';
import { config } from '../../../config/config';

const MONGO_DB_URL = config.db.noSql.mongodbUrl;

const connectToDatabase = () => mongoose.connect(MONGO_DB_URL);

export default connectToDatabase;