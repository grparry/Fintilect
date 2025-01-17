const fs = require('fs-extra');
const path = require('path');

class Logger {
    constructor(outputDir) {
        this.logFile = path.join(outputDir, 'model_analyzer.log');
        this.initialize();
    }

    initialize() {
        // Ensure the log file exists and is empty
        fs.ensureFileSync(this.logFile);
        fs.truncateSync(this.logFile);
    }

    log(message) {
        const timestamp = new Date().toISOString();
        const logEntry = `[${timestamp}] INFO: ${message}\n`;
        fs.appendFileSync(this.logFile, logEntry);
    }

    error(message, error) {
        const timestamp = new Date().toISOString();
        const errorMessage = error ? `${message}: ${error.message}` : message;
        let logEntry = `[${timestamp}] ERROR: ${errorMessage}\n`;
        if (error?.stack) {
            logEntry = logEntry + `${error.stack}\n`;
        }
        fs.appendFileSync(this.logFile, logEntry);
    }

    getLogContents() {
        return fs.readFileSync(this.logFile, 'utf8');
    }
}

module.exports = Logger;
