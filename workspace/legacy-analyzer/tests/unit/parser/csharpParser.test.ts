import { describe, it, expect, beforeAll, afterAll, jest, beforeEach } from '@jest/globals';
import { CSharpParser } from '../../../src/parser/csharpParser';
import { FileService } from '../../../src/services/fileService';
import { TypeScriptWriter } from '../../../src/output/typeScriptWriter';
import { ParsedClass, ParsedEnum } from '../../../src/parser/csharpParser';
import winston from 'winston';
import path from 'path';

// Mock the dependencies
jest.mock('../../../src/services/fileService');
jest.mock('../../../src/output/typeScriptWriter');

const TEST_OUTPUT_DIR = path.join(__dirname, '../test-output');
const TEST_FILE_PATH = path.join(TEST_OUTPUT_DIR, 'test.cs');

describe('CSharpParser', () => {
  let parser: CSharpParser;
  let fileService: jest.Mocked<FileService>;
  let typeScriptWriter: jest.Mocked<TypeScriptWriter>;

  beforeAll(async () => {
    // Create mocked instances
    fileService = jest.mocked(new FileService(TEST_OUTPUT_DIR));
    typeScriptWriter = jest.mocked(new TypeScriptWriter(fileService, '', ''));
    
    // Set up the FileService mock methods
    jest.spyOn(fileService, 'writeClassDoc').mockResolvedValue();
    jest.spyOn(fileService, 'writeTypeScript').mockResolvedValue();
    jest.spyOn(fileService, 'readFile').mockResolvedValue('');
    jest.spyOn(fileService, 'writeFile').mockResolvedValue();
    fileService.typeScriptWriter = typeScriptWriter;

    // Create parser instance
    parser = new CSharpParser(fileService);
    await parser.init();
  });

  afterAll(async () => {
    // Clean up Winston logger
    const logger = winston.loggers.get('default');
    if (logger) {
      await Promise.all(logger.transports.map(t => new Promise(resolve => t.on('finish', resolve))));
      logger.close();
    }
  });

  it('should parse a class with a property with backing field', async () => {
    const source = `
      public class TestClass {
        private string _name;
        public string Name {
          get { return _name; }
          set { _name = value; }
        }
      }
    `;

    const result = await parser.parseSource(source, TEST_FILE_PATH);
    expect(result).toHaveLength(1);
    expect(result[0].fields).toHaveLength(1);
    expect(result[0].fields[0].name).toBe('Name');
    expect(result[0].fields[0].propertyImplementation).toEqual({
      backingField: {
        name: '_name',
        type: 'string'
      },
      accessors: {
        get: 'return _name;',
        set: '_name = value;'
      }
    });
  });

  it('should parse a class with a read-only property', async () => {
    const source = `
      public class TestClass {
        public string Name { get; }
      }
    `;

    const result = await parser.parseSource(source, TEST_FILE_PATH);
    expect(result).toHaveLength(1);
    expect(result[0].fields).toHaveLength(1);
    expect(result[0].fields[0].name).toBe('Name');
    expect(result[0].fields[0].propertyImplementation).toEqual({
      accessors: {
        get: '',
        set: null
      }
    });
  });

  it('should parse a class with a property without backing field', async () => {
    const source = `
      public class TestClass {
        public string Name { get; set; }
      }
    `;

    const result = await parser.parseSource(source, TEST_FILE_PATH);
    expect(result).toHaveLength(1);
    expect(result[0].fields).toHaveLength(1);
    expect(result[0].fields[0].name).toBe('Name');
    expect(result[0].fields[0].propertyImplementation).toEqual({
      accessors: {
        get: '',
        set: ''
      }
    });
  });

  it('should parse a class with attributes on properties', async () => {
    const source = `
      public class TestClass {
        [SettingKey("Features.Test.Enabled")]
        public bool Enabled { get; set; }
      }
    `;
    const result = await parser.parseSource(source, TEST_FILE_PATH);
    expect(result).toHaveLength(1);
    expect(result[0].fields).toHaveLength(1);
    expect(result[0].fields[0].attributes).toEqual([{
      name: 'SettingKey',
      arguments: [{
        name: '',
        value: '"Features.Test.Enabled"'
      }]
    }]);
  });

  it('should parse a class with complex property types', async () => {
    const source = `
      public class TestClass {
        public FilterConfig[] Filters { get; set; }
        public PathConfig Paths { get; set; }
      }
    `;
    const result = await parser.parseSource(source, TEST_FILE_PATH);
    expect(result).toHaveLength(1);
    expect(result[0].fields).toHaveLength(2);
    expect(result[0].fields[0].type).toBe('FilterConfig[]');
    expect(result[0].fields[1].type).toBe('PathConfig');
  });

  it('should parse XML documentation comments', async () => {
    const source = `
      public class TestClass {
        /// <summary>
        /// If true, show the instructions
        /// </summary>
        public bool ShowInstructions { get; set; }
      }
    `;
    const result = await parser.parseSource(source, TEST_FILE_PATH);
    expect(result).toHaveLength(1);
    expect(result[0].fields).toHaveLength(1);
    expect(result[0].fields[0].documentation).toBe('If true, show the instructions');
  });
});
