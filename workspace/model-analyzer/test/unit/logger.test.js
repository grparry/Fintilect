const fs = require('fs-extra');
const path = require('path');
const Logger = require('../../src/utils/logger');

describe('Logger', () => {
    const testDir = path.join(__dirname, '../testData/output');
    let logger;

    beforeEach(async () => {
        await fs.ensureDir(testDir);
        logger = new Logger(testDir);
    });

    afterEach(async () => {
        await fs.remove(testDir);
    });

    it('should create log file on initialization', () => {
        const logFile = path.join(testDir, 'model_analyzer.log');
        expect(fs.existsSync(logFile)).toBe(true);
    });

    it('should log info messages with timestamp', () => {
        logger.log('Test message');
        const content = logger.getLogContents();
        expect(content).toMatch(/^\[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z\] INFO: Test message\n$/);
    });

    it('should log error messages with timestamp', () => {
        const error = new Error('Test error');
        logger.error('Error occurred', error);
        const content = logger.getLogContents();
        expect(content).toMatch(/^\[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z\] ERROR: Error occurred: Test error\n/);
        expect(content).toContain(error.stack);
    });

    it('should append multiple log entries', () => {
        logger.log('Message 1');
        logger.log('Message 2');
        logger.error('Error message');
        
        const content = logger.getLogContents();
        const lines = content.split('\n').filter(line => line.length > 0);
        
        expect(lines).toHaveLength(3);
        expect(lines[0]).toContain('Message 1');
        expect(lines[1]).toContain('Message 2');
        expect(lines[2]).toContain('Error message');
    });
});
