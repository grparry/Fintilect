import fs from 'fs-extra';
import path from 'path';
import { OutputWriter } from '../../../src/output/writer';
import { ParsedClass } from '../../../src/parser/csharpParser';
import { jest, describe, it, expect, beforeEach } from '@jest/globals';

// Mock fs-extra
jest.mock('fs-extra', () => ({
  ensureDir: jest.fn(),
  ensureFile: jest.fn(),
  appendFile: jest.fn(),
  writeFile: jest.fn(),
  remove: jest.fn()
}));

// Get the mocked fs instance
const mockFs = jest.mocked(fs);

describe('OutputWriter', () => {
  const testOutputDir = '/test/output';
  const testDataFile = 'legacy_field_data.md';
  const testErrorFile = 'legacy_field_errors.md';
  let writer: OutputWriter;

  beforeEach(() => {
    writer = new OutputWriter({
      outputDir: testOutputDir,
      dataFile: testDataFile,
      errorFile: testErrorFile,
    });

    // Reset all mocks
    jest.clearAllMocks();

    // Setup default mock implementations
    mockFs.ensureDir.mockResolvedValue(undefined as never);
    mockFs.ensureFile.mockResolvedValue(undefined as never);
    mockFs.appendFile.mockResolvedValue(undefined as never);
    mockFs.writeFile.mockResolvedValue(undefined as never);
    mockFs.remove.mockResolvedValue(undefined as never);
  });

  describe('initialize', () => {
    it('should create output directory and files', async () => {
      await writer.initialize();

      expect(mockFs.ensureDir).toHaveBeenCalledWith(testOutputDir);
      expect(mockFs.ensureFile).toHaveBeenCalledWith(path.join(testOutputDir, testDataFile));
      expect(mockFs.ensureFile).toHaveBeenCalledWith(path.join(testOutputDir, testErrorFile));
    });

    it('should handle initialization errors', async () => {
      const error = new Error('Test error');
      mockFs.ensureDir.mockRejectedValueOnce(error as never);

      await expect(writer.initialize()).rejects.toThrow('Test error');
    });
  });

  describe('writeClassData', () => {
    const testClass: ParsedClass = {
      name: 'TestClass',
      namespace: 'Test.Namespace',
      fields: [
        {
          name: 'testField',
          type: 'string',
          settingKey: 'test.setting',
          validationRules: ['RequiredValidation']
        }
      ]
    };

    it('should write class data in markdown format', async () => {
      await writer.writeClassData([testClass]);

      const expectedOutput = expect.stringContaining(
        '| Test.Namespace.TestClass | testField | string | test.setting | RequiredValidation |'
      );
      expect(mockFs.appendFile).toHaveBeenCalledWith(
        path.join(testOutputDir, testDataFile),
        expectedOutput
      );
    });

    it('should handle empty class data', async () => {
      const emptyClass: ParsedClass = {
        name: 'EmptyClass',
        namespace: 'Test.Namespace',
        fields: []
      };

      await writer.writeClassData([emptyClass]);

      // Empty class should not write anything
      expect(mockFs.appendFile).toHaveBeenCalledWith(
        path.join(testOutputDir, testDataFile),
        ''
      );
    });

    it('should handle write errors', async () => {
      const error = new Error('Write error');
      mockFs.appendFile.mockRejectedValueOnce(error as never);

      await expect(writer.writeClassData([testClass])).rejects.toThrow('Write error');
    });
  });

  describe('writeError', () => {
    it('should write error information in markdown format', async () => {
      const testFilePath = '/test/file.cs';
      const testError = new Error('Test error');

      await writer.writeError(testFilePath, testError);

      expect(mockFs.appendFile).toHaveBeenCalledWith(
        path.join(testOutputDir, testErrorFile),
        expect.stringContaining('## Error in file.cs')
      );
      expect(mockFs.appendFile).toHaveBeenCalledWith(
        path.join(testOutputDir, testErrorFile),
        expect.stringContaining('**Error:** Test error')
      );
    });

    it('should handle write errors', async () => {
      const error = new Error('Write error');
      mockFs.appendFile.mockRejectedValueOnce(error as never);

      await expect(writer.writeError('/test/file.cs', new Error('Test'))).rejects.toThrow('Write error');
    });
  });

  describe('file locking', () => {
    it('should acquire and release lock for file operations', async () => {
      await writer.writeClassData([]);

      expect(mockFs.writeFile).toHaveBeenCalledWith(
        path.join(testOutputDir, '.lock'),
        '',
        { flag: 'wx' }
      );
      expect(mockFs.remove).toHaveBeenCalledWith(path.join(testOutputDir, '.lock'));
    });

    it('should retry lock acquisition on conflict', async () => {
      const lockError = Object.assign(new Error('Lock exists'), { code: 'EEXIST' });
      mockFs.writeFile
        .mockRejectedValueOnce(lockError as never)
        .mockResolvedValueOnce(undefined as never);

      await writer.writeClassData([]);

      expect(mockFs.writeFile).toHaveBeenCalledTimes(2);
      expect(mockFs.remove).toHaveBeenCalledTimes(1);
    });
  });
});
