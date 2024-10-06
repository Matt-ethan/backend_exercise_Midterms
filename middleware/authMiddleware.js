// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_secret_key'; // The same secret key used for signing

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Bearer scheme

    // Check if token is provided
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    // Verify token
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Token is not valid' });

        // Save the user id from the token to the request for use in other routes
        req.user = decoded;
        next();
    });
};

const loggingMiddleware = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
};

module.exports = { authMiddleware, loggingMiddleware };
