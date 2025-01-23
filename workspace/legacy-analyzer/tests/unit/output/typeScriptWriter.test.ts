import { describe, it, expect } from '@jest/globals';
import { TypeScriptWriter } from '../../../src/output/typeScriptWriter';
import { FileService } from '../../../src/services/fileService';
import { ParsedClass, ParsedField, ParsedEnum } from '../../../src/parser/types';
import { PathResolver } from '../../../src/output/pathSystem/pathResolver';
import path from 'path';

jest.mock('../../../src/services/fileService');
jest.mock('../../../src/output/pathSystem/pathResolver');

describe('TypeScriptWriter', () => {
  let writer: TypeScriptWriter;
  let fileService: jest.Mocked<FileService>;
  let pathResolver: jest.Mocked<PathResolver>;

  beforeEach(() => {
    // Create a properly typed mock for FileService
    const fileServiceMock = {
      exists: jest.fn(),
      mkdir: jest.fn(),
      getOutputDir: jest.fn().mockReturnValue('/test/output'),
      ensureDir: jest.fn(),
      writeMarkdown: jest.fn(),
      copyBaseTemplates: jest.fn(),
      ensureOutputDirectory: jest.fn(),
      outputDirectory: '/test/output',
      writeFile: jest.fn(),
      registerType: jest.fn()
    } as const;
    fileService = fileServiceMock as unknown as jest.Mocked<FileService>;

    // Create a properly typed mock for PathResolver
    const mockPathResolver = {
      getTypeOutputPath: jest.fn().mockReturnValue('test/output/path.ts'),
      getRelativeImportPath: jest.fn().mockImplementation((fromClass, toType) => {
        if (toType === 'ReferencedClass') return './ReferencedClass';
        if (toType === 'Status') return './Status';
        if (toType === 'Contact') return './Contact';
        if (toType === 'Address') return './Address';
        if (toType === 'MobileConfiguration') return './MobileConfigurations/MobileConfiguration';
        return null;
      }),
      getOutputDirectory: jest.fn(),
      getBaseModelsDirectory: jest.fn(),
      getOutputPath: jest.fn(),
      getImportPath: jest.fn(),
      findTypeInfo: jest.fn(),
      getRelativePath: jest.fn(),
      isTest: true,
      typeRegistry: new Map(),
      isInRootNamespace: jest.fn(),
      isInSubNamespace: jest.fn(),
      getNamespaceFromPath: jest.fn(),
      getNamespaceDirectory: jest.fn(),
      getTypeDirectory: jest.fn()
    } as unknown as jest.Mocked<PathResolver>;
    pathResolver = mockPathResolver;

    writer = new TypeScriptWriter(fileService, 'test.cs', 'Test.Namespace', pathResolver);
  });

  describe('writeTypeDefinition', () => {
    it('should write TypeScript interface for a simple class', async () => {
      const parsedClass: ParsedClass = {
        name: 'TestClass',
        namespace: 'Test.Namespace',
        fields: [
          {
            name: 'stringField',
            type: 'string',
            isNullable: false,
            isReadOnly: false,
            isPublic: true,
            attributes: [],
            documentation: 'A string field',
            validationRules: []
          },
          {
            name: 'numberField',
            type: 'int',
            isNullable: false,
            isReadOnly: false,
            isPublic: true,
            attributes: [],
            documentation: 'A number field',
            validationRules: []
          }
        ],
        type: 'class',
        enums: []
      };

      pathResolver.getTypeOutputPath
        .mockImplementation((parsedClass: ParsedClass | ParsedEnum, importingClass?: ParsedClass) => {
          return 'test/TestClass.ts';
        });

      fileService.getOutputDir.mockReturnValue('/output');
      fileService.ensureDir.mockResolvedValue();
      fileService.writeFile.mockResolvedValue();

      await writer.writeTypeDefinition(parsedClass, 'test.cs');

      expect(fileService.ensureDir).toHaveBeenCalledWith('/output/test');
      expect(fileService.writeFile).toHaveBeenCalled();
      const writtenContent = fileService.writeFile.mock.calls[0][1];
      expect(writtenContent).toContain('export interface TestClass');
      expect(writtenContent).toContain('stringField: string;');
      expect(writtenContent).toContain('numberField: number;');
    });

    it('should write TypeScript interface for a class with complex types', async () => {
      const parsedClass: ParsedClass = {
        name: 'ComplexClass',
        namespace: 'Test.Namespace',
        fields: [
          {
            name: 'arrayField',
            type: 'List<string>',
            isNullable: false,
            isReadOnly: false,
            isPublic: true,
            attributes: [],
            documentation: 'An array field',
            validationRules: []
          },
          {
            name: 'customTypeField',
            type: 'CustomType',
            isNullable: true,
            isReadOnly: false,
            isPublic: true,
            attributes: [],
            documentation: 'A custom type field',
            validationRules: []
          }
        ],
        type: 'class',
        enums: []
      };

      pathResolver.getTypeOutputPath
        .mockImplementation((parsedClass: ParsedClass | ParsedEnum, importingClass?: ParsedClass) => {
          return 'test/ComplexClass.ts';
        });

      fileService.getOutputDir.mockReturnValue('/output');
      fileService.ensureDir.mockResolvedValue();
      fileService.writeFile.mockResolvedValue();

      await writer.writeTypeDefinition(parsedClass, 'test.cs');

      expect(fileService.writeFile).toHaveBeenCalled();
      const writtenContent = fileService.writeFile.mock.calls[0][1];
      expect(writtenContent).toContain('export interface ComplexClass');
      expect(writtenContent).toContain('arrayField: string[];');
      expect(writtenContent).toContain('customTypeField?: CustomType;');
    });
  });

  describe('writeEnumDefinition', () => {
    it('should write TypeScript enum definition', async () => {
      const enumDef: ParsedEnum = {
        name: 'TestEnum',
        namespace: 'Test.Namespace',
        values: [
          { name: 'Value1', value: 0, documentation: 'First value' },
          { name: 'Value2', value: 1, documentation: 'Second value' }
        ]
      };

      pathResolver.getTypeOutputPath.mockReturnValue('test/TestEnum.ts');
      fileService.getOutputDir.mockReturnValue('/output');
      fileService.ensureDir.mockResolvedValue();
      fileService.writeFile.mockResolvedValue();

      await writer.writeEnumDefinition(enumDef, 'test.cs');

      expect(fileService.writeFile).toHaveBeenCalled();
      const writtenContent = fileService.writeFile.mock.calls[0][1];
      expect(writtenContent).toContain('export enum TestEnum');
      expect(writtenContent).toContain('Value1 = 0');
      expect(writtenContent).toContain('Value2 = 1');
    });
  });

  describe('Type mapping', () => {
    it('should correctly map C# types to TypeScript types', () => {
      const mappings = [
        { csharp: 'string', typescript: 'string' },
        { csharp: 'int', typescript: 'number' },
        { csharp: 'bool', typescript: 'boolean' },
        { csharp: 'List<string>', typescript: 'string[]' },
        { csharp: 'Dictionary<string, int>', typescript: 'Record<string, number>' }
      ];

      for (const mapping of mappings) {
        expect(writer.mapCSharpTypeToTypeScript(mapping.csharp)).toBe(mapping.typescript);
      }
    });
  });

  describe('Settings generation', () => {
    it('should generate settings group class', async () => {
      const parsedClass: ParsedClass = {
        name: 'TestSettings',
        namespace: 'Test.Namespace',
        fields: [
          {
            name: 'Setting1',
            type: 'string',
            isNullable: false,
            isReadOnly: false,
            isPublic: true,
            attributes: [
              {
                name: 'SettingKey',
                arguments: [{ name: '', value: '"Test.Setting1"' }]
              }
            ],
            documentation: 'First setting',
            validationRules: []
          }
        ],
        type: 'class',
        enums: []
      };

      pathResolver.getTypeOutputPath.mockReturnValue('test/TestSettings.ts');
      fileService.getOutputDir.mockReturnValue('/output');
      fileService.ensureDir.mockResolvedValue();
      fileService.writeFile.mockResolvedValue();

      await writer.writeTypeDefinition(parsedClass, 'test.cs');

      expect(fileService.writeFile).toHaveBeenCalled();
      const writtenContent = fileService.writeFile.mock.calls[0][1];
      expect(writtenContent).toContain('export class TestSettings implements ISettingsGroup');
      expect(writtenContent).toContain('static readonly metadata: ISettingsMetadata');
      expect(writtenContent).toContain('private _setting1: string;');
      expect(writtenContent).toContain('key: "TestSettings.Setting1"');
      expect(writtenContent).toContain('dataType: \'string\'');
      expect(writtenContent).toContain('label: "Setting1"');
    });
  });

  describe('JSON interface generation', () => {
    it('should generate JSON interface from example', () => {
      const jsonExample = `{
        "name": "test",
        "value": 123
      }`;

      const result = writer.generateJsonInterface(jsonExample);
      expect(result).toContain('export interface');
      expect(result).toContain('name: string;');
      expect(result).toContain('value: number;');
    });
  });

  describe('Class and Enum References', () => {
    it('should handle class references and generate correct imports', async () => {
      const referencedClass: ParsedClass = {
        name: 'ReferencedClass',
        namespace: 'Test.Models',
        fields: [
          {
            name: 'id',
            type: 'string',
            isNullable: false,
            isReadOnly: false,
            isPublic: true,
            attributes: [],
            documentation: 'The ID',
            validationRules: []
          }
        ],
        type: 'class',
        enums: []
      };

      const mainClass: ParsedClass = {
        name: 'MainClass',
        namespace: 'Test.Services',
        fields: [
          {
            name: 'reference',
            type: 'ReferencedClass',
            isNullable: false,
            isReadOnly: false,
            isPublic: true,
            attributes: [],
            documentation: 'Reference to another class',
            validationRules: []
          },
          {
            name: 'referenceList',
            type: 'List<ReferencedClass>',
            isNullable: false,
            isReadOnly: false,
            isPublic: true,
            attributes: [],
            documentation: 'List of references',
            validationRules: []
          }
        ],
        type: 'class',
        enums: []
      };

      pathResolver.getTypeOutputPath
        .mockImplementation((parsedClass: ParsedClass | ParsedEnum, importingClass?: ParsedClass) => {
          if ((parsedClass as ParsedClass).name === 'ReferencedClass') {
            return 'models/ReferencedClass.ts';
          }
          return 'services/MainClass.ts';
        });

      pathResolver.getRelativePath
        .mockImplementation((currentFile: string, typeName: string) => {
          return `./${typeName}`;
        });

      fileService.getOutputDir.mockReturnValue('/output');
      fileService.ensureDir.mockResolvedValue();
      fileService.writeFile.mockResolvedValue();

      await writer.writeTypeDefinition(referencedClass, 'ReferencedClass.cs');
      await writer.writeTypeDefinition(mainClass, 'MainClass.cs');

      const mainClassContent = fileService.writeFile.mock.calls
        .find(call => call[0].endsWith('MainClass.ts'))?.[1];

      expect(mainClassContent).toContain('import { ReferencedClass } from \'./ReferencedClass\';');
      expect(mainClassContent).toContain('reference: ReferencedClass;');
      expect(mainClassContent).toContain('referenceList: ReferencedClass[];');
    });

    it('should handle enum references and generate correct imports', async () => {
      const statusEnum: ParsedEnum = {
        name: 'Status',
        namespace: 'Test.Models',
        values: [
          { name: 'Active', value: 0, documentation: 'Active status' },
          { name: 'Inactive', value: 1, documentation: 'Second value' }
        ]
      };

      const classWithEnum: ParsedClass = {
        name: 'UserProfile',
        namespace: 'Test.Services',
        fields: [
          {
            name: 'status',
            type: 'Status',
            isNullable: false,
            isReadOnly: false,
            isPublic: true,
            attributes: [],
            documentation: 'User status',
            validationRules: []
          },
          {
            name: 'statusHistory',
            type: 'List<Status>',
            isNullable: false,
            isReadOnly: false,
            isPublic: true,
            attributes: [],
            documentation: 'History of status changes',
            validationRules: []
          }
        ],
        type: 'class',
        enums: []
      };

      pathResolver.getTypeOutputPath
        .mockImplementation((parsedClass: ParsedClass | ParsedEnum) => {
          if ((parsedClass as ParsedEnum).values) {
            return 'models/Status.ts';
          }
          return 'services/UserProfile.ts';
        });

      pathResolver.getRelativePath
        .mockImplementation((currentFile: string, typeName: string) => {
          return `./${typeName}`;
        });

      fileService.getOutputDir.mockReturnValue('/output');
      fileService.ensureDir.mockResolvedValue();
      fileService.writeFile.mockResolvedValue();

      await writer.writeEnumDefinition(statusEnum, 'Status.cs');
      await writer.writeTypeDefinition(classWithEnum, 'UserProfile.cs');

      const classContent = fileService.writeFile.mock.calls
        .find(call => call[0].endsWith('UserProfile.ts'))?.[1];

      expect(classContent).toContain('import { Status } from \'./Status\';');
      expect(classContent).toContain('status: Status;');
      expect(classContent).toContain('statusHistory: Status[];');
    });

    it('should handle nested type references', async () => {
      const addressClass: ParsedClass = {
        name: 'Address',
        namespace: 'Test.Models',
        fields: [
          {
            name: 'street',
            type: 'string',
            isNullable: false,
            isReadOnly: false,
            isPublic: true,
            attributes: [],
            documentation: 'Street address',
            validationRules: []
          }
        ],
        type: 'class',
        enums: []
      };

      const contactClass: ParsedClass = {
        name: 'Contact',
        namespace: 'Test.Models',
        fields: [
          {
            name: 'email',
            type: 'string',
            isNullable: false,
            isReadOnly: false,
            isPublic: true,
            attributes: [],
            documentation: 'Email address',
            validationRules: []
          },
          {
            name: 'address',
            type: 'Address',
            isNullable: false,
            isReadOnly: false,
            isPublic: true,
            attributes: [],
            documentation: 'Contact address',
            validationRules: []
          }
        ],
        type: 'class',
        enums: []
      };

      const userClass: ParsedClass = {
        name: 'User',
        namespace: 'Test.Services',
        fields: [
          {
            name: 'name',
            type: 'string',
            isNullable: false,
            isReadOnly: false,
            isPublic: true,
            attributes: [],
            documentation: 'User name',
            validationRules: []
          },
          {
            name: 'contact',
            type: 'Contact',
            isNullable: false,
            isReadOnly: false,
            isPublic: true,
            attributes: [],
            documentation: 'User contact info',
            validationRules: []
          },
          {
            name: 'alternateAddresses',
            type: 'List<Address>',
            isNullable: false,
            isReadOnly: false,
            isPublic: true,
            attributes: [],
            documentation: 'Alternate addresses',
            validationRules: []
          }
        ],
        type: 'class',
        enums: []
      };

      pathResolver.getTypeOutputPath
        .mockImplementation((parsedClass: ParsedClass | ParsedEnum) => {
          return `models/${(parsedClass as ParsedClass).name}.ts`;
        });

      pathResolver.getRelativePath
        .mockImplementation((currentFile: string, typeName: string) => {
          return `./${typeName}`;
        });

      fileService.getOutputDir.mockReturnValue('/output');
      fileService.ensureDir.mockResolvedValue();
      fileService.writeFile.mockResolvedValue();

      await writer.writeTypeDefinition(addressClass, 'Address.cs');
      await writer.writeTypeDefinition(contactClass, 'Contact.cs');
      await writer.writeTypeDefinition(userClass, 'User.cs');

      const userContent = fileService.writeFile.mock.calls
        .find(call => call[0].endsWith('User.ts'))?.[1];
      const contactContent = fileService.writeFile.mock.calls
        .find(call => call[0].endsWith('Contact.ts'))?.[1];

      expect(userContent).toContain('import { Contact } from \'./Contact\';');
      expect(userContent).toContain('import { Address } from \'./Address\';');
      expect(userContent).toContain('contact: Contact;');
      expect(userContent).toContain('alternateAddresses: Address[];');

      expect(contactContent).toContain('import { Address } from \'./Address\';');
      expect(contactContent).toContain('address: Address;');
    });
  });

  describe('Base Models Directory Imports', () => {
    it('should adjust import paths for files in the base models directory', async () => {
      const parsedClass: ParsedClass = {
        name: 'Settings',
        namespace: 'Test.Namespace',
        fields: [
          {
            name: 'mobileConfig',
            type: 'MobileConfiguration',
            isNullable: false,
            isReadOnly: false,
            isPublic: true,
            attributes: [],
            documentation: 'Mobile configuration settings',
            validationRules: []
          }
        ],
        type: 'class',
        enums: []
      };

      // Mock relative path behavior for base models directory
      pathResolver.getRelativeImportPath
        .mockImplementation((fromClass, toType) => {
          if (toType === 'MobileConfiguration') {
            return './MobileConfigurations/MobileConfiguration';
          }
          return './Settings';
        });

      pathResolver.getTypeOutputPath
        .mockImplementation((parsedClass: ParsedClass | ParsedEnum, importingClass?: ParsedClass) => {
          if (parsedClass.name === 'Settings') {
            return 'models/Settings.ts';
          }
          return 'models/MobileConfigurations/MobileConfiguration.ts';
        });

      fileService.getOutputDir.mockReturnValue('/output');
      fileService.ensureDir.mockResolvedValue();
      fileService.writeFile.mockResolvedValue();

      await writer.writeTypeDefinition(parsedClass, 'test.cs');

      expect(fileService.writeFile).toHaveBeenCalled();
      const writtenContent = fileService.writeFile.mock.calls[0][1];
      expect(writtenContent).toContain("import { MobileConfiguration } from './MobileConfigurations/MobileConfiguration';");
    });
  });

  describe('Import Path Generation', () => {
    it('should generate correct imports in root models directory', async () => {
      const parsedClass: ParsedClass = {
        name: 'Settings',
        namespace: 'Test.Namespace',
        fields: [
          {
            name: 'mobileConfig',
            type: 'MobileConfiguration',
            isNullable: false,
            isReadOnly: false,
            isPublic: true,
            attributes: [],
            documentation: 'Mobile configuration settings',
            validationRules: [],
            settingKey: 'Settings.MobileConfig'
          }
        ],
        type: 'class',
        enums: []
      };

      // Mock paths for root directory files
      pathResolver.getTypeOutputPath
        .mockImplementation((parsedClass: ParsedClass | ParsedEnum) => {
          if (parsedClass.name === 'Settings') {
            return 'infrastructure/models/Settings.ts';
          }
          return 'infrastructure/models/MobileConfigurations/MobileConfiguration.ts';
        });

      // Mock relative path behavior for base models directory
      pathResolver.getRelativeImportPath
        .mockImplementation((fromClass, toType) => {
          if (toType === 'Settings') {
            return './Settings';
          }
          return './MobileConfigurations/MobileConfiguration';
        });

      await writer.writeTypeDefinition(parsedClass, 'test.cs');

      expect(fileService.writeFile).toHaveBeenCalled();
      const writtenContent = fileService.writeFile.mock.calls[0][1];
      expect(writtenContent).toContain("import { MobileConfiguration } from './MobileConfigurations/MobileConfiguration';");
      expect(writtenContent).toContain('private _mobileConfig: MobileConfiguration;');
      expect(writtenContent).toContain('get mobileConfig(): MobileConfiguration');
      expect(writtenContent).toContain('set mobileConfig(value: MobileConfiguration)');
    });

    it('should generate correct imports in subdirectories', async () => {
      const parsedClass: ParsedClass = {
        name: 'AccountSettings',
        namespace: 'Test.Namespace.Account',
        fields: [
          {
            name: 'jointOwners',
            type: 'JointOwners',
            isNullable: false,
            isReadOnly: false,
            isPublic: true,
            attributes: [],
            documentation: 'Joint owners settings',
            validationRules: [],
            settingKey: 'AccountSettings.JointOwners'
          }
        ],
        type: 'class',
        enums: []
      };

      // Mock paths for subdirectory files
      pathResolver.getTypeOutputPath
        .mockImplementation((parsedClass: ParsedClass | ParsedEnum) => {
          if (parsedClass.name === 'AccountSettings') {
            return 'infrastructure/models/Account/AccountSettings.ts';
          }
          return 'infrastructure/models/Account/JointOwners.ts';
        });

      // Mock path resolution
      pathResolver.getRelativeImportPath
        .mockImplementation((fromClass, toType) => {
          return './JointOwners';
        });

      await writer.writeTypeDefinition(parsedClass, 'test.cs');

      expect(fileService.writeFile).toHaveBeenCalled();
      const writtenContent = fileService.writeFile.mock.calls[0][1];
      expect(writtenContent).toContain("import { JointOwners } from './JointOwners';");
      expect(writtenContent).toContain('private _jointOwners: JointOwners;');
      expect(writtenContent).toContain('get jointOwners(): JointOwners');
      expect(writtenContent).toContain('set jointOwners(value: JointOwners)');
    });

    it('should generate correct imports for cross-directory references', async () => {
      const parsedClass: ParsedClass = {
        name: 'AccountSettings',
        namespace: 'Test.Namespace.Account',
        fields: [
          {
            name: 'mobileConfig',
            type: 'MobileConfiguration',
            isNullable: false,
            isReadOnly: false,
            isPublic: true,
            attributes: [],
            documentation: 'Mobile configuration settings',
            validationRules: [],
            settingKey: 'AccountSettings.MobileConfig'
          }
        ],
        type: 'class',
        enums: []
      };

      // Mock paths for cross-directory references
      pathResolver.getTypeOutputPath
        .mockImplementation((parsedClass: ParsedClass | ParsedEnum) => {
          if (parsedClass.name === 'AccountSettings') {
            return 'infrastructure/models/Account/AccountSettings.ts';
          }
          return 'infrastructure/models/MobileConfigurations/MobileConfiguration.ts';
        });

      // Mock path resolution
      pathResolver.getRelativeImportPath
        .mockImplementation((fromClass, toType) => {
          return '../MobileConfigurations/MobileConfiguration';
        });

      await writer.writeTypeDefinition(parsedClass, 'test.cs');

      expect(fileService.writeFile).toHaveBeenCalled();
      const writtenContent = fileService.writeFile.mock.calls[0][1];
      expect(writtenContent).toContain("import { MobileConfiguration } from '../MobileConfigurations/MobileConfiguration';");
      expect(writtenContent).toContain('private _mobileConfig: MobileConfiguration;');
      expect(writtenContent).toContain('get mobileConfig(): MobileConfiguration');
      expect(writtenContent).toContain('set mobileConfig(value: MobileConfiguration)');
    });
  });

  describe('Import Generation', () => {
    it('should handle namespace qualified imports correctly', async () => {
      const parsedClass: ParsedClass = {
        name: 'TestClass',
        namespace: 'Test.Namespace',
        fields: [
          {
            name: 'reference',
            type: 'Institution.InstitutionSettings',
            isNullable: false,
            isReadOnly: false,
            isPublic: true,
            attributes: [],
            documentation: 'Reference to another class',
            validationRules: []
          }
        ],
        type: 'class',
        enums: []
      };

      await writer.writeTypeDefinition(parsedClass, '/test/source/file.cs');

      // Verify that the import statement is correct
      const writtenContent = fileService.writeFile.mock.calls[0][1];
      expect(writtenContent).toContain('import { InstitutionSettings } from \'./Institution.InstitutionSettings\';');
      expect(writtenContent).not.toContain('import { Institution.InstitutionSettings }');
    });

    it('should not generate imports for primitive or generic container types', async () => {
      const parsedClass: ParsedClass = {
        name: 'TestClass',
        namespace: 'Test.Namespace',
        fields: [
          {
            name: 'stringField',
            type: 'string',
            isNullable: false,
            isReadOnly: false,
            isPublic: true,
            attributes: [],
            documentation: '',
            validationRules: []
          },
          {
            name: 'boolField',
            type: 'bool',
            isNullable: false,
            isReadOnly: false,
            isPublic: true,
            attributes: [],
            documentation: '',
            validationRules: []
          },
          {
            name: 'dictionaryField',
            type: 'Dictionary<string, string>',
            isNullable: false,
            isReadOnly: false,
            isPublic: true,
            attributes: [],
            documentation: '',
            validationRules: []
          }
        ],
        type: 'class',
        enums: []
      };

      await writer.writeTypeDefinition(parsedClass, '/test/source/file.cs');

      // Verify that no primitive or generic container imports were generated
      const writtenContent = fileService.writeFile.mock.calls[0][1];
      expect(writtenContent).not.toContain('import { string }');
      expect(writtenContent).not.toContain('import { bool }');
      expect(writtenContent).not.toContain('import { Dictionary }');
      expect(writtenContent).not.toContain('import { Dictionary<string, string> }');
    });
  });

  describe('Primitive and Generic Type Handling', () => {
    it('should not generate imports for primitive types', async () => {
      const parsedClass: ParsedClass = {
        name: 'TestClass',
        namespace: 'Test.Namespace',
        fields: [
          { 
            name: 'BooleanField', 
            type: 'bool', 
            isNullable: false,
            isReadOnly: false,
            isPublic: true,
            attributes: [],
            documentation: '',
            validationRules: []
          },
          { 
            name: 'StringField', 
            type: 'string', 
            isNullable: false,
            isReadOnly: false,
            isPublic: true,
            attributes: [],
            documentation: '',
            validationRules: []
          },
          { 
            name: 'IntField', 
            type: 'int', 
            isNullable: false,
            isReadOnly: false,
            isPublic: true,
            attributes: [],
            documentation: '',
            validationRules: []
          },
          { 
            name: 'DateTimeField', 
            type: 'DateTime', 
            isNullable: false,
            isReadOnly: false,
            isPublic: true,
            attributes: [],
            documentation: '',
            validationRules: []
          }
        ],
        type: 'class',
        enums: []
      };

      await writer.writeTypeDefinition(parsedClass, '/test/source/file.cs');

      // Verify that no imports were generated for primitive types
      const writtenContent = fileService.writeFile.mock.calls[0][1];
      
      // Only base imports should be present
      expect(writtenContent.match(/import/g)?.length).toBe(1);
      expect(writtenContent).toContain('import { Setting, ISettingsGroup, ISettingsMetadata } from \'@models/base/types\';');
    });

    it('should not generate imports for generic collection types', async () => {
      const parsedClass: ParsedClass = {
        name: 'TestClass',
        namespace: 'Test.Namespace',
        fields: [
          { 
            name: 'StringList', 
            type: 'List<string>', 
            isNullable: false,
            isReadOnly: false,
            isPublic: true,
            attributes: [],
            documentation: '',
            validationRules: []
          },
          { 
            name: 'IntArray', 
            type: 'IEnumerable<int>', 
            isNullable: false,
            isReadOnly: false,
            isPublic: true,
            attributes: [],
            documentation: '',
            validationRules: []
          },
          { 
            name: 'StringDictionary', 
            type: 'Dictionary<string, string>', 
            isNullable: false,
            isReadOnly: false,
            isPublic: true,
            attributes: [],
            documentation: '',
            validationRules: []
          },
          { 
            name: 'ComplexDictionary', 
            type: 'Dictionary<string, ReferencedClass>', 
            isNullable: false,
            isReadOnly: false,
            isPublic: true,
            attributes: [],
            documentation: '',
            validationRules: []
          }
        ],
        type: 'class',
        enums: []
      };

      await writer.writeTypeDefinition(parsedClass, '/test/source/file.cs');

      // Verify no imports for generic containers
      const genericContent = fileService.writeFile.mock.calls[0][1];
      
      // Only base imports and ReferencedClass should be present
      expect(genericContent.match(/import/g)?.length).toBe(2);
      expect(genericContent).toContain('import { Setting, ISettingsGroup, ISettingsMetadata } from \'@models/base/types\';');
      expect(genericContent).toContain('import { ReferencedClass } from \'./ReferencedClass\';');
    });
  });
});
