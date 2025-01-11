const express = require('express');
const path = require('path');
const setupLogging = require('./server/logMiddleware');

const app = express();
app.use(express.json());

// Add CORS headers for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Setup logging middleware
setupLogging(app);

const port = process.env.PORT || 4001;
app.listen(port, () => {
  console.log(`File Server is running on port ${port}`);
});
