import fs from 'fs-extra';
import path from 'path';
import { FileScanner, ScannerOptions } from '../../src/fileScanner';
import { CSharpParser } from '../../src/parser/csharpParser';
import { OutputWriter } from '../../src/output/writer';
import { logger } from '../../src/utils/logger';
import { jest, describe, it, expect, beforeAll, beforeEach, afterAll } from '@jest/globals';

describe('Legacy Analyzer Integration Tests', () => {
  const testDataDir = path.join(__dirname, '../fixtures');
  const outputDir = path.join(__dirname, '../test-output');
  const dataFile = 'test_data.md';
  const errorFile = 'test_errors.md';

  let scanner: FileScanner;
  let parser: CSharpParser;
  let writer: OutputWriter;

  beforeAll(async () => {
    // Create test directories
    await fs.ensureDir(testDataDir);
    await fs.ensureDir(outputDir);
  });

  beforeEach(async () => {
    // Initialize components
    const scannerOptions: ScannerOptions = {
      recursive: false
    };
    scanner = new FileScanner(testDataDir, scannerOptions);
    parser = new CSharpParser();
    await parser.init();
    writer = new OutputWriter({
      outputDir,
      dataFile,
      errorFile,
    });

    // Clean output directory
    await fs.emptyDir(outputDir);
    await writer.initialize();
  });

  afterAll(async () => {
    // Clean up test directories
    await fs.remove(outputDir);
  });

  describe('End-to-end Processing', () => {
    it('should process a valid C# settings class file', async () => {
      // Create a test C# file
      const testFilePath = path.join(testDataDir, 'ValidSettings.cs');
      const testFileContent = `
using System;

namespace Test.Settings {
    public class ValidSettings {
        [SettingKey("test.setting1")]
        [RequiredValidation]
        public string Setting1 { get; set; }
        
        [SettingKey("test.setting2")]
        public int Setting2 { get; set; }
    }
}`;
      await fs.writeFile(testFilePath, testFileContent);

      try {
        // Process the file
        const scanResults = await scanner.scanForFiles();
        expect(scanResults).toHaveLength(1);
        expect(scanResults[0].error).toBeUndefined();

        const fileContent = await fs.readFile(scanResults[0].filePath, 'utf-8');
        const parsedClasses = await parser.parseSource(fileContent);
        expect(parsedClasses).toHaveLength(1);

        await writer.writeClassData(parsedClasses);

        // Verify output
        const outputPath = path.join(outputDir, dataFile);
        const outputContent = await fs.readFile(outputPath, 'utf-8');
        
        expect(outputContent).toContain('| Namespace.Class | Field | Type | Setting Key | Validation Rules |');
        expect(outputContent).toContain('| Test.Settings.ValidSettings | Setting1 | string | test.setting1 | RequiredValidation |');
        expect(outputContent).toContain('| Test.Settings.ValidSettings | Setting2 | int | test.setting2 |  |');

      } finally {
        // Clean up test file
        await fs.remove(testFilePath);
      }
    });

    it('should handle invalid C# syntax', async () => {
      // Create a test file with invalid syntax
      const testFilePath = path.join(testDataDir, 'InvalidSettings.cs');
      const testFileContent = `
        This is not valid C# syntax
        class InvalidSettings {
          public string Setting1
        }
      `;
      await fs.writeFile(testFilePath, testFileContent);

      try {
        // Process the file
        const scanResults = await scanner.scanForFiles();
        expect(scanResults).toHaveLength(1);
        expect(scanResults[0].error).toBeUndefined();

        const fileContent = await fs.readFile(scanResults[0].filePath, 'utf-8');
        try {
          await parser.parseSource(fileContent);
        } catch (error) {
          if (error instanceof Error) {
            await writer.writeError(scanResults[0].filePath, error);
          }
        }

        // Verify error output
        const errorPath = path.join(outputDir, errorFile);
        const errorContent = await fs.readFile(errorPath, 'utf-8');
        
        expect(errorContent).toContain('InvalidSettings.cs');
        expect(errorContent).toContain('Error:');

      } finally {
        // Clean up test file
        await fs.remove(testFilePath);
      }
    });

    it('should handle multiple files', async () => {
      // Create test files
      const testFiles = [
        {
          name: 'Settings1.cs',
          content: `
using System;

namespace Test.Settings {
    public class Settings1 {
        [SettingKey("test1")]
        public string Setting1 { get; set; }
    }
}`
        },
        {
          name: 'Settings2.cs',
          content: `
using System;

namespace Test.Settings {
    public class Settings2 {
        [SettingKey("test2")]
        public int Setting2 { get; set; }
    }
}`
        }
      ];

      const filePaths = await Promise.all(
        testFiles.map(async (file) => {
          const filePath = path.join(testDataDir, file.name);
          await fs.writeFile(filePath, file.content);
          return filePath;
        })
      );

      try {
        // Process the files
        const scanResults = await scanner.scanForFiles();
        expect(scanResults).toHaveLength(2);
        expect(scanResults.every(result => !result.error)).toBe(true);

        for (const result of scanResults) {
          const fileContent = await fs.readFile(result.filePath, 'utf-8');
          const parsedClasses = await parser.parseSource(fileContent);
          await writer.writeClassData(parsedClasses);
        }

        // Verify output
        const outputPath = path.join(outputDir, dataFile);
        const outputContent = await fs.readFile(outputPath, 'utf-8');
        
        expect(outputContent).toContain('| Namespace.Class | Field | Type | Setting Key | Validation Rules |');
        expect(outputContent).toContain('| Test.Settings.Settings1 | Setting1 | string | test1 |  |');
        expect(outputContent).toContain('| Test.Settings.Settings2 | Setting2 | int | test2 |  |');

      } finally {
        // Clean up test files
        await Promise.all(filePaths.map(filePath => fs.remove(filePath)));
      }
    });
  });
});
