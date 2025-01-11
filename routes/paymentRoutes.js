const express = require('express');
const paymentController = require('../controllers/paymentController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: User payment routes
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
 *               paymentMethod:
 *                 type: string
 *                 example: "credit_card"
 *               amountPaid:
 *                 type: number
 *                 example: 100
 *     responses:
 *       201:
 *         description: Payment created successfully
 *       400:
 *         description: Error creating payment
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: "completed"
 *               gatewayResponse:
 *                 type: string
 *                 example: "Transaction approved"
 *     responses:
 *       200:
 *         description: Payment status updated successfully
 *       400:
 *         description: Error updating payment status
 */
router.put('/payments/:paymentId', paymentController.updatePaymentStatus);

module.exports = router;
