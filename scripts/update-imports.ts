import * as fs from 'fs';
import * as path from 'path';

// Function to update imports in a file
async function updateImports(filePath: string): Promise<void> {
  const content = await fs.promises.readFile(filePath, 'utf8');
  const packageName = getPackageNameFromPath(filePath);
  
  // Update relative imports to use path aliases
  const updatedContent = content.replace(
    /from ['"]\.\.?\/(.*?)['"]/g,
    (match, importPath) => {
      // Don't modify node_modules imports
      if (importPath.startsWith('node_modules/')) {
        return match;
      }
      
      // Don't modify relative imports to infrastructure/models
      if (importPath.includes('infrastructure/models/')) {
        return match;
      }
      
      return `from '@${packageName}/${importPath}'`;
    }
  );
  
  await fs.promises.writeFile(filePath, updatedContent);
}

// Function to get package name from file path
function getPackageNameFromPath(filePath: string): string {
  const parts = filePath.split('/');
  const packageIndex = parts.findIndex(p => ['admin', 'api', 'workbench', 'infrastructure', 'logs'].includes(p));
  if (packageIndex === -1) {
    return '';
  }
  
  // Handle special cases
  if (parts[packageIndex] === 'admin' && parts[packageIndex + 1] === 'cbp') {
    return 'cbp-admin';
  }
  if (parts[packageIndex] === 'api' && parts[packageIndex + 1] === 'cbp' && parts[packageIndex + 2] === 'config') {
    return 'cbp-config-api';
  }
  if (parts[packageIndex] === 'workbench') {
    return parts[packageIndex + 1]; // legacy-analyzer, config-gen, shared
  }
  
  return parts[packageIndex]; // infrastructure, logs
}

// Main function to process all files
async function main() {
  const files = process.argv.slice(2);
  for (const file of files) {
    try {
      await updateImports(file);
      console.log(`Updated imports in ${file}`);
    } catch (error) {
      console.error(`Error updating ${file}:`, error);
    }
  }
}

main().catch(console.error);
