import mongoose from 'mongoose';

// Connect to Mongodb
mongoose.connect(<string>process.env.DATABASE_URL);
