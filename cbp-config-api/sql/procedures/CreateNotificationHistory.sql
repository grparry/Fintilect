CREATE PROCEDURE [dbo].[CreateNotificationHistory]
  @Type NVARCHAR(50),
  @Template NVARCHAR(50),
  @Recipients NVARCHAR(MAX),
  @Data NVARCHAR(MAX),
  @UserId NVARCHAR(50),
  @Status NVARCHAR(20)
AS
BEGIN
  SET NOCOUNT ON;

  INSERT INTO NotificationHistory (
    Type,
    Template,
    Recipients,
    Data,
    UserId,
    Status,
    CreatedAt
  )
  VALUES (
    @Type,
    @Template,
    @Recipients,
    @Data,
    @UserId,
    @Status,
    GETUTCDATE()
  );

  SELECT SCOPE_IDENTITY() AS Id;
END;
