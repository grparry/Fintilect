import Parser = require('web-tree-sitter');
import logger from '../utils/logger';
import path from 'path';
import { readFile } from 'fs/promises';
import { ClassDocWriter } from '../output/classDocWriter'; // Import ClassDocWriter
import * as fs from 'fs/promises'; // Import fs/promises
import { FileService } from '../services/fileService'; // Import FileService

const logger2 = logger;

export interface ParsedClass {
  name: string;
  documentation?: string;
  namespace?: string;
  fields: ParsedField[];
  enums: ParsedEnum[];
  type: ParsedClassType;
  values?: ParsedEnumValue[];
  interfaces?: string[];
  attributes?: ParsedAttribute[];
  isAbstract?: boolean;
  isPublic?: boolean;
  sourceFile?: string;
  baseClass?: string;
}

export type ParsedClassType = 'class' | 'enum';

export interface ParsedField {
  name: string;
  type: string;
  documentation?: string;
  isNullable: boolean;
  settingKey?: string;
  isReadOnly: boolean;
  isPublic: boolean;
  sourceFile?: string;
  defaultValue?: string;
  attributes: ParsedAttribute[];
  validationRules: string[];
}

export interface ParsedAttribute {
  name: string;
  arguments: ParsedAttributeArgument[];
}

export interface ParsedAttributeArgument {
  name?: string;
  value: string;
}

export interface ParsedEnumValue {
  name: string;
  value: string | number;
}

export interface ParsedEnum {
  name: string;
  documentation?: string;
  values: ParsedEnumValue[];
  namespace?: string;
}

export class CSharpParser {
  private parser!: Parser;
  private tree!: Parser.Tree;
  private initialized: boolean = false;
  private enumTypes: Set<string> = new Set();
  private typeRegistry: Map<string, { sourceFile: string }> = new Map();

  constructor(private fileService: FileService) {}

  async init() {
    try {
      await Parser.init({
        locateFile(scriptName: string) {
          return path.resolve(__dirname, '../../public', scriptName);
        }
      });
      this.parser = new Parser();
      const wasmPath = path.resolve(__dirname, '../../public/tree-sitter-c-sharp.wasm');
      const Lang = await Parser.Language.load(wasmPath);
      this.parser.setLanguage(Lang);
      this.initialized = true;
      logger2.debug('Successfully initialized C# parser');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger2.error(`Failed to initialize C# parser: ${errorMessage}`);
      throw new Error(`Failed to initialize C# parser: ${errorMessage}`);
    }
  }

  /**
   * Parse C# source code and extract class information
   */
  public async parseSource(content: string, filePath: string): Promise<ParsedClass[]> {
    try {
      if (!this.initialized) {
        throw new Error('Parser not initialized');
      }

      // Parse the source code
      this.tree = await this.parser.parse(content);

      // Check for syntax errors
      if (this.tree.rootNode.hasError()) {
        throw new Error('Invalid C# syntax');
      }

      const classes: ParsedClass[] = [];

      // Parse top-level enums as classes
      const enumDeclarations = this.tree.rootNode.descendantsOfType('enum_declaration');

      logger2.info(`Found ${enumDeclarations.length} enum declarations in ${filePath}`);
      for (const enumDecl of enumDeclarations) {
        logger2.info(`Processing enum: ${enumDecl.text}`);
        const parsedEnum = this.parseEnum(enumDecl);
        logger2.info(`Parsed enum: ${parsedEnum.name}`);
        const namespace = this.getNamespaceFromNode(enumDecl);
        logger2.info(`Enum namespace: ${namespace}`);

        // Register the enum type with its namespace
        this.fileService.registerType(parsedEnum.name, namespace);

        const enumClass: ParsedClass = {
          name: parsedEnum.name,
          namespace: namespace,
          fields: [],
          interfaces: [],
          attributes: [],
          isAbstract: false,
          isPublic: true,
          documentation: parsedEnum.documentation || '',
          sourceFile: filePath,
          enums: [{
            name: parsedEnum.name,
            documentation: parsedEnum.documentation || '',
            values: parsedEnum.values,
            namespace: namespace
          }],
          type: 'enum',
          values: parsedEnum.values
        };
        await this.fileService.writeClassDoc(enumClass, filePath);
        classes.push(enumClass);
      }

      // Parse classes
      const classDeclarations = this.tree.rootNode.descendantsOfType('class_declaration');
      for (const classDecl of classDeclarations) {
        const parsedClass = await this.parseClass(classDecl);
        parsedClass.sourceFile = filePath;

        // Register the class type with its namespace
        if (parsedClass.namespace) {
          this.fileService.registerType(parsedClass.name, parsedClass.namespace);
          
          // Register any nested enum types
          for (const enumDef of parsedClass.enums) {
            this.fileService.registerType(enumDef.name, parsedClass.namespace);
          }
        }

        await this.fileService.writeClassDoc(parsedClass, filePath);
        classes.push(parsedClass);
      }

      return classes;
    } catch (error) {
      logger2.error(`Error parsing source: ${error}`);
      throw error;
    }
  }

