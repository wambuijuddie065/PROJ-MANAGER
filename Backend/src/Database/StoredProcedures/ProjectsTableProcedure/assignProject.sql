CREATE PROCEDURE assignProject(@p_name VARCHAR(200),
@u_id VARCHAR(100))
AS
BEGIN
IF EXISTS(SELECT * FROM ProjectsTable WHERE user_id is NULL AND project_name=@p_name)
BEGIN
IF EXISTS(SELECT * FROM ProjectsTable WHERE user_id =@u_id )
BEGIN
RAISERROR('user has another project',11,1)
END
ELSE
BEGIN
UPDATE ProjectsTable SET user_id=@u_id WHERE project_name=@p_name
END
END
ELSE
BEGIN
RAISERROR('user or project id does not exist/assigned',11,1)
END
END
