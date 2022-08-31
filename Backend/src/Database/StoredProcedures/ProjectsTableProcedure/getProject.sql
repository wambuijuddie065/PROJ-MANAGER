CREATE PROCEDURE getProject(@project_id VARCHAR(100))
AS
BEGIN
SELECT * FROM ProjectsTable
WHERE project_id= @project_id
END