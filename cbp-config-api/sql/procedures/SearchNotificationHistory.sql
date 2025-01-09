CREATE PROCEDURE [dbo].[SearchNotificationHistory]
  @StartDate DATETIME = NULL,
  @EndDate DATETIME = NULL,
  @Type NVARCHAR(50) = NULL,
  @Template NVARCHAR(50) = NULL,
  @UserId NVARCHAR(50) = NULL,
  @Status NVARCHAR(20) = NULL,
  @Page INT = 1,
  @PageSize INT = 10
AS
BEGIN
  SET NOCOUNT ON;

  DECLARE @Offset INT = (@Page - 1) * @PageSize;

  WITH FilteredResults AS (
    SELECT 
      Id,
      Type,
      Template,
      Recipients,
      Data,
      UserId,
      Status,
      Error,
      CreatedAt,
      COUNT(*) OVER() AS TotalCount
    FROM NotificationHistory
    WHERE 
      (@StartDate IS NULL OR CreatedAt >= @StartDate)
      AND (@EndDate IS NULL OR CreatedAt <= @EndDate)
      AND (@Type IS NULL OR Type = @Type)
      AND (@Template IS NULL OR Template = @Template)
      AND (@UserId IS NULL OR UserId = @UserId)
      AND (@Status IS NULL OR Status = @Status)
  )
  SELECT *
  FROM FilteredResults
  ORDER BY CreatedAt DESC
  OFFSET @Offset ROWS
  FETCH NEXT @PageSize ROWS ONLY;
END;
