import { describe, it, expect, beforeAll, afterAll, jest, beforeEach } from '@jest/globals';
import { readFileSync } from 'fs';
import { CSharpParser } from '../../../src/parser/parser';
import { FileService } from '../../../src/services/fileService';
import { ParsedClass, ParsedEnum } from '../../../src/parser/types';
import { TypeScriptWriter } from '../../../src/output/typeScriptWriter';
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
    const result = await parser.parseSource(source, 'test.cs');
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

  it('should parse generic types and inter-class references', async () => {
    const source = `
      namespace MyNamespace {
        public class TestClass {
          public List<string> Items { get; set; }
          public Dictionary<int, string> Mappings { get; set; }
          public MyNamespace.OtherClass Reference { get; set; }
          public List<Dictionary<string, List<int>>> ComplexNested { get; set; }
        }
      }
    `;
    const result = await parser.parseSource(source, TEST_FILE_PATH);
    expect(result).toHaveLength(1);
    expect(result[0].fields).toHaveLength(4);
    expect(result[0].fields[0].type).toBe('List<string>');
    expect(result[0].fields[1].type).toBe('Dictionary<int, string>');
    expect(result[0].fields[2].type).toBe('MyNamespace.OtherClass');
    expect(result[0].fields[3].type).toBe('List<Dictionary<string, List<int>>>');
  });

  it('should parse generic class definitions with constraints', async () => {
    const source = `
      public class GenericClass<T, U> where T : class, IComparable where U : struct {
        public T Item { get; set; }
        public List<U> Items { get; set; }
      }
    `;
    const result = await parser.parseSource(source, TEST_FILE_PATH);
    expect(result).toHaveLength(1);
    expect(result[0].genericParameters).toEqual([
      { name: 'T', constraints: ['class', 'IComparable'] },
      { name: 'U', constraints: ['struct'] }
    ]);
    expect(result[0].fields).toHaveLength(2);
    expect(result[0].fields[0].type).toBe('T');
    expect(result[0].fields[1].type).toBe('List<U>');
  });

  it('should parse inherited and implemented types', async () => {
    const source = `
      public class DerivedClass : BaseClass, IInterface1, IInterface2<string> {
        public string Name { get; set; }
      }
    `;
    const result = await parser.parseSource(source, TEST_FILE_PATH);
    expect(result).toHaveLength(1);
    expect(result[0].baseClass).toBe('BaseClass');
    expect(result[0].interfaces).toEqual(['IInterface1', 'IInterface2<string>']);
  });

  it('should parse JSON structure comments', async () => {
    const code = `
      public class TestClass {
        /// <summary>
        /// The Json configuration for the service. This is a JSON object and should be formatted like so:
        /// <remarks>
        /// [{
        ///     "Name": "AccountNumber",
        ///     "DataType": "System.String",
        ///     "EmptyAllowed": false,
        ///     "CustomFormatter": null,
        ///     "TruncateToLength": 9,
        ///     "MinimumOutputLength": 9
        /// }]
        /// </remarks>
        /// </summary>
        [SettingKey("Service.Config.Fields")]
        public string ConfigFields { get; set; }
      }
    `;

    const result = await parser.parseSource(code, 'test.cs');
    expect(result).toBeDefined();
    expect(result).toHaveLength(1);
    
    const testClass = result[0];
    expect(testClass.fields).toHaveLength(1);
    
    const configField = testClass.fields[0];
    expect(configField.name).toBe('ConfigFields');
    expect(configField.documentation).toBeDefined();
    expect(configField.documentation).toContain('The Json configuration for the service');
    expect(configField.documentation).toContain('"Name": "AccountNumber"');
    expect(configField.documentation).toContain('"DataType": "System.String"');
    
    expect(configField.attributes).toHaveLength(1);
    expect(configField.attributes[0].name).toBe('SettingKey');
    expect(configField.attributes[0].arguments[0].value).toBe('"Service.Config.Fields"');
  });
});
