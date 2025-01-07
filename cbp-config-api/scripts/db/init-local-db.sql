USE [master]
GO

-- Enable contained database authentication
sp_configure 'contained database authentication', 1;
GO
RECONFIGURE;
GO

-- Drop existing database if it exists
IF EXISTS (SELECT name FROM sys.databases WHERE name = N'DevBillpayer')
BEGIN
    ALTER DATABASE [DevBillpayer] SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE [DevBillpayer];
END
GO

-- Create Database
CREATE DATABASE [DevBillpayer] CONTAINMENT = PARTIAL;
GO

-- Create logins first
USE [master]
GO
CREATE LOGIN [usrHBAdmin] WITH PASSWORD = 'DevPassword123!'
GO
CREATE LOGIN [usrHBUser] WITH PASSWORD = 'DevPassword123!'
GO

-- Switch to the new database and create schema
USE [DevBillpayer]
GO

-- Create users
CREATE USER [usrHBAdmin] FOR LOGIN [usrHBAdmin]
GO
CREATE USER [usrHBUser] FOR LOGIN [usrHBUser]
GO

-- Create roles
CREATE ROLE [BillPayAdminRole]
GO
ALTER ROLE [BillPayAdminRole] ADD MEMBER [usrHBAdmin]
GO

-- Create tables (core tables only)
CREATE TABLE [dbo].[USER_PAYEE] (
    [PayeeListID] [char](12) NOT NULL,
    [MemberID] [varchar](32) NOT NULL,
    [PayeeID] [char](12) NOT NULL,
    [PayeeAliasID] [char](12) NOT NULL,
    [ProviderID] [int] NOT NULL,
    [Name] [char](40) NOT NULL,
    [Status] [tinyint] NOT NULL,
    [EntryDate] [datetime] NOT NULL,
    CONSTRAINT [PK_USER_PAYEE] PRIMARY KEY CLUSTERED ([PayeeListID] ASC)
)
GO

CREATE TABLE [dbo].[PAYMENT_HISTORY] (
    [PaymentID] [char](10) NOT NULL,
    [PayeeListID] [char](12) NOT NULL,
    [Amount] [int] NOT NULL,
    [ProcessedDate] [datetime] NOT NULL,
    [Status] [tinyint] NOT NULL,
    [EntryDate] [datetime] NOT NULL,
    [ProviderID] [int] NOT NULL,
    CONSTRAINT [PK_PAYMENT_HISTORY] PRIMARY KEY CLUSTERED ([PaymentID] ASC)
)
GO

CREATE TABLE [dbo].[CHANGE_HISTORY] (
    [PaymentID] [char](10) NOT NULL,
    [UserType] [tinyint] NOT NULL,
    [PayeeID] [char](12) NOT NULL,
    [PayeeListID] [char](12) NOT NULL,
    [ChangeDate] [datetime] NOT NULL,
    [ChangeType] [tinyint] NOT NULL,
    [Amount] [int] NOT NULL,
    [Status] [tinyint] NOT NULL,
    [ProcessedDate] [datetime] NULL
)
GO

-- Add indexes
CREATE NONCLUSTERED INDEX [IX_USER_PAYEE_MemberID] ON [dbo].[USER_PAYEE] ([MemberID] ASC)
GO

CREATE NONCLUSTERED INDEX [IX_PAYMENT_HISTORY_PayeeListID] ON [dbo].[PAYMENT_HISTORY] ([PayeeListID] ASC)
GO

CREATE NONCLUSTERED INDEX [IX_CHANGE_HISTORY_PaymentID] ON [dbo].[CHANGE_HISTORY] ([PaymentID] ASC)
GO

-- Add foreign keys
ALTER TABLE [dbo].[PAYMENT_HISTORY] 
ADD CONSTRAINT [FK_PAYMENT_HISTORY_USER_PAYEE] 
FOREIGN KEY ([PayeeListID]) REFERENCES [dbo].[USER_PAYEE] ([PayeeListID])
GO

-- Add default constraints
ALTER TABLE [dbo].[USER_PAYEE] 
ADD CONSTRAINT [DF_USER_PAYEE_EntryDate] DEFAULT (getdate()) FOR [EntryDate]
GO

ALTER TABLE [dbo].[PAYMENT_HISTORY] 
ADD CONSTRAINT [DF_PAYMENT_HISTORY_EntryDate] DEFAULT (getdate()) FOR [EntryDate]
GO
