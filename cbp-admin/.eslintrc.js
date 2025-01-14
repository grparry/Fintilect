module.exports = {
  extends: [
    'react-app',
    'react-app/jest',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react-hooks'],
  rules: {
    // Typescript - More lenient null checks
    '@typescript-eslint/no-unused-vars': ['warn', { 
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_'
    }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-non-null-assertion': 'off', // Allow non-null assertions
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'off', // Allow optional chaining with non-null assertions
    '@typescript-eslint/ban-ts-comment': 'off', // Allow @ts-ignore and similar comments
    '@typescript-eslint/no-inferrable-types': 'off', // Allow explicit type declarations
    'strict': 'off', // Disable strict mode checks
    
    // React
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    
    // General
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': 'warn',
    'prefer-const': 'warn',
    'no-unused-expressions': 'warn',
    
    // Imports
    'import/no-anonymous-default-export': 'off',
    'import/no-unresolved': 'off'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
