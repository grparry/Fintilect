const path = require('path');
const fs = require('fs-extra');
const { exec } = require('child_process');
const util = require('util');

const execAsync = util.promisify(exec);

describe('Model Analyzer Integration', () => {
    const testDir = path.resolve(__dirname, 'testData');
    const modelDir = path.join(testDir, 'models');
    const outputDir = path.join(testDir, 'output');
    const cliPath = path.resolve(__dirname, '../../src/index.js');

    beforeAll(async () => {
        // Ensure output directory exists and is empty
        await fs.ensureDir(outputDir);
        await fs.emptyDir(outputDir);
    });

    afterAll(async () => {
        // Clean up output directory
        await fs.remove(outputDir);
    });

    async function runCli(args = '') {
        const command = `node ${cliPath} --model-dir ${modelDir} --output-dir ${outputDir} ${args}`;
        return execAsync(command);
    }

    async function readOutputFile(filename) {
        const filePath = path.join(outputDir, filename);
        return fs.readFile(filePath, 'utf8');
    }

    async function readLogFile() {
        const logPath = path.join(outputDir, 'model_analyzer.log');
        return fs.readFile(logPath, 'utf8');
    }

    describe('Full Directory Processing', () => {
        beforeEach(async () => {
            await fs.emptyDir(outputDir);
        });

        it('should create all output files', async () => {
            await runCli();
            const files = await fs.readdir(outputDir);
            expect(files).toContain('model_field_data.md');
            expect(files).toContain('model_file_errors.md');
            expect(files).toContain('model_field_errors.md');
            expect(files).toContain('model_analyzer.log');
        });

        it('should extract fields from simple.json', async () => {
            await runCli();
            const fieldData = await readOutputFile('model_field_data.md');
            const filePath = path.resolve(modelDir, 'simple.json');
            expect(fieldData).toContain(`| ${filePath} | field1 | SimpleModel | simple.field1 |`);
            expect(fieldData).toContain(`| ${filePath} | field2 | OverrideModel | simple.field2 |`);
        });

        it('should extract nested fields from complex.json', async () => {
            await runCli();
            const fieldData = await readOutputFile('model_field_data.md');
            const filePath = path.resolve(modelDir, 'nested/complex.json');
            expect(fieldData).toContain(`| ${filePath} | nested.subField | ComplexModel | complex.nested.subField |`);
            expect(fieldData).toContain(`| ${filePath} | arrayField[].itemField | ComplexModel | complex.arrayField.itemField |`);
        });

        it('should log fields with missing data', async () => {
            await runCli();
            const fieldErrors = await readOutputFile('model_field_errors.md');
            const filePath = path.resolve(modelDir, 'invalid.json');
            expect(fieldErrors).toContain(`| ${filePath} | missingData | [not found] | [not found] |`);
        });

        it('should log processing steps', async () => {
            await runCli();
            const logContent = await readLogFile();
            expect(logContent).toContain('Initializing model analyzer');
            expect(logContent).toContain('Processing');
            expect(logContent).toContain('Analysis complete');
        });
    });

    describe('Single File Processing', () => {
        beforeEach(async () => {
            await fs.emptyDir(outputDir);
        });

        it('should process only the specified file', async () => {
            await runCli('--file simple.json');
            const fieldData = await readOutputFile('model_field_data.md');
            
            // Should contain simple.json data
            const simplePath = path.resolve(modelDir, 'simple.json');
            expect(fieldData).toContain(simplePath);
            expect(fieldData).toContain('field1');
            
            // Should not contain complex.json data
            const complexPath = path.resolve(modelDir, 'nested/complex.json');
            expect(fieldData).not.toContain(complexPath);
        });

        it('should handle non-existent file', async () => {
            try {
                await runCli('--file nonexistent.json');
            } catch (error) {
                const logContent = await readLogFile();
                expect(logContent).toContain('File not found');
            }
        });
    });

    describe('Error Handling', () => {
        beforeEach(async () => {
            await fs.emptyDir(outputDir);
        });

        it('should handle invalid JSON files', async () => {
            // Create an invalid JSON file
            const invalidFile = path.join(modelDir, 'broken.json');
            await fs.writeFile(invalidFile, '{ invalid json }');

            try {
                await runCli();
                const logContent = await readLogFile();
                expect(logContent).toContain('Failed to parse schema file');
            } finally {
                await fs.remove(invalidFile);
            }
        });

        it('should handle inaccessible directories', async () => {
            try {
                await runCli('--model-dir /nonexistent/dir');
            } catch (error) {
                const logContent = await readLogFile();
                expect(logContent).toContain('Error discovering model files');
            }
        });
    });
});
