import Parser = require('web-tree-sitter');
import { ParsedAttribute, ParsedAttributeArgument } from './types';
import logger from '../utils/logger';

export class AttributeParser {
  private static logger = logger;

  public static parseAttributes(node: Parser.SyntaxNode): ParsedAttribute[] {
    const attributes: ParsedAttribute[] = [];
    
    AttributeParser.logger.debug('Parsing attributes for node:', {
      nodeType: node.type,
      nodeText: node.text
    });
    
    // Start with the current node and then traverse previous siblings
    let currentNode: Parser.SyntaxNode | null = node;
    
    // Helper function to parse an attribute node
    const parseAttribute = (attrNode: Parser.SyntaxNode) => {
      if (attrNode.type === 'attribute') {
        AttributeParser.logger.debug('Found attribute node:', {
          attrText: attrNode.text,
          children: attrNode.children.map(c => ({ type: c.type, text: c.text }))
        });

        const nameNode = attrNode.childForFieldName('name');
        if (!nameNode) return;

        const attribute: ParsedAttribute = {
          name: nameNode.text,
          arguments: []
        };

        // Look for arguments list
        const argumentList = attrNode.descendantsOfType('attribute_argument_list')[0];
        if (argumentList) {
          AttributeParser.logger.debug('Found argument list:', {
            argListText: argumentList.text,
            children: argumentList.namedChildren.map(c => ({ type: c.type, text: c.text }))
          });

          // Process each argument
          for (const argNode of argumentList.namedChildren) {
            if (argNode.type === 'attribute_argument') {
              const arg: ParsedAttributeArgument = {
                name: '',
                value: ''
              };

              // Look for string literals or other values
              const stringLiteral = argNode.descendantsOfType('string_literal')[0];
              if (stringLiteral) {
                arg.value = stringLiteral.text;
                AttributeParser.logger.debug('Found string literal:', { value: arg.value });
              } else {
                // If no string literal, use the entire argument text
                arg.value = argNode.text.trim();
                AttributeParser.logger.debug('Using raw argument text:', { value: arg.value });
              }

              // Look for argument name
              const nameNode = argNode.childForFieldName('name');
              if (nameNode) {
                arg.name = nameNode.text;
                AttributeParser.logger.debug('Found argument name:', { name: arg.name });
              }

              attribute.arguments.push(arg);
            }
          }
        }

        AttributeParser.logger.debug('Parsed attribute:', attribute);
        attributes.push(attribute);
      }
    };

    // If this is a property declaration, look for attributes in its children first
    if (currentNode.type === 'property_declaration') {
      AttributeParser.logger.debug('Searching property declaration children for attributes');
      for (const child of currentNode.children) {
        if (child.type === 'attribute_list') {
          AttributeParser.logger.debug('Found attribute list in property declaration:', {
            text: child.text,
            children: child.namedChildren.map(c => ({ type: c.type, text: c.text }))
          });
          for (const attrNode of child.namedChildren) {
            parseAttribute(attrNode);
          }
        }
      }
    }

    // Then look at previous siblings
    currentNode = currentNode.previousNamedSibling;
    while (currentNode) {
      if (currentNode.type === 'attribute_list') {
        AttributeParser.logger.debug('Found attribute list in previous sibling:', {
          text: currentNode.text,
          children: currentNode.namedChildren.map(c => ({ type: c.type, text: c.text }))
        });
        for (const attrNode of currentNode.namedChildren) {
          parseAttribute(attrNode);
        }
      }
      currentNode = currentNode.previousNamedSibling;
    }

    AttributeParser.logger.debug('Final parsed attributes:', attributes);
    return attributes;
  }

  public static formatAttributeValue(value: string | undefined): string {
    if (!value) return '';
    return value.replace(/^["']|["']$/g, '');  // Remove quotes
  }

  public static formatAttribute(attr: ParsedAttribute): string {
    const args = attr.arguments.map(arg => {
      if (arg.name) {
        return `${arg.name} = ${arg.value}`;
      }
      return arg.value;
    });
    return `[${attr.name}(${args.join(', ')})]`;
  }

  public static extractValidationRules(attributes: ParsedAttribute[]): string[] {
    const rules: string[] = [];
    for (const attr of attributes) {
      if (attr.name === 'Required') {
        rules.push('required');
      } else if (attr.name === 'MinLength' || attr.name === 'MaxLength') {
        const value = attr.arguments[0]?.value;
        if (value) {
          rules.push(`${attr.name.toLowerCase()}:${value}`);
        }
      }
    }
    return rules;
  }
}
