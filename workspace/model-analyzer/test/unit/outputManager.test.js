const fs = require('fs-extra');
const path = require('path');
const OutputManager = require('../../src/outputManager');

describe('OutputManager', () => {
    const testDir = path.join(__dirname, '../testData/output');
    let outputManager;

    beforeEach(async () => {
        await fs.ensureDir(testDir);
        outputManager = new OutputManager(testDir);
        await outputManager.initialize();
    });

    afterEach(async () => {
        await fs.remove(testDir);
    });

    describe('initialize', () => {
        it('should create output directory and files with headers', async () => {
            const fieldDataExists = await fs.pathExists(outputManager.fieldDataFile);
            const fileErrorsExists = await fs.pathExists(outputManager.fileErrorsFile);
            const fieldErrorsExists = await fs.pathExists(outputManager.fieldErrorsFile);

            expect(fieldDataExists).toBe(true);
            expect(fileErrorsExists).toBe(true);
            expect(fieldErrorsExists).toBe(true);

            // Check headers
            const fieldDataContent = await fs.readFile(outputManager.fieldDataFile, 'utf8');
            expect(fieldDataContent).toContain('| Source Model | Field Name |');
        });
    });

    describe('appendFieldData', () => {
        it('should append field data in correct format', async () => {
            await outputManager.appendFieldData(
                'models/test.json',
                'testField',
                'TestModel',
                'test.setting'
            );

            const content = await fs.readFile(outputManager.fieldDataFile, 'utf8');
            expect(content).toContain('| models/test.json | testField | TestModel | test.setting |');
        });

        it('should handle null values', async () => {
            await outputManager.appendFieldData(
                'models/test.json',
                'testField',
                null,
                null
            );

            const content = await fs.readFile(outputManager.fieldDataFile, 'utf8');
            const expectedRow = '| models/test.json | testField |  |  |';
            expect(content.split('\n').some(line => line.trim() === expectedRow.trim())).toBe(true);
        });
    });

    describe('appendFileError', () => {
        it('should append file error', async () => {
            await outputManager.appendFileError('models/error.json');

            const content = await fs.readFile(outputManager.fileErrorsFile, 'utf8');
            expect(content).toContain('- models/error.json');
        });
    });

    describe('appendFieldError', () => {
        it('should append field error in correct format', async () => {
            await outputManager.appendFieldError(
                'models/test.json',
                'testField',
                'TestModel',
                null
            );

            const content = await fs.readFile(outputManager.fieldErrorsFile, 'utf8');
            expect(content).toContain('| models/test.json | testField | TestModel | [not found] |');
        });
    });

    describe('processExtractionResult', () => {
        it('should process successful extraction', async () => {
            const result = {
                success: true,
                fields: [
                    {
                        fieldName: 'field1',
                        legacyModel: 'TestModel',
                        settingKey: 'test.setting'
                    }
                ]
            };

            await outputManager.processExtractionResult(result, 'models/test.json');

            const fieldDataContent = await fs.readFile(outputManager.fieldDataFile, 'utf8');
            expect(fieldDataContent).toContain('| models/test.json | field1 | TestModel | test.setting |');
        });

        it('should handle extraction failure', async () => {
            const result = {
                success: false,
                error: 'Failed to process file'
            };

            await outputManager.processExtractionResult(result, 'models/error.json');

            const fileErrorsContent = await fs.readFile(outputManager.fileErrorsFile, 'utf8');
            expect(fileErrorsContent).toContain('- models/error.json');
        });

        it('should handle fields with missing data', async () => {
            const result = {
                success: true,
                fields: [
                    {
                        fieldName: 'field1',
                        legacyModel: null,
                        settingKey: 'test.setting'
                    }
                ]
            };

            await outputManager.processExtractionResult(result, 'models/test.json');

            const fieldErrorsContent = await fs.readFile(outputManager.fieldErrorsFile, 'utf8');
            expect(fieldErrorsContent).toContain('| models/test.json | field1 | [not found] | test.setting |');
        });
    });
});
