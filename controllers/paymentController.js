const paymentService = require('../services/transactionService');

// Create a new payment
const createPayment = async (req, res) => {
  try {
    const { transactionId, paymentMethod, amountPaid } = req.body;
    const payment = await paymentService.createPayment(transactionId, paymentMethod, amountPaid);
    res.status(201).json({ message: 'Payment created', payment });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update payment status
const updatePaymentStatus = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const { status, gatewayResponse } = req.body;
    const payment = await paymentService.updatePaymentStatus(paymentId, status, gatewayResponse);
    res.status(200).json({ message: 'Payment status updated', payment });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createPayment,
  updatePaymentStatus,
};
