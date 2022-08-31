-- CREATE TABLE ProjectsTable(project_id VARCHAR(100),project_name VARCHAR(200),project_description VARCHAR(500),
-- due_date VARCHAR(100),is_complete VARCHAR(10) DEFAULT '0',isassigned VARCHAR(10) DEFAULT '0',user_id VARCHAR(100) DEFAULT'0')

-- ALTER TABLE ProjectsTable 
--     ADD FOREIGN KEY (user_id) REFERENCES UsersTable(user_id);




CREATE TABLE ProjectsTable(project_id VARCHAR(100),project_name VARCHAR(200),project_description VARCHAR(500),
due_date VARCHAR(100),is_complete VARCHAR(10) DEFAULT '0',isassigned VARCHAR(10) DEFAULT '0',user_id VARCHAR(100)
FOREIGN KEY (user_id) REFERENCES UsersTable(user_id)
ON UPDATE CASCADE
)