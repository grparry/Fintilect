import { isCSharpFile, getRelativePath } from '@/../../src/utils/fileUtils';
import path from 'path';

describe('fileUtils', () => {
  describe('isCSharpFile', () => {
    it('should return true for .cs files', () => {
      expect(isCSharpFile('test.cs')).toBe(true);
      expect(isCSharpFile('path/to/file.cs')).toBe(true);
      expect(isCSharpFile('TEST.CS')).toBe(true);
    });

    it('should return false for non-.cs files', () => {
      expect(isCSharpFile('test.ts')).toBe(false);
      expect(isCSharpFile('test.cs.txt')).toBe(false);
      expect(isCSharpFile('test')).toBe(false);
    });
  });

  describe('getRelativePath', () => {
    it('should return correct relative path', () => {
      const basePath = '/base/path';
      const fullPath = '/base/path/to/file.cs';
      const expected = path.normalize('to/file.cs');
      
      expect(getRelativePath(basePath, fullPath)).toBe(expected);
    });

    it('should handle same directory', () => {
      const basePath = '/base/path';
      const fullPath = '/base/path/file.cs';
      
      expect(getRelativePath(basePath, fullPath)).toBe('file.cs');
    });
  });
});
