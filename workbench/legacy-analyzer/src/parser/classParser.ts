import Parser = require('web-tree-sitter');
import logger from '../utils/logger';
import { ParsedClass, ParsedField, ParsedGenericParameter } from './types';
import { DocumentationParser } from './documentationParser';
import { AttributeParser } from './attributeParser';
import { PathResolver } from '../output/pathSystem/pathResolver';
import path from 'path';

export class ClassParser {
  public static async parseClass(node: Parser.SyntaxNode, filePath: string, pathResolver: PathResolver): Promise<ParsedClass> {
    const parsedClass = await this.createEmptyClass(node, filePath, pathResolver);
    
    // Parse fields
    const propertyNodes = node.descendantsOfType('property_declaration');
    for (const propertyNode of propertyNodes) {
      parsedClass.fields.push(this.parseField(propertyNode));
    }

    return parsedClass;
  }

  public static async createEmptyClass(node: Parser.SyntaxNode, filePath: string, pathResolver: PathResolver): Promise<ParsedClass> {
    logger.debug(`Creating empty class for node: ${node.text}`);
    const nameNode = node.childForFieldName('name');
    if (!nameNode) {
      throw new Error('Class declaration missing name');
    }

    const modifiers = node.descendantsOfType('modifier');
    const isPublic = modifiers.some(m => m.text === 'public');
    const isAbstract = modifiers.some(m => m.text === 'abstract');

    // Parse base class and interfaces
    const baseList = node.descendantsOfType('base_list')[0];
    let baseClass: string | undefined;
    const interfaces: string[] = [];

    if (baseList) {
      for (const baseType of baseList.namedChildren) {
        const typeName = this.parseType(baseType);
        // First non-interface type is the base class
        if (!baseClass && !typeName.startsWith('I')) {
          baseClass = typeName;
        } else {
          interfaces.push(typeName);
        }
      }
    }

    // Parse generic parameters and constraints
    const genericParameters = await this.parseGenericParameters(node);

    // Parse namespace
    let namespace: string | undefined;
    let currentNode: Parser.SyntaxNode | null = node;
    while (currentNode) {
      if (currentNode.type === 'namespace_declaration') {
        const namespaceNameNode = currentNode.childForFieldName('name');
        if (namespaceNameNode) {
          namespace = namespaceNameNode.text;
          break;
        }
      }
      currentNode = currentNode.parent;
    }

    return {
      name: nameNode.text,
      documentation: DocumentationParser.getDocumentation(node),
      fields: [],
      enums: [],
      type: 'class',
      attributes: AttributeParser.parseAttributes(node),
      isPublic,
      isAbstract,
      baseClass,
      interfaces,
      genericParameters,
      namespace,
      outputDirectory: namespace ? this.getOutputDirectory(namespace, filePath) : undefined
    };
  }

  private static getOutputDirectory(namespace: string, filePath: string): string {
    // First try to get directory from namespace
    const parts = namespace.split('.');
    const configIndex = parts.findIndex(part => 
      part === 'ClientConfigurationModels'
    );
    
    if (configIndex !== -1 && configIndex < parts.length - 1) {
      // Get subdirectory parts after ClientConfigurationModels from namespace
      const subDirParts = parts.slice(configIndex + 1);
      return subDirParts.join('/');
    }
    
    // If no subdirectory in namespace, try to get it from file path
    const filePathParts = filePath.split('/');
    const modelsDirIndex = filePathParts.findIndex(part => 
      part === 'Psi.Models.ClientConfigurationModels'
    );
    
    if (modelsDirIndex !== -1 && modelsDirIndex < filePathParts.length - 2) {
      // Get subdirectory parts after Psi.Models.ClientConfigurationModels from file path
      // -2 because we want to exclude the filename itself
      const subDirParts = filePathParts.slice(modelsDirIndex + 1, -1);
      return subDirParts.join('/');
    }
    
    return '';
  }

