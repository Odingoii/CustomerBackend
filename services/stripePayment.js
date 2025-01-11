const stripe = require('stripe');
const PaymentAPIConfig = require('../models/PaymentAPIConfig');

const processPayment = async (provider, paymentData) => {
  const config = await PaymentAPIConfig.findOne({ provider, environment: 'production' });
  if (!config) throw new Error(`API configuration for ${provider} not found`);

  if (provider === 'Stripe') {
    const stripeClient = stripe(config.credentials.apiKey);
    const paymentIntent = await stripeClient.paymentIntents.create({
      amount: paymentData.amount,
      currency: 'usd',
      payment_method: paymentData.paymentMethodId,
      confirm: true,
    });
    return paymentIntent;
  }

  // Handle other providers (e.g., Square, PayPal, MPesa) similarly
};
