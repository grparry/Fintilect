#!/bin/bash
set -e

echo "Starting CBP Config API setup..."

# Check for Homebrew
if ! command -v brew &> /dev/null; then
    echo "Homebrew not found. Please install Homebrew first."
    echo "Visit https://brew.sh for installation instructions."
    exit 1
fi

# Check for Node.js and npm
if ! command -v node &> /dev/null; then
    echo "Node.js not found. Installing via Homebrew..."
    brew install node
fi

# Install SQL Server ODBC driver if not present
if ! odbcinst -q -d | grep -q "ODBC Driver 18 for SQL Server"; then
    echo "Installing SQL Server ODBC driver..."
    brew tap microsoft/mssql-release https://github.com/Microsoft/homebrew-mssql-release
    brew update
    HOMEBREW_ACCEPT_EULA=Y brew install msodbcsql18 mssql-tools18
else
    echo "SQL Server ODBC driver already installed"
fi

# Install npm dependencies
echo "Installing npm dependencies..."
npm install

# Install development dependencies
echo "Installing development dependencies..."
npm install --save-dev \
    @types/express \
    @types/cors \
    @types/helmet \
    @types/swagger-ui-express \
    typescript \
    ts-node \
    @types/node

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env file from template..."
    cp .env.example .env
    echo "Please update .env with your configuration"
fi

echo "Setup complete! Next steps:"
echo "1. Update .env with your configuration"
echo "2. Run 'npm run dev' to start the development server"
