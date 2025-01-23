import fs from 'fs';
import path from 'path';
import { describe, test, expect, beforeEach, afterEach, jest } from '@jest/globals';

// Mock fs module
jest.mock('fs', () => ({
    existsSync: jest.fn(),
    mkdirSync: jest.fn(),
    appendFileSync: jest.fn(),
    readFileSync: jest.fn(),
    writeFileSync: jest.fn(),
    promises: {
        mkdir: jest.fn(),
        writeFile: jest.fn(),
        readFile: jest.fn(),
    }
}));

describe('Logger', () => {
    const logDir = path.join(process.cwd(), 'logs');
    const combinedLogPath = path.join(logDir, 'combined.log');
    const errorLogPath = path.join(logDir, 'error.log');
    
    // Mock console methods
    const originalConsole = { ...console };
    
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
        
        // Mock console methods
        console.log = jest.fn();
        console.error = jest.fn();
        console.warn = jest.fn();
        console.debug = jest.fn();
        
        // Mock file system operations
        (fs.existsSync as jest.Mock).mockReturnValue(true);
        (fs.mkdirSync as jest.Mock).mockImplementation(() => {});
        (fs.appendFileSync as jest.Mock).mockImplementation(() => {});
        (fs.readFileSync as jest.Mock).mockImplementation(() => '');
        (fs.writeFileSync as jest.Mock).mockImplementation(() => {});
    });

    afterEach(() => {
        jest.resetModules();
        // Restore console methods
        console.log = originalConsole.log;
        console.error = originalConsole.error;
        console.warn = originalConsole.warn;
        console.debug = originalConsole.debug;
    });

    test('should create log directory and files if they do not exist', () => {
        // Mock files don't exist
        (fs.existsSync as jest.Mock)
            .mockReturnValueOnce(false)  // logs dir
            .mockReturnValueOnce(false)  // combined.log
            .mockReturnValueOnce(false); // error.log

        const loggerInstance = require('../../../src/utils/logger').default;

        // Check if directory was created
        expect(fs.mkdirSync).toHaveBeenCalledWith(logDir, { recursive: true });

        // Write a test message
        loggerInstance.info('Test message');

        // Verify log was written
        expect(fs.appendFileSync).toHaveBeenCalled();
    });

    test('should write info messages to combined log', () => {
        const loggerInstance = require('../../../src/utils/logger').default;
        loggerInstance.info('Test info message');

        expect(fs.appendFileSync).toHaveBeenCalledWith(
            combinedLogPath,
            expect.stringContaining('INFO: Test info message'),
            expect.any(Object)
        );
    });

    test('should write error messages to both logs', () => {
        const loggerInstance = require('../../../src/utils/logger').default;
        loggerInstance.error('Test error message');

        expect(fs.appendFileSync).toHaveBeenCalledWith(
            combinedLogPath,
            expect.stringContaining('ERROR: Test error message'),
            expect.any(Object)
        );
        expect(fs.appendFileSync).toHaveBeenCalledWith(
            errorLogPath,
            expect.stringContaining('ERROR: Test error message'),
            expect.any(Object)
        );
    });

    test('should write warning messages to combined log', () => {
        const loggerInstance = require('../../../src/utils/logger').default;
        loggerInstance.warn('Test warning message');

        expect(fs.appendFileSync).toHaveBeenCalledWith(
            combinedLogPath,
            expect.stringContaining('WARN: Test warning message'),
            expect.any(Object)
        );
    });

    test('should write debug messages to combined log when debug is enabled', () => {
        process.env.DEBUG = 'true';
        const loggerInstance = require('../../../src/utils/logger').default;
        loggerInstance.debug('Test debug message');

        expect(fs.appendFileSync).toHaveBeenCalledWith(
            combinedLogPath,
            expect.stringContaining('DEBUG: Test debug message'),
            expect.any(Object)
        );
        delete process.env.DEBUG;
    });

    test('should not write debug messages when debug is disabled', () => {
        process.env.DEBUG = 'false';
        const loggerInstance = require('../../../src/utils/logger').default;
        loggerInstance.debug('Test debug message');

        expect(fs.appendFileSync).not.toHaveBeenCalledWith(
            combinedLogPath,
            expect.stringContaining('DEBUG: Test debug message'),
            expect.any(Object)
        );
        delete process.env.DEBUG;
    });

    test('should format object arguments correctly', () => {
        const loggerInstance = require('../../../src/utils/logger').default;
        const testObj = { key: 'value' };
        loggerInstance.info('Test message with object:', testObj);

        expect(fs.appendFileSync).toHaveBeenCalledWith(
            combinedLogPath,
            expect.stringContaining('INFO: Test message with object: {"key":"value"}'),
            expect.any(Object)
        );
    });

    test('should handle multiple arguments correctly', () => {
        const loggerInstance = require('../../../src/utils/logger').default;
        loggerInstance.info('Test message with', 'multiple', 'arguments');

        expect(fs.appendFileSync).toHaveBeenCalledWith(
            combinedLogPath,
            expect.stringContaining('INFO: Test message with multiple arguments'),
            expect.any(Object)
        );
    });

    test('should include timestamp in log messages', () => {
        const loggerInstance = require('../../../src/utils/logger').default;
        loggerInstance.info('Test message');

        expect(fs.appendFileSync).toHaveBeenCalledWith(
            combinedLogPath,
            expect.stringMatching(/\[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z\] INFO: Test message/),
            expect.any(Object)
        );
    });
});
