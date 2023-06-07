const mongoose = require('mongoose');

exports.db = async () => {
  try {
    mongoose.set('strictQuery', false);
    console.log('Mongodb connected successfully.', process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI,{ useNewUrlParser: true, useUnifiedTopology: true });
  } catch (error) {
    console.log(process.env.MONGODB_URI);
    console.log('Database connection error: ', error);
  }
};
