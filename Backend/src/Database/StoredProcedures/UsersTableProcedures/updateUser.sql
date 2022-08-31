CREATE PROCEDURE updateUser(
@user_id VARCHAR(100),
@name VARCHAR(200),
@email VARCHAR(200),
@password VARCHAR(200),
@role VARCHAR(10),
@isassigned VARCHAR(10),
@project_id VARCHAR(100),
@issent VARCHAR(10))
AS
BEGIN
UPDATE UsersTable
SET 
user_id=@user_id ,
name=@name, 
email=@email, 
password=@password,
role=@role,
isassigned=@isassigned,
project_id=@project_id,
issent=@issent

WHERE 
user_id=@user_id
END


