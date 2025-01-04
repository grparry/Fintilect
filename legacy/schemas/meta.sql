USE [master]
GO
/****** Object:  Database [Meta]    Script Date: 1/4/2025 10:14:39 AM ******/
CREATE DATABASE [Meta]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Meta', FILENAME = N'E:\SQLDEVDBs\SQLData\Meta\Meta.mdf' , SIZE = 10142400KB , MAXSIZE = UNLIMITED, FILEGROWTH = 262144KB )
 LOG ON 
( NAME = N'Meta_Log', FILENAME = N'E:\SQLDEVDBs\SQLLog\Meta\Meta_log.ldf' , SIZE = 1241088KB , MAXSIZE = 2048GB , FILEGROWTH = 262144KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [Meta] SET COMPATIBILITY_LEVEL = 110
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Meta].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Meta] SET ANSI_NULL_DEFAULT ON 
GO
ALTER DATABASE [Meta] SET ANSI_NULLS ON 
GO
ALTER DATABASE [Meta] SET ANSI_PADDING ON 
GO
ALTER DATABASE [Meta] SET ANSI_WARNINGS ON 
GO
ALTER DATABASE [Meta] SET ARITHABORT ON 
GO
ALTER DATABASE [Meta] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [Meta] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Meta] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Meta] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Meta] SET CURSOR_DEFAULT  LOCAL 
GO
ALTER DATABASE [Meta] SET CONCAT_NULL_YIELDS_NULL ON 
GO
ALTER DATABASE [Meta] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Meta] SET QUOTED_IDENTIFIER ON 
GO
ALTER DATABASE [Meta] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Meta] SET  DISABLE_BROKER 
GO
ALTER DATABASE [Meta] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Meta] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Meta] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Meta] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Meta] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Meta] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Meta] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Meta] SET RECOVERY FULL 
GO
ALTER DATABASE [Meta] SET  MULTI_USER 
GO
ALTER DATABASE [Meta] SET PAGE_VERIFY NONE  
GO
ALTER DATABASE [Meta] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Meta] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Meta] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [Meta] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [Meta] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'Meta', N'ON'
GO
ALTER DATABASE [Meta] SET QUERY_STORE = OFF
GO
USE [Meta]
GO
/****** Object:  User [zmccann]    Script Date: 1/4/2025 10:14:39 AM ******/
CREATE USER [zmccann] FOR LOGIN [zmccann] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [WB\zmccann]    Script Date: 1/4/2025 10:14:39 AM ******/
CREATE USER [WB\zmccann] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [WB\WClark]    Script Date: 1/4/2025 10:14:39 AM ******/
CREATE USER [WB\WClark] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [WB\kgroff]    Script Date: 1/4/2025 10:14:39 AM ******/
CREATE USER [WB\kgroff] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [WB\kcoon]    Script Date: 1/4/2025 10:14:39 AM ******/
CREATE USER [WB\kcoon] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [WB\JHansen]    Script Date: 1/4/2025 10:14:39 AM ******/
CREATE USER [WB\JHansen] WITH DEFAULT_SCHEMA=[WB\JHansen]
GO
/****** Object:  User [WB\JFaust]    Script Date: 1/4/2025 10:14:39 AM ******/
CREATE USER [WB\JFaust] WITH DEFAULT_SCHEMA=[WB\JFaust]
GO
/****** Object:  User [WB\gmallo]    Script Date: 1/4/2025 10:14:39 AM ******/
CREATE USER [WB\gmallo] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [WB\Developers]    Script Date: 1/4/2025 10:14:39 AM ******/
CREATE USER [WB\Developers] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [WB\bmartin]    Script Date: 1/4/2025 10:14:39 AM ******/
CREATE USER [WB\bmartin] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [WB\alisc]    Script Date: 1/4/2025 10:14:39 AM ******/
CREATE USER [WB\alisc] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [Test]    Script Date: 1/4/2025 10:14:39 AM ******/
CREATE USER [Test] WITHOUT LOGIN WITH DEFAULT_SCHEMA=[Test]
GO
/****** Object:  User [META]    Script Date: 1/4/2025 10:14:39 AM ******/
CREATE USER [META] FOR LOGIN [META] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [mbodily]    Script Date: 1/4/2025 10:14:39 AM ******/
CREATE USER [mbodily] FOR LOGIN [mbodily] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [LSuarez]    Script Date: 1/4/2025 10:14:39 AM ******/
CREATE USER [LSuarez] WITHOUT LOGIN WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [KMartinez]    Script Date: 1/4/2025 10:14:39 AM ******/
CREATE USER [KMartinez] WITHOUT LOGIN WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [JHemy]    Script Date: 1/4/2025 10:14:39 AM ******/
CREATE USER [JHemy] FOR LOGIN [JHemy] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [JFaust]    Script Date: 1/4/2025 10:14:39 AM ******/
CREATE USER [JFaust] FOR LOGIN [JFaust] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [IMS_Dev]    Script Date: 1/4/2025 10:14:39 AM ******/
CREATE USER [IMS_Dev] FOR LOGIN [IMS_Dev] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [HMontoya]    Script Date: 1/4/2025 10:14:39 AM ******/
CREATE USER [HMontoya] WITHOUT LOGIN WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [Dev]    Script Date: 1/4/2025 10:14:39 AM ******/
CREATE USER [Dev] FOR LOGIN [Dev] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [D_ConnectFSSLCAdmin]    Script Date: 1/4/2025 10:14:39 AM ******/
CREATE USER [D_ConnectFSSLCAdmin] FOR LOGIN [D_ConnectFSSLCAdmin] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [CONNECTFSS\zmccann]    Script Date: 1/4/2025 10:14:39 AM ******/
CREATE USER [CONNECTFSS\zmccann] FOR LOGIN [CONNECTFSS\zmccann] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [CAlcala]    Script Date: 1/4/2025 10:14:39 AM ******/
CREATE USER [CAlcala] WITHOUT LOGIN WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [awarnick]    Script Date: 1/4/2025 10:14:39 AM ******/
CREATE USER [awarnick] FOR LOGIN [awarnick] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_datareader] ADD MEMBER [zmccann]
GO
ALTER ROLE [db_datareader] ADD MEMBER [WB\zmccann]
GO
ALTER ROLE [db_datareader] ADD MEMBER [WB\WClark]
GO
ALTER ROLE [db_datawriter] ADD MEMBER [WB\WClark]
GO
ALTER ROLE [db_datareader] ADD MEMBER [WB\kgroff]
GO
ALTER ROLE [db_datawriter] ADD MEMBER [WB\kgroff]
GO
ALTER ROLE [db_datareader] ADD MEMBER [WB\kcoon]
GO
ALTER ROLE [db_datareader] ADD MEMBER [WB\gmallo]
GO
ALTER ROLE [db_datawriter] ADD MEMBER [WB\gmallo]
GO
ALTER ROLE [db_owner] ADD MEMBER [WB\Developers]
GO
ALTER ROLE [db_owner] ADD MEMBER [WB\bmartin]
GO
ALTER ROLE [db_datareader] ADD MEMBER [WB\alisc]
GO
ALTER ROLE [db_datawriter] ADD MEMBER [WB\alisc]
GO
ALTER ROLE [db_owner] ADD MEMBER [Test]
GO
ALTER ROLE [db_owner] ADD MEMBER [META]
GO
ALTER ROLE [db_owner] ADD MEMBER [LSuarez]
GO
ALTER ROLE [db_owner] ADD MEMBER [KMartinez]
GO
ALTER ROLE [db_datareader] ADD MEMBER [JHemy]
GO
ALTER ROLE [db_owner] ADD MEMBER [IMS_Dev]
GO
ALTER ROLE [db_owner] ADD MEMBER [HMontoya]
GO
ALTER ROLE [db_owner] ADD MEMBER [Dev]
GO
ALTER ROLE [db_owner] ADD MEMBER [D_ConnectFSSLCAdmin]
GO
ALTER ROLE [db_datareader] ADD MEMBER [CONNECTFSS\zmccann]
GO
ALTER ROLE [db_owner] ADD MEMBER [CAlcala]
GO
ALTER ROLE [db_datareader] ADD MEMBER [awarnick]
GO
/****** Object:  Schema [Keys]    Script Date: 1/4/2025 10:14:39 AM ******/
CREATE SCHEMA [Keys]
GO
/****** Object:  Schema [PowerSym]    Script Date: 1/4/2025 10:14:39 AM ******/
CREATE SCHEMA [PowerSym]
GO
/****** Object:  Schema [Test]    Script Date: 1/4/2025 10:14:39 AM ******/
CREATE SCHEMA [Test]
GO
/****** Object:  Schema [WB\JFaust]    Script Date: 1/4/2025 10:14:39 AM ******/
CREATE SCHEMA [WB\JFaust]
GO
/****** Object:  Schema [WB\JHansen]    Script Date: 1/4/2025 10:14:39 AM ******/
CREATE SCHEMA [WB\JHansen]
GO
/****** Object:  Table [dbo].[AppConfigDetail]    Script Date: 1/4/2025 10:14:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AppConfigDetail](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ItemName] [varchar](1000) NOT NULL,
	[ItemDescription] [varchar](max) NULL,
	[ItemCategories] [varchar](50) NULL,
	[ItemValueOptions] [varchar](200) NULL,
	[ItemViewLevel] [int] NULL,
	[ItemEditLevel] [int] NULL,
	[CreatedBy] [varchar](50) NULL,
	[DateCreated] [datetime] NULL,
	[Version] [varchar](15) NULL,
	[WorkItem] [varchar](50) NULL,
	[Deprecated] [nvarchar](50) NULL,
	[Client] [varchar](250) NOT NULL,
	[Context] [varchar](250) NOT NULL,
	[Environment] [varchar](250) NOT NULL,
	[CollectedAt] [datetime] NOT NULL,
 CONSTRAINT [PK_AppConfigDetail] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Application]    Script Date: 1/4/2025 10:14:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Application](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ApplicationKey] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK_Application] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ApplicationConfigurationDefault]    Script Date: 1/4/2025 10:14:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ApplicationConfigurationDefault](
	[ApplicationConfigurationDefaultId] [int] IDENTITY(1,1) NOT NULL,
	[ApplicationVersionId] [int] NULL,
	[ParentId] [int] NULL,
	[Key] [varchar](2000) NOT NULL,
	[DefaultValue] [varchar](max) NULL,
	[Description] [varchar](max) NULL,
	[PossibleValues] [varchar](max) NULL,
	[IsParent] [bit] NOT NULL,
	[ClrType] [varchar](50) NOT NULL,
	[RemovedOnVersion] [int] NULL,
	[EnvirionmentSpecificConfig] [bit] NULL,
	[X_Application] [varchar](100) NULL,
	[X_ItemName] [varchar](1000) NULL,
	[X_ItemContext] [varchar](100) NULL,
	[SourceOfValues] [varchar](100) NULL,
	[IsInternalOnly] [bit] NULL,
	[MustProductionValueBeUnique] [bit] NOT NULL,
 CONSTRAINT [PK__Applicat__027A23E63D2FD909] PRIMARY KEY CLUSTERED 
(
	[ApplicationConfigurationDefaultId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 90, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ApplicationVersion]    Script Date: 1/4/2025 10:14:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ApplicationVersion](
	[ApplicationVersionId] [int] IDENTITY(1,1) NOT NULL,
	[Version] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[ApplicationVersionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AuthenticationMethods]    Script Date: 1/4/2025 10:14:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AuthenticationMethods](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PublicId] [uniqueidentifier] NOT NULL,
	[Name] [varchar](250) NOT NULL,
	[Description] [varchar](max) NOT NULL,
	[Weight] [int] NOT NULL,
	[MinimumApplicationVersion] [varchar](250) NULL,
 CONSTRAINT [PK_AuthenticationMethods] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Client]    Script Date: 1/4/2025 10:14:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Client](
	[ClientId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[CreatedBy] [int] NOT NULL,
	[ModifiedDate] [datetime2](7) NOT NULL,
	[ModifiedBy] [int] NOT NULL,
	[ClientShortName] [varchar](250) NULL,
	[ProjectManager] [varchar](100) NULL,
	[ClientPublicId] [uniqueidentifier] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ClientId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ClientConfigSetting]    Script Date: 1/4/2025 10:14:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ClientConfigSetting](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Client] [varchar](100) NOT NULL,
	[Environment] [varchar](50) NOT NULL,
	[Type] [varchar](50) NOT NULL,
	[Value] [varchar](max) NULL,
	[CollectedAt] [datetime] NOT NULL,
	[Key] [varchar](500) NOT NULL,
	[Context] [varchar](100) NOT NULL,
 CONSTRAINT [PK_dbo.ClientConfigurationSettings] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ClientContext]    Script Date: 1/4/2025 10:14:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ClientContext](
	[ClientContextId] [int] IDENTITY(1,1) NOT NULL,
	[ClientId] [int] NOT NULL,
	[ClientContextPublicId] [uniqueidentifier] NOT NULL,
	[Context] [varchar](250) NOT NULL,
	[MiddlewareConfigPath] [varchar](1000) NULL,
	[FinancialCoreMapperDllPath] [varchar](1000) NULL,
	[ImsClientConnectionInfo] [varchar](max) NULL,
	[AdminMiddlewareConfigPath] [varchar](1000) NULL,
	[AdminFinancialCoreMapperDllPath] [varchar](1000) NULL,
	[OfxFinancialCoreMapperDllPath] [varchar](1000) NULL,
	[OfxMiddlewareConfigPath] [varchar](1000) NULL,
	[OfxClientConnectionInfo] [varchar](max) NULL,
	[EstateMiddlewareConfigPath] [varchar](1000) NULL,
	[EstateClientConnectionInfo] [varchar](max) NULL,
	[NaoMiddlewareConfigPath] [varchar](1000) NULL,
	[NaoClientConnectionInfo] [varchar](max) NULL,
	[NaoOaoXmlConfigPath] [varchar](1000) NULL,
	[NaoAccountDeskXmlConfigPath] [varchar](1000) NULL,
	[NaoAdapiXmlConfigPath] [varchar](1000) NULL,
	[CurrentIosAppVersion] [varchar](250) NULL,
	[CurrentAndroidAppVersion] [varchar](250) NULL,
PRIMARY KEY CLUSTERED 
(
	[ClientContextId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 90, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ClientFeatures]    Script Date: 1/4/2025 10:14:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ClientFeatures](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ClientId] [int] NOT NULL,
	[FeatureId] [int] NOT NULL,
	[Licensed] [bit] NOT NULL,
 CONSTRAINT [PK_dbo.ClientFeatures] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ClientLicense]    Script Date: 1/4/2025 10:14:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ClientLicense](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ClientId] [int] NOT NULL,
	[LicenseId] [int] NOT NULL,
 CONSTRAINT [PK_ClientLicense] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ClientTestUser]    Script Date: 1/4/2025 10:14:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ClientTestUser](
	[ClientTestUserId] [int] IDENTITY(1,1) NOT NULL,
	[ClientContextId] [int] NOT NULL,
	[Username] [varchar](250) NULL,
	[AccountNumber] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[ClientTestUserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 90, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CredentialStore]    Script Date: 1/4/2025 10:14:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CredentialStore](
	[Id] [int] IDENTITY(10000,1) NOT NULL,
	[CreatedAt] [datetime] NOT NULL,
	[CredentialType] [varchar](100) NULL,
	[Name] [varchar](100) NULL,
	[EncryptedCredentials] [varchar](max) NULL,
	[Environment] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DefaultStringResource]    Script Date: 1/4/2025 10:14:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DefaultStringResource](
	[Id] [int] IDENTITY(10001,1) NOT NULL,
	[ResourceSet] [varchar](1000) NOT NULL,
	[Key] [varchar](1000) NOT NULL,
	[Culture] [varchar](100) NULL,
	[Value] [varchar](max) NULL,
	[EditPermissionLevel] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DisclosureTypes]    Script Date: 1/4/2025 10:14:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DisclosureTypes](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Type] [varchar](50) NULL,
	[StringResourceSet] [varchar](1000) NULL,
	[StringResourceKey] [varchar](1000) NULL,
 CONSTRAINT [PK_DisclosureType] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FeatureGroups]    Script Date: 1/4/2025 10:14:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FeatureGroups](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](200) NOT NULL,
	[Description] [varchar](max) NULL,
	[FeatureId] [int] NOT NULL,
	[FeeAdjustment] [money] NULL,
	[MaintenanceFee] [money] NULL,
	[MinimumVersion] [varchar](100) NULL,
	[DeprecatedVersion] [varchar](100) NULL,
 CONSTRAINT [PK_FeatureGroups] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 90, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Features]    Script Date: 1/4/2025 10:14:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Features](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ApplicationId] [int] NOT NULL,
	[FeatureKey] [varchar](100) NOT NULL,
	[Name] [varchar](200) NOT NULL,
	[Description] [varchar](max) NULL,
	[Benifits] [varchar](max) NULL,
	[Dependancies] [varchar](max) NULL,
	[LicenseFee] [money] NULL,
	[MaintenanceFee] [money] NULL,
	[IsActive] [bit] NULL,
	[MinimumVersion] [varchar](100) NULL,
	[DeprecatedVersion] [varchar](100) NULL,
 CONSTRAINT [PK_Features] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 90, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FeatureSettings]    Script Date: 1/4/2025 10:14:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FeatureSettings](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](250) NOT NULL,
	[Description] [varchar](max) NULL,
	[FeatureId] [int] NOT NULL,
	[GroupId] [int] NOT NULL,
	[IsInternalOnly] [bit] NULL,
 CONSTRAINT [PK_FeatureSettings_1] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FeatureSettings.Busted]    Script Date: 1/4/2025 10:14:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FeatureSettings.Busted](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](250) NOT NULL,
	[Description] [varchar](max) NULL,
	[FeatureId] [int] NOT NULL,
	[GroupId] [int] NOT NULL,
	[IsInternalOnly] [bit] NULL,
 CONSTRAINT [PK_FeatureSettings] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 90, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FeatureSettingValidValues]    Script Date: 1/4/2025 10:14:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FeatureSettingValidValues](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](250) NOT NULL,
	[Value] [varchar](max) NOT NULL,
	[IsDefault] [bit] NOT NULL,
	[SettingId] [int] NOT NULL,
 CONSTRAINT [PK_FeatureSettingValidValues] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FederalHolidays]    Script Date: 1/4/2025 10:14:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FederalHolidays](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[NewYearsDay] [date] NOT NULL,
	[MartinLutherKingJrDay] [date] NOT NULL,
	[PresidentsDay] [date] NOT NULL,
	[MemorialDay] [date] NOT NULL,
	[IndependenceDay] [date] NOT NULL,
	[LaborDay] [date] NOT NULL,
	[ColumbusDay] [date] NOT NULL,
	[VeteransDay] [date] NOT NULL,
	[ThanksgivingDay] [date] NOT NULL,
	[ChristmasDay] [date] NOT NULL,
 CONSTRAINT [PK_FederalHolidays] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[HostFileEntriesForDev]    Script Date: 1/4/2025 10:14:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HostFileEntriesForDev](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Ip] [varchar](50) NOT NULL,
	[Dns] [varchar](1000) NOT NULL,
	[Group] [varchar](1000) NULL,
PRIMARY KEY NONCLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LayeredSecurityFeature]    Script Date: 1/4/2025 10:14:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LayeredSecurityFeature](
	[Id] [int] IDENTITY(38,1) NOT NULL,
	[ApplicationId] [int] NOT NULL,
	[FeatureKey] [nvarchar](100) NOT NULL,
	[Name] [varchar](200) NOT NULL,
	[Description] [varchar](max) NULL,
	[IsUserFacing] [varchar](50) NOT NULL,
	[FeaturePublicId] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_LayeredSecurityFeature] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LayeredSecurityFeatureAction]    Script Date: 1/4/2025 10:14:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LayeredSecurityFeatureAction](
	[Id] [int] IDENTITY(31,1) NOT NULL,
	[PublicId] [uniqueidentifier] NOT NULL,
	[Name] [varchar](250) NOT NULL,
	[Description] [varchar](max) NOT NULL,
	[FeatureId] [int] NOT NULL,
	[StrongAuthenticationWeight] [int] NOT NULL,
	[MinimumApplicationVersion] [varchar](250) NULL,
	[IsLoginAction] [bit] NULL,
 CONSTRAINT [PK_LayeredSecurityFeatureAction] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[NaopClient]    Script Date: 1/4/2025 10:14:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NaopClient](
	[ClientId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[CreatedBy] [int] NOT NULL,
	[ModifiedDate] [datetime2](7) NOT NULL,
	[ModifiedBy] [int] NOT NULL,
	[ClientShortName] [varchar](250) NULL,
	[ProjectManager] [varchar](100) NULL,
	[ClientPublicId] [uniqueidentifier] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ClientId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[NaopClientContext]    Script Date: 1/4/2025 10:14:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NaopClientContext](
	[ClientContextId] [int] IDENTITY(1,1) NOT NULL,
	[ClientId] [int] NOT NULL,
	[ClientContextPublicId] [uniqueidentifier] NOT NULL,
	[Context] [varchar](250) NOT NULL,
	[MiddlewareConfigPath] [varchar](1000) NULL,
	[FinancialCoreMapperDllPath] [varchar](1000) NULL,
	[ImsClientConnectionInfo] [varchar](max) NULL,
	[AdminMiddlewareConfigPath] [varchar](1000) NULL,
	[AdminFinancialCoreMapperDllPath] [varchar](1000) NULL,
	[OfxFinancialCoreMapperDllPath] [varchar](1000) NULL,
	[OfxMiddlewareConfigPath] [varchar](1000) NULL,
	[OfxClientConnectionInfo] [varchar](max) NULL,
	[EstateMiddlewareConfigPath] [varchar](1000) NULL,
	[EstateClientConnectionInfo] [varchar](max) NULL,
	[NaoMiddlewareConfigPath] [varchar](1000) NULL,
	[NaoClientConnectionInfo] [varchar](max) NULL,
	[NaoOaoXmlConfigPath] [varchar](1000) NULL,
	[NaoAccountDeskXmlConfigPath] [varchar](1000) NULL,
	[NaoAdapiXmlConfigPath] [varchar](1000) NULL,
	[CurrentIosAppVersion] [varchar](250) NULL,
	[CurrentAndroidAppVersion] [varchar](250) NULL,
PRIMARY KEY CLUSTERED 
(
	[ClientContextId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 90, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[NaopDefaultConfiguration]    Script Date: 1/4/2025 10:14:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NaopDefaultConfiguration](
	[NaopConfigurationDefaultId] [int] IDENTITY(1,1) NOT NULL,
	[ApplicationVersionId] [int] NULL,
	[ParentId] [int] NULL,
	[Key] [varchar](2000) NOT NULL,
	[DefaultValue] [varchar](max) NULL,
	[Description] [varchar](max) NULL,
	[PossibleValues] [varchar](max) NULL,
	[IsParent] [bit] NOT NULL,
	[ClrType] [varchar](50) NOT NULL,
	[RemovedOnVersion] [int] NULL,
	[EnvirionmentSpecificConfig] [bit] NULL,
	[X_Application] [varchar](100) NULL,
	[X_ItemName] [varchar](1000) NULL,
	[X_ItemContext] [varchar](100) NULL,
	[SourceOfValues] [varchar](100) NULL,
	[IsInternalOnly] [bit] NULL,
	[MustProductionValueBeUnique] [bit] NOT NULL,
 CONSTRAINT [PK__NaopConfigurationDefault] PRIMARY KEY CLUSTERED 
(
	[NaopConfigurationDefaultId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[NaopDefaultStringResource]    Script Date: 1/4/2025 10:14:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NaopDefaultStringResource](
	[Id] [int] IDENTITY(10001,1) NOT NULL,
	[ResourceSet] [varchar](1000) NOT NULL,
	[Key] [varchar](1000) NOT NULL,
	[Culture] [varchar](100) NULL,
	[Value] [varchar](max) NULL,
	[EditPermissionLevel] [int] NULL,
 CONSTRAINT [PK__NaopDefaultStringResource] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OmegaUser]    Script Date: 1/4/2025 10:14:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OmegaUser](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PublicId] [uniqueidentifier] NOT NULL,
	[UserName] [varchar](200) NULL,
	[PermissionLevel] [int] NOT NULL,
	[PasswordHash] [varchar](250) NULL,
	[Email] [varchar](250) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[ModifiedBy] [varchar](50) NOT NULL,
	[ActionTaken] [varchar](1000) NOT NULL,
	[Deleted] [bit] NULL,
	[ClientPublicId] [uniqueidentifier] NULL,
	[PasswordChangeDateUtc] [datetime] NOT NULL,
	[InvalidLoginCount] [int] NOT NULL,
 CONSTRAINT [PK__OmegaUse__3214EC0774089B16] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 90, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OmegaUserEmailResetToken]    Script Date: 1/4/2025 10:14:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OmegaUserEmailResetToken](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PublicId] [uniqueidentifier] NOT NULL,
	[UserName] [varchar](200) NOT NULL,
	[Expiration] [datetime] NOT NULL,
	[HasBeenUsed] [bit] NOT NULL,
	[Email] [varchar](250) NOT NULL,
 CONSTRAINT [PK_OmegaUserEmailResetToken] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OmegaUserMapToPermissionGroup]    Script Date: 1/4/2025 10:14:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OmegaUserMapToPermissionGroup](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[OmegaUserPublicId] [uniqueidentifier] NOT NULL,
	[PermissionGroupId] [int] NOT NULL,
	[LastUpdatedAtUtc] [datetime2](7) NOT NULL,
	[LastModifiedBy] [varchar](500) NOT NULL,
 CONSTRAINT [PK_OmegaUserMapToPermissionGroup] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UC_OmegaUserMapToPermissionGroup] UNIQUE NONCLUSTERED 
(
	[OmegaUserPublicId] ASC,
	[PermissionGroupId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OmegaUserPermissionGroup]    Script Date: 1/4/2025 10:14:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OmegaUserPermissionGroup](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](500) NOT NULL,
	[Permissions] [varchar](max) NOT NULL,
	[CreatedAtUtc] [datetime2](7) NOT NULL,
	[LastUpdatedAtUtc] [datetime2](7) NOT NULL,
	[LastModifiedBy] [varchar](500) NOT NULL,
	[ClientId] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_OmegaUserPermissionGroup] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ReactNativeBundle]    Script Date: 1/4/2025 10:14:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ReactNativeBundle](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PublicId] [uniqueidentifier] NOT NULL,
	[Platform] [varchar](50) NOT NULL,
	[Bundle] [varbinary](max) NOT NULL,
	[BundleHash] [varbinary](max) NOT NULL,
	[Comment] [varchar](3000) NULL,
	[CreatedDate] [datetime] NOT NULL,
	[DeactivatedDate] [datetime] NULL,
	[ClientId] [int] NULL,
	[MinimumApplicationVersion] [varchar](250) NULL,
 CONSTRAINT [PK_ReactNativeBundle] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 90, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SupportedMobileAppVersion]    Script Date: 1/4/2025 10:14:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SupportedMobileAppVersion](
	[ApplicationId] [int] NOT NULL,
	[MinSupportedIosVersionId] [int] NOT NULL,
	[MinSupportedAndroidVersionId] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Theme]    Script Date: 1/4/2025 10:14:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Theme](
	[PublicId] [uniqueidentifier] NOT NULL,
	[ParentThemePublicId] [uniqueidentifier] NULL,
	[Title] [varchar](250) NOT NULL,
	[Notes] [varchar](max) NULL,
	[Product] [varchar](30) NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[DeprecatedDate] [datetime] NULL,
	[ZipFile] [varbinary](max) NULL,
	[ZipHash] [varbinary](max) NULL,
	[ClientId] [int] NULL,
	[PublishedDate] [datetime] NULL,
	[DevelopmentThemePublicId] [uniqueidentifier] NULL,
	[MinimumIosVersion] [varchar](16) NULL,
	[MinimumAndroidVersion] [varchar](16) NULL,
 CONSTRAINT [PK_Theme] PRIMARY KEY CLUSTERED 
(
	[PublicId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 90, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [IX_ThemePublicUnique] UNIQUE NONCLUSTERED 
(
	[PublicId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[theme_240316]    Script Date: 1/4/2025 10:14:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[theme_240316](
	[PublicId] [uniqueidentifier] NOT NULL,
	[ParentThemePublicId] [uniqueidentifier] NULL,
	[Title] [varchar](250) NOT NULL,
	[Notes] [varchar](max) NULL,
	[Product] [varchar](30) NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[DeprecatedDate] [datetime] NULL,
	[ZipFile] [varbinary](max) NULL,
	[ZipHash] [varbinary](max) NULL,
	[ClientId] [int] NULL,
	[PublishedDate] [datetime] NULL,
	[DevelopmentThemePublicId] [uniqueidentifier] NULL,
	[MinimumIosVersion] [varchar](16) NULL,
	[MinimumAndroidVersion] [varchar](16) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ThemeDeployment]    Script Date: 1/4/2025 10:14:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ThemeDeployment](
	[DeploymentId] [uniqueidentifier] NOT NULL,
	[Description] [nvarchar](512) NULL,
	[DateCreatedUtc] [datetime] NOT NULL,
	[LastUpdatedUtc] [datetime] NOT NULL,
	[DeploymentVersion] [nvarchar](100) NULL,
	[Title] [nvarchar](100) NULL,
	[DefaultDeploymentVersion] [uniqueidentifier] NULL,
	[ThemeBundles] [varchar](max) NULL,
	[MinAndroidVersion] [nvarchar](100) NULL,
	[MinIosVersion] [nvarchar](100) NULL,
 CONSTRAINT [PK_ThemeDeployment] PRIMARY KEY CLUSTERED 
(
	[DeploymentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ThemeFile]    Script Date: 1/4/2025 10:14:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ThemeFile](
	[PublicId] [uniqueidentifier] NOT NULL,
	[ThemePublicId] [uniqueidentifier] NOT NULL,
	[ThemeFileParentAction] [varchar](30) NULL,
	[Filename] [varchar](500) NOT NULL,
	[Contents] [varbinary](max) NULL,
	[FileHash] [varbinary](max) NULL,
	[Notes] [varchar](max) NULL,
	[CreatedDate] [datetime] NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[DeprecatedDate] [datetime] NULL,
	[OutputContents] [varbinary](max) NULL,
 CONSTRAINT [PK_ThemeFile_1] PRIMARY KEY CLUSTERED 
(
	[PublicId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 90, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [IX_ThemePublicIdUnique] UNIQUE NONCLUSTERED 
(
	[PublicId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 90, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ThemeUnitTest]    Script Date: 1/4/2025 10:14:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ThemeUnitTest](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Title] [varchar](500) NULL,
	[Data] [varchar](max) NOT NULL,
	[Notes] [varchar](max) NULL,
	[CreatedDate] [datetime] NOT NULL,
	[LastRunDate] [datetime] NULL,
	[LastRunWasSuccessful] [bit] NULL,
	[DeprecatedDate] [datetime] NULL,
 CONSTRAINT [PK_ThemeUnitTest] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [PowerSym].[Client]    Script Date: 1/4/2025 10:14:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [PowerSym].[Client](
	[InstitutionGuid] [uniqueidentifier] NOT NULL,
	[InstitutionId] [bigint] NOT NULL,
	[InstitutionName] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Client] PRIMARY KEY CLUSTERED 
(
	[InstitutionGuid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [PowerSym].[Context]    Script Date: 1/4/2025 10:14:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [PowerSym].[Context](
	[ContextGuid] [uniqueidentifier] NOT NULL,
	[InstitutionGuid] [uniqueidentifier] NOT NULL,
	[ContextName] [nvarchar](max) NOT NULL,
	[HomeBankingConnectionString] [nvarchar](max) NOT NULL,
	[MobileConnectionString] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Context] PRIMARY KEY CLUSTERED 
(
	[ContextGuid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [PowerSym].[SymmetryVersions]    Script Date: 1/4/2025 10:14:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [PowerSym].[SymmetryVersions](
	[VersionId] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](max) NOT NULL,
	[ApplicationName] [nvarchar](20) NOT NULL,
 CONSTRAINT [PK_SymmetryVersions] PRIMARY KEY CLUSTERED 
(
	[VersionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [PowerSym].[Theme]    Script Date: 1/4/2025 10:14:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [PowerSym].[Theme](
	[ThemeId] [uniqueidentifier] NOT NULL,
	[ThemeName] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Theme] PRIMARY KEY CLUSTERED 
(
	[ThemeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ_Key-20240829-141934]    Script Date: 1/4/2025 10:14:39 AM ******/
