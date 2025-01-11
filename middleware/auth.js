// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const config = require('../config/auth');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(403).json({ message: 'No token provided' });

    jwt.verify(token, config.jwtSecret, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Unauthorized' });
        req.userId = decoded.userId;  // Attach user ID to the request object
        next();
    });
};

module.exports = { verifyToken };
