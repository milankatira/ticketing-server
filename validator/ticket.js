const Joi = require("joi");

const createTicketSchema = Joi.object({
  seatNumber: Joi.number().required(),
  user: Joi.string().required(),
});

const updateTicketStatusSchema = Joi.object({
  status: Joi.string().valid("open", "closed").required(),
  owner: Joi.string(),
});

const validateCreateTicket = (req, res, next) => {
  const { error } = createTicketSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const validateUpdateTicketStatus = (req, res, next) => {
  const { error } = updateTicketStatusSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = {
  validateUpdateTicketStatus
}