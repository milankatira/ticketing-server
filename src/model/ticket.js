const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  seatNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ['open', 'closed'],
    default: 'open',
  },
  owner: {
    type: String,
    default: '',
  },
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
