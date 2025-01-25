import { Connection, Request, ConnectionConfiguration, TYPES } from 'tedious';
import dotenv from 'dotenv';

// Load environment variables
const result = dotenv.config();
if (result.error) {
  console.error('Error loading .env file:', result.error);
  process.exit(1);
}

// Log non-sensitive connection info
console.log('Attempting database connection:');
console.log('Server:', process.env.DB_HOST);
console.log('Database:', process.env.DB_DATABASE);
console.log('Username:', process.env.DB_USERNAME);

// Configuration
const config: ConnectionConfiguration = {
  server: 'sqldevcfss.connectfss.com',
  authentication: {
    type: 'default',
    options: {
      userName: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD
    }
  },
  options: {
    database: process.env.DB_DATABASE,
    encrypt: false,
    trustServerCertificate: true,
    port: 1433
  }
};

const connection = new Connection(config);

// Event handlers
connection.on('connect', (err) => {
  if (err) {
    console.error('Connection error:', err);
    process.exit(1);
  }

  console.log('Connected successfully!');

  // Test query
  const request = new Request(
    'SELECT GETDATE() as currentTime',
    (err, rowCount) => {
      if (err) {
        console.error('Query error:', err);
      } else {
        console.log('Query completed, rowCount:', rowCount);
      }
      connection.close();
    }
  );

  request.on('row', (columns) => {
    columns.forEach((column: { value: unknown }) => {
      console.log('Column value:', column.value);
    });
  });

  connection.execSql(request);
});

connection.on('error', (err) => {
  console.error('Connection error event:', err);
});

connection.on('errorMessage', (err) => {
  console.error('Error message event:', err);
});

connection.connect();
