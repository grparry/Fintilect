import fs from 'fs';
import path from 'path';

class Logger {
    private logDir: string;
    private logFile: string;
    private errorFile: string;
    private initialized: boolean = false;
    private debugEnabled: boolean;

    constructor() {
        this.logDir = path.join(process.cwd(), 'logs');
        this.logFile = path.join(this.logDir, 'combined.log');
        this.errorFile = path.join(this.logDir, 'error.log');
        console.log('Environment variables:', process.env);
        this.debugEnabled = process.env.DEBUG === 'true';
        console.log('Debug enabled:', this.debugEnabled);
        this.initializeLogs();
    }

    private initializeLogs() {
        try {
            // Create logs directory if it doesn't exist
            if (!fs.existsSync(this.logDir)) {
                fs.mkdirSync(this.logDir, { recursive: true });
                console.log(`Created logs directory at: ${this.logDir}`);
            }

            // Always clear and recreate log files
            fs.writeFileSync(this.logFile, '', { flag: 'w' });
            fs.writeFileSync(this.errorFile, '', { flag: 'w' });
            console.log(`Cleared and initialized log files at: ${this.logDir}`);

            this.initialized = true;
            this.info('Logger initialized successfully');
            if (this.debugEnabled) {
                this.debug('Debug logging enabled');
            }
        } catch (err) {
            console.error('Failed to initialize log files:', err);
            throw err;
        }
    }

    private formatMessage(level: string, message: string, args: any[]): string {
        const timestamp = new Date().toISOString();
        const formattedArgs = args.length > 0 ? ' ' + args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : arg
        ).join(' ') : '';
        
        return `[${timestamp}] ${level}: ${message}${formattedArgs}\n`;
    }

    private writeToFile(filePath: string, message: string) {
        try {
            fs.appendFileSync(filePath, message, { flag: 'a', encoding: 'utf8' });
        } catch (err) {
            console.error(`Failed to write to ${filePath}:`, err);
            throw err;
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
        if (!this.debugEnabled) return;
        
        const logMessage = this.formatMessage('DEBUG', message, args);
        console.debug(logMessage.trim());
        this.writeToFile(this.logFile, logMessage);
    }
}

// Create a single instance of the logger
const logger = new Logger();

// Export both the class and default instance
export { Logger };
export default logger;

// Ensure streams are closed when the process exits
process.on('exit', () => {
    // No cleanup needed since we're using synchronous operations
});

process.on('SIGINT', () => {
    process.exit();
});

process.on('SIGTERM', () => {
    process.exit();
});
