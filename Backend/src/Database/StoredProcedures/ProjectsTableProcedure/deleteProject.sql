CREATE PROCEDURE deleteProject(@project_id VARCHAR(100))
AS
BEGIN
DELETE FROM ProjectsTable
WHERE project_id=@project_id
END



ALTER PROCEDURE deleteProject(@project_id VARCHAR(100))
AS
BEGIN
DECLARE @user  VARCHAR (50)
SET @user= ( SELECT  user_id FROM ProjectsTable WHERE project_id=@project_id)

UPDATE UsersTable SET isassigned='0' WHERE user_id =@user
DELETE FROM ProjectsTable
WHERE project_id=@project_id
END