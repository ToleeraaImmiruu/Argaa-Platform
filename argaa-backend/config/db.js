const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Mongoose 6 requires these options to be gone, it's cleaner now.
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;