import fs from 'fs-extra';
import path from 'path';
import logger from '../utils/logger';
import { ParsedClass } from '../parser/csharpParser';
import { ClassDocWriter } from './classDocWriter';
import { FileService } from '../services/fileService';
import { TypeScriptWriter } from './typeScriptWriter';
import { PathResolver } from './pathSystem/pathResolver';

export interface OutputOptions {
  outputDir: string;
  errorFile?: string;
  isTest?: boolean;
}

export class OutputWriter {
  private readonly outputDir: string;
  private readonly errorFile: string;
  private readonly lockFile: string;
  private classDocWriter: ClassDocWriter;
  private fileService: FileService;
  private readonly isTest: boolean;
  private pathResolver: PathResolver;

  constructor(options: OutputOptions) {
    this.outputDir = options.outputDir;
    this.errorFile = options.errorFile || 'legacy_file_errors.md';
    this.lockFile = path.join(this.outputDir, '.lock');
    this.isTest = options.isTest || false;
    this.fileService = new FileService(this.outputDir);
    this.classDocWriter = new ClassDocWriter(this.fileService);
    this.pathResolver = new PathResolver({ isTest: this.isTest });
  }

  /**
   * Initialize output directory and files
   */
  public async initialize(): Promise<void> {
    try {
      // Create output directory if it doesn't exist
      await this.fileService.ensureDir(this.outputDir);

      // Create error file if it doesn't exist
      const errorPath = path.join(this.outputDir, this.errorFile);
      await this.fileService.ensureFile(errorPath);

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
  public async writeClassData(parsedClass: ParsedClass, filePath: string): Promise<void> {
    try {
      const writer = new TypeScriptWriter(this.fileService, filePath, parsedClass.namespace || '', this.pathResolver);
      await writer.writeTypeDefinition(parsedClass, filePath);
      
      // Also write documentation
      const docPath = this.pathResolver.getTypeOutputPath(parsedClass).replace('.ts', '.md');
      await this.classDocWriter.writeClassDoc(parsedClass, docPath);
      
      logger.info(`Class data written for ${parsedClass.name}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error(`Failed to write class data: ${errorMessage}`);
      throw error;
    }
  }

  /**
   * Write error information to the error file
   */
  public async writeError(filePath: string, error: Error): Promise<void> {
    try {
      const errorPath = path.join(this.outputDir, this.errorFile);
      const errorContent = `\n## ${path.basename(filePath)}\nError: ${error.message}\n`;
      
      await fs.appendFile(errorPath, errorContent);
    } catch (appendError) {
      const errorMessage = appendError instanceof Error ? appendError.message : 'Unknown error';
      logger.error(`Failed to write error: ${errorMessage}`);
      throw appendError;
    }
  }

  /**
   * Acquire lock for file operations
   */
  private async acquireLock(): Promise<void> {
    try {
      // Try to create lock file
      await this.fileService.writeFile(this.lockFile, '', { flag: 'wx' });
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
      await this.fileService.remove(this.lockFile);
    } catch (error) {
      logger.warn(`Failed to release lock: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
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
}
