require("dotenv").config()
const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');
const authenticationMiddleware = require('./middleware/authentication');
const rateLimitingMiddleware = require('./middleware/rateLimiting');

// Middleware
app.use(express.json());
app.use(rateLimitingMiddleware); // Apply rate limiting middleware

// MongoDB Connection
const connectToDatabase = require('./config/database');
connectToDatabase(); // Connect to MongoDB

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', authenticationMiddleware, noteRoutes); //Protected Route

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});