CREATE PROCEDURE [dbo].[UpdateNotificationHistory]
  @Id INT,
  @Status NVARCHAR(20),
  @Error NVARCHAR(MAX) = NULL
AS
BEGIN
  SET NOCOUNT ON;

  UPDATE NotificationHistory
  SET 
    Status = @Status,
    Error = @Error,
    UpdatedAt = GETUTCDATE()
  WHERE Id = @Id;

  SELECT @@ROWCOUNT AS Success;
END;
