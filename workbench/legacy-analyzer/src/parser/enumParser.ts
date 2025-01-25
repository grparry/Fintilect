import Parser = require('web-tree-sitter');
import { ParsedEnum, ParsedEnumValue } from './types';
import { DocumentationParser } from './documentationParser';
import { Logger } from '../utils/logger';

export class EnumParser {
  private static logger = new Logger();

  public static parseEnum(node: Parser.SyntaxNode): ParsedEnum {
    const nameNode = node.childForFieldName('name');
    if (!nameNode) {
      throw new Error('Enum declaration missing name');
    }

    const enumValues: ParsedEnumValue[] = [];
    const valueList = node.childForFieldName('value_list');
    
    if (valueList) {
      for (const enumValueNode of valueList.namedChildren) {
        if (enumValueNode.type === 'enum_declaration_value') {
          const valueName = enumValueNode.childForFieldName('name')?.text;
          if (!valueName) continue;

          const valueNode = enumValueNode.childForFieldName('value');
          const enumValue: ParsedEnumValue = {
            name: valueName,
            value: valueNode ? valueNode.text : enumValues.length,
            documentation: DocumentationParser.getDocumentation(enumValueNode)
          };

          enumValues.push(enumValue);
        }
      }
    }

    return {
      name: nameNode.text,
      documentation: DocumentationParser.getDocumentation(node),
      values: enumValues
    };
  }

  public static async parseTopLevelEnums(node: Parser.SyntaxNode, filePath: string): Promise<void> {
    const enumNodes = this.findNodes(node, 'enum_declaration');
    for (const enumNode of enumNodes) {
      const parsedEnum = this.parseEnum(enumNode);
      // Add to enum registry
    }
  }

  private static findNodes(node: Parser.SyntaxNode, type: string): Parser.SyntaxNode[] {
    const nodes: Parser.SyntaxNode[] = [];
    if (node.type === type) {
      nodes.push(node);
    }
    for (const child of node.children) {
      nodes.push(...this.findNodes(child, type));
    }
    return nodes;
  }
}
