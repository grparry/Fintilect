import { Permission, Group, GroupRole, UserGroup } from '../../../../../types/client.types';

export const mockPermissions: Permission[] = [
    { id: '1', name: 'Administrator', description: 'Administrator role', category: 'Roles', actions: ['all'] },
    { id: '2', name: 'FeedbackManager', description: 'FeedbackManager role', category: 'Roles', actions: ['all'] },
    { id: '3', name: 'RESTDevServiceUser', description: 'RESTDevServiceUser role', category: 'Roles', actions: ['all'] },
    { id: '4', name: 'SecurityUtilsUser', description: 'SecurityUtilsUser role', category: 'Roles', actions: ['all'] },
    { id: '5', name: 'SOAPDevServiceUser', description: 'SOAPDevServiceUser role', category: 'Roles', actions: ['all'] },
    { id: '6', name: 'UserManager', description: 'UserManager role', category: 'Roles', actions: ['all'] },
    { id: '7', name: 'SuperUser', description: 'SuperUser role', category: 'Roles', actions: ['all'] },
    { id: '8', name: 'SupportStaff', description: 'SupportStaff role', category: 'Roles', actions: ['all'] },
    { id: '9', name: 'SupportManager', description: 'SupportManager role', category: 'Roles', actions: ['all'] },
    { id: '10', name: 'Manager', description: 'Manager role', category: 'Roles', actions: ['all'] },
    { id: '11', name: 'Accountant', description: 'Accountant role', category: 'Roles', actions: ['all'] },
    { id: '12', name: 'Admin', description: 'Admin role', category: 'Roles', actions: ['all'] },
    { id: '13', name: 'Client', description: 'Client role', category: 'Roles', actions: ['all'] },
    { id: '14', name: 'Configurator', description: 'Configurator role', category: 'Roles', actions: ['all'] },
    { id: '15', name: 'Architect', description: 'Architect role', category: 'Roles', actions: ['all'] },
    { id: '16', name: 'ConnectSuperuser', description: 'ConnectSuperuser role', category: 'Roles', actions: ['all'] },
    { id: '17', name: 'ClientManager', description: 'ClientManager role', category: 'Roles', actions: ['all'] },
    { id: '18', name: 'ConnectStaff', description: 'ConnectStaff role', category: 'Roles', actions: ['all'] },
    { id: '19', name: 'ClientStaff', description: 'ClientStaff role', category: 'Roles', actions: ['all'] },
    { id: '20', name: 'ConnectSecurityManager', description: 'ConnectSecurityManager role', category: 'Roles', actions: ['all'] },
    { id: '21', name: 'L1Support', description: 'L1Support role', category: 'Roles', actions: ['all'] },
    { id: '22', name: 'FieldTeam', description: 'FieldTeam role', category: 'Roles', actions: ['all'] },
    { id: '23', name: 'L2Support', description: 'L2Support role', category: 'Roles', actions: ['all'] },
    { id: '24', name: 'Requester', description: 'Requester role', category: 'Roles', actions: ['all'] },
    { id: '25', name: 'BillPayEditor', description: 'BillPayEditor role', category: 'Roles', actions: ['all'] },
    { id: '26', name: 'BillPayReporter', description: 'BillPayReporter role', category: 'Roles', actions: ['all'] },
    { id: '27', name: 'BillPayViewer', description: 'BillPayViewer role', category: 'Roles', actions: ['all'] },
    { id: '28', name: 'BillPayProcessor', description: 'BillPayProcessor role', category: 'Roles', actions: ['all'] },
    { id: '29', name: 'ClientSuperuser', description: 'ClientSuperuser role', category: 'Roles', actions: ['all'] },
    { id: '30', name: 'testUser', description: 'testUser role', category: 'Roles', actions: ['all'] },
    { id: '31', name: 'Institution_Read', description: 'Institution_Read role', category: 'Roles', actions: ['all'] },
    { id: '32', name: 'UserViewer', description: 'UserViewer role', category: 'Roles', actions: ['all'] },
    { id: '33', name: 'UserEditor', description: 'UserEditor role', category: 'Roles', actions: ['all'] },
    { id: '34', name: 'Institution_Update', description: 'Institution_Update role', category: 'Roles', actions: ['all'] },
    { id: '35', name: 'ConnectBillPayConfiguration_SupportTeam', description: 'ConnectBillPayConfiguration_SupportTeam role', category: 'Roles', actions: ['all'] },
    { id: '36', name: 'ConnectBillPayConfiguration_ManagementTeam', description: 'ConnectBillPayConfiguration_ManagementTeam role', category: 'Roles', actions: ['all'] },
    { id: '37', name: 'CamelCaseUser', description: 'CamelCaseUser role', category: 'Roles', actions: ['all'] },
    { id: '38', name: 'BillPayOnUsExceptions_canRepost', description: 'BillPayOnUsExceptions_canRepost role', category: 'Roles', actions: ['all'] },
    { id: '39', name: 'BillPayOnUsExceptions_Read', description: 'BillPayOnUsExceptions_Read role', category: 'Roles', actions: ['all'] },
    { id: '40', name: 'BillPayOnUsPayeeManager_actCreate', description: 'BillPayOnUsPayeeManager_actCreate role', category: 'Roles', actions: ['all'] },
    { id: '41', name: 'BillPayOnUsPayeeManager_Read', description: 'BillPayOnUsPayeeManager_Read role', category: 'Roles', actions: ['all'] },
    { id: '42', name: 'BillPayOnUsPayeeManager_Update', description: 'BillPayOnUsPayeeManager_Update role', category: 'Roles', actions: ['all'] },
    { id: '43', name: 'Role1', description: 'Role1 role', category: 'Roles', actions: ['all'] },
    { id: '44', name: 'EventMananger', description: 'EventMananger role', category: 'Roles', actions: ['all'] },
    { id: '45', name: 'ConnectBillPayConfiguration_Create', description: 'ConnectBillPayConfiguration_Create role', category: 'Roles', actions: ['all'] },
    { id: '46', name: 'ConnectBillPayConfiguration_Delete', description: 'ConnectBillPayConfiguration_Delete role', category: 'Roles', actions: ['all'] },
    { id: '47', name: 'ConnectBillPayConfiguration_canEditBackEndFields', description: 'ConnectBillPayConfiguration_canEditBackEndFields role', category: 'Roles', actions: ['all'] },
    { id: '48', name: 'BillPayContactInfo_Update', description: 'BillPayContactInfo_Update role', category: 'Roles', actions: ['all'] },
    { id: '49', name: 'BillPayContactInfo_Read', description: 'BillPayContactInfo_Read role', category: 'Roles', actions: ['all'] },
    { id: '50', name: 'BillPayConfiguration_canEditConfigValueField', description: 'BillPayConfiguration_canEditConfigValueField role', category: 'Roles', actions: ['all'] },
    { id: '51', name: 'ConnectBillPayConfiguration_AdminTeam', description: 'ConnectBillPayConfiguration_AdminTeam role', category: 'Roles', actions: ['all'] },
    { id: '52', name: 'BillPayConfiguration_Read', description: 'BillPayConfiguration_Read role', category: 'Roles', actions: ['all'] },
    { id: '53', name: 'BillPayContactInfo_Create', description: 'BillPayContactInfo_Create role', category: 'Roles', actions: ['all'] },
    { id: '54', name: 'BillPayNotificationTemplates_Read', description: 'BillPayNotificationTemplates_Read role', category: 'Roles', actions: ['all'] },
    { id: '55', name: 'BillPayNotificationTemplates_Update', description: 'BillPayNotificationTemplates_Update role', category: 'Roles', actions: ['all'] },
    { id: '56', name: 'BillPayReports_Read', description: 'BillPayReports_Read role', category: 'Roles', actions: ['all'] },
    { id: '57', name: 'BillPayReports_canExport', description: 'BillPayReports_canExport role', category: 'Roles', actions: ['all'] },
    { id: '58', name: 'BillPayHoliday_Read', description: 'BillPayHoliday_Read role', category: 'Roles', actions: ['all'] },
    { id: '59', name: 'BillPayHoliday_Update', description: 'BillPayHoliday_Update role', category: 'Roles', actions: ['all'] },
    { id: '60', name: 'Institution_2FA_Update', description: 'Institution_2FA_Update role', category: 'Roles', actions: ['all'] },
    { id: '61', name: 'ConnectInstitution_Create', description: 'ConnectInstitution_Create role', category: 'Roles', actions: ['all'] },
    { id: '62', name: 'ConnectInstitutionURLs_Read', description: 'ConnectInstitutionURLs_Read role', category: 'Roles', actions: ['all'] },
    { id: '63', name: 'ConnectInstitutionURLs_Update', description: 'ConnectInstitutionURLs_Update role', category: 'Roles', actions: ['all'] },
    { id: '64', name: 'SecurityUsers_canExport', description: 'SecurityUsers_canExport role', category: 'Roles', actions: ['all'] },
    { id: '65', name: 'SecurityUsers_Create', description: 'SecurityUsers_Create role', category: 'Roles', actions: ['all'] },
    { id: '66', name: 'SecurityUsers_canSendPasswordResetEmail', description: 'SecurityUsers_canSendPasswordResetEmail role', category: 'Roles', actions: ['all'] },
    { id: '67', name: 'SecurityUsers_Update', description: 'SecurityUsers_Update role', category: 'Roles', actions: ['all'] },
    { id: '68', name: 'SecurityUsers_Read', description: 'SecurityUsers_Read role', category: 'Roles', actions: ['all'] },
    { id: '69', name: 'SecurityUsers_canResetPassword', description: 'SecurityUsers_canResetPassword role', category: 'Roles', actions: ['all'] },
    { id: '70', name: 'SecurityUsers_canReset2FA', description: 'SecurityUsers_canReset2FA role', category: 'Roles', actions: ['all'] },
    { id: '71', name: 'ConnectSecurityUsers_canCanAssignInstitutionAccess', description: 'ConnectSecurityUsers_canCanAssignInstitutionAccess role', category: 'Roles', actions: ['all'] },
    { id: '72', name: 'SecurityUsers_canAssignPermissions', description: 'SecurityUsers_canAssignPermissions role', category: 'Roles', actions: ['all'] },
    { id: '73', name: 'InstitutionURLs_Read', description: 'InstitutionURLs_Read role', category: 'Roles', actions: ['all'] },
    { id: '74', name: 'ConnectInstitutionURLs_Create', description: 'ConnectInstitutionURLs_Create role', category: 'Roles', actions: ['all'] },
    { id: '75', name: 'SecurityGroups_Update', description: 'SecurityGroups_Update role', category: 'Roles', actions: ['all'] },
    { id: '76', name: 'SecurityGroups_canExport', description: 'SecurityGroups_canExport role', category: 'Roles', actions: ['all'] },
    { id: '77', name: 'SecurityGroups_Read', description: 'SecurityGroups_Read role', category: 'Roles', actions: ['all'] },
    { id: '78', name: 'ConnectSecuritySettings_Update', description: 'ConnectSecuritySettings_Update role', category: 'Roles', actions: ['all'] },
    { id: '79', name: 'ConnectSecurityGroups_canSyncToClients', description: 'ConnectSecurityGroups_canSyncToClients role', category: 'Roles', actions: ['all'] },
    { id: '80', name: 'ConnectSecuritySettings_Read', description: 'ConnectSecuritySettings_Read role', category: 'Roles', actions: ['all'] },
    { id: '81', name: 'ConnectSecurityGroups_Create', description: 'ConnectSecurityGroups_Create role', category: 'Roles', actions: ['all'] },
    { id: '82', name: 'ConnectSecuritySettings_canEnforceAdminPortal2FA', description: 'ConnectSecuritySettings_canEnforceAdminPortal2FA role', category: 'Roles', actions: ['all'] },
    { id: '83', name: 'ConnectSecurityGroups_Delete', description: 'ConnectSecurityGroups_Delete role', category: 'Roles', actions: ['all'] },
    { id: '84', name: 'ConnectInstitutionURLs_Delete', description: 'ConnectInstitutionURLs_Delete role', category: 'Roles', actions: ['all'] },
    { id: '85', name: 'CropperDemoUser', description: 'CropperDemoUser role', category: 'Roles', actions: ['all'] },
    { id: '86', name: 'GoogleMapsDemoUser', description: 'GoogleMapsDemoUser role', category: 'Roles', actions: ['all'] },
    { id: '87', name: 'Employee', description: 'Employee role', category: 'Roles', actions: ['all'] },
    { id: '88', name: 'OutSystemsNativeUserRole', description: 'OutSystemsNativeUserRole role', category: 'Roles', actions: ['all'] },
    { id: '89', name: 'OutSystemsNowServiceUser', description: 'OutSystemsNowServiceUser role', category: 'Roles', actions: ['all'] },
    { id: '90', name: 'DirectoryManager', description: 'DirectoryManager role', category: 'Roles', actions: ['all'] },
    { id: '91', name: 'AuditReports_Read', description: 'AuditReports_Read role', category: 'Roles', actions: ['all'] },
    { id: '92', name: 'ConnectAuditReports_Read', description: 'ConnectAuditReports_Read role', category: 'Roles', actions: ['all'] },
    { id: '93', name: 'FileSystemDemoUser', description: 'FileSystemDemoUser role', category: 'Roles', actions: ['all'] },
    { id: '94', name: 'ConnectBillPayFISExceptionHandling_Update', description: 'ConnectBillPayFISExceptionHandling_Update role', category: 'Roles', actions: ['all'] },
    { id: '95', name: 'ConnectBillPayFISExceptionHandling_Read', description: 'ConnectBillPayFISExceptionHandling_Read role', category: 'Roles', actions: ['all'] },
    { id: '96', name: 'ConnectInstitutionFeatures_Delete', description: 'ConnectInstitutionFeatures_Delete role', category: 'Roles', actions: ['all'] },
    { id: '97', name: 'ConnectInstitutionFeatures_Update', description: 'ConnectInstitutionFeatures_Update role', category: 'Roles', actions: ['all'] },
    { id: '98', name: 'ConnectInstitutionFeatures_Create', description: 'ConnectInstitutionFeatures_Create role', category: 'Roles', actions: ['all'] },
    { id: '99', name: 'BillPayManualProcessing_canRun', description: 'BillPayManualProcessing_canRun role', category: 'Roles', actions: ['all'] },
    { id: '100', name: 'BillPayMemberPayees_canCopy', description: 'BillPayMemberPayees_canCopy role', category: 'Roles', actions: ['all'] },
    { id: '101', name: 'ConnectBillPayAPIVersions_Read', description: 'ConnectBillPayAPIVersions_Read role', category: 'Roles', actions: ['all'] },
    { id: '102', name: 'ConnectBillPayBPDataIntegrityCheck_Create', description: 'ConnectBillPayBPDataIntegrityCheck_Create role', category: 'Roles', actions: ['all'] },
    { id: '103', name: 'ConnectBillPayBPDataIntegrityCheck_Read', description: 'ConnectBillPayBPDataIntegrityCheck_Read role', category: 'Roles', actions: ['all'] },
    { id: '104', name: 'ConnectBillPayBPDataIntegrityCheck_Update', description: 'ConnectBillPayBPDataIntegrityCheck_Update role', category: 'Roles', actions: ['all'] },
    { id: '105', name: 'BillPayManagePendingPayments_Read', description: 'BillPayManagePendingPayments_Read role', category: 'Roles', actions: ['all'] },
    { id: '106', name: 'BillPayManagePendingPayments_Update', description: 'BillPayManagePendingPayments_Update role', category: 'Roles', actions: ['all'] },
    { id: '107', name: 'BillPayManagePendingPayments_Cancel', description: 'BillPayManagePendingPayments_Cancel role', category: 'Roles', actions: ['all'] },
    { id: '108', name: 'TimerAdministrator', description: 'TimerAdministrator role', category: 'Roles', actions: ['all'] },
    { id: '109', name: 'MoneyDesktopInactiveUsers_Read', description: 'MoneyDesktopInactiveUsers_Read role', category: 'Roles', actions: ['all'] },
    { id: '110', name: 'MoneyDesktopInactiveUsers_Purge', description: 'MoneyDesktopInactiveUsers_Purge role', category: 'Roles', actions: ['all'] },
    { id: '111', name: 'MoneyDesktopInactiveUsers_Configure', description: 'MoneyDesktopInactiveUsers_Configure role', category: 'Roles', actions: ['all'] },
    { id: '112', name: 'SortRecordList_DemoUser', description: 'SortRecordList_DemoUser role', category: 'Roles', actions: ['all'] },
    { id: '113', name: 'ConnectBillPayBPConvertPayee_Read', description: 'ConnectBillPayBPConvertPayee_Read role', category: 'Roles', actions: ['all'] },
    { id: '114', name: 'ConnectBillPayBPConvertPayee_canRollbackConversion', description: 'ConnectBillPayBPConvertPayee_canRollbackConversion role', category: 'Roles', actions: ['all'] },
    { id: '115', name: 'ConnectBillPayBPConvertPayee_canConvertPayee', description: 'ConnectBillPayBPConvertPayee_canConvertPayee role', category: 'Roles', actions: ['all'] },
    { id: '116', name: 'ConnectBillPayCBRChannelBilling_Read', description: 'ConnectBillPayCBRChannelBilling_Read role', category: 'Roles', actions: ['all'] },
    { id: '117', name: 'ConnectBillPayCBRBillingReports_Create', description: 'ConnectBillPayCBRBillingReports_Create role', category: 'Roles', actions: ['all'] },
    { id: '118', name: 'ConnectBillPayCBRBillingReports_Delete', description: 'ConnectBillPayCBRBillingReports_Delete role', category: 'Roles', actions: ['all'] },
    { id: '119', name: 'ConnectBillPayCBRBillingReports_canApproveRescind', description: 'ConnectBillPayCBRBillingReports_canApproveRescind role', category: 'Roles', actions: ['all'] },
    { id: '120', name: 'MoneyDesktopDeletedUsers_Read', description: 'MoneyDesktopDeletedUsers_Read role', category: 'Roles', actions: ['all'] },
    { id: '121', name: 'ConnectBillPayCBRFeeConfiguration_Delete', description: 'ConnectBillPayCBRFeeConfiguration_Delete role', category: 'Roles', actions: ['all'] },
    { id: '122', name: 'ConnectBillPayCBRFeeConfiguration_canExport', description: 'ConnectBillPayCBRFeeConfiguration_canExport role', category: 'Roles', actions: ['all'] },
    { id: '123', name: 'ConnectBillPayCBRFeeConfiguration_Create', description: 'ConnectBillPayCBRFeeConfiguration_Create role', category: 'Roles', actions: ['all'] },
    { id: '124', name: 'ConnectBillPayCBRFeeConfiguration_Update', description: 'ConnectBillPayCBRFeeConfiguration_Update role', category: 'Roles', actions: ['all'] },
    { id: '125', name: 'ConnectBillPayCBRFeeConfiguration_Read', description: 'ConnectBillPayCBRFeeConfiguration_Read role', category: 'Roles', actions: ['all'] },
    { id: '126', name: 'BillPayCBRFeeConfiguration_Read', description: 'BillPayCBRFeeConfiguration_Read role', category: 'Roles', actions: ['all'] },
    { id: '127', name: 'BillPayCBRFeeConfiguration_canExport', description: 'BillPayCBRFeeConfiguration_canExport role', category: 'Roles', actions: ['all'] },
    { id: '128', name: 'BillPayFISExceptionHandling_Read', description: 'BillPayFISExceptionHandling_Read role', category: 'Roles', actions: ['all'] },
    { id: '129', name: 'BillPayFISExceptionHandling_Update', description: 'BillPayFISExceptionHandling_Update role', category: 'Roles', actions: ['all'] },
    { id: '130', name: 'SecurityGroups_Create', description: 'SecurityGroups_Create role', category: 'Roles', actions: ['all'] },
    { id: '131', name: 'SecurityGroups_Delete', description: 'SecurityGroups_Delete role', category: 'Roles', actions: ['all'] },
    { id: '132', name: 'Recruiter', description: 'Recruiter role', category: 'Roles', actions: ['all'] },
    { id: '133', name: 'BillPayCBRBillingReports_Read', description: 'BillPayCBRBillingReports_Read role', category: 'Roles', actions: ['all'] },
    { id: '134', name: 'BillPayCBRBillingReports_canExport', description: 'BillPayCBRBillingReports_canExport role', category: 'Roles', actions: ['all'] },
    { id: '135', name: 'IdP_Administrator', description: 'IdP_Administrator role', category: 'Roles', actions: ['all'] },
    { id: '136', name: 'MemberCenter_Read', description: 'MemberCenter_Read role', category: 'Roles', actions: ['all'] },
    { id: '137', name: 'IdPExample_CloneUser', description: 'IdPExample_CloneUser role', category: 'Roles', actions: ['all'] },
    { id: '138', name: 'User', description: 'User role', category: 'Roles', actions: ['all'] },
    { id: '139', name: 'HiringManager', description: 'HiringManager role', category: 'Roles', actions: ['all'] }
];

