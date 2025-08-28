
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const reviewConnection = await mongoose.createConnection(process.env.MONGO_URI_REVIEWS);

reviewConnection.on('connected', () => {
  console.log('✅ Review DB connected');
});

reviewConnection.on('error', (err) => {
  console.error('❌ Review DB connection error:', err.message);
});

export default reviewConnection;
