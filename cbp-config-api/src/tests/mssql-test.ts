import * as sql from 'mssql';
import dotenv from 'dotenv';

// Load environment variables
const result = dotenv.config();
if (result.error) {
  console.error('Error loading .env file:', result.error);
  process.exit(1);
}

console.log('Environment variables loaded');

// Build connection string (mask password)
const connectionString = `Server=${process.env.DB_HOST};Database=${process.env.DB_DATABASE};User Id=${process.env.DB_USERNAME};Password=***;Encrypt=false;TrustServerCertificate=true;ApplicationIntent=ReadWrite;MultiSubnetFailover=False`;
console.log('Connection string (without password):', connectionString);

async function testConnection() {
  try {
    console.log('Attempting to connect to SQL Server...');
    console.log('Using server name:', process.env.DB_HOST);
    
    const pool = await sql.connect({
      server: process.env.DB_HOST || '',
      database: process.env.DB_DATABASE,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      options: {
        encrypt: false,
        trustServerCertificate: true
      }
    });
    
    console.log('Connected successfully!');
    
    const result = await pool.request().query('SELECT GETDATE() as currentTime');
    console.log('Current database time:', result.recordset[0].currentTime);
    
    await pool.close();
    console.log('Connection closed');
  } catch (err) {
    console.error('Error:', err);
    if (err instanceof Error) {
      console.error('Error message:', err.message);
      console.error('Error name:', err.name);
      console.error('Stack trace:', err.stack);
      
      // Additional debugging info without exposing sensitive data
      if ('code' in err) {
        console.error('Error code:', (err as any).code);
      }
      if ('originalError' in err) {
        console.error('Original error:', (err as any).originalError);
      }
    }
  }
}

testConnection();
