import { Connection, Request, ConnectionConfiguration } from 'tedious';
import dotenv from 'dotenv';

// Load environment variables
const result = dotenv.config();
if (result.error) {
  console.error('Error loading .env file:', result.error);
  process.exit(1);
}

// Verify environment variables are loaded correctly
const password = process.env.DB_PASSWORD;
console.log('Environment variables:');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_DATABASE:', process.env.DB_DATABASE);
console.log('DB_USERNAME:', process.env.DB_USERNAME);
console.log('Password length:', password?.length);

const config: ConnectionConfiguration = {
  server: process.env.DB_HOST || '10.214.40.150',
  authentication: {
    type: 'default',
    options: {
      userName: process.env.DB_USERNAME,
      password: password // Use the direct reference
    }
  },
  options: {
    database: process.env.DB_DATABASE || 'cbp_config',
    encrypt: false,
    trustServerCertificate: true,
    port: parseInt(process.env.DB_PORT || '1433'),
    debug: {
      packet: true,
      data: true,
      payload: true,
      token: true
    }
  }
};

console.log('Attempting SQL Server connection with:', {
  server: config.server,
  database: config.options?.database,
  username: config.authentication?.options?.userName,
  passwordLength: config.authentication?.options?.password?.length,
  port: config.options?.port
});

const connection = new Connection(config);

connection.on('connect', (err) => {
  if (err) {
    console.error('Connection error:', err);
    return;
  }

  console.log('Connected to SQL Server');

  const request = new Request(
    'SELECT GETDATE() as currentTime;',
    (err, rowCount) => {
      if (err) {
        console.error('Query error:', err);
      } else {
        console.log('Query completed, rowCount:', rowCount);
      }
      connection.close();
    }
  );

  request.on('row', (columns: any[]) => {
    columns.forEach(column => {
      console.log('Column value:', column.value);
    });
  });

  connection.execSql(request);
});

connection.on('debug', (message) => {
  console.log('Debug:', message);
});

connection.on('error', (err) => {
  console.error('Connection error event:', err);
});

connection.connect();
