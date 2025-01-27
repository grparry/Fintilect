import Parser = require('web-tree-sitter');
import logger from '@/utils/logger';
import path from 'path';
import { readFile } from 'fs/promises';
import { FileService } from '@/services/fileService';
import { ParsedClass } from '@/types';
import { ClassParser } from '@/classParser';
import { EnumParser } from '@/enumParser';

const logger2 = logger;

export class CSharpParser {
  private parser!: Parser;
  private tree!: Parser.Tree;
  private initialized: boolean = false;
  private enumTypes: Set<string> = new Set();
  private typeRegistry: Map<string, { sourceFile: string }> = new Map();
  sourceFile: string;

  constructor(private fileService: FileService) {
    this.sourceFile = '';
  }

  async init() {
    if (this.initialized) return;

    await Parser.init();
    this.parser = new Parser();
    const Lang = await Parser.Language.load(path.join(__dirname, '../../public/tree-sitter-c-sharp.wasm'));
    this.parser.setLanguage(Lang);
    this.initialized = true;
  }

  async locateFile(scriptName: string) {
    return this.fileService.locateFile(scriptName);
  }

  // Parse C# source code and extract class information
  async parseSource(source: string, filePath: string): Promise<ParsedClass[]> {
    await this.init();
    this.sourceFile = filePath;
    this.tree = this.parser.parse(source);

    // First pass: collect all enum types
    await this.parseTopLevelEnums(this.tree.rootNode, filePath);

    // Second pass: parse class declarations
    return this.parseClassDeclarations(this.tree.rootNode, filePath);
  }

  async parseFile(filePath: string): Promise<ParsedClass[]> {
    const source = await readFile(filePath, 'utf8');
    return this.parseSource(source, filePath);
  }

  async parseFiles(files: string[]): Promise<void> {
    for (const file of files) {
      await this.parseFile(file);
    }
  }

  async parseTopLevelEnums(node: Parser.SyntaxNode, filePath: string): Promise<void> {
    return EnumParser.parseTopLevelEnums(node, filePath);
  }

  async parseClassDeclarations(node: Parser.SyntaxNode, filePath: string): Promise<ParsedClass[]> {
    const classes: ParsedClass[] = [];
    const classNodes = this.findNodes(node, 'class_declaration');

    for (const classNode of classNodes) {
      try {
        const parsedClass = await ClassParser.parseClass(classNode);
        parsedClass.namespace = this.getNamespaceFromNode(classNode);
        parsedClass.sourceFile = filePath;
        classes.push(parsedClass);
      } catch (error) {
        logger2.error(`Error parsing class in ${filePath}:`, error);
      }
    }

    return classes;
  }

  // Find nodes of a specific type in the syntax tree
  private findNodes(node: Parser.SyntaxNode, type: string): Parser.SyntaxNode[] {
    const nodes: Parser.SyntaxNode[] = [];
    if (node.type === type) {
      nodes.push(node);
    }
    for (const child of node.children) {
      nodes.push(...this.findNodes(child, type));
    }
    return nodes;
  }

  private getNamespaceFromNode(node: Parser.SyntaxNode): string {
    const namespace = this.findNamespace(node);
    logger2.debug('Namespace resolution:', {
      node: node.type,
      foundNamespaces: namespace ? [namespace] : [],
      finalNamespace: namespace || ''
    });
    return namespace || '';
  }

  private findNamespace(node: Parser.SyntaxNode): string | undefined {
    if (!node.parent) return undefined;
    if (node.parent.type === 'namespace_declaration') {
      const nameNode = node.parent.childForFieldName('name');
      return nameNode ? nameNode.text : undefined;
    }
    return this.findNamespace(node.parent);
  }
}
