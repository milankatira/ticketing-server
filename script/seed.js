const dotenv = require("dotenv");
dotenv.config();
const mongoose = require('mongoose');
const { db } = require("../src/config/db");
const Ticket = require('../src/model/ticket');
async function generateInitialTickets() {
  const seats = Array.from({ length: 40 }, (_, index) => ({
    seatNumber: index + 1,
    user: '',
    status: 'open',
  }));
  await db()
  await Ticket.countDocuments()
    .then((count) => {
      if (count === 0) {
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
}


generateInitialTickets()