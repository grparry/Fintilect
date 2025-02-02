import { PathResolver } from '../../../src/output/pathSystem/pathResolver';
import { ParsedClass, ParsedClassType } from '../../../src/parser/types';
import path from 'path';

describe('PathResolver', () => {
    let resolver: PathResolver;
    const originalDebug = process.env.DEBUG;

    beforeAll(() => {
        process.env.DEBUG = 'true';
    });

    afterAll(() => {
        process.env.DEBUG = originalDebug;
    });

    beforeEach(() => {
        resolver = new PathResolver();
    });

    describe('getTypeOutputPath', () => {
        it('should handle ClientConfigurationModels namespace correctly', () => {
            const parsedClass: ParsedClass = {
                name: 'TestSettings',
                namespace: 'Psi.Models.ClientConfigurationModels',
                fields: [],
                enums: [],
                type: 'class' as ParsedClassType,
                attributes: [],
                outputDirectory: 'ClientConfigurationModels'
            };

            const result = resolver.getTypeOutputPath(parsedClass);
            expect(result).toBe(path.join('ClientConfigurationModels', 'TestSettings.ts'));
        });

        it('should handle nested namespaces after ClientConfigurationModels', () => {
            const parsedClass: ParsedClass = {
                name: 'PaydayLoan',
                namespace: 'Psi.Models.ClientConfigurationModels.PaydayLoans',
                fields: [],
                enums: [],
                type: 'class' as ParsedClassType,
                attributes: [],
                outputDirectory: path.join('ClientConfigurationModels', 'PaydayLoans')
            };

            const result = resolver.getTypeOutputPath(parsedClass);
            expect(result).toBe(path.join('ClientConfigurationModels', 'PaydayLoans', 'PaydayLoan.ts'));
        });

        it('should handle test mode correctly', () => {
            resolver = new PathResolver({ isTest: true });
            const parsedClass: ParsedClass = {
                name: 'TestSettings',
                namespace: 'Psi.Models.ClientConfigurationModels',
                fields: [],
                enums: [],
                type: 'class' as ParsedClassType,
                attributes: [],
                outputDirectory: 'ClientConfigurationModels'
            };

            const result = resolver.getTypeOutputPath(parsedClass);
            expect(result).toBe(path.join('doc', 'Psi', 'Models', 'ClientConfigurationModels', 'TestSettings.ts'));
        });
    });

    describe('getRelativeImportPath', () => {
        it('should handle imports between root files', () => {
            const fromClass: ParsedClass = {
                name: 'Settings',
                namespace: 'Psi.Models.ClientConfigurationModels',
                fields: [],
                enums: [],
                type: 'class',
                attributes: [],
                outputDirectory: 'ClientConfigurationModels'
            };

            const toClass: ParsedClass = {
                name: 'GlobalSettings',
                namespace: 'Psi.Models.ClientConfigurationModels',
                fields: [],
                enums: [],
                type: 'class',
                attributes: [],
                outputDirectory: 'ClientConfigurationModels'
            };

            const result = resolver.getRelativeImportPath(fromClass, toClass);
            expect(result).toBe('./GlobalSettings');
        });

        it('should handle imports from root to subdirectory file', () => {
            const fromClass: ParsedClass = {
                name: 'Settings',
                namespace: 'Psi.Models.ClientConfigurationModels',
                fields: [],
                enums: [],
                type: 'class',
                attributes: [],
                outputDirectory: 'ClientConfigurationModels'
            };

            const toClass: ParsedClass = {
                name: 'AccountSettings',
                namespace: 'Psi.Models.ClientConfigurationModels.Account',
                fields: [],
                enums: [],
                type: 'class',
                attributes: [],
                outputDirectory: path.join('ClientConfigurationModels', 'Account')
            };

            const result = resolver.getRelativeImportPath(fromClass, toClass);
            expect(result).toBe('./Account/AccountSettings');
        });

        it('should handle imports in same directory', () => {
            const fromClass: ParsedClass = {
                name: 'Settings',
                namespace: 'Psi.Models.ClientConfigurationModels',
                fields: [],
                enums: [],
                type: 'class',
                attributes: [],
                outputDirectory: 'ClientConfigurationModels'
            };

            const toClass: ParsedClass = {
                name: 'OtherSettings',
                namespace: 'Psi.Models.ClientConfigurationModels',
                fields: [],
                enums: [],
                type: 'class',
                attributes: [],
                outputDirectory: 'ClientConfigurationModels'
            };
            const result = resolver.getRelativeImportPath(fromClass, toClass);
            expect(result).toBe('./OtherSettings');
        });

        it('should handle imports in same nested directory', () => {
            const fromClass: ParsedClass = {
                name: 'AccountSettings',
                namespace: 'Psi.Models.ClientConfigurationModels.Account',
                fields: [],
                enums: [],
                type: 'class' as ParsedClassType,
                attributes: [],
                outputDirectory: path.join('ClientConfigurationModels', 'Account')
            };

            // These types are in the same Account directory
            const toClass1: ParsedClass = {
                name: 'Transfers',
                namespace: 'Psi.Models.ClientConfigurationModels.Account',
                fields: [],
                enums: [],
                type: 'class',
                attributes: [],
                outputDirectory: path.join('ClientConfigurationModels', 'Account')
            };
            expect(resolver.getRelativeImportPath(fromClass, toClass1)).toBe('./Transfers');

            const toClass2: ParsedClass = {
                name: 'ScheduledTransfers',
                namespace: 'Psi.Models.ClientConfigurationModels.Account',
                fields: [],
                enums: [],
                type: 'class',
                attributes: [],
                outputDirectory: path.join('ClientConfigurationModels', 'Account')
            };
            expect(resolver.getRelativeImportPath(fromClass, toClass2)).toBe('./ScheduledTransfers');

            const toClass3: ParsedClass = {
                name: 'DebitCards',
                namespace: 'Psi.Models.ClientConfigurationModels.Account',
                fields: [],
                enums: [],
                type: 'class',
                attributes: [],
                outputDirectory: path.join('ClientConfigurationModels', 'Account')
            };
            expect(resolver.getRelativeImportPath(fromClass, toClass3)).toBe('./DebitCards');
        });

        it('should handle imports from subdirectory', () => {
            const fromClass: ParsedClass = {
                name: 'PaydayLoan',
                namespace: 'Psi.Models.ClientConfigurationModels.PaydayLoans',
                fields: [],
                enums: [],
                type: 'class' as ParsedClassType,
                attributes: [],
                outputDirectory: path.join('ClientConfigurationModels', 'PaydayLoans')
            };

            const toClass: ParsedClass = {
                name: 'Settings',
                namespace: 'Psi.Models.ClientConfigurationModels',
                fields: [],
                enums: [],
                type: 'class',
                attributes: [],
                outputDirectory: 'ClientConfigurationModels'
            };
            const result = resolver.getRelativeImportPath(fromClass, toClass);
            expect(result).toBe('../Settings');
        });

        it('should handle imports to subdirectory using directory paths', () => {
            const fromClass: ParsedClass = {
                name: 'Settings',
                namespace: 'Psi.Models.ClientConfigurationModels',
                fields: [],
                enums: [],
                type: 'class' as ParsedClassType,
                attributes: [],
                outputDirectory: 'ClientConfigurationModels'
            };

            // Test importing nested types using directory paths
            const toClass1: ParsedClass = {
                name: 'PaydayLoan',
                namespace: 'Psi.Models.ClientConfigurationModels.PaydayLoans',
                fields: [],
                enums: [],
                type: 'class',
                attributes: [],
                outputDirectory: path.join('ClientConfigurationModels', 'PaydayLoans')
            };
            expect(resolver.getRelativeImportPath(fromClass, toClass1)).toBe('./PaydayLoans/PaydayLoan');

            const toClass2: ParsedClass = {
                name: 'MFAQuestions',
                namespace: 'Psi.Models.ClientConfigurationModels.Institution',
                fields: [],
                enums: [],
                type: 'class',
                attributes: [],
                outputDirectory: path.join('ClientConfigurationModels', 'Institution')
            };
            expect(resolver.getRelativeImportPath(fromClass, toClass2)).toBe('./Institution/MFAQuestions');

            const toClass3: ParsedClass = {
                name: 'StopPayment',
                namespace: 'Psi.Models.ClientConfigurationModels.Services',
                fields: [],
                enums: [],
                type: 'class',
                attributes: [],
                outputDirectory: path.join('ClientConfigurationModels', 'Services')
            };
            expect(resolver.getRelativeImportPath(fromClass, toClass3)).toBe('./Services/StopPayment');
        });

        it('should handle imports between different subdirectories', () => {
            const fromClass: ParsedClass = {
                name: 'PaydayLoan',
                namespace: 'Psi.Models.ClientConfigurationModels.PaydayLoans',
                fields: [],
                enums: [],
                type: 'class' as ParsedClassType,
                attributes: [],
                outputDirectory: path.join('ClientConfigurationModels', 'PaydayLoans')
            };

            const toClass: ParsedClass = {
                name: 'MobileConfiguration',
                namespace: 'Psi.Models.ClientConfigurationModels.MobileConfigurations',
                fields: [],
                enums: [],
                type: 'class',
                attributes: [],
                outputDirectory: path.join('ClientConfigurationModels', 'MobileConfigurations')
            };

            // The types will be registered when we call getRelativeImportPath
            const result = resolver.getRelativeImportPath(fromClass, toClass);
            expect(result).toBe('../MobileConfigurations/MobileConfiguration');
        });

        it('should clean markdown-style links from type names', () => {
            const fromClass: ParsedClass = {
                name: 'Settings',
                namespace: 'Psi.Models.ClientConfigurationModels',
                fields: [],
                enums: [],
                type: 'class' as ParsedClassType,
                attributes: [],
                outputDirectory: 'ClientConfigurationModels'
            };

            const toClass: ParsedClass = {
                name: 'OtherSettings',
                namespace: 'Psi.Models.ClientConfigurationModels',
                fields: [],
                enums: [],
                type: 'class',
                attributes: [],
                outputDirectory: 'ClientConfigurationModels'
            };
            const result = resolver.getRelativeImportPath(fromClass, toClass);
            expect(result).toBe('./OtherSettings');
        });

        it('should handle deeply nested subdirectories', () => {
            const fromClass: ParsedClass = {
                name: 'DeepSettings',
                namespace: 'Psi.Models.ClientConfigurationModels.Deep.Nested.Path',
                fields: [],
                enums: [],
                type: 'class' as ParsedClassType,
                attributes: [],
                outputDirectory: path.join('ClientConfigurationModels', 'Deep', 'Nested', 'Path')
            };

            const toClass: ParsedClass = {
                name: 'OtherDeepSettings',
                namespace: 'Psi.Models.ClientConfigurationModels.Other.Very.Deep.Path',
                fields: [],
                enums: [],
                type: 'class',
                attributes: [],
                outputDirectory: path.join('ClientConfigurationModels', 'Other', 'Very', 'Deep', 'Path')
            };

            const result = resolver.getRelativeImportPath(fromClass, toClass);
            expect(result).toBe('../../../Other/Very/Deep/Path/OtherDeepSettings');
        });

        it('should handle compound type names using directory paths', () => {
            const fromClass: ParsedClass = {
                name: 'Settings',
                namespace: 'Psi.Models.ClientConfigurationModels',
                fields: [],
                enums: [],
                type: 'class' as ParsedClassType,
                attributes: [],
                outputDirectory: 'ClientConfigurationModels'
            };

            // Test that compound names like Institution.MFAQuestions use directory paths
            const toClass1: ParsedClass = {
                name: 'MFAQuestions',
                namespace: 'Psi.Models.ClientConfigurationModels.Institution',
                fields: [],
                enums: [],
                type: 'class',
                attributes: [],
                outputDirectory: path.join('ClientConfigurationModels', 'Institution')
            };
            expect(resolver.getRelativeImportPath(fromClass, toClass1))
                .toBe('./Institution/MFAQuestions');

            const toClass2: ParsedClass = {
                name: 'StopPayment',
                namespace: 'Psi.Models.ClientConfigurationModels.Services',
                fields: [],
                enums: [],
                type: 'class',
                attributes: [],
                outputDirectory: path.join('ClientConfigurationModels', 'Services')
            };
            expect(resolver.getRelativeImportPath(fromClass, toClass2))
                .toBe('./Services/StopPayment');
        });

        it('should handle imports from root to subdirectory', () => {
            const fromClass: ParsedClass = {
                name: 'Settings',
                namespace: 'Psi.Models.ClientConfigurationModels',
                type: 'class',
                fields: [],
                enums: [],
                attributes: [],
                outputDirectory: 'ClientConfigurationModels'
            };
            const toClass: ParsedClass = {
                name: 'PaydayLoan',
                namespace: 'Psi.Models.ClientConfigurationModels.PaydayLoans',
                type: 'class',
                fields: [],
                enums: [],
                attributes: [],
                outputDirectory: path.join('ClientConfigurationModels', 'PaydayLoans')
            };
            expect(resolver.getRelativeImportPath(fromClass, toClass))
                .toBe('./PaydayLoans/PaydayLoan');
        });

        it('should handle imports from subdirectory to root', () => {
            const fromClass: ParsedClass = {
                name: 'PaydayLoan',
                namespace: 'Psi.Models.ClientConfigurationModels.PaydayLoans',
                type: 'class',
                fields: [],
                enums: [],
                attributes: [],
                outputDirectory: path.join('ClientConfigurationModels', 'PaydayLoans')
            };
            const toClass: ParsedClass = {
                name: 'Settings',
                namespace: 'Psi.Models.ClientConfigurationModels',
                type: 'class',
                fields: [],
                enums: [],
                attributes: [],
                outputDirectory: 'ClientConfigurationModels'
            };
            const result = resolver.getRelativeImportPath(fromClass, toClass);
            expect(result).toBe('../Settings');
        });

        it('should handle imports between same subdirectories', () => {
            const fromClass: ParsedClass = {
                name: 'PaydayLoan',
                namespace: 'Psi.Models.ClientConfigurationModels.PaydayLoans',
                type: 'class',
                fields: [],
                enums: [],
                attributes: [],
                outputDirectory: path.join('ClientConfigurationModels', 'PaydayLoans')
            };
            const toClass: ParsedClass = {
                name: 'OtherPaydayLoan',
                namespace: 'Psi.Models.ClientConfigurationModels.PaydayLoans',
                type: 'class',
                fields: [],
                enums: [],
                attributes: [],
                outputDirectory: path.join('ClientConfigurationModels', 'PaydayLoans')
            };
            expect(resolver.getRelativeImportPath(fromClass, toClass))
                .toBe('./OtherPaydayLoan');
        });

        it('should handle imports between different subdirectories', () => {
            const fromClass: ParsedClass = {
                name: 'PaydayLoan',
                namespace: 'Psi.Models.ClientConfigurationModels.PaydayLoans',
                type: 'class',
                fields: [],
                enums: [],
                attributes: [],
                outputDirectory: path.join('ClientConfigurationModels', 'PaydayLoans')
            };
            const toClass: ParsedClass = {
                name: 'MobileConfiguration',
                namespace: 'Psi.Models.ClientConfigurationModels.MobileConfigurations',
                type: 'class',
                fields: [],
                enums: [],
                attributes: [],
                outputDirectory: path.join('ClientConfigurationModels', 'MobileConfigurations')
            };
            const importPath = resolver.getRelativeImportPath(fromClass, toClass);
            expect(importPath).toBe('../MobileConfigurations/MobileConfiguration');
        });

        it('should handle imports in same nested directory', () => {
            const fromClass: ParsedClass = {
                name: 'AccountSettings',
                namespace: 'Psi.Models.ClientConfigurationModels.Account',
                fields: [],
                enums: [],
                type: 'class',
                attributes: [],
                outputDirectory: path.join('ClientConfigurationModels', 'Account')
            };

            // These types are in the same Account directory
            const toClass: ParsedClass = {
                name: 'Transfers',
                namespace: 'Psi.Models.ClientConfigurationModels.Account',
                fields: [],
                enums: [],
                type: 'class',
                attributes: [],
                outputDirectory: path.join('ClientConfigurationModels', 'Account')
            };
            expect(resolver.getRelativeImportPath(fromClass, toClass)).toBe('./Transfers');

            const toClass2: ParsedClass = {
                name: 'ScheduledTransfers',
                namespace: 'Psi.Models.ClientConfigurationModels.Account',
                fields: [],
                enums: [],
                type: 'class',
                attributes: [],
                outputDirectory: path.join('ClientConfigurationModels', 'Account')
            };
            expect(resolver.getRelativeImportPath(fromClass, toClass2)).toBe('./ScheduledTransfers');

            const toClass3: ParsedClass = {
                name: 'DebitCards',
                namespace: 'Psi.Models.ClientConfigurationModels.Account',
                fields: [],
                enums: [],
                type: 'class',
                attributes: [],
                outputDirectory: path.join('ClientConfigurationModels', 'Account')
            };
            expect(resolver.getRelativeImportPath(fromClass, toClass3)).toBe('./DebitCards');
        });

        it('should handle imports from subdirectory to parent', () => {
            const fromClass: ParsedClass = {
                name: 'AccountSettings',
                namespace: 'Psi.Models.ClientConfigurationModels.Account',
                fields: [],
                enums: [],
                type: 'class',
                attributes: [],
                outputDirectory: path.join('ClientConfigurationModels', 'Account')
            };

            const toClass: ParsedClass = {
                name: 'Settings',
                namespace: 'Psi.Models.ClientConfigurationModels',
                fields: [],
                enums: [],
                type: 'class',
                attributes: [],
                outputDirectory: 'ClientConfigurationModels'
            };
            const result = resolver.getRelativeImportPath(fromClass, toClass);
            expect(result).toBe('../Settings');
        });

        it('should handle imports to different subdirectories', () => {
            const fromClass: ParsedClass = {
                name: 'AccountSettings',
                namespace: 'Psi.Models.ClientConfigurationModels.Account',
                fields: [],
                enums: [],
                type: 'class',
                attributes: [],
                outputDirectory: path.join('ClientConfigurationModels', 'Account')
            };

            const toClass1: ParsedClass = {
                name: 'PaydayLoan',
                namespace: 'Psi.Models.ClientConfigurationModels.PaydayLoans',
                fields: [],
                enums: [],
                type: 'class',
                attributes: [],
                outputDirectory: path.join('ClientConfigurationModels', 'PaydayLoans')
            };
            expect(resolver.getRelativeImportPath(fromClass, toClass1)).toBe('../PaydayLoans/PaydayLoan');

            const toClass2: ParsedClass = {
                name: 'MFAQuestions',
                namespace: 'Psi.Models.ClientConfigurationModels.Institution',
                fields: [],
                enums: [],
                type: 'class',
                attributes: [],
                outputDirectory: path.join('ClientConfigurationModels', 'Institution')
            };
            expect(resolver.getRelativeImportPath(fromClass, toClass2)).toBe('../Institution/MFAQuestions');

            const toClass3: ParsedClass = {
                name: 'StopPayment',
                namespace: 'Psi.Models.ClientConfigurationModels.Services',
                fields: [],
                enums: [],
                type: 'class',
                attributes: [],
                outputDirectory: path.join('ClientConfigurationModels', 'Services')
            };
            expect(resolver.getRelativeImportPath(fromClass, toClass3)).toBe('../Services/StopPayment');
        });

        it('should handle imports from subdirectory to root', () => {
            const fromClass: ParsedClass = {
                name: 'PaydayLoan',
                namespace: 'Psi.Models.ClientConfigurationModels.PaydayLoans',
                fields: [],
                enums: [],
                type: 'class',
                attributes: [],
                outputDirectory: path.join('ClientConfigurationModels', 'PaydayLoans')
            };
            const toClass: ParsedClass = {
                name: 'Settings',
                namespace: 'Psi.Models.ClientConfigurationModels',
                fields: [],
                enums: [],
                type: 'class',
                attributes: [],
                outputDirectory: 'ClientConfigurationModels'
            };
            const result = resolver.getRelativeImportPath(fromClass, toClass);
            expect(result).toBe('../Settings');
        });
    });

    describe('getTypeSubdirectoryPath', () => {
        it('should return empty string for root ClientConfigurationModels types', () => {
            const type = 'Settings';
            const namespace = 'Psi.Models.ClientConfigurationModels';
            
            // Using private method through any cast for testing
            const result = (resolver as any).getTypeSubdirectoryPath(type, namespace);
            expect(result).toBe('');
        });

        it('should return correct subdirectory for nested types', () => {
            const type = 'PaydayLoan';
            const namespace = 'Psi.Models.ClientConfigurationModels.PaydayLoans';
            
            // Using private method through any cast for testing
            const result = (resolver as any).getTypeSubdirectoryPath(type, namespace);
            expect(result).toBe('PaydayLoans');
        });

        it('should handle multiple levels of nesting', () => {
            const type = 'DeepSettings';
            const namespace = 'Psi.Models.ClientConfigurationModels.Deep.Nested.Path';
            
            // Using private method through any cast for testing
            const result = (resolver as any).getTypeSubdirectoryPath(type, namespace);
            expect(result).toBe('Deep/Nested/Path');
        });
    });
});
