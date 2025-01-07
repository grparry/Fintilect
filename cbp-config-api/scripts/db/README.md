# Database Scripts

This directory contains SQL scripts for setting up and managing the local development database.

## Scripts

- `init-local-db.sql`: Creates the database, tables, and required users
- `verify-db.sql`: Verifies the database setup and structure
- `insert-test-data.sql`: Inserts test data for development
- `cleanup-data.sql`: Removes all data from tables while preserving structure

## Usage

1. Run `init-local-db.sql` to create or recreate the database
2. Run `verify-db.sql` to check the database structure
3. Run `insert-test-data.sql` to populate test data
4. Run `cleanup-data.sql` when you need to clear all data

## Connection Details

- Server: `localhost,1433`
- Database: `DevBillpayer`
- Username: `sa`
- Password: `DevPassword123!`

## Tables

### USER_PAYEE
Stores user payee relationships
- Primary Key: PayeeListID
- Indexes: MemberID

### PAYMENT_HISTORY
Stores payment transactions
- Primary Key: PaymentID
- Foreign Key: PayeeListID references USER_PAYEE

### CHANGE_HISTORY
Stores audit trail of changes
- Indexes: PaymentID

## Users and Roles

- `usrHBAdmin`: Administrative user with full access
- `usrHBUser`: Regular user with restricted access
- `BillPayAdminRole`: Role for administrative access
