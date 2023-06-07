const express = require('express');
const router = express.Router();
const ticketController = require('../controller/ticket');
const { validateUpdateTicketStatus } = require('../../validator/ticket');

router.put('/tickets/:ticketId', validateUpdateTicketStatus,ticketController.updateTicketStatus);
router.get('/tickets/:ticketId', ticketController.getTicketStatus);
router.get('/tickets-closed', ticketController.getClosedTickets);
router.get('/tickets-open', ticketController.getOpenTickets);
router.get('/tickets/:ticketId/owner', ticketController.getTicketOwnerDetails);
router.post('/admin/reset', ticketController.resetServer);

module.exports = router;
