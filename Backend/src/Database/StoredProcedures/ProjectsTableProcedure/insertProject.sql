CREATE PROCEDURE insertProject(
@project_id VARCHAR(100),
@project_name VARCHAR(200),
@project_description VARCHAR(500),
@due_date VARCHAR(100)
)
AS
BEGIN
INSERT INTO ProjectsTable(project_id,project_name,project_description,due_date)
VALUES(
@project_id,
@project_name,
@project_description,
@due_date)
END



ALTER PROCEDURE insertProject(
@project_id VARCHAR(100),
@project_name VARCHAR(200),
@project_description VARCHAR(500),
@due_date VARCHAR(100),
@email VARCHAR(200)
)
AS
BEGIN

DECLARE @user_id VARCHAR(200)
SET @user_id= ( SELECT user_id FROM UsersTable WHERE email= @email)
INSERT INTO ProjectsTable(project_id,project_name,project_description,due_date , user_id)
VALUES(
@project_id,
@project_name,
@project_description,
@due_date, 
@user_id
)
END


