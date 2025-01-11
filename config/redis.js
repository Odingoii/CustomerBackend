const redis = require('redis');
const dotenv = require('dotenv');
dotenv.config();

// Create a Redis client
const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
  password: process.env.REDIS_PASSWORD,
});

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

// Connect to Redis
const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log('Connected to Redis');
  } catch (error) {
    console.error('Redis connection error:', error);
  }
};

// Store transaction data in Redis (as JSON)
const storeTransactionInRedis = async (transactionId, transactionData) => {
  try {
    await redisClient.set(`transaction:${transactionId}`, JSON.stringify(transactionData));
    console.log(`Transaction ${transactionId} stored in Redis`);
  } catch (error) {
    console.error(`Error storing transaction ${transactionId} in Redis:`, error);
  }
};

// Get transaction data from Redis
const getTransactionFromRedis = async (transactionId) => {
  try {
    const transactionData = await redisClient.get(`transaction:${transactionId}`);
    if (!transactionData) {
      console.log(`Transaction ${transactionId} not found in Redis`);
      return null;
    }
    return JSON.parse(transactionData);
  } catch (error) {
    console.error(`Error retrieving transaction ${transactionId} from Redis:`, error);
    return null;
  }
};

// Store payment data in Redis
const storePaymentInRedis = async (paymentId, paymentData) => {
  try {
    await redisClient.set(`payment:${paymentId}`, JSON.stringify(paymentData));
    console.log(`Payment ${paymentId} stored in Redis`);
  } catch (error) {
    console.error(`Error storing payment ${paymentId} in Redis:`, error);
  }
};

// Get payment data from Redis
const getPaymentFromRedis = async (paymentId) => {
  try {
    const paymentData = await redisClient.get(`payment:${paymentId}`);
    if (!paymentData) {
      console.log(`Payment ${paymentId} not found in Redis`);
      return null;
    }
    return JSON.parse(paymentData);
  } catch (error) {
    console.error(`Error retrieving payment ${paymentId} from Redis:`, error);
    return null;
  }
};

// Update payment status in Redis (for fast access during the payment process)
const updatePaymentStatusInRedis = async (paymentId, status, gatewayResponse) => {
  try {
    const paymentData = await getPaymentFromRedis(paymentId);
    if (!paymentData) {
      console.log(`Payment ${paymentId} not found in Redis`);
      return null;
    }
    
    paymentData.paymentStatus = status;
    paymentData.gatewayResponse = gatewayResponse;

    // Update payment data in Redis
    await redisClient.set(`payment:${paymentId}`, JSON.stringify(paymentData));
    console.log(`Payment status for ${paymentId} updated in Redis`);
    
    return paymentData;
  } catch (error) {
    console.error(`Error updating payment status for ${paymentId} in Redis:`, error);
    return null;
  }
};

// Delete transaction or payment data from Redis after completion
const deleteTransactionFromRedis = async (transactionId) => {
  try {
    await redisClient.del(`transaction:${transactionId}`);
    console.log(`Transaction ${transactionId} deleted from Redis`);
  } catch (error) {
    console.error(`Error deleting transaction ${transactionId} from Redis:`, error);
  }
};

const deletePaymentFromRedis = async (paymentId) => {
  try {
    await redisClient.del(`payment:${paymentId}`);
    console.log(`Payment ${paymentId} deleted from Redis`);
  } catch (error) {
    console.error(`Error deleting payment ${paymentId} from Redis:`, error);
  }
};

// Close Redis connection
const closeRedisConnection = async () => {
  try {
    await redisClient.quit();
    console.log('Redis connection closed');
  } catch (error) {
    console.error('Error closing Redis connection:', error);
  }
};

module.exports = {
  redisClient,
  storeTransactionInRedis,
  getTransactionFromRedis,
  storePaymentInRedis,
  getPaymentFromRedis,
  updatePaymentStatusInRedis,
  deleteTransactionFromRedis,
  deletePaymentFromRedis,
  closeRedisConnection,
};
