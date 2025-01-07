USE [DevBillpayer]
GO

-- Check database settings
SELECT name, containment_desc, compatibility_level
FROM sys.databases
WHERE name = 'DevBillpayer';

-- Check users and roles
SELECT dp.name as principal_name,
       dp.type_desc as principal_type,
       ISNULL(USER_NAME(drm.role_principal_id), '') as role_name
FROM sys.database_principals dp
LEFT JOIN sys.database_role_members drm
    ON dp.principal_id = drm.member_principal_id
WHERE dp.type IN ('S', 'R')  -- S = SQL User, R = Role
    AND dp.name NOT IN ('dbo', 'guest', 'INFORMATION_SCHEMA', 'sys')
ORDER BY dp.type_desc, dp.name;

-- Check table structure
SELECT 
    t.name AS table_name,
    c.name AS column_name,
    TYPE_NAME(c.system_type_id) AS data_type,
    c.max_length,
    c.is_nullable
FROM sys.tables t
INNER JOIN sys.columns c ON t.object_id = c.object_id
WHERE t.name IN ('USER_PAYEE', 'PAYMENT_HISTORY', 'CHANGE_HISTORY')
ORDER BY t.name, c.column_id;

-- Check indexes
SELECT 
    t.name AS table_name,
    i.name AS index_name,
    i.type_desc AS index_type,
    i.is_primary_key
FROM sys.indexes i
INNER JOIN sys.tables t ON i.object_id = t.object_id
WHERE t.name IN ('USER_PAYEE', 'PAYMENT_HISTORY', 'CHANGE_HISTORY')
    AND i.name IS NOT NULL
ORDER BY t.name, i.name;

-- Check foreign keys
SELECT 
    OBJECT_NAME(fk.parent_object_id) AS table_name,
    fk.name AS constraint_name,
    OBJECT_NAME(fk.referenced_object_id) AS referenced_table
FROM sys.foreign_keys fk
WHERE OBJECT_NAME(fk.parent_object_id) IN ('USER_PAYEE', 'PAYMENT_HISTORY', 'CHANGE_HISTORY')
ORDER BY table_name;
