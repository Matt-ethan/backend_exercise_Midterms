const express = require('express');
const app = express();
const userRoutes = require('./routes/user');
const loggingMiddleware = require('./middleware/logginMiddleware');  // Correct import

app.use(express.json());
app.use(loggingMiddleware); // Log all requests

// Root route for the base URL
app.get('/', (req, res) => {
    res.send('Welcome to the User API');
});

app.use('/api/users', userRoutes); // User-related routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
