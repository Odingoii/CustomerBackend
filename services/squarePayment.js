const { Client, Environment } = require('square');
const PaymentAPIConfig = require('../models/PaymentAPIConfig');

const processSquarePayment = async (paymentData) => {
  // Fetch Square API credentials
  const config = await PaymentAPIConfig.findOne({ provider: 'Square', environment: 'production' });
  if (!config) throw new Error('Square API configuration not found');

  // Initialize Square Client
  const squareClient = new Client({
    accessToken: config.credentials.apiKey,
    environment: Environment.Production, // Or Environment.Sandbox if testing
  });

  const paymentsApi = squareClient.paymentsApi;

  // Process payment
  try {
    const response = await paymentsApi.createPayment({
      sourceId: paymentData.sourceId, // Token generated from Square frontend
      idempotencyKey: paymentData.idempotencyKey, // Unique identifier to prevent double charges
      amountMoney: {
        amount: paymentData.amount, // Amount in the smallest currency unit (e.g., cents for USD)
        currency: paymentData.currency || 'USD',
      },
    });

    return response.result;
  } catch (error) {
    throw new Error(`Square Payment Error: ${error.message}`);
  }
};
