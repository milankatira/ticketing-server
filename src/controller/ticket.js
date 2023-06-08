const Ticket = require('../model/ticket');

async function createTicket(req, res) {
  const { status, owner } = req.body;

  try {
    const totalEntries = await Ticket.countDocuments();
    const seatNumber = totalEntries + 1;

    const ticket = await Ticket.create({ status, owner, seatNumber });
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create ticket' });
  }
}

async function updateTicketStatus(req, res) {
  const { ticketId } = req.params;
  const { status, owner } = req.body;

  try {
    const ticket = await Ticket.findOneAndUpdate(
      { _id: ticketId },
      { $set: { status, owner } },
      { new: true }
    );

    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update ticket status' });
  }
}

async function getTicketStatus(req, res) {
  const { ticketId } = req.params;

  try {
    const ticket = await Ticket.findById(ticketId);
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get ticket status' });
  }
}

async function getClosedTickets(req, res) {
  try {
    const closedTickets = await Ticket.find({ status: 'closed' });
    res.json(closedTickets);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get closed tickets' });
  }
}

async function getOpenTickets(req, res) {
  try {
    const openTickets = await Ticket.find({ status: 'open' });
    res.json(openTickets);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get open tickets' });
  }
}

async function getTicketOwnerDetails(req, res) {
  const { ticketId } = req.params;

  try {
    const ticket = await Ticket.findById(ticketId);
    res.json({ owner: ticket.owner });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get ticket owner details' });
  }
}

async function resetServer(req, res) {
  try {
    await Ticket.updateMany({}, { $set: { status: 'open', owner: '' } });
    res.json({ message: 'Server reset successful' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reset server' });
  }
}

module.exports = {
  createTicket,
  updateTicketStatus,
  getTicketStatus,
  getClosedTickets,
  getOpenTickets,
  getTicketOwnerDetails,
  resetServer,
};
