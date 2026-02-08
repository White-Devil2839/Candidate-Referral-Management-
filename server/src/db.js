const mongoose = require('mongoose');

/**
 * Connect to MongoDB database
 * This function establishes connection to MongoDB using the URI from environment variables
 */
const connectDB = async () => {
  try {
    // Connect to MongoDB with the URI from .env file
    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    // Exit the process if database connection fails
    process.exit(1);
  }
};

module.exports = connectDB;
