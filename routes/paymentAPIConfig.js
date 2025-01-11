const express = require('express');
const paymentAPIConfigController = require('../controllers/paymentAPIConfigController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: PaymentAPIConfig
 *   description: Manage payment gateway API configurations
 */

/**
 * @swagger
 * /payment-api-config:
 *   post:
 *     summary: Add a new payment gateway configuration
 *     tags: [PaymentAPIConfig]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               provider:
 *                 type: string
 *                 enum: [Stripe, Square, PayPal, MPesa]
 *               credentials:
 *                 type: object
 *                 properties:
 *                   apiKey:
 *                     type: string
 *                   apiSecret:
 *                     type: string
 *                   clientId:
 *                     type: string
 *                   clientSecret:
 *                     type: string
 *                   publicKey:
 *                     type: string
 *                   privateKey:
 *                     type: string
 *                   webhookSecret:
 *                     type: string
 *               environment:
 *                 type: string
 *                 enum: [sandbox, production]
 *     responses:
 *       201:
 *         description: Payment API configuration saved successfully
 *       400:
 *         description: Error saving configuration
 */
router.post('/payment-api-config', paymentAPIConfigController.addConfig);

/**
 * @swagger
 * /payment-api-config/{provider}:
 *   get:
 *     summary: Retrieve API configuration for a specific provider
 *     tags: [PaymentAPIConfig]
 *     parameters:
 *       - in: path
 *         name: provider
 *         required: true
 *         schema:
 *           type: string
 *           enum: [Stripe, Square, PayPal, MPesa]
 *     responses:
 *       200:
 *         description: Configuration retrieved successfully
 *       404:
 *         description: Configuration not found
 */
router.get('/payment-api-config/:provider', paymentAPIConfigController.getConfig);

module.exports = router;