  public async parseFile(filePath: string): Promise<ParsedClass[]> {
    const fileContent = await this.fileService.readFile(filePath);
    this.tree = await this.parser.parse(fileContent);

    const classes: ParsedClass[] = [];

    // Parse top-level enums as classes
    const enumDeclarations = this.tree.rootNode.descendantsOfType('enum_declaration')
      .filter(node => node.parent?.type === 'namespace_declaration');

    for (const enumDecl of enumDeclarations) {
      const parsedEnum = this.parseEnum(enumDecl);
      const namespace = this.getNamespaceFromNode(enumDecl);
      logger2.info(`Enum namespace: ${namespace}`);
      const enumClass: ParsedClass = {
        name: parsedEnum.name,
        namespace: namespace,
        fields: [],
        interfaces: [],
        attributes: [],
        isAbstract: false,
        isPublic: true,
        documentation: parsedEnum.documentation || '',
        sourceFile: filePath,
        enums: [{
          name: parsedEnum.name,
          documentation: parsedEnum.documentation || '',
          values: parsedEnum.values,
          namespace: namespace
        }],
        type: 'enum',
        values: parsedEnum.values
      };
      await this.fileService.writeClassDoc(enumClass, filePath);
      classes.push(enumClass);
    }

    // Parse classes
    const classDeclarations = this.tree.rootNode.descendantsOfType('class_declaration');
    for (const classDecl of classDeclarations) {
      const parsedClass = await this.parseClass(classDecl);
      parsedClass.sourceFile = filePath;
      classes.push(parsedClass);
    }

    return classes;
  }

