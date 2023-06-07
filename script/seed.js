const dotenv = require("dotenv");

dotenv.config();
const mongoose = require('mongoose');
const Ticket = require('../src/model/ticket');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');

    // Generate initial tickets
    const seats = Array.from({ length: 40 }, (_, index) => ({
      seatNumber: index + 1,
      user: '',
      status: 'open',
    }));

    // Check if initial tickets already exist in the database
    Ticket.countDocuments()
      .then((count) => {
        if (count === 0) {
          // Insert initial tickets into the database
          Ticket.insertMany(seats)
            .then(() => {
              console.log('Initial tickets inserted successfully');
              mongoose.disconnect();
            })
            .catch((error) => {
              console.error('Failed to insert initial tickets:', error);
              mongoose.disconnect();
            });
        } else {
          console.log('Initial tickets already exist');
          mongoose.disconnect();
        }
      })
      .catch((error) => {
        console.error('Failed to check existing tickets:', error);
        mongoose.disconnect();
      });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });
