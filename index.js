// log all incoming and outgoing request

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Custom middleware for logging
app.use((req, res, next) => {
  // Log the incoming request
  const logEntry = `${new Date().toISOString()} - ${req.method} ${req.url}`;
  fs.appendFile(path.join(__dirname, 'request.log'), logEntry + '\n', (err) => {
    if (err) {
      console.error('Error logging request:', err);
    }
  });

  // Continue to the next middleware
  next();
});

// Other routes and middleware go here

// Example route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Example middleware
app.use((req, res, next) => {
  console.log('This middleware runs after the logging middleware');
  next();
});

// Start the server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