  public async parseFiles(files: string[]): Promise<void> {
    // First pass - collect all type declarations and generate enum documentation
    for (const file of files) {
      logger2.info(`Processing file: ${path.basename(file)}`);
      try {
        const content = await readFile(file, 'utf8');
        this.tree = await this.parser.parse(content);

        // Collect all type declarations (classes, interfaces, enums)
        const typeDeclarations = [
          ...this.tree.rootNode.descendantsOfType('class_declaration'),
          ...this.tree.rootNode.descendantsOfType('interface_declaration'),
          ...this.tree.rootNode.descendantsOfType('enum_declaration'),
          ...this.tree.rootNode.descendantsOfType('struct_declaration')
        ];

        for (const typeDecl of typeDeclarations) {
          const typeName = typeDecl.children.find(child => child.type === 'identifier')?.text;
          if (typeName) {
            logger2.info(`Found type declaration: ${typeName} in ${path.basename(file)}`);
            this.typeRegistry.set(typeName, { sourceFile: file });
          }
        }

        // First phase: collect all enum types
        const enumDeclarations = this.tree.rootNode.descendantsOfType('enum_declaration');
        for (const enumDecl of enumDeclarations) {
          const parsedEnum = this.parseEnum(enumDecl);
          const namespace = this.getNamespaceFromNode(enumDecl);
          logger2.info(`Enum namespace: ${namespace}`);
          // Convert ParsedEnum to ParsedClass format
          const parsedClass: ParsedClass = {
            name: parsedEnum.name,
            namespace: namespace,
            fields: [],
            interfaces: [],
            attributes: [],
            isAbstract: false,
            isPublic: true,
            documentation: parsedEnum.documentation || '',
            sourceFile: file,
            enums: [{
              name: parsedEnum.name,
              documentation: parsedEnum.documentation || '',
              values: parsedEnum.values,
              namespace: namespace
            }],
            type: 'enum',
            values: parsedEnum.values
          };
          // Write both markdown and TypeScript files
          await this.fileService.writeClassDoc(parsedClass, file);
          await this.fileService.writeTypeScript(parsedClass);
          this.enumTypes.add(parsedEnum.name);
        }

        // Second phase: process class declarations
        await this.parseClassDeclarations(this.tree.rootNode, file);
        logger2.info(`Successfully processed ${path.basename(file)}`);
      } catch (error) {
        logger2.error(`Error parsing file ${file}:`, error);
        throw error;
      }
    }
    logger2.info('Analysis complete');
  }

  private async parseTopLevelEnums(node: Parser.SyntaxNode, filePath: string): Promise<void> {
    const enumDeclarations = node.descendantsOfType('enum_declaration');
    if (enumDeclarations.length > 0) {
      logger2.info(`Found ${enumDeclarations.length} enum declarations in ${filePath}`);
    }

    for (const enumDecl of enumDeclarations) {
      logger2.info(`Processing enum: ${enumDecl.text}`);
      const parsedEnum = this.parseEnum(enumDecl);
      logger2.info(`Parsed enum: ${parsedEnum.name}`);
      const namespace = this.getNamespaceFromNode(enumDecl);
      logger2.info(`Enum namespace: ${namespace}`);
      const enumClass: ParsedClass = {
        name: parsedEnum.name,
        namespace: namespace,
        fields: [],
        interfaces: [],
        attributes: [],
        isAbstract: false,
        isPublic: true,
        documentation: parsedEnum.documentation || '',
        sourceFile: filePath,
        enums: [{
          name: parsedEnum.name,
          documentation: parsedEnum.documentation || '',
          values: parsedEnum.values,
          namespace: namespace
        }],
        type: 'enum',
        values: parsedEnum.values
      };
      // Write both markdown and TypeScript files
      await this.fileService.writeClassDoc(enumClass, filePath);
      await this.fileService.writeTypeScript(enumClass);
      this.enumTypes.add(parsedEnum.name);
    }
  }

  private async parseEnumDeclarations(node: Parser.SyntaxNode, filePath: string): Promise<ParsedClass[]> {
    const enumDeclarations = node.descendantsOfType('enum_declaration');
    const classes: ParsedClass[] = [];

    logger2.info(`Found ${enumDeclarations.length} enum declarations in ${filePath}`);
    for (const enumDecl of enumDeclarations) {
      logger2.info(`Processing enum: ${enumDecl.text}`);
      const parsedEnum = this.parseEnum(enumDecl);
      logger2.info(`Parsed enum: ${parsedEnum.name}`);
      const namespace = this.getNamespaceFromNode(enumDecl);
      logger2.info(`Enum namespace: ${namespace}`);

      // Create a class representation of the enum
      const enumClass: ParsedClass = {
        name: parsedEnum.name,
        namespace: namespace,
        fields: [],
        interfaces: [],
        attributes: [],
        isAbstract: false,
        isPublic: true,
        documentation: parsedEnum.documentation || '',
        sourceFile: filePath,
        enums: [{
          name: parsedEnum.name,
          documentation: parsedEnum.documentation || '',
          values: parsedEnum.values,
          namespace: namespace
        }],
        type: 'enum',
        values: parsedEnum.values
      };

      // Write both class documentation and TypeScript definition
      await this.fileService.writeClassDoc(enumClass, filePath);
      await this.fileService.writeTypeScript(enumClass);
      this.enumTypes.add(parsedEnum.name);
      classes.push(enumClass);
    }

    return classes;
  }

