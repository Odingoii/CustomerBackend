const Transaction = require('../models/Transaction');
const Payment = require('../models/Payment');
const redis = require('redis');
const { getRedisClient } = require('../config/redis');  // Assuming a helper to get Redis client

// Create a new transaction and save to DB and Redis
const createTransaction = async (userId, products) => {
  const totalAmount = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);

  const transaction = new Transaction({
    userId,
    products,
    totalAmount,
  });

  await transaction.save();

  // Store the transaction data in Redis (for quick access during payment)
  const redisClient = getRedisClient();
  redisClient.set(`transaction:${transaction._id}`, JSON.stringify(transaction));

  return transaction;
};

// Create a new payment
const createPayment = async (transactionId, paymentMethod, amountPaid) => {
  const payment = new Payment({
    transactionId,
    paymentMethod,
    amountPaid,
    paymentStatus: 'pending',
  });

  await payment.save();

  return payment;
};

// Update payment status (completed/rejected)
const updatePaymentStatus = async (paymentId, status, gatewayResponse) => {
  const payment = await Payment.findById(paymentId);
  if (!payment) throw new Error('Payment not found');
  
  payment.paymentStatus = status;
  payment.gatewayResponse = gatewayResponse;
  
  await payment.save();

  // Update the transaction's payment status
  const transaction = await Transaction.findById(payment.transactionId);
  transaction.paymentStatus = status;
  await transaction.save();

  return payment;
};

module.exports = {
  createTransaction,
  createPayment,
  updatePaymentStatus,
};
