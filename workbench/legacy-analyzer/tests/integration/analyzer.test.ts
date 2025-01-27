import fs from 'fs-extra';
import path from 'path';
import { describe, it, expect, beforeAll, afterAll, jest } from '@jest/globals';
import { FileScanner } from '@/../src/fileScanner';
import { FileService } from '@/../src/services/fileService';
import { CSharpParser } from '@/../src/parser/parser';
import { OutputWriter } from '@/../src/output/writer';
import logger from '@/../src/utils/logger';

describe('Legacy Analyzer Integration Tests', () => {
  const testDataDir = path.join(__dirname, '../fixtures');
  const outputDir = path.join(__dirname, '../test-output');
  const dataFile = 'test_data.md';
  const errorFile = 'test_errors.md';

  let scanner: FileScanner;
  let parser: CSharpParser;
  let writer: OutputWriter;
  let fileService: FileService;

  beforeAll(async () => {
    fileService = new FileService(outputDir);
    parser = new CSharpParser(fileService);
    await parser.init();
    writer = new OutputWriter({
      outputDir: outputDir,
      isTest: true
    });
    scanner = new FileScanner(testDataDir, { recursive: false });
  });

  beforeEach(async () => {
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
        const parsedClasses = await parser.parseSource(fileContent, 'test.cs');
        expect(parsedClasses).toHaveLength(1);

        for (const parsedClass of parsedClasses) {
            await writer.writeClassData(parsedClass, 'test.cs');
        }

        // Verify output
        const outputPath = path.join(outputDir, 'classes/Test/Settings/ValidSettings.ts');
        const outputContent = await fs.readFile(outputPath, 'utf-8');
        
        // Check for class definition and interface
        expect(outputContent).toContain('export interface ValidSettingsConfig');
        expect(outputContent).toContain('export class ValidSettings implements ISettingsGroup');
        expect(outputContent).toContain('Setting1: string;');
        expect(outputContent).toContain('Setting2: number;');
        
        // Check for private fields and accessors
        expect(outputContent).toContain('private _setting1: string');
        expect(outputContent).toContain('get setting1(): string');
        expect(outputContent).toContain('set setting1(value: string)');
        
        // Check for metadata
        expect(outputContent).toContain('static readonly metadata: ISettingsMetadata');
        expect(outputContent).toContain('groupName: \'ValidSettings\'');
        
        // Check for toSettings method
        expect(outputContent).toContain('toSettings(): Setting[]');
        expect(outputContent).toContain('{ key: "ValidSettings.Setting1", value: this._setting1, dataType: \'string\', label: "Setting1" }');
        expect(outputContent).toContain('{ key: "ValidSettings.Setting2", value: this._setting2, dataType: \'number\', label: "Setting2" }');

      } finally {
        // Clean up test file
        await fs.remove(testFilePath);
      }
    });

    it('should handle invalid C# syntax', async () => {
      // Create a test file with invalid syntax
      const testFilePath = path.join(testDataDir, 'InvalidSettings.cs');
      const testFileContent = `
using System;

namespace Test.Settings {
    public class InvalidSettings {
        [SettingKey("test1")
        public string Setting1 { get; set; } // Missing closing bracket
    }
}`;
      await fs.writeFile(testFilePath, testFileContent);

      try {
        const scanResults = await scanner.scanForFiles();
        expect(scanResults).toHaveLength(1);
        expect(scanResults[0].error).toBeUndefined();

        const fileContent = await fs.readFile(scanResults[0].filePath, 'utf-8');
        const parsedClasses = await parser.parseSource(fileContent, 'test.cs');
        
        // Should still parse but with errors
        expect(parsedClasses).toHaveLength(1);
        expect(parsedClasses[0].fields).toHaveLength(1);
        expect(parsedClasses[0].fields[0].name).toBe('Setting1');

        for (const parsedClass of parsedClasses) {
            await writer.writeClassData(parsedClass, 'test.cs');
        }

        // Verify error output
        const outputPath = path.join(outputDir, 'classes/Test/Settings/InvalidSettings.ts');
        const outputContent = await fs.readFile(outputPath, 'utf-8');
        
        // Should still generate a class but with default values
        expect(outputContent).toContain('export interface InvalidSettingsConfig');
        expect(outputContent).toContain('export class InvalidSettings implements ISettingsGroup');
        expect(outputContent).toContain('Setting1: string;');
        expect(outputContent).toContain('private _setting1: string');

      } finally {
        await fs.remove(testFilePath);
      }
    });

    it('should handle multiple files', async () => {
      const testFiles = [
        {
          name: 'Settings1.cs',
          content: `
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
namespace Test.Settings {
    public class Settings2 {
        [SettingKey("test2")]
        public int Setting2 { get; set; }
    }
}`
        }
      ];

      const filePaths = await Promise.all(
        testFiles.map(async file => {
          const filePath = path.join(testDataDir, file.name);
          await fs.writeFile(filePath, file.content);
          return filePath;
        })
      );

      try {
        const scanResults = await scanner.scanForFiles();
        expect(scanResults).toHaveLength(2);
        expect(scanResults.every(r => !r.error)).toBe(true);

        for (const result of scanResults) {
          const fileContent = await fs.readFile(result.filePath, 'utf-8');
          const parsedClasses = await parser.parseSource(fileContent, result.filePath);
          expect(parsedClasses).toHaveLength(1);

          for (const parsedClass of parsedClasses) {
            await writer.writeClassData(parsedClass, result.filePath);
          }
        }

        // Verify Settings1 output
        const settings1Path = path.join(outputDir, 'classes/Test/Settings/Settings1.ts');
        const settings1Content = await fs.readFile(settings1Path, 'utf-8');
        expect(settings1Content).toContain('export class Settings1 implements ISettingsGroup');
        expect(settings1Content).toContain('export interface Settings1Config');
        expect(settings1Content).toContain('Setting1: string;');
        expect(settings1Content).toContain('private _setting1: string');
        expect(settings1Content).toContain('{ key: "Settings1.Setting1", value: this._setting1, dataType: \'string\', label: "Setting1" }');

        // Verify Settings2 output
        const settings2Path = path.join(outputDir, 'classes/Test/Settings/Settings2.ts');
        const settings2Content = await fs.readFile(settings2Path, 'utf-8');
        expect(settings2Content).toContain('export class Settings2 implements ISettingsGroup');
        expect(settings2Content).toContain('export interface Settings2Config');
        expect(settings2Content).toContain('Setting2: number;');
        expect(settings2Content).toContain('private _setting2: number');
        expect(settings2Content).toContain('{ key: "Settings2.Setting2", value: this._setting2, dataType: \'number\', label: "Setting2" }');

      } finally {
        await Promise.all(filePaths.map(fp => fs.remove(fp)));
      }
    });
  });
});