  private static async parseGenericParameters(node: Parser.SyntaxNode): Promise<ParsedGenericParameter[]> {
    logger.debug(`Parsing generic parameters for node: ${node.text}`);
    logger.debug(`Node type: ${node.type}`);
    logger.debug(`Node children: ${JSON.stringify(node.children?.map(child => ({ type: child.type, text: child.text })), null, 2)}`);

    const typeParameterList = node.children?.find(child => child.type === 'type_parameter_list');
    if (!typeParameterList) {
      return [];
    }

    logger.debug(`Type parameter list: ${typeParameterList.text}`);
    logger.debug(`Type parameter list node: ${JSON.stringify(typeParameterList, null, 2)}`);

    const typeParameters = typeParameterList.children?.filter(child => child.type === 'type_parameter') || [];
    logger.debug(`Type parameters: ${JSON.stringify(typeParameters, null, 2)}`);

    const whereClauses = node.children?.filter(child => child.type === 'type_parameter_constraints_clause') || [];
    logger.debug(`Where clauses: ${JSON.stringify(whereClauses, null, 2)}`);

    return typeParameters.map(param => {
      const paramName = param.text;
      logger.debug(`Processing type parameter: ${JSON.stringify({ name: paramName, nodeType: param.type, text: param.text })}`);

      const constraints: string[] = [];

      // Get inline constraints from type parameter
      const paramConstraints = param.childForFieldName('constraint_list');
      if (paramConstraints) {
        logger.debug(`Found inline constraints: ${paramConstraints.text}`);
        for (const constraint of paramConstraints.namedChildren) {
          if (constraint.type === 'class_constraint') {
            constraints.push('class');
          } else if (constraint.type === 'struct_constraint') {
            constraints.push('struct');
          } else if (constraint.type === 'type_constraint') {
            const typeName = constraint.childForFieldName('type')?.text || constraint.text;
            constraints.push(typeName.trim());
          }
        }
      }

      // Find matching where clause for this parameter
      const whereClause = whereClauses.find(w => {
        const whereParam = w.children?.find(child => child.type === 'identifier')?.text;
        return whereParam === paramName;
      });

      if (whereClause) {
        logger.debug(`Found where clause for parameter: ${JSON.stringify({ name: paramName, clause: whereClause.text })}`);
        // Extract constraints, skipping 'where', identifier, and ':' nodes
        const constraintNodes = whereClause.children?.filter(child => 
          child.type === 'type_parameter_constraint'
        ) || [];
        
        for (const constraint of constraintNodes) {
          if (constraint.type === 'class_constraint') {
            constraints.push('class');
          } else if (constraint.type === 'struct_constraint') {
            constraints.push('struct');
          } else {
            const constraintText = constraint.text.trim();
            if (constraintText) {
              constraints.push(constraintText);
            }
          }
        }
      }

      const result = {
        name: paramName,
        constraints
      };

      logger.debug(`Final constraints for parameter: ${JSON.stringify(result)}`);
      return result;
    });
  }

  private static parseType(node: Parser.SyntaxNode): string {
    logger.debug('Parsing type node:', {
      type: node.type,
      text: node.text,
      children: node.namedChildren.map(c => ({ type: c.type, text: c.text }))
    });

    if (node.type === 'array_type') {
      const elementType = this.parseType(node.namedChildren[0]);
      return `${elementType}[]`;
    }

    if (node.type === 'generic_name') {
      const baseName = node.namedChildren[0].text;
      const typeArgs = node.descendantsOfType('type_argument_list')[0];
      
      if (typeArgs) {
        const args = typeArgs.namedChildren.map(arg => this.parseType(arg));
        return `${baseName}<${args.join(', ')}>`;
      }
      
      return baseName;
    }

    if (node.type === 'qualified_name') {
      return node.text; // Keep full namespace qualification
    }

    // For simple types (predefined_type, type_identifier, identifier)
    return node.text;
  }

  private static getModifiers(node: Parser.SyntaxNode): string[] {
    const modifiers: string[] = [];
    const modifierNodes = node.descendantsOfType('modifier');
    
    for (const modifierNode of modifierNodes) {
      modifiers.push(modifierNode.text);
    }
    
    return modifiers;
  }

