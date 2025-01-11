const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  transactionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transaction',
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'rejected'],
    default: 'pending',
  },
  amountPaid: {
    type: Number,
    required: true,
  },
  gatewayResponse: {
    type: String,
    default: '',
  },
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
