import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

// Mapping of source to target directories
const directoryMappings = [
    {
        source: 'cbp-admin',
        target: 'admin/cbp',
        ignoredFiles: [
            'node_modules',
            'dist',
            'coverage',
            '.DS_Store',
            'combined.log',
            'error.log',
            'debug.log',
            'app.log'
        ],
        // Files that we expect to be different
        expectedDifferentFiles: [
            'tsconfig.json',
            'package.json',
            '.env',
            '.env.development'
        ]
    },
    {
        source: 'cbp-config-api',
        target: 'api/cbp/config',
        ignoredFiles: [
            'node_modules',
            'dist',
            'coverage',
            '.DS_Store',
            'logs'
        ],
        expectedDifferentFiles: [
            'tsconfig.json',
            'package.json',
            '.env',
            '.env.development'
        ]
    },
    {
        source: 'workspace/legacy-analyzer',
        target: 'workbench/legacy-analyzer',
        ignoredFiles: [
            'node_modules',
            'dist',
            'coverage',
            '.DS_Store',
            'output',
            'legacy',
            'classes'
        ],
        expectedDifferentFiles: [
            'tsconfig.json',
            'package.json'
        ]
    },
    {
        source: 'infrastructure',
        target: 'infrastructure',
        ignoredFiles: [
            'node_modules',
            'dist',
            '.DS_Store'
        ],
        expectedDifferentFiles: [
            'tsconfig.json',
            'package.json'
        ]
    },
    {
        source: 'logs',
        target: 'logs',
        ignoredFiles: [
            'node_modules',
            'dist',
            '.DS_Store',
            'combined.log',
            'error.log'
        ],
        expectedDifferentFiles: [
            'tsconfig.json',
            'package.json'
        ]
    }
];

interface FileComparison {
    path: string;
    exists: boolean;
    sizeMatch?: boolean;
    contentMatch?: boolean;
    error?: string;
}

interface DirectoryComparison {
    source: string;
    target: string;
    missingFiles: FileComparison[];
    differentFiles: FileComparison[];
    extraFiles: FileComparison[];
}

function calculateFileHash(filePath: string): string {
    const fileBuffer = fs.readFileSync(filePath);
    const hashSum = crypto.createHash('sha256');
    hashSum.update(fileBuffer);
    return hashSum.digest('hex');
}

function compareFiles(sourcePath: string, targetPath: string): FileComparison {
    const comparison: FileComparison = {
        path: path.relative(process.cwd(), sourcePath),
        exists: fs.existsSync(targetPath)
    };

    if (!comparison.exists) {
        return comparison;
    }

    try {
        const sourceStats = fs.statSync(sourcePath);
        const targetStats = fs.statSync(targetPath);
        comparison.sizeMatch = sourceStats.size === targetStats.size;

        if (comparison.sizeMatch) {
            const sourceHash = calculateFileHash(sourcePath);
            const targetHash = calculateFileHash(targetPath);
            comparison.contentMatch = sourceHash === targetHash;
        }
    } catch (error) {
        comparison.error = error.message;
    }

    return comparison;
}

function shouldIgnore(filePath: string, ignoredFiles: string[]): boolean {
    return ignoredFiles.some(ignored => 
        filePath.includes(`/${ignored}/`) || filePath.endsWith(`/${ignored}`) || filePath.endsWith(ignored)
    );
}

function compareDirectories(mapping: typeof directoryMappings[0]): DirectoryComparison {
    const result: DirectoryComparison = {
        source: mapping.source,
        target: mapping.target,
        missingFiles: [],
        differentFiles: [],
        extraFiles: []
    };

    function processDirectory(relativeDir: string) {
        const sourceDir = path.join(process.cwd(), mapping.source, relativeDir);
        const targetDir = path.join(process.cwd(), mapping.target, relativeDir);

        if (!fs.existsSync(sourceDir)) {
            console.warn(`Source directory does not exist: ${sourceDir}`);
            return;
        }

        const sourceFiles = fs.readdirSync(sourceDir);

        for (const file of sourceFiles) {
            const sourceFile = path.join(sourceDir, file);
            const targetFile = path.join(targetDir, file);
            const relativePath = path.relative(process.cwd(), sourceFile);

            if (shouldIgnore(relativePath, mapping.ignoredFiles)) {
                continue;
            }

            const sourceStat = fs.statSync(sourceFile);

            if (sourceStat.isDirectory()) {
                processDirectory(path.join(relativeDir, file));
                continue;
            }

            const comparison = compareFiles(sourceFile, targetFile);

            if (!comparison.exists) {
                result.missingFiles.push(comparison);
            } else if (!comparison.contentMatch && !mapping.expectedDifferentFiles.includes(file)) {
                result.differentFiles.push(comparison);
            }
        }

        // Check for extra files in target
        if (fs.existsSync(targetDir)) {
            const targetFiles = fs.readdirSync(targetDir);
            for (const file of targetFiles) {
                const sourceFile = path.join(sourceDir, file);
                const targetFile = path.join(targetDir, file);
                const relativePath = path.relative(process.cwd(), targetFile);

                if (shouldIgnore(relativePath, mapping.ignoredFiles)) {
                    continue;
                }

                if (!fs.existsSync(sourceFile)) {
                    result.extraFiles.push({
                        path: relativePath,
                        exists: true
                    });
                }
            }
        }
    }

    processDirectory('');
    return result;
}

function printResults(results: DirectoryComparison[]) {
    for (const result of results) {
        console.log(`\nComparing ${result.source} -> ${result.target}`);
        
        if (result.missingFiles.length > 0) {
            console.log('\nMissing files:');
            result.missingFiles.forEach(f => console.log(`  - ${f.path}`));
        }

        if (result.differentFiles.length > 0) {
            console.log('\nFiles with different content:');
            result.differentFiles.forEach(f => console.log(`  - ${f.path}${f.error ? ` (Error: ${f.error})` : ''}`));
        }

        if (result.extraFiles.length > 0) {
            console.log('\nExtra files in target:');
            result.extraFiles.forEach(f => console.log(`  - ${f.path}`));
        }

        if (result.missingFiles.length === 0 && 
            result.differentFiles.length === 0 && 
            result.extraFiles.length === 0) {
            console.log('✓ All files match (excluding expected differences)');
        }
    }
}

// Run the comparison
const results = directoryMappings.map(compareDirectories);
printResults(results);
