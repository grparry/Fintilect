import fs from 'fs-extra';
import path from 'path';
import { ParsedClass, ParsedAttribute, ParsedEnum, ParsedField, ParsedEnumValue } from '../parser/csharpParser';
import logger from '../utils/logger';
import { FileService } from '../services/fileService';

export class ClassDocWriter {
    constructor(private readonly fileService: FileService) {}

    /**
     * Write class documentation to markdown file
     */
    public async writeClassDoc(parsedClass: ParsedClass, sourceFilePath: string): Promise<void> {
        try {
            // Generate markdown documentation
            const markdown = this.generateClassMarkdown(parsedClass, sourceFilePath);
            
            // Write to class-specific file
            const relativePath = this.getClassOutputPath(parsedClass);
            await this.fileService.writeMarkdown(relativePath, markdown);
            
            logger.info(`Generated class documentation: ${parsedClass.name}`);
        } catch (error) {
            logger.error(`Error writing class doc: ${error}`);
            throw error;
        }
    }

    /**
     * Get the output path for a class
     */
    private getClassOutputPath(parsedClass: ParsedClass): string {
        const parts = [];
        
        // Add namespace parts
        if (parsedClass.namespace) {
            parts.push(...parsedClass.namespace.split('.'));
        } else {
            parts.push('Global');
        }
        
        // Add class name
        parts.push(`${parsedClass.name}.md`);
        
        // Join with path separator and prepend classes directory
        return path.join('classes', ...parts);
    }

    private mapCSharpTypeToTypeScript(csharpType: string): string {
        const typeMap: { [key: string]: string } = {
            'string': 'string',
            'int': 'number',
            'long': 'number',
            'double': 'number',
            'float': 'number',
            'decimal': 'number',
            'bool': 'boolean',
            'DateTime': 'Date',
            'DateTimeOffset': 'Date',
            'Guid': 'string',
            'object': 'any',
            'dynamic': 'any',
            'void': 'void'
        };

        // Handle arrays
        if (csharpType.endsWith('[]')) {
            const baseType = csharpType.slice(0, -2);
            return `${this.mapCSharpTypeToTypeScript(baseType)}[]`;
        }

        // Handle nullable types
        if (csharpType.startsWith('Nullable<') && csharpType.endsWith('>')) {
            const innerType = csharpType.slice(9, -1);
            return `${this.mapCSharpTypeToTypeScript(innerType)} | null`;
        }

        // Handle generic types
        if (csharpType.includes('<') && csharpType.endsWith('>')) {
            const match = csharpType.match(/^([^<]+)<(.+)>$/);
            if (match) {
                const baseType = match[1];
                const typeArgs = match[2].split(',').map(t => this.mapCSharpTypeToTypeScript(t.trim()));
                return `${baseType}<${typeArgs.join(', ')}>`;
            }
        }

        // Handle List<T> as Array<T>
        if (csharpType.startsWith('List<') && csharpType.endsWith('>')) {
            const innerType = csharpType.slice(5, -1);
            return `Array<${this.mapCSharpTypeToTypeScript(innerType)}>`;
        }

        // Handle Dictionary<K,V> as Record<K,V>
        if (csharpType.startsWith('Dictionary<') && csharpType.endsWith('>')) {
            const types = csharpType.slice(11, -1).split(',').map(t => t.trim());
            if (types.length === 2) {
                return `Record<${this.mapCSharpTypeToTypeScript(types[0])}, ${this.mapCSharpTypeToTypeScript(types[1])}>`;
            }
        }

        return typeMap[csharpType] || csharpType;
    }

