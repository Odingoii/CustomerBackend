const processSquarePayment = require('../services/squarePayment');
const processPayPalPayment = require('../services/paypalPayment');
const processMpesaPayment = require('../services/mpesaPayment');

const processPayment = async (req, res) => {
  const { provider, paymentData } = req.body;

  try {
    let result;
    switch (provider) {
      case 'Square':
        result = await processSquarePayment(paymentData);
        break;
      case 'PayPal':
        result = await processPayPalPayment(paymentData);
        break;
      case 'MPesa':
        result = await processMpesaPayment(paymentData);
        break;
      default:
        throw new Error('Unsupported payment provider');
    }

    res.status(200).json({ message: 'Payment processed successfully', result });
  } catch (error) {
    res.status(400).json({ message: `Payment failed: ${error.message}` });
  }
};

module.exports = { processPayment };
