USE [DevBillpayer]
GO

-- Insert test data into USER_PAYEE
INSERT INTO [dbo].[USER_PAYEE]
    ([PayeeListID], [MemberID], [PayeeID], [PayeeAliasID], [ProviderID], [Name], [Status], [EntryDate])
VALUES
    ('TEST00000001', 'MEMBER001', 'PAYEE001', 'ALIAS001', 1, 'Test Utility Company', 1, GETDATE()),
    ('TEST00000002', 'MEMBER001', 'PAYEE002', 'ALIAS002', 1, 'Test Phone Company', 1, GETDATE());

-- Insert test payment
INSERT INTO [dbo].[PAYMENT_HISTORY]
    ([PaymentID], [PayeeListID], [Amount], [ProcessedDate], [Status], [EntryDate], [ProviderID])
VALUES
    ('PAY0000001', 'TEST00000001', 10000, GETDATE(), 1, GETDATE(), 1);

-- Insert test change history
INSERT INTO [dbo].[CHANGE_HISTORY]
    ([PaymentID], [UserType], [PayeeID], [PayeeListID], [ChangeDate], [ChangeType], [Amount], [Status], [ProcessedDate])
VALUES
    ('PAY0000001', 1, 'PAYEE001', 'TEST00000001', GETDATE(), 1, 10000, 1, GETDATE());

-- Verify the data
SELECT 'USER_PAYEE' as Table_Name, * FROM [dbo].[USER_PAYEE];
SELECT 'PAYMENT_HISTORY' as Table_Name, * FROM [dbo].[PAYMENT_HISTORY];
SELECT 'CHANGE_HISTORY' as Table_Name, * FROM [dbo].[CHANGE_HISTORY];

-- Test relationships
SELECT 
    up.Name as PayeeName,
    ph.PaymentID,
    ph.Amount / 100.0 as Amount,
    ph.ProcessedDate,
    ch.ChangeType
FROM [dbo].[USER_PAYEE] up
JOIN [dbo].[PAYMENT_HISTORY] ph ON up.PayeeListID = ph.PayeeListID
JOIN [dbo].[CHANGE_HISTORY] ch ON ph.PaymentID = ch.PaymentID
ORDER BY ph.ProcessedDate DESC;
