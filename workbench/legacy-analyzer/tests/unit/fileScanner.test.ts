import { FileScanner } from '@/../src/fileScanner';
import fs from 'fs-extra';
import path from 'path';

describe('FileScanner', () => {
  const testDir = path.join(__dirname, '../testData/csharp');

  beforeEach(async () => {
    // Create test directory and files
    await fs.ensureDir(testDir);
    await fs.writeFile(path.join(testDir, 'test1.cs'), 'class Test1 {}');
    await fs.writeFile(path.join(testDir, 'test2.cs'), 'class Test2 {}');
    await fs.writeFile(path.join(testDir, 'test.txt'), 'not a cs file');
    await fs.ensureDir(path.join(testDir, 'subdir'));
  });

  afterEach(async () => {
    await fs.remove(testDir);
  });

  it('should find C# files in directory', async () => {
    const scanner = new FileScanner(testDir);
    const results = await scanner.scanForFiles();

    const csFiles = results.filter(r => r.filePath?.endsWith('.cs') && !r.error);
    expect(csFiles).toHaveLength(2);
    expect(csFiles[0].filePath).toContain('.cs');
    expect(csFiles[1].filePath).toContain('.cs');
  });

  it('should handle single file mode', async () => {
    const singleFilePath = path.join(testDir, 'test1.cs');
    const scanner = new FileScanner(testDir, { singleFilePath });
    
    const results = await scanner.scanForFiles();
    
    expect(results).toHaveLength(1);
    expect(results[0].filePath).toBe(singleFilePath);
  });

  it('should handle errors for non-existent file', async () => {
    const nonexistentFile = path.join(testDir, 'nonexistent.cs');
    const scanner = new FileScanner(testDir, { singleFilePath: nonexistentFile });
    
    const results = await scanner.scanForFiles();
    
    expect(results).toHaveLength(1);
    expect(results[0].error).toBeDefined();
    expect(results[0].error).toContain('not a valid C# file or does not exist');
  });

  it('should handle empty directory', async () => {
    const emptyDir = path.join(testDir, 'empty');
    await fs.ensureDir(emptyDir);
    
    const scanner = new FileScanner(emptyDir);
    const results = await scanner.scanForFiles();
    
    expect(results).toHaveLength(0);
  });
});