  public static parseField(node: Parser.SyntaxNode): ParsedField {
    logger.debug('Parsing field node:', { type: node.type, text: node.text });
    
    const nameNode = node.childForFieldName('name');
    if (!nameNode) {
      throw new Error('Property declaration missing name');
    }
    
    const name = nameNode.text;
    const type = node.childForFieldName('type')?.text || '';
    const modifiers = this.getModifiers(node);
    const documentation = DocumentationParser.getDocumentation(node);
    const attributes = AttributeParser.parseAttributes(node);
    
    // For properties, look for backing field and implementation
    let propertyImplementation: ParsedField['propertyImplementation'] | undefined;
    if (node.type === 'property_declaration') {
      logger.debug('Found property declaration:', { name, type });
      
      // Parse accessors first
      const accessorList = node.childForFieldName('accessors');
      logger.debug('Found accessor list:', { 
        hasAccessors: !!accessorList,
        text: accessorList?.text
      });
      
      if (accessorList) {
        logger.debug('Accessor list details:', {
          type: accessorList.type,
          text: accessorList.text,
          children: accessorList.children?.map(c => ({
            type: c.type,
            text: c.text,
            namedChildren: c.namedChildren?.map(nc => ({
              type: nc.type,
              text: nc.text
            }))
          }))
        });

        const accessorDeclarations = accessorList.descendantsOfType('accessor_declaration');
        const getters = accessorDeclarations.filter(d => d.text.startsWith('get'));
        const setters = accessorDeclarations.filter(d => d.text.startsWith('set'));
        
        logger.debug('Found accessor declarations:', {
          getters: getters.map(g => ({ type: g.type, text: g.text })),
          setters: setters.map(s => ({ type: s.type, text: s.text }))
        });

        const getter = getters[0];
        const setter = setters[0];
        
        logger.debug('Found accessors:', {
          getter: getter?.text,
          setter: setter?.text
        });
        
        propertyImplementation = {
          accessors: {
            get: getter ? this.parseAccessorBody(getter) : '',
            set: setter ? this.parseAccessorBody(setter) : null
          }
        };
        
        // Look for backing field in parent class node
        const classNode = node.parent;
        if (classNode) {
          const fieldDeclarations = classNode.descendantsOfType('field_declaration');
          logger.debug('Found field declarations in class:', fieldDeclarations.map(f => ({
            type: f.type,
            text: f.text,
            fieldName: f.childForFieldName('name')?.text
          })));
          
          // Look for backing field with matching name pattern
          const backingFieldName = '_' + name.charAt(0).toLowerCase() + name.slice(1);
          const backingField = fieldDeclarations.find(f => {
            const declarator = f.descendantsOfType('variable_declarator')[0];
            const fieldName = declarator?.childForFieldName('identifier')?.text;
            logger.debug('Checking field as potential backing field:', {
              fieldName,
              backingFieldName,
              declaratorText: declarator?.text,
              identifierText: declarator?.childForFieldName('identifier')?.text,
              matches: fieldName === backingFieldName,
              declaratorChildren: declarator?.children?.map(c => ({
                type: c.type,
                text: c.text,
                fieldName: c.type === 'identifier' ? c.text : undefined
              }))
            });
            return fieldName === backingFieldName || declarator?.text === backingFieldName;
          });
          
          if (backingField) {
            logger.debug('Found backing field:', backingField.text);
            const declarator = backingField.descendantsOfType('variable_declarator')[0];
            const fieldType = backingField.childForFieldName('type')?.text || type;
            
            propertyImplementation.backingField = {
              name: declarator?.text || '',
              type: fieldType
            };
          }
        }
      }
    }
    
    return {
      name,
      type,
      documentationType: type,
      documentation,
      isNullable: type.includes('?'),
      isReadOnly: modifiers.includes('readonly'),
      isPublic: modifiers.includes('public'),
      attributes,
      validationRules: AttributeParser.extractValidationRules(attributes),
      propertyImplementation
    };
  }

  private static parseAccessorBody(node: Parser.SyntaxNode): string {
    logger.debug('Parsing accessor body for node:', {
      type: node.type,
      text: node.text,
      childCount: node.childCount
    });

    const bodyNode = node.namedChildren[0];
    if (!bodyNode) {
      return '';
    }

    logger.debug('Found body node:', {
      type: bodyNode.type,
      text: bodyNode.text,
      childCount: bodyNode.childCount,
      children: bodyNode.children?.map(c => ({
        type: c.type,
        text: c.text
      }))
    });

    // Look for a block node that contains the statement
    const blockNode = bodyNode.type === 'block' ? bodyNode : null;
    logger.debug('Block node search result:', {
      foundBlock: !!blockNode
    });

    // Find the statement within the block or directly
    const searchNode = blockNode || bodyNode;
    const statement = searchNode.children?.find(c => 
      c.type === 'return_statement' || 
      c.type === 'expression_statement'
    );

    logger.debug('Statement search result:', {
      foundStatement: !!statement,
      searchedInBlock: !!blockNode,
      statementType: statement?.type,
      statementText: statement?.text,
      statementChildren: statement?.children?.map(c => ({
        type: c.type,
        text: c.text
      }))
    });

    if (!statement) {
      return '';
    }

    logger.debug('Found statement:', {
      type: statement.type,
      text: statement.text,
      childCount: statement.childCount
    });

    // For return statements, get "return <value>;"
    if (statement.type === 'return_statement') {
      logger.debug('Parsed return value:', statement.text);
      return statement.text;
    }

    // For assignment statements like "_name = value;", get the full text
    if (statement.type === 'expression_statement') {
      logger.debug('Parsed assignment:', statement.text);
      return statement.text;
    }

    return '';
  }

  private static cleanTypeName(typeName: string, processArrays = true): string {
    // Remove any namespace qualifiers
    let cleanName = typeName.split('.').pop() || '';

    // Handle nullable types
    if (cleanName.endsWith('?')) {
      cleanName = cleanName.slice(0, -1);
    }

    // Handle array types if processArrays is true
    if (processArrays && cleanName.endsWith('[]')) {
      const baseType = this.cleanTypeName(cleanName.slice(0, -2), false);
      return `${baseType}[]`;
    }

    return cleanName;
  }
}
