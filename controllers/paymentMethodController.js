const PaymentMethod = require('../models/PaymentMethod');

const addPaymentMethod = async (req, res) => {
  try {
    const { userId, type, details, isDefault } = req.body;

    // Set other payment methods to non-default if this one is default
    if (isDefault) {
      await PaymentMethod.updateMany({ userId }, { $set: { isDefault: false } });
    }

    const paymentMethod = new PaymentMethod({ userId, type, details, isDefault });
    await paymentMethod.save();

    res.status(201).json({ message: 'Payment method added successfully', paymentMethod });
  } catch (error) {
    res.status(400).json({ message: 'Error adding payment method', error: error.message });
  }
};

const getPaymentMethods = async (req, res) => {
  try {
    const { userId } = req.params;
    const paymentMethods = await PaymentMethod.find({ userId });

    if (!paymentMethods.length) {
      return res.status(404).json({ message: 'No payment methods found for this user' });
    }

    res.status(200).json(paymentMethods);
  } catch (error) {
    res.status(400).json({ message: 'Error retrieving payment methods', error: error.message });
  }
};

module.exports = {
  addPaymentMethod,
  getPaymentMethods,
};
