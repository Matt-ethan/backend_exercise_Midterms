// controllers/userController.js
const jwt = require('jsonwebtoken'); // Import jsonwebtoken
const users = require('../models/userModel');

// Secret key for JWT signing and verification
const JWT_SECRET = 'your_secret_key'; // Use a strong secret key

// User registration
const registerUser = (req, res) => {
    const { username, email, password } = req.body;

    // Check if user already exists
    const userExists = users.find(user => user.email === email);
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    // Register new user
    const newUser = { id: users.length + 1, username, email, password }; // In a real app, hash password
    users.push(newUser);
    res.status(201).json(newUser);
};

// User login
const loginUser = (req, res) => {
    const { email, password } = req.body;

    // Validate user credentials
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    // Generate a JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' }); // Token expires in 1 hour
    res.status(200).json({ token });
};

// Get user profile (protected)
const getUserProfile = (req, res) => {
    const user = users.find(u => u.id === req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Create a response object without the password
    const { password, ...userProfile } = user;
    res.json(userProfile);
};

module.exports = { registerUser, loginUser, getUserProfile };
