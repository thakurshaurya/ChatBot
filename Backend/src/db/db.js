const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    const uri = process.env.MONGODB_URI || process.env.DB_KEY;

    if (!uri) {
        throw new Error('Missing MongoDB connection string');
    }

    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
}

module.exports = connectDB;
