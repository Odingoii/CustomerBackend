const mongoose = require('mongoose');

const paymentMethodSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['Visa', 'Mastercard', 'Stripe', 'Square', 'MPesa'],
    required: true,
  },
  details: {
    cardNumber: { type: String, required: false }, // Masked or tokenized card number for card types
    mpesaNumber: { type: String, required: false }, // For MPesa
    expiryDate: { type: String, required: false }, // For card payments
    token: { type: String, required: true }, // Token from payment processor
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

module.exports = mongoose.model('PaymentMethod', paymentMethodSchema);
