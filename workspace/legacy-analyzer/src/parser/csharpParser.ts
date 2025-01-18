import Parser = require('web-tree-sitter');
import path from 'path';
import { getLogger } from '../utils/logger';

const logger = getLogger('csharpParser.ts', 'CSharpParser');

export interface ParsedClass {
  name: string;
  namespace?: string;
  fields: ParsedField[];
}

export interface ParsedField {
  name: string;
  type: string;
  settingKey?: string;
  validationRules: string[];
}

export class CSharpParser {
  private parser!: Parser;
  private tree!: Parser.Tree;
  private initialized: boolean = false;

  constructor() {}

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
      logger.debug('Successfully initialized C# parser');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error(`Failed to initialize C# parser: ${errorMessage}`);
      throw new Error(`Failed to initialize C# parser: ${errorMessage}`);
    }
  }

  /**
   * Parse C# source code and extract class information
   */
  public async parseSource(source: string, filename?: string): Promise<ParsedClass[]> {
    try {
      if (!this.initialized) {
        throw new Error('Parser not initialized');
      }

      // Parse the source code
      this.tree = this.parser.parse(source);

      // Check for syntax errors
      if (this.tree.rootNode.hasError()) {
        throw new Error('Invalid C# syntax');
      }

      const classes = this.findNodes(this.tree.rootNode, 'class_declaration');
      logger.debug('Found classes', { count: classes.length, filename });

      const parsedClasses: ParsedClass[] = [];
      for (const classNode of classes) {
        const parsedClass = await this.parseClass(classNode);
        if (filename) {
          logger.debug('Parsed class', { filename, className: parsedClass.name, fieldCount: parsedClass.fields.length });
        }
        parsedClasses.push(parsedClass);
      }
      return parsedClasses;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error('Failed to parse source', { filename, error: errorMessage });
      throw error;
    }
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

  /**
   * Find the namespace for a node
   */
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
    const parsedClass: ParsedClass = {
      name: '',
      namespace: this.findNamespace(node),
      fields: []
    };

    // Get class name
    const identifier = node.children.find(child => child.type === 'identifier');
    if (identifier) {
      parsedClass.name = identifier.text;
    }

    // Find property declarations
    const declarations = node.children.find(child => child.type === 'declaration_list');
    if (declarations) {
      for (const child of declarations.children) {
        if (child.type === 'property_declaration') {
          const field = await this.parseField(child);
          if (field.name) {
            parsedClass.fields.push(field);
          }
        }
      }
    }

    return parsedClass;
  }

  /**
   * Parse a single field node
   */
  private async parseField(node: Parser.SyntaxNode): Promise<ParsedField> {
    const field: ParsedField = {
      name: '',
      type: '',
      settingKey: undefined,
      validationRules: [] // Initialize validationRules array
    };

    // Find all property-related nodes regardless of order
    const typeNode = node.childForFieldName('type');
    const nameNode = node.childForFieldName('name');
    const attributeNodes = this.findNodes(node, 'attribute');

    logger.debug(`Found ${attributeNodes.length} attributes for property`);

    // Extract property information if available
    if (typeNode) {
      field.type = typeNode.text;
      logger.debug('Found type:', field.type);
    }

    if (nameNode) {
      field.name = nameNode.text;
      logger.debug('Found name:', field.name);
    }

    // Process all attributes regardless of their location or order
    for (const attribute of attributeNodes) {
      const nameNode = attribute.firstNamedChild;
      if (!nameNode) continue;

      const name = nameNode.text;
      logger.debug('Processing attribute:', name);

      switch (name) {
        case 'SettingKey': {
          // Find argument list node anywhere in the attribute
          const argList = this.findNodes(attribute, 'attribute_argument_list')[0];
          if (argList) {
            // Find string literal node anywhere in the argument list
            const stringLit = this.findNodes(argList, 'string_literal')[0];
            if (stringLit) {
              field.settingKey = stringLit.text.slice(1, -1);
              logger.debug('Found setting key:', field.settingKey);
            }
          }
          break;
        }
        case 'RequiredValidation': {
          field.validationRules.push('RequiredValidation');
          logger.debug('Added validation rule: RequiredValidation');
          break;
        }
        default: {
          logger.debug('Ignoring unknown attribute:', name);
        }
      }
    }

    logger.debug('Completed field parsing:', field);
    return field;
  }
}
