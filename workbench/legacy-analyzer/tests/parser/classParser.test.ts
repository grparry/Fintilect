import { ClassParser } from '../../src/parser/classParser';
import { PathResolver } from '../../src/output/pathSystem/pathResolver';
import Parser from 'web-tree-sitter';
import path from 'path';
import { ParsedClass } from '../../src/parser/types';

// Mock Logger class
jest.mock('../../src/utils/logger', () => ({
    __esModule: true,
    default: {
        debug: jest.fn(),
        info: jest.fn(),
        error: jest.fn()
    },
    Logger: class {
        debug = jest.fn();
        info = jest.fn();
        error = jest.fn();
    }
}));

describe('ClassParser', () => {
    let parser: Parser;
    let pathResolver: PathResolver;

    beforeAll(async () => {
        await Parser.init();
        parser = new Parser();
        const Lang = await Parser.Language.load(path.join(__dirname, '../../public/tree-sitter-c-sharp.wasm'));
        parser.setLanguage(Lang);
    });

    beforeEach(() => {
        pathResolver = new PathResolver();
    });

    describe('createEmptyClass', () => {
        it('should set outputDirectory using PathResolver for ClientConfigurationModels namespace', async () => {
            const source = `
                namespace Psi.Models.ClientConfigurationModels.Account {
                    public class AccountSettings {
                    }
                }
            `;
            const tree = parser.parse(source);
            const classNode = tree.rootNode.descendantsOfType('class_declaration')[0];
            
            const result = await ClassParser.createEmptyClass(classNode, 'test/path', pathResolver);
            
            expect(result.outputDirectory).toBe('ClientConfigurationModels/Account');
            expect(result.namespace).toBe('Psi.Models.ClientConfigurationModels.Account');
            expect(result.name).toBe('AccountSettings');
        });

        it('should set outputDirectory to undefined when no namespace is present', async () => {
            const source = `
                public class GlobalSettings {
                }
            `;
            const tree = parser.parse(source);
            const classNode = tree.rootNode.descendantsOfType('class_declaration')[0];
            
            const result = await ClassParser.createEmptyClass(classNode, 'test/path', pathResolver);
            
            expect(result.outputDirectory).toBeUndefined();
            expect(result.namespace).toBeUndefined();
            expect(result.name).toBe('GlobalSettings');
        });

        it('should handle test mode correctly', async () => {
            pathResolver = new PathResolver({ isTest: true });
            const source = `
                namespace Psi.Models.ClientConfigurationModels.Account {
                    public class AccountSettings {
                    }
                }
            `;
            const tree = parser.parse(source);
            const classNode = tree.rootNode.descendantsOfType('class_declaration')[0];
            
            const result = await ClassParser.createEmptyClass(classNode, 'test/path', pathResolver);
            
            expect(result.outputDirectory).toBe('doc/Psi/Models/ClientConfigurationModels/Account');
            expect(result.namespace).toBe('Psi.Models.ClientConfigurationModels.Account');
            expect(result.name).toBe('AccountSettings');
        });
    });
});
