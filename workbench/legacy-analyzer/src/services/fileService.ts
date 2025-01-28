import fs from 'fs-extra';
import path from 'path';
import logger from '../utils/logger';
import { ParsedClass } from '../parser/types';
import { ClassDocWriter } from '../output/classDocWriter';
import { TypeScriptWriter } from '../output/typeScriptWriter';

const logger2 = logger;

export class FileService {
  public typeScriptWriter?: TypeScriptWriter;

  constructor(private outputDir: string) {
    this.typeScriptWriter = new TypeScriptWriter(
      this,
      '',
      'Psi.Data.Models.ClientConfigurationModels'
    );
  }

  get outputDirectory(): string {
    return this.outputDir;
  }

  public getOutputDir(): string {
    return this.outputDir;
  }

  async writeMarkdown(relativePath: string, content: string): Promise<void> {
    try {
      const fullPath = path.join(this.outputDir, relativePath);
      await fs.mkdir(path.dirname(fullPath), { recursive: true });
      await fs.writeFile(fullPath, content);
      logger2.info(`Generated documentation: ${fullPath}`);
    } catch (error) {
      logger2.error(`Error writing markdown file: ${error}`);
      throw error;
    }
  }

  private async copyTemplateFile(templatePath: string, targetPath: string): Promise<void> {
    try {
      const fullTemplatePath = path.join(__dirname, '..', 'output', 'templates', templatePath);
      const fullTargetPath = path.join(this.outputDir, targetPath);
      
      // Ensure target directory exists
      await fs.mkdir(path.dirname(fullTargetPath), { recursive: true });
      
      // Read template content
      const content = await fs.readFile(fullTemplatePath, 'utf8');
      
      // Write to target location
      await fs.writeFile(fullTargetPath.replace('.template', ''), content);
      logger2.info(`Copied template ${templatePath} to ${targetPath}`);
    } catch (error) {
      logger2.error(`Error copying template file: ${error}`);
      throw error;
    }
  }

  async copyBaseTemplates(): Promise<void> {
    try {
      // Copy base JsonSetting class
      await this.copyTemplateFile(
        'base/JsonSetting.ts.template',
        'infrastructure/models/base/JsonSetting.ts'
      );

      // Copy settings types
      await this.copyTemplateFile(
        'base/settings.types.ts.template',
        'infrastructure/models/base/types.ts'
      );

      logger2.info('Successfully copied all base templates');
    } catch (error) {
      logger2.error(`Error copying base templates: ${error}`);
      throw error;
    }
  }

  async ensureOutputDirectory(): Promise<void> {
    try {
      await fs.mkdir(this.outputDir, { recursive: true });
      await fs.mkdir(path.join(this.outputDir, 'classes'), { recursive: true });
      await fs.mkdir(path.join(this.outputDir, 'infrastructure', 'models'), { recursive: true });
      
      // Copy base templates after creating directories
      await this.copyBaseTemplates();
      
      logger2.info(`Output directory initialized: ${this.outputDir}`);
    } catch (error) {
      logger2.error(`Error initializing output directory: ${error}`);
      throw error;
    }
  }

  public async readFile(filePath: string): Promise<string> {
    return await fs.readFile(filePath, 'utf-8');
  }

  async writeClassDoc(parsedClass: ParsedClass, sourceFilePath: string): Promise<void> {
    try {
      // Get namespace path components
      const namespaceComponents = parsedClass.namespace ? parsedClass.namespace.split('.') : [];
      
      // Create relative directory structure matching namespace
      const outputDir = path.join(this.outputDir, 'classes', ...namespaceComponents);
      await fs.mkdir(outputDir, { recursive: true });

      // Generate markdown content using ClassDocWriter
      const docWriter = new ClassDocWriter(this);
      const content = docWriter.generateClassMarkdown(parsedClass, sourceFilePath);

      // Write the class documentation
      const className = parsedClass.name;
      const outputPath = path.join(outputDir, `${className}.md`);
      await fs.writeFile(outputPath, content);

      logger2.info(`Generated documentation: ${outputPath}`);
    } catch (error) {
      logger2.error(`Error writing class documentation: ${error}`);
      throw error;
    }
  }

  async ensureFile(filePath: string): Promise<void> {
    try {
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, '', { flag: 'a' });
    } catch (error) {
      logger2.error(`Error ensuring file exists: ${error}`);
      throw error;
    }
  }

  async ensureDir(dirPath: string): Promise<void> {
    try {
      await fs.mkdir(dirPath, { recursive: true });
    } catch (error) {
      logger2.error(`Error ensuring directory exists: ${error}`);
      throw error;
    }
  }

  async writeFile(filePath: string, content: string, options?: any): Promise<void> {
    try {
      await fs.writeFile(filePath, content, options);
    } catch (error) {
      logger2.error(`Error writing file: ${error}`);
      throw error;
    }
  }

  async appendFile(filePath: string, content: string): Promise<void> {
    try {
      await fs.appendFile(filePath, content);
    } catch (error) {
      logger2.error(`Error appending to file: ${error}`);
      throw error;
    }
  }

  async remove(filePath: string): Promise<void> {
    try {
      await fs.unlink(filePath);
    } catch (error) {
      logger2.error(`Error removing file: ${error}`);
      throw error;
    }
  }

  public async writeTypeScript(classOrPath: string | ParsedClass, content?: string): Promise<void> {
    try {
      if (typeof classOrPath === 'string' && content !== undefined) {
        // Handle the case where we pass path and content
        const fullPath = path.join(this.outputDir, classOrPath);
        await fs.mkdir(path.dirname(fullPath), { recursive: true });
        await fs.writeFile(fullPath, content);
        logger2.info(`Generated TypeScript file: ${fullPath}`);
      } else if (typeof classOrPath === 'object') {
        // Handle the case where we pass a ParsedClass
        const parsedClass = classOrPath;
        if (this.typeScriptWriter) {
          this.typeScriptWriter.setCurrentFile(parsedClass.sourceFile || '');
          this.typeScriptWriter.setCurrentNamespace(parsedClass.namespace || '');
          if (parsedClass.type === 'enum') {
            await this.typeScriptWriter.writeEnumDefinition(parsedClass, parsedClass.sourceFile || '');
          } else {
            await this.typeScriptWriter.writeTypeDefinition(parsedClass, parsedClass.sourceFile || '');
          }
        }
      } else {
        throw new Error('Invalid arguments passed to writeTypeScript');
      }
    } catch (error) {
      logger2.error(`Error writing TypeScript file: ${error}`);
      throw error;
    }
  }

  async locateFile(scriptName: string): Promise<string> {
    // First check if file exists as is
    if (await this.fileExists(scriptName)) {
      return scriptName;
    }

    // Check in source directory
    const srcPath = path.join(this.outputDir, scriptName);
    if (await this.fileExists(srcPath)) {
      return srcPath;
    }

    throw new Error(`Could not locate file: ${scriptName}`);
  }

  private async fileExists(filePath: string): Promise<boolean> {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Register a type with its namespace
   */
  public registerType(typeName: string, namespace: string): void {
    logger2.info('Registering type in FileService:', {
      typeName,
      namespace
    });
    if (this.typeScriptWriter) {
      this.typeScriptWriter.registerType(typeName, namespace);
    }
  }
}
