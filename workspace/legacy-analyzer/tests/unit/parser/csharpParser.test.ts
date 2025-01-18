import '@jest/globals';
import { describe, expect, it, beforeAll, afterAll } from '@jest/globals';
import { CSharpParser } from '../../../src/parser/csharpParser';
import winston from 'winston';

describe('CSharpParser', () => {
  let parser: CSharpParser;

  beforeAll(async () => {
    parser = new CSharpParser();
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

  it('should parse a simple class', async () => {
    const source = `
using System;

namespace Test.Settings {
    public class SimpleSettings {
        public string Setting1 { get; set; }
    }
}`;

    const result = await parser.parseSource(source);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('SimpleSettings');
    expect(result[0].namespace).toBe('Test.Settings');
    expect(result[0].fields).toHaveLength(1);
    expect(result[0].fields[0].name).toBe('Setting1');
    expect(result[0].fields[0].type).toBe('string');
  });

  it('should parse SettingKey attributes', async () => {
    const source = `
using System;

namespace Test.Settings {
    public class SettingsWithKey {
        [SettingKey("test.setting")]
        public string Setting1 { get; set; }
    }
}`;

    const result = await parser.parseSource(source);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('SettingsWithKey');
    expect(result[0].namespace).toBe('Test.Settings');
    expect(result[0].fields).toHaveLength(1);
    expect(result[0].fields[0].name).toBe('Setting1');
    expect(result[0].fields[0].settingKey).toBe('test.setting');
  });

  it('should parse validation rules', async () => {
    const source = `
using System;

namespace Test.Settings {
    public class SettingsWithValidation {
        [RequiredValidation]
        public string Setting1 { get; set; }
    }
}`;

    const result = await parser.parseSource(source);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('SettingsWithValidation');
    expect(result[0].namespace).toBe('Test.Settings');
    expect(result[0].fields).toHaveLength(1);
    expect(result[0].fields[0].name).toBe('Setting1');
    expect(result[0].fields[0].validationRules).toContain('RequiredValidation');
  });

  it('should handle multiple classes', async () => {
    const source = `
using System;

namespace Test.Settings {
    public class Settings1 {
        public string Setting1 { get; set; }
    }

    public class Settings2 {
        public int Setting2 { get; set; }
    }
}`;

    const result = await parser.parseSource(source);
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('Settings1');
    expect(result[0].namespace).toBe('Test.Settings');
    expect(result[1].name).toBe('Settings2');
    expect(result[1].namespace).toBe('Test.Settings');
  });

  it('should handle class without namespace', async () => {
    const source = `
using System;

public class GlobalSettings {
    public string Setting1 { get; set; }
}`;

    const result = await parser.parseSource(source);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('GlobalSettings');
    expect(result[0].namespace).toBeUndefined();
    expect(result[0].fields).toHaveLength(1);
  });

  it('should handle invalid source code', async () => {
    const source = 'this is not valid C# code';
    
    await expect(parser.parseSource(source)).rejects.toThrow();
  });
});