  /**
   * Find nodes of a specific type in the syntax tree
   */
  private findNodes(node: Parser.SyntaxNode, type: string): Parser.SyntaxNode[] {
    const results: Parser.SyntaxNode[] = [];
    
    // Check the current node
    if (node.type === type) {
      results.push(node);
    }
    
    // Check all child nodes recursively
    for (const child of node.children) {
      results.push(...this.findNodes(child, type));
    }
    
    return results;
  }

  private getNamespaceFromNode(node: Parser.SyntaxNode): string {
    // Walk up the tree collecting all namespace declarations
    let current: Parser.SyntaxNode | null = node;
    const namespaces: string[] = [];

    while (current) {
      if (current.type === 'namespace_declaration') {
        const nameNode = current.childForFieldName('name');
        if (nameNode) {
          // Handle nested namespaces by concatenating all identifiers
          const identifiers = nameNode.descendantsOfType('identifier');
          const namespace = identifiers.map(id => id.text).join('.');
          namespaces.unshift(namespace); // Add to front since we're going up the tree
        }
      }
      current = current.parent;
    }

    // Log the namespace resolution process
    logger2.info('Namespace resolution:', {
      node: node.type,
      foundNamespaces: namespaces,
      finalNamespace: namespaces.join('.')
    });

    return namespaces.join('.');
  }

  private findNamespace(node: Parser.SyntaxNode): string | undefined {
    let current = node;
    while (current.parent) {
      current = current.parent;
      if (current.type === 'namespace_declaration') {
        const identifier = current.children.find(child => child.type === 'qualified_name');
        if (identifier) {
          return identifier.text;
        }
      }
    }
    return undefined;
  }

  /**
   * Parse a class node and extract its information
   */
  private async parseClass(node: Parser.SyntaxNode): Promise<ParsedClass> {
    const parsedClass = this.createEmptyClass(node);

    // Get class name
    const identifier = node.descendantsOfType('identifier')[0];
    if (identifier) {
      parsedClass.name = identifier.text;
    }

    // Get namespace using the more robust method
    parsedClass.namespace = this.getNamespaceFromNode(node);

    // Get class modifiers
    const modifiers = node.descendantsOfType('modifier');
    parsedClass.isPublic = modifiers.some(m => m.text === 'public');
    parsedClass.isAbstract = modifiers.some(m => m.text === 'abstract');

    // Get base class and interfaces
    const baseList = node.descendantsOfType('base_list')[0];
    if (baseList) {
      for (const baseType of baseList.descendantsOfType('base_type')) {
        const typeName = baseType.descendantsOfType('identifier')[0]?.text;
        if (typeName) {
          if (baseType.parent?.type === 'base_list') {
            parsedClass.baseClass = typeName;
          } else {
            parsedClass.interfaces.push(typeName);
          }
        }
      }
    }

    // Get class attributes
    const classAttributes = node.descendantsOfType('attribute_list')
      .filter(attrList => attrList.parent === node)
      .flatMap(attrList => this.parseAttributes(attrList));
    parsedClass.attributes = classAttributes;

    // Get enums
    const enumDeclarations = node.descendantsOfType('enum_declaration');
    for (const enumDecl of enumDeclarations) {
      const parsedEnum = this.parseEnum(enumDecl);
      parsedClass.enums.push(parsedEnum);
    }

    // Get properties (treat them as fields)
    const properties = node.descendantsOfType('property_declaration');
    for (const prop of properties) {
      const field = await this.parseField(prop);
      
      // Get property accessors
      const accessors = prop.descendantsOfType('accessor_declaration');
      field.isReadOnly = !accessors.some(a => a.descendantsOfType('set_keyword').length > 0);
      
      parsedClass.fields.push(field);
    }

    return parsedClass;
  }

