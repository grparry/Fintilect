import fs from 'fs';
import path from 'path';

class Logger {
    private logDir: string;
    private logFile: string;
    private errorFile: string;

    constructor() {
        this.logDir = path.join(process.cwd(), 'logs');
        this.logFile = path.join(this.logDir, 'combined.log');
        this.errorFile = path.join(this.logDir, 'error.log');
        
        try {
            // Create logs directory if it doesn't exist
            if (!fs.existsSync(this.logDir)) {
                fs.mkdirSync(this.logDir, { recursive: true });
            }

            // Clear existing log files
            fs.writeFileSync(this.logFile, '');
            fs.writeFileSync(this.errorFile, '');
        } catch (err) {
            console.error('Failed to initialize log files:', err);
        }
    }

    private formatMessage(level: string, message: string, args: any[]): string {
        const timestamp = new Date().toISOString();
        const formattedArgs = args.length > 0 ? ' ' + args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg) : arg
        ).join(' ') : '';
        
        return `[${timestamp}] ${level}: ${message}${formattedArgs}\n`;
    }

    private writeToFile(filePath: string, message: string) {
        try {
            fs.appendFileSync(filePath, message);
        } catch (err) {
            console.error(`Failed to write to ${filePath}:`, err);
        }
    }

    info(message: string, ...args: any[]) {
        const logMessage = this.formatMessage('INFO', message, args);
        console.log(logMessage.trim());
        this.writeToFile(this.logFile, logMessage);
    }

    error(message: string, ...args: any[]) {
        const logMessage = this.formatMessage('ERROR', message, args);
        console.error(logMessage.trim());
        this.writeToFile(this.logFile, logMessage);
        this.writeToFile(this.errorFile, logMessage);
    }

    warn(message: string, ...args: any[]) {
        const logMessage = this.formatMessage('WARN', message, args);
        console.warn(logMessage.trim());
        this.writeToFile(this.logFile, logMessage);
    }

    debug(message: string, ...args: any[]) {
        const logMessage = this.formatMessage('DEBUG', message, args);
        console.debug(logMessage.trim());
        this.writeToFile(this.logFile, logMessage);
    }
}

const logger = new Logger();

// Ensure streams are closed when the process exits
process.on('exit', () => {
    // No-op since we're using synchronous file operations
});

process.on('SIGINT', () => {
    // No-op since we're using synchronous file operations
    process.exit();
});

process.on('SIGTERM', () => {
    // No-op since we're using synchronous file operations
    process.exit();
});

export default logger;
