const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
const dotenv = require('dotenv');
const { swaggerUi, swaggerDocs } = require('./config/swagger'); // Correctly imported
const authRoutes = require('./routes/auth');
const { verifyToken } = require('./middleware/auth');
const bodyParser = require('body-parser');
const supermarketRoutes = require('./routes/supermarketRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes'); // Fixed typo
const transactionRoutes = require('./routes/transactionRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

dotenv.config();

// Initialize the express app
const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());

// Initialize Redis Client
const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
  password: process.env.REDIS_PASSWORD,
});

redisClient.on('error', (err) => console.error('Redis error:', err));
redisClient.connect().then(() => {
  console.log('Redis connected');
});

// Expose Redis client to middleware
app.use((req, res, next) => {
  req.redisClient = redisClient;
  next();
});

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes (protected and unprotected)
app.use('/api/auth', authRoutes); // Authentication routes

// Example of protecting additional routes
app.use('/api/protected', verifyToken, (req, res) => {
  res.json({ message: 'Access granted. This is another protected route.', user: req.user });
});
app.use('/api', supermarketRoutes);  // Supermarket routes
app.use('/api', inventoryRoutes);    // Inventory routes
app.use('/api', transactionRoutes);  // Transaction routes
app.use('/api', paymentRoutes);      // Payment routes

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Start services
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`services running on port ${port}`);
});
