# Build and Dependency Management TODO

## Overview
This TODO tracks the necessary changes to improve build and dependency management across the codebase.

**Created**: 2024-12-31T06:09:40-07:00
**Status**: Pending
**Priority**: High
**Category**: Infrastructure
**Related Pattern**: core/build.md

## Current Issues

### 1. Package Management
- **Issue**: Basic package.json
- **Current**: No workspaces
- **Required**: Monorepo setup
- **Impact**: Poor organization

### 2. Build Configuration
- **Issue**: CRA defaults
- **Current**: react-scripts
- **Required**: Custom config
- **Impact**: Limited control

### 3. TypeScript Setup
- **Issue**: Basic config
- **Current**: Default options
- **Required**: Strict rules
- **Impact**: Type safety

### 4. Dependencies
- **Issue**: Version ranges
- **Current**: Caret ranges
- **Required**: Exact versions
- **Impact**: Instability

### 5. Build Performance
- **Issue**: No optimization
- **Current**: Default build
- **Required**: Custom build
- **Impact**: Slow builds

## Required Changes

### 1. Package Management
```json
// package.json
{
  "name": "cbp-admin",
  "private": true,
  "workspaces": [
    "packages/*"
  ],
  "scripts": {
    "build": "turbo run build",
    "test": "turbo run test",
    "lint": "turbo run lint",
    "clean": "turbo run clean",
    "dev": "turbo run dev"
  },
  "devDependencies": {
    "turbo": "1.12.5"
  }
}
```

### 2. Build Configuration
```javascript
// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true
          }
        }
      }),
      new CssMinimizerPlugin()
    ],
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1];
            return `vendor.${packageName.replace('@', '')}`;
          }
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false
    })
  ],
  performance: {
    hints: 'warning',
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
};
```

### 3. TypeScript Setup
```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "es2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": "src",
    "paths": {
      "@/*": ["*"]
    },
    "typeRoots": [
      "./node_modules/@types",
      "./src/types"
    ],
    "noImplicitAny": true,
    "noImplicitThis": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitReturns": true,
    "noUncheckedIndexedAccess": true,
    "noPropertyAccessFromIndexSignature": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitOverride": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "build", "dist"]
}
```

### 4. Dependencies
```json
// package.json (dependencies)
{
  "dependencies": {
    "@emotion/react": "11.11.3",
    "@emotion/styled": "11.11.0",
    "@hookform/resolvers": "3.3.4",
    "@mui/icons-material": "5.15.11",
    "@mui/lab": "5.0.0-alpha.165",
    "@mui/material": "5.15.14",
    "@mui/x-data-grid": "6.19.6",
    "@mui/x-date-pickers": "6.19.6",
    "@mui/x-tree-view": "6.19.6",
    "@nivo/bar": "0.84.0",
    "@nivo/core": "0.84.0",
    "@nivo/line": "0.84.0",
    "@nivo/pie": "0.84.0",
    "@tinymce/tinymce-react": "4.3.2",
    "axios": "1.6.7",
    "date-fns": "3.3.1",
    "dayjs": "1.11.10",
    "notistack": "3.0.1",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "react-hook-form": "7.50.0",
    "react-router-dom": "6.22.0",
    "recharts": "2.12.0",
    "web-vitals": "3.5.2",
    "yup": "1.3.3"
  }
}
```

### 5. Build Performance
```javascript
// turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"],
      "env": ["NODE_ENV", "NEXT_PUBLIC_*"]
    },
    "lint": {
      "outputs": []
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "clean": {
      "cache": false
    }
  }
}
```

## Implementation Plan

1. **Phase 1: Package**
   - Create monorepo
   - Add workspaces
   - Update scripts
   - Add Turborepo

2. **Phase 2: Build**
   - Eject from CRA
   - Add webpack config
   - Add plugins
   - Add optimization

3. **Phase 3: TypeScript**
   - Update config
   - Add strict rules
   - Add paths
   - Add types

4. **Phase 4: Dependencies**
   - Update versions
   - Add resolutions
   - Add constraints
   - Add validation

5. **Phase 5: Performance**
   - Add caching
   - Add splitting
   - Add analysis
   - Add monitoring

## Notes
- Use Turborepo
- Add monitoring
- Document builds
- Consider scale
- Handle errors
