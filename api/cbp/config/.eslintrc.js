module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended'
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    // TypeScript - More lenient null checks
    '@typescript-eslint/no-unused-vars': ['warn', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_'
    }],
    '@typescript-eslint/explicit-function-return-type': ['warn', {
      allowExpressions: true,
      allowTypedFunctionExpressions: true,
      allowHigherOrderFunctions: true // Allow arrow functions returned from functions
    }],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/type-annotation-spacing': 'warn',
    '@typescript-eslint/no-non-null-assertion': 'off', // Allow non-null assertions
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'off', // Allow optional chaining with non-null assertions
    '@typescript-eslint/ban-ts-comment': 'off', // Allow @ts-ignore and similar comments
    '@typescript-eslint/no-inferrable-types': 'off', // Allow explicit type declarations
    '@typescript-eslint/no-unnecessary-type-assertion': 'off', // Allow type assertions even when unnecessary
    'strict': 'off', // Disable strict mode checks
    
    // Node.js specific
    'no-process-env': 'off',
    'no-console': 'off',
    
    // General
    'prefer-const': 'warn',
    'no-unused-expressions': 'warn',
    'no-return-await': 'warn',
    
    // Error handling
    'no-throw-literal': 'error',
    
    // Async/Await
    'no-async-promise-executor': 'error',
    'require-await': 'warn'
  },
  env: {
    node: true,
    jest: true
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  }
};
