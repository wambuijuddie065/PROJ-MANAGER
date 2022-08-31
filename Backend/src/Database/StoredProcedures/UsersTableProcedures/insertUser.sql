CREATE PROCEDURE insertUser(
@user_id VARCHAR(100),
@name VARCHAR(200),
@email VARCHAR(200),
@password VARCHAR(200)
)
AS
BEGIN
INSERT INTO UsersTable(user_id,name,email,password)
VALUES(@user_id,@name,@email,@password)
END