    private formatAttributeValue(value: string | undefined): string {
        if (!value) return '';
        
        // Remove quotes if present
        value = value.replace(/^["']|["']$/g, '');
        
        // Handle DataType values
        if (value.startsWith('DataType.')) {
            value = value.replace('DataType.', '');
        }
        
        // Add quotes if not a number or boolean
        if (!value.match(/^[0-9]+$/) && !['true', 'false'].includes(value.toLowerCase())) {
            value = `"${value}"`;
        }
        
        return value;
    }

    private formatDocumentation(rawDocs: string): string {
        if (!rawDocs) return '';

        // Process XML comments
        const xmlComments = rawDocs
            .split('\n')
            .filter(text => text.startsWith('///'))
            .map(text => text.replace('///', '').trim())
            .join('\n');

        // Extract summary and remarks
        const summary = xmlComments.match(/<summary>([\s\S]*?)<\/summary>/)?.[1]?.trim() || '';
        const remarks = xmlComments.match(/<remarks>([\s\S]*?)<\/remarks>/)?.[1]?.trim() || '';

        // If no XML tags found, treat the entire comment as documentation
        if (!summary && !remarks && xmlComments) {
            return xmlComments;
        }

        // Combine summary and remarks
        const docs: string[] = [];
        if (summary) {
            docs.push(summary);
        }
        if (remarks) {
            docs.push('\n**Remarks:**\n' + remarks);
        }

        return docs.join('\n');
    }

    private formatValidationRules(attributes: ParsedAttribute[]): string[] {
        const rules: string[] = [];
        
        for (const attr of attributes) {
            switch (attr.name) {
                case 'Required':
                    rules.push('Required field');
                    break;
                case 'Range':
                    if (attr.arguments.length >= 2) {
                        rules.push(`Value must be between ${attr.arguments[0].value} and ${attr.arguments[1].value}`);
                    }
                    break;
                case 'StringLength':
                    if (attr.arguments.length >= 2) {
                        rules.push(`String length must be between ${attr.arguments[0].value} and ${attr.arguments[1].value}`);
                    }
                    break;
                case 'RegularExpression':
                    if (attr.arguments.length >= 1) {
                        rules.push(`Must match pattern: ${attr.arguments[0].value}`);
                    }
                    break;
                case 'EmailAddress':
                    rules.push('Must be a valid email address');
                    break;
                case 'Phone':
                    rules.push('Must be a valid phone number');
                    break;
                case 'Url':
                    rules.push('Must be a valid URL');
                    break;
                case 'MinLength':
                    if (attr.arguments.length >= 1) {
                        rules.push(`Minimum length: ${attr.arguments[0].value}`);
                    }
                    break;
                case 'MaxLength':
                    if (attr.arguments.length >= 1) {
                        rules.push(`Maximum length: ${attr.arguments[0].value}`);
                    }
                    break;
            }
        }

        return rules;
    }

    private generateFieldMarkdown(field: ParsedField, sourceFile: string): string[] {
        const lines: string[] = [];
        if (field.name) {
            lines.push(`### ${field.name}`);
            lines.push('');
            lines.push('```typescript');
            const tsType = this.mapCSharpTypeToTypeScript(field.type);
            lines.push(`type: ${tsType}${field.isNullable ? ' | null' : ''}`);
            if (sourceFile) {
                lines.push(`sourceFile: ${sourceFile}`);
            }
            lines.push(`visibility: ${field.isPublic ? 'public' : 'private'}`);
            if (field.isReadOnly) lines.push('modifier: readonly');
            if (field.defaultValue) lines.push(`default: ${field.defaultValue}`);
            lines.push('```');
            lines.push('');

            // Add validation rules if present
            const validationRules = this.formatValidationRules(field.attributes);
            if (validationRules.length > 0) {
                lines.push('**Validation Rules:**');
                lines.push('```');
                validationRules.forEach(rule => {
                    lines.push(`- ${rule}`);
                });
                lines.push('```');
                lines.push('');
            }

            // Add attributes if present (only once)
            if (field.attributes.length > 0) {
                lines.push('**Attributes:**');
                lines.push('```csharp');
                field.attributes.forEach(attr => {
                    const args = attr.arguments.map(arg => {
                        const value = this.formatAttributeValue(arg.value);
                        return arg.name ? `${arg.name} = ${value}` : value;
                    }).join(', ');
                    lines.push(`[${attr.name}${args ? `(${args})` : ''}]`);
                });
                lines.push('```');
                lines.push('');
            }
        }
        return lines;
    }

    private generateClassSummary(parsedClass: ParsedClass): string[] {
        const lines = [];

        // Add class name and modifiers
        let classLine = '';
        if (parsedClass.isAbstract) classLine += 'abstract ';
        if (parsedClass.isPublic) classLine += 'public ';
        classLine += `class ${parsedClass.name}`;
        lines.push(classLine);

        // Add interfaces
        if (parsedClass.interfaces?.length > 0) {
            lines.push(`implements: ${parsedClass.interfaces.join(', ')}`);
        }

        // Add base class if present
        if (parsedClass.baseClass) {
            lines.push(`extends: ${parsedClass.baseClass}`);
        }

        // Add attributes if present
        if (parsedClass.attributes?.length > 0) {
            lines.push('\nAttributes:');
            for (const attr of parsedClass.attributes) {
                lines.push(`- ${attr.name}${attr.arguments ? `(${attr.arguments})` : ''}`);
            }
        }

        return lines;
    }

    private generateClassMetadata(parsedClass: ParsedClass): string[] {
        const lines = [];

        // Add class name and modifiers
        let classLine = '';
        if (parsedClass.isAbstract) classLine += 'abstract ';
        if (parsedClass.isPublic) classLine += 'public ';
        classLine += `class ${parsedClass.name}`;
        lines.push(classLine);

        // Add interfaces
        if (parsedClass.interfaces?.length > 0) {
            lines.push(`implements: ${parsedClass.interfaces.join(', ')}`);
        }

        // Add base class if present
        if (parsedClass.baseClass) {
            lines.push(`extends: ${parsedClass.baseClass}`);
        }

        // Add attributes if present
        if (parsedClass.attributes?.length > 0) {
            lines.push('\nAttributes:');
            for (const attr of parsedClass.attributes) {
                const args = attr.arguments ? attr.arguments.map(arg => {
                    return typeof arg === 'string' ? `"${arg}"` : arg;
                }).join(', ') : '';
                lines.push(`- ${attr.name}${args ? `(${args})` : ''}`);
            }
        }

        return lines;
    }

    public generateClassMarkdown(parsedClass: ParsedClass, sourceFilePath: string): string {
        const lines: string[] = [];
        
        // Class name
        lines.push(`# ${parsedClass.name}`);
        lines.push('');
        
        // Namespace
        if (parsedClass.namespace) {
            lines.push(`**Namespace:** \`${parsedClass.namespace}\``);
            lines.push('');
        }

        // Source file
        if (parsedClass.sourceFile) {
            const relativePath = parsedClass.sourceFile.split('legacy-apis/')[1] || parsedClass.sourceFile;
            lines.push(`**Source File:** \`${relativePath}\``);
            lines.push('');
        }

        // Documentation
        if (parsedClass.documentation) {
            const formattedDocs = this.formatDocumentation(parsedClass.documentation);
            if (formattedDocs) {
                lines.push('## Documentation');
                lines.push('');
                lines.push(formattedDocs);
                lines.push('');
            }
        }

        // Class summary
        lines.push('## Class Summary');
        lines.push('');
        lines.push(...this.generateClassSummary(parsedClass));
        lines.push('');

        // Class metadata
        lines.push('## Class Metadata');
        lines.push('');
        lines.push('```typescript');
        lines.push(...this.generateClassMetadata(parsedClass));
        lines.push('```');
        lines.push('');

        // Class attributes
        if (parsedClass.attributes.length > 0) {
            lines.push('## Class Attributes');
            lines.push('');
            lines.push('```csharp');
            for (const attr of parsedClass.attributes) {
                const args = attr.arguments.map(arg => {
                    const value = this.formatAttributeValue(arg.value);
                    return arg.name ? `${arg.name} = ${value}` : value;
                }).join(', ');
                lines.push(`[${attr.name}${args ? `(${args})` : ''}]`);
            }
            lines.push('```');
            lines.push('');
        }
        
        // Properties section
        if (parsedClass.fields && parsedClass.fields.length > 0) {
            lines.push('## Properties');
            lines.push('');
            
            for (const field of parsedClass.fields) {
                lines.push(...this.generateFieldMarkdown(field, sourceFilePath));
            }
        }
        
        // Enums section
        if (parsedClass.enums && parsedClass.enums.length > 0) {
            lines.push('## Enums');
            lines.push('');
            
            for (const enumItem of parsedClass.enums) {
                // Enum header
                lines.push(`### ${enumItem.name}`);
                lines.push('');
                
                // Enum documentation
                if (enumItem.documentation) {
                    lines.push(enumItem.documentation);
                    lines.push('');
                }
                
                // Enum values
                lines.push('```typescript');
                for (const value of enumItem.values) {
                    lines.push(`    ${value.name} = ${value.value}`);
                }
                lines.push('```');
                lines.push('');
            }
        }
        
        return lines.join('\n');
    }

    public generateEnumMarkdown(enumDef: ParsedEnum, sourceFilePath: string, namespace?: string): string {
        const lines: string[] = [];
        lines.push(`# ${enumDef.name}\n`);
        lines.push(`**Source File:** \`${path.relative(process.cwd(), sourceFilePath)}\`\n`);

        if (namespace) {
            lines.push(`**Namespace:** \`${namespace}\`\n`);
        }

        if (enumDef.documentation) {
            const formattedDocs = this.formatDocumentation(enumDef.documentation);
            if (formattedDocs) {
                lines.push('## Documentation\n');
                lines.push(formattedDocs);
                lines.push('');
            }
        }

        lines.push('## Enum Values');
        lines.push('');
        lines.push('```typescript');
        lines.push(`enum ${enumDef.name} {`);
        for (const value of enumDef.values) {
            lines.push(`    ${value.name} = ${value.value}`);
        }
        lines.push('}');
        lines.push('```');
        
        return lines.join('\n');
    }
}
