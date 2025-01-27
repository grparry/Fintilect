# CBP Config API Setup Guide

## Prerequisites

1. **Node.js and npm**: Latest LTS version
2. **Homebrew**: For installing SQL Server dependencies
3. **SQL Server**: Azure Edge or compatible SQL Server instance

## Dependencies Overview

### 1. SQL Server Dependencies
The project requires Microsoft SQL Server ODBC Driver and tools:
```bash
brew tap microsoft/mssql-release https://github.com/Microsoft/homebrew-mssql-release
brew update
HOMEBREW_ACCEPT_EULA=Y brew install msodbcsql18 mssql-tools18
```

### 2. Node.js Development Dependencies
```json
{
  "@types/express": "latest",
  "@types/cors": "latest",
  "@types/helmet": "latest",
  "@types/swagger-ui-express": "latest",
  "typescript": "latest",
  "ts-node": "latest",
  "@types/node": "latest"
}
```

### 3. Runtime Dependencies
```json
{
  "express": "latest",
  "cors": "latest",
  "helmet": "latest",
  "dotenv": "latest",
  "mssql": "latest",
  "express-rate-limit": "latest",
  "swagger-ui-express": "latest",
  "swagger-jsdoc": "latest",
  "jsonwebtoken": "latest"
}
```

## Setup Instructions

1. Clone the repository
2. Run `./scripts/setup-dev.sh` to install all dependencies
3. Copy `.env.example` to `.env` and update with your configuration
4. Run `npm run dev` to start the development server

## Environment Variables

Make sure to set the following environment variables in your `.env` file:

```env
# Server Configuration
NODE_ENV=development
PORT=3000
HOST=0.0.0.0

# Database Configuration
DB_HOST=your-sql-server-host
DB_PORT=1433
DB_USERNAME=your-username
DB_PASSWORD=your-password
DB_DATABASE=your-database-name

# JWT Configuration
JWT_SECRET=your-jwt-secret
```

## Development

- `npm run dev`: Start development server with hot reload
- `npm run build`: Build for production
- `npm run test`: Run tests
- `npm run lint`: Run linting

## API Documentation

Once the server is running, access the Swagger documentation at:
- Development: `http://localhost:3000/api-docs`

## Troubleshooting

### Common Issues

1. **SQL Server Connection Issues**
   - Verify ODBC driver installation: `odbcinst -j`
   - Check SQL Server credentials in `.env`
   - Ensure SQL Server is running and accessible

2. **TypeScript Compilation Errors**
   - Run `npm install` to ensure all type definitions are installed
   - Check `tsconfig.json` configuration
   - Verify all imports have corresponding `@types` packages

3. **Runtime Errors**
   - Check environment variables in `.env`
   - Verify SQL Server connection string
   - Check server logs for detailed error messages
