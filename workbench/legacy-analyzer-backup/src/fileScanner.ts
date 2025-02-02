import fs from 'fs-extra';
import path from 'path';
import logger from './utils/logger';
import { FileService } from './services/fileService';

export interface ScannerOptions {
  singleFilePath?: string;  // For testing single file processing
  recursive?: boolean;      // Whether to scan subdirectories
}

export interface ScanResult {
  filePath: string;
  error?: Error;
}

export class FileScanner {
  private basePath: string;
  private options: ScannerOptions;

  constructor(basePath: string, options: ScannerOptions = {}) {
    this.basePath = path.resolve(basePath);
    this.options = {
      recursive: true,
      ...options
    };
  }

  /**
   * Scans for C# files in the specified directory
   * @returns Array of file paths and any errors encountered
   */
  async scanForFiles(): Promise<ScanResult[]> {
    const results: ScanResult[] = [];

    try {
      // If single file mode is enabled, only process that file
      if (this.options.singleFilePath) {
        const fullPath = path.resolve(this.options.singleFilePath);
        if (await this.isValidFile(fullPath)) {
          results.push({ filePath: fullPath });
        } else {
          results.push({ 
            filePath: fullPath, 
            error: new Error('File is not a valid C# file or does not exist') 
          });
        }
        return results;
      }

      // Regular directory scanning mode
      await this.scanDirectory(this.basePath, results);
      logger.info(`Completed scanning directory: ${this.basePath}`);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error(`Error scanning directory: ${errorMessage}`);
      results.push({
        filePath: this.basePath,
        error: new Error(`Failed to scan directory: ${errorMessage}`)
      });
    }

    return results;
  }

  /**
   * Recursively scans a directory for C# files
   */
  private async scanDirectory(dirPath: string, results: ScanResult[]): Promise<void> {
    try {
      const entries = await fs.readdir(dirPath, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);

        if (entry.isDirectory() && this.options.recursive) {
          await this.scanDirectory(fullPath, results);
        } else if (entry.isFile()) {
          if (await this.isValidFile(fullPath)) {
            results.push({ filePath: fullPath });
            logger.debug(`Found C# file: ${fullPath}`);
          }
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error(`Error scanning directory ${dirPath}: ${errorMessage}`);
      results.push({
        filePath: dirPath,
        error: new Error(`Failed to scan directory: ${errorMessage}`)
      });
    }
  }

  /**
   * Checks if a file is a valid C# file and exists
   */
  private async isValidFile(filePath: string): Promise<boolean> {
    try {
      const exists = await fs.pathExists(filePath);
      return exists && filePath.endsWith('.cs');
    } catch (error) {
      logger.error(`Error checking file ${filePath}: ${error}`);
      return false;
    }
  }
}
