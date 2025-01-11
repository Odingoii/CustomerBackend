const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');  // We use mongoose for the DB connection
/**
 * @swagger
 * tags:
 *   name: Supermarket
 *   description: Supermarket data retrieval routes
 */

/**
 * @swagger
 * /supermarketdata:
 *   get:
 *     summary: Retrieve data of all supermarkets
 *     tags: [Supermarket]
 *     responses:
 *       200:
 *         description: List of all supermarkets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "SuperMart"
 *                     description: The name of the supermarket
 *                   location:
 *                     type: object
 *                     properties:
 *                       latitude:
 *                         type: number
 *                         example: 1.2345
 *                         description: Latitude of the supermarket
 *                       longitude:
 *                         type: number
 *                         example: 36.5678
 *                         description: Longitude of the supermarket
 *                       mapLocation:
 *                         type: string
 *                         example: "https://maps.google.com/?q=1.2345,36.5678"
 *                         description: A link to the map location of the supermarket
 *                   operatingHours:
 *                     type: object
 *                     properties:
 *                       open:
 *                         type: string
 *                         example: "08:00 AM"
 *                         description: Opening time of the supermarket
 *                       close:
 *                         type: string
 *                         example: "09:00 PM"
 *                         description: Closing time of the supermarket
 *                       specialHours:
 *                         type: string
 *                         example: "Holiday hours: 10:00 AM - 04:00 PM"
 *                         description: Special operating hours (if any)
 *                   contactDetails:
 *                     type: object
 *                     properties:
 *                       email:
 *                         type: string
 *                         example: "contact@supermart.com"
 *                         description: Contact email of the supermarket
 *                       phone:
 *                         type: string
 *                         example: "+254712345678"
 *                         description: Contact phone number
 *                       address:
 *                         type: string
 *                         example: "123 Super Street, Nairobi"
 *                         description: Address of the supermarket
 *                       website:
 *                         type: string
 *                         example: "https://www.supermart.com"
 *                         description: Supermarket website link
 *       500:
 *         description: Server error
 */
router.get('/supermarketdata', async (req, res) => {
    try {
      const db = mongoose.connection.db;  // Directly access the database connection
      const supermarketCollection = db.collection('supermarkets'); // Name of the collection
      
      const supermarkets = await supermarketCollection.find().toArray();  // Retrieve all documents from 'supermarkets' collection
      if (!supermarkets || supermarkets.length === 0) {
        return res.status(404).json({ message: 'No supermarkets found.' });
      }
  
      res.status(200).json(supermarkets);  // Respond with the data
    } catch (error) {
      console.error('Error fetching supermarket data:', error);
      res.status(500).json({ message: 'Server error, please try again later.' });
    }
  });
  
  module.exports = router;
  