CREATE PROCEDURE updateProject(
@project_id VARCHAR(100),
@project_name VARCHAR(200),
@project_description VARCHAR(500),
@due_date VARCHAR(100),
@is_complete VARCHAR(10),
@isassigned VARCHAR(10),
@user_id VARCHAR(100)
)
AS
BEGIN
UPDATE ProjectsTable
SET 
project_id=@project_id,
project_name=@project_name,
project_description=@project_description,
due_date=@due_date, 
is_complete=@is_complete,
isassigned=@isassigned,
user_id=@user_id

WHERE 
project_id=@project_id
END
