# CBP Config API

A Node.js TypeScript API for managing CBP (Check Bill Pay) configuration and payment processing.

## Features

- Payment processing and management
- Payee configuration
- User management
- System operation endpoints
- Tracking and monitoring
- Host connection management

## Prerequisites

- Node.js (v14 or higher)
- SQL Server 2019 or higher
- TypeScript 4.x

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the environment configuration:
   ```bash
   cp .env.example .env
   ```
4. Update the `.env` file with your SQL Server configuration:
   - Set `DB_HOST` to your SQL Server host
   - Set `DB_USERNAME` and `DB_PASSWORD`
   - Set `DB_DATABASE` to your database name
   - Configure `DB_ENCRYPT` and `DB_TRUST_SERVER_CERTIFICATE` based on your environment

## Development

Start the development server:
```bash
npm run dev
```

## Building

Build the project:
```bash
npm run build
```

## Testing

Run tests:
```bash
npm test
```

## Project Structure

```
src/
├── controllers/    # Request handlers
├── services/      # Business logic
├── models/        # Database models
├── routes/        # API routes
├── middleware/    # Express middleware
└── utils/         # Utility functions
```

## Database Connection

The application uses Microsoft SQL Server as its database. Make sure to:
1. Have SQL Server running and accessible
2. Create the database specified in your `.env` file
3. Configure proper authentication (SQL Server or Windows Authentication)
4. Set up appropriate firewall rules if connecting to a remote instance

## Security

- All sensitive data is masked in logs
- JWT authentication
- Rate limiting
- CORS protection
- Input validation
- Parameterized queries
- SQL Server connection encryption

## License

ISC
