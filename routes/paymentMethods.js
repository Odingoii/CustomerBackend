const express = require('express');
const paymentMethodController = require('../controllers/paymentMethodController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: PaymentMethods
 *   description: Manage user payment methods
 */

/**
 * @swagger
 * /payment-methods:
 *   post:
 *     summary: Add a payment method
 *     tags: [PaymentMethods]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [Visa, Mastercard, Stripe, Square, MPesa]
 *               details:
 *                 type: object
 *                 properties:
 *                   cardNumber:
 *                     type: string
 *                   expiryDate:
 *                     type: string
 *                   mpesaNumber:
 *                     type: string
 *                   token:
 *                     type: string
 *     responses:
 *       201:
 *         description: Payment method added successfully
 *       400:
 *         description: Error adding payment method
 */
router.post('/payment-methods', paymentMethodController.addPaymentMethod);

/**
 * @swagger
 * /payment-methods/{userId}:
 *   get:
 *     summary: Retrieve all payment methods for a user
 *     tags: [PaymentMethods]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: List of payment methods
 *       404:
 *         description: No payment methods found
 */
router.get('/payment-methods/:userId', paymentMethodController.getPaymentMethods);

module.exports = router;