  private createEmptyClass(node: Parser.SyntaxNode): ParsedClass {
    return {
      name: '',
      fields: [],
      enums: [],
      interfaces: [],
      attributes: [],
      isAbstract: false,
      isPublic: true,
      documentation: this.getDocumentation(node),
      sourceFile: '',
      type: 'class',
      values: []
    };
  }

  /**
   * Parse a single field node
   */
  private async parseField(node: Parser.SyntaxNode): Promise<ParsedField> {
    const field: ParsedField = {
      name: '',
      type: '',
      documentation: this.getDocumentation(node),
      isNullable: false,
      settingKey: undefined,
      isReadOnly: false,
      isPublic: false,
      sourceFile: undefined,
      defaultValue: undefined,
      attributes: [],
      validationRules: []
    };

    // Get field modifiers
    const modifiers = node.descendantsOfType('modifier');
    field.isPublic = modifiers.some(m => m.text === 'public');
    field.isReadOnly = modifiers.some(m => m.text === 'readonly');

    // Get field type and handle nullable types
    if (node.type === 'property_declaration') {
      // For properties, look for type in the property_declaration
      const typeNode = node.children.find(child => child.type === 'type');
      if (typeNode) {
        console.log('Found type node:', typeNode.toString());
        // Try to find the identifier in the type node
        const identifier = typeNode.children.find(child => 
          child.type === 'type_identifier' || 
          child.type === 'predefined_type'
        );
        if (identifier) {
          field.type = identifier.text;
          // Look up source file in type registry
          field.sourceFile = this.typeRegistry.get(field.type)?.sourceFile;
          console.log(`Found type through type node: ${field.type}`);
        }
      }
      
      if (!field.type) {
        // Try to find the identifier directly in the property declaration
        const identifier = node.children.find(child => 
          child.type === 'type_identifier' || 
          child.type === 'predefined_type'
        );
        if (identifier) {
          field.type = identifier.text;
          console.log(`Found type directly in property: ${field.type}`);
        } else {
          // Try to find the type in declaration_expression
          const declarationExpr = node.descendantsOfType('declaration_expression')[0];
          if (declarationExpr) {
            const typeIdentifier = declarationExpr.descendantsOfType('type_identifier')[0];
            if (typeIdentifier) {
              field.type = typeIdentifier.text;
              console.log(`Found type in declaration expression: ${field.type}`);
            }
          }
          
          // Try to find the type from the first identifier
          if (!field.type) {
            const firstIdentifier = node.children.find(child => child.type === 'identifier');
            if (firstIdentifier) {
              field.type = firstIdentifier.text;
              console.log(`Found type from first identifier: ${field.type}`);
            } else {
              console.log(`No type found for property ${field.name}`);
              // Log the AST for debugging
              console.log('Property AST:', node.toString());
              console.log('Property children:', node.children.map(c => `${c.type}: ${c.text}`).join(', '));
            }
          }
        }
      }
    } else {
      const typeNode = node.descendantsOfType('type_identifier')[0] || 
                      node.descendantsOfType('predefined_type')[0];
      if (typeNode) {
        field.type = typeNode.text;
      }
    }
    
    if (field.type) {
      // Check for nullable types
      const nullableType = node.descendantsOfType('nullable_type')[0];
      if (nullableType) {
        field.isNullable = true;
      }

      // Check for array types
      const arrayType = node.descendantsOfType('array_type')[0];
      if (arrayType) {
        field.type = `${field.type}[]`;
      }

      // Check for generic types
      const genericType = node.descendantsOfType('generic_type')[0];
      if (genericType) {
        const typeArgs = genericType.descendantsOfType('type_identifier')
          .map(t => t.text)
          .slice(1); // Skip the base type
        if (typeArgs.length > 0) {
          field.type = `${field.type}<${typeArgs.join(', ')}>`;
        }
      }

      // Check if type is an enum
      if (field.type && this.enumTypes.has(field.type)) {
        field.type = `[${field.type}](../../../${field.type}.md)`;
      }
    }

    // Get field name from property declaration
    const identifiers = node.descendantsOfType('identifier');
    // Find the identifier that's not part of a type declaration or attribute
    const nameIdentifier = identifiers.find(id => {
      const parent = id.parent;
      if (!parent) return false;
      
      // Skip type identifiers
      if (parent.type === 'type_identifier') return false;
      
      // Skip attribute identifiers
      if (parent.type === 'attribute') return false;
      
      // Skip attribute arguments
      if (parent.type === 'attribute_argument') return false;
      
      return true;
    });
    if (nameIdentifier) {
      field.name = nameIdentifier.text;
    }

    // Get attributes specific to this property
    const attributeLists = node.descendantsOfType('attribute_list');
    for (const attrList of attributeLists) {
      for (const attr of attrList.descendantsOfType('attribute')) {
        const nameNode = attr.descendantsOfType('identifier')[0];
        if (!nameNode) continue;

        const parsedAttr: ParsedAttribute = {
          name: nameNode.text.replace('Attribute', ''),
          arguments: []
        };

        const argList = attr.descendantsOfType('attribute_argument_list')[0];
        if (argList) {
          for (const arg of argList.descendantsOfType('attribute_argument')) {
            const argNameNode = arg.descendantsOfType('name_equals')[0]?.descendantsOfType('identifier')[0];
            const valueNode = arg.descendantsOfType('string_literal')[0] || 
                            arg.descendantsOfType('numeric_literal')[0] ||
                            arg.descendantsOfType('boolean_literal')[0];

            if (valueNode) {
              let value = valueNode.text;
              // Remove existing quotes if present
              value = value.replace(/^["']|["']$/g, '');
              
              // Add quotes if not a number or boolean
              if (!value.match(/^[0-9]+$/) && !['true', 'false'].includes(value.toLowerCase())) {
                value = `"${value}"`;
              }
              
              parsedAttr.arguments.push({
                name: argNameNode?.text || '',
                value: value
              });
            }
          }
        }

        field.attributes.push(parsedAttr);
      }
    }

    // Extract setting key from attributes
    const settingKeyAttr = field.attributes.find(attr => 
      attr.name === 'SettingKey' || attr.name === 'SettingKeyAttribute'
    );
    if (settingKeyAttr && settingKeyAttr.arguments.length > 0) {
      field.settingKey = settingKeyAttr.arguments[0].value.replace(/['"]/g, '');
    }

    // Extract validation rules from attributes
    const validationAttrs = this.extractValidationRules(field.attributes);
    field.validationRules = validationAttrs.map(rule => rule);

    return field;
  }

  private parseAttributes(node: Parser.SyntaxNode): ParsedAttribute[] {
    const attributes: ParsedAttribute[] = [];

    for (const attr of node.descendantsOfType('attribute')) {
      const nameNode = attr.descendantsOfType('identifier')[0];
      if (!nameNode) continue;

      const parsedAttr: ParsedAttribute = {
        name: nameNode.text.replace('Attribute', ''),
        arguments: []
      };

      const argList = attr.descendantsOfType('attribute_argument_list')[0];
      if (argList) {
        for (const arg of argList.descendantsOfType('attribute_argument')) {
          const argNameNode = arg.descendantsOfType('name_equals')[0]?.descendantsOfType('identifier')[0];
          const valueNode = arg.descendantsOfType('string_literal')[0] || 
                          arg.descendantsOfType('numeric_literal')[0] ||
                          arg.descendantsOfType('boolean_literal')[0];

          if (valueNode) {
            let value = valueNode.text;
            // Remove existing quotes if present
            value = value.replace(/^["']|["']$/g, '');
            
            // Add quotes if not a number or boolean
            if (!value.match(/^[0-9]+$/) && !['true', 'false'].includes(value.toLowerCase())) {
              value = `"${value}"`;
            }
            
            parsedAttr.arguments.push({
              name: argNameNode?.text || '',
              value: value
            });
          }
        }
      }

      // Check for duplicate attributes
      const existingAttr = attributes.find(a => a.name === parsedAttr.name);
      if (existingAttr) {
        existingAttr.arguments.push(...parsedAttr.arguments);
      } else {
        attributes.push(parsedAttr);
      }
    }

    return attributes;
  }

  private getDocumentation(node: Parser.SyntaxNode): string {
    const commentNodes: Parser.SyntaxNode[] = [];
    let currentNode: Parser.SyntaxNode | null = node;

    while (currentNode && currentNode.previousSibling) {
      currentNode = currentNode.previousSibling;
      if (currentNode.type === 'comment') {
        commentNodes.unshift(currentNode);
      } else if (currentNode.type !== 'line_break') {
        break;
      }
    }

    // Return raw comments, let the writer handle formatting
    return commentNodes
      .map((n: Parser.SyntaxNode) => n.text.trim())
      .join('\n');
  }

  private formatAttributeValue(value: string | undefined): string {
    if (!value) return '';
    value = value.replace(/['"]/g, '');
    if (value.startsWith('DataType.')) {
      return value.replace('DataType.', '');
    }
    return value;
  }

  private extractValidationRules(attributes: ParsedAttribute[]): string[] {
    const rules: string[] = [];
    
    // First, get the display name if present
    const displayAttr = attributes.find(attr => attr.name === 'Display');
    const displayName = this.formatAttributeValue(displayAttr?.arguments.find(arg => arg.name === 'Name' || !arg.name)?.value) || 'Field';
    
    for (const attr of attributes) {
      switch (attr.name) {
        case 'Required':
          const errorMsg = this.formatAttributeValue(attr.arguments.find(arg => arg.name === 'ErrorMessage')?.value);
          rules.push(`${displayName} is required${errorMsg ? `: ${errorMsg}` : ''}`);
          break;
        case 'Range':
          const min = this.formatAttributeValue(attr.arguments.find(arg => arg.name === 'Minimum' || !arg.name)?.value);
          const max = this.formatAttributeValue(attr.arguments.find(arg => arg.name === 'Maximum' || (!arg.name && attr.arguments[1]?.value))?.value);
          if (min && max) {
            rules.push(`${displayName} must be between ${min} and ${max}`);
          }
          break;
        case 'StringLength':
          const minLength = this.formatAttributeValue(attr.arguments.find(arg => arg.name === 'MinimumLength')?.value);
          const maxLength = this.formatAttributeValue(attr.arguments.find(arg => !arg.name)?.value);
          const lengthError = this.formatAttributeValue(attr.arguments.find(arg => arg.name === 'ErrorMessage')?.value);
          if (minLength || maxLength) {
            const error = lengthError?.replace(/\{0\}/g, displayName).replace(/\{2\}/g, minLength || '0');
            rules.push(`${error || `${displayName} length ${minLength ? `must be at least ${minLength}` : ''}${minLength && maxLength ? ' and ' : ''}${maxLength ? `cannot exceed ${maxLength}` : ''} characters`}`);
          }
          break;
        case 'RegularExpression':
          const pattern = this.formatAttributeValue(attr.arguments.find(arg => !arg.name)?.value);
          const regexError = this.formatAttributeValue(attr.arguments.find(arg => arg.name === 'ErrorMessage')?.value);
          if (pattern) {
            rules.push(`${displayName} must match pattern: ${pattern}${regexError ? ` (${regexError})` : ''}`);
          }
          break;
        case 'DataType':
          const dataType = this.formatAttributeValue(attr.arguments.find(arg => !arg.name)?.value);
          if (dataType) {
            switch (dataType.toLowerCase()) {
              case 'emailaddress':
                rules.push(`${displayName} must be a valid email address`);
                break;
              case 'password':
                rules.push(`${displayName} must be a valid password`);
                break;
              case 'phonenumber':
                rules.push(`${displayName} must be a valid phone number`);
                break;
              case 'url':
                rules.push(`${displayName} must be a valid URL`);
                break;
              case 'date':
                rules.push(`${displayName} must be a valid date`);
                break;
              default:
                rules.push(`${displayName} must be a valid ${dataType.toLowerCase()}`);
            }
          }
          break;
        case 'MinLength':
          const minLen = this.formatAttributeValue(attr.arguments.find(arg => !arg.name)?.value);
          if (minLen) {
            rules.push(`${displayName} must be at least ${minLen} characters`);
          }
          break;
        case 'MaxLength':
          const maxLen = this.formatAttributeValue(attr.arguments.find(arg => !arg.name)?.value);
          if (maxLen) {
            rules.push(`${displayName} cannot exceed ${maxLen} characters`);
          }
          break;
        case 'Compare':
          const compareField = this.formatAttributeValue(attr.arguments.find(arg => !arg.name)?.value);
          const compareError = this.formatAttributeValue(attr.arguments.find(arg => arg.name === 'ErrorMessage')?.value);
          if (compareField) {
            rules.push(`${displayName} must match ${compareField}${compareError ? `: ${compareError}` : ''}`);
          }
          break;
        case 'SettingKey':
          const settingKey = this.formatAttributeValue(attr.arguments.find(arg => !arg.name)?.value);
          if (settingKey) {
            rules.push(`Setting key: ${settingKey}`);
          }
          break;
      }
    }
    
    return rules;
  }

  private formatAttribute(attr: ParsedAttribute): string {
    const args = attr.arguments.map(arg => {
      const value = this.formatAttributeValue(arg.value);
      return arg.name ? `${arg.name} = "${value}"` : `"${value}"`;
    });
    return `[${attr.name}${args.length ? `(${args.join(', ')})` : ''}]`;
  }

  private parseEnum(node: Parser.SyntaxNode): ParsedEnum {
    const name = node.children.find(child => child.type === 'identifier')?.text || '';
    const documentation = this.getDocumentation(node);
    const values: ParsedEnumValue[] = [];
    
    // Find the enum_member_declaration nodes
    const enumMembers = node.descendantsOfType('enum_member_declaration');
    
    // Process each enum member
    enumMembers.forEach((member, index) => {
      const memberName = member.children.find(child => child.type === 'identifier')?.text || '';
      
      // Find the value if explicitly assigned
      const equalsToken = member.children.find(child => child.type === '=');
      let value: string | number = index; // Default to index if no explicit value
      
      if (equalsToken) {
        const valueNode = member.children[member.children.indexOf(equalsToken) + 1];
        if (valueNode) {
          if (valueNode.type === 'number_literal') {
            value = parseInt(valueNode.text);
          } else {
            value = valueNode.text;
          }
        }
      }
      
      values.push({ name: memberName, value });
    });
    
    return { name, documentation, values, namespace: this.getNamespaceFromNode(node) };
  }

  private async parseClassDeclarations(node: Parser.SyntaxNode, filePath: string): Promise<ParsedClass[]> {
    const classes: ParsedClass[] = [];
    const classDeclarations = node.descendantsOfType('class_declaration');

    for (const classDecl of classDeclarations) {
      const className = classDecl.children.find(child => child.type === 'identifier')?.text;
      if (!className) continue;

      logger2.info(`Processing file: ${path.basename(filePath)}`);

      const parsedClass = await this.parseClass(classDecl);
      if (parsedClass) {
        parsedClass.sourceFile = filePath;
        classes.push(parsedClass);
        await this.fileService.writeClassDoc(parsedClass, filePath);
      }
    }

    return classes;
  }
}
