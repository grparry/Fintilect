import fs from 'fs-extra';
import path from 'path';
import { logger } from '../utils/logger';
import { ParsedClass } from '../parser/csharpParser';

export interface OutputOptions {
  outputDir: string;
  dataFile?: string;
  errorFile?: string;
}

export class OutputWriter {
  private readonly outputDir: string;
  private readonly dataFile: string;
  private readonly errorFile: string;
  private readonly lockFile: string;
  private hasWrittenHeader: boolean = false;

  constructor(options: OutputOptions) {
    this.outputDir = options.outputDir;
    this.dataFile = options.dataFile || 'legacy_field_data.md';
    this.errorFile = options.errorFile || 'legacy_file_errors.md';
    this.lockFile = path.join(this.outputDir, '.lock');
  }

  /**
   * Initialize output directory and files
   */
  public async initialize(): Promise<void> {
    try {
      // Create output directory if it doesn't exist
      await fs.ensureDir(this.outputDir);

      // Create files if they don't exist
      const dataPath = path.join(this.outputDir, this.dataFile);
      const errorPath = path.join(this.outputDir, this.errorFile);

      await fs.ensureFile(dataPath);
      await fs.ensureFile(errorPath);

      // Reset the header flag
      this.hasWrittenHeader = false;

      // Write the header to the data file
      const header = '| Namespace.Class | Field | Type | Setting Key | Validation Rules |\n' +
                    '|-----------------|--------|------|-------------|------------------|\n';
      await fs.writeFile(dataPath, header);
      this.hasWrittenHeader = true;

      logger.info(`Output directory initialized: ${this.outputDir}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error(`Failed to initialize output directory: ${errorMessage}`);
      throw error;
    }
  }

  /**
   * Write parsed class data to markdown file
   */
  public async writeClassData(classes: ParsedClass[]): Promise<void> {
    try {
      await this.acquireLock();

      const dataPath = path.join(this.outputDir, this.dataFile);
      let content = '';

      for (const parsedClass of classes) {
        content += this.formatClassData(parsedClass);
      }

      await fs.appendFile(dataPath, content);
      logger.info(`Class data written to ${dataPath}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error(`Failed to write class data: ${errorMessage}`);
      throw error;
    } finally {
      await this.releaseLock();
    }
  }

  /**
   * Write error information to error file
   */
  public async writeError(filePath: string, error: Error): Promise<void> {
    try {
      await this.acquireLock();

      const errorPath = path.join(this.outputDir, this.errorFile);
      const content = this.formatError(filePath, error);

      await fs.appendFile(errorPath, content);
      logger.info(`Error written to ${errorPath}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error(`Failed to write error: ${errorMessage}`);
      throw error;
    } finally {
      await this.releaseLock();
    }
  }

  /**
   * Format class data as markdown
   */
  private formatClassData(parsedClass: ParsedClass): string {
    let content = '';
    
    if (parsedClass.fields.length === 0) {
      return content;
    }

    const fullClassName = `${parsedClass.namespace || 'Global'}.${parsedClass.name}`;
    for (const field of parsedClass.fields) {
      const validationRules = field.validationRules?.join(', ') || '';
      content += `| ${fullClassName} | ${field.name} | ${field.type} | ${field.settingKey || ''} | ${validationRules} |\n`;
    }

    return content;
  }

  /**
   * Format error information as markdown
   */
  private formatError(filePath: string, error: Error): string {
    const timestamp = new Date().toISOString();
    const filename = path.basename(filePath);
    return `\n## Error in ${filename} (${timestamp})\n\n` +
           `**File:** ${filePath}\n` +
           `**Error:** ${error.message}\n\n` +
           `**Stack Trace:**\n\`\`\`\n${error.stack || 'No stack trace available'}\n\`\`\`\n\n`;
  }

  /**
   * Acquire lock for file operations
   */
  private async acquireLock(): Promise<void> {
    try {
      // Try to create lock file
      await fs.writeFile(this.lockFile, '', { flag: 'wx' });
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'EEXIST') {
        // Lock file exists, wait and retry
        await new Promise(resolve => setTimeout(resolve, 100));
        await this.acquireLock();
      } else {
        throw error;
      }
    }
  }

  /**
   * Release lock after file operations
   */
  private async releaseLock(): Promise<void> {
    try {
      await fs.remove(this.lockFile);
    } catch (error) {
      logger.warn(`Failed to release lock: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}