export const mockPermissionGroups: Group[] = [
    {
        id: 1,
        name: 'Admin Group',
        clientId: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 2,
        name: 'Read Only Group',
        clientId: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];

// Map groups to roles
export const mockGroupRoles: GroupRole[] = [
    // Admin group gets all roles
    { groupId: 1, roleId: 1 }, // Administrator
    { groupId: 1, roleId: 2 }, // FeedbackManager
    { groupId: 1, roleId: 3 }, // RESTDevServiceUser
    { groupId: 1, roleId: 4 }, // SecurityUtilsUser
    { groupId: 1, roleId: 5 }, // SOAPDevServiceUser
    { groupId: 1, roleId: 6 }, // UserManager
    { groupId: 1, roleId: 7 }, // SuperUser
    { groupId: 1, roleId: 8 }, // SupportStaff
    { groupId: 1, roleId: 9 }, // SupportManager
    { groupId: 1, roleId: 10 }, // Manager
    { groupId: 1, roleId: 11 }, // Accountant
    { groupId: 1, roleId: 12 }, // Admin
    { groupId: 1, roleId: 13 }, // Client
    { groupId: 1, roleId: 14 }, // Configurator
    { groupId: 1, roleId: 15 }, // Architect
    { groupId: 1, roleId: 16 }, // ConnectSuperuser
    { groupId: 1, roleId: 17 }, // ClientManager
    { groupId: 1, roleId: 18 }, // ConnectStaff
    { groupId: 1, roleId: 19 }, // ClientStaff
    { groupId: 1, roleId: 20 }, // ConnectSecurityManager
    { groupId: 1, roleId: 21 }, // L1Support
    { groupId: 1, roleId: 22 }, // FieldTeam
    { groupId: 1, roleId: 23 }, // L2Support
    { groupId: 1, roleId: 24 }, // Requester
    { groupId: 1, roleId: 25 }, // BillPayEditor
    { groupId: 1, roleId: 26 }, // BillPayReporter
    { groupId: 1, roleId: 27 }, // BillPayViewer
    { groupId: 1, roleId: 28 }, // BillPayProcessor
    { groupId: 1, roleId: 29 }, // ClientSuperuser
    { groupId: 1, roleId: 30 }, // testUser
    { groupId: 1, roleId: 31 }, // Institution_Read
    { groupId: 1, roleId: 32 }, // UserViewer
    { groupId: 1, roleId: 33 }, // UserEditor
    { groupId: 1, roleId: 34 }, // Institution_Update
    { groupId: 1, roleId: 35 }, // ConnectBillPayConfiguration_SupportTeam
    { groupId: 1, roleId: 36 }, // ConnectBillPayConfiguration_ManagementTeam
    { groupId: 1, roleId: 37 }, // CamelCaseUser
    { groupId: 1, roleId: 38 }, // BillPayOnUsExceptions_canRepost
    { groupId: 1, roleId: 39 }, // BillPayOnUsExceptions_Read
    { groupId: 1, roleId: 40 }, // BillPayOnUsPayeeManager_actCreate
    { groupId: 1, roleId: 41 }, // BillPayOnUsPayeeManager_Read
    { groupId: 1, roleId: 42 }, // BillPayOnUsPayeeManager_Update
    { groupId: 1, roleId: 43 }, // Role1
    { groupId: 1, roleId: 44 }, // EventMananger
    { groupId: 1, roleId: 45 }, // ConnectBillPayConfiguration_Create
    { groupId: 1, roleId: 46 }, // ConnectBillPayConfiguration_Delete
    { groupId: 1, roleId: 47 }, // ConnectBillPayConfiguration_canEditBackEndFields
    { groupId: 1, roleId: 48 }, // BillPayContactInfo_Update
    { groupId: 1, roleId: 49 }, // BillPayContactInfo_Read
    { groupId: 1, roleId: 50 }, // BillPayConfiguration_canEditConfigValueField
    { groupId: 1, roleId: 51 }, // ConnectBillPayConfiguration_AdminTeam
    { groupId: 1, roleId: 52 }, // BillPayConfiguration_Read
    { groupId: 1, roleId: 53 }, // BillPayContactInfo_Create
    { groupId: 1, roleId: 54 }, // BillPayNotificationTemplates_Read
    { groupId: 1, roleId: 55 }, // BillPayNotificationTemplates_Update
    { groupId: 1, roleId: 56 }, // BillPayReports_Read
    { groupId: 1, roleId: 57 }, // BillPayReports_canExport
    { groupId: 1, roleId: 58 }, // BillPayHoliday_Read
    { groupId: 1, roleId: 59 }, // BillPayHoliday_Update
    { groupId: 1, roleId: 60 }, // Institution_2FA_Update
    { groupId: 1, roleId: 61 }, // ConnectInstitution_Create
    { groupId: 1, roleId: 62 }, // ConnectInstitutionURLs_Read
    { groupId: 1, roleId: 63 }, // ConnectInstitutionURLs_Update
    { groupId: 1, roleId: 64 }, // SecurityUsers_canExport
    { groupId: 1, roleId: 65 }, // SecurityUsers_Create
    { groupId: 1, roleId: 66 }, // SecurityUsers_canSendPasswordResetEmail
    { groupId: 1, roleId: 67 }, // SecurityUsers_Update
    { groupId: 1, roleId: 68 }, // SecurityUsers_Read
    { groupId: 1, roleId: 69 }, // SecurityUsers_canResetPassword
    { groupId: 1, roleId: 70 }, // SecurityUsers_canReset2FA
    { groupId: 1, roleId: 71 }, // ConnectSecurityUsers_canCanAssignInstitutionAccess
    { groupId: 1, roleId: 72 }, // SecurityUsers_canAssignPermissions
    { groupId: 1, roleId: 73 }, // InstitutionURLs_Read
    { groupId: 1, roleId: 74 }, // ConnectInstitutionURLs_Create
    { groupId: 1, roleId: 75 }, // SecurityGroups_Update
    { groupId: 1, roleId: 76 }, // SecurityGroups_canExport
    { groupId: 1, roleId: 77 }, // SecurityGroups_Read
    { groupId: 1, roleId: 78 }, // ConnectSecuritySettings_Update
    { groupId: 1, roleId: 79 }, // ConnectSecurityGroups_canSyncToClients
    { groupId: 1, roleId: 80 }, // ConnectSecuritySettings_Read
    { groupId: 1, roleId: 81 }, // ConnectSecurityGroups_Create
    { groupId: 1, roleId: 82 }, // ConnectSecuritySettings_canEnforceAdminPortal2FA
    { groupId: 1, roleId: 83 }, // ConnectSecurityGroups_Delete
    { groupId: 1, roleId: 84 }, // ConnectInstitutionURLs_Delete
    { groupId: 1, roleId: 85 }, // CropperDemoUser
    { groupId: 1, roleId: 86 }, // GoogleMapsDemoUser
    { groupId: 1, roleId: 87 }, // Employee
    { groupId: 1, roleId: 88 }, // OutSystemsNativeUserRole
    { groupId: 1, roleId: 89 }, // OutSystemsNowServiceUser
    { groupId: 1, roleId: 90 }, // DirectoryManager
    { groupId: 1, roleId: 91 }, // AuditReports_Read
    { groupId: 1, roleId: 92 }, // ConnectAuditReports_Read
    { groupId: 1, roleId: 93 }, // FileSystemDemoUser
    { groupId: 1, roleId: 94 }, // ConnectBillPayFISExceptionHandling_Update
    { groupId: 1, roleId: 95 }, // ConnectBillPayFISExceptionHandling_Read
    { groupId: 1, roleId: 96 }, // ConnectInstitutionFeatures_Delete
    { groupId: 1, roleId: 97 }, // ConnectInstitutionFeatures_Update
    { groupId: 1, roleId: 98 }, // ConnectInstitutionFeatures_Create
    { groupId: 1, roleId: 99 }, // BillPayManualProcessing_canRun
    { groupId: 1, roleId: 100 }, // BillPayMemberPayees_canCopy
    { groupId: 1, roleId: 101 }, // ConnectBillPayAPIVersions_Read
    { groupId: 1, roleId: 102 }, // ConnectBillPayBPDataIntegrityCheck_Create
    { groupId: 1, roleId: 103 }, // ConnectBillPayBPDataIntegrityCheck_Read
    { groupId: 1, roleId: 104 }, // ConnectBillPayBPDataIntegrityCheck_Update
    { groupId: 1, roleId: 105 }, // BillPayManagePendingPayments_Read
    { groupId: 1, roleId: 106 }, // BillPayManagePendingPayments_Update
    { groupId: 1, roleId: 107 }, // BillPayManagePendingPayments_Cancel
    { groupId: 1, roleId: 108 }, // TimerAdministrator
    { groupId: 1, roleId: 109 }, // MoneyDesktopInactiveUsers_Read
    { groupId: 1, roleId: 110 }, // MoneyDesktopInactiveUsers_Purge
    { groupId: 1, roleId: 111 }, // MoneyDesktopInactiveUsers_Configure
    { groupId: 1, roleId: 112 }, // SortRecordList_DemoUser
    { groupId: 1, roleId: 113 }, // ConnectBillPayBPConvertPayee_Read
    { groupId: 1, roleId: 114 }, // ConnectBillPayBPConvertPayee_canRollbackConversion
    { groupId: 1, roleId: 115 }, // ConnectBillPayBPConvertPayee_canConvertPayee
    { groupId: 1, roleId: 116 }, // ConnectBillPayCBRChannelBilling_Read
    { groupId: 1, roleId: 117 }, // ConnectBillPayCBRBillingReports_Create
    { groupId: 1, roleId: 118 }, // ConnectBillPayCBRBillingReports_Delete
    { groupId: 1, roleId: 119 }, // ConnectBillPayCBRBillingReports_canApproveRescind
    { groupId: 1, roleId: 120 }, // MoneyDesktopDeletedUsers_Read
    { groupId: 1, roleId: 121 }, // ConnectBillPayCBRFeeConfiguration_Delete
    { groupId: 1, roleId: 122 }, // ConnectBillPayCBRFeeConfiguration_canExport
    { groupId: 1, roleId: 123 }, // ConnectBillPayCBRFeeConfiguration_Create
    { groupId: 1, roleId: 124 }, // ConnectBillPayCBRFeeConfiguration_Update
    { groupId: 1, roleId: 125 }, // ConnectBillPayCBRFeeConfiguration_Read
    { groupId: 1, roleId: 126 }, // BillPayCBRFeeConfiguration_Read
    { groupId: 1, roleId: 127 }, // BillPayCBRFeeConfiguration_canExport
    { groupId: 1, roleId: 128 }, // BillPayFISExceptionHandling_Read
    { groupId: 1, roleId: 129 }, // BillPayFISExceptionHandling_Update
    { groupId: 1, roleId: 130 }, // SecurityGroups_Create
    { groupId: 1, roleId: 131 }, // SecurityGroups_Delete
    { groupId: 1, roleId: 132 }, // Recruiter
    { groupId: 1, roleId: 133 }, // BillPayCBRBillingReports_Read
    { groupId: 1, roleId: 134 }, // BillPayCBRBillingReports_canExport
    { groupId: 1, roleId: 135 }, // IdP_Administrator
    { groupId: 1, roleId: 136 }, // MemberCenter_Read
    { groupId: 1, roleId: 137 }, // IdPExample_CloneUser
    { groupId: 1, roleId: 138 }, // User
    { groupId: 1, roleId: 139 }, // HiringManager

    // Read Only group gets only read permissions
    { groupId: 2, roleId: 91 }, // AuditReports_Read
    { groupId: 2, roleId: 133 }, // BillPayCBRBillingReports_Read
    { groupId: 2, roleId: 126 }, // BillPayCBRFeeConfiguration_Read
    { groupId: 2, roleId: 52 }, // BillPayConfiguration_Read
    { groupId: 2, roleId: 68 } // SecurityUsers_Read
];

// Map users to groups
export const mockUserGroups: UserGroup[] = [
    {
        userId: 1, // john.doe
        groupId: 1 // Admin Group
    },
    {
        userId: 2, // jane.smith
        groupId: 2 // Read Only Group
    }
];