CREATE UNIQUE NONCLUSTERED INDEX [UQ_Key-20240829-141934] ON [dbo].[ApplicationConfigurationDefault]
(
	[Key] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_OmegaUserPermissionGroup]    Script Date: 1/4/2025 10:14:39 AM ******/
CREATE NONCLUSTERED INDEX [IX_OmegaUserPermissionGroup] ON [dbo].[OmegaUserPermissionGroup]
(
	[ClientId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[ApplicationConfigurationDefault] ADD  CONSTRAINT [DF__Applicati__IsPar__38FC8AC4]  DEFAULT ((0)) FOR [IsParent]
GO
ALTER TABLE [dbo].[ApplicationConfigurationDefault] ADD  CONSTRAINT [DF__Applicati__ClrTy__39F0AEFD]  DEFAULT ('object') FOR [ClrType]
GO
ALTER TABLE [dbo].[ApplicationConfigurationDefault] ADD  CONSTRAINT [DF_ApplicationConfigurationDefault_MustProductionValueBeUnique]  DEFAULT ((0)) FOR [MustProductionValueBeUnique]
GO
ALTER TABLE [dbo].[Client] ADD  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[Client] ADD  DEFAULT (getdate()) FOR [ModifiedDate]
GO
ALTER TABLE [dbo].[Client] ADD  CONSTRAINT [DF__Client__ClientPu__580B21C9]  DEFAULT (newid()) FOR [ClientPublicId]
GO
ALTER TABLE [dbo].[ClientContext] ADD  DEFAULT (newid()) FOR [ClientContextPublicId]
GO
ALTER TABLE [dbo].[NaopClient] ADD  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[NaopClient] ADD  DEFAULT (getdate()) FOR [ModifiedDate]
GO
ALTER TABLE [dbo].[NaopClient] ADD  CONSTRAINT [DF__NaopClient__ClientPu__580B21C9]  DEFAULT (newid()) FOR [ClientPublicId]
GO
ALTER TABLE [dbo].[NaopClientContext] ADD  DEFAULT (newid()) FOR [ClientContextPublicId]
GO
ALTER TABLE [dbo].[NaopDefaultConfiguration] ADD  CONSTRAINT [DF__NaopConfig__IsPar]  DEFAULT ((0)) FOR [IsParent]
GO
ALTER TABLE [dbo].[NaopDefaultConfiguration] ADD  CONSTRAINT [DF__NaopConfig__ClrTy]  DEFAULT ('object') FOR [ClrType]
GO
ALTER TABLE [dbo].[NaopDefaultConfiguration] ADD  CONSTRAINT [DF_NaopConfigurationDefault_MustProductionValueBeUnique]  DEFAULT ((0)) FOR [MustProductionValueBeUnique]
GO
ALTER TABLE [dbo].[OmegaUser] ADD  CONSTRAINT [DF_OmegaUser_Email]  DEFAULT ('') FOR [Email]
GO
ALTER TABLE [dbo].[OmegaUser] ADD  CONSTRAINT [DF_OmegaUser_PasswordChangeDateUtc]  DEFAULT (getutcdate()) FOR [PasswordChangeDateUtc]
GO
ALTER TABLE [dbo].[OmegaUser] ADD  CONSTRAINT [DF_OmegaUser_InvalidLoginCount]  DEFAULT ((0)) FOR [InvalidLoginCount]
GO
ALTER TABLE [dbo].[OmegaUserEmailResetToken] ADD  CONSTRAINT [DF_OmegaUserEmailResetToken_HasBeenUsed]  DEFAULT ((0)) FOR [HasBeenUsed]
GO
ALTER TABLE [dbo].[ReactNativeBundle] ADD  CONSTRAINT [DF__ReactNati__Publi__65651CE7]  DEFAULT (newid()) FOR [PublicId]
GO
ALTER TABLE [dbo].[ReactNativeBundle] ADD  CONSTRAINT [DF__ReactNati__Creat__66594120]  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[Theme] ADD  CONSTRAINT [DF__Theme__Publi__65651CE7]  DEFAULT (newsequentialid()) FOR [PublicId]
GO
ALTER TABLE [dbo].[Theme] ADD  CONSTRAINT [DF__Theme__Creat__66594120]  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[Theme] ADD  CONSTRAINT [DF__Theme__Mod__66594120]  DEFAULT (getdate()) FOR [ModifiedDate]
GO
ALTER TABLE [dbo].[ThemeDeployment] ADD  CONSTRAINT [DF_ThemeDeployment_DateCreatedUtc]  DEFAULT (getdate()) FOR [DateCreatedUtc]
GO
ALTER TABLE [dbo].[ThemeDeployment] ADD  CONSTRAINT [DF_ThemeDeployment_LastUpdatedUtc]  DEFAULT (getdate()) FOR [LastUpdatedUtc]
GO
ALTER TABLE [dbo].[ThemeFile] ADD  CONSTRAINT [DF__ThemeFile__Publi__65651CE7]  DEFAULT (newsequentialid()) FOR [PublicId]
GO
ALTER TABLE [dbo].[ThemeFile] ADD  CONSTRAINT [DF__ThemeFile__Creat__66594120]  DEFAULT (getutcdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[ThemeFile] ADD  CONSTRAINT [DF__ThemeFile__Mod__66594120]  DEFAULT (getutcdate()) FOR [ModifiedDate]
GO
ALTER TABLE [dbo].[ApplicationConfigurationDefault]  WITH CHECK ADD  CONSTRAINT [FK_ApplicationConfigurationDefault_ApplicationConfigurationDefault] FOREIGN KEY([ParentId])
REFERENCES [dbo].[ApplicationConfigurationDefault] ([ApplicationConfigurationDefaultId])
GO
ALTER TABLE [dbo].[ApplicationConfigurationDefault] CHECK CONSTRAINT [FK_ApplicationConfigurationDefault_ApplicationConfigurationDefault]
GO
ALTER TABLE [dbo].[ApplicationConfigurationDefault]  WITH CHECK ADD  CONSTRAINT [FK_ApplicationConfigurationDefault_ApplicationVersion] FOREIGN KEY([ApplicationVersionId])
REFERENCES [dbo].[ApplicationVersion] ([ApplicationVersionId])
GO
ALTER TABLE [dbo].[ApplicationConfigurationDefault] CHECK CONSTRAINT [FK_ApplicationConfigurationDefault_ApplicationVersion]
GO
ALTER TABLE [dbo].[ClientContext]  WITH CHECK ADD  CONSTRAINT [FK_ClientContext_Client] FOREIGN KEY([ClientId])
REFERENCES [dbo].[Client] ([ClientId])
GO
ALTER TABLE [dbo].[ClientContext] CHECK CONSTRAINT [FK_ClientContext_Client]
GO
ALTER TABLE [dbo].[ClientFeatures]  WITH CHECK ADD  CONSTRAINT [FK_ClientFeatures_Client] FOREIGN KEY([ClientId])
REFERENCES [dbo].[Client] ([ClientId])
GO
ALTER TABLE [dbo].[ClientFeatures] CHECK CONSTRAINT [FK_ClientFeatures_Client]
GO
ALTER TABLE [dbo].[ClientLicense]  WITH CHECK ADD  CONSTRAINT [FK_ClientLicense_Client] FOREIGN KEY([ClientId])
REFERENCES [dbo].[Client] ([ClientId])
GO
ALTER TABLE [dbo].[ClientLicense] CHECK CONSTRAINT [FK_ClientLicense_Client]
GO
ALTER TABLE [dbo].[ClientTestUser]  WITH CHECK ADD  CONSTRAINT [FK_ClientTestUser_ClientContext] FOREIGN KEY([ClientContextId])
REFERENCES [dbo].[ClientContext] ([ClientContextId])
GO
ALTER TABLE [dbo].[ClientTestUser] CHECK CONSTRAINT [FK_ClientTestUser_ClientContext]
GO
ALTER TABLE [dbo].[NaopClientContext]  WITH CHECK ADD  CONSTRAINT [FK_NaopClientContext_NaopClient] FOREIGN KEY([ClientId])
REFERENCES [dbo].[NaopClient] ([ClientId])
GO
ALTER TABLE [dbo].[NaopClientContext] CHECK CONSTRAINT [FK_NaopClientContext_NaopClient]
GO
ALTER TABLE [dbo].[NaopDefaultConfiguration]  WITH CHECK ADD  CONSTRAINT [FK_NaopConfigurationDefault_ApplicationVersion] FOREIGN KEY([ApplicationVersionId])
REFERENCES [dbo].[ApplicationVersion] ([ApplicationVersionId])
GO
ALTER TABLE [dbo].[NaopDefaultConfiguration] CHECK CONSTRAINT [FK_NaopConfigurationDefault_ApplicationVersion]
GO
ALTER TABLE [dbo].[NaopDefaultConfiguration]  WITH CHECK ADD  CONSTRAINT [FK_NaopConfigurationDefault_NaopConfigurationDefault] FOREIGN KEY([ParentId])
REFERENCES [dbo].[NaopDefaultConfiguration] ([NaopConfigurationDefaultId])
GO
ALTER TABLE [dbo].[NaopDefaultConfiguration] CHECK CONSTRAINT [FK_NaopConfigurationDefault_NaopConfigurationDefault]
GO
ALTER TABLE [dbo].[ReactNativeBundle]  WITH CHECK ADD  CONSTRAINT [FK_ReactNativeBundle_Client] FOREIGN KEY([ClientId])
REFERENCES [dbo].[Client] ([ClientId])
GO
ALTER TABLE [dbo].[ReactNativeBundle] CHECK CONSTRAINT [FK_ReactNativeBundle_Client]
GO
ALTER TABLE [dbo].[Theme]  WITH CHECK ADD  CONSTRAINT [FK_Theme_Client] FOREIGN KEY([ClientId])
REFERENCES [dbo].[Client] ([ClientId])
GO
ALTER TABLE [dbo].[Theme] CHECK CONSTRAINT [FK_Theme_Client]
GO
ALTER TABLE [dbo].[Theme]  WITH CHECK ADD  CONSTRAINT [FK_Theme_Parent] FOREIGN KEY([ParentThemePublicId])
REFERENCES [dbo].[Theme] ([PublicId])
GO
ALTER TABLE [dbo].[Theme] CHECK CONSTRAINT [FK_Theme_Parent]
GO
ALTER TABLE [dbo].[ThemeFile]  WITH CHECK ADD  CONSTRAINT [FK_ThemeFile_Theme] FOREIGN KEY([ThemePublicId])
REFERENCES [dbo].[Theme] ([PublicId])
GO
ALTER TABLE [dbo].[ThemeFile] CHECK CONSTRAINT [FK_ThemeFile_Theme]
GO
ALTER TABLE [PowerSym].[Context]  WITH CHECK ADD  CONSTRAINT [FK_Context_Client_InstitutionGuid] FOREIGN KEY([InstitutionGuid])
REFERENCES [PowerSym].[Client] ([InstitutionGuid])
ON DELETE CASCADE
GO
ALTER TABLE [PowerSym].[Context] CHECK CONSTRAINT [FK_Context_Client_InstitutionGuid]
GO
ALTER TABLE [dbo].[ReactNativeBundle]  WITH CHECK ADD  CONSTRAINT [chk_Platform] CHECK  (([Platform]='iOS' OR [Platform]='Android'))
GO
ALTER TABLE [dbo].[ReactNativeBundle] CHECK CONSTRAINT [chk_Platform]
GO
ALTER TABLE [dbo].[Theme]  WITH CHECK ADD  CONSTRAINT [chk_Product] CHECK  (([Product]='ConnectNative' OR [Product]='FlexUi'))
GO
ALTER TABLE [dbo].[Theme] CHECK CONSTRAINT [chk_Product]
GO
ALTER TABLE [dbo].[ThemeFile]  WITH CHECK ADD  CONSTRAINT [chk_ThemeFile_ThemeFileParentAction] CHECK  (([ThemeFileParentAction]='replace' OR [ThemeFileParentAction]='append' OR [ThemeFileParentAction]='prepend' OR [ThemeFileParentAction]='delete' OR [ThemeFileParentAction]='modify'))
GO
ALTER TABLE [dbo].[ThemeFile] CHECK CONSTRAINT [chk_ThemeFile_ThemeFileParentAction]
GO
/****** Object:  StoredProcedure [dbo].[sp_OmegaRemoveByEmail_SeleniumTesting]    Script Date: 1/4/2025 10:14:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create Procedure [dbo].[sp_OmegaRemoveByEmail_SeleniumTesting]
	@email varchar
AS

DELETE FROM OmegaUser
WHERE Email = @email
GO
/****** Object:  StoredProcedure [dbo].[sp_OmegaRemoveUser_SeleniumTesting]    Script Date: 1/4/2025 10:14:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE Procedure  [dbo].[sp_OmegaRemoveUser_SeleniumTesting] 
	@email varchar,
	@UserName varchar
AS

Begin

DELETE FROM [Meta].dbo.OmegaUser
WHERE Email = @email


DELETE FROM  [Meta].dbo.OmegaUserEmailResetToken
WHERE UserName  = @UserName

End

GO
/****** Object:  StoredProcedure [dbo].[sp_UpdateMetaTableSchema]    Script Date: 1/4/2025 10:14:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_UpdateMetaTableSchema]
	
AS
BEGIN
	SET NOCOUNT ON
	--ApplicationConfigurationDefault
	IF COL_LENGTH('dbo.ApplicationConfigurationDefault', 'ApplicationConfigurationDefaultId') IS NULL
	BEGIN
		ALTER TABLE ApplicationConfigurationDefault
		ADD ApplicationConfigurationDefaultId int NOT NULL
	END
	IF COL_LENGTH('dbo.ApplicationConfigurationDefault', 'ApplicationVersionId') IS NULL
	BEGIN
		ALTER TABLE ApplicationConfigurationDefault
		ADD ApplicationVersionId int NOT NULL
	END
	IF COL_LENGTH('dbo.ApplicationConfigurationDefault', 'ParentId') IS NULL
	BEGIN
		ALTER TABLE ApplicationConfigurationDefault
		ADD ParentId int NOT NULL
	END
	IF COL_LENGTH('dbo.ApplicationConfigurationDefault', 'KEY') IS NULL
	BEGIN
		ALTER TABLE ApplicationConfigurationDefault
		ADD [Key] varchar(2000) NULL
	END
	IF COL_LENGTH('dbo.ApplicationConfigurationDefault', 'DefaultValue') IS NULL
	BEGIN
		ALTER TABLE ApplicationConfigurationDefault
		ADD DefaultValue varchar(MAX) NOT NULL
	END
	IF COL_LENGTH('dbo.ApplicationConfigurationDefault', 'Description') IS NULL
	BEGIN
		ALTER TABLE ApplicationConfigurationDefault
		ADD Description varchar(MAX) NOT NULL
	END
	IF COL_LENGTH('dbo.ApplicationConfigurationDefault', 'PossibleValues') IS NULL
	BEGIN
		ALTER TABLE ApplicationConfigurationDefault
		ADD PossibleValues varchar(MAX) NOT NULL
	END
	IF COL_LENGTH('dbo.ApplicationConfigurationDefault', 'IsParent') IS NULL
	BEGIN
		ALTER TABLE ApplicationConfigurationDefault
		ADD IsParent bit NULL
	END
	IF COL_LENGTH('dbo.ApplicationConfigurationDefault', 'ClrType') IS NULL
	BEGIN
		ALTER TABLE ApplicationConfigurationDefault
		ADD ClrType varchar(50) NULL
	END
	IF COL_LENGTH('dbo.ApplicationConfigurationDefault', 'RemovedOnVersion') IS NULL
	BEGIN
		ALTER TABLE ApplicationConfigurationDefault
		ADD RemovedOnVersion int NOT NULL
	END
	IF COL_LENGTH('dbo.ApplicationConfigurationDefault', 'EnvirionmentSpecificConfig') IS NULL
	BEGIN
		ALTER TABLE ApplicationConfigurationDefault
		ADD EnvirionmentSpecificConfig bit NOT NULL
	END
	IF COL_LENGTH('dbo.ApplicationConfigurationDefault', 'X_Application') IS NULL
	BEGIN
		ALTER TABLE ApplicationConfigurationDefault
		ADD X_Application varchar(100) NOT NULL
	END
	IF COL_LENGTH('dbo.ApplicationConfigurationDefault', 'X_ItemName') IS NULL
	BEGIN
		ALTER TABLE ApplicationConfigurationDefault
		ADD X_ItemName varchar(1000) NOT NULL
	END
	IF COL_LENGTH('dbo.ApplicationConfigurationDefault', 'X_ItemContext') IS NULL
	BEGIN
		ALTER TABLE ApplicationConfigurationDefault
		ADD X_ItemContext varchar(100) NOT NULL
	END
	IF COL_LENGTH('dbo.ApplicationConfigurationDefault', 'SourceOfValues') IS NULL
	BEGIN
		ALTER TABLE ApplicationConfigurationDefault
		ADD SourceOfValues varchar(100) NULL
	END
	IF COL_LENGTH('dbo.ApplicationConfigurationDefault', 'IsInternalOnly') IS NULL
	BEGIN
		ALTER TABLE ApplicationConfigurationDefault
		ADD IsInternalOnly bit NULL
	END

	--ApplicationVersion
	IF COL_LENGTH('dbo.ApplicationVersion', 'ApplicationVersionId') IS NULL
	BEGIN
		ALTER TABLE ApplicationVersion
		ADD ApplicationVersionId int NOT NULL
	END
	IF COL_LENGTH('dbo.ApplicationVersion', 'Version') IS NULL
	BEGIN
		ALTER TABLE ApplicationVersion
		ADD Version varchar(50) NULL
	END

	--DefaultStringResource
	IF COL_LENGTH('dbo.DefaultStringResource', 'Id') IS NULL
	BEGIN
		ALTER TABLE DefaultStringResource
		ADD Id int NOT NULL
	END
	IF COL_LENGTH('dbo.DefaultStringResource', 'ResourceSet') IS NULL
	BEGIN
		ALTER TABLE DefaultStringResource
		ADD ResourceSet varchar(1000) NOT NULL
	END
	IF COL_LENGTH('dbo.DefaultStringResource', 'Key') IS NULL
	BEGIN
		ALTER TABLE DefaultStringResource
		ADD [Key] varchar(1000) NOT NULL
	END
	IF COL_LENGTH('dbo.DefaultStringResource', 'Culture') IS NULL
	BEGIN
		ALTER TABLE DefaultStringResource
		ADD Culture varchar(100) NULL
	END
	IF COL_LENGTH('dbo.DefaultStringResource', 'Value') IS NULL
	BEGIN
		ALTER TABLE DefaultStringResource
		ADD [Value] varchar(MAX) NULL
	END
	IF COL_LENGTH('dbo.DefaultStringResource', 'EditPermissionLevel') IS NULL
	BEGIN
		ALTER TABLE DefaultStringResource
		ADD EditPermissionLevel int NULL
	END

	--AuthenticationMethods
	IF COL_LENGTH('dbo.AuthenticationMethods', 'Id') IS NULL
	BEGIN
		ALTER TABLE AuthenticationMethods
		ADD Id int NOT NULL
	END
	IF COL_LENGTH('dbo.AuthenticationMethods', 'PublicId') IS NULL
	BEGIN
		ALTER TABLE AuthenticationMethods
		ADD PublicId uniqueidentifier NOT NULL
	END
	IF COL_LENGTH('dbo.AuthenticationMethods', 'Name') IS NULL
	BEGIN
		ALTER TABLE AuthenticationMethods
		ADD Name varchar(250) NOT NULL
	END
	IF COL_LENGTH('dbo.AuthenticationMethods', 'Description') IS NULL
	BEGIN
		ALTER TABLE AuthenticationMethods
		ADD Description varchar(MAX) NOT NULL
	END
	IF COL_LENGTH('dbo.AuthenticationMethods', 'Weight') IS NULL
	BEGIN
		ALTER TABLE AuthenticationMethods
		ADD Weight int NOT NULL
	END
	IF COL_LENGTH('dbo.AuthenticationMethods', 'MinimumApplicationVersion') IS NULL
	BEGIN
		ALTER TABLE AuthenticationMethods
		ADD MinimumApplicationVersion varchar(250) NULL
	END

	--LayeredSecurityFeature
	IF COL_LENGTH('dbo.LayeredSecurityFeature', 'Id') IS NULL
	BEGIN
		ALTER TABLE LayeredSecurityFeature
		ADD Id int NOT NULL
	END
	IF COL_LENGTH('dbo.LayeredSecurityFeature', 'ApplicationId') IS NULL
	BEGIN
		ALTER TABLE LayeredSecurityFeature
		ADD ApplicationId int NOT NULL
	END
	IF COL_LENGTH('dbo.LayeredSecurityFeature', 'FeatureKey') IS NULL
	BEGIN
		ALTER TABLE LayeredSecurityFeature
		ADD FeatureKey nvarchar(100) NOT NULL
	END
	IF COL_LENGTH('dbo.LayeredSecurityFeature', 'Name') IS NULL
	BEGIN
		ALTER TABLE LayeredSecurityFeature
		ADD Name varchar(200) NOT NULL
	END
	IF COL_LENGTH('dbo.LayeredSecurityFeature', 'Description') IS NULL
	BEGIN
		ALTER TABLE LayeredSecurityFeature
		ADD Description varchar(MAX) NULL
	END
	IF COL_LENGTH('dbo.LayeredSecurityFeature', 'IsUserFacing') IS NULL
	BEGIN
		ALTER TABLE LayeredSecurityFeature
		ADD IsUserFacing varchar(50) NOT NULL
	END
	IF COL_LENGTH('dbo.LayeredSecurityFeature', 'FeaturePublicId') IS NULL
	BEGIN
		ALTER TABLE LayeredSecurityFeature
		ADD FeaturePublicId uniqueidentifier NOT NULL
	END

	--LayeredSecurityFeatureAction
	IF COL_LENGTH('dbo.LayeredSecurityFeatureAction', 'Id') IS NULL
	BEGIN
		ALTER TABLE LayeredSecurityFeatureAction
		ADD Id int NOT NULL
	END
	IF COL_LENGTH('dbo.LayeredSecurityFeatureAction', 'PublicId') IS NULL
	BEGIN
		ALTER TABLE LayeredSecurityFeatureAction
		ADD PublicId uniqueidentifier NOT NULL
	END
	IF COL_LENGTH('dbo.LayeredSecurityFeatureAction', 'Name') IS NULL
	BEGIN
		ALTER TABLE LayeredSecurityFeatureAction
		ADD Name varchar(250) NOT NULL
	END
	IF COL_LENGTH('dbo.LayeredSecurityFeatureAction', 'Description') IS NULL
	BEGIN
		ALTER TABLE LayeredSecurityFeatureAction
		ADD Description varchar(MAX) NOT NULL
	END
	IF COL_LENGTH('dbo.LayeredSecurityFeatureAction', 'FeatureId') IS NULL
	BEGIN
		ALTER TABLE LayeredSecurityFeatureAction
		ADD FeatureId int NOT NULL
	END
	IF COL_LENGTH('dbo.LayeredSecurityFeatureAction', 'StrongAuthenticationWeight') IS NULL
	BEGIN
		ALTER TABLE LayeredSecurityFeatureAction
		ADD StrongAuthenticationWeight int NOT NULL
	END
	IF COL_LENGTH('dbo.LayeredSecurityFeatureAction', 'MinimumApplicationVersion') IS NULL
	BEGIN
		ALTER TABLE LayeredSecurityFeatureAction
		ADD MinimumApplicationVersion varchar(250) NULL
	END
	IF COL_LENGTH('dbo.LayeredSecurityFeatureAction', 'IsLoginAction') IS NULL
	BEGIN
		ALTER TABLE LayeredSecurityFeatureAction
		ADD IsLoginAction bit NULL
	END

	--Application
	IF COL_LENGTH('dbo.Application', 'Id') IS NULL
	BEGIN
		ALTER TABLE Application
		ADD Id int NOT NULL
	END
	IF COL_LENGTH('dbo.Application', 'ApplicationKey') IS NULL
	BEGIN
		ALTER TABLE Application
		ADD ApplicationKey nvarchar(100) NOT NULL
	END

	--Features
	IF COL_LENGTH('dbo.Features', 'Id') IS NULL
	BEGIN
		ALTER TABLE Feature
		ADD Id int NOT NULL
	END
	IF COL_LENGTH('dbo.Features', 'ApplicationId') IS NULL
	BEGIN
		ALTER TABLE Features
		ADD ApplicationId int NOT NULL
	END
	IF COL_LENGTH('dbo.Features', 'FeatureKey') IS NULL
	BEGIN
		ALTER TABLE Features
		ADD FeatureKey varchar(100) NOT NULL
	END
	IF COL_LENGTH('dbo.Features', 'Name') IS NULL
	BEGIN
		ALTER TABLE Features
		ADD Name varchar(200) NOT NULL
	END
	IF COL_LENGTH('dbo.Features', 'Description') IS NULL
	BEGIN
		ALTER TABLE Features
		ADD Description varchar(MAX) NULL
	END
	IF COL_LENGTH('dbo.Features', 'Benifits') IS NULL
	BEGIN
		ALTER TABLE Features
		ADD Benifits varchar(MAX) NULL
	END
	IF COL_LENGTH('dbo.Features', 'Dependancies') IS NULL
	BEGIN
		ALTER TABLE Features
		ADD Dependancies varchar(MAX) NULL
	END
	IF COL_LENGTH('dbo.Features', 'LicenseFee') IS NULL
	BEGIN
		ALTER TABLE Features
		ADD LicenseFee money NULL
	END
	IF COL_LENGTH('dbo.Features', 'MaintenanceFee') IS NULL
	BEGIN
		ALTER TABLE Features
		ADD MaintenanceFee money NULL
	END
	IF COL_LENGTH('dbo.Features', 'IsActive') IS NULL
	BEGIN
		ALTER TABLE Features
		ADD IsActive bit NULL
	END
	IF COL_LENGTH('dbo.Features', 'MinimumVersion') IS NULL
	BEGIN
		ALTER TABLE Features
		ADD MinimumVersion varchar(100) NULL
	END
	IF COL_LENGTH('dbo.Features', 'DeprecatedVersion') IS NULL
	BEGIN
		ALTER TABLE Features
		ADD DeprecatedVersion varchar(100) NULL
	END

	--FeatureGroups
	IF COL_LENGTH('dbo.FeatureGroups', 'Id') IS NULL
	BEGIN
		ALTER TABLE FeatureGroups
		ADD Id int NOT NULL
	END
	IF COL_LENGTH('dbo.FeatureGroups', 'Name') IS NULL
	BEGIN
		ALTER TABLE FeatureGroups
		ADD Name varchar(200) NOT NULL
	END
	IF COL_LENGTH('dbo.FeatureGroups', 'Description') IS NULL
	BEGIN
		ALTER TABLE FeatureGroups
		ADD Description varchar(MAX) NULL
	END
	IF COL_LENGTH('dbo.FeatureGroups', 'FeatureId') IS NULL
	BEGIN
		ALTER TABLE FeatureGroups
		ADD FeatureId int NOT NULL
	END
	IF COL_LENGTH('dbo.FeatureGroups', 'FeeAdjustment') IS NULL
	BEGIN
		ALTER TABLE FeatureGroups
		ADD FeeAdjustment money NULL
	END
	IF COL_LENGTH('dbo.FeatureGroups', 'MaintenanceFee') IS NULL
	BEGIN
		ALTER TABLE FeatureGroups
		ADD MaintenanceFee money NULL
	END
	IF COL_LENGTH('dbo.FeatureGroups', 'MinimumVersion') IS NULL
	BEGIN
		ALTER TABLE FeatureGroups
		ADD MinimumVersion varchar(100) NULL
	END
	IF COL_LENGTH('dbo.FeatureGroups', 'DeprecatedVersion') IS NULL
	BEGIN
		ALTER TABLE FeatureGroups
		ADD DeprecatedVersion varchar(100) NULL
	END

	--FeatureSettings
	IF COL_LENGTH('dbo.FeatureSettings', 'Id') IS NULL
	BEGIN
		ALTER TABLE FeatureSettings
		ADD Id int NOT NULL
	END
	IF COL_LENGTH('dbo.FeatureSettings', 'Name') IS NULL
	BEGIN
		ALTER TABLE FeatureSettings
		ADD Name varchar(250) NOT NULL
	END
	IF COL_LENGTH('dbo.FeatureSettings', 'Description') IS NULL
	BEGIN
		ALTER TABLE FeatureSettings
		ADD Description varchar(MAX) NULL
	END
	IF COL_LENGTH('dbo.FeatureSettings', 'FeatureId') IS NULL
	BEGIN
		ALTER TABLE FeatureSettings
		ADD FeatureId int NOT NULL
	END
	IF COL_LENGTH('dbo.FeatureSettings', 'GroupId') IS NULL
	BEGIN
		ALTER TABLE FeatureSettings
		ADD GroupId int NOT NULL
	END
	IF COL_LENGTH('dbo.FeatureSettings', 'IsInternalOnly') IS NULL
	BEGIN
		ALTER TABLE FeatureSettings
		ADD IsInternalOnly bit NULL
	END

	--ClientFeatures
	IF COL_LENGTH('dbo.ClientFeatures', 'Id') IS NULL
	BEGIN
		ALTER TABLE ClientFeatures
		ADD Id int NOT NULL
	END
	IF COL_LENGTH('dbo.ClientFeatures', 'ClientId') IS NULL
	BEGIN
		ALTER TABLE ClientFeatures
		ADD ClientId int NOT NULL
	END
	IF COL_LENGTH('dbo.ClientFeatures', 'FeatureId') IS NULL
	BEGIN
		ALTER TABLE ClientFeatures
		ADD FeatureId int NOT NULL
	END
	IF COL_LENGTH('dbo.ClientFeatures', 'Licensed') IS NULL
	BEGIN
		ALTER TABLE ClientFeatures
		ADD Licensed bit NOT NULL
	END

	--DisclosureTypes
	IF COL_LENGTH('dbo.DisclosureTypes', 'Id') IS NULL
	BEGIN
		ALTER TABLE DisclosureTypes
		ADD Id int NOT NULL
	END
	IF COL_LENGTH('dbo.DisclosureTypes', 'Type') IS NULL
	BEGIN
		ALTER TABLE DisclosureTypes
		ADD [Type] varchar(50) NULL
	END
	IF COL_LENGTH('dbo.DisclosureTypes', 'StringResourceSet') IS NULL
	BEGIN
		ALTER TABLE DisclosureTypes
		ADD StringResourceSet varchar(1000) NULL
	END
	IF COL_LENGTH('dbo.DisclosureTypes', 'StringResourceKey') IS NULL
	BEGIN
		ALTER TABLE DisclosureTypes
		ADD StringResourceKey varchar(1000) NULL
	END

	--FederalHolidays
	IF COL_LENGTH('dbo.FederalHolidays', 'Id') IS NULL
	BEGIN
		ALTER TABLE FederalHolidays
		ADD Id int NOT NULL
	END
	IF COL_LENGTH('dbo.FederalHolidays', 'NewYearsDay') IS NULL
	BEGIN
		ALTER TABLE FederalHolidays
		ADD NewYearsDay date NOT NULL
	END
	IF COL_LENGTH('dbo.FederalHolidays', 'MartinLutherKingJrDay') IS NULL
	BEGIN
		ALTER TABLE FederalHolidays
		ADD MartinLutherKingJrDay date NOT NULL
	END
	IF COL_LENGTH('dbo.FederalHolidays', 'PresidentsDay') IS NULL
	BEGIN
		ALTER TABLE FederalHolidays
		ADD PresidentsDay date NOT NULL
	END
	IF COL_LENGTH('dbo.FederalHolidays', 'MemorialDay') IS NULL
	BEGIN
		ALTER TABLE FederalHolidays
		ADD MemorialDay date NOT NULL
	END
	IF COL_LENGTH('dbo.FederalHolidays', 'IndependenceDay') IS NULL
	BEGIN
		ALTER TABLE FederalHolidays
		ADD IndependenceDay date NOT NULL
	END
	IF COL_LENGTH('dbo.FederalHolidays', 'LaborDay') IS NULL
	BEGIN
		ALTER TABLE FederalHolidays
		ADD LaborDay date NOT NULL
	END
	IF COL_LENGTH('dbo.FederalHolidays', 'ColumbusDay') IS NULL
	BEGIN
		ALTER TABLE FederalHolidays
		ADD ColumbusDay date NOT NULL
	END
	IF COL_LENGTH('dbo.FederalHolidays', 'VeteransDay') IS NULL
	BEGIN
		ALTER TABLE FederalHolidays
		ADD VeteransDay date NOT NULL
	END
	IF COL_LENGTH('dbo.FederalHolidays', 'ThanksgivingDay') IS NULL
	BEGIN
		ALTER TABLE FederalHolidays
		ADD ThanksgivingDay date NOT NULL
	END
	IF COL_LENGTH('dbo.FederalHolidays', 'ChristmasDay') IS NULL
	BEGIN
		ALTER TABLE FederalHolidays
		ADD ChristmasDay date NOT NULL
	END

	--OmegaUser
	IF COL_LENGTH('dbo.OmegaUser', 'Id') IS NULL
	BEGIN
		ALTER TABLE OmegaUser
		ADD Id int NOT NULL
	END
	IF COL_LENGTH('dbo.OmegaUser', 'PublicId') IS NULL
	BEGIN
		ALTER TABLE OmegaUser
		ADD PublicId uniqueidentifier NOT NULL
	END
	IF COL_LENGTH('dbo.OmegaUser', 'UserName') IS NULL
	BEGIN
		ALTER TABLE OmegaUser
		ADD UserName varchar(200) NULL
	END
	IF COL_LENGTH('dbo.OmegaUser', 'PermissionLevel') IS NULL
	BEGIN
		ALTER TABLE OmegaUser
		ADD PermissionLevel int NOT NULL
	END
	IF COL_LENGTH('dbo.OmegaUser', 'PasswordHash') IS NULL
	BEGIN
		ALTER TABLE OmegaUser
		ADD PasswordHash varchar(250) NULL
	END
	IF COL_LENGTH('dbo.OmegaUser', 'Email') IS NULL
	BEGIN
		ALTER TABLE OmegaUser
		ADD Email varchar(250) NOT NULL
	END
	IF COL_LENGTH('dbo.OmegaUser', 'Name') IS NULL
	BEGIN
		ALTER TABLE OmegaUser
		ADD Name varchar(50) NOT NULL
	END
	IF COL_LENGTH('dbo.OmegaUser', 'ModifiedDate') IS NULL
	BEGIN
		ALTER TABLE OmegaUser
		ADD ModifiedDate datetime NOT NULL
	END
	IF COL_LENGTH('dbo.OmegaUser', 'ModifiedBy') IS NULL
	BEGIN
		ALTER TABLE OmegaUser
		ADD ModifiedBy varchar(50) NOT NULL
	END
	IF COL_LENGTH('dbo.OmegaUser', 'ActionTaken') IS NULL
	BEGIN
		ALTER TABLE OmegaUser
		ADD ActionTaken varchar(1000) NOT NULL
	END
	IF COL_LENGTH('dbo.OmegaUser', 'Deleted') IS NULL
	BEGIN
		ALTER TABLE OmegaUser
		ADD Deleted bit NULL
	END
	IF COL_LENGTH('dbo.OmegaUser', 'ClientPublicId') IS NULL
	BEGIN
		ALTER TABLE OmegaUser
		ADD ClientPublicId uniqueidentifier NULL
	END
END
GO
/****** Object:  StoredProcedure [dbo].[zzzSearchAllTables]    Script Date: 1/4/2025 10:14:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[zzzSearchAllTables]
(
    @SearchStr nvarchar(100)
)
AS
BEGIN


DECLARE @Results TABLE(ColumnName nvarchar(370), ColumnValue nvarchar(3630))

SET NOCOUNT ON

DECLARE @TableName nvarchar(256), @ColumnName nvarchar(128), @SearchStr2 nvarchar(110)
SET  @TableName = ''
SET @SearchStr2 = QUOTENAME('%' + @SearchStr + '%','''')

WHILE @TableName IS NOT NULL
BEGIN
    SET @ColumnName = ''
    SET @TableName = 
    (
        SELECT MIN(QUOTENAME(TABLE_SCHEMA) + '.' + QUOTENAME(TABLE_NAME))
        FROM    INFORMATION_SCHEMA.TABLES
        WHERE       TABLE_TYPE = 'BASE TABLE'
            AND QUOTENAME(TABLE_SCHEMA) + '.' + QUOTENAME(TABLE_NAME) > @TableName
            AND OBJECTPROPERTY(
                    OBJECT_ID(
                        QUOTENAME(TABLE_SCHEMA) + '.' + QUOTENAME(TABLE_NAME)
                         ), 'IsMSShipped'
                           ) = 0
    )

    WHILE (@TableName IS NOT NULL) AND (@ColumnName IS NOT NULL)
    BEGIN
        SET @ColumnName =
        (
            SELECT MIN(QUOTENAME(COLUMN_NAME))
            FROM    INFORMATION_SCHEMA.COLUMNS
            WHERE       TABLE_SCHEMA    = PARSENAME(@TableName, 2)
                AND TABLE_NAME  = PARSENAME(@TableName, 1)
                AND DATA_TYPE IN ('char', 'varchar', 'nchar', 'nvarchar')
                AND QUOTENAME(COLUMN_NAME) > @ColumnName
        )

        IF @ColumnName IS NOT NULL
        BEGIN
            INSERT INTO @Results
            EXEC
            (
                'SELECT ''' + @TableName + '.' + @ColumnName + ''', LEFT(' + @ColumnName + ', 3630) 
                FROM ' + @TableName + ' (NOLOCK) ' +
                ' WHERE ' + @ColumnName + ' LIKE ' + @SearchStr2
            )
        END
    END 
END

SELECT ColumnName, ColumnValue FROM @Results
END
GO
/****** Object:  StoredProcedure [dbo].[zzzSearchForColumnNames]    Script Date: 1/4/2025 10:14:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[zzzSearchForColumnNames]
(
    @SearchStr nvarchar(100)
)
AS
BEGIN


SELECT TABLE_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE COLUMN_NAME = @SearchStr

END
GO
USE [master]
GO
ALTER DATABASE [Meta] SET  READ_WRITE 
GO
