const express = require('express');
const transactionController = require('../controllers/transactionController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: User transactions routes
 */

/**
 * @swagger
 * /transactions:
 *   post:
 *     summary: Create a new transaction
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "60d1f63a8d1d2b3f96c8f8e9"
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *                     price:
 *                       type: number
 *     responses:
 *       201:
 *         description: Transaction created successfully
 *       400:
 *         description: Error creating transaction
 */
router.post('/transactions', transactionController.createTransaction);

/**
 * @swagger
 * /transactions/{transactionId}:
 *   get:
 *     summary: Get transaction data from Redis
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: transactionId
 *         required: true
 *         description: The ID of the transaction
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transaction data retrieved successfully
 *       404:
 *         description: Transaction not found
 */
router.get('/transactions/:transactionId', transactionController.getTransactionFromRedis);

module.exports = router;
