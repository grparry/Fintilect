const path = require('path');
const fs = require('fs-extra');
const { discoverModelFiles } = require('../../src/fileScanner');

describe('File Scanner', () => {
    const testDir = path.join(__dirname, '../testData/models');
    const mockLogger = {
        log: jest.fn(),
        error: jest.fn()
    };

    beforeEach(() => {
        mockLogger.log.mockClear();
        mockLogger.error.mockClear();
    });

    it('should find JSON files in directory', async () => {
        const files = await discoverModelFiles(testDir, null, mockLogger);
        expect(files.length).toBeGreaterThan(0);
        expect(files[0].endsWith('.json')).toBe(true);
    });

    it('should handle single file mode', async () => {
        const targetFile = 'simple.json';
        const files = await discoverModelFiles(testDir, targetFile, mockLogger);
        expect(files).toHaveLength(1);
        expect(files[0]).toContain(targetFile);
    });

    it('should throw error for non-existent file', async () => {
        const nonexistentFile = 'nonexistent.json';
        await expect(discoverModelFiles(testDir, nonexistentFile, mockLogger))
            .rejects
            .toThrow('File not found');
        expect(mockLogger.error).toHaveBeenCalled();
    });

    it('should handle empty directory', async () => {
        const emptyDir = path.join(testDir, 'empty');
        await fs.ensureDir(emptyDir);
        
        const files = await discoverModelFiles(emptyDir, null, mockLogger);
        expect(files).toHaveLength(0);
        expect(mockLogger.log).toHaveBeenCalledWith('No JSON files found in the specified directory');
        
        await fs.remove(emptyDir);
    });
});
