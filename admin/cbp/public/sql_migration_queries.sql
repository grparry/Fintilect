
-- 1. Migrate Users
INSERT INTO NewUsers (ID, Username, Email, CreatedOn, UpdatedOn)
SELECT ID, Username, Email, CreatedOn, UpdatedOn
FROM ossys_user;

-- 2. Migrate Groups
INSERT INTO NewGroups (ID, Name)
SELECT ID, Name
FROM ossys_group;

-- 3. Migrate Roles
INSERT INTO NewRoles (ID, Name)
SELECT ID, Name
FROM ossys_role;

-- 4. Migrate User-Group Mapping
INSERT INTO NewUserGroups (UserID, GroupID)
SELECT User_ID, Group_ID
FROM ossys_group_user;

-- 5. Migrate Group-Role Mapping
INSERT INTO NewGroupRoles (GroupID, RoleID)
SELECT Group_ID, Role_ID
FROM ossys_group_role;

-- 6. Migrate Customers
INSERT INTO NewCustomers (ID, ExternalID, Name, IsActive, CreatedOn, UpdatedOn)
SELECT ID, EXTERNALID, NAME, ISACTIVE, CREATEDON, UPDATEDON
FROM OSUSR_HBV_CUSTOMER;

-- 7. Migrate User-Customer Mapping (Assuming each user has one customer)
INSERT INTO NewUserCustomer (UserID, CustomerID)
SELECT u.ID, c.ID
FROM ossys_user u
JOIN OSUSR_HBV_CUSTOMER c ON u.TENANT_ID = c.TENANT_ID;

-- 8. Assign Superusers to Fintilect (assuming Fintilect has a special customer ID)
INSERT INTO NewUserCustomer (UserID, CustomerID)
SELECT u.ID, (SELECT ID FROM NewCustomers WHERE Name = 'Fintilect')
FROM ossys_user u
WHERE u.Username IN ('admin1', 'admin2', 'admin3'); -- Replace with actual superuser usernames
