USE [DevBillpayer]
GO

-- Disable foreign key constraints
EXEC sp_MSforeachtable "ALTER TABLE ? NOCHECK CONSTRAINT ALL"

-- Delete data from all tables
DELETE FROM [dbo].[CHANGE_HISTORY];
DELETE FROM [dbo].[PAYMENT_HISTORY];
DELETE FROM [dbo].[USER_PAYEE];

-- Re-enable foreign key constraints
EXEC sp_MSforeachtable "ALTER TABLE ? WITH CHECK CHECK CONSTRAINT ALL"

-- Verify tables are empty
SELECT 'USER_PAYEE' as Table_Name, COUNT(*) as Record_Count FROM [dbo].[USER_PAYEE]
UNION ALL
SELECT 'PAYMENT_HISTORY', COUNT(*) FROM [dbo].[PAYMENT_HISTORY]
UNION ALL
SELECT 'CHANGE_HISTORY', COUNT(*) FROM [dbo].[CHANGE_HISTORY];
