CREATE PROCEDURE getUsers
AS
BEGIN
SELECT * FROM UsersTable
WHERE role='user'
END

ALTER PROCEDURE getUsers
AS
BEGIN
SELECT * FROM UsersTable
WHERE role='user' AND  isassigned='0' 
END