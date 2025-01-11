const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const redisClient= require('../config/redis');
const Inventory = require('../routes/inventoryRoutes');  // Import your Inventory model



/**
 * @swagger
 * tags:
 *   name: Inventory
 *   description: Inventory data retrieval routes
 */

/**
 * @swagger
 * /inventorydata:
 *   get:
 *     summary: Retrieve data of all inventory items
 *     tags: [Inventory]
 *     responses:
 *       200:
 *         description: List of all inventory items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "Product Name"
 *                     description: The name of the product
 *                   barcode:
 *                     type: string
 *                     example: "1234567890123"
 *                     description: Barcode of the product
 *                   category:
 *                     type: string
 *                     example: "Electronics"
 *                     description: Category of the product
 *                   price:
 *                     type: number
 *                     example: 199.99
 *                     description: Price of the product
 *                   stock_quantity:
 *                     type: number
 *                     example: 50
 *                     description: Quantity of the product in stock
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-01-01T00:00:00.000Z"
 *                     description: Date when the inventory item was created
 *                   updated_at:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-01-01T00:00:00.000Z"
 *                     description: Date when the inventory item was last updated
 *       500:
 *         description: Server error
 */
router.get('/inventorydata', async (req, res) => {
  // Check Redis cache for the inventory data
  redisClient.get('inventory', async (err, cachedData) => {
    if (err) {
      console.error('Redis error:', err);
      return res.status(500).json({ message: 'Server error while checking cache.' });
    }

    if (cachedData) {
      // Data found in cache, send the cached data
      console.log('Cache hit');
      return res.status(200).json(JSON.parse(cachedData));
    }

    // Data not found in cache, retrieve from MongoDB
    try {
      const inventoryItems = await Inventory.find().select('-stock_quantity');  // Exclude the stock_quantity field

      if (!inventoryItems || inventoryItems.length === 0) {
        return res.status(404).json({ message: 'No inventory items found.' });
      }

      // Cache the retrieved data in Redis for 1 hour (3600 seconds)
      redisClient.setex('inventory', 3600, JSON.stringify(inventoryItems));  // Cache data for 1 hour

      console.log('Cache miss');
      res.status(200).json(inventoryItems);  // Respond with the data
    } catch (error) {
      console.error('Error fetching inventory data:', error);
      res.status(500).json({ message: 'Server error, please try again later.' });
    }
  });
});

module.exports = router;
