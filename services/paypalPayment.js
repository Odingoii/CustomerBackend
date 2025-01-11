const paypal = require('@paypal/checkout-server-sdk');
const PaymentAPIConfig = require('../models/PaymentAPIConfig');

const processPayPalPayment = async (paymentData) => {
  // Fetch PayPal API credentials
  const config = await PaymentAPIConfig.findOne({ provider: 'PayPal', environment: 'production' });
  if (!config) throw new Error('PayPal API configuration not found');

  // Initialize PayPal environment
  const environment = new paypal.core.LiveEnvironment(config.credentials.clientId, config.credentials.clientSecret);
  const client = new paypal.core.PayPalHttpClient(environment);

  // Create the payment order
  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer('return=representation');
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: paymentData.currency || 'USD',
          value: paymentData.amount,
        },
      },
    ],
  });

  try {
    const response = await client.execute(request);
    return response.result; // Contains order details
  } catch (error) {
    throw new Error(`PayPal Payment Error: ${error.message}`);
  }
};
