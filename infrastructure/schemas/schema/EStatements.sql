USE [master]
GO
/****** Object:  Database [EStatements]    Script Date: 1/4/2025 10:19:24 AM ******/
CREATE DATABASE [EStatements]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'EStatements', FILENAME = N'E:\SQLDEVDBs\SQLData\EStatements\EStatements.mdf' , SIZE = 2561024KB , MAXSIZE = UNLIMITED, FILEGROWTH = 262144KB )
 LOG ON 
( NAME = N'EStatements_log', FILENAME = N'E:\SQLDEVDBs\SQLLog\EStatements\EStatements_log.ldf' , SIZE = 485248KB , MAXSIZE = 2048GB , FILEGROWTH = 262144KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [EStatements] SET COMPATIBILITY_LEVEL = 120
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [EStatements].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [EStatements] SET ANSI_NULL_DEFAULT ON 
GO
ALTER DATABASE [EStatements] SET ANSI_NULLS ON 
GO
ALTER DATABASE [EStatements] SET ANSI_PADDING ON 
GO
ALTER DATABASE [EStatements] SET ANSI_WARNINGS ON 
GO
ALTER DATABASE [EStatements] SET ARITHABORT ON 
GO
ALTER DATABASE [EStatements] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [EStatements] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [EStatements] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [EStatements] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [EStatements] SET CURSOR_DEFAULT  LOCAL 
GO
ALTER DATABASE [EStatements] SET CONCAT_NULL_YIELDS_NULL ON 
GO
ALTER DATABASE [EStatements] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [EStatements] SET QUOTED_IDENTIFIER ON 
GO
ALTER DATABASE [EStatements] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [EStatements] SET  DISABLE_BROKER 
GO
ALTER DATABASE [EStatements] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [EStatements] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [EStatements] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [EStatements] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [EStatements] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [EStatements] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [EStatements] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [EStatements] SET RECOVERY FULL 
GO
ALTER DATABASE [EStatements] SET  MULTI_USER 
GO
ALTER DATABASE [EStatements] SET PAGE_VERIFY NONE  
GO
ALTER DATABASE [EStatements] SET DB_CHAINING OFF 
GO
ALTER DATABASE [EStatements] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [EStatements] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [EStatements] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [EStatements] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'EStatements', N'ON'
GO
ALTER DATABASE [EStatements] SET QUERY_STORE = OFF
GO
USE [EStatements]
GO
/****** Object:  User [WB\gmallo]    Script Date: 1/4/2025 10:19:24 AM ******/
CREATE USER [WB\gmallo] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [WB\Developers]    Script Date: 1/4/2025 10:19:24 AM ******/
CREATE USER [WB\Developers]
GO
/****** Object:  User [WB\bmartin]    Script Date: 1/4/2025 10:19:24 AM ******/
CREATE USER [WB\bmartin] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [ttams]    Script Date: 1/4/2025 10:19:24 AM ******/
CREATE USER [ttams] FOR LOGIN [ttams] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [nao]    Script Date: 1/4/2025 10:19:24 AM ******/
CREATE USER [nao] FOR LOGIN [nao] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [mkt]    Script Date: 1/4/2025 10:19:24 AM ******/
CREATE USER [mkt] WITHOUT LOGIN WITH DEFAULT_SCHEMA=[mkt]
GO
/****** Object:  User [LSuarez]    Script Date: 1/4/2025 10:19:24 AM ******/
CREATE USER [LSuarez] WITHOUT LOGIN WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [KMartinez]    Script Date: 1/4/2025 10:19:24 AM ******/
CREATE USER [KMartinez] WITHOUT LOGIN WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [JFaust]    Script Date: 1/4/2025 10:19:24 AM ******/
CREATE USER [JFaust] FOR LOGIN [JFaust] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [imssa]    Script Date: 1/4/2025 10:19:24 AM ******/
CREATE USER [imssa] WITHOUT LOGIN WITH DEFAULT_SCHEMA=[imssa]
GO
/****** Object:  User [IMSReport]    Script Date: 1/4/2025 10:19:24 AM ******/
CREATE USER [IMSReport] WITHOUT LOGIN WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [ims]    Script Date: 1/4/2025 10:19:24 AM ******/
CREATE USER [ims] WITHOUT LOGIN WITH DEFAULT_SCHEMA=[ims]
GO
/****** Object:  User [HMontoya]    Script Date: 1/4/2025 10:19:24 AM ******/
CREATE USER [HMontoya] WITHOUT LOGIN WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [estatement]    Script Date: 1/4/2025 10:19:24 AM ******/
CREATE USER [estatement] FOR LOGIN [estatement] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [DirectAccessTest]    Script Date: 1/4/2025 10:19:24 AM ******/
CREATE USER [DirectAccessTest] WITHOUT LOGIN WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [CAlcala]    Script Date: 1/4/2025 10:19:24 AM ******/
CREATE USER [CAlcala] WITHOUT LOGIN WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [awarnick]    Script Date: 1/4/2025 10:19:24 AM ******/
CREATE USER [awarnick] FOR LOGIN [awarnick] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [WB\gmallo]
GO
ALTER ROLE [db_owner] ADD MEMBER [WB\Developers]
GO
ALTER ROLE [db_datareader] ADD MEMBER [WB\Developers]
GO
ALTER ROLE [db_datawriter] ADD MEMBER [WB\Developers]
GO
ALTER ROLE [db_owner] ADD MEMBER [WB\bmartin]
GO
ALTER ROLE [db_owner] ADD MEMBER [ttams]
GO
ALTER ROLE [db_owner] ADD MEMBER [nao]
GO
ALTER ROLE [db_datareader] ADD MEMBER [nao]
GO
ALTER ROLE [db_datawriter] ADD MEMBER [nao]
GO
ALTER ROLE [db_owner] ADD MEMBER [LSuarez]
GO
ALTER ROLE [db_owner] ADD MEMBER [KMartinez]
GO
ALTER ROLE [db_accessadmin] ADD MEMBER [JFaust]
GO
ALTER ROLE [db_datareader] ADD MEMBER [JFaust]
GO
ALTER ROLE [db_datawriter] ADD MEMBER [JFaust]
GO
ALTER ROLE [db_owner] ADD MEMBER [HMontoya]
GO
ALTER ROLE [db_owner] ADD MEMBER [estatement]
GO
ALTER ROLE [db_owner] ADD MEMBER [CAlcala]
GO
ALTER ROLE [db_datareader] ADD MEMBER [awarnick]
GO
/****** Object:  Schema [AdminUserAccess]    Script Date: 1/4/2025 10:19:24 AM ******/
CREATE SCHEMA [AdminUserAccess]
GO
/****** Object:  Schema [ims]    Script Date: 1/4/2025 10:19:24 AM ******/
CREATE SCHEMA [ims]
GO
/****** Object:  Schema [imssa]    Script Date: 1/4/2025 10:19:24 AM ******/
CREATE SCHEMA [imssa]
GO
/****** Object:  Schema [mkt]    Script Date: 1/4/2025 10:19:24 AM ******/
CREATE SCHEMA [mkt]
GO
/****** Object:  Default [DF__mech__trandateti__10AB74EC]    Script Date: 1/4/2025 10:19:24 AM ******/
CREATE DEFAULT [dbo].[DF__mech__trandateti__10AB74EC] 
AS
getdate()
GO
/****** Object:  Default [DF_DIAL_IDNT_Client]    Script Date: 1/4/2025 10:19:24 AM ******/
CREATE DEFAULT [dbo].[DF_DIAL_IDNT_Client] 
AS
''
GO
/****** Object:  Default [DF_eFundsManualApprovalSetup_IgnoreUnAssigned]    Script Date: 1/4/2025 10:19:24 AM ******/
CREATE DEFAULT [dbo].[DF_eFundsManualApprovalSetup_IgnoreUnAssigned] 
AS
1
GO
/****** Object:  Default [DF_EquifaxDIAL_DefaultID]    Script Date: 1/4/2025 10:19:24 AM ******/
CREATE DEFAULT [dbo].[DF_EquifaxDIAL_DefaultID] 
AS
0
GO
/****** Object:  Default [DF_tblImage_iSequenceNumber]    Script Date: 1/4/2025 10:19:24 AM ******/
CREATE DEFAULT [dbo].[DF_tblImage_iSequenceNumber] 
AS
(-1)
GO
/****** Object:  Default [DF_tblImage_iOriginFileNum]    Script Date: 1/4/2025 10:19:24 AM ******/
CREATE DEFAULT [ims].[DF_tblImage_iOriginFileNum] 
AS
0
GO
/****** Object:  Default [DF_tblImage_iSequenceNumber]    Script Date: 1/4/2025 10:19:24 AM ******/
CREATE DEFAULT [ims].[DF_tblImage_iSequenceNumber] 
AS
(-1)
GO
/****** Object:  Default [DF_tblImage_iTiffEncoding]    Script Date: 1/4/2025 10:19:24 AM ******/
CREATE DEFAULT [ims].[DF_tblImage_iTiffEncoding] 
AS
(-1)
GO
/****** Object:  Default [DF_tblImageFile_cJpegFileName]    Script Date: 1/4/2025 10:19:24 AM ******/
CREATE DEFAULT [ims].[DF_tblImageFile_cJpegFileName] 
AS
' '
GO
/****** Object:  Default [TIMESTAMP]    Script Date: 1/4/2025 10:19:24 AM ******/
CREATE DEFAULT [ims].[TIMESTAMP] 
AS
CURRENT_TIMESTAMP
GO
/****** Object:  Default [DF_tblImage_iOriginFileNum]    Script Date: 1/4/2025 10:19:24 AM ******/
CREATE DEFAULT [imssa].[DF_tblImage_iOriginFileNum] 
AS
0
GO
/****** Object:  Default [DF_tblImage_iTiffEncoding]    Script Date: 1/4/2025 10:19:24 AM ******/
CREATE DEFAULT [imssa].[DF_tblImage_iTiffEncoding] 
AS
(-1)
GO
/****** Object:  Default [DF_tblImageFile_cJpegFileName]    Script Date: 1/4/2025 10:19:24 AM ******/
CREATE DEFAULT [imssa].[DF_tblImageFile_cJpegFileName] 
AS
' '
GO
/****** Object:  UserDefinedFunction [dbo].[fn_Split]    Script Date: 1/4/2025 10:19:24 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE FUNCTION [dbo].[fn_Split]
(
	@String nvarchar(2000),
	@Delimiter nvarchar(5)
)  
RETURNS @RtnValue table 
(
	Id int identity(1,1),
	Data nvarchar(100)
) 
AS  
BEGIN 
	Declare @Cnt int
	Set @Cnt = 1

	While (Charindex(@Delimiter,@String)>0)
	Begin
		Insert Into @RtnValue (data)
		Select 
			Data = ltrim(rtrim(Substring(@String,1,Charindex(@Delimiter,@String)-1)))

		Set @String = Substring(@String,Charindex(@Delimiter,@String)+1,len(@String))
		Set @Cnt = @Cnt + 1
	End
	
	Insert Into @RtnValue (data)
	Select Data = ltrim(rtrim(@String))

	Return
END

GO
/****** Object:  View [dbo].[COOP_Rest]    Script Date: 1/4/2025 10:19:24 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE VIEW [dbo].[COOP_Rest]
AS
SELECT     TOP 100 PERCENT ATMId, TranType
FROM         dbo.COOP_Trans
GROUP BY ATMId, TranType
HAVING      (TranType = 'Restricted Area')
ORDER BY ATMId
GO
/****** Object:  View [dbo].[COOP_NonRest]    Script Date: 1/4/2025 10:19:24 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE VIEW [dbo].[COOP_NonRest]
AS
SELECT     dbo.COOP_ATMs.*
FROM         dbo.COOP_ATMs LEFT OUTER JOIN
                      dbo.COOP_Rest ON dbo.COOP_ATMs.Id = dbo.COOP_Rest.ATMId
WHERE     (dbo.COOP_Rest.TranType IS NULL)
GO
/****** Object:  Table [dbo].[udt_SSubAccounts]    Script Date: 1/4/2025 10:19:24 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[udt_SSubAccounts](
	[TrackingNum] [int] IDENTITY(1,1) NOT NULL,
	[DescAbrv] [char](3) NOT NULL,
	[ACC] [char](3) NULL,
	[PreapproveCode] [char](10) NULL,
	[MinBalance] [char](10) NULL,
	[Description] [char](20) NULL,
	[Required] [char](1) NULL,
	[AutoAdd] [char](1) NULL,
	[OverdraftTarget] [char](1) NULL,
	[OverdraftSource] [char](1) NULL,
	[Requires] [char](30) NULL,
	[MinAge] [int] NULL,
	[MaxAge] [int] NULL,
	[ProductType] [char](4) NULL,
	[StartSuffix] [char](15) NULL,
	[StopSuffix] [char](15) NULL,
	[CurrBranch] [char](2) NULL,
	[APR] [char](10) NULL,
	[MaturityDays] [smallint] NULL,
	[StatementOrder] [char](10) NULL,
	[TotalAllowed] [int] NULL,
	[AllowPlastic1] [char](1) NULL,
	[AllowPlastic2] [char](1) NULL,
	[AllowPlastic3] [char](1) NULL,
	[AllowPlastic4] [char](1) NULL,
	[PromptMICR] [char](1) NULL,
	[MICRRequired] [char](1) NULL,
	[MinMICRLength] [smallint] NULL,
	[MaxMICRLength] [smallint] NULL,
	[AccountTypes] [char](80) NULL,
	[MaturityDisp] [char](4) NULL,
	[DividendDisp] [char](4) NULL,
	[CreateHost] [char](1) NULL,
	[HostCommand] [char](4) NULL,
	[TaxCode] [char](1) NULL,
	[ServiceClass] [char](4) NULL,
	[JointTaxCode] [char](1) NULL,
	[APREditCode] [char](1) NULL,
	[W8TaxCode] [char](1) NULL,
	[AcceptDeposits] [char](1) NULL,
	[AllowJoint] [char](1) NULL,
	[AllowBen] [char](1) NULL,
	[AllowPlastic] [char](1) NULL,
	[AllowODP] [char](1) NULL,
	[AllowIVR] [char](1) NULL,
	[FlagNumber1] [smallint] NULL,
	[FlagLevel1] [char](1) NULL,
	[FlagType1] [char](1) NULL,
	[FlagValue1] [smallint] NULL,
	[FlagNumber2] [smallint] NULL,
	[FlagLevel2] [char](1) NULL,
	[FlagType2] [char](1) NULL,
	[FlagValue2] [smallint] NULL,
	[FlagNumber3] [smallint] NULL,
	[FlagLevel3] [char](1) NULL,
	[FlagType3] [char](1) NULL,
	[FlagValue3] [smallint] NULL,
	[FlagNumber4] [smallint] NULL,
	[FlagLevel4] [char](1) NULL,
	[FlagType4] [char](1) NULL,
	[FlagValue4] [smallint] NULL,
	[MICRBegin] [char](5) NULL,
	[MICREnd] [char](5) NULL,
	[MICRFormat] [char](30) NULL,
	[Exclude] [char](40) NULL,
	[PromptCheckOrder] [char](1) NULL,
	[CheckOrderTypes] [char](2) NULL,
	[PreapprovalFlags] [char](250) NULL,
	[HighPaperGrade] [char](1) NULL,
	[LowPaperGrade] [char](1) NULL,
	[AllowDescriptionChange] [char](1) NULL,
	[Category] [char](15) NULL,
	[SuffixRange] [char](30) NULL
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[SubAccounts]    Script Date: 1/4/2025 10:19:24 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[SubAccounts]
AS
SELECT     TOP 100 PERCENT *
FROM         udt_SSubAccounts
ORDER BY ProductType, DescAbrv
GO
/****** Object:  View [dbo].[Coop_Trans_Dep]    Script Date: 1/4/2025 10:19:24 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[Coop_Trans_Dep]
AS
SELECT     dbo.COOP_ATMs.Id, ct.TranType AS trans, dbo.COOP_Trans.TranType
FROM         dbo.COOP_ATMs INNER JOIN
                      dbo.COOP_Trans ON dbo.COOP_ATMs.Id = dbo.COOP_Trans.ATMId LEFT OUTER JOIN
                      dbo.COOP_Trans ct ON dbo.COOP_ATMs.Id = ct.ATMId

GO
/****** Object:  View [dbo].[eFundsManualApprovalListView]    Script Date: 1/4/2025 10:19:24 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[eFundsManualApprovalListView]
AS
SELECT     MasterReasonCode, LocalReasonCode, Description, CONVERT(varchar(255),(CASE  WHEN charindex('!CURRENT_DATE_VALUE!', ManualApprovalNode) > 0 THEN replace(ManualApprovalNode, '!CURRENT_DATE_VALUE!', RIGHT(CONVERT(char(4), datepart(year, dateadd(mm, - 24, getdate()))), 2) + CONVERT(char(2), datepart(month, dateadd(mm, - 24, getdate()))) + CONVERT(char(2), datepart(day, dateadd(mm, - 24, getdate())))) ELSE ManualApprovalNode END)) as ManualApprovalNode, ManualApprovalSetupKey
FROM         eFundsManualApprovalList
GO
/****** Object:  View [dbo].[eFundsManualApprovalSetupView]    Script Date: 1/4/2025 10:19:24 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[eFundsManualApprovalSetupView]
AS
SELECT     ManualApprovalSetupKey, CONVERT(varchar(255),(CASE  WHEN charindex('CURRENT_DATE_VALUE', ManualApprovalNode) > 0 THEN replace(ManualApprovalNode, '!CURRENT_DATE_VALUE!', RIGHT(CONVERT(char(4), datepart(year, dateadd(mm, - 24, getdate()))), 2) + CONVERT(char(2), datepart(month, dateadd(mm, - 24, getdate()))) + CONVERT(char(2), datepart(day, dateadd(mm, - 24, getdate())))) ELSE ManualApprovalNode END)) as ManualApprovalNode, NodeRule, LocalReasonCode, StringSeperationValue, ChildNode, IgnoreUnAssigned, RIGHT(CONVERT(char(4), DATEPART(year, GETDATE())), 2) + CONVERT(char(2), DATEPART(month, GETDATE())) + CONVERT(char(2), DATEPART(day, GETDATE())) AS THRESHOLD
FROM         eFundsManualApprovalSetup
GO
/****** Object:  Table [AdminUserAccess].[AdminUser]    Script Date: 1/4/2025 10:19:24 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [AdminUserAccess].[AdminUser](
	[AdminUserId] [bigint] IDENTITY(1,1) NOT NULL,
	[AdminUsername] [nvarchar](50) NOT NULL,
	[AdminUserGroupId] [bigint] NULL,
	[DocuSignUserName] [nvarchar](255) NULL,
	[OnlineBankingAdminTellerId] [varchar](100) NULL,
	[LastPasswordChange] [datetimeoffset](7) NULL,
	[PasswordHash] [varchar](max) NOT NULL,
	[PolicyId] [varchar](64) NOT NULL,
	[LoginFailures] [smallint] NOT NULL,
	[Active] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[AdminUserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [AK_AdminUser_AdminUsername] UNIQUE NONCLUSTERED 
(
	[AdminUsername] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [AdminUserAccess].[AdminUserAccessArea]    Script Date: 1/4/2025 10:19:24 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [AdminUserAccess].[AdminUserAccessArea](
	[AdminUserAccessAreaId] [bigint] IDENTITY(1,1) NOT NULL,
	[AdminUserAccessAreaName] [nvarchar](100) NULL,
	[AdminUserAccessAreaDescription] [nvarchar](200) NULL,
PRIMARY KEY CLUSTERED 
(
	[AdminUserAccessAreaId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 90, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [AK_AdminUserAccessArea_AdminUserAccessAreaName] UNIQUE NONCLUSTERED 
(
	[AdminUserAccessAreaName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [AdminUserAccess].[AdminUserDocumentTypeAccessArea]    Script Date: 1/4/2025 10:19:24 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [AdminUserAccess].[AdminUserDocumentTypeAccessArea](
	[AdminUserAccessAreaId] [bigint] NOT NULL,
	[DocumentTypesId] [int] NOT NULL,
	[CanView] [bit] NOT NULL,
	[CanUpdate] [bit] NOT NULL,
	[CanSendNotifications] [bit] NOT NULL,
	[CanReleaseToMembers] [bit] NOT NULL,
	[CanReleaseToInternal] [bit] NOT NULL,
 CONSTRAINT [PK_AdminUserDocumentTypeAccessArea] PRIMARY KEY CLUSTERED 
(
	[AdminUserAccessAreaId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [AK_AdminUserDocumentTypeAccessArea_AdminUserAccessAreaId] UNIQUE NONCLUSTERED 
(
	[AdminUserAccessAreaId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [AdminUserAccess].[AdminUserGroup]    Script Date: 1/4/2025 10:19:24 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [AdminUserAccess].[AdminUserGroup](
	[AdminUserGroupId] [bigint] IDENTITY(1,1) NOT NULL,
	[AdminUserGroupName] [nvarchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[AdminUserGroupId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [AK_AdminUserGroup_AdminUserGroupName] UNIQUE NONCLUSTERED 
(
	[AdminUserGroupName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [AdminUserAccess].[AdminUserGroupAccessAreaLookup]    Script Date: 1/4/2025 10:19:24 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [AdminUserAccess].[AdminUserGroupAccessAreaLookup](
	[AdminUserGroupAccessAreaLookupId] [bigint] IDENTITY(1,1) NOT NULL,
	[AdminUserGroupId] [bigint] NOT NULL,
	[AdminUserAccessAreaId] [bigint] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[AdminUserGroupAccessAreaLookupId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ_AdminUserGroupAccessAreaLookup_AdminUserGroupId_AdminUserAccessAreaId] UNIQUE NONCLUSTERED 
(
	[AdminUserGroupId] ASC,
	[AdminUserAccessAreaId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AccessFlags]    Script Date: 1/4/2025 10:19:24 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AccessFlags](
	[AccessCategory] [char](20) NULL,
	[AccessName] [char](40) NULL,
	[AccessType] [char](10) NULL,
	[AccessValues] [char](500) NULL,
	[DefaultValue] [char](100) NULL,
	[CategoryDesc] [char](50) NULL,
	[NameDesc] [char](255) NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [AccessFlags5]    Script Date: 1/4/2025 10:19:24 AM ******/
CREATE CLUSTERED INDEX [AccessFlags5] ON [dbo].[AccessFlags]
(
	[AccessName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AppConfigCategory]    Script Date: 1/4/2025 10:19:24 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AppConfigCategory](
	[CategoryID] [int] IDENTITY(1,1) NOT NULL,
	[Category] [char](1) NOT NULL,
	[Description] [varchar](20) NULL,
	[Active] [int] NULL,
 CONSTRAINT [PK_AppConfigCategory] PRIMARY KEY CLUSTERED 
(
	[CategoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AppConfigDetail]    Script Date: 1/4/2025 10:19:24 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AppConfigDetail](
	[ItemName] [varchar](30) NOT NULL,
	[ItemDescription] [varchar](200) NULL,
	[ItemCategories] [varchar](50) NULL,
	[ItemValueOptions] [varchar](200) NULL,
	[ItemViewLevel] [int] NULL,
	[ItemEditLevel] [int] NULL,
 CONSTRAINT [PK_AppConfigDetail] PRIMARY KEY CLUSTERED 
(
	[ItemName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BatchMemberNotices]    Script Date: 1/4/2025 10:19:24 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BatchMemberNotices](
	[NotificationID] [int] NOT NULL,
	[NotificationType] [char](16) NOT NULL,
	[Account] [int] NOT NULL,
	[FileID] [int] NOT NULL,
	[StartDate] [datetime] NULL,
	[EndDate] [datetime] NULL,
	[StartByte] [int] NOT NULL,
	[EndByte] [int] NOT NULL,
	[Pages] [smallint] NULL,
	[SSN] [char](9) NULL,
	[Member] [char](30) NULL,
	[Email] [char](60) NULL,
	[NoticePending] [char](1) NULL,
	[SentDate] [datetime] NULL,
	[SentEmail] [char](200) NULL,
	[SendCount] [int] NULL,
	[SendDate] [datetime] NULL,
	[SLType] [char](1) NULL,
	[Suffix] [smallint] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BatchNotificationFile]    Script Date: 1/4/2025 10:19:24 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BatchNotificationFile](
	[FileID] [int] NOT NULL,
	[FileName] [char](255) NOT NULL,
	[JobFile] [char](255) NULL,
	[ImportFile] [char](255) NULL,
	[ImportFileType] [char](30) NULL,
	[NeverUpdate] [char](1) NULL,
	[Available] [char](1) NULL,
	[NoticePending] [char](1) NULL,
	[BinaryData] [char](1) NULL,
	[FeeAccess] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CheckImageRequest]    Script Date: 1/4/2025 10:19:24 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CheckImageRequest](
	[RequestDate] [datetime] NULL,
	[CheckAccountNumber] [nvarchar](20) NULL,
	[CheckNumber] [nvarchar](10) NULL,
	[ClientIP] [char](15) NULL,
	[WebIP] [char](15) NULL,
	[ClusterID] [char](10) NULL,
	[LastModified] [datetime] NULL,
	[ID] [int] IDENTITY(1,1) NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CheckImagingMetaData]    Script Date: 1/4/2025 10:19:24 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CheckImagingMetaData](
	[URL] [char](100) NULL,
	[Port] [char](10) NULL,
	[URI] [char](100) NULL,
	[Configuration] [int] NULL,
	[HashPwd] [char](100) NULL,
	[UserName] [char](50) NULL,
	[Pwd] [char](50) NULL,
	[VendorID] [char](50) NULL,
	[OrgID] [char](50) NULL,
	[UUID] [char](50) NULL,
	[ID] [int] IDENTITY(1,1) NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CheckLog]    Script Date: 1/4/2025 10:19:24 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CheckLog](
	[TellerInitials] [char](10) NOT NULL,
	[Account] [char](15) NOT NULL,
	[Suffix] [char](15) NOT NULL,
	[TranDate] [datetime] NOT NULL,
	[StartingChkNum] [int] NOT NULL,
	[NumChecks] [int] NOT NULL,
	[TrackingNum] [int] NULL,
	[TranType] [char](1) NULL,
	[Branch] [char](4) NULL,
	[Line1] [char](30) NULL,
	[Line2] [char](30) NULL,
	[Line3] [char](30) NULL,
	[Line4] [char](30) NULL,
	[City] [char](30) NULL,
	[State] [char](2) NULL,
	[Zip] [char](10) NULL,
	[SecondName] [char](30) NULL,
	[Sequence] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DocumentTemplates]    Script Date: 1/4/2025 10:19:24 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DocumentTemplates](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[TemplateName] [nvarchar](250) NOT NULL,
	[DocuSignId] [nvarchar](50) NOT NULL,
	[UniqueString] [nvarchar](max) NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[UpdatedDate] [datetime] NULL,
	[DeletedDate] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DocumentTypes]    Script Date: 1/4/2025 10:19:24 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DocumentTypes](
	[DocumentTypesID] [int] IDENTITY(1,1) NOT NULL,
	[FileType] [char](20) NOT NULL,
	[NotificationTypes] [char](255) NOT NULL,
	[Description] [char](255) NOT NULL,
	[SortOrder] [int] NOT NULL,
	[IsCheckImageType] [bit] NOT NULL,
 CONSTRAINT [PK_DocumentTypes] PRIMARY KEY CLUSTERED 
(
	[DocumentTypesID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Flags]    Script Date: 1/4/2025 10:19:24 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Flags](
	[TrackingNum] [int] NOT NULL,
	[Sequence] [tinyint] NOT NULL,
	[Account] [bigint] NULL,
	[Surname] [char](2) NULL,
	[Suffix] [smallint] NULL,
	[FlagLevel] [char](1) NULL,
	[FlagType] [char](1) NULL,
	[FlagNumber] [smallint] NULL,
	[Processed] [smallint] NULL,
	[FlagValue] [smallint] NULL,
	[FlagDate] [datetime] NULL,
	[ClientIP] [char](15) NULL,
	[WebIP] [char](15) NULL,
	[ClusterID] [char](10) NULL,
	[LastModified] [datetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Index [Tracking]    Script Date: 1/4/2025 10:19:25 AM ******/
CREATE CLUSTERED INDEX [Tracking] ON [dbo].[Flags]
(
	[TrackingNum] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MemberFile]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MemberFile](
	[Account] [bigint] NULL,
	[Password] [char](24) NULL,
	[LastPassChange] [datetime] NULL,
	[FName] [char](30) NULL,
	[MInitial] [char](2) NULL,
	[LName] [char](20) NULL,
	[Gender] [char](1) NULL,
	[SSN] [char](9) NULL,
	[DOB] [datetime] NULL,
	[EMail1] [char](60) NULL,
	[Branch] [char](10) NULL,
	[Employee] [char](6) NULL,
	[CrossAcctCount] [tinyint] NULL,
	[MaidenName] [char](30) NULL,
	[Residence] [char](6) NULL,
	[DriversLicenseState] [char](2) NULL,
	[DriversLicenseNum] [char](30) NULL,
	[RefCode] [char](1) NULL,
	[ImportTS] [datetime] NULL,
	[ClientIP] [char](15) NULL,
	[WebIP] [char](15) NULL,
	[ClusterID] [char](10) NULL,
	[LastModified] [datetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MemberNotices]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MemberNotices](
	[NotificationID] [int] NOT NULL,
	[NotificationType] [char](16) NOT NULL,
	[Account] [varchar](20) NOT NULL,
	[FileID] [int] NOT NULL,
	[StartDate] [datetime] NULL,
	[EndDate] [datetime] NULL,
	[StartByte] [bigint] NOT NULL,
	[EndByte] [bigint] NOT NULL,
	[Pages] [int] NULL,
	[SSN] [char](11) NULL,
	[NoticePending] [char](1) NULL,
	[SentDate] [datetime] NULL,
	[SentEmail] [char](200) NULL,
	[SendCount] [int] NULL,
	[SendDate] [datetime] NULL,
	[SLType] [char](1) NULL,
	[Suffix] [int] NULL,
	[StartPage] [int] NULL,
	[EndPage] [int] NULL,
	[BinaryData] [char](10) NULL,
	[LastModified] [datetime] NULL,
	[suffix2] [smallint] NULL,
	[EmailID] [int] NULL,
	[IsLegacy] [bit] NULL,
	[MemberNumber] [varchar](20) NULL,
	[PersonNumber] [varchar](20) NULL,
	[Name] [char](100) NULL,
 CONSTRAINT [PK_MemberNotices] PRIMARY KEY CLUSTERED 
(
	[NotificationID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MemoFile]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MemoFile](
	[Account] [int] NULL,
	[Suffix] [smallint] NULL,
	[MemoNumber] [int] NULL,
	[Description] [char](60) NULL,
	[EntryDate] [datetime] NULL,
	[Expiration] [datetime] NULL,
	[MemoLevel] [char](1) NULL,
	[ClientIP] [char](15) NULL,
	[WebIP] [char](15) NULL,
	[ClusterID] [char](10) NULL,
	[LastModified] [datetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Index [Account]    Script Date: 1/4/2025 10:19:25 AM ******/
CREATE CLUSTERED INDEX [Account] ON [dbo].[MemoFile]
(
	[Account] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MSLFlags]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MSLFlags](
	[Account] [bigint] NULL,
	[FlagLevel] [char](1) NULL,
	[Surname] [char](2) NULL,
	[FlagType] [char](1) NULL,
	[Suffix] [smallint] NULL,
	[FlagNumber] [tinyint] NULL,
	[FlagValue] [tinyint] NULL,
	[ImportTS] [datetime] NULL,
	[Pending] [int] NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [AccountLevel]    Script Date: 1/4/2025 10:19:25 AM ******/
CREATE CLUSTERED INDEX [AccountLevel] ON [dbo].[MSLFlags]
(
	[Account] ASC,
	[FlagLevel] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[NextNotificationID]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NextNotificationID](
	[NotificationID] [int] NOT NULL,
	[FileID] [int] NOT NULL,
	[ClientIP] [char](15) NULL,
	[WebIP] [char](15) NULL,
	[ClusterID] [char](10) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[NextTrackingNum]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NextTrackingNum](
	[TrackingNum] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[NotificationFile]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NotificationFile](
	[FileID] [int] NOT NULL,
	[FileName] [char](255) NOT NULL,
	[Available] [char](1) NULL,
	[NoticePending] [char](1) NULL,
	[BinaryData] [char](1) NULL,
	[FeeAccess] [int] NULL,
	[AlertID] [char](32) NULL,
	[GroupFileID] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PSCUConfig]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PSCUConfig](
	[PSIClientId] [int] NULL,
	[OrgId] [char](10) NULL,
	[ClientName] [char](20) NULL,
	[PSCU_URL] [char](50) NULL,
	[SignonURI] [char](100) NULL,
	[LoginURI] [char](100) NULL,
	[DataURI] [char](100) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RefMon]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RefMon](
	[SessionID] [char](60) NOT NULL,
	[SessionKey] [char](168) NOT NULL,
	[Account] [int] NULL,
	[TellerInitials] [char](3) NULL,
	[SSN] [int] NULL,
	[SessionExp] [datetime] NULL,
	[TranCounter] [int] NULL,
	[ClientIP] [char](15) NULL,
	[WebIP] [char](15) NULL,
	[ClusterID] [char](10) NULL,
 CONSTRAINT [PK_RefMon] PRIMARY KEY CLUSTERED 
(
	[SessionID] ASC,
	[SessionKey] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RefMonConfig]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RefMonConfig](
	[CheckLogic] [char](200) NULL,
	[Sequence] [tinyint] NULL,
	[TransactionType] [char](20) NULL,
	[Mode] [char](2) NULL,
	[XMLSessionID] [char](100) NULL,
	[XMLSessionKey] [char](100) NULL,
	[XMLAccount] [char](100) NULL,
	[XMLSSN] [char](100) NULL,
	[XMLTellerInitials] [char](100) NULL,
	[RelatedMode] [char](2) NULL,
	[RelatedXMLData] [char](100) NULL,
	[RelatedDBField] [char](10) NULL,
	[RelatedType] [char](20) NULL,
	[ID] [int] IDENTITY(1,1) NOT NULL,
 CONSTRAINT [PK_RefMonConfig] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RefMonRelated]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RefMonRelated](
	[RelatedType] [char](20) NULL,
	[SessionID] [int] NOT NULL,
	[RelatedData] [char](200) NULL,
	[Sequence] [smallint] NOT NULL,
	[RelationType] [char](20) NULL,
 CONSTRAINT [PK_RefMonRelated] PRIMARY KEY CLUSTERED 
(
	[SessionID] ASC,
	[Sequence] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SDNAcctCross]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SDNAcctCross](
	[SDNAccount] [int] NULL,
	[ShareAccount] [int] NULL,
	[ShareSuffix] [smallint] NULL,
	[LoanAccount] [int] NULL,
	[LoanSuffix] [smallint] NULL,
	[ClientIP] [char](15) NULL,
	[WebIP] [char](15) NULL,
	[ClusterID] [char](10) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SecureFormTemplateContents]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SecureFormTemplateContents](
	[Id] [int] NOT NULL,
	[Content] [varbinary](max) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SecureFormTemplateFields]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SecureFormTemplateFields](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[TemplateId] [int] NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[Type] [smallint] NOT NULL,
 CONSTRAINT [PK_SecureFormTemplateFields] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [AK_SecureFormTemplateFields_FieldName] UNIQUE NONCLUSTERED 
(
	[TemplateId] ASC,
	[Name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SecureFormTemplates]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SecureFormTemplates](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[Output] [smallint] NOT NULL,
	[DocuSignTemplateId] [nvarchar](50) NULL,
 CONSTRAINT [PK__SecureFo__3214EC07ED1D2B85] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SignatureDocumentContents]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SignatureDocumentContents](
	[Id] [int] NOT NULL,
	[Completed] [bit] NOT NULL,
	[Content] [varbinary](max) NOT NULL,
 CONSTRAINT [PK_SignatureDocumentContent] PRIMARY KEY CLUSTERED 
(
	[Id] ASC,
	[Completed] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SignatureDocuments]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SignatureDocuments](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[AccountId] [nvarchar](50) NOT NULL,
	[MembershipUserId] [nvarchar](50) NOT NULL,
	[EnvelopeId] [nvarchar](50) NULL,
	[DocumentId] [nvarchar](50) NOT NULL,
	[Status] [nvarchar](50) NOT NULL,
	[RequestedByAdminUserId] [bigint] NOT NULL,
	[SecureMessageId] [bigint] NULL,
	[CreatedDate] [datetime] NOT NULL,
	[UpdatedDate] [datetime] NULL,
	[DeletedDate] [datetime] NULL,
	[DocumentName] [nvarchar](250) NULL,
	[PrimaryEmail] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK_SignatureDocument] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SymFlags]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SymFlags](
	[Sequence] [int] NULL,
	[Account] [int] NULL,
	[Surname] [char](2) NULL,
	[Suffix] [int] NULL,
	[FlagLevel] [char](1) NULL,
	[FlagType] [char](1) NULL,
	[FlagNumber] [int] NULL,
	[FlagValue] [int] NULL,
	[FlagDate] [datetime] NULL,
	[LastModified] [datetime] NULL,
	[Processed] [varchar](1) NULL,
	[TrackingNum] [int] NULL,
	[ClientIP] [char](15) NULL,
	[WebIP] [char](15) NULL,
	[ClusterID] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblImage]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblImage](
	[Account] [int] NOT NULL,
	[IndexId] [int] NOT NULL,
	[FileId] [int] NOT NULL,
	[CheckNumber] [int] NOT NULL,
	[OriginalDEOffset] [int] NOT NULL,
	[OriginFileNum] [int] NOT NULL,
	[TiffFileOffsetFront] [int] NOT NULL,
	[TiffFileSizeFront] [int] NOT NULL,
	[CheckAmount] [int] NOT NULL,
	[TiffFileOffsetBack] [int] NOT NULL,
	[SequenceNumber] [int] NOT NULL,
	[TiffFileSizeBack] [int] NOT NULL,
	[JPGFileOffsetFront] [int] NOT NULL,
	[JPGSizeFront] [int] NOT NULL,
	[JPGFileOffsetBack] [int] NOT NULL,
	[JPGSizeBack] [int] NOT NULL,
	[TiffWidthBack] [int] NOT NULL,
	[TiffLengthBack] [int] NOT NULL,
	[TiffWidthFront] [int] NOT NULL,
	[TiffLengthFront] [int] NOT NULL,
	[TiffEncoding] [int] NOT NULL,
	[SLType] [char](1) NULL,
	[Suffix] [smallint] NULL,
	[ClearedDate] [datetime] NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [xAccountCheckAmount]    Script Date: 1/4/2025 10:19:25 AM ******/
CREATE CLUSTERED INDEX [xAccountCheckAmount] ON [dbo].[tblImage]
(
	[Account] ASC,
	[Suffix] ASC,
	[SLType] ASC,
	[CheckNumber] ASC,
	[CheckAmount] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblImageFile]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblImageFile](
	[FileId] [int] IDENTITY(1,1) NOT NULL,
	[OriginIndexFileName] [varchar](255) NOT NULL,
	[OriginTifFileName] [varchar](255) NOT NULL,
	[JPGFileName] [varchar](255) NOT NULL,
	[Available] [char](1) NULL,
	[FeeAmount] [int] NULL,
	[FeeGL] [char](10) NULL,
 CONSTRAINT [PK_tblImageFile] PRIMARY KEY CLUSTERED 
(
	[FileId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TellerSession]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TellerSession](
	[TellerInitial] [char](4) NOT NULL,
	[SessionID] [char](20) NOT NULL,
 CONSTRAINT [PK_TellerSession] PRIMARY KEY CLUSTERED 
(
	[TellerInitial] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TransactionTypes]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TransactionTypes](
	[TransactionType] [char](32) NULL,
	[Host] [char](16) NULL,
	[Delay] [smallint] NULL,
	[Retry] [smallint] NULL,
	[CheckStatus] [char](1) NULL,
	[StatusDelay] [smallint] NULL,
	[StatusDays] [smallint] NULL,
	[StatusHost] [char](16) NULL,
	[AllowOffline] [char](1) NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [xTranType]    Script Date: 1/4/2025 10:19:25 AM ******/
CREATE UNIQUE CLUSTERED INDEX [xTranType] ON [dbo].[TransactionTypes]
(
	[TransactionType] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TransactionTypes_IMS7]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TransactionTypes_IMS7](
	[TransactionType] [char](32) NULL,
	[Host] [char](16) NULL,
	[Delay] [smallint] NULL,
	[Retry] [smallint] NULL,
	[CheckStatus] [char](1) NULL,
	[StatusDelay] [smallint] NULL,
	[StatusDays] [smallint] NULL,
	[StatusHost] [char](16) NULL,
	[AllowOffline] [char](1) NULL,
	[LicenseKey] [varchar](200) NULL,
	[DBConnString] [varchar](500) NULL,
	[XMLFileName] [varchar](255) NULL,
	[XMLObjectName] [varchar](255) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TransactionTypes_IMS7_ADAPI]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TransactionTypes_IMS7_ADAPI](
	[TransactionType] [char](32) NULL,
	[Host] [char](16) NULL,
	[Delay] [smallint] NULL,
	[Retry] [smallint] NULL,
	[CheckStatus] [char](1) NULL,
	[StatusDelay] [smallint] NULL,
	[StatusDays] [smallint] NULL,
	[StatusHost] [char](16) NULL,
	[AllowOffline] [char](1) NULL,
	[LicenseKey] [varchar](200) NULL,
	[DBConnString] [varchar](500) NULL,
	[XMLFileName] [varchar](255) NULL,
	[XMLObjectName] [varchar](255) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TransactionTypes_IMS7_InternetLending]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TransactionTypes_IMS7_InternetLending](
	[TransactionType] [char](32) NULL,
	[Host] [char](16) NULL,
	[Delay] [smallint] NULL,
	[Retry] [smallint] NULL,
	[CheckStatus] [char](1) NULL,
	[StatusDelay] [smallint] NULL,
	[StatusDays] [smallint] NULL,
	[StatusHost] [char](16) NULL,
	[AllowOffline] [char](1) NULL,
	[LicenseKey] [varchar](200) NULL,
	[DBConnString] [varchar](500) NULL,
	[XMLFileName] [varchar](255) NULL,
	[XMLObjectName] [varchar](255) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[udt_AccountTypes]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[udt_AccountTypes](
	[TrackingNum] [int] IDENTITY(1,1) NOT NULL,
	[TypeCode] [char](2) NULL,
	[Description] [char](40) NULL,
	[NewAccountCommand] [char](4) NULL,
	[JointOwnerLabel] [char](30) NULL,
	[JointOwnerTag] [char](20) NULL,
	[JointOwnerType] [char](2) NULL,
	[JointOwnerAssocCode] [char](2) NULL,
	[JointOwnerCommand] [char](4) NULL,
	[TaxCode] [char](1) NULL,
	[Department] [char](12) NULL,
	[NewMemberFee] [int] NULL,
	[StatementCycle] [smallint] NULL,
	[MemoNumber1] [int] NULL,
	[MemoText1] [char](60) NULL,
	[MemoExpireDays1] [int] NULL,
	[MemoNumber2] [int] NULL,
	[MemoText2] [char](60) NULL,
	[MemoExpireDays2] [int] NULL,
	[MemoNumber3] [int] NULL,
	[MemoText3] [char](60) NULL,
	[MemoExpireDays3] [int] NULL,
	[MemoNumber4] [int] NULL,
	[MemoText4] [char](60) NULL,
	[MemoExpireDays4] [int] NULL,
	[FlagNumber1] [smallint] NULL,
	[FlagType1] [char](1) NULL,
	[FlagLevel1] [char](1) NULL,
	[FlagValue1] [smallint] NULL,
	[FlagNumber2] [smallint] NULL,
	[FlagType2] [char](1) NULL,
	[FlagValue2] [smallint] NULL,
	[FlagLevel2] [char](1) NULL,
	[FlagNumber3] [smallint] NULL,
	[FlagType3] [char](1) NULL,
	[FlagValue3] [smallint] NULL,
	[FlagNumber4] [smallint] NULL,
	[FlagLevel3] [char](1) NULL,
	[FlagType4] [char](1) NULL,
	[FlagValue4] [smallint] NULL,
	[C24Memo] [int] NULL,
	[C24MemoText] [char](60) NULL,
	[FlagLevel4] [char](1) NULL,
	[CBCode] [char](4) NULL,
	[CBLogic] [smallint] NULL,
	[SetCBScore] [char](1) NULL,
	[MinPreApproval] [char](40) NULL,
	[AffinityCode] [char](2) NULL,
	[PreApproval] [char](40) NULL,
	[MaxPreApproval] [char](40) NULL,
	[MinAge] [int] NULL,
	[MaxAge] [int] NULL,
	[PODCommand] [char](4) NULL,
	[PODStartMemo] [int] NULL,
	[PODStopMemo] [int] NULL,
	[ServiceClass] [char](4) NULL,
	[HostCommand] [char](4) NULL,
	[AccountClass] [char](1) NULL,
	[ClassCode] [char](2) NULL,
	[SortOrder] [smallint] NULL,
	[JointTaxCode] [char](1) NULL,
	[RevocableTrustCode] [char](1) NULL,
	[UseTodayForDOB] [char](1) NULL,
	[RequiredTabs] [char](50) NULL,
	[DisabledTabs] [char](50) NULL,
	[W8TaxCode] [char](1) NULL,
	[AddSAV] [char](1) NULL,
	[AddDDA] [char](1) NULL,
	[AddOD] [char](1) NULL,
	[AddCC] [char](1) NULL,
	[AddOther] [char](1) NULL,
	[RequireID] [char](1) NULL,
	[ScreenLossAccounts] [char](1) NULL,
	[AllowEStatements] [char](1) NULL,
	[RequireSSN] [char](1) NULL,
	[NoScreen] [char](1) NULL,
	[RequireEmployment] [char](1) NULL,
	[PromptEmployment] [char](1) NULL,
	[AllowJoint] [char](1) NULL,
	[AllowPlastic] [char](1) NULL,
	[AllowODP] [char](1) NULL,
	[CBScreenNew] [char](1) NULL,
	[AllowIVR] [char](1) NULL,
	[CBScreenExisting] [char](1) NULL,
	[CalcPreapproval] [char](1) NULL,
	[PreapprovalFlags] [char](100) NULL,
	[RequireDocChecklist] [char](1) NULL,
	[DocChecklistName] [char](30) NULL,
	[AllowXferFund] [char](1) NULL,
	[AllowXferIVR] [char](1) NULL,
	[AllowXferOD] [char](1) NULL,
	[AllowPlasticCard] [char](1) NULL,
	[PromptMaidenName] [char](1) NULL,
	[PromptCourtName] [char](1) NULL,
	[PromptCaseNumber] [char](1) NULL,
	[PromptAffirmationDate] [char](1) NULL,
	[AutoConfirmEligibility] [char](1) NULL,
	[Category] [char](30) NULL,
	[PrimaryJointFlag] [char](1) NULL,
	[AutoAddJoint] [char](1) NULL,
	[HelpPage] [char](50) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[udt_AdminTable]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[udt_AdminTable](
	[Teller] [char](8) NOT NULL,
	[Password] [char](50) NULL,
	[ClientIP] [char](15) NULL,
	[WebIP] [char](15) NULL,
	[ClusterID] [char](10) NULL,
	[LastModified] [datetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[udt_Beacon]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[udt_Beacon](
	[TrackingNum] [int] NOT NULL,
	[Sequence] [int] NOT NULL,
	[LowScore] [int] NULL,
	[HighScore] [int] NULL,
	[PreapprovalFlags] [char](250) NULL,
	[APR] [char](10) NULL,
	[MinLimit] [char](10) NULL,
	[MaxLimit] [char](10) NULL,
	[MinTerm] [char](10) NULL,
	[MaxTerm] [char](10) NULL,
	[MinIncome] [char](10) NULL,
	[MaxIncome] [char](10) NULL,
	[CreditLimit] [char](10) NULL,
	[HighPaperGrade] [char](1) NULL,
	[LowPaperGrade] [char](1) NULL,
	[PaperGrade] [char](1) NULL,
	[LimitType] [char](1) NULL,
	[LimitPercent] [int] NULL,
	[TruncateInterval] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Index [xTracking]    Script Date: 1/4/2025 10:19:25 AM ******/
CREATE CLUSTERED INDEX [xTracking] ON [dbo].[udt_Beacon]
(
	[TrackingNum] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[udt_BeaconToAPR]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[udt_BeaconToAPR](
	[TrackingNum] [int] NULL,
	[Sequence] [int] NOT NULL,
	[LowScore] [int] NULL,
	[HighScore] [int] NULL,
	[APR] [char](10) NULL,
	[MinLimit] [char](10) NULL,
	[MaxLimit] [char](10) NULL,
	[MinIncome] [char](10) NULL,
	[MaxIncome] [char](10) NULL
) ON [PRIMARY]
GO
/****** Object:  Index [xTracking]    Script Date: 1/4/2025 10:19:25 AM ******/
CREATE CLUSTERED INDEX [xTracking] ON [dbo].[udt_BeaconToAPR]
(
	[TrackingNum] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[udt_BeneficiaryTypes]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[udt_BeneficiaryTypes](
	[TrackingNum] [int] IDENTITY(1,1) NOT NULL,
	[BType] [char](10) NULL,
	[BenType] [char](1) NULL,
	[Description] [char](20) NULL,
	[AcctPlan] [char](10) NULL,
	[AccountTypes] [char](60) NULL,
	[AssocCode] [char](2) NULL,
	[BECHTag] [char](10) NULL,
	[AutoAssociate] [char](1) NULL,
	[MinRequired] [char](1) NULL,
	[PromptEligibility] [char](1) NULL,
	[PromptRelationship] [char](1) NULL,
	[RequireID] [char](1) NULL,
	[RequireSSN] [char](1) NULL,
	[DistributionPercent] [int] NULL,
	[PromptDOB] [char](1) NULL,
	[Individual] [char](1) NULL,
 CONSTRAINT [PK__udt_BeneficiaryT__787FB0F7] PRIMARY KEY CLUSTERED 
(
	[TrackingNum] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[udt_BSBureaus]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[udt_BSBureaus](
	[BureauSetID] [int] NOT NULL,
	[Sequence] [int] NOT NULL,
	[CreditBureauID] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[udt_BureauSet]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[udt_BureauSet](
	[BureauSetID] [int] IDENTITY(3,1) NOT NULL,
	[Label] [varchar](50) NULL,
	[TestFlag] [bit] NOT NULL,
	[TestAppURL] [varchar](50) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[udt_Category]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[udt_Category](
	[CategoryID] [int] NULL,
	[DisplayName] [char](40) NULL,
	[MasterCategoryID] [int] NULL,
	[Sequence] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[udt_CheckOrderTypes]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[udt_CheckOrderTypes](
	[TrackingNum] [int] NOT NULL,
	[TypeCode] [char](2) NULL,
	[Description] [char](30) NULL,
	[CatalogCodes] [char](300) NULL,
	[Quantity] [char](100) NULL,
	[QuantityEditCode] [char](1) NULL,
	[StartNumber] [int] NULL,
	[Font] [char](100) NULL,
	[FontEditCode] [char](1) NULL,
	[Flush] [char](1) NULL,
	[FlushEditCode] [char](1) NULL,
	[CoverCode] [char](100) NULL,
	[CoverEditCode] [char](1) NULL,
	[Allow2Signatures] [char](1) NULL,
	[SpecialPrograms] [char](100) NULL,
	[PromptSpecialPrograms] [char](1) NULL,
	[BillCodes] [char](100) NULL,
	[BillEditCode] [char](1) NULL,
	[DeliveryOptions] [char](100) NULL,
	[DeliveryEditCode] [char](1) NULL,
	[PromptHomePhoneFlag] [char](1) NULL,
	[PromptDriversLicFlag] [char](1) NULL,
	[PromptJointNameFlag] [char](1) NULL,
	[PromptJointDriversLicFlag] [char](1) NULL,
	[PromptTrusteeInfo] [char](1) NULL,
	[PromptTrusteeInfoFlag] [char](1) NULL,
	[AccountTypes] [char](20) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[udt_Checks]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[udt_Checks](
	[TrackingNum] [int] NOT NULL,
	[Line1] [char](50) NULL,
	[Line2] [char](50) NULL,
	[Line3] [char](50) NULL,
	[Line4] [char](50) NULL,
	[City] [char](50) NULL,
	[State] [char](2) NULL,
	[Zip] [char](10) NULL,
	[JointName] [char](50) NULL,
	[Account] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[udt_CitizenshipTypes]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[udt_CitizenshipTypes](
	[TrackingNum] [int] IDENTITY(1,1) NOT NULL,
	[CitType] [char](2) NULL,
	[Description] [char](30) NULL,
	[W8Required] [char](1) NULL,
	[W8Type] [char](4) NULL,
	[TIDRequired] [char](1) NULL,
	[AccountTypes] [char](100) NULL,
	[BackupWithholdingApplies] [char](1) NULL,
	[NoScreen] [char](1) NULL,
	[CBScreenNew] [char](1) NULL,
	[CBScreenExisting] [char](1) NULL,
	[ScreenLossAccounts] [char](1) NULL,
	[SortOrder] [smallint] NULL,
	[W8MemoNumber] [int] NULL,
	[W8ExpireDays] [smallint] NULL,
	[W8ExpireType] [char](1) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[udt_Clark]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[udt_Clark](
	[userid] [char](30) NOT NULL,
	[password] [char](30) NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[udt_Clubs]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[udt_Clubs](
	[TrackingNum] [int] IDENTITY(1,1) NOT NULL,
	[ClubCode] [char](10) NULL,
	[ClubName] [char](20) NULL,
	[MinAge] [int] NULL,
	[MaxAge] [int] NULL,
	[FlagType] [char](10) NULL,
	[FlagNumber] [char](10) NULL,
	[MemoNumber] [char](10) NULL,
	[DaysValid] [int] NULL,
	[Includes] [char](30) NULL,
	[TotalAllowed] [int] NULL,
	[AccountTypes] [char](80) NULL,
	[RefValue] [char](30) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[udt_CreditBureaus]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[udt_CreditBureaus](
	[TrackingNum] [int] IDENTITY(1,1) NOT NULL,
	[TypeCode] [char](2) NULL,
	[Name] [char](20) NULL,
	[Description] [char](200) NULL,
	[ObjectName] [char](10) NULL,
	[AlertTypes] [char](50) NULL,
	[TestCreditBureau] [char](10) NULL,
	[ReportURL] [char](100) NULL,
	[MinScore] [char](5) NULL,
	[MinPreapproval] [char](100) NULL,
	[DefaultsID] [char](5) NULL,
	[ReuseFlag] [char](1) NULL,
	[ReuseThreshold] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[udt_DocumentLog]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[udt_DocumentLog](
	[Sequence] [int] NOT NULL,
	[DocTrackingNum] [int] NOT NULL,
	[MemberTrackingNum] [int] NOT NULL,
	[Teller] [char](3) NULL,
	[GenDate] [datetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[udt_HoldCodes]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[udt_HoldCodes](
	[TrackingNum] [int] IDENTITY(1,1) NOT NULL,
	[HCode] [char](10) NULL,
	[Description] [char](30) NULL,
	[SameDayAvailability] [int] NULL,
	[AccountTypes] [char](80) NULL,
	[HoldCodeID] [char](2) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[udt_Institutions]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[udt_Institutions](
	[TrackingNum] [int] IDENTITY(1,1) NOT NULL,
	[InstitutionID] [char](20) NULL,
	[Name] [char](40) NULL,
	[IMSIP] [char](15) NULL,
	[IMSPort] [char](10) NULL,
	[CreditBureauOrder] [char](15) NULL,
	[PreapproveCreditBureau] [char](2) NULL,
	[SecurityMessage] [varchar](500) NULL,
	[PaperGrades] [char](20) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[udt_InsuranceCodes]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[udt_InsuranceCodes](
	[TrackingNum] [int] IDENTITY(1,1) NOT NULL,
	[InsCode] [char](2) NULL,
	[Description] [char](30) NULL,
	[AccountTypes] [char](80) NULL,
	[SortOrder] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[udt_ISubAccounts]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[udt_ISubAccounts](
	[TrackingNum] [int] IDENTITY(1,1) NOT NULL,
	[DescAbrv] [char](3) NULL,
	[UniqueID] [char](10) NOT NULL,
	[ACC] [char](3) NULL,
	[PreapproveCode] [char](10) NULL,
	[Description] [char](20) NULL,
	[MinBalance] [char](10) NULL,
	[MinAge] [int] NULL,
	[MaxAge] [int] NULL,
	[ProductType] [char](4) NULL,
	[StartSuffix] [char](10) NULL,
	[StopSuffix] [char](10) NULL,
	[PromptCertNumber] [char](1) NULL,
	[APR] [char](10) NULL,
	[APREditCode] [char](1) NULL,
	[MaturityDays] [smallint] NULL,
	[MaturityDaysEditCode] [char](1) NULL,
	[AccountTypes] [char](80) NULL,
	[MaturityDisp] [char](4) NULL,
	[TermType] [char](1) NULL,
	[DividendDisp] [char](4) NULL,
	[MaxPrevCont] [char](10) NULL,
	[CurAnnCont] [char](10) NULL,
	[TargetAmount] [char](10) NULL,
	[PenaltyRate] [char](10) NULL,
	[PenaltyAmount] [char](10) NULL,
	[MaturityDispEditCode] [char](1) NULL,
	[NoticeDays] [smallint] NULL,
	[NoticeDaysEditCode] [char](1) NULL,
	[DividendRateEditCode] [char](1) NULL,
	[DistMethod] [char](1) NULL,
	[DistFrequency] [char](1) NULL,
	[DividendDispEditCode] [char](1) NULL,
	[DistCode] [char](10) NULL,
	[AcceptDisp] [char](1) NULL,
	[StatementOrder] [char](10) NULL,
	[TaxCode] [char](1) NULL,
	[JointTaxCode] [char](1) NULL,
	[PlanNumber] [char](20) NULL,
	[ServiceClass] [char](1) NULL,
	[PlanNumberEditCode] [char](1) NULL,
	[W8TaxCode] [char](1) NULL,
	[CreateHost] [char](1) NULL,
	[MaxPrevContEditCode] [char](1) NULL,
	[HostCommand] [char](4) NULL,
	[TotalAllowed] [int] NULL,
	[CurAnnContEditCode] [char](1) NULL,
	[Requires] [char](30) NULL,
	[Required] [char](1) NULL,
	[TargetAmountEditCode] [char](1) NULL,
	[AutoAdd] [char](1) NULL,
	[Term] [char](10) NULL,
	[UseMaturityTerm] [char](1) NULL,
	[AllowedTerms] [char](80) NULL,
	[TermEditCode] [char](1) NULL,
	[DividendRate] [char](10) NULL,
	[IRAType] [char](1) NULL,
	[IRATypeEditCode] [char](1) NULL,
	[PenaltyEditCode] [char](1) NULL,
	[SetupDist] [char](1) NULL,
	[AcceptDist] [char](1) NULL,
	[AllowJoint] [char](1) NULL,
	[AllowBen] [char](1) NULL,
	[AllowPlastic] [char](1) NULL,
	[AllowODP] [char](1) NULL,
	[AllowIVR] [char](1) NULL,
	[FlagNumber1] [smallint] NULL,
	[FlagLevel1] [char](1) NULL,
	[FlagType1] [char](1) NULL,
	[FlagValue1] [smallint] NULL,
	[FlagNumber2] [smallint] NULL,
	[FlagLevel2] [char](1) NULL,
	[FlagType2] [char](1) NULL,
	[FlagValue2] [smallint] NULL,
	[FlagNumber3] [smallint] NULL,
	[FlagLevel3] [char](1) NULL,
	[FlagType3] [char](1) NULL,
	[FlagValue3] [smallint] NULL,
	[FlagNumber4] [smallint] NULL,
	[FlagLevel4] [char](1) NULL,
	[FlagType4] [char](1) NULL,
	[FlagValue4] [smallint] NULL,
	[Exlcude] [char](40) NULL,
	[AllowDescriptionChange] [char](1) NULL,
	[Category] [char](15) NULL,
	[SuffixRange] [char](30) NULL,
	[MemoNumber1] [int] NULL,
	[MemoText1] [char](60) NULL,
	[MemoExpireDays1] [int] NULL,
	[MemoNumber2] [int] NULL,
	[MemoText2] [char](60) NULL,
	[MemoExpireDays2] [int] NULL,
	[MemoNumber3] [int] NULL,
	[MemoText3] [char](60) NULL,
	[MemoExpireDays3] [int] NULL,
	[MemoNumber4] [int] NULL,
	[MemoText4] [char](60) NULL,
	[MemoExpireDays4] [int] NULL,
 CONSTRAINT [PK__udt_ISubAccounts__06CDD04E] PRIMARY KEY CLUSTERED 
(
	[TrackingNum] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[udt_JointOwnerTypes]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[udt_JointOwnerTypes](
	[TrackingNum] [int] IDENTITY(1,1) NOT NULL,
	[JOType] [char](2) NULL,
	[Description] [char](30) NULL,
	[AccountTypes] [char](80) NULL,
	[OwnerCode] [char](1) NULL,
	[AssocCode] [char](2) NULL,
	[C24Access] [char](1) NULL,
	[StmtPrint] [char](1) NULL,
	[JOCHTag] [char](10) NULL,
	[Individual] [char](1) NULL,
	[AutoAssociate] [char](1) NULL,
	[TagBeginEnd] [char](1) NULL,
	[MinRequired] [int] NULL,
	[PromptEligibility] [char](1) NULL,
	[PromptRelationship] [char](1) NULL,
	[StartingNumber] [int] NULL,
	[SortOrder] [int] NULL,
	[RequireID] [char](1) NULL,
	[ScreenLossAccounts] [char](1) NULL,
	[NoScreen] [char](1) NULL,
	[CBScreenNew] [char](1) NULL,
	[CBScreenExisting] [char](1) NULL,
	[RequireSSN] [char](1) NULL,
	[CalcPreapproval] [char](1) NULL,
	[CreateHost] [char](1) NULL,
	[FormPage] [char](20) NULL,
	[AllowPlasticCard] [char](1) NULL,
	[Titles] [char](100) NULL,
	[PromoteCode] [char](50) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[udt_LoanDiscount]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[udt_LoanDiscount](
	[TrackingNum] [int] IDENTITY(1,1) NOT NULL,
	[SortOrder] [int] NULL,
	[DiscountID] [char](20) NULL,
	[DiscountName] [char](40) NULL,
	[DiscountAmount] [char](10) NULL,
	[DiscountLevel] [smallint] NULL,
	[DiscountDisplayType] [char](10) NULL,
	[DiscountInputType] [char](10) NULL,
	[Combine] [char](1) NULL,
	[OverrideRequired] [char](1) NULL,
	[ParentID] [int] NULL,
 CONSTRAINT [PK__udt_LoanDiscount__09AA3CF9] PRIMARY KEY CLUSTERED 
(
	[TrackingNum] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[udt_LoanPlanTypes]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[udt_LoanPlanTypes](
	[TrackingNum] [int] IDENTITY(1,1) NOT NULL,
	[LPID] [int] NULL,
	[LoanPlanName] [char](30) NULL,
	[LoanPlanDescription] [char](60) NULL,
	[UseMemo] [char](1) NULL,
	[UseFlag] [char](1) NULL,
	[MemoNumber] [int] NULL,
	[MemoNumber2] [int] NULL,
	[FlagNumber] [int] NULL,
	[AccountTypes] [char](80) NULL,
	[FlagNumber2] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[udt_LPMT]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[udt_LPMT](
	[TrackingNum] [int] NULL,
	[Processed] [smallint] NULL,
	[Account] [int] NULL,
	[Suffix] [smallint] NULL,
	[Surname] [char](2) NULL,
	[CashAmount] [int] NULL,
	[CheckAmount] [int] NULL,
	[VoucherAmount] [int] NULL,
	[LateCharge] [int] NULL,
	[EffectiveDate] [datetime] NULL,
	[Description] [char](60) NULL,
	[ExcessToPrincipal] [char](1) NULL,
	[Amount] [int] NULL,
	[Principal] [int] NULL,
	[Interest] [int] NULL,
	[Balance] [int] NULL,
	[DueDate] [datetime] NULL,
	[InterestDate] [char](10) NULL,
	[APR] [int] NULL,
	[ScheduledPayment] [int] NULL,
	[InterestAdded] [int] NULL,
	[AddlAmount] [int] NULL,
	[AddlPrincipal] [int] NULL,
	[AddlInterest] [int] NULL,
	[AddlBalance] [int] NULL,
	[AddlDueDate] [datetime] NULL,
	[AddlInterestDate] [char](10) NULL,
	[AddlAPR] [int] NULL,
	[AddlScheduledPayment] [int] NULL,
	[AddlInterestAdded] [int] NULL,
	[AddlLateCharge] [int] NULL,
	[AddlDescription] [char](60) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[udt_LPOF]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[udt_LPOF](
	[TrackingNum] [int] NULL,
	[Processed] [smallint] NULL,
	[Account] [int] NULL,
	[Suffix] [smallint] NULL,
	[Surname] [char](2) NULL,
	[CashAmount] [int] NULL,
	[CheckAmount] [int] NULL,
	[VoucherAmount] [int] NULL,
	[LateCharge] [int] NULL,
	[EffectiveDate] [datetime] NULL,
	[Amount] [int] NULL,
	[Principal] [int] NULL,
	[Interest] [int] NULL,
	[Balance] [int] NULL,
	[DueDate] [datetime] NULL,
	[InterestDate] [char](10) NULL,
	[APR] [int] NULL,
	[ScheduledPayment] [int] NULL,
	[InterestAdded] [int] NULL,
	[AddlAmount] [int] NULL,
	[AddlPrincipal] [int] NULL,
	[AddlInterest] [int] NULL,
	[AddlBalance] [int] NULL,
	[AddlDueDate] [datetime] NULL,
	[AddlInterestDate] [char](10) NULL,
	[AddlAPR] [int] NULL,
	[AddlScheduledPayment] [int] NULL,
	[AddlInterestAdded] [int] NULL,
	[AddlLateCharge] [int] NULL,
	[AddlDescription] [char](60) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[udt_LSubAccounts]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[udt_LSubAccounts](
	[TrackingNum] [int] IDENTITY(1,1) NOT NULL,
	[DescAbrv] [char](3) NULL,
	[ACC] [char](3) NULL,
	[PreapproveCode] [char](10) NULL,
	[PreapprovalFlags] [char](250) NULL,
	[CollateralCode] [char](10) NULL,
	[PreapproveLimit] [char](10) NULL,
	[Description] [char](20) NULL,
	[CardAvailable] [char](1) NULL,
	[OverdraftTarget] [char](1) NULL,
	[OverdraftSource] [char](1) NULL,
	[Requires] [char](30) NULL,
	[MinAge] [int] NULL,
	[MaxAge] [int] NULL,
	[ProductType] [char](4) NULL,
	[StartSuffix] [char](10) NULL,
	[StopSuffix] [char](10) NULL,
	[CurrBranch] [char](2) NULL,
	[APR] [char](10) NULL,
	[CashAdvanceAPR] [char](10) NULL,
	[Term] [char](10) NULL,
	[Method] [char](1) NULL,
	[Frequency] [char](1) NULL,
	[InsCode] [char](2) NULL,
	[DisclosureCode] [char](1) NULL,
	[DueDays] [int] NULL,
	[ReviewDays] [int] NULL,
	[ReviewDate] [datetime] NULL,
	[Officer] [char](10) NULL,
	[SCode] [char](2) NULL,
	[Coupons] [char](2) NULL,
	[StatementOrder] [char](2) NULL,
	[TotalAllowed] [int] NULL,
	[AllowPlastic1] [char](1) NULL,
	[AllowPlastic2] [char](1) NULL,
	[AllowPlastic3] [char](1) NULL,
	[AllowPlastic4] [char](1) NULL,
	[LineofCredit] [char](1) NULL,
	[Action] [char](1) NULL,
	[PaymentPercent] [int] NULL,
	[AccountTypes] [char](80) NULL,
	[PromptMICR] [char](1) NULL,
	[MICRRequired] [char](1) NULL,
	[MinMICRLength] [smallint] NULL,
	[MaxMICRLength] [smallint] NULL,
	[MICRBegin] [char](5) NULL,
	[MICREnd] [char](5) NULL,
	[MICRFormat] [char](30) NULL,
	[CreateHost] [char](1) NULL,
	[HostCommand] [char](4) NULL,
	[ServiceClass] [char](4) NULL,
	[APREditCode] [char](1) NULL,
	[OfficerEditCode] [char](1) NULL,
	[KTransferLink] [char](20) NULL,
	[RoundPayment] [char](1) NULL,
	[MinPayment] [int] NULL,
	[MinPaymentEditCode] [char](1) NULL,
	[PromptIncomeCode] [char](1) NULL,
	[NoJointA] [char](1) NULL,
	[AcceptDeposits] [char](1) NULL,
	[AllowJoint] [char](1) NULL,
	[FlagNumber1] [smallint] NULL,
	[FlagLevel1] [char](1) NULL,
	[FlagType1] [char](1) NULL,
	[FlagValue1] [smallint] NULL,
	[FlagNumber2] [smallint] NULL,
	[FlagLevel2] [char](1) NULL,
	[FlagType2] [char](1) NULL,
	[FlagValue2] [smallint] NULL,
	[FlagNumber3] [smallint] NULL,
	[FlagLevel3] [char](1) NULL,
	[FlagType3] [char](1) NULL,
	[FlagValue3] [smallint] NULL,
	[FlagNumber4] [smallint] NULL,
	[FlagLevel4] [char](1) NULL,
	[FlagType4] [char](1) NULL,
	[FlagValue4] [smallint] NULL,
	[LoanDiscounts] [char](20) NULL,
	[Exclude] [char](40) NULL,
	[TermEditCode] [char](1) NULL,
	[MinTerm] [int] NULL,
	[MaxTerm] [int] NULL,
	[TermIncrement] [int] NULL,
	[PromptCheckOrder] [char](1) NULL,
	[CheckOrderTypes] [char](2) NULL,
	[SortOrder] [smallint] NULL,
	[AllowDescriptionChange] [char](1) NULL,
	[Category] [char](15) NULL,
	[SuffixRange] [char](30) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[udt_MAInq]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[udt_MAInq](
	[TrackingNum] [int] NOT NULL,
	[Processed] [smallint] NULL,
	[Account] [int] NULL,
	[Surname] [char](2) NULL,
	[GetShares] [char](1) NULL,
	[GetLoans] [char](1) NULL,
	[GetPayroll] [char](1) NULL,
	[GetMemos] [char](1) NULL,
	[GetCards] [char](1) NULL,
	[ShareReport] [char](1) NULL,
	[LoanReport] [char](1) NULL,
	[Description] [char](30) NULL,
	[ClientIP] [char](15) NULL,
	[WebIP] [char](15) NULL,
	[ClusterID] [char](10) NULL,
	[Override] [char](10) NULL,
	[OverrideID] [char](10) NULL,
	[LastModified] [datetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[udt_MAInq_Member]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[udt_MAInq_Member](
	[TrackingNum] [int] NULL,
	[FName] [char](20) NULL,
	[LName] [char](20) NULL,
	[MInitial] [char](10) NULL,
	[Joindate] [int] NULL,
	[Branch] [smallint] NULL,
	[Own] [char](1) NULL,
	[DOB] [int] NULL,
	[Ref] [char](20) NULL,
	[Department] [char](20) NULL,
	[PR] [int] NULL,
	[Password] [char](20) NULL,
	[SSN] [int] NULL,
	[Address1] [char](30) NULL,
	[Address2] [char](30) NULL,
	[City] [char](20) NULL,
	[State] [char](2) NULL,
	[Zip] [int] NULL,
	[AffinityCode] [char](20) NULL,
	[AreaCode] [int] NULL,
	[Phone] [int] NULL,
	[WorkPhoneAC] [int] NULL,
	[WorkPhone] [int] NULL,
	[Household] [int] NULL,
	[CreditReport] [smallint] NULL,
	[ClientIP] [char](15) NULL,
	[WebIP] [char](15) NULL,
	[ClusterID] [char](10) NULL,
	[LastModified] [datetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[udt_ManualApprovalAction]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[udt_ManualApprovalAction](
	[TrackingNum] [int] IDENTITY(1,1) NOT NULL,
	[ReasonCode] [char](32) NOT NULL,
	[Category] [char](2) NULL,
	[Description] [char](80) NULL,
	[ActionCode] [char](1) NULL,
	[DataField] [char](20) NULL,
	[ErrorMessage] [char](200) NULL,
	[ReasonDescription] [char](200) NULL,
	[Resolution] [char](200) NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [xReasonCode]    Script Date: 1/4/2025 10:19:25 AM ******/
CREATE CLUSTERED INDEX [xReasonCode] ON [dbo].[udt_ManualApprovalAction]
(
	[ReasonCode] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[udt_MasterCategory]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[udt_MasterCategory](
	[MasterCategoryID] [int] NULL,
	[Description] [char](50) NULL,
	[SLType] [char](10) NULL,
	[DisplayName] [char](40) NULL,
	[Sequence] [int] NULL,
	[AccountTypes] [char](70) NULL,
	[ImageSet] [smallint] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[udt_mmch]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[udt_mmch](
	[TrackingNum] [int] NOT NULL,
	[Processed] [smallint] NULL,
	[Account] [int] NULL,
	[Suffix] [char](60) NULL,
	[Surname] [char](60) NULL,
	[SLType] [char](60) NULL,
	[Action] [char](60) NULL,
	[StartMemo] [char](60) NULL,
	[StopMemo] [char](60) NULL,
	[FormattedOutput] [char](60) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[udt_mmch_memo]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[udt_mmch_memo](
	[Action] [char](1) NULL,
	[Suffix] [smallint] NULL,
	[SLType] [char](1) NULL,
	[MemoNumber] [int] NULL,
	[EntryDate] [datetime] NULL,
	[ExpireDate] [datetime] NULL,
	[Description] [char](60) NULL,
	[TrackingNum] [int] NULL,
	[Sequence] [smallint] NULL
) ON [PRIMARY]
GO
/****** Object:  Index [xTracking]    Script Date: 1/4/2025 10:19:25 AM ******/
CREATE CLUSTERED INDEX [xTracking] ON [dbo].[udt_mmch_memo]
(
	[TrackingNum] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[udt_Page]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[udt_Page](
	[PageID] [int] NULL,
	[Sequence] [int] NULL,
	[URL] [char](100) NULL,
	[HTML] [char](2000) NULL,
	[Context] [char](20) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[udt_PDOC]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[udt_PDOC](
	[Sequence] [int] NOT NULL,
	[TrackingNum] [int] NOT NULL,
	[ID] [char](10) NULL,
	[TranCode] [char](10) NULL,
	[Account] [char](10) NULL,
	[SSN] [char](11) NULL,
	[Suffix] [char](10) NULL,
	[AppNumber] [char](10) NULL,
	[Surname] [char](50) NULL,
	[SLA] [char](1) NULL,
	[Document] [char](255) NULL,
	[ReferenceNum] [char](10) NULL,
	[GroupNum] [char](10) NULL,
	[VIN] [char](10) NULL,
	[AppVINRecord] [char](10) NULL,
	[ProductCode] [char](10) NULL,
	[LevelIndicator] [char](10) NULL,
	[EffectiveDate] [datetime] NULL,
	[BSASeq] [char](10) NULL,
	[Preview] [char](10) NULL,
	[InhibitOutputFlag] [char](10) NULL,
	[PrinterType] [char](10) NULL,
	[Inquiry] [char](10) NULL,
	[Application] [char](10) NULL,
	[PrinterPath] [char](10) NULL,
	[Form] [char](10) NULL,
	[NumberOfCopies] [char](10) NULL,
	[AltPrinter] [char](10) NULL,
	[UpdateDocTracking] [char](10) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[udt_PlasticProducts]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[udt_PlasticProducts](
	[TrackingNum] [int] IDENTITY(1,1) NOT NULL,
	[TypeCode] [char](2) NULL,
	[StockCode] [char](1) NULL,
	[PreapproveCode] [char](10) NULL,
	[AutoGenerateCardNumber] [char](1) NULL,
	[DefaultTerm] [smallint] NULL,
	[MinTerm] [smallint] NULL,
	[MaxTerm] [smallint] NULL,
	[AmountOnline] [int] NULL,
	[AmountOffline] [int] NULL,
	[POSOnlineLimit] [int] NULL,
	[POSOfflineLimit] [int] NULL,
	[CardOrder] [smallint] NULL,
	[CardStatus] [smallint] NULL,
	[Description] [char](60) NULL,
	[Required] [char](1) NULL,
	[AutoAdd] [char](1) NULL,
	[Requires] [char](80) NULL,
	[MinAge] [int] NULL,
	[MaxAge] [int] NULL,
	[TotalAllowed] [int] NULL,
	[AccountTypes] [char](80) NULL,
	[VIPCode] [char](2) NULL,
	[OrderBatch] [smallint] NULL,
	[OrderDays] [int] NULL,
	[StartMemberNumber] [smallint] NULL,
	[AllowName2] [char](1) NULL,
	[PromptPINOffset] [char](1) NULL,
	[RequirePINOffset] [char](1) NULL,
	[AutoFillName1] [char](1) NULL,
	[AutoFillName2] [char](1) NULL,
	[CollateralCode] [char](10) NULL,
	[AscDscMemberNum] [char](10) NULL,
	[MemberNumEditCode] [char](1) NULL,
	[FlagNumber1] [smallint] NULL,
	[FlagType1] [char](1) NULL,
	[FlagValue1] [smallint] NULL,
	[FlagNumber2] [smallint] NULL,
	[FlagType2] [char](1) NULL,
	[FlagValue2] [smallint] NULL,
	[FlagNumber3] [smallint] NULL,
	[FlagType3] [char](1) NULL,
	[FlagValue3] [smallint] NULL,
	[FlagNumber4] [smallint] NULL,
	[FlagType4] [char](1) NULL,
	[FlagValue4] [smallint] NULL,
	[ExpireDays] [int] NULL,
	[ExpireDate] [datetime] NULL,
	[ExpireType] [char](1) NULL,
	[CardCount] [int] NULL,
	[FormPage] [char](20) NULL,
	[NameEditCode] [char](1) NULL,
	[SuffixPositions] [char](20) NULL,
	[Name2Value] [char](30) NULL,
	[FlagSATypeLink] [char](100) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[udt_PlasticProductTypes]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[udt_PlasticProductTypes](
	[FormPage] [char](20) NULL,
	[NameEditCode] [char](1) NULL,
	[Name2Value] [char](30) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[udt_PrescreenCriteria]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[udt_PrescreenCriteria](
	[TrackingNum] [int] NOT NULL,
	[Sequence] [int] NOT NULL,
	[PaperGrade] [char](5) NULL,
	[MaxPublicRecords] [char](5) NULL,
	[MaxInquiries] [char](5) NULL,
	[MaxCollections] [char](5) NULL,
	[MinCreditScore] [char](5) NULL,
	[MinIncome] [char](10) NULL,
	[MinTrades] [char](5) NULL,
	[MinTradeAge] [char](5) NULL,
	[MaxRevolvingTrades] [char](5) NULL,
	[RevolvingTradeBalance] [char](10) NULL,
	[Max1Month] [char](5) NULL,
	[Max2Month] [char](5) NULL,
	[Max3Month] [char](5) NULL,
	[Max4Month] [char](5) NULL,
	[Max5Month] [char](5) NULL,
	[Max6Month] [char](5) NULL,
	[Max7Month] [char](5) NULL,
	[Max8Month] [char](5) NULL,
	[Max9Month] [char](5) NULL,
	[Max10Month] [char](5) NULL,
	[Max11Month] [char](5) NULL,
	[Max12Month] [char](5) NULL,
	[Max12PlusMonth] [char](5) NULL,
	[RejectBankruptcy] [char](1) NULL,
	[RejectDeceased] [char](1) NULL,
	[RejectSuffixGeneration] [char](1) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[udt_SalesToolProducts]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[udt_SalesToolProducts](
	[ProductID] [char](30) NULL,
	[CategoryID] [int] NULL,
	[MasterCategoryID] [int] NULL,
	[FulFill] [char](1) NULL,
	[ProductDesc] [char](50) NULL,
	[URL] [char](50) NULL,
	[Address] [char](50) NULL,
	[Phone] [char](15) NULL,
	[Contact] [char](50) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[udt_ShareAccountApprovals]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[udt_ShareAccountApprovals](
	[TrackingNum] [int] NOT NULL,
	[Sequence] [int] NOT NULL,
	[PreapprovalFlags] [char](250) NULL,
	[APR] [char](10) NULL,
	[HighPaperGrade] [char](1) NULL,
	[LowPaperGrade] [char](1) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[udt_SingleSignOn]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[udt_SingleSignOn](
	[GUID] [uniqueidentifier] NULL,
	[Account] [varchar](max) NULL,
	[SetDateTime] [datetime] NULL,
	[ID] [bigint] IDENTITY(1,1) NOT NULL,
	[LegacyIDs] [varchar](max) NULL,
 CONSTRAINT [PK_udt_SingleSignOn] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Index [GUID]    Script Date: 1/4/2025 10:19:25 AM ******/
CREATE UNIQUE CLUSTERED INDEX [GUID] ON [dbo].[udt_SingleSignOn]
(
	[GUID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[udt_SkipCodes]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[udt_SkipCodes](
	[TrackingNum] [int] IDENTITY(1,1) NOT NULL,
	[SCode] [char](2) NULL,
	[Description] [char](30) NULL,
	[AccountTypes] [char](80) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[udt_StaticDocs]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[udt_StaticDocs](
	[TrackingNum] [int] NOT NULL,
	[DocFile] [char](20) NULL,
	[DocName] [char](40) NULL,
	[DocDescription] [char](100) NULL,
	[AccountTypes] [char](100) NULL,
	[PDOCCommand] [char](10) NULL,
	[Category] [char](15) NULL,
	[SortOrder] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[udt_SuffixPositions]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[udt_SuffixPositions](
	[TrackingNum] [int] NOT NULL,
	[SufPosition] [char](5) NULL,
	[SType] [char](1) NULL,
	[AllowPlastic] [char](1) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UDTRefMon]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UDTRefMon](
	[TransactionType] [char](32) NULL,
	[Mode] [char](2) NULL,
	[SessionIDLocation] [char](200) NULL,
	[SessionField] [char](20) NULL,
	[DataLocation] [char](200) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UDTScripts]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UDTScripts](
	[TransactionType] [char](32) NULL,
	[Sequence] [smallint] NULL,
	[ServerName] [char](32) NULL,
	[ScriptName] [char](32) NULL,
	[ObjectName] [char](255) NULL,
	[LicenseKey] [char](255) NULL,
	[FileName] [char](255) NULL,
	[XMLObject] [char](255) NULL,
	[DebugMode] [char](1) NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [xTranType]    Script Date: 1/4/2025 10:19:25 AM ******/
CREATE CLUSTERED INDEX [xTranType] ON [dbo].[UDTScripts]
(
	[TransactionType] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[udtscripts_backup]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[udtscripts_backup](
	[TransactionType] [char](32) NULL,
	[Sequence] [smallint] NULL,
	[ServerName] [char](32) NULL,
	[ScriptName] [char](32) NULL,
	[ObjectName] [char](255) NULL,
	[LicenseKey] [char](255) NULL,
	[FileName] [char](255) NULL,
	[XMLObject] [char](255) NULL,
	[DebugMode] [char](1) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UDTScripts_IMS7]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UDTScripts_IMS7](
	[TransactionType] [char](32) NULL,
	[Sequence] [smallint] NULL,
	[ServerName] [char](32) NULL,
	[ScriptObjectName] [char](255) NULL,
	[ScriptFileName] [char](255) NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [xTranType]    Script Date: 1/4/2025 10:19:25 AM ******/
CREATE CLUSTERED INDEX [xTranType] ON [dbo].[UDTScripts_IMS7]
(
	[TransactionType] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UDTScripts_IMS7_ADAPI]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UDTScripts_IMS7_ADAPI](
	[TransactionType] [char](32) NULL,
	[Sequence] [smallint] NULL,
	[ServerName] [char](32) NULL,
	[ScriptObjectName] [char](255) NULL,
	[ScriptFileName] [char](255) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UDTScripts_IMS7_InternetLending]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UDTScripts_IMS7_InternetLending](
	[TransactionType] [char](32) NULL,
	[Sequence] [smallint] NULL,
	[ServerName] [char](32) NULL,
	[ScriptObjectName] [char](255) NULL,
	[ScriptFileName] [char](255) NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [xTranType]    Script Date: 1/4/2025 10:19:25 AM ******/
CREATE CLUSTERED INDEX [xTranType] ON [dbo].[UDTScripts_IMS7_InternetLending]
(
	[TransactionType] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 90, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UsersStocks]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UsersStocks](
	[Account] [int] NULL,
	[Symbol] [char](15) NULL,
	[ClientIP] [char](15) NULL,
	[WebIP] [char](15) NULL,
	[ClusterID] [char](10) NULL,
	[LastModified] [datetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserStockProfile]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserStockProfile](
	[Account] [int] NULL,
	[Symbol] [char](1) NULL,
	[StockName] [char](1) NULL,
	[QuoteOpen] [char](1) NULL,
	[QuoteLast] [char](1) NULL,
	[QuoteVolume] [char](1) NULL,
	[QuoteChange] [char](1) NULL,
	[QuotePercentChange] [char](1) NULL,
	[QuoteDate] [char](1) NULL,
	[QuoteTime] [char](1) NULL,
	[QuoteHigh] [char](1) NULL,
	[QuoteLow] [char](1) NULL,
	[FiftyTwoWeekHigh] [char](1) NULL,
	[FiftyTwoWeekLow] [char](1) NULL,
	[PE] [char](1) NULL,
	[DivPerShare] [char](1) NULL,
	[Nav] [char](1) NULL,
	[PrevNav] [char](1) NULL,
	[ClientIP] [char](15) NULL,
	[WebIP] [char](15) NULL,
	[ClusterID] [char](10) NULL,
	[LastModified] [datetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserTable]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserTable](
	[Initials] [char](8) NOT NULL,
	[Password] [char](8) NULL,
	[UserName] [char](24) NULL,
	[DefaultBranch] [smallint] NULL,
	[ID] [bigint] IDENTITY(1,1) NOT NULL,
 CONSTRAINT [PK_UserTable] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ValidACC]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ValidACC](
	[DescAbrv] [char](4) NULL,
	[ACC] [smallint] NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [SDA]    Script Date: 1/4/2025 10:19:25 AM ******/
CREATE CLUSTERED INDEX [SDA] ON [dbo].[ValidACC]
(
	[DescAbrv] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[WAPrereq]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[WAPrereq](
	[WorkflowType] [char](32) NULL,
	[ActionName] [char](32) NULL,
	[PrereqAction] [char](32) NULL,
	[Sequence] [smallint] NULL,
	[PrereqType] [char](32) NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [Tracking]    Script Date: 1/4/2025 10:19:25 AM ******/
CREATE CLUSTERED INDEX [Tracking] ON [dbo].[WAPrereq]
(
	[WorkflowType] ASC,
	[ActionName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[WebAccess]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[WebAccess](
	[WebAccessId] [int] NULL,
	[StartDate] [datetime] NULL,
	[StopDate] [datetime] NULL,
	[Message] [char](256) NULL,
	[TellerId] [char](10) NULL,
	[ClientIP] [char](15) NULL,
	[WebIP] [char](15) NULL,
	[ClusterID] [char](10) NULL,
	[LastModified] [datetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Workflow]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Workflow](
	[WorkflowType] [char](32) NULL,
	[AllowCancel] [char](32) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[WorkflowAction]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[WorkflowAction](
	[WorkflowType] [char](32) NULL,
	[Sequence] [smallint] NULL,
	[ActionName] [char](32) NULL,
	[ActionType] [char](32) NULL,
	[Description] [char](60) NULL,
	[ASPPage] [char](60) NULL,
	[Display] [char](1) NULL,
	[UndoAllowed] [char](1) NULL,
	[OverrideAllowed] [char](1) NULL,
	[ReviewAllowed] [char](1) NULL,
	[OverrideBy] [char](3) NULL,
	[OverrideDate] [datetime] NULL,
	[SkipAllowed] [char](1) NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [Tracking]    Script Date: 1/4/2025 10:19:25 AM ******/
CREATE CLUSTERED INDEX [Tracking] ON [dbo].[WorkflowAction]
(
	[WorkflowType] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[x_AcctConv]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[x_AcctConv](
	[oldAcct] [char](10) NOT NULL,
	[newAcct] [char](10) NOT NULL,
	[tstamp] [char](20) NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[x_ACCTXREF]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[x_ACCTXREF](
	[TrackingNum] [int] NOT NULL,
	[Processed] [smallint] NULL,
	[NewAccount] [int] NULL,
	[OldAccount] [int] NULL,
	[SSN] [char](9) NULL,
	[Password] [char](24) NULL,
	[PinTries] [smallint] NULL,
	[LockedOut] [char](1) NULL,
	[Converted] [smallint] NULL,
	[ClientIP] [char](15) NULL,
	[WebIP] [char](15) NULL,
	[ClusterID] [char](10) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[x_ADCH]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[x_ADCH](
	[TrackingNum] [int] NOT NULL,
	[Processed] [smallint] NULL,
	[ACCOUNTNUMBER] [int] NULL,
	[SURNAME] [char](2) NULL,
	[CHANGEINQUIRY] [char](1) NULL,
	[ADDRESSLINE1] [char](30) NULL,
	[ADDRESSLINE2] [char](30) NULL,
	[ADDRESSLINE3] [char](30) NULL,
	[CITY] [char](16) NULL,
	[STATE] [char](2) NULL,
	[ZIPCODE] [char](9) NULL,
	[COUNTRYCODE] [char](2) NULL,
	[HOMEPHONE] [char](3) NULL,
	[WORKPHONE] [char](3) NULL,
	[UPDATEESCHEAT] [datetime] NULL,
	[ALTADDRESSLINE1] [char](30) NULL,
	[ALTADDRESSLINE2] [char](30) NULL,
	[ALTADDRESSLINE3] [char](30) NULL,
	[ALTCITY] [char](16) NULL,
	[ALTSTATE] [char](2) NULL,
	[ALTZIPCODE] [char](9) NULL,
	[ALTCOUNTRYCODE] [char](2) NULL,
	[ALTHOMEPHONE] [char](3) NULL,
	[ALTWORKPHONE] [char](3) NULL,
	[STARTDATE] [datetime] NULL,
	[STOPDATE] [datetime] NULL,
	[CLEARALTADDRESS] [char](1) NULL,
	[ClientIP] [char](15) NULL,
	[WebIP] [char](15) NULL,
	[ClusterID] [char](10) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[x_AOCH]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[x_AOCH](
	[TrackingNum] [int] NOT NULL,
	[Processed] [smallint] NULL,
	[Account] [char](9) NULL,
	[Suffix] [smallint] NULL,
	[Surname] [char](2) NULL,
	[SLType] [char](1) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[x_AOCH_AOCHTransfer]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[x_AOCH_AOCHTransfer](
	[TrackingNum] [int] NOT NULL,
	[Processed] [smallint] NULL,
	[InstId] [int] NULL,
	[InstAccount] [char](20) NULL,
	[TranCode] [char](2) NULL,
	[Amount] [int] NULL,
	[Frequency] [char](1) NULL,
	[NextDate] [datetime] NULL,
	[StopDate] [datetime] NULL,
	[BPAccount] [char](16) NULL,
	[Description] [char](20) NULL,
	[PreNoteStatus] [char](1) NULL,
	[PreNoteDate] [datetime] NULL,
	[PreNoteDesc] [char](60) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[x_APPConfig]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[x_APPConfig](
	[ID] [smallint] IDENTITY(1,1) NOT NULL,
	[application] [varchar](20) NOT NULL,
	[itemcontext] [varchar](30) NULL,
	[itemname] [varchar](30) NOT NULL,
	[itemvalue] [varchar](200) NULL,
	[IID] [int] NULL,
 CONSTRAINT [PK_x_APPConfig] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[x_BECH]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[x_BECH](
	[TrackingNum] [int] NOT NULL,
	[Processed] [smallint] NULL,
	[Account] [int] NULL,
	[Suffix] [smallint] NULL,
	[Surname] [char](2) NULL,
	[AcctPlan] [char](1) NULL,
	[BeneficiaryNumber] [int] NULL,
	[ChangeMode] [char](1) NULL,
	[BeneficiaryAccount] [char](9) NULL,
	[AddressAssociated] [char](1) NULL,
	[Name] [char](30) NULL,
	[Address1] [char](30) NULL,
	[Address2] [char](30) NULL,
	[Address3] [char](30) NULL,
	[City] [char](16) NULL,
	[State] [char](2) NULL,
	[Zip] [char](9) NULL,
	[Country] [char](2) NULL,
	[PhoneAC] [int] NULL,
	[SSN] [char](9) NULL,
	[DistributionPercent] [char](5) NULL,
	[BeneficiaryType] [char](1) NULL,
	[DOB] [datetime] NULL,
	[TotalDistributionDate] [datetime] NULL,
	[ClientIP] [char](15) NULL,
	[WebIP] [char](15) NULL,
	[ClusterID] [char](10) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[x_CCLO]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[x_CCLO](
	[TrackingNum] [int] NOT NULL,
	[Processed] [smallint] NULL,
	[Account] [int] NULL,
	[Suffix] [smallint] NULL,
	[Surname] [char](2) NULL,
	[ChangeMode] [char](1) NULL,
	[ApplyDate] [datetime] NULL,
	[LoanNumber] [int] NULL,
	[LoanOfficer] [char](3) NULL,
	[CreditLimit] [char](10) NULL,
	[ReviewDate] [datetime] NULL,
	[LoanAmount] [int] NULL,
	[CashAdvanceAPR] [int] NULL,
	[PurchaseAPR] [int] NULL,
	[Action] [char](1) NULL,
	[PaymentAmount] [char](10) NULL,
	[DueDate] [datetime] NULL,
	[Method] [char](1) NULL,
	[Frequency] [char](1) NULL,
	[Disclosure] [char](2) NULL,
	[CollateralCode] [smallint] NULL,
	[Description] [char](20) NULL,
	[CreditReportCode] [char](3) NULL,
	[CreditScore] [char](4) NULL,
	[SkipCode] [char](2) NULL,
	[JointNam1] [char](30) NULL,
	[SSN] [char](9) NULL,
	[AssociationCode] [char](1) NULL,
	[DenialReason] [char](30) NULL,
	[DenialNotice] [char](1) NULL,
	[CurrBranch] [char](2) NULL,
	[OrigBranch] [char](2) NULL,
	[Seller] [char](3) NULL,
	[CycleDate] [datetime] NULL,
	[LastCycleDate] [char](6) NULL,
	[LastOverlimitDate] [char](6) NULL,
	[OverlimitMTD] [char](6) NULL,
	[OverlimitQTD] [char](6) NULL,
	[OverlimitYTD] [char](6) NULL,
	[OverlimitTOT] [char](6) NULL,
	[SplitRatePurchase] [char](2) NULL,
	[SplitRateCash] [char](2) NULL,
	[CardTypeCode] [char](1) NULL,
	[CardAccount] [char](20) NULL,
	[CardMemberNumber] [char](1) NULL,
	[CardStatus] [char](1) NULL,
	[CardName1] [char](30) NULL,
	[CardExpire] [datetime] NULL,
	[CardName2] [char](30) NULL,
	[CardOrderFlag] [char](1) NULL,
	[NumCards] [smallint] NULL,
	[StockCode] [char](1) NULL,
	[ClientIP] [char](15) NULL,
	[WebIP] [char](15) NULL,
	[ClusterID] [char](10) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[x_DROP]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[x_DROP](
	[TrackingNum] [int] NOT NULL,
	[Processed] [smallint] NULL,
	[DrawerNumber] [int] NULL,
	[EffectiveDate] [datetime] NULL,
	[Reopen] [char](1) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[x_EMCH]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[x_EMCH](
	[TrackingNum] [int] NOT NULL,
	[Processed] [smallint] NULL,
	[Account] [int] NULL,
	[Surname] [char](2) NULL,
	[ChangeMode] [char](1) NULL,
	[EmployerName] [char](30) NULL,
	[Address1] [char](30) NULL,
	[City] [char](16) NULL,
	[State] [char](2) NULL,
	[Zip] [char](9) NULL,
	[AreaCode] [char](3) NULL,
	[Phone] [int] NULL,
	[Department] [char](12) NULL,
	[JobTitle] [char](16) NULL,
	[Shift] [char](10) NULL,
	[EmployeeNumber] [char](20) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[x_HDOR]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[x_HDOR](
	[TrackingNum] [int] NOT NULL,
	[Processed] [smallint] NULL,
	[Account] [int] NULL,
	[Suffix] [int] NULL,
	[Surname] [char](2) NULL,
	[SLType] [char](1) NULL,
	[ChangeMode] [char](1) NULL,
	[RecordNumber] [char](1) NULL,
	[Order] [char](1) NULL,
	[MICRAccount] [char](20) NULL,
	[RoutingNumber] [char](9) NULL,
	[Branch] [char](5) NULL,
	[CatalogCode] [char](16) NULL,
	[Quantity] [char](3) NULL,
	[StartNumber] [char](6) NULL,
	[Font] [char](1) NULL,
	[Flush] [char](1) NULL,
	[Line1] [char](40) NULL,
	[Line2] [char](40) NULL,
	[Line3] [char](40) NULL,
	[Line4] [char](40) NULL,
	[Line5] [char](40) NULL,
	[Line1Size] [char](1) NULL,
	[Line2Size] [char](1) NULL,
	[Line3Size] [char](1) NULL,
	[Line4Size] [char](1) NULL,
	[Line5Size] [char](1) NULL,
	[CoverCode] [char](16) NULL,
	[Initials] [char](3) NULL,
	[CutCode] [char](6) NULL,
	[TwoSigLines] [char](1) NULL,
	[SpecialProgram] [char](2) NULL,
	[BillCode] [char](2) NULL,
	[Delivery] [char](1) NULL,
	[OverSigFont] [char](1) NULL,
	[OverSigMessage] [char](36) NULL,
	[Address1] [char](40) NULL,
	[Address2] [char](40) NULL,
	[Address3] [char](40) NULL,
	[Address4] [char](40) NULL,
	[SpecialInstructions] [char](40) NULL,
	[OrderDate] [datetime] NULL,
	[LastTransmittal] [datetime] NULL,
	[LastOrder] [datetime] NULL,
	[ReceivedData] [datetime] NULL,
	[ShipDate] [datetime] NULL,
	[UpdateCounter] [int] NULL,
	[OrderNumber] [char](20) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[x_Institution]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[x_Institution](
	[TrackingNum] [int] NOT NULL,
	[Processed] [smallint] NULL,
	[InstitutionID] [char](10) NULL,
	[IMSIP] [char](11) NULL,
	[IMSPort] [char](4) NULL,
	[CreditBureauOrder] [char](25) NULL,
	[PreapproveCreditBureau] [char](3) NULL,
	[SecurityMessage] [char](155) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[x_Institutionxlate]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[x_Institutionxlate](
	[TrackingNum] [int] NOT NULL,
	[Processed] [smallint] NULL,
	[InstitutionID] [char](10) NULL,
	[IMSIP] [char](11) NULL,
	[IMSPort] [char](4) NULL,
	[CreditBureauOrder] [char](25) NULL,
	[PreapproveCreditBureau] [char](3) NULL,
	[SecurityMessage] [char](255) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[x_InterestRate]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[x_InterestRate](
	[Id] [int] NOT NULL,
	[Category] [char](20) NULL,
	[Description] [char](50) NULL,
	[Rate] [char](20) NULL,
	[Annual] [char](20) NULL,
	[SpecialRate] [char](20) NULL,
	[Amount] [char](20) NULL,
	[ClientIP] [char](15) NULL,
	[WebIP] [char](15) NULL,
	[ClusterID] [char](10) NULL,
	[LastModified] [datetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[x_internalaccess]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[x_internalaccess](
	[TrackingNum] [int] NOT NULL,
	[Teller] [char](50) NULL,
	[AccessCategory] [char](20) NULL,
	[AccessName] [char](40) NULL,
	[AccessType] [char](10) NULL,
	[AccessValue] [char](500) NULL,
	[AddDate] [datetime] NULL,
	[ChangeDate] [datetime] NULL,
	[ClientIP] [char](15) NULL,
	[WebIP] [char](15) NULL,
	[ClusterID] [char](10) NULL,
	[LastModified] [datetime] NULL,
	[ID] [int] IDENTITY(1,1) NOT NULL,
 CONSTRAINT [PK_x_InternalAccess] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[x_internalAccess_backup]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[x_internalAccess_backup](
	[TrackingNum] [int] NOT NULL,
	[Teller] [char](3) NULL,
	[AccessCategory] [char](20) NULL,
	[AccessName] [char](40) NULL,
	[AccessType] [char](10) NULL,
	[AccessValue] [char](500) NULL,
	[AddDate] [datetime] NULL,
	[ChangeDate] [datetime] NULL,
	[ClientIP] [char](15) NULL,
	[WebIP] [char](15) NULL,
	[ClusterID] [char](10) NULL,
	[LastModified] [datetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[x_internalAccess_Backup_06252007]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[x_internalAccess_Backup_06252007](
	[TrackingNum] [int] NOT NULL,
	[Teller] [char](50) NULL,
	[AccessCategory] [char](20) NULL,
	[AccessName] [char](40) NULL,
	[AccessType] [char](10) NULL,
	[AccessValue] [char](500) NULL,
	[AddDate] [datetime] NULL,
	[ChangeDate] [datetime] NULL,
	[ClientIP] [char](15) NULL,
	[WebIP] [char](15) NULL,
	[ClusterID] [char](10) NULL,
	[LastModified] [datetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[x_internalaccess_backup_11022006]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[x_internalaccess_backup_11022006](
	[TrackingNum] [int] NOT NULL,
	[Teller] [char](50) NULL,
	[AccessCategory] [char](20) NULL,
	[AccessName] [char](40) NULL,
	[AccessType] [char](10) NULL,
	[AccessValue] [char](500) NULL,
	[AddDate] [datetime] NULL,
	[ChangeDate] [datetime] NULL,
	[ClientIP] [char](15) NULL,
	[WebIP] [char](15) NULL,
	[ClusterID] [char](10) NULL,
	[LastModified] [datetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[x_internalAccess_bkup_20110125]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[x_internalAccess_bkup_20110125](
	[TrackingNum] [int] NOT NULL,
	[Teller] [char](50) NULL,
	[AccessCategory] [char](20) NULL,
	[AccessName] [char](40) NULL,
	[AccessType] [char](10) NULL,
	[AccessValue] [char](500) NULL,
	[AddDate] [datetime] NULL,
	[ChangeDate] [datetime] NULL,
	[ClientIP] [char](15) NULL,
	[WebIP] [char](15) NULL,
	[ClusterID] [char](10) NULL,
	[LastModified] [datetime] NULL,
	[ID] [int] IDENTITY(1,1) NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[x_IRCH]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[x_IRCH](
	[TrackingNum] [int] NOT NULL,
	[Processed] [smallint] NULL,
	[ACCOUNTNUMBER] [int] NULL,
	[SUFFIX] [smallint] NULL,
	[SURNAME] [char](2) NULL,
	[NEWCHANGEINQUIRY] [char](1) NULL,
	[SHDESC] [char](20) NULL,
	[SHAREDESCABBR] [char](3) NULL,
	[ACC] [char](2) NULL,
	[IRATP] [char](1) NULL,
	[MAXPREV] [char](9) NULL,
	[CURANNCONT] [char](9) NULL,
	[OPENDTE] [char](6) NULL,
	[TERM] [char](1) NULL,
	[SSNPLANDST] [char](9) NULL,
	[BENEFICIARY] [char](18) NULL,
	[TR2] [char](1) NULL,
	[TR3] [char](1) NULL,
	[TR4] [char](1) NULL,
	[ROOPTXFRAMT] [char](9) NULL,
	[XFERACCT] [char](1) NULL,
	[DESCABBR] [char](3) NULL,
	[CURR] [char](6) NULL,
	[PRIORRT] [char](6) NULL,
	[DIVPAIDTO] [char](6) NULL,
	[MATURITYDATE] [datetime] NULL,
	[MATDISPCODE] [char](4) NULL,
	[ROLLOVERDATE] [datetime] NULL,
	[CENTDAYS] [char](12) NULL,
	[DIVDISPCODE] [char](1) NULL,
	[PTDWDCOUNT] [char](3) NULL,
	[TARGETAMT] [char](9) NULL,
	[PENALTYRATE] [int] NULL,
	[PENALTYAMT] [char](3) NULL,
	[IRAISSUEDT] [char](6) NULL,
	[NOTICEDATE] [datetime] NULL,
	[PENALTYYTD] [char](3) NULL,
	[ORIGBR] [char](2) NULL,
	[SELLER] [char](3) NULL,
	[STATMNTORDER] [char](2) NULL,
	[ClientIP] [char](15) NULL,
	[WebIP] [char](15) NULL,
	[ClusterID] [char](10) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[x_JOCH]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[x_JOCH](
	[TrackingNum] [int] NOT NULL,
	[Processed] [smallint] NULL,
	[Account] [int] NULL,
	[Suffix] [smallint] NULL,
	[Surname] [char](2) NULL,
	[JointOwnerNumber] [int] NULL,
	[ChangeMode] [char](1) NULL,
	[JointAccount] [char](9) NULL,
	[AddressAssociated] [char](1) NULL,
	[AssociationCode] [char](2) NULL,
	[C24Access] [char](1) NULL,
	[StatementPrint] [char](1) NULL,
	[FName] [char](30) NULL,
	[Address1] [char](30) NULL,
	[Address2] [char](30) NULL,
	[Address3] [char](30) NULL,
	[City] [char](16) NULL,
	[State] [char](2) NULL,
	[Zip] [char](9) NULL,
	[CntryCode] [char](2) NULL,
	[HomePhone] [char](7) NULL,
	[SSN] [char](9) NULL,
	[DOB] [datetime] NULL,
	[MInitial] [char](2) NULL,
	[LName] [char](30) NULL,
	[HomeAC] [char](3) NULL,
	[EMail1] [char](60) NULL,
	[WorkAC] [char](3) NULL,
	[WorkPhone] [char](7) NULL,
	[W8] [char](1) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[x_LogReview]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[x_LogReview](
	[TrackingNum] [int] NOT NULL,
	[Processed] [smallint] NULL,
	[Account] [int] NULL,
	[TransactionName] [char](20) NULL,
	[TransUsage] [char](20) NULL,
	[Mode] [char](1) NULL,
	[Internal] [char](1) NULL,
	[LogTrackingNum] [int] NULL,
	[LogSessionID] [char](20) NULL,
	[ClientIP] [char](15) NULL,
	[WebIP] [char](15) NULL,
	[ClusterID] [char](10) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[x_LTree]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[x_LTree](
	[TrackingNum] [int] NOT NULL,
	[Processed] [smallint] NULL,
	[QFN] [char](64) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[x_MECH]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[x_MECH](
	[TrackingNum] [int] NOT NULL,
	[Processed] [smallint] NULL,
	[Account] [int] NULL,
	[Surname] [char](2) NULL,
	[Mode] [char](1) NULL,
	[Name] [char](30) NULL,
	[SSN] [char](9) NULL,
	[AddressLine1] [char](30) NULL,
	[AddressLine2] [char](30) NULL,
	[AffinityCode] [char](4) NULL,
	[AddressLine3] [char](30) NULL,
	[Residence] [char](1) NULL,
	[W8Received] [char](1) NULL,
	[City] [char](16) NULL,
	[State] [char](2) NULL,
	[ZipCode] [char](9) NULL,
	[CountryCode] [char](2) NULL,
	[HomePhone] [char](3) NULL,
	[WorkPhone] [char](3) NULL,
	[Fax] [char](3) NULL,
	[Email] [char](50) NULL,
	[Household] [char](9) NULL,
	[MothersMaidenName] [char](30) NULL,
	[HouseholdCode] [char](1) NULL,
	[DrivLicNbr] [char](20) NULL,
	[DrivLicState] [char](2) NULL,
	[BirthDate] [datetime] NULL,
	[InternetCustomerID] [char](16) NULL,
	[TaxReportCd] [char](1) NULL,
	[Class] [char](2) NULL,
	[JtName] [char](28) NULL,
	[CurrBranch] [char](2) NULL,
	[OrigBranch] [char](2) NULL,
	[Seller] [char](3) NULL,
	[EscheatDate] [datetime] NULL,
	[Department] [char](12) NULL,
	[EmployeeNbr] [char](6) NULL,
	[PldgAmount] [int] NULL,
	[InsCode] [char](2) NULL,
	[RefField] [char](8) NULL,
	[Ref2Field] [char](8) NULL,
	[Ref3Field] [char](8) NULL,
	[Ref4Field] [char](8) NULL,
	[UserDate] [datetime] NULL,
	[CredReport] [char](4) NULL,
	[Password] [char](10) NULL,
	[ProxyDate] [datetime] NULL,
	[Sex] [char](1) NULL,
	[SexRace] [char](1) NULL,
	[YTDInterest] [char](9) NULL,
	[PayrollGrp] [char](4) NULL,
	[C24Lockout] [char](1) NULL,
	[StmntCycle] [char](2) NULL,
	[PymtHistory] [char](30) NULL,
	[AccessClass] [char](1) NULL,
	[TaxIDType] [char](1) NULL,
	[ClientIP] [char](15) NULL,
	[WebIP] [char](15) NULL,
	[ClusterID] [char](10) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[x_NMRSHCH]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[x_NMRSHCH](
	[TrackingNum] [int] NOT NULL,
	[Processed] [smallint] NULL,
	[Account] [int] NULL,
	[Suffix] [smallint] NULL,
	[Surname] [char](2) NULL,
	[Mode] [char](1) NULL,
	[Description] [char](20) NULL,
	[DescriptionAbbr] [char](3) NULL,
	[ACC] [char](2) NULL,
	[TaxReportingSSN] [char](9) NULL,
	[SDAcctNumber] [int] NULL,
	[TaxReportingCd] [char](1) NULL,
	[JtName] [char](35) NULL,
	[StatementOrder] [char](2) NULL,
	[OpenDate] [datetime] NULL,
	[MICRNumber] [int] NULL,
	[PrevMICRNum] [char](14) NULL,
	[InetEnableFlag] [char](1) NULL,
	[DivRate] [int] NULL,
	[DivDispCode] [char](1) NULL,
	[DivPaidDate] [datetime] NULL,
	[ShPldgAmt] [int] NULL,
	[CrossPldgAcct] [char](9) NULL,
	[LowDivPerBal] [char](9) NULL,
	[CrossPldgSfx] [char](2) NULL,
	[YTDDividends] [char](9) NULL,
	[YTDWithhold] [char](9) NULL,
	[WithholdingDt] [datetime] NULL,
	[CentsDays] [char](12) NULL,
	[RegDWd] [char](4) NULL,
	[OrigBranch] [char](2) NULL,
	[LstSmallWdDt] [datetime] NULL,
	[Seller] [char](3) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[x_NMRSHCH_TransferTargets]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[x_NMRSHCH_TransferTargets](
	[TrackingNum] [int] NOT NULL,
	[Processed] [smallint] NULL,
	[Account] [int] NULL,
	[SLType] [char](2) NULL,
	[Suffix] [smallint] NULL,
	[Surname] [char](2) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[x_OBLA]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[x_OBLA](
	[TrackingNum] [int] NOT NULL,
	[Processed] [smallint] NULL,
	[Account] [int] NULL,
	[ReferenceType] [char](25) NULL,
	[LoginID] [char](25) NULL,
	[Password] [char](25) NULL,
	[ClientIP] [char](15) NULL,
	[WebIP] [char](15) NULL,
	[ClusterID] [char](10) NULL,
	[LastModified] [datetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[x_OBLinkedAccounts]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[x_OBLinkedAccounts](
	[TrackingNum] [int] NOT NULL,
	[Processed] [smallint] NULL,
	[AccountType] [char](25) NULL,
	[Login] [char](25) NULL,
	[Password] [char](25) NULL,
	[ClientIP] [char](15) NULL,
	[WebIP] [char](15) NULL,
	[ClusterID] [char](10) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[x_OBOptions]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[x_OBOptions](
	[TrackingNum] [int] NOT NULL,
	[Processed] [smallint] NULL,
	[Account] [int] NOT NULL,
	[LastLogin] [datetime] NULL,
	[Timeout] [int] NULL,
	[DateRange] [int] NULL,
	[StartPage] [char](25) NULL,
	[EmailVerifiedOn] [datetime] NULL,
	[ClientIP] [char](15) NULL,
	[WebIP] [char](15) NULL,
	[ClusterID] [char](10) NULL,
	[LastModified] [datetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Index [xAccount]    Script Date: 1/4/2025 10:19:25 AM ******/
CREATE UNIQUE CLUSTERED INDEX [xAccount] ON [dbo].[x_OBOptions]
(
	[Account] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[x_pdoc]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[x_pdoc](
	[TrackingNum] [int] NOT NULL,
	[Processed] [smallint] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[x_PublishNotices]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[x_PublishNotices](
	[TrackingNum] [int] NOT NULL,
	[Processed] [smallint] NULL,
	[Teller] [varchar](50) NULL,
	[Notes] [char](200) NULL,
	[FileID] [int] NULL,
	[AlertID] [char](32) NULL,
	[StatementType] [char](20) NULL,
	[NewAvailable] [char](1) NULL,
	[OldAvailable] [char](1) NULL,
	[NewNoticePending] [char](1) NULL,
	[OldNoticePending] [char](1) NULL,
	[Action] [char](2) NULL,
	[Account] [bigint] NULL,
	[NotificationID] [int] NULL,
	[ExecuteTime] [datetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[x_redirect_downtime]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[x_redirect_downtime](
	[DTTrackingNum] [int] NULL,
	[Processed] [smallint] NULL,
	[StartDate] [datetime] NULL,
	[StartTime] [int] NULL,
	[EndDate] [datetime] NULL,
	[EndTime] [int] NULL,
	[Message] [char](1000) NULL,
	[Teller] [char](3) NULL,
	[EditTeller] [char](3) NULL,
	[MessageType] [char](1) NULL,
	[ServiceName] [char](20) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[x_Redirect_Service]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[x_Redirect_Service](
	[TrackingNum] [int] NOT NULL,
	[Processed] [smallint] NULL,
	[ServiceName] [char](20) NULL,
	[ServiceDesc] [char](200) NULL,
	[Template] [char](20) NULL,
	[ServiceURL] [char](200) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[x_SHCH]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[x_SHCH](
	[TrackingNum] [int] NOT NULL,
	[Processed] [smallint] NULL,
	[Account] [int] NULL,
	[Suffix] [smallint] NULL,
	[Sn] [char](2) NULL,
	[Mode] [char](1) NULL,
	[Description] [char](20) NULL,
	[DescriptionAbbr] [char](3) NULL,
	[ACC] [char](2) NULL,
	[TaxReportingSSN] [char](9) NULL,
	[SDAcctNumber] [int] NULL,
	[TaxReportingCd] [char](1) NULL,
	[JtName] [char](35) NULL,
	[StatementOrder] [char](2) NULL,
	[OpenDate] [datetime] NULL,
	[MICRNumber] [int] NULL,
	[PrevMICRNum] [char](14) NULL,
	[InetEnableFlag] [char](1) NULL,
	[DivRate] [int] NULL,
	[DivDispCode] [char](1) NULL,
	[DivPaidDate] [datetime] NULL,
	[ShPldgAmt] [int] NULL,
	[YTDDividends] [char](9) NULL,
	[YTDWithhold] [char](9) NULL,
	[WithholdingDt] [datetime] NULL,
	[CentsDays] [char](12) NULL,
	[RegDWd] [char](4) NULL,
	[Ck] [char](4) NULL,
	[Curr] [char](2) NULL,
	[OrigBranch] [char](2) NULL,
	[LstSmallWdDt] [datetime] NULL,
	[Seller] [char](3) NULL,
	[ClientIP] [char](15) NULL,
	[WebIP] [char](15) NULL,
	[ClusterID] [char](10) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[x_TLID]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[x_TLID](
	[TrackingNum] [int] NOT NULL,
	[Processed] [smallint] NULL,
	[TellerInitials] [char](3) NULL,
	[ChangeMode] [char](1) NULL,
	[NewID] [char](5) NULL,
	[ClientIP] [char](15) NULL,
	[WebIP] [char](15) NULL,
	[ClusterID] [char](10) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[x_Weather]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[x_Weather](
	[TrackingNum] [int] NOT NULL,
	[Processed] [smallint] NULL,
	[ZipCode] [char](10) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[x_Weather_Day]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[x_Weather_Day](
	[TrackingNum] [int] NOT NULL,
	[Processed] [smallint] NULL,
	[ChanceOfPrecip] [int] NULL,
	[Forecast] [char](30) NULL,
	[DayOfWeek] [char](10) NULL,
	[DateOfDay] [datetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[x_Weather_Day_Temperature]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[x_Weather_Day_Temperature](
	[TrackingNum] [int] NOT NULL,
	[Processed] [smallint] NULL,
	[Low] [int] NULL,
	[High] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[xUserTable]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[xUserTable](
	[Initials] [char](8) NULL,
	[Password] [char](8) NULL,
	[UserName] [char](24) NULL,
	[DefaultBranch] [smallint] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [ims].[CRCHRelatedSuffix]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [ims].[CRCHRelatedSuffix](
	[Sequence] [int] NOT NULL,
	[TrackingNum] [int] NOT NULL,
	[Account] [int] NULL,
	[SLType] [char](1) NULL,
	[RelType] [char](1) NULL,
	[Suffix] [int] NULL,
	[Surname] [char](2) NULL,
	[ChangeCode] [char](10) NULL,
	[Status] [char](1) NULL,
	[Description] [char](50) NULL,
	[ClientIP] [char](15) NULL,
	[WebIP] [char](15) NULL,
	[ClusterID] [char](10) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [ims].[EquifaxAlertContact]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [ims].[EquifaxAlertContact](
	[TrackingNum] [int] NOT NULL,
	[Sequence] [smallint] NULL,
	[AlertType] [char](1) NULL,
	[DateReported] [char](8) NULL,
	[DateEffective] [char](8) NULL,
	[Status] [char](1) NULL,
	[PhoneType1] [char](1) NULL,
	[InternationalCode1] [char](4) NULL,
	[PhoneNumber1] [char](10) NULL,
	[Extension1] [char](5) NULL,
	[PhoneType2] [char](1) NULL,
	[InternationalCode2] [char](4) NULL,
	[PhoneNumber2] [char](10) NULL,
	[Extension2] [char](5) NULL,
	[PhoneType3] [char](1) NULL,
	[InternationalCode3] [char](4) NULL,
	[PhoneNumber3] [char](10) NULL,
	[Extension3] [char](5) NULL,
	[Address1] [char](50) NULL,
	[Address2] [char](25) NULL,
	[City] [char](20) NULL,
	[State] [char](2) NULL,
	[ZIPCode] [char](9) NULL,
	[CountryCode] [char](3) NULL,
	[AdditionalInfo] [char](100) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [ims].[EquifaxManualApproval]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [ims].[EquifaxManualApproval](
	[TrackingNum] [int] NOT NULL,
	[ReasonCode] [char](32) NULL,
	[Description] [char](255) NULL,
	[ClientIP] [char](15) NULL,
	[WebIP] [char](15) NULL,
	[ClusterID] [char](10) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [ims].[LogReviewSetup]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [ims].[LogReviewSetup](
	[TransactionName] [char](20) NOT NULL,
	[DisplayPosition] [int] NOT NULL,
	[FieldName] [char](20) NOT NULL,
	[FieldDescription] [varchar](50) NOT NULL,
	[XPathExpression] [varchar](100) NOT NULL,
	[GridIndex] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [ims].[LTActionLog]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [ims].[LTActionLog](
	[QFN] [char](10) NOT NULL,
	[TranDate] [datetime] NULL,
	[Step] [char](10) NULL,
	[ClientIP] [char](15) NULL,
	[WebIP] [char](15) NULL,
	[ClusterID] [char](10) NULL,
	[LastModified] [datetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [ims].[MSLFlags]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [ims].[MSLFlags](
	[Account] [int] NULL,
	[FlagLevel] [char](1) NULL,
	[Surname] [char](2) NULL,
	[FlagType] [char](1) NULL,
	[Suffix] [smallint] NULL,
	[FlagNumber] [tinyint] NULL,
	[FlagValue] [tinyint] NULL,
	[ImportTS] [datetime] NULL,
	[Pending] [int] NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [AccountLevel]    Script Date: 1/4/2025 10:19:25 AM ******/
CREATE CLUSTERED INDEX [AccountLevel] ON [ims].[MSLFlags]
(
	[Account] ASC,
	[FlagLevel] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Table [ims].[MSLMemos]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [ims].[MSLMemos](
	[Account] [int] NULL,
	[Suffix] [smallint] NULL,
	[MemoLevel] [char](1) NULL,
	[MemoNumber] [smallint] NULL,
	[Description] [char](60) NULL,
	[EntryDate] [datetime] NULL,
	[Expiration] [datetime] NULL,
	[ImportTS] [datetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [ims].[NewMemberManualApproval]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [ims].[NewMemberManualApproval](
	[TrackingNum] [int] NULL,
	[Sequence] [smallint] NULL,
	[ReasonCode] [char](32) NULL,
	[JointSequence] [int] NULL,
	[Description] [char](255) NULL,
	[ApprovedBy] [char](3) NULL,
	[Category] [char](2) NULL,
	[ApprovedOn] [datetime] NULL,
	[ApproveCode] [char](1) NULL,
	[DeclinedBy] [char](3) NULL,
	[Comment] [char](200) NULL,
	[DeclinedOn] [datetime] NULL,
	[ErrorFlag] [char](1) NULL,
	[ApprovalStatus] [char](1) NULL,
	[ClientIP] [char](15) NULL,
	[WebIP] [char](15) NULL,
	[ClusterID] [char](10) NULL
) ON [PRIMARY]
GO
/****** Object:  Index [xTracking]    Script Date: 1/4/2025 10:19:25 AM ******/
CREATE CLUSTERED INDEX [xTracking] ON [ims].[NewMemberManualApproval]
(
	[TrackingNum] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Table [ims].[OfflineCardAdvance]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [ims].[OfflineCardAdvance](
	[Processed] [smallint] NULL,
	[Account] [int] NULL,
	[Suffix] [smallint] NULL,
	[PAN] [char](20) NULL,
	[Balance] [int] NULL,
	[CreditLimit] [int] NULL,
	[Available] [int] NULL,
	[Amount] [int] NULL,
	[TranDate] [datetime] NULL,
	[TrackingNum] [int] NULL,
	[EffectiveDate] [datetime] NULL,
	[TranDescription] [char](30) NULL,
	[ClientIP] [char](15) NULL,
	[WebIP] [char](15) NULL,
	[ClusterID] [char](10) NULL,
	[LastModified] [datetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [ims].[ProcessQOwner]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [ims].[ProcessQOwner](
	[OwnerId] [int] NULL,
	[LastUpdate] [datetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [ims].[PromoNPTSWSConfig]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [ims].[PromoNPTSWSConfig](
	[URL] [char](100) NULL,
	[URI] [char](100) NULL,
	[HeaderID] [char](50) NULL,
	[HeaderPassword] [char](50) NULL,
	[ChannelID] [int] NULL,
	[ChannelConnectorID] [int] NULL,
	[ChannelInstanceID] [char](10) NULL,
	[ReturnMessageLimit] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [imssa].[Results]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [imssa].[Results](
	[Account] [int] NOT NULL,
	[IndexId] [int] NOT NULL,
	[FileId] [int] NOT NULL,
	[CheckNumber] [int] NOT NULL,
	[OriginalDEOffset] [int] NOT NULL,
	[OriginFileNum] [int] NOT NULL,
	[TiffFileOffsetFront] [int] NOT NULL,
	[TiffFileSizeFront] [int] NOT NULL,
	[CheckAmount] [int] NOT NULL,
	[TiffFileOffsetBack] [int] NOT NULL,
	[SequenceNumber] [int] NOT NULL,
	[TiffFileSizeBack] [int] NOT NULL,
	[JPGFileOffsetFront] [int] NOT NULL,
	[JPGSizeFront] [int] NOT NULL,
	[JPGFileOffsetBack] [int] NOT NULL,
	[JPGSizeBack] [int] NOT NULL,
	[TiffWidthBack] [int] NOT NULL,
	[TiffLengthBack] [int] NOT NULL,
	[TiffWidthFront] [int] NOT NULL,
	[TiffLengthFront] [int] NOT NULL,
	[TiffEncoding] [int] NOT NULL,
	[SLType] [char](1) NULL,
	[Suffix] [smallint] NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_Unique]    Script Date: 1/4/2025 10:19:25 AM ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_Unique] ON [dbo].[AccessFlags]
(
	[AccessCategory] ASC,
	[AccessName] ASC,
	[NameDesc] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 90, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [xAccessCategory]    Script Date: 1/4/2025 10:19:25 AM ******/
CREATE NONCLUSTERED INDEX [xAccessCategory] ON [dbo].[AccessFlags]
(
	[AccessCategory] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [CheckAccountNumber_CheckNumber]    Script Date: 1/4/2025 10:19:25 AM ******/
CREATE NONCLUSTERED INDEX [CheckAccountNumber_CheckNumber] ON [dbo].[CheckImageRequest]
(
	[CheckAccountNumber] ASC,
	[CheckNumber] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [TrackingSequence]    Script Date: 1/4/2025 10:19:25 AM ******/
CREATE UNIQUE NONCLUSTERED INDEX [TrackingSequence] ON [dbo].[Flags]
(
	[TrackingNum] ASC,
	[Sequence] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [FileID]    Script Date: 1/4/2025 10:19:25 AM ******/
CREATE NONCLUSTERED INDEX [FileID] ON [dbo].[MemberNotices]
(
	[FileID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [idx_Account]    Script Date: 1/4/2025 10:19:25 AM ******/
CREATE NONCLUSTERED INDEX [idx_Account] ON [dbo].[MemberNotices]
(
	[Account] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 90, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [idx_NotificationType]    Script Date: 1/4/2025 10:19:25 AM ******/
CREATE NONCLUSTERED INDEX [idx_NotificationType] ON [dbo].[MemberNotices]
(
	[NotificationType] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [idx_notificationType_fileId]    Script Date: 1/4/2025 10:19:25 AM ******/
CREATE NONCLUSTERED INDEX [idx_notificationType_fileId] ON [dbo].[MemberNotices]
(
	[NotificationType] ASC,
	[FileID] ASC
)
INCLUDE([StartDate],[EndDate]) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [import_update_record]    Script Date: 1/4/2025 10:19:25 AM ******/
CREATE NONCLUSTERED INDEX [import_update_record] ON [dbo].[MemberNotices]
(
	[NotificationType] ASC,
	[Account] ASC,
	[StartDate] ASC,
	[SLType] ASC,
	[Suffix] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 90, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [ix_membernotices_fileId]    Script Date: 1/4/2025 10:19:25 AM ******/
CREATE NONCLUSTERED INDEX [ix_membernotices_fileId] ON [dbo].[MemberNotices]
(
	[FileID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [NotificationID_Account]    Script Date: 1/4/2025 10:19:25 AM ******/
CREATE NONCLUSTERED INDEX [NotificationID_Account] ON [dbo].[MemberNotices]
(
	[NotificationID] ASC,
	[Account] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [AccountSuffixNumber]    Script Date: 1/4/2025 10:19:25 AM ******/
CREATE UNIQUE NONCLUSTERED INDEX [AccountSuffixNumber] ON [dbo].[MemoFile]
(
	[Account] ASC,
	[Suffix] ASC,
	[MemoNumber] ASC,
	[MemoLevel] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [Account]    Script Date: 1/4/2025 10:19:25 AM ******/
CREATE NONCLUSTERED INDEX [Account] ON [dbo].[MSLFlags]
(
	[Account] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [FlagKey]    Script Date: 1/4/2025 10:19:25 AM ******/
CREATE UNIQUE NONCLUSTERED INDEX [FlagKey] ON [dbo].[MSLFlags]
(
	[Account] ASC,
	[Suffix] ASC,
	[FlagLevel] ASC,
	[FlagType] ASC,
	[FlagNumber] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [NotificationID]    Script Date: 1/4/2025 10:19:25 AM ******/
CREATE UNIQUE NONCLUSTERED INDEX [NotificationID] ON [dbo].[NextNotificationID]
(
	[NotificationID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [TrackingNum]    Script Date: 1/4/2025 10:19:25 AM ******/
CREATE UNIQUE NONCLUSTERED INDEX [TrackingNum] ON [dbo].[NextTrackingNum]
(
	[TrackingNum] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [FileId]    Script Date: 1/4/2025 10:19:25 AM ******/
CREATE UNIQUE NONCLUSTERED INDEX [FileId] ON [dbo].[NotificationFile]
(
	[FileID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [GroupFileID]    Script Date: 1/4/2025 10:19:25 AM ******/
CREATE NONCLUSTERED INDEX [GroupFileID] ON [dbo].[NotificationFile]
(
	[GroupFileID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [ix_notificationfile_fileId]    Script Date: 1/4/2025 10:19:25 AM ******/
CREATE NONCLUSTERED INDEX [ix_notificationfile_fileId] ON [dbo].[NotificationFile]
(
	[FileID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [Account_SLType_Suffix]    Script Date: 1/4/2025 10:19:25 AM ******/
CREATE NONCLUSTERED INDEX [Account_SLType_Suffix] ON [dbo].[tblImage]
(
	[Account] ASC,
	[SLType] ASC,
	[Suffix] ASC,
	[CheckNumber] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [Account_SLType_Suffix_CheckAmount]    Script Date: 1/4/2025 10:19:25 AM ******/
CREATE NONCLUSTERED INDEX [Account_SLType_Suffix_CheckAmount] ON [dbo].[tblImage]
(
	[Account] ASC,
	[SLType] ASC,
	[Suffix] ASC,
	[CheckAmount] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 90, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [Account_SLType_Suffix_CheckNumber_CheckAmount]    Script Date: 1/4/2025 10:19:25 AM ******/
CREATE NONCLUSTERED INDEX [Account_SLType_Suffix_CheckNumber_CheckAmount] ON [dbo].[tblImage]
(
	[Account] ASC,
	[SLType] ASC,
	[Suffix] ASC,
	[CheckNumber] ASC,
	[CheckAmount] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [xAccount]    Script Date: 1/4/2025 10:19:25 AM ******/
CREATE NONCLUSTERED INDEX [xAccount] ON [dbo].[tblImage]
(
	[Account] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [xFileID]    Script Date: 1/4/2025 10:19:25 AM ******/
CREATE NONCLUSTERED INDEX [xFileID] ON [dbo].[tblImage]
(
	[FileId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 90, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [xFileIndex]    Script Date: 1/4/2025 10:19:25 AM ******/
CREATE UNIQUE NONCLUSTERED INDEX [xFileIndex] ON [dbo].[tblImage]
(
	[IndexId] ASC,
	[FileId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 90, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [FileID]    Script Date: 1/4/2025 10:19:25 AM ******/
CREATE NONCLUSTERED INDEX [FileID] ON [dbo].[tblImageFile]
(
	[FileId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 90, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [xTrackingSeq]    Script Date: 1/4/2025 10:19:25 AM ******/
CREATE UNIQUE NONCLUSTERED INDEX [xTrackingSeq] ON [dbo].[udt_Beacon]
(
	[TrackingNum] ASC,
	[Sequence] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [xTrackingSeq]    Script Date: 1/4/2025 10:19:25 AM ******/
CREATE UNIQUE NONCLUSTERED INDEX [xTrackingSeq] ON [dbo].[udt_BeaconToAPR]
(
	[TrackingNum] ASC,
	[Sequence] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [xTrackingNum]    Script Date: 1/4/2025 10:19:25 AM ******/
CREATE UNIQUE NONCLUSTERED INDEX [xTrackingNum] ON [dbo].[udt_ManualApprovalAction]
(
	[TrackingNum] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [xTracking]    Script Date: 1/4/2025 10:19:25 AM ******/
CREATE UNIQUE NONCLUSTERED INDEX [xTracking] ON [dbo].[udt_mmch]
(
	[TrackingNum] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [xTrackingSeq]    Script Date: 1/4/2025 10:19:25 AM ******/
CREATE UNIQUE NONCLUSTERED INDEX [xTrackingSeq] ON [dbo].[udt_mmch_memo]
(
	[TrackingNum] ASC,
	[Sequence] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [xTranSeq]    Script Date: 1/4/2025 10:19:25 AM ******/
CREATE UNIQUE NONCLUSTERED INDEX [xTranSeq] ON [dbo].[UDTScripts]
(
	[TransactionType] ASC,
	[Sequence] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [xTranSeq]    Script Date: 1/4/2025 10:19:25 AM ******/
CREATE UNIQUE NONCLUSTERED INDEX [xTranSeq] ON [dbo].[UDTScripts_IMS7]
(
	[TransactionType] ASC,
	[Sequence] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [xTranSeq]    Script Date: 1/4/2025 10:19:25 AM ******/
CREATE UNIQUE NONCLUSTERED INDEX [xTranSeq] ON [dbo].[UDTScripts_IMS7_InternetLending]
(
	[TransactionType] ASC,
	[Sequence] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [Initials]    Script Date: 1/4/2025 10:19:25 AM ******/
CREATE UNIQUE NONCLUSTERED INDEX [Initials] ON [dbo].[UserTable]
(
	[Initials] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [ACC]    Script Date: 1/4/2025 10:19:25 AM ******/
CREATE NONCLUSTERED INDEX [ACC] ON [dbo].[ValidACC]
(
	[ACC] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [SDAACC]    Script Date: 1/4/2025 10:19:25 AM ******/
CREATE UNIQUE NONCLUSTERED INDEX [SDAACC] ON [dbo].[ValidACC]
(
	[DescAbrv] ASC,
	[ACC] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [TrackingSeq]    Script Date: 1/4/2025 10:19:25 AM ******/
CREATE UNIQUE NONCLUSTERED INDEX [TrackingSeq] ON [dbo].[WAPrereq]
(
	[WorkflowType] ASC,
	[ActionName] ASC,
	[Sequence] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [TrackingSeq]    Script Date: 1/4/2025 10:19:25 AM ******/
CREATE UNIQUE NONCLUSTERED INDEX [TrackingSeq] ON [dbo].[Workflow]
(
	[WorkflowType] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [TrackingSeq]    Script Date: 1/4/2025 10:19:25 AM ******/
CREATE UNIQUE NONCLUSTERED INDEX [TrackingSeq] ON [dbo].[WorkflowAction]
(
	[WorkflowType] ASC,
	[Sequence] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [internalaccess_teller]    Script Date: 1/4/2025 10:19:25 AM ******/
CREATE NONCLUSTERED INDEX [internalaccess_teller] ON [dbo].[x_internalaccess]
(
	[Teller] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 90, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [ind_TransactionName]    Script Date: 1/4/2025 10:19:25 AM ******/
CREATE NONCLUSTERED INDEX [ind_TransactionName] ON [ims].[LogReviewSetup]
(
	[TransactionName] DESC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [Account]    Script Date: 1/4/2025 10:19:25 AM ******/
CREATE NONCLUSTERED INDEX [Account] ON [ims].[MSLFlags]
(
	[Account] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [FlagKey]    Script Date: 1/4/2025 10:19:25 AM ******/
CREATE UNIQUE NONCLUSTERED INDEX [FlagKey] ON [ims].[MSLFlags]
(
	[Account] ASC,
	[Suffix] ASC,
	[FlagLevel] ASC,
	[FlagType] ASC,
	[FlagNumber] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [xTrackingSeq]    Script Date: 1/4/2025 10:19:25 AM ******/
CREATE UNIQUE NONCLUSTERED INDEX [xTrackingSeq] ON [ims].[NewMemberManualApproval]
(
	[TrackingNum] ASC,
	[Sequence] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [AdminUserAccess].[AdminUser] ADD  CONSTRAINT [DF_AdminUser_PasswordHash]  DEFAULT ('') FOR [PasswordHash]
GO
ALTER TABLE [AdminUserAccess].[AdminUser] ADD  CONSTRAINT [DF_AdminUser_PolicyId]  DEFAULT ('') FOR [PolicyId]
GO
ALTER TABLE [AdminUserAccess].[AdminUser] ADD  CONSTRAINT [DF_AdminUser_LoginFailures]  DEFAULT ((0)) FOR [LoginFailures]
GO
ALTER TABLE [AdminUserAccess].[AdminUser] ADD  CONSTRAINT [DF_AdminUser_Active]  DEFAULT ((1)) FOR [Active]
GO
ALTER TABLE [AdminUserAccess].[AdminUserDocumentTypeAccessArea] ADD  DEFAULT ((0)) FOR [CanView]
GO
ALTER TABLE [AdminUserAccess].[AdminUserDocumentTypeAccessArea] ADD  DEFAULT ((0)) FOR [CanUpdate]
GO
ALTER TABLE [AdminUserAccess].[AdminUserDocumentTypeAccessArea] ADD  DEFAULT ((0)) FOR [CanSendNotifications]
GO
ALTER TABLE [AdminUserAccess].[AdminUserDocumentTypeAccessArea] ADD  DEFAULT ((0)) FOR [CanReleaseToMembers]
GO
ALTER TABLE [AdminUserAccess].[AdminUserDocumentTypeAccessArea] ADD  CONSTRAINT [DF_AdminUserDocumentTypeAccessArea_CanReleaseToInternal]  DEFAULT ((0)) FOR [CanReleaseToInternal]
GO
ALTER TABLE [dbo].[DocumentTypes] ADD  CONSTRAINT [DF_DocumentTypes_SortOrder]  DEFAULT ((0)) FOR [SortOrder]
GO
ALTER TABLE [dbo].[DocumentTypes] ADD  CONSTRAINT [DF_DocumentTypes_IsCheckImageType]  DEFAULT ((0)) FOR [IsCheckImageType]
GO
ALTER TABLE [dbo].[NotificationFile] ADD  CONSTRAINT [DF_NotificationFile_Available]  DEFAULT ('Y') FOR [Available]
GO
ALTER TABLE [dbo].[SignatureDocumentContents] ADD  DEFAULT ((0)) FOR [Completed]
GO
ALTER TABLE [dbo].[tblImageFile] ADD  CONSTRAINT [DF_tblImageFile_Available]  DEFAULT ('Y') FOR [Available]
GO
ALTER TABLE [AdminUserAccess].[AdminUser]  WITH CHECK ADD  CONSTRAINT [FK_AdminUser_AdminUserGroup] FOREIGN KEY([AdminUserGroupId])
REFERENCES [AdminUserAccess].[AdminUserGroup] ([AdminUserGroupId])
GO
ALTER TABLE [AdminUserAccess].[AdminUser] CHECK CONSTRAINT [FK_AdminUser_AdminUserGroup]
GO
ALTER TABLE [AdminUserAccess].[AdminUserDocumentTypeAccessArea]  WITH CHECK ADD  CONSTRAINT [FK_AdminUserDocumentTypeAccessArea_AdminUserAccessArea] FOREIGN KEY([AdminUserAccessAreaId])
REFERENCES [AdminUserAccess].[AdminUserAccessArea] ([AdminUserAccessAreaId])
GO
ALTER TABLE [AdminUserAccess].[AdminUserDocumentTypeAccessArea] CHECK CONSTRAINT [FK_AdminUserDocumentTypeAccessArea_AdminUserAccessArea]
GO
ALTER TABLE [AdminUserAccess].[AdminUserDocumentTypeAccessArea]  WITH CHECK ADD  CONSTRAINT [FK_AdminUserDocumentTypeAccessArea_DocumentTypes] FOREIGN KEY([DocumentTypesId])
REFERENCES [dbo].[DocumentTypes] ([DocumentTypesID])
GO
ALTER TABLE [AdminUserAccess].[AdminUserDocumentTypeAccessArea] CHECK CONSTRAINT [FK_AdminUserDocumentTypeAccessArea_DocumentTypes]
GO
ALTER TABLE [AdminUserAccess].[AdminUserGroupAccessAreaLookup]  WITH CHECK ADD  CONSTRAINT [FK_AdminUserGroupAccessAreaLookup_AdminUserAccessAreaId] FOREIGN KEY([AdminUserAccessAreaId])
REFERENCES [AdminUserAccess].[AdminUserAccessArea] ([AdminUserAccessAreaId])
GO
ALTER TABLE [AdminUserAccess].[AdminUserGroupAccessAreaLookup] CHECK CONSTRAINT [FK_AdminUserGroupAccessAreaLookup_AdminUserAccessAreaId]
GO
ALTER TABLE [AdminUserAccess].[AdminUserGroupAccessAreaLookup]  WITH CHECK ADD  CONSTRAINT [FK_AdminUserGroupAccessAreaLookup_AdminUserGroup] FOREIGN KEY([AdminUserGroupId])
REFERENCES [AdminUserAccess].[AdminUserGroup] ([AdminUserGroupId])
GO
ALTER TABLE [AdminUserAccess].[AdminUserGroupAccessAreaLookup] CHECK CONSTRAINT [FK_AdminUserGroupAccessAreaLookup_AdminUserGroup]
GO
ALTER TABLE [dbo].[SecureFormTemplateContents]  WITH CHECK ADD  CONSTRAINT [FK_SecureFormTemplateContents_ToSecureFormTemplates] FOREIGN KEY([Id])
REFERENCES [dbo].[SecureFormTemplates] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[SecureFormTemplateContents] CHECK CONSTRAINT [FK_SecureFormTemplateContents_ToSecureFormTemplates]
GO
ALTER TABLE [dbo].[SecureFormTemplateFields]  WITH CHECK ADD  CONSTRAINT [FK_SecureFormTemplateFields_ToSecureFormTemplates] FOREIGN KEY([TemplateId])
REFERENCES [dbo].[SecureFormTemplates] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[SecureFormTemplateFields] CHECK CONSTRAINT [FK_SecureFormTemplateFields_ToSecureFormTemplates]
GO
ALTER TABLE [dbo].[SignatureDocumentContents]  WITH CHECK ADD  CONSTRAINT [FK_SignatureDocumentContent_ToSignatureDocuments] FOREIGN KEY([Id])
REFERENCES [dbo].[SignatureDocuments] ([Id])
GO
ALTER TABLE [dbo].[SignatureDocumentContents] CHECK CONSTRAINT [FK_SignatureDocumentContent_ToSignatureDocuments]
GO
ALTER TABLE [dbo].[tblImage]  WITH CHECK ADD  CONSTRAINT [FK_tblImage_tblImageFile] FOREIGN KEY([FileId])
REFERENCES [dbo].[tblImageFile] ([FileId])
GO
ALTER TABLE [dbo].[tblImage] CHECK CONSTRAINT [FK_tblImage_tblImageFile]
GO
/****** Object:  StoredProcedure [dbo].[ChangeAllObjectOwnersToDBO]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[ChangeAllObjectOwnersToDBO]
as
--set nocount on
-- Use this to change the owner of all objects in the database. It will skip system objects.
-- How to work it
-- 1.Replace all occurance of dbo with the name of the owner you want.
-- 2. The line   set @outStr = 'exec sp_changeobjectowner ''' + @userName + '.' + @objName + ''', ''dbo'''
--    will output the output window all sp_ChangeObjectOwner commands. 
-- 3. You can copy these to a file then run the file from query analyzer
-- 4. Or you can uncomment the line exec that executes the transactions
declare @uid int
declare @objName varchar(100)
declare @userName varchar(50)
declare @currObjName varchar(100)
declare @outStr varchar(256)
set @uid = user_id('dbo')
declare chObjOwnerCur cursor static
for
select user_name(uid) as 'username', [name] as 'name' from sysobjects where uid <> @uid
open chObjOwnerCur
if @@cursor_rows = 0
begin
  print 'All objects are already owned by dbo!'
  close chObjOwnerCur
  deallocate chObjOwnerCur
  return 1
end
fetch next from chObjOwnerCur into @userName, @objName
while @@fetch_status = 0
begin
  set @currObjName = @username + '.' + @objName
  if (object_id(@currObjName) > 0)
  BEGIN
		-- Print to the output window all commands to change owners
		If @objName <> 'ChangeAllObjectOwnersToDBO'
		begin
			print 'WARNING *** ' + @currObjName + ' already exists ***'
				set @outStr = 'exec sp_changeobjectowner ''' + @userName + '.' + @objName + ''', ''dbo'''
			print @outStr
			print 'go'
			-- Uncomment the next 2 lines if want to execute all commands to change owners, also change 'dbo to new owner name
			set @objName = @userName + '.' + @objName
			execute sp_changeobjectowner @objName, 'dbo'
		end
  END
  fetch next from chObjOwnerCur into @userName, @objName
end
close chObjOwnerCur
deallocate chObjOwnerCur
set nocount off
return 0
GO
/****** Object:  StoredProcedure [dbo].[dt_addtosourcecontrol]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
create proc [dbo].[dt_addtosourcecontrol]
    @vchSourceSafeINI varchar(255) = '',
    @vchProjectName   varchar(255) ='',
    @vchComment       varchar(255) ='',
    @vchLoginName     varchar(255) ='',
    @vchPassword      varchar(255) =''

as

set nocount on

declare @iReturn int
declare @iObjectId int
select @iObjectId = 0

declare @iStreamObjectId int
select @iStreamObjectId = 0

declare @VSSGUID varchar(100)
select @VSSGUID = 'SQLVersionControl.VCS_SQL'

declare @vchDatabaseName varchar(255)
select @vchDatabaseName = db_name()

declare @iReturnValue int
select @iReturnValue = 0

declare @iPropertyObjectId int
declare @vchParentId varchar(255)

declare @iObjectCount int
select @iObjectCount = 0

    exec @iReturn = master.dbo.sp_OACreate @VSSGUID, @iObjectId OUT
    if @iReturn <> 0 GOTO E_OAError


    /* Create Project in SS */
    exec @iReturn = master.dbo.sp_OAMethod @iObjectId,
											'AddProjectToSourceSafe',
											NULL,
											@vchSourceSafeINI,
											@vchProjectName output,
											@@SERVERNAME,
											@vchDatabaseName,
											@vchLoginName,
											@vchPassword,
											@vchComment


    if @iReturn <> 0 GOTO E_OAError

    /* Set Database Properties */

    begin tran SetProperties

    /* add high level object */

    exec @iPropertyObjectId = dbo.dt_adduserobject_vcs 'VCSProjectID'

    select @vchParentId = CONVERT(varchar(255),@iPropertyObjectId)

    exec dbo.dt_setpropertybyid @iPropertyObjectId, 'VCSProjectID', @vchParentId , NULL
    exec dbo.dt_setpropertybyid @iPropertyObjectId, 'VCSProject' , @vchProjectName , NULL
    exec dbo.dt_setpropertybyid @iPropertyObjectId, 'VCSSourceSafeINI' , @vchSourceSafeINI , NULL
    exec dbo.dt_setpropertybyid @iPropertyObjectId, 'VCSSQLServer', @@SERVERNAME, NULL
    exec dbo.dt_setpropertybyid @iPropertyObjectId, 'VCSSQLDatabase', @vchDatabaseName, NULL

    if @@error <> 0 GOTO E_General_Error

    commit tran SetProperties
    
    select @iObjectCount = 0;

CleanUp:
    select @vchProjectName
    select @iObjectCount
    return

E_General_Error:
    /* this is an all or nothing.  No specific error messages */
    goto CleanUp

E_OAError:
    exec dbo.dt_displayoaerror @iObjectId, @iReturn
    goto CleanUp


GO
/****** Object:  StoredProcedure [dbo].[dt_addtosourcecontrol_u]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
create proc [dbo].[dt_addtosourcecontrol_u]
    @vchSourceSafeINI nvarchar(255) = '',
    @vchProjectName   nvarchar(255) ='',
    @vchComment       nvarchar(255) ='',
    @vchLoginName     nvarchar(255) ='',
    @vchPassword      nvarchar(255) =''

as
	-- This procedure should no longer be called;  dt_addtosourcecontrol should be called instead.
	-- Calls are forwarded to dt_addtosourcecontrol to maintain backward compatibility
	set nocount on
	exec dbo.dt_addtosourcecontrol 
		@vchSourceSafeINI, 
		@vchProjectName, 
		@vchComment, 
		@vchLoginName, 
		@vchPassword


GO
/****** Object:  StoredProcedure [dbo].[dt_adduserobject]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
/*
**	Add an object to the dtproperties table
*/
create procedure [dbo].[dt_adduserobject]
as
	set nocount on
	/*
	** Create the user object if it does not exist already
	*/
	begin transaction
		insert dbo.dtproperties (property) VALUES ('DtgSchemaOBJECT')
		update dbo.dtproperties set objectid=@@identity 
			where id=@@identity and property='DtgSchemaOBJECT'
	commit
	return @@identity
GO
/****** Object:  StoredProcedure [dbo].[dt_adduserobject_vcs]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
create procedure [dbo].[dt_adduserobject_vcs]
    @vchProperty varchar(64)

as

set nocount on

declare @iReturn int
    /*
    ** Create the user object if it does not exist already
    */
    begin transaction
        select @iReturn = objectid from dbo.dtproperties where property = @vchProperty
        if @iReturn IS NULL
        begin
            insert dbo.dtproperties (property) VALUES (@vchProperty)
            update dbo.dtproperties set objectid=@@identity
                    where id=@@identity and property=@vchProperty
            select @iReturn = @@identity
        end
    commit
    return @iReturn


GO
/****** Object:  StoredProcedure [dbo].[dt_checkinobject]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
create proc [dbo].[dt_checkinobject]
    @chObjectType  char(4),
    @vchObjectName varchar(255),
    @vchComment    varchar(255)='',
    @vchLoginName  varchar(255),
    @vchPassword   varchar(255)='',
    @iVCSFlags     int = 0,
    @iActionFlag   int = 0,   /* 0 => AddFile, 1 => CheckIn */
    @txStream1     Text = '', /* drop stream   */ /* There is a bug that if items are NULL they do not pass to OLE servers */
    @txStream2     Text = '', /* create stream */
    @txStream3     Text = ''  /* grant stream  */


as

	set nocount on

	declare @iReturn int
	declare @iObjectId int
	select @iObjectId = 0
	declare @iStreamObjectId int

	declare @VSSGUID varchar(100)
	select @VSSGUID = 'SQLVersionControl.VCS_SQL'

	declare @iPropertyObjectId int
	select @iPropertyObjectId  = 0

    select @iPropertyObjectId = (select objectid from dbo.dtproperties where property = 'VCSProjectID')

    declare @vchProjectName   varchar(255)
    declare @vchSourceSafeINI varchar(255)
    declare @vchServerName    varchar(255)
    declare @vchDatabaseName  varchar(255)
    declare @iReturnValue	  int
    declare @pos			  int
    declare @vchProcLinePiece varchar(255)

    
    exec dbo.dt_getpropertiesbyid_vcs @iPropertyObjectId, 'VCSProject',       @vchProjectName   OUT
    exec dbo.dt_getpropertiesbyid_vcs @iPropertyObjectId, 'VCSSourceSafeINI', @vchSourceSafeINI OUT
    exec dbo.dt_getpropertiesbyid_vcs @iPropertyObjectId, 'VCSSQLServer',     @vchServerName    OUT
    exec dbo.dt_getpropertiesbyid_vcs @iPropertyObjectId, 'VCSSQLDatabase',   @vchDatabaseName  OUT

    if @chObjectType = 'PROC'
    begin
        if @iActionFlag = 1
        begin
            /* Procedure Can have up to three streams
            Drop Stream, Create Stream, GRANT stream */

            begin tran compile_all

            /* try to compile the streams */
            exec (@txStream1)
            if @@error <> 0 GOTO E_Compile_Fail

            exec (@txStream2)
            if @@error <> 0 GOTO E_Compile_Fail

            exec (@txStream3)
            if @@error <> 0 GOTO E_Compile_Fail
        end

        exec @iReturn = master.dbo.sp_OACreate @VSSGUID, @iObjectId OUT
        if @iReturn <> 0 GOTO E_OAError

        exec @iReturn = master.dbo.sp_OAGetProperty @iObjectId, 'GetStreamObject', @iStreamObjectId OUT
        if @iReturn <> 0 GOTO E_OAError
        
        if @iActionFlag = 1
        begin
            
            declare @iStreamLength int
			
			select @pos=1
			select @iStreamLength = datalength(@txStream2)
			
			if @iStreamLength > 0
			begin
			
				while @pos < @iStreamLength
				begin
						
					select @vchProcLinePiece = substring(@txStream2, @pos, 255)
					
					exec @iReturn = master.dbo.sp_OAMethod @iStreamObjectId, 'AddStream', @iReturnValue OUT, @vchProcLinePiece
            		if @iReturn <> 0 GOTO E_OAError
            		
					select @pos = @pos + 255
					
				end
            
				exec @iReturn = master.dbo.sp_OAMethod @iObjectId,
														'CheckIn_StoredProcedure',
														NULL,
														@sProjectName = @vchProjectName,
														@sSourceSafeINI = @vchSourceSafeINI,
														@sServerName = @vchServerName,
														@sDatabaseName = @vchDatabaseName,
														@sObjectName = @vchObjectName,
														@sComment = @vchComment,
														@sLoginName = @vchLoginName,
														@sPassword = @vchPassword,
														@iVCSFlags = @iVCSFlags,
														@iActionFlag = @iActionFlag,
														@sStream = ''
                                        
			end
        end
        else
        begin
        
            select colid, text into #ProcLines
            from syscomments
            where id = object_id(@vchObjectName)
            order by colid

            declare @iCurProcLine int
            declare @iProcLines int
            select @iCurProcLine = 1
            select @iProcLines = (select count(*) from #ProcLines)
            while @iCurProcLine <= @iProcLines
            begin
                select @pos = 1
                declare @iCurLineSize int
                select @iCurLineSize = len((select text from #ProcLines where colid = @iCurProcLine))
                while @pos <= @iCurLineSize
                begin                
                    select @vchProcLinePiece = convert(varchar(255),
                        substring((select text from #ProcLines where colid = @iCurProcLine),
                                  @pos, 255 ))
                    exec @iReturn = master.dbo.sp_OAMethod @iStreamObjectId, 'AddStream', @iReturnValue OUT, @vchProcLinePiece
                    if @iReturn <> 0 GOTO E_OAError
                    select @pos = @pos + 255                  
                end
                select @iCurProcLine = @iCurProcLine + 1
            end
            drop table #ProcLines

            exec @iReturn = master.dbo.sp_OAMethod @iObjectId,
													'CheckIn_StoredProcedure',
													NULL,
													@sProjectName = @vchProjectName,
													@sSourceSafeINI = @vchSourceSafeINI,
													@sServerName = @vchServerName,
													@sDatabaseName = @vchDatabaseName,
													@sObjectName = @vchObjectName,
													@sComment = @vchComment,
													@sLoginName = @vchLoginName,
													@sPassword = @vchPassword,
													@iVCSFlags = @iVCSFlags,
													@iActionFlag = @iActionFlag,
													@sStream = ''
        end

        if @iReturn <> 0 GOTO E_OAError

        if @iActionFlag = 1
        begin
            commit tran compile_all
            if @@error <> 0 GOTO E_Compile_Fail
        end

    end

CleanUp:
	return

E_Compile_Fail:
	declare @lerror int
	select @lerror = @@error
	rollback tran compile_all
	RAISERROR (@lerror,16,-1)
	goto CleanUp

E_OAError:
	if @iActionFlag = 1 rollback tran compile_all
	exec dbo.dt_displayoaerror @iObjectId, @iReturn
	goto CleanUp


GO
/****** Object:  StoredProcedure [dbo].[dt_checkinobject_u]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
create proc [dbo].[dt_checkinobject_u]
    @chObjectType  char(4),
    @vchObjectName nvarchar(255),
    @vchComment    nvarchar(255)='',
    @vchLoginName  nvarchar(255),
    @vchPassword   nvarchar(255)='',
    @iVCSFlags     int = 0,
    @iActionFlag   int = 0,   /* 0 => AddFile, 1 => CheckIn */
    @txStream1     text = '',  /* drop stream   */ /* There is a bug that if items are NULL they do not pass to OLE servers */
    @txStream2     text = '',  /* create stream */
    @txStream3     text = ''   /* grant stream  */

as	
	-- This procedure should no longer be called;  dt_checkinobject should be called instead.
	-- Calls are forwarded to dt_checkinobject to maintain backward compatibility.
	set nocount on
	exec dbo.dt_checkinobject
		@chObjectType,
		@vchObjectName,
		@vchComment,
		@vchLoginName,
		@vchPassword,
		@iVCSFlags,
		@iActionFlag,   
		@txStream1,		
		@txStream2,		
		@txStream3		


GO
/****** Object:  StoredProcedure [dbo].[dt_checkoutobject]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
create proc [dbo].[dt_checkoutobject]
    @chObjectType  char(4),
    @vchObjectName varchar(255),
    @vchComment    varchar(255),
    @vchLoginName  varchar(255),
    @vchPassword   varchar(255),
    @iVCSFlags     int = 0,
    @iActionFlag   int = 0/* 0 => Checkout, 1 => GetLatest, 2 => UndoCheckOut */

as

	set nocount on

	declare @iReturn int
	declare @iObjectId int
	select @iObjectId =0

	declare @VSSGUID varchar(100)
	select @VSSGUID = 'SQLVersionControl.VCS_SQL'

	declare @iReturnValue int
	select @iReturnValue = 0

	declare @vchTempText varchar(255)

	/* this is for our strings */
	declare @iStreamObjectId int
	select @iStreamObjectId = 0

    declare @iPropertyObjectId int
    select @iPropertyObjectId = (select objectid from dbo.dtproperties where property = 'VCSProjectID')

    declare @vchProjectName   varchar(255)
    declare @vchSourceSafeINI varchar(255)
    declare @vchServerName    varchar(255)
    declare @vchDatabaseName  varchar(255)
    exec dbo.dt_getpropertiesbyid_vcs @iPropertyObjectId, 'VCSProject',       @vchProjectName   OUT
    exec dbo.dt_getpropertiesbyid_vcs @iPropertyObjectId, 'VCSSourceSafeINI', @vchSourceSafeINI OUT
    exec dbo.dt_getpropertiesbyid_vcs @iPropertyObjectId, 'VCSSQLServer',     @vchServerName    OUT
    exec dbo.dt_getpropertiesbyid_vcs @iPropertyObjectId, 'VCSSQLDatabase',   @vchDatabaseName  OUT

    if @chObjectType = 'PROC'
    begin
        /* Procedure Can have up to three streams
           Drop Stream, Create Stream, GRANT stream */

        exec @iReturn = master.dbo.sp_OACreate @VSSGUID, @iObjectId OUT

        if @iReturn <> 0 GOTO E_OAError

        exec @iReturn = master.dbo.sp_OAMethod @iObjectId,
												'CheckOut_StoredProcedure',
												NULL,
												@sProjectName = @vchProjectName,
												@sSourceSafeINI = @vchSourceSafeINI,
												@sObjectName = @vchObjectName,
												@sServerName = @vchServerName,
												@sDatabaseName = @vchDatabaseName,
												@sComment = @vchComment,
												@sLoginName = @vchLoginName,
												@sPassword = @vchPassword,
												@iVCSFlags = @iVCSFlags,
												@iActionFlag = @iActionFlag

        if @iReturn <> 0 GOTO E_OAError


        exec @iReturn = master.dbo.sp_OAGetProperty @iObjectId, 'GetStreamObject', @iStreamObjectId OUT

        if @iReturn <> 0 GOTO E_OAError

        create table #commenttext (id int identity, sourcecode varchar(255))


        select @vchTempText = 'STUB'
        while @vchTempText is not null
        begin
            exec @iReturn = master.dbo.sp_OAMethod @iStreamObjectId, 'GetStream', @iReturnValue OUT, @vchTempText OUT
            if @iReturn <> 0 GOTO E_OAError
            
            if (@vchTempText = '') set @vchTempText = null
            if (@vchTempText is not null) insert into #commenttext (sourcecode) select @vchTempText
        end

        select 'VCS'=sourcecode from #commenttext order by id
        select 'SQL'=text from syscomments where id = object_id(@vchObjectName) order by colid

    end

CleanUp:
    return

E_OAError:
    exec dbo.dt_displayoaerror @iObjectId, @iReturn
    GOTO CleanUp


GO
/****** Object:  StoredProcedure [dbo].[dt_checkoutobject_u]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
create proc [dbo].[dt_checkoutobject_u]
    @chObjectType  char(4),
    @vchObjectName nvarchar(255),
    @vchComment    nvarchar(255),
    @vchLoginName  nvarchar(255),
    @vchPassword   nvarchar(255),
    @iVCSFlags     int = 0,
    @iActionFlag   int = 0/* 0 => Checkout, 1 => GetLatest, 2 => UndoCheckOut */

as

	-- This procedure should no longer be called;  dt_checkoutobject should be called instead.
	-- Calls are forwarded to dt_checkoutobject to maintain backward compatibility.
	set nocount on
	exec dbo.dt_checkoutobject
		@chObjectType,  
		@vchObjectName, 
		@vchComment,    
		@vchLoginName,  
		@vchPassword,  
		@iVCSFlags,    
		@iActionFlag 


GO
/****** Object:  StoredProcedure [dbo].[dt_displayoaerror]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE PROCEDURE [dbo].[dt_displayoaerror]
    @iObject int,
    @iresult int
as

set nocount on

declare @vchOutput      varchar(255)
declare @hr             int
declare @vchSource      varchar(255)
declare @vchDescription varchar(255)

    exec @hr = master.dbo.sp_OAGetErrorInfo @iObject, @vchSource OUT, @vchDescription OUT

    select @vchOutput = @vchSource + ': ' + @vchDescription
    raiserror (@vchOutput,16,-1)

    return

GO
/****** Object:  StoredProcedure [dbo].[dt_displayoaerror_u]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE PROCEDURE [dbo].[dt_displayoaerror_u]
    @iObject int,
    @iresult int
as
	-- This procedure should no longer be called;  dt_displayoaerror should be called instead.
	-- Calls are forwarded to dt_displayoaerror to maintain backward compatibility.
	set nocount on
	exec dbo.dt_displayoaerror
		@iObject,
		@iresult


GO
/****** Object:  StoredProcedure [dbo].[dt_droppropertiesbyid]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
/*
**	Drop one or all the associated properties of an object or an attribute 
**
**	dt_dropproperties objid, null or '' -- drop all properties of the object itself
**	dt_dropproperties objid, property -- drop the property
*/
create procedure [dbo].[dt_droppropertiesbyid]
	@id int,
	@property varchar(64)
as
	set nocount on

	if (@property is null) or (@property = '')
		delete from dbo.dtproperties where objectid=@id
	else
		delete from dbo.dtproperties 
			where objectid=@id and property=@property

GO
/****** Object:  StoredProcedure [dbo].[dt_dropuserobjectbyid]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
/*
**	Drop an object from the dbo.dtproperties table
*/
create procedure [dbo].[dt_dropuserobjectbyid]
	@id int
as
	set nocount on
	delete from dbo.dtproperties where objectid=@id
GO
/****** Object:  StoredProcedure [dbo].[dt_generateansiname]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
/* 
**	Generate an ansi name that is unique in the dtproperties.value column 
*/ 
create procedure [dbo].[dt_generateansiname](@name varchar(255) output) 
as 
	declare @prologue varchar(20) 
	declare @indexstring varchar(20) 
	declare @index integer 
 
	set @prologue = 'MSDT-A-' 
	set @index = 1 
 
	while 1 = 1 
	begin 
		set @indexstring = cast(@index as varchar(20)) 
		set @name = @prologue + @indexstring 
		if not exists (select value from dtproperties where value = @name) 
			break 
		 
		set @index = @index + 1 
 
		if (@index = 10000) 
			goto TooMany 
	end 
 
Leave: 
 
	return 
 
TooMany: 
 
	set @name = 'DIAGRAM' 
	goto Leave 
GO
/****** Object:  StoredProcedure [dbo].[dt_getobjwithprop]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
/*
**	Retrieve the owner object(s) of a given property
*/
create procedure [dbo].[dt_getobjwithprop]
	@property varchar(30),
	@value varchar(255)
as
	set nocount on

	if (@property is null) or (@property = '')
	begin
		raiserror('Must specify a property name.',-1,-1)
		return (1)
	end

	if (@value is null)
		select objectid id from dbo.dtproperties
			where property=@property

	else
		select objectid id from dbo.dtproperties
			where property=@property and value=@value
GO
/****** Object:  StoredProcedure [dbo].[dt_getobjwithprop_u]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
/*
**	Retrieve the owner object(s) of a given property
*/
create procedure [dbo].[dt_getobjwithprop_u]
	@property varchar(30),
	@uvalue nvarchar(255)
as
	set nocount on

	if (@property is null) or (@property = '')
	begin
		raiserror('Must specify a property name.',-1,-1)
		return (1)
	end

	if (@uvalue is null)
		select objectid id from dbo.dtproperties
			where property=@property

	else
		select objectid id from dbo.dtproperties
			where property=@property and uvalue=@uvalue
GO
/****** Object:  StoredProcedure [dbo].[dt_getpropertiesbyid]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
/*
**	Retrieve properties by id's
**
**	dt_getproperties objid, null or '' -- retrieve all properties of the object itself
**	dt_getproperties objid, property -- retrieve the property specified
*/
create procedure [dbo].[dt_getpropertiesbyid]
	@id int,
	@property varchar(64)
as
	set nocount on

	if (@property is null) or (@property = '')
		select property, version, value, lvalue
			from dbo.dtproperties
			where  @id=objectid
	else
		select property, version, value, lvalue
			from dbo.dtproperties
			where  @id=objectid and @property=property
GO
/****** Object:  StoredProcedure [dbo].[dt_getpropertiesbyid_u]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
/*
**	Retrieve properties by id's
**
**	dt_getproperties objid, null or '' -- retrieve all properties of the object itself
**	dt_getproperties objid, property -- retrieve the property specified
*/
create procedure [dbo].[dt_getpropertiesbyid_u]
	@id int,
	@property varchar(64)
as
	set nocount on

	if (@property is null) or (@property = '')
		select property, version, uvalue, lvalue
			from dbo.dtproperties
			where  @id=objectid
	else
		select property, version, uvalue, lvalue
			from dbo.dtproperties
			where  @id=objectid and @property=property
GO
/****** Object:  StoredProcedure [dbo].[dt_getpropertiesbyid_vcs]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
create procedure [dbo].[dt_getpropertiesbyid_vcs]
    @id       int,
    @property varchar(64),
    @value    varchar(255) = NULL OUT

as

    set nocount on

    select @value = (
        select value
                from dbo.dtproperties
                where @id=objectid and @property=property
                )

GO
/****** Object:  StoredProcedure [dbo].[dt_getpropertiesbyid_vcs_u]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
create procedure [dbo].[dt_getpropertiesbyid_vcs_u]
    @id       int,
    @property varchar(64),
    @value    nvarchar(255) = NULL OUT

as

    -- This procedure should no longer be called;  dt_getpropertiesbyid_vcsshould be called instead.
	-- Calls are forwarded to dt_getpropertiesbyid_vcs to maintain backward compatibility.
	set nocount on
    exec dbo.dt_getpropertiesbyid_vcs
		@id,
		@property,
		@value output

GO
/****** Object:  StoredProcedure [dbo].[dt_isundersourcecontrol]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
create proc [dbo].[dt_isundersourcecontrol]
    @vchLoginName varchar(255) = '',
    @vchPassword  varchar(255) = '',
    @iWhoToo      int = 0 /* 0 => Just check project; 1 => get list of objs */

as

	set nocount on

	declare @iReturn int
	declare @iObjectId int
	select @iObjectId = 0

	declare @VSSGUID varchar(100)
	select @VSSGUID = 'SQLVersionControl.VCS_SQL'

	declare @iReturnValue int
	select @iReturnValue = 0

	declare @iStreamObjectId int
	select @iStreamObjectId   = 0

	declare @vchTempText varchar(255)

    declare @iPropertyObjectId int
    select @iPropertyObjectId = (select objectid from dbo.dtproperties where property = 'VCSProjectID')

    declare @vchProjectName   varchar(255)
    declare @vchSourceSafeINI varchar(255)
    declare @vchServerName    varchar(255)
    declare @vchDatabaseName  varchar(255)
    exec dbo.dt_getpropertiesbyid_vcs @iPropertyObjectId, 'VCSProject',       @vchProjectName   OUT
    exec dbo.dt_getpropertiesbyid_vcs @iPropertyObjectId, 'VCSSourceSafeINI', @vchSourceSafeINI OUT
    exec dbo.dt_getpropertiesbyid_vcs @iPropertyObjectId, 'VCSSQLServer',     @vchServerName    OUT
    exec dbo.dt_getpropertiesbyid_vcs @iPropertyObjectId, 'VCSSQLDatabase',   @vchDatabaseName  OUT

    if (@vchProjectName = '')	set @vchProjectName		= null
    if (@vchSourceSafeINI = '') set @vchSourceSafeINI	= null
    if (@vchServerName = '')	set @vchServerName		= null
    if (@vchDatabaseName = '')	set @vchDatabaseName	= null
    
    if (@vchProjectName is null) or (@vchSourceSafeINI is null) or (@vchServerName is null) or (@vchDatabaseName is null)
    begin
        RAISERROR('Not Under Source Control',16,-1)
        return
    end

    if @iWhoToo = 1
    begin

        /* Get List of Procs in the project */
        exec @iReturn = master.dbo.sp_OACreate @VSSGUID, @iObjectId OUT
        if @iReturn <> 0 GOTO E_OAError

        exec @iReturn = master.dbo.sp_OAMethod @iObjectId,
												'GetListOfObjects',
												NULL,
												@vchProjectName,
												@vchSourceSafeINI,
												@vchServerName,
												@vchDatabaseName,
												@vchLoginName,
												@vchPassword

        if @iReturn <> 0 GOTO E_OAError

        exec @iReturn = master.dbo.sp_OAGetProperty @iObjectId, 'GetStreamObject', @iStreamObjectId OUT

        if @iReturn <> 0 GOTO E_OAError

        create table #ObjectList (id int identity, vchObjectlist varchar(255))

        select @vchTempText = 'STUB'
        while @vchTempText is not null
        begin
            exec @iReturn = master.dbo.sp_OAMethod @iStreamObjectId, 'GetStream', @iReturnValue OUT, @vchTempText OUT
            if @iReturn <> 0 GOTO E_OAError
            
            if (@vchTempText = '') set @vchTempText = null
            if (@vchTempText is not null) insert into #ObjectList (vchObjectlist ) select @vchTempText
        end

        select vchObjectlist from #ObjectList order by id
    end

CleanUp:
    return

E_OAError:
    exec dbo.dt_displayoaerror @iObjectId, @iReturn
    goto CleanUp


GO
/****** Object:  StoredProcedure [dbo].[dt_isundersourcecontrol_u]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
create proc [dbo].[dt_isundersourcecontrol_u]
    @vchLoginName nvarchar(255) = '',
    @vchPassword  nvarchar(255) = '',
    @iWhoToo      int = 0 /* 0 => Just check project; 1 => get list of objs */

as
	-- This procedure should no longer be called;  dt_isundersourcecontrol should be called instead.
	-- Calls are forwarded to dt_isundersourcecontrol to maintain backward compatibility.
	set nocount on
	exec dbo.dt_isundersourcecontrol
		@vchLoginName,
		@vchPassword,
		@iWhoToo 


GO
/****** Object:  StoredProcedure [dbo].[dt_removefromsourcecontrol]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
create procedure [dbo].[dt_removefromsourcecontrol]

as

    set nocount on

    declare @iPropertyObjectId int
    select @iPropertyObjectId = (select objectid from dbo.dtproperties where property = 'VCSProjectID')

    exec dbo.dt_droppropertiesbyid @iPropertyObjectId, null

    /* -1 is returned by dt_droppopertiesbyid */
    if @@error <> 0 and @@error <> -1 return 1

    return 0


GO
/****** Object:  StoredProcedure [dbo].[dt_setpropertybyid]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
/*
**	If the property already exists, reset the value; otherwise add property
**		id -- the id in sysobjects of the object
**		property -- the name of the property
**		value -- the text value of the property
**		lvalue -- the binary value of the property (image)
*/
create procedure [dbo].[dt_setpropertybyid]
	@id int,
	@property varchar(64),
	@value varchar(255),
	@lvalue image
as
	set nocount on
	declare @uvalue nvarchar(255) 
	set @uvalue = convert(nvarchar(255), @value) 
	if exists (select * from dbo.dtproperties 
			where objectid=@id and property=@property)
	begin
		--
		-- bump the version count for this row as we update it
		--
		update dbo.dtproperties set value=@value, uvalue=@uvalue, lvalue=@lvalue, version=version+1
			where objectid=@id and property=@property
	end
	else
	begin
		--
		-- version count is auto-set to 0 on initial insert
		--
		insert dbo.dtproperties (property, objectid, value, uvalue, lvalue)
			values (@property, @id, @value, @uvalue, @lvalue)
	end

GO
/****** Object:  StoredProcedure [dbo].[dt_setpropertybyid_u]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
/*
**	If the property already exists, reset the value; otherwise add property
**		id -- the id in sysobjects of the object
**		property -- the name of the property
**		uvalue -- the text value of the property
**		lvalue -- the binary value of the property (image)
*/
create procedure [dbo].[dt_setpropertybyid_u]
	@id int,
	@property varchar(64),
	@uvalue nvarchar(255),
	@lvalue image
as
	set nocount on
	-- 
	-- If we are writing the name property, find the ansi equivalent. 
	-- If there is no lossless translation, generate an ansi name. 
	-- 
	declare @avalue varchar(255) 
	set @avalue = null 
	if (@uvalue is not null) 
	begin 
		if (convert(nvarchar(255), convert(varchar(255), @uvalue)) = @uvalue) 
		begin 
			set @avalue = convert(varchar(255), @uvalue) 
		end 
		else 
		begin 
			if 'DtgSchemaNAME' = @property 
			begin 
				exec dbo.dt_generateansiname @avalue output 
			end 
		end 
	end 
	if exists (select * from dbo.dtproperties 
			where objectid=@id and property=@property)
	begin
		--
		-- bump the version count for this row as we update it
		--
		update dbo.dtproperties set value=@avalue, uvalue=@uvalue, lvalue=@lvalue, version=version+1
			where objectid=@id and property=@property
	end
	else
	begin
		--
		-- version count is auto-set to 0 on initial insert
		--
		insert dbo.dtproperties (property, objectid, value, uvalue, lvalue)
			values (@property, @id, @avalue, @uvalue, @lvalue)
	end
GO
/****** Object:  StoredProcedure [dbo].[dt_validateloginparams]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
create proc [dbo].[dt_validateloginparams]
    @vchLoginName  varchar(255),
    @vchPassword   varchar(255)
as

set nocount on

declare @iReturn int
declare @iObjectId int
select @iObjectId =0

declare @VSSGUID varchar(100)
select @VSSGUID = 'SQLVersionControl.VCS_SQL'

    declare @iPropertyObjectId int
    select @iPropertyObjectId = (select objectid from dbo.dtproperties where property = 'VCSProjectID')

    declare @vchSourceSafeINI varchar(255)
    exec dbo.dt_getpropertiesbyid_vcs @iPropertyObjectId, 'VCSSourceSafeINI', @vchSourceSafeINI OUT

    exec @iReturn = master.dbo.sp_OACreate @VSSGUID, @iObjectId OUT
    if @iReturn <> 0 GOTO E_OAError

    exec @iReturn = master.dbo.sp_OAMethod @iObjectId,
											'ValidateLoginParams',
											NULL,
											@sSourceSafeINI = @vchSourceSafeINI,
											@sLoginName = @vchLoginName,
											@sPassword = @vchPassword
    if @iReturn <> 0 GOTO E_OAError

CleanUp:
    return

E_OAError:
    exec dbo.dt_displayoaerror @iObjectId, @iReturn
    GOTO CleanUp


GO
/****** Object:  StoredProcedure [dbo].[dt_validateloginparams_u]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
create proc [dbo].[dt_validateloginparams_u]
    @vchLoginName  nvarchar(255),
    @vchPassword   nvarchar(255)
as

	-- This procedure should no longer be called;  dt_validateloginparams should be called instead.
	-- Calls are forwarded to dt_validateloginparams to maintain backward compatibility.
	set nocount on
	exec dbo.dt_validateloginparams
		@vchLoginName,
		@vchPassword 


GO
/****** Object:  StoredProcedure [dbo].[dt_vcsenabled]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
create proc [dbo].[dt_vcsenabled]

as

set nocount on

declare @iObjectId int
select @iObjectId = 0

declare @VSSGUID varchar(100)
select @VSSGUID = 'SQLVersionControl.VCS_SQL'

    declare @iReturn int
    exec @iReturn = master.dbo.sp_OACreate @VSSGUID, @iObjectId OUT
    if @iReturn <> 0 raiserror('', 16, -1) /* Can't Load Helper DLLC */


GO
/****** Object:  StoredProcedure [dbo].[dt_verstamp006]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
/*
**	This procedure returns the version number of the stored
**    procedures used by legacy versions of the Microsoft
**	Visual Database Tools.  Version is 7.0.00.
*/
create procedure [dbo].[dt_verstamp006]
as
	select 7000
GO
/****** Object:  StoredProcedure [dbo].[dt_verstamp007]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
/*
**	This procedure returns the version number of the stored
**    procedures used by the the Microsoft Visual Database Tools.
**	Version is 7.0.05.
*/
create procedure [dbo].[dt_verstamp007]
as
	select 7005
GO
/****** Object:  StoredProcedure [dbo].[dt_whocheckedout]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
create proc [dbo].[dt_whocheckedout]
        @chObjectType  char(4),
        @vchObjectName varchar(255),
        @vchLoginName  varchar(255),
        @vchPassword   varchar(255)

as

set nocount on

declare @iReturn int
declare @iObjectId int
select @iObjectId =0

declare @VSSGUID varchar(100)
select @VSSGUID = 'SQLVersionControl.VCS_SQL'

    declare @iPropertyObjectId int

    select @iPropertyObjectId = (select objectid from dbo.dtproperties where property = 'VCSProjectID')

    declare @vchProjectName   varchar(255)
    declare @vchSourceSafeINI varchar(255)
    declare @vchServerName    varchar(255)
    declare @vchDatabaseName  varchar(255)
    exec dbo.dt_getpropertiesbyid_vcs @iPropertyObjectId, 'VCSProject',       @vchProjectName   OUT
    exec dbo.dt_getpropertiesbyid_vcs @iPropertyObjectId, 'VCSSourceSafeINI', @vchSourceSafeINI OUT
    exec dbo.dt_getpropertiesbyid_vcs @iPropertyObjectId, 'VCSSQLServer',     @vchServerName    OUT
    exec dbo.dt_getpropertiesbyid_vcs @iPropertyObjectId, 'VCSSQLDatabase',   @vchDatabaseName  OUT

    if @chObjectType = 'PROC'
    begin
        exec @iReturn = master.dbo.sp_OACreate @VSSGUID, @iObjectId OUT

        if @iReturn <> 0 GOTO E_OAError

        declare @vchReturnValue varchar(255)
        select @vchReturnValue = ''

        exec @iReturn = master.dbo.sp_OAMethod @iObjectId,
												'WhoCheckedOut',
												@vchReturnValue OUT,
												@sProjectName = @vchProjectName,
												@sSourceSafeINI = @vchSourceSafeINI,
												@sObjectName = @vchObjectName,
												@sServerName = @vchServerName,
												@sDatabaseName = @vchDatabaseName,
												@sLoginName = @vchLoginName,
												@sPassword = @vchPassword

        if @iReturn <> 0 GOTO E_OAError

        select @vchReturnValue

    end

CleanUp:
    return

E_OAError:
    exec dbo.dt_displayoaerror @iObjectId, @iReturn
    GOTO CleanUp


GO
/****** Object:  StoredProcedure [dbo].[dt_whocheckedout_u]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
create proc [dbo].[dt_whocheckedout_u]
        @chObjectType  char(4),
        @vchObjectName nvarchar(255),
        @vchLoginName  nvarchar(255),
        @vchPassword   nvarchar(255)

as

	-- This procedure should no longer be called;  dt_whocheckedout should be called instead.
	-- Calls are forwarded to dt_whocheckedout to maintain backward compatibility.
	set nocount on
	exec dbo.dt_whocheckedout
		@chObjectType, 
		@vchObjectName,
		@vchLoginName, 
		@vchPassword  


GO
/****** Object:  StoredProcedure [dbo].[purgeMemberData]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[purgeMemberData] 
AS 

DECLARE @UID1 as Integer
DECLARE @UID2 as Integer

SET @UID1 = 18893
SET @UID2 = 18893

IF EXISTS (SELECT * FROM Sysobjects where name = 'x_PWD' and xtype = 'U')
	DELETE x_PWD where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'CheckLog' and xtype = 'U')
	DELETE CheckLog where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'CRCH' and xtype = 'U')
	DELETE CRCH where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'CRCHPledges' and xtype = 'U')
	DELETE CRCHPledges where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'Flags' and xtype = 'U')
	DELETE Flags where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'HBAcctAlias' and xtype = 'U')
	DELETE HBAcctAlias where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'HBUsers' and xtype = 'U')
	DELETE HBUsers where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'IAMigration' and xtype = 'U')
	DELETE IAMigration where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'IAUniqueID' and xtype = 'U')
	DELETE IAUniqueID where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'LOCH' and xtype = 'U')
	DELETE LOCH where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'MECH' and xtype = 'U')
	DELETE MECH where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'MECHHome' and xtype = 'U')
	DELETE MECHHome where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'MECHWork' and xtype = 'U')
	DELETE MECHWork where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'MemberChange' and xtype = 'U')
	DELETE MemberChange where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'MemberCrossAccounts' and xtype = 'U')
	DELETE MemberCrossAccounts where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'MemberFile' and xtype = 'U')
	DELETE MemberFile where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'MemberHome' and xtype = 'U')
	DELETE MemberHome where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'MemberNotices' and xtype = 'U')
	DELETE MemberNotices where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'MemberWork' and xtype = 'U')
	DELETE MemberWork where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'MemoFile' and xtype = 'U')
	DELETE MemoFile where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'Message' and xtype = 'U')
	DELETE Message where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'MFAChallengeStatus' and xtype = 'U')
	DELETE MFAChallengeStatus where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'MFAHistory' and xtype = 'U')
	DELETE MFAHistory where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'MFAUser' and xtype = 'U')
	DELETE MFAUser where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'MFAUserDevices' and xtype = 'U')
	DELETE MFAUserDevices where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'MFAUserScoreCard' and xtype = 'U')
	DELETE MFAUserScoreCard where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'MORT' and xtype = 'U')
	DELETE MORT where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'MSLFlags' and xtype = 'U')
	DELETE MSLFlags where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'MSLMemos' and xtype = 'U')
	DELETE MSLMemos where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'MtvnteBillPayers' and xtype = 'U')
	DELETE MtvnteBillPayers where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'OfflineCardAdvance' and xtype = 'U')
	DELETE OfflineCardAdvance where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'OfflineCardPayment' and xtype = 'U')
	DELETE OfflineCardPayment where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'OfflineCards' and xtype = 'U')
	DELETE OfflineCards where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'PDFStatements' and xtype = 'U')
	DELETE PDFStatements where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'PINChange' and xtype = 'U')
	DELETE PINChange where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'PlasticCards' and xtype = 'U')
	DELETE PlasticCards where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'PlasticCardSuffix' and xtype = 'U')
	DELETE PlasticCardSuffix where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'PromoCache' and xtype = 'U')
	DELETE PromoCache where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'PromoCountForUser' and xtype = 'U')
	DELETE PromoCountForUser where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'PromoLastViewed' and xtype = 'U')
	DELETE PromoLastViewed where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'PromoSkipAPayUsers' and xtype = 'U')
	DELETE PromoSkipAPayUsers where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'RecentAccountAlias' and xtype = 'U')
	DELETE RecentAccountAlias where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'RefMon' and xtype = 'U')
	DELETE RefMon where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'Results' and xtype = 'U')
	DELETE Results where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'ScheduledTransfer' and xtype = 'U')
	DELETE ScheduledTransfer where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'ScheduledTransferCC' and xtype = 'U')
	DELETE ScheduledTransferCC where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'ScheduledTransferFailed' and xtype = 'U')
	DELETE ScheduledTransferFailed where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'ScheduledTransferHistory' and xtype = 'U')
	DELETE ScheduledTransferHistory where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'ScheduledTransferInsufficientFunds' and xtype = 'U')
	DELETE ScheduledTransferInsufficientFunds where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'ScheduledTransferRegular' and xtype = 'U')
	DELETE ScheduledTransferRegular where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'ShareFile' and xtype = 'U')
	DELETE ShareFile where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'SecureMailThread' and xtype = 'U')
	DELETE SecureMailThread where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'ShareRelatedSuffix' and xtype = 'U')
	DELETE ShareRelatedSuffix where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'SHCH' and xtype = 'U')
	DELETE SHCH where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'SHCHPledges' and xtype = 'U')
	DELETE SHCHPledges where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'SHCHSuffix' and xtype = 'U')
	DELETE SHCHSuffix where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'SHFE' and xtype = 'U')
	DELETE SHFE where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'SHNU' and xtype = 'U')
	DELETE SHNU where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'SHWI' and xtype = 'U')
	DELETE SHWI where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'SingleSignOnKeys' and xtype = 'U')
	DELETE SingleSignOnKeys where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'StopPayment' and xtype = 'U')
	DELETE StopPayment where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'StopPaymentLog' and xtype = 'U')
	DELETE StopPaymentLog where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'TargetedUsers' and xtype = 'U')
	DELETE TargetedUsers where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'tblImage' and xtype = 'U')
	DELETE tblImage where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'Transfer' and xtype = 'U')
	DELETE Transfer where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'TransLog' and xtype = 'U')
	DELETE TransLog where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'udt_Checks' and xtype = 'U')
	DELETE udt_Checks where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'udt_IA' and xtype = 'U')
	DELETE udt_IA where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'udt_LPMT' and xtype = 'U')
	DELETE udt_LPMT where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'udt_LPOF' and xtype = 'U')
	DELETE udt_LPOF where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'udt_MAInq' and xtype = 'U')
	DELETE udt_MAInq where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'udt_mmch' and xtype = 'U')
	DELETE udt_mmch where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'udt_OFXErrorRecover' and xtype = 'U')
	DELETE udt_OFXErrorRecover where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'udt_PDOC' and xtype = 'U')
	DELETE udt_PDOC where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'udt_SingleSignOn' and xtype = 'U')
	DELETE udt_SingleSignOn where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'UserStockProfile' and xtype = 'U')
	DELETE UserStockProfile where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'WebAccessAccounts' and xtype = 'U')
	DELETE WebAccessAccounts where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'x_AOCH' and xtype = 'U')
	DELETE x_AOCH where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'x_BECH' and xtype = 'U')
	DELETE x_BECH where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'x_CCLO' and xtype = 'U')
	DELETE x_CCLO where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'x_DeletedHB' and xtype = 'U')
	DELETE x_DeletedHB where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'x_EMCH' and xtype = 'U')
	DELETE x_EMCH where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'x_HistoryExport' and xtype = 'U')
	DELETE x_HistoryExport where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'x_JOCH' and xtype = 'U')
	DELETE x_JOCH where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'x_LogReview' and xtype = 'U')
	DELETE x_LogReview where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'x_MECH' and xtype = 'U')
	DELETE x_MECH where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'x_OBLA' and xtype = 'U')
	DELETE x_OBLA where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'x_OBOptions' and xtype = 'U')
	DELETE x_OBOptions where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'x_PublishNotices' and xtype = 'U')
	DELETE x_PublishNotices where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'x_PWD' and xtype = 'U')
	DELETE x_PWD where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'x_SHCH' and xtype = 'U')
	DELETE x_SHCH where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'x_StopItem' and xtype = 'U')
	DELETE x_StopItem where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'x_STOPPay' and xtype = 'U')
	DELETE x_STOPPay where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'x_StopPayment' and xtype = 'U')
	DELETE x_StopPayment where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'Alert' and xtype = 'U')
	DELETE Alert where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'AlertDataAccountBalances' and xtype = 'U')
	DELETE AlertDataAccountBalances where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'AlertDevice' and xtype = 'U')
	DELETE AlertDevice where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'AlertEmail' and xtype = 'U')
	DELETE AlertEmail where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'AlertSubscriberDevice' and xtype = 'U')
	DELETE AlertSubscriberDevice where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'AlertSubscription' and xtype = 'U')
	DELETE AlertSubscription where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'BadEmailAddresses' and xtype = 'U')
	DELETE BadEmailAddresses where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'BatchMemberNotices' and xtype = 'U')
	DELETE BatchMemberNotices where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'BillPayUserAlias' and xtype = 'U')
	DELETE BillPayUserAlias where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'BillPayUsers' and xtype = 'U')
	DELETE BillPayUsers where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'BITDisclosure' and xtype = 'U')
	DELETE BITDisclosure where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'CardChange' and xtype = 'U')
	DELETE CardChange where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'CardChangeCard' and xtype = 'U')
	DELETE CardChangeCard where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'CardChangeSuffix' and xtype = 'U')
	DELETE CardChangeSuffix where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'ChangeAddress' and xtype = 'U')
	DELETE ChangeAddress where account <> @UID1 and account <> @UID2 

IF EXISTS (SELECT * FROM Sysobjects where name = 'PSCUTransaction' and xtype = 'U')
	DELETE PSCUTransaction 

IF EXISTS (SELECT * FROM Sysobjects where name = 'HomeBankingAccountAlias' and xtype = 'U')
	DELETE HomeBankingAccountAlias

IF EXISTS (SELECT * FROM Sysobjects where name = 'HomeBankingUsage' and xtype = 'U')
	DELETE HomeBankingUsage

IF EXISTS (SELECT * FROM Sysobjects where name = 'HomeBankingMonthlyUsageFees' and xtype = 'U')
	DELETE HomeBankingMonthlyUsageFees

IF EXISTS (SELECT * FROM Sysobjects where name = 'OfflineCardPayment' and xtype = 'U')
	DELETE OfflineCardPayment


GO
/****** Object:  StoredProcedure [dbo].[sp_AppConfig_Update]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_AppConfig_Update]
 	@application  varchar(20), 
  	@itemcontext  varchar (30) = '', 
	@itemname varchar(30),
	@itemvalue varchar(150)
AS

IF (@itemcontext != '')
	UPDATE x_APPConfig
	SET itemvalue = @itemvalue
	WHERE application = @application AND (itemcontext = @itemcontext OR itemcontext = 'any') AND itemname 
= @itemname
ELSE
	UPDATE x_APPConfig
	SET itemvalue = @itemvalue
	WHERE application = @application AND itemcontext = 'any' AND itemname = @itemname

GO
/****** Object:  StoredProcedure [dbo].[sp_AppConfigSelect]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE Procedure [dbo].[sp_AppConfigSelect]
	/* Param List */
 	@application  varchar(20),
  	@itemcontext  varchar (30) = ''

AS

/******************************************************************************
**		File: 
**		Name: sp_AppConfigSelect
**		Desc: 
**
**		This template can be customized:
**              
**		Return values:
** 
**		Called by:   
**              
**		Parameters:
**		Input							Output
**     ----------							-----------
**
**		Auth: 
**		Date: 
*******************************************************************************
**		Change History
*******************************************************************************
**		Date:		Author:				Description:
**		--------		--------				-------------------------------------------
**    4/9/08			B.G.						Changed to only get 'any' values only if not in itemcontext value passed in
*******************************************************************************/
SET NOCOUNT ON
  IF ((@itemcontext != '') )
  BEGIN
SELECT * FROM x_APPConfig 
    WHERE application = @application AND 
    (itemcontext = @itemcontext or 
    (itemcontext = 'any' AND (itemname NOT in  
    (SELECT itemname FROM x_APPConfig WHERE application = @application AND itemcontext = @itemcontext))))
END
  ELSE
  BEGIN
    SELECT * FROM x_APPConfig
    WHERE (application = @application) AND (itemcontext = 'any') 
  END
SET NOCOUNT OFF
GO
/****** Object:  StoredProcedure [dbo].[sp_AppConfigxlate_ConfigItem_Delete]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_AppConfigxlate_ConfigItem_Delete]
	@ID int
AS

DELETE FROM x_AppConfig
WHERE 1=1 AND ID = @ID

GO
/****** Object:  StoredProcedure [dbo].[sp_AppConfigxlate_ConfigItem_DeleteAll]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_AppConfigxlate_ConfigItem_DeleteAll]
AS

DELETE FROM x_AppConfig
WHERE 1=1

GO
/****** Object:  StoredProcedure [dbo].[sp_AppConfigxlate_ConfigItem_Insert]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_AppConfigxlate_ConfigItem_Insert]
	@ID int OUTPUT,
	@application char(20),
	@ItemName char(30),
	@ItemValue char(150),
	@ItemContext char(30),
	@IID int
AS

INSERT INTO x_AppConfig
(application, ItemName, ItemValue, ItemContext, IID)
VALUES
(@application, @ItemName, @ItemValue, @ItemContext, @IID)

SELECT @ID = @@IDENTITY FROM x_AppConfig

GO
/****** Object:  StoredProcedure [dbo].[sp_AppConfigxlate_ConfigItem_InsertIfNew]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_AppConfigxlate_ConfigItem_InsertIfNew]
	@ID int OUTPUT,
	@application char(20),
	@ItemName char(30),
	@ItemValue char(150),
	@ItemContext char(30),
	@IID int
AS

DECLARE @Count int
SELECT @Count = COUNT(application) FROM x_AppConfig WHERE 1=1

IF @Count = 0
	BEGIN
		INSERT INTO x_AppConfig
		(application, ItemName, ItemValue, ItemContext, IID)
		VALUES
		(@application, @ItemName, @ItemValue, @ItemContext, @IID)

		SELECT @ID = @@IDENTITY FROM x_AppConfig
	END
ELSE	BEGIN
		UPDATE x_AppConfig SET
			application = @application,
			ItemName = @ItemName,
			ItemValue = @ItemValue,
			ItemContext = @ItemContext,
			IID = @IID
		WHERE 1=1

		SELECT TOP 1 @ID = ID FROM x_AppConfig
		WHERE 1=1
		ORDER BY ID DESC
	END

GO
/****** Object:  StoredProcedure [dbo].[sp_AppConfigxlate_ConfigItem_Select]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_AppConfigxlate_ConfigItem_Select]
	@ID int
AS

SELECT * FROM x_AppConfig
WHERE 1=1 AND ID = @ID

GO
/****** Object:  StoredProcedure [dbo].[sp_AppConfigxlate_ConfigItem_SelectAll]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_AppConfigxlate_ConfigItem_SelectAll]
AS

SELECT * FROM x_AppConfig
WHERE 1=1

GO
/****** Object:  StoredProcedure [dbo].[sp_AppConfigxlate_ConfigItem_Update]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_AppConfigxlate_ConfigItem_Update]
	@ID int,
	@application varchar(20),
	@ItemName varchar(30),
	@ItemValue varchar(150),
	@ItemContext varchar(30),
	@IID varchar(100)
AS

IF @application <> ''
	BEGIN
		DECLARE @application_CASTED char(20)
		IF @application = '^'
			BEGIN
				SET @application_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @application_CASTED = CAST(@application AS char(20))
			END

		UPDATE x_AppConfig
			SET application = @application_CASTED
		WHERE 1=1 AND ID = @ID
	END

IF @ItemName <> ''
	BEGIN
		DECLARE @ItemName_CASTED char(30)
		IF @ItemName = '^'
			BEGIN
				SET @ItemName_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @ItemName_CASTED = CAST(@ItemName AS char(30))
			END

		UPDATE x_AppConfig
			SET ItemName = @ItemName_CASTED
		WHERE 1=1 AND ID = @ID
	END

IF @ItemValue <> ''
	BEGIN
		DECLARE @ItemValue_CASTED char(150)
		IF @ItemValue = '^'
			BEGIN
				SET @ItemValue_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @ItemValue_CASTED = CAST(@ItemValue AS char(150))
			END

		UPDATE x_AppConfig
			SET ItemValue = @ItemValue_CASTED
		WHERE 1=1 AND ID = @ID
	END

IF @ItemContext <> ''
	BEGIN
		DECLARE @ItemContext_CASTED char(30)
		IF @ItemContext = '^'
			BEGIN
				SET @ItemContext_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @ItemContext_CASTED = CAST(@ItemContext AS char(30))
			END

		UPDATE x_AppConfig
			SET ItemContext = @ItemContext_CASTED
		WHERE 1=1 AND ID = @ID
	END

IF @IID <> ''
	BEGIN
		DECLARE @IID_CASTED int
		IF @IID = '^'
			BEGIN
				SET @IID_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @IID_CASTED = CAST(@IID AS int)
			END

		UPDATE x_AppConfig
			SET IID = @IID_CASTED
		WHERE 1=1 AND ID = @ID
	END

GO
/****** Object:  StoredProcedure [dbo].[sp_BDIImport_MemberNotices_Update]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE Procedure [dbo].[sp_BDIImport_MemberNotices_Update]
	@NotificationID int,
	@NotificationType char(16),
	@Account varchar(20),
	@MemberNumber varchar(20),
	@PersonNumber varchar(20),
	@FileID int,
	@StartDate datetime,
	@EndDate datetime,
	@StartByte bigint,
	@EndByte bigint,
	@Pages int,
	@SSN char(11),
	@Name char(100),
	@NoticePending char(1),
	@SLType char(1),
	@Suffix int,
	@StartPage int,
	@BinaryData char(10)
AS 
/******************************************************************************
**		File: 
**		Name: sp_BDIImport_MemberNotices_Update
**		Desc: Updates the MemberNotices table with a new statement notification
**
**		This template can be customized:
**              
**		Return values: unique id
** 
**		Called by:   
**              
**		Parameters:
**		Input							Output
**     ----------							-----------
**
**		Auth: 
**		Date: 
*******************************************************************************
**		Change History
*******************************************************************************
**		Date:			Author:	Version		Description:
**		--------		--------	-------		-------------------------------------------
**		11/4/09			Troy C		1.0.0
**		11/27/2009		Troy C		1.0.0		changed SSN field to 11 chars
*******************************************************************************/

BEGIN
	DELETE FROM MemberNotices
		WHERE
			NotificationType = @NotificationType
			And Account = @Account
			And Suffix = @Suffix
			And SSN = @SSN
			And StartDate = @StartDate
			And SLType = @SLType
			And Suffix = @Suffix
	
	INSERT MemberNotices
		(NotificationID,
		NotificationType,
		Account,
		MemberNumber,
		PersonNumber,
		FileID,
		StartDate,
		EndDate,
		StartByte,
		EndByte,
		Pages,
		SSN,
		Name,
		NoticePending,
		SLType,
		Suffix,
		StartPage,
		BinaryData) 
		Values
		(@NotificationID,
		@NotificationType,
		@Account,
		@MemberNumber,
		@PersonNumber,
		@FileID,
		@StartDate,
		@EndDate,
		@StartByte,
		@EndByte,
		@Pages,
		@SSN,
		@Name,
		@NoticePending,
		@SLType,
		@Suffix,
		@StartPage,
		@BinaryData)
END

GO
/****** Object:  StoredProcedure [dbo].[sp_BDIImport_NotificationFile_InsertNew]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE Procedure [dbo].[sp_BDIImport_NotificationFile_InsertNew]
	@GroupFileID int,
	@FileID int,
	@FileName char(255),
	@Available char(1),
	@NoticePending char(1)
AS
/******************************************************************************
**		File: 
**		Name: sp_BDIImport_NotificationFile_InsertNew
**		Desc: Inserts a new record into the NotificationFile table
**
**		This template can be customized:
**              
**		Return values: unique id
** 
**		Called by:   
**              
**		Parameters:
**		Input							Output
**     ----------							-----------
**
**		Auth: 
**		Date: 
*******************************************************************************
**		Change History
*******************************************************************************
**		Date:			Author:	Version		Description:
**		--------		--------	-------		-------------------------------------------
**		11/4/09			Troy C		1.0.0
*******************************************************************************/

DECLARE @Count INT
SELECT @Count = COUNT(FileID) FROM NotificationFile WHERE FileName = @FileName

DECLARE @FID INT
IF @Count = 0
	BEGIN
		DELETE FROM NotificationFile
		WHERE GroupFileID = @GroupFileID AND FileID = @FileID
	
		INSERT INTO NotificationFile
			(GroupFileID, FileID,FileName,Available,NoticePending)
		VALUES
			(@GroupFileID, @FileID, @FileName, @Available, @NoticePending)

		SET @FID = @FileID
	END
ELSE
	BEGIN
		UPDATE NotificationFile SET
			Available = @Available,
			NoticePending = @NoticePending
		WHERE FileName = @FileName

		SELECT TOP 1 @FileID = FileID FROM NotificationFile
		WHERE FileName = @FileName
		ORDER BY FileID DESC

		SET @FID = @FileID
	END

RETURN @FID
GO
/****** Object:  StoredProcedure [dbo].[sp_BDIxlate_Reply_Delete]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_BDIxlate_Reply_Delete]
	@NotificationID int,
	@Account varchar(20)
AS

DELETE FROM MemberNotices
WHERE 1=1 AND NotificationID = @NotificationID AND Account = @Account

GO
/****** Object:  StoredProcedure [dbo].[sp_BDIxlate_Reply_DeleteAll]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_BDIxlate_Reply_DeleteAll]
	@NotificationID int,
	@Account varchar(20)
AS

DELETE FROM MemberNotices
WHERE 1=1 AND NotificationID = @NotificationID AND Account = @Account

GO
/****** Object:  StoredProcedure [dbo].[sp_BDIxlate_Reply_Insert]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_BDIxlate_Reply_Insert]
	@NotificationID int,
	@Account varchar(20),
	@FileID int,
	@StartPage int,
	@Pages int,
	@StartDate datetime,
	@EndDate datetime,
	@StartByte int,
	@EndByte int
AS

INSERT INTO MemberNotices
(NotificationID, Account, FileID, StartPage, Pages, StartDate, EndDate, StartByte, EndByte)
VALUES
(@NotificationID, @Account, @FileID, @StartPage, @Pages, @StartDate, @EndDate, @StartByte, @EndByte)

GO
/****** Object:  StoredProcedure [dbo].[sp_BDIxlate_Reply_InsertIfNew]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_BDIxlate_Reply_InsertIfNew]
	@NotificationID int,
	@Account varchar(20),
	@FileID int,
	@StartPage int,
	@Pages int,
	@StartDate datetime,
	@EndDate datetime,
	@StartByte int,
	@EndByte int
AS

IF NOT EXISTS (SELECT * FROM MemberNotices WHERE 1=1 AND NotificationID = @NotificationID AND Account = @Account)
	BEGIN
		INSERT INTO MemberNotices
		(NotificationID, Account, FileID, StartPage, Pages, StartDate, EndDate, StartByte, EndByte)
		VALUES
		(@NotificationID, @Account, @FileID, @StartPage, @Pages, @StartDate, @EndDate, @StartByte, @EndByte)
	END
ELSE	BEGIN
		UPDATE MemberNotices SET
			FileID = @FileID,
			StartPage = @StartPage,
			Pages = @Pages,
			StartDate = @StartDate,
			EndDate = @EndDate,
			StartByte = @StartByte,
			EndByte = @EndByte
		WHERE 1=1 AND NotificationID = @NotificationID AND Account = @Account
	END

GO
/****** Object:  StoredProcedure [dbo].[sp_BDIxlate_Reply_Select]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_BDIxlate_Reply_Select]
	@NotificationID int,
	@Account varchar(20)
AS

SELECT * FROM MemberNotices
WHERE 1=1 AND NotificationID = @NotificationID AND Account = @Account

GO
/****** Object:  StoredProcedure [dbo].[sp_BDIxlate_Reply_SelectAll]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_BDIxlate_Reply_SelectAll]
	@NotificationID int,
	@Account varchar(20)
AS

SELECT * FROM MemberNotices
WHERE 1=1 AND NotificationID = @NotificationID AND Account = @Account

GO
/****** Object:  StoredProcedure [dbo].[sp_BDIxlate_Reply_Update]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_BDIxlate_Reply_Update]
	@NotificationID int,
	@Account varchar(20),
	@FileID varchar(100),
	@StartPage varchar(100),
	@Pages varchar(100),
	@StartDate varchar(100),
	@EndDate varchar(100),
	@StartByte varchar(100),
	@EndByte varchar(100)
AS

IF @FileID <> ''
	BEGIN
		DECLARE @FileID_CASTED int
		IF @FileID = '^'
			BEGIN
				SET @FileID_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @FileID_CASTED = CAST(@FileID AS int)
			END

		UPDATE MemberNotices
			SET FileID = @FileID_CASTED
		WHERE 1=1 AND NotificationID = @NotificationID AND Account = @Account
	END

IF @StartPage <> ''
	BEGIN
		DECLARE @StartPage_CASTED int
		IF @StartPage = '^'
			BEGIN
				SET @StartPage_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @StartPage_CASTED = CAST(@StartPage AS int)
			END

		UPDATE MemberNotices
			SET StartPage = @StartPage_CASTED
		WHERE 1=1 AND NotificationID = @NotificationID AND Account = @Account
	END

IF @Pages <> ''
	BEGIN
		DECLARE @Pages_CASTED int
		IF @Pages = '^'
			BEGIN
				SET @Pages_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @Pages_CASTED = CAST(@Pages AS int)
			END

		UPDATE MemberNotices
			SET Pages = @Pages_CASTED
		WHERE 1=1 AND NotificationID = @NotificationID AND Account = @Account
	END

IF @StartDate <> ''
	BEGIN
		DECLARE @StartDate_CASTED datetime
		IF @StartDate = '^'
			BEGIN
				SET @StartDate_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @StartDate_CASTED = CAST(@StartDate AS datetime)
			END

		UPDATE MemberNotices
			SET StartDate = @StartDate_CASTED
		WHERE 1=1 AND NotificationID = @NotificationID AND Account = @Account
	END

IF @EndDate <> ''
	BEGIN
		DECLARE @EndDate_CASTED datetime
		IF @EndDate = '^'
			BEGIN
				SET @EndDate_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @EndDate_CASTED = CAST(@EndDate AS datetime)
			END

		UPDATE MemberNotices
			SET EndDate = @EndDate_CASTED
		WHERE 1=1 AND NotificationID = @NotificationID AND Account = @Account
	END

IF @StartByte <> ''
	BEGIN
		DECLARE @StartByte_CASTED int
		IF @StartByte = '^'
			BEGIN
				SET @StartByte_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @StartByte_CASTED = CAST(@StartByte AS int)
			END

		UPDATE MemberNotices
			SET StartByte = @StartByte_CASTED
		WHERE 1=1 AND NotificationID = @NotificationID AND Account = @Account
	END

IF @EndByte <> ''
	BEGIN
		DECLARE @EndByte_CASTED int
		IF @EndByte = '^'
			BEGIN
				SET @EndByte_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @EndByte_CASTED = CAST(@EndByte AS int)
			END

		UPDATE MemberNotices
			SET EndByte = @EndByte_CASTED
		WHERE 1=1 AND NotificationID = @NotificationID AND Account = @Account
	END

GO
/****** Object:  StoredProcedure [dbo].[sp_ChangeToDBO_Owner]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS OFF
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE PROCEDURE [dbo].[sp_ChangeToDBO_Owner] AS
DECLARE @spName varchar(128)
DECLARE my_cur CURSOR FOR
 SELECT su.name + '.' + so.name AS spName
 FROM sysobjects so INNER JOIN
         sysusers su ON so.uid = su.uid
 WHERE so.xtype = 'P' AND so.status > 0 AND so.uid = 2
 
OPEN my_cur FETCH NEXT FROM my_cur INTO @spName
	print @@FETCH_STATUS
WHILE @@FETCH_STATUS = 0
BEGIN
	print @spName
 EXEC sp_changeobjectowner @spName, 'DBO'
 FETCH NEXT FROM my_cur INTO @spName
END
CLOSE my_cur
DEALLOCATE my_cur
GO
/****** Object:  StoredProcedure [dbo].[sp_CheckImageFileSelect]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS OFF
GO
SET QUOTED_IDENTIFIER OFF
GO

/******************************************************************************
**		File: 
**		Name: sp_CheckImageFileSelect
**		Desc: 
**
**		This template can be customized:
**              
**		Return values:
** 
**		Called by:   
**              
**		Parameters:
**		Input							Output
**     ----------							-----------
**
**		Auth: 
**		Date: 
*******************************************************************************
**		Change History
*******************************************************************************
**		Date:		Author:				Description:
**		--------		--------				-------------------------------------------
**    
*******************************************************************************/

CREATE PROCEDURE [dbo].[sp_CheckImageFileSelect]
	(
		@FileId int, 
		@Internal int = 0 
		
	)

AS


SET NOCOUNT ON
	IF @Internal  = 1 
		SELECT     *
		FROM         dbo.tblImageFile
		WHERE     (FileId = @FileId) AND (Available IN ('Y', 'I'))
	ELSE 
		SELECT     *
		FROM         dbo.tblImageFile
		WHERE     (FileId = @FileId) AND (Available = 'Y')
		
SET NOCOUNT OFF
GO
/****** Object:  StoredProcedure [dbo].[sp_CheckImageRequestAddUpdate]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS OFF
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE Procedure [dbo].[sp_CheckImageRequestAddUpdate]
	/* Param List */
  @CheckAccountNumber nvarchar(20),
  @CheckNumber nvarchar(10),
  @ClientIP char (15) = null,
  @WebIP  char (15) = null,
  @ClusterID  char (10) =  null
  
AS
/******************************************************************************
**		File: 
**		Name: sp_CheckImageRequestAddUpdate
**		Desc: 
**
**		This template can be customized:
**              
**		Return values:
** 
**		Called by:   
**              
**		Parameters:
**		Input							Output
**     ----------							-----------
**
**		Auth: 
**		Date: 
*******************************************************************************
**		Change History
*******************************************************************************
**		Date:		Author:				Description:
**		--------		--------				-------------------------------------------
**    
*******************************************************************************/
SET NOCOUNT ON
IF EXISTS (SELECT * FROM CheckImageRequest WHERE
  CheckAccountNumber = @CheckAccountNumber 
    AND CheckNumber = @CheckNumber)
BEGIN
  UPDATE CheckImageRequest SET ClientIP = @ClientIP, 
  WebIP = @WebIP, ClusterID = @ClusterID, 
  LastModified = GetDate()
  WHERE
  CheckAccountNumber = @CheckAccountNumber 
    AND CheckNumber = @CheckNumber
END
ELSE
BEGIN
  INSERT INTO CheckImageRequest 
  (CheckAccountNumber,CheckNumber, ClientIP,WebIP,ClusterID, 
  RequestDate, LastModified) 
  VALUES 
  (@CheckAccountNumber, @CheckNumber,  
  @ClientIP, @WebIP, @ClusterID,GetDate(), GetDate())
END
SET NOCOUNT OFF
GO
/****** Object:  StoredProcedure [dbo].[sp_CheckImageSelect]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS OFF
GO
SET QUOTED_IDENTIFIER OFF
GO

/******************************************************************************
**		File: 
**		Name: sp_CheckImageSelect
**		Desc: 
**
**		This template can be customized:
**              
**		Return values:
** 
**		Called by:   
**              
**		Parameters:
**		Input							Output
**     ----------							-----------
**
**		Auth: 
**		Date: 
*******************************************************************************
**		Change History
*******************************************************************************
**		Date:		Author:				Description:
**		--------		--------				-------------------------------------------
**    
*******************************************************************************/

CREATE PROCEDURE [dbo].[sp_CheckImageSelect]
	(
		@Account int = 0, 
		@CheckNumber int = 0, 
		@StartCheckNumber int = 0, 
		@EndCheckNumber int = 0, 
		@CheckAmount int = 0, 
		@StartCheckAmount int = 0,
		@EndCheckAmount int = 0,
		@SLType char(1) = NULL, 
		@Suffix int = 0, 
		@ClearedDate datetime = NULL,
		@BInternal int = 0,
		@BRangeSearch int = 0
	)

AS


SET NOCOUNT ON
	IF (@BInternal = 1 AND @BRangeSearch = 1 AND @StartCheckAmount > 0 )
		( SELECT     Account, IndexId, FileId, CheckNumber, OriginalDEOffset, OriginFileNum, TiffFileOffsetFront, TiffFileSizeFront, CheckAmount, TiffFileOffsetBack, 
                      	SequenceNumber, TiffFileSizeBack, JPGFileOffsetFront, JPGSizeFront, JPGFileOffsetBack, JPGSizeBack, TiffWidthBack, TiffLengthBack, TiffWidthFront,
                       	TiffLengthFront, TiffEncoding, SLType, Suffix, ClearedDate  
		FROM         dbo.tblImage 
		WHERE     (Account = @Account) AND (SLType = @SLType) AND  (Suffix = @Suffix)  
		AND (CheckAmount >= @StartCheckAmount) AND (CheckAmount <= @EndCheckAmount) )  
		ORDER BY fileid, checknumber
	ELSE IF (@BInternal = 1 AND @BRangeSearch = 1 AND @StartCheckNumber > 0)
		(SELECT     Account, IndexId, FileId, CheckNumber, OriginalDEOffset, OriginFileNum, TiffFileOffsetFront, TiffFileSizeFront, CheckAmount, TiffFileOffsetBack, 
                      	SequenceNumber, TiffFileSizeBack, JPGFileOffsetFront, JPGSizeFront, JPGFileOffsetBack, JPGSizeBack, TiffWidthBack, TiffLengthBack, TiffWidthFront,
                       	TiffLengthFront, TiffEncoding, SLType, Suffix, ClearedDate 
		FROM         dbo.tblImage 
		WHERE     (Account = @Account) AND (SLType = @SLType) AND  (Suffix = @Suffix) 
		AND (CheckNumber >= @StartCheckNumber) AND (CheckNumber <= @EndCheckNumber) )  
		ORDER BY fileid, checknumber
	ELSE IF (@BInternal = 1 AND @StartCheckAmount  = 0 AND @StartCheckNumber = 0 AND @CheckAmount = 0 AND  @CheckNumber = 0)
		(SELECT     Account, IndexId, FileId, CheckNumber, OriginalDEOffset, OriginFileNum, TiffFileOffsetFront, TiffFileSizeFront, CheckAmount, TiffFileOffsetBack, 
                      	SequenceNumber, TiffFileSizeBack, JPGFileOffsetFront, JPGSizeFront, JPGFileOffsetBack, JPGSizeBack, TiffWidthBack, TiffLengthBack, TiffWidthFront,
                       	TiffLengthFront, TiffEncoding, SLType, Suffix, ClearedDate 
		FROM         dbo.tblImage 
		WHERE     (Account = @Account) AND (SLType = @SLType) AND  (Suffix = @Suffix) )  
		ORDER BY fileid, checknumber
	ELSE IF (@BRangeSearch = 1 AND @StartCheckAmount  > 0)
		(SELECT     Account, IndexId, FileId, CheckNumber, OriginalDEOffset, OriginFileNum, TiffFileOffsetFront, TiffFileSizeFront, CheckAmount, TiffFileOffsetBack, 
                      	SequenceNumber, TiffFileSizeBack, JPGFileOffsetFront, JPGSizeFront, JPGFileOffsetBack, JPGSizeBack, TiffWidthBack, TiffLengthBack, TiffWidthFront,
                       	TiffLengthFront, TiffEncoding, SLType, Suffix, ClearedDate  
		FROM         dbo.tblImage  
		WHERE     (Account = @Account) AND (SLType = @SLType) AND  (Suffix = @Suffix)  
		AND (CheckAmount >= @StartCheckAmount) AND (CheckAmount <= @EndCheckAmount)  )
	ELSE IF (@BRangeSearch = 1 AND @StartCheckNumber > 0)
		(SELECT     Account, IndexId, FileId, CheckNumber, OriginalDEOffset, OriginFileNum, TiffFileOffsetFront, TiffFileSizeFront, CheckAmount, TiffFileOffsetBack, 
                      	SequenceNumber, TiffFileSizeBack, JPGFileOffsetFront, JPGSizeFront, JPGFileOffsetBack, JPGSizeBack, TiffWidthBack, TiffLengthBack, TiffWidthFront,
                       	TiffLengthFront, TiffEncoding, SLType, Suffix, ClearedDate 
		FROM         dbo.tblImage 
		WHERE     (Account = @Account) AND (SLType = @SLType) AND  (Suffix = @Suffix)  
		AND (CheckNumber >= @StartCheckNumber) AND (CheckNumber <= @EndCheckNumber) )
	ELSE IF (@BRangeSearch = 0 AND @CheckNumber > 0 AND @CheckAmount = 0)
		SELECT     Account, IndexId, FileId, CheckNumber, OriginalDEOffset, OriginFileNum, TiffFileOffsetFront, TiffFileSizeFront, CheckAmount, TiffFileOffsetBack, 
                      	SequenceNumber, TiffFileSizeBack, JPGFileOffsetFront, JPGSizeFront, JPGFileOffsetBack, JPGSizeBack, TiffWidthBack, TiffLengthBack, TiffWidthFront,
                       	TiffLengthFront, TiffEncoding, SLType, Suffix, ClearedDate 
		FROM         dbo.tblImage  
		WHERE     (Account = @Account) AND (SLType = @SLType) AND  (Suffix = @Suffix) AND (CheckNumber = @CheckNumber) 
	ELSE IF (@BRangeSearch = 0 AND @CheckAmount > 0 AND  @CheckNumber = 0)	
		SELECT     Account, IndexId, FileId, CheckNumber, OriginalDEOffset, OriginFileNum, TiffFileOffsetFront, TiffFileSizeFront, CheckAmount, TiffFileOffsetBack, 
                      	SequenceNumber, TiffFileSizeBack, JPGFileOffsetFront, JPGSizeFront, JPGFileOffsetBack, JPGSizeBack, TiffWidthBack, TiffLengthBack, TiffWidthFront,
                       	TiffLengthFront, TiffEncoding, SLType, Suffix, ClearedDate 
		FROM         dbo.tblImage  
		WHERE     (Account = @Account) AND (SLType = @SLType) AND  (Suffix = @Suffix) AND (CheckAmount = @CheckAmount)
	ELSE 
		SELECT     Account, IndexId, FileId, CheckNumber, OriginalDEOffset, OriginFileNum, TiffFileOffsetFront, TiffFileSizeFront, CheckAmount, TiffFileOffsetBack, 
                      	SequenceNumber, TiffFileSizeBack, JPGFileOffsetFront, JPGSizeFront, JPGFileOffsetBack, JPGSizeBack, TiffWidthBack, TiffLengthBack, TiffWidthFront,
                       	TiffLengthFront, TiffEncoding, SLType, Suffix, ClearedDate 
		FROM         dbo.tblImage  
		WHERE     (Account = @Account) AND (SLType = @SLType) AND  (Suffix = @Suffix) AND (CheckNumber = @CheckNumber) AND (CheckAmount = @CheckAmount)
		
SET NOCOUNT OFF
GO
/****** Object:  StoredProcedure [dbo].[sp_CheckMetaDataSelect]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS OFF
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE Procedure [dbo].[sp_CheckMetaDataSelect]
	/* Param List */
 	@Configuration int
AS
/******************************************************************************
**		File: 
**		Name:  sp_CheckMetaDataSelect
**		Desc: 
**
**		This template can be customized:
**              
**		Return values:
** 
**		Called by:   
**              
**		Parameters:
**		Input							Output
**     ----------							-----------
**
**		Auth: 
**		Date: 
*******************************************************************************
**		Change History
*******************************************************************************
**		Date:		Author:				Description:
**		--------		--------				-------------------------------------------
**    
*******************************************************************************/
    SELECT * FROM CheckImagingMetaData
    WHERE (Configuration = @Configuration)
GO
/****** Object:  StoredProcedure [dbo].[sp_Documatix_BuildEmails]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS OFF
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE Procedure [dbo].[sp_Documatix_BuildEmails]
	/* Param List */
	@GroupType CHAR(16),
	@FileID INT,
	@Truncate CHAR(1)

AS

/******************************************************************************
**		File: 
**		Name:  sp_Documatix_BuildEmails
**		Desc: 
**
**		This template can be customized:
**              
**		Return values:
** 
**		Called by:   
**              
**		Parameters:
**		Input							Output
**		----------							-----------
**
**		Auth: 
**		Date: 
*******************************************************************************
**		Change History
*******************************************************************************
**		Date:		Author:				Description:
**		--------		--------				-------------------------------------------
**    
*******************************************************************************/
DECLARE @Count INT
DECLARE @Account INT
DECLARE @FName CHAR(30)
DECLARE @LName CHAR(20)
DECLARE @Email1 CHAR(60)

IF @Truncate = 'Y'
BEGIN
	TRUNCATE TABLE DocumatixEmail
END

INSERT INTO DocumatixEmail(GroupType, Account, FName, LName, Email1)
	SELECT @GroupType AS GroupType, MF.Account, MF.FName, MF.LName, MF.Email1
	FROM MemberNotices MN
	LEFT JOIN MemberFile MF ON MF.Account = MN.Account
	WHERE (MN.FileID = @FileID AND ISNULL(MF.Account, '') <> '' AND MF.EMail1 <> '' AND MN.NoticePending = 'Y')
		  AND NOT EXISTS(SELECT Email1 FROM DocumatixEmail AS DX WHERE DX.GroupType = @GroupType AND DX.Account = MF.Account AND DX.Email1 = MF.Email1)
	ORDER BY MF.Account

SELECT COUNT(Email1) AS Emails FROM DocumatixEmail
GO
/****** Object:  StoredProcedure [dbo].[sp_Documatix_CheckStatus]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS OFF
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE Procedure [dbo].[sp_Documatix_CheckStatus]
	/* Param List */

AS

/******************************************************************************
**		File: 
**		Name:  sp_Documatix_CheckStatus
**		Desc: 
**
**		This template can be customized:
**              
**		Return values:
** 
**		Called by:   
**              
**		Parameters:
**		Input							Output
**		----------							-----------
**
**		Auth: 
**		Date: 
*******************************************************************************
**		Change History
*******************************************************************************
**		Date:		Author:				Description:
**		--------		--------				-------------------------------------------
**    
*******************************************************************************/
   SELECT * FROM NotificationFile WHERE (NoticePending = 'Y' AND Available = 'Y') ORDER BY FileID
GO
/****** Object:  StoredProcedure [dbo].[sp_Documatix_GatherEmails]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS OFF
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE Procedure [dbo].[sp_Documatix_GatherEmails]
	/* Param List */
	@FileId int

AS

/******************************************************************************
**		File: 
**		Name:  sp_Documatix_GatherEmails
**		Desc: 
**
**		This template can be customized:
**              
**		Return values:
** 
**		Called by:   
**              
**		Parameters:
**		Input							Output
**		----------							-----------
**
**		Auth: 
**		Date: 
*******************************************************************************
**		Change History
*******************************************************************************
**		Date:		Author:				Description:
**		--------		--------				-------------------------------------------
**    
*******************************************************************************/

/*
	Required fields to be returned are:
	Account	-- Populated from MemberFile.Account OR TempTable.Account
	Email1		-- Populated from MemberFile.Email1 OR TempTable.Email1
	NotificationType	-- Pouplated from MemberNotices.NotificationType OR TempTable.GroupType OR set to '' if MemberNotices table not being used.
*/

/*
--	Sample SQL #1
	SELECT MF.*, MN.NotificationType
	FROM MemberNotices MN
	LEFT JOIN MemberFile MF ON MF.Account = MN.Account 
	WHERE MN.FileID = @FileID
*/

/*
--	Sample SQL #2
	SELECT TT.Account, TT.Email1, TT.GroupType AS NotificationType
	FROM TempTable TT
*/

	SELECT TT.Account, TT.Email1, TT.GroupType AS NotificationType
	FROM TempTable TT
GO
/****** Object:  StoredProcedure [dbo].[sp_Documatix_LogResponse]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS OFF
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE Procedure [dbo].[sp_Documatix_LogResponse]
	/* Param List */
	@Notes VARCHAR(200)

AS

/******************************************************************************
**		File: 
**		Name:  sp_Documatix_LogResponse
**		Desc: 
**
**		This template can be customized:
**              
**		Return values:
** 
**		Called by:   
**              
**		Parameters:
**		Input							Output
**		----------							-----------
**
**		Auth: 
**		Date: 
*******************************************************************************
**		Change History
*******************************************************************************
**		Date:		Author:				Description:
**		--------		--------				-------------------------------------------
**    
*******************************************************************************/
	DECLARE @NewTrackingNum INT
	EXEC sp_GetNextTrackingNum @NewTrackingNum OUTPUT	
	
PRINT 'TN: ' + ISNULL(STR(@NewTrackingNum), 'NULL')
	
	INSERT INTO x_PublishNotices
	(TrackingNum, Teller, Notes, FileID, StatementType, Account, NotificationID, ExecuteTime)
	VALUES
	(@NewTrackingNum, 'dmx', @Notes, 0, 'DOCUMATIX', 0, 0, GetDate())
GO
/****** Object:  StoredProcedure [dbo].[sp_Documatix_SetNotificationStatus]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS OFF
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE Procedure [dbo].[sp_Documatix_SetNotificationStatus]
	/* Param List */
	@FileId int

AS

/******************************************************************************
**		File: 
**		Name:  sp_Documatix_SetNotificationStatus
**		Desc: 
**
**		This template can be customized:
**              
**		Return values:
** 
**		Called by:   
**              
**		Parameters:
**		Input							Output
**		----------							-----------
**
**		Auth: 
**		Date: 
*******************************************************************************
**		Change History
*******************************************************************************
**		Date:		Author:				Description:
**		--------		--------				-------------------------------------------
**    
*******************************************************************************/
	UPDATE NotificationFile
	SET NoticePending = 'N'
	WHERE FileID = @FileID
GO
/****** Object:  StoredProcedure [dbo].[sp_DocumentTypesDeleteDocumentTypes]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE Procedure [dbo].[sp_DocumentTypesDeleteDocumentTypes]
	@DocumentTypesID INT
AS

DELETE FROM DocumentTypes
WHERE DocumentTypesID = @DocumentTypesID
GO
/****** Object:  StoredProcedure [dbo].[sp_DocumentTypesGetAccessFlags]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS OFF
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE Procedure [dbo].[sp_DocumentTypesGetAccessFlags]
	@AccessCategory CHAR(20)
AS

SELECT DISTINCT * FROM AccessFlags
WHERE AccessCategory = @AccessCategory
GO
/****** Object:  StoredProcedure [dbo].[sp_DocumentTypesGetAccessFlagsByAccessCategory]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE Procedure [dbo].[sp_DocumentTypesGetAccessFlagsByAccessCategory]
	@AccessCategory CHAR(20)
AS

SELECT DISTINCT * FROM AccessFlags
WHERE AccessCategory = @AccessCategory
GO
/****** Object:  StoredProcedure [dbo].[sp_DocumentTypesGetDocumentTypes]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE Procedure [dbo].[sp_DocumentTypesGetDocumentTypes]
AS

SELECT * FROM DocumentTypes
ORDER BY SortOrder
GO
/****** Object:  StoredProcedure [dbo].[sp_DocumentTypesPutAccessFlags]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE Procedure [dbo].[sp_DocumentTypesPutAccessFlags]
	@AccessCategory CHAR(20),
	@Description CHAR(255)
AS

INSERT INTO AccessFlags (AccessCategory, AccessName, AccessType, AccessValues, DefaultValue, CategoryDesc, NameDesc) VALUES (@AccessCategory, 'Admin', 'bool', 'Y,N', 'N', @Description, 'Administer ' + @Description)
INSERT INTO AccessFlags (AccessCategory, AccessName, AccessType, AccessValues, DefaultValue, CategoryDesc, NameDesc) VALUES (@AccessCategory, 'Delete', 'bool', 'Y,N', 'N', @Description, 'Delete Statement File')
INSERT INTO AccessFlags (AccessCategory, AccessName, AccessType, AccessValues, DefaultValue, CategoryDesc, NameDesc) VALUES (@AccessCategory, 'Logs', 'bool', 'Y,N', 'N', @Description, 'View Logs')
INSERT INTO AccessFlags (AccessCategory, AccessName, AccessType, AccessValues, DefaultValue, CategoryDesc, NameDesc) VALUES (@AccessCategory, 'Notify', 'bool', 'Y,N', 'N', @Description, 'Begin Notifications')
INSERT INTO AccessFlags (AccessCategory, AccessName, AccessType, AccessValues, DefaultValue, CategoryDesc, NameDesc) VALUES (@AccessCategory, 'Release', 'bool', 'Y,N', 'N', @Description, 'Release to Members')
INSERT INTO AccessFlags (AccessCategory, AccessName, AccessType, AccessValues, DefaultValue, CategoryDesc, NameDesc) VALUES (@AccessCategory, 'View', 'bool', 'Y,N', 'N', @Description, 'View ' + @Description)
GO
/****** Object:  StoredProcedure [dbo].[sp_DocumentTypesPutDocumentTypes]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE Procedure [dbo].[sp_DocumentTypesPutDocumentTypes]
	@SortOrder INT,
	@FileType CHAR(20),
	@NotificationTypes CHAR(255),
	@Description CHAR(255)
AS

INSERT INTO DocumentTypes (SortOrder, FileType, NotificationTypes, Description) VALUES (@SortOrder, @FileType, @NotificationTypes, @Description)
GO
/****** Object:  StoredProcedure [dbo].[sp_DocumentTypesPutInternalAccess]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE Procedure [dbo].[sp_DocumentTypesPutInternalAccess]
	@Teller CHAR(50),
	@AccessCategory CHAR(20),
	@Now DATETIME
AS

INSERT INTO x_InternalAccess (TrackingNum, Teller, AccessCategory, AccessName, AccessType, AccessValue, AddDate) VALUES (999, @Teller, @AccessCategory, 'Admin', 'bool', 'Y', @Now)
INSERT INTO x_InternalAccess (TrackingNum, Teller, AccessCategory, AccessName, AccessType, AccessValue, AddDate) VALUES (999, @Teller, @AccessCategory, 'Delete', 'bool', 'N', @Now)
INSERT INTO x_InternalAccess (TrackingNum, Teller, AccessCategory, AccessName, AccessType, AccessValue, AddDate) VALUES (999, @Teller, @AccessCategory, 'Logs', 'bool', 'N', @Now)
INSERT INTO x_InternalAccess (TrackingNum, Teller, AccessCategory, AccessName, AccessType, AccessValue, AddDate) VALUES (999, @Teller, @AccessCategory, 'Notify', 'bool', 'N', @Now)
INSERT INTO x_InternalAccess (TrackingNum, Teller, AccessCategory, AccessName, AccessType, AccessValue, AddDate) VALUES (999, @Teller, @AccessCategory, 'Release', 'bool', 'N', @Now)
INSERT INTO x_InternalAccess (TrackingNum, Teller, AccessCategory, AccessName, AccessType, AccessValue, AddDate) VALUES (999, @Teller, @AccessCategory, 'View', 'bool', 'N', @Now)
GO
/****** Object:  StoredProcedure [dbo].[sp_DocumentTypesUpdateDocumentTypes]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE Procedure [dbo].[sp_DocumentTypesUpdateDocumentTypes]
	@SortOrder INT,
	@FileType CHAR(20),
	@NotificationTypes CHAR(255),
	@Description CHAR(255),
	@DocumentTypesID INT
AS

UPDATE DocumentTypes SET SortOrder = @SortOrder, FileType = @FileType, NotificationTypes = @NotificationTypes, Description = @Description
WHERE DocumentTypesID = @DocumentTypesID
GO
/****** Object:  StoredProcedure [dbo].[sp_Filesxlate_chkimg_Delete]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_Filesxlate_chkimg_Delete]
	@Account int,
	@FileId int
AS

DELETE FROM tblImage
WHERE 1=1 AND Account = @Account AND FileId = @FileId

GO
/****** Object:  StoredProcedure [dbo].[sp_Filesxlate_chkimg_DeleteAll]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_Filesxlate_chkimg_DeleteAll]
	@Account int,
	@FileId int
AS

DELETE FROM tblImage
WHERE 1=1 AND Account = @Account AND FileId = @FileId

GO
/****** Object:  StoredProcedure [dbo].[sp_Filesxlate_chkimg_Insert]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_Filesxlate_chkimg_Insert]
	@Account int,
	@Suffix smallint,
	@SLType char(1),
	@CheckNumber int,
	@CheckAmount int,
	@SequenceNumber int,
	@IndexId int,
	@FileId int,
	@OriginalDEOffset int,
	@OriginFileNum int,
	@TiffFileOffsetFront int,
	@TiffFileSizeFront int,
	@TiffFileOffsetBack int,
	@TiffFileSizeBack int,
	@TiffWidthBack int,
	@TiffLengthBack int,
	@TiffWidthFront int,
	@TiffLengthFront int,
	@TiffEncoding int
AS

INSERT INTO tblImage
(Account, FileId, Suffix, SLType, CheckNumber, CheckAmount, SequenceNumber, IndexId, OriginalDEOffset, OriginFileNum, TiffFileOffsetFront, TiffFileSizeFront, TiffFileOffsetBack, TiffFileSizeBack, TiffWidthBack, TiffLengthBack, TiffWidthFront, TiffLengthFront, TiffEncoding)
VALUES
(@Account, @FileId, @Suffix, @SLType, @CheckNumber, @CheckAmount, @SequenceNumber, @IndexId, @OriginalDEOffset, @OriginFileNum, @TiffFileOffsetFront, @TiffFileSizeFront, @TiffFileOffsetBack, @TiffFileSizeBack, @TiffWidthBack, @TiffLengthBack, @TiffWidthFront, @TiffLengthFront, @TiffEncoding)

GO
/****** Object:  StoredProcedure [dbo].[sp_Filesxlate_chkimg_InsertIfNew]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_Filesxlate_chkimg_InsertIfNew]
	@Account int,
	@Suffix smallint,
	@SLType char(1),
	@CheckNumber int,
	@CheckAmount int,
	@SequenceNumber int,
	@IndexId int,
	@FileId int,
	@OriginalDEOffset int,
	@OriginFileNum int,
	@TiffFileOffsetFront int,
	@TiffFileSizeFront int,
	@TiffFileOffsetBack int,
	@TiffFileSizeBack int,
	@TiffWidthBack int,
	@TiffLengthBack int,
	@TiffWidthFront int,
	@TiffLengthFront int,
	@TiffEncoding int
AS

IF NOT EXISTS (SELECT * FROM tblImage WHERE 1=1 AND Account = @Account AND FileId = @FileId)
	BEGIN
		INSERT INTO tblImage
		(Account, FileId, Suffix, SLType, CheckNumber, CheckAmount, SequenceNumber, IndexId, OriginalDEOffset, OriginFileNum, TiffFileOffsetFront, TiffFileSizeFront, TiffFileOffsetBack, TiffFileSizeBack, TiffWidthBack, TiffLengthBack, TiffWidthFront, TiffLengthFront, TiffEncoding)
		VALUES
		(@Account, @FileId, @Suffix, @SLType, @CheckNumber, @CheckAmount, @SequenceNumber, @IndexId, @OriginalDEOffset, @OriginFileNum, @TiffFileOffsetFront, @TiffFileSizeFront, @TiffFileOffsetBack, @TiffFileSizeBack, @TiffWidthBack, @TiffLengthBack, @TiffWidthFront, @TiffLengthFront, @TiffEncoding)
	END
ELSE	BEGIN
		UPDATE tblImage SET
			Suffix = @Suffix,
			SLType = @SLType,
			CheckNumber = @CheckNumber,
			CheckAmount = @CheckAmount,
			SequenceNumber = @SequenceNumber,
			IndexId = @IndexId,
			OriginalDEOffset = @OriginalDEOffset,
			OriginFileNum = @OriginFileNum,
			TiffFileOffsetFront = @TiffFileOffsetFront,
			TiffFileSizeFront = @TiffFileSizeFront,
			TiffFileOffsetBack = @TiffFileOffsetBack,
			TiffFileSizeBack = @TiffFileSizeBack,
			TiffWidthBack = @TiffWidthBack,
			TiffLengthBack = @TiffLengthBack,
			TiffWidthFront = @TiffWidthFront,
			TiffLengthFront = @TiffLengthFront,
			TiffEncoding = @TiffEncoding
		WHERE 1=1 AND Account = @Account AND FileId = @FileId
	END

GO
/****** Object:  StoredProcedure [dbo].[sp_Filesxlate_chkimg_Select]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_Filesxlate_chkimg_Select]
	@Account int,
	@FileId int
AS

EXEC sp_Filesxlate_HJ_tblImageSelect @Account, @FileId

GO
/****** Object:  StoredProcedure [dbo].[sp_Filesxlate_chkimg_SelectAll]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_Filesxlate_chkimg_SelectAll]
	@Account int,
	@FileId int
AS

EXEC sp_Filesxlate_HJ_tblImageSelectAll @Account, @FileId

GO
/****** Object:  StoredProcedure [dbo].[sp_Filesxlate_chkimg_Update]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_Filesxlate_chkimg_Update]
	@Account int,
	@Suffix varchar(100),
	@SLType varchar(1),
	@CheckNumber varchar(100),
	@CheckAmount varchar(100),
	@SequenceNumber varchar(100),
	@IndexId varchar(100),
	@FileId int,
	@OriginalDEOffset varchar(100),
	@OriginFileNum varchar(100),
	@TiffFileOffsetFront varchar(100),
	@TiffFileSizeFront varchar(100),
	@TiffFileOffsetBack varchar(100),
	@TiffFileSizeBack varchar(100),
	@TiffWidthBack varchar(100),
	@TiffLengthBack varchar(100),
	@TiffWidthFront varchar(100),
	@TiffLengthFront varchar(100),
	@TiffEncoding varchar(100)
AS

IF @Suffix <> ''
	BEGIN
		DECLARE @Suffix_CASTED smallint
		IF @Suffix = '^'
			BEGIN
				SET @Suffix_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @Suffix_CASTED = CAST(@Suffix AS smallint)
			END

		UPDATE tblImage
			SET Suffix = @Suffix_CASTED
		WHERE 1=1 AND Account = @Account AND FileId = @FileId
	END

IF @SLType <> ''
	BEGIN
		DECLARE @SLType_CASTED char(1)
		IF @SLType = '^'
			BEGIN
				SET @SLType_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @SLType_CASTED = CAST(@SLType AS char(1))
			END

		UPDATE tblImage
			SET SLType = @SLType_CASTED
		WHERE 1=1 AND Account = @Account AND FileId = @FileId
	END

IF @CheckNumber <> ''
	BEGIN
		DECLARE @CheckNumber_CASTED int
		IF @CheckNumber = '^'
			BEGIN
				SET @CheckNumber_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @CheckNumber_CASTED = CAST(@CheckNumber AS int)
			END

		UPDATE tblImage
			SET CheckNumber = @CheckNumber_CASTED
		WHERE 1=1 AND Account = @Account AND FileId = @FileId
	END

IF @CheckAmount <> ''
	BEGIN
		DECLARE @CheckAmount_CASTED int
		IF @CheckAmount = '^'
			BEGIN
				SET @CheckAmount_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @CheckAmount_CASTED = CAST(@CheckAmount AS int)
			END

		UPDATE tblImage
			SET CheckAmount = @CheckAmount_CASTED
		WHERE 1=1 AND Account = @Account AND FileId = @FileId
	END

IF @SequenceNumber <> ''
	BEGIN
		DECLARE @SequenceNumber_CASTED int
		IF @SequenceNumber = '^'
			BEGIN
				SET @SequenceNumber_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @SequenceNumber_CASTED = CAST(@SequenceNumber AS int)
			END

		UPDATE tblImage
			SET SequenceNumber = @SequenceNumber_CASTED
		WHERE 1=1 AND Account = @Account AND FileId = @FileId
	END

IF @IndexId <> ''
	BEGIN
		DECLARE @IndexId_CASTED int
		IF @IndexId = '^'
			BEGIN
				SET @IndexId_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @IndexId_CASTED = CAST(@IndexId AS int)
			END

		UPDATE tblImage
			SET IndexId = @IndexId_CASTED
		WHERE 1=1 AND Account = @Account AND FileId = @FileId
	END

IF @OriginalDEOffset <> ''
	BEGIN
		DECLARE @OriginalDEOffset_CASTED int
		IF @OriginalDEOffset = '^'
			BEGIN
				SET @OriginalDEOffset_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @OriginalDEOffset_CASTED = CAST(@OriginalDEOffset AS int)
			END

		UPDATE tblImage
			SET OriginalDEOffset = @OriginalDEOffset_CASTED
		WHERE 1=1 AND Account = @Account AND FileId = @FileId
	END

IF @OriginFileNum <> ''
	BEGIN
		DECLARE @OriginFileNum_CASTED int
		IF @OriginFileNum = '^'
			BEGIN
				SET @OriginFileNum_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @OriginFileNum_CASTED = CAST(@OriginFileNum AS int)
			END

		UPDATE tblImage
			SET OriginFileNum = @OriginFileNum_CASTED
		WHERE 1=1 AND Account = @Account AND FileId = @FileId
	END

IF @TiffFileOffsetFront <> ''
	BEGIN
		DECLARE @TiffFileOffsetFront_CASTED int
		IF @TiffFileOffsetFront = '^'
			BEGIN
				SET @TiffFileOffsetFront_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @TiffFileOffsetFront_CASTED = CAST(@TiffFileOffsetFront AS int)
			END

		UPDATE tblImage
			SET TiffFileOffsetFront = @TiffFileOffsetFront_CASTED
		WHERE 1=1 AND Account = @Account AND FileId = @FileId
	END

IF @TiffFileSizeFront <> ''
	BEGIN
		DECLARE @TiffFileSizeFront_CASTED int
		IF @TiffFileSizeFront = '^'
			BEGIN
				SET @TiffFileSizeFront_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @TiffFileSizeFront_CASTED = CAST(@TiffFileSizeFront AS int)
			END

		UPDATE tblImage
			SET TiffFileSizeFront = @TiffFileSizeFront_CASTED
		WHERE 1=1 AND Account = @Account AND FileId = @FileId
	END

IF @TiffFileOffsetBack <> ''
	BEGIN
		DECLARE @TiffFileOffsetBack_CASTED int
		IF @TiffFileOffsetBack = '^'
			BEGIN
				SET @TiffFileOffsetBack_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @TiffFileOffsetBack_CASTED = CAST(@TiffFileOffsetBack AS int)
			END

		UPDATE tblImage
			SET TiffFileOffsetBack = @TiffFileOffsetBack_CASTED
		WHERE 1=1 AND Account = @Account AND FileId = @FileId
	END

IF @TiffFileSizeBack <> ''
	BEGIN
		DECLARE @TiffFileSizeBack_CASTED int
		IF @TiffFileSizeBack = '^'
			BEGIN
				SET @TiffFileSizeBack_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @TiffFileSizeBack_CASTED = CAST(@TiffFileSizeBack AS int)
			END

		UPDATE tblImage
			SET TiffFileSizeBack = @TiffFileSizeBack_CASTED
		WHERE 1=1 AND Account = @Account AND FileId = @FileId
	END

IF @TiffWidthBack <> ''
	BEGIN
		DECLARE @TiffWidthBack_CASTED int
		IF @TiffWidthBack = '^'
			BEGIN
				SET @TiffWidthBack_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @TiffWidthBack_CASTED = CAST(@TiffWidthBack AS int)
			END

		UPDATE tblImage
			SET TiffWidthBack = @TiffWidthBack_CASTED
		WHERE 1=1 AND Account = @Account AND FileId = @FileId
	END

IF @TiffLengthBack <> ''
	BEGIN
		DECLARE @TiffLengthBack_CASTED int
		IF @TiffLengthBack = '^'
			BEGIN
				SET @TiffLengthBack_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @TiffLengthBack_CASTED = CAST(@TiffLengthBack AS int)
			END

		UPDATE tblImage
			SET TiffLengthBack = @TiffLengthBack_CASTED
		WHERE 1=1 AND Account = @Account AND FileId = @FileId
	END

IF @TiffWidthFront <> ''
	BEGIN
		DECLARE @TiffWidthFront_CASTED int
		IF @TiffWidthFront = '^'
			BEGIN
				SET @TiffWidthFront_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @TiffWidthFront_CASTED = CAST(@TiffWidthFront AS int)
			END

		UPDATE tblImage
			SET TiffWidthFront = @TiffWidthFront_CASTED
		WHERE 1=1 AND Account = @Account AND FileId = @FileId
	END

IF @TiffLengthFront <> ''
	BEGIN
		DECLARE @TiffLengthFront_CASTED int
		IF @TiffLengthFront = '^'
			BEGIN
				SET @TiffLengthFront_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @TiffLengthFront_CASTED = CAST(@TiffLengthFront AS int)
			END

		UPDATE tblImage
			SET TiffLengthFront = @TiffLengthFront_CASTED
		WHERE 1=1 AND Account = @Account AND FileId = @FileId
	END

IF @TiffEncoding <> ''
	BEGIN
		DECLARE @TiffEncoding_CASTED int
		IF @TiffEncoding = '^'
			BEGIN
				SET @TiffEncoding_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @TiffEncoding_CASTED = CAST(@TiffEncoding AS int)
			END

		UPDATE tblImage
			SET TiffEncoding = @TiffEncoding_CASTED
		WHERE 1=1 AND Account = @Account AND FileId = @FileId
	END

GO
/****** Object:  StoredProcedure [dbo].[sp_Filesxlate_chkimgs_Delete]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_Filesxlate_chkimgs_Delete]
	@FileID int
AS

DELETE FROM tblImageFile
WHERE 1=1 AND FileID = @FileID

GO
/****** Object:  StoredProcedure [dbo].[sp_Filesxlate_chkimgs_DeleteAll]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_Filesxlate_chkimgs_DeleteAll]
	@Account int
AS

DELETE FROM tblImageFile
WHERE 1=1

GO
/****** Object:  StoredProcedure [dbo].[sp_Filesxlate_chkimgs_Insert]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_Filesxlate_chkimgs_Insert]
	@FileID int OUTPUT,
	@Account int,
	@Available char(1)
AS

INSERT INTO tblImageFile
(Available)
VALUES
(@Available)

SELECT @FileID = SCOPE_IDENTITY()

GO
/****** Object:  StoredProcedure [dbo].[sp_Filesxlate_chkimgs_InsertIfNew]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_Filesxlate_chkimgs_InsertIfNew]
	@FileID int OUTPUT,
	@Account int,
	@Available char(1)
AS

IF NOT EXISTS (SELECT * FROM tblImageFile WHERE 1=1)
	BEGIN
		INSERT INTO tblImageFile
		(Available)
		VALUES
		(@Available)

		SELECT @FileID = SCOPE_IDENTITY()
	END
ELSE	BEGIN
		UPDATE tblImageFile SET
			Available = @Available
		WHERE 1=1

		SELECT TOP 1 @FileID = FileID FROM tblImageFile
		WHERE 1=1
		ORDER BY FileID DESC
	END

GO
/****** Object:  StoredProcedure [dbo].[sp_Filesxlate_chkimgs_Select]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_Filesxlate_chkimgs_Select]
	@FileID int
AS

SELECT * FROM tblImageFile
WHERE 1=1 AND FileID = @FileID

GO
/****** Object:  StoredProcedure [dbo].[sp_Filesxlate_chkimgs_SelectAll]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_Filesxlate_chkimgs_SelectAll]
	@Account int
AS

EXEC sp_Filesxlate_HJ_tblImageFileSelectAll @Account

GO
/****** Object:  StoredProcedure [dbo].[sp_Filesxlate_chkimgs_Update]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_Filesxlate_chkimgs_Update]
	@FileID int,
	@Account int,
	@Available varchar(1)
AS

IF @Available <> ''
	BEGIN
		DECLARE @Available_CASTED char(1)
		IF @Available = '^'
			BEGIN
				SET @Available_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @Available_CASTED = CAST(@Available AS char(1))
			END

		UPDATE tblImageFile
			SET Available = @Available_CASTED
		WHERE 1=1 AND FileID = @FileID
	END

GO
/****** Object:  StoredProcedure [dbo].[sp_Filesxlate_HJ_MemberNoticesSelectAll]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Bob G
-- Create date: 1/28/10
-- Description:	hijacked for files
-- =============================================
CREATE PROCEDURE [dbo].[sp_Filesxlate_HJ_MemberNoticesSelectAll]
	-- Add the parameters for the stored procedure here
	@FileID INT = 0,
	@Account Varchar(20) = '0'
AS

IF @Account IS NULL
	BEGIN
		SET @Account = '0'
	END
	ELSE IF @Account = ''
	BEGIN
		SET @Account = '0'
	END
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
SELECT TOP 5 MN.FileID, (SELECT FileName FROM NotificationFile WHERE NotificationFile.FileID = MN.FileID) AS FileName, MN.Account, MN.NotificationID, MN.NotificationType, MN.Pages, MN.StartDate, MN.EndDate, MN.BinaryData 
FROM NotificationFile AS NF
LEFT JOIN MemberNotices AS MN ON MN.FileID = NF.FileID
WHERE NF.GroupFileID = @Fileid
	AND (@Account = '0' OR (@Account <> '0' AND Account = @Account))
ORDER BY NewID() 
END

GO
/****** Object:  StoredProcedure [dbo].[sp_Filesxlate_HJ_NotificationsSelectAll]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Bob G
-- Create date: 1/28/10
-- Description:	hijacked for files udt
-- =============================================
CREATE PROCEDURE [dbo].[sp_Filesxlate_HJ_NotificationsSelectAll]
	-- Add the parameters for the stored procedure here
	@NotificationType CHAR(1000) = '',
	@Account VARCHAR(20) = '0'
AS

IF @Account IS NULL
	BEGIN
		SET @Account = '0'
	END
	ELSE IF @Account = ''
	BEGIN
		SET @Account = '0'
	END
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
    -- Insert statements for procedure here

	DECLARE @NotificationTypes AS TABLE
(
	Id int,
	Data char(16),
	PRIMARY KEY (Data) 
)

INSERT INTO @NotificationTypes
(
Id,
Data		
)
SELECT NT.Id, NT.Data From fn_Split(@NotificationType, ',') NT


IF @Account = '0' 
	
	BEGIN
	SELECT FR.FileID, FR.AlertID, FR.Available, FR.NoticePending, REPLACE(FR.NotificationType, 'IRS', '') as NotificationType, StatementTotal
	FROM
	(
		SELECT Top 1000 NF.GroupFileID AS FileID, NF.AlertID, NF.Available, NF.NoticePending, MN.NotificationType AS NotificationType, COUNT(NF.FileID) AS StatementTotal
		FROM NotificationFile AS NF 
		LEFT JOIN MemberNotices AS MN ON MN.FileID = NF.FileID INNER JOIN fn_Split(@NotificationType, ',') NT ON NT.data = MN.NotificationType
		WHERE  NF.Available IN ('I','P','V','Y')
		GROUP BY NF.GroupFileID, NF.AlertID, NF.Available, NF.NoticePending, MN.NotificationType
		ORDER BY NF.GroupFileID DESC
		) FR
		ORDER BY FR.FileID DESC
	END
	
ELSE
	BEGIN
		SELECT FR.FileID, FR.AlertID, FR.Available, FR.NoticePending, REPLACE(FR.NotificationType, 'IRS', '') as NotificationType, StatementTotal
		FROM
		(
			SELECT TOP 1000 NF.GroupFileID AS FileID, NF.AlertID, NF.Available, NF.NoticePending, MN.NotificationType AS NotificationType, COUNT(*) AS StatementTotal
			FROM NotificationFile AS NF 
			LEFT JOIN MemberNotices AS MN ON MN.FileID = NF.FileID INNER JOIN @NotificationTypes NT ON NT.data = MN.NotificationType
			WHERE (MN.Account = @Account) 	
				AND NF.Available IN ('I','P','V','Y')
			GROUP BY NF.GroupFileID, NF.AlertID, NF.Available, NF.NoticePending, MN.NotificationType
			ORDER BY NF.GroupFileID DESC
		) FR
		ORDER BY FR.FileID DESC
	END
END
	
--SELECT * FROM fn_Split(@NotificationType, ',') AS NotificationTypesTable
/*SELECT DISTINCT NF.GroupFileID AS FileID, NF.AlertID, NF.Available, NF.NoticePending, REPLACE(MN.NotificationType, 'IRS', '') AS NotificationType, COUNT(*) AS StatementTotal
FROM NotificationFile AS NF 
LEFT JOIN MemberNotices AS MN ON MN.FileID = NF.FileID 
WHERE (@Account = '0' OR MN.Account = @Account) 
	AND (MN.NotificationType = @NotificationType) or (Contains(MN.NotificationType + ',', @NotificationType))
	AND NF.Available IN ('I','P','V','Y')
GROUP BY NF.GroupFileID, NF.AlertID, NF.Available, NF.NoticePending, MN.NotificationType
ORDER BY FileID DESC


END*/

GO
/****** Object:  StoredProcedure [dbo].[sp_Filesxlate_HJ_tblImageFileSelectAll]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Bob G
-- Create date: 1/28/10
-- Description:	hijacked for files
-- =============================================
CREATE PROCEDURE [dbo].[sp_Filesxlate_HJ_tblImageFileSelectAll] 
	-- Add the parameters for the stored procedure here
	@Account INT = 0
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
SELECT DISTINCT IMF.fileid, IMF.available
FROM tblImageFile AS IMF
LEFT JOIN tblImage AS IMD ON IMD.FileID = IMF.FileID
WHERE IMF.available IN('Y','I','P')
	AND (@Account = 0 OR (@Account <> 0 AND IMD.Account = @Account))
ORDER BY IMF.fileid DESC
END
GO
/****** Object:  StoredProcedure [dbo].[sp_Filesxlate_HJ_tblImageSelect]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Bob G
-- Create date: 1/28/10
-- Description:	hijacked for files to get check image records
-- =============================================
CREATE PROCEDURE [dbo].[sp_Filesxlate_HJ_tblImageSelect] 
	-- Add the parameters for the stored procedure here
	@Account INT = 0,
	@FileID INT = 0
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
SELECT TOP 5 fileid, indexid, account, suffix, sltype, checknumber, checkamount 
FROM tblImage AS IMF
WHERE Fileid = @FileID
	AND (@Account = 0 OR (@Account <> 0 AND Account = @Account))
ORDER BY newid() END
GO
/****** Object:  StoredProcedure [dbo].[sp_Filesxlate_HJ_tblImageSelectAll]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Bob G
-- Create date: 1/28/10
-- Description:	hijacked for files to get check image records
-- =============================================
CREATE PROCEDURE [dbo].[sp_Filesxlate_HJ_tblImageSelectAll] 
	-- Add the parameters for the stored procedure here
	@Account int = 0,
	@FileID INT = 0
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
SELECT TOP 5 fileid, indexid, account, suffix, sltype, checknumber, checkamount 
FROM tblImage AS IMF
WHERE Fileid = @FileID
	AND (@Account = 0 OR (@Account <> 0 AND Account = @Account))
ORDER BY newid() END
GO
/****** Object:  StoredProcedure [dbo].[sp_Filesxlate_Notification_Delete]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_Filesxlate_Notification_Delete]
	@NotificationID int
AS

DELETE FROM MemeberNotices
WHERE 1=1 AND NotificationID = @NotificationID

GO
/****** Object:  StoredProcedure [dbo].[sp_Filesxlate_Notification_DeleteAll]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_Filesxlate_Notification_DeleteAll]
	@FileID int
AS

DELETE FROM MemeberNotices
WHERE 1=1 AND FileID = @FileID

GO
/****** Object:  StoredProcedure [dbo].[sp_Filesxlate_Notification_Insert]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_Filesxlate_Notification_Insert]
	@NotificationID int OUTPUT,
	@NotificationType char(16),
	@Account varchar(20),
	@SSN char(9),
	@FileID int,
	@StartDate datetime,
	@EndDate datetime,
	@StartByte int,
	@EndByte int,
	@Pages smallint,
	@BinaryData char(10)
AS

INSERT INTO MemeberNotices
(FileID, NotificationType, Account, SSN, StartDate, EndDate, StartByte, EndByte, Pages, BinaryData)
VALUES
(@FileID, @NotificationType, @Account, @SSN, @StartDate, @EndDate, @StartByte, @EndByte, @Pages, @BinaryData)

SELECT @NotificationID = @@IDENTITY FROM MemeberNotices
GO
/****** Object:  StoredProcedure [dbo].[sp_Filesxlate_Notification_InsertIfNew]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_Filesxlate_Notification_InsertIfNew]
	@NotificationID int OUTPUT,
	@NotificationType char(16),
	@Account varchar(20),
	@SSN char(9),
	@FileID int,
	@StartDate datetime,
	@EndDate datetime,
	@StartByte int,
	@EndByte int,
	@Pages smallint,
	@BinaryData char(10)
AS

DECLARE @Count int
SELECT @Count = COUNT(NotificationType) FROM MemeberNotices WHERE 1=1 AND FileID = @FileID

IF @Count = 0
	BEGIN
		INSERT INTO MemeberNotices
		(FileID, NotificationType, Account, SSN, StartDate, EndDate, StartByte, EndByte, Pages, BinaryData)
		VALUES
		(@FileID, @NotificationType, @Account, @SSN, @StartDate, @EndDate, @StartByte, @EndByte, @Pages, @BinaryData)

		SELECT @NotificationID = @@IDENTITY FROM MemeberNotices
	END
ELSE	BEGIN
		UPDATE MemeberNotices SET
			NotificationType = @NotificationType,
			Account = @Account,
			SSN = @SSN,
			StartDate = @StartDate,
			EndDate = @EndDate,
			StartByte = @StartByte,
			EndByte = @EndByte,
			Pages = @Pages,
			BinaryData = @BinaryData
		WHERE 1=1 AND FileID = @FileID

		SELECT TOP 1 @NotificationID = NotificationID FROM MemeberNotices
		WHERE 1=1 AND FileID = @FileID
		ORDER BY NotificationID DESC
	END
GO
/****** Object:  StoredProcedure [dbo].[sp_Filesxlate_Notification_Select]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_Filesxlate_Notification_Select]
	@NotificationID int
AS

SELECT * FROM MemeberNotices
WHERE 1=1 AND NotificationID = @NotificationID

GO
/****** Object:  StoredProcedure [dbo].[sp_Filesxlate_Notification_SelectAll]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_Filesxlate_Notification_SelectAll]
	@FileID INT,
	@Account Varchar(20)
AS

EXEC sp_Filesxlate_HJ_MemberNoticesSelectAll @FileID, @Account

GO
/****** Object:  StoredProcedure [dbo].[sp_Filesxlate_Notification_Update]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_Filesxlate_Notification_Update]
	@NotificationID int,
	@NotificationType varchar(16),
	@Account varchar(100),
	@SSN varchar(11),
	@FileID varchar(100),
	@StartDate varchar(100),
	@EndDate varchar(100),
	@StartByte varchar(100),
	@EndByte varchar(100),
	@Pages varchar(100),
	@BinaryData varchar(10)
AS

IF @FileID <> ''
	BEGIN
		DECLARE @FileID_CASTED int
		IF @FileID = '^'
			BEGIN
				SET @FileID_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @FileID_CASTED = CAST(@FileID AS int)
			END

		UPDATE MemeberNotices
			SET FileID = @FileID_CASTED
		WHERE 1=1 AND NotificationID = @NotificationID
	END

IF @NotificationType <> ''
	BEGIN
		DECLARE @NotificationType_CASTED char(16)
		IF @NotificationType = '^'
			BEGIN
				SET @NotificationType_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @NotificationType_CASTED = CAST(@NotificationType AS char(16))
			END

		UPDATE MemeberNotices
			SET NotificationType = @NotificationType_CASTED
		WHERE 1=1 AND NotificationID = @NotificationID
	END

IF @Account <> ''
	BEGIN
		DECLARE @Account_CASTED int
		IF @Account = '^'
			BEGIN
				SET @Account_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @Account_CASTED = CAST(@Account AS int)
			END

		UPDATE MemeberNotices
			SET Account = @Account_CASTED
		WHERE 1=1 AND NotificationID = @NotificationID
	END

IF @SSN <> ''
	BEGIN
		DECLARE @SSN_CASTED char(9)
		IF @SSN = '^'
			BEGIN
				SET @SSN_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @SSN_CASTED = CAST(@SSN AS char(9))
			END

		UPDATE MemeberNotices
			SET SSN = @SSN_CASTED
		WHERE 1=1 AND NotificationID = @NotificationID
	END

IF @StartDate <> ''
	BEGIN
		DECLARE @StartDate_CASTED datetime
		IF @StartDate = '^'
			BEGIN
				SET @StartDate_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @StartDate_CASTED = CAST(@StartDate AS datetime)
			END

		UPDATE MemeberNotices
			SET StartDate = @StartDate_CASTED
		WHERE 1=1 AND NotificationID = @NotificationID
	END

IF @EndDate <> ''
	BEGIN
		DECLARE @EndDate_CASTED datetime
		IF @EndDate = '^'
			BEGIN
				SET @EndDate_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @EndDate_CASTED = CAST(@EndDate AS datetime)
			END

		UPDATE MemeberNotices
			SET EndDate = @EndDate_CASTED
		WHERE 1=1 AND NotificationID = @NotificationID
	END

IF @StartByte <> ''
	BEGIN
		DECLARE @StartByte_CASTED int
		IF @StartByte = '^'
			BEGIN
				SET @StartByte_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @StartByte_CASTED = CAST(@StartByte AS int)
			END

		UPDATE MemeberNotices
			SET StartByte = @StartByte_CASTED
		WHERE 1=1 AND NotificationID = @NotificationID
	END

IF @EndByte <> ''
	BEGIN
		DECLARE @EndByte_CASTED int
		IF @EndByte = '^'
			BEGIN
				SET @EndByte_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @EndByte_CASTED = CAST(@EndByte AS int)
			END

		UPDATE MemeberNotices
			SET EndByte = @EndByte_CASTED
		WHERE 1=1 AND NotificationID = @NotificationID
	END

IF @Pages <> ''
	BEGIN
		DECLARE @Pages_CASTED smallint
		IF @Pages = '^'
			BEGIN
				SET @Pages_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @Pages_CASTED = CAST(@Pages AS smallint)
			END

		UPDATE MemeberNotices
			SET Pages = @Pages_CASTED
		WHERE 1=1 AND NotificationID = @NotificationID
	END

IF @BinaryData <> ''
	BEGIN
		DECLARE @BinaryData_CASTED char(10)
		IF @BinaryData = '^'
			BEGIN
				SET @BinaryData_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @BinaryData_CASTED = CAST(@BinaryData AS char(10))
			END

		UPDATE MemeberNotices
			SET BinaryData = @BinaryData_CASTED
		WHERE 1=1 AND NotificationID = @NotificationID
	END


GO
/****** Object:  StoredProcedure [dbo].[sp_Filesxlate_Notifications_Delete]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_Filesxlate_Notifications_Delete]
	@FileID int
AS

DELETE FROM NotificationFile
WHERE 1=1 AND GroupFileID = @FileID

GO
/****** Object:  StoredProcedure [dbo].[sp_Filesxlate_Notifications_DeleteAll]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_Filesxlate_Notifications_DeleteAll]
AS

DELETE FROM NotificationFile
WHERE 1=1

GO
/****** Object:  StoredProcedure [dbo].[sp_Filesxlate_Notifications_Insert]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_Filesxlate_Notifications_Insert]
	@FileID int OUTPUT,
	@Available char(1),
	@NoticePending char(1)
AS

INSERT INTO NotificationFile
(Available, NoticePending)
VALUES
(@Available, @NoticePending)

SELECT @FileID = @@IDENTITY FROM NotificationFile

GO
/****** Object:  StoredProcedure [dbo].[sp_Filesxlate_Notifications_InsertIfNew]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_Filesxlate_Notifications_InsertIfNew]
	@FileID int OUTPUT,
	@Available char(1),
	@NoticePending char(1)
AS

DECLARE @Count int
SELECT @Count = COUNT(Available) FROM NotificationFile WHERE 1=1

IF @Count = 0
	BEGIN
		INSERT INTO NotificationFile
		(Available, NoticePending)
		VALUES
		(@Available, @NoticePending)

		SELECT @FileID = @@IDENTITY FROM NotificationFile
	END
ELSE	BEGIN
		UPDATE NotificationFile SET
			Available = @Available,
			NoticePending = @NoticePending
		WHERE 1=1

		SELECT TOP 1 @FileID = GroupFileID FROM NotificationFile
		WHERE 1=1
		ORDER BY FileID DESC
	END

GO
/****** Object:  StoredProcedure [dbo].[sp_Filesxlate_Notifications_Select]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_Filesxlate_Notifications_Select]
	@FileID int
AS

SELECT * FROM NotificationFile
WHERE 1=1 AND GroupFileID = @FileID

GO
/****** Object:  StoredProcedure [dbo].[sp_Filesxlate_Notifications_SelectAll]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_Filesxlate_Notifications_SelectAll]
	@NotificationType CHAR(1000),
	@Account Varchar(20)
AS

EXEC sp_Filesxlate_HJ_NotificationsSelectAll @NotificationType, @Account

GO
/****** Object:  StoredProcedure [dbo].[sp_Filesxlate_Notifications_Update]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_Filesxlate_Notifications_Update]
	@FileID int,
	@Available varchar(1),
	@NoticePending varchar(1)
AS

IF @Available <> ''
	BEGIN
		DECLARE @Available_CASTED char(1)
		IF @Available = '^'
			BEGIN
				SET @Available_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @Available_CASTED = CAST(@Available AS char(1))
			END

		UPDATE NotificationFile
			SET Available = @Available_CASTED
		WHERE 1=1 AND GroupFileID = @FileID
	END

IF @NoticePending <> ''
	BEGIN
		DECLARE @NoticePending_CASTED char(1)
		IF @NoticePending = '^'
			BEGIN
				SET @NoticePending_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @NoticePending_CASTED = CAST(@NoticePending AS char(1))
			END

		UPDATE NotificationFile
			SET NoticePending = @NoticePending_CASTED
		WHERE 1=1 AND GroupFileID = @FileID
	END

GO
/****** Object:  StoredProcedure [dbo].[sp_FlagsSelect]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS OFF
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE Procedure [dbo].[sp_FlagsSelect]
	@TrackingNum int
AS

SELECT * FROM Flags
WHERE 1=1 AND TrackingNum = @TrackingNum
GO
/****** Object:  StoredProcedure [dbo].[sp_Flagsxlate_flag_Delete]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_Flagsxlate_flag_Delete]
	@Sequence int,
	@TrackingNum int
AS

DELETE FROM Flags
WHERE 1=1 AND Sequence = @Sequence AND TrackingNum = @TrackingNum

GO
/****** Object:  StoredProcedure [dbo].[sp_Flagsxlate_flag_DeleteAll]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_Flagsxlate_flag_DeleteAll]
	@Sequence int,
	@TrackingNum int
AS

DELETE FROM Flags
WHERE 1=1 AND Sequence = @Sequence AND TrackingNum = @TrackingNum

GO
/****** Object:  StoredProcedure [dbo].[sp_Flagsxlate_flag_Insert]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_Flagsxlate_flag_Insert]
	@Sequence bigint,
	@Account int,
	@Surname char(2),
	@Suffix int,
	@FlagLevel char(1),
	@FlagType char(1),
	@FlagNumber int,
	@FlagValue int,
	@FlagDate datetime,
	@LastModified datetime,
	@Processed varchar,
	@TrackingNum int,
	@ClientIP char(15),
	@WebIP char(15),
	@ClusterID int
AS

INSERT INTO Flags
(Sequence, TrackingNum, Account, Surname, Suffix, FlagLevel, FlagType, FlagNumber, FlagValue, FlagDate, LastModified, Processed, ClientIP, WebIP, ClusterID)
VALUES
(@Sequence, @TrackingNum, @Account, @Surname, @Suffix, @FlagLevel, @FlagType, @FlagNumber, @FlagValue, @FlagDate, @LastModified, @Processed, @ClientIP, @WebIP, @ClusterID)
GO
/****** Object:  StoredProcedure [dbo].[sp_Flagsxlate_flag_InsertIfNew]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_Flagsxlate_flag_InsertIfNew]
	@Sequence int,
	@Account bigint,
	@Surname char(2),
	@Suffix int,
	@FlagLevel char(1),
	@FlagType char(1),
	@FlagNumber int,
	@FlagValue int,
	@FlagDate datetime,
	@LastModified datetime,
	@Processed varchar,
	@TrackingNum int,
	@ClientIP char(15),
	@WebIP char(15),
	@ClusterID int
AS

DECLARE @Count int
SELECT @Count = COUNT(Account) FROM Flags WHERE 1=1 AND Sequence = @Sequence AND TrackingNum = @TrackingNum
IF @Count = 0
	BEGIN
		INSERT INTO Flags
		(Sequence, TrackingNum, Account, Surname, Suffix, FlagLevel, FlagType, FlagNumber, FlagValue, FlagDate, LastModified, Processed, ClientIP, WebIP, ClusterID)
		VALUES
		(@Sequence, @TrackingNum, @Account, @Surname, @Suffix, @FlagLevel, @FlagType, @FlagNumber, @FlagValue, @FlagDate, @LastModified, @Processed, @ClientIP, @WebIP, @ClusterID)
	END
ELSE	BEGIN
		UPDATE Flags SET
			Account = @Account,
			Surname = @Surname,
			Suffix = @Suffix,
			FlagLevel = @FlagLevel,
			FlagType = @FlagType,
			FlagNumber = @FlagNumber,
			FlagValue = @FlagValue,
			FlagDate = @FlagDate,
			LastModified = @LastModified,
			Processed = @Processed,
			ClientIP = @ClientIP,
			WebIP = @WebIP,
			ClusterID = @ClusterID
		WHERE 1=1 AND Sequence = @Sequence AND TrackingNum = @TrackingNum
	END
GO
/****** Object:  StoredProcedure [dbo].[sp_Flagsxlate_flag_Select]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_Flagsxlate_flag_Select]
	@Sequence int,
	@TrackingNum int
AS

SELECT * FROM Flags
WHERE 1=1 AND Sequence = @Sequence AND TrackingNum = @TrackingNum

GO
/****** Object:  StoredProcedure [dbo].[sp_Flagsxlate_flag_SelectAll]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_Flagsxlate_flag_SelectAll]
	@Sequence int,
	@TrackingNum int
AS

SELECT * FROM Flags
WHERE 1=1 AND Sequence = @Sequence AND TrackingNum = @TrackingNum

GO
/****** Object:  StoredProcedure [dbo].[sp_Flagsxlate_flag_Update]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_Flagsxlate_flag_Update]
	@Sequence int,
	@Account varchar(100),
	@Surname varchar(2),
	@Suffix varchar(100),
	@FlagLevel varchar(1),
	@FlagType varchar(1),
	@FlagNumber varchar(100),
	@FlagValue varchar(100),
	@FlagDate varchar(100),
	@LastModified varchar(100),
	@Processed varchar,
	@TrackingNum int,
	@ClientIP varchar(15),
	@WebIP varchar(15),
	@ClusterID varchar(100)
AS

IF @Account <> ''
	BEGIN
		DECLARE @Account_CASTED int
		IF @Account = '^'
			BEGIN
				SET @Account_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @Account_CASTED = CAST(@Account AS int)
			END

		UPDATE Flags
			SET Account = @Account_CASTED
		WHERE 1=1 AND Sequence = @Sequence AND TrackingNum = @TrackingNum
	END

IF @Surname <> ''
	BEGIN
		DECLARE @Surname_CASTED char(2)
		IF @Surname = '^'
			BEGIN
				SET @Surname_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @Surname_CASTED = CAST(@Surname AS char(2))
			END

		UPDATE Flags
			SET Surname = @Surname_CASTED
		WHERE 1=1 AND Sequence = @Sequence AND TrackingNum = @TrackingNum
	END

IF @Suffix <> ''
	BEGIN
		DECLARE @Suffix_CASTED int
		IF @Suffix = '^'
			BEGIN
				SET @Suffix_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @Suffix_CASTED = CAST(@Suffix AS int)
			END

		UPDATE Flags
			SET Suffix = @Suffix_CASTED
		WHERE 1=1 AND Sequence = @Sequence AND TrackingNum = @TrackingNum
	END

IF @FlagLevel <> ''
	BEGIN
		DECLARE @FlagLevel_CASTED char(1)
		IF @FlagLevel = '^'
			BEGIN
				SET @FlagLevel_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @FlagLevel_CASTED = CAST(@FlagLevel AS char(1))
			END

		UPDATE Flags
			SET FlagLevel = @FlagLevel_CASTED
		WHERE 1=1 AND Sequence = @Sequence AND TrackingNum = @TrackingNum
	END

IF @FlagType <> ''
	BEGIN
		DECLARE @FlagType_CASTED char(1)
		IF @FlagType = '^'
			BEGIN
				SET @FlagType_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @FlagType_CASTED = CAST(@FlagType AS char(1))
			END

		UPDATE Flags
			SET FlagType = @FlagType_CASTED
		WHERE 1=1 AND Sequence = @Sequence AND TrackingNum = @TrackingNum
	END

IF @FlagNumber <> ''
	BEGIN
		DECLARE @FlagNumber_CASTED int
		IF @FlagNumber = '^'
			BEGIN
				SET @FlagNumber_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @FlagNumber_CASTED = CAST(@FlagNumber AS int)
			END

		UPDATE Flags
			SET FlagNumber = @FlagNumber_CASTED
		WHERE 1=1 AND Sequence = @Sequence AND TrackingNum = @TrackingNum
	END

IF @FlagValue <> ''
	BEGIN
		DECLARE @FlagValue_CASTED int
		IF @FlagValue = '^'
			BEGIN
				SET @FlagValue_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @FlagValue_CASTED = CAST(@FlagValue AS int)
			END

		UPDATE Flags
			SET FlagValue = @FlagValue_CASTED
		WHERE 1=1 AND Sequence = @Sequence AND TrackingNum = @TrackingNum
	END

IF @FlagDate <> ''
	BEGIN
		DECLARE @FlagDate_CASTED datetime
		IF @FlagDate = '^'
			BEGIN
				SET @FlagDate_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @FlagDate_CASTED = CAST(@FlagDate AS datetime)
			END

		UPDATE Flags
			SET FlagDate = @FlagDate_CASTED
		WHERE 1=1 AND Sequence = @Sequence AND TrackingNum = @TrackingNum
	END

IF @LastModified <> ''
	BEGIN
		DECLARE @LastModified_CASTED datetime
		IF @LastModified = '^'
			BEGIN
				SET @LastModified_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @LastModified_CASTED = CAST(@LastModified AS datetime)
			END

		UPDATE Flags
			SET LastModified = @LastModified_CASTED
		WHERE 1=1 AND Sequence = @Sequence AND TrackingNum = @TrackingNum
	END

IF @Processed <> ''
	BEGIN
		DECLARE @Processed_CASTED varchar
		IF @Processed = '^'
			BEGIN
				SET @Processed_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @Processed_CASTED = CAST(@Processed AS varchar)
			END

		UPDATE Flags
			SET Processed = @Processed_CASTED
		WHERE 1=1 AND Sequence = @Sequence AND TrackingNum = @TrackingNum
	END

IF @ClientIP <> ''
	BEGIN
		DECLARE @ClientIP_CASTED char(15)
		IF @ClientIP = '^'
			BEGIN
				SET @ClientIP_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @ClientIP_CASTED = CAST(@ClientIP AS char(15))
			END

		UPDATE Flags
			SET ClientIP = @ClientIP_CASTED
		WHERE 1=1 AND Sequence = @Sequence AND TrackingNum = @TrackingNum
	END

IF @WebIP <> ''
	BEGIN
		DECLARE @WebIP_CASTED char(15)
		IF @WebIP = '^'
			BEGIN
				SET @WebIP_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @WebIP_CASTED = CAST(@WebIP AS char(15))
			END

		UPDATE Flags
			SET WebIP = @WebIP_CASTED
		WHERE 1=1 AND Sequence = @Sequence AND TrackingNum = @TrackingNum
	END

IF @ClusterID <> ''
	BEGIN
		DECLARE @ClusterID_CASTED int
		IF @ClusterID = '^'
			BEGIN
				SET @ClusterID_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @ClusterID_CASTED = CAST(@ClusterID AS int)
			END

		UPDATE Flags
			SET ClusterID = @ClusterID_CASTED
		WHERE 1=1 AND Sequence = @Sequence AND TrackingNum = @TrackingNum
	END

GO
/****** Object:  StoredProcedure [dbo].[sp_GetNextFileID]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[sp_GetNextFileID]
AS
/******************************************************************************
**		File: 
**		Name: sp_GetNextFileID
**		Desc: Sequentially updates and returns the next FileID
**
**		This template can be customized:
**              
**		Return values: unique id
** 
**		Called by:   
**              
**		Parameters:
**		Input							Output
**     ----------							-----------
**
**		Auth: 
**		Date: 
*******************************************************************************
**		Change History
*******************************************************************************
**		Date:			Author:	Version		Description:
**		--------		--------	-------		-------------------------------------------
**		11/4/09			Troy C		1.0.0
*******************************************************************************/
Declare @FID int
BEGIN

			UPDATE NextNotificationID SET @FID = FileID + 1, FileID = @FID
			
			return @FID
			
/*	SET NOCOUNT ON */
END

GO
/****** Object:  StoredProcedure [dbo].[sp_GetNextNotificationID]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[sp_GetNextNotificationID]
AS
/******************************************************************************
**		File: 
**		Name: sp_GetNextNotificationID
**		Desc: Sequentially updates and returns the next NotificationID
**
**		This template can be customized:
**              
**		Return values: unique id
** 
**		Called by:   
**              
**		Parameters:
**		Input							Output
**     ----------							-----------
**
**		Auth: 
**		Date: 
*******************************************************************************
**		Change History
*******************************************************************************
**		Date:			Author:	Version		Description:
**		--------		--------	-------		-------------------------------------------
**		11/4/09			Troy C		1.0.0
*******************************************************************************/
Declare @NID int
BEGIN

			UPDATE NextNotificationID SET @NID = NotificationID + 1, NotificationID = @NID
			
			return @NID
			
/*	SET NOCOUNT ON */
END

GO
/****** Object:  StoredProcedure [dbo].[sp_GetNextTrackingNum]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_GetNextTrackingNum]
AS
/******************************************************************************
**		File: 
**		Name: sp_GetNextTrackingNum
**		Desc: Sequentially updates and returns the next trackingnumber
**
**		This template can be customized:
**              
**		Return values: unique id
** 
**		Called by:   
**              
**		Parameters:
**		Input							Output
**     ----------							-----------
**
**		Auth: 
**		Date: 
*******************************************************************************
**		Change History
*******************************************************************************
**		Date:			Author:	Version		Description:
**		--------		--------	-------		-------------------------------------------
**    12/12/06		Bob G			1.0.0
*******************************************************************************/
Declare @PK int
BEGIN
			UPDATE NextTrackingNum SET @PK = TrackingNum + 1, TrackingNum = @PK
			
			return @PK
			
/*	SET NOCOUNT ON */
END
GO
/****** Object:  StoredProcedure [dbo].[sp_GetNoticeFileName]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS OFF
GO
SET QUOTED_IDENTIFIER OFF
GO

CREATE Procedure [dbo].[sp_GetNoticeFileName]
	/* Param List */
 	@FileID int

AS

/******************************************************************************
**		File: 
**		Name:  sp_CheckMetaDataSelect
**		Desc: 
**
**		This template can be customized:
**              
**		Return values:
** 
**		Called by:   
**              
**		Parameters:
**		Input							Output
**     ----------							-----------
**
**		Auth: 
**		Date: 
*******************************************************************************
**		Change History
*******************************************************************************
**		Date:		Author:				Description:
**		--------		--------				-------------------------------------------
**    
*******************************************************************************/
   SELECT * FROM NotificationFile WHERE (FileID = @FileID)
GO
/****** Object:  StoredProcedure [dbo].[sp_HomeBankingAccountAliasSelect]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS OFF
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_HomeBankingAccountAliasSelect]
(
	@ACCOUNTNUMBER int
)
AS
	BEGIN
	SELECT * FROM  HOMEBANKINGACCOUNTALIAS WHERE ACCOUNTNUMBER = @ACCOUNTNUMBER
	END

GO
/****** Object:  StoredProcedure [dbo].[sp_InternalAccessAccessCategories]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS OFF
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE Procedure [dbo].[sp_InternalAccessAccessCategories]
	/* Param List */
AS

/******************************************************************************
**		File: 
**		Name: sp_InternalAccessAccessCategories
**		Desc: 
**
**		This template can be customized:
**              
**		Return values:
** 
**		Called by:   
**              
**		Parameters:
**		Input							Output
**     ----------							-----------
**
**		Auth: 
**		Date: 
*******************************************************************************
**		Change History
*******************************************************************************
**		Date:		Author:				Description:
**		--------		--------				-------------------------------------------
**    
*******************************************************************************/

SET NOCOUNT ON
	SELECT DISTINCT AccessCategory, CategoryDesc FROM AccessFlags
	ORDER BY AccessCategory
SET NOCOUNT OFF
GO
/****** Object:  StoredProcedure [dbo].[sp_InternalAccessAccessFlags]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE Procedure [dbo].[sp_InternalAccessAccessFlags]
	/* Param List */
	@AccessCategory  char (20) = '',
	@AccessName  char (40) = '',
	@Teller char(3) = ''
AS

/******************************************************************************
**		File: 
**		Name: sp_InternalAccessAccessFlags
**		Desc: 
**
**		This template can be customized:
**              
**		Return values:
** 
**		Called by:   
**              
**		Parameters:
**		Input							Output
**     ----------							-----------
**
**		Auth: 
**		Date: 
*******************************************************************************
**		Change History
*******************************************************************************
**		Date:		Author:				Description:
**		--------		--------				-------------------------------------------
**    
*******************************************************************************/

SET NOCOUNT ON
	BEGIN
	IF (@Teller <> '')      
		IF (@AccessCategory <> '')
			SELECT -1 AS TrackingNum, 
			@Teller AS Teller, 
			AccessCategory, AccessName, AccessType, 
			'Y' AS AccessValue 
			FROM AccessFlags
			WHERE (AccessCategory = @AccessCategory AND AccessType = 'bool')
			UNION ALL
			SELECT -1 AS TrackingNum, 
			@Teller AS Teller, 
			AccessCategory, AccessName, AccessType, 
			(SELECT AccessValue FROM x_InternalAccess WHERE Teller = @Teller AND AccessCategory = AF.AccessCategory AND AccessName = AF.AccessName) AS AccessValue 
			FROM AccessFlags AF
			WHERE (AccessCategory = @AccessCategory AND AccessType != 'bool')			
			ORDER BY AccessCategory
		ELSE
			SELECT -1 AS TrackingNum, 
			@Teller AS Teller, 
			AccessCategory, AccessName, AccessType, 
			'Y' AS AccessValue 
			FROM AccessFlags
			WHERE AccessType = 'bool'
			UNION ALL
			SELECT -1 AS TrackingNum, 
			@Teller AS Teller, 
			AccessCategory, AccessName, AccessType, 
			(SELECT AccessValue FROM x_InternalAccess WHERE Teller = @Teller AND AccessCategory = AF.AccessCategory AND AccessName = AF.AccessName) AS AccessValue 
			FROM AccessFlags AF
			WHERE AccessType != 'bool'
			ORDER BY AccessCategory	
	ELSE
		IF ((@AccessCategory <> '') AND (@AccessName <> ''))
			SELECT * 
			FROM AccessFlags 
			WHERE AccessCategory = @AccessCategory AND AccessName = @AccessName
			ORDER BY AccessCategory
		ELSE IF (@AccessCategory <> '')
			SELECT * FROM AccessFlags WHERE AccessCategory = @AccessCategory
			ORDER BY AccessCategory
		ELSE
			SELECT * FROM AccessFlags
			ORDER BY AccessCategory
	END
SET NOCOUNT OFF


GO
/****** Object:  StoredProcedure [dbo].[sp_InternalAccessLogTeller]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE Procedure [dbo].[sp_InternalAccessLogTeller]
	/* Param List */
  @TellerInitial  char (3),
  @SessionID  char (20)
AS
/******************************************************************************
**		File: 
**		Name: sp_InternalAccessLogTeller
**		Desc: 
**
**		This template can be customized:
**              
**		Return values:
** 
**		Called by:   
**              
**		Parameters:
**		Input							Output
**     ----------							-----------
**
**		Auth: 
**		Date: 
*******************************************************************************
**		Change History
*******************************************************************************
**		Date:		Author:				Description:
**		--------		--------				-------------------------------------------
**    
*******************************************************************************/
SET NOCOUNT ON
IF NOT EXISTS ( SELECT * FROM TellerSession WHERE TellerInitial = @TellerInitial )
  INSERT INTO TellerSession
  (TellerInitial, SessionID)
  VALUES
  (@TellerInitial, @SessionID)
ELSE
  UPDATE TellerSession
  SET SessionID = @SessionID
  WHERE TellerInitial = @TellerInitial 
SET NOCOUNT OFF
GO
/****** Object:  StoredProcedure [dbo].[sp_InternalAccessSelectTellerAccess]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE Procedure [dbo].[sp_InternalAccessSelectTellerAccess]
	/* Param List */
  @TrackingNum  int = 0,
  @Teller  char (50) = '',
  @AccessCategory  char (20) = '',
  @AccessName  char (40) = '',
  @AccessType  char (10) = '',
  @AccessValue  char (500) = ''
AS
  DECLARE @sSql varchar(4000)
/******************************************************************************
**		File: 
**		Name: sp_InternalAccessSelectTellerAccess
**		Desc: 
**
**		This template can be customized:
**              
**		Return values:
** 
**		Called by:   
**              
**		Parameters:
**		Input							Output
**     ----------							-----------
**
**		Auth: 
**		Date: 
*******************************************************************************
**		Change History
*******************************************************************************
**		Date:		Author:				Description:
**		--------		--------				-------------------------------------------
**    
*******************************************************************************/
SET NOCOUNT ON
  IF (@AccessCategory <> '') AND (@AccessName <> '') AND (@AccessValue <> '')
    SELECT * 
    FROM x_InternalAccess 
    WHERE RTRIM(AccessCategory) = @AccessCategory 
    AND RTRIM(AccessName) = @AccessName 
    AND RTRIM(AccessValue) = @AccessValue
    AND RTRIM(Teller) = @Teller
  ELSE IF (@Teller <> '') AND (@AccessCategory <> '')
	SELECT x_InternalAccess.*, UserTable.UserName 
	FROM x_InternalAccess LEFT OUTER JOIN UserTable ON x_InternalAccess.Teller = UserTable.Initials
	WHERE RTRIM(Teller) = @Teller
	AND RTRIM(AccessCategory) = @AccessCategory
	ORDER BY Teller, AccessCategory
  ELSE IF (@Teller <> '')
	SELECT x_InternalAccess.*, UserTable.UserName 
	FROM x_InternalAccess LEFT OUTER JOIN UserTable ON x_InternalAccess.Teller = UserTable.Initials
	WHERE RTRIM(Teller) = @Teller
	ORDER BY Teller, AccessCategory
  ELSE IF (@AccessCategory <> '')
	SELECT x_InternalAccess.*, UserTable.UserName
	FROM x_InternalAccess LEFT OUTER JOIN UserTable ON x_InternalAccess.Teller = UserTable.Initials
	WHERE RTRIM(AccessCategory) = @AccessCategory
	ORDER BY Teller, AccessCategory	
  ELSE
	SELECT x_InternalAccess.*, UserTable.UserName 
    FROM x_InternalAccess LEFT OUTER JOIN UserTable ON x_InternalAccess.Teller = UserTable.Initials
	ORDER BY Teller, AccessCategory

SET NOCOUNT OFF
GO
/****** Object:  StoredProcedure [dbo].[sp_InternalAccessUpdateAccess]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE Procedure [dbo].[sp_InternalAccessUpdateAccess]
	(@TrackingNum 	int,
	 @Teller 	char,
	 @AccessCategory 	char,
	 @AccessName 	char,
	 @AccessType 	char,
	 @AccessValue 	char,
	 @AddDate 	datetime,
	 @ChangeDate 	datetime)
AS
/******************************************************************************
**		File: 
**		Name: sp_InternalAccessUpdateAccess
**		Desc: 
**
**		This template can be customized:
**              
**		Return values:
** 
**		Called by:   
**              
**		Parameters:
**		Input							Output
**     ----------							-----------
**
**		Auth: 
**		Date: 
*******************************************************************************
**		Change History
*******************************************************************************
**		Date:		Author:				Description:
**		--------		--------				-------------------------------------------
**    
*******************************************************************************/
SET NOCOUNT ON
IF (@TrackingNum > 0)
  UPDATE ims.dbo.x_InternalAccess
  SET  Teller	 = @Teller,
	  AccessCategory	 = @AccessCategory,
	  AccessName	 = @AccessName,
	  AccessType	 = @AccessType,
	  AccessValue	 = @AccessValue,
	  AddDate	 = @AddDate,
	  ChangeDate	 = @ChangeDate
  WHERE 
  (TrackingNum	 = @TrackingNum)
ELSE
  INSERT INTO ims.dbo.x_InternalAccess 
	  ( TrackingNum,
	  Teller,
	  AccessCategory,
	  AccessName,
	  AccessType,
	  AccessValue,
	  AddDate,
	  ChangeDate) 
  VALUES 
	  ( @TrackingNum,
	  @Teller,
	  @AccessCategory,
	  @AccessName,
	  @AccessType,
	  @AccessValue,
	  @AddDate,
	  @ChangeDate)
SET NOCOUNT OFF
GO
/****** Object:  StoredProcedure [dbo].[sp_InternalAccessUpdateTellerAccess]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE Procedure [dbo].[sp_InternalAccessUpdateTellerAccess]
	(@TrackingNum 		int,
	@Teller				char (50) = '',
	@AccessCategory		char (20) = '',
	@AccessName			char (40) = '',
	@AccessType			char (10) = '',
	@AccessValue		char (500) = '',
	@AddDate 			datetime = NULL,
	@ChangeDate 		datetime = NULL)
AS

/******************************************************************************
**		File: 
**		Name: sp_InternalAccessUpdateTellerAccess
**		Desc: 
**
**		This template can be customized:
**              
**		Return values:
** 
**		Called by:   
**              
**		Parameters:
**		Input							Output
**     ----------							-----------
**
**		Auth: 
**		Date: 
*******************************************************************************
**		Change History
*******************************************************************************
**		Date:		Author:				Description:
**		--------		--------				-------------------------------------------
**    
*******************************************************************************/
SET NOCOUNT ON

IF @Teller <> ''
BEGIN
	SELECT * 
	FROM dbo.x_InternalAccess
	WHERE 
		Teller = @Teller AND
		AccessCategory = @AccessCategory AND  
		AccessName = @AccessName
		
	IF (@@ROWCOUNT > 0)
	  UPDATE dbo.x_InternalAccess
	  SET TrackingNum		= @TrackingNum,
		  Teller			= @Teller,
		  AccessCategory	= @AccessCategory,
		  AccessName		= @AccessName,
		  AccessType		= @AccessType,
		  AccessValue		= @AccessValue,
		  ChangeDate		= @ChangeDate
	  WHERE 
		Teller = @Teller AND 
		AccessCategory = @AccessCategory AND  
		AccessName = @AccessName
	ELSE
	  INSERT INTO dbo.x_InternalAccess 
		  ( TrackingNum,
		  Teller,
		  AccessCategory,
		  AccessName,
		  AccessType,
		  AccessValue,
		  AddDate) 
	  VALUES 
		  ( @TrackingNum,
		  @Teller,
		  @AccessCategory,
		  @AccessName,
		  @AccessType,
		  @AccessValue,
		  @AddDate)
END

SET NOCOUNT OFF
GO
/****** Object:  StoredProcedure [dbo].[sp_InternalAccessUpdateTellerInfo]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE Procedure [dbo].[sp_InternalAccessUpdateTellerInfo]
	/* Param List */
	@Action  char(20),
  @Teller  char (50),
  @UserName	char(24) = '', 
  @Password  char (50) = '',
  @ClientIP  char (15) = '',
  @WebIP  char (15) = '',
  @ClusterID  char (10) = ''
AS

/******************************************************************************
**		File: 
**		Name: sp_InternalAccessUpdateTellerInfo
**		Desc: 
**
**		This template can be customized:
**              
**		Return values:
** 
**		Called by:   
**              
**		Parameters:
**		Input							Output
**     ----------							-----------
**
**		Auth: 
**		Date: 
*******************************************************************************
**		Change History
*******************************************************************************
**		Date:		Author:				Description:
**		--------		--------				-------------------------------------------
**    
*******************************************************************************/

SET NOCOUNT ON
IF (RTRIM(@Action) = 'D') or (RTRIM(@Action) = 'REMOVE_ALL_ACCESS')
BEGIN
  DELETE FROM udt_AdminTable
  WHERE Teller = @Teller
  
  IF (@Action = 'REMOVE_ALL_ACCESS')
  BEGIN
    DELETE FROM x_InternalAccess
    WHERE Teller = @Teller  
  END
END
ELSE
BEGIN
  IF NOT EXISTS (SELECT * FROM udt_AdminTable WHERE Teller = @Teller)
  BEGIN
    INSERT INTO udt_AdminTable (Teller, Password, ClientIP, WebIP, ClusterID, LastModified) 
    VALUES 
    (@Teller, @Password, @ClientIP, @WebIP, @ClusterID, GetDate())
  END
  ELSE
  BEGIN
    UPDATE udt_AdminTable
    SET Password = @Password, 
    ClientIP = @ClientIP, 
    WebIP = @WebIP, 
    ClusterID = @ClusterID, 
    LastModified = GetDate()
    WHERE Teller = @Teller  
  END
END

SET NOCOUNT OFF
GO
/****** Object:  StoredProcedure [dbo].[sp_InternalAccessValidateTeller]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE Procedure [dbo].[sp_InternalAccessValidateTeller]
	/* Param List */
  @Teller  char (3),
  @Password  char (20),
  @LookInUser int = 1,
  @isValid char (1) output
AS
/******************************************************************************
**		File: 
**		Name: sp_InternalAccessValidateTeller
**		Desc: 
**
**		This template can be customized:
**              
**		Return values:
** 
**		Called by:   
**              
**		Parameters:
**		Input							Output
**     ----------							-----------
**
**		Auth: 
**		Date: 
*******************************************************************************
**		Change History
*******************************************************************************
**		Date:		Author:				Description:
**		--------		--------				-------------------------------------------
**    
*******************************************************************************/
IF (@LookInUser = 1)
BEGIN
  IF EXISTS(SELECT * FROM UserTable WHERE Initials = @Teller AND Password = @Password) 
    SET @isValid = 'Y'
  ELSE
    SET @isValid = 'N'
END
ELSE
BEGIN
  IF EXISTS(SELECT * FROM udt_AdminTable WHERE Teller = @Teller AND Password = @Password) 
    SET @isValid = 'Y'
  ELSE
    SET @isValid = 'N'
END
GO
/****** Object:  StoredProcedure [dbo].[sp_MemberNoticesSelect]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_MemberNoticesSelect]
    /* Input Parameters */
    @NotificationType NVarchar(100) = null,
    @NotificationID NVarchar(100) = null,
    @NotificationAvail NVarchar(100) = null,
    @Account Varchar(20) = null,
	@IsLegacy bit = null,
    @SSN Varchar(11) = null
        
AS
    Set NoCount ON
    /* Variable Declaration */
	Declare @monthLimit as int;
	set @monthLimit = (select top 1 cast(isNull(x.itemValue, 0) as int) from x_APPConfig x where itemcontext = 'any' and itemname = 'EstatementPullLimit')
	

    Declare @SQLQuery AS Varchar(4000)
    Declare @ParamDefinition AS NVarchar(2000) 
    /* Build the Transact-SQL String with the input parameters */ 
    Set @SQLQuery = 'SELECT     dbo.MemberNotices.*, dbo.NotificationFile.FileName, dbo.NotificationFile.Available, dbo.NotificationFile.BinaryData BData FROM dbo.MemberNotices INNER JOIN dbo.NotificationFile ON dbo.MemberNotices.FileID = dbo.NotificationFile.FileID WHERE 1=1 ' 
    /* check for the condition and build the WHERE clause accordingly */
	
	if @monthLimit is not null
	begin
		declare @date varchar(20); set @date = DateAdd(month, -1* @monthLimit, GETUTCDATE())
		Set @SQLQuery = @SQLQuery + ' And StartDate >= ''' + cast(DATEPART(year, @date)as varchar(4))  + '/' + cast(DATEPART(MONTH, @date)as varchar(4))  + '/' + cast(DATEPART(DAY, @date)as varchar(4))  + ''' '

	end

    If @NotificationType Is Not Null 
         Set @SQLQuery = @SQLQuery + ' And (NotificationType IN (''' +  replace(@NotificationType,',',''',''') + '''))'

    If @NotificationID Is Not Null
         Set @SQLQuery = @SQLQuery + ' And (NotificationID IN (''' + replace(@NotificationID,',',''',''') + '''))' 
  
    If @NotificationAvail Is Not Null
         Set @SQLQuery = @SQLQuery + ' And (NotificationFile.Available IN (''' + replace(@NotificationAvail,',',''',''') + '''))'
  
    If @Account Is Not Null
         Set @SQLQuery = @SQLQuery + ' And (MemberNotices.Account = ''' + @Account + ''')'

    If @SSN Is Not Null
         Set @SQLQuery = @SQLQuery + ' And (MemberNotices.SSN = @SSN)'
	If exists(select * from sys.columns where Name = N'IsLegacy' and Object_ID = Object_ID(N'dbo.MemberNotices'))
	begin
		/*We only care if IsLegacy = 1.  All MemberNotices marked with IsLegacy of 0 or null are assumed not to be legacy accounts.  
		Legacy accounts are marked with a 1 if they are from before a core migration.*/
		If (@IsLegacy = 0 or @IsLegacy Is Null)
			Set @SQLQuery = @SQLQuery + 'And (MemberNotices.IsLegacy = @IsLegacy Or MemberNotices.IsLegacy Is Null)'
		Else
			Set @SQLQuery = @SQLQuery + 'And (MemberNotices.IsLegacy = @IsLegacy)'
	end

Set @SQLQuery = @SQLQuery + ' ORDER BY dbo.MemberNotices.EndDate DESC, dbo.MemberNotices.NotificationType'

  Set @ParamDefinition =      ' @NotificationType NVarchar(100),
                @NotificationID NVarchar(100),
                @NotificationAvail NVarchar(100),
                @Account VarChar(20),
				@IsLegacy bit,
                @SSN Varchar(11)'

/*PRINT(@SQLQuery)*/

    Execute sp_Executesql     @SQLQuery, 
                @ParamDefinition, 
                @NotificationType, 
                @NotificationID, 
                @NotificationAvail, 
                @Account,
				@IsLegacy, 
                @SSN

/*EXECUTE(@SQLQuery)*/
GO
/****** Object:  StoredProcedure [dbo].[sp_MSLFlagsSelect]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS OFF
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE Procedure [dbo].[sp_MSLFlagsSelect]
	@Account bigint
AS

SELECT * FROM Flags
WHERE 1=2 AND Account = @Account
GO
/****** Object:  StoredProcedure [dbo].[sp_PromoNotification]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS OFF
GO
SET QUOTED_IDENTIFIER OFF
GO

CREATE Procedure [dbo].[sp_PromoNotification]
	/* Param List */
	@StartDate DateTime
AS
/******************************************************************************
**		File: 
**		Name: sp_PromoNotification
**		Desc: 
**
**		This template can be customized:
**              
**		Return values:
** 
**		Called by:   
**              
**		Parameters:
**		Input							Output
**     ----------							-----------
**
**		Auth: 
**		Date: 
*******************************************************************************
**		Change History
*******************************************************************************
**		Date:		Author:				Description:
**		--------		--------				-------------------------------------------
**    
*******************************************************************************/
SET NOCOUNT ON
	SELECT     dbo.Promotions.PromoId, dbo.Promotions.PromoName, dbo.Promotions.StopDate, dbo.Promotions.Location, dbo.Promotions.StartDate, 
                      dbo.Promotions.SmallImage, dbo.Promotions.LargeImage, dbo.Promotions.Sequence, dbo.Promotions.ExternalWindow, 
                      dbo.Promotions.MaxViewCountInternal, dbo.Promotions.MaxViewCountExternal, dbo.Promotions.Description, dbo.PromoGroup.GroupName
	FROM         dbo.PromoGroup INNER JOIN
                      dbo.Promotions ON dbo.Promotions.PromoName = dbo.PromoGroup.GroupName
	WHERE     (dbo.PromoGroup.GroupName = 'STATEMENT') AND (dbo.Promotions.StartDate =  CONVERT(NVARCHAR(20),@StartDate)   )

SET NOCOUNT OFF
GO
/****** Object:  StoredProcedure [dbo].[sp_PublishNotices_DeleteImageFile]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_PublishNotices_DeleteImageFile]
	@FileID int
AS

DELETE tblImageFile
WHERE fileid = @FileID

GO
/****** Object:  StoredProcedure [dbo].[sp_PublishNotices_DeleteNotificationFile]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_PublishNotices_DeleteNotificationFile]
	@FileID int
AS

DELETE MemberNotices
WHERE FileID IN (SELECT FileID FROM NotificationFile WHERE GroupFileID = @FileID)

DELETE NotificationFile
WHERE GroupFileID = @FileID

GO
/****** Object:  StoredProcedure [dbo].[sp_PublishNotices_GetImageFile]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_PublishNotices_GetImageFile]
	@FileID int = 0
AS

IF (@FileID = 0)
	SELECT * FROM tblImageFile
ELSE
	SELECT * FROM tblImageFile
	WHERE fileid= @FileID

GO
/****** Object:  StoredProcedure [dbo].[sp_PublishNotices_GetNotice]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_PublishNotices_GetNotice]
	@StatementType char(20),
	@Teller varchar(50) = '',
	@FileID int = 0,
	@Notificationid int = 0,
	@Account bigint = 0
AS


SELECT * FROM x_PublishNotices
WHERE statementtype = @StatementType AND (@Teller = '' OR teller = @Teller) AND (@FileID = 0 OR fileid = @FileID) AND (@Notificationid = 0 OR Notificationid = @Notificationid) AND (@Account = 0 OR account = @Account)
order by executetime
GO
/****** Object:  StoredProcedure [dbo].[sp_PublishNotices_GetNotificationFile]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_PublishNotices_GetNotificationFile]
	@FileID INT = 0
AS

IF (@FileID = 0)
	SELECT * FROM NotificationFile
ELSE
	SELECT * FROM NotificationFile
	WHERE GroupFileID = @FileID

GO
/****** Object:  StoredProcedure [dbo].[sp_PublishNotices_UpdateImageFile]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_PublishNotices_UpdateImageFile]
	@FileID int,
	@Available char(1)
AS

UPDATE tblImageFile
SET Available = @Available
WHERE fileid= @FileID

GO
/****** Object:  StoredProcedure [dbo].[sp_PublishNotices_UpdateNotificationFile]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_PublishNotices_UpdateNotificationFile]
	@FileID INT,
	@Available CHAR(1),
	@NoticePending CHAR(1),
	@AlertID CHAR(32)
AS

UPDATE NotificationFile
SET Available = @Available, NoticePending = @NoticePending, AlertID = @AlertID
WHERE GroupFileID= @FileID
GO
/****** Object:  StoredProcedure [dbo].[sp_PublishNoticesxlate_Notice_Delete]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_PublishNoticesxlate_Notice_Delete]
	@TrackingNum int
AS

DELETE FROM x_PublishNotices
WHERE 1=1 AND TrackingNum = @TrackingNum

GO
/****** Object:  StoredProcedure [dbo].[sp_PublishNoticesxlate_Notice_DeleteAll]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_PublishNoticesxlate_Notice_DeleteAll]
	@TrackingNum int
AS

DELETE FROM x_PublishNotices
WHERE 1=1 AND TrackingNum = @TrackingNum

GO
/****** Object:  StoredProcedure [dbo].[sp_PublishNoticesxlate_Notice_Insert]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_PublishNoticesxlate_Notice_Insert]
	@TrackingNum int,
	@Teller varchar(50),
	@Notes char(200),
	@FileID int,
	@NotificationID int,
	@AlertID char(100),
	@StatementType char(20),
	@NewAvailable char(1),
	@OldAvailable char(1),
	@NewNoticePending char(1),
	@OldNoticePending char(1),
	@Action char(2),
	@Account bigint,
	@ExecuteTime datetime
AS

INSERT INTO x_PublishNotices
(TrackingNum, Teller, Notes, FileID, NotificationID, AlertID, StatementType, NewAvailable, OldAvailable, NewNoticePending, OldNoticePending, Action, Account, ExecuteTime)
VALUES
(@TrackingNum, @Teller, @Notes, @FileID, @NotificationID, @AlertID, @StatementType, @NewAvailable, @OldAvailable, @NewNoticePending, @OldNoticePending, @Action, @Account, @ExecuteTime)

GO
/****** Object:  StoredProcedure [dbo].[sp_PublishNoticesxlate_Notice_InsertIfNew]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_PublishNoticesxlate_Notice_InsertIfNew]
	@TrackingNum int,
	@Teller varchar(50),
	@Notes char(200),
	@FileID int,
	@NotificationID int,
	@AlertID char(100),
	@StatementType char(20),
	@NewAvailable char(1),
	@OldAvailable char(1),
	@NewNoticePending char(1),
	@OldNoticePending char(1),
	@Action char(2),
	@Account bigint,
	@ExecuteTime datetime
AS

IF NOT EXISTS (SELECT * FROM x_PublishNotices WHERE 1=1 AND TrackingNum = @TrackingNum)
	BEGIN
		INSERT INTO x_PublishNotices
		(TrackingNum, Teller, Notes, FileID, NotificationID, AlertID, StatementType, NewAvailable, OldAvailable, NewNoticePending, OldNoticePending, Action, Account, ExecuteTime)
		VALUES
		(@TrackingNum, @Teller, @Notes, @FileID, @NotificationID, @AlertID, @StatementType, @NewAvailable, @OldAvailable, @NewNoticePending, @OldNoticePending, @Action, @Account, @ExecuteTime)
	END
ELSE	BEGIN
		UPDATE x_PublishNotices SET
			Teller = @Teller,
			Notes = @Notes,
			FileID = @FileID,
			NotificationID = @NotificationID,
			AlertID = @AlertID,
			StatementType = @StatementType,
			NewAvailable = @NewAvailable,
			OldAvailable = @OldAvailable,
			NewNoticePending = @NewNoticePending,
			OldNoticePending = @OldNoticePending,
			Action = @Action,
			Account = @Account,
			ExecuteTime = @ExecuteTime
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

GO
/****** Object:  StoredProcedure [dbo].[sp_PublishNoticesxlate_Notice_Select]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_PublishNoticesxlate_Notice_Select]
	@TrackingNum int
AS

SELECT * FROM x_PublishNotices
WHERE 1=1 AND TrackingNum = @TrackingNum

GO
/****** Object:  StoredProcedure [dbo].[sp_PublishNoticesxlate_Notice_SelectAll]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_PublishNoticesxlate_Notice_SelectAll]
	@TrackingNum int
AS

SELECT * FROM x_PublishNotices
WHERE 1=1 AND TrackingNum = @TrackingNum

GO
/****** Object:  StoredProcedure [dbo].[sp_PublishNoticesxlate_Notice_Update]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_PublishNoticesxlate_Notice_Update]
	@TrackingNum int,
	@Teller varchar(50),
	@Notes varchar(200),
	@FileID varchar(100),
	@NotificationID varchar(100),
	@AlertID varchar(100),
	@StatementType varchar(20),
	@NewAvailable varchar(1),
	@OldAvailable varchar(1),
	@NewNoticePending varchar(1),
	@OldNoticePending varchar(1),
	@Action varchar(2),
	@Account varchar(100),
	@ExecuteTime varchar(100)
AS

IF @Teller <> ''
	BEGIN
		DECLARE @Teller_CASTED varchar(50)
		IF @Teller = '^'
			BEGIN
				SET @Teller_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @Teller_CASTED = CAST(@Teller AS varchar(50))
			END

		UPDATE x_PublishNotices
			SET Teller = @Teller_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @Notes <> ''
	BEGIN
		DECLARE @Notes_CASTED char(200)
		IF @Notes = '^'
			BEGIN
				SET @Notes_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @Notes_CASTED = CAST(@Notes AS char(200))
			END

		UPDATE x_PublishNotices
			SET Notes = @Notes_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @FileID <> ''
	BEGIN
		DECLARE @FileID_CASTED int
		IF @FileID = '^'
			BEGIN
				SET @FileID_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @FileID_CASTED = CAST(@FileID AS int)
			END

		UPDATE x_PublishNotices
			SET FileID = @FileID_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @NotificationID <> ''
	BEGIN
		DECLARE @NotificationID_CASTED int
		IF @NotificationID = '^'
			BEGIN
				SET @NotificationID_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @NotificationID_CASTED = CAST(@NotificationID AS int)
			END

		UPDATE x_PublishNotices
			SET NotificationID = @NotificationID_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @AlertID <> ''
	BEGIN
		DECLARE @AlertID_CASTED char(100)
		IF @AlertID = '^'
			BEGIN
				SET @AlertID_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @AlertID_CASTED = CAST(@AlertID AS char(100))
			END

		UPDATE x_PublishNotices
			SET AlertID = @AlertID_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @StatementType <> ''
	BEGIN
		DECLARE @StatementType_CASTED char(20)
		IF @StatementType = '^'
			BEGIN
				SET @StatementType_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @StatementType_CASTED = CAST(@StatementType AS char(20))
			END

		UPDATE x_PublishNotices
			SET StatementType = @StatementType_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @NewAvailable <> ''
	BEGIN
		DECLARE @NewAvailable_CASTED char(1)
		IF @NewAvailable = '^'
			BEGIN
				SET @NewAvailable_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @NewAvailable_CASTED = CAST(@NewAvailable AS char(1))
			END

		UPDATE x_PublishNotices
			SET NewAvailable = @NewAvailable_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @OldAvailable <> ''
	BEGIN
		DECLARE @OldAvailable_CASTED char(1)
		IF @OldAvailable = '^'
			BEGIN
				SET @OldAvailable_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @OldAvailable_CASTED = CAST(@OldAvailable AS char(1))
			END

		UPDATE x_PublishNotices
			SET OldAvailable = @OldAvailable_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @NewNoticePending <> ''
	BEGIN
		DECLARE @NewNoticePending_CASTED char(1)
		IF @NewNoticePending = '^'
			BEGIN
				SET @NewNoticePending_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @NewNoticePending_CASTED = CAST(@NewNoticePending AS char(1))
			END

		UPDATE x_PublishNotices
			SET NewNoticePending = @NewNoticePending_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @OldNoticePending <> ''
	BEGIN
		DECLARE @OldNoticePending_CASTED char(1)
		IF @OldNoticePending = '^'
			BEGIN
				SET @OldNoticePending_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @OldNoticePending_CASTED = CAST(@OldNoticePending AS char(1))
			END

		UPDATE x_PublishNotices
			SET OldNoticePending = @OldNoticePending_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @Action <> ''
	BEGIN
		DECLARE @Action_CASTED char(2)
		IF @Action = '^'
			BEGIN
				SET @Action_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @Action_CASTED = CAST(@Action AS char(2))
			END

		UPDATE x_PublishNotices
			SET Action = @Action_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @Account <> ''
	BEGIN
		DECLARE @Account_CASTED bigint
		IF @Account = '^'
			BEGIN
				SET @Account_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @Account_CASTED = CAST(@Account AS bigint)
			END

		UPDATE x_PublishNotices
			SET Account = @Account_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @ExecuteTime <> ''
	BEGIN
		DECLARE @ExecuteTime_CASTED datetime
		IF @ExecuteTime = '^'
			BEGIN
				SET @ExecuteTime_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @ExecuteTime_CASTED = CAST(@ExecuteTime AS datetime)
			END

		UPDATE x_PublishNotices
			SET ExecuteTime = @ExecuteTime_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

GO
/****** Object:  StoredProcedure [dbo].[sp_PublishNoticesxlateUUID_Notice_Delete]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_PublishNoticesxlateUUID_Notice_Delete]
	@TrackingNum int
AS

DELETE FROM x_PublishNotices
WHERE 1=1 AND TrackingNum = @TrackingNum

GO
/****** Object:  StoredProcedure [dbo].[sp_PublishNoticesxlateUUID_Notice_DeleteAll]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_PublishNoticesxlateUUID_Notice_DeleteAll]
	@TrackingNum int
AS

DELETE FROM x_PublishNotices
WHERE 1=1 AND TrackingNum = @TrackingNum

GO
/****** Object:  StoredProcedure [dbo].[sp_PublishNoticesxlateUUID_Notice_Select]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_PublishNoticesxlateUUID_Notice_Select]
	@TrackingNum int
AS

SELECT * FROM x_PublishNotices
WHERE 1=1 AND TrackingNum = @TrackingNum

GO
/****** Object:  StoredProcedure [dbo].[sp_PublishNoticesxlateUUID_Notice_SelectAll]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_PublishNoticesxlateUUID_Notice_SelectAll]
	@TrackingNum int
AS

SELECT * FROM x_PublishNotices
WHERE 1=1 AND TrackingNum = @TrackingNum

GO
/****** Object:  StoredProcedure [dbo].[sp_SSODelete]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS OFF
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE PROCEDURE [dbo].[sp_SSODelete]
	(
		@GUID UNIQUEIDENTIFIER 
	)
AS
/* v 1.0.0 */
BEGIN
	SET NOCOUNT ON
	SELECT * FROM udt_SingleSignOn WHERE GUID = @GUID
	
	DELETE udt_SingleSignOn WHERE SetDateTime < DATEADD(hh, - 1, GETDATE())
		 
	DELETE FROM udt_SingleSignOn Where GUID = @GUID
	RETURN 
END
GO
/****** Object:  StoredProcedure [dbo].[sp_SSOInsert]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS OFF
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE PROCEDURE [dbo].[sp_SSOInsert]
	(
		@Account Varchar(MAX) = 0, 
		@LegacyIDs Varchar(MAX) = ''
	)
/* v 1.0.0 */
AS
BEGIN
DECLARE @UniqueId as UNIQUEIDENTIFIER
SET NOCOUNT ON
	SET @UniqueId = NEWID()
--	INSERT INTO udt_SingleSignOn (Account, GUID, RefAccount, PIN, SetDateTime) VALUES (@Account, @UniqueId, @RefAccount, @PIN, GetDate())
	INSERT INTO udt_SingleSignOn (Account, GUID, SetDateTime, LegacyIDs) VALUES (@Account, @UniqueId, GetDate(), @LegacyIDs)
	
	SELECT * FROM udt_SingleSignOn Where Account = @Account and GUID = @UniqueId
	RETURN 
END
GO
/****** Object:  StoredProcedure [dbo].[sp_StmtEmail_CheckStatus]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE Procedure [dbo].[sp_StmtEmail_CheckStatus]
	/* Param List */

AS

/******************************************************************************
**		File: 
**		Name:  sp_StmtEmail_CheckStatus
**		Desc: 
**
**		This template can be customized:
**              
**		Return values:
** 
**		Called by:   
**              
**		Parameters:
**		Input							Output
**		----------							-----------
**
**		Auth: 
**		Date: 
*******************************************************************************
**		Change History
*******************************************************************************
**		Date:		Author:				Description:
**		--------		--------				-------------------------------------------
**    
*******************************************************************************/
   SELECT * FROM NotificationFile WHERE (NoticePending = 'Y' AND Available = 'Y') ORDER BY FileID
GO
/****** Object:  StoredProcedure [dbo].[sp_StmtEmail_GatherEmails]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE Procedure [dbo].[sp_StmtEmail_GatherEmails]
	/* Param List */
	@FileId int

AS

/******************************************************************************
**		File: 
**		Name:  sp_StmtEmail_GatherEmails
**		Desc: 
**
**		This template can be customized:
**              
**		Return values:
** 
**		Called by:   
**              
**		Parameters:
**		Input							Output
**		----------							-----------
**
**		Auth: 
**		Date: 
*******************************************************************************
**		Change History
*******************************************************************************
**		Date:		Author:				Description:
**		--------		--------				-------------------------------------------
**    
*******************************************************************************/

/*
	Required fields to be returned are:
	MNAccount	-- Populated from MemberNotices.Account OR TempTable.Account
	Email1		-- Populated from MemberFile.Email1 OR TempTable.Email1
	NotificationID	-- Pouplated from MemberNotices.NotificationID OR set to 0 if MemberNotices table not being used.
	NotificationType	-- Pouplated from MemberNotices.NotificationType OR TempTable.GroupType OR set to '' if MemberNotices table not being used.
*/

/*
--	Sample SQL #1
	SELECT MF.*, MN.NotificationID, MN.NotificationType, MN.EndDate, MN.Account AS MNAccount
	FROM MemberNotices MN
	LEFT JOIN MemberFile MF ON MF.Account = MN.Account 
	WHERE MN.FileID = @FileID AND MN.NoticePending = 'Y'
*/

/*
--	Sample SQL #2
	SELECT TT.Account, TT.Email1, 0 AS NotificationID, TT.GroupType AS NotificationType
	FROM TempTable TT
*/

	SELECT MF.*, MN.NotificationID, MN.NotificationType, MN.EndDate, MN.Account AS MNAccount
	FROM MemberNotices MN
	LEFT JOIN MemberFile MF ON MF.Account = MN.Account 
	WHERE MN.FileID = @FileID
	AND MN.NoticePending = 'Y'
	AND (
		 SELECT COUNT(Account) AS NoEmailDesired
		 FROM         MSLFlags
		 WHERE     (FlagNumber = 68) AND (FlagValue = 1) AND (Account = MN.Account)
		) = 0
GO
/****** Object:  StoredProcedure [dbo].[sp_StmtEmail_GetAccountByEmail]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_StmtEmail_GetAccountByEmail] 
	/* Param List */
	@Email CHAR(60)

AS

/******************************************************************************
**		File: 
**		Name:  sp_StmtEmail_GetAccountByEmail
**		Desc: 
**
**		This template can be customized:
**              
**		Return values:
** 
**		Called by:   
**              
**		Parameters:
**		Input							Output
**		----------							-----------
**
**		Auth: 
**		Date: 
*******************************************************************************
**		Change History
*******************************************************************************
**		Date:		Author:				Description:
**		--------		--------				-------------------------------------------
**    
*******************************************************************************/
	--UPDATE MemberNotices
	--SET NoticePending = 'E'
	--WHERE SentEmail LIKE '%' + @Email + '%'

	SELECT Account
	FROM MemberFile
	WHERE Email1 LIKE '%' + @Email + '%'
GO
/****** Object:  StoredProcedure [dbo].[sp_StmtEmail_SetMemberNoticeStatus]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE Procedure [dbo].[sp_StmtEmail_SetMemberNoticeStatus]
	/* Param List */
	@NotificationID INT,
	@NoticePending CHAR(1),
	@SentDate DATETIME,
	@SentEmail CHAR(200)

AS

/******************************************************************************
**		File: 
**		Name:  sp_StmtEmail_SetMemberNoticeStatus
**		Desc: 
**
**		This template can be customized:
**              
**		Return values:
** 
**		Called by:   
**              
**		Parameters:
**		Input							Output
**		----------							-----------
**
**		Auth: 
**		Date: 
*******************************************************************************
**		Change History
*******************************************************************************
**		Date:		Author:				Description:
**		--------		--------				-------------------------------------------
**    
*******************************************************************************/
	UPDATE MemberNotices
	SET NoticePending = @NoticePending, SentDate = @SentDate, SentEmail = @SentEmail, SendCount = 1
	WHERE NotificationID = @NotificationID
GO
/****** Object:  StoredProcedure [dbo].[sp_StmtEmail_SetNotificationStatus]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE Procedure [dbo].[sp_StmtEmail_SetNotificationStatus]
	/* Param List */
	@FileId int

AS

/******************************************************************************
**		File: 
**		Name:  sp_StmtEmail_SetNotificationStatus
**		Desc: 
**
**		This template can be customized:
**              
**		Return values:
** 
**		Called by:   
**              
**		Parameters:
**		Input							Output
**		----------							-----------
**
**		Auth: 
**		Date: 
*******************************************************************************
**		Change History
*******************************************************************************
**		Date:		Author:				Description:
**		--------		--------				-------------------------------------------
**    
*******************************************************************************/
	UPDATE NotificationFile
	SET NoticePending = 'N'
	WHERE FileID = @FileID
GO
/****** Object:  StoredProcedure [dbo].[sp_STMTImport_MemberNotices_Update]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




CREATE Procedure [dbo].[sp_STMTImport_MemberNotices_Update]
	@NotificationID int,
	@NotificationType char(16),
	@Account varchar(20),
	@FileID int,
	@StartDate datetime,
	@EndDate datetime,
	@StartByte int,
	@EndByte int,
	@Pages int,
	@SSN char(11),
	@NoticePending char(1),
	@SLType char(1),
	@Suffix int,
	@StartPage int,
	@BinaryData char(10)
AS 
/******************************************************************************
**		File: 
**		Name: sp_STMTImport_MemberNotices_Update
**		Desc: Updates the MemberNotices table with a new statement notification
**
**		This template can be customized:
**              
**		Return values: unique id
** 
**		Called by:   
**              
**		Parameters:
**		Input							Output
**     ----------							-----------
**
**		Auth: 
**		Date: 
*******************************************************************************
**		Change History
*******************************************************************************
**		Date:			Author:	Version		Description:
**		--------		--------	-------		-------------------------------------------
**		11/20/09		Troy C		1.0.0
*******************************************************************************/

BEGIN
	delete from MemberNotices 
		Where 
			NotificationType = @NotificationType 
			And Account = @Account 
			And StartDate = @StartDate 
			And SLType = @SLType 
			And Suffix = @Suffix
	
	insert MemberNotices
		(NotificationID,
		NotificationType,
		Account,
		FileID,
		StartDate,
		EndDate,
		StartByte,
		EndByte,
		Pages,
		SSN,
		NoticePending,
		SLType,
		Suffix,
		StartPage,
		BinaryData) 
		Values
		(@NotificationID,
		@NotificationType,
		@Account,
		@FileID,
		@StartDate,
		@EndDate,
		@StartByte,
		@EndByte,
		@Pages,
		@SSN,
		@NoticePending,
		@SLType,
		@Suffix,
		@StartPage,
		@BinaryData)
END
GO
/****** Object:  StoredProcedure [dbo].[sp_STMTImport_NotificationFile_InsertNew]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




CREATE Procedure [dbo].[sp_STMTImport_NotificationFile_InsertNew]
	@GroupFileID int,
	@FileID int,
	@FileName char(255),
	@Available char(1),
	@NoticePending char(1)
AS
/******************************************************************************
**		File: 
**		Name: sp_STMTImport_NotificationFile_InsertNew
**		Desc: Inserts a new record into the NotificationFile table
**
**		This template can be customized:
**              
**		Return values: unique id
** 
**		Called by:   
**              
**		Parameters:
**		Input							Output
**     ----------							-----------
**
**		Auth: 
**		Date: 
*******************************************************************************
**		Change History
*******************************************************************************
**		Date:			Author:	Version		Description:
**		--------		--------	-------		-------------------------------------------
**		11/20/09		Troy C		1.0.0
*******************************************************************************/

BEGIN
	DELETE FROM NotificationFile
	WHERE GroupFileID = @GroupFileID AND FileID = @FileID

	INSERT INTO NotificationFile
		(GroupFileID, FileID,FileName,Available,NoticePending)
		VALUES
		(@GroupFileID, @FileID, @FileName, @Available, @NoticePending)
END



GO
/****** Object:  StoredProcedure [dbo].[sp_SymAddressChangexlate_flag_Delete]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_SymAddressChangexlate_flag_Delete]
	@Sequence int,
	@TrackingNum int
AS

DELETE FROM SymFlags
WHERE 1=1 AND Sequence = @Sequence AND TrackingNum = @TrackingNum

GO
/****** Object:  StoredProcedure [dbo].[sp_SymAddressChangexlate_flag_DeleteAll]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_SymAddressChangexlate_flag_DeleteAll]
	@Sequence int,
	@TrackingNum int
AS

DELETE FROM SymFlags
WHERE 1=1 AND Sequence = @Sequence AND TrackingNum = @TrackingNum

GO
/****** Object:  StoredProcedure [dbo].[sp_SymAddressChangexlate_flag_Insert]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_SymAddressChangexlate_flag_Insert]
	@Sequence int,
	@Account bigint,
	@Surname char(2),
	@Suffix int,
	@FlagLevel char(1),
	@FlagType char(1),
	@FlagNumber int,
	@FlagValue int,
	@FlagDate datetime,
	@LastModified datetime,
	@Processed varchar,
	@TrackingNum int,
	@ClientIP char(15),
	@WebIP char(15),
	@ClusterID int
AS

INSERT INTO SymFlags
(Sequence, TrackingNum, Account, Surname, Suffix, FlagLevel, FlagType, FlagNumber, FlagValue, FlagDate, LastModified, Processed, ClientIP, WebIP, ClusterID)
VALUES
(@Sequence, @TrackingNum, @Account, @Surname, @Suffix, @FlagLevel, @FlagType, @FlagNumber, @FlagValue, @FlagDate, @LastModified, @Processed, @ClientIP, @WebIP, @ClusterID)
GO
/****** Object:  StoredProcedure [dbo].[sp_SymAddressChangexlate_flag_InsertIfNew]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_SymAddressChangexlate_flag_InsertIfNew]
	@Sequence int,
	@Account bigint,
	@Surname char(2),
	@Suffix int,
	@FlagLevel char(1),
	@FlagType char(1),
	@FlagNumber int,
	@FlagValue int,
	@FlagDate datetime,
	@LastModified datetime,
	@Processed varchar,
	@TrackingNum int,
	@ClientIP char(15),
	@WebIP char(15),
	@ClusterID int
AS

DECLARE @Count int
SELECT @Count = COUNT(Account) FROM SymFlags WHERE 1=1 AND Sequence = @Sequence AND TrackingNum = @TrackingNum

IF @Count = 0
	BEGIN
		INSERT INTO SymFlags
		(Sequence, TrackingNum, Account, Surname, Suffix, FlagLevel, FlagType, FlagNumber, FlagValue, FlagDate, LastModified, Processed, ClientIP, WebIP, ClusterID)
		VALUES
		(@Sequence, @TrackingNum, @Account, @Surname, @Suffix, @FlagLevel, @FlagType, @FlagNumber, @FlagValue, @FlagDate, @LastModified, @Processed, @ClientIP, @WebIP, @ClusterID)
	END
ELSE	BEGIN
		UPDATE SymFlags SET
			Account = @Account,
			Surname = @Surname,
			Suffix = @Suffix,
			FlagLevel = @FlagLevel,
			FlagType = @FlagType,
			FlagNumber = @FlagNumber,
			FlagValue = @FlagValue,
			FlagDate = @FlagDate,
			LastModified = @LastModified,
			Processed = @Processed,
			ClientIP = @ClientIP,
			WebIP = @WebIP,
			ClusterID = @ClusterID
		WHERE 1=1 AND Sequence = @Sequence AND TrackingNum = @TrackingNum
	END
GO
/****** Object:  StoredProcedure [dbo].[sp_SymAddressChangexlate_flag_Select]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_SymAddressChangexlate_flag_Select]
	@Sequence int,
	@TrackingNum int
AS

SELECT * FROM SymFlags
WHERE 1=1 AND Sequence = @Sequence AND TrackingNum = @TrackingNum

GO
/****** Object:  StoredProcedure [dbo].[sp_SymAddressChangexlate_flag_SelectAll]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_SymAddressChangexlate_flag_SelectAll]
	@Sequence int,
	@TrackingNum int
AS

SELECT * FROM SymFlags
WHERE 1=1 AND Sequence = @Sequence AND TrackingNum = @TrackingNum

GO
/****** Object:  StoredProcedure [dbo].[sp_SymAddressChangexlate_flag_Update]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_SymAddressChangexlate_flag_Update]
	@Sequence int,
	@Account varchar(100),
	@Surname varchar(2),
	@Suffix varchar(100),
	@FlagLevel varchar(1),
	@FlagType varchar(1),
	@FlagNumber varchar(100),
	@FlagValue varchar(100),
	@FlagDate varchar(100),
	@LastModified varchar(100),
	@Processed varchar,
	@TrackingNum int,
	@ClientIP varchar(15),
	@WebIP varchar(15),
	@ClusterID varchar(100)
AS

IF @Account <> ''
	BEGIN
		DECLARE @Account_CASTED int
		IF @Account = '^'
			BEGIN
				SET @Account_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @Account_CASTED = CAST(@Account AS int)
			END

		UPDATE SymFlags
			SET Account = @Account_CASTED
		WHERE 1=1 AND Sequence = @Sequence AND TrackingNum = @TrackingNum
	END

IF @Surname <> ''
	BEGIN
		DECLARE @Surname_CASTED char(2)
		IF @Surname = '^'
			BEGIN
				SET @Surname_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @Surname_CASTED = CAST(@Surname AS char(2))
			END

		UPDATE SymFlags
			SET Surname = @Surname_CASTED
		WHERE 1=1 AND Sequence = @Sequence AND TrackingNum = @TrackingNum
	END

IF @Suffix <> ''
	BEGIN
		DECLARE @Suffix_CASTED int
		IF @Suffix = '^'
			BEGIN
				SET @Suffix_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @Suffix_CASTED = CAST(@Suffix AS int)
			END

		UPDATE SymFlags
			SET Suffix = @Suffix_CASTED
		WHERE 1=1 AND Sequence = @Sequence AND TrackingNum = @TrackingNum
	END

IF @FlagLevel <> ''
	BEGIN
		DECLARE @FlagLevel_CASTED char(1)
		IF @FlagLevel = '^'
			BEGIN
				SET @FlagLevel_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @FlagLevel_CASTED = CAST(@FlagLevel AS char(1))
			END

		UPDATE SymFlags
			SET FlagLevel = @FlagLevel_CASTED
		WHERE 1=1 AND Sequence = @Sequence AND TrackingNum = @TrackingNum
	END

IF @FlagType <> ''
	BEGIN
		DECLARE @FlagType_CASTED char(1)
		IF @FlagType = '^'
			BEGIN
				SET @FlagType_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @FlagType_CASTED = CAST(@FlagType AS char(1))
			END

		UPDATE SymFlags
			SET FlagType = @FlagType_CASTED
		WHERE 1=1 AND Sequence = @Sequence AND TrackingNum = @TrackingNum
	END

IF @FlagNumber <> ''
	BEGIN
		DECLARE @FlagNumber_CASTED int
		IF @FlagNumber = '^'
			BEGIN
				SET @FlagNumber_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @FlagNumber_CASTED = CAST(@FlagNumber AS int)
			END

		UPDATE SymFlags
			SET FlagNumber = @FlagNumber_CASTED
		WHERE 1=1 AND Sequence = @Sequence AND TrackingNum = @TrackingNum
	END

IF @FlagValue <> ''
	BEGIN
		DECLARE @FlagValue_CASTED int
		IF @FlagValue = '^'
			BEGIN
				SET @FlagValue_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @FlagValue_CASTED = CAST(@FlagValue AS int)
			END

		UPDATE SymFlags
			SET FlagValue = @FlagValue_CASTED
		WHERE 1=1 AND Sequence = @Sequence AND TrackingNum = @TrackingNum
	END

IF @FlagDate <> ''
	BEGIN
		DECLARE @FlagDate_CASTED datetime
		IF @FlagDate = '^'
			BEGIN
				SET @FlagDate_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @FlagDate_CASTED = CAST(@FlagDate AS datetime)
			END

		UPDATE SymFlags
			SET FlagDate = @FlagDate_CASTED
		WHERE 1=1 AND Sequence = @Sequence AND TrackingNum = @TrackingNum
	END

IF @LastModified <> ''
	BEGIN
		DECLARE @LastModified_CASTED datetime
		IF @LastModified = '^'
			BEGIN
				SET @LastModified_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @LastModified_CASTED = CAST(@LastModified AS datetime)
			END

		UPDATE SymFlags
			SET LastModified = @LastModified_CASTED
		WHERE 1=1 AND Sequence = @Sequence AND TrackingNum = @TrackingNum
	END

IF @Processed <> ''
	BEGIN
		DECLARE @Processed_CASTED varchar
		IF @Processed = '^'
			BEGIN
				SET @Processed_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @Processed_CASTED = CAST(@Processed AS varchar)
			END

		UPDATE SymFlags
			SET Processed = @Processed_CASTED
		WHERE 1=1 AND Sequence = @Sequence AND TrackingNum = @TrackingNum
	END

IF @ClientIP <> ''
	BEGIN
		DECLARE @ClientIP_CASTED char(15)
		IF @ClientIP = '^'
			BEGIN
				SET @ClientIP_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @ClientIP_CASTED = CAST(@ClientIP AS char(15))
			END

		UPDATE SymFlags
			SET ClientIP = @ClientIP_CASTED
		WHERE 1=1 AND Sequence = @Sequence AND TrackingNum = @TrackingNum
	END

IF @WebIP <> ''
	BEGIN
		DECLARE @WebIP_CASTED char(15)
		IF @WebIP = '^'
			BEGIN
				SET @WebIP_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @WebIP_CASTED = CAST(@WebIP AS char(15))
			END

		UPDATE SymFlags
			SET WebIP = @WebIP_CASTED
		WHERE 1=1 AND Sequence = @Sequence AND TrackingNum = @TrackingNum
	END

IF @ClusterID <> ''
	BEGIN
		DECLARE @ClusterID_CASTED int
		IF @ClusterID = '^'
			BEGIN
				SET @ClusterID_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @ClusterID_CASTED = CAST(@ClusterID AS int)
			END

		UPDATE SymFlags
			SET ClusterID = @ClusterID_CASTED
		WHERE 1=1 AND Sequence = @Sequence AND TrackingNum = @TrackingNum
	END

GO
/****** Object:  StoredProcedure [dbo].[sp_SymAddressChangexlate_Home_Delete]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_SymAddressChangexlate_Home_Delete]
	@TrackingNum int
AS

DELETE FROM SymAddressChangeHome
WHERE 1=1 AND TrackingNum = @TrackingNum

GO
/****** Object:  StoredProcedure [dbo].[sp_SymAddressChangexlate_Home_DeleteAll]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_SymAddressChangexlate_Home_DeleteAll]
	@TrackingNum int
AS

DELETE FROM SymAddressChangeHome
WHERE 1=1 AND TrackingNum = @TrackingNum

GO
/****** Object:  StoredProcedure [dbo].[sp_SymAddressChangexlate_Home_Insert]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_SymAddressChangexlate_Home_Insert]
	@Address1 char(30),
	@Address2 char(30),
	@Address3 char(30),
	@City char(20),
	@State char(2),
	@Zip char(9),
	@CntryCode char(2),
	@CntryName char(40),
	@AreaCode char(3),
	@Phone char(8),
	@Ext char(5),
	@CellPhoneAC char(3),
	@CellPhone char(7),
	@FaxPhoneAC char(3),
	@FaxPhone char(7),
	@PagerPhoneAC char(3),
	@PagerPhone char(7),
	@ResidenceYears int,
	@ResidenceMonths int,
	@LastModified datetime,
	@TrackingNum int,
	@Account bigint,
	@ClientIP char(15),
	@WebIP char(15),
	@ClusterID int
AS

INSERT INTO SymAddressChangeHome
(TrackingNum, Address1, Address2, Address3, City, State, Zip, CntryCode, CntryName, AreaCode, Phone, Ext, CellPhoneAC, CellPhone, FaxPhoneAC, FaxPhone, PagerPhoneAC, PagerPhone, ResidenceYears, ResidenceMonths, LastModified, Account, ClientIP, WebIP, ClusterID)
VALUES
(@TrackingNum, @Address1, @Address2, @Address3, @City, @State, @Zip, @CntryCode, @CntryName, @AreaCode, @Phone, @Ext, @CellPhoneAC, @CellPhone, @FaxPhoneAC, @FaxPhone, @PagerPhoneAC, @PagerPhone, @ResidenceYears, @ResidenceMonths, @LastModified, @Account, @ClientIP, @WebIP, @ClusterID)
GO
/****** Object:  StoredProcedure [dbo].[sp_SymAddressChangexlate_Home_InsertIfNew]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_SymAddressChangexlate_Home_InsertIfNew]
	@Address1 char(30),
	@Address2 char(30),
	@Address3 char(30),
	@City char(20),
	@State char(2),
	@Zip char(9),
	@CntryCode char(2),
	@CntryName char(40),
	@AreaCode char(3),
	@Phone char(8),
	@Ext char(5),
	@CellPhoneAC char(3),
	@CellPhone char(7),
	@FaxPhoneAC char(3),
	@FaxPhone char(7),
	@PagerPhoneAC char(3),
	@PagerPhone char(7),
	@ResidenceYears int,
	@ResidenceMonths int,
	@LastModified datetime,
	@TrackingNum int,
	@Account bigint,
	@ClientIP char(15),
	@WebIP char(15),
	@ClusterID int
AS

DECLARE @Count int
SELECT @Count = COUNT(Address1) FROM SymAddressChangeHome WHERE 1=1 AND TrackingNum = @TrackingNum

IF @Count = 0
	BEGIN
		INSERT INTO SymAddressChangeHome
		(TrackingNum, Address1, Address2, Address3, City, State, Zip, CntryCode, CntryName, AreaCode, Phone, Ext, CellPhoneAC, CellPhone, FaxPhoneAC, FaxPhone, PagerPhoneAC, PagerPhone, ResidenceYears, ResidenceMonths, LastModified, Account, ClientIP, WebIP, ClusterID)
		VALUES
		(@TrackingNum, @Address1, @Address2, @Address3, @City, @State, @Zip, @CntryCode, @CntryName, @AreaCode, @Phone, @Ext, @CellPhoneAC, @CellPhone, @FaxPhoneAC, @FaxPhone, @PagerPhoneAC, @PagerPhone, @ResidenceYears, @ResidenceMonths, @LastModified, @Account, @ClientIP, @WebIP, @ClusterID)
	END
ELSE	BEGIN
		UPDATE SymAddressChangeHome SET
			Address1 = @Address1,
			Address2 = @Address2,
			Address3 = @Address3,
			City = @City,
			State = @State,
			Zip = @Zip,
			CntryCode = @CntryCode,
			CntryName = @CntryName,
			AreaCode = @AreaCode,
			Phone = @Phone,
			Ext = @Ext,
			CellPhoneAC = @CellPhoneAC,
			CellPhone = @CellPhone,
			FaxPhoneAC = @FaxPhoneAC,
			FaxPhone = @FaxPhone,
			PagerPhoneAC = @PagerPhoneAC,
			PagerPhone = @PagerPhone,
			ResidenceYears = @ResidenceYears,
			ResidenceMonths = @ResidenceMonths,
			LastModified = @LastModified,
			Account = @Account,
			ClientIP = @ClientIP,
			WebIP = @WebIP,
			ClusterID = @ClusterID
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END
GO
/****** Object:  StoredProcedure [dbo].[sp_SymAddressChangexlate_Home_Select]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_SymAddressChangexlate_Home_Select]
	@TrackingNum int
AS

SELECT * FROM SymAddressChangeHome
WHERE 1=1 AND TrackingNum = @TrackingNum

GO
/****** Object:  StoredProcedure [dbo].[sp_SymAddressChangexlate_Home_SelectAll]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_SymAddressChangexlate_Home_SelectAll]
	@TrackingNum int
AS

SELECT * FROM SymAddressChangeHome
WHERE 1=1 AND TrackingNum = @TrackingNum

GO
/****** Object:  StoredProcedure [dbo].[sp_SymAddressChangexlate_Home_Update]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_SymAddressChangexlate_Home_Update]
	@Address1 varchar(30),
	@Address2 varchar(30),
	@Address3 varchar(30),
	@City varchar(20),
	@State varchar(2),
	@Zip varchar(9),
	@CntryCode varchar(2),
	@CntryName varchar(40),
	@AreaCode varchar(3),
	@Phone varchar(8),
	@Ext varchar(5),
	@CellPhoneAC varchar(3),
	@CellPhone varchar(7),
	@FaxPhoneAC varchar(3),
	@FaxPhone varchar(7),
	@PagerPhoneAC varchar(3),
	@PagerPhone varchar(7),
	@ResidenceYears varchar(100),
	@ResidenceMonths varchar(100),
	@LastModified varchar(100),
	@TrackingNum int,
	@Account varchar(100),
	@ClientIP varchar(15),
	@WebIP varchar(15),
	@ClusterID varchar(100)
AS

IF @Address1 <> ''
	BEGIN
		DECLARE @Address1_CASTED char(30)
		IF @Address1 = '^'
			BEGIN
				SET @Address1_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @Address1_CASTED = CAST(@Address1 AS char(30))
			END

		UPDATE SymAddressChangeHome
			SET Address1 = @Address1_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @Address2 <> ''
	BEGIN
		DECLARE @Address2_CASTED char(30)
		IF @Address2 = '^'
			BEGIN
				SET @Address2_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @Address2_CASTED = CAST(@Address2 AS char(30))
			END

		UPDATE SymAddressChangeHome
			SET Address2 = @Address2_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @Address3 <> ''
	BEGIN
		DECLARE @Address3_CASTED char(30)
		IF @Address3 = '^'
			BEGIN
				SET @Address3_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @Address3_CASTED = CAST(@Address3 AS char(30))
			END

		UPDATE SymAddressChangeHome
			SET Address3 = @Address3_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @City <> ''
	BEGIN
		DECLARE @City_CASTED char(20)
		IF @City = '^'
			BEGIN
				SET @City_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @City_CASTED = CAST(@City AS char(20))
			END

		UPDATE SymAddressChangeHome
			SET City = @City_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @State <> ''
	BEGIN
		DECLARE @State_CASTED char(2)
		IF @State = '^'
			BEGIN
				SET @State_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @State_CASTED = CAST(@State AS char(2))
			END

		UPDATE SymAddressChangeHome
			SET State = @State_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @Zip <> ''
	BEGIN
		DECLARE @Zip_CASTED char(9)
		IF @Zip = '^'
			BEGIN
				SET @Zip_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @Zip_CASTED = CAST(@Zip AS char(9))
			END

		UPDATE SymAddressChangeHome
			SET Zip = @Zip_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @CntryCode <> ''
	BEGIN
		DECLARE @CntryCode_CASTED char(2)
		IF @CntryCode = '^'
			BEGIN
				SET @CntryCode_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @CntryCode_CASTED = CAST(@CntryCode AS char(2))
			END

		UPDATE SymAddressChangeHome
			SET CntryCode = @CntryCode_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @CntryName <> ''
	BEGIN
		DECLARE @CntryName_CASTED char(40)
		IF @CntryName = '^'
			BEGIN
				SET @CntryName_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @CntryName_CASTED = CAST(@CntryName AS char(40))
			END

		UPDATE SymAddressChangeHome
			SET CntryName = @CntryName_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @AreaCode <> ''
	BEGIN
		DECLARE @AreaCode_CASTED char(3)
		IF @AreaCode = '^'
			BEGIN
				SET @AreaCode_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @AreaCode_CASTED = CAST(@AreaCode AS char(3))
			END

		UPDATE SymAddressChangeHome
			SET AreaCode = @AreaCode_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @Phone <> ''
	BEGIN
		DECLARE @Phone_CASTED char(8)
		IF @Phone = '^'
			BEGIN
				SET @Phone_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @Phone_CASTED = CAST(@Phone AS char(8))
			END

		UPDATE SymAddressChangeHome
			SET Phone = @Phone_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @Ext <> ''
	BEGIN
		DECLARE @Ext_CASTED char(5)
		IF @Ext = '^'
			BEGIN
				SET @Ext_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @Ext_CASTED = CAST(@Ext AS char(5))
			END

		UPDATE SymAddressChangeHome
			SET Ext = @Ext_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @CellPhoneAC <> ''
	BEGIN
		DECLARE @CellPhoneAC_CASTED char(3)
		IF @CellPhoneAC = '^'
			BEGIN
				SET @CellPhoneAC_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @CellPhoneAC_CASTED = CAST(@CellPhoneAC AS char(3))
			END

		UPDATE SymAddressChangeHome
			SET CellPhoneAC = @CellPhoneAC_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @CellPhone <> ''
	BEGIN
		DECLARE @CellPhone_CASTED char(7)
		IF @CellPhone = '^'
			BEGIN
				SET @CellPhone_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @CellPhone_CASTED = CAST(@CellPhone AS char(7))
			END

		UPDATE SymAddressChangeHome
			SET CellPhone = @CellPhone_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @FaxPhoneAC <> ''
	BEGIN
		DECLARE @FaxPhoneAC_CASTED char(3)
		IF @FaxPhoneAC = '^'
			BEGIN
				SET @FaxPhoneAC_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @FaxPhoneAC_CASTED = CAST(@FaxPhoneAC AS char(3))
			END

		UPDATE SymAddressChangeHome
			SET FaxPhoneAC = @FaxPhoneAC_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @FaxPhone <> ''
	BEGIN
		DECLARE @FaxPhone_CASTED char(7)
		IF @FaxPhone = '^'
			BEGIN
				SET @FaxPhone_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @FaxPhone_CASTED = CAST(@FaxPhone AS char(7))
			END

		UPDATE SymAddressChangeHome
			SET FaxPhone = @FaxPhone_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @PagerPhoneAC <> ''
	BEGIN
		DECLARE @PagerPhoneAC_CASTED char(3)
		IF @PagerPhoneAC = '^'
			BEGIN
				SET @PagerPhoneAC_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @PagerPhoneAC_CASTED = CAST(@PagerPhoneAC AS char(3))
			END

		UPDATE SymAddressChangeHome
			SET PagerPhoneAC = @PagerPhoneAC_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @PagerPhone <> ''
	BEGIN
		DECLARE @PagerPhone_CASTED char(7)
		IF @PagerPhone = '^'
			BEGIN
				SET @PagerPhone_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @PagerPhone_CASTED = CAST(@PagerPhone AS char(7))
			END

		UPDATE SymAddressChangeHome
			SET PagerPhone = @PagerPhone_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @ResidenceYears <> ''
	BEGIN
		DECLARE @ResidenceYears_CASTED int
		IF @ResidenceYears = '^'
			BEGIN
				SET @ResidenceYears_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @ResidenceYears_CASTED = CAST(@ResidenceYears AS int)
			END

		UPDATE SymAddressChangeHome
			SET ResidenceYears = @ResidenceYears_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @ResidenceMonths <> ''
	BEGIN
		DECLARE @ResidenceMonths_CASTED int
		IF @ResidenceMonths = '^'
			BEGIN
				SET @ResidenceMonths_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @ResidenceMonths_CASTED = CAST(@ResidenceMonths AS int)
			END

		UPDATE SymAddressChangeHome
			SET ResidenceMonths = @ResidenceMonths_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @LastModified <> ''
	BEGIN
		DECLARE @LastModified_CASTED datetime
		IF @LastModified = '^'
			BEGIN
				SET @LastModified_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @LastModified_CASTED = CAST(@LastModified AS datetime)
			END

		UPDATE SymAddressChangeHome
			SET LastModified = @LastModified_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @Account <> ''
	BEGIN
		DECLARE @Account_CASTED int
		IF @Account = '^'
			BEGIN
				SET @Account_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @Account_CASTED = CAST(@Account AS int)
			END

		UPDATE SymAddressChangeHome
			SET Account = @Account_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @ClientIP <> ''
	BEGIN
		DECLARE @ClientIP_CASTED char(15)
		IF @ClientIP = '^'
			BEGIN
				SET @ClientIP_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @ClientIP_CASTED = CAST(@ClientIP AS char(15))
			END

		UPDATE SymAddressChangeHome
			SET ClientIP = @ClientIP_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @WebIP <> ''
	BEGIN
		DECLARE @WebIP_CASTED char(15)
		IF @WebIP = '^'
			BEGIN
				SET @WebIP_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @WebIP_CASTED = CAST(@WebIP AS char(15))
			END

		UPDATE SymAddressChangeHome
			SET WebIP = @WebIP_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @ClusterID <> ''
	BEGIN
		DECLARE @ClusterID_CASTED int
		IF @ClusterID = '^'
			BEGIN
				SET @ClusterID_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @ClusterID_CASTED = CAST(@ClusterID AS int)
			END

		UPDATE SymAddressChangeHome
			SET ClusterID = @ClusterID_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

GO
/****** Object:  StoredProcedure [dbo].[sp_SymAddressChangexlate_MECH_Delete]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_SymAddressChangexlate_MECH_Delete]
	@TrackingNum int
AS

DELETE FROM SymAddressChange
WHERE 1=1 AND TrackingNum = @TrackingNum

GO
/****** Object:  StoredProcedure [dbo].[sp_SymAddressChangexlate_MECH_DeleteAll]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_SymAddressChangexlate_MECH_DeleteAll]
	@TrackingNum int
AS

DELETE FROM SymAddressChange
WHERE 1=1 AND TrackingNum = @TrackingNum

GO
/****** Object:  StoredProcedure [dbo].[sp_SymAddressChangexlate_MECH_Insert]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_SymAddressChangexlate_MECH_Insert]
	@Processed int,
	@Account bigint,
	@Surname char(2),
	@ChangeMode char(1),
	@FName char(20),
	@MInitial char(2),
	@LName char(30),
	@FName2 char(20),
	@MInitial2 char(2),
	@LName2 char(30),
	@ReportName2 char(1),
	@SSN char(9),
	@Residence char(1),
	@AffinityCode char(4),
	@Email1 char(60),
	@HouseholdNumber int,
	@MaidenName char(20),
	@HouseholdCode int,
	@DriversLicenseState char(2),
	@DriversLicenseNum char(30),
	@DOB datetime,
	@InternetEnabledFlag char(1),
	@InternetEnabledDate datetime,
	@InternetLastSentDate datetime,
	@TaxCode char(1),
	@ClassCode char(2),
	@JointNam1 char(30),
	@Branch int,
	@OrigBranch int,
	@Seller char(3),
	@EscheatDate datetime,
	@Department char(12),
	@EmployeeNumber int,
	@PledgeAmount int,
	@InsCode char(2),
	@Ref1 char(8),
	@Ref2 char(8),
	@Ref3 char(8),
	@Ref4 char(8),
	@UserDate datetime,
	@CreditReportCode char(4),
	@Password char(24),
	@ProxyDate datetime,
	@Gender char(1),
	@RaceCode char(1),
	@YTDInt int,
	@PayrollGroup char(4),
	@Call24Lockout char(1),
	@StatementCycle int,
	@PaymentHistory char(32),
	@AccessClass int,
	@CntryName char(40),
	@W8Received char(1),
	@LastModified datetime,
	@TrackingNum int,
	@ClientIP char(15),
	@WebIP char(15),
	@ClusterID int
AS

INSERT INTO SymAddressChange
(TrackingNum, Processed, Account, Surname, ChangeMode, FName, MInitial, LName, FName2, MInitial2, LName2, ReportName2, SSN, Residence, AffinityCode, Email1, HouseholdNumber, MaidenName, HouseholdCode, DriversLicenseState, DriversLicenseNum, DOB, InternetEnabledFlag, InternetEnabledDate, InternetLastSentDate, TaxCode, ClassCode, JointNam1, Branch, OrigBranch, Seller, EscheatDate, Department, EmployeeNumber, PledgeAmount, InsCode, Ref1, Ref2, Ref3, Ref4, UserDate, CreditReportCode, Password, ProxyDate, Gender, RaceCode, YTDInt, PayrollGroup, Call24Lockout, StatementCycle, PaymentHistory, AccessClass, CntryName, W8Received, LastModified, ClientIP, WebIP, ClusterID)
VALUES
(@TrackingNum, @Processed, @Account, @Surname, @ChangeMode, @FName, @MInitial, @LName, @FName2, @MInitial2, @LName2, @ReportName2, @SSN, @Residence, @AffinityCode, @Email1, @HouseholdNumber, @MaidenName, @HouseholdCode, @DriversLicenseState, @DriversLicenseNum, @DOB, @InternetEnabledFlag, @InternetEnabledDate, @InternetLastSentDate, @TaxCode, @ClassCode, @JointNam1, @Branch, @OrigBranch, @Seller, @EscheatDate, @Department, @EmployeeNumber, @PledgeAmount, @InsCode, @Ref1, @Ref2, @Ref3, @Ref4, @UserDate, @CreditReportCode, @Password, @ProxyDate, @Gender, @RaceCode, @YTDInt, @PayrollGroup, @Call24Lockout, @StatementCycle, @PaymentHistory, @AccessClass, @CntryName, @W8Received, @LastModified, @ClientIP, @WebIP, @ClusterID)
GO
/****** Object:  StoredProcedure [dbo].[sp_SymAddressChangexlate_MECH_InsertIfNew]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_SymAddressChangexlate_MECH_InsertIfNew]
	@Processed int,
	@Account bigint,
	@Surname char(2),
	@ChangeMode char(1),
	@FName char(20),
	@MInitial char(2),
	@LName char(30),
	@FName2 char(20),
	@MInitial2 char(2),
	@LName2 char(30),
	@ReportName2 char(1),
	@SSN char(9),
	@Residence char(1),
	@AffinityCode char(4),
	@Email1 char(60),
	@HouseholdNumber int,
	@MaidenName char(20),
	@HouseholdCode int,
	@DriversLicenseState char(2),
	@DriversLicenseNum char(30),
	@DOB datetime,
	@InternetEnabledFlag char(1),
	@InternetEnabledDate datetime,
	@InternetLastSentDate datetime,
	@TaxCode char(1),
	@ClassCode char(2),
	@JointNam1 char(30),
	@Branch int,
	@OrigBranch int,
	@Seller char(3),
	@EscheatDate datetime,
	@Department char(12),
	@EmployeeNumber int,
	@PledgeAmount int,
	@InsCode char(2),
	@Ref1 char(8),
	@Ref2 char(8),
	@Ref3 char(8),
	@Ref4 char(8),
	@UserDate datetime,
	@CreditReportCode char(4),
	@Password char(24),
	@ProxyDate datetime,
	@Gender char(1),
	@RaceCode char(1),
	@YTDInt int,
	@PayrollGroup char(4),
	@Call24Lockout char(1),
	@StatementCycle int,
	@PaymentHistory char(32),
	@AccessClass int,
	@CntryName char(40),
	@W8Received char(1),
	@LastModified datetime,
	@TrackingNum int,
	@ClientIP char(15),
	@WebIP char(15),
	@ClusterID int
AS

DECLARE @Count int
SELECT @Count = COUNT(Processed) FROM SymAddressChange WHERE 1=1 AND TrackingNum = @TrackingNum

IF @Count = 0
	BEGIN
		INSERT INTO SymAddressChange
		(TrackingNum, Processed, Account, Surname, ChangeMode, FName, MInitial, LName, FName2, MInitial2, LName2, ReportName2, SSN, Residence, AffinityCode, Email1, HouseholdNumber, MaidenName, HouseholdCode, DriversLicenseState, DriversLicenseNum, DOB, InternetEnabledFlag, InternetEnabledDate, InternetLastSentDate, TaxCode, ClassCode, JointNam1, Branch, OrigBranch, Seller, EscheatDate, Department, EmployeeNumber, PledgeAmount, InsCode, Ref1, Ref2, Ref3, Ref4, UserDate, CreditReportCode, Password, ProxyDate, Gender, RaceCode, YTDInt, PayrollGroup, Call24Lockout, StatementCycle, PaymentHistory, AccessClass, CntryName, W8Received, LastModified, ClientIP, WebIP, ClusterID)
		VALUES
		(@TrackingNum, @Processed, @Account, @Surname, @ChangeMode, @FName, @MInitial, @LName, @FName2, @MInitial2, @LName2, @ReportName2, @SSN, @Residence, @AffinityCode, @Email1, @HouseholdNumber, @MaidenName, @HouseholdCode, @DriversLicenseState, @DriversLicenseNum, @DOB, @InternetEnabledFlag, @InternetEnabledDate, @InternetLastSentDate, @TaxCode, @ClassCode, @JointNam1, @Branch, @OrigBranch, @Seller, @EscheatDate, @Department, @EmployeeNumber, @PledgeAmount, @InsCode, @Ref1, @Ref2, @Ref3, @Ref4, @UserDate, @CreditReportCode, @Password, @ProxyDate, @Gender, @RaceCode, @YTDInt, @PayrollGroup, @Call24Lockout, @StatementCycle, @PaymentHistory, @AccessClass, @CntryName, @W8Received, @LastModified, @ClientIP, @WebIP, @ClusterID)
	END
ELSE	BEGIN
		UPDATE SymAddressChange SET
			Processed = @Processed,
			Account = @Account,
			Surname = @Surname,
			ChangeMode = @ChangeMode,
			FName = @FName,
			MInitial = @MInitial,
			LName = @LName,
			FName2 = @FName2,
			MInitial2 = @MInitial2,
			LName2 = @LName2,
			ReportName2 = @ReportName2,
			SSN = @SSN,
			Residence = @Residence,
			AffinityCode = @AffinityCode,
			Email1 = @Email1,
			HouseholdNumber = @HouseholdNumber,
			MaidenName = @MaidenName,
			HouseholdCode = @HouseholdCode,
			DriversLicenseState = @DriversLicenseState,
			DriversLicenseNum = @DriversLicenseNum,
			DOB = @DOB,
			InternetEnabledFlag = @InternetEnabledFlag,
			InternetEnabledDate = @InternetEnabledDate,
			InternetLastSentDate = @InternetLastSentDate,
			TaxCode = @TaxCode,
			ClassCode = @ClassCode,
			JointNam1 = @JointNam1,
			Branch = @Branch,
			OrigBranch = @OrigBranch,
			Seller = @Seller,
			EscheatDate = @EscheatDate,
			Department = @Department,
			EmployeeNumber = @EmployeeNumber,
			PledgeAmount = @PledgeAmount,
			InsCode = @InsCode,
			Ref1 = @Ref1,
			Ref2 = @Ref2,
			Ref3 = @Ref3,
			Ref4 = @Ref4,
			UserDate = @UserDate,
			CreditReportCode = @CreditReportCode,
			Password = @Password,
			ProxyDate = @ProxyDate,
			Gender = @Gender,
			RaceCode = @RaceCode,
			YTDInt = @YTDInt,
			PayrollGroup = @PayrollGroup,
			Call24Lockout = @Call24Lockout,
			StatementCycle = @StatementCycle,
			PaymentHistory = @PaymentHistory,
			AccessClass = @AccessClass,
			CntryName = @CntryName,
			W8Received = @W8Received,
			LastModified = @LastModified,
			ClientIP = @ClientIP,
			WebIP = @WebIP,
			ClusterID = @ClusterID
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END
GO
/****** Object:  StoredProcedure [dbo].[sp_SymAddressChangexlate_MECH_Select]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_SymAddressChangexlate_MECH_Select]
	@TrackingNum int
AS

SELECT * FROM SymAddressChange
WHERE 1=1 AND TrackingNum = @TrackingNum

GO
/****** Object:  StoredProcedure [dbo].[sp_SymAddressChangexlate_MECH_SelectAll]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_SymAddressChangexlate_MECH_SelectAll]
	@TrackingNum int
AS

SELECT * FROM SymAddressChange
WHERE 1=1 AND TrackingNum = @TrackingNum

GO
/****** Object:  StoredProcedure [dbo].[sp_SymAddressChangexlate_MECH_Update]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[sp_SymAddressChangexlate_MECH_Update]
	@Processed varchar(100),
	@Account varchar(100),
	@Surname varchar(2),
	@ChangeMode varchar(1),
	@FName varchar(20),
	@MInitial varchar(2),
	@LName varchar(30),
	@FName2 varchar(20),
	@MInitial2 varchar(2),
	@LName2 varchar(30),
	@ReportName2 varchar(1),
	@SSN varchar(9),
	@Residence varchar(1),
	@AffinityCode varchar(4),
	@Email1 varchar(60),
	@HouseholdNumber varchar(100),
	@MaidenName varchar(20),
	@HouseholdCode varchar(100),
	@DriversLicenseState varchar(2),
	@DriversLicenseNum varchar(30),
	@DOB varchar(100),
	@InternetEnabledFlag varchar(1),
	@InternetEnabledDate varchar(100),
	@InternetLastSentDate varchar(100),
	@TaxCode varchar(1),
	@ClassCode varchar(2),
	@JointNam1 varchar(30),
	@Branch varchar(100),
	@OrigBranch varchar(100),
	@Seller varchar(3),
	@EscheatDate varchar(100),
	@Department varchar(12),
	@EmployeeNumber varchar(100),
	@PledgeAmount varchar(100),
	@InsCode varchar(2),
	@Ref1 varchar(8),
	@Ref2 varchar(8),
	@Ref3 varchar(8),
	@Ref4 varchar(8),
	@UserDate varchar(100),
	@CreditReportCode varchar(4),
	@Password varchar(24),
	@ProxyDate varchar(100),
	@Gender varchar(1),
	@RaceCode varchar(1),
	@YTDInt varchar(100),
	@PayrollGroup varchar(4),
	@Call24Lockout varchar(1),
	@StatementCycle varchar(100),
	@PaymentHistory varchar(32),
	@AccessClass varchar(100),
	@CntryName varchar(40),
	@W8Received varchar(1),
	@LastModified varchar(100),
	@TrackingNum int,
	@ClientIP varchar(15),
	@WebIP varchar(15),
	@ClusterID varchar(100)
AS

IF @Processed <> ''
	BEGIN
		DECLARE @Processed_CASTED int
		IF @Processed = '^'
			BEGIN
				SET @Processed_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @Processed_CASTED = CAST(@Processed AS int)
			END

		UPDATE SymAddressChange
			SET Processed = @Processed_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @Account <> ''
	BEGIN
		DECLARE @Account_CASTED int
		IF @Account = '^'
			BEGIN
				SET @Account_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @Account_CASTED = CAST(@Account AS int)
			END

		UPDATE SymAddressChange
			SET Account = @Account_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @Surname <> ''
	BEGIN
		DECLARE @Surname_CASTED char(2)
		IF @Surname = '^'
			BEGIN
				SET @Surname_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @Surname_CASTED = CAST(@Surname AS char(2))
			END

		UPDATE SymAddressChange
			SET Surname = @Surname_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @ChangeMode <> ''
	BEGIN
		DECLARE @ChangeMode_CASTED char(1)
		IF @ChangeMode = '^'
			BEGIN
				SET @ChangeMode_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @ChangeMode_CASTED = CAST(@ChangeMode AS char(1))
			END

		UPDATE SymAddressChange
			SET ChangeMode = @ChangeMode_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @FName <> ''
	BEGIN
		DECLARE @FName_CASTED char(20)
		IF @FName = '^'
			BEGIN
				SET @FName_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @FName_CASTED = CAST(@FName AS char(20))
			END

		UPDATE SymAddressChange
			SET FName = @FName_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @MInitial <> ''
	BEGIN
		DECLARE @MInitial_CASTED char(2)
		IF @MInitial = '^'
			BEGIN
				SET @MInitial_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @MInitial_CASTED = CAST(@MInitial AS char(2))
			END

		UPDATE SymAddressChange
			SET MInitial = @MInitial_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @LName <> ''
	BEGIN
		DECLARE @LName_CASTED char(30)
		IF @LName = '^'
			BEGIN
				SET @LName_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @LName_CASTED = CAST(@LName AS char(30))
			END

		UPDATE SymAddressChange
			SET LName = @LName_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @FName2 <> ''
	BEGIN
		DECLARE @FName2_CASTED char(20)
		IF @FName2 = '^'
			BEGIN
				SET @FName2_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @FName2_CASTED = CAST(@FName2 AS char(20))
			END

		UPDATE SymAddressChange
			SET FName2 = @FName2_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @MInitial2 <> ''
	BEGIN
		DECLARE @MInitial2_CASTED char(2)
		IF @MInitial2 = '^'
			BEGIN
				SET @MInitial2_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @MInitial2_CASTED = CAST(@MInitial2 AS char(2))
			END

		UPDATE SymAddressChange
			SET MInitial2 = @MInitial2_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @LName2 <> ''
	BEGIN
		DECLARE @LName2_CASTED char(30)
		IF @LName2 = '^'
			BEGIN
				SET @LName2_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @LName2_CASTED = CAST(@LName2 AS char(30))
			END

		UPDATE SymAddressChange
			SET LName2 = @LName2_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @ReportName2 <> ''
	BEGIN
		DECLARE @ReportName2_CASTED char(1)
		IF @ReportName2 = '^'
			BEGIN
				SET @ReportName2_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @ReportName2_CASTED = CAST(@ReportName2 AS char(1))
			END

		UPDATE SymAddressChange
			SET ReportName2 = @ReportName2_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @SSN <> ''
	BEGIN
		DECLARE @SSN_CASTED char(9)
		IF @SSN = '^'
			BEGIN
				SET @SSN_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @SSN_CASTED = CAST(@SSN AS char(9))
			END

		UPDATE SymAddressChange
			SET SSN = @SSN_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @Residence <> ''
	BEGIN
		DECLARE @Residence_CASTED char(1)
		IF @Residence = '^'
			BEGIN
				SET @Residence_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @Residence_CASTED = CAST(@Residence AS char(1))
			END

		UPDATE SymAddressChange
			SET Residence = @Residence_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @AffinityCode <> ''
	BEGIN
		DECLARE @AffinityCode_CASTED char(4)
		IF @AffinityCode = '^'
			BEGIN
				SET @AffinityCode_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @AffinityCode_CASTED = CAST(@AffinityCode AS char(4))
			END

		UPDATE SymAddressChange
			SET AffinityCode = @AffinityCode_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @Email1 <> ''
	BEGIN
		DECLARE @Email1_CASTED char(60)
		IF @Email1 = '^'
			BEGIN
				SET @Email1_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @Email1_CASTED = CAST(@Email1 AS char(60))
			END

		UPDATE SymAddressChange
			SET Email1 = @Email1_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @HouseholdNumber <> ''
	BEGIN
		DECLARE @HouseholdNumber_CASTED int
		IF @HouseholdNumber = '^'
			BEGIN
				SET @HouseholdNumber_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @HouseholdNumber_CASTED = CAST(@HouseholdNumber AS int)
			END

		UPDATE SymAddressChange
			SET HouseholdNumber = @HouseholdNumber_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @MaidenName <> ''
	BEGIN
		DECLARE @MaidenName_CASTED char(20)
		IF @MaidenName = '^'
			BEGIN
				SET @MaidenName_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @MaidenName_CASTED = CAST(@MaidenName AS char(20))
			END

		UPDATE SymAddressChange
			SET MaidenName = @MaidenName_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @HouseholdCode <> ''
	BEGIN
		DECLARE @HouseholdCode_CASTED int
		IF @HouseholdCode = '^'
			BEGIN
				SET @HouseholdCode_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @HouseholdCode_CASTED = CAST(@HouseholdCode AS int)
			END

		UPDATE SymAddressChange
			SET HouseholdCode = @HouseholdCode_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @DriversLicenseState <> ''
	BEGIN
		DECLARE @DriversLicenseState_CASTED char(2)
		IF @DriversLicenseState = '^'
			BEGIN
				SET @DriversLicenseState_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @DriversLicenseState_CASTED = CAST(@DriversLicenseState AS char(2))
			END

		UPDATE SymAddressChange
			SET DriversLicenseState = @DriversLicenseState_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @DriversLicenseNum <> ''
	BEGIN
		DECLARE @DriversLicenseNum_CASTED char(30)
		IF @DriversLicenseNum = '^'
			BEGIN
				SET @DriversLicenseNum_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @DriversLicenseNum_CASTED = CAST(@DriversLicenseNum AS char(30))
			END

		UPDATE SymAddressChange
			SET DriversLicenseNum = @DriversLicenseNum_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @DOB <> ''
	BEGIN
		DECLARE @DOB_CASTED datetime
		IF @DOB = '^'
			BEGIN
				SET @DOB_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @DOB_CASTED = CAST(@DOB AS datetime)
			END

		UPDATE SymAddressChange
			SET DOB = @DOB_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @InternetEnabledFlag <> ''
	BEGIN
		DECLARE @InternetEnabledFlag_CASTED char(1)
		IF @InternetEnabledFlag = '^'
			BEGIN
				SET @InternetEnabledFlag_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @InternetEnabledFlag_CASTED = CAST(@InternetEnabledFlag AS char(1))
			END

		UPDATE SymAddressChange
			SET InternetEnabledFlag = @InternetEnabledFlag_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @InternetEnabledDate <> ''
	BEGIN
		DECLARE @InternetEnabledDate_CASTED datetime
		IF @InternetEnabledDate = '^'
			BEGIN
				SET @InternetEnabledDate_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @InternetEnabledDate_CASTED = CAST(@InternetEnabledDate AS datetime)
			END

		UPDATE SymAddressChange
			SET InternetEnabledDate = @InternetEnabledDate_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @InternetLastSentDate <> ''
	BEGIN
		DECLARE @InternetLastSentDate_CASTED datetime
		IF @InternetLastSentDate = '^'
			BEGIN
				SET @InternetLastSentDate_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @InternetLastSentDate_CASTED = CAST(@InternetLastSentDate AS datetime)
			END

		UPDATE SymAddressChange
			SET InternetLastSentDate = @InternetLastSentDate_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @TaxCode <> ''
	BEGIN
		DECLARE @TaxCode_CASTED char(1)
		IF @TaxCode = '^'
			BEGIN
				SET @TaxCode_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @TaxCode_CASTED = CAST(@TaxCode AS char(1))
			END

		UPDATE SymAddressChange
			SET TaxCode = @TaxCode_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @ClassCode <> ''
	BEGIN
		DECLARE @ClassCode_CASTED char(2)
		IF @ClassCode = '^'
			BEGIN
				SET @ClassCode_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @ClassCode_CASTED = CAST(@ClassCode AS char(2))
			END

		UPDATE SymAddressChange
			SET ClassCode = @ClassCode_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @JointNam1 <> ''
	BEGIN
		DECLARE @JointNam1_CASTED char(30)
		IF @JointNam1 = '^'
			BEGIN
				SET @JointNam1_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @JointNam1_CASTED = CAST(@JointNam1 AS char(30))
			END

		UPDATE SymAddressChange
			SET JointNam1 = @JointNam1_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @Branch <> ''
	BEGIN
		DECLARE @Branch_CASTED int
		IF @Branch = '^'
			BEGIN
				SET @Branch_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @Branch_CASTED = CAST(@Branch AS int)
			END

		UPDATE SymAddressChange
			SET Branch = @Branch_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @OrigBranch <> ''
	BEGIN
		DECLARE @OrigBranch_CASTED int
		IF @OrigBranch = '^'
			BEGIN
				SET @OrigBranch_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @OrigBranch_CASTED = CAST(@OrigBranch AS int)
			END

		UPDATE SymAddressChange
			SET OrigBranch = @OrigBranch_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @Seller <> ''
	BEGIN
		DECLARE @Seller_CASTED char(3)
		IF @Seller = '^'
			BEGIN
				SET @Seller_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @Seller_CASTED = CAST(@Seller AS char(3))
			END

		UPDATE SymAddressChange
			SET Seller = @Seller_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @EscheatDate <> ''
	BEGIN
		DECLARE @EscheatDate_CASTED datetime
		IF @EscheatDate = '^'
			BEGIN
				SET @EscheatDate_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @EscheatDate_CASTED = CAST(@EscheatDate AS datetime)
			END

		UPDATE SymAddressChange
			SET EscheatDate = @EscheatDate_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @Department <> ''
	BEGIN
		DECLARE @Department_CASTED char(12)
		IF @Department = '^'
			BEGIN
				SET @Department_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @Department_CASTED = CAST(@Department AS char(12))
			END

		UPDATE SymAddressChange
			SET Department = @Department_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @EmployeeNumber <> ''
	BEGIN
		DECLARE @EmployeeNumber_CASTED int
		IF @EmployeeNumber = '^'
			BEGIN
				SET @EmployeeNumber_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @EmployeeNumber_CASTED = CAST(@EmployeeNumber AS int)
			END

		UPDATE SymAddressChange
			SET EmployeeNumber = @EmployeeNumber_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @PledgeAmount <> ''
	BEGIN
		DECLARE @PledgeAmount_CASTED int
		IF @PledgeAmount = '^'
			BEGIN
				SET @PledgeAmount_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @PledgeAmount_CASTED = CAST(@PledgeAmount AS int)
			END

		UPDATE SymAddressChange
			SET PledgeAmount = @PledgeAmount_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @InsCode <> ''
	BEGIN
		DECLARE @InsCode_CASTED char(2)
		IF @InsCode = '^'
			BEGIN
				SET @InsCode_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @InsCode_CASTED = CAST(@InsCode AS char(2))
			END

		UPDATE SymAddressChange
			SET InsCode = @InsCode_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @Ref1 <> ''
	BEGIN
		DECLARE @Ref1_CASTED char(8)
		IF @Ref1 = '^'
			BEGIN
				SET @Ref1_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @Ref1_CASTED = CAST(@Ref1 AS char(8))
			END

		UPDATE SymAddressChange
			SET Ref1 = @Ref1_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @Ref2 <> ''
	BEGIN
		DECLARE @Ref2_CASTED char(8)
		IF @Ref2 = '^'
			BEGIN
				SET @Ref2_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @Ref2_CASTED = CAST(@Ref2 AS char(8))
			END

		UPDATE SymAddressChange
			SET Ref2 = @Ref2_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @Ref3 <> ''
	BEGIN
		DECLARE @Ref3_CASTED char(8)
		IF @Ref3 = '^'
			BEGIN
				SET @Ref3_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @Ref3_CASTED = CAST(@Ref3 AS char(8))
			END

		UPDATE SymAddressChange
			SET Ref3 = @Ref3_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @Ref4 <> ''
	BEGIN
		DECLARE @Ref4_CASTED char(8)
		IF @Ref4 = '^'
			BEGIN
				SET @Ref4_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @Ref4_CASTED = CAST(@Ref4 AS char(8))
			END

		UPDATE SymAddressChange
			SET Ref4 = @Ref4_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @UserDate <> ''
	BEGIN
		DECLARE @UserDate_CASTED datetime
		IF @UserDate = '^'
			BEGIN
				SET @UserDate_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @UserDate_CASTED = CAST(@UserDate AS datetime)
			END

		UPDATE SymAddressChange
			SET UserDate = @UserDate_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @CreditReportCode <> ''
	BEGIN
		DECLARE @CreditReportCode_CASTED char(4)
		IF @CreditReportCode = '^'
			BEGIN
				SET @CreditReportCode_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @CreditReportCode_CASTED = CAST(@CreditReportCode AS char(4))
			END

		UPDATE SymAddressChange
			SET CreditReportCode = @CreditReportCode_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @Password <> ''
	BEGIN
		DECLARE @Password_CASTED char(24)
		IF @Password = '^'
			BEGIN
				SET @Password_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @Password_CASTED = CAST(@Password AS char(24))
			END

		UPDATE SymAddressChange
			SET Password = @Password_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @ProxyDate <> ''
	BEGIN
		DECLARE @ProxyDate_CASTED datetime
		IF @ProxyDate = '^'
			BEGIN
				SET @ProxyDate_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @ProxyDate_CASTED = CAST(@ProxyDate AS datetime)
			END

		UPDATE SymAddressChange
			SET ProxyDate = @ProxyDate_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @Gender <> ''
	BEGIN
		DECLARE @Gender_CASTED char(1)
		IF @Gender = '^'
			BEGIN
				SET @Gender_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @Gender_CASTED = CAST(@Gender AS char(1))
			END

		UPDATE SymAddressChange
			SET Gender = @Gender_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @RaceCode <> ''
	BEGIN
		DECLARE @RaceCode_CASTED char(1)
		IF @RaceCode = '^'
			BEGIN
				SET @RaceCode_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @RaceCode_CASTED = CAST(@RaceCode AS char(1))
			END

		UPDATE SymAddressChange
			SET RaceCode = @RaceCode_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @YTDInt <> ''
	BEGIN
		DECLARE @YTDInt_CASTED int
		IF @YTDInt = '^'
			BEGIN
				SET @YTDInt_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @YTDInt_CASTED = CAST(@YTDInt AS int)
			END

		UPDATE SymAddressChange
			SET YTDInt = @YTDInt_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @PayrollGroup <> ''
	BEGIN
		DECLARE @PayrollGroup_CASTED char(4)
		IF @PayrollGroup = '^'
			BEGIN
				SET @PayrollGroup_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @PayrollGroup_CASTED = CAST(@PayrollGroup AS char(4))
			END

		UPDATE SymAddressChange
			SET PayrollGroup = @PayrollGroup_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @Call24Lockout <> ''
	BEGIN
		DECLARE @Call24Lockout_CASTED char(1)
		IF @Call24Lockout = '^'
			BEGIN
				SET @Call24Lockout_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @Call24Lockout_CASTED = CAST(@Call24Lockout AS char(1))
			END

		UPDATE SymAddressChange
			SET Call24Lockout = @Call24Lockout_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @StatementCycle <> ''
	BEGIN
		DECLARE @StatementCycle_CASTED int
		IF @StatementCycle = '^'
			BEGIN
				SET @StatementCycle_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @StatementCycle_CASTED = CAST(@StatementCycle AS int)
			END

		UPDATE SymAddressChange
			SET StatementCycle = @StatementCycle_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @PaymentHistory <> ''
	BEGIN
		DECLARE @PaymentHistory_CASTED char(32)
		IF @PaymentHistory = '^'
			BEGIN
				SET @PaymentHistory_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @PaymentHistory_CASTED = CAST(@PaymentHistory AS char(32))
			END

		UPDATE SymAddressChange
			SET PaymentHistory = @PaymentHistory_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @AccessClass <> ''
	BEGIN
		DECLARE @AccessClass_CASTED int
		IF @AccessClass = '^'
			BEGIN
				SET @AccessClass_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @AccessClass_CASTED = CAST(@AccessClass AS int)
			END

		UPDATE SymAddressChange
			SET AccessClass = @AccessClass_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @CntryName <> ''
	BEGIN
		DECLARE @CntryName_CASTED char(40)
		IF @CntryName = '^'
			BEGIN
				SET @CntryName_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @CntryName_CASTED = CAST(@CntryName AS char(40))
			END

		UPDATE SymAddressChange
			SET CntryName = @CntryName_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @W8Received <> ''
	BEGIN
		DECLARE @W8Received_CASTED char(1)
		IF @W8Received = '^'
			BEGIN
				SET @W8Received_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @W8Received_CASTED = CAST(@W8Received AS char(1))
			END

		UPDATE SymAddressChange
			SET W8Received = @W8Received_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @LastModified <> ''
	BEGIN
		DECLARE @LastModified_CASTED datetime
		IF @LastModified = '^'
			BEGIN
				SET @LastModified_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @LastModified_CASTED = CAST(@LastModified AS datetime)
			END

		UPDATE SymAddressChange
			SET LastModified = @LastModified_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @ClientIP <> ''
	BEGIN
		DECLARE @ClientIP_CASTED char(15)
		IF @ClientIP = '^'
			BEGIN
				SET @ClientIP_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @ClientIP_CASTED = CAST(@ClientIP AS char(15))
			END

		UPDATE SymAddressChange
			SET ClientIP = @ClientIP_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @WebIP <> ''
	BEGIN
		DECLARE @WebIP_CASTED char(15)
		IF @WebIP = '^'
			BEGIN
				SET @WebIP_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @WebIP_CASTED = CAST(@WebIP AS char(15))
			END

		UPDATE SymAddressChange
			SET WebIP = @WebIP_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

IF @ClusterID <> ''
	BEGIN
		DECLARE @ClusterID_CASTED int
		IF @ClusterID = '^'
			BEGIN
				SET @ClusterID_CASTED = NULL
			END
		ELSE
			BEGIN
				SET @ClusterID_CASTED = CAST(@ClusterID AS int)
			END

		UPDATE SymAddressChange
			SET ClusterID = @ClusterID_CASTED
		WHERE 1=1 AND TrackingNum = @TrackingNum
	END

GO
/****** Object:  StoredProcedure [dbo].[sp_TNImport_MemberNotices_Update]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE Procedure [dbo].[sp_TNImport_MemberNotices_Update]
	@NotificationID int,
	@NotificationType char(16),
	@Account varchar(20),
	@FileID int,
	@StartDate datetime,
	@EndDate datetime,
	@StartByte int,
	@EndByte int,
	@Pages int,
	@SSN char(11),
	@NoticePending char(1),
	@SLType char(1),
	@Suffix int,
	@StartPage int,
	@BinaryData char(10)
AS 
/******************************************************************************
**		File: 
**		Name: sp_TNImport_MemberNotices_Update
**		Desc: Updates the MemberNotices table with a new statement notification
**
**		This template can be customized:
**              
**		Return values: unique id
** 
**		Called by:   
**              
**		Parameters:
**		Input							Output
**     ----------							-----------
**
**		Auth: 
**		Date: 
*******************************************************************************
**		Change History
*******************************************************************************
**		Date:			Author:	Version		Description:
**		--------		--------	-------		-------------------------------------------
**		11/20/09		Troy C		1.0.0
**		11/27/2009		Troy C		1.0.0		changed SSN field to 11 chars
*******************************************************************************/

BEGIN
	delete from MemberNotices 
		Where 
			NotificationType = @NotificationType 
			And Account = @Account 
			And StartDate = @StartDate 
			And SLType = @SLType 
			And Suffix = @Suffix
	
	insert MemberNotices
		(NotificationID,
		NotificationType,
		Account,
		FileID,
		StartDate,
		EndDate,
		StartByte,
		EndByte,
		Pages,
		SSN,
		NoticePending,
		SLType,
		Suffix,
		StartPage,
		BinaryData) 
		Values
		(@NotificationID,
		@NotificationType,
		@Account,
		@FileID,
		@StartDate,
		@EndDate,
		@StartByte,
		@EndByte,
		@Pages,
		@SSN,
		@NoticePending,
		@SLType,
		@Suffix,
		@StartPage,
		@BinaryData)
END
GO
/****** Object:  StoredProcedure [dbo].[sp_TNImport_NotificationFile_InsertNew]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE Procedure [dbo].[sp_TNImport_NotificationFile_InsertNew]
	@FileID int,
	@FileName char(255),
	@Available char(1),
	@NoticePending char(1)
AS
/******************************************************************************
**		File: 
**		Name: sp_TNImport_NotificationFile_InsertNew
**		Desc: Inserts a new record into the NotificationFile table
**
**		This template can be customized:
**              
**		Return values: unique id
** 
**		Called by:   
**              
**		Parameters:
**		Input							Output
**     ----------							-----------
**
**		Auth: 
**		Date: 
*******************************************************************************
**		Change History
*******************************************************************************
**		Date:			Author:	Version		Description:
**		--------		--------	-------		-------------------------------------------
**		11/20/09		Troy C		1.0.0
*******************************************************************************/

BEGIN
	Delete from NotificationFile
	Where FileID = @FileID
	
	INSERT INTO NotificationFile
		(FileID,FileName,Available,NoticePending)
		VALUES
		(@FileID, @FileName, @Available, @NoticePending)
END


GO
/****** Object:  StoredProcedure [imssa].[ConvertOldAccountToNewAccount]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- Read from the x-ACCTXREF table the OldAccount and NewAccount, the go through
-- All tables in the IMS database replacing any OldAccount with the newAccount
CREATE Procedure [imssa].[ConvertOldAccountToNewAccount]
AS
BEGIN
DECLARE @OldAccount   int
DECLARE @NewAccount   int
DECLARE @MyError   int
DECLARE @ErrorMessage  varchar(100)
DECLARE curs_AccountIDs CURSOR FOR
  SELECT OldAccount, NewAccount
  FROM [x-ACCTXREF]
OPEN curs_AccountIDs
FETCH NEXT FROM curs_AccountIDs
INTO @OldAccount,
  @NewAccount
WHILE (@@FETCH_STATUS = 0)
BEGIN
 SET @MyError = 0
 -- Do each new account number in a transactin incase we fail on one of the updates.
 -- This way we can rerun each account number that failed
 BEGIN TRAN UpdateAllAccountIds
 
 UPDATE LoanAppBorrower SET Account = @NewAccount WHERE Account = @OldAccount
 SET @MyError = @@ERROR   
 IF @MyError = 0 BEGIN
     UPDATE LoanApplication SET Account = @NewAccount WHERE Account = @OldAccount
  SET @MyError = @@ERROR
 END
 IF @MyError = 0 BEGIN
  UPDATE LoanFile SET Account = @NewAccount WHERE Account = @OldAccount
  SET @MyError = @@ERROR
 END
 IF @MyError = 0 BEGIN
      UPDATE LOCH SET Account = @NewAccount WHERE Account = @OldAccount
  SET @MyError = @@ERROR
 END
 IF @MyError = 0 BEGIN
  UPDATE LOCH SET KXferAccount = @NewAccount WHERE KXferAccount = @OldAccount
  SET @MyError = @@ERROR
 END
 IF @MyError = 0 BEGIN
     UPDATE LOCHPledges SET Account = @NewAccount WHERE Account = @OldAccount
  SET @MyError = @@ERROR
 END
 IF @MyError = 0 BEGIN
     UPDATE LOEX SET Account = @NewAccount WHERE Account = @OldAccount
  SET @MyError = @@ERROR
 END
 IF @MyError = 0 BEGIN
     UPDATE LOX2 SET Account = @NewAccount WHERE Account = @OldAccount
  SET @MyError = @@ERROR
 END
 IF @MyError = 0 BEGIN
     UPDATE MECH SET Account = @NewAccount WHERE Account = @OldAccount
  SET @MyError = @@ERROR
 END
 IF @MyError = 0 BEGIN
     UPDATE MECHHome SET Account = @NewAccount WHERE Account = @OldAccount
  SET @MyError = @@ERROR
 END
 IF @MyError = 0 BEGIN
     UPDATE MECHWork SET Account = @NewAccount WHERE Account = @OldAccount
  SET @MyError = @@ERROR
 END
 IF @MyError = 0 BEGIN
     UPDATE MemberChange SET Account = @NewAccount WHERE Account = @OldAccount
  SET @MyError = @@ERROR
 END
 IF @MyError = 0 BEGIN
     UPDATE MemberCrossAccounts SET Account = @NewAccount WHERE Account = @OldAccount
  SET @MyError = @@ERROR
 END
 IF @MyError = 0 BEGIN
     UPDATE MemberFile SET Account = @NewAccount WHERE Account = @OldAccount
  SET @MyError = @@ERROR
 END
 IF @MyError = 0 BEGIN
     UPDATE MemberHome SET Account = @NewAccount WHERE Account = @OldAccount
  SET @MyError = @@ERROR
 END
 IF @MyError = 0 BEGIN
     UPDATE MemberNotices SET Account = @NewAccount WHERE Account = @OldAccount
  SET @MyError = @@ERROR
 END
 IF @MyError = 0 BEGIN
     UPDATE MemberWork SET Account = @NewAccount WHERE Account = @OldAccount
  SET @MyError = @@ERROR
 END
 IF @MyError = 0 BEGIN
     UPDATE MemoFile SET Account = @NewAccount WHERE Account = @OldAccount
  SET @MyError = @@ERROR
 END
 IF @MyError = 0 BEGIN
     UPDATE Message SET Account = @NewAccount WHERE Account = @OldAccount
  SET @MyError = @@ERROR
 END
 IF @MyError = 0 BEGIN
     UPDATE MORT SET Account = @NewAccount WHERE Account = @OldAccount
  SET @MyError = @@ERROR
 END
 IF @MyError = 0 BEGIN
     UPDATE MSLFlags SET Account = @NewAccount WHERE Account = @OldAccount
  SET @MyError = @@ERROR
 END
 IF @MyError = 0 BEGIN
     UPDATE NewAccount SET Account = @NewAccount WHERE Account = @OldAccount
  SET @MyError = @@ERROR
 END
 IF @MyError = 0 BEGIN
     UPDATE NewAccountFlags SET Account = @NewAccount WHERE Account = @OldAccount
  SET @MyError = @@ERROR
 END
 IF @MyError = 0 BEGIN
     UPDATE newaccountmemo SET Account = @NewAccount WHERE Account = @OldAccount
  SET @MyError = @@ERROR
 END
 IF @MyError = 0 BEGIN
     UPDATE NewCard SET Account = @NewAccount WHERE Account = @OldAccount
  SET @MyError = @@ERROR
 END
 IF @MyError = 0 BEGIN
     UPDATE NewCardSuffix SET Account = @NewAccount WHERE Account = @OldAccount
  SET @MyError = @@ERROR
 END
 IF @MyError = 0 BEGIN
     UPDATE NewCheckingRequest SET Account = @NewAccount WHERE Account = @OldAccount
  SET @MyError = @@ERROR
 END
 IF @MyError = 0 BEGIN
     UPDATE NewLoan SET Account = @NewAccount WHERE Account = @OldAccount
  SET @MyError = @@ERROR
 END
 IF @MyError = 0 BEGIN
     UPDATE NewLoanCoApplicant SET Account = @NewAccount WHERE Account = @OldAccount
  SET @MyError = @@ERROR
 END
 IF @MyError = 0 BEGIN
     UPDATE NewLoanFees SET Account = @NewAccount WHERE Account = @OldAccount
  SET @MyError = @@ERROR
 END
 IF @MyError = 0 BEGIN
     UPDATE NewLoanFlags SET Account = @NewAccount WHERE Account = @OldAccount
  SET @MyError = @@ERROR
 END
 IF @MyError = 0 BEGIN
  UPDATE NewLoanPledges SET Account = @NewAccount WHERE Account = @OldAccount
  SET @MyError = @@ERROR
 END
 IF @MyError = 0 BEGIN
  UPDATE NewMemberFlag SET Account = @NewAccount WHERE Account = @OldAccount
  SET @MyError = @@ERROR
 END
 IF @MyError = 0 BEGIN
  UPDATE NewMemberRequest SET Account = @NewAccount WHERE Account = @OldAccount
  SET @MyError = @@ERROR
 END
 IF @MyError = 0 BEGIN
  UPDATE NewMemo SET Account = @NewAccount WHERE Account = @OldAccount
  SET @MyError = @@ERROR
 END
 IF @MyError = 0 BEGIN
  UPDATE NewShare SET Account = @NewAccount WHERE Account = @OldAccount
  SET @MyError = @@ERROR
 END
 IF @MyError = 0 BEGIN
  UPDATE NewShareFlags SET Account = @NewAccount WHERE Account = @OldAccount
  SET @MyError = @@ERROR
 END
 IF @MyError = 0 BEGIN
  UPDATE NewShareSuffix SET Account = @NewAccount WHERE Account = @OldAccount
  SET @MyError = @@ERROR
 END
 IF @MyError = 0 BEGIN
  UPDATE OfflineCardPayment SET Account = @NewAccount WHERE Account = @OldAccount
  SET @MyError = @@ERROR
 END
 IF @MyError = 0 BEGIN
  UPDATE OfflineCards SET Account = @NewAccount WHERE Account = @OldAccount
  SET @MyError = @@ERROR
 END
 IF @MyError = 0 BEGIN
  UPDATE OfflineCards SET CrossAcct = @NewAccount WHERE CrossAcct = @OldAccount
  SET @MyError = @@ERROR
 END
 IF @MyError = 0 BEGIN
  UPDATE OfflineCards SET CrossAcct1 = @NewAccount WHERE CrossAcct1 = @OldAccount
  SET @MyError = @@ERROR
 END
 IF @MyError = 0 BEGIN
  UPDATE OfflineCards SET CrossAcct2 = @NewAccount WHERE CrossAcct2 = @OldAccount
  SET @MyError = @@ERROR
 END
 IF @MyError = 0 BEGIN
  UPDATE PINChange SET Account = @NewAccount WHERE Account = @OldAccount
  SET @MyError = @@ERROR
 END
 IF @MyError = 0 BEGIN
  UPDATE PlasticCards SET Account = @NewAccount WHERE Account = @OldAccount
  SET @MyError = @@ERROR
 END
 IF @MyError = 0 BEGIN
  UPDATE PlasticCardSuffix SET Account = @NewAccount WHERE Account = @OldAccount
  SET @MyError = @@ERROR
 END
 IF @MyError = 0 BEGIN
  UPDATE ShareFile SET Account = @NewAccount WHERE Account = @OldAccount
  SET @MyError = @@ERROR
 END
 IF @MyError = 0 BEGIN
  UPDATE SHCH SET Account = @NewAccount WHERE Account = @OldAccount
  SET @MyError = @@ERROR
 END
 IF @MyError = 0 BEGIN
  UPDATE SHCHPledges SET Account = @NewAccount WHERE Account = @OldAccount
  SET @MyError = @@ERROR
 END
 IF @MyError = 0 BEGIN
  UPDATE SHCHSuffix SET Account = @NewAccount WHERE Account = @OldAccount
  SET @MyError = @@ERROR
 END
 IF @MyError = 0 BEGIN
  UPDATE SHFE SET Account = @NewAccount WHERE Account = @OldAccount
  SET @MyError = @@ERROR
 END
 IF @MyError = 0 BEGIN
  UPDATE SHFE SET FeeAccount = @NewAccount WHERE FeeAccount = @OldAccount
  SET @MyError = @@ERROR
 END
 IF @MyError = 0 BEGIN
  UPDATE SHNU SET Account = @NewAccount WHERE Account = @OldAccount
  SET @MyError = @@ERROR
 END
 IF @MyError = 0 BEGIN
  UPDATE SHWI SET Account = @NewAccount WHERE Account = @OldAccount
  SET @MyError = @@ERROR
 END
 IF @MyError = 0 BEGIN
  UPDATE StopPayment SET Account = @NewAccount WHERE Account = @OldAccount
  SET @MyError = @@ERROR
 END
 IF @MyError = 0 BEGIN
  UPDATE StopPayment SET FeeAccount = @NewAccount WHERE FeeAccount = @OldAccount
  SET @MyError = @@ERROR
 END
 IF @MyError = 0 BEGIN
  UPDATE Transfer SET Account = @NewAccount WHERE Account = @OldAccount
  SET @MyError = @@ERROR
 END
 IF @MyError = 0 BEGIN
  UPDATE Transfer SET ToAccount = @NewAccount WHERE ToAccount = @OldAccount
  SET @MyError = @@ERROR
 END
 IF @MyError = 0 BEGIN
  UPDATE udt_LPMT SET Account = @NewAccount WHERE Account = @OldAccount
  SET @MyError = @@ERROR
 END
 IF @MyError = 0 BEGIN
  UPDATE udt_LPOF SET Account = @NewAccount WHERE Account = @OldAccount
  SET @MyError = @@ERROR
 END
 IF @MyError = 0 BEGIN
  UPDATE udt_mmch SET Account = @NewAccount WHERE Account = @OldAccount
  SET @MyError = @@ERROR
 END
 
 -- Before commiting the transaction see if we had an error
 IF @MyError <> 0 BEGIN
  ROLLBACK TRAN UpdateAllAccountIds
  
  -- Get the error message
  SELECT @ErrorMessage = Description
  FROM master.dbo.sysmessages
  WHERE error = @MyError
  
  -- Write the error to our error table
  INSERT INTO tblErrorAcct (OldAccount, Message) VALUES (@OldAccount, @ErrorMessage)
  PRINT 'Error updateing' + STR(@OldAccount)
 END
 ELSE BEGIN
  COMMIT TRAN UpdateAllAccountIds
 END
 FETCH NEXT FROM curs_AccountIDs
 INTO @OldAccount,
   @NewAccount
 
END -- WHILE
CLOSE curs_AccountIDs
DEALLOCATE curs_AccountIDs
END
 /* SET nocount on */
 return
GO
/****** Object:  StoredProcedure [imssa].[EmailLocator]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/****** Object:  Stored Procedure dbo.EmailLocator    Script Date: 4/28/2001 12:16:08 PM ******/
CREATE PROCEDURE [imssa].[EmailLocator]
 @account int
 AS
 SELECT email1 from LoanApplication where account = @account
GO
/****** Object:  StoredProcedure [imssa].[LoanLocator]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/****** Object:  Stored Procedure dbo.LoanLocator    Script Date: 4/28/2001 12:16:08 PM ******/
CREATE PROCEDURE [imssa].[LoanLocator]
 @account int,
 @result int OUTPUT
 AS
 select * from LoanApplication where account = @account
 select @result = @@rowcount
 
 return (@@rowcount)
GO
/****** Object:  StoredProcedure [imssa].[LoanStatus_Approved]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/****** Object:  Stored Procedure dbo.LoanStatus_Approved    Script Date: 4/28/2001 12:16:08 PM ******/
CREATE PROCEDURE [imssa].[LoanStatus_Approved] 
 @account int
AS
 UPDATE LoanApplication SET DecisionReached = 1  WHERE account = @account
GO
/****** Object:  StoredProcedure [imssa].[LoanStatus_Denied]    Script Date: 1/4/2025 10:19:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/****** Object:  Stored Procedure dbo.LoanStatus_Denied    Script Date: 4/28/2001 12:16:08 PM ******/
CREATE PROCEDURE [imssa].[LoanStatus_Denied] 
 @account int
AS
 UPDATE LoanApplication SET DecisionReached = 9  WHERE account = @account
GO
USE [master]
GO
ALTER DATABASE [EStatements] SET  READ_WRITE 
GO
