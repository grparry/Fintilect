const fs = require('fs');
const path = require('path');

const LOG_FILE = path.join(__dirname, '../debug.log');

module.exports = function setupLogging(app) {
  // Ensure log file exists
  if (!fs.existsSync(LOG_FILE)) {
    fs.writeFileSync(LOG_FILE, '');
  }

  app.post('/api/debug/log', (req, res) => {
    try {
      const { message } = req.body;
      const timestamp = new Date().toISOString();
      const logEntry = `${timestamp} ${JSON.stringify(message)}\n`;
      
      fs.appendFileSync(LOG_FILE, logEntry);
      res.sendStatus(200);
    } catch (error) {
      console.error('Error writing to log file:', error);
      res.status(500).json({ error: error.message });
    }
  });
};
