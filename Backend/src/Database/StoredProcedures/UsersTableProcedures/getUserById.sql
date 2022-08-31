CREATE PROCEDURE getUserById(@user_id VARCHAR (200))
AS
BEGIN
SELECT * FROM UsersTable
WHERE user_id=@user_id
END