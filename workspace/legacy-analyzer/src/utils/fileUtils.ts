import path from 'path';

/**
 * Checks if a file has a .cs extension
 * @param filePath Path to the file
 * @returns boolean indicating if the file is a C# file
 */
export function isCSharpFile(filePath: string): boolean {
  return path.extname(filePath).toLowerCase() === '.cs';
}

/**
 * Gets the relative path from a base directory
 * @param basePath Base directory path
 * @param fullPath Full file path
 * @returns Relative path from base directory
 */
export function getRelativePath(basePath: string, fullPath: string): string {
  return path.relative(basePath, fullPath);
}
