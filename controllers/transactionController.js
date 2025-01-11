const transactionService = require('../services/transactionService');
const { getRedisClient } = require('../config/redis'); 

// Create a new transaction
const createTransaction = async (req, res) => {
  try {
    const { userId, products } = req.body;
    const transaction = await transactionService.createTransaction(userId, products);
    res.status(201).json({ message: 'Transaction created', transaction });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get transaction from Redis
const getTransactionFromRedis = async (req, res) => {
  const { transactionId } = req.params;

  const redisClient = getRedisClient();
  const transactionData = await redisClient.get(`transaction:${transactionId}`);

  if (!transactionData) {
    return res.status(404).json({ message: 'Transaction not found in Redis' });
  }

  res.status(200).json(JSON.parse(transactionData));
};

module.exports = {
  createTransaction,
  getTransactionFromRedis,
};
