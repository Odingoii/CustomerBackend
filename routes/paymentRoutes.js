const express = require('express');
const paymentController = require('../controllers/paymentController');
const processPayment = require('../controllers/generalPaymentController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Manage user payments
 */

/**
 * @swagger
 * /payments:
 *   post:
 *     summary: Create a new payment
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               transactionId:
 *                 type: string
 *                 description: ID of the associated transaction
 *                 example: "60d1f63a8d1d2b3f96c8f8e9"
 *               paymentMethod:
 *                 type: string
 *                 description: Payment method to use (e.g., credit_card, PayPal, MPesa)
 *                 example: "credit_card"
 *               amountPaid:
 *                 type: number
 *                 description: Amount paid by the user
 *                 example: 100.50
 *     responses:
 *       201:
 *         description: Payment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Payment created successfully"
 *                 paymentId:
 *                   type: string
 *                   example: "5f6c6e1e8c4d4b2f74e8d1d2"
 *       400:
 *         description: Error creating payment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid payment data"
 */
router.post('/payments', paymentController.createPayment);

/**
 * @swagger
 * /payments/{paymentId}:
 *   put:
 *     summary: Update payment status
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: paymentId
 *         required: true
 *         description: The ID of the payment
 *         schema:
 *           type: string
 *           example: "5f6c6e1e8c4d4b2f74e8d1d2"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: New payment status
 *                 enum: [pending, completed, rejected]
 *                 example: "completed"
 *               gatewayResponse:
 *                 type: string
 *                 description: Response from the payment gateway
 *                 example: "Transaction approved"
 *     responses:
 *       200:
 *         description: Payment status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Payment status updated successfully"
 *       400:
 *         description: Error updating payment status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Payment ID not found"
 */
router.put('/payments/:paymentId', paymentController.updatePaymentStatus);

/**
 * @swagger
 * /payment:
 *   post:
 *     summary: Process payment using the specified provider
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               provider:
 *                 type: string
 *                 enum: [Square, PayPal, MPesa]
 *                 description: The payment provider to use
 *                 example: "Square"
 *               paymentData:
 *                 type: object
 *                 description: Data required by the selected payment provider
 *                 example: 
 *                   amount: 100
 *                   currency: "USD"
 *                   cardDetails:
 *                     cardNumber: "4111111111111111"
 *                     expirationDate: "12/24"
 *                     cvv: "123"
 *     responses:
 *       200:
 *         description: Payment processed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Payment processed successfully"
 *                 transactionId:
 *                   type: string
 *                   example: "abc123"
 *       400:
 *         description: Payment processing failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid payment data or provider error"
 */
router.post('/payment', processPayment.processPayment);

module.exports = router;
