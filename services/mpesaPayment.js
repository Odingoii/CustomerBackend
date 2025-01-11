const axios = require('axios');
const PaymentAPIConfig = require('../models/PaymentAPIConfig');

const processMpesaPayment = async (paymentData) => {
  // Fetch MPesa API credentials
  const config = await PaymentAPIConfig.findOne({ provider: 'MPesa', environment: 'production' });
  if (!config) throw new Error('MPesa API configuration not found');

  const { publicKey, privateKey, shortCode, passkey, environment } = config.credentials;

  // Generate MPesa token
  const tokenResponse = await axios.get(`${environment === 'production' ? 'https://api.safaricom.co.ke' : 'https://sandbox.safaricom.co.ke'}/oauth/v1/generate?grant_type=client_credentials`, {
    auth: {
      username: publicKey,
      password: privateKey,
    },
  });

  const token = tokenResponse.data.access_token;

  // Create payment request
  const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14); // Format: YYYYMMDDHHmmss
  const password = Buffer.from(`${shortCode}${passkey}${timestamp}`).toString('base64');

  try {
    const paymentResponse = await axios.post(
      `${environment === 'production' ? 'https://api.safaricom.co.ke' : 'https://sandbox.safaricom.co.ke'}/mpesa/stkpush/v1/processrequest`,
      {
        BusinessShortCode: shortCode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: paymentData.amount,
        PartyA: paymentData.phoneNumber, // Customer's phone number
        PartyB: shortCode,
        PhoneNumber: paymentData.phoneNumber,
        CallBackURL: paymentData.callbackUrl, // Webhook URL for payment status
        AccountReference: paymentData.accountReference,
        TransactionDesc: paymentData.transactionDescription,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return paymentResponse.data; // Response from MPesa
  } catch (error) {
    throw new Error(`MPesa Payment Error: ${error.response.data.errorMessage || error.message}`);
  }
};
